import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { CommentsModule } from './api/comments/comments.module';
import { BlogModule } from './api/blog/blog.module';
import { UserModule } from './api/user';
import { DbModule } from './data/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    BlogModule,
    UserModule,
    DbModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
