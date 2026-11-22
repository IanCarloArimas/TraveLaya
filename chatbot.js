const STOP = new Set(('a an the is are am i me my we you your do does can could would should to of for in on at it this that ' +
  'and or with how what when where which who there any about please tell if so be get have has will just want need').split(' '));

const SYN_RAW = {
  cancel: ['refund', 'cancellation'], refund: ['cancel'], reimburse: ['refund'], money: ['refund', 'pay'],
  pay: ['payment', 'gcash', 'maya', 'card', 'bank'], payment: ['pay'], gcash: ['pay'], maya: ['pay'], bdo: ['bank', 'pay'],
  kid: ['child', 'children'], child: ['children'], children: ['child'], toddler: ['child', 'children'], baby: ['child', 'children'], infant: ['child', 'children'], minor: ['child', 'children'],
  discount: ['promo'], voucher: ['promo'], coupon: ['promo'], code: ['promo'],
  pickup: ['pick', 'departure', 'leave'], depart: ['leave', 'time'], time: ['leave', 'departure'], meet: ['pickup', 'pick', 'leave', 'departure'], point: ['pickup', 'pick'], terminal: ['pickup', 'pick'],
  slot: ['guest', 'limit'], full: ['limit', 'guest'], capacity: ['limit', 'guest'], sold: ['limit', 'guest'],
  review: ['reviews'], feedback: ['review'], rate: ['review'],
  include: ['included', 'amenities', 'package'], inclusion: ['include', 'package'], meal: ['pax', 'included'], food: ['pax', 'included'],
  change: ['modify', 'date'], reschedule: ['modify', 'date'], move: ['modify', 'date'], edit: ['modify'],
  confirm: ['approved', 'confirmed'], status: ['confirmed', 'approved', 'pending'], approve: ['approved', 'confirmed'],
};

function stem(w) {
  w = w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1');
  if (w.length > 5) w = w.replace(/(ing|ed)$/, '').replace(/(.)\1$/, '$1');
  return w;
}
const SYN = {};
Object.entries(SYN_RAW).forEach(([k, v]) => { SYN[stem(k)] = v.map(stem); });

function tokens(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9\u00f1]+/g, ' ').split(' ')
    .filter(w => w.length > 1 && !STOP.has(w)).map(stem);
}
const uniq = a => [...new Set(a)];
const digits = s => parseInt(String(s ?? '').replace(/[^0-9]/g, ''), 10) || 0;
const peso = n => '\u20B1' + Number(n).toLocaleString('en-PH');
export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const EXTRA = [
  ['How do I book a trip?',
    'Open a trip from Places and press Book Now. Pick your travel date, guests, pickup point and departure time, then review and confirm. You need to be logged in. After you confirm, pay with your booking reference so we can approve it.',
    [{ label: 'Browse trips', type: 'page', value: 'places' }],
    /\b(how|steps?)\b.*\b(book|reserve)\b|\b(book|reserve)\b.*\b(a|my|the) (trip|tour|slot)\b/],
  ['Do I need an account?',
    'Yes. You can browse trips without one, but you need to log in or register before you book, so we can keep your bookings and payments in My Bookings.',
    [{ label: 'Open My Bookings', type: 'page', value: 'myBookings' }],
    /\b(account|register|sign ?up|log ?in)\b/],
];

const CHIPS = ['How do I book a trip?', 'How do I pay?', 'Cancel or change a booking', 'Trips under \u20B13,000', 'Contact us'];

