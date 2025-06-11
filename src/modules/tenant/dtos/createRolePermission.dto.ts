import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
    @ApiProperty({ type: String })
    roleId: string;

    @ApiProperty({ type: String })
    permissionId: string;
}
