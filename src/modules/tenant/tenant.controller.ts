import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTenantDto } from 'modules/tenant/dtos/createTenant.dto';
import { TenantService } from 'modules/tenant/tenant.service';

@Controller('tenant')
export class TenantController {
    constructor(private readonly tenantService: TenantService) {}

    @Post()
    async create(@Body() tenant: CreateTenantDto) {
        return await this.tenantService.create(tenant);
    }

    @Get()
    async findAll() {
        return await this.tenantService.findAll();
    }

    @Get('role-permissions')
    async rolePermissions() {
        return await this.tenantService.rolePermissions();
    }

    @Get('warmup')
    async warmup() {
        return await this.tenantService.warmup();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.tenantService.findOneById(id);
    }
}
