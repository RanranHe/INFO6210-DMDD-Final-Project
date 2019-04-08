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
  INDEX `timesheet_id_idx` (`timesheet_id` ASC),
  CONSTRAINT `timesheetID`
    FOREIGN KEY (`timesheet_id`)
    REFERENCES `db_final`.`timesheet` (`timesheet_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
              
CREATE TABLE `db_final`.`order` (
  `order_id` VARCHAR(100) NOT NULL,
  `customer_id` VARCHAR(100) NOT NULL,
  `order_date` DATE NOT NULL,
  `employee_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `customerId_idx` (`customer_id` ASC),
  INDEX `employeeID_idx` (`employee_id` ASC),
  CONSTRAINT `customerID`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_final`.`customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `employeeID`
    FOREIGN KEY (`employee_id`)
    REFERENCES `db_final`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `db_final`.`period` (
  `period_id` INT NOT NULL,
  `timesheet_id` VARCHAR(100) NOT NULL,
  `start_time` DATE NOT NULL,
  `end_time` DATE NOT NULL,
  PRIMARY KEY (`period_id`),
  INDEX `timesheetID_idx` (`timesheet_id` ASC),
  CONSTRAINT `sheetID`
    FOREIGN KEY (`timesheet_id`)
    REFERENCES `db_final`.`timesheet` (`timesheet_id`)
    ON DELETE CASCADE
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
