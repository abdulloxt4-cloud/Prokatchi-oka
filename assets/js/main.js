'use strict';

const CATEGORIES = {
  all: { label: 'Barchasi', icon: 'bi-grid' },
  maxsus: { label: 'Maxsus texnika', icon: 'bi-truck-front' },
  kesish: { label: 'Kesish va arralash', icon: 'bi-scissors' },
  burgulash: { label: 'Burg‘ulash va buzish', icon: 'bi-tools' },
  beton: { label: 'Beton ishlari', icon: 'bi-bricks' },
  zichlash: { label: 'Zichlash', icon: 'bi-layers' },
  payvandlash: { label: 'Payvandlash', icon: 'bi-lightning-charge' },
  silliqlash: { label: 'Silliqlash', icon: 'bi-disc' },
  tozalash: { label: 'Tozalash', icon: 'bi-wind' },
  kompressor: { label: 'Kompressorlar', icon: 'bi-speedometer' },
  elektr: { label: 'Generator va elektr', icon: 'bi-plug' },
  boyash: { label: 'Bo‘yash', icon: 'bi-palette' },
  isitish: { label: 'Isitish', icon: 'bi-thermometer-sun' },
  boshqa: { label: 'Boshqa', icon: 'bi-gear' }
};

let siteCache = null;
const state = { products: [], category: 'all', query: '', currentProductId: '' };
const $ = (selector) => document.querySelector(selector);
const t = (value) => window.I18N ? window.I18N.t(value) : String(value);
const localProduct = (p, field) => {
  const lang = window.I18N?.lang || 'uz';
  return p?.i18n?.[lang]?.[field] || p[field] || '';
};
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);
const iconFor = (category) => (CATEGORIES[category] || CATEGORIES.boshqa).icon;
const labelFor = (category) => (CATEGORIES[category] || CATEGORIES.boshqa).label;
const formatPrice = (n) => Number.isFinite(n) && n >= 0
  ? `${new Intl.NumberFormat('uz-UZ').format(n)} so'm` : t("Narxni so'rash");


const UI_TEXT = {
  uz: {successTitle:'So‘rovingiz uchun rahmat!',successText:'So‘rovingiz qabul qilindi. Tez orada operatorimiz siz bilan aloqaga chiqadi.',successClose:'Yopish',equipmentOptional:'Uskunani tanlang (ixtiyoriy)',branchPlaceholder:'Filialni tanlang',submitSending:'Yuborilmoqda...',submitReady:'So\'rov yuborish <i class="bi bi-send"></i>',invalidPhone:'Telefon raqamni tekshiring.',mapOpen:'Google Maps’da ochish',workTime:'Ish vaqti',workUnknown:'telefon orqali aniqlang',telegramWrite:'Telegram orqali yozish',branchLabel:'FILIAL',savedOk:'So‘rovingiz saqlandi va mas’ul shaxsga Telegram xabarnomasi yuborildi.',savedNoTelegram:'So‘rovingiz serverga saqlandi. Telegram xabarnomasi hali ulanmagan — bazani tekshirish kerak.',quickHint:'Tez so‘rov: ism, telefon va kerakli uskunani qoldiring.',noAddress:'Filial joylashuvi xaritada ko‘rsatilgan'},
  ru: {successTitle:'Спасибо за вашу заявку!',successText:'Ваша заявка принята. Наш оператор свяжется с вами в ближайшее время.',successClose:'Закрыть',equipmentOptional:'Выберите оборудование (необязательно)',branchPlaceholder:'Выберите филиал',submitSending:'Отправка...',submitReady:'Отправить запрос <i class="bi bi-send"></i>',invalidPhone:'Проверьте номер телефона.',mapOpen:'Открыть в Google Maps',workTime:'Режим работы',workUnknown:'уточняйте по телефону',telegramWrite:'Написать в Telegram',branchLabel:'ФИЛИАЛ',savedOk:'Ваш запрос сохранён, а ответственному сотруднику отправлено уведомление в Telegram.',savedNoTelegram:'Ваш запрос сохранён на сервере. Уведомление в Telegram пока не подключено — нужно проверить базу.',quickHint:'Быстрая заявка: оставьте имя, телефон и нужное оборудование.',noAddress:'Точка филиала указана на карте'},
  en: {successTitle:'Thank you for your request!',successText:'Your request has been received. Our operator will contact you shortly.',successClose:'Close',equipmentOptional:'Select equipment (optional)',branchPlaceholder:'Select a branch',submitSending:'Sending...',submitReady:'Send request <i class="bi bi-send"></i>',invalidPhone:'Please check the phone number.',mapOpen:'Open in Google Maps',workTime:'Working hours',workUnknown:'confirm by phone',telegramWrite:'Message on Telegram',branchLabel:'BRANCH',savedOk:'Your request has been saved and a Telegram notification was sent to the responsible staff member.',savedNoTelegram:'Your request has been saved on the server. Telegram notification is not connected yet — please check the database.',quickHint:'Quick request: leave your name, phone and the equipment you need.',noAddress:'The branch location is shown on the map'}
};
const ui = (key) => (UI_TEXT[window.I18N?.lang || 'uz'] || UI_TEXT.uz)[key] || UI_TEXT.uz[key] || '';

