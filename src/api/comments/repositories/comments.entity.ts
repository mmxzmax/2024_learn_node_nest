import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BlogEntity } from "../../blog/repositories/blog.entity";
import { UserEntity } from "src/api/user/repositories/user.entity";


@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text:string;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity

  @ManyToOne(() => BlogEntity, (post) => post.id)
  post: BlogEntity
}