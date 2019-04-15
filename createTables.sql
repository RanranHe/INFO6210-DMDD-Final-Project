CREATE DATABASE db_final;

USE db_final;

CREATE TABLE `db_final`.`customer` (
  `customer_id` VARCHAR(100) NOT NULL,
  `customer_name` VARCHAR(45) NOT NULL,
  `customer_phone` CHAR(10) NOT NULL,
  `customer_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customer_id`));
              
 CREATE TABLE `db_final`.`employee` (
  `employee_id` VARCHAR(100) NOT NULL,
  `employee_username` VARCHAR(45) NOT NULL,
  `employee_password` VARCHAR(150) CHARACTER SET 'ascii' NOT NULL,
  `employee_name` VARCHAR(45) NOT NULL,
  `employee_phone` CHAR(10) NOT NULL,
  `salary` DECIMAL(10,1) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `employee_username_UNIQUE` (`employee_username` ASC));      
    
CREATE TABLE `db_final`.`timesheet` (
  `timesheet_id` VARCHAR(100) NOT NULL,
  `employee_id` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  `month` INT NOT NULL,
  PRIMARY KEY (`timesheet_id`),
  INDEX `employee_id_idx` (`employee_id` ASC),
  CONSTRAINT `employeeId`
    FOREIGN KEY (`employee_id`)
    REFERENCES `db_final`.`employee` (`employee_id`)
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
  CONSTRAINT `employee_ID`
    FOREIGN KEY (`employee_id`)
    REFERENCES `db_final`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `db_final`.`period` (
  `period_id` VARCHAR(100) NOT NULL,
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
               
CREATE TABLE `db_final`.`location` (
  `location_id` VARCHAR(100) NOT NULL,
  `shelf_no` INT NULL,
  `row` INT NULL,
  `column` INT NULL,
  PRIMARY KEY (`location_id`));
  
CREATE TABLE `db_final`.`author` (
  `author_id` VARCHAR(100) NOT NULL,
  `author_name` VARCHAR(45) NOT NULL,
  `date_of_birth` DATE NULL,
  PRIMARY KEY (`author_id`));
  
CREATE TABLE `db_final`.`publisher` (
  `publisher_id` VARCHAR(100) NOT NULL,
  `publisher_name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NULL,
  PRIMARY KEY (`publisher_id`));
  
  CREATE TABLE `db_final`.`category` (
  `category_id` VARCHAR(100) NOT NULL,
  `category_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`category_id`));
               
CREATE TABLE `db_final`.`book` (
  `book_id` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,1) NULL,
  `location_id` VARCHAR(100) NULL,
  `stock` INT NULL,
  `book_name` VARCHAR(45) NOT NULL,
  `publisher_id` VARCHAR(100) NOT NULL,
  `author_id` VARCHAR(100) NOT NULL,
  `publisher_date` DATE NULL,
  `description` VARCHAR(256) NULL,
  `category_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`book_id`),
  INDEX `locationID_idx` (`location_id` ASC),
  INDEX `publisherID_idx` (`publisher_id` ASC),
  INDEX `author_id_idx` (`author_id` ASC),
  INDEX `category_id_idx` (`category_id` ASC),
  CONSTRAINT `locationID`
    FOREIGN KEY (`location_id`)
    REFERENCES `db_final`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `publisherID`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `db_final`.`publisher` (`publisher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `author_id`
    FOREIGN KEY (`author_id`)
    REFERENCES `db_final`.`author` (`author_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `db_final`.`category` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `db_final`.`item` (
  `item_id` VARCHAR(100) NOT NULL,
  `order_id` VARCHAR(100) NOT NULL,
  `quantity` INT NOT NULL,
  `book_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `orderID_idx` (`order_id` ASC),
  INDEX `book_id_idx` (`book_id` ASC),
  CONSTRAINT `orderID`
    FOREIGN KEY (`order_id`)
    REFERENCES `db_final`.`order` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `book_id`
    FOREIGN KEY (`book_id`)
    REFERENCES `db_final`.`book` (`book_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
              
