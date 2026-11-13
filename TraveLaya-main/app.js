import { allPlacesData, topPlaces, domesticPlaces, blogsData, heroImages, bataanPackagePrices } from './data.js';
import { views, escapeHtml, renderPlaceRow, renderFilterableCard, renderFooter, renderItineraryColumns, renderCompareTable } from './views.js';

let selectedPlace = allPlacesData['bataan-3d2n'];
let selectedPackageType = 'day';
let selectedBataanPackage = 'A';
let slideshowInterval = null;
let detailSlideInterval = null;
let currentDetailSlideIndex = 0;
let appliedPromoDiscount = 0;
let appliedPromoName = '';
let isLoggedIn = false;
let currentUserEmail = null; 
let isAdmin = false;
let pendingPage = null;
let activePaymentRef = null;
let adminFilter = 'All';
let favorites = [];
let placeEdits = {};
let deletedPlaces = [];
let inquiries = [];
let reviews = [];
let compareIds = [];
let selectedBlogIndex = 0;
let adminCalMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

let blockedDates = {};

const sampleAccounts = [
  { email: 'admin@travelaya.com', password: 'admin123', name: 'System Administrator', bookings: [], isAdmin: true },
  { email: 'BeatrizMarie@gmail.com', password: 'password123', name: 'Beatriz Marie Bautista', bookings: [], isAdmin: false },
  { email: 'KarlaMae@gmail.com', password: 'password123', name: 'Karla Mae Ibuig', bookings: [], isAdmin: false },
  { email: 'RhonaAngelica@gmail.com', password: 'password123', name: 'Rhona Angelica Cailao', bookings: [], isAdmin: false }
];

window.navigateTo = navigateTo;
window.changeBookingDestination = changeBookingDestination;
window.viewPlaceDetail = viewPlaceDetail;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.applyPromoCode = applyPromoCode;
window.plusDetailSlide = plusDetailSlide;
window.handleBookingSubmit = handleBookingSubmit;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.updateBookingTotal = updateBookingTotal;
window.basePackagePriceForUpdate = basePackagePriceForUpdate;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.handleLoginSubmit = handleLoginSubmit;
window.switchToRegister = switchToRegister;
window.switchToLogin = switchToLogin;
window.handleRegisterSubmit = handleRegisterSubmit;
window.handleAuthAction = handleAuthAction;
window.approveBooking = approveBooking;
window.switchItinerary = switchItinerary;
window.switchBataanPackage = switchBataanPackage;
window.toggleDateAvailability = toggleDateAvailability;
window.cancelBooking = cancelBooking;
window.modifyBookingDate = modifyBookingDate;
window.withdrawDateChange = withdrawDateChange;
window.resolveDateChange = resolveDateChange;
window.payBooking = payBooking;
window.submitPaymentProof = submitPaymentProof;
window.toggleFavorite = toggleFavorite;
window.setAdminFilter = setAdminFilter;
window.closeReview = closeReview;
window.closeModal = closeModal;
window.submitDateChange = submitDateChange;
window.showVoucher = showVoucher;
window.viewProof = viewProof;
window.exportBookingsCsv = exportBookingsCsv;
window.adminCalNav = adminCalNav;
window.openPlaceForm = openPlaceForm;
window.savePlace = savePlace;
window.submitInquiry = submitInquiry;
window.setInquiryStatus = setInquiryStatus;
window.deletePlace = deletePlace;
window.toggleCompare = toggleCompare;
window.clearCompare = clearCompare;
window.showCompare = showCompare;
window.copyText = copyText;
window.openReviewForm = openReviewForm;
window.submitReview = submitReview;
window.completeBooking = completeBooking;

const STORE_KEY = 'travelaya-state-v1';
function persist() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ accounts: sampleAccounts, blockedDates, favorites, placeEdits, deletedPlaces, inquiries, reviews, session: { isLoggedIn, currentUserEmail, isAdmin } }));
  } catch (e) { if (!persist.warned) { persist.warned = true; toast('Browser storage is full or unavailable, so recent changes may not be saved.', 'warn'); } }
}
function restore() {
  try {
    const st = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (!st) return;
    if (Array.isArray(st.accounts)) sampleAccounts.splice(0, sampleAccounts.length, ...st.accounts);
    blockedDates = st.blockedDates || {};
    favorites = st.favorites || [];
    placeEdits = st.placeEdits || {};
    deletedPlaces = st.deletedPlaces || [];
    inquiries = st.inquiries || [];
    reviews = st.reviews || [];
    Object.entries(placeEdits).forEach(([id, p]) => { allPlacesData[id] = p; });
    deletedPlaces.forEach(id => { delete allPlacesData[id]; });
    if (!allPlacesData[selectedPlace.id]) selectedPlace = Object.values(allPlacesData)[0] || selectedPlace;
    if (st.session && st.session.isLoggedIn) ({ isLoggedIn, currentUserEmail, isAdmin } = st.session);
  } catch (e) {}
}

function toast(message, type) {
  let box = document.getElementById('toast-container');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-container';
    box.setAttribute('aria-live', 'polite');
    box.style.cssText = 'position:fixed;top:80px;right:20px;z-index:3000;display:flex;flex-direction:column;gap:10px;max-width:360px';
    document.body.appendChild(box);
  }
  const warn = (type || (/^(⚠️|❌|✕)|invalid|sorry|please|denied|already|blocked|at least/i.test(message) ? 'warn' : 'ok')) === 'warn';
  const t = document.createElement('div');
  t.setAttribute('role', warn ? 'alert' : 'status');
  t.style.cssText = `background:#fff;border-left:5px solid ${warn ? '#e53e3e' : '#38a169'};padding:12px 16px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.18);font-size:14px;color:#1b263b;cursor:pointer;white-space:pre-line`;
  t.textContent = message;
  t.onclick = () => t.remove();
  box.appendChild(t);
  setTimeout(() => t.remove(), warn ? 6000 : 4000);
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ERR_ANCHOR = { 'booking-date': 'booking-calendar' };