let preloaderProgressTimer = null;
function setPreloaderProgress(value) {
  const bar = document.getElementById('preloaderBar');
  if (bar) bar.style.width = `${Math.max(8, Math.min(100, value))}%`;
}
function startPreloader() {
  document.body.classList.add('preloader-active');
  setPreloaderProgress(14);
  let progress = 14;
  preloaderProgressTimer = window.setInterval(() => {
    progress = Math.min(progress + (progress < 70 ? 9 : 3), 92);
    setPreloaderProgress(progress);
  }, 160);
}
function stopPreloader() {
  if (preloaderProgressTimer) window.clearInterval(preloaderProgressTimer);
  setPreloaderProgress(100);
  const loader = document.getElementById('sitePreloader');
  window.setTimeout(() => {
    loader?.classList.add('is-hidden');
    document.body.classList.remove('preloader-active');
  }, 180);
}


const datePlaceholders = {
  uz: {placeholder:'KK.OO.YYYY',hint:'Masalan: 27.10.2026',error:'Sanani KK.OO.YYYY shaklida kiriting.'},
  ru: {placeholder:'ДД.ММ.ГГГГ',hint:'Например: 27.10.2026',error:'Введите дату в формате ДД.ММ.ГГГГ.'},
  en: {placeholder:'DD/MM/YYYY',hint:'For example: 27/10/2026',error:'Enter a date in DD/MM/YYYY format.'}
};
function dateForServer(value) {
  const input = String(value || '').trim();
  if (!input) return '';
  const compact = input.match(/^(\d{2})(\d{2})(\d{4})$/);
  const match = compact || input.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})$/);
  if (!match) return null;
  const d = Number(match[1]), m = Number(match[2]), y = Number(match[3]);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
function dateError() {
  return (datePlaceholders[window.I18N?.lang || 'uz'] || datePlaceholders.uz).error;
}
function refreshDateHint() {
  const lang = window.I18N?.lang || 'uz';
  const labels = datePlaceholders[lang] || datePlaceholders.uz;
  const input = $('#rentalDate');
  if (input) input.placeholder = labels.placeholder;
  const hint = $('#dateHelp');
  if (hint) hint.textContent = labels.hint;
}

let revealObserver = null;
function initScrollReveal() {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      entry.target.dataset.revealed = 'true';
      observer.unobserve(entry.target);
    }
  }, {threshold:0.06,rootMargin:'0px 0px 40px 0px'});
}
function observeReveal(elements) {
  if (!revealObserver) return;
  for (const element of elements) {
    if (element.dataset.revealed) continue;
    const belowScreen = element.getBoundingClientRect().top > window.innerHeight + 16;
    if (belowScreen) element.classList.add('reveal-pending');
    revealObserver.observe(element);
  }
}

async function readData(apiPath, staticPath) {
  for (const path of [apiPath, staticPath]) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) continue;
      return await response.json();
    } catch (_) {  }
  }
  throw new Error('Ma\'lumot fayli topilmadi. Saytni Live Server yoki Flask bilan oching.');
}

