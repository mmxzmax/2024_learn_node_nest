import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { CommentsModule } from './api/comments/comments.module';
import { BlogModule } from './api/blog/blog.module';
import { DbModule } from './data/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    UserModule,
    BlogModule,
    DbModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
