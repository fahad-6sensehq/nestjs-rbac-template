import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPassDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'invalid_email' })
    @ApiProperty({ type: String })
    email: string;
}
