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
    id: 'act-microlight',
    slug: 'livingstone-microlight-flight',
    name: 'Livingstone Microlight Scenic Flight (Zambia)',
    destination: 'LIVINGSTONE',
    category: 'AIR',
    shortDescription:
      'Feel the wind in your face and the mist on your skin. Open-cockpit microlight flights over Victoria Falls and the Batoka Gorge from Batoka Sky aerodrome.',
    fullDescription:
      'For the ultimate open-air flying sensation, nothing rivals a microlight flight over the Victoria Falls. Operating from the Batoka Sky aerodrome in Livingstone, Zambia, you fly in a two-seater ultralight aircraft with a certified commercial pilot.\n\nEnjoy complete, unhindered 360-degree vistas as you soar directly through the rising spray plumes of Mosi-oa-Tunya. Choose between the classic 15-minute falls circuit or the exhilarating 30-minute gorge and game-flight over Mosi-oa-Tunya National Park.',
    durationMinutes: 15,
    durationLabel: '15 or 30 min',
    grossPriceUSD: 190,
    nettPriceUSD: 155,
    parkFeeUSD: 6,
    departureTimes: ['06:30', '07:15', '08:00', '15:30', '16:15', '17:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 12,
    includedItems: [
      'Return hotel transfers in Livingstone',
      'Flight suit, communication helmet and pre-flight briefing',
      'One-on-one personalized flight with a veteran commercial pilot'
    ],
    excludedItems: [
      'Civil Aviation Authority levy ($6.00 USD)',
      'Wing-mounted high-resolution digital photo series'
    ],
    restrictions: [
      'Maximum passenger weight 100 kg (220 lbs)',
      'No personal cameras or loose items permitted in the open cockpit for safety'
    ],
    aircraftSpecs: {
      model: 'Aquilla / DTA Dual-seat Microlight Trike',
      capacity: '1 passenger + 1 pilot',
      features: ['Completely open cockpit', 'Intercom communications', 'Wing-mounted GoPro capture system']
    },
    photos: [
      '/images/helicopter/spectacular-aerial.jpg',
      '/images/destinations/victoria-falls-cataract.jpg',
      '/images/destinations/livingstone-devilspool.jpg'
    ],
    rating: 4.95,
    reviewCount: 164,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-micro-30min-upgrade',
        activityId: 'act-microlight',
        name: '30-Min Extended Gorge & Game Upgrade',
        description: 'Extend your flight to 30 minutes, swooping low through the Batoka Gorge and over Mosi-oa-Tunya National Park wildlife.',
        grossPriceUSD: 190,
        nettPriceUSD: 155,
        capacityLimit: null,
        status: 'ACTIVE'
      },
      {
        id: 'addon-micro-wing-photos',
        activityId: 'act-microlight',
        name: 'Wing-Mounted Digital Photo Pack',
        description: 'Over 50 high-resolution aerial shots captured by the automated wing-strut camera system.',
        grossPriceUSD: 30,
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
    id: 'act-bridge-swing',
    slug: 'victoria-falls-bridge-swing',
    name: 'Victoria Falls Bridge Swing — 80m Freefall Arc',
    destination: 'VICTORIA_FALLS',
    category: 'ADRENALINE',
    shortDescription:
      'Step off the Victoria Falls Bridge into an 80-meter sheer freefall before swinging in a giant pendulum arc over the churning Zambezi River.',
    fullDescription:
      'The Victoria Falls Bridge Swing lets you experience the ultimate rush: stepping into thin air from the center arch of the iconic bridge. Freefall 80 meters before the rope tightens, swinging you in an exhilarating 150-meter arc across the Batoka Gorge.\n\nAvailable as a solo plunge or a tandem jump alongside your partner or travel companion.',
    durationMinutes: 90,
    durationLabel: '1.5 Hours',
    grossPriceUSD: 160,
    nettPriceUSD: 125,
    parkFeeUSD: 0,
    departureTimes: ['09:30', '11:30', '14:30', '16:30'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 14,
    includedItems: [
      'Return transfers to bridge border gate',
      'Full body harness and specialized pendulum swing rigging',
      'Master jump master guidance and safety sign-off'
    ],
    excludedItems: [
      'High-speed digital photography and multi-angle video package'
    ],
    restrictions: [
      'Maximum weight: 140 kg solo, 260 kg combined tandem',
      'Passport required to clear border gate onto the bridge'
    ],
    photos: [
      '/images/activities/bridge-swing.jpg',
      '/images/activities/bridge-swing-action.jpg'
    ],
    rating: 4.96,
    reviewCount: 142,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-swing-tandem',
        activityId: 'act-bridge-swing',
        name: 'Tandem Swing Upgrade (Pair of Jumpers)',
        description: 'Upgrade your solo jump into a combined tandem swing together with a partner.',
        grossPriceUSD: 80,
        nettPriceUSD: 60,
        capacityLimit: null,
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: 'act-bridge-slide',
    slug: 'victoria-falls-bridge-slide',
    name: 'Victoria Falls Bridge Slide — High-Wire Zip Line',
    destination: 'VICTORIA_FALLS',
    category: 'ADRENALINE',
    shortDescription:
      'Glide 300 meters across the Batoka Gorge from the Zambian riverbank to the Victoria Falls Bridge with spectacular cataract views.',
    fullDescription:
      'Beginning on the cliff edge of the Zambian riverbank, you are clipped into a high-grade tandem zipline pulley and launched across 300 meters of open airspace, finishing securely on the historical Victoria Falls Bridge.\n\nGentler than the bungee or swing, this activity provides sweeping panoramic vistas of the falls spray and turbulent gorge below, ideal for thrill-seeking families and couples.',
    durationMinutes: 60,
    durationLabel: '1 Hour',
    grossPriceUSD: 45,
    nettPriceUSD: 35,
    parkFeeUSD: 0,
    departureTimes: ['09:00', '10:30', '12:00', '14:00', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 6,
    includedItems: [
      'Safety harness, helmet, and zip-line pulley equipment',
      'Full briefing and landing catch crew',
      'Complimentary return hotel transfer'
    ],
    excludedItems: [
      'Souvenir digital photos'
    ],
    restrictions: [
      'Children aged 6–12 must slide tandem with an adult'
    ],
    photos: [
      '/images/activities/bridge-slide.jpg',
      '/images/activities/bridge-bungee.jpg'
    ],
    rating: 4.88,
    reviewCount: 96,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-bridge-tour',
    slug: 'historic-victoria-falls-bridge-tour',
    name: 'Historic Victoria Falls Bridge Under-Deck Catwalk Tour',
    destination: 'VICTORIA_FALLS',
    category: 'CULTURE_HERITAGE',
    shortDescription:
      'Walk along the maintenance catwalks directly suspended under the Victoria Falls Bridge. Uncover the dramatic 1905 engineering history.',
    fullDescription:
      'Step back in time to 1905 when Cecil John Rhodes ordered the bridge built where the spray from the falls would fall upon the train carriages. Put on a harness and safety carabiner as your theatrical guide leads you onto the narrow steel catwalks directly beneath the bridge deck, suspended 111 meters over the Batoka Gorge.\n\nInspect original Edwardian rivets, hear incredible tales of construction against impossible odds, and watch daredevils plunge on the bungee above.',
    durationMinutes: 120,
    durationLabel: '2 Hours',
    grossPriceUSD: 68,
    nettPriceUSD: 52,
    parkFeeUSD: 0,
    departureTimes: ['10:00', '14:00', '16:00'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 10,
    includedItems: [
      'Historical narration by theatrical heritage guide',
      'Full safety continuous-fall-arrest harness and helmet',
      'Walk under the bridge on original construction catwalks',
      'Bridge Visitor Centre museum entrance and audio-visual show'
    ],
    excludedItems: [],
    restrictions: [
      'Closed-toe walking shoes mandatory (no sandals/flip-flops)',
      'Requires clearance of bridge border post (passports needed)'
    ],
    photos: [
      '/images/activities/bridge-tour-catwalk.jpg',
      '/images/activities/bridge-tour-history.jpg'
    ],
    rating: 4.93,
    reviewCount: 118,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-guided-tour-falls',
    slug: 'guided-tour-of-victoria-falls',
    name: 'Guided Tour of the Victoria Falls (Zimbabwe)',
    destination: 'VICTORIA_FALLS',
    category: 'CULTURE_HERITAGE',
    shortDescription:
      'A deeply enriching walking tour through the lush Victoria Falls Rainforest. Discover 16 viewpoints, the Big Tree, and the geological origins of the Smoke That Thunders.',
    fullDescription:
      'Accompanied by a veteran Zimbabwean professional guide, walk the paved rainforest paths hugging the edge of the Victoria Falls. The Zimbabwean side commands 75% of the total cataract length, including the Devils Cataract, Main Falls, Rainbow Falls, and Danger Point.\n\nYour guide explains the local Tonga lore of Mosi-oa-Tunya, the unique botanical rainforest ecosystem sustained by the perpetual spray, and the dramatic 150-million-year geological history of the Zambezi River basalt fissures.',
    durationMinutes: 150,
    durationLabel: '2.5 Hours',
    grossPriceUSD: 30,
    nettPriceUSD: 22,
    parkFeeUSD: 50, // International visitor rainforest fee
    departureTimes: ['08:00', '10:30', '14:00', '16:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Return hotel transfers in air-conditioned vehicle',
      'Professional certified interpretive safari guide',
      'Bottled mineral water',
      'Rain poncho rental during high water spray season'
    ],
    excludedItems: [
      'Zimbabwe National Parks Rainforest Entry Fee ($50.00 USD International / $30.00 SADC)'
    ],
    restrictions: [
      'Paved trails with gradual steps; wheelchair accessible routes available upon advance request'
    ],
    photos: [
      '/images/activities/guided-tour-falls.jpg',
      '/images/activities/guided-tour-viewpoint.jpg',
      '/images/destinations/victoria-falls-panoramic.jpg'
    ],
    rating: 4.96,
    reviewCount: 512,
    status: 'ACTIVE',
    addOns: [
      {
        id: 'addon-tour-rainforest-fee',
        activityId: 'act-guided-tour-falls',
        name: 'Pre-Paid Rainforest National Park Entry Fee',
        description: 'Pre-pay the statutory Zimbabwe Parks & Wildlife Management Authority rainforest admission ($50 USD).',
        grossPriceUSD: 50,
        nettPriceUSD: 50,
        capacityLimit: null,
        status: 'ACTIVE'
      }
    ]
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
    id: 'act-adventure-jetboat',
    slug: 'adventure-jet-boat-batoka-gorge',
    name: 'Adventure Jet Boat — Batoka Gorge Extreme Rapids',
    destination: 'VICTORIA_FALLS',
    category: 'WATER',
    shortDescription:
      'Experience 465 horsepower jet engines powering through the churning whitewater of the Batoka Gorge. 360-degree spins against towering canyon walls.',
    fullDescription:
      'The Adventure Jet Boat is engineered specifically to master the massive swells and churning boils of the lower Zambezi River rapids. Powered by high-output twin jet engines, your specialized skipper executes hair-raising 360-degree spins, high-speed drifts, and rapid charges between sheer 200m basalt cliffs.\n\nIncludes an exhilarating cable car descent and ascent into the Batoka Gorge.',
    durationMinutes: 180,
    durationLabel: '3 Hours',
    grossPriceUSD: 120,
    nettPriceUSD: 95,
    parkFeeUSD: 10,
    departureTimes: ['08:30', '11:00', '13:30', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 10,
    includedItems: [
      'Return hotel transfers',
      'Cable car lift into and out of the Batoka Gorge',
      'Life jackets, safety helmets, and waterproof gear',
      'Refreshments at the river basecamp'
    ],
    excludedItems: [
      'National Parks River Conservation Fee ($10.00 USD)'
    ],
    restrictions: [
      'Not suitable for pregnant women or individuals with serious neck/back injuries'
    ],
    photos: [
      '/images/activities/adventure-jetboat.jpg',
      '/images/activities/jetboat-rapids.jpg'
    ],
    rating: 4.91,
    reviewCount: 129,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-game-drive',
    slug: 'zambezi-national-park-game-drive',
    name: 'Zambezi National Park Morning & Afternoon Game Drive',
    destination: 'VICTORIA_FALLS',
    category: 'SAFARI_WILDLIFE',
    shortDescription:
      'Track lion, leopard, elephant, and sable antelope through pristine riverine wilderness in customized open 4x4 safari vehicles.',
    fullDescription:
      'Located just upstream from the Falls, the Zambezi National Park spans 56,000 hectares of pristine savannah and Zambezi river frontage. Board an open four-wheel-drive safari vehicle equipped with tiered seating for prime photographic angles.\n\nAccompanied by an armed Zimbabwe National Parks licensed professional guide, you will track big cats, giraffes, zebras, and rare antelope species such as sable and eland. Morning safaris pause for riverside coffee and rusks; afternoon safaris conclude with sundowner drinks.',
    durationMinutes: 210,
    durationLabel: '3.5 Hours',
    grossPriceUSD: 80,
    nettPriceUSD: 60,
    parkFeeUSD: 15,
    departureTimes: ['06:00', '15:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 4,
    includedItems: [
      'Return hotel transfers in Victoria Falls',
      'Open 4x4 safari vehicle with canopy and charging ports',
      'Licensed professional field safari guide',
      'Morning tea/coffee or evening sundowner drinks and gourmet snacks'
    ],
    excludedItems: [
      'National Parks Conservation Fee ($15.00 USD per person)'
    ],
    restrictions: [],
    photos: [
      '/images/activities/zambezi-game-drive.jpg',
      '/images/activities/game-drive-lions.jpg'
    ],
    rating: 4.89,
    reviewCount: 204,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-elephant-interaction',
    slug: 'elephant-sanctuary-interaction',
    name: 'Through the Eyes of an Elephant Sanctuary Experience',
    destination: 'VICTORIA_FALLS',
    category: 'SAFARI_WILDLIFE',
    shortDescription:
      'An ethical, educational encounter with orphaned and rescued elephants in the Masuwe River Valley. Walk alongside the herd and learn about conservation.',
    fullDescription:
      'Set within the private Masuwe sanctuary, this renowned conservation program offers intimate, non-riding encounters with rescued elephants. Under the guidance of experienced caretakers, spend time feeding the herd healthy treats, touching their rough hide, and learning about elephant anatomy, social communication, and anti-poaching rehabilitation.\n\nConcludes with a delightful bush breakfast or afternoon refreshments on the deck overlooking the waterhole.',
    durationMinutes: 150,
    durationLabel: '2.5 Hours',
    grossPriceUSD: 115,
    nettPriceUSD: 90,
    parkFeeUSD: 10,
    departureTimes: ['06:30', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 4,
    includedItems: [
      'Return transfers from Victoria Falls lodges',
      'Educational presentation and hands-on interaction feeding treats',
      'Full cooked breakfast (morning) or snacks and drinks (afternoon)'
    ],
    excludedItems: [
      'Conservation and sanctuary levy ($10.00 USD)'
    ],
    restrictions: [
      'Strictly ethical encounter: no elephant riding'
    ],
    photos: [
      '/images/activities/elephant-interaction.jpg',
      '/images/activities/elephant-safari.jpg'
    ],
    rating: 4.95,
    reviewCount: 247,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-canopy-tour',
    slug: 'victoria-falls-canopy-tour',
    name: 'Victoria Falls Canopy Tour — Batoka Gorge Treetop Ziplines',
    destination: 'VICTORIA_FALLS',
    category: 'ADRENALINE',
    shortDescription:
      'Glide through 9 cable slides nestled within the lush hardwood riverine forest canopy overlooking the turbulent rapids of the Batoka Gorge.',
    fullDescription:
      'The Victoria Falls Canopy Tour offers a breathtaking eco-adventure through the cliffside forests of the Zambezi Gorge. Featuring nine separate zip lines ranging from 40 to 85 meters in length, suspended cable walkways, and rope bridges.\n\nObserve rare birdlife like the Schalow\'s Turaco and Peregrine Falcon while soaking in aerial views of the roaring Zambezi River and the Victoria Falls Bridge.',
    durationMinutes: 150,
    durationLabel: '2.5 Hours',
    grossPriceUSD: 65,
    nettPriceUSD: 50,
    parkFeeUSD: 0,
    departureTimes: ['08:30', '10:30', '13:30', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 6,
    includedItems: [
      'Full canopy safety harness, double-clip lanyards, and helmets',
      'Two professional canopy tour guides per group',
      'Return transfers from town hotels'
    ],
    excludedItems: [],
    restrictions: [
      'Maximum weight limit 140 kg (308 lbs)'
    ],
    photos: [
      '/images/activities/bridge-slide.jpg',
      '/images/activities/rapid-action.jpg'
    ],
    rating: 4.91,
    reviewCount: 167,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-boma-dinner',
    slug: 'the-boma-dinner-and-drum-show',
    name: 'The Boma — Place of Eating Dinner & Interactive Drum Show',
    destination: 'VICTORIA_FALLS',
    category: 'CULTURE_HERITAGE',
    shortDescription:
      'Victoria Falls\' most celebrated culinary experience. A 4-course feast featuring local game meats, traditional Shangaan dancers, and an interactive djembe drumming circle.',
    fullDescription:
      'An unforgettable evening celebrating African culture, food, and music. Upon arrival, guests are robed in ceremonial Chitenge sarongs and greeted with traditional face painting. Enjoy a legendary four-course buffet featuring spit-roasted warthog, succulent crocodile, venison steaks, and local delicacies such as the daring mopane worm (with an official certificate for those brave enough!).\n\nAs dinner concludes, every guest receives their own djembe drum to participate in the energetic master drum show, followed by acrobatic dancers and fire spinners.',
    durationMinutes: 180,
    durationLabel: '3 Hours',
    grossPriceUSD: 55,
    nettPriceUSD: 42,
    parkFeeUSD: 0,
    departureTimes: ['19:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Return hotel transfers in Victoria Falls',
      'Ceremonial Chitenge welcome and face painting',
      'Sumptuous four-course African buffet feast',
      'Interactive Djembe drum and dance show participation'
    ],
    excludedItems: [
      'Beverages and specialty cocktails from the bar'
    ],
    restrictions: [],
    photos: [
      '/images/activities/traditional-village.jpg',
      '/images/destinations/victoria-falls-panoramic.jpg'
    ],
    rating: 4.92,
    reviewCount: 680,
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
    grossPriceUSD: 149,
    nettPriceUSD: 115,
    parkFeeUSD: 0,
    departureTimes: ['07:30', '09:00', '10:30', '12:30', '15:30'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 12,
    includedItems: [
      'Twin-engine boat transfer to Livingstone Island',
      'Guided swim in Devil\'s Pool with experienced safety handlers',
      'Full gourmet meal (Breakfast, Lunch, or High Tea depending on slot)',
      'Historical tour of Livingstone Island'
    ],
    excludedItems: [
      'Cross-border bridge transfer if originating from Zimbabwe side'
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
    addOns: [
      {
        id: 'addon-devil-lunch-upgrade',
        activityId: 'act-livingstone-devilspool',
        name: 'Gourmet 3-Course Island Lunch Slot Upgrade',
        description: 'Upgrade your island tour to the premium 12:30 midday slot with a three-course gourmet lunch and chilled wines.',
        grossPriceUSD: 50,
        nettPriceUSD: 40,
        capacityLimit: null,
        status: 'ACTIVE'
      }
    ]
  },
  {
    id: 'act-white-rhino',
    slug: 'white-rhino-walking-safari',
    name: 'White Rhino Walking Safari (Mosi-oa-Tunya, Zambia)',
    destination: 'LIVINGSTONE',
    category: 'SAFARI_WILDLIFE',
    shortDescription:
      'Track endangered white rhinos on foot accompanied by armed Zambian wildlife scouts in Mosi-oa-Tunya National Park.',
    fullDescription:
      'An exceptional, rare wildlife encounter in Southern Africa. Under the close escort of Zambia Wildlife Authority (DNPW) armed rangers who guard these precious rhinos 24/7, you head out on foot through the riverine thickets of Mosi-oa-Tunya National Park.\n\nExperience the thrill of standing just meters away from these prehistoric giants in their natural habitat while discovering animal tracks, medicinal flora, and smaller wildlife on the ground.',
    durationMinutes: 180,
    durationLabel: '3 Hours',
    grossPriceUSD: 110,
    nettPriceUSD: 85,
    parkFeeUSD: 15,
    departureTimes: ['06:30', '15:00'],
    pickupIncluded: true,
    fitnessLevel: 'Moderate',
    minAge: 12,
    includedItems: [
      'Return hotel transfers in Livingstone',
      'Accompanied by armed national parks wildlife scouts',
      'Guided walking safari tracking the rhino crash',
      'Bush refreshments and snacks'
    ],
    excludedItems: [
      'Zambia National Parks Conservation Fee ($15.00 USD)'
    ],
    restrictions: [
      'Neutral-toned safari clothing and closed walking shoes required',
      'Strict adherence to ranger safety commands'
    ],
    photos: [
      '/images/activities/zambezi-game-drive.jpg',
      '/images/activities/game-drive-lions.jpg'
    ],
    rating: 4.94,
    reviewCount: 138,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-hwange-day-trip',
    slug: 'hwange-national-park-full-day-safari',
    name: 'Hwange National Park Full-Day Safari Expedition',
    destination: 'VICTORIA_FALLS',
    category: 'SAFARI_WILDLIFE',
    shortDescription:
      'Journey to Zimbabwe\'s legendary safari jewel. Full-day safari in open 4x4 vehicles across Hwange\'s famous wildlife waterholes.',
    fullDescription:
      'Covering over 14,600 square kilometers, Hwange National Park is Zimbabwe\'s largest national park and home to vast elephant herds numbering over 45,000, as well as lion prides, cheetahs, leopards, and African wild dogs.\n\nDeparting early from Victoria Falls, travel in comfort to the park entrance before boarding specialized open 4x4 safari vehicles. Spend the day traversing key waterholes where elephants, giraffes, and plains game congregate, accompanied by a lavish bush lunch.',
    durationMinutes: 660,
    durationLabel: '11 Hours (Full Day)',
    grossPriceUSD: 220,
    nettPriceUSD: 175,
    parkFeeUSD: 20,
    departureTimes: ['06:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 6,
    includedItems: [
      'Return private road transfers from Victoria Falls',
      'Extensive open 4x4 game drive in Hwange National Park',
      'Professional safari guide with specialized tracking skills',
      'Full safari lodge lunch and drinks',
      'National park entry and conservation levies'
    ],
    excludedItems: [
      'Gratuities for driver and guide'
    ],
    restrictions: [],
    photos: [
      '/images/activities/game-drive-lions.jpg',
      '/images/activities/zambezi-game-drive.jpg',
      '/images/activities/chobe-game-drive.jpg'
    ],
    rating: 4.97,
    reviewCount: 189,
    status: 'ACTIVE',
    addOns: []
  },
  {
    id: 'act-traditional-village',
    slug: 'traditional-african-village-tour',
    name: 'Traditional African Village Cultural Tour (Mukuni & Ndebele)',
    destination: 'VICTORIA_FALLS',
    category: 'CULTURE_HERITAGE',
    shortDescription:
      'Authentic insight into rural African village life. Meet the local headman, tour traditional homesteads, and witness timeless crafts and customs.',
    fullDescription:
      'Experience genuine Southern African hospitality with a guided cultural tour to a real working traditional village. You will be welcomed into an authentic community where generations have lived according to ancient customs.\n\nWalk among thatched mud-brick homesteads, see traditional ironmongery and wood carving, learn how local beer is brewed, and observe how traditional court councils resolve village matters. A portion of every ticket directly supports village clinics and primary schools.',
    durationMinutes: 150,
    durationLabel: '2.5 Hours',
    grossPriceUSD: 35,
    nettPriceUSD: 25,
    parkFeeUSD: 0,
    departureTimes: ['09:00', '14:00'],
    pickupIncluded: true,
    fitnessLevel: 'Easy',
    minAge: 2,
    includedItems: [
      'Return hotel transfers',
      'Local resident cultural village guide',
      'Village entry fee and community fund donation'
    ],
    excludedItems: [
      'Purchases of handmade wooden curios or pottery'
    ],
    restrictions: [],
    photos: [
      '/images/activities/traditional-village.jpg',
      '/images/destinations/victoria-falls-panoramic.jpg'
    ],
    rating: 4.87,
    reviewCount: 145,
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
  // ==========================================
  // 1. VICTORIA FALLS (ZIMBABWE)
  // ==========================================
  {
    id: 'map-explorers-village',
    name: 'Shearwater Explorers Village',
    address: 'Lupinyu Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9288,
    longitude: 25.8364,
    isBookablePartner: true, // Gold pin (Bookable)
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
    rating: 4.7,
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
    amenities: ['Waterhole View', 'Vulture Culture Experience', 'Buffalo Bar Sunset Deck', 'Spa & Pool'],
    inquireOnlyNotice: 'Reference listing only. Contact our concierge for availability and safari packages.'
  },
  {
    id: 'map-palm-river-hotel',
    name: 'Palm River Hotel',
    address: '4397 Cresta Sprayview Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9042,
    longitude: 25.8168,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 460,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.9,
    amenities: ['Zambezi Riverfront', '5-Star Queenslander Architecture', 'Private Ra-Ikane River Cruises', 'Riverside Dining'],
    inquireOnlyNotice: 'Luxury Zambezi riverbank retreat. Inquire with our team for exclusive stay packages.'
  },
  {
    id: 'map-elephant-camp',
    name: 'The Elephant Camp',
    address: 'Victoria Falls Private Game Reserve, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9621,
    longitude: 25.8245,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 680,
    photo: '/images/activities/elephant-safari.jpg',
    rating: 4.95,
    amenities: ['Private Plunge Pools', 'All-Inclusive Luxury Tents', 'Gorge & Falls Spray Views', 'Elephant Interaction Access'],
    inquireOnlyNotice: 'Exclusive luxury tented lodge in private game reserve. Concierge inquiries only.'
  },
  {
    id: 'map-old-drift-lodge',
    name: 'Old Drift Lodge',
    address: 'Zambezi National Park, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.8931,
    longitude: 25.7942,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 750,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.93,
    amenities: ['Inside Zambezi National Park', 'Luxury Canvas Suites', 'Private River Decks & Plunge Pools', 'Game Drives & River Safaris'],
    inquireOnlyNotice: 'All-inclusive Zambezi National Park lodge. Contact our concierge for availability.'
  },
  {
    id: 'map-vic-falls-river-lodge',
    name: 'Victoria Falls River Lodge',
    address: 'Zambezi National Park riverfront, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.8814,
    longitude: 25.7681,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 820,
    photo: '/images/destinations/victoria-falls-panoramic.jpg',
    rating: 4.96,
    amenities: ['Island Treehouse Suites', 'Private Plunge Pools', 'Star-Gazing Rooftop Decks', 'Private Safari Boat'],
    inquireOnlyNotice: 'Ultra-luxury river and island lodge. Inquire for private island treehouse bookings.'
  },
  {
    id: 'map-stanley-livingstone',
    name: 'Stanley & Livingstone Boutique Hotel',
    address: 'Victoria Falls Private Game Reserve, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9712,
    longitude: 25.8315,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 520,
    photo: '/images/activities/game-drive-lions.jpg',
    rating: 4.88,
    amenities: ['Big 5 Game Reserve', '16 Luxury Suites', 'Fine Dining', 'Pool & Gardens', 'Black Rhino Tracking'],
    inquireOnlyNotice: 'Boutique hotel nestled in a private reserve. Contact concierge for custom bookings.'
  },
  {
    id: 'map-batonka-guest-lodge',
    name: 'Batonka Guest Lodge',
    address: '1 Vaz Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9341,
    longitude: 25.8242,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 195,
    photo: '/images/explorers-village/swimming-pool.jpg',
    rating: 4.82,
    amenities: ['Eco-Conscious', '27 Garden Rooms', 'Saltwater Pool', 'Homestyle Dining', 'Quiet Suburb'],
    inquireOnlyNotice: 'Charming boutique garden lodge. Contact concierge for best seasonal rates.'
  },
  {
    id: 'map-bayete-guest-lodge',
    name: 'Bayete Guest Lodge',
    address: '559 Thuso Cl, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9362,
    longitude: 25.8278,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 145,
    photo: '/images/explorers-village/village-grounds.jpg',
    rating: 4.75,
    amenities: ['Tropical Garden Setting', 'Teardrop Pool & Bar', 'Family Friendly', 'Complimentary Breakfast'],
    inquireOnlyNotice: 'Warm, hospitable family-run lodge. Inquire with concierge.'
  },
  {
    id: 'map-pioneers-lodge',
    name: 'Pioneers Lodge',
    address: 'Stand 547, Wood Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9385,
    longitude: 25.8219,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 160,
    photo: '/images/explorers-village/deluxe-chalet-exterior.jpg',
    rating: 4.8,
    amenities: ['50 Modern Garden Rooms', 'Two Pools', 'Solar Powered', 'Central Dining Pavilion'],
    inquireOnlyNotice: 'Classic colonial style retreat. Contact concierge for quotes.'
  },
  {
    id: 'map-cresta-sprayview',
    name: 'Cresta Sprayview Hotel',
    address: 'Cnr Livingstone Way & Reynard Rd, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9312,
    longitude: 25.8318,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 130,
    photo: '/images/explorers-village/swimming-pool.jpg',
    rating: 4.6,
    amenities: ['Large Swimming Pool', 'Al Fresco Restaurant', 'Conference Facilities', '1.4km to Falls'],
    inquireOnlyNotice: 'Comfortable full-service hotel. Contact concierge for group rates.'
  },
  {
    id: 'map-rainbow-hotel',
    name: 'Victoria Falls Rainbow Hotel',
    address: 'Stand 278, Parkway Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9338,
    longitude: 25.8335,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 120,
    photo: '/images/explorers-village/deluxe-chalet-exterior.jpg',
    rating: 4.5,
    amenities: ['Swim-Up Pool Bar', 'Panoramic Rooftop Terrace', 'Moorish Design', 'Air Conditioning'],
    inquireOnlyNotice: 'Distinctive architecture and value. Inquire for availability.'
  },
  {
    id: 'map-shoestrings-backpackers',
    name: 'Shoestrings Backpackers Lodge',
    address: '12 West Dr, Victoria Falls, Zimbabwe',
    destination: 'VICTORIA_FALLS',
    latitude: -17.9304,
    longitude: 25.8351,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 25,
    photo: '/images/explorers-village/camping-grounds.jpg',
    rating: 4.4,
    amenities: ['Dorms & Private Rooms', 'Campground', 'Lively Bar & Cafe', 'Communal Kitchen', 'Tour Desk'],
    inquireOnlyNotice: 'Budget adventure hub. Inquire directly for backpacker rates.'
  },

  // ==========================================
  // 2. LIVINGSTONE (ZAMBIA)
  // ==========================================
  {
    id: 'map-royal-livingstone',
    name: 'The Royal Livingstone by Anantara',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9125,
    longitude: 25.8583,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 620,
    photo: '/images/destinations/livingstone-devilspool.jpg',
    rating: 4.9,
    amenities: ['Unlimited Free Falls Access (Zambia)', 'Zambezi River Sun Deck', 'Zebras on Lawns', 'Butler Service', 'Spa'],
    inquireOnlyNotice: 'Premier luxury partner. Inquire with our concierge for exclusive negotiated rates.'
  },
  {
    id: 'map-avani-vic-falls',
    name: 'Avani Victoria Falls Resort',
    address: 'Mosi-oa-Tunya National Park, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.9156,
    longitude: 25.8598,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 240,
    photo: '/images/destinations/victoria-falls-cataract.jpg',
    rating: 4.6,
    amenities: ['Direct Access to Falls Cataract', 'Large Lagoon Pool', 'Boma Dinners', 'Family Friendly'],
    inquireOnlyNotice: 'Ideal family resort with direct Falls access. Inquire with our concierge.'
  },
  {
    id: 'map-david-livingstone',
    name: 'David Livingstone Safari Lodge & Spa',
    address: 'Riverside Dr, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8845,
    longitude: 25.8312,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 310,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.75,
    amenities: ['Zambezi Riverfront', 'Private Lady Livingstone Cruise Boat', 'Infinity Pool', 'Camelot Health Spa'],
    inquireOnlyNotice: '5-star riverside luxury on the Zambian banks. Inquire for packages.'
  },
  {
    id: 'map-tongabezi-lodge',
    name: 'Tongabezi Lodge',
    address: 'Upper Zambezi River, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.7842,
    longitude: 25.7115,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 850,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.98,
    amenities: ['Exclusive River Houses', 'Private Valet Butler', 'Sandpith Island Dining', 'All-Inclusive Luxury'],
    inquireOnlyNotice: 'World-renowned romantic hideaway on the Upper Zambezi. Concierge inquiry required.'
  },
  {
    id: 'map-vic-falls-waterfront',
    name: 'Victoria Falls Waterfront',
    address: 'Sichango Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8921,
    longitude: 25.8346,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 95,
    photo: '/images/activities/riversong-sunset-cruise.jpg',
    rating: 4.55,
    amenities: ['Adventure Hub', 'Deck Bar Overlooking Zambezi', 'Two Pools', 'Chalets & Tents', 'Activity Booking Desk'],
    inquireOnlyNotice: 'Popular active riverside lodge in Livingstone. Contact concierge.'
  },
  {
    id: 'map-waterberry-lodge',
    name: 'Waterberry Zambezi Lodge',
    address: 'Sunberry Farm, Upper Zambezi, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.7512,
    longitude: 25.6841,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 280,
    photo: '/images/destinations/chobe-river-safari.jpg',
    rating: 4.85,
    amenities: ['Secluded River Cottages', 'Birding Expeditions', 'Island Picnics', 'Floating Pontoon Dinners'],
    inquireOnlyNotice: 'Peaceful boutique cottages on the upper riverbank. Inquire for availability.'
  },
  {
    id: 'map-jollyboys-backpackers',
    name: 'Jollyboys Backpackers & Camp',
    address: 'Kajokoto Rd, Livingstone, Zambia',
    destination: 'LIVINGSTONE',
    latitude: -17.8542,
    longitude: 25.8576,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 20,
    photo: '/images/explorers-village/camping-grounds.jpg',
    rating: 4.65,
    amenities: ['Swimming Pool', 'Lively Bar & Restaurant', 'Free Shuttle to Falls', 'Dorms & En-Suite Rooms'],
    inquireOnlyNotice: 'Award-winning backpackers base in Livingstone. Inquire for group bookings.'
  },

  // ==========================================
  // 3. CHOBE / KASANE (BOTSWANA)
  // ==========================================
  {
    id: 'map-chobe-safari-lodge',
    name: 'Chobe Safari Lodge',
    address: 'Plot 280, President Ave, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8041,
    longitude: 25.1432,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 310,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.7,
    amenities: ['Direct Chobe Riverfront', 'Safari Boat Jetty', 'Two Pools', 'Buffet Restaurant', 'Bordering Chobe NP'],
    inquireOnlyNotice: 'Iconic gateway lodge into Chobe National Park. Inquire with our safari specialists.'
  },
  {
    id: 'map-chobe-game-lodge',
    name: 'Chobe Game Lodge',
    address: 'Inside Chobe National Park, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8347,
    longitude: 25.0118,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 780,
    photo: '/images/destinations/chobe-river-safari.jpg',
    rating: 4.9,
    amenities: ['Only Lodge Inside Chobe NP', 'All-Female Guiding Team (Chobe Angels)', 'Electric Safari Boats', 'All-Inclusive'],
    inquireOnlyNotice: 'Premier 5-star Botswana eco-lodge. Inquire with our safari specialists for custom packages.'
  },
  {
    id: 'map-elephant-valley-lodge',
    name: 'Elephant Valley Lodge',
    address: 'Lesoma Valley, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8715,
    longitude: 25.2154,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 390,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.8,
    amenities: ['Valley Waterhole View', 'Luxury Safari Tents', 'Daily Chobe Boat Cruises', '4x4 Game Drives'],
    inquireOnlyNotice: 'Charming tented lodge on an active wildlife corridor. Inquire for packages.'
  },
  {
    id: 'map-muchenje-safari-lodge',
    name: 'Muchenje Safari Lodge',
    address: 'Western Chobe, Chobe National Park, Botswana',
    destination: 'CHOBE',
    latitude: -17.9152,
    longitude: 24.7812,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 490,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.88,
    amenities: ['Escarpment Panoramic Views', 'Quiet Western Chobe NP Access', 'Walking Safaris', 'All-Inclusive'],
    inquireOnlyNotice: 'Spectacular lodge on the quieter western side of Chobe. Contact concierge.'
  },
  {
    id: 'map-ngoma-safari-lodge',
    name: 'Ngoma Safari Lodge',
    address: 'Chobe Forest Reserve, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.9284,
    longitude: 24.7145,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 690,
    photo: '/images/destinations/chobe-river-safari.jpg',
    rating: 4.94,
    amenities: ['180° Chobe Floodplain Panorama', 'Private Plunge Pools', 'Night Game Drives', 'Exclusive Riverfront Access'],
    inquireOnlyNotice: 'Elevated luxury suites overlooking the Chobe River. Concierge inquiries only.'
  },
  {
    id: 'map-camp-kuzuma',
    name: 'Camp Kuzuma',
    address: 'Kazuma Forest Reserve, Chobe Region, Botswana',
    destination: 'CHOBE',
    latitude: -18.2415,
    longitude: 25.3512,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 420,
    photo: '/images/activities/chobe-game-drive.jpg',
    rating: 4.82,
    amenities: ['Wilderness Tented Suites', 'Busy Waterhole View', 'Open-Air Spa', 'Night Game Drives'],
    inquireOnlyNotice: 'Secluded eco-luxury safari camp in Kazuma Forest. Inquire with our team.'
  },
  {
    id: 'map-bakwena-lodge',
    name: 'Bakwena Lodge',
    address: 'Plot 281, Kazungula, Botswana',
    destination: 'CHOBE',
    latitude: -17.7915,
    longitude: 25.1842,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 360,
    photo: '/images/activities/chobe-elephants-river.jpg',
    rating: 4.86,
    amenities: ['River & Treetop Chalets', 'Natural Filtered Swimming Pool', 'Eco-Luxury Architecture', 'Guided River Safaris'],
    inquireOnlyNotice: 'Intimate eco-luxury retreat on the Chobe River. Contact concierge.'
  },
  {
    id: 'map-zambezi-queen',
    name: 'Zambezi Queen Luxury River Safari',
    address: 'Chobe River, Kasane, Botswana',
    destination: 'CHOBE',
    latitude: -17.8012,
    longitude: 25.1518,
    isBookablePartner: false,
    locationVerifiedByStaff: true,
    startingPriceUSD: 920,
    photo: '/images/activities/zambezi-luxury-deck.jpg',
    rating: 4.97,
    amenities: ['Floating 5-Star Boutique Hotel', 'Air-Conditioned Balcony Suites', 'Plunge Pool on Top Deck', 'Tiger Fishing & Tender Boats'],
    inquireOnlyNotice: 'Ultra-luxury floating hotel on the Chobe River. Inquire for 2-night and 3-night cruise itineraries.'
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
