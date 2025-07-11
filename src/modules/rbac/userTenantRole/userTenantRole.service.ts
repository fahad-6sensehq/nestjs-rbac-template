import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserTenantRoleDto } from './dtos/createUserTenantRole.dto';
import { UserTenantRole, UserTenantRoleDocument } from './entities/userTenantRole.entity';

@Injectable()
export class UserTenantRoleService {
    constructor(
        @InjectModel(UserTenantRole.name)
        private readonly userRoleModel: Model<UserTenantRoleDocument>,
    ) {}

    async create(createUserTenantRoleDto: CreateUserTenantRoleDto) {
        return await this.userRoleModel.create(createUserTenantRoleDto);
    }

    // findAll() {
    //     return `This action returns all userRole`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} userRole`;
    // }

    // update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    //     return `This action updates a #${id} userRole`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} userRole`;
    // }
}
