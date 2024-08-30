import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync, timingSafeEqual, randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<{ access_token: string }> {
    const user = await this._userService.getUserByLogin(login);
    if (!!user) {
      const hashedPassword = pbkdf2Sync(pass, Buffer.from(user.salt), 10000, 64, 'sha512').toString('hex');
      if (hashedPassword !== user.pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, login: user.login, name: user.name };
      return {
        access_token: await this._jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
