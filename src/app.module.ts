import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from 'app.config';
import { AuthModule } from 'modules/auth/auth.module';
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
        MongooseModule.forRoot(`${appConfig.mongodbURL}${appConfig.serverType}_${appConfig.dbName}`),
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
export class AppModule {}
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(RequestTimingMiddleware).forRoutes('*');
//     }
// }
