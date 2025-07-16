import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTenantRoleController } from 'modules/rbac/userTenantRole/userTenantRole.controller';
import { UserTenantRole, UserTenantRoleSchema } from './entities/userTenantRole.entity';
import { UserTenantRoleService } from './userTenantRole.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserTenantRole.name, schema: UserTenantRoleSchema }])],
    controllers: [UserTenantRoleController],
    providers: [UserTenantRoleService],
    exports: [UserTenantRoleService],
})
export class UserTenantRoleModule {}
