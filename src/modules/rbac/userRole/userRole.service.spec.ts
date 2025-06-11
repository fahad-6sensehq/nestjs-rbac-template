import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserRole } from './entities/userRole.entity';
import { UserRoleService } from './userRole.service';
import { CreateUserRoleDto } from './dtos/createUserRole.dto';

describe('UserRoleService', () => {
    let service: UserRoleService;
    let userRoleModel: Model<UserRole>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRoleService,
                {
                    provide: getModelToken(UserRole.name),
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserRoleService>(UserRoleService);
        userRoleModel = module.get<Model<UserRole>>(getModelToken(UserRole.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create user role', async () => {
            const userRole = {
                userId: '',
                roleId: '',
                clientId: '',
            } as CreateUserRoleDto;

            jest.spyOn(userRoleModel, 'create').mockResolvedValueOnce(userRole as any);

            const result = await service.create(userRole);
            expect(result).toEqual(userRole);
        });
    });
});
