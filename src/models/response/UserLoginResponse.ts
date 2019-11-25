import { CreateUser } from "../request/CreateUser";

export interface Accesse{
  id: number;
  name: string;
  route: string;
}

export class UserLoginResponse extends CreateUser {
  token: string;
  accesses: Accesse[] = [];
}
