import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/createPermission.dto';

describe('PermissionService', () => {
    let service: PermissionService;
    let permissionModel: Model<Permission>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PermissionService,
                {
                    provide: getModelToken(Permission.name),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<PermissionService>(PermissionService);
        permissionModel = module.get<Model<Permission>>(getModelToken(Permission.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create permission', async () => {
            const permissionObj = {
                name: 'demo.view',
                status: 'active',
                details: 'demo.view Permission',
            } as CreatePermissionDto;

            jest.spyOn(permissionModel, 'create').mockResolvedValueOnce(permissionObj as any);

            const result = await service.create(permissionObj);
            expect(result).toEqual(permissionObj);
        });
    });

    describe('findAll', () => {
        it('should return all permissions', async () => {
            const permissions = ['project.create', 'project.view'];

            jest.spyOn(permissionModel, 'find').mockImplementationOnce(
                () =>
                    ({
                        exec: jest.fn().mockResolvedValueOnce(permissions),
                    }) as any,
            );

            const result = await service.findAll();
            expect(result).toEqual(permissions);
        });
    });

    describe('findByName', () => {
        it('should return permission by name', async () => {
            const permissions = [{}];

            jest.spyOn(permissionModel, 'findOne').mockResolvedValueOnce(permissions);

            const result = await service.findByName('project.create');
            expect(result).toEqual(permissions);
        });
    });
});
