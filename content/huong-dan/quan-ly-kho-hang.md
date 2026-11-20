---
title: Nhập kho, xuất kho, kiểm kho và theo dõi tồn kho
seoTitle: Nhập kho, xuất kho, kiểm kho trên điện thoại
description: "Hướng dẫn quản lý kho hàng bằng SoDi: phiếu nhập kho, nhà cung cấp, xuất kho, kiểm kho, theo dõi tồn và giá trị tồn, lô hàng và hạn sử dụng trên điện thoại."
lead: Phiếu nhập kho, nhà cung cấp, xuất kho, kiểm kho và lô hàng có hạn dùng. Tồn kho tự trừ mỗi khi bán.
slug: quan-ly-kho-hang
keyword: quản lý kho hàng trên điện thoại
datePublished: 2026-11-20
dateModified: 2026-11-20
order: 5
related:
  - nhap-san-pham-tu-excel
  - phan-mem-quan-ly-tap-hoa
  - so-no-cong-no-khach-hang
faq:
  - q: Bán hàng xong tồn kho có tự trừ không?
    a: Có. Mỗi đơn bán ra, SoDi tự trừ số lượng của sản phẩm trong kho.
  - q: Nhập hàng chưa trả tiền nhà cung cấp thì ghi thế nào?
    a: Ghi phiếu nhập kho như bình thường, phần chưa trả ghi vào sổ nợ nhà cung cấp. Khi trả, ghi thu chi từng phần.
  - q: Bao lâu nên kiểm kho một lần?
    a: Tùy số mặt hàng. Nhiều cửa hàng kiểm toàn bộ mỗi tháng và kiểm nhanh hàng giá trị cao mỗi tuần.
---

<!-- TODO: kiểm tra lại tên nút và tên màn hình kho trong app trước khi deploy -->

Kho hàng đúng thì bạn mới biết nên nhập thêm gì, lãi thật bao nhiêu, và hàng có bị thất thoát không. Bài này hướng dẫn các việc kho cơ bản trên SoDi: nhập kho, xuất kho, kiểm kho và theo dõi tồn.

Chưa có sản phẩm trong SoDi? Thêm tay hoặc [nhập hàng loạt từ Excel](/huong-dan/nhap-san-pham-tu-excel) trước.

## Tồn kho trong SoDi hoạt động thế nào

- **Nhập kho** làm tăng tồn và cập nhật giá vốn.
- **Bán hàng** làm giảm tồn tự động, bạn không phải ghi thêm.
- **Xuất kho** làm giảm tồn vì lý do khác bán hàng (hàng hỏng, dùng nội bộ, trả nhà cung cấp…).
- **Kiểm kho** so số trong app với số đếm thật để điều chỉnh.

Nhờ vậy, số tồn trên app luôn gần với số thật, chỉ cần kiểm kho định kỳ để sửa chênh lệch.

## Bước 1: Thêm nhà cung cấp

Lưu thông tin nhà cung cấp bạn hay lấy hàng: tên, số điện thoại. Khi nhập hàng, chọn nhà cung cấp để sau này biết hàng nào lấy từ đâu và bạn còn nợ ai bao nhiêu.

## Bước 2: Tạo phiếu nhập kho

Mỗi lần nhận hàng, tạo một phiếu nhập kho:

1. Chọn nhà cung cấp.
2. Thêm sản phẩm, số lượng và **giá nhập**.
3. Với hàng có hạn dùng, ghi **lô** và **hạn sử dụng**.
4. Lưu phiếu. Tồn kho tăng và giá vốn được cập nhật.

Ví dụ minh họa: giả sử bạn nhập 10 thùng sữa, mỗi thùng 48 hộp, giá nhập 320.000đ/thùng, hạn dùng 6 tháng. Phiếu nhập ghi 480 hộp, tổng 3.200.000đ, lô và hạn dùng.

Nếu chưa trả đủ tiền, ghi phần còn thiếu vào [sổ nợ nhà cung cấp](/huong-dan/so-no-cong-no-khach-hang).

<!-- TODO: ảnh màn hình phiếu nhập kho -->

## Bước 3: Xuất kho khi không phải bán

Dùng phiếu xuất kho cho các trường hợp:

- Hàng hỏng, hàng hết hạn phải bỏ.
- Hàng dùng nội bộ (ví dụ quán lấy nước suối cho nhân viên).
- Trả lại hàng cho nhà cung cấp.

Ghi rõ lý do để cuối tháng biết bạn mất bao nhiêu vì hư hỏng.

<!-- cta -->

## Bước 4: Theo dõi tồn kho

Báo cáo kho cho bạn thấy:

- Số lượng còn lại của từng sản phẩm.
- **Giá trị tồn kho**: tiền đang nằm trong kệ và trong kho.
- Các lô sắp hết hạn để đưa ra bán trước.

Hàng có hạn dùng nên bán theo nguyên tắc **hết hạn trước, bán trước**. SoDi cảnh báo lô sắp hết hạn để bạn kịp giảm giá hoặc đẩy bán.

## Bước 5: Kiểm kho

Kiểm kho là đếm số lượng thật rồi so với số trên app.

1. Chọn thời điểm vắng khách, tốt nhất là sau giờ đóng cửa.
2. Đếm theo từng kệ hoặc từng danh mục, đừng đếm lộn xộn.
3. Nhập số đếm được vào phiếu kiểm kho.
4. SoDi cho thấy chênh lệch giữa số app và số thật.
5. Tìm nguyên nhân với những món lệch nhiều trước khi chốt.

Chênh lệch thường đến từ: quên ghi xuất kho hàng hỏng, bán mà không tạo đơn, nhập nhầm số lượng, hoặc thất thoát. Bài [cách kiểm kho cuối tháng](/kien-thuc/cach-kiem-kho-cuoi-thang) có cách làm chi tiết và mẫu phân công.

## Quán cafe, quán ăn: kho nguyên liệu

Quán pha chế, nấu ăn thường bán món nhưng nhập nguyên liệu. Khai báo nguyên liệu và công thức món trong SoDi để tính giá vốn từng món. Nguyên liệu nhập bằng phiếu nhập kho như hàng bán lẻ.

Xem thêm cách dùng cho [quán cafe](/nganh/phan-mem-quan-ly-quan-cafe) và [quán ăn](/nganh/phan-mem-quan-ly-quan-an).

## Tạp hóa: đơn vị quy đổi

Tiệm tạp hóa nhập theo thùng, bán theo lon, gói. Khai báo đơn vị quy đổi (ví dụ 1 thùng = 24 lon) để nhập và bán đúng đơn vị. Xem [phần mềm quản lý tạp hóa](/nganh/phan-mem-quan-ly-tap-hoa).

## Mẹo giữ kho chính xác

- Nhập phiếu ngay khi nhận hàng, đừng để cuối ngày.
- Mọi hàng hỏng đều ghi xuất kho, dù chỉ một món.
- Không cho bán hàng "ngoài app", kể cả khách quen.
- Kiểm nhanh 10 mặt hàng giá trị cao mỗi tuần, kiểm toàn bộ mỗi tháng.
- Xuất báo cáo kho ra Excel để lưu trữ hoặc gửi kế toán.
