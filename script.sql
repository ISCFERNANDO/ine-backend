alter table cat_incidencias add column icon_name varchar(100);
UPDATE `ine_project`.`cat_incidencias` SET `icon_name`='abolladura.jpeg' WHERE `id`='1';
UPDATE `ine_project`.`cat_incidencias` SET `icon_name`='estrellado.jpeg' WHERE `id`='2';
UPDATE `ine_project`.`cat_incidencias` SET `icon_name`='faltante.jpeg' WHERE `id`='3';
UPDATE `ine_project`.`cat_incidencias` SET `icon_name`='golpe.jpeg' WHERE `id`='4';
UPDATE `ine_project`.`cat_incidencias` SET `icon_name`='rayado.jpeg' WHERE `id`='5';


USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_catalogo_incidencias`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_catalogo_incidencias`()
BEGIN
	SELECT id, name, active, icon_name AS icon FROM cat_incidencias WHERE visible;
END$$

DELIMITER ;

USE `ine_project`;
DROP procedure IF EXISTS `sp_agregar_solicitud`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_solicitud`(
	IN _areaId INT,
	IN _vehiculoId INT,
	IN _names VARCHAR(60),
	IN _surnames VARCHAR(60),
	IN _dateOrder DATE,
	IN _dateDeliver DATE,
	IN _reasonRequirement VARCHAR(400),
	IN _initialMileage VARCHAR(15),
	IN _initialGasoline VARCHAR(15),
	IN _requestedFuel VARCHAR(15)
)
BEGIN
	INSERT INTO solicitud(area_id, vehiculo_id, names, surnames, 
		date_order, date_deliver, reason_requirement, initial_mileage, 
		initial_gasoline, requested_fuel, estatus) 
	VALUES(
		_areaId, _vehiculoId, _names, _surnames,
		_dateOrder, _dateDeliver, _reasonRequirement, _initialMileage,
		_initialGasoline, _requestedFuel, 'PRESTADO'
	);

	SELECT last_insert_id() AS id;
END$$

DELIMITER ;




USE `ine_project`;
DROP procedure IF EXISTS `sp_agregar_golpes_fallas_solicitud`;

DELIMITER $$
USE `ine_project`$$
CREATE PROCEDURE `sp_agregar_golpes_fallas_solicitud` (
	IN _solicitudId INT,
	IN _incidenciaId INT
)
BEGIN
	INSERT INTO incidencias_solicitud(id_solicitud, id_cat_incidencia)
		VALUES(_solicitudId, _incidenciaId);
END$$

DELIMITER ;


USE `ine_project`;
DROP procedure IF EXISTS `sp_update_solicitud`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_solicitud`(
	IN _requestId INT,
	IN _finalMileage VARCHAR(15),
	IN _finalGasoline VARCHAR(15)
)
BEGIN
	UPDATE solicitud SET
		final_mileage = _finalMileage,
		final_gasoline = _finalGasoline,
		estatus = 'ENTREGADO'
	WHERE id = _requestId;
END$$

DELIMITER ;

