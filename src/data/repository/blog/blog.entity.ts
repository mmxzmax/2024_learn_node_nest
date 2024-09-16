import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";


@Entity()
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length:  1024})
  title:string;

  @Column()
  text:string;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity
}