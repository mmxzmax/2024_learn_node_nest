import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './repositories/roles.entity';
import { TokenEntity } from './repositories/tokens.entity';
import { UserEntity } from './repositories/user.entity';
import { UserResolver } from './user.resolver';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, TokenEntity]), BlogModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UserResolver
  ],
  exports: [UserService],
})
export class UserModule {}
