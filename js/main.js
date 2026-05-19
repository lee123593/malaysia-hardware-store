/* ============================================================
   Malaysia Design Phone Case Store — Main JavaScript
   Window 2: Frontend — Cart, Navigation, Scroll FX, Skeleton
   ============================================================ */

/* ============================================================
   CART SYSTEM (localStorage)
   ============================================================ */
const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.updateCount();
  },

  add(product, qty = 1) {
    const items = this.get();
    const exist = items.find(i => i.id === product.id);
    if (exist) { exist.qty += qty; }
    else { items.push({ ...product, qty }); }
    this.save(items);
    this.showToast(I18N.t('detail.added'), 'success');
    this.animateCartIcon();
  },

  remove(id) {
    const items = this.get().filter(i => i.id !== id);
    this.save(items);
  },

  updateQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = qty; this.save(items); }
  },

  count() { return this.get().reduce((s, i) => s + i.qty, 0); },

  total() { return this.get().reduce((s, i) => s + (i.price * i.qty), 0); },

  updateCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const c = this.count();
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
      if (c > 0) { el.classList.add('cart-pop'); setTimeout(() => el.classList.remove('cart-pop'), 300); }
    });
  },

  animateCartIcon() {
    document.querySelectorAll('.cart-badge').forEach(icon => {
      icon.style.transform = 'scale(1.3)';
      setTimeout(() => icon.style.transform = 'scale(1)', 200);
    });
  },

  showToast(msg, type = '') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300); }, 2500);
  },

  init() {
    this.updateCount();
    window.addEventListener('storage', () => this.updateCount());
  }
};

/* ============================================================
   STORE / PRODUCT DATA
   ============================================================ */
const Store = {
  brands: [
    {
      id: 'apple', name: 'Apple iPhone',
      models: [
        'iPhone 16 Pro Max','iPhone 16 Pro','iPhone 16 Plus','iPhone 16',
        'iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15 Plus','iPhone 15',
        'iPhone 14 Pro Max','iPhone 14 Pro','iPhone 14 Plus','iPhone 14',
        'iPhone 13 Pro Max','iPhone 13 Pro','iPhone 13','iPhone 13 mini',
        'iPhone 12 Pro Max','iPhone 12 Pro','iPhone 12','iPhone 12 mini'
      ]
    },
    {
      id: 'samsung', name: 'Samsung Galaxy',
      models: [
        'Galaxy S26 Ultra','Galaxy S26+','Galaxy S26',
        'Galaxy S25 Ultra','Galaxy S25+','Galaxy S25',
        'Galaxy Z Fold6','Galaxy Z Flip6','Galaxy Z Fold5','Galaxy Z Flip5',
        'Galaxy A56','Galaxy A36','Galaxy A26','Galaxy A16'
      ]
    },
    {
      id: 'xiaomi', name: 'Xiaomi / Redmi',
      models: [
        'Xiaomi 14 Ultra','Xiaomi 14','Xiaomi 14T Pro','Xiaomi 14T',
        'Xiaomi 13 Pro','Xiaomi 13','Redmi Note 14 Pro+','Redmi Note 14 Pro',
        'Redmi Note 14','Redmi Note 13 Pro+','Redmi Note 13','Redmi 14'
      ]
    },
    {
      id: 'oppo', name: 'OPPO / OnePlus',
      models: [
        'OPPO Find X8 Pro','OPPO Find X8','OPPO Find X7',
        'OPPO Reno12 Pro','OPPO Reno12','OPPO Reno11',
        'OPPO A79','OPPO A78','OnePlus 13','OnePlus 12','OnePlus Nord 4'
      ]
    },
    {
      id: 'realme', name: 'realme',
      models: [
        'realme 14x','realme 14 Pro+','realme 14 Pro','realme 14',
        'realme 13 Pro+','realme 13 Pro','realme 13','realme 12 Pro+',
        'realme C75','realme C67','realme C65'
      ]
    },
    {
      id: 'vivo', name: 'vivo / iQOO',
      models: [
        'vivo X200 Pro','vivo X200','vivo X100 Pro','vivo X100',
        'vivo V40','vivo V30','vivo Y200','vivo Y100',
        'iQOO 13','iQOO 12','iQOO Z9'
      ]
    },
    {
      id: 'honor', name: 'Honor',
      models: [
        'Honor 600 Lite','Honor 600','Honor 500','Honor 500 Lite',
        'Honor X9b','Honor X8b','Honor X7b','Honor 90','Honor 80'
      ]
    },
    {
      id: 'tecno', name: 'Tecno',
      models: [
        'Tecno Camon 50 Ultra','Tecno Camon 50 Pro','Tecno Camon 50',
        'Tecno Camon 40 Pro','Tecno Camon 40','Tecno Spark 20 Pro',
        'Tecno Spark 20','Tecno Pova 6'
      ]
    }
  ],

  getProducts(model, count = 12) {
    const styles = ['简约纯色','渐变光影','大理石纹','几何线条','卡通插画','复古油画','抽象艺术','透明浮雕','ins风字母','日系和风','赛博朋克','水墨中国'];
    const materials = ['TPU软胶','PC硬壳','液态硅胶','磨砂质感','透明亚克力'];
    const colors = ['#002FA7','#1A1A2E','#E8D5B7','#2D2D2D','#F5F0E8','#C4A882','#3D5A80','#C9B1FF','#0D0D0D','#E8E0D5'];
    const products = [];
    for (let i = 0; i < count; i++) {
      const price = Math.floor(Math.random() * 40 + 19) + 0.9;
      const colorHex = colors[i % colors.length].replace('#','');
      products.push({
        id: `${model.replace(/\s/g,'-')}-${i+1}`,
        name: `${styles[i % styles.length]}${materials[i % materials.length]}手机壳`,
        model: model,
        price: price,
        style: styles[i % styles.length],
        material: materials[i % materials.length],
        color: colors[i % colors.length],
        image: `https://placehold.co/600x600/${colorHex}/white?text=${encodeURIComponent(model.split(' ').pop())}`,
        images: [
          `https://placehold.co/600x600/${colorHex}/white?text=${encodeURIComponent(model.split(' ').pop())}`,
          `https://placehold.co/600x600/${colors[(i+1)%colors.length].replace('#','')}/white?text=Side`,
          `https://placehold.co/600x600/${colors[(i+2)%colors.length].replace('#','')}/white?text=Detail`
        ],
        badge: i < 4 ? 'new' : (i < 8 ? 'hot' : ''),
        inStock: true
      });
    }
    return products;
  },

  getHotModels() {
    return [
      'iPhone 16 Pro Max','iPhone 16 Pro','iPhone 15 Pro Max','iPhone 15',
      'Galaxy S25 Ultra','Galaxy S25','Galaxy Z Flip6',
      'Xiaomi 14 Ultra','Xiaomi 14T','OPPO Find X8 Pro','OnePlus 13',
      'realme 14 Pro+','vivo X200 Pro','Honor 600 Lite','Tecno Camon 50 Ultra'
    ];
  }
};

