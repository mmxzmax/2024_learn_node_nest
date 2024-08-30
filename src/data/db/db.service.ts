import { Injectable } from '@nestjs/common';
import { EnumUserRoles } from '../types';

@Injectable()
export class DbService {
  private readonly _users = [
    {
      id: 0,
      type: EnumUserRoles.ADMIN,
      name: 'Admin',
      login: 'admin',
      pass: `21bf59b17569f7976e36a9af80103b0d9bf395cd9d41ae3fab55315cb180ac32c5068b9a1ed3c3b984c898e3a62e60a48b30b0440a9b278d0699f8c0b5f5c1c7`,
      salt: `a5c4659b9a9f8f8c8ceca3a69de389b59e66c9b64de6b5c09a2c7d178c46326c`
    },
  ];

  async findUserByLogin(login: string) {
    return await Promise.resolve(this._users.find(user => user.login === login));
  }

  async findUserById(id: number) {
    return await Promise.resolve(this._users.find(user => user.id === id));
  }
}