function isProductImage(path) {
  return typeof path === 'string'
    && /^assets\/images\/(products|catalog)\/[a-zA-Z0-9._/-]+\.(jpe?g|png|webp|avif)$/i.test(path)
    && !path.split('/').includes('..');
}

function mediaHTML(product) {
  const path = isProductImage(product.image) ? product.image : '';
  if (path) return `<div class="product-photo-stage"><img width="1000" height="750" loading="lazy" decoding="async" src="${escapeHTML(path)}" alt="${escapeHTML(localProduct(product, 'name'))} rasmi" /></div>`;
  return `<div class="product-placeholder"><i class="bi ${iconFor(product.category)}" aria-hidden="true"></i><span>FOTO KUTILMOQDA</span></div>`;
}

function productHTML(product) {
  const price = typeof product.price_per_day === 'number' ? product.price_per_day : null;
  const demo = product.is_sample_image === true;
  return `<article class="product-card">
    <div class="product-image">${mediaHTML(product)}${demo ? `<span class="product-tag reference-tag">${escapeHTML(t('NAMUNA RASMI'))}</span>` : ''}<span class="product-code">${escapeHTML(product.sku || 'OKA')}</span></div>
    <div class="product-body"><span class="product-category">${escapeHTML(t(labelFor(product.category)))}</span>
      <h3>${escapeHTML(localProduct(product, 'name'))}</h3><p>${escapeHTML(localProduct(product, 'description') || "Mahsulot tafsilotlari tez orada qo'shiladi.")}</p>
      <div class="price-line"><div><small>${escapeHTML(t('KUNLIK IJARA'))}</small><strong>${escapeHTML(formatPrice(price))}</strong></div><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></div>
      <div class="product-cta"><button class="details-btn" type="button" data-details="${escapeHTML(product.id)}">${escapeHTML(t('Batafsil'))} <i class="bi bi-arrow-right"></i></button><button class="request-btn" type="button" data-request="${escapeHTML(product.id)}">${escapeHTML(t("So'rov"))} <i class="bi bi-arrow-up-right"></i></button></div>
    </div></article>`;
}

function drawFilters() {
  const holder = $('#categoryFilters');
  const categoriesUsed = new Set(state.products.map((p) => p.category));
  const categories = Object.entries(CATEGORIES).filter(([key]) => key === 'all' || categoriesUsed.has(key));
  holder.innerHTML = categories.map(([key, info]) => `<button type="button" class="filter-pill ${key === state.category ? 'active' : ''}" data-category="${key}" aria-pressed="${key === state.category}">${escapeHTML(t(info.label))}</button>`).join('');
}

function drawProducts() {
  const term = state.query.trim().toLocaleLowerCase('uz');
  const products = state.products.filter((p) =>
    (state.category === 'all' || p.category === state.category) &&
    (!term || `${p.sku || ''} ${p.name} ${p.description || ''} ${localProduct(p,'name')} ${localProduct(p,'description')} ${labelFor(p.category)} ${t(labelFor(p.category))}`.toLocaleLowerCase('uz').includes(term))
  );
  $('#resultsCount').textContent = String(products.length).padStart(2, '0');
  if (!products.length) {
    $('#productsGrid').innerHTML = '<div class="empty-state"><i class="bi bi-search"></i>Bu so‘rov bo‘yicha mahsulot topilmadi. Boshqa so‘z bilan qidiring.</div>';
    drawFilters();
    return;
  }

  const grouped = new Map();
  for (const p of products) {
    if (!grouped.has(p.category)) grouped.set(p.category, []);
    grouped.get(p.category).push(p);
  }
  $('#productsGrid').innerHTML = [...grouped.entries()].map(([key, group]) => `
    <section class="catalog-group" aria-label="${escapeHTML(t(labelFor(key)))}">
      <div class="catalog-group-heading">
        <h3><i class="bi ${iconFor(key)}" aria-hidden="true"></i> ${escapeHTML(t(labelFor(key)))}</h3>
        <span>${group.length} ${escapeHTML(t('mahsulot'))}</span>
      </div>
      <div class="product-grid" data-count="${group.length}">${group.map((p) => productHTML(p)).join('')}</div>
    </section>
  `).join('');
  drawFilters();
  observeReveal(document.querySelectorAll('.catalog-group'));
}

