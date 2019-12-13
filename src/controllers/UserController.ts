import {
  Controller,
  Get,
  Req,
  Res,
  Next,
  Post,
  Authenticated,
  Put,
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { UserService } from "../services/db/UserService";
import { CreateUser } from "../models/request/CreateUser";

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
      user.name = body.name;
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
      user.name = body.name;
      user.password = body.password;
      user.secondLastName = body.secondLastName;
      user.userId = body.id;
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
}
