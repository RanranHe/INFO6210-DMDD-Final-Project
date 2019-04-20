OPEN SYMMETRIC KEY EmpPass_SM  
   DECRYPTION BY CERTIFICATE EmpPass;  

GO
use dmdd;
SELECT *, 
    CONVERT(varchar, DecryptByKey(pass))   
    AS 'Decrypted password'  
    FROM dbo.employee; 
