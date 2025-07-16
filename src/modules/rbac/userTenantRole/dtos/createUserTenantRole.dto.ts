import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTenantRoleDto {
    @ApiProperty({ type: String })
    userId: string;

    @ApiProperty({ type: String })
    roleName: string;

    @ApiProperty({ type: String })
    roleId: string;

    @ApiProperty({ type: String })
    tenantId: string;
}
