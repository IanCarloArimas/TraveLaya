import { allPlacesData, topPlaces, domesticPlaces, internationalPlaces, heroImages } from './data.js';
import { views } from './views.js';

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

// Per-destination blocked dates object (e.g. { 'bataan-3d2n': ['2026-12-25'], 'baguio': [] })
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
window.selectPackageType = selectPackageType;
window.plusDetailSlide = plusDetailSlide;
window.handleBookingSubmit = handleBookingSubmit;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.updateBookingTotal = updateBookingTotal;
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

function toggleDateAvailability(placeId, dateStr) {
  if (!placeId) {
    alert('Please select a destination first.');
    return;
  }
  if (!dateStr) {
    alert('Please select a valid date.');
    return;
  }

  if (!blockedDates[placeId]) {
    blockedDates[placeId] = [];
  }

  const index = blockedDates[placeId].indexOf(dateStr);
  if (index > -1) {
    blockedDates[placeId].splice(index, 1);
    alert(`Date ${dateStr} is now AVAILABLE for ${placeId}.`);
  } else {
    blockedDates[placeId].push(dateStr);
    alert(`Date ${dateStr} has been BLOCKED for ${placeId} (Fully Booked/Unavailable).`);
  }
  navigateTo('admin');
}

function openLoginModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('login-modal');
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  
  if (modal) modal.style.display = 'flex';
  if (loginBox) loginBox.style.display = 'block';
  if (registerBox) registerBox.style.display = 'none';
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.style.display = 'none';
}

function switchToRegister(e) {
  e.preventDefault();
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('register-box').style.display = 'block';
}

