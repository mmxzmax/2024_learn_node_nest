import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { BlogEntity } from "../blog/blog.entity";


@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length:  1024})
  text:string;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity

  @ManyToOne(() => BlogEntity, (post) => post.id)
  post: BlogEntity
}