USE `ine_project`;
DROP procedure IF EXISTS `sp_get_usuarios`;

DELIMITER $$
USE `ine_project`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_usuarios`()
BEGIN
	SELECT id, CAST(active AS UNSIGNED) AS active, email, first_last_name AS firstLastName, 
		name, second_last_name AS secondLastName, area_id AS areaId, 
		tipo_usuario_id AS userTypeId, password
	FROM user WHERE visible;
END$$

DELIMITER ;

