import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { NestHelper } from 'common/instances/NestHelper';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwt: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (NestHelper.getInstance().isEmpty(authHeader)) {
            throw new UnauthorizedException();
        }

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException();
        }

        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2) {
            throw new UnauthorizedException();
        }

        const token = tokenParts[1];

        try {
            this.jwt.verify(token, { secret: this.configService.getOrThrow('JWT_SECRET') });
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        const payload: any = this.jwt.decode(token);
        if (NestHelper.getInstance().isEmpty(payload)) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.find(payload.userId);

        if (!user) {
            return false;
        }

        const userPermissions = new Set(user?.scopes.map((e: string) => e));
        const inScopes = permissions.some((perm) => userPermissions.has(perm));

        if (!inScopes) {
            throw new ForbiddenException();
        }

        // Attach user info to request for later use in JWT token
        request.user = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        };

        return true;
    }
}
