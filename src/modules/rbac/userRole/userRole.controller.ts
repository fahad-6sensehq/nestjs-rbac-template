import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRoleDto } from './dtos/createUserRole.dto';
import { UserRoleService } from './userRole.service';

@Controller('user-role')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) {}

    @Post()
    create(@Body() createUserRoleDto: CreateUserRoleDto) {
        return this.userRoleService.create(createUserRoleDto);
    }

    // @Get()
    // findAll() {
    //     return this.userRoleService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.userRoleService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateUserRoleDto: UpdateUserRoleDto,
    // ) {
    //     return this.userRoleService.update(+id, updateUserRoleDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.userRoleService.remove(+id);
    // }
}
