import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleEntity } from "../roles/roles.entity";
import { TokenEntity } from "../tokens/tokens.entity";


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  name: string;

  @Column("varchar", { length: 50 })
  login: string;

  @Column("varchar", { length:  200})
  pass: string;

  @Column("varchar", { length:  200})
  salt: string;

  @OneToMany(() => RoleEntity, (role) => role.user)
  type: RoleEntity[];

  @OneToMany(() => TokenEntity, (role) => role.user)
  activeTokens: TokenEntity[]
}