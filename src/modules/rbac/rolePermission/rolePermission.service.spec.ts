import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateRolePermissionDto } from 'modules/tenant/dtos/createRolePermission.dto';
import { Model } from 'mongoose';
import { RolePermissionService } from './rolePermission.service';
import { RolePermission } from './entities/rolePermission.entity';

describe('RolePermissionService', () => {
    let service: RolePermissionService;
    let rolePermissionModel: Model<RolePermission>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RolePermissionService,
                {
                    provide: getModelToken(RolePermission.name),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RolePermissionService>(RolePermissionService);
        rolePermissionModel = module.get<Model<RolePermission>>(getModelToken(RolePermission.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create role permission', async () => {
            const rolePermission = {
                roleId: '',
                permissionId: '',
            } as CreateRolePermissionDto;

            jest.spyOn(rolePermissionModel, 'find').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(rolePermission),
                    }) as any,
            );

            jest.spyOn(rolePermissionModel, 'create').mockResolvedValueOnce(rolePermission as any);

            const result = await service.create(rolePermission);
            expect(result).toEqual(rolePermission);
        });

        it('should return existing role permission', async () => {
            const rolePermission = [
                {
                    roleId: '',
                    permissionId: '',
                } as CreateRolePermissionDto,
            ];

            jest.spyOn(rolePermissionModel, 'find').mockImplementationOnce(
                () =>
                    ({
                        lean: jest.fn().mockResolvedValueOnce(rolePermission),
                    }) as any,
            );

            const result = await service.create(rolePermission[0]);
            expect(result).toEqual(rolePermission[0]);
        });
    });
});
