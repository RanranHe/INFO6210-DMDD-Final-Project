CREATE DATABASE db_final;

USE db_final;

CREATE TABLE IF NOT EXISTS `db_final`.`customer` (
  `customer_id` VARCHAR(100) NOT NULL,
  `customer_name` VARCHAR(45) NOT NULL,
  `customer_phone` CHAR(10) NOT NULL,
  `customer_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customer_id`));
              
CREATE TABLE IF NOT EXISTS `db_final`.`timesheet` (
  `timesheet_id` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  `month` INT NOT NULL,
  PRIMARY KEY (`timesheet_id`));
               
CREATE TABLE `db_final`.`employee` (
  `employee_id` VARCHAR(100) NOT NULL,
  `employee_name` VARCHAR(45) NOT NULL,
  `employee_phone` CHAR(10) NOT NULL,
  `salary` DECIMAL(10,1) NOT NULL,
  `timesheet_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`employee_id`),
  INDEX `timesheet_id_idx` (`timesheet_id` ASC) VISIBLE,
  CONSTRAINT `timesheetID`
    FOREIGN KEY (`timesheet_id`)
    REFERENCES `db_final`.`timesheet` (`timesheet_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  
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
