CREATE DATABASE db_final;

USE db_final;

CREATE TABLE IF NOT EXISTS `db_final`.`customer` (
  `customer_id` VARCHAR(100) NOT NULL,
  `customer_name` VARCHAR(45) NOT NULL,
  `customer_phone` CHAR(10) NOT NULL,
  `customer_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customer_id`));
  
INSERT  INTO `db_final`.`customer` (
`customer_id`, 
`customer_name`, 
`customer_phone`, 
`customer_email`) 
VALUES (
'8ee7b542-c493-404e-bdd4-19f2a4267708',
 'Ankit Acciaio',
 '2615102674',
 'Ankit@gmail.com');
