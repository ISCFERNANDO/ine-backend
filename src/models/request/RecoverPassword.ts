import { Property } from "@tsed/common";

export class RecoverPassword {
  @Property()
  email: string;
  @Property()
  password: string;
}
