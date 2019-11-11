import { Property } from "@tsed/common";
import { CreateRequest } from "../request/CreateRequest";

export class SolicitudResponse extends CreateRequest {
  @Property()
  id: number;
  @Property()
  createdAt: string;
  @Property()
  updatedAt: string;
  @Property()
  finalMileage: string;
  @Property()
  finalGasoline: string;
  @Property()
  incidentBumps: string;
  @Property()
  status: string;
  @Property()
  active: boolean;
  @Property()
  carCategory: string;
  @Property()
  carPlaca: string;
}
