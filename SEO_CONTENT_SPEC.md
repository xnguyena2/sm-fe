# Yêu cầu: Mở rộng website sodientu.com để làm SEO (trang hướng dẫn, kiến thức bán hàng, trang ngành)

Tài liệu này dành cho Claude Code. Đọc hết trước khi làm. Làm theo từng giai đoạn, xong giai đoạn nào thì dừng lại cho chủ dự án xem.

## 1. Hiện trạng code (đã kiểm tra)

- Website tĩnh, deploy bằng **Firebase Hosting** (`firebase.json`, site `sodientu-4a6d0`, thư mục `public/`). Không có bước build.
- Trang chính là `public/index.html` (một trang duy nhất, các mục dùng anchor `#tinh-nang`, `#nganh-hang`, `#danh-gia`, `#hoi-dap`, `#tai-ung-dung`).
- Giao diện hiện tại dùng **`public/assets/css/site.css`** và **`public/assets/js/site.js`** (menu mobile, tabs, năm ở footer), font **Be Vietnam Pro**, màu chủ đạo `#0E7C66`. Các file Bootstrap, `main.css`, LineIcons, tiny-slider… là của template cũ, **trang mới không dùng chúng**.
- `public/404.html` vẫn là template cũ (`lang="zxx"`, preloader, Bootstrap, thiếu description) → cần làm lại theo giao diện mới.
- Chưa có `robots.txt`, `sitemap.xml`.
- `<head>` của index có Google Ads tag `AW-16666143438` và **một event conversion "Xem trang Sodi" bắn mỗi lần tải trang**.
- Link tải app:
  - App Store: `https://apps.apple.com/us/app/sodi-qu%E1%BA%A3n-l%C3%BD-b%C3%A1n-h%C3%A0ng/id6474116712`
  - Google Play: `https://play.google.com/store/apps/details?id=com.buffchalo.sales_management`
  - Facebook: `https://facebook.com/soquanlydientu`, YouTube: `https://youtube.com/@SoDiPos`, email `support@sodientu.com`

## 2. Mục tiêu

Tăng lượt truy cập tự nhiên từ Google bằng các trang nội dung hữu ích cho chủ quán, chủ shop nhỏ ở Việt Nam, và dẫn người đọc về nút tải app. Từ khóa trọng tâm đã có dữ liệu tốt từ Google Ads: **"phần mềm quản lý bán hàng"**, **"phần mềm pos"**, **"app quản lý bán hàng"**.

## 3. Cách tổ chức code (đề xuất, làm trước tiên)

Để thêm bài dễ dàng mà không phải chép tay header/footer vào từng file:

1. Tạo thư mục `content/` ở gốc repo (ngoài `public/`, không bị deploy):
   - `content/huong-dan/*.md`, `content/kien-thuc/*.md`, `content/nganh/*.md`
   - Mỗi file Markdown có front matter: `title`, `description`, `slug`, `keyword`, `datePublished`, `dateModified`, `related` (danh sách slug), `image` (tùy chọn), `faq` (tùy chọn, mảng hỏi/đáp).
2. Tạo `tools/build.mjs` (Node, dùng `gray-matter` + `marked`, thêm `package.json` ở gốc repo với script `npm run build`):
   - Đọc Markdown → sinh HTML vào `public/huong-dan/<slug>.html`, `public/kien-thuc/<slug>.html`, `public/nganh/<slug>.html`.
   - Sinh trang danh sách: `public/huong-dan/index.html`, `public/kien-thuc/index.html`.
   - Sinh `public/sitemap.xml` (gồm trang chủ và mọi trang mới, có `lastmod` lấy từ `dateModified`).
   - Dùng **một layout chung** (header, footer, khối tải app) lấy đúng markup và class từ `index.html`.
   - Kiểm tra link nội bộ hỏng và báo lỗi khi build.
