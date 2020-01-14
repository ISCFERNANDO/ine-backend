import { Property } from "@tsed/common";

export interface DocumentosMantenimiento {
  id: number;
  name: string;
  mantenimientoId?: number;
  urlDocumento?: string;
  active?: boolean;
  visible?: boolean;
}

export class MaintenanceReportResponse {
  @Property()
  mantenimientoId: number;
  @Property()
  vehiculoId: number;
  @Property()
  modeloVehiculo: string;
  @Property()
  placaVehiculo: string;
  @Property()
  fechaEntradaVehiculo: string;
  @Property()
  fechaSalida: string;
  @Property()
  motivoServicio: string;
  @Property()
  servicioRealizado: string;
  @Property()
  documentos?: DocumentosMantenimiento[];
}