function switchToLogin(e) {
  e.preventDefault();
  document.getElementById('register-box').style.display = 'none';
  document.getElementById('login-box').style.display = 'block';
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
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value;

  const foundUser = sampleAccounts.find(acc => acc.email.toLowerCase() === emailInput && acc.password === passwordInput);

  if (foundUser) {
    isLoggedIn = true;
    currentUserEmail = foundUser.email;
    isAdmin = !!foundUser.isAdmin;

    updateNavAuthLabel();
    alert(`Successfully logged in as ${foundUser.name} (${isAdmin ? 'Admin' : 'User'})!`);
    closeLoginModal();

    if (isAdmin) {
      navigateTo('admin');
    } else {
      navigateTo('home');
    }
  } else {
    alert('Invalid email or password.');
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;

  sampleAccounts.push({ email, password, name, bookings: [], isAdmin: false });

  isLoggedIn = true;
  currentUserEmail = email;
  isAdmin = false;
  updateNavAuthLabel();
  alert(`🎉 Account successfully created and logged in for ${name}!`);
  closeLoginModal();
  navigateTo('home');
}

function handleAuthAction(e) {
  e.preventDefault();
  if (isLoggedIn) {
    if (confirm('Are you sure you want to log out?')) {
      isLoggedIn = false;
      currentUserEmail = null;
      isAdmin = false;
      updateNavAuthLabel();
      alert('You have been logged out.');
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
    appliedPromoDiscount = 0;
    appliedPromoName = '';
    navigateTo('booking');
  }
}

function viewPlaceDetail(placeId) {
  selectedPlace = allPlacesData[placeId] || allPlacesData['bataan-3d2n'];
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
    b.style.background = match ? '#ff7582' : '#e2e8f0';
    b.style.color = match ? '#fff' : '#4a5568';
  });

  [cardA, cardB, cardC].forEach((c, idx) => {
    if (!c) return;
    const match = (idx === 0 && pkg === 'A') || (idx === 1 && pkg === 'B') || (idx === 2 && pkg === 'C');
    c.style.border = match ? '2px solid #ff7582' : '1px solid #cbd5e0';
  });

  let itineraryData = selectedPlace.itineraryPackageA;
  if (pkg === 'B') itineraryData = selectedPlace.itineraryPackageB;
  if (pkg === 'C') itineraryData = selectedPlace.itineraryPackageC;

  if (!container || !itineraryData) return;

  const daysMap = {};
  itineraryData.forEach((item) => {
    const dayKey = item.dayGroup || 'Day 1';
    if (!daysMap[dayKey]) daysMap[dayKey] = [];
    daysMap[dayKey].push(item);
  });

  const activeDays = Object.entries(daysMap);
  const colCount = activeDays.length;

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${colCount}, minmax(0, 1fr))`;
  container.style.gap = '16px';
  container.style.alignItems = 'start';
  container.style.marginTop = '12px';

  container.innerHTML = activeDays.map(([dayName, items]) => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #ff7582; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px;">
      <h4 style="font-size: 15px; font-weight: 800; color: #ff7582; text-transform: uppercase; margin: 0; padding-bottom: 8px; border-bottom: 1px solid #edf2f7; letter-spacing: 0.5px;">${dayName}</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${items.map(sub => `
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #edf2f7;">
            <span style="font-size: 10px; font-weight: 700; color: #e53e3e; display: block; margin-bottom: 2px;">${sub.day}</span>
            <strong style="font-size: 13px; color: #131c38; display: block; margin-bottom: 2px;">${sub.title}</strong>
            <p style="font-size: 12px; color: #4a5568; margin: 0; line-height: 1.4;">${sub.details}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function switchItinerary(type) {
  const container = document.getElementById('itinerary-container');
  const btn2d = document.getElementById('itinerary-btn-2d');
  const btn3d = document.getElementById('itinerary-btn-3d');
  if (!container) return;

  const itineraryData = type === '3D2N' ? selectedPlace.itinerary3D2N : selectedPlace.itinerary2D1N;
  if (!itineraryData) return;

  if (type === '3D2N') {
    if (btn3d) { btn3d.style.background = '#ff7582'; btn3d.style.color = '#fff'; btn3d.style.boxShadow = '0 2px 6px rgba(255,117,130,0.3)'; }
    if (btn2d) { btn2d.style.background = '#e2e8f0'; btn2d.style.color = '#4a5568'; btn2d.style.boxShadow = 'none'; }
  } else {
    if (btn2d) { btn2d.style.background = '#ff7582'; btn2d.style.color = '#fff'; btn2d.style.boxShadow = '0 2px 6px rgba(255,117,130,0.3)'; }
    if (btn3d) { btn3d.style.background = '#e2e8f0'; btn3d.style.color = '#4a5568'; btn3d.style.boxShadow = 'none'; }
  }

  const daysMap = {};
  itineraryData.forEach((item) => {
    const dayKey = item.dayGroup || (item.day.includes('Day') ? item.day.split('(')[0].trim() : 'Day 1');
    if (!daysMap[dayKey]) daysMap[dayKey] = [];
    daysMap[dayKey].push(item);
  });

  const activeDays = Object.entries(daysMap);
  const colCount = activeDays.length;

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${colCount}, minmax(0, 1fr))`;
  container.style.gap = '16px';
  container.style.alignItems = 'start';
  container.style.marginTop = '12px';

  container.innerHTML = activeDays.map(([dayName, items]) => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #ff7582; border-radius: 12px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px;">
      <h4 style="font-size: 15px; font-weight: 800; color: #ff7582; text-transform: uppercase; margin: 0; padding-bottom: 8px; border-bottom: 1px solid #edf2f7; letter-spacing: 0.5px;">${dayName}</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${items.map(sub => `
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 8px; border: 1px solid #edf2f7;">
            <span style="font-size: 10px; font-weight: 700; color: #e53e3e; display: block; margin-bottom: 2px;">${sub.day}</span>
            <strong style="font-size: 13px; color: #131c38; display: block; margin-bottom: 2px;">${sub.title}</strong>
            <p style="font-size: 12px; color: #4a5568; margin: 0; line-height: 1.4;">${sub.details}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function navigateTo(pageKey) {
  const container = document.getElementById('app-content');
  if (!container) return;

  if (pageKey === 'booking' && !isLoggedIn) {
    alert('⚠️ Please log in or register an account before proceeding to booking.');
    navigateTo('places');
    openLoginModal();
    return;
  }

  if (pageKey === 'myBookings' && !isLoggedIn) {
    alert('⚠️ Please log in to view your bookings.');
    navigateTo('places');
    openLoginModal();
    return;
  }

  if (pageKey === 'admin' && !isAdmin) {
    alert('⚠️ Access denied. Administrator privileges required.');
    return;
  }

  if (slideshowInterval) clearInterval(slideshowInterval);
  if (detailSlideInterval) clearInterval(detailSlideInterval);

  let content = '';
  if (pageKey === 'detail') {
    content = views.getDetailView(selectedPlace);
  } else if (pageKey === 'booking') {
    content = views.getBookingView(selectedPlace, selectedPackageType, appliedPromoName, appliedPromoDiscount);
  } else if (pageKey === 'myBookings') {
    const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail?.toLowerCase());
    const myBookingsList = activeUser ? activeUser.bookings : [];
    content = views.getMyBookingsView(myBookingsList);
  } else if (pageKey === 'admin') {
    content = views.getAdminView(sampleAccounts, blockedDates);
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
  window.scrollTo(0, 0);
}

