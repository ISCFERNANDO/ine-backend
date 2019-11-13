import { Controller, Get, Req, Res, Next } from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseOkJson, ResponseErrorJson } from "../models/response";
import { EmailService } from "../services/utils/EmailService";
import { EmailRequest } from "../models/request/EmailRequest";

@Controller("/email")
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get()
  async send(@Req() req, @Res() res, @Next() next) {
    try {
      let emailRequest: EmailRequest = new EmailRequest(
        "",
        "iscluis@hotmail.com",
        "Prueba de envio",
        "",
        "<p>Este es un parrafo</p>"
      );
      const result = await this.emailService.send(emailRequest);
      res
        .status(HTTPStatusCodes.OK)
        .json(ResponseOkJson(HTTPStatusCodes.OK, result, "OK"));
    } catch (err) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ResponseErrorJson(HTTPStatusCodes.INTERNAL_SERVER_ERROR, err));
    }
  }
}
