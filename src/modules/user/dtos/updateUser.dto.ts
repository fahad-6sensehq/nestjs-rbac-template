import { IsEnum, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserStatusEnum } from '../interface/user.interface';

export class EditUserStatusDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(UserStatusEnum)
    status: UserStatusEnum;
}

export class UpdateUserDto {
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
    avatar: string;
}
