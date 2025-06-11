import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermissionController } from 'modules/rbac/rolePermission/rolePermission.controller';
import { RolePermission, RolePermissionSchema } from './entities/rolePermission.entity';
import { RolePermissionService } from './rolePermission.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: RolePermission.name, schema: RolePermissionSchema }])],
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
    exports: [RolePermissionService, MongooseModule],
})
export class RolePermissionModule {}
