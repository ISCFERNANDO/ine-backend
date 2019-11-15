import { Controller, Get, Req, Res, Next, Authenticated } from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { VehiculoService } from "../services/db/VehiculoService";

@Controller("/cars")
@Authenticated()
export class CarController {
  constructor(private vehiculoService: VehiculoService) {}

  @Get()
  async getAllCars(@Req() req, @Res() res, @Next() next) {
    try {
      const result = await this.vehiculoService.getVehiculos();
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
