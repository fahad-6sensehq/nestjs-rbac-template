import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TrimAndValidateString } from 'common/validators/trim-string.validator';

export class CreateTenantDto {
    @TrimAndValidateString()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String })
    domain: string;
}
