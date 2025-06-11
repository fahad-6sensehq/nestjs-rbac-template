import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { NoSpaces } from 'common/decorators/nospace.decorator';

export class SetPasswordDto {
    @IsNotEmpty({ message: 'Token is Required' })
    @ApiProperty({ type: String })
    token: string;

    @IsNotEmpty({ message: 'New password is required' })
    @NoSpaces({ message: 'Password requirements not fulfilled' })
    @ApiProperty({ type: String })
    password: string;

    @IsNotEmpty({ message: 'Confirm new password is required' })
    @NoSpaces({ message: 'C Password requirements not fulfilled' })
    @ApiProperty({ type: String })
    confirmPassword: string;
}

export class VerifyTokenDto {
    @IsNotEmpty({ message: 'Token is Required' })
    @ApiProperty({ type: String })
    token: string;
}
