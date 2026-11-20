// Build the content pages of sodientu.com.
//
//   npm run build
//
// Reads Markdown from content/<collection>/*.md and writes:
//   public/<collection>/<slug>.html     one page per Markdown file
//   public/huong-dan/index.html         list pages
//   public/kien-thuc/index.html
//   public/404.html
//   public/sitemap.xml
// public/index.html is edited by hand and is not generated.
// The build fails on broken internal links and on missing required front matter.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { marked } from 'marked';

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

const SITE = 'https://sodientu.com';
const ADS_ID = 'AW-16666143438';
// Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Leave empty to skip GA4.
const GA4_ID = '';

const DEFAULT_IMAGE = `${SITE}/assets/images/hero/phone.png`;
const LOGO = `${SITE}/assets/images/logo/logo.png`;

const LINKS = {
  appStore: 'https://apps.apple.com/us/app/sodi-qu%E1%BA%A3n-l%C3%BD-b%C3%A1n-h%C3%A0ng/id6474116712',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.buffchalo.sales_management',
  facebook: 'https://facebook.com/soquanlydientu',
  youtube: 'https://youtube.com/@SoDiPos',
  email: 'support@sodientu.com',
};

// Each collection is a folder in content/ and a URL prefix on the site.
// `list`: also generate /<dir> (index page). `article`: emit Article JSON-LD.
const COLLECTIONS = {
  'nganh': { label: 'Ngành hàng', eyebrow: 'Phần mềm theo ngành', list: false, article: false, words: [600, 1500] },
  'huong-dan': { label: 'Hướng dẫn', eyebrow: 'Hướng dẫn sử dụng', list: true, article: true, words: [600, 1000],
    listTitle: 'Hướng dẫn sử dụng SoDi',
    listSeoTitle: 'Hướng dẫn sử dụng phần mềm bán hàng',
    listDescription: 'Hướng dẫn dùng SoDi từng bước: đăng ký, tạo đơn bán hàng, nhận chuyển khoản bằng mã QR, in hóa đơn, quản lý kho, công nợ và nhân viên trên điện thoại.',
    listIntro: 'Các bài hướng dẫn ngắn, từng bước, để bạn bắt đầu bán hàng với SoDi ngay trên điện thoại.' },
  'kien-thuc': { label: 'Kiến thức', eyebrow: 'Kiến thức bán hàng', list: true, article: true, words: [1000, 1800],
    listTitle: 'Kiến thức bán hàng cho chủ quán, chủ shop',
    listSeoTitle: 'Kiến thức bán hàng cho chủ quán, chủ shop',
    listDescription: 'Kinh nghiệm quản lý bán hàng cho quán cafe, quán ăn, tạp hóa và shop nhỏ: tính giá vốn, chống thất thoát, quản lý công nợ, kiểm kho và chọn phần mềm phù hợp.',
    listIntro: 'Bài viết thực tế cho chủ quán cafe, quán ăn, tiệm tạp hóa và shop nhỏ: tính giá vốn, giữ tiền két khớp sổ, quản lý kho và công nợ.' },
};

const INDUSTRY_LINKS = [
  ['/nganh/phan-mem-quan-ly-quan-cafe', 'Quán cafe, trà sữa'],
  ['/nganh/phan-mem-quan-ly-quan-an', 'Quán ăn'],
  ['/nganh/phan-mem-quan-ly-tap-hoa', 'Tạp hóa'],
  ['/nganh/phan-mem-quan-ly-cho-thue', 'Cho thuê'],
];

// ---------------------------------------------------------------------------
// Paths and helpers
// ---------------------------------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const PUBLIC = path.join(ROOT, 'public');

// /assets/** is cached for 30 days, so CSS/JS URLs carry a content hash.
const assetVersion = (rel) => crypto.createHash('sha1').update(fs.readFileSync(path.join(PUBLIC, rel))).digest('hex').slice(0, 8);
const CSS_V = assetVersion('assets/css/site.css');
const JS_V = assetVersion('assets/js/site.js');

