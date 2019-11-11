import { Property } from "@tsed/common";

export class UpdateRequest {
  @Property()
  requestId: number;
  @Property()
  finalMileage: string;
  @Property()
  finalGasoline: string;
  @Property()
  incidentBumps: string;
}
