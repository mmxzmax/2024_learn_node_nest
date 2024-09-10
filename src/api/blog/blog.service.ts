import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { IUserPost } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/repository/user/user.entity';
import { Repository } from 'typeorm';
import { BlogEntity } from 'src/data/repository/blog/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}

  async userPosts(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return await this.blogRepository.find({
      where: { user },
    });
  }

  async userPost(userId: number, postId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    return await this.blogRepository.findOne({
      where: { user, id: postId },
    });
  }

  async createPost(userId: number, post: Partial<IUserPost>) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const newPost = this.blogRepository.create({
      title: post.title,
      text: post.text,
      user,
    });
    await this.blogRepository.save(newPost);
    return {ok: true}
  }

  async editPost(
    userId: number,
    postId: number,
    post: Partial<IUserPost>,
    isAdmin: boolean,
  ) {
    const existingPost = await this.blogRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (existingPost.user.id === userId || isAdmin) {
      const editedPost = this.blogRepository.merge(existingPost, {
        title: post.title,
        text: post.text,
      });
      await this.blogRepository.save(editedPost);
      return {ok: true}
    }
    throw new NotAcceptableException();
  }

  async deletePost(userId: number, postId: number, isAdmin: boolean) {
    const existingPost = await this.blogRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (existingPost?.user?.id === userId || isAdmin) {
      await this.blogRepository.delete({ id: postId });
      return {ok: true}
    }
    throw new NotFoundException();
  }
}
