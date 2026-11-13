import { allPlacesData, blogsData, reviewsData, topPlaces, availableAddons, heroImages, bataanPackagePrices, pickupPoints, departureTimesFor, paymentInfo } from './data.js';

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

export function renderFilterableCard(place) {
  const isDayTrip = place.packageType === 'Day Trip';
  const badgeBg = isDayTrip ? '#131c38' : '#e0415a';
  return `
    <div class="place-card" role="button" tabindex="0" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-image" role="img" aria-label="${place.name}" style="background-image: url('${place.image}'); position: relative;">
        <span style="position: absolute; top: 10px; left: 10px; background: #e0415a; color:#fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${place.discount}% OFF</span>
        <span style="position: absolute; top: 10px; right: 10px; background: ${badgeBg}; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px;">${place.packageType}</span>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3>${place.name}</h3>
          <span class="card-duration">${place.duration}</span>
        </div>
        <div class="stars" role="img" aria-label="${place.stars.length} out of 5 stars">${place.stars}</div>
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
    <div class="place-card" role="button" tabindex="0" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-image" role="img" aria-label="${place.name}" style="background-image: url('${place.image}');">
        <span class="card-badge">${place.badge}</span>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3>${place.name}</h3>
          <span class="card-duration">${place.duration}</span>
        </div>
        <div class="stars" role="img" aria-label="${place.stars.length} out of 5 stars">${place.stars}</div>
        <span class="location">${place.location}</span>
        <div class="card-footer-row">
          <span class="price-label">From <strong class="price">${place.price}</strong></span>
          <button class="book-now-btn" onclick="event.stopPropagation(); viewPlaceDetail('${place.id}')">View</button>
        </div>
      </div>
    </div>
  `;
}

export function renderFooter() {
  return `
    <div class="footer-content">
      <div class="footer-col"><div class="logo">TraveLaya</div><p>Connecting you to comfortable, affordable travel experiences worldwide.</p></div>
      <div class="footer-col"><h4>Navigation</h4><a href="#/home">Home</a><a href="#/places">Places</a><a href="#/booking">Booking</a><a href="#/blogs">Blogs</a><a href="#/inquiry">Group &amp; custom trips</a></div>
      <div class="footer-col"><h4>Support &amp; Legal</h4><a href="#/faq">Help Center / FAQs</a><a href="#/policies">Cancellation &amp; Refunds</a><a href="#/policies">Terms &amp; Privacy</a></div>
      <div class="footer-col"><h4>Contact</h4><a href="mailto:support@travelaya.com">support@travelaya.com</a><a href="tel:+639170000000">0917 000 0000</a></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 TraveLaya. All Rights Reserved.</p></div>`;
}

function renderStepper(n) {
  const steps = ['Details', 'Review', 'Payment'];
  return `<div style="display:flex;gap:8px;margin:16px 0;flex-wrap:wrap">${steps.map((t, i) => `<span style="padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;background:${i + 1 === n ? '#e0415a' : i + 1 < n ? '#c6f6d5' : '#e2e8f0'};color:${i + 1 === n ? '#fff' : i + 1 < n ? '#22543d' : '#4a5568'}">${i + 1 < n ? '✓' : i + 1}. ${t}</span>`).join('')}</div>`;
}

const starText = n => '★'.repeat(n) + '☆'.repeat(5 - n);

function renderTimeline(b) {
  if (b.status === 'Cancelled') return '';
  const steps = ['Booked', 'Payment sent', 'Approved', 'Completed'];
  const cur = b.completed ? 3 : String(b.status).includes('Approved') ? 2 : String(b.status).startsWith('Payment') ? 1 : 0;
  return `<ol aria-label="Booking progress" style="list-style:none;display:flex;margin:14px 0 6px;padding:0;max-width:440px;min-width:260px">${steps.map((s, i) => {
    const done = i < cur || (b.completed && i === 3);
    const current = i === cur && !done;
    const circle = done ? 'background:#e0415a;color:#fff;border:2px solid #e0415a' : current ? 'background:#fff;color:#c0293f;border:2px solid #e0415a' : 'background:#e2e8f0;color:#4a5568;border:2px solid #e2e8f0';
    return `<li ${current ? 'aria-current="step"' : ''} style="flex:1;text-align:center;position:relative;font-size:11px;font-weight:600;color:${done || current ? '#1b263b' : '#64748b'}">
      ${i > 0 ? `<span aria-hidden="true" style="position:absolute;top:13px;left:-50%;width:100%;height:2px;background:${i <= cur ? '#e0415a' : '#e2e8f0'}"></span>` : ''}
      <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;font-size:12px;font-weight:700;${circle}">${done ? '✓' : i + 1}</span>
      <div style="margin-top:4px">${s}<span class="sr-only"> (${done ? 'done' : current ? 'current step' : 'not yet'})</span></div></li>`;
  }).join('')}</ol>`;
}

