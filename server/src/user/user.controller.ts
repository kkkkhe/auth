import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Routes } from '../../utils/utils';
import { UserDto } from './types';
@Controller(Routes.Users)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }
}