3. `public/index.html` vẫn sửa tay như hiện tại, chỉ thêm menu và link (mục 6).
4. Không thêm framework lớn (React, Next, Tailwind…). Chỉ HTML + `site.css` (thêm CSS cho bài viết vào cuối `site.css` hoặc file `article.css` nhỏ).

## 4. URL và Firebase

- Sửa `firebase.json`: thêm `"cleanUrls": true`, `"trailingSlash": false`, và header cache dài cho `/assets/**`. URL cuối cùng dạng `https://sodientu.com/kien-thuc/cach-tinh-gia-von-ly-ca-phe` (không có `.html`).
- Thêm `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://sodientu.com/sitemap.xml
  ```
- Không xóa hay đổi tên các trang đang có (`privacy-policy.html`, `terms-of-service.html`, `delete.html`, `privacy.html`, `app-ads.txt`) vì app store đang trỏ tới.

## 5. Danh sách trang cần tạo

Slug viết thường, không dấu, nối bằng gạch ngang.

### 5.1 Trang ngành (landing page theo ngành) – `/nganh/`

| Slug | Từ khóa chính | Nội dung chính |
| --- | --- | --- |
| `phan-mem-quan-ly-quan-cafe` | phần mềm quản lý quán cafe | Mở/chốt ca, đếm ly theo ca, công thức món và giá vốn, QR tự xác nhận tiền, quản lý bàn |
| `phan-mem-quan-ly-quan-an` | phần mềm quản lý quán ăn | Quản lý bàn và khu vực, in phiếu bếp, đơn mang đi / app giao đồ ăn, báo cáo lãi |
| `phan-mem-quan-ly-tap-hoa` | phần mềm quản lý tạp hóa | Quét mã vạch, sổ nợ, lô và hạn sử dụng, giá sỉ, đơn vị quy đổi (thùng/lốc/lon) |
| `phan-mem-quan-ly-cho-thue` | phần mềm quản lý cho thuê | Cho thuê theo giờ/ngày/tháng, theo dõi quá hạn, công nợ |

### 5.2 Hướng dẫn sử dụng SoDi – `/huong-dan/`

| Slug | Tiêu đề gợi ý |
| --- | --- |
| `bat-dau-voi-sodi` | Bắt đầu với SoDi trong 1 phút: đăng ký và dùng cửa hàng mẫu |
| `tao-don-ban-hang` | Cách tạo đơn bán hàng nhanh trên điện thoại |
| `thanh-toan-qr-chuyen-khoan` | Nhận thanh toán chuyển khoản bằng mã QR (VietQR) |
| `ket-noi-may-in-hoa-don` | Kết nối máy in hóa đơn, in phiếu bếp, in tem |
| `quan-ly-kho-hang` | Nhập kho, xuất kho, kiểm kho và theo dõi tồn |
| `nhap-san-pham-tu-excel` | Nhập danh sách sản phẩm hàng loạt từ Excel |
| `so-no-cong-no-khach-hang` | Ghi nợ và thu nợ khách hàng bằng sổ nợ |
| `mo-ca-chot-ca` | Mở ca, chốt ca và đối chiếu tiền két |
| `nhan-vien-phan-quyen` | Tạo tài khoản nhân viên và phân quyền |
| `bao-cao-doanh-thu-loi-nhuan` | Xem báo cáo doanh thu, lợi nhuận, món bán chạy |
| `website-ban-hang-qr-menu` | Tạo website bán hàng và mã QR menu cho cửa hàng |

### 5.3 Kiến thức bán hàng (blog) – `/kien-thuc/`

