import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    name: string;
}
