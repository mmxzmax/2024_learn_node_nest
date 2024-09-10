import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from 'src/data/repository/blog/blog.entity';
import { UserEntity } from 'src/data/repository/user/user.entity';
import { CommentEntity } from 'src/data/repository/comments/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, BlogEntity, UserEntity])],
  controllers: [CommentsController],
  providers: [CommentsService,  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class CommentsModule {}
