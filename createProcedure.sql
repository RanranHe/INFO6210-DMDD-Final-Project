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
END$$
DELIMITER ;

/* Given a book id, return location, author, publisher, category details */
DROP procedure IF EXISTS `check_book_details`;

DELIMITER $$
USE `db_final`$$
CREATE PROCEDURE `check_book_details`(IN id VARCHAR(100), OUT shelf INT, OUT b_row INT, OUT b_column INT, 
OUT p_name VARCHAR(45), OUT p_country VARCHAR(45), OUT p_city VARCHAR(45), OUT category VARCHAR(45), OUT author VARCHAR(45))
BEGIN
    SELECT location.shelf_no, location.row, location.column INTO shelf, b_row, b_column
    FROM book INNER JOIN location
    WHERE book.location_id=location.location_id AND book.book_id=id;
    
    SELECT publisher.publisher_name, publisher.country, publisher.city INTO p_name, p_country, p_city
    FROM book INNER JOIN publisher
    WHERE book.publisher_id=publisher.publisher_id AND book.book_id=id;
    
    SELECT category.category_name INTO category
    FROM book INNER JOIN category
    WHERE book.category_id=category.category_id AND book.book_id=id;
    
    SELECT author.author_name INTO author
    FROM book INNER JOIN author
    WHERE book.author_id=author.author_id AND book.book_id=id;
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
END$$

DELIMITER ;