| Slug | Từ khóa chính |
| --- | --- |
| `cach-chon-phan-mem-quan-ly-ban-hang` | cách chọn phần mềm quản lý bán hàng |
| `ghi-so-tay-hay-dung-phan-mem-ban-hang` | sổ bán hàng / ghi sổ hay dùng app |
| `cach-tinh-gia-von-ly-ca-phe` | cách tính giá vốn ly cà phê |
| `chong-that-thoat-khi-giao-ca` | chống thất thoát quán cafe |
| `kinh-nghiem-mo-quan-cafe-nho` | kinh nghiệm mở quán cafe nhỏ |
| `mo-tiem-tap-hoa-can-chuan-bi-gi` | mở tiệm tạp hóa cần chuẩn bị gì |
| `cach-quan-ly-cong-no-khach-hang` | quản lý công nợ khách hàng |
| `cach-kiem-kho-cuoi-thang` | cách kiểm kho |
| `cach-tinh-loi-nhuan-quan-an` | cách tính lợi nhuận quán ăn |
| `cach-dinh-gia-ban-san-pham` | cách định giá bán sản phẩm |
| `tang-doanh-thu-gio-thap-diem` | tăng doanh thu quán |
| `chuan-bi-tet-cho-cua-hang` | chuẩn bị hàng Tết cho cửa hàng |

**Để sau, chưa viết:** bài về hóa đơn điện tử và sổ doanh thu hộ kinh doanh (mẫu S1a-HKD) chỉ viết khi chủ dự án xác nhận tính năng đã chạy thật và đã đối chiếu quy định.

## 6. Sửa trang chủ và điều hướng

- Thêm vào menu và footer của `index.html` và layout chung: **Hướng dẫn** (`/huong-dan`), **Kiến thức** (`/kien-thuc`), và nhóm footer **Ngành hàng** trỏ 4 trang ở mục 5.1.
- Trên các trang con, link anchor phải thành `/#tinh-nang`, `/#hoi-dap`…; logo trỏ `/`.
- Trong mục "Dùng được cho nhiều mô hình kinh doanh" của index, mỗi thẻ ngành thêm link "Xem chi tiết" tới trang ngành tương ứng.
- Thêm khối "Bài viết mới" (3 bài mới nhất) phía trên footer của trang chủ (có thể sinh lúc build và chèn giữa hai comment `<!-- latest-posts:start -->` / `<!-- latest-posts:end -->`).

## 7. Yêu cầu SEO cho mỗi trang mới

- `<html lang="vi">`, một `<h1>` duy nhất chứa từ khóa chính, các `<h2>`/`<h3>` theo cấu trúc bài.
- `<title>` dưới 60 ký tự dạng `<Tiêu đề> | SoDi`; `meta description` 140–160 ký tự, có từ khóa, viết tự nhiên.
- `canonical` tuyệt đối, Open Graph và Twitter card (ảnh mặc định `https://sodientu.com/assets/images/hero/phone.png` nếu bài không có ảnh).
- Breadcrumb hiển thị (Trang chủ › Kiến thức › Tên bài) và JSON-LD `BreadcrumbList`.
- JSON-LD `Article` cho bài kiến thức và hướng dẫn (`headline`, `datePublished`, `dateModified`, `author` là tổ chức "SoDi", `publisher` có logo). Không dùng `HowTo` (Google đã bỏ rich result này). `FAQPage` được phép nếu bài có mục hỏi đáp, nhưng không kỳ vọng hiện rich result.
- Hiện ngày cập nhật trên trang.
- **Liên kết nội bộ:** mỗi bài kiến thức link tới ít nhất 1 trang hướng dẫn và 1 trang ngành liên quan, cuối bài có mục "Bài liên quan" (lấy từ `related`). Mỗi hướng dẫn link về trang ngành phù hợp.
- **Khối kêu gọi tải app** ở giữa và cuối bài: nút App Store và Google Play (link ở mục 1), một câu ngắn "Miễn phí để bắt đầu".
- Ảnh: `loading="lazy"`, có `width`/`height`, `alt` mô tả bằng tiếng Việt, định dạng WebP rộng tối đa 900px. Ảnh chụp màn hình app đặt ở `public/assets/images/huong-dan/` và `public/assets/images/kien-thuc/`. Nếu chưa có ảnh, để chỗ trống có comment `<!-- TODO: ảnh màn hình ... -->`, không tự vẽ giao diện giả.
- Hiệu năng: không tải Bootstrap/jQuery/thư viện template cũ; Lighthouse mobile SEO ≥ 95, Performance ≥ 90.

