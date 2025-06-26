import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from 'app.config';
import { AuthModule } from 'modules/auth/auth.module';
import { DatabaseModule } from 'modules/database/database.module';
import { PermissionModule } from 'modules/rbac/permission/permission.module';
import { RoleModule } from 'modules/rbac/role/role.module';
import { RolePermissionModule } from 'modules/rbac/rolePermission/rolePermission.module';
import { UserRoleModule } from 'modules/rbac/userRole/userTole.module';
import { TenantModule } from 'modules/tenant/tenant.module';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        AuthModule,
        TenantModule,
        PermissionModule,
        RolePermissionModule,
        RoleModule,
        UserRoleModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    constructor(private readonly configService: ConfigService) {
        AppConfig.initialize(this.configService);
    }
}
