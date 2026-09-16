export const heroImages = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
];

export const allPlacesData = {
  'el-nido': {
    id: 'el-nido',
    name: 'El Nido',
    location: 'Palawan, Philippines',
    stars: '★★★★★',
    price: '₱12,250',
    numericPrice: 12250,
    duration: '2D / 1N',
    badge: 'Trending',
    discount: 15,
    category: 'Trending',
    packageType: 'Full Stay',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cb/a6/63/re-discovering-my-fave.jpg?w=1400&h=-1&s=1',
    description: 'El Nido is renowned worldwide for its dramatic limestone cliffs, crystal-clear turquoise waters, and thriving marine sanctuaries serving as the gateway to the breathtaking Bacuit Archipelago.',
    amenities: ['Free Wi-Fi', 'Beachfront Access', 'Snorkeling Gear Included', 'Airport Shuttle', 'Buffet Breakfast'],
    landmarks: [
      { name: 'Big Lagoon', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' },
      { name: 'Nacpan Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop' },
      { name: 'Secret Lagoon', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Island Tour', details: 'Check-in and afternoon boat excursion.' },
      { day: 'Day 2', title: 'Lagoon Exploration', details: 'Visit Big Lagoon and secret beaches.' }
    ]
  },
  'boracay': {
    id: 'boracay',
    name: 'Boracay Island',
    location: 'Aklan, Philippines',
    stars: '★★★★★',
    price: '₱9,800',
    numericPrice: 9800,
    duration: '3D / 2N',
    badge: 'Best Value',
    discount: 10,
    category: 'Best Value',
    packageType: 'Full Stay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv77CCR9BYhbIU3DRUKYnmfnfeMsHkxDqEKjL_7v0C_WpoqYRJbB2WkOs&s=10',
    description: 'Famous for its four-mile White Beach with powdery soft sand, vibrant nightlife, water sports, and relaxing beachfront resorts.',
    amenities: ['Swimming Pool', 'Air Conditioning', 'Spa & Wellness Center', 'Welcome Drinks', 'Live Music Lounge'],
    landmarks: [
      { name: 'Willy\'s Rock', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' },
      { name: 'Puka Shell Beach', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop' },
      { name: 'Mount Luho', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'White Beach Sunset', details: 'Arrival and evening stroll along Station 2.' },
      { day: 'Day 2', title: 'Water Sports', details: 'Parasailing and helmet diving.' }
    ]
  },
  'chocolate-hills': {
    id: 'chocolate-hills',
    name: 'Chocolate Hills',
    location: 'Bohol, Philippines',
    stars: '★★★★☆',
    price: '₱1,800',
    numericPrice: 1800,
    duration: '1 Day',
    badge: 'Nature',
    discount: 5,
    category: 'Nature',
    packageType: 'Day Trip',
    image: 'https://kahibalo.com/wp-content/uploads/2024/03/chocolate-hills-bohol-philippines-kahibalo-foundation.jpg',
    description: 'A geological formation of over 1,200 conical hills in Bohol that turn chocolate-brown during the dry season, creating a surreal natural landscape.',
    amenities: ['Private Van Service', 'Tour Guide', 'Lunch Included', 'Entrance Fees Included'],
    landmarks: [
      { name: 'Main Complex', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop' },
      { name: 'Loboc River', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tarsier Sanctuary', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Hills & Tarsiers', details: 'View deck observation and Loboc river cruise.' }
    ]
  },
  'banaue': {
    id: 'banaue',
    name: 'Banaue Terraces',
    location: 'Ifugao, Philippines',
    stars: '★★★★★',
    price: '₱7,700',
    numericPrice: 7700,
    duration: '2D / 1N',
    badge: 'Heritage',
    discount: 20,
    category: 'Heritage',
    packageType: 'Full Stay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnKrq6a7ACCkga6UV_E247i9JB4RKXZ-dp2xUFeDeKdA&s=10',
    description: '2,000-year-old rice terraces carved into the mountains of Ifugao by ancestors of the indigenous people, often called the "Eighth Wonder of the World".',
    amenities: ['Local Trekking Guide', 'Mountain View Deck', 'Traditional Breakfast', 'Hot Shower Homestay'],
    landmarks: [
      { name: 'Batad Terraces', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop' },
      { name: 'Tappiya Falls', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' },
      { name: 'Viewpoint Peak', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Mountain Trek', details: 'Viewing terraces and local village walk.' }
    ]
  },
  'siargao': {
    id: 'siargao',
    name: 'Siargao Island',
    location: 'Surigao del Norte, Philippines',
    stars: '★★★★★',
    price: '₱10,850',
    numericPrice: 10850,
    duration: '3D / 2N',
    badge: 'Surf',
    discount: 25,
    category: 'Surf',
    packageType: 'Full Stay',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop',
    description: 'The surfing capital of the Philippines, known for its iconic Cloud 9 wave, vast coconut palm groves, rock pools, and laid-back island vibes.',
    amenities: ['Surfboard Rental', 'Motorbike Rental Option', 'Beach Bar Access', 'Free Wi-Fi', 'Coffee Station'],
    landmarks: [
      { name: 'Cloud 9 Boardwalk', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop' },
      { name: 'Sugba Lagoon', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=400&auto=format&fit=crop' },
      { name: 'Magpupungko Pools', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Cloud 9 Surfing', details: 'Board rental and surf lesson.' }
    ]
  },
  'mount-fuji': {
    id: 'mount-fuji',
    name: 'Mount Fuji',
    location: 'Tokyo, Japan',
    stars: '★★★★★',
    price: '₱29,750',
    numericPrice: 29750,
    duration: '3D / 2N',
    badge: 'Popular',
    discount: 15,
    category: 'Popular',
    packageType: 'Full Stay',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYKO0dz_0_ZDlcspv6yL1hnAefc6Eg7hzQEl6J9bUr09fFO1akXpPLcza&s=10',
    description: 'Mount Fuji is an iconic active volcano located about 100 kilometers southwest of Tokyo. Commonly referred to as "Fuji-san," it stands as Japan\'s tallest peak and holds deep cultural significance.',
    amenities: ['Onsen Access', 'Traditional Yukata', 'Kaiseki Dinner', 'High-speed Wi-Fi', 'Luggage Transfer'],
    landmarks: [
      { name: 'Chureito Pagoda', image: 'https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=400&auto=format&fit=crop' },
      { name: 'Lake Kawaguchiko', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=400&auto=format&fit=crop' },
      { name: 'Fuji-Q Highland', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Lake View & Onsen', details: 'Check-in and hot springs relaxation.' }
    ]
  },
  'santorini': {
    id: 'santorini',
    name: 'Santorini',
    location: 'Thira, Greece',
    stars: '★★★★★',
    price: '₱49,700',
    numericPrice: 49700,
    duration: '5D / 4N',
    badge: 'Luxury',
    discount: 10,
    category: 'Luxury',
    packageType: 'Full Stay',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop',
    description: 'Perched on steep volcanic cliffs in the Aegean Sea, Santorini features iconic whitewashed houses, blue-domed churches, and world-famous sunsets over caldera views.',
    amenities: ['Infinity Pool', 'Caldera View Balcony', 'Wine Tasting Pass', 'Complimentary Champagne', 'Air Conditioning'],
    landmarks: [
      { name: 'Oia Castle', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop' },
      { name: 'Red Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' },
      { name: 'Akrotiri Ruins', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Sunset in Oia', details: 'Caldera view check-in and evening walk.' }
    ]
  },
  'eiffel-tower': {
    id: 'eiffel-tower',
    name: 'Eiffel Tower',
    location: 'Paris, France',
    stars: '★★★★☆',
    price: '₱44,800',
    numericPrice: 44800,
    duration: '4D / 3N',
    badge: 'Europe',
    discount: 5,
    category: 'Europe',
    packageType: 'Full Stay',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1600&auto=format&fit=crop',
    description: 'The wrought-iron lattice tower on the Champ de Mars in Paris, France. Named after engineer Gustave Eiffel, it is a global cultural icon of France.',
    amenities: ['Museum Fast-Pass', 'City Metro Card', 'Croissant Breakfast', 'Concierge Service', 'Free Wi-Fi'],
    landmarks: [
      { name: 'Louvre Museum', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop' },
      { name: 'Arc de Triomphe', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' },
      { name: 'Seine River', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'City Tour', details: 'Eiffel tower fast-pass entry.' }
    ]
  },
  'colosseum': {
    id: 'colosseum',
    name: 'Colosseum',
    location: 'Rome, Italy',
    stars: '★★★★★',
    price: '₱40,250',
    numericPrice: 40250,
    duration: '4D / 3N',
    badge: 'History',
    discount: 10,
    category: 'History',
    packageType: 'Full Stay',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop',
    description: 'An ancient amphitheatre in the centre of the city of Rome, Italy. Built of travertine limestone, tuff, and brick-faced concrete, it was the largest amphitheatre ever built.',
    landmarks: [
      { name: 'Roman Forum', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop' },
      { name: 'Pantheon', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop' },
      { name: 'Trevi Fountain', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop' }
    ],
    itinerary: [
      { day: 'Day 1', title: 'Ancient Rome', details: 'Colosseum and Roman Forum tour.' }
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
  },
  {
    title: "Solo Travel Safety Tips",
    category: "Safety & Tips",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
    excerpt: "Essential guidelines and digital tools to keep you safe and confident while exploring alone."
  },
  {
    title: "Budget-Friendly International Getaways",
    category: "Smart Spending",
    date: "June 2026",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=400&auto=format&fit=crop",
    excerpt: "How to see world-class wonders without breaking the bank using early bird deals and promo codes."
  }
];

export const availableAddons = [
  { id: 'addon-1', name: 'Lorem ipsum dolor sit amet', price: 1200 },
  { id: 'addon-2', name: 'Consectetur adipiscing elit', price: 800 },
  { id: 'addon-3', name: 'Sed do eiusmod tempor', price: 650 },
  { id: 'addon-4', name: 'Incididunt ut labore et dolore', price: 2500 },
  { id: 'addon-5', name: 'Magna aliqua ut enim ad minim', price: 1500 }
];

export const reviewsData = [
  {
    name: "Frieren",
    location: "Visited Mount Fuji",
    rating: "★★★★★",
    comment: "It was a pleasant ten-year detour. Found a rare grimoire in a small shop nearby that turns shaved ice into sweet berry syrup.",
    date: "August 2026",
    avatar: "https://images6.alphacoders.com/135/thumb-1920-1355045.jpeg"
  },
  {
    name: "Fern",
    location: "Visited El Nido",
    rating: "★★★★★",
    comment: "Mistress Frieren kept lingering at the local potion stalls, but the scenery was beautiful. The booking process was very efficient.",
    date: "July 2026",
    avatar: "https://images.thedirect.com/media/article_full/fern_frieren.jpg?imgeng=/cmpr_60/w_1280"
  },
  {
    name: "Übel",
    location: "Visited Santorini",
    rating: "★★★★★",
    comment: "Pretty cliffside views. I managed to cut through the crowds quite easily. I'd love to copy the travel magic used here.",
    date: "August 2026",
    avatar: "https://preview.redd.it/is-ubel-more-of-a-genius-or-an-exception-among-mages-v0-60e9h32ldbxd1.jpeg?auto=webp&s=ada2cda45c00f76c9b7449f4382e30f242cacb5c"
  }
];

export const topPlaces = [allPlacesData['mount-fuji'], allPlacesData['el-nido'], allPlacesData['santorini'], allPlacesData['boracay']];
export const domesticPlaces = [allPlacesData['el-nido'], allPlacesData['boracay'], allPlacesData['chocolate-hills'], allPlacesData['banaue'], allPlacesData['siargao']];
export const internationalPlaces = [allPlacesData['mount-fuji'], allPlacesData['santorini'], allPlacesData['eiffel-tower'], allPlacesData['colosseum']];