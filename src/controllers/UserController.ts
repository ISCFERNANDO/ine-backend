import {
  Controller,
  Get,
  Req,
  Res,
  Next,
  Post,
  Authenticated,
  Put,
  BodyParams
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { UserService } from "../services/db/UserService";
import { CreateUser } from "../models/request/CreateUser";
import { RecoverPassword } from "../models/request/RecoverPassword";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Authenticated()
  async createUser(@Req() req, @Res() res, @Next() next) {
    try {
      let user: CreateUser = new CreateUser();
      let body = req.body;
      user.name = body.name;
      user.active = true;
      user.areaId = body.areaId;
      user.email = body.email;
      user.firstLastName = body.firstLastName;
      user.password = body.password;
      user.secondLastName = body.secondLastName;
      user.userId = -1;
      user.userType = body.userType;

      const result = await this.userService.create(user);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
    } catch (err) {
      console.log(err);
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  @Put()
  @Authenticated()
  async updateUser(@Req() req, @Res() res, @Next() next) {
    try {
      let user: CreateUser = new CreateUser();
      let body = req.body;
      user.name = body.name;
      user.active = true;
      user.areaId = body.areaId;
      user.email = body.email;
      user.firstLastName = body.firstLastName;
      user.password = body.password;
      user.secondLastName = body.secondLastName;
      user.userId = body.id;
      user.userType = body.userTypeId;

      const result = await this.userService.create(user);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
    } catch (err) {
      console.log(err);
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  @Post("/login")
  async login(@Req() req, @Res() res, @Next() next) {
    try {
      let user: CreateUser = new CreateUser();
      user.email = req.body.email;
      user.password = req.body.password;
      const result = await this.userService.login(user);
      if (!result) {
        return res
          .status(HTTPStatusCodes.UNAUTHORIZED)
          .json(
            ResponseErrorJson(
              HTTPStatusCodes.UNAUTHORIZED,
              result,
              HTTPStatus.UNAUTHORIZED
            )
          );
      }
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  @Get("/userType")
  @Authenticated()
  async userTypes(@Req() req, @Res() res) {
    try {
      const result = await this.userService.getTypesUser();
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  @Get()
  @Authenticated()
  async getUsers(@Req() req, @Res() res) {
    try {
      const result = await this.userService.getUsers();
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }

  @Post("/recoverPassword")
  async recoverPassword(
    @Req() req,
    @Res() res,
    @BodyParams() recover: RecoverPassword
  ) {
    try {
      const result = await this.userService.recoverPassword(recover);
      console.log(result);
      if (result[0].code === 0) {
        res
          .status(HTTPStatusCodes.NOT_FOUND)
          .json(
            ResponseOkJson(HTTPStatusCodes.NOT_FOUND, result[0], result[0].message)
          );
      } else {
        res
          .status(HTTPStatusCodes.OK)
          .json(ResponseOkJson(HTTPStatusCodes.OK, result[0], result[0].message));
      }
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            err,
            HTTPStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  }
}
