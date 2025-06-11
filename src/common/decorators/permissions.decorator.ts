import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]): any => {
    return SetMetadata('permissions', permissions);
};
