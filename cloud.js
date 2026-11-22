// Talks to Supabase. app.js keeps its in-memory state; this file loads it and saves changes.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.81.1/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const configured = !/YOUR-/.test(SUPABASE_URL + SUPABASE_ANON_KEY);
export const sb = createClient(
  configured ? SUPABASE_URL : 'https://placeholder.supabase.co',
  configured ? SUPABASE_ANON_KEY : 'placeholder'
);

const check = res => { if (res.error) throw res.error; return res.data; };
const digits = s => parseInt(String(s ?? '').replace(/[^0-9]/g, ''), 10) || 0;

const bookingToRow = b => ({
  place_id: b.placeId || null,
  travel_date: b.date,
  guests: (Number(b.adults) || 0) + (Number(b.children) || 0),
  status: b.status,
  total_amount: digits(b.total),
  completed: !!b.completed,
  refund: b.refund || null,
  data: b
});
const rowToBooking = r => {
  const b = { ...r.data, referenceId: r.reference_id, status: r.status, date: r.travel_date, completed: r.completed };
  if (r.refund) b.refund = r.refund; else delete b.refund;
  return b;
};

// ---------- loading ----------
export async function fetchPublic() {
  const [bd, pe, dp, rv, us] = await Promise.all([
    sb.from('blocked_dates').select('place_id, blocked_on'),
    sb.from('place_edits').select('place_id, data'),
    sb.from('deleted_places').select('place_id'),
    sb.from('reviews').select('*').order('created_at', { ascending: true }),
    sb.rpc('booking_usage')
  ]);
  return {
    blocked: check(bd), placeEdits: check(pe), deleted: check(dp).map(r => r.place_id),
    reviews: check(rv).map(r => ({ id: r.id, placeId: r.place_id, ref: r.booking_ref, name: r.name, stars: r.stars, comment: r.comment, date: r.created_at })),
    usage: check(us)
  };
}

export async function fetchUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return null;
  const uid = session.user.id;
  const me = check(await sb.from('profiles').select('*').eq('id', uid).single());
  const [profiles, bookings, favs, inq] = await Promise.all([
    me.is_admin ? sb.from('profiles').select('*').order('created_at') : Promise.resolve({ data: [me], error: null }),
    sb.from('bookings').select('*').order('created_at', { ascending: true }),
    sb.from('favorites').select('place_id'),
    me.is_admin ? sb.from('inquiries').select('*').order('created_at', { ascending: false }) : Promise.resolve({ data: [], error: null })
  ]);
  const byUser = {};
  check(bookings).forEach(r => { (byUser[r.user_id] = byUser[r.user_id] || []).push(rowToBooking(r)); });
  const accounts = check(profiles).map(p => ({ id: p.id, email: p.email, name: p.name || p.email, isAdmin: p.is_admin, bookings: byUser[p.id] || [] }));
  return {
    id: uid, email: me.email, name: me.name, isAdmin: me.is_admin, accounts,
    favorites: check(favs).map(r => r.place_id),
    inquiries: check(inq).map(r => ({ ...r.data, id: r.id, status: r.status, createdAt: r.created_at }))
  };
}

// ---------- saving: compare the app's state with what the server last had ----------
let base = null;
const j = x => JSON.stringify(x);
function snapshot(s) {
  const bookings = new Map();
  s.accounts.forEach(u => (u.bookings || []).forEach(b => bookings.set(b.referenceId, j(bookingToRow(b)))));
  const blocked = new Set();
  Object.entries(s.blockedDates).forEach(([p, ds]) => ds.forEach(d => blocked.add(p + '|' + d)));
  return {
    bookings, blocked,
    reviews: new Set(s.reviews.map(r => r.id)),
    inquiries: new Map(s.inquiries.map(i => [i.id, i.status])),
    placeEdits: new Map(Object.entries(s.placeEdits).map(([id, p]) => [id, j(p)])),
    deleted: new Set(s.deletedPlaces),
    favorites: new Set(s.favorites)
  };
}
export function setBaseline(s) { base = snapshot(s); }

export async function push(s) {
  if (!base) return;
  const cur = snapshot(s);

  for (const u of s.accounts) for (const b of (u.bookings || [])) {
    const sig = cur.bookings.get(b.referenceId), old = base.bookings.get(b.referenceId);
    if (old === sig) continue;
    const row = bookingToRow(b);
    if (old === undefined) check(await sb.from('bookings').insert({ reference_id: b.referenceId, user_id: u.id, ...row }));
    else check(await sb.from('bookings').update(row).eq('reference_id', b.referenceId));
    base.bookings.set(b.referenceId, sig);
  }

  for (const r of s.reviews) if (!base.reviews.has(r.id)) {
    check(await sb.from('reviews').insert({ id: r.id, place_id: r.placeId, booking_ref: r.ref, name: r.name, stars: r.stars, comment: r.comment, created_at: r.date }));
    base.reviews.add(r.id);
  }

  for (const i of s.inquiries) {
    if (!base.inquiries.has(i.id)) {
      const { id, status, createdAt, ...data } = i;
      check(await sb.from('inquiries').insert({ id, status: 'New', data, created_at: createdAt }));
      base.inquiries.set(id, 'New');
    }
    if (base.inquiries.get(i.id) !== i.status && s.user && s.user.isAdmin) {
      check(await sb.from('inquiries').update({ status: i.status }).eq('id', i.id));
      base.inquiries.set(i.id, i.status);
    }
  }

  for (const key of cur.blocked) if (!base.blocked.has(key)) {
    const [place_id, blocked_on] = key.split('|');
    check(await sb.from('blocked_dates').insert({ place_id, blocked_on })); base.blocked.add(key);
  }
  for (const key of [...base.blocked]) if (!cur.blocked.has(key)) {
    const [place_id, blocked_on] = key.split('|');
    check(await sb.from('blocked_dates').delete().eq('place_id', place_id).eq('blocked_on', blocked_on)); base.blocked.delete(key);
  }

  for (const [id, sig] of cur.placeEdits) if (base.placeEdits.get(id) !== sig) {
    check(await sb.from('place_edits').upsert({ place_id: id, data: s.placeEdits[id] })); base.placeEdits.set(id, sig);
  }
  for (const id of cur.deleted) if (!base.deleted.has(id)) {
    check(await sb.from('deleted_places').upsert({ place_id: id })); base.deleted.add(id);
  }

  if (s.user) {
    for (const id of cur.favorites) if (!base.favorites.has(id)) {
      check(await sb.from('favorites').upsert({ place_id: id })); base.favorites.add(id);
    }
    for (const id of [...base.favorites]) if (!cur.favorites.has(id)) {
      check(await sb.from('favorites').delete().eq('place_id', id)); base.favorites.delete(id);
    }
  }
}

// ---------- receipts ----------
export async function uploadReceipt(path, blob) {
  check(await sb.storage.from('receipts').upload(path, blob, { contentType: 'image/jpeg', upsert: true }));
  return path;
}
export async function receiptUrl(path) {
  if (!path) return null;
  if (String(path).startsWith('data:')) return path;
  const { data, error } = await sb.storage.from('receipts').createSignedUrl(path, 300);
  return error ? null : data.signedUrl;
}