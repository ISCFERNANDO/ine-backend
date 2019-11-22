create table tipo_usuario(
	id int primary key auto_increment,
	name varchar(50) not null,
	active boolean default true,
	visible boolean default true,
	created_at timestamp,
	updated_at timestamp
);

insert into tipo_usuario(name) values('Administrador'),('Otro');

USE `ine_project`;
DROP procedure IF EXISTS `sp_get_tipos_usuario`;

DELIMITER $$
USE `ine_project`$$
CREATE PROCEDURE `sp_get_tipos_usuario` ()
BEGIN
	SELECT id, name FROM tipo_usuario WHERE visible;
END$$

DELIMITER ;


ALTER TABLE `ine_project`.`user` 
ADD COLUMN `tipo_usuario_id` INT NULL AFTER `area_id`;

USE `ine_project`;
DROP procedure IF EXISTS `sp_create_update_user`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_update_user`(
	IN _name VARCHAR(30),
	IN _firstLastName VARCHAR(30),
	IN _secondLastName VARCHAR(30),
	IN _email VARCHAR(60),
	IN _password VARCHAR(30),
	IN _areaId INT,
	IN _userId INT,
	IN _active INT,
	IN _tipoUsuario INT
)
BEGIN
	IF(_userId = -1) THEN
		BEGIN
			#INSERTAR USUARIO
			INSERT INTO user(email, first_last_name, name, password, second_last_name, area_id, tipo_usuario_id)
				VALUES(_email, _firstLastName, _name, _password, _secondLastName, _areaId, _tipoUsuario);
		END;
	ELSE
		BEGIN
			#ACTUALIZAR USUARIO
			UPDATE user SET
				email = _email,
				first_last_name = _firstLastName,
				name = _name,
				password = _password,
				second_last_name = _secondLastName,
				area_id = _areaId,
				tipo_usuario_id = _tipoUsuario
			WHERE id = _userId;
		END;
	END IF;
END$$

DELIMITER ;

