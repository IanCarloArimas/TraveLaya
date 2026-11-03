import { allPlacesData, blogsData, reviewsData, topPlaces, domesticPlaces, internationalPlaces, availableAddons, heroImages } from './data.js';

function renderFilterableCard(place) {
  const isDayTrip = place.packageType === 'Day Trip';
  const badgeBg = isDayTrip ? '#3182ce' : '#2b6cb0';
  return `
    <div class="place-card" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-image" style="background-image: url('${place.image}'); position: relative;">
        <span style="position: absolute; top: 10px; left: 10px; background: #ff7582; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${place.discount}% OFF</span>
        <span style="position: absolute; top: 10px; right: 10px; background: ${badgeBg}; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${place.packageType}</span>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3>${place.name}</h3>
          <span class="card-duration">${place.duration}</span>
        </div>
        <div class="stars">${place.stars}</div>
        <span class="location">📍 ${place.location}</span>
        <div class="card-footer-row">
          <span class="price-label">From <strong class="price">${place.price}</strong></span>
          <button class="book-now-btn" onclick="event.stopPropagation(); viewPlaceDetail('${place.id}')">View</button>
        </div>
      </div>
    </div>
  `;
}

function renderCard(place) {
  return `
    <div class="place-card" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-image" style="background-image: url('${place.image}');">
        <span class="card-badge">${place.badge}</span>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3>${place.name}</h3>
          <span class="card-duration">${place.duration}</span>
        </div>
        <div class="stars">${place.stars}</div>
        <span class="location">${place.location}</span>
        <div class="card-footer-row">
          <span class="price-label">From <strong class="price">${place.price}</strong></span>
          <button class="book-now-btn" onclick="event.stopPropagation(); viewPlaceDetail('${place.id}')">View</button>
        </div>
      </div>
    </div>
  `;
}

function renderPlaceRow(place) {
  return `
    <div class="place-row-card" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-thumbnail" style="background-image: url('${place.image}');"></div>
      <div class="card-body">
        <div class="card-header">
          <h3>${place.name}</h3>
          <div class="stars">${place.stars}</div>
        </div>
        <span class="location">${place.location}</span>
        <p class="description">${place.description}</p>
      </div>
    </div>
  `;
}

function renderReviewCard(review) {
  return `
    <div class="review-card">
      <div class="review-header">
        <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar" />
        <div>
          <h4>${review.name}</h4>
          <span class="review-trip-tag">${review.location}</span>
        </div>
      </div>
      <div class="review-stars">${review.rating}</div>
      <p class="review-comment">"${review.comment}"</p>
      <span class="review-date">${review.date}</span>
    </div>
  `;
}

function renderLoginModal() {
  return `
    <div id="login-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">
      <div id="login-box" style="background: #ffffff; padding: 32px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative;">
        <button onclick="closeLoginModal()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 18px; font-weight: bold; cursor: pointer; color: #64748b;">&times;</button>
        
        <h2 style="font-size: 22px; font-weight: 700; color: #131c38; margin-bottom: 8px;">Welcome Back</h2>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 14px;">Log in to manage your bookings and access secret deals.</p>
        
        <div style="background: #f8fafc; border: 1px dashed #cbd5e0; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 11px; color: #4a5568; line-height: 1.4;">
          <strong>Sample Accounts for Testing:</strong><br>
          • admin@travelaya.com / admin123 (Admin)<br>
          • BeatrizMarie@gmail.com / password123 (Beatriz)<br>
          • KarlaMae@gmail.com / password123 (Karla)<br>
          • RhonaAngelica@gmail.com / password123 (Rhona)
        </div>
        
        <form onsubmit="handleLoginSubmit(event)">
          <div style="margin-bottom: 16px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 6px;">Email Address</label>
            <input type="email" id="login-email" value="BeatrizMarie@gmail.com" placeholder="name@example.com" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 6px;">Password</label>
            <input type="password" id="login-password" value="password123" placeholder="••••••••" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <button type="submit" style="width: 100%; background: #ff7582; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s;">Log In</button>
        </form>
        <p style="text-align: center; font-size: 13px; color: #64748b; margin-top: 16px;">
          Don't have an account? <a href="#" onclick="switchToRegister(event)" style="color: #ff7582; font-weight: 600; text-decoration: none;">Register Now</a>
        </p>
      </div>

      <div id="register-box" style="display: none; background: #ffffff; padding: 32px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative;">
        <button onclick="closeLoginModal()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 18px; font-weight: bold; cursor: pointer; color: #64748b;">&times;</button>
        
        <h2 style="font-size: 22px; font-weight: 700; color: #131c38; margin-bottom: 8px;">Create an Account</h2>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Join TraveLaya to start booking your next adventure.</p>
        
        <form onsubmit="handleRegisterSubmit(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="reg-name" placeholder="John Doe" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Email Address</label>
            <input type="email" id="reg-email" placeholder="name@example.com" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Password</label>
            <input type="password" id="reg-password" placeholder="••••••••" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <button type="submit" style="width: 100%; background: #ff7582; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s;">Sign Up</button>
        </form>
        <p style="text-align: center; font-size: 13px; color: #64748b; margin-top: 16px;">
          Already have an account? <a href="#" onclick="switchToLogin(event)" style="color: #ff7582; font-weight: 600; text-decoration: none;">Log In</a>
        </p>
      </div>
    </div>
  `;
}

