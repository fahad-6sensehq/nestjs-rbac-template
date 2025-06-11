import { DefaultStatusEnum } from 'common/enums/status.enum';
import { generateUUID } from 'common/utils/generateUUID';
import { CreatePermissionDto } from 'modules/rbac/permission/dtos/createPermission.dto';
import { CreateTenantDto } from 'modules/tenant/dtos/createTenant.dto';
import { CreateUserDto } from 'modules/user/dtos/createUser.dto';
import { IUser, UserStatusEnum } from 'modules/user/interface/user.interface';

export class ConstructObjectFromDto {
    static constructCreateTenantObject(tenant: CreateTenantDto) {
        const secret = generateUUID();

        return { name: tenant.name, secret, domain: tenant.domain ?? null };
    }

    static constructCreateRoleObject(name: string) {
        return { name, status: DefaultStatusEnum.ACTIVE, details: `${name} Role` };
    }

    static constructCreatePermissionObject(createPermissionDto: CreatePermissionDto) {
        return {
            name: createPermissionDto.name,
            status: DefaultStatusEnum.ACTIVE,
            details: `${createPermissionDto.name} Permission`,
        };
    }

    static constructCreateUserObject(newUser: CreateUserDto, user: IUser) {
        return {
            email: newUser.email ?? null,
            password: newUser.password ?? null,
            name: newUser.name ?? null,
            status: newUser.status ?? null,
            role: newUser.role ?? null,
            resetLink: null,
            createdBy: user.userId ?? null,
            tenantId: user.tenantId ?? null,
        };
    }

    static constructMainAdminObject(user: any) {
        return {
            email: user.email ?? null,
            password: user.password ?? null,
            name: user.name ?? null,
            status: UserStatusEnum.ACTIVE,
            role: user.role ?? null,
            resetLink: null,
            createdBy: user.createdBy ?? null,
            tenantId: user.tenantId ?? null,
        };
    }
}
