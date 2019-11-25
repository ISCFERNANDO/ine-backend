USE `ine_project`;
DROP procedure IF EXISTS `sp_login`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login`(
	IN _email VARCHAR(60),
	IN _password VARCHAR(255)
)
BEGIN
	SELECT user.id, email, first_last_name AS firstLastName, user.name, 
		second_last_name AS secondLastName, area_id AS areaId, tipo_usuario.id as userType 
		FROM user LEFT JOIN tipo_usuario ON (user.tipo_usuario_id = tipo_usuario.id)
		WHERE email = _email AND password = _password
		AND user.visible = 1;
END$$

DELIMITER ;


create table accesos(
	id int primary key auto_increment,
	name varchar(50),
	route varchar(50),
	active boolean default true,
	visible boolean default true,
	created_at timestamp,
	updated_at timestamp
);

create table accesos_tipo_usuario(
	id_acceso int,
	id_tipo_usuario int,
	active boolean default true,
	visible boolean default true,
	created_at timestamp,
	updated_at timestamp
);

ALTER TABLE `ine_project`.`accesos_tipo_usuario` 
ADD INDEX `fk_acceso_idx` (`id_acceso` ASC),
ADD INDEX `fk_tipo_usuario_idx` (`id_tipo_usuario` ASC);
ALTER TABLE `ine_project`.`accesos_tipo_usuario` 
ADD CONSTRAINT `fk_acceso`
  FOREIGN KEY (`id_acceso`)
  REFERENCES `ine_project`.`accesos` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_tipo_usuario`
  FOREIGN KEY (`id_tipo_usuario`)
  REFERENCES `ine_project`.`tipo_usuario` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

INSERT INTO accesos (name, route) VALUES 
	('Generar solicitud', '/generar-solicitud'),
	('Modificar solicitudes', '/modificar-solicitudes'),
	('Eliminar solicitud', '/eliminar-solicitud'),
	('Mantenimiento', '/mantenimiento'),
	('Reportes', '/reportes'),
	('Automoviles disponibles', '/automoviles-disponibles'),
	('Usuarios', '/usuarios');

INSERT INTO accesos_tipo_usuario(id_acceso, id_tipo_usuario) VALUES
	(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1);

INSERT INTO accesos_tipo_usuario(id_acceso, id_tipo_usuario) VALUES
	(1, 2), (2, 2), (3, 2), (5, 2), (6, 2);


USE `ine_project`;
DROP procedure IF EXISTS `sp_login`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login`(
	IN _email VARCHAR(60),
	IN _password VARCHAR(255)
)
BEGIN
	SELECT user.id, email, first_last_name AS firstLastName, user.name, 
		second_last_name AS secondLastName, area_id AS areaId, tipo_usuario.id as userType 
		FROM user LEFT JOIN tipo_usuario ON (user.tipo_usuario_id = tipo_usuario.id)
		WHERE email = _email AND password = _password
		AND user.visible = 1;
	
	SELECT A.id, A.name, A.route FROM accesos AS A
		INNER JOIN accesos_tipo_usuario AS ATU ON (A.id=ATU.id_acceso)
		INNER JOIN user AS U ON (ATU.id_tipo_usuario=U.id)
		WHERE U.email = _email AND U.password = _password;
END$$

DELIMITER ;

