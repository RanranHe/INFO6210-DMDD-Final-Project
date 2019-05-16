create database db_final;

DROP TABLE IF EXISTS dbo.customer;
CREATE TABLE customer
(customer_id VARCHAR(100) PRIMARY KEY NOT NULL, customer_name VARCHAR(45) NOT NULL, 
customer_phone CHAR(10) NOT NULL, customer_email VARCHAR(45) NOT NULL);

DROP TABLE IF EXISTS dbo.employee;
CREATE TABLE employee
(employee_id VARCHAR(100) PRIMARY KEY NOT NULL, employee_name VARCHAR(45) NOT NULL,
employee_phone CHAR(10) NOT NULL, salary DECIMAL(10,1) NOT NULL);

DROP TABLE IF EXISTS dbo.book;

DROP TABLE IF EXISTS dbo.location;
CREATE TABLE location
(location_id VARCHAR(100) PRIMARY KEY NOT NULL, shelf_no INT, shelf_row INT, shelf_column INT);

DROP TABLE IF EXISTS dbo.author;
CREATE TABLE author
(author_id VARCHAR(100) PRIMARY KEY NOT NULL, author_name VARCHAR(45) NOT NULL, 
date_of_birth DATE);

DROP TABLE IF EXISTS dbo.category;
CREATE TABLE category
(category_id VARCHAR(100) PRIMARY KEY NOT NULL, category_name VARCHAR(45) NOT NULL);

ALTER TABLE employee
ADD username varchar(45) UNIQUE NOT NULL, pass varbinary(400) NOT NULL;

DROP TABLE IF EXISTS dbo.publisher;
CREATE TABLE publisher
(publisher_id VARCHAR(100) PRIMARY KEY NOT NULL, publisher_name VARCHAR(45) NOT NULL, 
country VARCHAR(45), city VARCHAR(45));

CREATE TABLE book
(book_id VARCHAR(100) PRIMARY KEY NOT NULL, price DECIMAL(10, 1) NOT NULL, 
location_id VARCHAR(100) NOT NULL FOREIGN KEY REFERENCES dbo.location(location_id),
stock INT NOT NULL, book_name VARCHAR(65) NOT NULL, 
publisher_id VARCHAR(100) NOT NULL FOREIGN KEY REFERENCES dbo.publisher(publisher_id),
publish_date DATE, book_description VARCHAR(256));

ALTER TABLE dbo.book ADD author_id VARCHAR(100);
ALTER TABLE dbo.book ALTER COLUMN author_id VARCHAR(100) NOT NULL;

ALTER TABLE dbo.book ADD CONSTRAINT FK_author 
FOREIGN KEY (author_id) REFERENCES dbo.author(author_id);

ALTER TABLE dbo.book ADD category_id VARCHAR(100) NOT NULL 
FOREIGN KEY REFERENCES dbo.category(category_id);
