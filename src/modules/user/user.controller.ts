import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { GetUser } from 'common/decorators/getUser.decorator';
import { RequirePermissions } from 'common/decorators/require-permission.decorator';
import { IUser, IUserListQuery } from 'modules/user/interface/user.interface';
import { UserService } from 'modules/user/user.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { EditUserStatusDto, UpdateUserDto } from './dtos/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: CreateUserDto, @GetUser() user: IUser): Promise<any> {
        return await this.userService.create(body, user);
    }

    @Get()
    @RequirePermissions('user.view')
    async findAll(@GetUser() user: IUser, @Query() query: IUserListQuery): Promise<{ data?: any[]; count?: number }> {
        return await this.userService.findAll(user, query);
    }

    @Post('unique-email')
    async isUniqueEmail(@Body('email') email: string): Promise<any> {
        return await this.userService.isUniqueEmail(email);
    }

    // @Post('avatar')
    // @UseInterceptors(FileInterceptor('file'))
    // @RequirePermissions('user.me')
    // async uploadAvatar(@UploadedFile() file: Express.Multer.File): Promise<{ avatar: string }> {
    //     return await this.userService.uploadAvatar(file);
    // }

    // @Get('avatar/remove')
    // @RequirePermissions('user.me')
    // async removeAvatar(@GetUser() user: IUser): Promise<{ success: boolean; message: string }> {
    //     return await this.userService.removeAvatar(user);
    // }

    @Put('status/:id')
    @RequirePermissions('user.update')
    async updateStatus(@Param('id') id: string, @Body() dto: EditUserStatusDto): Promise<IUser> {
        return await this.userService.updateStatus(id, dto.status);
    }

    @Patch('change-password/:id')
    @RequirePermissions('user.update')
    async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
        return await this.userService.changePassword(id, changePasswordDto);
    }

    @Get(':id')
    @RequirePermissions('user.view')
    async getUser(@Param('id') id: string, @GetUser() user: IUser): Promise<IUser> {
        return await this.userService.getUser(id, user);
    }

    @Patch(':id')
    @RequirePermissions('user.update')
    async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto, @GetUser() user: IUser): Promise<IUser> {
        return await this.userService.update(id, updateUser, user);
    }
}
