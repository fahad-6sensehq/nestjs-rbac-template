import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    confirmNewPassword: string;
}
