import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { IUser } from './types';
import { pbkdf2Sync, randomBytes } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/data/repository/roles/roles.entity';
import { TokenEntity } from 'src/data/repository/tokens/tokens.entity';
import { UserEntity } from 'src/data/repository/user/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/guards/role.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {
    this.getUserById(1).then((user) => {
      if (!user) {
        this.createNewUser({
          name: 'admin',
          login: 'admin',
          pass: 'changeit',
          type: [Role.Admin],
        });
      }
    });
  }

  async deleteUser(id: number) {
    if (id === 1) {
      throw new NotAcceptableException();
    }
    await this.usersRepository.delete(id);
  }

  async getUserByLogin(login: string) {
    return await this.usersRepository.findOne({
      where: { login },
      relations: ['type', 'activeTokens'],
    });
  }
  async getUserById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['type', 'activeTokens'],
    });
  }
  async editUserData(id: number, user: Partial<IUser>) {
    const existingUser = await this.getUserById(id);
    const roles = [...(user.type ?? [])].map((role) =>
      this.roleRepository.create({ role }),
    );
    await Promise.all(roles.map((role) => this.roleRepository.save(role)));
    const tokens = [...(user.activeTokens ?? [])].map((token) =>
      this.tokenRepository.create({ token }),
    );
    await Promise.all(tokens.map((token) => this.tokenRepository.save(token)));
    const userData = this.usersRepository.merge(existingUser, {
      name: user?.name ?? existingUser.name,
      type: roles,
      activeTokens: tokens,
    });
    return await this.usersRepository.save(userData);
  }

  async deleteToken(token: string) {
    const existingToken = await this.tokenRepository.findOneBy({token});
    if(existingToken) {
      return await this.tokenRepository.delete(existingToken.id);
    }
    return null;
  }

  async deleteUserById(id: number) {
    return await this.usersRepository.delete(id);
  }
  async createNewUser(user: Partial<IUser>) {
    const salt = randomBytes(10).toString('hex');
    const pass = pbkdf2Sync(user.pass, salt, 10000, 64, 'sha512').toString(
      'hex',
    );
    const roles = [...(user.type ?? []), Role.User].map((role) =>
      this.roleRepository.create({ role }),
    );
    await Promise.all(roles.map((role) => this.roleRepository.save(role)));
    const { name, login } = user;
    const userData = this.usersRepository.create({
      type: roles,
      name,
      login,
      pass,
      salt,
      activeTokens: [],
    });
    return await this.usersRepository.save(userData);
  }
}
