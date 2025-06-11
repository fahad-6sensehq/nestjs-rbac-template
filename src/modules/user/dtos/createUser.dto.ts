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
    @IsNotEmpty()
    @ApiProperty({ type: String })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    receiveUpdate: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    status: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    role: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ type: String })
    projectId: string;

    // @IsOptional()
    // addressId: Types.ObjectId;

    // @IsOptional()
    // clientId: Types.ObjectId;

    // @IsOptional()
    // createdBy: Types.ObjectId;

    // @IsString()
    // @IsNotEmpty()
    // registrationType: string;

    // isVerified: boolean;

    // isRegistered: boolean;

    // avatar: string;
}
