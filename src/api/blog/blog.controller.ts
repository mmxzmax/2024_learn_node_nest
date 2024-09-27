import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Role, Roles } from 'src/guards/role.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreatePostDto } from './blog-dto';
import { UserEntity } from '../user/repositories/user.entity';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Roles(Role.User)
  @Get()
  posts(@GetUser() user: UserEntity) {
    return this.blogService.userPosts(user.id);
  }

  @Roles(Role.User)
  @Put()
  createPost(@GetUser() user: UserEntity, @Body() post: CreatePostDto) {
    return this.blogService.createPost(user.id, post);
  }

  @Roles(Role.User)
  @Get(':postId')
  async post(@GetUser() user: UserEntity, @Param('postId', ParseIntPipe) postId: number) {
    return this.blogService.userPost(user.id, postId);
  }

  @Roles(Role.User, Role.Admin)
  @Post(':postId')
  async editPost(@GetUser() user: UserEntity, @Param('postId', ParseIntPipe) postId: number, @Body() post: CreatePostDto) {
    return this.blogService.editPost(user.id, postId, post, !!user.type.find(t => t.role));
  }

  @Roles(Role.User, Role.Admin)
  @Delete(':postId')
  async deletePost(@GetUser() user: UserEntity, @Param('postId', ParseIntPipe) postId: number, @Body() post: CreatePostDto) {
    return this.blogService.deletePost(user.id, postId, !!user.type.find(t => t.role));
  }
}
