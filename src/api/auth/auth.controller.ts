import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Public } from 'src/guards/auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUser } from '../user/types';
import { extractTokenFromHeader } from 'src/helpers/helpers';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  signOut(@GetUser() user: IUser, @Req() request: Request,) {
    return this.authService.signOut(user, extractTokenFromHeader(request));
  }
}
