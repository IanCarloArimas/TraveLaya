import { allPlacesData, topPlaces, domesticPlaces, internationalPlaces, heroImages } from './data.js';
import { views } from './views.js';

let selectedPlace = allPlacesData['el-nido'];
let selectedPackageType = 'day';
let slideshowInterval = null;
let detailSlideInterval = null;
let currentDetailSlideIndex = 0;
let appliedPromoDiscount = 0;
let appliedPromoName = '';
let isLoggedIn = false;
let currentUserEmail = null; 

// MGA ACCOUNTS NA SAMPLE LANG, WALA KASI DB KAYA GANITO NALANG MUNA
const sampleAccounts = [
  { email: 'BeatrizMarie@gmail.com', password: 'password123', name: 'Beatriz Marie Bautista', bookings: [] },
  { email: 'KarlaMae@gmail.com', password: 'password123', name: 'Karla Mae Ibuig', bookings: [] },
  { email: 'RhonaAngelica@gmail.com', password: 'password123', name: 'Rhona Angelica Cailao', bookings: [] }
];

//WALA KASI DB GANITO NALANG MUNA TAYO DIBA
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
  if (loginBtn) {
    loginBtn.textContent = isLoggedIn ? 'Logout' : 'Login';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value;

  const foundUser = sampleAccounts.find(acc => acc.email.toLowerCase() === emailInput && acc.password === passwordInput);

  if (foundUser || (emailInput && passwordInput)) {
    isLoggedIn = true;
    currentUserEmail = emailInput;

    if (!foundUser) {
      sampleAccounts.push({ email: emailInput, password: passwordInput, name: emailInput.split('@')[0], bookings: [] });
    }

    updateNavAuthLabel();
    alert(`Successfully logged in as ${foundUser ? foundUser.name : emailInput}! You can now proceed with your bookings.`);
    closeLoginModal();
  } else {
    alert('Invalid email or password. You can use the sample account: BeatrizMarie@gmail.com / password123');
  }
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;

  sampleAccounts.push({ email, password, name, bookings: [] });

  isLoggedIn = true;
  currentUserEmail = email;
  updateNavAuthLabel();
  alert(`🎉 Account successfully created and logged in for ${name} (${email})!`);
  closeLoginModal();
}

function handleAuthAction(e) {
  e.preventDefault();
  if (isLoggedIn) {
    if (confirm('Are you sure you want to log out?')) {
      isLoggedIn = false;
      currentUserEmail = null;
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
  selectedPlace = allPlacesData[placeId] || allPlacesData['el-nido'];
  navigateTo('detail');
}

function navigateTo(pageKey) {
  const container = document.getElementById('app-content');
  if (!container) return;

  if (pageKey === 'booking' && !isLoggedIn) {
    alert('⚠️ Please log in or register an account before proceeding to booking.');
    openLoginModal();
    return;
  }

  if (pageKey === 'myBookings' && !isLoggedIn) {
    alert('⚠️ Please log in to view your bookings.');
    openLoginModal();
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
    const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail);
    const myBookingsList = activeUser ? activeUser.bookings : [];
    content = views.getMyBookingsView(myBookingsList);
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
    feedback.textContent = `✓ Promo code "${code}" applied successfully (${appliedPromoDiscount * 100}% OFF)!`;
    if (breakdown) {
      breakdown.style.display = 'block';
      breakdown.innerHTML = `Promo Discount (${code}): <span style="color: #38a169;">-${(appliedPromoDiscount * 100)}%</span>`;
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
  const ageSelects = document.querySelectorAll('.child-age-select');
  
  let childTotal = 0;
  ageSelects.forEach(() => {
    childTotal += effectiveBasePrice * 0.5;
  });

  let addonsTotal = 0;
  document.querySelectorAll('.addon-checkbox:checked').forEach(checkbox => {
    addonsTotal += parseInt(checkbox.dataset.price, 10) || 0;
  });

  const subtotal = (adults * effectiveBasePrice) + childTotal + addonsTotal;
  const promoDiscountAmount = subtotal * appliedPromoDiscount;
  const total = subtotal - promoDiscountAmount;

  const display = document.getElementById('total-price-display');
  if (display) display.textContent = `₱${Math.round(total).toLocaleString()}`;
}

function handleBookingSubmit() {
  const firstName = document.getElementById('guest-firstname')?.value.trim();
  const lastName = document.getElementById('guest-lastname')?.value.trim();
  const contact = document.getElementById('guest-contact')?.value.trim();
  const paymentMethod = document.getElementById('payment-method')?.value;
  const dateInput = document.getElementById('booking-date');
  const adults = document.getElementById('adult-count')?.textContent || '0';
  const totalDisplay = document.getElementById('total-price-display')?.textContent || '';

  if (!firstName || !lastName || !contact || !dateInput || !dateInput.value) {
    alert('Please fill out all required fields (First Name, Last Name, Contact Number, and Travel Date).');
    return;
  }

  const referenceId = 'TRV-' + Math.floor(100000 + Math.random() * 900000);

  const newBooking = {
    referenceId,
    destination: `${selectedPlace.name} (${selectedPlace.location})`,
    name: `${firstName} ${lastName}`,
    contact,
    date: dateInput.value,
    adults,
    paymentMethod,
    total: totalDisplay,
    packageType: selectedPackageType === 'full' ? 'Full Stay Getaway' : 'Day Trip Package'
  };

  const activeUser = sampleAccounts.find(acc => acc.email.toLowerCase() === currentUserEmail);
  if (activeUser) {
    activeUser.bookings.push(newBooking);
  }

  const confirmationMessage = 
    `🎉 Booking Confirmed Successfully!\n\n` +
    `Reference ID: ${referenceId}\n` +
    `Name: ${firstName} ${lastName}\n` +
    `Destination: ${selectedPlace.name}\n` +
    `Travel Date: ${dateInput.value}\n` +
    `Total Amount: ${totalDisplay}\n\n` +
    `You can view this reservation anytime under the "My Bookings" tab.`;

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