function drawProductSelect() {
  const select = $('#equipmentSelect');
  if (!select) return;
  const previous = select.value;
  select.innerHTML = `<option value="">${escapeHTML(ui('equipmentOptional'))}</option>`;
  state.products.forEach((p) => {
    const option = document.createElement('option');
    option.value = String(p.name);
    option.textContent = localProduct(p, 'name');
    option.dataset.productId = p.id;
    select.append(option);
  });
  if (previous) select.value = previous;
}

function openDetails(id) {
  const p = state.products.find((product) => product.id === id);
  if (!p) return;
  state.currentProductId = id;
  const specs = Array.isArray(p.specs) ? p.specs.filter((item) => typeof item === 'string').slice(0, 10) : [];
  const gallery = [p.image, ...(Array.isArray(p.additional_images) ? p.additional_images : [])].filter(isProductImage);
  const galleryHTML = gallery.length > 1 ? `<div class="product-gallery">${gallery.map((path, i) => `<button type="button" class="gallery-thumb ${i === 0 ? 'active' : ''}" data-gallery-path="${escapeHTML(path)}" aria-label="${escapeHTML(localProduct(p, 'name'))}: ${i + 1}-rasm"><img src="${escapeHTML(path)}" alt="" loading="lazy" /></button>`).join('')}</div>` : '';
  $('#productModalBody').innerHTML = `<div class="modal-product-layout"><div class="modal-product-image">${mediaHTML(p)}${galleryHTML}</div><div class="modal-product-info"><span class="modal-category">${escapeHTML(p.sku || 'OKA')} · ${escapeHTML(t(labelFor(p.category)))}${p.demo === true ? ' / NAMUNA' : ''}</span><h3 id="productModalTitle">${escapeHTML(localProduct(p, 'name'))}</h3><p>${escapeHTML(localProduct(p, 'description') || 'Batafsil tavsif kiritilmagan.')}</p><div class="modal-price"><small>KUNLIK IJARA</small><strong>${escapeHTML(formatPrice(typeof p.price_per_day === 'number' ? p.price_per_day : null))}</strong></div>${specs.length ? `<ul class="modal-specs">${specs.map((spec) => `<li>${escapeHTML(spec)}</li>`).join('')}</ul>` : '<p class="modal-hint">Texnik xususiyatlar faqat tasdiqlanganidan keyin qo‘shiladi.</p>'}${p.demo === true ? '<p class="modal-hint">Bu mahsulot kartasi namunaviy; apparatning aniq modeli, rasmi va mavjudligi hali tasdiqlanmagan.</p>' : ''}<button class="btn btn-accent modal-request" type="button" data-request="${escapeHTML(p.id)}">Shu uskuna uchun so‘rov <i class="bi bi-arrow-up-right"></i></button></div></div>`;
  const element = $('#productModal');
  if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(element).show();
  else { element.style.display = 'block'; element.classList.add('show'); element.removeAttribute('aria-hidden'); }
}

function requestProduct(id) {
  const product = state.products.find((p) => p.id === id);
  if (!product) return;
  $('#equipmentSelect').value = product.name;
  const modal = $('#productModal');
  if (window.bootstrap?.Modal) window.bootstrap.Modal.getInstance(modal)?.hide();
  else { modal.classList.remove('show'); modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); }
  $('#contact').scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => $('#customerName').focus({ preventScroll: true }), 500);
}

function safeWebLink(value) {
  if (!value || typeof value !== 'string') return '';
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' ? url.toString() : '';
  } catch (_) { return ''; }
}

function showLink(selector, url) {
  if (!url) return false;
  const a = $(selector);
  a.href = url;
  a.classList.remove('is-hidden');
  return true;
}

function normalizePhone(phone) {
  const normalized = String(phone || '').replace(/[^+\d]/g, '');
  return /^\+?\d{7,16}$/.test(normalized) ? normalized : '';
}

