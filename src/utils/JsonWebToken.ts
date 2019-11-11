import * as jwt from "jsonwebtoken";
import * as settings from "../settings";
export class JsonWebToken {
  async generateJWT(user: any) {
    let payload = {
      id: user.id,
      email: user.email,
      firstLastName: user.firstLastName,
      name: user.name,
      secondLastName: user.secondLastName,
      areaId: user.areaId,
    };
    let token = await jwt.sign(payload, settings.JWT.KEY, {
      expiresIn: settings.JWT.LIFE_TIME, //24 horas 60 * 60 * 24
    });
    return token;
  }
}
