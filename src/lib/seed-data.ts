import { Activity, Partner, MappedProperty, AccommodationRequest, PartnerInvoice } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-heli-12min',
    slug: 'helicopter-flight-of-angels',
    name: 'Flight of Angels — 12-13 Min Helicopter Scenic Flight',
    destination: 'VICTORIA_FALLS',
    category: 'AIR',
    shortDescription:
      'The iconic aerial journey over Victoria Falls and the Batoka Gorge. Experience the breathtaking vistas described by David Livingstone.',
    fullDescription:
      'To put the Victoria Falls into true perspective, they must be seen from the air. The "Flight of Angels" is the most popular scenic helicopter flight in Southern Africa. You will lift off from our dedicated helipad just 3km from the Falls and embark on a mesmerizing flight over the full 1,700-metre width of the cataract, the tranquil upper Zambezi River, and the serpentine volcanic chasms of the Batoka Gorge.\n\nEvery passenger is guaranteed a direct window seat with unobstructed bubble-glass viewports, allowing you to capture world-class photography and witness rainbows dancing in the perpetual spray mist.',
    durationMinutes: 13,
    durationLabel: '12–13 min',
    grossPriceUSD: 150,
    nettPriceUSD: 120,
    parkFeeUSD: 15,
    departureTimes: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Complimentary return transfers from all Victoria Falls town hotels & lodges',
      'Guaranteed bubble-window seat for every passenger',
      'Pre-flight safety briefing and headset communication with commercial pilot',
      'Flight certificate and destination souvenir map'
    ],
    excludedItems: [
      'National Park and Rainforest Heritage Fee ($15.00 USD per person)',
      'Digital souvenir video / photo package (available as add-on)'
    ],
    restrictions: [
      'Maximum passenger weight limit of 120 kg (264 lbs) per seat; surcharge applies above',
      'Infants under 2 years fly free on an adult lap'
    ],
    aircraftSpecs: {
      model: 'Bell 206 LongRanger / Airbus H120 Colibri',
      capacity: '4 to 6 passengers per flight',
      features: ['Air-conditioned cabin', 'High-visibility bubble windows', 'Bose noise-canceling headsets', 'Turbine-powered twin reliability']
    },
    photos: [
      '/images/helicopter/hero-angels.jpg',
      '/images/helicopter/gorge-flight.jpg',
      '/images/helicopter/cockpit-view.jpg',
      '/images/helicopter/falls-rainbow.jpg',
      '/images/helicopter/spectacular-aerial.jpg',
      '/images/helicopter/helipad-takeoff.jpg'
    ],
    rating: 4.96,
    reviewCount: 428,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-heli-vip-seat',
        activityId: 'act-heli-12min',
        name: 'VIP Co-Pilot Front Seat Upgrade',
        description: 'Sit in the front co-pilot seat alongside the captain for an uninterrupted 180° panoramic vista.',
        grossPriceUSD: 35,
        nettPriceUSD: 25,
        capacityLimit: 1, // HARD CAP: max 1 per flight
        status: 'ACTIVE'
      },
      {
        id: 'addon-heli-4k-video',
        activityId: 'act-heli-12min',
        name: 'HD 4K Souvenir Cockpit & Tail Video (USB Drive)',
        description: 'Professionally edited digital recording from external high-definition cameras mounted on the helicopter.',
        grossPriceUSD: 40,
        nettPriceUSD: 20,
        capacityLimit: null, // Unlimited
        status: 'ACTIVE'
      },
      {
        id: 'addon-heli-park-fee',
        activityId: 'act-heli-12min',
        name: 'Pre-Paid Zimbabwe National Park Fee',
        description: 'Skip the cash payment counter at the helipad by pre-paying your statutory government aviation conservation levy.',
        grossPriceUSD: 15,
        nettPriceUSD: 15,
        capacityLimit: null, // Unlimited
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: 'act-heli-25min',
    slug: 'zambezi-spectacular-25min-helicopter',
    name: 'Zambezi Spectacular — 25 Min Extended Helicopter Flight',
    destination: 'VICTORIA_FALLS',
    category: 'AIR',
    shortDescription:
      'The comprehensive Southern African aerial expedition. Covers Victoria Falls, the deep gorges, and low-level game viewing over Zambezi National Park.',
    fullDescription:
      'The ultimate aerial tour of the region. After completing multiple scenic figure-eights over both the Zimbabwean and Zambian sides of Victoria Falls, your helicopter sweeps downstream through the breathtaking Batoka Gorge before banking upstream over the untouched riverine islands of Zambezi National Park.\n\nFly low over the savannah where pods of hippos bask in the river, elephants cross channels, and herds of buffalo graze along the floodplains.',
    durationMinutes: 25,
    durationLabel: '25 min',
    grossPriceUSD: 285,
    nettPriceUSD: 230,
    parkFeeUSD: 15,
    departureTimes: ['08:30', '10:30', '14:30', '16:15'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Complimentary return hotel transfers',
      'Extended 25-minute flight route including Victoria Falls, Batoka Gorge and Zambezi National Park',
      'Aerial wildlife tracking with live pilot commentary',
      'Bubble-window guaranteed seating'
    ],
    excludedItems: [
      'National Park Conservation Fee ($15.00 USD per person)',
      'Digital video package'
    ],
    restrictions: [
      'Maximum passenger weight limit of 120 kg per seat',
      'Flight path may be adjusted slightly for wildlife protection'
    ],
    aircraftSpecs: {
      model: 'Airbus H120 / Bell 206L LongRanger',
      capacity: '4 to 6 passengers',
      features: ['Air conditioning', 'Panoramic glass windows', 'Bose noise-canceling headsets']
    },
    photos: [
      '/images/helicopter/spectacular-aerial.jpg',
      '/images/helicopter/gorge-flight.jpg',
      '/images/helicopter/hero-angels.jpg',
      '/images/destinations/victoria-falls-panoramic.jpg'
    ],
    rating: 4.98,
    reviewCount: 219,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-heli25-vip-seat',
        activityId: 'act-heli-25min',
        name: 'VIP Co-Pilot Front Seat Upgrade',
        description: 'Unmatched 180-degree view beside the captain during the extended 25-minute expedition.',
        grossPriceUSD: 45,
        nettPriceUSD: 30,
        capacityLimit: 1, // HARD CAP
        status: 'ACTIVE'
      },
      {
        id: 'addon-heli25-4k-video',
        activityId: 'act-heli-25min',
        name: 'Full 4K Souvenir Video USB',
        description: 'Ultra-high-definition multi-camera recording of your complete 25-minute flight.',
        grossPriceUSD: 45,
        nettPriceUSD: 22,
        capacityLimit: null,
        status: 'ACTIVE'
      },
      {
        id: 'addon-heli25-park-fee',
        activityId: 'act-heli-25min',
        name: 'Pre-Paid National Park Fee',
        description: 'Statutory government aviation conservation levy pre-cleared.',
        grossPriceUSD: 15,
        nettPriceUSD: 15,
        capacityLimit: null,
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: 'act-rafting',
    slug: 'batoka-gorge-white-water-rafting',
    name: 'Batoka Gorge White Water Rafting — Full Day Adrenaline',
    destination: 'VICTORIA_FALLS',
    category: 'WATER',
    shortDescription:
      'Globally renowned as the greatest one-day white water rafting trip on earth. Run legendary Class IV & V rapids beneath the mighty Victoria Falls.',
    fullDescription:
      'Tackle the roaring Zambezi River as it churns through the Batoka Gorge. Guided by licensed river masters with international whitewater certifications, you will navigate famous Class 4 and 5 rapids like "The Overland Truck-eater", "The Mother", "Gulliver\'s Travels", and "Stairway to Heaven".\n\nIncludes a hearty lunch at the top of the gorge and ice-cold celebratory drinks.',
    durationMinutes: 420,
    durationLabel: '7 Hours (Full Day)',
    grossPriceUSD: 130,
    nettPriceUSD: 100,
    parkFeeUSD: 10,
    departureTimes: ['07:00'],
    pickupIncluded: true,
    fitnessLevel: 'High',
    minAge: 15,
    includedItems: [
      'Full equipment: life jacket, helmet, paddle, splash jacket',
      'Comprehensive safety briefing and raft captain training',
      'Hearty BBQ buffet lunch and cold refreshments at the top of the gorge',
      'Return hotel transfers'
    ],
    excludedItems: [
      'National Park & River Access Fee ($10.00 USD)',
      'Professional rapid action photography USB (available on site)'
    ],
    restrictions: [
      'Requires good physical fitness to hike in and out of the 230m Batoka Gorge',
      'Minimum age is 15 years'
    ],
    photos: [
      '/images/activities/zambezi-rafting.jpg',
      '/images/activities/rapid-action.jpg'
    ],
    rating: 4.94,
    reviewCount: 312,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-rafting-boots',
        activityId: 'act-rafting',
        name: 'Gorge Trekking Boot Hire',
        description: 'High-traction river boots for descending and climbing the gorge walls.',
        grossPriceUSD: 10,
        nettPriceUSD: 5,
        capacityLimit: null,
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: 'act-bungee',
    slug: 'victoria-falls-bridge-bungee-jump',
    name: 'Victoria Falls Bridge 111m Bungee Jump',
    destination: 'VICTORIA_FALLS',
    category: 'ADRENALINE',
    shortDescription:
      'The world-famous 111-meter plunge off the historic Victoria Falls Bridge into the swirling mists of the Batoka Gorge.',
    fullDescription:
      'Suspended between Zimbabwe and Zambia on Cecil Rhodes\' 1905 Victoria Falls Bridge, you stand on the platform 111 meters above the mighty Zambezi River. With 4 seconds of pure freefall reaching 120 km/h, this is considered by adrenaline seekers as the single most dramatic bungee jump on the planet.\n\nOperated under 100% British safety standards with redundant cords and dual harnesses.',
    durationMinutes: 120,
    durationLabel: '2 Hours',
    grossPriceUSD: 160,
    nettPriceUSD: 125,
    parkFeeUSD: 0,
    departureTimes: ['09:00', '11:00', '14:00', '16:00'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 14,
    includedItems: [
      'Return transport to the Victoria Falls Bridge border post',
      'All safety harness gear and certified jump crew',
      'Certificate of courage'
    ],
    excludedItems: [
      'Video and photo package (filmed from multiple angles)'
    ],
    restrictions: [
      'Minimum weight 40 kg (88 lbs), maximum weight 140 kg (308 lbs)',
      'Passport required for bridge access (no visa stamp required for jump pass)'
    ],
    photos: [
      '/images/activities/bridge-bungee.jpg',
      '/images/activities/gorge-bungee-jump.jpg'
    ],
    rating: 4.97,
    reviewCount: 185,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-cruise',
    slug: 'riversong-luxury-sunset-cruise',
    name: 'Riversong Luxury Zambezi Sunset Cruise',
    destination: 'VICTORIA_FALLS',
    category: 'WATER',
    shortDescription:
      'Sip artisan cocktails and fine wines on the upper deck of the Riversong as the African sun sets over the Zambezi River.',
    fullDescription:
      'Experience the tranquility and majesty of the Zambezi River above the Victoria Falls. The Riversong is a custom-designed luxury catamaran boasting spacious viewing decks, plush lounge seating, and attentive table service.\n\nSpot pods of hippos, bathing elephants, and soaring African fish eagles while enjoying freshly prepared gourmet canapés and an open premium bar.',
    durationMinutes: 150,
    durationLabel: '2.5 Hours',
    grossPriceUSD: 75,
    nettPriceUSD: 55,
    parkFeeUSD: 10,
    departureTimes: ['16:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Return hotel transfers to the private jetty',
      'Selection of chef-prepared gourmet canapés and tapas',
      'Complimentary premium open bar with South African wines, beers, and spirits',
      'Expert river captain & wildlife guide'
    ],
    excludedItems: [
      'National Park River Entry Fee ($10.00 USD per person)'
    ],
    restrictions: [],
    photos: [
      '/images/activities/riversong-sunset-cruise.jpg',
      '/images/activities/zambezi-luxury-deck.jpg'
    ],
    rating: 4.92,
    reviewCount: 388,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-chobe',
    slug: 'chobe-national-park-day-trip-safari',
    name: 'Chobe National Park Full-Day Safari (Botswana)',
    destination: 'CHOBE',
    category: 'SAFARI_WILDLIFE',
    shortDescription:
      'A seamless day expedition to Botswana\'s premier game park. Includes a Chobe River wildlife cruise, buffet lunch at a luxury safari lodge, and a 4x4 open vehicle game drive.',
    fullDescription:
      'Chobe National Park holds the greatest concentration of African elephants on the continent, with over 120,000 elephants roaming freely. This full-day adventure begins with an early morning cross-border transfer across the Kazungula Bridge into Botswana.\n\nFirst, board a specialized river safari boat to observe elephants swimming across channels, huge Nile crocodiles, and cape buffalo along the water\'s edge. After a gourmet buffet lunch at a riverside safari lodge, board custom 4x4 open safari vehicles for a deep-track game drive through the Chobe National Park wilderness.',
    durationMinutes: 540,
    durationLabel: '9 Hours (Full Day)',
    grossPriceUSD: 170,
    nettPriceUSD: 135,
    parkFeeUSD: 15,
    departureTimes: ['07:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 4,
    includedItems: [
      'Return cross-border transfers from Victoria Falls or Livingstone',
      'Chobe River 3-hour boat safari',
      'Sumptuous buffet lunch at a luxury safari lodge',
      'Chobe National Park 3-hour 4x4 open safari vehicle game drive',
      'Bottled water and soft drinks throughout the day',
      'Botswana National Park conservation entry fees'
    ],
    excludedItems: [
      'Personal visa fees if applicable (KAZA Univisa covers border entry)',
      'Alcoholic beverages with lunch'
    ],
    restrictions: [
      'Valid passport with at least 6 months validity required',
      'KAZA Univisa recommended for seamless dual entry'
    ],
    photos: [
      '/images/activities/chobe-elephants-river.jpg',
      '/images/activities/chobe-game-drive.jpg',
      '/images/destinations/chobe-river-safari.jpg'
    ],
    rating: 4.96,
    reviewCount: 460,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-livingstone-devilspool',
    slug: 'livingstone-island-devils-pool',
    name: 'Livingstone Island & Devil\'s Pool Swim (Zambia)',
    destination: 'LIVINGSTONE',
    category: 'ADRENALINE',
    shortDescription:
      'Stand where David Livingstone first saw the Falls and take a dip in nature\'s ultimate infinity pool perched right on the precipice of the 100m drop.',
    fullDescription:
      'Accessible only during low-to-medium water seasons, Devil\'s Pool is an exhilarating natural rock pool resting right on the lip of Victoria Falls on the Zambian border. A boat whisks you across the Zambezi to historic Livingstone Island, where you follow expert guides along a rock ledge to plunge into the pool, gazing down into the swirling 100m abyss.\n\nConcludes with high tea or a gourmet riverside breakfast under canvas.',
    durationMinutes: 180,
    durationLabel: '3 Hours',
    grossPriceUSD: 145,
    nettPriceUSD: 115,
    parkFeeUSD: 0,
    departureTimes: ['07:30', '10:00', '12:30', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 12,
    includedItems: [
      'Boat transfer to Livingstone Island',
      'Guided swim in Devil\'s Pool with experienced safety handlers',
      'Full gourmet meal (Breakfast, Lunch, or High Tea depending on slot)',
      'Historical tour of Livingstone Island'
    ],
    excludedItems: [
      'Cross-border bridge transfer if originating from Zimbabwe'
    ],
    restrictions: [
      'Seasonal activity: operates during low-water period (usually mid-August to mid-January)',
      'Swimming capability required'
    ],
    photos: [
      '/images/destinations/livingstone-devilspool.jpg',
      '/images/destinations/victoria-falls-cataract.jpg'
    ],
    rating: 4.99,
    reviewCount: 275,
    status: 'ACTIVE',
    addOns: []
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'partner-explorers-village',
    name: 'Shearwater Explorers Village',
    destination: 'VICTORIA_FALLS',
    contactEmail: 'reservations@explorersvillage.com',
    contactPhone: '+263 13 44471',
    commissionType: 'PERCENTAGE',
    commissionValue: 20, // 20% commission on bookings
    contentRightsGranted: true,
    status: 'ACTIVE',
    roomTypes: [
      {
        id: 'room-deluxe-chalet',
        name: 'Deluxe Air-Conditioned Chalet',
        description: 'Spacious private chalet featuring King or Twin beds, ensuite bathroom with walk-in rainfall shower, private veranda, air conditioning, and complimentary Wi-Fi.',
        rateUSD: 165,
        capacity: 2,
        photo: '/images/explorers-village/deluxe-room.jpg'
      },
      {
        id: 'room-standard-lodge',
        name: 'Standard Safari Room',
        description: 'Comfortable ensuite safari-style room with ceiling fans, mosquito netting, veranda, and direct garden access to the swimming pools.',
        rateUSD: 110,
        capacity: 2,
        photo: '/images/explorers-village/deluxe-chalet-exterior.jpg'
      },
      {
        id: 'room-camping',
        name: 'Equipped Safari Camping Dome',
        description: 'Budget-friendly adventure camping with twin beds, bedding supplied, shared modern ablution blocks, and access to all resort amenities.',
        rateUSD: 35,
        capacity: 2,
        photo: '/images/explorers-village/camping-grounds.jpg'
      }
    ]
  }
];

export const INITIAL_MAPPED_PROPERTIES: MappedProperty[] = [
  // Victoria Falls (Zimbabwe)
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
    photo: '/images/explorers-village/deluxe-room.jpg',
    rating: 4.8,
    amenities: ['Swimming Pool', 'Air Conditioning', 'Curio Shop', 'Restaurant & Bar', 'Free Wi-Fi', '200m to Town']
  },
  {
    id: 'map-vic-falls-hotel',
    name: 'The Victoria Falls Hotel',
    address: '1 Mallet Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9282,
    longitude: 25.8456,
    isBookablePartner: false, // Gray pin (Reference only)
    locationVerifiedByStaff: true,
    startingPriceUSD: 480,
    photo: '/images/destinations/victoria-falls-panoramic.jpg',
    rating: 4.9,
    amenities: ['Historic Heritage (1904)', 'View of Bridge', 'Edwardian Luxury', 'Fine Dining', 'Pool'],
    inquireOnlyNotice: 'This property is not directly bookable online. Looking to include this historic luxury hotel in your custom itinerary?'
  },
  {
    id: 'map-ilala-lodge',
    name: 'Ilala Lodge Hotel',
    address: '411 Livingstone Way, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9272,
    longitude: 25.8406,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: true,
    startingPriceUSD: 340,
    photo: '/images/destinations/victoria-falls-cataract.jpg',
    rating: 4.7,
    amenities: ['Closest Hotel to the Falls', 'Cassia Restaurant', 'Lush Gardens', 'Wildlife on Lawns'],
    inquireOnlyNotice: 'Reference listing only. Inquire with our concierge to add Ilala Lodge to your private itinerary.'
  },
  {
    id: 'map-victoria-safari-lodge',
    name: 'Victoria Falls Safari Lodge',
    address: 'Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9150,
    longitude: 25.8115,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: false,
    startingPriceUSD: 390,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.8,
    amenities: ['Waterhole View', 'Vulture Culture Experience', 'Buffalo Bar Sunset', 'Spa'],
    inquireOnlyNotice: 'Reference listing only. Contact our concierge for availability and group bookings.'
  },

  // Livingstone (Zambia)
  {
    id: 'map-royal-livingstone',
    name: 'The Royal Livingstone by Anantara',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9125,
    longitude: 25.8583,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: true,
    startingPriceUSD: 620,
    photo: '/images/destinations/livingstone-devilspool.jpg',
    rating: 4.9,
    amenities: ['Free Unlimited Access to Victoria Falls (Zambia)', 'Zambezi Deck Sundowners', 'Zebras on Lawns', 'Butler Service'],
    inquireOnlyNotice: 'Premier luxury partner. Direct online booking opens in V2. Inquire with our concierge for preferred room rates.'
  },
  {
    id: 'map-avani-vic-falls',
    name: 'Avani Victoria Falls Resort',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9156,
    longitude: 25.8598,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: true,
    startingPriceUSD: 240,
    photo: '/images/destinations/livingstone-devilspool.jpg',
    rating: 4.6,
    amenities: ['Family Friendly', 'Walking Access to Zambian Cataract', 'African Boma Dinners'],
    inquireOnlyNotice: 'Reference listing only. Contact concierge for family packages.'
  },

  // Chobe / Kasane (Botswana)
  {
    id: 'map-chobe-safari-lodge',
    name: 'Chobe Safari Lodge',
    address: 'Plot 280, President Ave, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8041,
    longitude: 25.1432,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: true,
    startingPriceUSD: 310,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.7,
    amenities: ['Chobe Riverfront', 'Game Drive Jetty', 'Swimming Pool', 'Buffet Restaurant'],
    inquireOnlyNotice: 'Reference listing only. Speak with our safari coordinator to integrate Chobe Safari Lodge into your package.'
  },
  {
    id: 'map-chobe-game-lodge',
    name: 'Chobe Game Lodge',
    address: 'Inside Chobe National Park, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8347,
    longitude: 25.0118,
    isBookablePartner: false, // Reference
    locationVerifiedByStaff: false,
    startingPriceUSD: 780,
    photo: '/images/destinations/chobe-river-safari.jpg',
    rating: 4.9,
    amenities: ['Only Lodge Inside Chobe NP', 'All-Female Guiding Team', 'Electric Safari Boats', 'All-Inclusive'],
    inquireOnlyNotice: 'Premier 5-star Botswana eco-lodge. Inquire with our safari specialists for custom packages.'
  }
];

export const INITIAL_ACCOMMODATION_REQUESTS: AccommodationRequest[] = [
  {
    id: 'req-101',
    partnerId: 'partner-explorers-village',
    partnerName: 'Shearwater Explorers Village',
    travellerId: 'trav-101',
    travellerName: 'Sarah Jenkins',
    travellerEmail: 'sarah.jenkins@example.co.uk',
    checkInDate: '2026-10-15',
    checkOutDate: '2026-10-18',
    roomType: 'Deluxe Air-Conditioned Chalet',
    numGuests: 2,
    quotedRateUSD: 495, // 3 nights @ $165
    paymentPath: 'PAY_NOW',
    status: 'PENDING',
    paymentId: 'pay-hold-101',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), // 4 hours ago
    slaDeadline: new Date(Date.now() + 20 * 3600 * 1000).toISOString()
  },
  {
    id: 'req-102',
    partnerId: 'partner-explorers-village',
    partnerName: 'Shearwater Explorers Village',
    travellerId: 'trav-102',
    travellerName: 'Michael Chang',
    travellerEmail: 'mchang@example.com',
    checkInDate: '2026-11-02',
    checkOutDate: '2026-11-05',
    roomType: 'Standard Safari Room',
    numGuests: 2,
    quotedRateUSD: 330, // 3 nights @ $110
    paymentPath: 'PAY_AT_PROPERTY',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), // 14 hours ago (Amber)
    slaDeadline: new Date(Date.now() + 10 * 3600 * 1000).toISOString()
  }
];

export const INITIAL_INVOICES: PartnerInvoice[] = [
  {
    id: 'inv-201',
    partnerId: 'partner-explorers-village',
    partnerName: 'Shearwater Explorers Village',
    accommodationRequestId: 'req-099',
    guestName: 'David & Emma Thompson',
    stayDates: 'Sep 10 - Sep 13, 2026',
    grossBookingUSD: 495,
    commissionAmountUSD: 99, // 20% of $495
    status: 'ISSUED',
    createdAt: '2026-09-14T10:00:00Z',
    billedAt: '2026-09-15T08:30:00Z'
  }
];
