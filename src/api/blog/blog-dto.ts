import { IsNotEmpty, Max } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @Max(1024)
    title: string;
    @IsNotEmpty()
    text: string;
}