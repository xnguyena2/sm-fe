---
title: Nhập danh sách sản phẩm hàng loạt từ Excel
seoTitle: Nhập danh sách sản phẩm từ Excel vào SoDi
description: "Hướng dẫn nhập sản phẩm hàng loạt từ Excel vào SoDi: lấy file mẫu, điền và làm sạch dữ liệu, nhập thử file nhỏ rồi kiểm tra, thay vì gõ tay từng món."
lead: Có sẵn danh sách hàng trong Excel? Nhập một lần vào SoDi thay vì gõ tay từng món trên điện thoại.
slug: nhap-san-pham-tu-excel
keyword: nhập sản phẩm từ Excel
datePublished: 2026-11-20
dateModified: 2026-11-20
order: 6
related:
  - quan-ly-kho-hang
  - phan-mem-quan-ly-tap-hoa
  - bat-dau-voi-sodi
faq:
  - q: Nhập Excel có ghi đè sản phẩm đang có không?
    a: Hãy kiểm tra trong app trước khi nhập. An toàn nhất là nhập thử một file nhỏ vài dòng để xem SoDi xử lý thế nào, rồi mới nhập file đầy đủ.
  - q: Ảnh sản phẩm có nhập bằng Excel được không?
    a: Ảnh thường thêm sau, ngay trong app. Bạn chỉ cần thêm ảnh cho các món bán chạy, không cần làm hết một lúc.
  - q: Tôi có thể xuất dữ liệu ra Excel không?
    a: Có. Các báo cáo của SoDi xuất được ra Excel để lưu trữ hoặc gửi kế toán.
---

<!-- TODO: kiểm tra trong app: tên chức năng nhập Excel, file mẫu và các cột bắt buộc, rồi sửa bài cho khớp -->

Gõ tay vài chục món thì được, nhưng tiệm tạp hóa hay shop có vài trăm đến vài nghìn sản phẩm thì gõ trên điện thoại mất cả ngày. SoDi cho nhập danh sách sản phẩm hàng loạt từ file Excel. Bài này hướng dẫn cách chuẩn bị file để nhập một lần là đúng.

## Khi nào nên nhập từ Excel

- Bạn có trên khoảng 50 sản phẩm.
- Bạn đã có danh sách hàng trong Excel, Google Sheets, hoặc file từ nhà cung cấp.
- Bạn chuyển từ sổ sách hoặc phần mềm khác sang SoDi.

Ít món hơn, thêm tay trong app sẽ nhanh hơn. Xem bài [bắt đầu với SoDi](/huong-dan/bat-dau-voi-sodi).

## Bước 1: Lấy file mẫu

Trong phần nhập sản phẩm từ Excel của SoDi, dùng **file mẫu** mà app cung cấp. File mẫu có sẵn đúng tên cột và thứ tự cột mà SoDi đọc được. Đừng tự tạo file với tên cột khác.

<!-- TODO: ảnh màn hình chức năng nhập Excel và file mẫu -->

## Bước 2: Điền dữ liệu

Thông tin thường có cho mỗi sản phẩm:

- **Tên sản phẩm** – ngắn gọn, dễ tìm. Ví dụ "Sữa tươi TH 180ml" thay vì "sua tuoi".
- **Danh mục** – ví dụ Sữa, Nước ngọt, Bánh kẹo, Cà phê.
- **Giá bán** – chỉ ghi số, không ghi "đ" hay dấu chấm phân cách nếu file mẫu không yêu cầu.
- **Giá vốn** – để báo cáo tính được lãi.
- **Mã vạch** – nếu có, để quét bằng camera khi bán.

Điền theo đúng các cột của file mẫu. Cột nào file mẫu không có thì bỏ qua, thêm sau trong app.

## Bước 3: Làm sạch dữ liệu

Phần lớn lỗi khi nhập đến từ dữ liệu bẩn. Trước khi nhập, kiểm tra:

1. **Không có dòng trống** ở giữa danh sách.
2. **Không trùng tên.** Dùng chức năng lọc trùng của Excel.
3. **Giá là số**, không phải chữ. Ô giá căn phải thường là số, căn trái thường là chữ.
4. **Mã vạch giữ đủ số.** Excel hay tự đổi mã vạch dài thành dạng 8,93E+12. Định dạng cột mã vạch là **Text** trước khi dán.
5. **Tên danh mục viết thống nhất.** "Nước ngọt" và "nuoc ngot" sẽ thành hai danh mục khác nhau.

Ví dụ minh họa:

| Tên sản phẩm | Danh mục | Giá bán | Giá vốn | Mã vạch |
| --- | --- | --- | --- | --- |
| Nước ngọt lon 330ml | Nước ngọt | 10000 | 7500 | 8930000000001 |
| Mì gói tôm chua cay | Mì, phở gói | 4500 | 3600 | 8930000000002 |
| Sữa tươi 180ml | Sữa | 8000 | 6300 | 8930000000003 |

(Các mã vạch và giá trong bảng chỉ là ví dụ.)

<!-- cta -->

## Bước 4: Nhập thử file nhỏ

Đừng nhập ngay file 2.000 dòng. Hãy:

1. Copy 5–10 dòng đầu ra một file riêng.
2. Nhập file nhỏ này vào SoDi.
3. Mở app kiểm tra: tên, giá, danh mục, mã vạch có đúng không.
4. Thử quét mã vạch một sản phẩm để chắc mã vạch được nhập đúng.

Nếu đúng hết, nhập file đầy đủ.

## Bước 5: Nhập file đầy đủ và kiểm tra lại

Sau khi nhập:

- Xem tổng số sản phẩm trong app có khớp số dòng trong file không.
- Mở ngẫu nhiên vài sản phẩm ở đầu, giữa và cuối danh sách.
- Thêm size, thuộc tính, combo, giá sỉ, đơn vị quy đổi cho các món cần (làm trong app).
- Thêm ảnh cho các món bán chạy.

## Sau khi nhập: đưa tồn kho vào

Danh sách sản phẩm chỉ là "món gì, giá bao nhiêu". Để có số tồn, tạo **phiếu nhập kho** với số lượng hiện có. Xem bài [nhập kho, xuất kho, kiểm kho](/huong-dan/quan-ly-kho-hang).

## Mẹo cho tiệm tạp hóa

- Lấy file danh sách từ nhà cung cấp, thường đã có tên và mã vạch.
- Chia danh mục theo kệ trong tiệm để vừa dễ bán vừa dễ kiểm kho.
- Hàng bán theo thùng, lốc, lon: nhập sản phẩm theo đơn vị bán lẻ, rồi khai báo đơn vị quy đổi trong app.

Xem thêm [phần mềm quản lý tạp hóa](/nganh/phan-mem-quan-ly-tap-hoa).
