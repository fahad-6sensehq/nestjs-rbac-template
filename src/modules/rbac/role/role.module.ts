import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionModule } from 'modules/rbac/permission/permission.module';
import { UserModule } from 'modules/user/user.module';
import { RolePermissionModule } from '../rolePermission/rolePermission.module';
import { Role, RoleSchema } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [
        JwtModule.register({}),
        PermissionModule,
        RolePermissionModule,
        UserModule,
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService, MongooseModule],
})
export class RoleModule {}
