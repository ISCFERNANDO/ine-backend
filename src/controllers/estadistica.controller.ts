import { Controller, Req, Res, Next, Authenticated, Get } from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { EstadisticaService } from "../services/db/estadistica.service";

@Controller("/statistic")
@Authenticated()
export class EstadisticaController {
  constructor(private estadisticaService: EstadisticaService) {}

  @Get('/requestsCars')
  async getSolicitudesAutomoviles(@Req() req, @Res() res, @Next() next) {
    try {
      const result = await this.estadisticaService.getSolicitudesAutomoviles();
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
