import { applyDecorators, UseGuards } from '@nestjs/common';
import { Permissions } from 'common/decorators/permissions.decorator';
import { PermissionGuard } from 'common/guards/permission.guard';

export function RequirePermissions(
    ...permissions: string[]
): <TFunction extends Function, Y>(
    target: object | TFunction,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y>,
) => void {
    return applyDecorators(Permissions(...permissions), UseGuards(PermissionGuard));
}
