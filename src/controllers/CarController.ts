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
import { APP } from "../settings";
const multer = require("multer");

@Controller("/cars")
@Authenticated()
export class CarController {
  hostMedia: string = `${APP.MEDIA}cars/`;
  upload = multer({ dest: "media/cars/uploads/" }).single("image");
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
      if (result[0].code === 0) {
        res
          .status(HTTPStatusCodes.CONFLICT)
          .json(
            ResponseOkJson(
              HTTPStatusCodes.CONFLICT,
              result[0],
              result[0].message
            )
          );
      } else {
        res
          .status(HTTPStatusCodes.OK)
          .json(ResponseOkJson(HTTPStatusCodes.OK, result[0], "OK"));
      }
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }

  @Post("/image")
  async uploadFile(req, res) {
    try {
      this.upload(req, res, function(err) {
        console.log(req.file);
        if (err instanceof multer.MulterError) {
          res
            .status(HTTPStatusCodes.BAD_REQUEST)
            .json(
              ResponseOkJson(
                HTTPStatusCodes.BAD_REQUEST,
                {},
                "No se proporciono un archivo"
              )
            );
          return;
        } else if (err) {
          res
            .status(HTTPStatusCodes.BAD_REQUEST)
            .json(
              ResponseOkJson(
                HTTPStatusCodes.BAD_REQUEST,
                {},
                "No se proporciono un archivo"
              )
            );
          return;
        }
      });
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, {}, "OK"));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }

  @Get("/catalog")
  async getCatalogCars(@Req() req, @Res() res, @Next() next) {
    try {
      const result = await this.vehiculoService.getCatalogCars();
      if (Array.isArray(result)) {
        result.forEach(item => (item.image_name = this.hostMedia + item.image_name));
      }

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
