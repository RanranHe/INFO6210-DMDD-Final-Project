/* check login username & password */
create procedure check_login @username varchar(45), @in_pass varchar(20), @result int output as 
begin
declare @pass varchar(20);
open symmetric key EmpPass_SM decryption by certificate EmpPass;

select @pass=CONVERT(varchar, DecryptByKey(pass)) from employee where username=@username;
if @pass=@in_pass set @result=1;  else set @result=0;
SELECT @result AS 'valid';
end;

/* call procedure */
go 
DECLARE @res INT;
EXEC check_login @username='roman', @in_pass = 'roman', @result = @res OUTPUT;
 
