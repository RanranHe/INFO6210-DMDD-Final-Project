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
USE `db_final`;
DROP procedure IF EXISTS `check_book_details`;

DELIMITER $$
USE `db_final`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_book_details`(IN id VARCHAR(100))
BEGIN
    DECLARE shelf INT DEFAULT 0;
    DECLARE b_row INT;
    DECLARE b_column INT;
    DECLARE p_name VARCHAR(45);
    DECLARE p_country VARCHAR(45);
    DECLARE p_city VARCHAR(45);
    DECLARE category VARCHAR(45);
    DECLARE author VARCHAR(45);
									       
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
    
    SELECT shelf, b_row, b_column, p_name, p_country, p_city, category, author;
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

