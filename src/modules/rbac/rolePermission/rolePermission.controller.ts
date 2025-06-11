import { Body, Controller, Post } from '@nestjs/common';
import { CreateRolePermissionDto } from 'modules/tenant/dtos/createRolePermission.dto';
import { RolePermissionService } from './rolePermission.service';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) {}

    @Post()
    create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto);
    }

    // @Get()
    // findAll() {
    //     return this.rolePermissionService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.rolePermissionService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    //     return this.rolePermissionService.update(+id, updateRolePermissionDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.rolePermissionService.remove(+id);
    // }
}
