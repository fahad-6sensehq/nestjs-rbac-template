import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructObjectFromDto } from 'common/instances/constructObjectFromDTO';
import { ExceptionHelper } from 'common/instances/ExceptionHelper';
import { Model } from 'mongoose';
import { IPermission } from '../permission/interface/permission.interface';
import { PermissionService } from '../permission/permission.service';
import { RolePermissionService } from '../rolePermission/rolePermission.service';
import { CreateRoleDto } from './dtos/createRole.dto';
import { Role, RoleDocument } from './entities/role.entity';
import { IRole } from './interface/role.interface';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
        private readonly permissionService: PermissionService,
        private readonly rolePermissionService: RolePermissionService,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<IRole> {
        try {
            return await this.roleModel.create(createRoleDto);
        } catch (error) {
            if (error?.code === 11000) {
                ExceptionHelper.getInstance().defaultError(
                    'Role already exists',
                    'role_already_exists',
                    HttpStatus.CONFLICT,
                );
            }

            return error;
        }
    }

    async findByName(role: string): Promise<IRole> {
        return await this.roleModel.findOne({ name: role });
    }

    async findAll(): Promise<IRole[]> {
        return await this.roleModel.find().exec();
    }

    async createRolesAndAddPermission(name: string, permissions: string[]): Promise<void> {
        const roleExists = await this.roleModel.find({ name });
        let role: IRole;
        if (roleExists.length === 0) {
            const roleObj = ConstructObjectFromDto.constructCreateRoleObject(name);
            role = await this.roleModel.create(roleObj);
        } else {
            role = roleExists[0];
        }
        await this.assignPermissionToRole(role._id.toString(), permissions);
    }

    async assignPermissionToRole(roleId: string, permissions: string[]): Promise<void> {
        for (const permission of permissions) {
            let permissionObj = await this.permissionService.findByName(permission);

            if (!permissionObj) {
                permissionObj = await this.permissionService.create({ name: permission });
            }

            await this.rolePermissionService.create({
                roleId: roleId.toString(),
                permissionId: permissionObj._id.toString(),
            });
        }
        return;
    }
}