function approveBooking(userEmail, referenceId) {
  const user = sampleAccounts.find(acc => acc.email.toLowerCase() === userEmail.toLowerCase());
  if (user) {
    const booking = user.bookings.find(b => b.referenceId === referenceId);
    if (booking) {
      booking.status = 'Approved / Paid Confirmed';
      alert(`Booking ${referenceId} has been successfully approved!`);
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
  const maxDiscount = discountEl ? parseInt(discountEl.value, 10) : 50;
  const minPrice = minPriceEl ? parseFloat(minPriceEl.value) || 0 : 0;
  const maxPrice = maxPriceEl ? parseFloat(maxPriceEl.value) || 60000 : 60000;

  if (discountLabel) {
    discountLabel.textContent = `0% - ${maxDiscount}%`;
  }

  const allPlaces = Object.values(allPlacesData);
  const filtered = allPlaces.filter(p => {
    const matchesCategory = !category || p.category === category;
    const matchesLocation = !locationQuery || p.location.toLowerCase().includes(locationQuery);
    const matchesDiscount = p.discount <= maxDiscount;
    const matchesPrice = p.numericPrice >= minPrice && p.numericPrice <= maxPrice;

    return matchesCategory && matchesLocation && matchesDiscount && matchesPrice;
  });

  container.innerHTML = filtered.length > 0
    ? filtered.map(p => `
      <div class="place-card" onclick="viewPlaceDetail('${p.id}')">
        <div class="card-image" style="background-image: url('${p.image}'); position: relative;">
          <span style="position: absolute; top: 10px; left: 10px; background: #ff7582; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${p.discount}% OFF</span>
        </div>
        <div class="card-info">
          <div class="card-title-row">
            <h3>${p.name}</h3>
            <span class="card-duration">${p.duration}</span>
          </div>
          <div class="stars">${p.stars}</div>
          <span class="location">📍 ${p.location}</span>
          <div class="card-footer-row">
            <span class="price-label">From <strong class="price">${p.price}</strong></span>
            <button class="book-now-btn">View</button>
          </div>
        </div>
      </div>
    `).join('')
    : `<p style="padding: 20px; text-align: center; color: #718096; width: 100%;">No destinations match your selected filters.</p>`;

  setupCarousel('filtered-prev', 'filtered-next', 'filtered-results-container', 'filtered-dots', filtered);
}

function resetFilters() {
  const categoryEl = document.getElementById('filter-category');
  const locationEl = document.getElementById('filter-location');
  const discountEl = document.getElementById('filter-discount');
  const minPriceEl = document.getElementById('filter-min-price');
  const maxPriceEl = document.getElementById('filter-max-price');

  if (categoryEl) categoryEl.value = '';
  if (locationEl) locationEl.value = '';
  if (discountEl) discountEl.value = 50;
  if (minPriceEl) minPriceEl.value = 0;
  if (maxPriceEl) maxPriceEl.value = 60000;

  applyFilters();
}

function attachPlacesSearchListener() {
  const searchInput = document.getElementById('search-input');
  const container = document.getElementById('places-list-container');
  const allPlaces = Object.values(allPlacesData);

  if (searchInput && container) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = allPlaces.filter(p => 
        p.name.toLowerCase().includes(query) || p.location.toLowerCase().includes(query)
      );

      container.innerHTML = filtered.length > 0 
        ? filtered.map(p => `
          <div class="place-row-card" onclick="viewPlaceDetail('${p.id}')">
            <div class="card-thumbnail" style="background-image: url('${p.image}');"></div>
            <div class="card-body">
              <div class="card-header">
                <h3>${p.name}</h3>
                <div class="stars">${p.stars}</div>
              </div>
              <span class="location">${p.location}</span>
              <p class="description">${p.description}</p>
            </div>
          </div>
        `).join('')
        : `<p style="text-align:center; color:#718096; padding: 20px;">No destinations found matching "${e.target.value}".</p>`;
    });
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    alert(`Thank you for subscribing! Secret deals will be sent to ${emailInput.value}.`);
    emailInput.value = '';
  }
}

function setupFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isVisible = answer.style.display === 'block';

      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

      if (!isVisible) {
        answer.style.display = 'block';
        icon.textContent = '−';
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
  const basePrice = parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 2000;
  return selectedPackageType === 'full' ? basePrice * 1.25 : basePrice;
}

