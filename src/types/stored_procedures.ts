export const STORED_PROCEDURES = {
  GET: {
    SP_GET_CLIENTES_FRECUENTES: "CALL SP_Clientes_Frecuentes()",
    SP_LOGIN: "CALL sp_login(?, ?)",
    SP_GET_AREA: "CALL sp_get_area()",
    SP_GET_VEHICULO: "CALL sp_get_vehiculo()",
    SP_GET_REQUESTS: "CALL sp_obtener_solicitudes()",
    SP_GET_REQUESTS_NO_CONFIRMED: "CALL sp_obtener_solicitudes_sin_confirmar()",
    SP_GET_CATALOG_INCIDENTS: "CALL sp_obtener_catalogo_incidencias()",
    SP_GET_REQUESTS_PENDING: "CALL sp_obtener_solicitudes_pendientes(?)",
    SP_GET_GASOLINE: "CALL sp_obtener_cat_gasolina()",
    SP_GET_USER_TYPES: "CALL sp_get_tipos_usuario()"
  },
  CREATE_UPDATE: {
    SP_CREATE_UPDATE_USER: "CALL sp_create_update_user(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    SP_CREATE_REQUEST:
      "CALL sp_agregar_solicitud(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    SP_UPDATE_REQUEST: "CALL sp_update_solicitud(?, ?, ?, ?)",
    SP_ADD_MANITENANCE:
      "CALL sp_agregar_mantenimiento(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    SP_ADD_INCIDENCE: "CALL sp_agregar_incidencia(?, ?, ?, ?, ?, ?, ?, ?)",
    SP_ADD_REQUEST_INCIDENCE: "CALL sp_agregar_golpes_fallas_solicitud(?, ?)",
  },
  DELETE: {
    SP_DELETE_REQUEST: "CALL sp_eliminar_solicitud(?)",
  },
};
