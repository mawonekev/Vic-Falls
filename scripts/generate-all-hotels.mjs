import fs from 'fs';

const partnersData = [
  {
    id: 'partner-explorers-village',
    name: 'Shearwater Explorers Village',
    destination: 'VICTORIA_FALLS',
    contactEmail: 'reservations@explorersvillage.com',
    contactPhone: '+263 13 44471',
    commissionType: 'PERCENTAGE',
    commissionValue: 20,
    contentRightsGranted: true,
    status: 'ACTIVE',
    roomTypes: [
      {
        id: 'room-deluxe-chalet',
        name: 'Deluxe Air-Conditioned Chalet',
        description: 'Spacious private chalet featuring King or Twin beds, ensuite bathroom with walk-in rainfall shower, private veranda, air conditioning, and complimentary Wi-Fi.',
        rateUSD: 165,
        capacity: 2,
        photo: '/images/lodges/deluxe-double-room.jpg'
      },
      {
        id: 'room-standard-lodge',
        name: 'Standard Safari Room',
        description: 'Comfortable ensuite safari-style room with ceiling fans, mosquito netting, veranda, and direct garden access to the swimming pools.',
        rateUSD: 110,
        capacity: 2,
        photo: '/images/lodges/standard-double-room.jpg'
      },
      {
        id: 'room-camping',
        name: 'Equipped Safari Camping Dome',
        description: 'Budget-friendly adventure camping with twin beds, bedding supplied, shared modern ablution blocks, and access to all resort amenities.',
        rateUSD: 35,
        capacity: 2,
        photo: '/images/lodges/safari-camp-dome.jpg'
      }
    ]
  },
  {
    id: 'partner-waterfront',
    name: 'The Victoria Falls Waterfront',
    destination: 'LIVINGSTONE',
    contactEmail: 'reservations@waterfront.co.zm',
    contactPhone: '+260 213 320606',
    commissionType: 'PERCENTAGE',
    commissionValue: 15,
    contentRightsGranted: true,
    status: 'ACTIVE',
    roomTypes: [
      {
        id: 'room-waterfront-exec',
        name: 'Executive Riverside Room',
        description: 'Spacious air-conditioned room right on the Zambezi River banks with private deck and sunset views.',
        rateUSD: 180,
        capacity: 2,
        photo: '/images/destinations/livingstone-island.jpg'
      },
      {
        id: 'room-waterfront-chalet',
        name: 'Standard Garden Chalet',
        description: 'Ensuite thatched chalet surrounded by lush riverine gardens and indigenous trees.',
        rateUSD: 120,
        capacity: 2,
        photo: '/images/destinations/livingstone-island.jpg'
      },
      {
        id: 'room-waterfront-tent',
        name: 'Adventure Safari Tent',
        description: 'Permanent walk-in safari tent with twin beds, fan, and electricity located close to the river bar.',
        rateUSD: 45,
        capacity: 2,
        photo: '/images/lodges/safari-camp-dome.jpg'
      }
    ]
  },
  {
    id: 'partner-chobe-safari',
    name: 'Chobe Safari Lodge',
    destination: 'CHOBE',
    contactEmail: 'reservations@underonebotswanasky.com',
    contactPhone: '+267 625 0336',
    commissionType: 'PERCENTAGE',
    commissionValue: 18,
    contentRightsGranted: true,
    status: 'ACTIVE',
    roomTypes: [
      {
        id: 'room-chobe-river',
        name: 'Luxury River Room',
        description: 'Air-conditioned luxury room with private patio overlooking the Chobe River floodplains and Namibian Caprivi Strip.',
        rateUSD: 290,
        capacity: 2,
        photo: '/images/activities/chobe-elephants-river.jpg'
      },
      {
        id: 'room-chobe-safari',
        name: 'Safari Room',
        description: 'Modern safari room with en-suite bath, satellite TV, and immediate proximity to the swimming pool.',
        rateUSD: 240,
        capacity: 2,
        photo: '/images/activities/chobe-game-drive.jpg'
      },
      {
        id: 'room-chobe-chalet',
        name: 'Traditional Thatched Chalet',
        description: 'Classic round thatched rondavel set under acacia trees, offering an authentic safari feel.',
        rateUSD: 160,
        capacity: 2,
        photo: '/images/activities/chobe-camping-safari.jpg'
      }
    ]
  }
];