const errors = [];
const warnings = [];

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const len = (s) => [...String(s)].length;
const stripTags = (html) => html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ');
const wordCount = (html) => stripTags(html).split(/\s+/).filter(Boolean).length;
const jsonLd = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

function isoDate(v, file, key) {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  errors.push(`${file}: "${key}" phải có dạng YYYY-MM-DD`);
  return '1970-01-01';
}
const viDate = (iso) => iso.split('-').reverse().join('/');

function write(rel, html) {
  const out = path.join(PUBLIC, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return out;
}

// ---------------------------------------------------------------------------
// Shared layout (markup and classes copied from public/index.html)
// ---------------------------------------------------------------------------

function storeBadges(lazy = true) {
  const l = lazy ? ' loading="lazy"' : '';
  return `<a class="store-link" href="${LINKS.appStore}" target="_blank" rel="noopener" aria-label="Tải SoDi trên App Store">
                    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Tải trên App Store" width="162" height="54"${l}>
                </a>
                <a class="store-link" href="${LINKS.googlePlay}" target="_blank" rel="noopener" aria-label="Tải SoDi trên Google Play">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Tải trên Google Play" width="182" height="54"${l}>
                </a>`;
}

function trackingHead() {
  const ga4 = GA4_ID ? `\n        gtag('config', '${GA4_ID}');` : '';
  // No conversion event here: the "Xem trang Sodi" conversion stays on the home page only.
  // gtag.js (~170 KB) is loaded after the page has loaded so it does not compete with the
  // article for the main thread. Calls made before that are queued in dataLayer and sent
  // once it arrives.
  return `<script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${ADS_ID}');${ga4}
        window.addEventListener('load', function () {
            setTimeout(function () {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';
                document.head.appendChild(s);
            }, 1500);
        });
    </script>`;
}

function head({ title, description, url, type = 'website', image = DEFAULT_IMAGE, noindex = false, ld = [], published, modified }) {
  const canonical = url ? `\n    <link rel="canonical" href="${url}">` : '';
  const og = url ? `
    <meta property="og:type" content="${type}">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${image}">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:site_name" content="SoDi">${published ? `
    <meta property="article:published_time" content="${published}">
    <meta property="article:modified_time" content="${modified}">` : ''}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${image}">` : '';
  return `<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
    <meta name="theme-color" content="#0E7C66">${canonical}${og}

    <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico">
    <link rel="apple-touch-icon" href="/assets/images/logo/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"></noscript>
    <link rel="stylesheet" href="/assets/css/site.css?v=${CSS_V}">
${ld.map((o) => '    ' + jsonLd(o).replace(/\n/g, '\n    ')).join('\n')}

    ${trackingHead()}
</head>
`;
}

function header(active) {
  const item = (href, text, key) =>
    `<a class="nav-link" href="${href}"${active === key ? ' aria-current="page"' : ''}>${text}</a>`;
  return `<body>
    <a class="skip-link" href="#noi-dung">Bỏ qua điều hướng</a>

    <header class="header" id="header">
        <div class="wrap header-bar">
            <a class="brand" href="/" aria-label="Sodi - trang chủ">
                <img src="/assets/images/logo/logo.png" alt="" width="36" height="36" class="brand-logo">
                <span class="brand-name">Sodi</span>
            </a>

            <nav class="nav" id="nav" aria-label="Điều hướng chính">
                ${item('/#tinh-nang', 'Tính năng', 'tinh-nang')}
                ${item('/#nganh-hang', 'Ngành hàng', 'nganh')}
                ${item('/huong-dan', 'Hướng dẫn', 'huong-dan')}
                ${item('/kien-thuc', 'Kiến thức', 'kien-thuc')}
                ${item('/#hoi-dap', 'Hỏi đáp', 'hoi-dap')}
                <a class="btn btn-primary btn-sm nav-cta" href="#tai-ung-dung">Tải ứng dụng</a>
            </nav>

            <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav"
                aria-label="Mở menu">
                <span class="menu-bars" aria-hidden="true"></span>
            </button>
        </div>
    </header>
`;
}

function closing() {
  return `        <section class="closing" id="tai-ung-dung">
            <div class="wrap closing-inner">
                <h2 class="closing-title">Sẵn sàng quản lý cửa hàng gọn hơn?</h2>
                <p class="closing-lead">Tải SoDi ngay hôm nay. Miễn phí để bắt đầu, không cần thẻ thanh toán.</p>
                <div class="store-row store-row-center">
                ${storeBadges()}
                </div>
            </div>
        </section>
`;
}

function footer() {
  const year = new Date().getFullYear();
  return `    <footer class="footer">
        <div class="wrap footer-grid">
            <div class="footer-brand">
                <a class="brand" href="/" aria-label="Sodi - trang chủ">
                    <img src="/assets/images/logo/logo.png" alt="" width="32" height="32" class="brand-logo" loading="lazy">
                    <span class="brand-name">Sodi</span>
                </a>
                <p>Phần mềm quản lý bán hàng, kho hàng và hóa đơn trên điện thoại cho chủ shop và quán cafe.</p>
            </div>
            <div class="footer-col">
                <h2 class="footer-h">Sản phẩm</h2>
                <a href="/#tinh-nang">Tính năng</a>
                <a href="/#hoi-dap">Hỏi đáp</a>
                <a href="/huong-dan">Hướng dẫn</a>
                <a href="/kien-thuc">Kiến thức</a>
            </div>
            <div class="footer-col">
                <h2 class="footer-h">Ngành hàng</h2>
${INDUSTRY_LINKS.map(([href, text]) => `                <a href="${href}">${text}</a>`).join('\n')}
            </div>
            <div class="footer-col">
                <h2 class="footer-h">Tải ứng dụng</h2>
                <a href="${LINKS.appStore}" target="_blank" rel="noopener">App Store</a>
                <a href="${LINKS.googlePlay}" target="_blank" rel="noopener">Google Play</a>
            </div>
            <div class="footer-col">
                <h2 class="footer-h">Liên hệ</h2>
                <a href="mailto:${LINKS.email}">${LINKS.email}</a>
                <a href="${LINKS.facebook}" target="_blank" rel="noopener">Facebook</a>
                <a href="${LINKS.youtube}" target="_blank" rel="noopener">YouTube</a>
            </div>
        </div>
        <div class="wrap footer-base">
            <p>© <span id="year">${year}</span> Sodi Quản lý bán hàng. <a href="/privacy-policy.html">Chính sách bảo mật</a> · <a href="/terms-of-service.html">Điều khoản</a></p>
        </div>
    </footer>

    <script src="/assets/js/site.js?v=${JS_V}" defer></script>
</body>

</html>
`;
}

function crumbsHtml(items) {
  const lis = items.map((c, i) => i === items.length - 1
    ? `<li aria-current="page">${esc(c.name)}</li>`
    : `<li><a href="${c.path}">${esc(c.name)}</a></li>`);
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${lis.join('')}</ol></nav>`;
}
function crumbsLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.name, item: SITE + (c.path === '/' ? '/' : c.path),
    })),
  };
}

function ctaBox() {
  return `<aside class="cta-box" aria-label="Tải ứng dụng SoDi">
                    <p class="cta-box-title">Thử SoDi cho cửa hàng của bạn</p>
                    <p class="cta-box-text">Miễn phí để bắt đầu. Cài trên điện thoại và tạo đơn đầu tiên trong vài phút.</p>
                    <div class="store-row">
                ${storeBadges()}
                    </div>
                </aside>`;
}

function card(p, headingTag = 'h2') {
  return `<li class="post-card">
                        <a href="${p.path}">
                            <span class="post-card-kicker">${esc(COLLECTIONS[p.collection].label)}</span>
                            <${headingTag} class="post-card-title">${esc(p.title)}</${headingTag}>
                            <p>${esc(p.description)}</p>
                            <span class="post-card-more">Đọc tiếp</span>
                        </a>
                    </li>`;
}

// ---------------------------------------------------------------------------
// Load content
// ---------------------------------------------------------------------------

const REQUIRED = ['title', 'description', 'slug', 'keyword', 'datePublished', 'dateModified'];
const pages = [];

for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
  const dir = path.join(CONTENT, collection);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const file = path.relative(ROOT, path.join(dir, name)).replace(/\\/g, '/');
    const { data, content } = matter(fs.readFileSync(path.join(dir, name), 'utf8'));
    for (const k of REQUIRED) if (!data[k]) errors.push(`${file}: thiếu "${k}" trong front matter`);
    if (data.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(data.slug)) errors.push(`${file}: slug "${data.slug}" phải viết thường, không dấu, nối bằng gạch ngang`);
    if (data.slug && name !== `${data.slug}.md`) warnings.push(`${file}: tên file nên là ${data.slug}.md`);
    if (/^#\s/m.test(content)) errors.push(`${file}: không dùng "# " trong bài, H1 lấy từ "title"`);
    pages.push({
      file, collection, cfg, content,
      title: data.title,
      seoTitle: data.seoTitle || data.title,
      description: data.description,
      lead: data.lead || '',
      slug: data.slug,
      keyword: data.keyword,
      datePublished: isoDate(data.datePublished, file, 'datePublished'),
      dateModified: isoDate(data.dateModified, file, 'dateModified'),
      related: data.related || [],
      image: data.image || '',
      imageAlt: data.imageAlt || '',
      faq: data.faq || [],
      order: data.order ?? 999,
      path: `/${collection}/${data.slug}`,
      url: `${SITE}/${collection}/${data.slug}`,
    });
  }
}

const bySlug = new Map();
for (const p of pages) {
  if (bySlug.has(p.slug)) errors.push(`${p.file}: slug "${p.slug}" bị trùng với ${bySlug.get(p.slug).file}`);
  bySlug.set(p.slug, p);
}

// ---------------------------------------------------------------------------
// Render content pages
// ---------------------------------------------------------------------------

marked.use({ gfm: true });

function renderBody(p) {
  let html = marked.parse(p.content);
  // Tables scroll sideways on phones instead of widening the page.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  // External links open in a new tab.
  html = html.replace(/<a href="(https?:\/\/(?!sodientu\.com)[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');
  // Images: lazy loading.
  html = html.replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" ');
  // Mid-article download block: at <!-- cta --> or before the middle H2.
  if (html.includes('<!-- cta -->')) {
    html = html.replace('<!-- cta -->', ctaBox());
  } else {
    const h2s = [...html.matchAll(/<h2[ >]/g)];
    if (h2s.length >= 2) {
      const at = h2s[Math.floor(h2s.length / 2)].index;
      html = html.slice(0, at) + ctaBox() + '\n' + html.slice(at);
    } else {
      warnings.push(`${p.file}: không đủ mục H2 để chèn khối tải app giữa bài, thêm <!-- cta -->`);
    }
  }
  return html;
}

function checkPage(p, body) {
  const fullTitle = `${p.seoTitle} | SoDi`;
  if (len(fullTitle) > 60) warnings.push(`${p.file}: <title> dài ${len(fullTitle)} ký tự (nên < 60), thêm "seoTitle" ngắn hơn`);
  const dl = len(p.description);
  if (dl < 140 || dl > 160) warnings.push(`${p.file}: description dài ${dl} ký tự (nên 140–160)`);
  const words = wordCount(body);
  const [min, max] = p.cfg.words;
  if (words < min || words > max) warnings.push(`${p.file}: ${words} từ (nên ${min}–${max})`);
  if (p.collection === 'kien-thuc') {
    if (!/href="\/huong-dan\//.test(body)) errors.push(`${p.file}: bài kiến thức phải link tới ít nhất 1 trang /huong-dan/`);
    if (!/href="\/nganh\//.test(body)) errors.push(`${p.file}: bài kiến thức phải link tới ít nhất 1 trang /nganh/`);
    if (!p.related.length) errors.push(`${p.file}: bài kiến thức cần "related"`);
  }
  if (p.collection === 'huong-dan' && !/href="\/nganh\//.test(body)) errors.push(`${p.file}: hướng dẫn phải link về ít nhất 1 trang /nganh/`);
  if (/hoàn toàn miễn phí/i.test(stripTags(body) + p.description)) errors.push(`${p.file}: viết "miễn phí để bắt đầu", không viết "hoàn toàn miễn phí"`);
  if (/mất mạng|offline|ngoại tuyến|hóa đơn điện tử|S1a/i.test(stripTags(body)) && !/TODO: chờ xác nhận/.test(p.content)) {
    warnings.push(`${p.file}: có nhắc tính năng chưa xác nhận (mất mạng / hóa đơn điện tử / S1a), kiểm tra lại`);
  }
}

function renderPage(p) {
  const body = renderBody(p);
  checkPage(p, body);

  const crumbs = p.collection === 'nganh'
    ? [{ name: 'Trang chủ', path: '/' }, { name: p.title, path: p.path }]
    : [{ name: 'Trang chủ', path: '/' }, { name: p.cfg.label, path: `/${p.collection}` }, { name: p.title, path: p.path }];

  const image = p.image ? (p.image.startsWith('http') ? p.image : SITE + p.image) : DEFAULT_IMAGE;
  const ld = [crumbsLd(crumbs)];
  if (p.cfg.article) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.title,
      description: p.description,
      image: [image],
      datePublished: p.datePublished,
      dateModified: p.dateModified,
      inLanguage: 'vi',
      mainEntityOfPage: p.url,
      author: { '@type': 'Organization', name: 'SoDi', url: SITE + '/' },
      publisher: { '@type': 'Organization', name: 'SoDi', logo: { '@type': 'ImageObject', url: LOGO } },
    });
  }
  if (p.faq.length) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: stripTags(marked.parseInline(f.a)).replace(/\s+/g, ' ').trim() },
      })),
    });
  }

  const related = p.related.map((s) => {
    const r = bySlug.get(s);
    if (!r) errors.push(`${p.file}: "related" có slug không tồn tại: ${s}`);
    return r;
  }).filter(Boolean);

  const faqHtml = p.faq.length ? `
                <section class="article-faq" aria-labelledby="faq-title">
                    <h2 id="faq-title">Câu hỏi thường gặp</h2>
${p.faq.map((f) => `                    <details class="qa">
                        <summary>${esc(f.q)}</summary>
                        <p>${marked.parseInline(f.a)}</p>
                    </details>`).join('\n')}
                </section>` : '';

  const relatedHtml = related.length ? `
                <section class="related" aria-labelledby="related-title">
                    <h2 id="related-title" class="related-title">Bài liên quan</h2>
                    <ul class="post-grid">
                    ${related.map((r) => card(r, 'h3')).join('\n                    ')}
                    </ul>
                </section>` : '';

  const heroImg = p.image ? `
                <img class="article-image" src="${esc(p.image)}" alt="${esc(p.imageAlt)}" width="900" height="506" loading="lazy">` : '';

  const html = head({
    title: `${p.seoTitle} | SoDi`, description: p.description, url: p.url,
    type: p.cfg.article ? 'article' : 'website', image, ld,
    published: p.cfg.article ? p.datePublished : null, modified: p.dateModified,
  }) + header(p.collection) + `
    <main id="noi-dung">
        <article class="article">
            <div class="wrap article-wrap">
                ${crumbsHtml(crumbs)}
                <header class="article-head">
                    <p class="eyebrow">${esc(p.cfg.eyebrow)}</p>
                    <h1 class="article-title">${esc(p.title)}</h1>${p.lead ? `
                    <p class="article-lead">${esc(p.lead)}</p>` : ''}
                    <p class="article-meta">Cập nhật <time datetime="${p.dateModified}">${viDate(p.dateModified)}</time> · SoDi</p>
                </header>${heroImg}
                <div class="prose">
${body}
                </div>${faqHtml}${relatedHtml}
            </div>
        </article>

${closing()}    </main>

` + footer();

  return { html, body };
}

for (const p of pages) {
  const { html } = renderPage(p);
  write(`${p.collection}/${p.slug}.html`, html);
}

// ---------------------------------------------------------------------------
// List pages
// ---------------------------------------------------------------------------

const listPages = [];
for (const [collection, cfg] of Object.entries(COLLECTIONS)) {
  if (!cfg.list) continue;
  const items = pages.filter((p) => p.collection === collection).sort((a, b) =>
    collection === 'huong-dan'
      ? a.order - b.order || a.title.localeCompare(b.title, 'vi')
      : b.datePublished.localeCompare(a.datePublished) || a.title.localeCompare(b.title, 'vi'));
  const url = `${SITE}/${collection}`;
  const crumbs = [{ name: 'Trang chủ', path: '/' }, { name: cfg.label, path: `/${collection}` }];
  const titleTag = `${cfg.listSeoTitle} | SoDi`;
  if (len(titleTag) > 60) warnings.push(`${collection}/index: <title> dài ${len(titleTag)} ký tự`);
  const dl = len(cfg.listDescription);
  if (dl < 140 || dl > 160) warnings.push(`${collection}/index: description dài ${dl} ký tự`);

  const html = head({ title: titleTag, description: cfg.listDescription, url, ld: [crumbsLd(crumbs)] }) + header(collection) + `
    <main id="noi-dung">
        <section class="list-page">
            <div class="wrap">
                ${crumbsHtml(crumbs)}
                <header class="article-head">
                    <p class="eyebrow">SoDi</p>
                    <h1 class="article-title">${esc(cfg.listTitle)}</h1>
                    <p class="article-lead">${esc(cfg.listIntro)}</p>
                </header>
                <ul class="post-grid">
                    ${items.map((p) => card(p)).join('\n                    ')}
                </ul>
            </div>
        </section>

${closing()}    </main>

` + footer();
  write(`${collection}/index.html`, html);
  const lastmod = items.map((p) => p.dateModified).sort().pop() || new Date().toISOString().slice(0, 10);
  listPages.push({ url, lastmod });
}

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

{
  const guides = pages.filter((p) => p.collection === 'huong-dan').sort((a, b) => a.order - b.order).slice(0, 3);
  const html = head({
    title: 'Không tìm thấy trang | SoDi',
    description: 'Trang bạn tìm không tồn tại hoặc đã được chuyển. Quay về trang chủ SoDi hoặc xem hướng dẫn và kiến thức bán hàng.',
    noindex: true,
  }) + header('') + `
    <main id="noi-dung">
        <section class="list-page notfound">
            <div class="wrap">
                <header class="article-head">
                    <p class="eyebrow">Lỗi 404</p>
                    <h1 class="article-title">Không tìm thấy trang này</h1>
                    <p class="article-lead">Đường dẫn có thể đã thay đổi hoặc bị gõ sai. Bạn thử một trong các trang dưới đây nhé.</p>
                </header>
                <div class="cta-row">
                    <a class="btn btn-primary" href="/">Về trang chủ</a>
                    <a class="text-link" href="/huong-dan">Xem hướng dẫn</a>
                    <a class="text-link" href="/kien-thuc">Kiến thức bán hàng</a>
                </div>
                <h2 class="related-title">Có thể bạn đang tìm</h2>
                <ul class="post-grid">
                    ${guides.map((p) => card(p)).join('\n                    ')}
                </ul>
            </div>
        </section>

${closing()}    </main>

` + footer();
  write('404.html', html);
}

// ---------------------------------------------------------------------------
// Home page: the page is edited by hand. The build only bumps the asset
// versions and fills the "Bài viết mới" block between
// <!-- latest-posts:start --> and <!-- latest-posts:end -->.
// ---------------------------------------------------------------------------

{
  const f = path.join(PUBLIC, 'index.html');
  const before = fs.readFileSync(f, 'utf8');
  let after = before
    .replace(/assets\/css\/site\.css(\?v=\w+)?"/, `assets/css/site.css?v=${CSS_V}"`)
    .replace(/assets\/js\/site\.js(\?v=\w+)?"/, `assets/js/site.js?v=${JS_V}"`);

  const START = '<!-- latest-posts:start -->';
  const END = '<!-- latest-posts:end -->';
  const a = after.indexOf(START);
  const b = after.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    warnings.push('public/index.html: không thấy cặp comment latest-posts, bỏ qua khối "Bài viết mới"');
  } else {
    const latest = pages.filter((p) => p.collection === 'kien-thuc')
      .sort((x, y) => y.datePublished.localeCompare(x.datePublished) || y.dateModified.localeCompare(x.dateModified) || x.title.localeCompare(y.title, 'vi'))
      .slice(0, 3);
    const block = latest.length ? `
        <section class="section section-tint latest" aria-labelledby="bai-viet-moi">
            <div class="wrap">
                <div class="center-head">
                    <h2 class="h2" id="bai-viet-moi">Bài viết mới</h2>
                    <p class="section-lead">Kinh nghiệm quản lý bán hàng cho chủ quán, chủ shop nhỏ.</p>
                </div>
                <ul class="post-grid">
                    ${latest.map((p) => card(p, 'h3')).join('\n                    ')}
                </ul>
                <p class="latest-more"><a class="text-link" href="/kien-thuc">Xem tất cả bài viết</a></p>
            </div>
        </section>
        ` : '\n        ';
    after = after.slice(0, a + START.length) + block + after.slice(b);
  }
  if (after !== before) fs.writeFileSync(f, after);
}

// ---------------------------------------------------------------------------
// Sitemap
// ---------------------------------------------------------------------------

{
  const homeLastmod = fs.statSync(path.join(PUBLIC, 'index.html')).mtime.toISOString().slice(0, 10);
  const urls = [
    { url: `${SITE}/`, lastmod: homeLastmod },
    ...listPages,
    ...pages.map((p) => ({ url: p.url, lastmod: p.dateModified })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.url}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  write('sitemap.xml', xml);
}

// ---------------------------------------------------------------------------
// Internal link check over every HTML page in public/ we own
// ---------------------------------------------------------------------------

function resolveTarget(fromRel, ref) {
  if (/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(ref) || ref.startsWith('//')) return null;
  const base = new URL('https://x/' + fromRel.replace(/\\/g, '/'));
  const u = new URL(ref, base);
  return decodeURIComponent(u.pathname);
}
function exists(p) {
  if (p === '/' || p === '') return fs.existsSync(path.join(PUBLIC, 'index.html'));
  const f = path.join(PUBLIC, p);
  if (path.extname(p)) return fs.existsSync(f);
  return fs.existsSync(f + '.html') || fs.existsSync(path.join(f, 'index.html'));
}

{
  const toCheck = ['index.html', '404.html',
    ...Object.keys(COLLECTIONS).flatMap((c) => {
      const d = path.join(PUBLIC, c);
      return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.html')).map((f) => `${c}/${f}`) : [];
    })];
  for (const rel of toCheck) {
    const html = fs.readFileSync(path.join(PUBLIC, rel), 'utf8');
    for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const ref = m[1];
      const target = resolveTarget(rel, ref);
      if (target === null) continue;
      if (!exists(target)) errors.push(`public/${rel}: link hỏng "${ref}"`);
      if (/^\/(nganh|huong-dan|kien-thuc)\/.+\.html$/.test(target)) warnings.push(`public/${rel}: link "${ref}" nên bỏ đuôi .html`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const counts = Object.keys(COLLECTIONS).map((c) => `${c}: ${pages.filter((p) => p.collection === c).length}`).join(', ');
console.log(`Đã tạo ${pages.length} trang (${counts}), ${listPages.length} trang danh sách, 404.html, sitemap.xml`);
for (const w of warnings) console.warn('  cảnh báo: ' + w);
if (errors.length) {
  for (const e of errors) console.error('  LỖI: ' + e);
  console.error(`Build thất bại: ${errors.length} lỗi.`);
  process.exit(1);
}
console.log('Build xong, không có lỗi.');
