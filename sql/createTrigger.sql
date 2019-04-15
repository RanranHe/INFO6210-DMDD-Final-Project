/* --------- Trigger for Period Table ---------
   Situations Preventing Insert:
   1. End Date earlier than Start Date
   2. Period Year/Month doesn't match correspoding timesheet YEAR/MONTH
   3. Conflicts with existing periods
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`time_check`$$
CREATE TRIGGER  `db_final`.`time_check` BEFORE INSERT ON `period` FOR EACH ROW 
BEGIN
    DECLARE in_s_time DATE;
    DECLARE in_e_time DATE;
    DECLARE period_num INT;
    DECLARE i INT DEFAULT 0;
    DECLARE d DATE;
    DECLARE y INT;
    DECLARE m INT;
    DECLARE s_time DATE;
    DECLARE e_time DATE;
    DECLARE mon1 INT;
    DECLARE mon2 INT;
    DECLARE y1 INT;
    DECLARE y2 INT;
    
    SELECT COUNT(*) INTO period_num FROM period WHERE period.timesheet_id=NEW.timesheet_id;
    
    SELECT timesheet.year, timesheet.month INTO y, m FROM timesheet WHERE timesheet.timesheet_id=NEW.timesheet_id;
    
    SELECT MONTH(NEW.start_time), MONTH(NEW.end_time), YEAR(NEW.start_time), YEAR(NEW.end_time) 
    INTO mon1, mon2, y1, y2;
    
    IF mon1<>m OR mon2<>m OR y1<>y OR y2<>y 
    THEN signal sqlstate '45000' SET message_text = 'Date does not match time sheet year/month'; END IF;
    IF NEW.start_time>=NEW.end_time 
    THEN signal sqlstate '45000' SET message_text = 'Start date cannot be later than end date'; END IF;
    
	WHILE period_num>i DO
		SELECT period.start_time, period.end_time INTO s_time, e_time
		FROM period
		WHERE period.timesheet_id=NEW.timesheet_id
        ORDER BY period.start_time
        LIMIT i, 1;
       
        IF NEW.start_time BETWEEN s_time AND e_time OR NEW.end_time BETWEEN s_time AND e_time THEN 
			signal sqlstate '45000' SET message_text = 'Time period conflicts with others'; 
		END IF;
        
        IF NEW.start_time<s_time AND NEW.end_time>e_time THEN
			signal sqlstate '45000' SET message_text = 'Time period conflicts with others'; 
		END IF;
        SET i=i+1;
    END WHILE;
END$$

DELIMITER ;

/* --------- Trigger for Timesheet Table ---------
   Situations Preventing Insert:
   1. Year >= current year and month > current month
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`timesheet_check`$$
CREATE TRIGGER  `db_final`.`timesheet_check` BEFORE INSERT ON `timesheet` FOR EACH ROW 
BEGIN
	DECLARE y INT;
    DECLARE m INT;
    SET y=YEAR(CURDATE());
    SET m=MONTH(CURDATE());
    
    IF NEW.year>y OR (NEW.year=y AND NEW.month>m) THEN signal sqlstate '45000' SET message_text = 'Timesheet cannot be later than current month'; END IF;
    
END$$

DELIMITER ;

/* --------- Trigger for Employee Table ---------
   Situations Preventing Insert:
   1. salary is less than 0
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`employee_check`$$
CREATE TRIGGER  `db_final`.`employee_check` BEFORE INSERT ON `employee` FOR EACH ROW 
BEGIN
	IF NEW.`salary`<0 THEN
		SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Salary cannot be negative';
	END IF;
END$$

DELIMITER ;

/* --------- Trigger for Customer Table ---------
   Situations Preventing Insert:
   1. email is not in valid form
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`customer_email_check`$$
CREATE TRIGGER  `db_final`.`customer_email_check` BEFORE INSERT ON `customer` FOR EACH ROW 
BEGIN
    IF NEW.`customer_email` NOT LIKE '%_@%_.__%' THEN
		SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Email is not valid';
	END IF;
END$$

DELIMITER ;

/* --------- Trigger for Book Table ---------
   Situations Preventing Insert:
   1. book stock can't be less than 0
   2. book price can't be less than 0
*/		
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`book_check`$$
CREATE TRIGGER  `db_final`.`book_check` BEFORE INSERT ON `book` FOR EACH ROW 
BEGIN
    IF NEW.`price`<0 THEN
		SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Price cannot be negative';
	END IF;
    IF NEW.`stock`<0 THEN
		SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Stock cannot be negative';
	END IF;
END$$

DELIMITER ;

/* --------- Trigger for Item Table ---------
   Situations Preventing Insert:
   1. quantity can't be less than 1
   2. quantity can't exceed the current stock
   3. the book already exists in the order
*/	
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`quantity_check`$$
CREATE TRIGGER  `db_final`.`quantity_check` BEFORE INSERT ON `item` FOR EACH ROW 
BEGIN
    DECLARE cur_stock INT;
    DECLARE num INT;
    
    IF NEW.quantity<1 THEN signal sqlstate '45000' SET message_text = 'Quantity should be more than 0'; END IF;
    
    SELECT book.stock INTO cur_stock FROM book WHERE book.book_id=NEW.book_id;
    IF cur_stock<NEW.quantity THEN signal sqlstate '45000' SET message_text = 'There is not enough stock for this book'; END IF;
    
    SELECT COUNT(*) INTO num 
    FROM item WHERE order_id=NEW.order_id AND book_id=NEW.book_id;
    
    IF num<>0 THEN
	signal sqlstate '45000' SET message_text = 'The book is already included in this order, please update the quantity instead.';
    END IF;
END$$

DELIMITER ;

/* --------- Trigger for Location Table ---------
   Situations Preventing Insert:
   1. same location
*/		
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`location_check`$$
CREATE TRIGGER  `db_final`.`location_check` BEFORE INSERT ON `location` FOR EACH ROW 
BEGIN
	DECLARE num INT;
   SELECT COUNT(*) INTO num
   FROM `db_final`.`location` AS L WHERE NEW.shelf_no=L.shelf_no AND NEW.row=L.row AND NEW.column=L.column;
   IF num<>0 THEN SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Duplicated location'; END IF;
END$$

DELIMITER ;
		
/* --------- Trigger for Location Table ---------
   Situations Preventing Update:
   1. same location
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`location_update_check`$$
CREATE TRIGGER  `db_final`.`location_update_check` BEFORE UPDATE ON `location` FOR EACH ROW
BEGIN
   DECLARE num INT;
   SELECT COUNT(*) INTO num
   FROM `db_final`.`location` AS L WHERE NEW.shelf_no=L.shelf_no AND NEW.row=L.row AND NEW.column=L.column;
   IF num<>0 THEN SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'Duplicated location'; END IF;
END$$

DELIMITER ;

/* --------- Trigger for Employee Table ---------
   Situations Preventing Update:
   1. password encryption matched
*/
DELIMITER $$
USE `db_final`$$
DROP TRIGGER IF EXISTS `db_final`.`employee_password_check`$$
CREATE TRIGGER  `db_final`.`employee_password_check` BEFORE INSERT ON `employee` FOR EACH ROW
BEGIN
    DECLARE encrypt_key varchar(20);
    SET encrypt_key='key';
    SET NEW.employee_password = aes_encrypt(NEW.employee_password, encrypt_key);
END$$

DELIMITER ;
