import { Controller, Res, Post, BodyParams, Authenticated, Req } from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { MantenimientoService } from "../services/db/MantenimientoService";
import { CreateMantenimiento } from "../models/request/CreateMantenimiento";

@Controller("/maintenances")
@Authenticated()
export class MaintenanceController {
  constructor(private maintenanceService: MantenimientoService) {}

  @Post()
  async createMaintenance(
    @Req() req,
    @BodyParams() maintenance: CreateMantenimiento,
    @Res() res
  ) {
    try {
      console.log(res);
      console.log(maintenance);
      const result = await this.maintenanceService.createMaintenance(
        maintenance
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
}