function selectPackageType(type, basePrice) {
  selectedPackageType = type;
  const fullPrice = basePrice * 1.25;
  const discountRate = selectedPlace.discount ? selectedPlace.discount / 100 : 0;
  const originalBasePrice = discountRate > 0 ? Math.round(basePrice / (1 - discountRate)) : basePrice;
  const originalFullPrice = discountRate > 0 ? Math.round(fullPrice / (1 - discountRate)) : fullPrice;

  const dayCard = document.getElementById('pkg-card-day');
  const fullCard = document.getElementById('pkg-card-full');
  const adultLabel = document.getElementById('adult-label');

  if (dayCard && fullCard) {
    if (type === 'day') {
      dayCard.style.background = '#fff5f6';
      dayCard.style.border = '2px solid #ff7582';
      dayCard.querySelector('input').checked = true;

      fullCard.style.background = '#f8fafc';
      fullCard.style.border = '2px solid #cbd5e0';
      fullCard.querySelector('input').checked = false;
      if (adultLabel) {
        adultLabel.innerHTML = `Adult (${discountRate > 0 ? `<span style="text-decoration: line-through; color: #a0aec0; font-size: 11px; margin-right: 4px;">₱${originalBasePrice.toLocaleString()}</span>` : ''}₱${basePrice.toLocaleString()})`;
      }
    } else {
      fullCard.style.background = '#fff5f6';
      fullCard.style.border = '2px solid #ff7582';
      fullCard.querySelector('input').checked = true;

      dayCard.style.background = '#f8fafc';
      dayCard.style.border = '2px solid #cbd5e0';
      dayCard.querySelector('input').checked = false;
      if (adultLabel) {
        adultLabel.innerHTML = `Adult (${discountRate > 0 ? `<span style="text-decoration: line-through; color: #a0aec0; font-size: 11px; margin-right: 4px;">₱${originalFullPrice.toLocaleString()}</span>` : ''}₱${fullPrice.toLocaleString()})`;
      }
    }
  }

  const currentBase = type === 'full' ? fullPrice : basePrice;
  updateBookingTotal(currentBase);
}

function renderChildAgeInputs(childCount, basePrice) {
  const container = document.getElementById('child-ages-container');
  const fieldsContainer = document.getElementById('child-age-fields');
  if (!container || !fieldsContainer) return;

  if (childCount === 0) {
    container.style.display = 'none';
    fieldsContainer.innerHTML = '';
    return;
  }

  container.style.display = 'block';
  fieldsContainer.innerHTML = Array.from({ length: childCount }).map((_, i) => `
    <div style="display: flex; flex-direction: column; gap: 2px;">
      <label style="font-size: 11px; color: #718096; font-weight: 600;">Child ${i + 1} Age</label>
      <select class="child-age-select" style="padding: 8px; border-radius: 6px; border: 1px solid #cbd5e0; font-size: 13px;" onchange="updateBookingTotal(${basePrice})">
        <option value="0">0-2 years (Free)</option>
        <option value="5" selected>3-11 years (50% Off)</option>
      </select>
    </div>
  `).join('');
}

function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  const feedback = document.getElementById('promo-feedback');
  const breakdown = document.getElementById('promo-breakdown');
  
  if (!input) return;
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
    if (breakdown) {
      breakdown.style.display = 'block';
      breakdown.innerHTML = `Promo Discount (${code}): <span style="color: #38a169;">-${Math.round(appliedPromoDiscount * 100)}%</span>`;
    }
  } else {
    appliedPromoDiscount = 0;
    appliedPromoName = '';
    feedback.style.color = '#e53e3e';
    feedback.textContent = '❌ Invalid or expired promo code. Try "TRAVELAYA".';
    if (breakdown) {
      breakdown.style.display = 'none';
    }
  }

  updateBookingTotal(basePackagePriceForUpdate());
}

function updateBookingTotal(effectiveBasePrice) {
  const adults = parseInt(document.getElementById('adult-count')?.textContent || '2', 10);
  const children = parseInt(document.getElementById('child-count')?.textContent || '0', 10);
  const ageSelects = document.querySelectorAll('.child-age-select');
  
  const adultSubtotal = adults * effectiveBasePrice;

  let childTotal = 0;
  ageSelects.forEach(select => {
    if (select.value !== '0') {
      childTotal += effectiveBasePrice * 0.5;
    }
  });

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
    bAdultPrice.textContent = `₱${adultSubtotal.toLocaleString()}`;
  }

  const bAddonsPrice = document.getElementById('breakdown-addons-price');
  if (bAddonsPrice) {
    bAddonsPrice.textContent = addonsTotal > 0 ? `+₱${addonsTotal.toLocaleString()}` : '₱0';
  }

  const display = document.getElementById('total-price-display');
  if (display) {
    display.textContent = `₱${Math.round(grandTotal).toLocaleString()}`;
  }
}

