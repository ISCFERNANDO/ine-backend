import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateIncidence } from "../../models/request/CreateIncidence";
import { IncidentResponse } from "../../models/response/IncidentResponse";

@Service()
export class IncidenceService {
  constructor(private dbService: DatabaseService) {}

  async createIncidence(incidence: CreateIncidence) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_ADD_INCIDENCE;
      const sqlData = [
        incidence.vehiculoId,
        incidence.conductor,
        incidence.kilometraje,
        incidence.fechaIncidencia,
        incidence.numeroReporteSeguro,
        incidence.reporteSeguroFileName,
        incidence.reporteSeguroFile,
        incidence.descripcionIncidencia,
      ];
      await this.dbService.query(sqlQuery, sqlData);
      return true;
    } catch (err) {
      return err;
    }
  }

  async getCatalogIncidents(): Promise<IncidentResponse[] | any> {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_CATALOG_INCIDENTS;
      let resultSet = await this.dbService.query(sqlQuery);
      let incident: IncidentResponse[] = resultSet;
      return incident;
    } catch (err) {
      throw err;
    }
  }
}
