USE `db_final`;
CREATE  OR REPLACE VIEW `book_info` AS
SELECT B.book_name, P.publisher_name, A.author_name, C.category_name, B.price, L.shelf_no, L.row, L.column, B.stock
FROM book AS B INNER JOIN location AS L ON B.location_id=L.location_id
INNER JOIN publisher AS P ON B.publisher_id=P.publisher_id
INNER JOIN category AS C ON B.category_id=C.category_id
INNER JOIN author AS A ON B.author_id=A.author_id;

CREATE OR REPLACE VIEW `timesheet_details` AS
SELECT B.book_name, P.publisher_name, A.author_name, C.category_name, B.price, L.shelf_no, L.row, L.column, B.stock
FROM timesheet AS T INNER JOIN period AS P ON T.timesheet_id
INNER JOIN publisher AS P ON B.publisher_id=P.publisher_id
INNER JOIN category AS C ON B.category_id=C.category_id
INNER JOIN author AS A ON B.author_id=A.author_id
ORDER BY T.year, T.month, P.start_time DESC;

CREATE OR REPLAC VIEW `order_view` AS
SELECT O.order_id, C.customer_name, O.order_date, E.employee_name
FROM `order` AS O INNER JOIN `employee` AS E ON O.employee_id=E.employee_id
INNER JOIN `customer` AS C ON O.customer_id=C.customer_id;

CREATE  OR REPLACE VIEW `order_detials_view` AS
SELECT I.order_id, I.quantity, B.book_name
FROM `item` AS I INNER JOIN `book` AS B ON I.book_id=B.book_id;
