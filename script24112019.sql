USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_solicitudes`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_solicitudes`(
	IN _userId INT
)
BEGIN
	SELECT solicitud.id, area_id AS areaId, v.category AS carCategory, v.placa AS carPlaca, names, surnames,
		date_order AS dateOrder, date_deliver AS dateDeliver, 
		reason_requirement AS reasonRequirement, initial_mileage AS initialMileage,
		initial_gasoline AS initialGasoline, requested_fuel AS requestedFuel,
		bumps_failures AS bumpsFailures, solicitud.created_at AS createdAt,
		solicitud.udated_at AS updatedAt, final_mileage AS finalMileage,
		final_gasoline AS finalGasoline, incident_bumps AS incidentBumps, estatus AS status,
		CAST(solicitud.active AS UNSIGNED) AS active FROM solicitud
	INNER JOIN vehiculo AS v ON (solicitud.vehiculo_id=v.id)
	WHERE estatus = 'PRESTADO' AND solicitud.visible
	AND solicitud.created_user_id = _userId;
END$$

DELIMITER ;


USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_solicitudes_sin_confirmar`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_solicitudes_sin_confirmar`(
	IN _userId INT
)
BEGIN
	SELECT solicitud.id, area_id AS areaId, v.category AS carCategory, v.placa AS carPlaca, names, surnames,
		date_order AS dateOrder, date_deliver AS dateDeliver, 
		reason_requirement AS reasonRequirement, initial_mileage AS initialMileage,
		initial_gasoline AS initialGasoline, requested_fuel AS requestedFuel,
		bumps_failures AS bumpsFailures, solicitud.created_at AS createdAt,
		solicitud.udated_at AS updatedAt, final_mileage AS finalMileage,
		final_gasoline AS finalGasoline, incident_bumps AS incidentBumps, estatus AS status,
		CAST(solicitud.active AS UNSIGNED) AS active FROM solicitud
	INNER JOIN vehiculo AS v ON (solicitud.vehiculo_id=v.id)
	WHERE estatus = 'PRESTADO' AND confirmed = 0 AND solicitud.visible
	AND solicitud.created_user_id = _userId;
END$$

DELIMITER ;


USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_solicitudes_pendientes`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_solicitudes_pendientes`(
	IN _carId INT,
	IN _userId INT
)
BEGIN
	SELECT S.id, CONCAT(names, ' ', surnames) AS applicant, date_order AS dateOrder, 
		date_deliver AS dateDeliver, V.category, V.placa
		FROM solicitud AS S INNER JOIN vehiculo AS V ON (S.vehiculo_id = V.id)
		WHERE V.id = _carId AND S.visible
		AND S.created_user_id = _userId;
END$$

DELIMITER ;

