import { BadRequestException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleType } from 'common/enums/role.enum';
import { AuthHelper } from 'common/instances/auth.helper';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { NestHelper } from 'common/instances/NestHelper';
import { RoleService } from 'modules/rbac/role/role.service';
import { UserRoleService } from 'modules/rbac/userRole/userRole.service';
import { Model, Types } from 'mongoose';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';
import { UserStatusEnum } from './interface/user.interface';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let userModel: Model<User>;
    let userRoleService: UserRoleService;
    let roleService: RoleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        findById: jest.fn(),
                        aggregate: jest.fn(),
                        findByIdAndUpdate: jest.fn(),
                    },
                },
                {
                    provide: UserRoleService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
                {
                    provide: RoleService,
                    useValue: {
                        findByName: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userModel = module.get<Model<User>>(getModelToken(User.name));
        userRoleService = module.get<UserRoleService>(UserRoleService);
        roleService = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const mockUser: any = {
        _id: '65d481d0aa400c99e75fea9a',
        name: 'fh',
        email: 'fh@6sensehq.com',
        userRoleId: '65d481d1aa400c99e75feaa0',
        verificationCode: '',
        registrationType: 'password',
        status: UserStatusEnum.ACTIVE,
        role: RoleType.SUPER_ADMIN,
        clientId: '65d48166aa400c99e75fea70',
        isRegistered: true,
        isVerified: false,
        isDeleted: false,
        lastLogin: '2024-03-12T04:10:03.140Z',
        phone: '',
        stripeCustomerId: '',
        created_at: '2024-02-20T10:41:20.801Z',
        updated_at: '2024-03-08T07:07:00.342Z',
        __v: 0,
        resetCode: '',
        scopes: ['company.create', 'company.update', 'company.view', 'company.list'],
    };

    const mockUser2: any = {
        _id: '65d481d0aa400c99e75fea9a',
        userId: '65d481d0aa400c99e75fea91',
        name: 'fh',
        email: 'fh@6sensehq.com',
        userRoleId: '65d481d1aa400c99e75feaa0',
        verificationCode: '',
        registrationType: 'password',
        status: UserStatusEnum.ACTIVE,
        role: RoleType.USER,
        clientId: '65d481d0aa400c99e75fea9a',
        isRegistered: true,
        isVerified: false,
        isDeleted: false,
        lastLogin: '2024-03-12T04:10:03.140Z',
        phone: '',
        stripeCustomerId: '',
        created_at: '2024-02-20T10:41:20.801Z',
        updated_at: '2024-03-08T07:07:00.342Z',
        __v: 0,
        resetCode: '',
        scopes: ['company.create', 'company.update', 'company.view', 'company.list'],
    };

    describe('createMainAdmin', () => {
        it('should return user already exist', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({} as any),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User already exists',
                    errorCode: 'user_already_exists',
                };
            });

            await expect(service.createMainAdmin({} as CreateUserDto)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User already exists',
                errorCode: 'user_already_exists',
            });
        });

        it('should return role not exist', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(roleService, 'findByName').mockResolvedValueOnce(null);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Role does not exist',
                    errorCode: 'role_does_not_exist',
                };
            });

            await expect(service.createMainAdmin({} as CreateUserDto)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'Role does not exist',
                errorCode: 'role_does_not_exist',
            });
        });

        it('should return main admin', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(roleService, 'findByName').mockResolvedValueOnce({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);

            jest.spyOn(userModel, 'create').mockResolvedValueOnce({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
                clientId: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);
            jest.spyOn(userRoleService, 'create').mockResolvedValueOnce({} as any);

            await expect(service.createMainAdmin({} as CreateUserDto)).resolves.toEqual({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
                clientId: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);
        });
    });

    describe('create', () => {
        it('should return user already exist', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({} as any),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User already exists',
                    errorCode: 'user_already_exists',
                };
            });

            await expect(service.create({} as CreateUserDto, mockUser)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User already exists',
                errorCode: 'user_already_exists',
            });
        });

        it('should return role not exist', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(roleService, 'findByName').mockResolvedValueOnce(null);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Role does not exist',
                    errorCode: 'role_does_not_exist',
                };
            });

            await expect(service.create({} as CreateUserDto, mockUser)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'Role does not exist',
                errorCode: 'role_does_not_exist',
            });
        });

        it('should return main admin', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(roleService, 'findByName').mockResolvedValueOnce({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);

            jest.spyOn(userModel, 'create').mockResolvedValueOnce({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
                clientId: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);
            jest.spyOn(userRoleService, 'create').mockResolvedValueOnce({} as any);

            await expect(service.create({} as CreateUserDto, mockUser)).resolves.toEqual({
                _id: new Types.ObjectId('67d7c99168379e304229b10d'),
                clientId: new Types.ObjectId('67d7c99168379e304229b10d'),
            } as any);
        });
    });

    describe('findAll', () => {
        const query = {
            page: '1',
            size: '10',
            search: 'test',
            status: ' 1153',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
        };

        it('should return all users for admin', async () => {
            jest.spyOn(userModel, 'aggregate').mockResolvedValueOnce({ data: [], count: 0 } as any);

            await expect(service.findAll(mockUser, query)).resolves.toEqual({ data: [], count: 0 });
        });

        it('should return 0 users for admin', async () => {
            jest.spyOn(userModel, 'aggregate').mockResolvedValueOnce([]);

            await expect(service.findAll(mockUser, query)).resolves.toEqual({ data: [], count: 0 });
        });

        it('should return all users for client', async () => {
            jest.spyOn(userModel, 'aggregate').mockResolvedValueOnce([
                {
                    allUsers: [{ _id: new Types.ObjectId('65d481d0aa400c99e75fea9a') }],
                },
            ] as any);

            jest.spyOn(userModel, 'aggregate').mockResolvedValueOnce({ data: [], count: 0 } as any);

            await expect(service.findAll(mockUser2, query)).resolves.toEqual({ data: [], count: 0 });
        });

        it('should return 0 users for client', async () => {
            jest.spyOn(userModel, 'aggregate').mockResolvedValueOnce([
                {
                    allUsers: [],
                },
            ] as any);

            await expect(service.findAll(mockUser2, query)).resolves.toEqual({ data: [], count: 0 });
        });
    });

    describe('findOneData', () => {
        it('should return null', async () => {
            jest.spyOn(userModel, 'aggregate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce([]),
                    }) as any,
            );

            await expect(service.findOneData('67d7c99168379e304229b10d')).resolves.toEqual(null);
        });

        it('should return user data', async () => {
            jest.spyOn(userModel, 'aggregate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce([
                            {
                                permissions: ['user.create'],
                            },
                        ]),
                    }) as any,
            );

            await expect(service.findOneData('67d7c99168379e304229b10d')).resolves.toEqual({
                scopes: [undefined],
            });
        });
    });

    describe('find', () => {
        it('should return user data', async () => {
            jest.spyOn(service, 'findOneData').mockResolvedValueOnce([] as any);

            await expect(service.find('67d7c99168379e304229b10d')).resolves.toEqual([] as any);
        });
    });

    describe('findByEmail', () => {
        it('should return user with email', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockReturnThis(),
                        exec: jest.fn().mockResolvedValueOnce({} as any),
                    }) as any,
            );

            await expect(service.findByEmail('user@gmail.com')).resolves.toEqual({});
        });
    });

    describe('findById', () => {
        it('should return user not found', async () => {
            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User not found',
                    errorCode: 'user_not_found',
                };
            });

            await expect(service.findById('67d7c99168379e304229b10d')).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not found',
                errorCode: 'user_not_found',
            });
        });

        it('should return user with email', async () => {
            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({} as any),
                    }) as any,
            );

            await expect(service.findById('67d7c99168379e304229b10d')).resolves.toEqual({});
        });
    });

    describe('getUser', () => {
        it('should return user not found', async () => {
            jest.spyOn(userModel, 'aggregate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce([]),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    message: 'User not found',
                    errorCode: 'user_not_found',
                    status: HttpStatus.NOT_FOUND,
                };
            });

            await expect(service.getUser('67d7c99168379e304229b10d', mockUser)).rejects.toEqual({
                message: 'User not found',
                errorCode: 'user_not_found',
                status: HttpStatus.NOT_FOUND,
            });
        });

        it('should return user with email', async () => {
            jest.spyOn(userModel, 'aggregate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce([{}]),
                    }) as any,
            );

            await expect(service.getUser('67d7c99168379e304229b10d', mockUser)).resolves.toEqual({});
        });
    });

    describe('isSuperAdmin', () => {
        it('should return user not found', async () => {
            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User not found',
                    errorCode: 'user_not_found',
                };
            });

            await expect(service.isSuperAdmin('67d7c99168379e304229b10d')).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not found',
                errorCode: 'user_not_found',
            });
        });

        it('should return user with different role', async () => {
            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ role: RoleType.USER } as any),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'User not super admin',
                    errorCode: 'user_not_super_admin',
                };
            });

            await expect(service.isSuperAdmin('67d7c99168379e304229b10d')).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'User not super admin',
                errorCode: 'user_not_super_admin',
            });
        });

        it('should return user with email', async () => {
            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ role: RoleType.SUPER_ADMIN } as any),
                    }) as any,
            );

            await expect(service.isSuperAdmin('67d7c99168379e304229b10d')).resolves.toEqual(true);
        });
    });

    describe('updateUserLastLogin', () => {
        it('return users last login info', async () => {
            jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockReturnValueOnce({} as any),
                    }) as any,
            );

            await expect(service.updateUserLastLogin('67d7c99168379e304229b10s', '')).resolves.toEqual({} as any);
        });
    });

    describe('updateResetLink', () => {
        it('return users reset link', async () => {
            jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockReturnValueOnce({} as any),
                    }) as any,
            );

            await expect(service.updateResetLink('67d7c99168379e304229b10s', '')).resolves.toEqual({} as any);
        });
    });

    describe('updateStatus', () => {
        it('return update users status', async () => {
            jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockReturnValueOnce({} as any),
                    }) as any,
            );

            await expect(service.updateStatus('67d7c99168379e304229b10s', UserStatusEnum.ACTIVE)).resolves.toEqual(
                {} as any,
            );
        });
    });

    describe('getUserByResetLink', () => {
        it('return users by reset link', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockReturnValueOnce({} as any),
                    }) as any,
            );

            await expect(service.getUserByResetLink('67d7c99168379e304229b10s')).resolves.toEqual({} as any);
        });
    });

    describe('updatePassword', () => {
        it('return updated password', async () => {
            jest.spyOn(userModel, 'findByIdAndUpdate').mockReturnValueOnce({} as any);

            await expect(service.updatePassword('67d7c99168379e304229b10s', 'abc', true)).resolves.toEqual({} as any);
        });
    });

    describe('isUniqueEmail', () => {
        it('should return email already exists', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({} as any),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Email already exists',
                    errorCode: 'email_already_exists',
                };
            });

            await expect(service.isUniqueEmail('abc@gmail.com')).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'Email already exists',
                errorCode: 'email_already_exists',
            });
        });

        it('should return true for unique email', async () => {
            jest.spyOn(userModel, 'findOne').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(null),
                    }) as any,
            );

            await expect(service.isUniqueEmail('abc@gmail.com')).resolves.toEqual({ success: true });
        });
    });

    describe('changePassword', () => {
        it('should return password do not match', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: '123',
                newPassword: '1234',
                confirmNewPassword: '1243',
            };

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Password do not match',
                    errorCode: 'password_do_not_match',
                };
            });

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'Password do not match',
                errorCode: 'password_do_not_match',
            });
        });

        it('should return password validation', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: '123',
                newPassword: '1234',
                confirmNewPassword: '1234',
            };

            jest.spyOn(AuthHelper, 'validatePassword');

            jest.spyOn(ExceptionHelper.getInstance(), 'passwordValidation').mockImplementationOnce(() => {
                throw {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
                };
            });

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).rejects.toEqual({
                status: HttpStatus.BAD_REQUEST,
                message: 'Use at least 8 characters, with a mix of upper & lower case letters and a number.',
            });
        });

        it('should return user not found', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: '123',
                newPassword: 'Rs123456',
                confirmNewPassword: 'Rs123456',
            };

            jest.spyOn(AuthHelper, 'validatePassword').mockResolvedValueOnce([]);

            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ password: null }),
                    }) as any,
            );

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    message: 'User not found',
                    errorCode: 'user_not_found',
                    status: HttpStatus.NOT_FOUND,
                };
            });

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).rejects.toEqual({
                message: 'User not found',
                errorCode: 'user_not_found',
                status: HttpStatus.NOT_FOUND,
            });
        });

        it('should return invalid password', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: '123',
                newPassword: 'Rs123456',
                confirmNewPassword: 'Rs123456',
            };

            jest.spyOn(AuthHelper, 'validatePassword');

            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ password: '122' }),
                    }) as any,
            );

            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(false);

            jest.spyOn(ExceptionHelper.getInstance(), 'passwordValidation').mockImplementationOnce(() => {
                throw new BadRequestException('Invalid password');
            });

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).rejects.toThrow(
                new BadRequestException('Invalid password'),
            );
        });

        it('should return new password cannot be old password', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: 'Rs123456',
                newPassword: 'Rs123456',
                confirmNewPassword: 'Rs123456',
            };

            jest.spyOn(AuthHelper, 'validatePassword');

            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ password: 'Rs123456' }),
                    }) as any,
            );

            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(true);
            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(true);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    message: 'New password cannot be old password',
                    errorCode: 'new_password_cannot_be_old_password',
                    status: HttpStatus.BAD_REQUEST,
                };
            });

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).rejects.toEqual({
                message: 'New password cannot be old password',
                errorCode: 'new_password_cannot_be_old_password',
                status: HttpStatus.BAD_REQUEST,
            });
        });

        it('should return updated new password', async () => {
            const dto: ChangePasswordDto = {
                oldPassword: 'Rs123456',
                newPassword: 'Rs1234567',
                confirmNewPassword: 'Rs1234567',
            };

            jest.spyOn(AuthHelper, 'validatePassword');

            jest.spyOn(userModel, 'findById').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce({ password: 'Rs123456' }),
                    }) as any,
            );

            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(true);
            jest.spyOn(AuthHelper, 'isPasswordMatched').mockResolvedValueOnce(false);

            jest.spyOn(AuthHelper, 'hashPassword').mockResolvedValueOnce('hashedPassword');
            jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce({}),
                    }) as any,
            );

            await expect(service.changePassword('67d7c99168379e304229b10d', dto)).resolves.toEqual({});
        });
    });

    // describe('uploadAvatar', () => {
    //     it('should return file not found', async () => {
    //         jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(true);
    //         jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
    //             throw {
    //                 message: 'File not found',
    //                 errorCode: 'file_not_found',
    //                 status: HttpStatus.BAD_REQUEST,
    //             };
    //         });

    //         await expect(service.uploadAvatar({} as any)).rejects.toEqual({
    //             message: 'File not found',
    //             errorCode: 'file_not_found',
    //             status: HttpStatus.BAD_REQUEST,
    //         });
    //     });

    //     it('should upload and return avatar URL', async () => {
    //         const mockFile = { originalname: 'avatar.png', buffer: Buffer.from('test') } as Express.Multer.File;

    //         const mockS3Response = { Location: 'https://s3.amazonaws.com/bucket/avatar.png' };
    //         jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(false);

    //         const result = await service.uploadAvatar(mockFile);

    //         expect(result).toEqual({ avatar: mockS3Response.Location });
    //     });

    //     it('should cover catch block', async () => {
    //         const mockFile = { originalname: 'avatar.png', buffer: Buffer.from('test') } as Express.Multer.File;

    //         jest.spyOn(NestHelper.getInstance(), 'isEmpty').mockReturnValueOnce(false);

    //         jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
    //             throw {
    //                 message: 'File not failed',
    //                 errorCode: 'file_upload_failed',
    //                 status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             };
    //         });

    //         await expect(service.uploadAvatar(mockFile)).rejects.toEqual({
    //             message: 'File not failed',
    //             errorCode: 'file_upload_failed',
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //         });
    //     });
    // });

    // describe('removeAvatar', () => {
    //     it('should throw if user is not found', async () => {
    //         jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);

    //         const mockError = {
    //             message: 'User not found',
    //             errorCode: 'user_not_found',
    //             status: HttpStatus.BAD_REQUEST,
    //         };

    //         jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
    //             throw mockError;
    //         });

    //         await expect(service.removeAvatar(mockUser)).rejects.toEqual(mockError);
    //     });

    //     it('should return success if avatar is already removed or not set', async () => {
    //         const userWithoutAvatar = { avatar: null };

    //         jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(userWithoutAvatar);

    //         const result = await service.removeAvatar(mockUser);

    //         expect(result).toEqual({
    //             success: true,
    //             message: 'Avatar already removed or not set',
    //         });
    //     });

    //     it('should remove avatar and return success', async () => {
    //         const previousAvatar = 'https://s3.amazonaws.com/bucket/avatar.png';

    //         const previousUser = {
    //             avatar: previousAvatar,
    //         };

    //         jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(previousUser);

    //         const result = await service.removeAvatar(mockUser);

    //         expect(result).toEqual({
    //             success: true,
    //             message: 'Avatar removed successfully',
    //         });
    //     });
    // });

    describe('update', () => {
        const updateUserDto: UpdateUserDto = {
            name: 'name',
            phone: '01876412030',
            receiveUpdate: 'false',
            avatar: null,
        };

        it('should return user not found error', async () => {
            jest.spyOn(service, 'getUser').mockResolvedValueOnce(mockUser);

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementationOnce(() => {
                throw {
                    message: 'User not found',
                    errorCode: 'user_not_found',
                    status: HttpStatus.NOT_FOUND,
                };
            });

            await expect(service.update('670f5cb7fcec534287bf881b', updateUserDto, mockUser2)).rejects.toEqual({
                message: 'User not found',
                errorCode: 'user_not_found',
                status: HttpStatus.NOT_FOUND,
            });
        });

        it('should return user not found error', async () => {
            const tempUser = {
                ...mockUser,
                _id: '65d481d0aa400c99e75fea91',
                address: {
                    _id: '65d481d0aa400c99e75fea91',
                    addressLine: '123 Jonson Road',
                    zip: '20005',
                },
            };
            jest.spyOn(service, 'getUser').mockResolvedValueOnce(tempUser);

            jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(tempUser);
            jest.spyOn(service, 'getUser').mockResolvedValueOnce(tempUser);

            await expect(service.update('65d481d0aa400c99e75fea91', updateUserDto, mockUser2)).resolves.toEqual(
                tempUser,
            );
        });
    });
});
