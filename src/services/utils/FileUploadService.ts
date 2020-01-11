import { Service } from "@tsed/di";
import { DatabaseService } from "../db/database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
const multer = require("multer");
const dirs = {
  MANTENIMIENTO: "./media/mantenimiento/",
  CARS: "./media/cars/upload"
};
@Service()
export class FileUploadService {
  constructor(private dbService: DatabaseService) {}

  async uploadFileMaintenance(req, res, dir) {
    try {
      const storage = this.buildStorage(dir);
      const file: any = await this.uploadFile(req, res, storage);
      const sqlQuery = STORED_PROCEDURES.CREATE_UPDATE.SP_ADD_FILE_MAINTENANCE;
      const sqlData = [file.originalname];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      console.log(file);
      console.log(resultSet);
      //save to db
      return resultSet[0];
    } catch (err) {
      throw err;
    }
  }

  buildStorage(dir) {
    return multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, dirs[dir]);
      },
      filename: function(req, file, callback) {
        callback(null, file.originalname);
      }
    });
  }

  async uploadFile(req, res, storage) {
    return new Promise((resolve, reject) => {
      try {
        const upload = multer({ storage }).single("file");
        upload(req, res, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(req.file);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
