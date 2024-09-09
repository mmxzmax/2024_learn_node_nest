import { IsNotEmpty } from "class-validator";
import { Role } from "src/guards/role.guard";


export class EditUserDto {
    @IsNotEmpty()
    name: string;
}

export class EditFullUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    type: Role[];
}



export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    login: string;
    @IsNotEmpty()
    pass: string;
}