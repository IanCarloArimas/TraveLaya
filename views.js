import { allPlacesData, blogsData, reviewsData, topPlaces, domesticPlaces, internationalPlaces, availableAddons, heroImages } from './data.js';

function renderFilterableCard(place) {
  const isDayTrip = place.packageType === 'Day Trip';
  const badgeBg = isDayTrip ? '#3182ce' : '#2b6cb0';

  return `
    <div class="place-card" onclick="viewPlaceDetail('${place.id}')">
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
          <button class="book-now-btn">View</button>
        </div>
      </div>
    </div>
  `;
}

function renderCard(place) {
  return `
    <div class="place-card" onclick="viewPlaceDetail('${place.id}')">
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
          <button class="book-now-btn">View</button>
        </div>
      </div>
    </div>
  `;
}

function renderPlaceRow(place) {
  return `
    <div class="place-row-card" onclick="viewPlaceDetail('${place.id}')">
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
            <option value="Trending">Trending</option>
            <option value="Best Value">Best Value</option>
            <option value="Nature">Nature</option>
            <option value="Heritage">Heritage</option>
            <option value="Surf">Surf</option>
            <option value="Popular">Popular</option>
            <option value="Luxury">Luxury</option>
            <option value="Europe">Europe</option>
            <option value="History">History</option>
          </select>
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Location</label>
          <select id="filter-location" onchange="applyFilters()" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px; color: #1b263b;">
            <option value="">Location</option>
            <option value="Philippines">Philippines</option>
            <option value="Japan">Japan</option>
            <option value="Greece">Greece</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
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

    <section style="max-width: 1040px; margin: 30px auto 10px auto; padding: 0 20px;">
      <div style="background: linear-gradient(135deg, #131c38 0%, #1f2d5a 100%); color: #ffffff; padding: 20px 28px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 6px 18px rgba(0,0,0,0.06);">
        <div>
          <span style="background: #ff7582; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; text-transform: uppercase;">Special Promo</span>
          <h3 style="font-size: 18px; font-weight: 700; margin-top: 6px;">Early Bird Saver: Use code GO365</h3>
          <p style="font-size: 12px; opacity: 0.85;">Enjoy up to 15% off when you book 15 days in advance!</p>
        </div>
        <button onclick="navigateTo('places')" style="background: #ff7582; color: #fff; border: none; padding: 10px 22px; border-radius: 20px; font-weight: 600; font-size: 13px; cursor: pointer;">Book Early</button>
      </div>
    </section>

    <section class="trust-bar">
      <div class="trust-item">⭐ <strong>4.9/5 Rating</strong> from 10,000+ Travelers</div>
      <div class="trust-item">🛡️ <strong>100% Verified</strong> Local Tour Guides</div>
      <div class="trust-item">💳 <strong>Flexible Cancellations</strong> & Best Prices</div>
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

    <section class="places-section">
      <div class="section-header">
        <h2>International Getaways</h2>
        <p class="subtitle">Discover popular destinations across the globe.</p>
      </div>
      <div class="carousel-container">
        <button class="nav-arrow left-arrow" id="intl-prev">&#10094;</button>
        <div class="cards-wrapper" id="intl-carousel">
          ${internationalPlaces.map(renderCard).join('')}
        </div>
        <button class="nav-arrow right-arrow" id="intl-next">&#10095;</button>
      </div>
      <div class="carousel-dots" id="intl-dots"></div>
    </section>

    <section style="max-width: 1040px; margin: 30px auto; padding: 32px 36px; background: #ffffff; border-radius: 20px; border: 1px solid #cbd5e0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);">
      <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <h2>Go-To Trip: Travel Guides & Tips</h2>
          <p class="subtitle">Inspiration, itineraries, and local food recommendations.</p>
        </div>
        <button onclick="navigateTo('blogs')" style="background: none; border: none; color: #ff7582; font-weight: 700; cursor: pointer; font-size: 13px; margin-bottom: 20px;">View All Blogs →</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
        ${blogsData.slice(0, 3).map(blog => `
          <div onclick="navigateTo('blogs')" style="background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="height: 120px; background-size: cover; background-position: center; background-image: url('${blog.image}');"></div>
            <div style="padding: 14px;">
              <span style="font-size: 10px; color: #ff7582; font-weight: 700; text-transform: uppercase;">${blog.category}</span>
              <h4 style="font-size: 14px; color: #1b263b; font-weight: 700; margin: 4px 0;">${blog.title}</h4>
              <p style="font-size: 12px; color: #64748b;">${blog.excerpt}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section style="max-width: 1040px; margin: 30px auto; background: #131c38; border-radius: 20px; padding: 36px 48px; color: #ffffff; text-align: center;">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Get Secret Deals & Travel Tips</h2>
      <p style="font-size: 13px; opacity: 0.85; margin-bottom: 20px;">Subscribe to our newsletter to receive exclusive flash sales and travel discounts.</p>
      <form id="newsletter-form" onsubmit="handleNewsletterSubmit(event)" style="display: flex; justify-content: center; gap: 12px; max-width: 500px; margin: 0 auto;">
        <input type="email" id="newsletter-email" placeholder="Enter your email address" required style="flex: 1; padding: 12px 20px; border-radius: 25px; border: none; outline: none; font-size: 14px;" />
        <button type="submit" style="background: #ff7582; color: #ffffff; border: none; padding: 12px 28px; border-radius: 25px; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform 0.2s;">Subscribe</button>
      </form>
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

        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Are airport transfers included in all packages?</span>
            <span class="faq-icon" style="color: #ff7582; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">
            Select destinations include complimentary airport transfers. You can also add private transfer options directly on the booking page during checkout.
          </div>
        </div>

        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>What payment methods do you accept?</span>
            <span class="faq-icon" style="color: #ff7582; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">
            We accept all major credit/debit cards, GCash, Maya, and direct bank transfers.
          </div>
        </div>

        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Are tour guides provided during the trips?</span>
            <span class="faq-icon" style="color: #ff7582; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">
            Yes! All of our tour packages include 100% verified local tour guides to ensure a safe, informative, and unforgettable experience.
          </div>
        </div>

        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>How do I use my promo or discount code?</span>
            <span class="faq-icon" style="color: #ff7582; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">
            You can enter your promotional code during the final checkout or booking step to apply your discounts automatically.
          </div>
        </div>
      </div>
    </div>
  `,

  getDetailView: (selectedPlace) => {
    const bannerImages = [selectedPlace.image, ...(selectedPlace.landmarks ? selectedPlace.landmarks.map(l => l.image) : [])];

    return `
      <div class="main-container detail-container">
        <button class="back-btn" onclick="navigateTo('places')">← Back to Destinations</button>

        <div class="detail-banner-slideshow" style="position: relative; width: 100%; height: 360px; border-radius: 16px; overflow: hidden; margin-bottom: 24px; background: #131c38;">
          ${bannerImages.map((img, index) => `
            <div class="detail-slide ${index === 0 ? 'active' : ''}" style="position: absolute; inset: 0; background-size: cover; background-position: center; background-image: url('${img}'); opacity: ${index === 0 ? '1' : '0'}; transition: opacity 1s ease-in-out;"></div>
          `).join('')}
          <button class="nav-arrow right-arrow" onclick="plusDetailSlide(1)" style="position: absolute; top: 50%; right: 16px; transform: translateY(-50%); z-index: 10; cursor: pointer;">&#10095;</button>
        </div>

        <div class="detail-grid">
          <div class="detail-main-info">
            <h1>${selectedPlace.name}</h1>
            <div class="stars">${selectedPlace.stars}</div>
            <span class="location-tag">📍 ${selectedPlace.location}</span>
            
            <div class="detail-description-box">
              <h3>About & History</h3>
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
          </div>

          <div class="detail-sidebar-deals">
            <h3>Travel Deals</h3>
            <div class="deal-card">
              <h4>Day Tour Package</h4>
              <p>Guided tour with lunch & transfers</p>
              <span class="deal-price">${selectedPlace.price}</span>
            </div>
            <div class="deal-card">
              <h4>Full Stay Package</h4>
              <p>3 Days hotel + tour passes</p>
              <span class="deal-price">₱12,500</span>
            </div>
          </div>
        </div>

        <div class="detail-bottom-bar">
          <button class="book-now-main-btn" onclick="navigateTo('booking')">Book Now</button>
        </div>
      </div>
    `;
  },

  getBookingView: (selectedPlace, selectedPackageType, appliedPromoName, appliedPromoDiscount) => {
    const basePrice = parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 2000;
    const discountRate = selectedPlace.discount ? selectedPlace.discount / 100 : 0;
    const originalBasePrice = discountRate > 0 ? Math.round(basePrice / (1 - discountRate)) : basePrice;

    const fullStayPrice = basePrice * 1.25;
    const originalFullStayPrice = discountRate > 0 ? Math.round(fullStayPrice / (1 - discountRate)) : fullStayPrice;

    const effectiveBasePrice = selectedPackageType === 'full' ? fullStayPrice : basePrice;
    
    const subtotal = effectiveBasePrice * 2;
    const promoDiscountAmount = subtotal * appliedPromoDiscount;
    const initialTotal = subtotal - promoDiscountAmount;

    const currentOriginalAdultPrice = selectedPackageType === 'full' ? originalFullStayPrice : originalBasePrice;
    const currentDiscountedAdultPrice = effectiveBasePrice;

    return `
      <div class="main-container">
        <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap;">
          <div>
            <h1 style="margin-bottom: 4px;">Reservation Details</h1>
            <p class="subtitle">Location: <strong>${selectedPlace.location}</strong> | Base Rate: <strong>${selectedPlace.price} / Adult</strong></p>
          </div>
          
          <div style="min-width: 260px;">
            <label for="destination-select" style="font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Change Destination</label>
            <select id="destination-select" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-family: inherit; font-size: 14px; background: #ffffff; cursor: pointer; color: #1b263b; font-weight: 600;" onchange="changeBookingDestination(this.value)">
              ${Object.values(allPlacesData).map(p => `
                <option value="${p.id}" ${p.id === selectedPlace.id ? 'selected' : ''}>
                  ${p.name} (${p.location})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <div class="packages-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
          <div class="package-card" id="pkg-card-day" onclick="selectPackageType('day', ${basePrice})" style="background: ${selectedPackageType === 'day' ? '#fff5f6' : '#f8fafc'}; border: 2px solid ${selectedPackageType === 'day' ? '#ff7582' : '#cbd5e0'}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 16px; color: #1b263b;">Day Trip Package</h3>
              <input type="radio" name="pkg_type" ${selectedPackageType === 'day' ? 'checked' : ''} style="accent-color: #ff7582; cursor: pointer;" />
            </div>
            <span style="font-size: 12px; color: #718096; display: block; margin-top: 4px;">Single-day guided visit</span>
            <div style="font-size: 16px; font-weight: 700; color: #ff7582; margin-top: 8px;">
              ${discountRate > 0 ? `<span style="text-decoration: line-through; color: #a0aec0; font-size: 13px; font-weight: normal; margin-right: 6px;">₱${originalBasePrice.toLocaleString()}</span>` : ''}
              ₱${basePrice.toLocaleString()} / pax
            </div>
          </div>
          <div class="package-card" id="pkg-card-full" onclick="selectPackageType('full', ${basePrice})" style="background: ${selectedPackageType === 'full' ? '#fff5f6' : '#f8fafc'}; border: 2px solid ${selectedPackageType === 'full' ? '#ff7582' : '#cbd5e0'}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 16px; color: #1b263b;">Full Stay Getaway</h3>
              <input type="radio" name="pkg_type" ${selectedPackageType === 'full' ? 'checked' : ''} style="accent-color: #ff7582; cursor: pointer;" />
            </div>
            <span style="font-size: 12px; color: #718096; display: block; margin-top: 4px;">Extended tour & hotel stay</span>
            <div style="font-size: 16px; font-weight: 700; color: #ff7582; margin-top: 8px;">
              ${discountRate > 0 ? `<span style="text-decoration: line-through; color: #a0aec0; font-size: 13px; font-weight: normal; margin-right: 6px;">₱${originalFullStayPrice.toLocaleString()}</span>` : ''}
              ₱${fullStayPrice.toLocaleString()} / pax
            </div>
          </div>
        </div>

        <div class="reservation-box">
          <h2>Reservation Form - ${selectedPlace.name}</h2>

          <div class="form-group">
            <label for="booking-date">Select Travel Date</label>
            <div class="select-wrapper">
              <input type="date" id="booking-date" class="booking-date-input" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-family: inherit; font-size: 14px;" />
            </div>
          </div>

          <div class="form-group">
            <label>Guests & Quantity</label>
            <div class="quantity-row">
              <span id="adult-label">Adult (${discountRate > 0 ? `<span style="text-decoration: line-through; color: #a0aec0; font-size: 11px; margin-right: 4px;">₱${currentOriginalAdultPrice.toLocaleString()}</span>` : ''}₱${currentDiscountedAdultPrice.toLocaleString()})</span>
              <div class="counter" data-type="adult">
                <button type="button" class="counter-btn" data-action="minus">−</button>
                <span class="count" id="adult-count">2</span>
                <button type="button" class="counter-btn" data-action="plus">+</button>
              </div>
            </div>
            <div class="quantity-row">
              <span>Child (0-2 yrs: Free, 3-11 yrs: 50% Off)</span>
              <div class="counter" data-type="child">
                <button type="button" class="counter-btn" data-action="minus">−</button>
                <span class="count" id="child-count">0</span>
                <button type="button" class="counter-btn" data-action="plus">+</button>
              </div>
            </div>
            
            <div id="child-ages-container" style="display: none; margin-top: 14px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px dashed #cbd5e0;">
              <label style="font-size: 13px; font-weight: 600; color: #4a5568; margin-bottom: 8px; display: block;">Specify Child Ages</label>
              <div id="child-age-fields" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;"></div>
            </div>
          </div>

          <div class="form-group">
            <label for="promo-code-input">Promo / Discount Code</label>
            <div style="display: flex; gap: 10px;">
              <input type="text" id="promo-code-input" placeholder="e.g. TRAVELAYA (Try for 10% off)" value="${appliedPromoName}" style="flex: 1; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; text-transform: uppercase;" />
              <button type="button" onclick="applyPromoCode()" style="background: #131c38; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Apply</button>
            </div>
            <small id="promo-feedback" style="display: block; margin-top: 6px; font-size: 12px; font-weight: 600; color: ${appliedPromoDiscount > 0 ? '#38a169' : '#e53e3e'};">
              ${appliedPromoDiscount > 0 ? `✓ Promo code "${appliedPromoName}" applied successfully (${appliedPromoDiscount * 100}% OFF)!` : ''}
            </small>
          </div>

          <div class="form-group">
            <label>Optional Add-ons & Services</label>
            <div class="addons-list" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
              ${availableAddons.map(addon => `
                <label class="addon-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                  <span style="font-size: 13px; font-weight: 500; color: #2d3748; display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" class="addon-checkbox" value="${addon.id}" data-price="${addon.price}" onchange="updateBookingTotal(${effectiveBasePrice})" />
                    ${addon.name}
                  </span>
                  <span style="font-size: 13px; font-weight: 600; color: #ff7582;">+₱${addon.price.toLocaleString()}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <div style="margin: 20px 0; padding: 16px; background: #f8fafc; border-radius: 8px; text-align: right; border: 1px solid #e2e8f0;">
            <div id="promo-breakdown" style="font-size: 13px; color: #718096; margin-bottom: 4px; display: ${appliedPromoDiscount > 0 ? 'block' : 'none'};">
              Promo Discount (${appliedPromoName}): <span style="color: #38a169;">-${(appliedPromoDiscount * 100)}%</span>
            </div>
            <span style="font-size: 15px; font-weight: 600; color: #1b263b;">Estimated Total: </span>
            <strong id="total-price-display" style="font-size: 22px; color: #ff7582;">₱${Math.round(initialTotal).toLocaleString()}</strong>
          </div>

          <div class="action-buttons">
            <button type="button" class="btn btn-cancel" onclick="navigateTo('home')">Cancel, I'm done</button>
            <button type="button" class="btn btn-continue" onclick="handleBookingSubmit()">Confirm Booking</button>
          </div>
        </div>
      </div>
    `;
  }
};