begin tran
 save transaction a;
 update employee set username= 'roma' where employee_name='Antonia Faure';
 if @@error <> 0 rollback transaction a;
 save transaction b;
 update employee set username= 'roman' where employee_name='Antonia Faure';
 if @@error <> 0 rollback transaction b;
commit transaction;
