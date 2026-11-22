export const heroImages = [
  'images/camp-johnhay.jpg',
  'images/las-casas.jpg',
  'images/mirador-heritage.jpg',
  'images/strawberry-farm.jpg'
];

export const bataanPackagePrices = { A: 12850, B: 7950, C: 19550 };

export const pickupPoints = [
  'Quezon City - Cubao (Araneta City)',
  'Quezon City - SM North EDSA',
  'Makati - Ayala Ave (Landmark)',
  'Manila - Taft Ave (LRT Vito Cruz)',
  'Pasay - SM Mall of Asia',
  'Muntinlupa - Alabang Town Center'
];
export const defaultDepartureTimes = ['05:00 AM', '06:00 AM', '07:00 AM'];
export const departureTimesFor = place => (place && place.departureTimes && place.departureTimes.length ? place.departureTimes : defaultDepartureTimes);

export const paymentInfo = {
  'GCash': { kind: 'e-wallet', accountName: 'TraveLaya Tours', number: '0991 922 7246', qr: '' },
  'Maya': { kind: 'e-wallet', accountName: 'TraveLaya Tours', number: '0991 922 7246', qr: '' },
  'Bank Transfer': { kind: 'bank', bank: 'BDO', accountName: 'TraveLaya Tours Inc.', number: '0000 0000 0000', qr: '' },
  'Credit/Debit Card': null 
};

