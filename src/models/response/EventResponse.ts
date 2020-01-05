import { VehiculoResponse } from "../../models/response/VehiculoResponse";
export class EventResponse {
    id: number;
    title: string;
    description: string;
    dateInit: Date;
    dateEnd: Date;
    type?: string;
    car?: VehiculoResponse;
    active: boolean;
    visible: boolean;
}