function setLocationCard(card, location, label) {
  const address = location.address && typeof location.address === 'string' ? location.address : ui('noAddress');
  const info = card.querySelector('.location-info');
  info.querySelector('small').textContent = label || ui('branchLabel');
  info.querySelector('h3').textContent = location.name || address;
  info.querySelector('p').innerHTML = `<span class="location-address">${escapeHTML(address)}</span>${location.working_hours ? `<span class="location-hours">${escapeHTML(ui('workTime'))}: ${escapeHTML(location.working_hours)}</span>` : ''}`;
  const link = card.querySelector('.location-link');
  const mapUrl = safeWebLink(location.map_url);
  if (mapUrl) {
    link.href = mapUrl;
    link.classList.remove('is-hidden');
    link.innerHTML = `${escapeHTML(ui('mapOpen'))} <i class="bi bi-arrow-up-right"></i>`;
  } else {
    link.removeAttribute('href');
    link.classList.add('is-hidden');
  }
  const old = card.querySelector('.location-details');
  if (old) old.remove();
  const detail = document.createElement('div');
  detail.className = 'location-details';
  const phones = Array.isArray(location.phones) ? location.phones : [];
  phones.forEach((phone) => {
    const normalized = normalizePhone(phone);
    if (!normalized) return;
    const a = document.createElement('a');
    a.className = 'location-phone';
    a.href = `tel:${normalized}`;
    a.innerHTML = `<i class="bi bi-telephone-fill" aria-hidden="true"></i> ${escapeHTML(phone)}`;
    detail.append(a);
  });
  const telegramId = String(location.telegram_id || '');
  if (/^\d{5,16}$/.test(telegramId)) {
    const a = document.createElement('a');
    a.className = 'location-phone';
    a.href = `tg://user?id=${telegramId}`;
    a.innerHTML = `<i class="bi bi-telegram" aria-hidden="true"></i> ${escapeHTML(ui('telegramWrite'))}`;
    detail.append(a);
  }
  info.append(detail);
}

