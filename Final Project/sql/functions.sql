create function get_employee_info (@username varchar(45))
returns varchar(200) as
begin
 declare @result varchar(200)
 select @result=employee_name + ' ' + employee_phone
 from dbo.employee where username=@username;
 return @result;
end

go
select dbo.get_employee_info('roman') as 'result';
