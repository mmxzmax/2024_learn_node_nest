import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { extractTokenFromHeader } from 'src/helpers/helpers';
import { UserService } from 'src/api/user/user.service';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const request = context?.switchToHttp()?.getRequest() ?? ctx?.getContext()?.req;
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
      const user = await this.userService.getUserById(payload.sub);
      if(user.activeTokens.find(t => t.token === token)) {
        request['user'] = user;
      } else {
        throw new Error('inactive token');
      }
    } catch {
      this.userService.deleteToken(token);
      throw new UnauthorizedException();
    }
    return true;
  }
}
