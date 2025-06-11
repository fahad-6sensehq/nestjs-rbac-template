import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRolePermissionDto } from 'modules/tenant/dtos/createRolePermission.dto';
import { Model } from 'mongoose';
import { RolePermission, RolePermissionDocument } from './entities/rolePermission.entity';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectModel(RolePermission.name)
        private readonly rolePermissionModel: Model<RolePermissionDocument>,
    ) {}

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const rolePermissionObj = {
            roleId: createRolePermissionDto.roleId,
            permissionId: createRolePermissionDto.permissionId,
        };

        const rolePermissionExists = await this.rolePermissionModel.find(rolePermissionObj).lean();

        if (rolePermissionExists.length > 0) {
            return rolePermissionExists[0];
        }

        const rolePermission = await this.rolePermissionModel.create(rolePermissionObj);

        return rolePermission;
    }

    // findAll() {
    //     return `This action returns all rolePermission`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} rolePermission`;
    // }

    // update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    //     return `This action updates a #${id} rolePermission`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} rolePermission`;
    // }
}
