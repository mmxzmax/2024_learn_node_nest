import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";


@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length:  500})
  token: string;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity
}