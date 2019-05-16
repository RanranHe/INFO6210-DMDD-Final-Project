begin tran
update employee set employee_name='test1' where username='roman';
if @@ERROR <> 0 rollback;
commit transaction;

select * from employee where username='roman'

select * from employee (noLOCK) where username='roman'

set lock_timeout 800
select * from employee where username='roman'