## 8. Theo dõi (tracking)

- Trang mới có Google tag `gtag('config','AW-16666143438')` như index, **nhưng không chép event conversion "Xem trang Sodi"** sang trang mới, để không làm sai số chuyển đổi Google Ads.
- Thêm sự kiện khi bấm nút tải app trên mọi trang: `gtag('event','click_download',{store:'app_store'|'google_play', page_path: location.pathname})`.
- Chừa chỗ cho Google Analytics 4: biến `GA4_ID` trong `tools/build.mjs`; nếu rỗng thì không chèn. (Chủ dự án sẽ cung cấp mã G-XXXX.)

## 9. Quy tắc nội dung (quan trọng)

- Viết tiếng Việt tự nhiên, cho chủ quán nhỏ đọc trên điện thoại: câu ngắn, ví dụ cụ thể bằng tiền VNĐ, có bước làm rõ ràng. Hướng dẫn 600–1.000 từ, bài kiến thức 1.000–1.800 từ. Không nhồi từ khóa.
- **Chỉ nhắc tính năng có trong danh sách dưới đây.** Không bịa số liệu, không bịa lời khách hàng, không nói SoDi có trợ lý AI.
- Ví dụ minh họa phải ghi rõ là ví dụ (ví dụ: "giả sử 1 ly bạc xỉu có giá vốn 12.000đ…").
- Không chê đối thủ, không nêu tên đối thủ.
- Viết "miễn phí để bắt đầu", không viết "hoàn toàn miễn phí" (có gói Pro trả phí).

**Tính năng SoDi đã xác nhận (theo mã nguồn ngày 14/11/2026):**
- Dùng trên Android, iPhone, máy tính bảng, máy POS màn hình lớn, và máy tính qua web console.sodientu.com. Đồng bộ nhiều máy cùng lúc. Quản lý nhiều cửa hàng.
- Gói Miễn phí (có quảng cáo) và Pro (6 tháng hoặc 1 năm), mua trong app. Đăng ký chỉ cần tên quán, số điện thoại, mật khẩu. Cửa hàng mẫu khi đăng ký: Quán cà phê, Quán cơm, Tạp hóa.
- Bán hàng: tạo đơn nhanh theo danh mục và size; màn hình POS cho tablet; quản lý bàn và khu vực, gộp đơn, phí bàn; đặt bàn trước; loại đơn tại quán / mang đi / app giao đồ ăn; giảm giá, phụ phí, ghi chú món; thanh toán QR ngân hàng (VietQR), tự xác nhận tiền về qua SePay; in hóa đơn, phiếu bếp, tem nhãn (máy in Bluetooth/LAN, PDF); danh sách đơn có lọc, tìm kiếm, thông báo đơn mới; cho thuê theo giờ/ngày/tháng, theo dõi quá hạn.
- Sản phẩm và kho: nhiều size/thuộc tính, hình ảnh, danh mục; combo, giá sỉ, đơn vị quy đổi; nhập sản phẩm từ Excel; quét mã vạch bằng camera; phiếu nhập kho, nhà cung cấp, xuất kho, tồn kho tự trừ khi bán; lô hàng và hạn sử dụng, cảnh báo sắp hết hạn; nguyên liệu và công thức món; giá vốn mặc định theo % giá bán.
- Khách hàng: lịch sử mua, tích điểm đổi giảm giá, sổ nợ (nợ khách, nợ nhà cung cấp, thu nợ từng phần), giá khuyến mãi theo sản phẩm, giảm giá theo đơn.
- Nhân viên và ca: tài khoản nhân viên, phân quyền từng việc; đăng nhập bằng mã hoặc quét QR; xếp lịch ca; chấm công vào/ra, đánh dấu đi trễ; tính lương theo công; mở ca/chốt ca (tiền đầu ca, đếm tiền két, lệch két, ai chốt); checklist đầu/cuối ca; đếm hàng theo ca (ví dụ ly M, ly L); lịch sử chốt ca.
- Báo cáo: doanh thu, lãi theo ngày/giờ/tháng; món bán chạy; số đơn theo kênh; doanh thu theo hình thức thanh toán; so sánh lãi với cùng thứ tuần trước, đơn hủy/trả, món bán dưới giá vốn; báo cáo kho; thu chi ngoài đơn hàng; xuất Excel.
- Bán online: website bán hàng riêng tự lấy menu từ app, mã QR link cửa hàng, thông báo đơn mới từ web.
- Tiếng Việt và tiếng Anh.

