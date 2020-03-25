export const STORED_PROCEDURES = {
  GET: {
    SP_GET_CLIENTES_FRECUENTES: "CALL SP_Clientes_Frecuentes()",
    SP_LOGIN: "CALL sp_login(?, ?)",
    SP_GET_AREA: "CALL sp_get_area()",
    SP_GET_VEHICULO: "CALL sp_get_vehiculo()",
    SP_GET_REQUESTS: "CALL sp_obtener_solicitudes(?)",
    SP_GET_REQUESTS_NO_CONFIRMED: "CALL sp_obtener_solicitudes_sin_confirmar(?)",
    SP_GET_CATALOG_INCIDENTS: "CALL sp_obtener_catalogo_incidencias()",
    SP_GET_REQUESTS_PENDING: "CALL sp_obtener_solicitudes_pendientes(?, ?)",
    SP_GET_GASOLINE: "CALL sp_obtener_cat_gasolina()",
    SP_GET_USER_TYPES: "CALL sp_get_tipos_usuario()",
    SP_GET_USERS: "CALL sp_get_usuarios()",
    SP_GET_HISTORIC_REQUEST: "CALL sp_historial_solicitudes()",
    SP_GET_MAILS_FOR_NOTIFICATION: "CALL sp_obtener_mails()",
    SP_GET_CATALOG_CARS: "CALL sp_obtener_catalogo_automoviles()",
    SP_GET_REQUEST_REPORTS: "CALL sp_obtener_reporte_solicitudes(?, ?, ?)",
    SP_GET_MAITENANCE_REPORTS: "CALL sp_obtener_reporte_mantenimiento(?, ?)",
    SP_GET_MANITENANCE_FILES_BY_MAINTENANCE: "CALL sp_obtener_documentos_mantenimiento(?)",
    SP_GET_AREA_BY_ID: "CALL sp_get_area_by_id(?)",
    SP_GET_VEHICULO_BY_ID: 'CALL sp_get_vehiculo_by_id(?)',
    SP_GET_SOLICITUDES_AUTOMOVILES: 'CALL sp_obtener_solicitudes_automoviles()'
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
    SP_ADD_CAR: "CALL sp_agregar_automovil(?, ?, ?, ?, ?, ?, ?, ?)",
    SP_RECOVER_PASSWORD: "CALL sp_recuperar_password(?, ?)",
    SP_ADD_FILE_MAINTENANCE: "CALL sp_agregar_archivo_mantenimiento(?)",
    SP_UPDATE_FILE_TO_MAINTENANCE: "CALL sp_asociar_archivos_con_mantenimiento(?, ?)",
    SP_CONFIRM_REQUEST: "CALL sp_confirmar_solicitud(?)"
  },
  DELETE: {
    SP_DELETE_REQUEST: "CALL sp_eliminar_solicitud(?)",
  },
};
