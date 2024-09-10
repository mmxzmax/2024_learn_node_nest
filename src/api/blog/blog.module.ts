import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/repository/user/user.entity';
import { BlogEntity } from 'src/data/repository/blog/blog.entity';

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
})
export class BlogModule {}