function applySite(site) {
  siteCache = site;
  if (!site || typeof site !== 'object') return;
  let shown = 0;
  const phone = typeof site.phone === 'string' ? site.phone.trim() : '';
  if (normalizePhone(phone)) {
    shown += Number(showLink('#phoneLink', `tel:${normalizePhone(phone)}`));
    $('#phoneText').textContent = phone;
  }
  const whatsapp = typeof site.whatsapp === 'string' ? site.whatsapp.replace(/\D/g, '') : '';
  if (/^\d{7,16}$/.test(whatsapp)) shown += Number(showLink('#whatsappLink', `https://wa.me/${whatsapp}`));
  const socials = [
    ['instagram', 'Instagram', 'bi-instagram', 'ig'],
    ['telegram', 'Telegram', 'bi-telegram', 'tg'],
    ['youtube', 'YouTube', 'bi-youtube', 'yt'],
    ['facebook', 'Facebook', 'bi-facebook', 'fb']
  ];
  const holderSocial = $('#socialLinks');
  holderSocial.innerHTML = socials.map(([key, label, bi, klass]) => {
    const url = safeWebLink(site[key]);
    return url ? `<a class="social-tile social-${klass}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${label}: sahifani ochish"><span class="social-icon"><i class="bi ${bi}" aria-hidden="true"></i></span><span class="social-label">${label}<small>PROKATCHI OKA</small></span><i class="bi bi-arrow-up-right social-arrow" aria-hidden="true"></i></a>` : '';
  }).join('');
  if (shown || holderSocial.children.length) $('#contactsUnset').classList.add('is-hidden');
  const locations = Array.isArray(site.locations) && site.locations.length
    ? site.locations.filter((loc) => loc && typeof loc === 'object').slice(0, 10)
    : [site];
  const holder = $('#locationsContainer');
  const template = $('#locationTemplate');
  const seen = new Set();
  const uniqueLocations = locations.filter((loc) => {
    const key = String(loc.id || loc.name || '').toLocaleLowerCase('uz').trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 2);
  const fragment = document.createDocumentFragment();
  uniqueLocations.forEach((location, index) => {
    const card = template.content.firstElementChild.cloneNode(true);
    setLocationCard(card, location, location.name || `FILIAL ${index + 1}`);
    fragment.append(card);
  });
  holder.replaceChildren(fragment);
  observeReveal(holder.querySelectorAll('.location-card'));
  const branchSelect = $('#branchSelect');
  if (branchSelect) {
    branchSelect.innerHTML = `<option value="">${escapeHTML(ui('branchPlaceholder'))}</option>`;
    uniqueLocations.forEach((loc) => {
      if (!loc.id || !loc.name) return;
      const option = document.createElement('option');
      option.value = String(loc.id);
      option.textContent = String(loc.name);
      branchSelect.append(option);
    });
  }
}

function showSuccessModal() {
  const el = $('#successModal');
  if (!el) return;
  $('#successTitle').textContent = ui('successTitle');
  $('#successText').textContent = ui('successText');
  $('#successClose').textContent = ui('successClose');
  if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(el).show();
}

async function submitInquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $('#formStatus');
  status.className = 'form-status';
  status.textContent = '';
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const payload = {
    name: $('#customerName').value.trim(),
    phone: $('#customerPhone').value.trim(),
    product: $('#equipmentSelect').value,
    branch: $('#branchSelect').value,
    rental_date: dateForServer($('#rentalDate').value),
    message: $('#customerMessage').value.trim(),
    website: $('#companyWebsite').value,
    consent: $('#privacyConsent').checked
  };
  if ($('#rentalDate').value.trim() && !payload.rental_date) {
    status.classList.add('error');
    status.textContent = dateError();
    $('#rentalDate').focus();
    return;
  }
  if (payload.phone.replace(/\D/g, '').length < 7) {
    status.classList.add('error');
    status.textContent = ui('invalidPhone');
    return;
  }
  const button = $('#submitInquiry');
  button.disabled = true;
  button.innerHTML = ui('submitSending');
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    let result = {};
    try { result = await response.json(); } catch (_) {  }
    if (!response.ok || !result.ok) throw new Error(result.error || 'Server so‘rovni qabul qilmadi.');
    form.reset();
    showSuccessModal();
  } catch (error) {
    status.classList.add('error');
    const prefix = {uz:'Xatolik',ru:'Ошибка',en:'Error'}[window.I18N?.lang || 'uz'] || 'Xatolik';
    status.textContent = `${prefix}: ${error.message}`;
  } finally {
    button.disabled = false;
    button.innerHTML = ui('submitReady');
  }
}



const THEME_TEXT = {
  uz: { short: 'Dark', aria: 'Dark mode', title: 'Tungi rejim' },
  ru: { short: 'Тема', aria: 'Тёмный режим', title: 'Тёмная тема' },
  en: { short: 'Dark', aria: 'Dark mode', title: 'Dark mode' }
};
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  const btn = $('#themeSwitch');
  if (btn) {
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('title', (THEME_TEXT[window.I18N?.lang || 'uz'] || THEME_TEXT.uz).title);
    const icon = btn.querySelector('i');
    if (icon) icon.className = dark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#0e1117' : '#ff8e12');
  try { localStorage.setItem('oka-theme', theme); } catch (_) {}
}
function refreshThemeButtonLabel() {
  const text = $('#themeSwitchText');
  const lang = window.I18N?.lang || 'uz';
  if (text) text.textContent = (THEME_TEXT[lang] || THEME_TEXT.uz).short;
  const btn = $('#themeSwitch');
  if (btn) {
    btn.setAttribute('aria-label', (THEME_TEXT[lang] || THEME_TEXT.uz).aria);
    btn.setAttribute('title', (THEME_TEXT[lang] || THEME_TEXT.uz).title);
  }
}

function refreshDynamicUI() {
  const hint = document.querySelector('.form-quick-hint');
  if (hint) hint.textContent = ui('quickHint');
  const branchSelect = $('#branchSelect');
  if (branchSelect && !branchSelect.value && branchSelect.options[0]) branchSelect.options[0].textContent = ui('branchPlaceholder');
  const equipmentSelect = $('#equipmentSelect');
  if (equipmentSelect && !equipmentSelect.value && equipmentSelect.options[0]) equipmentSelect.options[0].textContent = ui('equipmentOptional');
  const submit = $('#submitInquiry');
  if (submit && !submit.disabled) submit.innerHTML = ui('submitReady');
  if (siteCache) applySite(siteCache);
  refreshDateHint();
}

