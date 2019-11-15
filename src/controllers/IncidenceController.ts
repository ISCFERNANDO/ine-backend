import { Controller, Res, Post, BodyParams, Authenticated } from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { IncidenceService } from "../services/db/IncidenceService";
import { CreateIncidence } from "../models/request/CreateIncidence";

@Controller("/incidences")
@Authenticated()
export class IncidenceController {
  constructor(private incidenceService: IncidenceService) {}

  @Post()
  async createIncidence(@BodyParams() incidence: CreateIncidence, @Res() res) {
    try {
      const result = await this.incidenceService.createIncidence(incidence);
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
