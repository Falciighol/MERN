CREATE DATABASE IF NOT EXISTS `personas` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `personas`;

CREATE TABLE IF NOT EXISTS `persona` (
  `idPersona` int(11) NOT NULL PRIMARY KEY,
  `primerNombre` VARCHAR(50) NOT NULL,
  `segundoNombre` VARCHAR(50) NULL,
  `primerApellido` VARCHAR(50) NOT NULL,
  `segundoApellido` VARCHAR(50) NULL,
  `fechaNacimmiento` DATETIME NOT NULL,
  `sexo` INT NOT NULL,
  `informacionAdicional` VARCHAR(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES (null, 'user1', '123456');
INSERT INTO `persona` VALUES (1, 'pNombre', 'sNombre', 'pApellido', 'sApellido', '1999-03-22', 1, 'N/A');