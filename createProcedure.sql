USE `db_final`;

/* Given an order id, update the stock of books */
DROP procedure IF EXISTS `update_stock_while_placing_order`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `update_stock_while_placing_order`(IN orderID VARCHAR(100), OUT book_updated_count INT)
BEGIN
    DECLARE num INT;
    DECLARE qu INT;  
    DECLARE b_id VARCHAR(100);
    SET book_updated_count=0;
    
    SELECT COUNT(*) INTO num
    FROM item
    WHERE item.order_id=orderID;
    
    WHILE num>book_updated_count  DO
        SELECT item.quantity, item.book_id INTO qu, b_id
        FROM item
        WHERE item.order_id=orderID
        ORDER BY item.order_id
        LIMIT book_updated_count, 1;
        
        UPDATE book
        SET book.stock=book.stock-qu
        WHERE book.book_id=b_id;
        
        SET book_updated_count=book_updated_count+1;
    END WHILE;
    SELECT book_updated_count;
END$$
DELIMITER ;
                                                      
/* Given order id, return total price and total item count */
DROP procedure IF EXISTS `calculus_total_price`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `calculus_total_price`(IN id VARCHAR(100), OUT total DECIMAL(10, 1), OUT item_count INT)
BEGIN
    DECLARE num INT;
    DECLARE i INT DEFAULT 0;
    DECLARE qua INT;
    DECLARE pri DECIMAL(10, 1);
    SET total=0;
    SET item_count=0;
    
    SELECT COUNT(*) INTO num
    FROM item 
    WHERE item.order_id=id;
    
    WHILE num>i DO
        SELECT item.quantity, book.price INTO qua, pri
        FROM item INNER JOIN book
        WHERE item.order_id=id AND book.book_id=item.book_id
        ORDER BY id
        DESC LIMIT i, 1;
        SET total=total+qua*pri;
        SET item_count=item_count+qua;
        SET i=i+1;
    END WHILE;
    SELECT total, item_count;
END$$

DELIMITER ;

                                                                                                                        
/* Add item: if book already exists, then update quantity.
   Otherwise, create new item */                                                                                                                        
DROP procedure IF EXISTS `add_item`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `add_item`(IN itemId VARCHAR(100), IN orderId VARCHAR(100), IN qua INT, IN bookId VARCHAR(100),
							OUT new_itemId VARCHAR(100), OUT new_orderId VARCHAR(100), OUT new_qua INT, OUT new_bookId VARCHAR(100))
BEGIN
	DECLARE num INT;
    DECLARE i INT DEFAULT 0;
    DECLARE cur_qua INT;
    
	SELECT COUNT(*) INTO num 
    FROM item WHERE order_id=orderId AND book_id=bookId;
    
	IF num=0 THEN
		INSERT INTO item (`item_id`, `order_id`, `quantity`, `book_id`) 
		VALUES (itemId, orderId, qua, bookId);
        
        SELECT itemId, orderId, qua, bookId INTO new_itemId, new_orderId, new_qua, new_bookId;
	ELSE 
		SELECT item.quantity, item.item_id INTO cur_qua, itemId FROM item 
        WHERE order_id=orderId AND book_id=bookId;
        
        SET cur_qua=cur_qua+qua;
		UPDATE item SET item.quantity=cur_qua WHERE order_id=orderId AND book_id=bookId;
        
        SELECT itemId, orderId, cur_qua, bookId INTO new_itemId, new_orderId, new_qua, new_bookId;
    END IF;
    
    SELECT new_itemId, new_orderId, new_qua, new_bookId;
END$$


/* Delete an order and its related items */     
DELIMITER ;

USE `db_final`;
DROP procedure IF EXISTS `delete_order`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `delete_order` (IN orderId VARCHAR(100), OUT result BOOLEAN)
BEGIN
	SET result=false;
    
	DELETE FROM `db_final`.`item` WHERE order_id=orderId;
    DELETE FROM `db_final`.`order` WHERE order_id=orderId;
    
    SET result=true;
END$$

DELIMITER ;
						    
/* Delete timesheet with all periods under it */
DROP procedure IF EXISTS `delete_timesheet`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `delete_timesheet`(IN timesheetID VARCHAR(100), OUT result BOOLEAN)
BEGIN
    SET result=false;

    DELETE FROM `db_final`.`period` WHERE period.timesheet_id=timesheetID;
    DELETE FROM `db_final`.`timesheet` WHERE timesheet.timesheet_id=timesheetID;

    SET result=true;
    SELECT result;
END$$
DELIMITER ;