export function initChatbot({ getPlaces, faqs, navigate, openPlace }) {
  if (document.getElementById('tl-chat')) return;

  const kb = [...faqs.map(([q, a]) => ({ q, a, actions: [] })), ...EXTRA.map(([q, a, actions, re]) => ({ q, a, actions, re }))]
    .map(e => ({ ...e, qT: new Set(tokens(e.q)), aT: new Set(tokens(e.a)) }));

  function budgetFrom(text) {
    const m = text.match(/(?:under|below|less than|within|max(?:imum)?|budget(?: of| is)?|up to|only|<=?)\s*(?:php|p|\u20B1)?\s*(\d[\d,.]*)\s*(k)?/i)
      || text.match(/(?:php|\u20B1)\s*(\d[\d,.]*)\s*(k)?/i);
    if (!m) return 0;
    let n = parseFloat(m[1].replace(/,/g, ''));
    if (m[2]) n *= 1000;
    return n >= 300 ? n : 0;
  }

  function faqMatch(q) {
    const base = uniq(tokens(q));
    const extra = uniq(base.flatMap(t => SYN[t] || [])).filter(t => !base.includes(t));
    let best = null, bestScore = 0;
    for (const e of kb) {
      let s = 0;
      base.forEach(t => { s += e.qT.has(t) ? 2 : e.aT.has(t) ? 1 : 0; });
      extra.forEach(t => { s += e.qT.has(t) ? 0.5 : e.aT.has(t) ? 0.25 : 0; });
      if (s > bestScore) { best = e; bestScore = s; }
    }
    return { entry: best, score: bestScore };
  }

  const GENERIC = new Set(['trip', 'tour', 'package', 'day', 'overnight', 'stay', 'full', 'getaway', 'city', 'philippine'].map(stem));
  function placeMatch(q) {
    const base = uniq(tokens(q)).filter(t => !GENERIC.has(t));
    let best = null, bestScore = 0;
    for (const p of getPlaces()) {
      const hay = new Set(tokens([p.name, p.location, p.category, p.packageType, p.id].join(' ')));
      let s = 0;
      base.forEach(t => { if (hay.has(t)) s += 2; });
      if (s > bestScore) { best = p; bestScore = s; }
    }
    return { place: best, score: bestScore };
  }

  const priceOf = p => p.numericPrice || digits(p.price);
  const placeCards = list => list.map(p => ({ id: p.id, name: p.name, meta: [p.location, p.duration].filter(Boolean).join(' \u00B7 '), price: peso(priceOf(p)) }));

  function reply(raw) {
    const q = raw.trim();
    const lower = q.toLowerCase();
    const places = getPlaces();

    if (/^(hi|hello|hey|kumusta|good (morning|afternoon|evening))\b/.test(lower))
      return { text: 'Hi! I can help with booking, payments, refunds and finding a trip. What would you like to know?' };
    if (/\b(thanks|thank you|salamat)\b/.test(lower)) return { text: 'You\u2019re welcome! Ask me anything else about your trip.' };
    if (/^(bye|goodbye|see you)\b/.test(lower)) return { text: 'Safe travels! I\u2019m here if you need anything.' };

    if (/\b(my bookings|booking status|track|check my booking|where is my booking)\b/.test(lower))
      return { text: 'Every booking, its status, payment details and voucher are in My Bookings. You\u2019ll need to be logged in.', actions: [{ label: 'Open My Bookings', type: 'page', value: 'myBookings' }] };
    if (/\b(contact|inquiry|enquiry|human|agent|staff|someone|call|email|talk to|speak)\b/.test(lower))
      return { text: 'Send us an inquiry and the team will reply by email. Include your travel dates and group size if you have them.', actions: [{ label: 'Send an inquiry', type: 'page', value: 'inquiry' }] };
    if (/\b(policy|policies|terms|privacy)\b/.test(lower))
      return { text: 'Our cancellation, refund, terms and privacy rules are on one page.', actions: [{ label: 'Read the policies', type: 'page', value: 'policies' }] };
    if (/\b(blogs?|travel tips|articles?)\b/.test(lower))
      return { text: 'Our blog has trip guides and travel tips.', actions: [{ label: 'Open the blog', type: 'page', value: 'blogs' }] };

    const budget = budgetFrom(q);
    if (budget) {
      const hits = places.filter(p => priceOf(p) && priceOf(p) <= budget).sort((a, b) => priceOf(a) - priceOf(b));
      if (!hits.length) {
        const cheapest = [...places].sort((a, b) => priceOf(a) - priceOf(b))[0];
        return { text: `No trips start at ${peso(budget)} or less. Our lowest is ${cheapest ? peso(priceOf(cheapest)) : 'on the Places page'} per adult.`, places: cheapest ? placeCards([cheapest]) : [], actions: [{ label: 'See all trips', type: 'page', value: 'places' }] };
      }
      return { text: `${hits.length} trip${hits.length > 1 ? 's' : ''} at ${peso(budget)} or less per adult${hits.length > 4 ? ' (showing the 4 cheapest)' : ''}:`, places: placeCards(hits.slice(0, 4)), actions: hits.length > 4 ? [{ label: 'See all trips', type: 'page', value: 'places' }] : [] };
    }

    const forced = kb.find(e => e.re && e.re.test(lower));
    if (forced) return { text: forced.a, actions: forced.actions };

    const f = faqMatch(q), pm = placeMatch(q);
    const asksTiming = /\b(best time|when to (go|visit)|weather|season|cold|rain)\b/.test(lower);
    const wantsList = /\b(recommend|suggest|cheap(est)?|affordable|popular|best|destinations?|places|trips?|tours?|packages?|show|list)\b/.test(lower);

    if (pm.score < 2 && /\b(cheap(est)?|afford(able)?|recommend|suggest|popular)\b/.test(lower)) {
      const cheap = /cheap|afford/.test(lower);
      const sorted = cheap ? [...places].sort((a, b) => priceOf(a) - priceOf(b)) : places;
      return { text: cheap ? 'Our lowest-priced trips:' : 'Here are some trips to start with:', places: placeCards(sorted.slice(0, 4)), actions: [{ label: 'See all trips', type: 'page', value: 'places' }] };
    }
    if (pm.score >= 2 && (pm.score >= f.score || asksTiming)) {
      const p = pm.place;
      const lines = [`${p.name} (${p.location}): from ${peso(priceOf(p))} per adult, ${p.duration || 'see page for duration'}.`];
      if (p.discount) lines.push(`Current discount: ${p.discount}% off.`);
      if (p.bestTime && /\b(when|best time|weather|season)\b/.test(lower)) lines.push(p.bestTime);
      return { text: lines.join(' '), places: placeCards([p]) };
    }
    if (f.entry && f.score >= 2) {
      const actions = [...f.entry.actions];
      if (/cancel|refund/i.test(f.entry.q)) actions.push({ label: 'Cancellation & refunds', type: 'page', value: 'policies' });
      actions.push({ label: 'See all FAQs', type: 'page', value: 'faq' });
      return { text: f.entry.a, actions };
    }
    if (wantsList || /\bcheap|afford/.test(lower)) {
      const sorted = /cheap|afford/.test(lower) ? [...places].sort((a, b) => priceOf(a) - priceOf(b)) : places;
      return { text: /cheap|afford/.test(lower) ? 'Our lowest-priced trips:' : 'Here are some trips to start with:', places: placeCards(sorted.slice(0, 4)), actions: [{ label: 'See all trips', type: 'page', value: 'places' }] };
    }
    if (f.entry && f.score >= 1) return { text: f.entry.a, actions: [{ label: 'See all FAQs', type: 'page', value: 'faq' }] };
    return { text: 'I\u2019m not sure about that one. Try a word like payment, refund, pickup or a destination name, or send us an inquiry and a person will reply.', actions: [{ label: 'Send an inquiry', type: 'page', value: 'inquiry' }, { label: 'See all FAQs', type: 'page', value: 'faq' }] };
  }

  const root = document.createElement('div');
  root.id = 'tl-chat';
  root.innerHTML = `
    <button type="button" class="tl-fab" aria-expanded="false" aria-controls="tl-panel">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>
      <span>Help</span>
    </button>
    <section class="tl-panel" id="tl-panel" role="dialog" aria-label="TraveLaya help chat" hidden>
      <div class="tl-head">
        <div><strong>TraveLaya Help</strong><span>Automated answers. For anything else, send an inquiry.</span></div>
        <button type="button" class="tl-close" aria-label="Close chat">&times;</button>
      </div>
      <div class="tl-log" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="tl-chips" role="group" aria-label="Suggested questions"></div>
      <form class="tl-form" autocomplete="off">
        <label class="sr-only" for="tl-input">Ask a question</label>
        <input id="tl-input" type="text" maxlength="200" placeholder="Ask about trips, payment, refunds" />
        <button type="submit" class="tl-send">Send</button>
      </form>
    </section>`;
  document.body.appendChild(root);

  const fab = root.querySelector('.tl-fab'), panel = root.querySelector('.tl-panel'), log = root.querySelector('.tl-log');
  const chips = root.querySelector('.tl-chips'), form = root.querySelector('.tl-form'), input = root.querySelector('#tl-input');
  let greeted = false;

  chips.innerHTML = CHIPS.map(c => `<button type="button" class="tl-chip" data-act="ask" data-value="${esc(c)}">${esc(c)}</button>`).join('');

  function setOpen(open, focusFab) {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    root.classList.toggle('tl-open', open);
    if (open) {
      if (!greeted) { greeted = true; addBot({ text: 'Hi! I can help with booking, payments, refunds and finding a trip. Pick a question below or type your own.' }); }
      input.focus();
    } else if (focusFab) fab.focus();
  }

  function addUser(text) {
    const d = document.createElement('div');
    d.className = 'tl-msg tl-user';
    d.textContent = text;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }
  function addBot(r) {
    const d = document.createElement('div');
    d.className = 'tl-msg tl-bot';
    let html = `<p>${esc(r.text)}</p>`;
    if (r.places && r.places.length) html += r.places.map(p => `
      <div class="tl-place">
        <div class="tl-place-info"><strong>${esc(p.name)}</strong><span>${esc(p.meta)}</span></div>
        <div class="tl-place-side"><span class="tl-price">${esc(p.price)}</span>
        <button type="button" class="tl-link" data-act="place" data-value="${esc(p.id)}" aria-label="View ${esc(p.name)}">View</button></div>
      </div>`).join('');
    if (r.actions && r.actions.length) html += `<div class="tl-actions">${r.actions.map(a =>
      `<button type="button" class="tl-link" data-act="${a.type}" data-value="${esc(a.value)}">${esc(a.label)}</button>`).join('')}</div>`;
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  }

  function send(text) {
    const t = String(text || '').trim();
    if (!t) return;
    addUser(t);
    addBot(reply(t));
  }

  fab.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('.tl-close').addEventListener('click', () => setOpen(false, true));
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false, true); } });
  form.addEventListener('submit', e => { e.preventDefault(); const v = input.value; input.value = ''; send(v); input.focus(); });
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const v = b.dataset.value;
    if (b.dataset.act === 'ask') send(v);
    else if (b.dataset.act === 'page') { setOpen(false); navigate(v); }
    else if (b.dataset.act === 'place') { setOpen(false); openPlace(v); }
  });
}