function handleBookingSubmit() {
  const firstName = document.getElementById('guest-firstname')?.value.trim();
  const lastName = document.getElementById('guest-lastname')?.value.trim();
  const contact = document.getElementById('guest-contact')?.value.trim();
  const paymentMethod = document.getElementById('payment-method')?.value;
  const dateInput = document.getElementById('booking-date');
  const adults = document.getElementById('adult-count')?.textContent || '0';
  const totalDisplay = document.getElementById('total-price-display')?.textContent || '';

  if (!isLoggedIn || !currentUserEmail) {
    alert('⚠️ Please log in to complete your booking.');
    openLoginModal();
    return;
  }

  if (!firstName || !lastName || !contact || !dateInput || !dateInput.value) {
    alert('Please fill out all required fields (First Name, Last Name, Contact Number, and Travel Date).');
    return;
  }

  const travelDate = dateInput.value;
  if (blockedDates[selectedPlace.id] && blockedDates[selectedPlace.id].includes(travelDate)) {
    alert(`⚠️ Sorry, the date ${travelDate} has been blocked by the administrator for ${selectedPlace.name}.`);
    return;
  }

  const referenceId = 'TRV-' + Math.floor(100000 + Math.random() * 900000);

  const newBooking = {
    referenceId,
    destination: `${selectedPlace.name} (${selectedPlace.location})`,
    name: `${firstName} ${lastName}`,
    contact,
    date: travelDate,
    adults,
    paymentMethod,
    total: totalDisplay,
    packageType: selectedPlace.id === 'bataan-3d2n' ? `Package ${selectedBataanPackage}` : (selectedPackageType === 'full' ? 'Full Stay Getaway' : 'Day Trip Package'),
    status: 'Pending Payment Confirmation'
  };

  const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail.toLowerCase());

  if (activeUser) {
    if (!activeUser.bookings) activeUser.bookings = [];
    activeUser.bookings.push(newBooking);
  } else {
    alert('⚠️ Please log in to complete your booking.');
    openLoginModal();
    return;
  }

  const confirmationMessage = 
    `🎉 Booking Submitted Successfully!\n\n` +
    `Reference ID: ${referenceId}\n` +
    `Status: Pending Payment Confirmation\n` +
    `Total Amount: ${totalDisplay}\n\n` +
    `You can view your booking status under "My Bookings".`;

  if (confirm(confirmationMessage)) {
    navigateTo('myBookings');
  }
}

function setupCarousel(prevId, nextId, wrapperId, dotsId, dataArray) {
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const carousel = document.getElementById(wrapperId);
  const dotsContainer = document.getElementById(dotsId);

  if (!carousel) return;
  if (dotsContainer) {
    dotsContainer.innerHTML = dataArray.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('');
  }

  const updateDots = () => {
    if (!dotsContainer) return;
    const index = Math.round(carousel.scrollLeft / 280);
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -280, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => carousel.scrollBy({ left: 280, behavior: 'smooth' }));
  }
  carousel.addEventListener('scroll', updateDots);
}

function attachHomeListeners() {
  setupCarousel('filtered-prev', 'filtered-next', 'filtered-results-container', 'filtered-dots', Object.values(allPlacesData));
  setupCarousel('top-prev', 'top-next', 'top-carousel', 'top-dots', topPlaces);
  setupCarousel('dom-prev', 'dom-next', 'dom-carousel', 'dom-dots', domesticPlaces);
  setupCarousel('intl-prev', 'intl-next', 'intl-carousel', 'intl-dots', internationalPlaces);

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

function attachBookingListeners() {
  const basePrice = parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 2000;
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    dateInput.addEventListener('input', (e) => {
      const selected = e.target.value;
      if (blockedDates[selectedPlace.id] && blockedDates[selectedPlace.id].includes(selected)) {
        alert(`⚠️ Sorry, this date has been blocked by the administrator for ${selectedPlace.name}.`);
        e.target.value = '';
      }
    });
  }

  document.querySelectorAll('.counter').forEach(counterGroup => {
    const countDisplay = counterGroup.querySelector('.count');
    counterGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.counter-btn');
      if (!btn) return;

      let currentVal = parseInt(countDisplay.textContent, 10);
      if (btn.dataset.action === 'plus') currentVal++;
      else if (btn.dataset.action === 'minus' && currentVal > 0) currentVal--;
      countDisplay.textContent = currentVal;

      if (counterGroup.dataset.type === 'child') {
        renderChildAgeInputs(currentVal, basePackagePriceForUpdate());
      }
      updateBookingTotal(basePackagePriceForUpdate());
    });
  });
  updateBookingTotal(basePackagePriceForUpdate());
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

  navigateTo('home');
});