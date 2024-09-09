import { Injectable } from '@nestjs/common';
import { DbService } from 'src/data/db/db.service';
import { IUser } from './types';
import { pbkdf2Sync, randomBytes } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(private _db: DbService) {}
  async getUserByLogin(login: string) {
    return (await this._db.findUserByLogin(login)) as unknown as Promise<IUser>;
  }
  async getUserById(id: number) {
    return (await this._db.findUserById(id)) as unknown as Promise<IUser>;
  }
  async editUserData(user: Partial<IUser>) {
    return await this._db.updateUser(user);
  }

  async deleteUserById(id: number) {
    return await this._db.deleteUser(id);
  }
  async createNewUser(user: Partial<IUser>) {
    const salt = randomBytes(10);
    return await this._db.createUser({
      ...user,
      salt: salt.toString('hex'),
      pass: pbkdf2Sync(user.pass, salt, 10000, 64, 'sha512').toString('hex'),
    });
  }
}