function renderItineraryColumns(itineraryData) {
  const daysMap = {};
  itineraryData.forEach((item) => {
    const dayKey = item.dayGroup || (item.day.includes('Day') ? item.day.split('(')[0].trim() : 'Day 1');
    if (!daysMap[dayKey]) daysMap[dayKey] = [];
    daysMap[dayKey].push(item);
  });

  const activeDays = Object.entries(daysMap);
  const colCount = activeDays.length;

  return `
    <div id="itinerary-container" style="display: grid; grid-template-columns: repeat(${colCount}, minmax(0, 1fr)); gap: 16px; align-items: start; margin-top: 12px;">
      ${activeDays.map(([dayName, items]) => `
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
      `).join('')}
    </div>
  `;
}

export const views = {
  home: `
    <section class="hero" id="hero-section">
      <div class="hero-bg active" style="background-image: url('${heroImages[0]}');"></div>
      <div class="hero-bg" style="background-image: url('${heroImages[1]}');"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Book Your Next Adventure</h1>
        <p>Quality services and essential accommodations at affordable prices.</p>
        <button class="hero-travel-btn" onclick="document.getElementById('filter-section').scrollIntoView({ behavior: 'smooth' });">Travel Now</button>
      </div>
    </section>

    <section class="places-section" id="filter-section">
      <div class="section-header" style="margin-bottom: 20px;">
        <h2>Explore & Filter Destinations</h2>
        <p class="subtitle">Find your exact getaway matching your preferred category, discount, and budget.</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 2fr 2.5fr 1fr 1fr auto; gap: 12px; align-items: center; background: #f8fafc; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Category</label>
          <select id="filter-category" onchange="applyFilters()" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px; color: #1b263b;">
            <option value="">Type of promotion</option>
            <option value="Nature">Nature</option>
            <option value="Heritage">Heritage</option>
          </select>
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Location</label>
          <select id="filter-location" onchange="applyFilters()" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px; color: #1b263b;">
            <option value="">Location</option>
            <option value="Philippines">Philippines</option>
            <option value="Benguet">Benguet</option>
            <option value="Bataan">Bataan</option>
          </select>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b;">Discount %</label>
            <span id="discount-val-label" style="font-size: 11px; font-weight: 700; color: #ff7582;">0% - 50%</span>
          </div>
          <input type="range" id="filter-discount" min="0" max="50" value="50" oninput="applyFilters()" style="width: 100%; accent-color: #ff7582; cursor: pointer;" />
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Min Price</label>
          <input type="number" id="filter-min-price" value="0" min="0" oninput="applyFilters()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px;" />
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Max Price</label>
          <input type="number" id="filter-max-price" value="60000" min="0" oninput="applyFilters()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px;" />
        </div>

        <div style="padding-top: 14px;">
          <button onclick="resetFilters()" style="background: #ff7582; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">Reset</button>
        </div>
      </div>

      <div class="carousel-container">
        <button class="nav-arrow left-arrow" id="filtered-prev">&#10094;</button>
        <div class="cards-wrapper" id="filtered-results-container">
          ${Object.values(allPlacesData).map(renderFilterableCard).join('')}
        </div>
        <button class="nav-arrow right-arrow" id="filtered-next">&#10095;</button>
      </div>
      <div class="carousel-dots" id="filtered-dots"></div>
    </section>

    <section class="places-section">
      <div class="section-header">
        <h2>Top Featured Destinations</h2>
        <p class="subtitle">This week's most-booked places.</p>
      </div>
      <div class="carousel-container">
        <button class="nav-arrow left-arrow" id="top-prev">&#10094;</button>
        <div class="cards-wrapper" id="top-carousel">
          ${topPlaces.map(renderCard).join('')}
        </div>
        <button class="nav-arrow right-arrow" id="top-next">&#10095;</button>
      </div>
      <div class="carousel-dots" id="top-dots"></div>
    </section>

    <section class="places-section">
      <div class="section-header">
        <h2>Domestic Destinations</h2>
        <p class="subtitle">Explore top travel spots within the Philippines.</p>
      </div>
      <div class="carousel-container">
        <button class="nav-arrow left-arrow" id="dom-prev">&#10094;</button>
        <div class="cards-wrapper" id="dom-carousel">
          ${domesticPlaces.map(renderCard).join('')}
        </div>
        <button class="nav-arrow right-arrow" id="dom-next">&#10095;</button>
      </div>
      <div class="carousel-dots" id="dom-dots"></div>
    </section>

    <section class="reviews-section">
      <div class="section-header text-center">
        <h2>What Our Guests Say</h2>
        <p class="subtitle">Real experiences from verified trip bookings.</p>
      </div>
      <div class="reviews-grid">
        ${reviewsData.map(renderReviewCard).join('')}
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-col">
          <div class="logo">TraveLaya</div>
          <p>Connecting you to comfortable, affordable travel experiences worldwide.</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <a href="#" onclick="navigateTo('home')">Home</a>
          <a href="#" onclick="navigateTo('places')">Places</a>
          <a href="#" onclick="navigateTo('booking')">Booking</a>
        </div>
        <div class="footer-col">
          <h4>Support & Legal</h4>
          <a href="#" onclick="navigateTo('faq')">Help Center / FAQs</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 TraveLaya. All Rights Reserved.</p>
      </div>
    </footer>
    ${renderLoginModal()}
  `,

  places: `
    <div class="main-container">
      <div class="page-header">
        <h1>All Destinations</h1>
        <p class="subtitle">Scroll, search, or click a destination to view details.</p>
      </div>
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="Search destinations..." />
      </div>
      <div class="places-list" id="places-list-container">
        ${Object.values(allPlacesData).map(renderPlaceRow).join('')}
      </div>
    </div>
    ${renderLoginModal()}
  `,

  blogs: `
    <div class="main-container">
      <div class="page-header">
        <h1>Travel Guides & Tips</h1>
        <p class="subtitle">Inspiration, itineraries, and local food recommendations from our experts.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
        ${blogsData.map(blog => `
          <div style="background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
            <div style="height: 160px; background-size: cover; background-position: center; background-image: url('${blog.image}');"></div>
            <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 10px; color: #ff7582; font-weight: 700; text-transform: uppercase;">${blog.category}</span>
                <span style="font-size: 11px; color: #718096;">${blog.date}</span>
              </div>
              <h4 style="font-size: 15px; color: #1b263b; font-weight: 700; margin-bottom: 8px;">${blog.title}</h4>
              <p style="font-size: 13px; color: #64748b; line-height: 1.5; flex: 1;">${blog.excerpt}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ${renderLoginModal()}
  `,

  faq: `
    <div class="main-container">
      <div class="page-header">
        <h1>Frequently Asked Questions</h1>
        <p class="subtitle">Got questions? Everything you need to know about booking with TraveLaya.</p>
      </div>
      <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>How do I cancel or modify my booking?</span>
            <span class="faq-icon" style="color: #ff7582; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">
            You can modify or cancel your booking up to 48 hours prior to your check-in date via your confirmation email or by contacting support for a full refund.
          </div>
        </div>
      </div>
    </div>
    ${renderLoginModal()}
  `,

  getMyBookingsView: (bookings) => {
    return `
      <div class="main-container">
        <div class="page-header">
          <h1>My Bookings</h1>
          <p class="subtitle">View all your confirmed reservations and reference IDs.</p>
        </div>
        ${bookings.length === 0 ? `
          <div style="text-align: center; padding: 50px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; margin-top: 20px;">
            <p style="font-size: 16px; color: #64748b; margin-bottom: 16px;">You don't have any bookings yet.</p>
            <button onclick="navigateTo('places')" style="background: #ff7582; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">Explore Destinations</button>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
            ${bookings.map(b => `
              <div style="background: #ffffff; border: 1px solid #cbd5e0; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div>
                  <span style="background: #e2e8f0; color: #1b263b; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">Ref: ${b.referenceId}</span>
                  <h3 style="font-size: 18px; color: #1b263b; margin: 8px 0 4px 0;">${b.destination}</h3>
                  <p style="font-size: 13px; color: #64748b; margin: 0;">Package: <strong>${b.packageType}</strong> | Travel Date: <strong>${b.date}</strong></p>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 12px; color: #718096; display: block;">Total Paid</span>
                  <strong style="font-size: 20px; color: #ff7582;">${b.total}</strong>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
      ${renderLoginModal()}
    `;
  },

  getAdminView: (accounts, blockedDates = {}) => {
    const allBookings = [];
    accounts.forEach(acc => {
      if (acc.bookings && acc.bookings.length > 0) {
        acc.bookings.forEach(b => {
          allBookings.push({ ...b, userEmail: acc.email, userName: acc.name });
        });
      }
    });

    return `
      <div class="main-container">
        <div class="page-header">
          <h1>Admin Dashboard</h1>
          <p class="subtitle">Manage user bookings and control per-destination tour date availability.</p>
        </div>

        <!-- Per-Destination Date Availability Control Section -->
        <div style="background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.04); margin-top: 20px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #131c38; margin-bottom: 8px;">📅 Per-Destination Date Availability Control</h3>
          <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Select a destination and date to block or unblock reservations.</p>
          
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
            <div>
              <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Destination</label>
              <select id="admin-target-place" style="padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; background: #fff; font-weight: 600;">
                ${Object.values(allPlacesData).map(p => `<option value="${p.id}">${p.name} (${p.location})</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Date</label>
              <input type="date" id="admin-target-date" style="padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; background: #fff;" />
            </div>
            <div style="padding-top: 18px;">
              <button type="button" onclick="toggleDateAvailability(document.getElementById('admin-target-place').value, document.getElementById('admin-target-date').value)" style="background: #ff7582; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Toggle Date Status</button>
            </div>
          </div>

          <h4 style="font-size: 13px; font-weight: 700; color: #4a5568; margin-bottom: 8px;">Currently Blocked Dates per Destination:</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${Object.keys(blockedDates).length > 0 && Object.values(blockedDates).some(arr => arr.length > 0)
              ? Object.entries(blockedDates).map(([placeId, dates]) => {
                  if (!dates || dates.length === 0) return '';
                  const placeObj = allPlacesData[placeId];
                  const placeName = placeObj ? placeObj.name : placeId;
                  return `<div style="font-size: 13px; color: #4a5568;"><strong>${placeName}:</strong> ${dates.map(d => `<span style="background: #fed7d7; color: #c53030; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; margin-left: 6px;">${d} <button type="button" onclick="toggleDateAvailability('${placeId}', '${d}')" style="background:none; border:none; color:#c53030; cursor:pointer; font-weight:bold; font-size: 12px; padding: 0;">&times;</button></span>`).join('')}</div>`;
                }).join('')
              : '<span style="font-size: 13px; color: #a0aec0;">No dates currently blocked for any destination.</span>'
            }
          </div>
        </div>

        <!-- Customer Bookings Section -->
        <div style="background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.04); margin-top: 20px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #131c38; margin-bottom: 16px;">All Customer Bookings (${allBookings.length})</h3>
          ${allBookings.length === 0 ? `<p style="color: #64748b; font-size: 14px; text-align: center; padding: 30px;">No bookings found yet.</p>` : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${allBookings.map(b => `
                <div style="background: #f8fafc; border: 1px solid #cbd5e0; border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                  <div>
                    <span style="background: #2b6cb0; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px;">${b.referenceId}</span>
                    <h4 style="font-size: 16px; color: #1b263b; margin: 6px 0 2px 0;">${b.destination}</h4>
                    <p style="font-size: 12px; color: #4a5568; margin: 0;">User: <strong>${b.userName}</strong> (${b.userEmail})</p>
                    <p style="font-size: 12px; color: #d69e2e; font-weight: 600; margin-top: 4px;">Status: ${b.status}</p>
                  </div>
                  <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <strong style="font-size: 18px; color: #ff7582;">${b.total}</strong>
                    ${b.status.includes('Approved') ? `<span style="background: #c6f6d5; color: #22543d; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">✓ Approved</span>` : `<button onclick="approveBooking('${b.userEmail}', '${b.referenceId}')" style="background: #38a169; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Approve Payment</button>`}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
      ${renderLoginModal()}
    `;
  },

  getDetailView: (selectedPlace) => {
    const bannerImages = [selectedPlace.image, ...(selectedPlace.landmarks ? selectedPlace.landmarks.map(l => l.image) : [])];
    const isBataan = selectedPlace.id === 'bataan-3d2n';
    const isBaguio = selectedPlace.id === 'baguio';
    
    return `
      <div class="main-container detail-container">
        <button class="back-btn" onclick="navigateTo('places')">← Back to Destinations</button>

        <div class="detail-banner-slideshow" style="position: relative; width: 100%; height: 360px; border-radius: 16px; overflow: hidden; margin-bottom: 24px; background: #131c38;">
          ${bannerImages.map((img, index) => `
            <div class="detail-slide ${index === 0 ? 'active' : ''}" style="position: absolute; inset: 0; background-size: cover; background-position: center; background-image: url('${img}'); opacity:${index === 0 ? '1' : '0'}; transition: opacity 1s ease-in-out;"></div>
          `).join('')}
          <button class="nav-arrow right-arrow" onclick="plusDetailSlide(1)" style="position: absolute; top: 50%; right: 16px; transform: translateY(-50%); z-index: 10; cursor: pointer;">&#10095;</button>
        </div>

        <div class="detail-grid">
          <div class="detail-main-info">
            <h1>${selectedPlace.name}</h1>
            <div class="stars">${selectedPlace.stars}</div>
            <span class="location-tag">📍 ${selectedPlace.location}</span>
            
            <div class="detail-description-box">
              <h3>About & Highlights</h3>
              <p>${selectedPlace.description}</p>
            </div>

            ${selectedPlace.amenities ? `
              <div class="amenities-section" style="margin-top: 24px;">
                <h3>Included Amenities</h3>
                <div class="amenities-list" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${selectedPlace.amenities.map(item => `
                    <span class="amenity-badge" style="background: #edf2f7; color: #2d3748; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 20px; border: 1px solid #cbd5e0;">✨ ${item}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="landmarks-section">
              <h3>Landmarks & Attractions</h3>
              <div class="landmarks-grid">
                ${selectedPlace.landmarks.map(lm => `
                  <div class="landmark-card">
                    <div class="landmark-img" style="background-image: url('${lm.image}');"></div>
                    <span>${lm.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Itinerary Section -->
            <div class="itinerary-section" style="margin-top: 28px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <h3 style="margin: 0;">Tour Itinerary</h3>
                ${isBaguio ? `
                  <div style="display: flex; gap: 8px;">
                    <button onclick="switchItinerary('2D1N')" id="itinerary-btn-2d" style="padding: 6px 12px; background: #ff7582; color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">2D 1N Itinerary</button>
                    <button onclick="switchItinerary('3D2N')" id="itinerary-btn-3d" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">3D 2N Itinerary</button>
                  </div>
                ` : isBataan ? `
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button onclick="switchBataanPackage('A')" id="btn-pkg-a" style="padding: 6px 12px; background: #ff7582; color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package A (₱12,850)</button>
                    <button onclick="switchBataanPackage('B')" id="btn-pkg-b" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package B (₱7,950)</button>
                    <button onclick="switchBataanPackage('C')" id="btn-pkg-c" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package C (₱19,550)</button>
                  </div>
                ` : ''}
              </div>

              <div id="itinerary-container">
                ${renderItineraryColumns(selectedPlace.itineraryPackageA || selectedPlace.itinerary2D1N || selectedPlace.itinerary)}
              </div>
            </div>
          </div>

          <!-- Sidebar Packages -->
          <div class="detail-packages-sidebar">
            <h3 style="font-size: 18px; font-weight: 800; color: #131c38; margin-bottom: 16px; text-align: center;">Tour Packages</h3>
            
            ${isBataan ? `
              <div class="package-pillar-card" id="sidebar-card-a" style="background: #fff; padding: 14px; border-radius: 12px; border: 2px solid #ff7582; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('A')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE A</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">Las Casas, Camaya Coast, Corregidor & Mt. Samat</p>
                <div style="background: #ff7582; color: #fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱12,850 / Pax</div>
              </div>

              <div class="package-pillar-card" id="sidebar-card-b" style="background: #fff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e0; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('B')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE B</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">Mariveles Five Fingers, Laki Beach, Camaya Coast & Mt. Samat</p>
                <div style="background: #2b6cb0; color: #fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱7,950 / Pax</div>
              </div>

              <div class="package-pillar-card" id="sidebar-card-c" style="background: #fff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e0; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('C')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE C</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">1-Night Las Casas Stay + Corregidor, Camaya Coast & Mt. Samat</p>
                <div style="background: #2b6cb0; color: #fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱19,550 / Pax</div>
              </div>
              <p style="font-size: 10px; color: #718096; text-align: center; margin-top: 8px;">Rates based on min. 10 participants.</p>
            ` : `
              <div class="package-pillar-card" style="background: #fff; padding: 16px; border-radius: 12px; border: 2px solid #ff7582; margin-bottom: 16px;">
                <h4 class="pillar-title" style="color: #131c38; margin-bottom: 6px;">STANDARD PACKAGE</h4>
                <div class="pillar-price-badge" style="background: #ff7582; color: #fff; text-align: center; padding: 6px; border-radius: 6px; font-weight: 700;">${selectedPlace.price} / Pax</div>
              </div>
            `}
          </div>
        </div>

        <div class="detail-bottom-bar">
          <button class="book-now-main-btn" onclick="navigateTo('booking')">Book Now</button>
        </div>
      </div>
      ${renderLoginModal()}
    `;
  },

  getBookingView: (selectedPlace, selectedPackageType, appliedPromoName, appliedPromoDiscount) => {
    const basePrice = parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 7950;
    const discountRate = selectedPlace.discount ? selectedPlace.discount / 100 : 0;
    const subtotal = basePrice * 2;
    const promoDiscountAmount = subtotal * appliedPromoDiscount;
    const initialTotal = subtotal - promoDiscountAmount;

    return `
      <div class="main-container">
        <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap;">
          <div>
            <h1 style="margin-bottom: 4px;">Booking Details</h1>
            <p class="subtitle">Location: <strong>${selectedPlace.location}</strong> | Base Rate: <strong>${selectedPlace.price} / Adult</strong></p>
          </div>
          
          <div style="min-width: 260px;">
            <label for="destination-select" style="font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Change Destination</label>
            <select id="destination-select" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-family: inherit; font-size: 14px; background: #ffffff; margin-bottom: 10px; cursor: pointer; color: #1b263b; font-weight: 600;" onchange="changeBookingDestination(this.value)">
              ${Object.values(allPlacesData).map(p => `
                <option value="${p.id}" ${p.id === selectedPlace.id ? 'selected' : ''}>
                  ${p.name} (${p.location})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="reservation-box" style="margin-top: 20px;">
          <h2>Reservation Form - ${selectedPlace.name}</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="guest-firstname">First Name</label>
              <input type="text" id="guest-firstname" placeholder="Enter first name" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" required />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="guest-lastname">Last Name</label>
              <input type="text" id="guest-lastname" placeholder="Enter last name" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="guest-contact">Contact Number</label>
              <input type="tel" id="guest-contact" placeholder="e.g. 09123456789" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" required />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="payment-method">Mode of Payment</label>
              <select id="payment-method" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; background: #fff; cursor: pointer; box-sizing: border-box;">
                <option value="GCash">GCash</option>
                <option value="Maya">Maya</option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="Bank Transfer">Direct Bank Transfer</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="booking-date">Select Travel Date</label>
            <input type="date" id="booking-date" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px;" />
          </div>

          <div class="form-group">
            <label>Guests & Quantity</label>
            <div class="quantity-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span id="adult-label" style="font-size: 14px; font-weight: 600; color: #1b263b;">Adult (₱${basePrice.toLocaleString()})</span>
              <div class="counter" data-type="adult" style="display: flex; align-items: center; gap: 10px;">
                <button type="button" class="counter-btn" data-action="minus" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid #cbd5e0; background: #fff; cursor: pointer; font-weight: bold;">−</button>
                <span class="count" id="adult-count" style="font-weight: 700; font-size: 16px; min-width: 20px; text-align: center;">2</span>
                <button type="button" class="counter-btn" data-action="plus" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid #cbd5e0; background: #fff; cursor: pointer; font-weight: bold;">+</button>
              </div>
            </div>

            <div class="quantity-row" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span style="font-size: 14px; font-weight: 600; color: #1b263b; display: block;">Child (3-11 yrs)</span>
                <small style="font-size: 11px; color: #64748b;">50% off base rate</small>
              </div>
              <div class="counter" data-type="child" style="display: flex; align-items: center; gap: 10px;">
                <button type="button" class="counter-btn" data-action="minus" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid #cbd5e0; background: #fff; cursor: pointer; font-weight: bold;">−</button>
                <span class="count" id="child-count" style="font-weight: 700; font-size: 16px; min-width: 20px; text-align: center;">0</span>
                <button type="button" class="counter-btn" data-action="plus" style="width: 32px; height: 32px; border-radius: 6px; border: 1px solid #cbd5e0; background: #fff; cursor: pointer; font-weight: bold;">+</button>
              </div>
            </div>

            <div id="child-ages-container" style="display: none; margin-top: 12px; padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <label style="font-size: 12px; font-weight: 700; color: #4a5568; display: block; margin-bottom: 8px;">Child Ages</label>
              <div id="child-age-fields" style="display: flex; flex-direction: column; gap: 8px;"></div>
            </div>
          </div>

          <!-- Add-ons Section Restored -->
          <div class="form-group" style="margin-top: 20px;">
            <label style="font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Optional Add-ons & Extras</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(selectedPlace.addons || availableAddons).map(addon => `
                <label style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 13px; color: #1b263b;">
                  <span style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" class="addon-checkbox" data-price="${addon.price}" onchange="updateBookingTotal(basePackagePriceForUpdate())" style="width: 16px; height: 16px; accent-color: #ff7582; cursor: pointer;" />
                    ${addon.name}
                  </span>
                  <strong style="color: #ff7582;">+₱${addon.price.toLocaleString()}</strong>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="form-group" style="margin-top: 20px;">
            <label for="promo-code-input">Promo / Discount Code</label>
            <div style="display: flex; gap: 10px;">
              <input type="text" id="promo-code-input" placeholder="e.g. TRAVELAYA" value="${appliedPromoName}" style="flex: 1; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; text-transform: uppercase;" />
              <button type="button" onclick="applyPromoCode()" style="background: #131c38; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Apply</button>
            </div>
            <small id="promo-feedback" style="display: block; margin-top: 6px; font-size: 12px; font-weight: 600; color: ${appliedPromoDiscount > 0 ? '#38a169' : '#e53e3e'};">
              ${appliedPromoDiscount > 0 ? `✓ Promo code applied (${appliedPromoDiscount * 100}% OFF)!` : ''}
            </small>
          </div>

          <div style="margin: 20px 0; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="breakdown-adult-label" style="font-size: 13px; color: #64748b;">Adult Package (2 pax):</span>
              <span id="breakdown-adult-price" style="font-size: 13px; font-weight: 600; color: #1b263b;">₱${subtotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 13px; color: #64748b;">Optional Add-ons:</span>
              <span id="breakdown-addons-price" style="font-size: 13px; font-weight: 600; color: #1b263b;">₱0</span>
            </div>
            <div id="breakdown-promo-row" style="display: ${appliedPromoDiscount > 0 ? 'flex' : 'none'}; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="breakdown-promo-label" style="font-size: 13px; color: #38a169; font-weight: 600;">Promo Discount:</span>
              <span id="breakdown-promo-price" style="font-size: 13px; font-weight: 600; color: #38a169;">-₱${Math.round(promoDiscountAmount).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e0; padding-top: 12px; margin-top: 12px;">
              <span style="font-size: 16px; font-weight: 700; color: #1b263b;">Estimated Total:</span>
              <strong id="total-price-display" style="font-size: 22px; color: #ff7582;">₱${Math.round(initialTotal).toLocaleString()}</strong>
            </div>
          </div>

          <div class="action-buttons">
            <button type="button" class="btn btn-cancel" onclick="navigateTo('home')">Cancel</button>
            <button type="button" class="btn btn-continue" onclick="handleBookingSubmit()">Confirm Booking</button>
          </div>
        </div>
      </div>
      ${renderLoginModal()}
    `;
  }
};