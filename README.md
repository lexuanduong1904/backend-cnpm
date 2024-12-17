Nest.js template

Môi trường chạy dự án: Node.js v21.5.0
https://nodejs.org/download/release/v21.5.0/

Về tác giả
Mọi thông tin về Tác giả Duongkobietcode, các bạn có thể tìm kiếm tại đây:

1. Cấu hình cho databasedatabase
   Database sử dụng: MS SQL Server v20.0
   B1: Tạo 1 tài khoản để có thể đăng nhập vào SQL Server bằng SQL Server Authenticate
   B2: Đổi tên file .env.example -> .env
   B3: Lấy tài khoản và mật khẩu vừa tạo ghi vào phần DB_USER và DB_PASSWORD
   B4: Tạo 1 database mới ( nếu chưa tạo )
   B5: Viết vào file .env tên database vừa tạo
   \*Lưu ý: Nếu chạy ở môi trường local thì có thể điền vào file .env như sau: DB_HOST=localhost, DB_PORT=1433

2. Trong file .env còn phần JWT_SECRET và JWT_ACCESS_TOKEN_EXPIRED
   JWT_SECRET là 1 chuỗi ngẫu nhiên (có thể lên https://www.uuidgenerator.net/ để lấy 1 chuỗi ngẫu nhiên)
   JWT_ACCESS_TOKEN_EXPIRED là thời gian sống của access_token có thể để (5m, 5h, 5d,...)
   Dự án sẽ chạy trên PORT của .env (nếu không được thiết lập thì mặc định là port 8080)

3. Các bước chạy dự án
   B1: Clone code
   B2: Để cài đặt các package mmở terminal ở thư mục gốc của dự án chạy lệnh npm i
   B3: Sau khi cài đặt xong các package thì sử dụng lệnh npm run dev để chạy dự ánán

===
Các bước cài đặt: (chế độ development)

clone code
cài đặt thư viện: npm i
Update file .env.development (nếu cần thiết)
Chạy dự án: npm run dev

===
Cách chạy tại chế độ production:

clone code
cài đặt thư viện: npm i
Update file .env.production (nếu cần thiết)
Build dự án: npm run build
Chạy dự án: npm run preview

Note: Trong file package.json có thể có nhiều package không được dùng dến có thể xóa đi nếu không cần thiết
