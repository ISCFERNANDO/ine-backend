import {
  Controller,
  Authenticated,
  Get,
  Req,
  Res,
  QueryParams
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseErrorJson, ResponseOkJson } from "../models/response";
import { ReportesService } from "../services/db/ReportesService";

@Controller("/reports")
@Authenticated()
export class ReporteController {
  constructor(private reportsService: ReportesService) {}

  @Get("/requests")
  async requestReports(
    @Req() req,
    @Res() res,
    @QueryParams("carsId") carsId: string,
    @QueryParams("dateInit") dateInit: string,
    @QueryParams("dateEnd") dateEnd: string
  ) {
    try {
      const data = await this.reportsService.requestReports(
        carsId.split(","),
        dateInit,
        dateEnd
      );
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
