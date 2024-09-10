import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/data/repository/roles/roles.entity';
import { TokenEntity } from 'src/data/repository/tokens/tokens.entity';
import { UserEntity } from 'src/data/repository/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, TokenEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
