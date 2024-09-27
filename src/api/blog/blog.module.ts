import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/repositories/user.entity';
import { BlogEntity } from './repositories/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BlogEntity])],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [BlogService]
})
export class BlogModule {}
