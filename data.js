export const heroImages = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop', // Scenic landscape
  'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop', // Tropical coast
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop', // Resort / beach
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'  // Ocean view
];

export const allPlacesData = {
  'baguio': {
    id: 'baguio',
    name: 'Baguio City Getaway',
    location: 'Benguet, Philippines',
    stars: '★★★★★',
    price: '₱2,500',
    numericPrice: 2500,
    duration: '2D1N / 3D2N',
    badge: 'Popular',
    discount: 10,
    category: 'Nature',
    packageType: 'Full Stay',
    // Pine trees / foggy mountain aesthetic for Baguio
    image: 'https://www.pluxee.ph/sites/g/files/jclxxe401/files/styles/plx_blog_cover_v2_desktop/public/2025-08/shutterstock_1929081746_11zon.jpg.webp?h=ba0a90e8&itok=4IsOoVyn',
    description: 'Experience the City of Pines! Enjoy cool mountain breezes, strawberry picking, scenic nature parks, historical landmarks, and the famous night market.',
    amenities: ['Van Transportation (Manila-Baguio-Manila)', 'Accommodation (Transient House Room Sharing)', 'Tour Coordinator', 'Driver\'s Fee & Fuel', 'City Tour'],
    landmarks: [
      { name: 'Strawberry Farm', price: 0, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=400&auto=format&fit=crop', desc: 'Pick fresh strawberries and try strawberry taho in La Trinidad.' },
      { name: 'Camp John Hay', price: 0, image: 'https://images.unsplash.com/photo-1511497584788-8767611425e1?q=80&w=400&auto=format&fit=crop', desc: 'Pine tree trails, Eco-Trail walk, and Bamboo Sanctuary.' },
      { name: 'Mirador Heritage', price: 0, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=400&auto=format&fit=crop', desc: 'Panoramic city views and bamboo grove path.' }
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
    addons: [{ id: 'souvenir', name: 'Special Pasalubong Box', price: 450 }]
  },

  'las-casas': {
    id: 'las-casas',
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
    // Spanish colonial architecture aesthetic
    image: 'https://ak-d.tripcdn.com/images/1ik6h12000t6d38yy8F7E_R_960_660_R5_D.webp',
    description: 'A unique heritage resort and open-air museum in Bagac, Bataan, showcasing restored Spanish-Filipino colonial houses, cobblestone streets, and cultural riverside tours.',
    amenities: ['Balsa River Cruise', 'Set Lunch', 'Hotel de Oriente Viewing', '1 Hour Walking Guided Tour', 'Beach Access (Free Time)', 'Tranvia Ride', 'Van Transfers (Mnl-Bat-Mnl)'],
    landmarks: [
      { name: 'Hotel de Oriente', price: 0, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop', desc: 'Viewing of historic luxury hotel facade.' },
      { name: 'Balsa River', price: 0, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop', desc: 'Scenic river cruise.' }
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
    addons: [{ id: 'souvenir', name: 'Cultural Souvenir Pack', price: 500 }]
  },

  'mount-samat-corregidor': {
    id: 'mount-samat-corregidor',
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
    // Monument / historical memorial aesthetic
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj0KJCLvhOCJW9wCAbuX2gjuPQpFaC43mB9Fhl_37OmNCqQ5Y7Rnptn67r&s=10',
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
      { name: 'Middle Side Barracks', price: 0, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop', desc: 'Historic military quarters on Corregidor.' },
      { name: 'Mile Long Barracks', price: 0, image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=400&auto=format&fit=crop', desc: 'Known as the longest military barracks in the world.' },
      { name: 'Malinta Tunnel', price: 0, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop', desc: 'Underground tunnel system and historic site.' },
      { name: 'Mt. Samat Shrine of Valor', price: 0, image: 'https://images.unsplash.com/photo-1562601579-599dec56540e?q=80&w=400&auto=format&fit=crop', desc: 'Panoramic viewpoint and towering memorial cross.' },
      { name: 'Plaza Mayor de Balanga', price: 0, image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=400&auto=format&fit=crop', desc: 'Iconic plaza and church stop.' }
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
    addons: [
      { id: 'souvenir', name: 'Bataan Special Pasalubong Pack', price: 450 }
    ]
  },

  'bnpp-mount-samat': {
    id: 'bnpp-mount-samat',
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
    // Architecture / industrial structure aesthetic
    image: 'https://newsinfo.inquirer.net/files/2022/11/391896.jpeg',
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
      { name: 'Bataan Nuclear Power Plant', price: 0, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop', desc: 'Insight tour of the historic nuclear facility.' },
      { name: 'Mount Samat Shrine', price: 0, image: 'https://images.unsplash.com/photo-1562601579-599dec56540e?q=80&w=400&auto=format&fit=crop', desc: 'Shrine of Valor and panoramic views.' },
      { name: 'Japanese-Filipino Friendship Tower', price: 0, image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=400&auto=format&fit=crop', desc: 'Historic memorial landmark.' }
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
    addons: [
      { id: 'buffet-lunch', name: 'Buffet Lunch (Filipino Dish)', price: 300 }
    ]
  },

  'camaya-five-fingers-laki': {
    id: 'camaya-five-fingers-laki',
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
    // Coastal cliff / cove aesthetic
    image: 'https://images.squarespace-cdn.com/content/v1/5fa1522044bdda192713063c/1626670210718-1WISP48LOVD84O32699D/Laki+Beach+in+Mariveles%2C+Bataan',
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
      { name: 'Five Fingers Coves', price: 0, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop', desc: 'Scenic cove island hopping and rock formations.' },
      { name: 'Laki Beach', price: 0, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop', desc: 'Pristine white sand beach and swimming.' },
      { name: 'Camaya Coast', price: 0, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400&auto=format&fit=crop', desc: 'Waterpark, infinity pools, and evening fire dancing.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '08:00 AM', title: 'Call Time & Five Fingers Hopping', details: 'Arrival and start of Five Fingers island hopping and boat tour.' },
      { dayGroup: 'Day 1', day: '11:00 AM', title: 'Laki Beach Swimming & Leisure', details: 'Free time, beach relaxation, and swimming at Laki Beach until 4:30 PM.' },
      { dayGroup: 'Day 1', day: '05:00 PM', title: 'Port Arrival & Check-in', details: 'Departure from port and check-in to air-conditioned guesthouse.' },
      { dayGroup: 'Day 2', day: '07:00 AM', title: 'Camaya Coast Waterpark & Beach Day', details: 'Full access to Camaya Coast infinity pools and waterpark.' },
      { dayGroup: 'Day 2', day: '05:00 PM', title: 'Weekend Entertainment', details: 'Live band and fire dancing show.' }
    ],
    addons: [{ id: 'breakfast', name: 'Add Breakfast Package', price: 500 }]
  },

  'five-fingers-laki-camping': {
    id: 'five-fingers-laki-camping',
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
    // Camping / tent under stars aesthetic
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crophttps://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNIvzajEmS-sFf6CkSNuS9ksfJwejmtn6yAzU5hLqVI8WiVT-4KEQU2tUIV4EYXxGAN4NhXPFeCFKMGSMGluQUMzCZrtMS9aTQ_SZrfQdm_hPMnTZRxzvHrgTWYlxKGTcwk5UjNrCwukbT/w640-h427-rw/five-fingers-resort-bataan.JPG',
    description: 'Experience an epic 2D1N camping adventure in Mariveles, Bataan! Explore Five Fingers rock formations, cliff dive at Nagbalite, swim at Laki Death Pool, and camp under the stars.',
    amenities: [
      'Five Fingers Island Hopping & Roundtrip Boat Fee',
      'Life Vest & Environmental Fees',
      'Entrance Fee to Laki Beach',
      'First Aid Kit',
      'Guided Trekking, Caving & Cliff Jumping Activities'
    ],
    landmarks: [
      { name: 'Nagbintana Rock Formation', price: 0, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop', desc: 'Stunning iconic rock formations.' },
      { name: 'Nagbalite Cliff Dive', price: 0, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=400&auto=format&fit=crop', desc: 'Thrilling 40ft cliff diving spot.' },
      { name: 'Laki Beach & Death Pool', price: 0, image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae53?q=80&w=400&auto=format&fit=crop', desc: 'Pristine beach camping and natural tidal pool.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '07:00 PM', title: 'Call Time & Port Arrival', details: 'Call time, registration, and waiver signing.' },
      { dayGroup: 'Day 1', day: '07:30 AM', title: 'Five Fingers Island Hopping', details: 'Explore Nagbintana Rock Formation, Nagbalite 40ft Cliff Dive.' },
      { dayGroup: 'Day 1', day: '10:30 AM', title: 'Arrival at Laki Beach & Camping', details: 'Tent pitching, swimming, and exploring cliff side.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Call Time & Back to Port', details: 'Return boat departure.' }
    ],
    addons: [
      { id: 'tent-rental', name: 'Camping Tent Rental', price: 400 },
      { id: 'cottage', name: 'Cottage Rental (15 Pax)', price: 950 }
    ]
  },

  'playa-la-caleta-overnight': {
    id: 'playa-la-caleta-overnight',
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
    // Tropical cove aesthetic
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/493979183.jpg?k=8d207b63cd0ecbc18e73c501c42d539fe0c402b3208d88a25dd123752ed795e0&o=',
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
      { name: 'Sugong Cave', price: 0, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop', desc: 'Scenic island cave exploration.' },
      { name: 'Miguelito Island', price: 0, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop', desc: 'Pristine island hopping destination.' }
    ],
    itinerary: [
      { dayGroup: 'Day 1', day: '09:00 AM', title: 'Bagac Port Call Time', details: 'Meetup and briefing at Bagac Port.' },
      { dayGroup: 'Day 1', day: '09:30 AM', title: 'Island Hopping Tour', details: 'Visit Bataan Nuclear Power Plant, Sugong Cave, and Miguelito Island.' },
      { dayGroup: 'Day 2', day: '12:00 PM', title: 'Resort Check-out', details: 'Check-out and boat transfer back to Bagac Port.' }
    ],
    addons: [{ id: 'glamping', name: 'Upgrade to Family Glamping Tent', price: 1200 }]
  },

  'la-jolla-bataan': {
    id: 'la-jolla-bataan',
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
    // Luxury pool/resort aesthetic
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
    addons: [{ id: 'spa', name: 'Resort Wellness Spa Session', price: 950 }]
  },

  'bataan-3d2n': {
    id: 'bataan-3d2n',
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
    // Comprehensive Philippine travel / heritage destination aesthetic
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
      { name: 'Las Casas Filipinas', price: 0, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop', desc: 'Heritage resort & open-air Spanish-Filipino colonial museum.' },
      { name: 'Camaya Coast', price: 0, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop', desc: 'Premier beach destination with white sand and clear waters.' },
      { name: 'Corregidor Island', price: 0, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop', desc: 'Historic fortress island with WWII ruins and memorials.' },
      { name: 'Mt. Samat', price: 0, image: 'https://images.unsplash.com/photo-1562601579-599dec56540e?q=80&w=400&auto=format&fit=crop', desc: 'Shrine of Valor and panoramic viewpoint.' },
      { name: 'Mariveles Five Fingers', price: 0, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop', desc: 'Scenic cove hiking and cliff-side rock formations.' }
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
    addons: [
      { id: 'kayak', name: 'Camaya Coast Kayak Rental', price: 500 },
      { id: 'gopro', name: 'GoPro Underwater Rental', price: 900 }
    ]
  }
};

export const blogsData = [
  {
    title: "5 Packing Hacks for Island Trips",
    category: "Travel Guide",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
    excerpt: "Pack light and travel smart with these essential beach hacks for your next tropical escape."
  },
  {
    title: "Must-Try Local Food Spots",
    category: "Go Taste",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop",
    excerpt: "A culinary journey into regional food cultures, night markets, and local delicacies."
  },
  {
    title: "Top 48-Hour City Itineraries",
    category: "Weekend Away",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop",
    excerpt: "Maximize your weekend quick-getaways with detailed hourly city schedules."
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