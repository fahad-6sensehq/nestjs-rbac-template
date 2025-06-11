import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantController } from 'modules/tenant/tenant.controller';
import { TenantService } from 'modules/tenant/tenant.service';
import { Tenant, TenantSchema } from './entities/tenant.entity';
import { RoleModule } from 'modules/rbac/role/role.module';

@Module({
    imports: [RoleModule, MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }])],
    providers: [TenantService],
    controllers: [TenantController],
    exports: [TenantService],
})
export class TenantModule {}