**Chưa xác nhận, không được viết là đã có:** bán hàng khi mất mạng; hóa đơn điện tử (VNPT, Viettel, MISA, BKAV); sổ doanh thu mẫu S1a-HKD. Nếu cần nhắc, đánh dấu `<!-- TODO: chờ xác nhận -->` và hỏi chủ dự án.

## 10. Các điểm cần hỏi chủ dự án trước khi sửa (không tự ý sửa)

Trong `index.html` hiện có:
1. JSON-LD `aggregateRating` ghi `ratingValue 4.8`, `ratingCount 10000`. Nếu không khớp số đánh giá thật trên App Store/Google Play thì nên xóa, vì Google có thể coi là dữ liệu có cấu trúc gây hiểu lầm.
2. Câu hỏi đáp "Không có mạng thì có bán hàng được không? Có…" và mục "Bán hàng khi mất mạng": chưa có trong danh sách tính năng đã xác nhận.
3. `og:description` có chữ "Hoàn toàn miễn phí để bắt đầu" → đề xuất "Miễn phí để bắt đầu".

Liệt kê 3 điểm này trong phần tóm tắt cuối mỗi giai đoạn, kèm đề xuất sửa, chờ chủ dự án đồng ý.

## 11. Giai đoạn

**Giai đoạn 1 (làm trước):**
- Mục 3 (content/ + build), mục 4 (firebase.json, robots.txt, sitemap), làm lại `404.html` theo giao diện mới.
- Layout chung, sửa menu/footer index (mục 6).
- 4 trang ngành, 3 hướng dẫn (`bat-dau-voi-sodi`, `tao-don-ban-hang`, `thanh-toan-qr-chuyen-khoan`), 3 bài kiến thức (`cach-chon-phan-mem-quan-ly-ban-hang`, `ghi-so-tay-hay-dung-phan-mem-ban-hang`, `cach-tinh-gia-von-ly-ca-phe`), 2 trang danh sách.
- Dừng lại, báo cáo: danh sách file đã tạo/sửa, cách chạy `npm run build`, cách xem thử bằng `firebase serve` hoặc `npx serve public`, và các điểm ở mục 10.

**Giai đoạn 2:** các hướng dẫn và bài kiến thức còn lại ở mục 5, khối "Bài viết mới" trên trang chủ.

**Không tự chạy `firebase deploy`.** Chủ dự án sẽ tự deploy.

## 12. Tiêu chí hoàn thành

- `npm run build` chạy không lỗi, không có link nội bộ hỏng.
- Mọi trang mới: HTML hợp lệ, đúng giao diện site.css trên điện thoại (360px) và máy tính, menu mobile hoạt động.
- `sitemap.xml` có đủ URL, `robots.txt` trỏ đúng sitemap.
- Mỗi trang có title, description, canonical, OG, breadcrumb, JSON-LD hợp lệ (kiểm bằng Rich Results Test sau khi deploy).
- Không còn tham chiếu tới CSS/JS template cũ trên trang mới.

## 13. Việc chủ dự án tự làm sau khi deploy

- Thêm và xác minh sodientu.com trong Google Search Console, gửi `https://sodientu.com/sitemap.xml`.
- Cung cấp mã GA4 nếu muốn đo lượt xem từng bài.
- Mỗi tuần thêm 1 đến 2 bài kiến thức mới bằng cách tạo file Markdown trong `content/kien-thuc/` rồi chạy `npm run build`.
