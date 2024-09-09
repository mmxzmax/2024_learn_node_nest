import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditFullUserDto, EditUserDto } from './userDto';
import { Role, Roles } from 'src/guards/role.guard';
import { Public } from 'src/guards/auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUser } from './types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.User)
  @Get()
  async profile(@GetUser() user: IUser) {
    const { name, login } = await this.userService.getUserById(user.id);
    return { name, login };
  }

  @Public()
  @Put()
  async registerUser(@Body() user: CreateUserDto) {
    const { id, name, login } = await this.userService.createNewUser(user);
    return { id, name, login };
  }

  @Roles(Role.User)
  @Post()
  editProfile(@GetUser() user: IUser, @Body() data: EditUserDto) {
    const id = user.id;
    return this.userService.editUserData({ id, ...data });
  }

  @Roles(Role.Admin)
  @Delete(':id')
  deleteProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Roles(Role.Admin)
  @Post(':id')
  editProfileByID(
    @Body() user: EditFullUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.editUserData({ id, ...user });
  }
}
