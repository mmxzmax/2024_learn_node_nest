import {
  Args,
  Int,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './repositories/user.entity';
import { BlogService } from '../blog/blog.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(
    private userService: UserService,
    private blogService: BlogService,
  ) {}

  @Query((returns) => UserEntity)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @ResolveField()
  async posts(@Parent() user: UserEntity) {
    const { id } = user;
    return this.blogService.userPosts(id);
  }

  @Mutation((returns) => UserEntity)
  async changeUserName(
    @Args({ name: 'userId', type: () => Int }) id: number,
    @Args({ name: 'newName', type: () => String }) name: string,
  ) {
    return this.userService.editUserData(id, { name });
  }
}
