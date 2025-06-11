import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleType } from 'common/enums/role.enum';
import { AuthHelper } from 'common/instances/auth.helper';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { NestHelper } from 'common/instances/NestHelper';
import { AuthService } from 'modules/auth/auth.service';
import { GrantType } from 'modules/auth/enum/auth.enum';
import { CreateUserDto } from 'modules/user/dtos/createUser.dto';
import { IUser, UserStatusEnum } from 'modules/user/interface/user.interface';
import { UserService } from 'modules/user/user.service';
import { Types } from 'mongoose';

describe('AuthService', () => {
    let service: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        jest.restoreAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        createMainAdmin: jest.fn(),
                        create: jest.fn(),
                        findByEmail: jest.fn(),
                        updateResetLink: jest.fn(),
                        updateUser: jest.fn(),
                        updateUserLastLogin: jest.fn(),
                        find: jest.fn(),
                        getUserByResetLink: jest.fn(),
                        updatePassword: jest.fn(),
                        incompleteUser: jest.fn(),
                        updateUserForProjectAssign: jest.fn(),
                        getUser: jest.fn(),
                        findById: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                        verify: jest.fn(),
                        decode: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    beforeAll(() => {});

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.clearAllTimers();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const createUserDto = {
        email: 'abc@gmail.com',
        password: 'Rs123456',
        name: 'abc',
        phone: '123456',
        receiveUpdate: 'false',
        status: UserStatusEnum.ACTIVE,
        role: RoleType.SUPER_ADMIN,
    } as CreateUserDto;

    const clientId = new Types.ObjectId('5f3f5f3f5f3f5f3f5f3f5f3f');

    const mockUser: any = {
        _id: '65d481d0aa400c99e75fea9a',
        name: 'fh',
        email: 'fb@6sensehq.com',
        userRoleId: '65d481d1aa400c99e75feaa0',
        status: UserStatusEnum.ACTIVE,
        role: RoleType.SUPER_ADMIN,
        clientId: '65d48166aa400c99e75fea70',
    };

    const mockClient: any = {
        ...mockUser,
        role: RoleType.USER,
    };

    describe('signUpMainAdmin', () => {
        it('should create a valid main admin', async () => {
            jest.spyOn(AuthHelper, 'hashPassword').mockResolvedValueOnce('hashedPassword');

            jest.spyOn(userService, 'createMainAdmin').mockResolvedValueOnce({
                ...createUserDto,
                password: 'hashedPassword',
                _id: clientId,
            });

            const result = await service.signUpMainAdmin(createUserDto, clientId);
            expect(result).toEqual({
                ...createUserDto,
                password: 'hashedPassword',
                _id: clientId,
            });
        });

        it('should return password validation error', async () => {
            const CreateUserDto = {
                ...createUserDto,
                password: '123456',
            } as CreateUserDto;

            jest.spyOn(ExceptionHelper.getInstance(), 'passwordValidation').mockImplementationOnce(() => {
                throw {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
                };
            });

            await expect(service.signUpMainAdmin(CreateUserDto, clientId)).rejects.toEqual({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
            });
        });
    });

    describe('signUp', () => {
        it('should return admin email cannot use as a client email error', async () => {
            const createUserWithProjectId = {
                ...createUserDto,
                projectId: '670f5cb7fcec534287bf881a',
            };

            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({ role: RoleType.SUPER_ADMIN } as any);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: `Admin email can't be used as a client email.#abc@gmail.com`,
                    errorCode: 'admin_email_cannot_be_used_as_client_email',
                    data: {},
                };
            });

            await expect(service.signUp(createUserWithProjectId, mockUser)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: `Admin email can't be used as a client email.#abc@gmail.com`,
                errorCode: 'admin_email_cannot_be_used_as_client_email',
                data: {},
            });
        });

        it('should cover role Client & email already exist scenario', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({ email: mockUser.email } as any);

            jest.spyOn(service, 'handleExistingEmail').mockResolvedValueOnce([] as any);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: `Email address already exists#abc@gmail.com`,
                    errorCode: 'email_address_already_exists',
                    data: {},
                };
            });

            await expect(service.signUp(createUserDto, mockClient)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: `Email address already exists#abc@gmail.com`,
                errorCode: 'email_address_already_exists',
                data: {},
            });
        });

        it('should create a valid user', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);

            const createUser = {
                ...createUserDto,
                password: null,
                role: mockUser.role,
                status: UserStatusEnum.INVITED,
                clientId: mockUser.clientId,
            };

            jest.spyOn(userService, 'create').mockResolvedValueOnce({
                ...createUser,
                _id: '65d481d0aa400c99e75fea9a',
            });

            jest.spyOn(service, 'generateResetLink').mockResolvedValueOnce('resetLink');

            jest.spyOn(userService, 'updateResetLink').mockResolvedValueOnce(createUser as any);

            const result = await service.signUp(createUserDto, mockUser);

            expect(result).toEqual({
                email: createUser.email,
                name: createUser.name,
                phone: createUser.phone,
                receiveUpdate: createUser.receiveUpdate,
                status: createUser.status,
                role: createUser.role,
                clientId: createUser.clientId,
                _id: '65d481d0aa400c99e75fea9a',
            });

            // jest.runAllTimers();
        });

        it('should catch error while creating user', async () => {
            const createUser = {
                ...createUserDto,
                email: 'acb@gmail.com',
            };

            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);

            jest.spyOn(userService, 'create').mockRejectedValueOnce(
                new HttpException('Error while creating user', 400),
            );

            await expect(service.signUp(createUser, mockUser)).rejects.toThrow(HttpException);
        });
    });

    describe('handleExistingEmail', () => {
        const createUserDto = { email: 'test@example.com' } as any;
        const mockUser = { _id: 'user-id-123', clientId: 'client-id' } as any;

        it('should cover email already exist error', async () => {
            const error = {
                message: `Email address already exists#${createUserDto?.email}`,
                errorCode: 'email_address_already_exists',
                status: HttpStatus.CONFLICT,
            };

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw error;
            });

            await expect(service.handleExistingEmail('test@example.com' as any, mockUser)).rejects.toEqual(error);
        });
    });

    describe('signIn', () => {
        it('should return invalid grant type', async () => {
            await expect(service.signIn({ type: 'pass' } as any, Response as any)).rejects.toThrow(
                'Invalid grant type.',
            );
        });

        it('should return invalid refresh token', async () => {
            jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => {
                throw new Error('Invalid refresh token');
            });

            await expect(service.signIn({ type: GrantType.TOKEN } as any, Response as any)).rejects.toThrow(
                'Invalid refresh token',
            );
        });

        it('should return user not found', async () => {
            jest.spyOn(jwtService, 'verify').mockReturnValueOnce({ email: 'test@example.com' });

            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);

            await expect(service.signIn({ type: GrantType.TOKEN } as any, Response as any)).rejects.toThrow(
                'Invalid refresh token.',
            );
        });

        it('should return invalid email or password while user not found', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);

            await expect(service.signIn({ type: GrantType.PASSWORD } as any, Response as any)).rejects.toThrow(
                'Invalid email or password.',
            );
        });

        it('should return invalid email or password while password do not match', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({ password: '123' } as any);
            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(false);

            await expect(service.signIn({ type: GrantType.PASSWORD } as any, Response as any)).rejects.toThrow(
                'Invalid email or password.',
            );
        });

        it('should return successful response', async () => {
            const jsonMock = jest.fn();
            // const cookieMock = jest.fn();

            const response = {
                json: jsonMock,
                //     cookie: cookieMock,
            } as any as Response;

            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({
                _id: new Types.ObjectId('670f5cb7fcec534287bf881a'),
                email: 'abc@gmail.com',
                password: 'hashedPassword',
            } as any);

            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(true);
            jest.spyOn(userService, 'updateUserLastLogin').mockResolvedValueOnce({
                _id: new Types.ObjectId('670f5cb7fcec534287bf881a'),
            } as any);

            jest.spyOn(userService, 'find').mockResolvedValueOnce({
                _id: new Types.ObjectId('670f5cb7fcec534287bf881a'),
                email: 'abc@gmail.com',
            } as any);

            jest.spyOn(service, 'generateToken').mockResolvedValueOnce({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });

            await service.signIn(
                { type: GrantType.PASSWORD, remember: true, email: 'abc@gmail.com' } as any,
                response as any,
            );

            // expect(cookieMock).toHaveBeenCalledTimes(2);
        });
    });

    describe('generateToken', () => {
        it('should return generated access and refresh tokens', async () => {
            jest.spyOn(jwtService, 'sign')
                .mockResolvedValueOnce('access-token' as string as never)
                .mockResolvedValueOnce('refresh-token' as string as never);

            const result = await service.generateToken(
                { _id: 'user-id', email: 'test@example.com', role: 'user-role' } as any,
                1,
            );

            expect(result).toEqual({
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            });
        });
    });

    describe('sendForgetPasswordLink', () => {
        it('should return user not found error', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({
                status: UserStatusEnum.INVITED,
                clientId: '122',
            } as any);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User not found',
                    errorCode: 'user_not_found',
                };
            });

            await expect(service.sendForgetPasswordLink({ email: 'abc@gmail.com' }, '123')).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not found',
                errorCode: 'user_not_found',
            });
        });

        it('should return email with user', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce({
                status: UserStatusEnum.ACTIVE,
                clientId: '123',
                _id: new Types.ObjectId('670f5cb7fcec534287bf881a'),
            } as any);

            jest.spyOn(service, 'generateResetLink').mockResolvedValueOnce('resetLink');
            jest.spyOn(userService, 'updateResetLink').mockResolvedValueOnce({} as any);

            await expect(service.sendForgetPasswordLink({ email: 'abc@gmail.com' }, '123')).resolves.toEqual({
                success: true,
            });
        });
    });

    describe('setPassword', () => {
        it('should set password', async () => {
            jest.spyOn(service, 'handlePasswordSetup').mockResolvedValueOnce({} as any);

            const result = await service.setPassword({ token: '', password: '1', confirmPassword: '1' });
            expect(result).toEqual({});
        });
    });

    describe('resetPassword', () => {
        it('should reset password', async () => {
            jest.spyOn(service, 'handlePasswordSetup').mockResolvedValueOnce({} as any);

            const result = await service.resetPassword({ token: '', password: '1', confirmPassword: '1' });
            expect(result).toEqual({});
        });
    });

    describe('handlePasswordSetup', () => {
        it('return user not found error', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce(null);
            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError');

            await expect(
                service.handlePasswordSetup({ token: '', password: '1', confirmPassword: '1' }, false),
            ).rejects.toThrow('User not found');
        });

        it('return handle tokenExpired error', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce({ email: 'abc@gmail.com' } as any);

            jest.spyOn(jwtService, 'verify').mockReturnValueOnce;
            jest.spyOn(jwtService, 'decode').mockReturnValueOnce({ email: 'abc1@gmail.com' });

            jest.spyOn(ExceptionHelper.getInstance(), 'tokenExpired');

            await expect(
                service.handlePasswordSetup({ token: '', password: '1', confirmPassword: '1' }, false),
            ).rejects.toThrow('The Link has Expired');
        });

        it('return handle password setup', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce({
                email: 'abc@gmail.com',
                _id: new Types.ObjectId('670f5cb7fcec534287bf881a'),
            } as any);

            jest.spyOn(jwtService, 'verify').mockReturnValueOnce;
            jest.spyOn(jwtService, 'decode').mockReturnValueOnce({ email: 'abc@gmail.com' });

            jest.spyOn(service, 'updatePassword').mockResolvedValueOnce({} as any);
            jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(false);

            jest.spyOn(service, 'updatePassword');

            await expect(
                service.handlePasswordSetup({ token: '', password: '1', confirmPassword: '1' }, false),
            ).resolves.toEqual({});
        });
    });

    describe('updatePassword', () => {
        it('should return password does not match error', async () => {
            await expect(service.updatePassword({} as any, 'abc', 'abd', true)).rejects.toThrow(
                `Password doesn't match`,
            );
        });

        it('should return password validation', async () => {
            jest.spyOn(AuthHelper, 'validatePassword').mockResolvedValueOnce(['abc']);
            jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(false);
            jest.spyOn(ExceptionHelper.getInstance(), 'passwordValidation').mockImplementationOnce(() => {
                throw {
                    message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
                    statusCode: HttpStatus.BAD_REQUEST,
                };
            });

            await expect(service.updatePassword({} as any, 'abc', 'abc', true)).rejects.toEqual({
                message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
                statusCode: HttpStatus.BAD_REQUEST,
            });
        });

        it('should return updated password', async () => {
            jest.spyOn(AuthHelper, 'validatePassword').mockResolvedValueOnce([]);
            jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(true);
            jest.spyOn(AuthHelper, 'hashPassword').mockResolvedValueOnce('12aa');
            jest.spyOn(userService, 'updatePassword').mockResolvedValueOnce({} as any);

            await expect(
                service.updatePassword(
                    { _id: new Types.ObjectId('670f5cb7fcec534287bf881a') } as any,
                    'abc',
                    'abc',
                    true,
                ),
            ).resolves.toEqual({});
        });
    });

    describe('tokenVerify', () => {
        it('should return user not found exception', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce(null);

            jest.spyOn(ExceptionHelper.getInstance(), 'throwUserNotFoundException').mockImplementationOnce(() => {
                throw new Error('User not found');
            });

            await expect(service.tokenVerify({ token: '' })).rejects.toThrow('User not found');
        });

        it('should return token expire', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce({} as any);

            jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => {
                throw new Error('The Link has Expired');
            });

            await expect(service.tokenVerify({ token: '' })).rejects.toThrow('The Link has Expired');
        });

        it('should return success', async () => {
            jest.spyOn(userService, 'getUserByResetLink').mockResolvedValueOnce({} as any);

            jest.spyOn(jwtService, 'verify').mockReturnValueOnce({ email: 'test@example.com' });

            await expect(service.tokenVerify({ token: '' })).resolves.toEqual({ success: true });
        });
    });

    describe('generateResetLink', () => {
        it('should generate and return a reset link token', async () => {
            const mockUser = {
                _id: '12345',
                role: 'admin',
                clientId: '67890',
                email: 'test@example.com',
            } as any as IUser;

            const mockToken = 'generated-reset-token';

            jest.spyOn(jwtService, 'sign').mockReturnValueOnce(mockToken);

            jest.spyOn(userService, 'updateResetLink').mockResolvedValueOnce(null);

            const result = await service.generateResetLink(mockUser);

            expect(result).toBe(mockToken);
        });
    });
});
