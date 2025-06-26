import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.find(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        };
    }
}
