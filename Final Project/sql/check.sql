alter table employee add constraint CK_minSalary Check (salary >= 0);

alter table location 
add constraint CK_row Check (shelf_row >= 0 and shelf_column >=0 and shelf_no >= 0);
