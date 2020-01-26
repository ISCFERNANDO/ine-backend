import {
  Controller,
  Res,
  Put,
  Post,
  Get,
  PathParams,
  BodyParams,
  Delete,
  Authenticated,
  Req
} from "@tsed/common";
import { HTTPStatusCodes, HTTPStatus } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { SolicitudService } from "../services/db/SolicitudService";
import { CreateRequest } from "../models/request/CreateRequest";
import { UpdateRequest } from "../models/request/UpdateRequest";
import { EmailService } from "../services/utils/EmailService";
import { ExcelService } from "../services/utils/Excel.service";
import { APP } from "../settings";

@Controller("/requests")
export class RequestController {
  HOST_NAME: string = APP.HOST_NAME;
  constructor(
    private solicitudService: SolicitudService,
    private emailService: EmailService,
    private excelService: ExcelService
  ) {}

  @Authenticated()
  @Post()
  async addRequest(
    @Req() req,
    @BodyParams() request: CreateRequest,
    @Res() res
  ) {
    try {
      let user = req.user;
      const result = await this.solicitudService.createRequest(
        request,
        user.id
      );

      if (!result) {
        res
          .status(HTTPStatusCodes.CONFLICT)
          .json(
            ResponseErrorJson(
              HTTPStatusCodes.CONFLICT,
              result,
              "El automovil solicitado no está disponible"
            )
          );
      } else {
        if (request.sendMail) {
          //generate excel
          await this.excelService.createExcel(request);
          const dataExcel: any = await this.excelService.readFile(
            "media/reporte/excel/reporte.xlsx"
          );

          let mails = await this.solicitudService.getMails();
          mails = mails.map(item => item.mail);
          //send mail

          await this.emailService.send({
            from: "",
            html: `
              <div>
                <p>Se ha generado una nueva solicitud</p>
                <br>
                <a href="${this.HOST_NAME}requests/confirm/${result.id}">Confirmar solicitud</a>
              <div>
            `,
            subject: "",
            text: "Notificación de registro de solicitud",
            to: mails,
            attachments: [
              {
                filename: "Solicitud de vehículo.xlsx",
                content: Buffer.from(dataExcel)
              }
            ]
          });
        }
        res
          .status(HTTPStatusCodes.OK)
          .json(ResponseOkJson(HTTPStatusCodes.OK, result, HTTPStatus.OK));
      }
    } catch (err) {
      console.log(err);
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

  @Authenticated()
  @Put("/:requestId")
  async updateRequest(
    @Req() req,
    @BodyParams() request: UpdateRequest,
    @Res() res,
    @PathParams("requestId") requestId: number
  ) {
    try {
      let user = req.user;
      const result = await this.solicitudService.updateRequest(
        request,
        requestId,
        user.id
      );
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Authenticated()
  @Get()
  async getAllRequest(@Res() res, @Req() req) {
    try {
      let user = req.user;
      const result = await this.solicitudService.getAllRequest(user.id);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Authenticated()
  @Get("/unconfirmed")
  async getUnconfirmedRequests(@Res() res, @Req() req) {
    try {
      let user = req.user;
      const result = await this.solicitudService.getUnconfirmedRequest(user.id);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Authenticated()
  @Delete("/:requestId")
  async deleteRequest(@Res() res, @PathParams("requestId") requestId: number) {
    try {
      const result = await this.solicitudService.deleteRequest(requestId);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
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

  @Authenticated()
  @Get("/byCar/:carId")
  async getAllRequestsPending(
    @Res() res,
    @PathParams("carId") carId: number,
    @Req() req
  ) {
    try {
      let user = req.user;
      const data = await this.solicitudService.getPedingRequests(
        carId,
        user.id
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

  @Get("/confirm/:requestId")
  async confirmarSolicitud(
    @Res() res,
    @PathParams("requestId") requestId: number,
    @Req() req
  ) {
    try {
      const resp = await this.solicitudService.confirmarSolicitud(requestId);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(this.buildHtmlSuccess());
      res.end();
    } catch (err) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(this.buildHtmlError());
      res.end();
    }
  }

  buildHtmlSuccess() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          .alert {
            padding: 20px;
            background-color: #f44336;
            color: white;
            opacity: 1;
            transition: opacity 0.6s;
            margin-bottom: 15px;
          }
    
          .alert.success {
            background-color: #4caf50;
          }
        </style>
      </head>
      <body>
        <h2>Mensaje de confirmación</h2>
        <div class="alert success">
          <strong>La solicitud se ha confirmado exitosamente</strong>
        </div>
      </body>
    </html>    
    `;
  }

  buildHtmlError() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          .alert {
            padding: 20px;
            background-color: #f44336;
            color: white;
            opacity: 1;
            transition: opacity 0.6s;
            margin-bottom: 15px;
          }
    
          .alert.success {
            background-color: #4caf50;
          }
        </style>
      </head>
      <body>
        <h2>Mensaje de confirmación</h2>
        <div class="alert">
          <strong>No se pudo confirmar la solicitud</strong>
        </div
      </body>
    </html>    
    `;
  }
}
