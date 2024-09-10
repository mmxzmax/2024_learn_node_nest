import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { Role } from "src/guards/role.guard";


@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: Role;

  @ManyToOne(() => UserEntity, (user) => user.type)
  user: UserEntity
}