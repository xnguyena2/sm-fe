---
title: Tạo tài khoản nhân viên và phân quyền
seoTitle: Tạo tài khoản nhân viên và phân quyền trên SoDi
description: "Hướng dẫn tạo tài khoản nhân viên trên SoDi: phân quyền từng việc, đăng nhập bằng mã hoặc QR, giới hạn giảm giá, hủy đơn, xếp ca, chấm công và tính lương."
lead: Mỗi nhân viên một tài khoản, chỉ làm được việc bạn cho phép. Đăng nhập bằng mã hoặc QR, có lịch ca, chấm công và lương.
slug: nhan-vien-phan-quyen
keyword: phân quyền nhân viên bán hàng
datePublished: 2026-11-20
dateModified: 2026-11-20
order: 9
related:
  - mo-ca-chot-ca
  - chong-that-thoat-khi-giao-ca
  - phan-mem-quan-ly-quan-an
faq:
  - q: Nhân viên có cần tải app riêng không?
    a: Nhân viên dùng cùng ứng dụng SoDi, đăng nhập vào cửa hàng của bạn bằng mã hoặc quét QR. Có thể dùng trên máy riêng của nhân viên hoặc máy chung ở quầy.
  - q: Nhân viên nghỉ việc thì làm sao?
    a: Xóa hoặc tắt quyền của tài khoản nhân viên đó ngay hôm nghỉ để họ không vào được cửa hàng nữa.
  - q: Chủ có biết khi nhân viên hủy đơn không?
    a: SoDi có thể báo cho chủ khi nhân viên giảm giá vượt mức hoặc hủy đơn.
---

<!-- TODO: kiểm tra lại tên quyền, tên nút và màn hình nhân viên trong app trước khi deploy -->

Khi quán có nhân viên, bạn cần hai thứ: nhân viên làm việc được ngay, và bạn vẫn kiểm soát được tiền, giảm giá, hủy đơn. SoDi cho mỗi nhân viên một tài khoản và phân quyền từng việc.

## Vì sao không nên dùng chung một tài khoản

- Có sai sót thì không biết ai làm.
- Nhân viên thấy được báo cáo lãi, giá vốn, những thứ bạn muốn giữ riêng.
- Nhân viên nghỉ việc vẫn đăng nhập được nếu biết mật khẩu chung.

## Bước 1: Tạo tài khoản nhân viên

1. Vào phần nhân viên của cửa hàng.
2. Thêm nhân viên mới: tên, số điện thoại.
3. Chọn nhóm quyền hoặc tích từng quyền (bước 2).
4. Lưu. Nhân viên nhận mã đăng nhập hoặc mã QR.

<!-- TODO: ảnh màn hình thêm nhân viên -->

## Bước 2: Phân quyền từng việc

Phân quyền theo nguyên tắc: **cho đủ để làm việc, không cho thừa**. Một gợi ý (ví dụ minh họa):

| Việc | Thu ngân | Phục vụ | Quản lý ca |
| --- | --- | --- | --- |
| Tạo đơn, thêm món | Có | Có | Có |
| Thu tiền | Có | Không | Có |
| Giảm giá | Có giới hạn | Không | Có |
| Hủy, trả đơn | Không | Không | Có |
| Ghi nợ khách | Không | Không | Có |
| Nhập kho | Không | Không | Có |
| Xem báo cáo lãi | Không | Không | Tùy chủ |

SoDi cho bạn:

- **Giới hạn giảm giá** của nhân viên.
- **Cho phép hoặc không cho phép trả và hủy đơn.**
- **Báo ngay cho chủ** khi giảm giá vượt mức hoặc có đơn bị hủy.

## Bước 3: Nhân viên đăng nhập

Nhân viên mở SoDi trên máy của mình hoặc máy ở quầy và đăng nhập bằng **mã** hoặc **quét QR** cửa hàng. Không cần nhớ mật khẩu dài.

Máy chung ở quầy: mỗi ca, nhân viên đăng nhập bằng tài khoản của mình, không dùng chung tài khoản của người khác.

<!-- cta -->

## Bước 4: Xếp lịch ca

Tạo các ca (sáng, chiều, tối, cả ngày) và xếp nhân viên theo tuần. Nhân viên mở app là biết lịch làm của mình.

Ví dụ minh họa: quán mở 7h–22h, chia ca sáng 7h–14h và ca chiều 14h–22h. Thứ Bảy, Chủ Nhật xếp thêm một người ca chiều vì đông khách.

## Bước 5: Chấm công và tính lương

- Nhân viên **chấm công vào, ra** trên app.
- SoDi **đánh dấu đi trễ** so với giờ ca.
- Cuối kỳ, **tính lương theo công** đã chấm.

Ví dụ minh họa: giả sử lương ca 7 tiếng là 180.000đ. Lan làm 24 ca trong tháng, lương 4.320.000đ trước thưởng, phạt (nếu có).

## Bước 6: Mở ca, chốt ca

Gắn trách nhiệm tiền két cho từng ca: nhân viên nhập tiền đầu ca, cuối ca đếm tiền và chốt. SoDi ghi khoản lệch và người chốt. Xem chi tiết trong bài [mở ca, chốt ca](/huong-dan/mo-ca-chot-ca).

## Khi nhân viên nghỉ việc

1. Xóa hoặc tắt quyền tài khoản nhân viên ngay hôm nghỉ.
2. Xem lại lịch sử chốt ca gần nhất của người đó.
3. Đổi mật khẩu tài khoản chủ nếu nhân viên từng biết.

## Ngày đầu của nhân viên mới

1. Cho nhân viên đăng nhập và tự tạo vài đơn thử với bạn đứng cạnh.
2. Giải thích quyền của họ: được làm gì, việc gì phải gọi quản lý.
3. Cho thử thu tiền mặt, thu bằng mã QR và in hóa đơn.
4. Cùng làm một lần mở ca, chốt ca.
5. Cuối ngày hỏi lại chỗ nào còn lúng túng để hướng dẫn thêm.

## Gợi ý theo mô hình

- **Quán cafe:** thu ngân kiêm pha chế, quyền tạo đơn và thu tiền, không hủy đơn. Xem [phần mềm quản lý quán cafe](/nganh/phan-mem-quan-ly-quan-cafe).
- **Quán ăn:** phục vụ chỉ thêm món vào bàn, thu ngân thu tiền. Xem [phần mềm quản lý quán ăn](/nganh/phan-mem-quan-ly-quan-an).
- **Tạp hóa gia đình:** người nhà dùng tài khoản riêng, chủ giữ quyền nhập kho và ghi nợ. Xem [phần mềm quản lý tạp hóa](/nganh/phan-mem-quan-ly-tap-hoa).
