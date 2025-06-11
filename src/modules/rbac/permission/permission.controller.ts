import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequirePermissions } from 'common/decorators/require-permission.decorator';
import { CreatePermissionDto } from './dtos/createPermission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Post()
    @RequirePermissions('permission.create')
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }

    @Get()
    @RequirePermissions('permission.view')
    findAll() {
        return this.permissionService.findAll();
    }
}
