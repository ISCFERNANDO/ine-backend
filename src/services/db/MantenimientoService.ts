import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateMantenimiento } from "../../models/request/CreateMantenimiento";

@Service()
export class MantenimientoService {
  constructor(private dbService: DatabaseService) {}

  async createMaintenance(maintenance: CreateMantenimiento) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_CREATE_REQUEST;
      const sqlData = [
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
      await this.dbService.query(sqlQuery, sqlData);
      return true;
    } catch (err) {
      return err;
    }
  }
}
