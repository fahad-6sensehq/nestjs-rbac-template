import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { GrantType } from 'modules/auth/enum/auth.enum';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    type: GrantType;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === GrantType.PASSWORD)
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === GrantType.PASSWORD)
    @ApiProperty({ type: String })
    password: string;

    @IsOptional()
    @IsBoolean()
    @ValidateIf((o) => o.type === GrantType.PASSWORD)
    @ApiProperty({ type: Boolean })
    remember: boolean;

    @IsString()
    @IsOptional()
    @ValidateIf((o) => o.type === GrantType.TOKEN)
    @ApiProperty({ type: String })
    token: string;
}
