import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware,
} from "@tsed/common";
import "@tsed/swagger";
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const rootDir = __dirname;
@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 3000,
  httpsPort: false,
  mount: {
    "/api/v1": `${rootDir}/controllers/**/**.{js,ts}`,
  },
  swagger: [
    {
      path: "/api-docs-v1"
    }
  ]
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $onMountingMiddlewares(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use((req, res, next) => {
        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");
        // Request methods you wish to allow
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        // Request headers you wish to allow
        res.setHeader(
          "Access-Control-Allow-Headers",
          "X-Requested-With, Content-Type, Authorization"
        );
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", true);
        req.header(
          "accepts",
          "image/x-icon,image/x-xbitmap,image/x-win-bitmap,image/png,image/bmp,image/x-bmp,image/tiff,image/x-ms-bmp,image/jpeg,image/gif,image/ico,application/json"
        );
        req.header(
          "accept",
          "image/x-icon,image/x-xbitmap,image/x-win-bitmap,image/png,image/bmp,image/x-bmp,image/tiff,image/x-ms-bmp,image/jpeg,image/gif,image/ico,application/json"
        );
        req.header("accept-language", "en-MX;q=1.0, es-MX;q=0.9");
        req.header("accept-encoding", "gzip, deflate");
        req.header("Content-Type", "*/*");
        // Pass to next layer of middleware
        next();
      });

    return null;
  }
}
