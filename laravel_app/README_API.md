#Step create api

    1.Tạo database schema bằng dòng lệnh php artisan make:migration table_name
    2. Tạo model bằng dòng lệnh php artisan make:model ModelName
    3. Copy Api SampleApiController vào thư mục Http/Controller/API đổi name thành object muốn dùng  
    4. Copy Repository và interface từ sample -> đổi name thành class muốn sử dụng
    5. Copy Service bỏ vào thư mục app/Services folder đổi name.
    6. Copy router api hiện tại, groups thành name model muốn dùng 

#####Lưu ý:
    1. Variable phải đặt name có _ phía dưới: vd: first_name
    2. Function phải viết thường ký tự đầu tiên: vd: getDict
    3. Business phải được viết trong lớp Service. Không được đặt trong controller