export const allPlacesData = {
  'baguio': {
    id: 'baguio',
    bestTime: 'Cool and foggy from November to February (around 15-20°C). Expect crowds in December and during Holy Week. June to October is the rainy season, so pack a rain jacket.',
    departureTimes: ['10:00 PM', '12:00 AM'],
    name: 'Baguio City Getaway',
    location: 'Benguet, Philippines',
    stars: '★★★★★',
    price: '₱2,500',
    numericPrice: 2500,
    price3D2N: 3500, // per-adult price of the 3D2N package (2D1N uses the price above). Change this to your real 3D2N rate.
    duration: '2D1N / 3D2N',
    badge: 'Popular',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    image: 'images/stobosa-colorful-houses.jpg',
    description: 'Experience the City of Pines! Enjoy cool mountain breezes, strawberry picking, scenic nature parks, historical landmarks, and the famous night market.',
    amenities: ['Van Transportation (Manila-Baguio-Manila)', 'Accommodation (Transient House Room Sharing)', 'Tour Coordinator', 'Driver\'s Fee & Fuel', 'City Tour'],
    landmarks: [
      { name: 'Strawberry Farm', price: 0, image: 'images/strawberry-farm.jpg', desc: 'Pick fresh strawberries and try strawberry taho in La Trinidad.' },
      { name: 'Camp John Hay', price: 0, image: 'images/camp-johnhay.jpg', desc: 'Pine tree trails, Eco-Trail walk, and Bamboo Sanctuary.' },
      { name: 'Mirador Heritage', price: 0, image: 'images/mirador-heritage.jpg', desc: 'Panoramic city views and bamboo grove path.' },
      { name: 'Stobosa Colorful Houses', price: 0, image: 'images/stobosa-colorful-houses.jpg', desc: 'Hillside neighborhood of brightly painted houses and a favorite photo stop.' },
      { name: 'Burnham Park', price: 0, image: 'images/burnham-park.jpg', desc: 'Boating on the lake and a relaxed walk in the heart of the city.' }
    ],
    itinerary2D1N: [
      { dayGroup: 'Day 1', day: '10:00 PM / 12:00 AM', title: 'Pick up & Departure from Manila', details: 'Departure via van transfer to Baguio City.' },
      { dayGroup: 'Day 1', day: '05:00 AM', title: 'Arrival & Breakfast', details: 'Arrival in Baguio City followed by breakfast.' },
      { dayGroup: 'Day 1', day: '06:00 AM', title: 'Scenic Views & Heritage Tour', details: 'Visit Strawberry Farm, Stobosa Colorful Houses, Bell Church, Igorot Stone Kingdom, and Tamawan Village.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break (Pax account).' },
      { dayGroup: 'Day 1', day: '01:00 PM', title: 'City Landmarks', details: 'Tour Diplomat Hotel, Lourdes Grotto, and Mirador Heritage and Eco-Spirituality Park.' },
      { dayGroup: 'Day 1', day: '03:00 PM', title: 'Hotel Check-in & Rest', details: 'Hotel check-in, rest time, and free time.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Evening / Christmas Village', details: 'Evening tour and seasonal Christmas Village experience.' },
      { dayGroup: 'Day 1', day: '07:00 PM', title: 'Dinner Time', details: 'Dinner break (Pax account).' },
      { dayGroup: 'Day 1', day: '09:00 PM', title: 'Baguio Night Market', details: 'Shopping for pre-loved clothes (ukay-ukay) and street food.' },
      { dayGroup: 'Day 1', day: '10:30 PM', title: 'Rest & Sleep', details: 'Sleep and rest for the night.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Breakfast & Checkout', details: 'Breakfast at the hotel followed by checkout.' },
      { dayGroup: 'Day 2', day: '09:00 AM', title: 'Nature & Parks Tour', details: 'Visit Baguio Botanical Garden, Wright Park, The Mansion, and Mines View Park.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break.' },
      { dayGroup: 'Day 2', day: '01:00 PM', title: 'Camp John Hay & Eco-Trail', details: 'Explore Camp John Hay, Bamboo Sanctuary, and Eco-Trail walk.' },
      { dayGroup: 'Day 2', day: '04:00 PM', title: 'Pasalubong Shopping', details: 'Visit Baguio Cathedral, Session Road, and final pasalubong shopping at Baguio Public Market.' },
      { dayGroup: 'Day 2', day: '05:30 PM', title: 'ETD Back to Manila', details: 'Departure from Baguio back to Manila.' },
      { dayGroup: 'Day 2', day: '10:30 PM', title: 'ETA in Manila', details: 'Safe arrival back in Manila.' }
    ],
    itinerary3D2N: [
      { dayGroup: 'Day 1', day: '10:00 PM / 12:00 AM', title: 'Pick up & Departure from Manila', details: 'Departure via van transfer to Baguio City.' },
      { dayGroup: 'Day 1', day: '05:00 AM', title: 'Arrival & Breakfast', details: 'Arrival in Baguio City followed by breakfast.' },
      { dayGroup: 'Day 1', day: '06:00 AM', title: 'Scenic Views & Heritage Tour', details: 'Visit Strawberry Farm, Stobosa Colorful Houses, Bell Church, Igorot Stone Kingdom, and Tamawan Village.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break (Pax account).' },
      { dayGroup: 'Day 1', day: '01:00 PM', title: 'City Landmarks', details: 'Tour Diplomat Hotel, Lourdes Grotto, and Mirador Heritage and Eco-Spirituality Park.' },
      { dayGroup: 'Day 1', day: '03:00 PM', title: 'Hotel Check-in & Rest', details: 'Hotel check-in, rest time, and free time.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Evening / Christmas Village', details: 'Evening tour and seasonal Christmas Village experience.' },
      { dayGroup: 'Day 1', day: '07:00 PM', title: 'Dinner Time', details: 'Dinner break (Pax account).' },
      { dayGroup: 'Day 1', day: '09:00 PM', title: 'Baguio Night Market', details: 'Shopping for pre-loved clothes (ukay-ukay) and street food.' },
      
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Breakfast & Morning Prep', details: 'Breakfast at the hotel.' },
      { dayGroup: 'Day 2', day: '09:00 AM', title: 'Nature & Parks Tour', details: 'Visit Baguio Botanical Garden, Wright Park, The Mansion, and Mines View Park.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break at Mines View or Session Road.' },
      { dayGroup: 'Day 2', day: '01:30 PM', title: 'Camp John Hay & Eco-Trail', details: 'Explore Camp John Hay, Bamboo Sanctuary, and Eco-Trail walk.' },
      { dayGroup: 'Day 2', day: '04:30 PM', title: 'Good Shepherd & Scenic Overlook', details: 'Buy famous Good Shepherd ube jam and enjoy pine forest views.' },
      { dayGroup: 'Day 2', day: '07:00 PM', title: 'Dinner & Leisure', details: 'Dinner at leisure and free time around Burnham Park.' },

      { dayGroup: 'Day 3', day: '08:00 AM', title: 'Breakfast & Checkout', details: 'Breakfast at the hotel followed by hotel checkout.' },
      { dayGroup: 'Day 3', day: '10:00 AM', title: 'Cultural Walk & Shopping', details: 'Visit Baguio Cathedral, Burnham Park boating, SM Baguio, and Session Road.' },
      { dayGroup: 'Day 3', day: '12:00 PM', title: 'Lunch & Pasalubong Hunt', details: 'Lunch break and final pasalubong shopping at Baguio Public Market.' },
      { dayGroup: 'Day 3', day: '02:00 PM', title: 'ETD Back to Manila', details: 'Departure from Baguio back to Manila.' },
      { dayGroup: 'Day 3', day: '08:00 PM', title: 'ETA in Manila', details: 'Safe arrival back in Manila.' }
    ],
    addons: [{ id: 'souvenir', name: 'Special Pasalubong Box', price: 450 }, { id: 'genggeng', name: 'GengGeng', price: 450 }, { id: 'strawberry-picking', name: 'Strawberry Farm Picking Basket', price: 250 }, { id: 'burnham-boat', name: 'Burnham Lake Boat Ride', price: 150 }, { id: 'john-hay-guide', name: 'Camp John Hay Eco-Trail Guide', price: 200 }]
  },

  'las-casas': {
    id: 'las-casas',
    bestTime: 'The dry season, November to May, is best for walking the heritage district. Midday is hot, so go early or late and bring water and sunscreen.',
    name: 'Las Casas Filipinas de Acuzar',
    location: 'Bagac, Bataan, Philippines',
    stars: '★★★★★',
    price: '₱4,199',
    numericPrice: 4199,
    duration: '1 Day',
    badge: 'Heritage',
    discount: 5,
    category: 'Heritage',
    packageType: 'Day Trip',
    image: 'images/las-casas.jpg',
    description: 'A unique heritage resort and open-air museum in Bagac, Bataan, showcasing restored Spanish-Filipino colonial houses, cobblestone streets, and cultural riverside tours.',
    amenities: ['Balsa River Cruise', 'Set Lunch', 'Hotel de Oriente Viewing', '1 Hour Walking Guided Tour', 'Beach Access (Free Time)', 'Tranvia Ride', 'Van Transfers (Mnl-Bat-Mnl)'],
    landmarks: [
      { name: 'Hotel de Oriente', price: 0, image: 'images/hotel-de-oriente.jpg', desc: 'Viewing of historic luxury hotel facade.' },
      { name: 'Balsa River', price: 0, image: 'images/balsa-river.jpg', desc: 'Scenic river cruise.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '04:00 AM', title: 'Departure from Manila', details: 'Departure via van transfer.' },
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Mount Samat Side Trip', details: 'Mount Samat, Japanese-Filipino Friendship Tower, Zero Kilometer.' },
      { dayGroup: 'Day 1', day: '09:30 AM', title: 'ETD to Las Casas', details: 'Travel from side trip to Las Casas.' },
      { dayGroup: 'Day 1', day: '10:00 AM', title: 'Registration', details: 'Arrival and registration at Las Casas.' },
      { dayGroup: 'Day 1', day: '10:30 AM', title: 'Walking Guided Tour', details: '1-hour professional heritage walking tour.' },
      { dayGroup: 'Day 1', day: '11:30 AM', title: 'Hotel de Oriente Viewing', details: 'Explore the iconic architectural landmark.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Set Lunch', details: 'Enjoy set lunch (12:00 NN - 2:00 PM).' },
      { dayGroup: 'Day 1', day: '01:30 PM', title: 'Balsa River Cruise', details: 'River cruise experience (weather permitting).' },
      { dayGroup: 'Day 1', day: '02:30 PM', title: 'Check-in / Free Time', details: 'Resort check-in.' },
      { dayGroup: 'Day 1', day: '03:00 PM', title: 'Tranvia Ride to Beach', details: 'Tranvia ride to beach for self-guided leisure time.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Going back to Manila', details: 'Return trip back to Manila.' }
    ],
    addons: [{ id: 'souvenir', name: 'Cultural Souvenir Pack', price: 500 }, { id: 'costume', name: 'Heritage Costume Rental & Photo Session', price: 350 }, { id: 'calesa', name: 'Calesa Ride Around the Grounds', price: 250 }]
  },

  'mount-samat-corregidor': {
    id: 'mount-samat-corregidor',
    bestTime: 'November to March is the most comfortable time for hilltop views and island tours. April and May are hot; the rainy season (June to October) can cancel boat trips.',
    name: 'Mount Samat & Corregidor Day Tour',
    location: 'Bataan, Philippines',
    stars: '★★★★★',
    price: '₱3,999',
    numericPrice: 3999,
    duration: '1 Day',
    badge: 'Day Tour',
    discount: 5,
    category: 'Heritage',
    packageType: 'Day Trip',
    image: 'images/mount-samat-shrine.jpg',
    description: 'Explore the historic island fortress of Corregidor and the majestic Mount Samat Shrine of Valor on an action-packed 1-day historical day tour from Manila.',
    amenities: [
      'Roundtrip Van Transfer (MNL-BAT-MNL)',
      'Roundtrip outrigger boat ride (Mariveles Bataan to Corregidor)',
      'Tour Vehicle (Tranvia Bus 35 seater)',
      'Island Entrance Fee & Historical Tour',
      'DOT-Accredited Travel Guide',
      'Bento Lunch'
    ],
    landmarks: [
      { name: 'Middle Side Barracks', price: 0, image: 'images/middle-side-barracks.jpg', desc: 'Historic military quarters on Corregidor.' },
      { name: 'Mile Long Barracks', price: 0, image: 'images/mile-long-barracks.jpg', desc: 'Known as the longest military barracks in the world.' },
      { name: 'Malinta Tunnel', price: 0, image: 'images/malinta-tunnel.jpg', desc: 'Underground tunnel system and historic site.' },
      { name: 'Mt. Samat Shrine of Valor', price: 0, image: 'images/mount-samat-shrine.jpg', desc: 'Panoramic viewpoint and towering memorial cross.' },
      { name: 'Plaza Mayor de Balanga', price: 0, image: 'images/plaza-mayor-balanga.jpg', desc: 'Iconic plaza and church stop.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '04:00 AM', title: 'Manila Pick-up', details: 'Departure via roundtrip van transfer.' },
      { dayGroup: 'Day 1', day: '07:00 AM', title: 'Meet up Mariveles, Bataan', details: 'Arrival at Mariveles meetup point.' },
      { dayGroup: 'Day 1', day: '07:30 AM', title: 'ETA Corregidor & Historical Tour', details: 'Outrigger boat ride to Corregidor Island and start of guided tour.' },
      { dayGroup: 'Day 1', day: '11:30 AM', title: 'Lunch Break', details: 'Bento lunch provided during tour.' },
      { dayGroup: 'Day 1', day: '12:30 PM', title: 'ETD Corregidor', details: 'Boat transfer back to mainland Bataan.' },
      { dayGroup: 'Day 1', day: '01:00 PM', title: 'Port Arrival', details: 'Arrival back at port.' },
      { dayGroup: 'Day 1', day: '02:00 PM', title: 'ETA Mt. Samat', details: 'Visit Mt. Samat Shrine of Valor and Sword of Flame.' },
      { dayGroup: 'Day 1', day: '03:30 PM', title: 'ETD Mt. Samat', details: 'Departure from Mt. Samat.' },
      { dayGroup: 'Day 1', day: '04:30 PM', title: 'St. Joseph Parish & Plaza Mayor', details: 'Quick stop at St. Joseph Parish Church and Plaza Mayor de Balanga.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Pasalubong & Dinner', details: 'Pasalubong shopping and dinner stop at Best of Bataan Restaurant.' }
    ],
    addons: [{ id: 'souvenir', name: 'Bataan Special Pasalubong Pack', price: 450 }, { id: 'malinta-show', name: 'Malinta Tunnel Light & Sound Show', price: 250 }, { id: 'samat-deck', name: 'Mt. Samat Cross Viewing Deck', price: 100 }]
  },

  'bnpp-mount-samat': {
    id: 'bnpp-mount-samat',
    bestTime: 'The dry season, November to May, is best. Go in the morning for clearer views and cooler air.',
    name: 'Bataan Nuclear Power Plant & Mount Samat',
    location: 'Bataan, Philippines',
    stars: '★★★★★',
    price: '₱2,499',
    numericPrice: 2499,
    duration: '1 Day',
    badge: 'New Tour',
    discount: 5,
    category: 'Heritage',
    packageType: 'Day Trip',
    image: 'images/BNPP.jpg',
    description: 'Explore the iconic Bataan Nuclear Power Plant, the historical Mount Samat Shrine, Japanese-Filipino Friendship Tower, Zero Kilometer marker, and Bataan WWII Museum on an action-packed day tour from Manila.',
    amenities: [
      'Van Transfer (Mnl-Bat-Mnl)',
      'Bataan Nuclear Power Plant Insight Tour',
      'Mount Samat Exclusive Guided Tour',
      'Japanese-Filipino Friendship Tower & Zero Kilometer marker',
      'Bataan WWII Museum Tour',
      'Rolling Tours (Sword of Flame, St. Joseph Parish, Plaza Mayor)',
      'DOT-Accredited Travel Guide'
    ],
    landmarks: [
      { name: 'Bataan Nuclear Power Plant', price: 0, image: 'images/bataan.jpg' },
      { name: 'Mount Samat Shrine', price: 0, image: 'images/mount-samat-shrine.jpg', desc: 'Shrine of Valor and panoramic views.' },
      { name: 'Japanese-Filipino Friendship Tower', price: 0, image: 'images/japanese-filipino-friendship-tower.jpg', desc: 'Historic memorial landmark.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '04:00 AM', title: 'Departure from Manila', details: 'Departure via van transfer to Bataan.' },
      { dayGroup: 'Day 1', day: '08:00 AM - 10:00 AM', title: 'BNPP Insight Tour', details: 'Guided exploration of the Bataan Nuclear Power Plant.' },
      { dayGroup: 'Day 1', day: '10:00 AM', title: 'Friendship Tower & Zero KM', details: 'Visit Japanese-Filipino Friendship Tower & Zero Kilometer marker.' },
      { dayGroup: 'Day 1', day: '10:30 AM - 12:00 PM', title: 'Mount Samat Historical Tour', details: 'Explore the Mount Samat shrine and memorial grounds.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break (Optional buffet lunch available).' },
      { dayGroup: 'Day 1', day: '01:00 PM', title: 'Bataan Tourism', details: 'Bataan tourism highlights and cultural stops.' },
      { dayGroup: 'Day 1', day: '02:00 PM', title: 'Bataan WWII Museum', details: 'Explore historical exhibits at the Bataan WWII Museum.' },
      { dayGroup: 'Day 1', day: '03:00 PM', title: 'Rolling Tours', details: 'Visit Sword of Flame in Pilar, St. Joseph Parish Church, and Plaza Mayor Ciudad de Balanga.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Snack Time / Early Dinner', details: 'Food and rest stop.' },
      { dayGroup: 'Day 1', day: '06:00 PM', title: 'Back to Manila', details: 'Departure back to Manila.' }
    ],
    addons: [{ id: 'buffet-lunch', name: 'Buffet Lunch (Filipino Dish)', price: 300 }, { id: 'samat-deck', name: 'Mt. Samat Cross Viewing Deck', price: 100 }, { id: 'souvenir', name: 'Bataan Pasalubong Pack', price: 450 }]
  },

  'camaya-five-fingers-laki': {
    id: 'camaya-five-fingers-laki',
    bestTime: 'Beach weather is best from December to May, and the sea is calmest in the morning. Rough water is common in the rainy season.',
    name: '4-in-1 Camaya, Five Fingers & Laki Beach',
    location: 'Bataan, Philippines',
    stars: '★★★★★',
    price: '₱2,499',
    numericPrice: 2499,
    duration: '2D1N',
    badge: 'Beach Getaway',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    image: 'images/fivefingers.jpg',
    description: 'Experience the ultimate 2D1N Bataan beach adventure! Explore Five Fingers coves, swim at Laki Beach, and enjoy Camaya Coast waterparks, infinity pools, and beachfront activities with overnight guesthouse stay.',
    amenities: [
      'Five Fingers Island Hopping & Boat Fee',
      'Laki Beach Entrance Fee & Swimming',
      'Camaya Coast Entrance & Infinity Pool Access',
      'Aqua Fun Water Park & Inflatable Waterpark Access',
      'Free Beachfront Tables/Chairs & Recreational Activities',
      '2D1N Air-Conditioned Guesthouse Accommodation'
    ],
    landmarks: [
      { name: 'Five Fingers Coves', price: 0, image: 'images/fivefingers.jpg', desc: 'Scenic cove island hopping and rock formations.' },
      { name: 'Laki Beach', price: 0, image: 'images/lakibeach.jpg', desc: 'Pristine white sand beach and swimming.' },
      { name: 'Camaya Coast', price: 0, image: 'images/camayacoast.jpg', desc: 'Waterpark, infinity pools, and evening fire dancing.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Call Time & Five Fingers Hopping', details: 'Arrival and start of Five Fingers island hopping and boat tour.' },
      { dayGroup: 'Day 1', day: '11:00 AM', title: 'Laki Beach Swimming & Leisure', details: 'Free time, beach relaxation, and swimming at Laki Beach until 4:30 PM.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Port Arrival & Check-in', details: 'Departure from port and check-in to air-conditioned guesthouse.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Camaya Coast Waterpark & Beach Day', details: 'Full access to Camaya Coast infinity pools and waterpark.' },
      { dayGroup: 'Day 2', day: '05:00 PM', title: 'Weekend Entertainment', details: 'Live band and fire dancing show.' }
    ],
    addons: [{ id: 'breakfast', name: 'Add Breakfast Package', price: 500 }, { id: 'snorkel', name: 'Snorkeling Gear Rental (Five Fingers)', price: 200 }, { id: 'kayak', name: 'Camaya Coast Kayak Rental', price: 500 }, { id: 'cottage', name: 'Laki Beach Cottage Rental (15 Pax)', price: 950 }]
  },

  'five-fingers-laki-camping': {
    id: 'five-fingers-laki-camping',
    bestTime: 'December to April usually has the driest, clearest nights for camping. Bring a light rain cover because sudden showers still happen.',
    name: 'Five Fingers & Laki Beach Camping',
    location: 'Mariveles, Bataan, Philippines',
    stars: '★★★★★',
    price: '₱999',
    numericPrice: 999,
    duration: '2D1N',
    badge: 'Camping Style',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    image: 'images/fivecamping.jpg',
    description: 'Experience an epic 2D1N camping adventure in Mariveles, Bataan! Explore Five Fingers rock formations, cliff dive at Nagbalite, swim at Laki Death Pool, and camp under the stars.',
    amenities: [
      'Five Fingers Island Hopping & Roundtrip Boat Fee',
      'Life Vest & Environmental Fees',
      'Entrance Fee to Laki Beach',
      'First Aid Kit',
      'Guided Trekking, Caving & Cliff Jumping Activities'
    ],
    landmarks: [
      { name: 'Nagbintana Rock Formation', price: 0, image: 'images/nagbintana.jpg', desc: 'Stunning iconic rock formations.' },
      { name: 'Nagbalite Cliff Dive', price: 0, image: 'images/nagbalite.jpg', desc: 'Thrilling 40ft cliff diving spot.' },
      { name: 'Laki Beach & Death Pool', price: 0, image: 'images/lakibeach.jpg', desc: 'Pristine beach camping and natural tidal pool.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '07:00 PM', title: 'Call Time & Port Arrival', details: 'Call time, registration, and waiver signing.' },
      { dayGroup: 'Day 1', day: '07:30 AM', title: 'Five Fingers Island Hopping', details: 'Explore Nagbintana Rock Formation, Nagbalite 40ft Cliff Dive.' },
      { dayGroup: 'Day 1', day: '10:30 AM', title: 'Arrival at Laki Beach & Camping', details: 'Tent pitching, swimming, and exploring cliff side.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Call Time & Back to Port', details: 'Return boat departure.' }
    ],
    addons: [{ id: 'tent-rental', name: 'Camping Tent Rental', price: 400 }, { id: 'cottage', name: 'Cottage Rental (15 Pax)', price: 950 }, { id: 'snorkel', name: 'Snorkeling Gear Rental', price: 200 }, { id: 'life-vest', name: 'Life Vest Rental (Nagbalite Cliff Dive)', price: 100 }, { id: 'bonfire', name: 'Firewood & Bonfire Set', price: 250 }]
  },

  'playa-la-caleta-overnight': {
    id: 'playa-la-caleta-overnight',
    bestTime: 'December to May has calmer seas and clear skies. Bring sun protection; weekends fill up first.',
    name: 'Playa La Caleta Overnight & Island Hopping',
    location: 'Bagac, Bataan, Philippines',
    stars: '★★★★★',
    price: '₱2,499',
    numericPrice: 2499,
    duration: '2D1N',
    badge: 'Beach Escape',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    image: 'images/playa.jpg',
    description: 'Enjoy a relaxing 2D1N beach getaway at Playa La Caleta in Bagac, Bataan! Includes private round-trip boat transfers, island hopping, beach & pool access, and overnight fan-cooled nipa gazebo accommodation.',
    amenities: [
      'Round-trip private boat transfers',
      'Island hopping (BNPP, Sugong Cave & Miguelito Island)',
      'Welcome drinks & Breakfast',
      'Beach & Pool Access',
      'Overnight gazebo accommodation with ocean views & beddings',
      'Shared shower, toilet & grilling facilities'
    ],
    landmarks: [
      { name: 'Sugong Cave', price: 0, image: 'images/sugongcave.jpg', desc: 'Scenic island cave exploration.' },
      { name: 'Miguelito Island', price: 0, image: 'images/miguelito.jpg', desc: 'Pristine island hopping destination.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '09:00 AM', title: 'Bagac Port Call Time', details: 'Meetup and briefing at Bagac Port.' },
      { dayGroup: 'Day 1', day: '09:30 AM', title: 'Island Hopping Tour', details: 'Visit Bataan Nuclear Power Plant, Sugong Cave, and Miguelito Island.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Resort Check-out', details: 'Check-out and boat transfer back to Bagac Port.' }
    ],
    addons: [{ id: 'glamping', name: 'Upgrade to Family Glamping Tent', price: 1200 }, { id: 'snorkel', name: 'Snorkeling Gear Rental', price: 200 }, { id: 'cave-guide', name: 'Sugong Cave Local Guide', price: 150 }]
  },

  'la-jolla-bataan': {
    id: 'la-jolla-bataan',
    bestTime: 'December to May is best for swimming. The sea is usually calmest in the morning.',
    name: 'La Jolla Bataan Resort',
    location: 'Bataan, Philippines',
    stars: '★★★★★',
    price: '₱4,750',
    numericPrice: 4750,
    duration: '2D1N',
    badge: 'Luxury Resort',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKUDC-HKcrEw0PHAE0okhBk-M484k6-CCRFyQ_2l1gyRthMGVHbSXxNaeB&s=10',
    description: 'Experience a luxurious 2D1N beach getaway at La Jolla Bataan Resort! Includes roundtrip van transfers, family room with loft, complimentary breakfast, swimming pool & beach access.',
    amenities: [
      'Round-trip Van Transfers (Manila-Bataan-Manila)',
      'Family Room with Loft (Good for 6-8 Persons)',
      'Complimentary Breakfast',
      'Swimming Pool & Beach Use',
      'Access to Free Wi-Fi & Kiddie Play Room'
    ],
    landmarks: [
      { name: 'La Jolla Beachfront', price: 0, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400&auto=format&fit=crop', desc: 'Pristine white sand beach and coastal views.' },
      { name: 'Resort Swimming Pool', price: 0, image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=400&auto=format&fit=crop', desc: 'Relaxing infinity and resort pools.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '07:00 AM', title: 'Departure from Manila', details: 'Van transfer pickup from Manila to Bataan.' },
      { dayGroup: 'Day 1', day: '02:00 PM', title: 'Resort Check-in & Leisure', details: 'Check-in and free time for beach/pool access.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Resort Check-out', details: 'Check-out from family loft room and return to Manila.' }
    ],
    addons: [{ id: 'spa', name: 'Resort Wellness Spa Session', price: 950 }, { id: 'cabana', name: 'Beachfront Cabana Rental', price: 800 }, { id: 'breakfast', name: 'Extra Resort Breakfast', price: 400 }]
  },

  'bataan-3d2n': {
    id: 'bataan-3d2n',
    bestTime: 'November to May is the dry season and best for the coastal and historical stops. Start early because afternoons are hot.',
    name: 'Bataan Top Destinations 3D2N',
    location: 'Bataan, Philippines',
    stars: '★★★★★',
    price: '₱7,950',
    numericPrice: 7950,
    duration: '3D2N',
    badge: 'Premium Value',
    discount: 10,
    category: 'Heritage',
    packageType: 'Full Stay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2w_v-cbodElIZ_2Aj5Xe3vhJ5jQGtEKoA1tceFYMGQCKVh05bP8FCEG4&s=10',
    description: 'Experience the ultimate 3D2N Bataan adventure! Explore historical landmarks, pristine beaches, heritage resorts, and scenic coastal views across Package A, B, and C options.',
    amenities: [
      'Van Transfers (Manila - Bataan - Manila)',
      '2-Night Resort Stay / 1-Night Las Casas Stay (per package)',
      'Daily Breakfast',
      'Tour Coordinator & Driver\'s Fee',
      'Guided Historical & Beach Tours'
    ],
    landmarks: [
      { name: 'Las Casas Filipinas', price: 0, image: 'images/las-casas.jpg', desc: 'Heritage resort & open-air Spanish-Filipino colonial museum.' },
      { name: 'Camaya Coast', price: 0, image: 'images/camayacoast.jpg', desc: 'Premier beach destination with white sand and clear waters.' },
      { name: 'Corregidor Island', price: 0, image: 'images/mile-long-barracks.jpg', desc: 'Historic fortress island with WWII ruins and memorials.' },
      { name: 'Mt. Samat', price: 0, image: 'images/mount-samat-shrine.jpg', desc: 'Shrine of Valor and panoramic viewpoint.' },
      { name: 'Mariveles Five Fingers', price: 0, image: 'images/fivefingers.jpg', desc: 'Scenic cove hiking and cliff-side rock formations.' }
    ],
    itineraryPackageA: [
      { dayGroup: 'Day 1', day: '05:00 AM', title: 'Departure from Manila & Arrival in Bataan', details: 'Van transfer from Manila to Bataan.' },
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Mt. Samat & Bataan Heritage Tour', details: 'Explore the Shrine of Valor, World War II memorials, and historical museums.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Local cuisine lunch break.' },
      { dayGroup: 'Day 1', day: '01:30 PM', title: 'Corregidor Historical Tour', details: 'Guided ferry and historical tour of Corregidor Island ruins and barracks.' },
      { dayGroup: 'Day 1', day: '06:00 PM', title: 'Resort Check-in & Dinner', details: 'Check-in to 2-night resort stay and dinner.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Breakfast at Resort', details: 'Daily breakfast provided.' },
      { dayGroup: 'Day 2', day: '08:30 AM', title: 'Las Casas Day Tour & Activities', details: 'Heritage walking tour, river cruise, and Hotel de Oriente viewing.' },
      { dayGroup: 'Day 2', day: '12:30 PM', title: 'Lunch at Las Casas', details: 'Enjoy local set lunch.' },
      { dayGroup: 'Day 2', day: '02:00 PM', title: 'Tranvia & Beach Leisure', details: 'Tranvia ride and afternoon relaxation at Las Casas beach.' },
      { dayGroup: 'Day 2', day: '07:00 PM', title: 'Dinner & Free Time', details: 'Dinner at leisure.' },
      { dayGroup: 'Day 3', day: '07:00 AM', title: 'Breakfast & Checkout Prep', details: 'Breakfast at the resort.' },
      { dayGroup: 'Day 3', day: '09:00 AM', title: 'Camaya Coast Day Tour & Activities', details: 'Enjoy white sand beaches and coastal activities at Camaya Coast.' },
      { dayGroup: 'Day 3', day: '01:00 PM', title: 'Lunch & Pasalubong Shopping', details: 'Lunch and local Bataan pasalubong shopping.' },
      { dayGroup: 'Day 3', day: '03:30 PM', title: 'ETD Back to Manila', details: 'Departure via van transfer back to Manila.' },
      { dayGroup: 'Day 3', day: '07:30 PM', title: 'ETA in Manila', details: 'Safe arrival back in Manila.' }
    ],
    itineraryPackageB: [
      { dayGroup: 'Day 1', day: '05:00 AM', title: 'Departure from Manila', details: 'Van transfer from Manila to Bataan.' },
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Mt. Samat & Heritage Tour', details: 'Visit Mt. Samat Shrine of Valor and local heritage sites.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break.' },
      { dayGroup: 'Day 1', day: '01:30 PM', title: 'Mariveles & Balanga City Tour', details: 'Explore Balanga City tourist spots, museums, and Plaza Mayor.' },
      { dayGroup: 'Day 1', day: '06:00 PM', title: 'Resort Check-in & Dinner', details: 'Check-in to 2-night resort stay.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Breakfast at Resort', details: 'Daily breakfast provided.' },
      { dayGroup: 'Day 2', day: '08:30 AM', title: 'Mariveles Five Fingers & Laki Beach Tour', details: 'Scenic cove boat tour, cliff jumping, rock formations, and swimming at Laki Beach.' },
      { dayGroup: 'Day 2', day: '12:30 PM', title: 'Island Picnic Lunch', details: 'Fresh seafood picnic lunch by the beach.' },
      { dayGroup: 'Day 2', day: '04:00 PM', title: 'Return to Resort & Rest', details: 'Freshen up and leisure time at the resort.' },
      { dayGroup: 'Day 2', day: '07:00 PM', title: 'Dinner Time', details: 'Dinner at local restaurant.' },
      { dayGroup: 'Day 3', day: '07:00 AM', title: 'Breakfast & Checkout', details: 'Breakfast and hotel checkout.' },
      { dayGroup: 'Day 3', day: '09:00 AM', title: 'Camaya Coast Day Tour & Activities', details: 'Full morning beach resort experience and water activities at Camaya Coast.' },
      { dayGroup: 'Day 3', day: '01:30 PM', title: 'Lunch & Souvenirs', details: 'Lunch and local shopping.' },
      { dayGroup: 'Day 3', day: '03:30 PM', title: 'ETD Back to Manila', details: 'Departure back to Manila.' },
      { dayGroup: 'Day 3', day: '07:30 PM', title: 'ETA in Manila', details: 'Safe arrival in Manila.' }
    ],
    itineraryPackageC: [
      { dayGroup: 'Day 1', day: '05:00 AM', title: 'Departure from Manila', details: 'Van transfer to Bataan.' },
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Mt. Samat & Heritage Tour', details: 'Explore Mt. Samat shrine and Bataan historical landmarks.' },
      { dayGroup: 'Day 1', day: '12:00 PM', title: 'Lunch Break', details: 'Lunch break.' },
      { dayGroup: 'Day 1', day: '01:30 PM', title: 'Corregidor Historical Tour', details: 'Ferry and guided historical tour of Corregidor Island.' },
      { dayGroup: 'Day 1', day: '06:00 PM', title: 'Las Casas Overnight Check-in', details: 'Exclusive overnight stay inside Las Casas Filipinas de Acuzar heritage resort.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Heritage Breakfast', details: 'Breakfast at Las Casas.' },
      { dayGroup: 'Day 2', day: '08:30 AM', title: 'Las Casas Heritage Tour & Activities', details: 'Comprehensive guided walking tour, artisan workshops, and balsa river cruise.' },
      { dayGroup: 'Day 2', day: '12:30 PM', title: 'Lunch at Las Casas', details: 'Set lunch at heritage restaurant.' },
      { dayGroup: 'Day 2', day: '02:30 PM', title: 'Beach & Tranvia Leisure', details: 'Tranvia rides and private beach access.' },
      { dayGroup: 'Day 2', day: '07:00 PM', title: 'Dinner & Cultural Night', details: 'Dinner and cultural fountain show.' },
      { dayGroup: 'Day 3', day: '07:00 AM', title: 'Breakfast & Checkout', details: 'Breakfast and checkout from Las Casas.' },
      { dayGroup: 'Day 3', day: '09:00 AM', title: 'Camaya Coast Day Tour & Activities', details: 'Morning coastal tour and beach relaxation at Camaya Coast.' },
      { dayGroup: 'Day 3', day: '01:00 PM', title: 'Lunch & Pasalubong', details: 'Lunch and pasalubong shopping.' },
      { dayGroup: 'Day 3', day: '03:30 PM', title: 'ETD Back to Manila', details: 'Departure back to Manila.' },
      { dayGroup: 'Day 3', day: '07:30 PM', title: 'ETA in Manila', details: 'Safe arrival in Manila.' }
    ],
    addons: [{ id: 'kayak', name: 'Camaya Coast Kayak Rental', price: 500 }, { id: 'gopro', name: 'GoPro Underwater Rental', price: 900 }, { id: 'malinta-show', name: 'Corregidor Malinta Tunnel Light & Sound Show', price: 250 }, { id: 'costume', name: 'Las Casas Heritage Costume & Photo Session', price: 350 }, { id: 'calesa', name: 'Las Casas Calesa Ride', price: 250 }, { id: 'snorkel', name: 'Five Fingers Snorkeling Gear Rental', price: 200 }]
  }
};

export const blogsData = [
  {
    title: "5 Packing Hacks for Island Trips",
    category: "Travel Guide",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
    excerpt: "Pack light and travel smart with these essential beach hacks for your next tropical escape.",
    body: [
      "Island trips reward travelers who pack light. Boat transfers, sandy paths and small rooms all get harder with a big suitcase, so a soft duffel or backpack is usually the smarter choice.",
      "## 1. Roll, then cube",
      "Rolling clothes saves space, and packing cubes keep sandy or damp items away from clean ones. Use one cube for tops, one for bottoms and one for swimwear.",
      "## 2. Dress in layers that dry fast",
      "Quick-dry shirts and shorts dry overnight and weigh almost nothing. Two swimsuits and three or four tops are plenty for a 2D1N trip.",
      "## 3. Protect your electronics",
      "A waterproof pouch or a few zip-top bags can save a phone during boat rides and sudden showers. Bring a power bank too, because outlets at beach spots are often limited.",
      "## 4. Choose reef-safe sunscreen",
      "Look for mineral sunscreen and apply it before you leave your room. Add a hat, sunglasses and a light long-sleeve cover-up for the midday sun.",
      "## 5. Keep a small essentials pouch",
      [
        "Reusable water bottle",
        "Motion-sickness tablets if boats make you queasy",
        "Basic first-aid items and insect repellent",
        "Small towel and water shoes for rocky shores",
        "Cash in small bills for tips and fees"
      ],
      "Before you zip up, lay everything out and remove one third of it. You will almost never miss it."
    ]
  },
  {
    title: "Must-Try Local Food Spots",
    category: "Go Taste",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop",
    excerpt: "A culinary journey into regional food cultures, night markets, and local delicacies.",
    body: [
      "Food is half the reason to travel. Whether you are in the cool mountains of Benguet or on the coast of Bataan, the most memorable meals are usually simple, local and shared.",
      "## Baguio: sweet treats and warm cups",
      "Start with strawberry taho, a popular Baguio snack of soft tofu, sweet syrup and fresh strawberries. Pasalubong shops sell ube jam and peanut brittle, and the cool climate makes a hot cup of Benguet coffee a treat at any hour.",
      "After dark, the night market fills with street food, bargain clothes and secondhand finds. Go hungry and graze your way through it.",
      "## Bataan: seafood by the shore",
      "On Bataan's coast the menu follows the catch. Expect grilled fish, shrimp and squid cooked simply and served with rice, calamansi and a dip of vinegar or soy sauce. Eat seafood at lunchtime when it is freshest, and ask what came in that morning.",
      "## How to eat well anywhere",
      [
        "Follow the locals: a short menu and a busy counter usually mean fresh food",
        "Carry small bills and ask for the price before you order at stalls",
        "Try one regional specialty per meal instead of the familiar favorite",
        "Bring a light snack and water for long travel days",
        "Mention allergies early, in simple words"
      ],
      "Finally, do not forget pasalubong. Bringing home jars, boxes and treats for the people who stayed behind is part of the trip."
    ]
  },
  {
    title: "Top 48-Hour City Itineraries",
    category: "Weekend Away",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop",
    excerpt: "Maximize your weekend quick-getaways with detailed hourly city schedules.",
    body: [
      "Two days is enough to see the heart of Baguio if you plan the route by area instead of rushing between stops. Here is a simple plan that works for first-timers.",
      "## Day 1: Downtown and sunset",
      "Arrive early, drop your bags and walk through Burnham Park. Rent a bike or a rowboat on the lake, then stroll up Session Road for coffee and bakeries. In the late afternoon, head to Mirador Heritage for quiet paths and city views, then spend the evening at the night market and a hot dinner.",
      "## Day 2: Strawberries and pine trees",
      "Go to the strawberry farm early, before the crowds, and pick your own. Return to the city for lunch, then spend the afternoon among the tall pines of Camp John Hay. Finish with the colorful Stobosa houses for photos and a pasalubong run before the ride home.",
      "## Make it work",
      [
        "Leave very early on your travel day to beat traffic on the way up",
        "Wear walking shoes, because Baguio is built on steep hills",
        "Bring a light jacket, since evenings are cold",
        "Book your stay and transport ahead during holidays",
        "Keep your last hour free for pasalubong shopping"
      ],
      "Prefer not to plan every hour? Our Baguio City Getaway package covers the stay and the main stops for you."
    ]
  },
  {
    title: "Baguio on a Budget: Enjoying the City of Pines for Less",
    category: "Budget Tips",
    date: "June 2026",
    image: "images/mirador-heritage.jpg",
    excerpt: "Smart ways to save on food, transport and stays without missing the best of Baguio.",
    body: [
      "Baguio is easy on the wallet when you know where to spend and where to save. The cool weather also means you can skip air-conditioned rides and walk for much of the day.",
      "## Pick your dates carefully",
      "December and Holy Week bring crowds and higher prices. Midweek trips and the rainy months from June to October are quieter and often cheaper. Just pack a rain jacket.",
      "## Eat where locals eat",
      "Public market eateries and small carinderias serve filling meals for far less than tourist cafes. Save the coffee shop splurge for one special afternoon.",
      "## Walk first, ride second",
      "Many top spots, including Burnham Park, Session Road and the public market, are close to each other. For farther stops, jeepneys and shared rides cost a fraction of a private taxi.",
      "## Free and low-cost things to do",
      [
        "Stroll and people-watch at Burnham Park",
        "Browse the night market and the public market",
        "Pick strawberries at the farm and pay only for what you pick",
        "Walk among the pines at Camp John Hay",
        "Take photos at the colorful Stobosa houses"
      ],
      "## Bundle where it makes sense",
      "A package that combines the stay and activities, like TraveLaya's Baguio City Getaway, can make your total easier to predict. Compare what is included before you decide."
    ]
  },
  {
    title: "Mount Samat and Corregidor: A First-Timer's Guide to Bataan's War History",
    category: "Heritage",
    date: "June 2026",
    image: "images/mount-samat-shrine.jpg",
    excerpt: "Two of the Philippines' most moving historical sites, explained simply, with tips for a respectful visit.",
    body: [
      "Few trips in the Philippines are as moving as a visit to the places where World War II was fought in Bataan and Corregidor. Both fit into one day from Manila, but they deserve unhurried attention.",
      "## Mount Samat Shrine of Valor",
      "Known as Dambana ng Kagitingan, the shrine honors the Filipino and American soldiers who defended Bataan in 1942. A giant memorial cross crowns the mountain, and the grounds include a museum and viewing areas with wide views of the land and sea. Go in the morning for clearer views and cooler air.",
      "## Corregidor Island",
      "Corregidor, nicknamed The Rock, guarded the entrance to Manila Bay. Ruins of barracks and gun batteries still stand, and places like the Malinta Tunnel and the Mile Long Barracks tell the story of the island's defenders. Boat trips can be canceled when the sea is rough, which is more common in the rainy season from June to October.",
      "## A little history",
      "Bataan fell in April 1942, and the Death March that followed became one of the most remembered chapters of the war. Corregidor surrendered the following month. Araw ng Kagitingan, or the Day of Valor, is observed every April 9.",
      "## Tips for visiting",
      [
        "November to March is the most comfortable time to go",
        "Wear a hat and comfortable shoes, and bring water",
        "Start early, because both sites involve a lot of walking",
        "Keep your voice low and follow posted rules at memorials",
        "Check the weather before you book, since boat trips depend on the sea"
      ],
      "Our Mount Samat & Corregidor Day Tour combines both stops in one day from Manila."
    ]
  },
  {
    title: "Five Fingers and Laki Beach Camping: What to Bring and What to Expect",
    category: "Adventure",
    date: "May 2026",
    image: "images/fivecamping.jpg",
    excerpt: "Rock formations, cliff jumps and a night under the stars in Mariveles, Bataan, with a packing list.",
    body: [
      "Mariveles, at the southern tip of Bataan, is home to dramatic rock formations, hidden coves and beaches that feel far from the city. Camping here is simple and rewarding if you prepare well.",
      "## What you will see",
      "Five Fingers is known for its rock formations rising from the sea. Nearby highlights include the Nagbintana rock formation, the Nagbalite cliff-dive spot and Laki Beach with its Death Pool, a natural swimming area.",
      "## What to bring",
      [
        "Tent or shelter, sleeping mat and a light blanket",
        "Headlamp or flashlight with spare batteries",
        "Water shoes with good grip for rocky areas",
        "Dry bags for phones, clothes and food",
        "Trash bags, because you carry out everything you carry in",
        "A light rain cover, since sudden showers still happen",
        "Basic first-aid kit and insect repellent"
      ],
      "## Safety first",
      "Cliff jumping is thrilling but risky. Jump only where your guide says it is safe, check the water depth and conditions, and never jump alone or after drinking. Swim in calm morning conditions and stay close to shore, because rough water is common in the rainy season.",
      "## Best time to go",
      "December to April usually brings the driest, clearest nights for camping. Book early for weekends and holidays."
    ]
  },
  {
    title: "Planning a Bataan Beach Weekend: Camaya, La Jolla and Playa La Caleta",
    category: "Beach Guide",
    date: "April 2026",
    image: "images/playa.jpg",
    excerpt: "Three very different beach stays in Bataan, and how to choose the one that fits your group.",
    body: [
      "Bataan offers several beach getaways, each with its own feel. Here is how three popular stays compare, so you can match one to your group.",
      "## Camaya Coast, Five Fingers and Laki Beach",
      "Best for groups that want activity. Camaya Coast offers waterparks, infinity pools and beachfront activities, and our 4-in-1 package adds cove exploring at Five Fingers and a swim at Laki Beach, with an overnight guesthouse stay.",
      "## La Jolla Bataan Resort",
      "Best for families who want comfort. Expect a swimming pool, beach access and family rooms with a loft, with breakfast and round-trip van transfers included in the package.",
      "## Playa La Caleta",
      "Best for a laid-back island feel. Playa La Caleta in Bagac includes private boat transfers, island hopping and overnight nipa gazebo accommodation, with stops at spots like Sugong Cave and Miguelito Island.",
      "## Which one is for you?",
      [
        "Active barkada trip: Camaya, Five Fingers and Laki",
        "Family with kids or seniors: La Jolla",
        "Quiet, rustic escape: Playa La Caleta"
      ],
      "December to May has calmer seas and clearer skies, and weekends fill up first, so book early."
    ]
  },
  {
    title: "Las Casas Filipinas de Acuzar: Stepping Into Spanish-Era Philippines",
    category: "Heritage",
    date: "March 2026",
    image: "images/las-casas.jpg",
    excerpt: "Cobblestone streets and restored colonial houses make this Bagac, Bataan heritage resort feel like another century.",
    body: [
      "Walk down cobblestone streets lined with restored Spanish-Filipino houses and you will feel like you have stepped into the 1800s. Las Casas Filipinas de Acuzar in Bagac, Bataan, is a heritage resort and open-air museum built around restored colonial houses.",
      "## What to do",
      "Wander the heritage district at your own pace, peek into the restored houses and take a cultural riverside tour along the Balsa River. Landmarks such as Hotel de Oriente give you a sense of how grand travel used to be.",
      "## Make the most of the photos",
      "The scenery is made for pictures, so bring a charged phone or camera and wear comfortable shoes for the cobblestones. Early morning and late afternoon give the softest light.",
      "## When to go",
      "The dry season from November to May is best for walking the district. Midday is hot, so go early or late, and bring water and sunscreen.",
      "## Easy ways to visit",
      [
        "As a one-day trip with our Las Casas Filipinas de Acuzar day tour",
        "As part of the Bataan Top Destinations 3D2N package",
        "With family, since the history is easy for kids to enjoy"
      ]
    ]
  },
  {
    title: "Chasing the Right Weather: The Best Time to Visit Baguio and Bataan",
    category: "Travel Guide",
    date: "February 2026",
    image: "images/camp-johnhay.jpg",
    excerpt: "A simple seasonal guide so your trip lands on cool mountain mornings or calm beach days, not storms.",
    body: [
      "Choosing when to go can matter as much as choosing where. Here is a simple seasonal guide to our most popular destinations.",
      "## Baguio: cool and foggy, November to February",
      "Temperatures hover around 15 to 20 degrees Celsius, perfect for sweaters and hot chocolate. Expect crowds in December and during Holy Week. February also brings Panagbenga, the Baguio flower festival, so book early. June to October is the rainy season, so pack a rain jacket.",
      "## Bataan: dry season, November to May",
      "Beaches are best from December to May, when the seas are calmer. Historical stops are most comfortable from November to March. April and May get hot, so start early. The rainy season from June to October can cancel boat trips.",
      "## Quick planner",
      [
        "Cool-weather escape: Baguio, November to February",
        "Beach and island hopping: Bataan, December to May",
        "Heritage tours: Bataan, November to March",
        "Camping: Mariveles, December to April",
        "Fewer crowds: weekdays and the rainy months, with a backup plan"
      ],
      "Weather changes, so check the forecast a few days before you leave and keep your plans flexible."
    ]
  },
  {
    title: "How to Travel Responsibly in Nature and Heritage Spots",
    category: "Responsible Travel",
    date: "February 2026",
    image: "images/fivefingers.jpg",
    excerpt: "Small habits that keep beaches, trails and historic sites beautiful for the next traveler.",
    body: [
      "The places we love to visit stay beautiful only when visitors protect them. Small habits make a big difference, especially in fragile coastal and mountain areas.",
      "## Leave no trace",
      "Pack out all your trash, including wrappers and cigarette butts. Bring a reusable bottle and a small bag for garbage, since bins can be far from beaches and trails.",
      "## Protect the sea",
      "Choose reef-safe sunscreen, never step on or take coral, and keep a respectful distance from marine life. Do not feed fish or other wildlife.",
      "## Respect local communities",
      "Hire local guides and boat operators, buy from small stalls and ask before taking photos of people. Pay a fair price and avoid bargaining too hard over small amounts.",
      "## Stay on the trail",
      "Walk on marked paths, keep noise down in natural areas and never carve or write on rocks, trees or walls.",
      "## Honor memorials and heritage sites",
      "At places like Mount Samat, Corregidor and Las Casas, follow posted rules, do not climb on ruins and keep a respectful tone.",
      "## Quick checklist",
      [
        "Reusable water bottle and trash bag",
        "Reef-safe sunscreen",
        "Small cash for local vendors",
        "A guide for risky activities such as cliff jumping"
      ]
    ]
  },
  {
    title: "Family-Friendly Weekend Trips From Manila",
    category: "Family Travel",
    date: "January 2026",
    image: "images/strawberry-farm.jpg",
    excerpt: "Easy logistics, comfortable stays and activities for every age, from toddlers to lolos and lolas.",
    body: [
      "Traveling with kids or grandparents calls for easy logistics, comfortable stays and activities that suit all ages. These ideas fit a weekend.",
      "## La Jolla Bataan Resort",
      "A family room with a loft, a swimming pool, beach access and breakfast included make this a low-stress option for parents and kids alike.",
      "## Baguio's gentle attractions",
      "Strawberry picking, the lake and bikes at Burnham Park and the pines of Camp John Hay are easy activities that kids enjoy. Pack sweaters, because evenings are cold.",
      "## Las Casas for curious kids",
      "The heritage district works like a living history lesson, and the riverside tour is a highlight for younger visitors.",
      "## Tips for traveling with children",
      [
        "Leave early to avoid traffic and fussy afternoons",
        "Pack snacks, wet wipes, spare clothes and motion-sickness remedies",
        "Bring hats and sun protection for beach days",
        "Choose stays with a pool or beach that kids can enjoy safely",
        "Keep the plan light: one big activity per day is plenty",
        "Let kids help pack and choose one activity"
      ]
    ]
  },
  {
    title: "How to Plan a Group Trip Without the Headaches",
    category: "Travel Hacks",
    date: "December 2025",
    image: "images/BNPP.jpg",
    excerpt: "Friends, family or officemates: a simple checklist to keep planning smooth and everyone happy.",
    body: [
      "A trip with friends, family or officemates is more fun when planning is shared. A little structure up front prevents most arguments later.",
      "## Pick one organizer",
      "Choose one person to collect decisions and payments. Too many cooks make for confusing group chats.",
      "## Agree on the basics first",
      [
        "Dates and number of nights",
        "A per-person budget, including food and transport",
        "The type of trip: relaxing, adventurous or cultural",
        "Who is bringing kids or needs easier activities"
      ],
      "## Book early and confirm headcount",
      "Weekends, holidays and peak months fill up quickly. Confirm how many people are really going before you book, and set a clear payment deadline.",
      "## Plan around the slowest pace",
      "Pick activities that everyone can enjoy, and leave free time so people can rest or explore on their own.",
      "## Need something custom?",
      "TraveLaya takes group and custom trip inquiries. Tell us your dates, group size and budget through the inquiry form and we will get back to you."
    ]
  }
];

export const availableAddons = [
  { id: 'addon-1', name: 'Lorem ipsum dolor sit amet', price: 1200 },
  { id: 'addon-2', name: 'Consectetur adipiscing elit', price: 800 },
  { id: 'addon-3', name: 'Sed do eiusmod tempor', price: 650 }
];

export const reviewsData = [
  {
    name: "Frieren",
    location: "Visited Baguio City",
    rating: "★★★★★",
    comment: "It was a pleasant trip. Found a rare spot that serves great coffee and cool mountain air.",
    date: "August 2026",
    avatar: "https://images6.alphacoders.com/135/thumb-1920-1355045.jpeg"
  },
  {
    name: "Fern",
    location: "Visited Bataan Tour",
    rating: "★★★★★",
    comment: "The historical landmarks and coastal views were stunning. The booking process was very efficient.",
    date: "July 2026",
    avatar: "https://images.thedirect.com/media/article_full/fern_frieren.jpg?imgeng=/cmpr_60/w_1280"
  },  {
    name: "Michael Jackson",
    location: "Visited Baguio City",
    rating: "★★★★★",
    comment: "HEE HEE",
    date: "August 2026",
    avatar: "https://s.france24.com/media/display/95d8e080-0ec3-11e9-85db-005056a964fe/w:1280/p:1x1/jackson-top-m.jpg"
  }
];

export const topPlaces = [
  allPlacesData['baguio'], 
  allPlacesData['bnpp-mount-samat'], 
  allPlacesData['camaya-five-fingers-laki'], 
  allPlacesData['five-fingers-laki-camping'], 
  allPlacesData['playa-la-caleta-overnight'], 
  allPlacesData['la-jolla-bataan'], 
  allPlacesData['mount-samat-corregidor'], 
  allPlacesData['bataan-3d2n']
];

export const domesticPlaces = [
  allPlacesData['baguio'], 
  allPlacesData['las-casas'], 
  allPlacesData['bnpp-mount-samat'], 
  allPlacesData['camaya-five-fingers-laki'], 
  allPlacesData['five-fingers-laki-camping'], 
  allPlacesData['playa-la-caleta-overnight'], 
  allPlacesData['la-jolla-bataan'], 
  allPlacesData['mount-samat-corregidor'], 
  allPlacesData['bataan-3d2n']
];

export const internationalPlaces = [];