function errAnchor(el) {
  return document.getElementById(ERR_ANCHOR[el.id]) || el.closest('label') || el;
}
function showFieldError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  const anchor = errAnchor(el);
  let err = document.getElementById(id + '-error');
  if (!err) {
    err = document.createElement('div');
    err.id = id + '-error';
    err.className = 'field-error';
    err.setAttribute('role', 'alert');
    anchor.insertAdjacentElement('afterend', err);
  }
  err.textContent = message;
  el.setAttribute('aria-invalid', 'true');
  el.setAttribute('aria-describedby', id + '-error');
  if (anchor !== el) anchor.classList.add('has-error');
}
function clearFieldError(id) {
  const el = document.getElementById(id);
  document.getElementById(id + '-error')?.remove();
  if (!el) return;
  el.removeAttribute('aria-invalid');
  el.removeAttribute('aria-describedby');
  errAnchor(el).classList.remove('has-error');
}
function clearAllErrors(root) {
  (root || document).querySelectorAll('.field-error').forEach(e => clearFieldError(e.id.replace(/-error$/, '')));
}
function failFields(list) {
  const bad = list.filter(Boolean);
  if (!bad.length) return false;
  bad.forEach(([id, msg]) => showFieldError(id, msg));
  const first = document.getElementById(bad[0][0]);
  const target = first && first.type === 'hidden' ? document.querySelector('#booking-calendar button:not([disabled])') : first && first.tagName === 'FIELDSET' ? first.querySelector('input') : first;
  if (target) { target.scrollIntoView({ block: 'center' }); target.focus({ preventScroll: true }); }
  return true;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const lastFocus = {};
function focusables(m) { return [...m.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null); }
function openDialogEl() {
  const app = document.getElementById('app-modal');
  if (app) return app;
  return ['login-modal', 'review-modal'].map(id => document.getElementById(id)).find(m => m && m.style.display === 'flex') || null;
}
function enterModal(m, firstSelector) {
  lastFocus[m.id] = document.activeElement;
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.setAttribute('tabindex', '-1');
  const h = m.querySelector('h2');
  if (h) { h.id = h.id || m.id + '-title'; m.setAttribute('aria-labelledby', h.id); m.removeAttribute('aria-label'); }
  setTimeout(() => (m.querySelector(firstSelector || '[data-autofocus]') || focusables(m)[0] || m).focus(), 0);
}
function leaveModal(id) {
  const el = lastFocus[id];
  delete lastFocus[id];
  if (el && document.contains(el)) el.focus({ preventScroll: true });
}
function trapTab(e) {
  const m = openDialogEl();
  if (!m) return;
  const f = focusables(m);
  if (!f.length) { e.preventDefault(); m.focus(); return; }
  const first = f[0], last = f[f.length - 1];
  if (!m.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
  else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function openModal(html, maxWidth) {
  closeModal();
  const m = document.createElement('div');
  m.id = 'app-modal';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:2000;display:flex;justify-content:center;align-items:center;padding:16px';
  m.innerHTML = `<div style="background:#fff;border-radius:16px;padding:26px;width:100%;max-width:${maxWidth || '400px'};max-height:90vh;overflow:auto;box-shadow:0 10px 30px rgba(0,0,0,.2)">${html}</div>`;
  m.addEventListener('mousedown', e => { if (e.target === m) closeModal(); });
  document.body.appendChild(m);
  enterModal(m);
  return m;
}

function closeModal() {
  const m = document.getElementById('app-modal');
  if (m) { m.remove(); leaveModal('app-modal'); }
  calPlaceId = null; calMin = null; calMonth = null; calExclude = null;
}

function confirmDialog(message, confirmText = 'Confirm', danger = false) {
  return new Promise(resolve => {
    const m = openModal(`<p style="font-size:15px;color:#1b263b;margin:0 0 18px;line-height:1.5">${escapeHtml(message)}</p>
      <div class="action-buttons" style="margin-top:0"><button class="btn btn-cancel" data-v="0">Cancel</button><button class="btn" data-v="1" style="background:${danger ? '#131c38' : '#e0415a'};color:#fff">${escapeHtml(confirmText)}</button></div>`);
    m.addEventListener('click', e => {
      const b = e.target.closest('button[data-v]');
      if (!b) return;
      closeModal();
      resolve(b.dataset.v === '1');
    });
  });
}

let suppressHash = false;
const KNOWN_PAGES = ['home', 'places', 'booking', 'blogs', 'faq', 'policies', 'blog', 'inquiry', 'myBookings', 'admin', 'payment'];

function hashFor(pageKey) {
  if (pageKey === 'blog') return `#/blog/${selectedBlogIndex}`;
  return (pageKey === 'detail' || pageKey === 'booking') ? `#/${pageKey}/${selectedPlace.id}` : `#/${pageKey}`;
}

function routeFromHash() {
  const [page, id] = location.hash.replace(/^#\/?/, '').split('/');
  const container = document.getElementById('app-content');
  if (!page) { if (!container || !container.innerHTML.trim()) navigateTo('home'); return; }
  if (page === 'blog') selectedBlogIndex = Math.max(0, parseInt(id, 10) || 0);
  if (allPlacesData[id] && (page === 'detail' || page === 'booking')) selectedPlace = allPlacesData[id];
  navigateTo(page === 'detail' ? 'detail' : (KNOWN_PAGES.includes(page) ? page : 'home'));
}

function findBooking(ref) {
  for (const user of sampleAccounts) {
    const b = (user.bookings || []).find(x => x.referenceId === ref);
    if (b) return { user, b };
  }
  return null;
}
function ownBooking(ref) {
  const f = findBooking(ref);
  return f && currentUserEmail && f.user.email.toLowerCase() === currentUserEmail.toLowerCase() ? f : null;
}

function showVoucher(ref) {
  const f = ownBooking(ref);
  if (!f || !String(f.b.status).includes('Approved')) return;
  const b = f.b;
  const row = (k, val) => `<div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid #edf2f7;font-size:13px"><span style="color:#64748b">${k}</span><strong style="text-align:right">${escapeHtml(val)}</strong></div>`;
  const guests = `${b.adults} adult(s)` + (Number(b.children) ? `, ${b.children} child(ren)` : '');
  openModal(`<div style="text-align:center;margin-bottom:10px"><div style="font-weight:700;font-style:italic;color:#c0293f;font-size:22px">TraveLaya</div>
    <h2 style="margin:4px 0 2px;color:#131c38;font-size:18px">Booking Voucher</h2><div style="font-size:12px;color:#38a169;font-weight:700">CONFIRMED</div></div>`
    + row('Reference', b.referenceId) + row('Guest', b.name) + row('Destination', b.destination) + row('Package', b.packageType)
    + row('Travel date', b.date) + (b.pickupPoint ? row('Pickup', `${b.pickupPoint} at ${b.pickupTime}`) : '') + row('Guests', guests) + row('Add-ons', (b.addons || []).join(', ') || 'None') + row('Total paid', b.total)
    + `<p style="font-size:11px;color:#64748b;line-height:1.5">Present this voucher with a valid ID. For pickup details or changes, contact support@travelaya.com.</p>
    <div class="action-buttons no-print"><button class="btn btn-cancel" onclick="closeModal()">Close</button><button class="btn btn-continue" onclick="window.print()">Print / Save as PDF</button></div>`);
}

function viewProof(ref) {
  const f = findBooking(ref);
  if (!f || !f.b.paymentProof || !(isAdmin || ownBooking(ref))) return;
  openModal(`<img src="${escapeHtml(f.b.paymentProof)}" alt="Payment receipt" style="max-width:100%;border-radius:8px" /><div class="action-buttons"><button class="btn btn-cancel" onclick="closeModal()">Close</button></div>`);
}

function exportBookingsCsv() {
  if (!isAdmin) return;
  const cols = ['referenceId', 'name', 'userEmail', 'contact', 'destination', 'packageType', 'date', 'adults', 'children', 'addons', 'promo', 'total', 'pickupPoint', 'pickupTime', 'paymentMethod', 'paymentRef', 'status', 'completed'];
  const esc = val => { let s = Array.isArray(val) ? val.join('; ') : String(val ?? ''); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
  const rows = [cols.join(',')];
  sampleAccounts.forEach(u => (u.bookings || []).forEach(b => rows.push(cols.map(c => esc(c === 'userEmail' ? u.email : c === 'completed' ? (b.completed ? 'Yes' : 'No') : b[c])).join(','))));
  const url = URL.createObjectURL(new Blob(['\ufeff' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = `travelaya-bookings-${getLocalDateString()}.csv`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function adminCalNav(n) {
  adminCalMonth = new Date(adminCalMonth.getFullYear(), adminCalMonth.getMonth() + n, 1);
  const y = window.scrollY;
  navigateTo('admin');
  window.scrollTo(0, y);
}

function submitInquiry() {
  const g = k => document.getElementById('inq-' + k)?.value.trim() || '';
  const strip = s => s.replace(/[<>"]/g, '');
  const name = strip(g('name')), email = g('email'), contact = strip(g('contact')), size = parseInt(g('size'), 10);
  clearAllErrors(document.getElementById('app-content'));
  if (failFields([
    !name ? ['inq-name', 'Enter your full name.'] : null,
    !email ? ['inq-email', 'Enter your email address.'] : !EMAIL_RE.test(email) ? ['inq-email', 'Enter a valid email, like name@example.com.'] : null,
    !contact ? ['inq-contact', 'Enter your contact number.'] : contact.replace(/\D/g, '').length < 7 ? ['inq-contact', 'Enter a valid contact number (at least 7 digits).'] : null,
    !(size >= 1) ? ['inq-size', 'Enter how many people are traveling (at least 1).'] : null,
    g('date') && g('date') < getLocalDateString() ? ['inq-date', 'Choose a travel date that is today or later.'] : null,
    !g('message') ? ['inq-message', 'Tell us a little about the trip you have in mind.'] : null
  ])) return;
  let id;
  do { id = 'INQ-' + Math.floor(100000 + Math.random() * 900000); } while (inquiries.some(i => i.id === id));
  inquiries.unshift({ id, createdAt: new Date().toISOString(), name, email, contact, destination: g('destination'), date: g('date'), groupSize: size, tripType: g('type'), budget: parseInt(g('budget'), 10) || '', message: g('message').slice(0, 1000), status: 'New' });
  persist();
  toast(`Thank you! Your inquiry ${id} was sent. We will contact you at ${email}.`);
  navigateTo('home');
}

function setInquiryStatus(id, status) {
  const i = inquiries.find(x => x.id === id);
  if (!isAdmin || !i || !['New', 'Contacted', 'Closed'].includes(status)) return;
  i.status = status;
  persist();
  const y = window.scrollY;
  navigateTo('admin');
  window.scrollTo(0, y);
}

const lines = t => t.split('\n').map(s => s.trim()).filter(Boolean);
const cleanText = s => String(s ?? '').replace(/[<>"]/g, '').trim();
const okImage = u => /^https?:\/\/[^\s'"()<>]+$/i.test(u) || /^images\/[A-Za-z0-9_\-\/]+\.(jpe?g|png|webp|gif|svg)$/i.test(u);

function openPlaceForm(id) {
  if (!isAdmin) return;
  const p = (id && allPlacesData[id]) || {};
  const hasVariants = !!(p.itineraryPackageA || p.itineraryPackageB || p.itineraryPackageC || p.itinerary2D1N || p.itinerary3D2N);
  const box = 'width:100%;padding:8px;border:1px solid #cbd5e0;border-radius:8px;box-sizing:border-box;margin:4px 0 10px;font-size:13px;font-family:inherit';
  const lab = 'display:block;font-size:12px;font-weight:600;color:#4a5568';
  const inp = (k, label, val, type = 'text') => `<label style="${lab}">${label}<input id="pf-${k}" type="${type}" value="${escapeHtml(val ?? '')}" style="${box}" /></label>`;
  const ta = (k, label, hint, val, rows) => `<label style="${lab}">${label} <span style="font-weight:400;color:#718096">${hint}</span><textarea id="pf-${k}" rows="${rows}" style="${box}">${escapeHtml(val)}</textarea></label>`;
  const stars = p.stars ? (p.stars.match(/★/g) || []).length : 5;
  openModal(`<h2 style="margin:0 0 12px;color:#131c38;font-size:18px">${id ? 'Edit' : 'Add'} destination</h2>`
    + inp('name', 'Name', p.name) + inp('location', 'Location (include "Philippines" to list it under Domestic on Home)', p.location)
    + inp('price', 'Price per adult (PHP)', p.numericPrice, 'number') + inp('discount', 'Discount % (0-90)', p.discount ?? 0, 'number') + inp('stars', 'Stars (1-5)', stars, 'number')
    + inp('category', 'Category (e.g. Nature, Heritage)', p.category) + inp('duration', 'Duration (e.g. 2D1N)', p.duration)
    + inp('packageType', 'Package type (Full Stay or Day Trip)', p.packageType || 'Full Stay') + inp('image', 'Image (https:// link or images/file.jpg)', p.image)
    + inp('capacity', 'Max guests per travel date', p.capacity ?? DEFAULT_CAPACITY, 'number')
    + ta('besttime', 'Best time to visit / weather note', '(optional)', p.bestTime || '', 3)
    + ta('description', 'Description', '', p.description || '', 4)
    + ta('amenities', 'Included amenities', '(one per line)', (p.amenities || []).join('\n'), 4)
    + ta('landmarks', 'Landmarks', '(one per line: Name | image link or images/file.jpg | description)', (p.landmarks || []).map(l => `${l.name} | ${l.image} | ${l.desc || ''}`).join('\n'), 4)
    + ta('addons', 'Add-ons', '(one per line: Name | price)', (p.addons || []).map(x => `${x.name} | ${x.price}`).join('\n'), 3)
    + (hasVariants ? '<p style="font-size:12px;color:#718096">This destination has package-specific itineraries, which are edited in data.js.</p>'
      : ta('itinerary', 'Itinerary', '(one stop per line: Day | Time | Title | Details)', (p.itinerary || []).map(i => `${i.dayGroup || 'Day 1'} | ${i.day} | ${i.title} | ${i.details || ''}`).join('\n'), 6))
    + `<div class="action-buttons"><button class="btn btn-cancel" onclick="closeModal()">Cancel</button><button class="btn btn-continue" data-id="${escapeHtml(id || '')}" onclick="savePlace(this.dataset.id)">Save</button></div>`);
}

function savePlace(id) {
  if (!isAdmin) return;
  const val = k => document.getElementById('pf-' + k)?.value.trim() || '';
  const price = parseInt(val('price'), 10), discount = parseInt(val('discount'), 10) || 0, n = Math.min(5, Math.max(1, parseInt(val('stars'), 10) || 5));
  const name = cleanText(val('name')), location = cleanText(val('location'));
  clearAllErrors(document.getElementById('app-modal'));
  if (failFields([!name ? ['pf-name', 'Enter a destination name.'] : null, !location ? ['pf-location', 'Enter a location.'] : null])) return;
  if (!(price > 0)) { failFields([['pf-price', 'Enter a price greater than 0.']]); return; }
  if (discount < 0 || discount > 90) { failFields([['pf-discount', 'Discount must be between 0 and 90.']]); return; }
  const capacity = parseInt(val('capacity'), 10);
  if (!(capacity >= 1 && capacity <= 500)) { failFields([['pf-capacity', 'Enter a number from 1 to 500.']]); return; }
  const image = val('image');
  if (image && !okImage(image)) { failFields([['pf-image', 'Use an https:// link or a file path like images/photo.jpg (no spaces or quotes).']]); return; }
  const landmarks = [], addons = [], itinerary = [];
  const parts = l => l.split('|').map(s => s.trim());
  for (const [i, l] of lines(val('landmarks')).entries()) {
    const [nm, img, desc] = parts(l);
    if (!nm || !okImage(img || '')) { failFields([['pf-landmarks', `Line ${i + 1} needs: Name | image (link or images/file.jpg) | description`]]); return; }
    landmarks.push({ name: cleanText(nm), price: 0, image: img, desc: cleanText(desc) });
  }
  for (const [i, l] of lines(val('addons')).entries()) {
    const [nm, pr] = parts(l);
    if (!nm || !(parseInt(pr, 10) >= 0)) { failFields([['pf-addons', `Line ${i + 1} needs: Name | price`]]); return; }
    addons.push({ name: cleanText(nm), price: parseInt(pr, 10) });
  }
  const hasItin = !!document.getElementById('pf-itinerary');
  if (hasItin) for (const [i, l] of lines(val('itinerary')).entries()) {
    const [day, time, title, ...rest] = parts(l);
    if (!day || !time || !title) { failFields([['pf-itinerary', `Line ${i + 1} needs: Day | Time | Title | Details`]]); return; }
    itinerary.push({ dayGroup: cleanText(day), day: cleanText(time), title: cleanText(title), details: cleanText(rest.join(' | ')) });
  }
  let pid = id;
  if (!pid) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'place';
    pid = slug; let k = 2;
    while (allPlacesData[pid]) pid = `${slug}-${k++}`;
  }
  const base = allPlacesData[pid] || { badge: 'New' };
  const place = { ...base, id: pid, name, location, numericPrice: price, price: '₱' + price.toLocaleString(), discount, stars: '★'.repeat(n) + '☆'.repeat(5 - n), category: cleanText(val('category')) || 'Nature', duration: cleanText(val('duration')) || '1 day', packageType: cleanText(val('packageType')) || 'Full Stay', image: image || base.image || heroImages[0], capacity, bestTime: cleanText(val('besttime')), description: cleanText(val('description')), amenities: lines(val('amenities')).map(cleanText), landmarks, addons };
  if (hasItin) place.itinerary = itinerary;
  allPlacesData[pid] = place;
  placeEdits[pid] = place;
  deletedPlaces = deletedPlaces.filter(x => x !== pid);
  persist();
  closeModal();
  navigateTo('admin');
  toast(`${place.name} saved.`);
}

async function deletePlace(id) {
  if (!isAdmin || !allPlacesData[id]) return;
  if (Object.keys(allPlacesData).length <= 1) { toast('You need at least one destination.'); return; }
  if (!(await confirmDialog(`Delete "${allPlacesData[id].name}"? Existing bookings are kept.`, 'Delete', true))) return;
  delete allPlacesData[id];
  delete placeEdits[id];
  compareIds = compareIds.filter(x => x !== id);
  if (!deletedPlaces.includes(id)) deletedPlaces.push(id);
  if (selectedPlace.id === id) selectedPlace = Object.values(allPlacesData)[0];
  persist();
  navigateTo('admin');
}

async function cancelBooking(ref) {
  const f = ownBooking(ref);
  if (!f) return;
  if (!(await confirmDialog(`Cancel booking ${ref}? This cannot be undone.`, 'Cancel booking', true))) return;
  f.b.status = 'Cancelled';
  delete f.b.changeRequest;
  navigateTo('myBookings');
}

function placeIdOf(b) {
  if (b.placeId && allPlacesData[b.placeId]) return b.placeId;
  return Object.keys(allPlacesData).find(id => b.destination.startsWith(allPlacesData[id].name));
}

const DEFAULT_CAPACITY = 20;
function capacityOf(placeId) {
  const n = Number(allPlacesData[placeId] && allPlacesData[placeId].capacity);
  return n >= 1 ? n : DEFAULT_CAPACITY;
}
function takenByDate(placeId, excludeRef) {
  const map = {};
  sampleAccounts.forEach(u => (u.bookings || []).forEach(b => {
    if (b.status === 'Cancelled' || b.referenceId === excludeRef || placeIdOf(b) !== placeId) return;
    map[b.date] = (map[b.date] || 0) + (Number(b.adults) || 0) + (Number(b.children) || 0);
  }));
  return map;
}
function slotsLeft(placeId, date, excludeRef) {
  return capacityOf(placeId) - (takenByDate(placeId, excludeRef)[date] || 0);
}
function slotMessage(left, date, guests) {
  if (left <= 0) return `Sorry, ${date} is fully booked. Pick another date.`;
  return `Only ${left} slot${left === 1 ? '' : 's'} left on ${date}, and your group has ${guests}. Pick another date or reduce the group size.`;
}

function ratingFor(placeId) {
  const list = reviews.filter(r => r.placeId === placeId);
  return list.length ? { avg: list.reduce((t, r) => t + r.stars, 0) / list.length, count: list.length } : null;
}

function openReviewForm(ref) {
  const f = ownBooking(ref);
  if (!f || !f.b.completed || reviews.some(r => r.ref === ref)) return;
  openModal(`<h2 style="margin:0 0 4px;color:#131c38;font-size:20px">How was your trip?</h2>
    <p style="font-size:13px;color:#64748b;margin:0 0 14px">${escapeHtml(f.b.destination)}</p>
    <fieldset id="rv-stars" style="border:0;padding:0;margin:0 0 14px"><legend style="font-size:13px;font-weight:600;color:#4a5568;margin-bottom:4px">Your rating</legend>
      <div class="star-input">${[5, 4, 3, 2, 1].map(n => `<input type="radio" name="rv-star" id="rv-star-${n}" value="${n}" /><label for="rv-star-${n}" title="${n} star${n > 1 ? 's' : ''}"><span class="sr-only">${n} star${n > 1 ? 's' : ''}</span>★</label>`).join('')}</div></fieldset>
    <label for="rv-comment" style="font-size:13px;font-weight:600;color:#4a5568;display:block;margin-bottom:6px">Your review</label>
    <textarea id="rv-comment" rows="4" maxlength="500" placeholder="What did you enjoy? Anything other travelers should know?" style="width:100%;padding:10px 12px;border:1px solid #cbd5e0;border-radius:8px;font-size:14px;box-sizing:border-box;font-family:inherit"></textarea>
    <div class="action-buttons"><button type="button" class="btn btn-cancel" onclick="closeModal()">Cancel</button><button type="button" class="btn btn-continue" data-ref="${escapeHtml(ref)}" onclick="submitReview(this.dataset.ref)">Post review</button></div>`, '440px');
}

function submitReview(ref) {
  const f = ownBooking(ref);
  if (!f || !f.b.completed || reviews.some(r => r.ref === ref)) return;
  clearAllErrors(document.getElementById('app-modal'));
  const stars = parseInt((document.querySelector('input[name="rv-star"]:checked') || {}).value, 10) || 0;
  const comment = cleanText(document.getElementById('rv-comment')?.value);
  if (failFields([
    !stars ? ['rv-stars', 'Choose a star rating.'] : null,
    comment.length < 10 ? ['rv-comment', 'Tell us a little about your trip (at least 10 characters).'] : null
  ])) return;
  const parts = f.b.name.trim().split(/\s+/);
  const shortName = parts[0] + (parts.length > 1 ? ' ' + parts[parts.length - 1][0] + '.' : '');
  reviews.push({ id: 'RV-' + Date.now(), placeId: placeIdOf(f.b), ref, name: shortName, stars, comment: comment.slice(0, 500), date: new Date().toISOString() });
  persist();
  closeModal();
  navigateTo('myBookings');
  toast('Thank you! Your review was posted.');
}

function completeBooking(email, ref) {
  if (!isAdmin) return;
  const user = sampleAccounts.find(acc => acc.email.toLowerCase() === String(email).toLowerCase());
  const b = user && (user.bookings || []).find(x => x.referenceId === ref);
  if (!b || !String(b.status).includes('Approved') || b.completed) return;
  b.completed = true;
  b.completedAt = new Date().toISOString();
  delete b.changeRequest;
  navigateTo('admin');
  toast(`Booking ${ref} marked as completed. The guest can now leave a review.`);
}

function toggleCompare(id, box) {
  if (compareIds.includes(id)) {
    compareIds = compareIds.filter(x => x !== id);
  } else if (compareIds.length >= 3) {
    if (box) box.checked = false;
    toast('You can compare up to 3 destinations at a time.', 'warn');
    return;
  } else {
    compareIds = [...compareIds, id];
  }
  updateCompareBar();
}

function updateCompareBar() {
  const bar = document.getElementById('compare-bar');
  if (!bar) return;
  compareIds = compareIds.filter(id => allPlacesData[id]);
  bar.hidden = compareIds.length === 0;
  const text = document.getElementById('compare-count');
  if (text) text.textContent = compareIds.length < 2 ? `${compareIds.length} selected - pick at least 2` : `${compareIds.length} selected (max 3)`;
  const go = document.getElementById('compare-go');
  if (go) go.disabled = compareIds.length < 2;
}

function clearCompare() {
  compareIds = [];
  document.querySelectorAll('.compare-chip input').forEach(i => { i.checked = false; });
  updateCompareBar();
}

function showCompare() {
  if (compareIds.length < 2) { toast('Pick at least 2 destinations to compare.', 'warn'); return; }
  const ratings = Object.fromEntries(compareIds.map(id => [id, ratingFor(id)]));
  openModal(`<h2 style="margin:0 0 14px;color:#131c38;font-size:20px">Compare destinations</h2>${renderCompareTable(compareIds.map(id => allPlacesData[id]), ratings)}<div class="action-buttons"><button type="button" class="btn btn-cancel" onclick="closeModal()">Close</button></div>`, '980px');
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (err) {}
    t.remove();
  }
  if (btn) { const old = btn.textContent; btn.textContent = 'Copied ✓'; setTimeout(() => { btn.textContent = old; }, 1800); }
  toast('Copied to clipboard.');
}

function modifyBookingDate(ref) {
  const f = ownBooking(ref);
  if (!f || f.b.changeRequest) return;
  openModal(`<h2 style="margin:0 0 6px;color:#131c38;font-size:20px">Request a new date</h2>
    <p style="font-size:13px;color:#64748b;margin:0 0 12px">Current date: <strong>${escapeHtml(f.b.date)}</strong>. Black dates are unavailable. An admin must approve the change.</p>
    <input type="hidden" id="booking-date" /><div id="booking-calendar"></div>
    <div class="action-buttons"><button class="btn btn-cancel" onclick="closeModal()">Cancel</button><button class="btn btn-continue" onclick="submitDateChange('${ref}')">Send request</button></div>`);
  calPlaceId = placeIdOf(f.b) || null;
  calExclude = ref;
  calMin = getLocalDateString(new Date(Date.now() + 2 * 864e5));
  calMonth = null;
  renderBookingCalendar();
}

function submitDateChange(ref) {
  const f = ownBooking(ref);
  const input = document.getElementById('booking-date')?.value;
  if (!f) return;
  clearAllErrors(document.getElementById('app-modal'));
  if (!input) { failFields([['booking-date', 'Pick a new date on the calendar.']]); return; }
  if (input === f.b.date) { failFields([['booking-date', 'That is already your travel date. Pick a different one.']]); return; }
  const pid = placeIdOf(f.b);
  if (pid && (blockedDates[pid] || []).includes(input)) { failFields([['booking-date', 'Sorry, that date is unavailable. Pick another one.']]); return; }
  const changeGuests = (Number(f.b.adults) || 0) + (Number(f.b.children) || 0);
  if (pid && slotsLeft(pid, input, ref) < changeGuests) { failFields([['booking-date', slotMessage(slotsLeft(pid, input, ref), input, changeGuests)]]); return; }
  f.b.changeRequest = { date: input, requestedAt: new Date().toISOString() };
  delete f.b.changeNote;
  navigateTo('myBookings');
  toast('Request sent! Your travel date stays the same until an admin approves the change.');
}

function withdrawDateChange(ref) {
  const f = ownBooking(ref);
  if (!f) return;
  delete f.b.changeRequest;
  navigateTo('myBookings');
}

function resolveDateChange(email, ref, approve) {
  if (!isAdmin) return;
  const user = sampleAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
  const b = user && (user.bookings || []).find(x => x.referenceId === ref);
  if (!b || !b.changeRequest) return;
  const req = b.changeRequest.date;
  if (approve) {
    const pid = placeIdOf(b);
    if (pid && (blockedDates[pid] || []).includes(req)) { toast(`${req} is blocked for this destination. Unblock it first, or reject the request.`); return; }
    const need = (Number(b.adults) || 0) + (Number(b.children) || 0);
    if (pid && slotsLeft(pid, req, ref) < need) { toast(`${req} does not have enough slots left for this group. Reject the request or ask the guest to pick another date.`, 'warn'); return; }
    b.changeNote = `✓ Date change approved. Your new travel date is ${req}.`;
    b.date = req;
  } else {
    b.changeNote = `✕ Your request to move to ${req} was declined. Your travel date is still ${b.date}.`;
  }
  delete b.changeRequest;
  navigateTo('admin');
}

function payBooking(ref) {
  if (!ownBooking(ref)) return;
  activePaymentRef = ref;
  navigateTo('payment');
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const s = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.72));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad image')); };
    img.src = url;
  });
}

async function submitPaymentProof() {
  const f = ownBooking(activePaymentRef);
  const txn = document.getElementById('payment-txn-ref')?.value.trim();
  const file = document.getElementById('payment-proof')?.files[0];
  if (!f) return;
  clearAllErrors(document.getElementById('app-content'));
  if (failFields([
    !txn || txn.length < 6 ? ['payment-txn-ref', 'Enter the transaction/reference number from your payment (at least 6 characters).'] : null,
    !file || !file.type.startsWith('image/') ? ['payment-proof', 'Attach a screenshot or photo of your payment receipt.'] : file.size > 10 * 1024 * 1024 ? ['payment-proof', 'That image is too large. Choose one under 10 MB.'] : null
  ])) return;
  try { f.b.paymentProof = await fileToDataUrl(file); } catch (e) { failFields([['payment-proof', 'That image could not be read. Try another file.']]); return; }
  f.b.paymentRef = txn;
  f.b.status = 'Payment Submitted – Awaiting Verification';
  toast('Thank you! Your payment details were submitted. We will verify them shortly.');
  navigateTo('myBookings');
}

function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  persist();
  document.getElementById('sort-select')?.dispatchEvent(new Event('change'));
}

function setAdminFilter(value) {
  adminFilter = value;
  navigateTo('admin');
}

function closeReview() {
  const m = document.getElementById('review-modal');
  if (m) { m.style.display = 'none'; leaveModal('review-modal'); }
}

function showReview(d) {
  const m = document.getElementById('review-modal');
  if (!m) return;
  const guests = `${d.adults} adult(s)` + (d.children ? `, ${d.children} child(ren)` : '');
  const rows = [['Destination', d.destination], ['Package', d.packageType], ['Travel date', d.date], ['Pickup', `${d.pickupPoint} at ${d.pickupTime}`], ['Guests', guests], ['Add-ons', d.addons.join(', ') || 'None'], ['Promo', d.promo || 'None'], ['Guest', `${d.name} (${d.contact})`], ['Payment method', d.paymentMethod]];
  m.innerHTML = `<div style="background:#fff;border-radius:16px;padding:28px;max-width:460px;width:100%;max-height:90vh;overflow:auto">
    <div style="font-size:12px;font-weight:700;color:#c0293f">STEP 2 OF 3</div>
    <h2 style="margin:4px 0 14px;color:#131c38">Review your booking</h2>
    <div style="font-size:13px;line-height:1.9;color:#1b263b">${rows.map(([k, v]) => `<div><strong>${k}:</strong> ${escapeHtml(v)}</div>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;border-top:1px solid #e2e8f0;margin-top:14px;padding-top:12px"><span style="font-weight:700">Estimated Total</span><strong style="font-size:20px;color:#c0293f">${escapeHtml(d.total)}</strong></div>
    <div class="action-buttons"><button class="btn btn-cancel" onclick="closeReview()">Back to edit</button><button class="btn btn-continue" onclick="handleBookingSubmit(true)">Confirm &amp; Pay</button></div></div>`;
  m.style.display = 'flex';
  enterModal(m);
}

function toggleDateAvailability(placeId, dateStr) {
  if (!placeId) {
    toast('Please select a destination first.');
    return;
  }
  if (!dateStr) {
    failFields([['admin-target-date', 'Pick a date to block or unblock.']]);
    return;
  }

  if (!blockedDates[placeId]) {
    blockedDates[placeId] = [];
  }

  const index = blockedDates[placeId].indexOf(dateStr);
  if (index > -1) {
    blockedDates[placeId].splice(index, 1);
    toast(`Date ${dateStr} is now AVAILABLE for ${placeId}.`);
  } else {
    blockedDates[placeId].push(dateStr);
    toast(`Date ${dateStr} has been BLOCKED for ${placeId} (Fully Booked/Unavailable).`);
  }
  navigateTo('admin');
}

function openLoginModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  clearAllErrors(modal);
  modal.style.display = 'flex';
  document.getElementById('login-box').style.display = 'block';
  document.getElementById('register-box').style.display = 'none';
  enterModal(modal, '#login-email');
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  const wasOpen = modal.style.display === 'flex';
  modal.style.display = 'none';
  if (wasOpen) leaveModal('login-modal');
}

function switchToRegister(e) {
  e.preventDefault();
  clearAllErrors(document.getElementById('login-modal'));
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('register-box').style.display = 'block';
  document.getElementById('reg-name')?.focus();
}

function switchToLogin(e) {
  e.preventDefault();
  clearAllErrors(document.getElementById('login-modal'));
  document.getElementById('register-box').style.display = 'none';
  document.getElementById('login-box').style.display = 'block';
  document.getElementById('login-email')?.focus();
}

function updateNavAuthLabel() {
  const loginBtn = document.querySelector('.login-btn, #nav-login-btn');
  const adminNavBtn = document.getElementById('nav-admin-btn');

  if (loginBtn) {
    loginBtn.textContent = isLoggedIn ? 'Logout' : 'Login';
  }

  if (adminNavBtn) {
    adminNavBtn.style.display = (isLoggedIn && isAdmin) ? 'inline-block' : 'none';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  clearAllErrors(document.getElementById('login-modal'));
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value;

  if (failFields([
    !emailInput ? ['login-email', 'Enter your email address.'] : !EMAIL_RE.test(emailInput) ? ['login-email', 'Enter a valid email, like name@example.com.'] : null,
    !passwordInput ? ['login-password', 'Enter your password.'] : null
  ])) return;

  const foundUser = sampleAccounts.find(acc => acc.email.toLowerCase() === emailInput && acc.password === passwordInput);

  if (!foundUser) {
    failFields([['login-password', 'Incorrect email or password. Check both and try again.']]);
    return;
  }

  isLoggedIn = true;
  currentUserEmail = foundUser.email;
  isAdmin = !!foundUser.isAdmin;

  updateNavAuthLabel();
  toast(`Successfully logged in as ${foundUser.name} (${isAdmin ? 'Admin' : 'User'})!`);
  closeLoginModal();

  if (isAdmin) {
    navigateTo('admin');
  } else {
    navigateTo(pendingPage || 'home');
    pendingPage = null;
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  clearAllErrors(document.getElementById('login-modal'));
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;

  if (failFields([
    !name ? ['reg-name', 'Enter your full name.'] : null,
    !email ? ['reg-email', 'Enter your email address.'] : !EMAIL_RE.test(email) ? ['reg-email', 'Enter a valid email, like name@example.com.'] : sampleAccounts.some(acc => acc.email.toLowerCase() === email) ? ['reg-email', 'An account with this email already exists. Try logging in instead.'] : null,
    !password ? ['reg-password', 'Create a password.'] : password.length < 6 ? ['reg-password', 'Use at least 6 characters.'] : null
  ])) return;

  sampleAccounts.push({ email, password, name, bookings: [], isAdmin: false });

  isLoggedIn = true;
  currentUserEmail = email;
  isAdmin = false;
  updateNavAuthLabel();
  toast(`🎉 Account successfully created and logged in for ${name}!`);
  closeLoginModal();
  navigateTo(pendingPage || 'home');
  pendingPage = null;
}

async function handleAuthAction(e) {
  e.preventDefault();
  if (isLoggedIn) {
    if (await confirmDialog('Are you sure you want to log out?', 'Log out')) {
      isLoggedIn = false;
      currentUserEmail = null;
      isAdmin = false;
      updateNavAuthLabel();
      toast('You have been logged out.');
      navigateTo('home');
    }
  } else {
    openLoginModal(e);
  }
}

function changeBookingDestination(placeId) {
  if (allPlacesData[placeId]) {
    selectedPlace = allPlacesData[placeId];
    selectedPackageType = 'day';
    selectedBataanPackage = 'A';
    appliedPromoDiscount = 0;
    appliedPromoName = '';
    navigateTo('booking');
  }
}

function viewPlaceDetail(placeId) {
  selectedPlace = allPlacesData[placeId] || allPlacesData['bataan-3d2n'];
  selectedBataanPackage = 'A';
  navigateTo('detail');
}

function switchBataanPackage(pkg) {
  selectedBataanPackage = pkg;
  const container = document.getElementById('itinerary-container');
  const btnA = document.getElementById('btn-pkg-a');
  const btnB = document.getElementById('btn-pkg-b');
  const btnC = document.getElementById('btn-pkg-c');

  const cardA = document.getElementById('sidebar-card-a');
  const cardB = document.getElementById('sidebar-card-b');
  const cardC = document.getElementById('sidebar-card-c');

  [btnA, btnB, btnC].forEach((b, idx) => {
    if (!b) return;
    const match = (idx === 0 && pkg === 'A') || (idx === 1 && pkg === 'B') || (idx === 2 && pkg === 'C');
    b.style.background = match ? '#e0415a' : '#e2e8f0';
    b.style.color = match ? '#fff' : '#4a5568';
  });

  [cardA, cardB, cardC].forEach((c, idx) => {
    if (!c) return;
    const match = (idx === 0 && pkg === 'A') || (idx === 1 && pkg === 'B') || (idx === 2 && pkg === 'C');
    c.style.border = match ? '2px solid #e0415a' : '1px solid #cbd5e0';
  });

  let itineraryData = selectedPlace.itineraryPackageA;
  if (pkg === 'B') itineraryData = selectedPlace.itineraryPackageB;
  if (pkg === 'C') itineraryData = selectedPlace.itineraryPackageC;

  if (!container || !itineraryData) return;

  container.innerHTML = renderItineraryColumns(itineraryData);
}

function switchItinerary(type) {
  const container = document.getElementById('itinerary-container');
  const btn2d = document.getElementById('itinerary-btn-2d');
  const btn3d = document.getElementById('itinerary-btn-3d');
  if (!container) return;

  const itineraryData = type === '3D2N' ? selectedPlace.itinerary3D2N : selectedPlace.itinerary2D1N;
  if (!itineraryData) return;

  if (type === '3D2N') {
    if (btn3d) { btn3d.style.background = '#e0415a'; btn3d.style.color = '#fff'; btn3d.style.boxShadow = '0 2px 6px rgba(224, 65, 90,0.3)'; }
    if (btn2d) { btn2d.style.background = '#e2e8f0'; btn2d.style.color = '#4a5568'; btn2d.style.boxShadow = 'none'; }
  } else {
    if (btn2d) { btn2d.style.background = '#e0415a'; btn2d.style.color = '#fff'; btn2d.style.boxShadow = '0 2px 6px rgba(224, 65, 90,0.3)'; }
    if (btn3d) { btn3d.style.background = '#e2e8f0'; btn3d.style.color = '#4a5568'; btn3d.style.boxShadow = 'none'; }
  }

  container.innerHTML = renderItineraryColumns(itineraryData);
}

function navigateTo(pageKey) {
  const container = document.getElementById('app-content');
  if (!container) return;
  closeModal();

  if (pageKey === 'booking' && !isLoggedIn) {
    pendingPage = 'booking';
    toast('⚠️ Please log in or register an account before proceeding to booking.');
    navigateTo('places');
    openLoginModal();
    return;
  }

  if (pageKey === 'myBookings' && !isLoggedIn) {
    pendingPage = 'myBookings';
    toast('⚠️ Please log in to view your bookings.');
    navigateTo('places');
    openLoginModal();
    return;
  }

  if (pageKey === 'admin' && !isAdmin) {
    toast('⚠️ Access denied. Administrator privileges required.');
    if (!container.innerHTML.trim()) navigateTo('home');
    return;
  }

  if (slideshowInterval) clearInterval(slideshowInterval);
  if (detailSlideInterval) clearInterval(detailSlideInterval);

  let content = '';
  if (pageKey === 'detail') {
    content = views.getDetailView(selectedPlace, reviews.filter(r => r.placeId === selectedPlace.id));
  } else if (pageKey === 'booking') {
    content = views.getBookingView(selectedPlace, selectedPackageType, appliedPromoName, appliedPromoDiscount, selectedBataanPackage);
  } else if (pageKey === 'myBookings') {
    const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail?.toLowerCase());
    const myBookingsList = activeUser ? activeUser.bookings : [];
    content = views.getMyBookingsView(myBookingsList, reviews);
  } else if (pageKey === 'admin') {
    content = views.getAdminView(sampleAccounts, blockedDates, adminFilter, adminCalMonth, inquiries);
  } else if (pageKey === 'inquiry') {
    const me = sampleAccounts.find(u => u.email.toLowerCase() === (currentUserEmail || '').toLowerCase());
    content = views.getInquiryView(Object.values(allPlacesData), me ? { name: me.name, email: me.email } : {});
  } else if (pageKey === 'blog') {
    content = views.getBlogView(blogsData[selectedBlogIndex]);
  } else if (pageKey === 'payment') {
    const f = findBooking(activePaymentRef);
    if (!f) { navigateTo('myBookings'); return; }
    content = views.getPaymentView(f.b);
  } else {
    content = views[pageKey];
  }

  if (!content) return;
  container.innerHTML = content;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageKey);
  });

  if (pageKey === 'home') attachHomeListeners();
  if (pageKey === 'places') attachPlacesSearchListener();
  if (pageKey === 'booking') attachBookingListeners();
  if (pageKey === 'faq') setupFaqAccordion();
  if (pageKey === 'detail') {
    currentDetailSlideIndex = 0;
    resetDetailSlideTimer();
  }

  updateNavAuthLabel();
  persist();
  const wantedHash = hashFor(pageKey);
  if (location.hash !== wantedHash) { suppressHash = true; location.hash = wantedHash; }
  window.scrollTo(0, 0);
  document.querySelector('.nav-links')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  container.setAttribute('tabindex', '-1');
  container.focus({ preventScroll: true });
}

function approveBooking(userEmail, referenceId) {
  const user = sampleAccounts.find(acc => acc.email.toLowerCase() === userEmail.toLowerCase());
  if (user) {
    const booking = user.bookings.find(b => b.referenceId === referenceId);
    if (booking && booking.status !== 'Cancelled') {
      booking.status = 'Approved / Paid Confirmed';
      toast(`Booking ${referenceId} has been successfully approved!`);
      navigateTo('admin');
    }
  }
}

function applyFilters() {
  const categoryEl = document.getElementById('filter-category');
  const locationEl = document.getElementById('filter-location');
  const discountEl = document.getElementById('filter-discount');
  const discountLabel = document.getElementById('discount-val-label');
  const minPriceEl = document.getElementById('filter-min-price');
  const maxPriceEl = document.getElementById('filter-max-price');
  const container = document.getElementById('filtered-results-container');

  if (!container) return;

  const category = categoryEl ? categoryEl.value : '';
  const locationQuery = locationEl ? locationEl.value.toLowerCase() : '';
  const minDiscount = discountEl ? parseInt(discountEl.value, 10) || 0 : 0;
  const minPrice = minPriceEl ? parseFloat(minPriceEl.value) || 0 : 0;
  const maxPrice = maxPriceEl ? parseFloat(maxPriceEl.value) || 60000 : 60000;

  if (discountLabel) {
    discountLabel.textContent = minDiscount === 0 ? 'Any' : `${minDiscount}%+ off`;
  }

  const allPlaces = Object.values(allPlacesData);
  const filtered = allPlaces.filter(p => {
    const matchesCategory = !category || p.category === category;
    const matchesLocation = !locationQuery || p.location.toLowerCase().includes(locationQuery);
    const matchesDiscount = p.discount >= minDiscount;
    const matchesPrice = p.numericPrice >= minPrice && p.numericPrice <= maxPrice;

    return matchesCategory && matchesLocation && matchesDiscount && matchesPrice;
  });

  container.innerHTML = filtered.length > 0
    ? filtered.map(renderFilterableCard).join('')
    : `<p style="padding: 20px; text-align: center; color: #718096; width: 100%;">No destinations match your selected filters.</p>`;

}

function resetFilters() {
  const categoryEl = document.getElementById('filter-category');
  const locationEl = document.getElementById('filter-location');
  const discountEl = document.getElementById('filter-discount');
  const minPriceEl = document.getElementById('filter-min-price');
  const maxPriceEl = document.getElementById('filter-max-price');

  if (categoryEl) categoryEl.value = '';
  if (locationEl) locationEl.value = '';
  if (discountEl) discountEl.value = 0;
  if (minPriceEl) minPriceEl.value = 0;
  if (maxPriceEl) maxPriceEl.value = 60000;

  applyFilters();
}

function attachPlacesSearchListener() {
  const input = document.getElementById('search-input');
  const sort = document.getElementById('sort-select');
  const saved = document.getElementById('saved-only');
  const box = document.getElementById('places-list-container');
  if (!input || !sort || !saved || !box) return;

  const render = () => {
    const q = input.value.toLowerCase();
    const list = Object.values(allPlacesData).filter(p =>
      (p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) && (!saved.checked || favorites.includes(p.id)));
    const order = { 'price-asc': (a, b) => a.numericPrice - b.numericPrice, 'price-desc': (a, b) => b.numericPrice - a.numericPrice, discount: (a, b) => b.discount - a.discount };
    if (order[sort.value]) list.sort(order[sort.value]);
    box.innerHTML = list.length
      ? list.map(p => renderPlaceRow(p, favorites, compareIds, ratingFor(p.id))).join('')
      : `<p style="text-align:center; color:#718096; padding: 20px;">${saved.checked && !q ? 'No saved destinations yet. Tap ♡ on a destination to save it.' : `No destinations found matching "${escapeHtml(input.value)}".`}</p>`;
  };
  input.addEventListener('input', render);
  sort.addEventListener('change', render);
  saved.addEventListener('change', render);
  render();
  updateCompareBar();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    toast(`Thank you for subscribing! Secret deals will be sent to ${emailInput.value}.`);
    emailInput.value = '';
  }
}

function setupFaqSearch() {
  const search = document.getElementById('faq-search');
  if (!search) return;
  const items = [...document.querySelectorAll('.faq-item')];
  const none = document.getElementById('faq-none');
  const count = document.getElementById('faq-count');
  search.addEventListener('input', () => {
    const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const hit = words.every(w => text.includes(w));
      item.style.display = hit ? '' : 'none';
      if (hit) shown++;
      const open = hit && words.length > 0;
      item.querySelector('.faq-answer').style.display = open ? 'block' : 'none';
      item.querySelector('.faq-icon').textContent = open ? '−' : '+';
      item.querySelector('.faq-question').setAttribute('aria-expanded', String(open));
    });
    if (none) none.hidden = shown > 0;
    if (count) count.textContent = words.length ? `${shown} result${shown === 1 ? '' : 's'}` : '';
  });
}

function setupFaqAccordion() {
  setupFaqSearch();
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isVisible = answer.style.display === 'block';

      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isVisible) {
        answer.style.display = 'block';
        icon.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function plusDetailSlide(n) {
  const slides = document.querySelectorAll('.detail-slide');
  if (!slides.length) return;

  slides[currentDetailSlideIndex].style.opacity = '0';
  currentDetailSlideIndex = (currentDetailSlideIndex + n + slides.length) % slides.length;
  slides[currentDetailSlideIndex].style.opacity = '1';
  resetDetailSlideTimer();
}

function resetDetailSlideTimer() {
  if (detailSlideInterval) clearInterval(detailSlideInterval);
  detailSlideInterval = setInterval(() => {
    plusDetailSlide(1);
  }, 5000);
}

function basePackagePriceForUpdate() {
  if (selectedPlace.id === 'bataan-3d2n') {
    return bataanPackagePrices[selectedBataanPackage] || bataanPackagePrices.A;
  }
  const basePrice = parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 2000;
  return selectedPackageType === 'full' ? basePrice * 1.25 : basePrice;
}

function renderChildAgeInputs(childCount) {
  const container = document.getElementById('child-ages-container');
  const fieldsContainer = document.getElementById('child-age-fields');
  if (!container || !fieldsContainer) return;

  if (childCount === 0) {
    container.style.display = 'none';
    fieldsContainer.innerHTML = '';
    return;
  }

  const previous = Array.from(fieldsContainer.querySelectorAll('.child-age-select')).map(sel => sel.value);

  container.style.display = 'block';
  fieldsContainer.innerHTML = Array.from({ length: childCount }).map((_, i) => {
    const value = previous[i] ?? '5';
    return `
    <div style="display: flex; flex-direction: column; gap: 2px;">
      <label style="font-size: 11px; color: #718096; font-weight: 600;">Child ${i + 1} Age</label>
      <select class="child-age-select" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e0; font-size: 13px;" onchange="updateBookingTotal()">
        <option value="0" ${value === '0' ? 'selected' : ''}>0-2 years (Free)</option>
        <option value="5" ${value !== '0' ? 'selected' : ''}>3-11 years (50% Off)</option>
      </select>
    </div>`;
  }).join('');
}

function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  const feedback = document.getElementById('promo-feedback');
  if (!input || !feedback) return;
  const code = input.value.trim().toUpperCase();

  const validCodes = {
    'SIXSEVENNN': 0.67,
    'TRAVELAYA': 0.10,
    'TRIP2026': 0.15,
    'WELCOME5': 0.05
  };

  if (validCodes[code] !== undefined) {
    appliedPromoDiscount = validCodes[code];
    appliedPromoName = code;
    feedback.style.color = '#38a169';
    feedback.textContent = `✓ Promo code "${code}" applied successfully (${Math.round(appliedPromoDiscount * 100)}% OFF)!`;
  } else {
    appliedPromoDiscount = 0;
    appliedPromoName = '';
    feedback.style.color = '#e53e3e';
    feedback.textContent = '❌ Invalid or expired promo code. Try "TRAVELAYA".';
  }

  updateBookingTotal();
}

function updateBookingTotal(effectiveBasePrice = basePackagePriceForUpdate()) {
  const adults = parseInt(document.getElementById('adult-count')?.textContent || '2', 10);
  const childCount = parseInt(document.getElementById('child-count')?.textContent || '0', 10);

  const adultSubtotal = adults * effectiveBasePrice;

  let paidChildren = 0;
  document.querySelectorAll('.child-age-select').forEach(select => {
    if (select.value !== '0') paidChildren++;
  });
  const childTotal = paidChildren * effectiveBasePrice * 0.5;

  let addonsTotal = 0;
  document.querySelectorAll('.addon-checkbox:checked').forEach(checkbox => {
    addonsTotal += parseInt(checkbox.dataset.price, 10) || 0;
  });

  const subtotal = adultSubtotal + childTotal + addonsTotal;
  const promoDiscountAmount = subtotal * appliedPromoDiscount;
  const grandTotal = subtotal - promoDiscountAmount;

  const bAdultLabel = document.getElementById('breakdown-adult-label');
  const bAdultPrice = document.getElementById('breakdown-adult-price');
  if (bAdultLabel && bAdultPrice) {
    bAdultLabel.textContent = `Adult Package (${adults} pax):`;
    bAdultPrice.textContent = `₱${Math.round(adultSubtotal).toLocaleString()}`;
  }

  const childRow = document.getElementById('breakdown-child-row');
  if (childRow) {
    childRow.style.display = childCount > 0 ? 'flex' : 'none';
    const childLabel = document.getElementById('breakdown-child-label');
    const childPrice = document.getElementById('breakdown-child-price');
    if (childLabel) childLabel.textContent = `Children (${childCount}, ${childCount - paidChildren} free):`;
    if (childPrice) childPrice.textContent = `₱${Math.round(childTotal).toLocaleString()}`;
  }

  const bAddonsPrice = document.getElementById('breakdown-addons-price');
  if (bAddonsPrice) {
    bAddonsPrice.textContent = addonsTotal > 0 ? `+₱${addonsTotal.toLocaleString()}` : '₱0';
  }

  const promoRow = document.getElementById('breakdown-promo-row');
  if (promoRow) {
    promoRow.style.display = appliedPromoDiscount > 0 ? 'flex' : 'none';
    const promoLabel = document.getElementById('breakdown-promo-label');
    const promoPrice = document.getElementById('breakdown-promo-price');
    if (promoLabel) promoLabel.textContent = `Promo Discount (${appliedPromoName}, ${Math.round(appliedPromoDiscount * 100)}% off):`;
    if (promoPrice) promoPrice.textContent = `-₱${Math.round(promoDiscountAmount).toLocaleString()}`;
  }

  const display = document.getElementById('total-price-display');
  if (display) {
    display.textContent = `₱${Math.round(grandTotal).toLocaleString()}`;
  }
}

function getLocalDateString(date = new Date()) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function handleBookingSubmit(confirmed = false) {
  const firstName = document.getElementById('guest-firstname')?.value.trim();
  const lastName = document.getElementById('guest-lastname')?.value.trim();
  const contact = document.getElementById('guest-contact')?.value.trim();
  const paymentMethod = document.getElementById('payment-method')?.value;
  const pickupPoint = document.getElementById('pickup-point')?.value || '';
  const pickupTime = document.getElementById('pickup-time')?.value || '';
  const dateInput = document.getElementById('booking-date');
  const adults = parseInt(document.getElementById('adult-count')?.textContent || '0', 10);
  const children = parseInt(document.getElementById('child-count')?.textContent || '0', 10);
  const totalDisplay = document.getElementById('total-price-display')?.textContent || '';

  if (!isLoggedIn || !currentUserEmail) {
    toast('⚠️ Please log in to complete your booking.');
    openLoginModal();
    return;
  }

  clearAllErrors(document.getElementById('app-content'));
  if (failFields([
    !firstName ? ['guest-firstname', 'Enter your first name.'] : null,
    !lastName ? ['guest-lastname', 'Enter your last name.'] : null,
    !contact ? ['guest-contact', 'Enter your contact number.'] : contact.replace(/\D/g, '').length < 7 ? ['guest-contact', 'Enter a valid contact number (at least 7 digits).'] : null,
    !pickupPoint ? ['pickup-point', 'Choose where you will be picked up.'] : null,
    !pickupTime ? ['pickup-time', 'Choose a departure time.'] : null,
    !(dateInput && dateInput.value) ? ['booking-date', 'Pick a travel date on the calendar.'] : null
  ])) return;

  if (adults < 1) {
    toast('At least one adult is required to make a booking.');
    return;
  }

  const travelDate = dateInput.value;
  if (travelDate < getLocalDateString(new Date(Date.now() + 2 * 864e5))) {
    failFields([['booking-date', 'Choose a travel date at least 2 days from today.']]);
    return;
  }

  if (blockedDates[selectedPlace.id] && blockedDates[selectedPlace.id].includes(travelDate)) {
    failFields([['booking-date', `Sorry, ${travelDate} is unavailable for ${selectedPlace.name}. Pick another date.`]]);
    return;
  }

  const partySize = adults + children;
  const left = slotsLeft(selectedPlace.id, travelDate);
  if (partySize > left) {
    failFields([['booking-date', slotMessage(left, travelDate, partySize)]]);
    return;
  }

  const childAges = Array.from(document.querySelectorAll('.child-age-select'))
    .map(sel => (sel.value === '0' ? '0-2 yrs' : '3-11 yrs'));
  const addons = Array.from(document.querySelectorAll('.addon-checkbox:checked'))
    .map(cb => cb.dataset.name)
    .filter(Boolean);

  let referenceId;
  do { referenceId = 'TRV-' + Math.floor(100000 + Math.random() * 900000); } while (findBooking(referenceId));

  const newBooking = {
    referenceId,
    destination: `${selectedPlace.name} (${selectedPlace.location})`,
    name: `${firstName} ${lastName}`,
    contact,
    date: travelDate,
    placeId: selectedPlace.id,
    pickupPoint,
    pickupTime,
    createdAt: new Date().toISOString(),
    adults,
    children,
    childAges,
    addons,
    promo: appliedPromoName ? `${appliedPromoName} (${Math.round(appliedPromoDiscount * 100)}% off)` : '',
    paymentMethod,
    total: totalDisplay,
    packageType: selectedPlace.id === 'bataan-3d2n' ? `Package ${selectedBataanPackage}` : (selectedPackageType === 'full' ? 'Full Stay Getaway' : 'Day Trip Package'),
    status: 'Pending Payment Confirmation'
  };

  if (!confirmed) { showReview(newBooking); return; }

  const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail.toLowerCase());

  if (activeUser) {
    if (!activeUser.bookings) activeUser.bookings = [];
    activeUser.bookings.push(newBooking);
  } else {
    toast('⚠️ Please log in to complete your booking.');
    openLoginModal();
    return;
  }

  activePaymentRef = referenceId;
  navigateTo('payment');
}

function setupCarousel(prevId, nextId, wrapperId, dotsId, dataArray) {
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const carousel = document.getElementById(wrapperId);
  const dotsContainer = document.getElementById(dotsId);

  if (!carousel) return;

  const getStep = () => {
    const card = carousel.querySelector('.place-card');
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 20;
    return card ? card.offsetWidth + gap : 260;
  };

  const getDotCount = () => {
    const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    return Math.max(1, Math.ceil(maxScroll / getStep()) + 1);
  };

  const renderDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = Array.from({ length: getDotCount() })
      .map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('');
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const atEnd = maxScroll > 0 && carousel.scrollLeft >= maxScroll - 2;
    const index = atEnd ? dots.length - 1 : Math.round(carousel.scrollLeft / getStep());
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  if (prevBtn) prevBtn.onclick = () => carousel.scrollBy({ left: -getStep(), behavior: 'smooth' });
  if (nextBtn) nextBtn.onclick = () => carousel.scrollBy({ left: getStep(), behavior: 'smooth' });
  carousel.onscroll = updateDots;

  carousel.scrollLeft = 0;
  renderDots();
}

function attachHomeListeners() {
  setupCarousel('top-prev', 'top-next', 'top-carousel', 'top-dots', topPlaces);
  setupCarousel('dom-prev', 'dom-next', 'dom-carousel', 'dom-dots', domesticPlaces);

  const bgElements = document.querySelectorAll('.hero-bg');
  if (bgElements.length >= 2) {
    let currentIndex = 0;
    slideshowInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % heroImages.length;
      bgElements[1].style.backgroundImage = `url('${heroImages[nextIndex]}')`;
      bgElements[1].classList.add('active');

      setTimeout(() => {
        bgElements[0].style.backgroundImage = `url('${heroImages[nextIndex]}')`;
        bgElements[1].classList.remove('active');
        currentIndex = nextIndex;
      }, 1200);
    }, 5000);
  }
}

let calMonth = null;
let calPlaceId = null;
let calMin = null;
let calExclude = null;
window.renderBookingCalendar = renderBookingCalendar;

function renderBookingCalendar() {
  const box = document.getElementById('booking-calendar');
  const input = document.getElementById('booking-date');
  if (!box || !input) return;
  const now = new Date();
  if (!calMonth) calMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const y = calMonth.getFullYear(), m = calMonth.getMonth();
  const blocked = blockedDates[calPlaceId || selectedPlace.id] || [];
  const cap = capacityOf(calPlaceId || selectedPlace.id);
  const taken = takenByDate(calPlaceId || selectedPlace.id, calExclude);
  const today = calMin || getLocalDateString(new Date(Date.now() + 2 * 864e5));
  const pad = n => String(n).padStart(2, '0');
  const atCurrentMonth = y === now.getFullYear() && m === now.getMonth();
  const monthName = calMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const base = 'padding:10px 0;border-radius:8px;font-size:13px;font-weight:600;border:none;';
  let cells = '<span></span>'.repeat(new Date(y, m, 1).getDay());
  for (let d = 1, last = new Date(y, m + 1, 0).getDate(); d <= last; d++) {
    const ds = `${y}-${pad(m + 1)}-${pad(d)}`;
    const left = cap - (taken[ds] || 0);
    if (blocked.includes(ds)) cells += `<button type="button" disabled title="Unavailable" aria-label="${ds}, unavailable" style="${base}background:#131c38;color:#fff;text-decoration:line-through;cursor:not-allowed">${d}</button>`;
    else if (ds < today) cells += `<button type="button" disabled style="${base}background:#f1f5f9;color:#cbd5e0;cursor:not-allowed">${d}</button>`;
    else if (left <= 0) cells += `<button type="button" disabled title="Fully booked" aria-label="${ds}, fully booked" style="${base}background:#131c38;color:#fff;cursor:not-allowed;line-height:1.1;font-size:12px">${d}<span style="display:block;font-size:8px;font-weight:700;letter-spacing:.3px">FULL</span></button>`;
    else cells += `<button type="button" data-date="${ds}" ${left <= 5 ? `title="${left} slot${left === 1 ? '' : 's'} left" aria-label="${ds}, ${left} slot${left === 1 ? '' : 's'} left"` : ''} style="${base}cursor:pointer;line-height:1.1;background:${input.value === ds ? '#e0415a' : '#f8fafc'};color:${input.value === ds ? '#fff' : '#1b263b'}">${d}${left <= 5 ? `<span style="display:block;font-size:8px;font-weight:700">${left} left</span>` : ''}</button>`;
  }
  const nav = 'background:#fff;border:1px solid #cbd5e0;border-radius:6px;width:32px;height:32px;cursor:pointer;font-weight:bold';
  box.innerHTML = `<div style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;background:#fff;max-width:340px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <button type="button" data-nav="-1" ${atCurrentMonth ? 'disabled' : ''} style="${nav}${atCurrentMonth ? ';opacity:.4;cursor:not-allowed' : ''}">&#10094;</button>
      <strong style="color:#131c38">${monthName}</strong>
      <button type="button" data-nav="1" style="${nav}">&#10095;</button></div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px;color:#64748b;margin-bottom:4px">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(x => `<span>${x}</span>`).join('')}</div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">${cells}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:11px;color:#64748b;margin-top:10px">
      <span><b style="display:inline-block;width:10px;height:10px;background:#131c38;border-radius:2px"></b> Unavailable / full</span>
      <span><b style="display:inline-block;width:10px;height:10px;background:#e0415a;border-radius:2px"></b> Selected</span></div>
    <div style="font-size:12px;margin-top:8px;color:#1b263b">${input.value ? 'Selected: <strong>' + input.value + '</strong>' : 'Pick an available date'}</div></div>`;
  box.onclick = e => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.nav) { calMonth = new Date(y, m + Number(b.dataset.nav), 1); renderBookingCalendar(); }
    else if (b.dataset.date) { input.value = b.dataset.date; clearFieldError('booking-date'); renderBookingCalendar(); }
  };
}

function attachBookingListeners() {
  calMonth = null;
  calPlaceId = null;
  calMin = null;
  calExclude = null;
  renderBookingCalendar();

  document.querySelectorAll('.counter').forEach(counterGroup => {
    const countDisplay = counterGroup.querySelector('.count');
    const minimum = counterGroup.dataset.type === 'adult' ? 1 : 0;
    counterGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.counter-btn');
      if (!btn) return;

      let currentVal = parseInt(countDisplay.textContent, 10);
      if (btn.dataset.action === 'plus') currentVal++;
      else if (btn.dataset.action === 'minus' && currentVal > minimum) currentVal--;
      countDisplay.textContent = currentVal;

      if (counterGroup.dataset.type === 'child') {
        renderChildAgeInputs(currentVal);
      }
      updateBookingTotal();
    });
  });
  updateBookingTotal();
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const navTarget = e.target.closest('[data-page]');
    if (navTarget) {
      e.preventDefault();
      navigateTo(navTarget.dataset.page);
    }

    if (e.target.closest('.login-btn') || e.target.closest('#nav-login-btn')) {
      handleAuthAction(e);
    }
  });

  document.getElementById('app-footer').innerHTML = renderFooter();
  const menuBtn = document.querySelector('.menu-toggle');
  menuBtn?.addEventListener('click', () => {
    const open = document.querySelector('.nav-links').classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  restore();
  if (!location.hash || location.hash === '#') history.replaceState(null, '', '#/home');
  window.addEventListener('hashchange', () => {
    if (suppressHash) { suppressHash = false; return; }
    routeFromHash();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeLoginModal(); closeReview(); }
    if (e.key === 'Tab') trapTab(e);
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"]')) { e.preventDefault(); e.target.click(); }
  });
  const clearOnEdit = e => { const t = e.target.closest ? e.target.closest('[aria-invalid="true"]') : null; if (t && t.id) clearFieldError(t.id); };
  document.addEventListener('input', clearOnEdit);
  document.addEventListener('change', clearOnEdit);
  document.addEventListener('focusin', e => { const m = openDialogEl(); if (m && !m.contains(e.target)) (focusables(m)[0] || m).focus(); });
  routeFromHash();
});