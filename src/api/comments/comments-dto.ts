import { IsNotEmpty, Max } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @Max(1024)
    text: string;
}