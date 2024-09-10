import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'node:crypto';
import { IUser } from '../user/types';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<{ access_token: string }> {
    const user = await this._userService.getUserByLogin(login);
    if (!!user) {
      const hashedPassword = pbkdf2Sync(
        pass,
        user.salt,
        10000,
        64,
        'sha512',
      ).toString('hex');
      if (hashedPassword !== user.pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, login: user.login, name: user.name };
      const token = await this._jwtService.signAsync(payload);
      this._userService.editUserData(user.id, {activeTokens: [token]});
      return {
        access_token: token,
      };
    }
    throw new UnauthorizedException();
  }

  async signOut(user: IUser, token: string): Promise<{ok: boolean}> {
    if(!!user) {
      await this._userService.deleteToken(token);
      return{ok: true};
    }
    throw new UnauthorizedException();
  }
}
