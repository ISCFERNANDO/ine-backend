import { Property } from "@tsed/common";

export class CreateCar {
  @Property()
  id: number;
  @Property()
  placa: string;
  @Property()
  description: string;
  @Property()
  category: string;
  @Property()
  year: number;
  @Property()
  model: string;
  @Property()
  color: string;
  @Property()
  mileage: string;
  @Property()
  active: boolean;
  @Property()
  image_name: string;
}
