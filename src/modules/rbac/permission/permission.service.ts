import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructObjectFromDto } from 'common/instances/constructObjectFromDTO';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './entities/permission.entity';
import { CreatePermissionDto } from './dtos/createPermission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission.name)
        private readonly permissionModel: Model<PermissionDocument>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        const permissionObj = ConstructObjectFromDto.constructCreatePermissionObject(createPermissionDto);
        return await this.permissionModel.create(permissionObj);
    }

    async findAll() {
        return await this.permissionModel.find().exec();
    }

    async findByName(name: string) {
        return this.permissionModel.findOne({ name });
    }
}
