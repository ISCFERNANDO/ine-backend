import {
  Controller,
  Res,
  Post,
  BodyParams,
  Authenticated,
  Get
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { IncidenceService } from "../services/db/IncidenceService";
import { CreateIncidence } from "../models/request/CreateIncidence";
import { APP } from "../settings";
import { IncidentResponse } from "../models/response/IncidentResponse";

@Controller("/incidences")
@Authenticated()
export class IncidenceController {
  hostMedia: string = `${APP.MEDIA}icons/`;
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

  @Get()
  async getCatalogIncidents(@Res() res) {
    try {
      const result: IncidentResponse[] = await this.incidenceService.getCatalogIncidents();
      if (Array.isArray(result)) {
        result.forEach(item => {
          if (item.icon) {
            item.icon = this.hostMedia + item.icon;
          }
        });
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
}
