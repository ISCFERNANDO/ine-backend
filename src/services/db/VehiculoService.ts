import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { VehiculoResponse } from "../../models/response/VehiculoResponse";
import { CreateCar } from "../../models/request/CreateCar";

@Service()
export class VehiculoService {
  constructor(private dbService: DatabaseService) {}

  async getVehiculos() {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_VEHICULO;
      const resultSet = await this.dbService.query(sqlQuery);
      let areas: VehiculoResponse[] = resultSet;
      return areas;
    } catch (err) {
      return err;
    }
  }

  async addCar(car: CreateCar) {
    try {
      const sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_ADD_CAR;
      const sqlData = [
        car.placa,
        car.description,
        car.category,
        car.year,
        car.model,
        car.color,
        car.mileage,
        car.image_name
      ];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      console.log(resultSet);
      return resultSet;
    } catch (err) {
      throw err;
    }
  }
}
