use dmdd;
GO
INSERT INTO dbo.customer (customer_id, customer_name, customer_phone, customer_email) 
VALUES ('8ee7b542-c493-404e-bdd4-19f2a4267708',  'Ankit Acciaio', '2615102674',  'Ankit@gmail.com');

INSERT  INTO dbo.customer (customer_id, customer_name, customer_phone, customer_email) 
VALUES ('7f11187d-6488-4a87-9f36-72e3ec483552',  'Ethan Brioschi', '8472951564',  'Ethan@gmail.com');

INSERT  INTO dbo.customer (customer_id, customer_name, customer_phone, customer_email) 
VALUES ('49ba69e4-77ee-4d39-9c7e-ae17d6963cad',  'Miran Yates', '2025550149',  'Miran@gmail.com');

/* -------------------------------------------Author Table--------------------------------------------------*/
INSERT INTO dbo.author (author_id, author_name, date_of_birth) 
VALUES ('2a977f4b-abb6-4cf3-a578-67f8e840ae60', 'Sakshi Zunino', '1967-12-12');

INSERT INTO dbo.author (author_id, author_name, date_of_birth) 
VALUES ('0118be2d-e9ef-4e87-9a74-b3b894cb9cfa', 'Kip Both', '1968-12-12');

/* -------------------------------------------Category Table--------------------------------------------------*/
INSERT INTO dbo.category(category_id, category_name) 
VALUES ('ff507b57-f414-4a45-a336-4bec067b66c9', 'Business');

INSERT INTO dbo.category (category_id, category_name) 
VALUES ('8522ad28-9718-47e1-8387-9597e2411e7b', 'Kids');

INSERT INTO dbo.category (category_id, category_name) 
VALUES ('850cbdbd-efa9-4259-8072-a8f1a0d67a40', 'History');

INSERT INTO dbo.category (category_id, category_name) 
VALUES ('2616c440-509d-43c3-ad03-78571c41a695', 'Cooking');

/* -------------------------------------------Publisher Table--------------------------------------------------*/
INSERT INTO dbo.publisher (publisher_id, publisher_name, country, city) 
VALUES ('b38fa766-0ded-4fc9-a038-1cbbf55c1f62', 'American Press Inc', 'US', 'Boston');

INSERT INTO dbo.publisher (publisher_id, publisher_name, country, city) 
VALUES ('ff2e7858-8360-430f-a26a-16538fd5af6d', 'Harvard Common Press', 'US', 'Boston');

INSERT INTO dbo.publisher (publisher_id, publisher_name, country, city) 
VALUES ('dd4e9d89-cf5a-4564-8b0f-2a0489c5fa5e', 'National Braille Press', 'US', 'Boston');

/* -------------------------------------------Location Table--------------------------------------------------*/
INSERT INTO dbo.location (location_id, shelf_no, shelf_row, shelf_column) 
VALUES ('e487f555-dfdf-4c7f-b4e8-a59fb6524fc5', '1', '1', '1');

INSERT INTO dbo.location (location_id, shelf_no, shelf_row, shelf_column) 
VALUES ('14221076-619e-4bc9-b2f7-3eb060541bf4', '2', '4', '3');

INSERT INTO dbo.location (location_id, shelf_no, shelf_row, shelf_column) 
VALUES ('ffb81aee-7d4c-49ec-a6c5-74791e685043', '2', '1', '1');

