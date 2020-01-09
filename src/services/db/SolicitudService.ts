import { Service } from "@tsed/di";
import { DatabaseService } from "./database";
import { STORED_PROCEDURES } from "../../types/stored_procedures";
import { CreateRequest } from "../../models/request/CreateRequest";
import { UpdateRequest } from "../../models/request/UpdateRequest";
import { SolicitudResponse } from "../../models/response/SolicitudResponse";
import { SolicitudPendienteResponse } from "../../models/response/SolicitudPendienteResponse";

@Service()
export class SolicitudService {
  constructor(private dbService: DatabaseService) {}

  async createRequest(request: CreateRequest, userId: number) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_CREATE_REQUEST;
      let sqlData = [
        request.areaId,
        request.vehiculoId,
        request.names,
        request.surnames,
        request.dateOrder,
        request.dateDeliver,
        request.reasonRequirement,
        request.initialMileage,
        request.initialGasoline,
        request.requestedFuel,
        userId,
        request.orderTime,
        request.deliveryTime
      ];

      //add request
      let resultSet = await this.dbService.query(sqlQuery, sqlData);
      let estatus = resultSet[0];
      if (estatus.code === 0) {
        return false;
      }
      let { id } = resultSet[1];
      //add bumps and failures
      await this.addFailuresRequest(id, request.bumpsFailures);
      return true;
    } catch (err) {
      throw err;
    }
  }

  async updateRequest(
    request: UpdateRequest,
    requestId: number,
    userId: number
  ) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.CREATE_UPDATE.SP_UPDATE_REQUEST;
      let sqlData = [
        requestId,
        request.finalMileage,
        request.finalGasoline,
        userId
      ];
      await this.dbService.query(sqlQuery, sqlData);
      //add bumps and failures
      await this.addFailuresRequest(requestId, request.incidentBumps);
      return true;
    } catch (err) {
      return err;
    }
  }

  async getAllRequest(userId: number) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_REQUESTS;
      const sqlData = [userId];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let requests: SolicitudResponse[] = resultSet;
      return requests;
    } catch (err) {
      return err;
    }
  }

  async getUnconfirmedRequest(userId: number) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_REQUESTS_NO_CONFIRMED;
      const sqlData = [userId];
      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      let requests: SolicitudResponse[] = resultSet;
      return requests;
    } catch (err) {
      return err;
    }
  }

  async deleteRequest(requestId: number) {
    try {
      let sqlQuery: string = STORED_PROCEDURES.DELETE.SP_DELETE_REQUEST;
      const sqlData = [requestId];
      await this.dbService.query(sqlQuery, sqlData);
      return true;
    } catch (err) {
      return err;
    }
  }

  async addFailuresRequest(requestId, incidentBumps) {
    //add bumps and failures
    let sqlQuery, sqlData;
    if (Array.isArray(incidentBumps)) {
      incidentBumps.forEach(async item => {
        sqlQuery = STORED_PROCEDURES.CREATE_UPDATE.SP_ADD_REQUEST_INCIDENCE;
        sqlData = [requestId, item];
        await this.dbService.query(sqlQuery, sqlData);
      });
    }
  }

  async getPedingRequests(
    carId: number,
    userId: number
  ): Promise<SolicitudPendienteResponse[]> {
    try {
      let sqlQuery: string = STORED_PROCEDURES.GET.SP_GET_REQUESTS_PENDING;
      let sqlData = [carId, userId];

      const resultSet = await this.dbService.query(sqlQuery, sqlData);
      const solicitudesPendientes: SolicitudPendienteResponse[] = resultSet;
      return solicitudesPendientes;
    } catch (err) {
      throw err;
    }
  }

  async getMails(): Promise<any> {
    try {
      let sqlQuery: string =
        STORED_PROCEDURES.GET.SP_GET_MAILS_FOR_NOTIFICATION;
      const resultSet = await this.dbService.query(sqlQuery);
      const mails: any[] = resultSet;
      return mails;
    } catch (err) {
      throw err;
    }
  }
}
