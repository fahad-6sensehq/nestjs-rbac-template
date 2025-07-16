import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'modules/rbac/role/entities/role.entity';
import { UserTenantRoleModule } from 'modules/rbac/userTenantRole/userTenantRole.module';
import { UserController } from 'modules/user/user.controller';
import { UserService } from 'modules/user/user.service';
import { User, UserSchema } from './entities/user.entity';
import { UserSession, UserSessionSchema } from './entities/userSession.entity';

@Module({
    imports: [
        JwtModule.register({}),
        UserTenantRoleModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserSession.name, schema: UserSessionSchema },
            { name: Role.name, schema: RoleSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
