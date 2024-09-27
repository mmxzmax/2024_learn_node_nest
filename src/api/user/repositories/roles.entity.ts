import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "src/guards/role.guard";
import { UserEntity } from "./user.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";


@Entity()
@ObjectType()
export class RoleEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  role: Role;

  @Field(type => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity
}