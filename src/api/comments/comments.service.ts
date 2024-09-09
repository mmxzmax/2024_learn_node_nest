import { Injectable } from '@nestjs/common';
import { DbService } from 'src/data/db/db.service';
import { IUser } from '../user/types';
import { Role } from 'src/guards/role.guard';
import { IUserComment } from './types';

@Injectable()
export class CommentsService {
  constructor(private _db: DbService) {}

  async getPostComments(postId: number, user: IUser) {
    return (await this._db.getPostComments(postId)).map((item) => ({
      ...item,
      canEdit: user.type.includes(Role.Admin) || item.userId === user.id,
    }));
  }

  async createComment(
    postId: number,
    user: IUser,
    comment: Partial<IUserComment>,
  ) {
    return await this._db.createComment(user.id, postId, comment);
  }

  async editComment(
    postId: number,
    commentId: number,
    user: IUser,
    comment: Partial<IUserComment>,
  ) {
    return await this._db.editComment(
      user.id,
      postId,
      commentId,
      comment,
      user.type.includes(Role.Admin) || user.type.includes(Role.Moderator),
    );
  }

  async deleteComment(
    postId: number,
    commentId: number,
    user: IUser,
  ) {
    return await this._db.deleteComment(
      user.id,
      postId,
      commentId,
      user.type.includes(Role.Admin) || user.type.includes(Role.Moderator),
    );
  }
}
