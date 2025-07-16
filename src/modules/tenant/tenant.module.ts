import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from 'modules/rbac/role/role.module';
import { TenantController } from 'modules/tenant/tenant.controller';
import { TenantService } from 'modules/tenant/tenant.service';
import { Tenant, TenantSchema } from './entities/tenant.entity';
import { TenantInvitation, TenantInvitationSchema } from './entities/tenantInvitation.entity';

@Module({
    imports: [
        RoleModule,
        MongooseModule.forFeature([
            { name: Tenant.name, schema: TenantSchema },
            { name: TenantInvitation.name, schema: TenantInvitationSchema },
        ]),
    ],
    providers: [TenantService],
    controllers: [TenantController],
    exports: [TenantService],
})
export class TenantModule {}
