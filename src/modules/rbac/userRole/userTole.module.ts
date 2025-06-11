import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleController } from 'modules/rbac/userRole/userRole.controller';
import { UserRole, UserRoleSchema } from './entities/userRole.entity';
import { UserRoleService } from './userRole.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserRole.name, schema: UserRoleSchema }])],
    controllers: [UserRoleController],
    providers: [UserRoleService],
    exports: [UserRoleService, MongooseModule],
})
export class UserRoleModule {}
