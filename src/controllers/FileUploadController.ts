import { Controller, Authenticated, Post } from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { FileUploadService } from "../services/utils/FileUploadService";

@Controller("/upload")
@Authenticated()
export class FileUploadController {
  constructor(private uploadService: FileUploadService) {}

  @Post("/maintenanceFile")
  async uploadMaintenanceFile(req, res) {
    try {
      const result = await this.uploadService.uploadFileMaintenance(
        req,
        res,
        "MANTENIMIENTO"
      );
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
