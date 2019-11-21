import {
  Controller,
  Res,
  Put,
  Post,
  Get,
  PathParams,
  BodyParams,
  Delete,
  Authenticated,
  Req,
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { SolicitudService } from "../services/db/SolicitudService";
import { CreateRequest } from "../models/request/CreateRequest";
import { UpdateRequest } from "../models/request/UpdateRequest";

@Controller("/requests")
@Authenticated()
export class RequestController {
  constructor(private solicitudService: SolicitudService) {}

  @Post()
  async addRequest(
    @Req() req,
    @BodyParams() request: CreateRequest,
    @Res() res
  ) {
    try {
      let user = req.user;
      const result = await this.solicitudService.createRequest(
        request,
        user.id
      );

      if (!result) {
        res
          .status(HTTPStatusCodes.CONFLICT)
          .json(ResponseErrorJson(HTTPStatusCodes.CONFLICT, result, "El automovil solicitado no está disponible"));
      } else {
        res
          .status(HTTPStatusCodes.OK)
          .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
      }
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

  @Put("/:requestId")
  async updateRequest(
    @Req() req,
    @BodyParams() request: UpdateRequest,
    @Res() res,
    @PathParams("requestId") requestId: number
  ) {
    try {
      let user = req.user;
      const result = await this.solicitudService.updateRequest(
        request,
        requestId,
        user.id
      );
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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
  async getAllRequest(@Res() res) {
    try {
      const result = await this.solicitudService.getAllRequest();
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Get("/unconfirmed")
  async getUnconfirmedRequests(@Res() res) {
    try {
      const result = await this.solicitudService.getUnconfirmedRequest();
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Delete("/:requestId")
  async deleteRequest(@Res() res, @PathParams("requestId") requestId: number) {
    try {
      const result = await this.solicitudService.deleteRequest(requestId);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Get("/byCar/:carId")
  async getAllRequestsPending(@Res() res, @PathParams("carId") carId: number) {
    try {
      const data = await this.solicitudService.getPedingRequests(carId);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, data, HTTPStatus.OK));
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
