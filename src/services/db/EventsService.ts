import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { EventResponse } from "../../models/response/EventResponse";

@Service()
export class EventsService {
  constructor(private dbService: DatabaseService) {}

  async getEvents() {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_HISTORIC_REQUEST;
      let resultSet = await this.dbService.query(sqlQuery);
      resultSet = resultSet.map(event => {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          dateInit: event.date_order,
          dateEnd: event.date_deliver,
          car: {
            placa: event.placa,
            category: event.category
          }
        };
      });

      let events: EventResponse[] = resultSet;
      return events;
    } catch (err) {
      return err;
    }
  }
}
