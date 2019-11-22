export class CreateUser {
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  password: string;
  areaId: number;
  userType: number;
  userId: number;
  active: boolean;

  constructor(
    name?: string,
    firstLastName?: string,
    secondLastName?: string,
    email?: string,
    password?: string,
    areaId?: number,
    userId?: number,
    active?: boolean,
    userType?: number
  ) {
    this.name = name;
    this.firstLastName = firstLastName;
    this.secondLastName = secondLastName;
    this.email = email;
    this.password = password;
    this.areaId = areaId;
    this.userId = userId;
    this.active = active;
    this.userType = userType;
  }
}
