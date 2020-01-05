import {
  Controller,
  Get,
  Req,
  Res,
  Next,
  Authenticated,
  Post,
  BodyParams
} from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { VehiculoService } from "../services/db/VehiculoService";
import { CreateCar } from "../models/request/CreateCar";

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

  @Post()
  async addCar(
    @Req() req,
    @Res() res,
    @Next() next,
    @BodyParams() request: CreateCar
  ) {
    try {
      const result = await this.vehiculoService.addCar(request);
      if (result.code === 0) {
        res
          .status(HTTPStatusCodes.CONFLICT)
          .json(ResponseOkJson(HTTPStatusCodes.CONFLICT, result, "OK"));
      } else {
        res
          .status(HTTPStatusCodes.OK)
          .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
      }
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }
}