function renderPlaceReviews(place, list) {
  const count = list.length;
  const avg = count ? list.reduce((t, r) => t + r.stars, 0) / count : 0;
  return `<section aria-labelledby="place-reviews-title" style="margin-top:28px;border-top:1px solid #e2e8f0;padding-top:20px">
    <h3 id="place-reviews-title" style="font-size:16px;font-weight:700;color:#131c38;margin:0 0 6px">Traveler reviews</h3>
    ${count ? `<p style="font-size:14px;margin:0 0 14px;color:#1b263b"><span aria-hidden="true" style="color:#d97706;font-size:18px">${starText(Math.round(avg))}</span> <strong>${avg.toFixed(1)}</strong> out of 5 &middot; ${count} review${count === 1 ? '' : 's'}</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px">${list.slice().reverse().map(r => `<article style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px">
        <div style="display:flex;justify-content:space-between;gap:8px;font-size:13px"><strong>${escapeHtml(r.name)}</strong><span style="color:#64748b;font-size:12px">${escapeHtml(new Date(r.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))}</span></div>
        <div role="img" aria-label="${r.stars} out of 5 stars" style="color:#d97706;font-size:14px;margin:2px 0 6px">${starText(r.stars)}</div>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#4a5568;white-space:pre-line">${escapeHtml(r.comment)}</p></article>`).join('')}</div>`
    : '<p style="font-size:13px;color:#64748b;margin:0">No reviews yet. Guests can review a trip from My Bookings once it is completed.</p>'}</section>`;
}

export function renderCompareTable(places, ratings = {}) {
  const lowest = Math.min(...places.map(p => Number(p.numericPrice) || Infinity));
  const rows = [
    ['Price per adult', p => `<strong style="color:#c0293f;font-size:15px">₱${Number(p.numericPrice).toLocaleString()}</strong>${Number(p.numericPrice) === lowest && places.length > 1 ? ' <span style="background:#c6f6d5;color:#22543d;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px">Lowest</span>' : ''}`],
    ['Discount', p => (Number(p.discount) ? `${Number(p.discount)}% off` : 'None')],
    ['Duration', p => escapeHtml(p.duration || '')],
    ['Package type', p => escapeHtml(p.packageType || '')],
    ['Category', p => escapeHtml(p.category || '')],
    ['Location', p => escapeHtml(p.location || '')],
    ['Guest rating', p => (ratings[p.id] ? `<span style="color:#d97706">★</span> <strong>${ratings[p.id].avg.toFixed(1)}</strong> (${ratings[p.id].count})` : '<span style="color:#64748b">No reviews yet</span>')],
    ['Best time to visit', p => (p.bestTime ? escapeHtml(p.bestTime) : '<span style="color:#64748b">-</span>')],
    ['Included', p => ((p.amenities || []).length ? `<ul style="margin:0;padding-left:16px">${p.amenities.map(a => `<li>${escapeHtml(a)}</li>`).join('')}</ul>` : '-')],
    ['Optional add-ons', p => ((p.addons || []).length ? p.addons.map(a => escapeHtml(a.name)).join(', ') : 'None')],
    ['', p => `<button type="button" class="btn btn-continue" data-id="${escapeHtml(p.id)}" onclick="viewPlaceDetail(this.dataset.id)">View details</button>`]
  ];
  const edge = '2px solid #e0415a';
  const col = (first, last) => `border-left:${edge};border-right:${edge};${first ? `border-top:${edge};border-radius:12px 12px 0 0;` : ''}${last ? `border-bottom:${edge};border-radius:0 0 12px 12px;` : ''}`;
  return `<div style="overflow-x:auto"><table style="width:100%;table-layout:fixed;border-collapse:separate;border-spacing:12px 0;font-size:13px;color:#1b263b;min-width:${places.length * 240 + 140}px"><colgroup><col style="width:140px">${places.map(() => '<col>').join('')}</colgroup>
    <thead><tr><th scope="col"><span class="sr-only">Feature</span></th>${places.map(p => `<th scope="col" style="text-align:left;padding:12px;vertical-align:bottom;font-size:14px;${col(true, false)}"><div role="img" aria-label="${escapeHtml(p.name)}" style="height:90px;border-radius:8px;background:url('${escapeHtml(p.image)}') center/cover;margin-bottom:8px"></div>${escapeHtml(p.name)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(([label, f], i) => `<tr><th scope="row" style="text-align:left;padding:8px;color:#64748b;font-weight:600;border-top:1px solid #edf2f7;white-space:nowrap;vertical-align:top">${label}</th>${places.map(p => `<td style="padding:8px 12px${i === rows.length - 1 ? ' 14px' : ''};border-top:1px solid #edf2f7;vertical-align:top;line-height:1.5;${col(false, i === rows.length - 1)}">${f(p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderBarChart(title, labels, values, money) {
  const w = 360, h = 190, pad = 24, max = Math.max(...values, 1), bw = (w - pad * 2) / values.length;
  const fmt = n => (money ? '₱' + (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : n) : n);
  const summary = labels.map((l, i) => `${l}: ${money ? '₱' + values[i].toLocaleString() : values[i]}`).join(', ');
  return `<figure style="margin:0;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px">
    <figcaption style="font-size:14px;font-weight:700;color:#131c38;margin-bottom:4px">${title}</figcaption>
    <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeHtml(title + '. ' + summary)}" style="width:100%;height:auto">
      <line x1="${pad}" y1="${h - 28}" x2="${w - pad}" y2="${h - 28}" stroke="#cbd5e0"/>
      ${values.map((val, i) => { const bh = Math.round((val / max) * (h - 80)), x = pad + i * bw + 8, y = h - 28 - bh, cx = x + (bw - 16) / 2; return `<rect x="${x}" y="${y}" width="${bw - 16}" height="${bh}" rx="4" fill="#e0415a"/><text x="${cx}" y="${y - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="#1b263b">${fmt(val)}</text><text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#4a5568">${labels[i]}</text>`; }).join('')}
    </svg></figure>`;
}

function renderAdminCharts(all) {
  const live = all.filter(b => b.status !== 'Cancelled');
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1));
  const key = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  const labels = months.map(d => d.toLocaleString('en-US', { month: 'short' }));
  const counts = months.map(() => 0), revenue = months.map(() => 0);
  const num = b => parseInt(String(b.total).replace(/[^0-9]/g, ''), 10) || 0;
  live.forEach(b => {
    const i = months.findIndex(m => key(m) === key(new Date(b.createdAt || b.date + 'T00:00:00')));
    if (i < 0) return;
    counts[i]++;
    if (String(b.status).includes('Approved')) revenue[i] += num(b);
  });
  const byPlace = {};
  live.forEach(b => { const name = String(b.destination).replace(/ \([^()]*\)$/, ''); byPlace[name] = (byPlace[name] || 0) + 1; });
  const top = Object.entries(byPlace).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topMax = top.length ? top[0][1] : 1;
  return `<div style="margin-top:20px">
    <h3 style="font-size:18px;font-weight:700;color:#131c38;margin:0 0 4px">Bookings &amp; revenue</h3>
    <p style="font-size:12px;color:#64748b;margin:0 0 12px">Last 6 months. Cancelled bookings are left out, and revenue counts approved bookings only.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px">
      ${renderBarChart('Bookings per month', labels, counts, false)}
      ${renderBarChart('Revenue per month', labels, revenue, true)}
      <figure style="margin:0;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px">
        <figcaption style="font-size:14px;font-weight:700;color:#131c38;margin-bottom:4px">Most booked destinations</figcaption>
        ${top.length ? `<p style="font-size:13px;margin:0 0 10px;color:#1b263b">Top pick: <strong>${escapeHtml(top[0][0])}</strong> (${top[0][1]} booking${top[0][1] === 1 ? '' : 's'})</p>
        <ol style="list-style:none;margin:0;padding:0;display:grid;gap:8px">${top.map(([name, n]) => `<li style="font-size:12px;color:#1b263b"><div style="display:flex;justify-content:space-between;gap:8px"><span>${escapeHtml(name)}</span><strong>${n}</strong></div><div aria-hidden="true" style="height:8px;background:#edf2f7;border-radius:4px;margin-top:3px"><div style="height:8px;width:${Math.round((n / topMax) * 100)}%;background:#e0415a;border-radius:4px"></div></div></li>`).join('')}</ol>`
        : '<p style="font-size:13px;color:#64748b;margin:0">No bookings yet.</p>'}
      </figure>
    </div></div>`;
}

export function renderPlaceRow(place, favs = [], compare = [], rating = null) {
  return `
    <div class="place-row-card" role="button" tabindex="0" style="cursor: pointer;" onclick="viewPlaceDetail('${place.id}')">
      <div class="card-thumbnail" role="img" aria-label="${place.name}" style="background-image: url('${place.image}');"></div>
      <div class="card-body">
        <div class="card-header">
          <h3>${place.name}</h3>
          <div class="stars" role="img" aria-label="${place.stars.length} out of 5 stars">${place.stars}</div><button class="fav-btn" title="Save destination" onclick="event.stopPropagation(); toggleFavorite('${place.id}')" style="background:none;border:none;font-size:20px;color:#c0293f;cursor:pointer">${favs.includes(place.id) ? '♥' : '♡'}</button>
        </div>
        <span class="location">${place.location}</span>
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:-4px 0 8px;font-size:12px;color:#1b263b">${rating ? `<span><span aria-hidden="true" style="color:#d97706">★</span> <strong>${rating.avg.toFixed(1)}</strong> (${rating.count} review${rating.count === 1 ? '' : 's'})</span>` : ''}<label class="compare-chip" onclick="event.stopPropagation()"><input type="checkbox" ${compare.includes(place.id) ? 'checked' : ''} onchange="toggleCompare('${place.id}', this)" /> Compare</label></div>
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
    <div id="login-modal" role="dialog" aria-modal="true" aria-label="Log in or register" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">
      <div id="login-box" style="background: #ffffff; padding: 32px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative;">
        <button type="button" aria-label="Close" onclick="closeLoginModal()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 18px; font-weight: bold; cursor: pointer; color: #64748b;">&times;</button>
        
        <h2 style="font-size: 22px; font-weight: 700; color: #131c38; margin-bottom: 8px;">Welcome Back</h2>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 14px;">Log in to manage your bookings and access secret deals.</p>
        
        <div style="background: #f8fafc; border: 1px dashed #cbd5e0; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 11px; color: #4a5568; line-height: 1.4;">
          <strong>Sample Accounts for Testing:</strong><br>
          • admin@travelaya.com / admin123 (Admin)<br>
          • BeatrizMarie@gmail.com / password123 (Beatriz)<br>
          • KarlaMae@gmail.com / password123 (Karla)<br>
          • RhonaAngelica@gmail.com / password123 (Rhona)
        </div>
        
        <form onsubmit="handleLoginSubmit(event)" novalidate>
          <div style="margin-bottom: 16px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 6px;">Email Address</label>
            <input type="email" id="login-email" aria-label="Email address" value="BeatrizMarie@gmail.com" placeholder="name@example.com" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 6px;">Password</label>
            <input type="password" id="login-password" aria-label="Password" value="password123" placeholder="••••••••" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <button type="submit" style="width: 100%; background: #e0415a; color:#fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s;">Log In</button>
        </form>
        <p style="text-align: center; font-size: 13px; color: #64748b; margin-top: 16px;">
          Don't have an account? <a href="#" onclick="switchToRegister(event)" style="color: #c0293f; font-weight: 600; text-decoration: none;">Register Now</a>
        </p>
      </div>

      <div id="register-box" style="display: none; background: #ffffff; padding: 32px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative;">
        <button type="button" aria-label="Close" onclick="closeLoginModal()" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 18px; font-weight: bold; cursor: pointer; color: #64748b;">&times;</button>
        
        <h2 style="font-size: 22px; font-weight: 700; color: #131c38; margin-bottom: 8px;">Create an Account</h2>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 20px;">Join TraveLaya to start booking your next adventure.</p>
        
        <form onsubmit="handleRegisterSubmit(event)" novalidate>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Full Name</label>
            <input type="text" id="reg-name" aria-label="Full name" placeholder="John Doe" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Email Address</label>
            <input type="email" id="reg-email" aria-label="Email address" placeholder="name@example.com" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; font-weight: 600; color: #4a5568; display: block; margin-bottom: 4px;">Password</label>
            <input type="password" id="reg-password" aria-label="Password" placeholder="••••••••" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" />
          </div>
          
          <button type="submit" style="width: 100%; background: #e0415a; color:#fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 14px; cursor: pointer; transition: background 0.2s;">Sign Up</button>
        </form>
        <p style="text-align: center; font-size: 13px; color: #64748b; margin-top: 16px;">
          Already have an account? <a href="#" onclick="switchToLogin(event)" style="color: #c0293f; font-weight: 600; text-decoration: none;">Log In</a>
        </p>
      </div>
    </div>
  `;
}

export function renderItineraryColumns(itineraryData) {
  const daysMap = {};
  itineraryData.forEach((item) => {
    const dayKey = item.dayGroup || (item.day.includes('Day') ? item.day.split('(')[0].trim() : 'Day 1');
    if (!daysMap[dayKey]) daysMap[dayKey] = [];
    daysMap[dayKey].push(item);
  });
  const days = Object.entries(daysMap);
  return `<div class="itinerary-grid" style="--cols:${days.length}">${days.map(([dayName, items]) => `
    <div class="it-day"><h4>${escapeHtml(dayName)}</h4><div class="it-items">${items.map(sub => `
      <div class="it-item"><span>${escapeHtml(sub.day)}</span><strong>${escapeHtml(sub.title)}</strong><p>${escapeHtml(sub.details)}</p></div>`).join('')}
    </div></div>`).join('')}</div>`;
}

function renderAdminCalendar(bookings, blocked, month) {
  const y = month.getFullYear(), m = month.getMonth(), pad = n => String(n).padStart(2, '0');
  const live = bookings.filter(b => b.status !== 'Cancelled');
  const byDay = {};
  live.forEach(b => { (byDay[b.date] = byDay[b.date] || []).push(b); });
  const blockedAll = new Set(Object.values(blocked).flat());
  const prefix = `${y}-${pad(m + 1)}-`;
  const pax = b => Number(b.adults || 0) + Number(b.children || 0);
  let cells = '<span></span>'.repeat(new Date(y, m, 1).getDay());
  for (let d = 1, last = new Date(y, m + 1, 0).getDate(); d <= last; d++) {
    const ds = prefix + pad(d), list = byDay[ds] || [];
    const tip = list.map(b => `${b.name} - ${b.destination} (${pax(b)} pax)`).join('\n');
    const dark = !list.length && blockedAll.has(ds);
    cells += `<div title="${escapeHtml(tip)}" style="background:${list.length ? '#ffe4e7' : dark ? '#131c38' : '#f8fafc'};color:${dark ? '#fff' : '#1b263b'};border-radius:8px;padding:6px 2px;min-height:44px;font-size:12px;text-align:center">${d}${list.length ? `<div style="font-weight:800;color:#c53030">${list.length}</div>` : ''}</div>`;
  }
  const monthList = live.filter(b => String(b.date).startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
  const nav = 'background:#fff;border:1px solid #cbd5e0;border-radius:6px;width:32px;height:32px;cursor:pointer;font-weight:bold';
  return `<div style="background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.04);margin-top:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h3 style="font-size:18px;font-weight:700;color:#131c38;margin:0">Travel calendar</h3>
      <div style="display:flex;align-items:center;gap:10px"><button type="button" aria-label="Previous month" onclick="adminCalNav(-1)" style="${nav}">&#10094;</button><strong>${new Date(y, m, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</strong><button type="button" aria-label="Next month" onclick="adminCalNav(1)" style="${nav}">&#10095;</button></div></div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px;color:#64748b;margin-bottom:4px">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(x => `<span>${x}</span>`).join('')}</div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">${cells}</div>
    <p style="font-size:11px;color:#64748b">Pink = days with bookings (number of bookings, hover for details). Navy = blocked dates.</p>
    ${monthList.length ? monthList.map(b => `<div style="font-size:13px;padding:6px 0;border-top:1px solid #edf2f7"><strong>${escapeHtml(b.date)}</strong> - ${escapeHtml(b.destination)} - ${escapeHtml(b.name)} (${pax(b)} pax) - ${escapeHtml(b.status)}</div>`).join('') : '<p style="font-size:13px;color:#a0aec0">No bookings this month.</p>'}</div>`;
}

function renderAdminPlaces() {
  const list = Object.values(allPlacesData);
  return `<div style="background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.04);margin-top:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px"><h3 style="font-size:18px;font-weight:700;color:#131c38;margin:0">Manage destinations (${list.length})</h3><button type="button" class="btn btn-continue" onclick="openPlaceForm()">+ Add destination</button></div>
    ${list.map(p => `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 0;border-top:1px solid #edf2f7;font-size:13px"><span><strong>${escapeHtml(p.name)}</strong> <span style="color:#64748b">${escapeHtml(p.location)} | ${escapeHtml(p.price)} | ${Number(p.discount) || 0}% off</span></span><span><button type="button" class="btn btn-cancel" data-id="${escapeHtml(p.id)}" onclick="openPlaceForm(this.dataset.id)">Edit</button> <button type="button" class="btn" data-id="${escapeHtml(p.id)}" onclick="deletePlace(this.dataset.id)" style="background:#fff;color:#c0293f;border:1.5px solid #c0293f">Delete</button></span></div>`).join('')}</div>`;
}

const fieldStyle = 'width:100%;padding:12px;border:1px solid #cbd5e0;border-radius:8px;font-size:14px;box-sizing:border-box;font-family:inherit';

function renderAdminInquiries(inquiries) {
  const statuses = ['New', 'Contacted', 'Closed'];
  return `<div style="background:#fff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;box-shadow:0 4px 15px rgba(0,0,0,0.04);margin-top:20px">
    <h3 style="font-size:18px;font-weight:700;color:#131c38;margin:0">Group &amp; custom trip inquiries (${inquiries.length})</h3>
    ${inquiries.length ? inquiries.map(i => `<div style="border:1px solid #cbd5e0;border-radius:12px;padding:14px 16px;margin-top:12px;background:#f8fafc;font-size:13px;color:#1b263b;line-height:1.6">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><strong>${escapeHtml(i.id)} - ${escapeHtml(i.name)}</strong><span style="color:#64748b">${escapeHtml(new Date(i.createdAt).toLocaleString())}</span></div>
      <div>${escapeHtml(i.tripType || 'Trip')} | ${escapeHtml(i.destination || 'No destination chosen')} | ${Number(i.groupSize) || 0} pax${i.date ? ' | ' + escapeHtml(i.date) : ''}${i.budget ? ' | budget ₱' + Number(i.budget).toLocaleString() + ' per person' : ''}</div>
      <div>${escapeHtml(i.contact)} | <a href="${escapeHtml('mailto:' + i.email + '?subject=' + encodeURIComponent('Your TraveLaya inquiry ' + i.id))}" style="color:#131c38">${escapeHtml(i.email)}</a></div>
      <p style="margin:6px 0;white-space:pre-line">${escapeHtml(i.message)}</p>
      <select data-id="${escapeHtml(i.id)}" aria-label="Inquiry status" onchange="setInquiryStatus(this.dataset.id, this.value)" style="padding:6px 10px;border:1px solid #cbd5e0;border-radius:8px">${statuses.map(s => `<option ${s === i.status ? 'selected' : ''}>${s}</option>`).join('')}</select></div>`).join('') : '<p style="font-size:13px;color:#a0aec0;margin-top:10px">No inquiries yet.</p>'}</div>`;
}

const faqs = [
  ['How do I cancel or modify my booking?', 'You can cancel your booking or request a date change from My Bookings up to 48 hours before your travel date. Date changes depend on availability and need admin approval; your original date stays valid until the change is approved.'],
  ['How do I pay?', 'After you confirm your booking, pay by GCash, Maya, card, or bank transfer using your booking reference, then enter the transaction number from your receipt. We verify it and mark your booking as approved.'],
  ['When is my booking confirmed?', 'A booking starts as "Pending Payment Confirmation". Once you submit your payment details and an admin verifies them, the status changes to "Approved / Paid Confirmed".'],
  ['How much do children pay?', 'Children aged 0-2 are free. Children aged 3-11 pay 50% of the adult rate.'],
  ['How do I use a promo code?', 'Enter your code in the Promo / Discount Code box on the booking form and press Apply. The discount shows in your total before you review the booking.'],
  ['Where is the pickup and what time do we leave?', 'Choose a pickup point and departure time on the booking form. Both appear on your booking and voucher. Most Bataan tours leave in the early morning; Baguio tours leave late at night.'],
  ['How many guests can join on one date?', 'Each destination has a limit on guests per travel date. The booking calendar shows how many slots are left when a date is almost full, and full dates cannot be selected.'],
  ['How do I leave a review?', 'After your trip is marked as completed, a Write a review button appears on your booking in My Bookings. Reviews show on the destination page.'],
  ['What is included in a package?', 'Each destination page lists its included amenities. Meals marked "Pax account", optional add-ons, and personal expenses are not included.']
];
const renderFaqItem = ([q, a]) => `
        <div class="faq-item" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #f8fafc;">
          <button class="faq-question" aria-expanded="false" style="width: 100%; text-align: left; padding: 16px 20px; background: none; border: none; font-size: 15px; font-weight: 700; color: #1b263b; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>${q}</span><span class="faq-icon" style="color: #c0293f; font-size: 18px;">+</span>
          </button>
          <div class="faq-answer" style="display: none; padding: 0 20px 16px 20px; font-size: 13px; color: #4a5568; line-height: 1.6;">${a}</div>
        </div>`;

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

      <div class="filter-bar" style="display: grid; grid-template-columns: 2fr 2fr 2.5fr 1fr 1fr auto; gap: 12px; align-items: center; background: #f8fafc; padding: 14px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Category</label>
          <select id="filter-category" aria-label="Category" onchange="applyFilters()" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px; color: #1b263b;">
            <option value="">Type of promotion</option>
            <option value="Nature">Nature</option>
            <option value="Heritage">Heritage</option>
          </select>
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Location</label>
          <select id="filter-location" aria-label="Location" onchange="applyFilters()" style="width: 100%; padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px; color: #1b263b;">
            <option value="">Location</option>
            <option value="Philippines">Philippines</option>
            <option value="Benguet">Benguet</option>
            <option value="Bataan">Bataan</option>
          </select>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b;">Min Discount</label>
            <span id="discount-val-label" style="font-size: 11px; font-weight: 700; color: #c0293f;">Any</span>
          </div>
          <input type="range" id="filter-discount" aria-label="Minimum discount" min="0" max="50" step="5" value="0" oninput="applyFilters()" style="width: 100%; accent-color: #e0415a; cursor: pointer;" />
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Min Price</label>
          <input type="number" id="filter-min-price" aria-label="Minimum price" value="0" min="0" oninput="applyFilters()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px;" />
        </div>

        <div>
          <label style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">Max Price</label>
          <input type="number" id="filter-max-price" aria-label="Maximum price" value="60000" min="0" oninput="applyFilters()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e0; background: #fff; font-size: 12px;" />
        </div>

        <div style="padding-top: 14px;">
          <button onclick="resetFilters()" style="background: #e0415a; color:#fff; border: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">Reset</button>
        </div>
      </div>

      <div class="carousel-container">
        <div class="cards-wrapper grid" id="filtered-results-container">
          ${Object.values(allPlacesData).map(renderFilterableCard).join('')}
        </div>
      </div>
    </section>

    <section class="places-section">
      <div class="section-header">
        <h2>Top Featured Destinations</h2>
        <p class="subtitle">This week's most-booked places.</p>
      </div>
      <div class="carousel-container">
        <button aria-label="Scroll left" class="nav-arrow left-arrow" id="top-prev">&#10094;</button>
        <div class="cards-wrapper" id="top-carousel">
          ${topPlaces.map(p => allPlacesData[p.id]).filter(Boolean).map(renderCard).join('')}
        </div>
        <button aria-label="Scroll right" class="nav-arrow right-arrow" id="top-next">&#10095;</button>
      </div>
      <div class="carousel-dots" id="top-dots"></div>
    </section>

    <section class="places-section">
      <div class="section-header">
        <h2>Domestic Destinations</h2>
        <p class="subtitle">Explore top travel spots within the Philippines.</p>
      </div>
      <div class="carousel-container">
        <button aria-label="Scroll left" class="nav-arrow left-arrow" id="dom-prev">&#10094;</button>
        <div class="cards-wrapper" id="dom-carousel">
          ${Object.values(allPlacesData).filter(p => /philippines/i.test(p.location)).map(renderCard).join('')}
        </div>
        <button aria-label="Scroll right" class="nav-arrow right-arrow" id="dom-next">&#10095;</button>
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

    ${renderLoginModal()}
  `,

  places: `
    <div class="main-container">
      <div class="page-header">
        <h1>All Destinations</h1>
        <p class="subtitle">Scroll, search, or click a destination to view details.</p>
      </div>
      <div class="search-bar">
        <input type="text" id="search-input" aria-label="Search destinations" placeholder="Search destinations..." />
      </div>
      <div style="display:flex;gap:12px;margin-bottom:16px;align-items:center;flex-wrap:wrap">
        <select id="sort-select" aria-label="Sort destinations" style="padding:8px 12px;border:1px solid #cbd5e0;border-radius:8px;background:#fff">
          <option value="">Sort: Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="discount">Biggest discount</option>
        </select>
        <label style="font-size:13px;color:#4a5568;cursor:pointer"><input type="checkbox" id="saved-only" /> ♥ Saved only</label>
      </div>
      <div class="info-note" style="margin:0 0 16px">Planning for a group or want a custom trip? <a href="#/inquiry" style="color:#c0293f;font-weight:600">Send us an inquiry</a>.</div>
      <div class="places-list" id="places-list-container">
        ${Object.values(allPlacesData).map(p => renderPlaceRow(p)).join('')}
      </div>
    </div>
    <div id="compare-bar" class="compare-bar" role="region" aria-label="Compare destinations" hidden>
      <span id="compare-count" aria-live="polite"></span>
      <button type="button" class="btn btn-cancel" onclick="clearCompare()">Clear</button>
      <button type="button" id="compare-go" class="btn btn-continue" onclick="showCompare()" disabled>Compare now</button>
    </div>
    ${renderLoginModal()}
  `,

  blogs: `
    <div class="main-container">
      <div class="page-header">
        <h1>Travel Guides & Tips</h1>
        <p class="subtitle">Inspiration, itineraries, and local food recommendations from our experts.</p>
      </div>
      <div class="blogs-grid">
        ${blogsData.map((blog, i) => `
          <a href="#/blog/${i}" style="text-decoration: none; color: inherit; background: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
            <div style="height: 160px; background-size: cover; background-position: center; background-image: url('${blog.image}');"></div>
            <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 10px; color: #c0293f; font-weight: 700; text-transform: uppercase;">${blog.category}</span>
                <span style="font-size: 11px; color: #718096;">${blog.date}</span>
              </div>
              <h4 style="font-size: 15px; color: #1b263b; font-weight: 700; margin-bottom: 8px;">${blog.title}</h4>
              <p style="font-size: 13px; color: #64748b; line-height: 1.5; flex: 1;">${blog.excerpt}</p>
            </div>
          </a>
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
      <label for="faq-search" class="sr-only">Search the FAQ</label>
      <input type="search" id="faq-search" class="faq-search" placeholder="Search questions, e.g. refund, children, promo, pickup" autocomplete="off" />
      <p id="faq-count" aria-live="polite" style="font-size:12px;color:#64748b;margin:6px 2px 0;min-height:16px"></p>
      <div id="faq-none" hidden style="margin-top:14px;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;font-size:14px;color:#4a5568">No questions match your search. Try a different word, or <a href="#/inquiry" style="color:#c0293f;font-weight:600">send us an inquiry</a>.</div>
      <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 12px; margin-top: 14px;">${faqs.map(renderFaqItem).join('')}
      </div>
    </div>
    ${renderLoginModal()}
  `,

  getBlogView: (blog) => {
    if (!blog) return views.blogs;
    const paras = blog.body && blog.body.length ? blog.body : [blog.excerpt];
    return `
    <div class="main-container policy">
      <a href="#/blogs" class="back-btn" style="text-decoration:none;display:inline-block">← Back to guides</a>
      <div role="img" aria-label="${escapeHtml(blog.title)}" style="height:280px;border-radius:16px;background-size:cover;background-position:center;background-image:url('${blog.image}')"></div>
      <p style="font-size:12px;font-weight:700;color:#c0293f;margin:16px 0 4px"><span>${escapeHtml(blog.category)}</span> <span style="color:#718096;font-weight:500">${escapeHtml(blog.date)}</span></p>
      <h1 style="font-size:26px;font-weight:800;color:#131c38;margin:0 0 12px">${escapeHtml(blog.title)}</h1>
      ${paras.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
      <button class="book-now-main-btn" style="margin-top:16px" onclick="navigateTo('places')">Explore destinations</button>
    </div>
    ${renderLoginModal()}
  `;
  },

  getInquiryView: (places, prefill = {}) => `
    <div class="main-container">
      <div class="page-header"><h1>Group &amp; Custom Trips</h1><p class="subtitle">Planning for a group, a private tour, or a custom itinerary? Tell us what you need and we will get back to you.</p></div>
      <div class="reservation-box">
        <h2>Trip inquiry</h2>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div><label for="inq-name" style="font-size:13px;font-weight:600;color:#4a5568">Full name</label><input id="inq-name" value="${escapeHtml(prefill.name || '')}" style="${fieldStyle}" /></div>
          <div><label for="inq-email" style="font-size:13px;font-weight:600;color:#4a5568">Email</label><input id="inq-email" type="email" value="${escapeHtml(prefill.email || '')}" style="${fieldStyle}" /></div>
        </div>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div><label for="inq-contact" style="font-size:13px;font-weight:600;color:#4a5568">Contact number</label><input id="inq-contact" type="tel" placeholder="e.g. 09123456789" style="${fieldStyle}" /></div>
          <div><label for="inq-destination" style="font-size:13px;font-weight:600;color:#4a5568">Destination</label><select id="inq-destination" style="${fieldStyle};background:#fff">${places.map(p => `<option>${escapeHtml(p.name)}</option>`).join('')}<option>Custom itinerary / not sure yet</option></select></div>
        </div>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div><label for="inq-date" style="font-size:13px;font-weight:600;color:#4a5568">Preferred travel date (optional)</label><input id="inq-date" type="date" style="${fieldStyle}" /></div>
          <div><label for="inq-size" style="font-size:13px;font-weight:600;color:#4a5568">Number of travelers</label><input id="inq-size" type="number" min="1" value="10" style="${fieldStyle}" /></div>
        </div>
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div><label for="inq-type" style="font-size:13px;font-weight:600;color:#4a5568">Trip type</label><select id="inq-type" style="${fieldStyle};background:#fff"><option>Group tour</option><option>Private tour</option><option>Corporate / team building</option><option>School / org trip</option><option>Other</option></select></div>
          <div><label for="inq-budget" style="font-size:13px;font-weight:600;color:#4a5568">Budget per person in PHP (optional)</label><input id="inq-budget" type="number" min="0" style="${fieldStyle}" /></div>
        </div>
        <div class="form-group"><label for="inq-message">What would you like us to know?</label><textarea id="inq-message" rows="5" maxlength="1000" placeholder="Pickup location, preferred stops, special requests..." style="${fieldStyle}"></textarea></div>
        <div class="action-buttons"><button type="button" class="btn btn-cancel" onclick="navigateTo('places')">Cancel</button><button type="button" class="btn btn-continue" onclick="submitInquiry()">Send inquiry</button></div>
      </div>
    </div>
    ${renderLoginModal()}
  `,

  policies: `
    <div class="main-container policy">
      <div class="page-header"><h1>Cancellation, Refunds, Terms &amp; Privacy</h1><p class="subtitle">Draft policies. Review and edit before launch.</p></div>
      <h2>Cancellations and date changes</h2>
      <p>You can cancel or request a new date from My Bookings up to 48 hours before travel. Date changes need admin approval and depend on availability.</p>
      <h2>Refunds</h2>
      <p>[Add your refund terms here, for example what percentage is returned and how long it takes.]</p>
      <h2>Payments</h2>
      <p>Payments are verified manually using the transaction number you submit. Your booking is confirmed only after verification.</p>
      <h2>Privacy</h2>
      <p>We collect your name, email, and contact number to process bookings. [Add how data is stored, shared, and how to request deletion.]</p>
    </div>
    ${renderLoginModal()}
  `,

  getPaymentView: (b) => {
    const info = paymentInfo[b.paymentMethod];
    const amount = String(b.total).replace(/[^0-9.]/g, '');
    const row = (label, value, copy) => `<div class="pay-row"><div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>${copy ? `<button type="button" class="copy-btn" data-copy="${escapeHtml(copy)}" aria-label="Copy ${escapeHtml(label)}" onclick="copyText(this.dataset.copy, this)">Copy</button>` : ''}</div>`;
    const qr = info && info.qr
      ? `<div class="pay-qr"><img src="${escapeHtml(info.qr)}" alt="${escapeHtml(b.paymentMethod)} QR code for TraveLaya Tours" /></div>`
      : `<div class="pay-qr" role="img" aria-label="QR code placeholder"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1"/></svg><span style="margin-top:8px">QR code will appear here.<br>Use the number instead.</span></div>`;
    const details = info
      ? `<div class="pay-card">${qr}<div>
          <h3 style="margin:0 0 6px;font-size:16px;color:#131c38">${escapeHtml(b.paymentMethod)} details</h3>
          ${info.bank ? row('Bank', info.bank) : ''}
          ${row('Account name', info.accountName)}
          ${row(info.kind === 'bank' ? 'Account number' : 'Mobile number', info.number, info.number.replace(/\s/g, ''))}
          ${row('Amount to send', b.total, amount)}
          ${row('Payment note / reference', b.referenceId, b.referenceId)}
        </div></div>
        <ol class="pay-steps"><li>Open ${escapeHtml(b.paymentMethod)} and send exactly <strong>${escapeHtml(b.total)}</strong>${info.qr ? ' (scan the QR code or use the number)' : ''}.</li><li>Put <strong>${escapeHtml(b.referenceId)}</strong> in the note so we can match your payment.</li><li>Enter the transaction number from your receipt below and attach a screenshot.</li></ol>`
      : `<div class="pay-card" style="grid-template-columns:1fr"><div><h3 style="margin:0 0 6px;font-size:16px;color:#131c38">Card payment</h3><p style="margin:0;font-size:14px;line-height:1.6;color:#4a5568">A secure payment link for <strong>${escapeHtml(b.total)}</strong> will be emailed to you. Use <strong>${escapeHtml(b.referenceId)}</strong> as your reference, then enter the confirmation number from your receipt below.</p></div></div>`;
    return `
      <div class="main-container">
        <div class="page-header"><h1>Payment</h1><p class="subtitle">Booking <strong>${escapeHtml(b.referenceId)}</strong> | ${escapeHtml(b.destination)}</p></div>
        ${renderStepper(3)}
        <div class="reservation-box">
          <h2>Pay via ${escapeHtml(b.paymentMethod)}</h2>
          ${details}
          <div class="form-group"><label for="payment-txn-ref">Transaction / Reference Number</label>
            <input type="text" id="payment-txn-ref" placeholder="e.g. 1234 567 890" style="width:100%;padding:12px;border:1px solid #cbd5e0;border-radius:8px;font-size:14px;box-sizing:border-box" /></div>
          <div class="form-group"><label for="payment-proof">Receipt screenshot (required)</label>
            <input type="file" id="payment-proof" accept="image/*" style="width:100%;font-size:13px" /></div>
          <div class="action-buttons">
            <button type="button" class="btn btn-cancel" onclick="navigateTo('myBookings')">Pay Later</button>
            <button type="button" class="btn btn-continue" onclick="submitPaymentProof()">Submit Payment Details</button>
          </div>
        </div>
      </div>
      ${renderLoginModal()}
    `;
  },

  getMyBookingsView: (bookings, reviews = []) => {
    return `
      <div class="main-container">
        <div class="page-header">
          <h1>My Bookings</h1>
          <p class="subtitle">View all your confirmed reservations and reference IDs.</p>
        </div>
        ${bookings.length === 0 ? `
          <div style="text-align: center; padding: 50px 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; margin-top: 20px;">
            <p style="font-size: 16px; color: #64748b; margin-bottom: 16px;">You don't have any bookings yet.</p>
            <button onclick="navigateTo('places')" style="background: #e0415a; color:#fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer;">Explore Destinations</button>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
            ${bookings.map(b => {
              const guests = `${b.adults} adult${Number(b.adults) === 1 ? '' : 's'}` + (Number(b.children) > 0 ? `, ${b.children} child${Number(b.children) === 1 ? '' : 'ren'}` : '');
              const extras = [
                (b.addons && b.addons.length) ? `Add-ons: <strong>${b.addons.map(escapeHtml).join(', ')}</strong>` : '',
                b.promo ? `Promo: <strong>${escapeHtml(b.promo)}</strong>` : ''
              ].filter(Boolean).join(' | ');
              const approved = String(b.status).includes('Approved');
              const cancelled = b.status === 'Cancelled';
              const completed = !!b.completed;
              const reviewed = reviews.some(r => r.ref === b.referenceId);
              const daysLeft = (new Date(b.date + 'T00:00:00') - new Date()) / 864e5;
              const canChange = !cancelled && !completed && daysLeft >= 2;
              const btn = (label, fn, bg) => `<button data-ref="${escapeHtml(b.referenceId)}" onclick="${fn}(this.dataset.ref)" style="${bg === 'ghost' ? 'background:#fff;color:#131c38;border:1.5px solid #c0293f' : 'background:#e0415a;color:#fff;border:1.5px solid #e0415a'};padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;margin:8px 6px 0 0">${label}</button>`;
              const actions = cancelled ? '' : `<div>${b.changeNote ? `<p style="font-size:12px;color:#4a5568;margin:8px 0 0">${escapeHtml(b.changeNote)}</p>` : ''}${approved ? btn('View voucher', 'showVoucher', '#e0415a') : ''}${completed ? (reviewed ? '<small style="color:#22543d;font-weight:600;margin:8px 6px 0 0;display:inline-block">★ You reviewed this trip</small>' : btn('Write a review', 'openReviewForm', '#e0415a')) : ''}${String(b.status).startsWith('Pending') ? btn('Pay now', 'payBooking', '#e0415a') : ''}${canChange ? (b.changeRequest ? `<small style="color:#b7791f;margin-right:6px">⏳ Date change to <strong>${escapeHtml(b.changeRequest.date)}</strong> awaiting admin approval.</small>` + btn('Withdraw request', 'withdrawDateChange', 'ghost') : btn('Request date change', 'modifyBookingDate', '#e0415a')) + btn('Cancel booking', 'cancelBooking', 'ghost') : (completed ? '' : '<small style="color:#a0aec0">Changes closed (within 48 hours of travel)</small>')}</div>`;
              return `
              <div style="background: #ffffff; border: 1px solid #cbd5e0; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div>
                  <span style="background: #e2e8f0; color: #1b263b; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase;">Ref: ${escapeHtml(b.referenceId)}</span>
                  <h3 style="font-size: 18px; color: #1b263b; margin: 8px 0 4px 0;">${escapeHtml(b.destination)}</h3>
                  <p style="font-size: 13px; color: #64748b; margin: 0;">Package: <strong>${escapeHtml(b.packageType)}</strong> | Travel Date: <strong>${escapeHtml(b.date)}</strong></p>
                  <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">Guests: <strong>${guests}</strong>${extras ? ' | ' + extras : ''}</p>
                  ${b.pickupPoint ? `<p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">Pickup: <strong>${escapeHtml(b.pickupPoint)}</strong> at <strong>${escapeHtml(b.pickupTime)}</strong></p>` : ''}
                  <p style="font-size: 12px; font-weight: 700; margin: 6px 0 0 0; color: ${approved ? '#22543d' : '#b7791f'};">${approved ? '✓' : cancelled ? '✕' : '⏳'} ${escapeHtml(completed ? 'Completed' : b.status)}</p>${renderTimeline(b)}${actions}
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 12px; color: #718096; display: block;">${approved ? 'Total Paid' : cancelled ? 'Cancelled' : 'Total Amount Due'}</span>
                  <strong style="font-size: 20px; color: #c0293f;">${escapeHtml(b.total)}</strong>
                </div>
              </div>
            `;
            }).join('')}
          </div>
        `}
      </div>
      ${renderLoginModal()}
    `;
  },

  getAdminView: (accounts, blockedDates = {}, statusFilter = 'All', calMonth = new Date(), inquiries = []) => {
    const allBookings = [];
    accounts.forEach(acc => {
      if (acc.bookings && acc.bookings.length > 0) {
        acc.bookings.forEach(b => {
          allBookings.push({ ...b, userEmail: acc.email, userName: acc.name });
        });
      }
    });
    const num = b => parseInt(String(b.total).replace(/[^0-9]/g, ''), 10) || 0;
    const waiting = allBookings.filter(b => /^(Pending|Payment)/.test(b.status));
    const stats = [['Total bookings', allBookings.length], ['Awaiting payment / verification', waiting.length], ['Revenue (approved)', '₱' + allBookings.filter(b => b.status.includes('Approved')).reduce((t, b) => t + num(b), 0).toLocaleString()], ['Cancelled', allBookings.filter(b => b.status === 'Cancelled').length], ['Date change requests', allBookings.filter(b => b.changeRequest && b.status !== 'Cancelled').length], ['New inquiries', inquiries.filter(i => i.status === 'New').length], ['Completed trips', allBookings.filter(b => b.completed).length]];
    const shown = allBookings.filter(b => statusFilter === 'All' || (statusFilter === 'Waiting' ? /^(Pending|Payment)/.test(b.status) : statusFilter === 'Approved' ? b.status.includes('Approved') : b.status === 'Cancelled'));


    return `
      <div class="main-container">
        <div class="page-header">
          <h1>Admin Dashboard</h1>
          <p class="subtitle">Manage user bookings and control per-destination tour date availability.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:20px">
          ${stats.map(([k, v]) => `<div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px"><div style="font-size:12px;color:#64748b;font-weight:600">${k}</div><div style="font-size:26px;font-weight:800;color:#c0293f">${v}</div></div>`).join('')}
        </div>
        ${renderAdminCharts(allBookings)}
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
              <button type="button" onclick="toggleDateAvailability(document.getElementById('admin-target-place').value, document.getElementById('admin-target-date').value)" style="background: #e0415a; color:#fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Toggle Date Status</button>
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

        ${renderAdminCalendar(allBookings, blockedDates, calMonth)}
        ${renderAdminPlaces()}
        ${renderAdminInquiries(inquiries)}
        <div style="background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 15px rgba(0,0,0,0.04); margin-top: 20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px"><h3 style="font-size:18px;font-weight:700;color:#131c38;margin:0">Customer Bookings (${shown.length})</h3>
            <button type="button" class="btn btn-cancel" onclick="exportBookingsCsv()">Export all (CSV)</button>
            <select onchange="setAdminFilter(this.value)" style="padding:8px 12px;border:1px solid #cbd5e0;border-radius:8px">${[['All', 'All statuses'], ['Waiting', 'Awaiting payment'], ['Approved', 'Approved'], ['Cancelled', 'Cancelled']].map(([v, l]) => `<option value="${v}" ${v === statusFilter ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
          ${allBookings.length === 0 ? `<p style="color: #64748b; font-size: 14px; text-align: center; padding: 30px;">No bookings found yet.</p>` : `
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${shown.map(b => `
                <div style="background: #f8fafc; border: 1px solid #cbd5e0; border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                  <div>
                    <span style="background: #131c38; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px;">${escapeHtml(b.referenceId)}</span>
                    <h4 style="font-size: 16px; color: #1b263b; margin: 6px 0 2px 0;">${escapeHtml(b.destination)}</h4>
                    <p style="font-size: 12px; color: #4a5568; margin: 0;">User: <strong>${escapeHtml(b.userName)}</strong> (${escapeHtml(b.userEmail)})</p>
                    ${b.pickupPoint ? `<p style="font-size: 12px; color: #4a5568; margin: 2px 0 0 0;">Pickup: <strong>${escapeHtml(b.pickupPoint)}</strong> at <strong>${escapeHtml(b.pickupTime)}</strong></p>` : ''}
                    <p style="font-size: 12px; color: #92400e; font-weight: 600; margin-top: 4px;">Status: ${escapeHtml(b.status)}</p>${b.changeRequest && b.status !== 'Cancelled' ? `<div style="background:#fffaf0;border:1px solid #fbd38d;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;color:#744210">📅 Date change requested: <strong>${escapeHtml(b.date)}</strong> → <strong>${escapeHtml(b.changeRequest.date)}</strong><div style="margin-top:6px"><button data-email="${escapeHtml(b.userEmail)}" data-ref="${escapeHtml(b.referenceId)}" onclick="resolveDateChange(this.dataset.email, this.dataset.ref, true)" style="background:#e0415a;color:#fff;border:none;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;margin-right:6px">Approve</button><button data-email="${escapeHtml(b.userEmail)}" data-ref="${escapeHtml(b.referenceId)}" onclick="resolveDateChange(this.dataset.email, this.dataset.ref, false)" style="background:#fff;color:#c0293f;border:1.5px solid #c0293f;padding:4px 11px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">Reject</button></div></div>` : ''}${b.paymentRef ? `<p style="font-size:12px;color:#4a5568;margin:4px 0 0">Payment ref: <strong>${escapeHtml(b.paymentRef)}</strong> via ${escapeHtml(b.paymentMethod)}</p>` : ''}${b.paymentProof ? `<img src="${escapeHtml(b.paymentProof)}" alt="Payment receipt" data-ref="${escapeHtml(b.referenceId)}" onclick="viewProof(this.dataset.ref)" style="display:block;max-width:140px;border-radius:8px;border:1px solid #cbd5e0;margin-top:8px;cursor:zoom-in" />` : ''}
                  </div>
                  <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <strong style="font-size: 18px; color: #c0293f;">${escapeHtml(b.total)}</strong>
                    ${b.status === 'Cancelled' ? `<span style="background:#e2e8f0;color:#4a5568;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;">Cancelled</span>` : b.status.includes('Approved') ? `<span style="background: #c6f6d5; color: #22543d; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px;">${b.completed ? '✓ Completed' : '✓ Approved'}</span>${b.completed ? '' : `<button data-email="${escapeHtml(b.userEmail)}" data-ref="${escapeHtml(b.referenceId)}" onclick="completeBooking(this.dataset.email, this.dataset.ref)" style="background: #fff; color: #131c38; border: 1.5px solid #131c38; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Mark completed</button>`}` : `<button data-email="${escapeHtml(b.userEmail)}" data-ref="${escapeHtml(b.referenceId)}" onclick="approveBooking(this.dataset.email, this.dataset.ref)" style="background: #e0415a; color:#fff; border: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Approve Payment</button>`}
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

  getDetailView: (selectedPlace, placeReviews = []) => {
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
          <button aria-label="Next photo" class="nav-arrow right-arrow" onclick="plusDetailSlide(1)" style="position: absolute; top: 50%; right: 16px; transform: translateY(-50%); z-index: 10; cursor: pointer;">&#10095;</button>
        </div>

        <div class="detail-grid">
          <div class="detail-main-info">
            <h1>${selectedPlace.name}</h1>
            <div class="stars" role="img" aria-label="${selectedPlace.stars.length} out of 5 stars">${selectedPlace.stars}</div>
            <span class="location-tag">📍 ${selectedPlace.location}</span>
            
            <div class="detail-description-box">
              <h3>About & Highlights</h3>
              <p>${selectedPlace.description}</p>
            </div>

            ${selectedPlace.bestTime ? `<div style="margin-top:18px;padding:14px 16px;background:#fffaf0;border:1px solid #fbd38d;border-radius:12px;font-size:13px;line-height:1.6;color:#4a3410"><strong style="color:#744210">☀ Best time to visit &amp; weather</strong><br>${escapeHtml(selectedPlace.bestTime)}<br><span style="font-size:11px;color:#744210">General guide only. Check the forecast a few days before you travel.</span></div>` : ''}

            ${selectedPlace.amenities && selectedPlace.amenities.length ? `
              <div class="amenities-section" style="margin-top: 24px;">
                <h3>Included Amenities</h3>
                <div class="amenities-list" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                  ${selectedPlace.amenities.map(item => `
                    <span class="amenity-badge" style="background: #edf2f7; color: #2d3748; font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 20px; border: 1px solid #cbd5e0;">✨ ${escapeHtml(item)}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <div class="info-note"><strong>Not included:</strong> meals marked "Pax account", optional add-ons, and personal expenses.<br><strong>Changes:</strong> cancel or request a new date up to 48 hours before travel. <a href="#/policies" style="color:#c0293f">See policies</a>.</div>

            <div class="landmarks-section">
              <h3>Landmarks & Attractions</h3>
              <div class="landmarks-grid">
                ${(selectedPlace.landmarks || []).map(lm => `
                  <div class="landmark-card">
                    <div class="landmark-img" style="background-image: url('${lm.image}');"></div>
                    <span>${escapeHtml(lm.name)}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="itinerary-section" style="margin-top: 28px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                <h3 style="margin: 0;">Tour Itinerary</h3>
                ${isBaguio ? `
                  <div style="display: flex; gap: 8px;">
                    <button onclick="switchItinerary('2D1N')" id="itinerary-btn-2d" style="padding: 6px 12px; background: #e0415a; color:#fff; border: none; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">2D 1N Itinerary</button>
                    <button onclick="switchItinerary('3D2N')" id="itinerary-btn-3d" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">3D 2N Itinerary</button>
                  </div>
                ` : isBataan ? `
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button onclick="switchBataanPackage('A')" id="btn-pkg-a" style="padding: 6px 12px; background: #e0415a; color:#fff; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package A (₱${bataanPackagePrices.A.toLocaleString()})</button>
                    <button onclick="switchBataanPackage('B')" id="btn-pkg-b" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package B (₱${bataanPackagePrices.B.toLocaleString()})</button>
                    <button onclick="switchBataanPackage('C')" id="btn-pkg-c" style="padding: 6px 12px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer;">Package C (₱${bataanPackagePrices.C.toLocaleString()})</button>
                  </div>
                ` : ''}
              </div>

              <div id="itinerary-container">
                ${renderItineraryColumns(selectedPlace.itineraryPackageA || selectedPlace.itinerary2D1N || selectedPlace.itinerary || [])}
              </div>
            </div>
          </div>

          <div class="detail-packages-sidebar">
            <h3 style="font-size: 18px; font-weight: 800; color: #131c38; margin-bottom: 16px; text-align: center;">Tour Packages</h3>
            
            ${isBataan ? `
              <div class="package-pillar-card" id="sidebar-card-a" style="background: #fff; padding: 14px; border-radius: 12px; border: 2px solid #e0415a; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('A')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE A</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">Las Casas, Camaya Coast, Corregidor & Mt. Samat</p>
                <div style="background: #e0415a; color:#fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱${bataanPackagePrices.A.toLocaleString()} / Pax</div>
              </div>

              <div class="package-pillar-card" id="sidebar-card-b" style="background: #fff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e0; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('B')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE B</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">Mariveles Five Fingers, Laki Beach, Camaya Coast & Mt. Samat</p>
                <div style="background: #131c38; color: #fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱${bataanPackagePrices.B.toLocaleString()} / Pax</div>
              </div>

              <div class="package-pillar-card" id="sidebar-card-c" style="background: #fff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e0; margin-bottom: 12px; cursor: pointer;" onclick="switchBataanPackage('C')">
                <h4 style="color: #131c38; font-size: 14px; margin-bottom: 4px;">PACKAGE C</h4>
                <p style="font-size: 11px; color: #64748b; margin-bottom: 6px;">1-Night Las Casas Stay + Corregidor, Camaya Coast & Mt. Samat</p>
                <div style="background: #131c38; color: #fff; text-align: center; padding: 4px; border-radius: 4px; font-weight: 700; font-size: 12px;">₱${bataanPackagePrices.C.toLocaleString()} / Pax</div>
              </div>
              <p style="font-size: 10px; color: #718096; text-align: center; margin-top: 8px;">Rates based on min. 10 participants.</p>
            ` : `
              <div class="package-pillar-card" style="background: #fff; padding: 16px; border-radius: 12px; border: 2px solid #e0415a; margin-bottom: 16px;">
                <h4 class="pillar-title" style="color: #131c38; margin-bottom: 6px;">STANDARD PACKAGE</h4>
                <div class="pillar-price-badge" style="background: #e0415a; color:#fff; text-align: center; padding: 6px; border-radius: 6px; font-weight: 700;">${selectedPlace.price} / Pax</div>
              </div>
            `}

            ${selectedPlace.addons && selectedPlace.addons.length ? `
              <div class="addons-sidebar-card" style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #cbd5e0; margin-top: 16px;">
                <h4 style="color: #131c38; font-size: 14px; margin: 0 0 4px 0;">OPTIONAL ADD-ONS</h4>
                <p style="font-size: 11px; color: #64748b; margin: 0 0 8px 0;">Choose these on the booking form.</p>
                ${selectedPlace.addons.map(a => `
                  <div style="display: flex; justify-content: space-between; gap: 8px; font-size: 13px; color: #1b263b; padding: 8px 0; border-top: 1px solid #edf2f7;">
                    <span>${escapeHtml(a.name)}</span>
                    <strong style="color: #c0293f; white-space: nowrap;">+₱${a.price.toLocaleString()}</strong>
                  </div>`).join('')}
              </div>` : ''}
          </div>
        </div>

        ${renderPlaceReviews(selectedPlace, placeReviews)}

        <div class="detail-bottom-bar">
          <button class="book-now-main-btn" onclick="navigateTo('booking')">Book Now</button>
        </div>
      </div>
      ${renderLoginModal()}
    `;
  },

  getBookingView: (selectedPlace, selectedPackageType, appliedPromoName, appliedPromoDiscount, selectedBataanPackage = 'A') => {
    const isBataan = selectedPlace.id === 'bataan-3d2n';
    const basePrice = isBataan
      ? bataanPackagePrices[selectedBataanPackage]
      : (parseInt(selectedPlace.price.replace(/[^0-9]/g, ''), 10) || 7950);
    const discountRate = selectedPlace.discount ? selectedPlace.discount / 100 : 0;
    const subtotal = basePrice * 2;
    const promoDiscountAmount = subtotal * appliedPromoDiscount;
    const initialTotal = subtotal - promoDiscountAmount;

    return `
      <div class="main-container">
        <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap;">
          <div>
            <h1 style="margin-bottom: 4px;">Booking Details</h1>
            <p class="subtitle">Location: <strong>${selectedPlace.location}</strong> | ${isBataan ? `Package: <strong>${selectedBataanPackage}</strong> | ` : ''}Base Rate: <strong>₱${basePrice.toLocaleString()} / Adult</strong>${discountRate > 0 ? ` <span style="color:#38a169;font-weight:600">(${selectedPlace.discount}% off already applied)</span>` : ''}</p>
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

        ${renderStepper(1)}
        <div id="review-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;justify-content:center;align-items:center;padding:16px"></div>
        <div class="reservation-box" style="margin-top: 20px;">
          <h2>Reservation Form - ${selectedPlace.name}</h2>
          
          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="guest-firstname">First Name</label>
              <input type="text" id="guest-firstname" placeholder="Enter first name" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" required />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="guest-lastname">Last Name</label>
              <input type="text" id="guest-lastname" placeholder="Enter last name" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box;" required />
            </div>
          </div>

          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
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

          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="pickup-point">Pickup Point</label>
              <select id="pickup-point" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; background: #fff; cursor: pointer; box-sizing: border-box;"><option value="">Select pickup point</option>${pickupPoints.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join('')}</select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label for="pickup-time">Departure Time</label>
              <select id="pickup-time" style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; background: #fff; cursor: pointer; box-sizing: border-box;"><option value="">Select time</option>${departureTimesFor(selectedPlace).map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('')}</select>
            </div>
          </div>

          <div class="form-group">
            <label for="booking-date">Select Travel Date</label>
            <input type="hidden" id="booking-date" /><div id="booking-calendar"></div>
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

          <div class="form-group" style="margin-top: 20px;">
            <label style="font-size: 12px; font-weight: 700; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Optional Add-ons & Extras</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(selectedPlace.addons || availableAddons).map(addon => `
                <label style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 13px; color: #1b263b;">
                  <span style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" class="addon-checkbox" data-price="${addon.price}" data-name="${escapeHtml(addon.name)}" onchange="updateBookingTotal()" style="width: 16px; height: 16px; accent-color: #e0415a; cursor: pointer;" />
                    ${addon.name}
                  </span>
                  <strong style="color: #c0293f;">+₱${addon.price.toLocaleString()}</strong>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="form-group" style="margin-top: 20px;">
            <label for="promo-code-input">Promo / Discount Code</label>
            <div style="display: flex; gap: 10px;">
              <input type="text" id="promo-code-input" placeholder="e.g. TRAVELAYA" value="${escapeHtml(appliedPromoName)}" style="flex: 1; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 14px; text-transform: uppercase;" />
              <button type="button" onclick="applyPromoCode()" style="background: #131c38; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Apply</button>
            </div>
            <small id="promo-feedback" style="display: block; margin-top: 6px; font-size: 12px; font-weight: 600; color: ${appliedPromoDiscount > 0 ? '#38a169' : '#e53e3e'};">
              ${appliedPromoDiscount > 0 ? `✓ Promo code applied (${Math.round(appliedPromoDiscount * 100)}% OFF)!` : ''}
            </small>
          </div>

          <div style="margin: 20px 0; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="breakdown-adult-label" style="font-size: 13px; color: #64748b;">Adult Package (2 pax):</span>
              <span id="breakdown-adult-price" style="font-size: 13px; font-weight: 600; color: #1b263b;">₱${subtotal.toLocaleString()}</span>
            </div>
            <div id="breakdown-child-row" style="display: none; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="breakdown-child-label" style="font-size: 13px; color: #64748b;">Children:</span>
              <span id="breakdown-child-price" style="font-size: 13px; font-weight: 600; color: #1b263b;">₱0</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 13px; color: #64748b;">Optional Add-ons:</span>
              <span id="breakdown-addons-price" style="font-size: 13px; font-weight: 600; color: #1b263b;">₱0</span>
            </div>
            <div id="breakdown-promo-row" style="display: ${appliedPromoDiscount > 0 ? 'flex' : 'none'}; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span id="breakdown-promo-label" style="font-size: 13px; color: #38a169; font-weight: 600;">Promo Discount${appliedPromoName ? ` (${escapeHtml(appliedPromoName)})` : ''}:</span>
              <span id="breakdown-promo-price" style="font-size: 13px; font-weight: 600; color: #38a169;">-₱${Math.round(promoDiscountAmount).toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e0; padding-top: 12px; margin-top: 12px;">
              <span style="font-size: 16px; font-weight: 700; color: #1b263b;">Estimated Total:</span>
              <strong id="total-price-display" style="font-size: 22px; color: #c0293f;">₱${Math.round(initialTotal).toLocaleString()}</strong>
            </div>  
          </div>

          <div class="action-buttons">
            <button type="button" class="btn btn-cancel" onclick="navigateTo('home')">Cancel</button>
            <button type="button" class="btn btn-continue" onclick="handleBookingSubmit()">Review Booking</button>
          </div>
        </div>
      </div>
      ${renderLoginModal()}
    `;
  }
};