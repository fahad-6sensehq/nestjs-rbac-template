import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GetUser } from 'common/decorators/getUser.decorator';
import { RequirePermissions } from 'common/decorators/require-permission.decorator';
import { TenantCredentialsGuard } from 'common/guards/tenantAuthentication.guard';
import { TenantIdGetHelper } from 'common/instances/getTenantId.helper';
import { Request, Response } from 'express';
import { AuthService } from 'modules/auth/auth.service';
import { ForgetPassDto } from 'modules/auth/dtos/forgotPassword.dto';
import { LoginDto } from 'modules/auth/dtos/login.dto';
import { SetPasswordDto, VerifyTokenDto } from 'modules/auth/dtos/setPassword.dto';
import { CreateUserDto } from 'modules/user/dtos/createUser.dto';
import { IUser } from 'modules/user/interface/user.interface';
import mongoose from 'mongoose';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-up/main-admin')
    @UseGuards(TenantCredentialsGuard)
    async signUpMainAdmin(@Req() req: Request): Promise<IUser> {
        const createUser = req.body as CreateUserDto;
        const clientId = await TenantIdGetHelper.getTenantIdFromRequest(req);
        const clientObj = new mongoose.Types.ObjectId(clientId);

        return this.authService.signUpMainAdmin(createUser, clientObj);
    }

    @Post('sign-up/invite')
    @RequirePermissions('user.create')
    async signUp(@Body() createUser: CreateUserDto, @GetUser() user: IUser): Promise<IUser | void> {
        return this.authService.signUp(createUser, user);
    }

    @Post('sign-in')
    @UseGuards(TenantCredentialsGuard)
    async signIn(@Body() loginDto: LoginDto, @Res() res: Response): Promise<Response> {
        return this.authService.signIn(loginDto, res);
    }

    @Post('forgot-password')
    @UseGuards(TenantCredentialsGuard)
    async forgotPassword(@Body() forgetDto: ForgetPassDto, @Req() req: Request): Promise<any> {
        const clientId = await TenantIdGetHelper.getTenantIdFromRequest(req);

        return this.authService.sendForgetPasswordLink(forgetDto, clientId);
    }

    @Post('set-password')
    setPassword(@Body() resetDto: SetPasswordDto): Promise<IUser> {
        return this.authService.setPassword(resetDto);
    }

    @Post('token/verify')
    async tokenVerify(@Body() verifyTokenDto: VerifyTokenDto): Promise<any> {
        return await this.authService.tokenVerify(verifyTokenDto);
    }

    @Post('reset-password')
    resetPassword(@Body() resetDto: SetPasswordDto): Promise<IUser> {
        return this.authService.resetPassword(resetDto);
    }
}
