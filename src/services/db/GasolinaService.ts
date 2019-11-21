import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CatalogoGasolinaResponse } from "../../models/response/CatalogoGasolinaResponse";

@Service()
export class GasolinaService {
  constructor(private dbService: DatabaseService) {}

  async getCatGasoline() {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_GASOLINE;
      const resultSet = await this.dbService.query(sqlQuery);
      let catGasolinas: CatalogoGasolinaResponse[] = resultSet;
      return catGasolinas;
    } catch (err) {
      throw err;
    }
  }
}
