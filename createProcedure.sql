USE `db_final`;

/* Given a book id and new stock number, update current stock of the book */
DROP procedure IF EXISTS `update_stock`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `update_stock` (IN id VARCHAR(100), IN new_stock INT)
BEGIN
    UPDATE `db_final`.`book` 
    SET stock=new_stock
    WHERE book_id=id;
END$$

DELIMITER ;

/* Given a book id, return location details */
DROP procedure IF EXISTS `check_book_location`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `check_book_location` (IN id VARCHAR(100))
BEGIN
	SELECT location.shelf_no, location.row, location.column
	FROM book INNER JOIN location
	WHERE book.location_id=location.location_id AND book.book_id=id;
END$$

DELIMITER ;
                                                      
                                                      
/* Given order id, return total price and total item count */
DROP procedure IF EXISTS `calculus_total_price`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `calculus_total_price`(IN id VARCHAR(100))
BEGIN
    DECLARE num INT;
    DECLARE i INT DEFAULT 0;
    DECLARE qua INT;
    DECLARE pri DECIMAL(10, 1);
    DECLARE total DECIMAL(10, 1) DEFAULT 0;
    DECLARE item_count INT DEFAULT 0;
    
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
    
    SELECT item_count, total;
END$$

DELIMITER ;