const mappedPropertiesData = [
  // ==========================================
  // 1. VICTORIA FALLS (ZIMBABWE) — 23 Properties
  // ==========================================
  {
    id: 'map-explorers-village',
    name: 'Shearwater Explorers Village',
    address: 'Lupinyu Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9288,
    longitude: 25.8364,
    isBookablePartner: true, // Gold pin
    locationVerifiedByStaff: true,
    partnerId: 'partner-explorers-village',
    startingPriceUSD: 110,
    photo: '/images/lodges/deluxe-double-room.jpg',
    rating: 4.8,
    amenities: ['Swimming Pool', 'Air Conditioning', 'Curio Shop', 'Restaurant & Bar', 'Free Wi-Fi', '200m to Town Center']
  },
  {
    id: 'map-vic-falls-hotel',
    name: 'The Victoria Falls Hotel',
    address: '1 Mallet Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9282,
    longitude: 25.8456,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 480,
    photo: '/images/destinations/victoria-falls-panoramic.jpg',
    rating: 4.9,
    amenities: ['Historic Heritage (1904)', 'Private Path to Falls', 'Edwardian Luxury', 'Stanley\'s Terrace Fine Dining', 'Pool'],
    inquireOnlyNotice: 'This premier heritage property is not directly bookable online. Inquire with our concierge to reserve preferred suites.'
  },
  {
    id: 'map-ilala-lodge',
    name: 'Ilala Lodge Hotel',
    address: '411 Livingstone Way, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9272,
    longitude: 25.8406,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 340,
    photo: '/images/destinations/victoria-falls-cataract.jpg',
    rating: 4.8,
    amenities: ['Closest Hotel to the Falls', 'Award-Winning Cassia Restaurant', 'Lush Gardens', 'Wildlife on Lawns'],
    inquireOnlyNotice: 'Reference listing only. Inquire with our concierge to add Ilala Lodge to your private itinerary.'
  },
  {
    id: 'map-victoria-safari-lodge',
    name: 'Victoria Falls Safari Lodge',
    address: 'Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9150,
    longitude: 25.8115,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 390,
    photo: '/images/activities/zambezi-game-drive.jpg',
    rating: 4.8,
    amenities: ['Waterhole-Facing Rooms', 'Vulture Culture Experience', 'Buffalo Bar', 'MaKuwa-Kuwa Restaurant', 'Shuttle Service'],
    inquireOnlyNotice: 'Inquire with our concierge for preferred room allotments overlooking the active sunset waterhole.'
  },
  {
    id: 'map-palm-river-hotel',
    name: 'Palm River Hotel',
    address: '4 Kendall Close, Cresta Sprayview, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9125,
    longitude: 25.8235,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 460,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.9,
    amenities: ['5-Star Luxury Riverfront', 'Zambezi River Views', 'Outdoor Pool', 'Complimentary River Cruises', 'Fine Dining'],
    inquireOnlyNotice: 'Reference listing only. Inquire to include Palm River Hotel in your luxury tailored itinerary.'
  },
  {
    id: 'map-elephant-camp',
    name: 'The Elephant Camp',
    address: 'Victoria Falls National Park Gorge Edge, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9620,
    longitude: 25.8510,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 780,
    photo: '/images/activities/elephant-interaction.jpg',
    rating: 4.9,
    amenities: ['Private Plunge Pools', 'Gorge & Falls Spray Views', 'All-Inclusive Luxury', 'Elephant Interaction Access'],
    inquireOnlyNotice: 'High-demand luxury wilderness camp. Direct concierge inquiry required for private suite availability.'
  },
  {
    id: 'map-old-drift-lodge',
    name: 'Old Drift Lodge',
    address: 'Zambezi National Park Riverfront, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.8980,
    longitude: 25.7750,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 650,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.9,
    amenities: ['Inside Zambezi National Park', 'Luxury Safari Tents', 'Private Outdoor Slipper Baths', 'River Safari Included'],
    inquireOnlyNotice: 'Wilderness park concession property. Concierge booking recommended.'
  },
  {
    id: 'map-vic-falls-river-lodge',
    name: 'Victoria Falls River Lodge',
    address: 'Zambezi National Park Island, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.8850,
    longitude: 25.7420,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 820,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.9,
    amenities: ['Island Treehouse Suites', 'Private Plunge Pools', 'Stargazing Beds', 'Private Safari Vehicles & Boats'],
    inquireOnlyNotice: 'Ultra-exclusive private island safari lodge. Inquire directly with concierge.'
  },
  {
    id: 'map-stanley-livingstone',
    name: 'Stanley & Livingstone Boutique Hotel',
    address: 'Victoria Falls Private Game Reserve, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9850,
    longitude: 25.8150,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 540,
    photo: '/images/activities/game-drive-lions.jpg',
    rating: 4.8,
    amenities: ['Private Big 5 Reserve', 'Boutique Luxury Suites', 'Gourmet Restaurant', 'Helipad on Site'],
    inquireOnlyNotice: 'Reference property on private wildlife concession. Inquire for bespoke packages.'
  },
  {
    id: 'map-batonka-lodge',
    name: 'Batonka Guest Lodge',
    address: '1 Batoka Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9350,
    longitude: 25.8310,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 210,
    photo: '/images/lodges/village-restaurant.jpg',
    rating: 4.8,
    amenities: ['Eco-Friendly Boutique', 'Swimming Pool', 'Manicured Gardens', 'Quiet Residential Area', 'Curated Art'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-bayete-lodge',
    name: 'Bayete Guest Lodge',
    address: '566 Manyika Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9380,
    longitude: 25.8290,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 165,
    photo: '/images/lodges/village-bar-lounge.jpg',
    rating: 4.7,
    amenities: ['Family-Run Atmosphere', 'Teak Bar & Boma', 'Pool Area', 'Delicious Home Cooking'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-pioneers-lodge',
    name: 'Pioneers Lodge',
    address: 'Cnr Dale & Robert Koch, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9420,
    longitude: 25.8260,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 175,
    photo: '/images/lodges/standard-double-room.jpg',
    rating: 4.8,
    amenities: ['Classic Settler Decor', 'Solar-Powered', 'Two Swimming Pools', 'Coffee Bar & Spa', 'Air-Conditioned'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-cresta-sprayview',
    name: 'Cresta Sprayview Hotel',
    address: 'Cnr Reynard & Livingstone Way, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9315,
    longitude: 25.8340,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 140,
    photo: '/images/lodges/standard-room.jpg',
    rating: 4.4,
    amenities: ['Large Swimming Pool', 'Al Fresco Restaurant', 'Conference Facilities', 'Close to Town'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-rainbow-hotel',
    name: 'Victoria Falls Rainbow Hotel',
    address: '281 Parkway Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9330,
    longitude: 25.8320,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 130,
    photo: '/images/lodges/standard-room.jpg',
    rating: 4.3,
    amenities: ['Moorish Architecture', 'Rooftop Panorama Bar', 'Swim-Up Pool Bar', 'Free Wi-Fi'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-shoestrings',
    name: 'Shoestrings Backpackers Lodge',
    address: '12 West Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9300,
    longitude: 25.8350,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 25,
    photo: '/images/lodges/safari-camp-dome.jpg',
    rating: 4.2,
    amenities: ['Legendary Backpacker Bar', 'Swimming Pool', 'Hostel Dorms & Private Rooms', 'Nightly Events & Pizza'],
    inquireOnlyNotice: 'Budget backpacker reference listing. Contact concierge for group bookings.'
  },
  // Extracted from Booking.com (Victoria Falls):
  {
    id: 'map-savanna68',
    name: 'Savanna68 Hotel',
    address: '68 Spencer Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9325,
    longitude: 25.8315,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 190,
    photo: '/images/lodges/deluxe-double-room.jpg',
    rating: 4.9, // 9.3 on Booking.com
    amenities: ['Top Rated 9.3/10', 'Outdoor Swimming Pool', 'Tropical Garden', 'Modern Air-Conditioned Rooms', 'Airport Shuttle'],
    inquireOnlyNotice: 'Highly rated boutique hotel on Booking.com. Inquire with concierge for available dates.'
  },
  {
    id: 'map-courtney-lodge',
    name: 'The Courtney Lodge',
    address: '35 Courtney Selous Cres, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9345,
    longitude: 25.8285,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 185,
    photo: '/images/lodges/village-restaurant.jpg',
    rating: 4.8,
    amenities: ['Quiet Residential Setting', 'Outdoor Pool', 'Lush Gardens', 'Complimentary Breakfast', 'Personalized Service'],
    inquireOnlyNotice: 'Peaceful boutique retreat. Inquire with concierge to check availability.'
  },
  {
    id: 'map-safari-club',
    name: 'Victoria Falls Safari Club',
    address: 'Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9145,
    longitude: 25.8110,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 580,
    photo: '/images/activities/zambezi-game-drive.jpg',
    rating: 4.9,
    amenities: ['Private Butler Service', 'Dedicated Club Lounge', 'Infinity Lap Pool', 'Complimentary Afternoon Tea & Cocktails', 'Waterhole View'],
    inquireOnlyNotice: 'Exclusive 5-star club wing. Concierge booking recommended.'
  },
  {
    id: 'map-safari-suites',
    name: 'Victoria Falls Safari Suites',
    address: 'Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9155,
    longitude: 25.8120,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 650,
    photo: '/images/activities/game-drive-lions.jpg',
    rating: 4.8,
    amenities: ['2 & 3 Bedroom Family Suites', 'Spacious Lounges', 'Private Patios', 'Wildlife Viewing Deck'],
    inquireOnlyNotice: 'Ideal for families and small groups. Inquire with concierge.'
  },
  {
    id: 'map-lokuthula-lodges',
    name: 'Lokuthula Lodges',
    address: 'Squire Cummings Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9160,
    longitude: 25.8130,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 195,
    photo: '/images/lodges/village-restaurant.jpg',
    rating: 4.7,
    amenities: ['Self-Catering Thatched Lodges', 'Teak Forest Setting', 'Free-form Pool', 'Boma Restaurant Access', 'Family Friendly'],
    inquireOnlyNotice: 'Rustic family-friendly chalets. Inquire with concierge.'
  },
  {
    id: 'map-shongwe-lookout',
    name: 'Shongwe Lookout Guest Lodge',
    address: '645 Reynard Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9370,
    longitude: 25.8270,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 220,
    photo: '/images/lodges/chalet-entrance.jpg',
    rating: 4.8,
    amenities: ['2-Story Viewing Tower', 'Views of Falls Spray Plume', 'Craft Cocktail Bar', 'Infinity Pool', 'Artisanal Dining'],
    inquireOnlyNotice: 'Unique architectural lookout lodge. Inquire with concierge.'
  },
  {
    id: 'map-528-vicfalls',
    name: '528 Victoria Falls Guest House',
    address: '528 Reynard Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9360,
    longitude: 25.8280,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 180,
    photo: '/images/lodges/deluxe-bathroom.jpg',
    rating: 4.8,
    amenities: ['Boutique Design', 'Rooftop Sunset Bar', 'Personalized Hospitality', 'Pool in Garden'],
    inquireOnlyNotice: 'Intimate boutique lodge. Inquire with concierge.'
  },
  {
    id: 'map-n1-hotel',
    name: 'N1 Hotel Victoria Falls',
    address: '266 Adam Stander Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9295,
    longitude: 25.8375,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 85,
    photo: '/images/lodges/standard-room.jpg',
    rating: 4.2,
    amenities: ['Central Town Location', 'Modern Air-Conditioned Rooms', 'Outdoor Pool', 'Convenience Store on Site'],
    inquireOnlyNotice: 'Budget town center hotel. Inquire with concierge.'
  },

  // ==========================================
  // 2. LIVINGSTONE (ZAMBIA) — 15 Properties
  // ==========================================
  {
    id: 'map-waterfront',
    name: 'The Victoria Falls Waterfront',
    address: 'Sichango Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9015,
    longitude: 25.8480,
    isBookablePartner: true, // Gold pin
    locationVerifiedByStaff: true,
    partnerId: 'partner-waterfront',
    startingPriceUSD: 120,
    photo: '/images/destinations/livingstone-island.jpg',
    rating: 4.6,
    amenities: ['Zambezi Riverfront Deck', 'Two Swimming Pools', 'Sunset Deck Restaurant & Bar', 'Activity Booking Center']
  },
  {
    id: 'map-royal-livingstone',
    name: 'The Royal Livingstone by Anantara',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9150,
    longitude: 25.8580,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 620,
    photo: '/images/destinations/livingstone-island.jpg',
    rating: 4.9,
    amenities: ['5-Star Luxury Resort', 'Free Unlimited Access to Falls (Zambia)', 'Zebras & Giraffes on Grounds', 'Sundowner Deck on Zambezi'],
    inquireOnlyNotice: 'Premier luxury Zambian resort. Inquire with concierge for preferred riverfront suites.'
  },
  {
    id: 'map-radisson-blu-livingstone',
    name: 'Radisson Blu Mosi-oa-Tunya Livingstone Resort',
    address: 'Mosi-oa-Tunya Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8990,
    longitude: 25.8510,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 380,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.9, // 9.0 on Booking.com
    amenities: ['New 5-Star River Resort', 'Riverfront Infinity Pool', 'Full Spa & Fitness Center', 'Zambezi Sunset Cruises', 'Fine Dining'],
    inquireOnlyNotice: 'Brand-new 5-star luxury resort on Booking.com. Inquire with concierge.'
  },
  {
    id: 'map-avani-vic-falls',
    name: 'Avani Victoria Falls Resort',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9180,
    longitude: 25.8560,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 280,
    photo: '/images/destinations/livingstone-island.jpg',
    rating: 4.6,
    amenities: ['Free Unlimited Access to the Falls', 'Vibrant African Architecture', 'Massive Central Pool', 'Family Friendly'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-david-livingstone',
    name: 'The David Livingstone Safari Lodge & Spa',
    address: 'Riverside Dr, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8820,
    longitude: 25.8230,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 310,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.7,
    amenities: ['Private River Facing Balconies', 'The Lady Livingstone River Boat', 'Galtent Spa', 'Zambezi Sunset Views'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-tongabezi',
    name: 'Tongabezi Lodge',
    address: 'Upper Zambezi Riverbank, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8100,
    longitude: 25.7200,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 850,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.9,
    amenities: ['Ultra-Luxury Open-Fronted Houses', 'Private Valet Service', 'Floating Sampan Dining', 'Included Safari Excursions'],
    inquireOnlyNotice: 'World-renowned romantic retreat. Concierge inquiry required.'
  },
  {
    id: 'map-waterberry-lodge',
    name: 'Waterberry Zambezi Lodge',
    address: 'Sunway Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8300,
    longitude: 25.7500,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 420,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.8,
    amenities: ['Secluded Riverbank Location', 'Floating Pontoon Deck', 'Island Picnics', 'Birding Specialization'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-jollyboys',
    name: 'Jollyboys Backpackers & Camp',
    address: 'Kajokoto Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8480,
    longitude: 25.8560,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 20,
    photo: '/images/lodges/safari-camp-dome.jpg',
    rating: 4.4,
    amenities: ['Zambia\'s Premier Backpacker Lodge', 'Swimming Pool', 'Travel Desk', 'Free Daily Falls Shuttle'],
    inquireOnlyNotice: 'Budget accommodation reference. Inquire for private rooms.'
  },
  // Extracted from Booking.com (Livingstone):
  {
    id: 'map-river-club',
    name: 'The River Club',
    address: 'Farm 293a, Zambezi Riverfront, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8250,
    longitude: 25.7350,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 690,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.9,
    amenities: ['Edwardian Manor Architecture', 'Spectacular River Vistas', 'Infinity Pool', 'Tennis Court & Snooker Room'],
    inquireOnlyNotice: 'Exclusive luxury Edwardian river retreat. Inquire with concierge.'
  },
  {
    id: 'map-sussi-chuma',
    name: 'Sanctuary Sussi & Chuma Lodge',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8920,
    longitude: 25.8340,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 780,
    photo: '/images/activities/game-drive-lions.jpg',
    rating: 4.9,
    amenities: ['Luxury Elevated Treehouses', 'Inside National Park', 'Private Plunge Pools', 'Game Drives & Walking Safaris'],
    inquireOnlyNotice: 'Ultra-luxury treehouse safari lodge. Inquire with concierge.'
  },
  {
    id: 'map-chrismar-livingstone',
    name: 'Chrismar Hotel Livingstone',
    address: 'Maramba Riverfront, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8890,
    longitude: 25.8420,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 150,
    photo: '/images/lodges/village-restaurant.jpg',
    rating: 4.5,
    amenities: ['Pool with Waterfall Feature', 'Brasserie Restaurant', 'Surrounded by Nature Reserve', 'Air-Conditioned'],
    inquireOnlyNotice: 'Tranquil riverfront hotel. Inquire with concierge.'
  },
  {
    id: 'map-maramba-lodge',
    name: 'Maramba River Lodge',
    address: 'Plot 481, Mosi-oa-Tunya Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8910,
    longitude: 25.8450,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 115,
    photo: '/images/lodges/chalet-entrance.jpg',
    rating: 4.6,
    amenities: ['Frequent Elephant Visits', 'Maramba River Overlook', 'Thatched Chalets & Safari Tents', 'Rock Pool'],
    inquireOnlyNotice: 'Beloved riverside wildlife lodge. Inquire with concierge.'
  },
  {
    id: 'map-sindabezi-island',
    name: 'Sindabezi Island Camp',
    address: 'Sindabezi Island, Zambezi River, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8050,
    longitude: 25.7150,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 740,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.9,
    amenities: ['Private Bush Camp on Island', 'Fodder-Free Eco Island', 'Open-Sided Thatched Chalets', 'Starlit Dinners'],
    inquireOnlyNotice: 'Fodor\'s Top 10 Eco Lodges in the World. Inquire with concierge.'
  },
  {
    id: 'map-vic-backpackers-zambia',
    name: 'Victoria Falls Backpackers Zambia',
    address: 'Plot 442, Zambezi Way, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8520,
    longitude: 25.8590,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 22,
    photo: '/images/lodges/safari-camp-dome.jpg',
    rating: 4.3,
    amenities: ['Outdoor Pool', 'Climbing Wall', 'Lush Tropical Garden', 'Communal Kitchen & Bar'],
    inquireOnlyNotice: 'Backpacker hostel listing. Inquire with concierge.'
  },
  {
    id: 'map-chanters-lodge',
    name: 'Chanters Lodge Livingstone',
    address: 'Lukulu Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8460,
    longitude: 25.8540,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 85,
    photo: '/images/lodges/standard-room.jpg',
    rating: 4.4,
    amenities: ['Historic Town Lodge', 'Famous English Breakfast', 'Pool & Gardens', 'Family Rooms'],
    inquireOnlyNotice: 'Historic town guesthouse. Inquire with concierge.'
  },

  // ==========================================
  // 3. CHOBE & KASANE (BOTSWANA) — 16 Properties
  // ==========================================
  {
    id: 'map-chobe-safari',
    name: 'Chobe Safari Lodge',
    address: 'President Ave, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8050,
    longitude: 25.1480,
    isBookablePartner: true, // Gold pin
    locationVerifiedByStaff: true,
    partnerId: 'partner-chobe-safari',
    startingPriceUSD: 240,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.7,
    amenities: ['Direct Chobe Riverfront', 'Bordering Chobe National Park', 'Safari Boat Fleet', 'Pool with River View', 'Squash Court']
  },
  {
    id: 'map-chobe-game-lodge',
    name: 'Chobe Game Lodge',
    address: 'Inside Chobe National Park, Botswana',
    destination: 'CHOBE',
    latitude: -17.8200,
    longitude: 25.0750,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 890,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.9,
    amenities: ['Only Permanent Lodge Inside Chobe NP', 'All-Female Guiding Team (Chobe Angels)', 'Electric Safari Boats & 4x4s', 'Boardwalk'],
    inquireOnlyNotice: 'Iconic luxury lodge inside the National Park. Concierge direct inquiry required.'
  },
  {
    id: 'map-elephant-valley',
    name: 'Elephant Valley Lodge',
    address: 'Kasane Forest Reserve, Chobe, Botswana',
    destination: 'CHOBE',
    latitude: -17.8500,
    longitude: 25.2100,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 410,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.7,
    amenities: ['Active Waterhole on Site', 'Luxury Safari Tents', 'Open Vehicle Game Drives', 'Chobe River Boat Cruises'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-muchenje-lodge',
    name: 'Muchenje Safari Lodge',
    address: 'Western Chobe National Park, Botswana',
    destination: 'CHOBE',
    latitude: -17.9250,
    longitude: 24.8100,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 520,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.8,
    amenities: ['Panoramic Escarpment Views', 'Private Western Chobe Access', 'Night Drives in Forest Reserve', 'Walking Safaris'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-ngoma-lodge',
    name: 'Ngoma Safari Lodge',
    address: 'Chobe Forest Reserve, Botswana',
    destination: 'CHOBE',
    latitude: -17.9150,
    longitude: 24.7800,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 720,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.9,
    amenities: ['Chobe River Floodplain Vistas', 'Private Plunge Pools', 'Game Drives & River Safaris', 'Luxury Suites'],
    inquireOnlyNotice: 'Luxury boutique safari lodge. Concierge inquiry required.'
  },
  {
    id: 'map-camp-kuzuma',
    name: 'Camp Kuzuma',
    address: 'Kazuma Forest Reserve, Chobe, Botswana',
    destination: 'CHOBE',
    latitude: -18.2500,
    longitude: 25.5500,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 450,
    photo: '/images/activities/chobe-camping-safari.jpg',
    rating: 4.8,
    amenities: ['Busy Elephant Waterhole', 'Eco-Luxury Safari Tents', 'Spa & Wellness Tent', 'Night Game Drives'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-bakwena-lodge',
    name: 'Bakwena Lodge',
    address: 'Kazungula, Chobe Riverbank, Botswana',
    destination: 'CHOBE',
    latitude: -17.7950,
    longitude: 25.2400,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 380,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.8,
    amenities: ['Eco-Conscious River Lodge', 'Natural Filtered Swimming Pool', 'River & Tree Chalets', 'Gourmet Local Dining'],
    inquireOnlyNotice: 'Reference listing only. Inquire with concierge.'
  },
  {
    id: 'map-zambezi-queen',
    name: 'Zambezi Queen Luxury River Safari',
    address: 'Chobe River / Sedudu Island Channel, Botswana',
    destination: 'CHOBE',
    latitude: -17.8100,
    longitude: 25.1350,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 1050,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.9,
    amenities: ['Floating 5-Star Boutique Hotel', 'Air-Conditioned Balcony Suites', 'Plunge Pool on Top Deck', 'Tender Boat Wildlife Safaris'],
    inquireOnlyNotice: 'Premier luxury houseboat experience on the Chobe River. Inquire for 2, 3, or 4-night sailings.'
  },
  // Extracted from Booking.com (Chobe / Kasane):
  {
    id: 'map-chobe-river-cottages',
    name: 'Chobe River Cottages',
    address: 'Plot 860, President Ave, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8080,
    longitude: 25.1520,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 140,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.9, // 9.0 on Booking.com
    amenities: ['Top Rated 9.0/10 on Booking.com', 'Self-Catering Luxury Cottages', 'Riverfront Verandas', 'Swimming Pool', 'Safari Desk'],
    inquireOnlyNotice: 'Top-rated Kasane cottages on Booking.com. Inquire with concierge.'
  },
  {
    id: 'map-river-view-lodge',
    name: 'River View Lodge',
    address: 'Plot 1146, Kazungula, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.7980,
    longitude: 25.2350,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 195,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.8, // 8.9 on Booking.com
    amenities: ['Chobe Riverfront Location', 'Manicured Tropical Lawns', 'Swimming Pool', 'Private Verandas', 'Bar & Restaurant'],
    inquireOnlyNotice: 'Charming riverside boutique lodge. Inquire with concierge.'
  },
  {
    id: 'map-travelodge-kasane',
    name: 'Travelodge Kasane',
    address: 'Plot 2383, Along A33 Highway, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8180,
    longitude: 25.1600,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 110,
    photo: '/images/lodges/standard-double-room.jpg',
    rating: 4.6, // 8.7 on Booking.com
    amenities: ['Rated 8.7/10 on Booking.com', 'Outdoor Swimming Pool', 'Modern Air-Conditioned Rooms', 'Restaurant & Conference Facilities'],
    inquireOnlyNotice: 'Modern 3-star Kasane hotel. Inquire with concierge.'
  },
  {
    id: 'map-chobe-water-villas',
    name: 'Chobe Water Villas',
    address: 'Kasika Conservancy, Chobe Riverfront, Botswana/Namibia',
    destination: 'CHOBE',
    latitude: -17.7850,
    longitude: 25.1750,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 890,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.9, // 9.4 on Booking.com
    amenities: ['Exceptional 9.4/10 Rating', 'Stilted Water Villas Over Chobe River', 'Floor-to-Ceiling Glass Fronts', 'All-Inclusive Luxury Safari'],
    inquireOnlyNotice: 'Spectacular luxury water villas. Concierge direct inquiry required.'
  },
  {
    id: 'map-tlou-safari-lodge',
    name: 'Tlou Safari Lodge',
    address: 'Plot 931, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8120,
    longitude: 25.1550,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 130,
    photo: '/images/lodges/chalet-entrance.jpg',
    rating: 4.6, // 8.6 on Booking.com
    amenities: ['Thatched Safari Chalets', 'Swimming Pool', 'Bar & Braai Facilities', 'Air-Conditioned Rooms'],
    inquireOnlyNotice: 'Comfortable safari lodge. Inquire with concierge.'
  },
  {
    id: 'map-sanctuary-chobe-chilwero',
    name: 'Sanctuary Chobe Chilwero',
    address: 'Kasane Hill, Chobe, Botswana',
    destination: 'CHOBE',
    latitude: -17.8220,
    longitude: 25.1420,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 980,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.9,
    amenities: ['Hilltop Panoramic Views of Chobe Floodplain', 'Full Safari Spa with Treetop Treatment Rooms', 'Split-Level Swimming Pool', 'Gourmet Dining'],
    inquireOnlyNotice: 'Ultra-exclusive Sanctuary retreat. Inquire with concierge.'
  },
  {
    id: 'map-kubu-lodge',
    name: 'Kubu Lodge',
    address: 'Plot 1150, Kazungula Riverfront, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.7920,
    longitude: 25.2450,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 320,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.8,
    amenities: ['Historic Classic Thatched Lodge', 'Giant Ebony & Wild Fig Trees', 'Riverfront Pool', 'Nature Trail & Private Jetty'],
    inquireOnlyNotice: 'Historic tranquil river lodge. Inquire with concierge.'
  },
  {
    id: 'map-chobe-bush-lodge',
    name: 'Chobe Bush Lodge',
    address: 'President Ave, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8070,
    longitude: 25.1460,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 220,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.7,
    amenities: ['Contemporary Bush Architecture', 'Pool & Lounge Deck', 'Adjacent to Chobe NP Entry Gate', 'River & Game Safari Access'],
    inquireOnlyNotice: 'Popular modern companion lodge in Kasane. Inquire with concierge.'
  }
];

console.log(`Prepared ${partnersData.length} Partners and ${mappedPropertiesData.length} Mapped Properties across the Golden Triangle!`);

// Update seed-data.ts
const seedFile = 'c:/Users/victo/Downloads/Vic Falls/src/lib/seed-data.ts';
const content = fs.readFileSync(seedFile, 'utf8');

const partnersIdx = content.indexOf('export const INITIAL_PARTNERS: Partner[] = [');
const reqIdx = content.indexOf('export const INITIAL_ACCOMMODATION_REQUESTS: AccommodationRequest[] = [');

if (partnersIdx === -1 || reqIdx === -1) {
  throw new Error("Could not find delimiters in seed-data.ts");
}

const beforePartners = content.slice(0, partnersIdx);
const fromRequests = content.slice(reqIdx);

const newMiddle = 'export const INITIAL_PARTNERS: Partner[] = ' + JSON.stringify(partnersData, null, 2) + ';\n\n' +
  'export const INITIAL_MAPPED_PROPERTIES: MappedProperty[] = ' + JSON.stringify(mappedPropertiesData, null, 2) + ';\n\n';

fs.writeFileSync(seedFile, beforePartners + newMiddle + fromRequests, 'utf8');
console.log("Successfully updated src/lib/seed-data.ts with all 54 hotels and partners!");
