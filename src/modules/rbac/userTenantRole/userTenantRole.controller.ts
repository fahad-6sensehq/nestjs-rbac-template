import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserTenantRoleDto } from './dtos/createUserTenantRole.dto';
import { UserTenantRoleService } from './userTenantRole.service';

@Controller('user-role')
export class UserTenantRoleController {
    constructor(private readonly userTenantRoleService: UserTenantRoleService) {}

    @Post()
    create(@Body() createUserTenantRoleDto: CreateUserTenantRoleDto) {
        return this.userTenantRoleService.create(createUserTenantRoleDto);
    }
}
