import { IsNotEmpty, Max, Min } from "class-validator";
import { Role } from "src/guards/role.guard";


export class EditUserDto {
    @IsNotEmpty()
    @Max(50)
    name: string;
}

export class EditFullUserDto {
    @IsNotEmpty()
    @Max(50)
    name: string;
    @IsNotEmpty()
    type: Role[];
}



export class CreateUserDto {
    @IsNotEmpty()
    @Max(50)
    name: string;
    @IsNotEmpty()
    @Max(50)
    login: string;
    @IsNotEmpty()
    @Min(6)
    pass: string;
}