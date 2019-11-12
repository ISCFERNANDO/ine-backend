import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateIncidence } from "../../models/request/CreateIncidence";

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
}
