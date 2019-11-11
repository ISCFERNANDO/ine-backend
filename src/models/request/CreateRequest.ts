import { Property } from "@tsed/common";

export class CreateRequest {
  @Property()
  areaId: number;
  @Property()
  vehiculoId: number;
  @Property()
  names: string;
  @Property()
  surnames: string;
  @Property()
  dateOrder: string;
  @Property()
  dateDeliver: string;
  @Property()
  reasonRequirement: string;
  @Property()
  initialMileage: string;
  @Property()
  initialGasoline: string;
  @Property()
  requestedFuel: string;
  @Property()
  bumpsFailures: string;
}
