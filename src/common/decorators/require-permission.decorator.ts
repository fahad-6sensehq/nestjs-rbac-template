import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionGuard } from 'common/guards/permission.guard';

export function RequirePermissions(
    ...permissions: string[]
): <TFunction extends Function, Y>(
    target: object | TFunction,
    propertyKey?: string | symbol,
    descriptor?: TypedPropertyDescriptor<Y>,
) => void {
    return applyDecorators(SetMetadata('permissions', permissions), UseGuards(PermissionGuard));
}
