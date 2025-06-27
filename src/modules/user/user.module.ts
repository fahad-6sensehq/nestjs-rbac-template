import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from 'modules/rbac/role/role.module';
import { UserRoleModule } from 'modules/rbac/userRole/userTole.module';
import { UserController } from 'modules/user/user.controller';
import { UserService } from 'modules/user/user.service';
import { User, UserSchema } from './entities/user.entity';
import { UserSession, UserSessionSchema } from './entities/userSession.entity';

@Module({
    imports: [
        JwtModule.register({}),
        UserRoleModule,
        forwardRef(() => RoleModule),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserSession.name, schema: UserSessionSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, MongooseModule],
})
export class UserModule {}
