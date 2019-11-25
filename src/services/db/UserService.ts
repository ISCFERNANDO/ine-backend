import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateUser } from "../../models/request/CreateUser";
import { throws } from "assert";
import {
  UserLoginResponse,
  Accesse,
} from "../../models/response/UserLoginResponse";
import { JsonWebToken } from "../../utils/JsonWebToken";
import { UserType } from "../../models/response/UserType";

@Service()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  async login(userLogin: CreateUser) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_LOGIN;
      let sqlData = [userLogin.email, userLogin.password];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let user: UserLoginResponse;
      console.log(resultSet);
      if (resultSet && resultSet.length > 0 && resultSet[0].length > 0) {
        user = resultSet[0][0];
        user.accesses = resultSet[1];
        let jwt: JsonWebToken = new JsonWebToken();
        user.token = await jwt.generateJWT(user);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(user: CreateUser) {
    try {
      let sqlQuery: string =
        STORED_PROCEDURES.CREATE_UPDATE.SP_CREATE_UPDATE_USER;
      let sqlData = [
        user.name,
        user.firstLastName,
        user.secondLastName,
        user.email,
        user.password,
        user.areaId,
        user.userId,
        user.active,
        user.userType,
      ];
      await this.dbService.query(sqlQuery, sqlData);
      return true;
    } catch (err) {
      return new throws(err);
    }
  }

  async update(user: CreateUser) {
    try {
      let sqlQuery: string =
        STORED_PROCEDURES.CREATE_UPDATE.SP_CREATE_UPDATE_USER;
      let sqlData = [
        user.name,
        user.firstLastName,
        user.secondLastName,
        user.email,
        user.password,
        user.areaId,
        user.userId,
        user.active,
        user.userType,
      ];
      await this.dbService.query(sqlQuery, sqlData);
      return true;
    } catch (err) {
      return err;
    }
  }

  async getTypesUser() {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_USER_TYPES;
      let resultSet = await this.dbService.query(sqlQuery);
      let userTypes: UserType[] = resultSet;
      return userTypes;
    } catch (err) {
      throw err;
    }
  }
}
