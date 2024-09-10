import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleEntity } from "../roles/roles.entity";
import { TokenEntity } from "../tokens/tokens.entity";


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  pass: string;

  @Column()
  salt: string;

  @OneToMany(() => RoleEntity, (role) => role.user)
  type: RoleEntity[];

  @OneToMany(() => TokenEntity, (role) => role.user)
  activeTokens: TokenEntity[]
}