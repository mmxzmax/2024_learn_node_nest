import { UserEntity } from "src/api/user/repositories/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";


@Entity()
@ObjectType()
export class BlogEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title:string;

  @Field()
  @Column()
  text:string;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity
}