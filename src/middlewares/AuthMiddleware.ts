import {
  Req,
  IMiddleware,
  EndpointInfo,
  EndpointMetadata,
  Res,
  OverrideMiddleware,
  AuthenticatedMiddleware
} from "@tsed/common";
import { HTTPStatusCodes } from "../types/http";
import { ResponseErrorJson } from "../models/response";
import { JsonWebToken } from "../utils/JsonWebToken";

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleware implements IMiddleware {
  async use(
    @EndpointInfo() endpoint: EndpointMetadata,
    @Req() req: any,
    @Res() res: any
  ) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res
          .status(HTTPStatusCodes.UNAUTHORIZED)
          .json(
            ResponseErrorJson(
              HTTPStatusCodes.UNAUTHORIZED,
              "Usuario o contraseña incorrectos"
            )
          );
      }
      let jwt: JsonWebToken = new JsonWebToken();
      req.user = await jwt.validateToken(token);
      console.log("USER", req.user);
    } catch (err) {
      res
        .status(HTTPStatusCodes.FORBIDDEN)
        .json(
          ResponseErrorJson(
            HTTPStatusCodes.UNAUTHORIZED,
            "La sesión ha caducado. Favor de iniciar sesión."
          )
        );
    }
  }
}
