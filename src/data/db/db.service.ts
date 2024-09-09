import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { IUserPost } from 'src/api/blog/types';
import { IUserComment } from 'src/api/comments/types';
import { Role } from 'src/guards/role.guard';

@Injectable()
export class DbService {
  private _users = [
    {
      id: 0,
      type: [Role.Admin, Role.User],
      name: 'Admin',
      login: 'admin',
      pass: `475b7fc4bc333875fef1087d894607bce4920670d199717113e99908ba6894cbd06328296e329d6567ad64cf82761b1767b1e4f3a728c42fa1e3a284df7fdf02`,
      salt: `a5c4659b9a9f8f8c8ceca3a69de389b59e66c9b64de6b5c09a2c7d178c46326c`,
      activeTokens: [],
    },
    {
      id: 1,
      type: [Role.User],
      name: 'user',
      login: 'user',
      pass: `475b7fc4bc333875fef1087d894607bce4920670d199717113e99908ba6894cbd06328296e329d6567ad64cf82761b1767b1e4f3a728c42fa1e3a284df7fdf02`,
      salt: `a5c4659b9a9f8f8c8ceca3a69de389b59e66c9b64de6b5c09a2c7d178c46326c`,
      activeTokens: [],
    },
  ];

  private _posts = [
    {
      id: 0,
      title: 'test',
      userId: 0,
      text: 'some test text',
    },
  ];

  private _comments = [
    {
      id: 0,
      userId: 0,
      postId: 0,
      text: 'some comment text',
    },
  ];

  async findUserByLogin(login: string) {
    return await Promise.resolve(
      this._users.find((user) => user.login === login),
    );
  }

  async findUserById(id: number) {
    return await Promise.resolve(this._users.find((user) => user.id === id));
  }

  async updateUser(user: any) {
    const index = this._users.findIndex((u) => u.id === user.id);
    return await Promise.resolve(
      (this._users[index] = { ...this._users[index], ...user }),
    );
  }

  async deleteUser(id: number) {
    const index = this._users.findIndex((u) => u.id === id);
    if (this._users[index].id === 0) {
      throw new NotAcceptableException();
    }
    this._users = this._users.splice(index, 1);
    return await Promise.resolve(true);
  }

  async createUser(user: any) {
    const nextId = this._users[this._users.length - 1].id + 1;
    this._users.push({ id: nextId, type: [Role.User], ...user });
    return Promise.resolve(this._users[this._users.length - 1]);
  }

  async getUsersPosts(userId: number) {
    return Promise.resolve(
      this._posts.filter((post) => post.userId === userId),
    );
  }

  async getUserPostById(userId: number, postId: number) {
    const post = this._posts
      .filter((post) => post.userId === userId)
      .find((post) => post.id === postId);
    if (!!post) {
      return Promise.resolve(post);
    }
    throw new NotFoundException();
  }

  async createUsersPost(userId: number, post: Partial<IUserPost>) {
    const nextIndex = this._posts[this._posts.length - 1].id + 1;
    this._posts.push({
      id: nextIndex,
      userId,
      title: post.title,
      text: post.text,
    });
    return Promise.resolve(this._posts[this._posts.length - 1]);
  }

  async editUserPost(
    userId: number,
    postId: number,
    post: Partial<IUserPost>,
    isAdmin: boolean,
  ) {
    let userPostIndex = this._posts
      .filter((post) => (!isAdmin ? post.userId === userId : true))
      .findIndex((post) => post.id === postId);
    if (!!this._posts[userPostIndex]) {
      this._posts[userPostIndex] = { ...this._posts[userPostIndex], ...post };
      return Promise.resolve(this._posts[userPostIndex]);
    }
    throw new ForbiddenException();
  }

  async deleteUserPost(userId: number, postId: number, isAdmin: boolean) {
    let userPostIndex = this._posts
      .filter((post) => (!isAdmin ? post.userId === userId : true))
      .findIndex((post) => post.id === postId);
    if (!!this._posts[userPostIndex]) {
      this._posts = this._posts.splice(userPostIndex, 1);
      return Promise.resolve(this._posts);
    }
    throw new ForbiddenException();
  }

  async getPostComments(postId: number) {
    return Promise.resolve(
      this._comments.filter((comment) => comment.postId === postId),
    );
  }

  async createComment(
    userId: number,
    postId: number,
    comment: Partial<IUserComment>,
  ) {
    const nextId = this._comments[this._comments.length - 1].id + 1;
    const newComment: IUserComment = {
      id: nextId,
      userId,
      postId,
      text: comment.text,
    };
    this._comments.push(newComment);
    return Promise.resolve(newComment);
  }

  async editComment(
    userId: number,
    postId: number,
    commentId: number,
    comment: Partial<IUserComment>,
    isAdmin: boolean
  ) {
    const index = this._comments.filter(c => c.userId === userId || isAdmin).findIndex(c => c.postId === postId && c.id === commentId);
    if(index === -1) {
      throw new NotFoundException();
    }
    this._comments[index] = {...this._comments[index], text: comment.text}
    return Promise.resolve(this._comments[index]);
  }

  async deleteComment(
    userId: number,
    postId: number,
    commentId: number,
    isAdmin: boolean
  ) {
    const index = this._comments.filter(c => c.userId === userId || isAdmin).findIndex(c => c.postId === postId && c.id === commentId);
    if(index === -1) {
      throw new NotFoundException();
    }
    this._comments = this._comments.slice(index, 1);
    return Promise.resolve(this._comments);
  }
}
