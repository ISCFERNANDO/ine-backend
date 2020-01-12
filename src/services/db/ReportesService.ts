import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { RequestReportsResponse } from "../../models/response/RequestReportsResponse";

@Service()
export class ReportesService {
  constructor(private dbService: DatabaseService) {}

  async requestReports(carsId: string[], dateInit = null, dateEnd = null) {
    try {
      const sqlQuery = STORED_PROCEDURES.GET.SP_GET_REQUEST_REPORTS;
      const sqlData = [dateInit, dateEnd, null];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let response: RequestReportsResponse[] = resultSet;
      response = response.filter(item => carsId.includes(item.vehiculoId.toString()));
      return response;
    } catch (err) {
      throw err;
    }
  }
}
