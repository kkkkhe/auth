import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Routes } from '../../utils/utils';
import { UserDto } from './dto/user.dto';
import { CheckTokenGuard } from '../token/guards/check-token.guard';
@Controller(Routes.Users)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @UseGuards(CheckTokenGuard)
  async getUser(
    @Session() session: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = await this.userService.findOne({ id });
    return UserDto.create(user);
  }
}
