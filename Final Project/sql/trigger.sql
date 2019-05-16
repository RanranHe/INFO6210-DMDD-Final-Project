DROP TRIGGER IF EXISTS location_update_check;
GO
CREATE TRIGGER location_update_check ON dbo.location INSTEAD OF INSERT AS
BEGIN
   declare @shelf_no int, @shelf_column int, @shelf_row int;
   SELECT @shelf_no=shelf_no, @shelf_column=shelf_column, @shelf_row=shelf_row from inserted;
   DECLARE @num INT;
   SELECT @num=COUNT(*)
   FROM dbo.location AS L WHERE @shelf_no=L.shelf_no AND @shelf_column=L.shelf_column AND @shelf_row=L.shelf_row;
   IF @num<>0 RAISERROR (15600,-1,-1, 'error');
eND
