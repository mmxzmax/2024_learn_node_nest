import { Injectable } from '@nestjs/common';
import { DbService } from 'src/data/db/db.service';
import { IUser } from './types';

@Injectable()
export class UserService {
    constructor(private _db: DbService) {}
    async getUserByLogin(login: string) {
        return await this._db.findUserByLogin(login) as unknown as Promise<IUser>;
    }
}
