import { Property } from "@tsed/common";

export class CreateRequest {
  @Property()
  id?: number;
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
  bumpsFailures: number[];
  @Property()
  orderTime: string;
  @Property()
  deliveryTime: string;
  @Property()
  sendMail: boolean;
  @Property()
  fechaCreacion?: string;
}
