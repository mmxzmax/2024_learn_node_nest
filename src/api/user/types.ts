import { EnumUserRoles } from "src/data/types";

export interface IUser {
    id: number;
    type: EnumUserRoles;
    name: string;
    login: string;
    pass: string;
    salt: string;
}