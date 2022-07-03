import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddUserDto } from './dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUser(@Param() id: string) {
    return this.userService.queryUserByID(id);
  }

  @Post()
  async addUser(@Body() user: AddUserDto) {
    if (await this.userService.queryUserByAccount(user.account)) {
      return {
        code: 400,
        msg: 'User already',
      };
    }
    user.password = await bcrypt.hash(user.password, 10);
    const data = await this.userService.addUser(user);
    return {
      code: 0,
      data: { id: data._id },
      msg: 'success',
    };
  }
}
