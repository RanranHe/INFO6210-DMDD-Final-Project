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
    SET y=YEAROF(CURDATE());
    SET m=MONTHOF(CURDATE());
    
    IF NEW.year>=y AND NEW.month>m THEN signal sqlstate '45000' SET message_text = 'Timesheet cannot be later than current month'; END IF;
    
END$$

DELIMITER ;
