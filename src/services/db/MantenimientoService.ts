import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateMantenimiento } from "../../models/request/CreateMantenimiento";

@Service()
export class MantenimientoService {
  constructor(private dbService: DatabaseService) {}

  async createMaintenance(maintenance: CreateMantenimiento) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_ADD_MANITENANCE;
      let sqlData = [
        maintenance.vehiculoId,
        maintenance.kilometraje,
        maintenance.motivoServicio,
        maintenance.lugar,
        maintenance.fechaInicioServicio,
        maintenance.fechaEntrega,
        maintenance.observaciones,
        maintenance.ordenServicioFileName,
        maintenance.ordenServicioFile,
        maintenance.facturaFileName,
        maintenance.facturaFile
      ];

      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      const maintenanceId = resultSet[0].id;
      //asociar los archivos
      sqlQuery = STORED_PROCEDURES.CREATE_UPDATE.SP_UPDATE_FILE_TO_MAINTENANCE;
      const promises = [];
      for (const fileId of maintenance.files) {
        sqlData = [fileId, maintenanceId];
        promises.push(this.dbService.query(sqlQuery, sqlData));
      }
      if (promises.length > 0) {
        await Promise.all(promises);
      }
      return true;
    } catch (err) {
      return err;
    }
  }
}
