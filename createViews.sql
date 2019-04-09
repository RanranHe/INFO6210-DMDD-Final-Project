USE `db_final`;
CREATE  OR REPLACE VIEW `book_info` AS
SELECT B.book_name, P.publisher_name, A.author_name, C.category_name, B.price, L.shelf_no, L.row, L.column, B.stock
FROM book AS B INNER JOIN location AS L ON B.location_id=L.location_id
INNER JOIN publisher AS P ON B.publisher_id=P.publisher_id
INNER JOIN category AS C ON B.category_id=C.category_id
INNER JOIN author AS A ON B.author_id=A.author_id;


