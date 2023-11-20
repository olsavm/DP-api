import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from '../auth/local.auth.guard';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post / signup
  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassword);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      msg: 'User logged in',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): any {
    console.log('REQUESTED GET HELLO', req.user);
    return {
      User: req.user,
      msg: 'PROTECTED ENDPOINT',
    };
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
