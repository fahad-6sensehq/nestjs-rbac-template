import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRoleDto } from './dtos/createUserRole.dto';
import { UserRole, UserRoleDocument } from './entities/userRole.entity';

@Injectable()
export class UserRoleService {
    constructor(
        @InjectModel(UserRole.name)
        private readonly userRoleModel: Model<UserRoleDocument>,
    ) {}

    async create(createUserRoleDto: CreateUserRoleDto) {
        return await this.userRoleModel.create(createUserRoleDto);
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
