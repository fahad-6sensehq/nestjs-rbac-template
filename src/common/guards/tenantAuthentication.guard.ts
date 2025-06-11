import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TenantService } from 'modules/tenant/tenant.service';

@Injectable()
export class ClientCredentialsGuard implements CanActivate {
    constructor(private tenantService: TenantService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const authParts = authHeader.split(' ');

        if (authParts.length !== 2 || authParts[0].toLowerCase() !== 'basic') {
            throw new UnauthorizedException('Invalid Authorization header format');
        }

        const credentials = Buffer.from(authParts[1], 'base64').toString('utf-8');
        const [tenantId, tenantSecret] = credentials.split(':');

        if (!tenantId || !tenantSecret) {
            throw new UnauthorizedException('Invalid tenant credentials');
        }

        const tenant = await this.tenantService.validateTenantCredentials(tenantId, tenantSecret);

        if (!tenant) {
            throw new UnauthorizedException('Invalid tenant credentials');
        }

        return true;
    }
}
