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
import { MulterOptions, MultipartFile } from "@tsed/multipartfiles";

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

  /*@Post("/image")
  //@Responses("201", {description: "Created"})
  //@Responses("400", {description: "Bad Request"})
  @MulterOptions({ dest: `${process.cwd()}/.tmp` })
  async add(
    @Req() req,
    @Res() res,
    @Next() next,
    //@MultipartFile("file") file: Express.Multer.File
  ) {
    //let multerFile: Express.Multer.File;
    //console.log("file: ", file);

    try {
      if (!req.files) {
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
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, {}));
    }
  }*/
}
