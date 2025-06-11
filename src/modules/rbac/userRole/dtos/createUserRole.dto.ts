import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
    @ApiProperty({ type: String })
    userId: string;

    @ApiProperty({ type: String })
    roleId: string;

    @ApiProperty({ type: String })
    clientId: string;
}
