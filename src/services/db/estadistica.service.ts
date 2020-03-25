import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { DateUtilsService } from "../utils/date-utils.service";

@Service()
export class EstadisticaService {
  constructor(
    private dbService: DatabaseService,
    private dateUtilsService: DateUtilsService
  ) {}

  async getSolicitudesAutomoviles() {
    try {
      let sqlQuery: string =
        STORED_PROCEDURES.GET.SP_GET_SOLICITUDES_AUTOMOVILES;
      const resultSet: any[] = await this.dbService.query(sqlQuery);
      const listOfRequests = this.buildDatesWithData(resultSet);
      return listOfRequests;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  buildDatesWithData(listOfRequests: any[]) {
    const newListOfRequest = [];
    if (listOfRequests.length > 0) {
      const { fechaSolicitud: fechaInicial } = listOfRequests[0];
      const { fechaSolicitud: fechaFinal } = listOfRequests[
        listOfRequests.length - 1
      ];
      let dateLeft = new Date(fechaInicial);
      const dateRight = new Date(fechaFinal);

      while (
        [-1, 0].includes(this.dateUtilsService.compareDate(dateLeft, dateRight))
      ) {
        const dateLeftFormated = this.dateUtilsService.formatYYYYMMDD(dateLeft);
        const listOfRequestForDateLeft = listOfRequests.filter(
          request => request.fechaSolicitud === dateLeftFormated
        );
        newListOfRequest.push({
          fecha: dateLeftFormated,
          total: listOfRequestForDateLeft.length
        });
        listOfRequests = listOfRequests.slice(
          listOfRequestForDateLeft.length - 1,
          listOfRequests.length
        );
        dateLeft = this.dateUtilsService.addDay(dateLeft, 1);
      }
    }
    return newListOfRequest;
  }
}
