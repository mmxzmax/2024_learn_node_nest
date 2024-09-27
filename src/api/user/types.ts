import { Role } from "src/guards/role.guard";

export interface IUser {
    id: number;
    type: Role[];
    name: string;
    login: string;
    pass: string;
    salt: string;
    activeTokens: string[];
}