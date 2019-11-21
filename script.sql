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



/*17 nov 2019*/
USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_solicitudes_pendientes`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_solicitudes_pendientes`(
	IN _carId INT
)
BEGIN
	SELECT S.id, CONCAT(names, ' ', surnames) AS applicant, date_order AS dateOrder, 
		date_deliver AS dateDeliver, V.category, V.placa
		FROM solicitud AS S INNER JOIN vehiculo AS V ON (S.vehiculo_id = V.id)
		WHERE V.id = _carId AND S.visible;
END$$

DELIMITER ;



ALTER TABLE `ine_project`.`vehiculo` 
ADD COLUMN `kilometraje` BIGINT NOT NULL DEFAULT 0 AFTER `color`;


USE `ine_project`;
DROP procedure IF EXISTS `sp_get_vehiculo`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_vehiculo`()
BEGIN
	SELECT id, placa, description, category, year, model, color, 
		CAST(active AS UNSIGNED) AS active, kilometraje AS mileage
		FROM vehiculo WHERE visible = 1;
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
	DECLARE carId INT;
	UPDATE solicitud SET
		final_mileage = _finalMileage,
		final_gasoline = _finalGasoline,
		estatus = 'ENTREGADO'
	WHERE id = _requestId;

	SET carId = (SELECT vehiculo_id FROM solicitud WHERE id = _requestId);
	UPDATE vehiculo SET kilometraje = _finalMileage 
		WHERE id = carId;
END$$

DELIMITER ;



USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_solicitudes_sin_confirmar`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_solicitudes_sin_confirmar`()
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
	WHERE estatus = 'PRESTADO' AND confirmed = 0 AND solicitud.visible;
END$$

DELIMITER ;


CREATE TABLE `ine_project`.`cat_gasolinas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `visible` TINYINT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
);

INSERT INTO cat_gasolinas(name) values('Vacio'), ('1/4'), ('1/2'), ('3/4'), ('Lleno');

USE `ine_project`;
DROP procedure IF EXISTS `sp_obtener_cat_gasolina`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_cat_gasolina`()
BEGIN
	SELECT id, name, active FROM cat_gasolinas WHERE visible;
END$$

DELIMITER ;



ALTER TABLE `ine_project`.`solicitud` 
ADD COLUMN `created_user_id` INT NULL AFTER `incident_bumps`,
ADD COLUMN `updated_user_id` INT NULL AFTER `created_user_id`;

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
	IN _requestedFuel VARCHAR(15),
	IN _userId INT
)
BEGIN
	INSERT INTO solicitud(area_id, vehiculo_id, names, surnames, 
		date_order, date_deliver, reason_requirement, initial_mileage, 
		initial_gasoline, requested_fuel, estatus, created_user_id) 
	VALUES(
		_areaId, _vehiculoId, _names, _surnames,
		_dateOrder, _dateDeliver, _reasonRequirement, _initialMileage,
		_initialGasoline, _requestedFuel, 'PRESTADO', _userId
	);

	SELECT last_insert_id() AS id;
END$$

DELIMITER ;


USE `ine_project`;
DROP procedure IF EXISTS `sp_update_solicitud`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_solicitud`(
	IN _requestId INT,
	IN _finalMileage VARCHAR(15),
	IN _finalGasoline VARCHAR(15),
	IN _userId INT
)
BEGIN
	DECLARE carId INT;
	UPDATE solicitud SET
		final_mileage = _finalMileage,
		final_gasoline = _finalGasoline,
		estatus = 'ENTREGADO',
		updated_user_id = _userId
	WHERE id = _requestId;

	SET carId = (SELECT vehiculo_id FROM solicitud WHERE id = _requestId);
	UPDATE vehiculo SET kilometraje = _finalMileage 
		WHERE id = carId;
END$$

DELIMITER ;

ALTER TABLE `ine_project`.`vehiculo` 
ADD COLUMN `status` TINYINT NULL DEFAULT 1 AFTER `visible`;


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
	IN _requestedFuel VARCHAR(15),
	IN _userId INT
)
BEGIN
	IF EXISTS(SELECT id FROM vehiculo WHERE id = _vehiculoId AND status = 1) THEN
		BEGIN
			INSERT INTO solicitud(area_id, vehiculo_id, names, surnames, 
				date_order, date_deliver, reason_requirement, initial_mileage, 
				initial_gasoline, requested_fuel, estatus, created_user_id) 
			VALUES(
				_areaId, _vehiculoId, _names, _surnames,
				_dateOrder, _dateDeliver, _reasonRequirement, _initialMileage,
				_initialGasoline, _requestedFuel, 'PRESTADO', _userId
			);
			UPDATE vehiculo SET status = 0 WHERE id = _vehiculoId;
			SELECT 1 AS code, 'Operacion exitosa' AS message;
			SELECT last_insert_id() AS id;
		END;
	ELSE
		BEGIN
			SELECT 0 AS code, 'El automoviles solicitado no está disponible' AS message;
		END;
	END IF;
END$$

DELIMITER ;



USE `ine_project`;
DROP procedure IF EXISTS `sp_update_solicitud`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_solicitud`(
	IN _requestId INT,
	IN _finalMileage VARCHAR(15),
	IN _finalGasoline VARCHAR(15),
	IN _userId INT
)
BEGIN
	DECLARE carId INT;
	UPDATE solicitud SET
		final_mileage = _finalMileage,
		final_gasoline = _finalGasoline,
		estatus = 'ENTREGADO',
		updated_user_id = _userId
	WHERE id = _requestId;

	SET carId = (SELECT vehiculo_id FROM solicitud WHERE id = _requestId);
	UPDATE vehiculo SET 
		kilometraje = _finalMileage,
		status = 1
	WHERE id = carId;
END$$

DELIMITER ;


ALTER TABLE `ine_project`.`solicitud` 
ADD COLUMN `order_time` VARCHAR(15) NOT NULL AFTER `updated_user_id`,
ADD COLUMN `delivery_time` VARCHAR(15) NULL AFTER `created_time`;



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
	IN _requestedFuel VARCHAR(15),
	IN _userId INT,
	IN _orderTime VARCHAR(15),
	IN _deliveryTime VARCHAR(15)
)
BEGIN
	IF EXISTS(SELECT id FROM vehiculo WHERE id = _vehiculoId AND status = 1) THEN
		BEGIN
			INSERT INTO solicitud(area_id, vehiculo_id, names, surnames, 
				date_order, date_deliver, reason_requirement, initial_mileage, 
				initial_gasoline, requested_fuel, estatus, created_user_id,
				order_time, delivery_time) 
			VALUES(
				_areaId, _vehiculoId, _names, _surnames,
				_dateOrder, _dateDeliver, _reasonRequirement, _initialMileage,
				_initialGasoline, _requestedFuel, 'PRESTADO', _userId,
				_orderTime, _deliveryTime
			);
			UPDATE vehiculo SET status = 0 WHERE id = _vehiculoId;
			SELECT 1 AS code, 'Operacion exitosa' AS message;
			SELECT last_insert_id() AS id;
		END;
	ELSE
		BEGIN
			SELECT 0 AS code, 'El automoviles solicitado no está disponible' AS message;
		END;
	END IF;
END$$

DELIMITER ;

