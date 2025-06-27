import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        if (!permissions) return true;

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (NestHelper.getInstance().isEmpty(authHeader) || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException();
        }

        const token = authHeader.split(' ')[1];

        try {
            this.jwt.verify(token, { secret: this.configService.getOrThrow('JWT_SECRET') });
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        const payload: any = this.jwt.decode(token);
        if (!payload || !payload.userId) {
            throw new UnauthorizedException('Invalid token payload');
        }

        // Use token scopes if available
        let userPermissions: Set<string> = new Set();
        let inScopes: boolean = false;
        if (Array.isArray(payload.scopes)) {
            userPermissions = new Set(payload.scopes);
            inScopes = permissions.some((perm) => userPermissions.has(perm));

            if (inScopes) {
                request.user = {
                    userId: payload.userId,
                    email: payload.email,
                    role: payload.role,
                };
                return true;
            }
        }

        // Fallback: Fetch user from DB
        const user = await this.userService.find(payload.userId);
        if (!user) throw new UnauthorizedException();

        userPermissions = new Set(user.scopes);
        inScopes = permissions.some((perm) => userPermissions.has(perm));

        if (!inScopes) throw new ForbiddenException();

        request.user = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        return true;
    }
}