/* ============================================================
   UI HELPERS
   ============================================================ */

function renderProductCard(product) {
  const badge = product.badge === 'new'
    ? `<span class="card-badge badge-new">${I18N.t('section.new')}</span>`
    : product.badge === 'hot'
    ? `<span class="card-badge badge-hot">${I18N.t('section.hot')}</span>`
    : '';
  return `
    <div class="card" data-id="${product.id}">
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${badge}
      </div>
      <div class="card-body">
        <div class="card-model">${product.model}</div>
        <h3>${product.name}</h3>
        <div class="card-price"><span class="currency">${I18N.t('common.currency')}</span> ${product.price.toFixed(2)}</div>
      </div>
      <div class="card-footer">
        <span style="font-size:0.8rem;color:var(--text-muted)">${product.material}</span>
        <button class="card-quick-add" onclick="event.stopPropagation();quickAddToCart('${product.id}','${product.name.replace(/'/g,"\\'")}',${product.price},'${product.model.replace(/'/g,"\\'")}','${product.image.replace(/'/g,"\\'")}')" title="${I18N.t('detail.addCart')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </button>
      </div>
    </div>`;
}

function quickAddToCart(id, name, price, model, image) {
  Cart.add({ id, name, price, model, image }, 1);
}

function goToDetail(id) {
  window.location.href = `detail.html?id=${encodeURIComponent(id)}`;
}

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function formatMYR(amount) {
  return `RM ${amount.toFixed(2)}`;
}

/* ============================================================
   HEADER SCROLL
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.header-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  let btn = document.querySelector('.back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
  }
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   RIPPLE EFFECT
   ============================================================ */
function initRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.ripple');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

/* ============================================================
   SKELETON LOADING
   ============================================================ */
function showSkeleton(container, count = 8, type = 'card') {
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = `skeleton skeleton-card animate-fade-in stagger-${(i % 6) + 1}`;
    div.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div style="padding:16px">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>`;
    container.appendChild(div);
  }
}

function hideSkeleton(container) {
  if (!container) return;
  container.innerHTML = '';
}

/* ============================================================
   HERO PARTICLES
   ============================================================ */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = (Math.random() * 6 + 2) + 'px';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.05;
    container.appendChild(particle);
  }
}

/* ============================================================
   GALLERY SWITCH
   ============================================================ */
function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const main = document.querySelector('.gallery-main img');
  if (!thumbs.length || !main) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      main.style.opacity = '0';
      setTimeout(() => {
        main.src = thumb.querySelector('img').src;
        main.style.opacity = '1';
      }, 150);
    });
  });
}

/* ============================================================
   SHIPPING REGION
   ============================================================ */
function initShippingRegion() {
  const options = document.querySelectorAll('.shipping-option');
  const shippingInput = document.getElementById('shippingRegion');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      if (shippingInput) shippingInput.value = opt.dataset.region;
      if (typeof updateCheckoutTotals === 'function') updateCheckoutTotals();
    });
  });
}

/* ============================================================
   QUANTITY INPUTS
   ============================================================ */
function initQuantityInputs() {
  document.querySelectorAll('.quantity-input').forEach(group => {
    const input = group.querySelector('input');
    const minus = group.querySelector('.qty-minus');
    const plus = group.querySelector('.qty-plus');
    if (!input) return;
    minus?.addEventListener('click', () => {
      const v = parseInt(input.value) || 1;
      if (v > 1) { input.value = v - 1; input.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    plus?.addEventListener('click', () => {
      const v = parseInt(input.value) || 1;
      if (v < 99) { input.value = v + 1; input.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    input.addEventListener('change', () => {
      let v = parseInt(input.value) || 1;
      if (v < 1) v = 1; if (v > 99) v = 99;
      input.value = v;
    });
  });
}

/* ============================================================
   FILTER TABS
   ============================================================ */
function initFilterTabs(container, onChange) {
  if (!container) return;
  container.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (onChange) onChange(tab.dataset.sort);
    });
  });
}

/* ============================================================
   GLOBAL INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  initRipple();
  initHeroParticles();
  initGallery();
  initShippingRegion();
  initQuantityInputs();

  /* Highlight active nav */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === '/' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* Page enter animation */
  document.querySelector('main')?.classList.add('page-enter');

  /* Card click navigation */
  document.querySelectorAll('.card[data-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-quick-add')) return;
      goToDetail(card.dataset.id);
    });
    card.style.cursor = 'pointer';
  });
});
