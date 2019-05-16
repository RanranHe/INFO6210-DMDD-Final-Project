use sample
GO

INSERT INTO department (dept_no,dept_name,location) VALUES ('D1','Accounting','Dallas');
INSERT INTO department (dept_no,dept_name,location) VALUES ('D2','Finance','Seatle');
INSERT INTO department (dept_no,dept_name,location) VALUES ('D3','IT','Boston');
INSERT INTO department (dept_no,dept_name,location) VALUES ('D4','Operatins ','New York');
INSERT INTO department (dept_no,dept_name,location) VALUES ('D5','Sales','London');

INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15000','John ', 'Smith', 'D1');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15001','Mark', 'Kelter', 'D2');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15002','Peter', 'McDonalds', 'D3');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15003','Ba', 'Tran', 'D2');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15004','Rohit', 'Joshi', 'D3');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15005','Lei', 'Zhou', 'D4');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15006','Juan', 'Garcia', 'D5');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15007','Deshaun', 'Jackson', 'D2');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('15008','Lionell', 'Messi', 'D3');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('29346','Jay', 'Moser', 'D4');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('25348','Luke', 'Smith', 'D2');
INSERT INTO employee(emp_no,emp_fname, emp_lname,dept_no) VALUES ('28559','Matthew', 'Hoyer', 'D1');


INSERT INTO project (project_no,project_name ,budget ) VALUES('p1','Inventory system', 60000);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p2','CRM system', 90000);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p3','Order Management', 135000);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p4','Accounting System', 202500);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p5','ERP system', 303750);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p6','Data Warehouse', 455625);
INSERT INTO project (project_no,project_name ,budget ) VALUES('p7','corporate website', 683437.5);



INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15000','p1','Manager','1/3/2019');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15001','p2',null,'1/4/2019');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15002','p3','Software Developer','1/3/2020');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15003','p4','Data Engineer','1/4/2020');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15004','p5','Network Admin','1/3/2021');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15005','p6','Data Analyst','1/4/2021');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15006','p7','Data Engineer','1/3/2022');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15007','p1','Data Architect','1/4/2022');
INSERT INTO works_on (emp_no ,project_no ,job ,enter_date) VALUES ('15008','p2','DBA','1/3/2023');



