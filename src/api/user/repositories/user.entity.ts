import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleEntity } from "./roles.entity";
import { TokenEntity } from "./tokens.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BlogEntity } from "src/api/blog/repositories/blog.entity";


@Entity()
@ObjectType()
export class UserEntity {

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  login: string;

  @Column()
  pass: string;

  @Column()
  salt: string;

  @Field(type => [RoleEntity], { nullable: 'items' })
  @OneToMany(() => RoleEntity, (role) => role.user)
  type: RoleEntity[];

  @OneToMany(() => TokenEntity, (role) => role.user)
  activeTokens: TokenEntity[]

  @Field(type => [BlogEntity], { nullable: 'items' })
  posts: BlogEntity

}