USE `ine_project`;
DROP procedure IF EXISTS `sp_historial_solicitudes`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_historial_solicitudes`()
BEGIN
	SELECT S.id, S.date_order, S.date_deliver, 'Automovil en viaje' AS title, 
		'Se solicito el automovil para realizar un viaje' AS description, 
		V.placa, V.category, 'So' AS type
		FROM solicitud AS S INNER JOIN vehiculo AS V ON (S.vehiculo_id=V.id)
		WHERE S.active;

END$$

DELIMITER ;



USE `ine_project`;
DROP procedure IF EXISTS `sp_agregar_automovil`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_agregar_automovil`(
	IN _placa VARCHAR(20),
	IN _description VARCHAR(250),
	IN _category VARCHAR(45),
	IN _year INT,
	IN _model VARCHAR(30),
	IN _color VARCHAR(50),
	IN _kilometraje BIGINT,
	IN _image_name VARCHAR(100)
)
BEGIN
	IF EXISTS(SELECT id FROM vehiculo WHERE placa = _placa AND visible = 1) THEN
		BEGIN
			SELECT 0 AS code, 'Ya existe un automovil con la misma placa' AS message;
		END;
	ELSE
		BEGIN
			INSERT INTO vehiculo(
				placa, description, category, year, model, color, kilometraje, image_name
			) 
			VALUES(
				_placa, _description, _category, _year, _model, _color, _kilometraje, _image_name
			);
			
			SELECT 
    1 AS code,
    'Se registro correctamente el automovil' AS message;
		END;
	END IF;

END$$

DELIMITER ;



USE `ine_project`;
DROP procedure IF EXISTS `sp_recuperar_password`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_recuperar_password`(
	IN _email VARCHAR(60), 
	IN _password VARCHAR(255)
)
BEGIN
	DECLARE _id BIGINT;
	IF EXISTS(SELECT id FROM user WHERE email = _email AND visible) THEN
		BEGIN
			SET _id = (SELECT id FROM user WHERE email = _email AND visible);
			UPDATE user SET password = _password WHERE id = _id;
			SELECT 1 AS code, 'La contraseña se reestableció correctamente' AS message;
		END;
	ELSE
		BEGIN
			SELECT 0 AS code, 'No se encontro el usuario con el correo proporcionado' AS message;
		END;
	END IF;

END$$

DELIMITER ;

