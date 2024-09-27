import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/repositories/user.entity';
import { BlogEntity } from '../blog/repositories/blog.entity';
import { CommentEntity } from './repositories/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, BlogEntity, UserEntity])],
  controllers: [CommentsController],
  providers: [CommentsService,  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class CommentsModule {}
