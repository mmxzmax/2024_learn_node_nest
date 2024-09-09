import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Role, Roles } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IUser } from '../user/types';
import { CreatePostDto } from './blog-dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Roles(Role.User)
  @Get()
  posts(@GetUser() user: IUser) {
    return this.blogService.userPosts(user.id);
  }

  @Roles(Role.User)
  @Put()
  createPost(@GetUser() user: IUser, @Body() post: CreatePostDto) {
    return this.blogService.createPost(user.id, post);
  }

  @Roles(Role.User)
  @Get(':postId')
  async post(@GetUser() user: IUser, @Param('postId', ParseIntPipe) postId: number) {
    return this.blogService.userPost(user.id, postId);
  }

  @Roles(Role.User, Role.Admin)
  @Post(':postId')
  async editPost(@GetUser() user: IUser, @Param('postId', ParseIntPipe) postId: number, @Body() post: CreatePostDto) {
    return this.blogService.editPost(user.id, postId, post, user.type.includes(Role.Admin));
  }

  @Roles(Role.User, Role.Admin)
  @Post(':postId')
  async deletePost(@GetUser() user: IUser, @Param('postId', ParseIntPipe) postId: number, @Body() post: CreatePostDto) {
    return this.blogService.deletePost(user.id, postId, user.type.includes(Role.Admin));
  }
}
