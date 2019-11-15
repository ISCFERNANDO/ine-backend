import {
  Controller,
  Get,
  Req,
  Res,
  Next,
  Authenticated,
  Required,
  HeaderParams
} from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { AreaService } from "../services/db/AreaService";

@Controller("/areas")
@Authenticated()
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  async getAllArea(
    @Req() req,
    @Res() res,
    @Next() next,
    @Required() @HeaderParams("authorization") authorization: string
  ) {
    try {
      const result = await this.areaService.getAreas();
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
