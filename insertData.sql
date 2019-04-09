/* -------------------------------------------Customer Table--------------------------------------------------*/
INSERT  INTO `db_final`.`customer` (`customer_id`, `customer_name`, `customer_phone`, `customer_email`) 
VALUES ('8ee7b542-c493-404e-bdd4-19f2a4267708',  'Ankit Acciaio', '2615102674',  'Ankit@gmail.com');

INSERT  INTO `db_final`.`customer` (`customer_id`, `customer_name`, `customer_phone`, `customer_email`) 
VALUES ('7f11187d-6488-4a87-9f36-72e3ec483552',  'Ethan Brioschi', '8472951564',  'Ethan@gmail.com');

/* -------------------------------------------Author Table--------------------------------------------------*/
INSERT INTO `db_final`.`author` (`author_id`, `author_name`, `date_of_birth`) 
VALUES ('2a977f4b-abb6-4cf3-a578-67f8e840ae60', 'Sakshi Zunino', '1967-12-12');

INSERT INTO `db_final`.`author` (`author_id`, `author_name`, `date_of_birth`) 
VALUES ('0118be2d-e9ef-4e87-9a74-b3b894cb9cfa', 'Kip Both', '1968-12-12');

/* -------------------------------------------Category Table--------------------------------------------------*/
INSERT INTO `db_final`.`category` (`category_id`, `category_name`) 
VALUES ('ff507b57-f414-4a45-a336-4bec067b66c9', 'Business');

INSERT INTO `db_final`.`category` (`category_id`, `category_name`) 
VALUES ('8522ad28-9718-47e1-8387-9597e2411e7b', 'Kids');

INSERT INTO `db_final`.`category` (`category_id`, `category_name`) 
VALUES ('850cbdbd-efa9-4259-8072-a8f1a0d67a40', 'History');

INSERT INTO `db_final`.`category` (`category_id`, `category_name`) 
VALUES ('2616c440-509d-43c3-ad03-78571c41a695', 'Cooking');

/* -------------------------------------------Publisher Table--------------------------------------------------*/
INSERT INTO `db_final`.`publisher` (`publisher_id`, `publisher_name`, `country`, `city`) 
VALUES ('b38fa766-0ded-4fc9-a038-1cbbf55c1f62', 'American Press Inc', 'US', 'Boston');

INSERT INTO `db_final`.`publisher` (`publisher_id`, `publisher_name`, `country`, `city`) 
VALUES ('ff2e7858-8360-430f-a26a-16538fd5af6d', 'Harvard Common Press', 'US', 'Boston');

INSERT INTO `db_final`.`publisher` (`publisher_id`, `publisher_name`, `country`, `city`) 
VALUES ('dd4e9d89-cf5a-4564-8b0f-2a0489c5fa5e', 'National Braille Press', 'US', 'Boston');

/* -------------------------------------------Location Table--------------------------------------------------*/
INSERT INTO `db_final`.`location` (`location_id`, `shelf_no`, `row`, `column`) 
VALUES ('e487f555-dfdf-4c7f-b4e8-a59fb6524fc5', '1', '1', '1');

INSERT INTO `db_final`.`location` (`location_id`, `shelf_no`, `row`, `column`) 
VALUES ('14221076-619e-4bc9-b2f7-3eb060541bf4', '2', '4', '3');

INSERT INTO `db_final`.`location` (`location_id`, `shelf_no`, `row`, `column`) 
VALUES ('ffb81aee-7d4c-49ec-a6c5-74791e685043 ', '2', '1', '1');

/* -------------------------------------------Timesheet Table--------------------------------------------------*/
INSERT INTO `db_final`.`timesheet` (`timesheet_id`, `year`, `month`) 
VALUES ('99a60782-b681-4e84-b8a8-2b0a98c8fa6f', '2019', '1');

INSERT INTO `db_final`.`timesheet` (`timesheet_id`, `year`, `month`) 
VALUES ('7250bcb9-cf7a-4aac-bef7-cee76c731ac9', '2019', '1');

INSERT INTO `db_final`.`timesheet` (`timesheet_id`, `year`, `month`) 
VALUES ('38ed6367-7377-4b12-a1b0-7dd9893cb00d', '2019', '1');

