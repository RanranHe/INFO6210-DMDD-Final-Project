CALL calculus_total_price('e8d546df-d823-41bc-8ec2-1f232d879c35', @total, @item_count);
SELECT @total, @item_count;

CALL update_stock_while_placing_order('e8d546df-d823-41bc-8ec2-1f232d879c35', @updated_book_count);
SELECT @updated_book_count;
