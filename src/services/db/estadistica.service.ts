import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { DateUtilsService } from "../utils/date-utils.service";
import { EstadisticaSolicitud } from "../../models/response/EstadisticaSolicitudResponse";

@Service()
export class EstadisticaService {
  constructor(
    private dbService: DatabaseService,
    private dateUtilsService: DateUtilsService
  ) { }

  public async getSolicitudesAutomoviles(): Promise<EstadisticaSolicitud[]> {
    let sqlQuery: string =
      STORED_PROCEDURES.GET.SP_GET_SOLICITUDES_AUTOMOVILES;
    const resultSet: any[] = await this.dbService.query(sqlQuery);
    const listOfRequests: EstadisticaSolicitud[] = this.buildDatesWithData(resultSet);
    return listOfRequests;
  }

  public async getGasolinasUtilizados(): Promise<EstadisticaSolicitud[]> {
    let sqlQuery: string =
      STORED_PROCEDURES.GET.SP_GET_GASOLINA_UTILIZADO;
    const resultSet: any[] = await this.dbService.query(sqlQuery);
    const listOfRequests: EstadisticaSolicitud[] = this.buildDatesWithData(resultSet);
    return listOfRequests;
  }

  private buildDatesWithData(listOfRequests: any[]): EstadisticaSolicitud[] {
    const listOfDataStatistic: EstadisticaSolicitud[] = [];
    let dataStatistic: EstadisticaSolicitud;
    if (listOfRequests.length > 0) {
      let { fechaSolicitud: fechaInicial } = listOfRequests[0];
      let { fechaSolicitud: fechaFinal } = listOfRequests[
        listOfRequests.length - 1
      ];
      fechaInicial = this.dateUtilsService.parseISO(fechaInicial);
      fechaFinal = this.dateUtilsService.parseISO(fechaFinal);
      let mesAnterior: number = this.dateUtilsService.obtenerMes(fechaInicial);
      let mesActual: number = this.dateUtilsService.obtenerMes(fechaInicial);

      dataStatistic = new EstadisticaSolicitud();
      dataStatistic.mesId = mesAnterior;
      dataStatistic.nombreMes = this.dateUtilsService.getMonthName(mesAnterior);
      dataStatistic.anio = this.dateUtilsService.getYear(fechaInicial);

      while (this.fechaInicialMenorIgualFechaFinal(fechaInicial, fechaFinal)) {
        const dateLeftFormated = this.dateUtilsService.formatYYYYMMDD(fechaInicial);
        const total = this.getListOfRequestForDate(
          listOfRequests,
          dateLeftFormated
        );
        if (mesAnterior !== mesActual) {
          listOfDataStatistic.push(dataStatistic);
          dataStatistic = new EstadisticaSolicitud();
          mesAnterior = mesActual;
          dataStatistic.mesId = mesAnterior;
          dataStatistic.nombreMes = this.dateUtilsService.getMonthName(mesAnterior);
          dataStatistic.anio = this.dateUtilsService.getYear(fechaInicial);
        }
        dataStatistic.datos.push({
          fecha: dateLeftFormated,
          total
        });
        fechaInicial = this.dateUtilsService.addDay(fechaInicial, 1);
        mesActual = this.dateUtilsService.obtenerMes(fechaInicial);
      }

      if (dataStatistic.datos.length > 0) {
        listOfDataStatistic.push(dataStatistic);
      }
    }
    return listOfDataStatistic;
  }

  private getListOfRequestForDate(listOfRequests: any[], dateFormatedYYYMMDD: string): number {
    const listOfRequestForDate = listOfRequests.filter(
      request => request.fechaSolicitud === dateFormatedYYYMMDD
    );
    return listOfRequestForDate.length > 0 ?
      listOfRequestForDate.reduce((a, b) => a.total + b.total).total : 0;
  }

  private fechaInicialMenorIgualFechaFinal(fechaInicial: Date, fechaFinal: Date): boolean {
    return [-1, 0].includes(
      this.dateUtilsService.compareDate(fechaInicial, fechaFinal)
    );
  }
}
