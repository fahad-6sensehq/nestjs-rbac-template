import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserTenantRoleDto } from './dtos/createUserTenantRole.dto';
import { UserTenantRole } from './entities/userTenantRole.entity';
import { UserTenantRoleService } from './userTenantRole.service';

describe('UserTenantRoleService', () => {
    let service: UserTenantRoleService;
    let userTenantRoleModel: Model<UserTenantRole>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserTenantRoleService,
                {
                    provide: getModelToken(UserTenantRole.name),
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserTenantRoleService>(UserTenantRoleService);
        userTenantRoleModel = module.get<Model<UserTenantRole>>(getModelToken(UserTenantRole.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create user role', async () => {
            const userTenantRole = {
                userId: '',
                roleId: '',
                tenantId: '',
            } as CreateUserTenantRoleDto;

            jest.spyOn(userTenantRoleModel, 'create').mockResolvedValueOnce(userTenantRole as any);

            const result = await service.create(userTenantRole);
            expect(result).toEqual(userTenantRole);
        });
    });
});
