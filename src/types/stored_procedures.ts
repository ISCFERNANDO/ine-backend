export const STORED_PROCEDURES = {
  GET: {
    SP_GET_CLIENTES_FRECUENTES: "CALL SP_Clientes_Frecuentes()",
    SP_LOGIN: "CALL sp_login(?, ?)",
    SP_GET_AREA: "CALL sp_get_area()",
    SP_GET_VEHICULO: "CALL sp_get_vehiculo()",
    SP_GET_REQUESTS: "CALL sp_obtener_solicitudes()",
  },
  CREATE_UPDATE: {
    SP_CREATE_UPDATE_USER: "CALL sp_create_update_user(?, ?, ?, ?, ?, ?, ?, ?)",
    SP_CREATE_REQUEST:
      "CALL sp_agregar_solicitud(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    SP_UPDATE_REQUEST: "CALL sp_update_solicitud(?, ?, ?, ?)",
  },
};
