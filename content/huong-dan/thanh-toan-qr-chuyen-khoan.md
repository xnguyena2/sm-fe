---
title: Nhận thanh toán chuyển khoản bằng mã QR (VietQR)
seoTitle: Nhận thanh toán chuyển khoản bằng mã QR VietQR
description: "Hướng dẫn nhận chuyển khoản bằng mã QR VietQR trên SoDi: thêm tài khoản ngân hàng, hiện mã QR trên đơn và tự xác nhận khi tiền về qua SePay."
lead: Hiện mã VietQR ngay trên đơn để khách quét bằng app ngân hàng. Kết nối SePay để đơn tự xác nhận khi tiền về.
slug: thanh-toan-qr-chuyen-khoan
keyword: thanh toán chuyển khoản bằng mã QR
datePublished: 2026-11-20
dateModified: 2026-11-20
order: 3
related:
  - tao-don-ban-hang
  - phan-mem-quan-ly-quan-cafe
  - ghi-so-tay-hay-dung-phan-mem-ban-hang
faq:
  - q: VietQR là gì?
    a: VietQR là chuẩn mã QR chuyển khoản dùng chung giữa các ngân hàng ở Việt Nam. Khách dùng app ngân hàng hoặc ví hỗ trợ VietQR để quét và chuyển tiền.
  - q: Không kết nối SePay thì có dùng mã QR được không?
    a: Được. Mã QR vẫn hiện trên đơn để khách chuyển khoản. Chỉ khác là bạn phải tự kiểm tra tiền đã về trước khi xác nhận đơn.
  - q: Tiền chuyển khoản có đi qua SoDi không?
    a: Không. Khách chuyển thẳng vào tài khoản ngân hàng của bạn. SoDi chỉ tạo mã QR và nhận thông báo để xác nhận đơn.
---

<!-- TODO: kiểm tra lại tên nút, tên màn hình và các bước kết nối SePay trong app trước khi deploy -->

Khách trả bằng chuyển khoản ngày càng nhiều. Cái khó không phải là nhận tiền, mà là **biết chắc tiền đã về** khi quán đang đông. Bài này hướng dẫn cách dùng mã QR chuyển khoản (VietQR) trên SoDi và cách để đơn tự xác nhận khi tiền vào tài khoản.

## Vì sao nên dùng mã QR gắn với đơn

Nhiều quán dán một mã QR cố định ở quầy. Cách này nhanh nhưng có vài vấn đề:

- Khách phải tự gõ số tiền, dễ gõ thiếu hoặc thừa.
- Nhân viên phải hỏi chủ "tiền về chưa?", hoặc nhìn màn hình điện thoại của khách.
- Cuối ngày khó biết khoản chuyển khoản nào là của đơn nào.

Khi mã QR được tạo ngay trên đơn trong SoDi, mỗi khoản thanh toán gắn với một đơn cụ thể. Báo cáo cuối ngày tách được doanh thu tiền mặt và chuyển khoản.

## Bước 1: Thêm tài khoản ngân hàng nhận tiền

Trong phần cài đặt thanh toán của cửa hàng, thêm tài khoản ngân hàng bạn muốn nhận tiền: chọn ngân hàng, nhập số tài khoản và tên chủ tài khoản.

Kiểm tra kỹ số tài khoản trước khi lưu. Đây là tài khoản khách sẽ chuyển tiền vào.

<!-- TODO: ảnh màn hình thêm tài khoản ngân hàng -->

## Bước 2: Hiện mã QR khi thu tiền

Khi thanh toán đơn, chọn chuyển khoản. SoDi hiện mã VietQR của đơn đó trên màn hình. Xoay màn hình cho khách quét, hoặc mang điện thoại, máy tính bảng tới bàn.

Khách mở app ngân hàng, quét mã, kiểm tra số tiền và tên người nhận rồi xác nhận chuyển.

Cách tạo đơn từ đầu có trong bài [tạo đơn bán hàng trên điện thoại](/huong-dan/tao-don-ban-hang).

<!-- TODO: chờ xác nhận mã QR có điền sẵn số tiền của đơn hay không (đoạn đầu bài so sánh với QR cố định phải gõ tiền) -->

<!-- cta -->

## Bước 3: Kết nối SePay để tự xác nhận tiền về

SePay là dịch vụ theo dõi giao dịch của tài khoản ngân hàng và gửi thông báo khi có tiền vào. Khi bạn kết nối SePay với SoDi:

1. Khách quét mã và chuyển tiền.
2. Ngân hàng ghi nhận giao dịch, SePay báo cho SoDi.
3. SoDi tìm đúng đơn và chuyển đơn sang **đã thanh toán**.

Nhân viên nhìn trạng thái đơn là biết, không cần hỏi chủ, không cần mở app ngân hàng.

Để kết nối, bạn cần có tài khoản SePay và liên kết tài khoản ngân hàng nhận tiền với SePay, sau đó làm theo phần kết nối SePay trong cài đặt thanh toán của SoDi. Chi phí và danh sách ngân hàng hỗ trợ do SePay quy định, bạn xem trên trang của SePay.

## Nếu chưa kết nối SePay

Mã QR vẫn dùng bình thường. Bạn chỉ cần tự kiểm tra:

- Mở app ngân hàng, xem giao dịch mới nhất có đúng số tiền.
- Sau đó mới xác nhận đơn đã thanh toán và giao hàng cho khách.

Đừng xác nhận chỉ vì khách đưa màn hình "chuyển thành công". Ảnh chụp màn hình có thể là ảnh cũ hoặc ảnh sửa.

## Đối chiếu cuối ngày

Báo cáo của SoDi có **doanh thu theo hình thức thanh toán**. Cuối ca, bạn so:

- Tiền mặt theo báo cáo với tiền thực có trong két (SoDi có mở ca, chốt ca để ghi khoản lệch).
- Tiền chuyển khoản theo báo cáo với sao kê ngân hàng trong ngày.

Ví dụ minh họa: giả sử báo cáo ngày ghi 3.200.000đ tiền mặt và 4.850.000đ chuyển khoản. Sao kê ngân hàng có 4.850.000đ vào tài khoản trong ngày, hai số khớp nhau. Nếu sao kê thiếu, bạn biết cần tìm lại đơn nào chưa thật sự nhận tiền.

## Mẹo cho từng mô hình

- **Quán cafe mang đi:** cho khách quét ngay lúc order, pha chế trong lúc tiền về. Xem thêm [phần mềm quản lý quán cafe](/nganh/phan-mem-quan-ly-quan-cafe).
- **Quán ăn:** mang máy tới bàn khi tính tiền, khách quét mã ngay tại chỗ. Xem [phần mềm quản lý quán ăn](/nganh/phan-mem-quan-ly-quan-an).
- **Cho thuê:** khách chuyển tiền cọc qua mã QR, phần còn lại ghi nợ. Xem [phần mềm quản lý cho thuê](/nganh/phan-mem-quan-ly-cho-thue).
