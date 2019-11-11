import { CreateUser } from "../request/CreateUser";

export class UserLoginResponse extends CreateUser {
  token: string;
}
