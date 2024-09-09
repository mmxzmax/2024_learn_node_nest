import { Injectable } from '@nestjs/common';
import { DbService } from 'src/data/db/db.service';
import { IUserPost } from './types';

@Injectable()
export class BlogService {
    constructor(private _db: DbService) {}

    async userPosts(userId: number) {
        return await this._db.getUsersPosts(userId);
    }

    async userPost(userId: number, postId: number) {
        return await this._db.getUserPostById(userId, postId);
    }

    async createPost(userId: number, post: Partial<IUserPost>) {
        return await this._db.createUsersPost(userId, post);
    }

    async editPost(userId: number, postId: number,  post: Partial<IUserPost>, isAdmin: boolean) {
        return await this._db.editUserPost(userId, postId, post, isAdmin);
    }

    async deletePost(userId: number, postId: number, isAdmin: boolean) {
        return await this._db.deleteUserPost(userId, postId, isAdmin);
    }
}
