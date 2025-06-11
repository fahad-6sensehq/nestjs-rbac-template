import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'common/strategies/access-token.strategy';
import { AuthController } from 'modules/auth/auth.controller';
import { AuthService } from 'modules/auth/auth.service';
import { TenantModule } from 'modules/tenant/tenant.module';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [JwtModule.register({}), UserModule, TenantModule],
    providers: [AuthService, AccessTokenStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
