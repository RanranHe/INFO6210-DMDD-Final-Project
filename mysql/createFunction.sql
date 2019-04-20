USE `db_final`;
DROP function IF EXISTS `calculate_total_price`;

DELIMITER $$
USE `db_final`$$
CREATE FUNCTION `calculate_total_price` (id VARCHAR(100))
RETURNS INTEGER
BEGIN
	DECLARE num INT;
    DECLARE i INT DEFAULT 0;
    DECLARE qua INT;
    DECLARE pri DECIMAL(10, 1);
    DECLARE total DECIMAL(10, 1) DEFAULT 0;
    
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
        SET i=i+1;
    END WHILE;
RETURN total;
END$$

DELIMITER ;
