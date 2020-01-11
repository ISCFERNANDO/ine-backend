import { Property } from "@tsed/common";

export class CreateMantenimiento {
  @Property()
  vehiculoId: number;
  @Property()
  kilometraje: number;
  @Property()
  motivoServicio: string;
  @Property()
  lugar: string;
  @Property()
  fechaInicioServicio: string;
  @Property()
  fechaEntrega: string;
  @Property()
  observaciones: string;
  @Property()
  ordenServicioFileName: string;
  @Property()
  ordenServicioFile: string;
  @Property()
  facturaFileName: string;
  @Property()
  facturaFile: string;
  @Property()
  files: number[];
}
