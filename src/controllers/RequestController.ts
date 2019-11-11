import {
  Controller,
  Res,
  Put,
  Post,
  Get,
  PathParams,
  BodyParams,
} from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { SolicitudService } from "../services/db/SolicitudService";
import { CreateRequest } from "../models/request/CreateRequest";
import { UpdateRequest } from "../models/request/UpdateRequest";

@Controller("/requests")
export class RequestController {
  constructor(private solicitudService: SolicitudService) {}

  @Post()
  async addRequest(@BodyParams() request: CreateRequest, @Res() res) {
    try {
      const result = await this.solicitudService.createRequest(request);

      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }

  @Put("/:requestId")
  async updateRequest(
    @BodyParams() request: UpdateRequest,
    @Res() res,
    @PathParams("requestId") requestId: number
  ) {
    try {
      const result = await this.solicitudService.updateRequest(
        request,
        requestId
      );
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
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
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }
}
