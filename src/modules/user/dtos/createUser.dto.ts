import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidEmail } from 'common/validators/isValidEmail.validator';

export class CreateUserDto {
    @IsString()
    @IsValidEmail({ message: 'Invalid email' })
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    status: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    role: string;
}