function wireEvents() {
  $('#searchInput').addEventListener('input', (event) => { state.query = event.target.value; drawProducts(); });
  document.querySelectorAll('[data-quick-category]').forEach((tile) => tile.addEventListener('click', () => {
    state.category = tile.dataset.quickCategory;
    state.query = ''; $('#searchInput').value = '';
    drawProducts(); $('#catalog').scrollIntoView({ behavior: 'smooth' });
  }));
  $('#categoryFilters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    drawProducts();
  });
  $('#resetFilters').addEventListener('click', () => {
    state.category = 'all'; state.query = ''; $('#searchInput').value = ''; drawProducts();
  });
  document.addEventListener('click', (event) => {
    const details = event.target.closest('[data-details]');
    const request = event.target.closest('[data-request]');
    if (details) openDetails(details.dataset.details);
    if (request) requestProduct(request.dataset.request);
    const galleryButton = event.target.closest('[data-gallery-path]');
    if (galleryButton && isProductImage(galleryButton.dataset.galleryPath)) {
      const photo = $('#productModalBody .modal-product-image .product-photo-stage img');
      if (photo) photo.src = galleryButton.dataset.galleryPath;
      $('#productModalBody').querySelectorAll('.gallery-thumb').forEach((b) => b.classList.toggle('active', b === galleryButton));
    }
    if (event.target.closest('[data-bs-dismiss="modal"]') && !window.bootstrap?.Modal) {
      const modal = $('#productModal'); modal.style.display = 'none'; modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true');
    }
  });
  $('#inquiryForm').addEventListener('submit', submitInquiry);
  $('#year').textContent = new Date().getFullYear();
  const date = $('#rentalDate');
  date.addEventListener('input', () => {
    const digits = date.value.replace(/\D/g, '').slice(0, 8);
    if (digits.length > 4) date.value = `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
    else if (digits.length > 2) date.value = `${digits.slice(0, 2)}.${digits.slice(2)}`;
    else date.value = digits;
  });

  document.querySelectorAll('#mainNav .nav-link').forEach((link) => link.addEventListener('click', () => {
    const collapsible = $('#mainNav');
    if (window.bootstrap?.Collapse && collapsible.classList.contains('show')) window.bootstrap.Collapse.getOrCreateInstance(collapsible).hide();
  }));
  $('#themeSwitch')?.addEventListener('click', () => applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));
  refreshThemeButtonLabel();
}

async function init() {
  startPreloader();
  wireEvents();
  initScrollReveal();
  try { applyTheme(localStorage.getItem('oka-theme') || 'light'); } catch (_) { applyTheme('light'); }
  try {
    const products = await readData('/api/products', 'data/products.json');
    if (!Array.isArray(products)) throw new Error('Katalog formati noto‘g‘ri.');
    state.products = products.filter((p) => p && typeof p.id === 'string' && typeof p.name === 'string' && typeof p.category === 'string');
    drawProducts(); drawProductSelect();
  } catch (error) {
    $('#productsGrid').innerHTML = `<div class="empty-state"><i class="bi bi-exclamation-triangle"></i>${escapeHTML(error.message)}</div>`;
    $('#resultsCount').textContent = '00';
  }
  try { applySite(await readData('/api/site', 'data/site.json')); } catch (_) {  }
  refreshDynamicUI();
  observeReveal(document.querySelectorAll('.section-topline, .benefit, .steps article, .category-tile'));
  stopPreloader();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('load', () => setPreloaderProgress(96));

document.addEventListener('oka:languagechange', () => {
  refreshThemeButtonLabel();
  refreshDynamicUI();
  if (state.products.length) {
    drawProducts();
    const sel = $('#equipmentSelect'), prev = sel?.value;
    drawProductSelect();
    if (sel && prev) sel.value = prev;
    if (state.currentProductId && $('#productModal')?.classList.contains('show')) openDetails(state.currentProductId);
  }
});
