import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { RequestReportsResponse } from "../../models/response/RequestReportsResponse";
import {
  MaintenanceReportResponse,
  DocumentosMantenimiento
} from "../../models/response/MaintenanceReportResponse";
import { APP } from "../../settings";

@Service()
export class ReportesService {
  hostMedia: string = `${APP.MEDIA}mantenimiento/`;
  constructor(private dbService: DatabaseService) {}

  async requestReports(carsId: string[], dateInit = null, dateEnd = null) {
    try {
      const sqlQuery = STORED_PROCEDURES.GET.SP_GET_REQUEST_REPORTS;
      const sqlData = [dateInit, dateEnd, null];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let response: RequestReportsResponse[] = resultSet;
      response = response.filter(item =>
        carsId.includes(item.vehiculoId.toString())
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async maintenanceReports(carsId: string[], dateInit = null, dateEnd = null) {
    try {
      let sqlQuery = STORED_PROCEDURES.GET.SP_GET_MAITENANCE_REPORTS;
      let sqlData = [dateInit, dateEnd];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let response: MaintenanceReportResponse[] = resultSet;
      response = response.filter(item =>
        carsId.includes(item.vehiculoId.toString())
      );

      //recorrer lista de mantenimientos y obtener sus archivos
      sqlQuery = STORED_PROCEDURES.GET.SP_GET_MANITENANCE_FILES_BY_MAINTENANCE;
      let filesMaintenanceRS;
      for (const maintenance of response) {
        sqlData = [maintenance.mantenimientoId];
        console.log(sqlData);
        filesMaintenanceRS = await this.dbService.query(sqlQuery, sqlData);
        maintenance.documentos = filesMaintenanceRS.map(item => {
          return {
            id: item.id,
            name: item.name,
            mantenimientoId: maintenance.mantenimientoId,
            urlDocumento: this.hostMedia + item.name,
            active: item.active,
            visible: item.visible
          };
        });
      }
      console.log('response', response);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
