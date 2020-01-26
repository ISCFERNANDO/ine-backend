import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { AreaResponse } from "../../models/response/AreaResponse";

@Service()
export class AreaService {
  constructor(private dbService: DatabaseService) {}

  async getAreas() {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_AREA;
      const resultSet = await this.dbService.query(sqlQuery);
      let areas: AreaResponse[] = resultSet;
      return areas;
    } catch (err) {
      return err;
    }
  }

  async getById(areaId: number){
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_AREA_BY_ID;
      let sqlData = [areaId];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      return resultSet[0];
    }catch(err){
      throw err;
    }
  }
}
