import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'modules/user/user.module';
import { Permission, PermissionSchema } from './entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
        MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    ],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService, MongooseModule],
})
export class PermissionModule {}