/* -------------------------------------------Employee Table--------------------------------------------------*/
INSERT INTO `db_final`.`employee` (`employee_id`, `employee_name`, `employee_phone`, `salary`, `timesheet_id`) 
VALUES ('295375e3-4923-42b0-b09d-b8d3aa146ff6', 'Roman Kunz', '3542051168', '5000', 
'99a60782-b681-4e84-b8a8-2b0a98c8fa6f');

INSERT INTO `db_final`.`employee` (`employee_id`, `employee_name`, `employee_phone`, `salary`, `timesheet_id`) 
VALUES ('76f6b20e-9c24-4468-9c92-32c49dd84373', 'Nevan Ríos', '5174750581', '6000',
'7250bcb9-cf7a-4aac-bef7-cee76c731ac9');

INSERT INTO `db_final`.`employee` (`employee_id`, `employee_name`, `employee_phone`, `salary`, `timesheet_id`) 
VALUES ('23867168-4808-4a69-a944-a7024d671794', 'Antonia Faure', 
'6626957215', '4000', '38ed6367-7377-4b12-a1b0-7dd9893cb00d');

/* -------------------------------------------Book Table--------------------------------------------------*/
INSERT INTO `db_final`.`book` (`book_id`, `price`, `location_id`, `stock`, `book_name`, 
`publisher_id`, `author_id`, `publisher_date`, `description`, `category_id`) 
VALUES ('cf4e3491-cfcc-4dd0-bef1-1e7ff602e5c7', '8', '14221076-619e-4bc9-b2f7-3eb060541bf4', '100', 
'121 Good-Eating Tips', 'dd4e9d89-cf5a-4564-8b0f-2a0489c5fa5e', '0118be2d-e9ef-4e87-9a74-b3b894cb9cfa', 
'2010-10-23', 'This is your guide to eating healthfully the quick-and-easy way!',
'2616c440-509d-43c3-ad03-78571c41a695');

INSERT INTO `db_final`.`book` (`book_id`, `price`, `location_id`, `stock`, `book_name`, 
`publisher_id`, `author_id`, `publisher_date`, `description`, `category_id`) 
VALUES ('63534709-a711-44a9-8baa-6574a2e4304e', '10', 'e487f555-dfdf-4c7f-b4e8-a59fb6524fc5', '100', 
'12 Amazing Tricks', 'dd4e9d89-cf5a-4564-8b0f-2a0489c5fa5e', '2a977f4b-abb6-4cf3-a578-67f8e840ae60', 
'2016-11-10', 'Kids will love amazing their friends with these twelve magic tricks that use items found around the house.',
'8522ad28-9718-47e1-8387-9597e2411e7b');

/* -------------------------------------------Order Table--------------------------------------------------*/
INSERT INTO `db_final`.`order` (`order_id`, `customer_id`, `order_date`, `employee_id`)
VALUES ('e8d546df-d823-41bc-8ec2-1f232d879c35', '7f11187d-6488-4a87-9f36-72e3ec483552', 
'2019-01-21', '23867168-4808-4a69-a944-a7024d671794');

INSERT INTO `db_final`.`order` (`order_id`, `customer_id`, `order_date`, `employee_id`)
VALUES ('87fd8c6c-cf0d-42b4-81c8-161ab7876438', '7f11187d-6488-4a87-9f36-72e3ec483552', 
'2019-01-21', '295375e3-4923-42b0-b09d-b8d3aa146ff6');

/* -------------------------------------------Item Table--------------------------------------------------*/
INSERT INTO `db_final`.`item` (`item_id`, `order_id`, `quantity`, `book_id`) 
VALUES ('2f4a4e0d-a47a-4dc1-a905-554b4c399bc4', 'e8d546df-d823-41bc-8ec2-1f232d879c35', '1', '63534709-a711-44a9-8baa-6574a2e4304e');

INSERT INTO `db_final`.`item` (`item_id`, `order_id`, `quantity`, `book_id`) 
VALUES ('066fa2f7-8fd5-4126-9dac-64ed9f404724', 'e8d546df-d823-41bc-8ec2-1f232d879c35', '3', 'cf4e3491-cfcc-4dd0-bef1-1e7ff602e5c7');

