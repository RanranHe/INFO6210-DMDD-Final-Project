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
