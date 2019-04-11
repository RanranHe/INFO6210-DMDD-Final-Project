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

/* Given a book id, return location, author, publisher, category details */
DROP procedure IF EXISTS `check_book_details`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `check_book_details`(IN id VARCHAR(100), OUT shelf INT, OUT b_row INT, OUT b_column INT, 
OUT p_name VARCHAR(45), OUT p_country VARCHAR(45), OUT p_city VARCHAR(45), OUT category VARCHAR(45), OUT author VARCHAR(45))
BEGIN
    SELECT L.shelf_no, L.row, L.column, P.publisher_name, P.country, P.city, C.category_name, A.author_name
    INTO shelf, b_row, b_column, p_name, p_country, p_city, category, author
    FROM book AS B INNER JOIN location AS L ON B.location_id=L.location_id
    INNER JOIN publisher AS P ON B.publisher_id=P.publisher_id
    INNER JOIN category AS C ON B.category_id=C.category_id
    INNER JOIN author AS A ON B.author_id=A.author_id
    WHERE B.book_id=id;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_item`(IN itemId VARCHAR(100), IN orderId VARCHAR(100), IN qua INT, IN bookId VARCHAR(100),
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

DELIMITER ;
