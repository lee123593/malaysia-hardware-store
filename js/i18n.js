/* ============================================================
   Malaysia Design Phone Case Store — i18n Language Pack
   Window 2: Frontend
   Supports: zh (Chinese) · en (English) · ms (Bahasa Melayu)
   ============================================================ */

const I18N = {
  current: localStorage.getItem('lang') || 'en',

  strings: {

    /* Navigation */
    'nav.home':        { zh:'首页',       en:'Home',         ms:'Laman Utama' },
    'nav.category':    { zh:'机型分类',   en:'Models',       ms:'Model' },
    'nav.cart':        { zh:'购物车',     en:'Cart',         ms:'Troli' },
    'nav.about':       { zh:'关于我们',   en:'About',        ms:'Tentang' },
    'nav.checkout':    { zh:'结算',       en:'Checkout',     ms:'Daftar Keluar' },

    /* Hero */
    'hero.title':      { zh:'Design Phone Cases Only', en:'Design Phone Cases Only', ms:'Sarung Telefon Berreka Bentuk Sahaja' },
    'hero.subtitle':   { zh:'中国原创设计 · 海量机型适配 · 高颜值低价格<br>专为马来西亚年轻用户打造的手机壳商城', en:'Original Chinese designs · All popular models · Affordable style<br>Phone cases crafted for Malaysia\'s young generation', ms:'Rekaan asli China · Semua model popular · Gaya mampu milik<br>Sarung telefon direka untuk generasi muda Malaysia' },
    'hero.cta1':       { zh:'浏览机型',   en:'Find Your Model', ms:'Cari Model Anda' },
    'hero.cta2':       { zh:'热门推荐',   en:'Trending Now', ms:'Trend Terkini' },

    /* Selling Points */
    'sp1.title':       { zh:'中国原创设计', en:'China Original Design', ms:'Rekaan Asli China' },
    'sp1.desc':        { zh:'汇集中国顶尖手机壳设计师作品，每一款都独具匠心', en:'Curated from China\'s top case designers — every piece is unique', ms:'Dipilih daripada pereka sarung telefon terbaik China — setiap satu unik' },
    'sp2.title':       { zh:'海量机型覆盖', en:'All Popular Models', ms:'Semua Model Popular' },
    'sp2.desc':        { zh:'覆盖马来西亚全部热门机型，iPhone、Samsung、Xiaomi、OPPO一网打尽', en:'Covers every popular phone in Malaysia — iPhone, Samsung, Xiaomi, OPPO & more', ms:'Meliputi semua telefon popular di Malaysia — iPhone, Samsung, Xiaomi, OPPO & lagi' },
    'sp3.title':       { zh:'低价高颜值',   en:'Affordable & Stylish', ms:'Mampu Milik & Bergaya' },
    'sp3.desc':        { zh:'源头直供，去掉中间环节，用最低价格买最好看的手机壳', en:'Direct from source — no middlemen, best prices for the best-looking cases', ms:'Terus dari sumber — tiada orang tengah, harga terbaik untuk sarung paling cantik' },
    'sp4.title':       { zh:'全马配送',     en:'Malaysia-Wide Shipping', ms:'Penghantaran Seluruh Malaysia' },
    'sp4.desc':        { zh:'西马/东马均可送达，清晰时效说明，让你买得放心', en:'Shipping to West & East Malaysia with clear delivery estimates', ms:'Penghantaran ke Semenanjung & Malaysia Timur dengan anggaran jelas' },

    /* Sections */
    'section.models':  { zh:'热门机型直达', en:'Popular Models', ms:'Model Popular' },
    'section.models.desc': { zh:'快速找到你的手机型号，一键浏览专属款式', en:'Find your phone model instantly, browse matching cases', ms:'Cari model telefon anda dengan pantas, lihat sarung yang sepadan' },
    'section.new':     { zh:'新品上市',     en:'New Arrivals',  ms:'Baru Tiba' },
    'section.hot':     { zh:'热销推荐',     en:'Best Sellers',  ms:'Paling Laris' },
    'section.related': { zh:'同型号推荐',   en:'Same Model',    ms:'Model Sama' },

    /* Category */
    'category.title':  { zh:'全部手机型号', en:'All Phone Models', ms:'Semua Model Telefon' },
    'category.subtitle': { zh:'选择你的手机品牌和型号，找到完美适配的手机壳', en:'Select your phone brand and model to find the perfect case', ms:'Pilih jenama dan model telefon anda untuk mencari sarung yang sempurna' },
    'category.all':    { zh:'全部品牌',     en:'All Brands',    ms:'Semua Jenama' },
    'category.search': { zh:'搜索机型...',   en:'Search model...', ms:'Cari model...' },

    /* Products */
    'products.title':  { zh:'{model} 手机壳专属款式', en:'{model} Phone Cases', ms:'Sarung Telefon {model}' },
    'products.count':  { zh:'共 {count} 款', en:'{count} styles', ms:'{count} gaya' },
    'products.empty':  { zh:'暂无该机型手机壳', en:'No cases for this model yet', ms:'Tiada sarung untuk model ini' },
    'sort.newest':     { zh:'最新上架',     en:'Newest',        ms:'Terbaru' },
    'sort.popular':    { zh:'热销优先',     en:'Popular',       ms:'Popular' },
    'sort.price-low':  { zh:'价格从低到高', en:'Price: Low-High', ms:'Harga: Rendah-Tinggi' },
    'sort.price-high': { zh:'价格从高到低', en:'Price: High-Low', ms:'Harga: Tinggi-Rendah' },

    /* Detail */
    'detail.model':    { zh:'适配机型',     en:'Compatible Model', ms:'Model Serasi' },
    'detail.material': { zh:'材质',         en:'Material',     ms:'Bahan' },
    'detail.style':    { zh:'风格',         en:'Style',        ms:'Gaya' },
    'detail.shipping': { zh:'发货说明',     en:'Shipping Info', ms:'Maklumat Penghantaran' },
    'detail.shipping.text': { zh:'从中国直发马来西亚，西马约7-12天，东马约10-15天', en:'Ships from China to Malaysia: West ~7-12 days, East ~10-15 days', ms:'Dihantar dari China ke Malaysia: Semenanjung ~7-12 hari, Malaysia Timur ~10-15 hari' },
    'detail.addCart':  { zh:'加入购物车',   en:'Add to Cart',  ms:'Tambah ke Troli' },
    'detail.buyNow':   { zh:'立即购买',     en:'Buy Now',      ms:'Beli Sekarang' },
    'detail.qty':      { zh:'数量',         en:'Quantity',     ms:'Kuantiti' },
    'detail.inStock':  { zh:'有货',         en:'In Stock',     ms:'Ada Stok' },
    'detail.outStock': { zh:'暂时缺货',     en:'Out of Stock', ms:'Kehabisan Stok' },
    'detail.added':    { zh:'已加入购物车', en:'Added to cart!', ms:'Ditambah ke troli!' },

    /* Cart */
    'cart.title':      { zh:'我的购物车',   en:'My Cart',      ms:'Troli Saya' },
    'cart.empty':      { zh:'购物车是空的', en:'Your cart is empty', ms:'Troli anda kosong' },
    'cart.empty.hint': { zh:'快去挑选你喜欢的手机壳吧！', en:'Go find some beautiful phone cases!', ms:'Cari sarung telefon yang cantik!' },
    'cart.continue':   { zh:'继续购物',     en:'Continue Shopping', ms:'Teruskan Membeli-belah' },
    'cart.summary':    { zh:'订单摘要',     en:'Order Summary', ms:'Ringkasan Pesanan' },
    'cart.subtotal':   { zh:'小计',         en:'Subtotal',     ms:'Jumlah Kecil' },
    'cart.shipping':   { zh:'运费',         en:'Shipping',     ms:'Penghantaran' },
    'cart.total':      { zh:'总计',         en:'Total',        ms:'Jumlah' },
    'cart.checkout':   { zh:'去结算',       en:'Checkout',     ms:'Daftar Keluar' },
    'cart.remove':     { zh:'移除',         en:'Remove',       ms:'Buang' },

    /* Checkout */
    'checkout.title':  { zh:'结算 / 下单',  en:'Checkout',     ms:'Daftar Keluar' },
    'checkout.contact':{ zh:'联系信息',     en:'Contact Info',  ms:'Maklumat Hubungan' },
    'checkout.name':   { zh:'收件人姓名',   en:'Recipient Name', ms:'Nama Penerima' },
    'checkout.phone':  { zh:'联系电话',     en:'Phone Number',  ms:'Nombor Telefon' },
    'checkout.email':  { zh:'电子邮箱',     en:'Email (optional)', ms:'E-mel (pilihan)' },
    'checkout.address':{ zh:'收货地址',     en:'Shipping Address', ms:'Alamat Penghantaran' },
    'checkout.address1':{ zh:'详细地址',    en:'Address Line',  ms:'Alamat' },
    'checkout.city':   { zh:'城市',         en:'City',          ms:'Bandar' },
    'checkout.state':  { zh:'州/省',        en:'State',         ms:'Negeri' },
    'checkout.postcode':{ zh:'邮编',        en:'Postcode',      ms:'Poskod' },
    'checkout.region': { zh:'配送地区',     en:'Shipping Region', ms:'Kawasan Penghantaran' },
    'checkout.west':   { zh:'西马',         en:'West Malaysia', ms:'Semenanjung' },
    'checkout.east':   { zh:'东马',         en:'East Malaysia', ms:'Malaysia Timur' },
    'checkout.west.desc':{ zh:'吉隆坡、雪兰莪、槟城等地区', en:'KL, Selangor, Penang etc.', ms:'KL, Selangor, Pulau Pinang dll.' },
    'checkout.east.desc':{ zh:'沙巴、砂拉越等地区', en:'Sabah, Sarawak etc.', ms:'Sabah, Sarawak dll.' },
    'checkout.orderSummary':{ zh:'订单确认', en:'Order Summary', ms:'Ringkasan Pesanan' },
    'checkout.items': { zh:'商品 ({count})', en:'Items ({count})', ms:'Item ({count})' },
    'checkout.placeOrder':{ zh:'提交订单',  en:'Place Order',   ms:'Hantar Pesanan' },
    'checkout.payment.note':{ zh:'提交订单后，我们将通过 WhatsApp 或邮件联系确认付款', en:'After submission we will contact you via WhatsApp or email to confirm payment', ms:'Selepas penghantaran, kami akan menghubungi anda melalui WhatsApp atau e-mel untuk mengesahkan pembayaran' },

    /* About */
    'about.title':     { zh:'关于我们',     en:'About Us',     ms:'Tentang Kami' },
    'about.subtitle':  { zh:'中国设计货源 · 马来西亚专供', en:'China Design Direct · Exclusive for Malaysia', ms:'Rekaan China Langsung · Eksklusif untuk Malaysia' },
    'about.story':     { zh:'店铺介绍',     en:'Our Story',    ms:'Kisah Kami' },
    'about.story.text':{ zh:'我们是一家专注马来西亚市场的手机壳独立站，所有产品均来自中国原创设计师品牌。我们致力于让每一位马来西亚用户，都能用实惠的价格买到高品质、高颜值的手机壳。', en:'We are an independent phone case store focused on the Malaysian market. All products come from original Chinese designer brands. We are dedicated to bringing every Malaysian user high-quality, beautifully designed phone cases at affordable prices.', ms:'Kami adalah kedai sarung telefon bebas yang berfokus pada pasaran Malaysia. Semua produk datang dari jenama pereka asli China. Kami berdedikasi untuk membawa setiap pengguna Malaysia sarung telefon berkualiti tinggi dan cantik pada harga mampu milik.' },
    'about.shipping':  { zh:'配送说明',     en:'Shipping Info', ms:'Maklumat Penghantaran' },
    'about.shipping.t1':{ zh:'发货地：中国', en:'Origin: China', ms:'Asal: China' },
    'about.shipping.t2':{ zh:'西马：约7-12个工作日', en:'West Malaysia: ~7-12 working days', ms:'Semenanjung: ~7-12 hari bekerja' },
    'about.shipping.t3':{ zh:'东马：约10-15个工作日', en:'East Malaysia: ~10-15 working days', ms:'Malaysia Timur: ~10-15 hari bekerja' },
    'about.after':     { zh:'售后说明',     en:'After-Sales',  ms:'Selepas Jualan' },
    'about.after.t1':  { zh:'如收到商品有质量问题，请在签收后24小时内联系客服', en:'If you receive a defective product, please contact us within 24 hours of receipt', ms:'Jika anda menerima produk yang rosak, sila hubungi kami dalam masa 24 jam selepas diterima' },
    'about.after.t2':  { zh:'因显示器色差导致的颜色差异，不属于质量问题', en:'Color differences due to display calibration are not considered defects', ms:'Perbezaan warna akibat kalibrasi skrin tidak dianggap sebagai kecacatan' },
    'about.after.t3':  { zh:'所有商品发货前均经过严格质检', en:'All products undergo strict quality inspection before shipping', ms:'Semua produk melalui pemeriksaan kualiti ketat sebelum penghantaran' },

    /* Footer */
    'footer.brand':    { zh:'马来西亚设计感手机壳专属商城 — 中国原创设计，只为你的手机', en:'Malaysia Design Phone Case Store — Original Chinese designs for your phone', ms:'Kedai Sarung Telefon Berreka Bentuk Malaysia — Rekaan asli China untuk telefon anda' },
    'footer.shop':     { zh:'购物指南',     en:'Shopping Guide', ms:'Panduan Membeli' },
    'footer.help':     { zh:'帮助中心',     en:'Help Center',   ms:'Pusat Bantuan' },
    'footer.contact':  { zh:'联系我们',     en:'Contact Us',    ms:'Hubungi Kami' },
    'footer.copyright':{ zh:'© 2026 Malaysia Design Phone Case Store. All rights reserved.', en:'© 2026 Malaysia Design Phone Case Store. All rights reserved.', ms:'© 2026 Malaysia Design Phone Case Store. Hak cipta terpelihara.' },

    /* Common */
    'common.loading':  { zh:'加载中...',    en:'Loading...',   ms:'Memuatkan...' },
    'common.viewAll':  { zh:'查看全部',     en:'View All',     ms:'Lihat Semua' },
    'common.currency': { zh:'RM',           en:'RM',           ms:'RM' },
    'common.free':     { zh:'免费',         en:'Free',         ms:'Percuma' },
    'common.search':   { zh:'搜索',         en:'Search',       ms:'Cari' },
    'common.back':     { zh:'返回',         en:'Back',         ms:'Kembali' },
  },

  t(key, vars) {
    const str = this.strings[key];
    if (!str) return key;
    let text = str[this.current] || str['en'] || key;
    if (vars) {
      Object.keys(vars).forEach(k => {
        text = text.replace(`{${k}}`, vars[k]);
      });
    }
    return text;
  },

  setLang(lang) {
    if (!['zh','en','ms'].includes(lang)) return;
    this.current = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    this.updatePage();
  },

  updatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) el.innerHTML = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.t(key);
      if (text) el.placeholder = text;
    });
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
    });
    window.dispatchEvent(new CustomEvent('langChange', { detail: { lang: this.current } }));
  },

  init() {
    document.documentElement.lang = this.current;
    this.updatePage();
    document.querySelectorAll('.lang-switch button').forEach(btn => {
      btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
    });
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
