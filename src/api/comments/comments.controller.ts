import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Role, Roles } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateCommentDto } from './comments-dto';
import { UserEntity } from '../user/repositories/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Roles(Role.User)
  @Get(':postId')
  posts(@GetUser() user: UserEntity, @Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getPostComments(postId, user);
  }

  @Roles(Role.User)
  @Put(':postId')
  createComment(
    @GetUser() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.createComment(postId, user, comment);
  }

  @Roles(Role.User, Role.Admin, Role.Moderator)
  @Post(':postId/:commentId')
  editComment(
    @GetUser() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.editComment(postId, commentId, user, comment);
  }

  @Roles(Role.User, Role.Admin, Role.Moderator)
  @Delete(':postId/:commentId')
  deleteComment(
    @GetUser() user: UserEntity,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.deleteComment(postId, commentId, user);
  }
}
