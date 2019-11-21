import {
  Controller,
  Get,
  Res,
  Authenticated,
  Required,
  HeaderParams,
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { GasolinaService } from "../services/db/GasolinaService";

@Controller("/gasolinas")
@Authenticated()
export class GasolineController {
  constructor(private gasolineService: GasolinaService) {}

  @Get()
  async getCatGasolines(
    @Res() res,
    @Required() @HeaderParams("authorization") authorization: string
  ) {
    try {
      const result = await this.gasolineService.getCatGasoline();
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
