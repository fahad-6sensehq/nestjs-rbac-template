import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleType } from 'common/enums/role.enum';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { Model, Types } from 'mongoose';
import { PermissionService } from '../permission/permission.service';
import { RolePermissionService } from '../rolePermission/rolePermission.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

describe('RoleService', () => {
    let service: RoleService;
    let roleModel: Model<Role>;
    let rolePermissionService: RolePermissionService;
    let permissionService: PermissionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: getModelToken(Role.name),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
                {
                    provide: PermissionService,
                    useValue: {
                        findByName: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: RolePermissionService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RoleService>(RoleService);
        roleModel = module.get<Model<Role>>(getModelToken(Role.name));
        rolePermissionService = module.get<RolePermissionService>(RolePermissionService);
        permissionService = module.get<PermissionService>(PermissionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create role', async () => {
            const role = { name: RoleType.SUPER_ADMIN, status: 'active' } as CreateRoleDto;

            jest.spyOn(roleModel, 'create').mockResolvedValue(role as any);

            const result = await service.create(role as any);

            expect(result).toEqual(role);
        });

        it('should return error when role already exists', async () => {
            jest.spyOn(roleModel, 'create').mockRejectedValue({ code: 11000 });

            jest.spyOn(ExceptionHelper.getInstance(), 'defaultError').mockImplementation(() => {
                throw new Error('Role already exists');
            });

            await expect(service.create({ name: RoleType.SUPER_ADMIN } as any)).rejects.toThrow('Role already exists');
        });

        it('should return error when role creation fails', async () => {
            jest.spyOn(roleModel, 'create').mockRejectedValue(new Error('Role creation failed'));

            const result = await service.create({ name: RoleType.SUPER_ADMIN } as any);

            expect(result).toBeInstanceOf(Error);
        });
    });

    describe('findByName', () => {
        it('should find role by name', async () => {
            const role = { name: RoleType.SUPER_ADMIN, status: 'active' } as Role;

            jest.spyOn(roleModel, 'findOne').mockResolvedValue(role as any);

            const result = await service.findByName(RoleType.SUPER_ADMIN);

            expect(result).toEqual(role);
        });
    });

    describe('findAll', () => {
        it('should find all roles', async () => {
            const roles = [{ name: RoleType.SUPER_ADMIN, status: 'active' }] as Role[];

            jest.spyOn(roleModel, 'find').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValue(roles),
                    }) as any,
            );

            const result = await service.findAll();

            expect(result).toEqual(roles);
        });
    });

    describe('createRolesAndAddPermission', () => {
        const permissions = ['role.create', 'role.view'];
        const role = {
            _id: new Types.ObjectId('67c9d97e86f6888e28020abf'),
            name: RoleType.SUPER_ADMIN,
            status: 'active',
        };

        it('should create role and assign permissions', async () => {
            jest.spyOn(roleModel, 'find').mockResolvedValueOnce([]);
            jest.spyOn(roleModel, 'create').mockResolvedValueOnce(role as any);
            jest.spyOn(service, 'assignPermissionToRole').mockResolvedValueOnce(Promise.resolve());

            const result = await service.createRolesAndAddPermission(RoleType.SUPER_ADMIN, permissions);

            expect(result).toBeUndefined();
        });

        it('should assign permissions to existing role', async () => {
            const roles = [role];

            jest.spyOn(roleModel, 'find').mockResolvedValueOnce(roles);
            jest.spyOn(service, 'assignPermissionToRole').mockResolvedValueOnce(Promise.resolve());

            const result = await service.createRolesAndAddPermission(RoleType.SUPER_ADMIN, permissions);

            expect(result).toBeUndefined();
        });
    });

    describe('assignPermissionToRole', () => {
        it('should assign permission to role', async () => {
            const roleId = new Types.ObjectId('67c9d97e86f6888e28020abf').toString();
            const permissions = ['role.create', 'role.view'];

            jest.spyOn(permissionService, 'findByName').mockResolvedValueOnce({ _id: new Types.ObjectId() } as any);
            jest.spyOn(permissionService, 'create').mockResolvedValueOnce({ _id: new Types.ObjectId() } as any);
            jest.spyOn(rolePermissionService, 'create').mockResolvedValueOnce(Promise.resolve() as any);

            const result = await service.assignPermissionToRole(roleId, permissions);

            expect(result).toBeUndefined();
        });

        // it('should throw an error if permission creation fails', async () => {
        //     const roleId = new Types.ObjectId('67c9d97e86f6888e28020abf').toString();
        //     const permissions = ['role.create'];

        //     jest.spyOn(permissionService, 'findByName').mockResolvedValueOnce(null);
        //     jest.spyOn(permissionService, 'create').mockRejectedValue(new Error('Permission creation failed'));

        //     await expect(service.assignPermissionToRole(roleId, permissions)).rejects.toThrow(
        //         'Permission creation failed',
        //     );
        // });
    });
});
