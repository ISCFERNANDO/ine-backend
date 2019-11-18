import { Property } from "@tsed/common";

export class SolicitudPendienteResponse {
  @Property()
  id: number;
  @Property()
  applicant: string;
  @Property()
  dateOrder: string;
  @Property()
  dateDeliver: string;
  @Property()
  category: string;
  @Property()
  placa: string;
}
