import { Property } from "@tsed/common";

export class CreateIncidence {
  @Property()
  vehiculoId: number;
  @Property()
  conductor: string;
  @Property()
  kilometraje: string;
  @Property()
  fechaIncidencia: string;
  @Property()
  numeroReporteSeguro: number;
  @Property()
  reporteSeguroFileName: string;
  @Property()
  reporteSeguroFile: string;
  @Property()
  descripcionIncidencia: string;
}
