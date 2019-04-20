create master key encryption by password='finalproject';

go
create certificate EmpPass
with subject = 'employee password';

go
create symmetric key EmpPass_SM
with algorithm = AES_256
encryption by certificate EmpPass;

go
open symmetric key EmpPass_SM decryption by certificate EmpPass;

go
use db_final;
/* -------------------------------------------Employee Table--------------------------------------------------*/
INSERT INTO dbo.employee (employee_id, username, pass, employee_name, employee_phone, salary) 
VALUES ('295375e3-4923-42b0-b09d-b8d3aa146ff6', 'roman', ENCRYPTBYKEY(KEY_GUID('EmpPass_SM'), convert(varbinary, 'roman')), 
'Roman Kunz', '3542051168', '5000');

INSERT INTO dbo.employee (employee_id, username, pass, employee_name, employee_phone, salary) 
VALUES ('76f6b20e-9c24-4468-9c92-32c49dd84373', 'nevan', ENCRYPTBYKEY(KEY_GUID('EmpPass_SM'), convert(varbinary, 'nevan')), 
'Nevan Ríos', '5174750581', '6000');

INSERT INTO dbo.employee (employee_id, username, pass, employee_name, employee_phone, salary) 
VALUES ('23867168-4808-4a69-a944-a7024d671794', 'antonia', ENCRYPTBYKEY(KEY_GUID('EmpPass_SM'), convert(varbinary, 'antonia')), 
'Antonia Faure', '6783462957', '3000');

INSERT INTO dbo.employee (employee_id, username, pass, employee_name, employee_phone, salary) 
VALUES ('f577eb4d-4dba-4d8a-acf1-502d8fc25e99', 'marijn', ENCRYPTBYKEY(KEY_GUID('EmpPass_SM'), convert(varbinary, 'marijn')), 
'Marijn Martel', '1286934728', '4000');
