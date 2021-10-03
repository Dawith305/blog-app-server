import { UserType } from "./user.types";

export class UserResposeInterface{
    user: UserType & {token : string};
}