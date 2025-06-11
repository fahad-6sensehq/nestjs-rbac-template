import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequirePermissions } from 'common/decorators/require-permission.decorator';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/createRole.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    @RequirePermissions('role.create')
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    @RequirePermissions('role.view')
    findAll() {
        return this.roleService.findAll();
    }
}
