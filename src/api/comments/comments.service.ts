import { Injectable, NotAcceptableException } from '@nestjs/common';
import { IUserComment } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/repositories/user.entity';
import { BlogEntity } from '../blog/repositories/blog.entity';
import { CommentEntity } from './repositories/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async getPostComments(postId: number, user: UserEntity) {
    const post = await this.blogRepository.findOne({
      where: {id: postId, user }
    });
    return await this.commentRepository.find({
      where: {user, post}
    })
  }

  async createComment(
    postId: number,
    user: UserEntity,
    comment: Partial<IUserComment>,
  ) {
    const post = await this.blogRepository.findOne({
      where: {id: postId, user }
    });
    const newComment = this.commentRepository.create({text: comment.text, user, post});
    await this.commentRepository.save(newComment);
    return {ok: true};
  }

  async editComment(
    postId: number,
    commentId: number,
    user: UserEntity,
    comment: Partial<IUserComment>,
  ) {
    const post = await this.blogRepository.findOne({
      where: {id: postId, user }
    });
    const existComment = await this.commentRepository.findOneBy({id: commentId, post});
    if(existComment.user.id === user.id) {
      const editedComment = this.commentRepository.merge(existComment, {text: comment.text});
      await this.commentRepository.save(editedComment);
      return {ok: true};
    }
    throw new NotAcceptableException();
  }

  async deleteComment(postId: number, commentId: number, user: UserEntity) {
    const post = await this.blogRepository.findOne({
      where: {id: postId, user }
    });
    const existComment = await this.commentRepository.findOneBy({id: commentId, post});
    if(existComment.user.id === user.id) {
      await this.commentRepository.delete({id: commentId});
      return {ok: true};
    }
    throw new NotAcceptableException();
  }
}
