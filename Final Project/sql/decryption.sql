OPEN SYMMETRIC KEY EmpPass_SM  
   DECRYPTION BY CERTIFICATE EmpPass;  

GO
use db_final;
SELECT *, 
    CONVERT(varchar, DecryptByKey(pass))   
    AS 'Decrypted password'  
    FROM dbo.employee; 
