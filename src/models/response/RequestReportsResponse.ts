import { Property } from "@tsed/common";

export class RequestReportsResponse {
  @Property()
  vehiculoId: number;
  @Property()
  modeloVehiculo: string;
  @Property()
  placaVehiculo: string;
  @Property()
  nombreArea: string;
  @Property()
  conductor: string;
  @Property()
  fechaInicial: string;
  @Property()
  fechaFinal: string;
  @Property()
  kilometrajeInicial: string;
  @Property()
  gasolina: string;
}
