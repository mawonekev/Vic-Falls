import { Activity, Partner, MappedProperty, AccommodationRequest, PartnerInvoice } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    "id": "act-heli-12min",
    "slug": "helicopter-flight-of-angels",
    "name": "Flight of Angels — 12-13 Min Helicopter Scenic Flight",
    "destination": "VICTORIA_FALLS",
    "category": "AIR",
    "shortDescription": "The iconic aerial journey over Victoria Falls and Batoka Gorge. Experience the breathtaking vistas described by David Livingstone.",
    "fullDescription": "To put the Victoria Falls into true perspective, they must be seen from the air. The \"Flight of Angels\" is the most popular scenic helicopter flight in Southern Africa. You will lift off from our dedicated helipad just 3km from the Falls and embark on a mesmerizing flight over the full 1,700-metre width of the cataract, the tranquil upper Zambezi River, and the serpentine volcanic chasms of the Batoka Gorge.\\n\\nEvery passenger is guaranteed a direct window seat with unobstructed bubble-glass viewports, allowing you to capture world-class photography and witness rainbows dancing in the perpetual spray mist.",
    "durationMinutes": 13,
    "durationLabel": "12–13 min",
    "grossPriceUSD": 173,
    "nettPriceUSD": 138,
    "parkFeeUSD": 38,
    "departureTimes": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 2,
    "includedItems": [
      "Return transfers from Victoria Falls town hotels",
      "Guaranteed bubble-window seat",
      "Pre-flight safety briefing & pilot headset communication",
      "Souvenir flight certificate"
    ],
    "excludedItems": [
      "Fuel surcharge ($20) & Aviation park fee ($18) payable upon check-in",
      "Souvenir video USB package"
    ],
    "restrictions": [
      "Max passenger weight 120kg per individual seat (comfort seat required above)",
      "Infants under 2 fly free on lap"
    ],
    "aircraftSpecs": {
      "model": "Bell 206 LongRanger / Airbus H120 Colibri",
      "capacity": "4 to 6 passengers per flight",
      "features": [
        "Air-conditioned cabin",
        "High-visibility bubble windows",
        "Bose noise-canceling headsets",
        "Turbine-powered twin reliability"
      ]
    },
    "photos": [
      "/images/activities/heli-flight-of-angels.jpg",
      "/images/helicopter/hero-angels.jpg",
      "/images/helicopter/cockpit-view.jpg",
      "/images/helicopter/falls-rainbow.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 428,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-heli-vip-seat",
        "activityId": "act-heli-12min",
        "name": "VIP Co-Pilot Front Seat Upgrade",
        "description": "Front cockpit seating alongside captain for 180° unobstructed view",
        "grossPriceUSD": 35,
        "nettPriceUSD": 25,
        "capacityLimit": 1,
        "status": "ACTIVE"
      },
      {
        "id": "addon-heli-4k-video",
        "activityId": "act-heli-12min",
        "name": "HD 4K Cockpit & Tail Video (USB)",
        "description": "Professionally edited video from external helicopter cameras",
        "grossPriceUSD": 40,
        "nettPriceUSD": 20,
        "capacityLimit": null,
        "status": "ACTIVE"
      },
      {
        "id": "addon-heli-park-fee",
        "activityId": "act-heli-12min",
        "name": "Pre-Paid Aviation & Park Fee",
        "description": "Covers the mandatory $20 fuel surcharge and $18 aviation park levy",
        "grossPriceUSD": 38,
        "nettPriceUSD": 38,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-heli-gorge-22min",
    "slug": "batoka-gorge-helicopter-flight-22min",
    "name": "Gorge Flight — 22 Min Deep Batoka Canyon Helicopter Run",
    "destination": "VICTORIA_FALLS",
    "category": "AIR",
    "shortDescription": "Thrilling aerial run swooping deep between the basalt cliff walls of the Batoka Gorge combined with an orbit over the Falls.",
    "fullDescription": "An exhilarating scenic flight designed for adventurers who want to experience the raw geology of the Zambezi rift valley. In addition to a complete figure-eight orbit over the crest of Victoria Falls, your pilot banks steeply and descends low into the winding basalt canyons of the Batoka Gorge, skimming above the roaring whitewater rapids before rising back up to reveal panoramic vistas across two countries.",
    "durationMinutes": 22,
    "durationLabel": "22 min",
    "grossPriceUSD": 271,
    "nettPriceUSD": 215,
    "parkFeeUSD": 51,
    "departureTimes": [
      "08:30",
      "10:30",
      "14:30",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 2,
    "includedItems": [
      "Complimentary hotel return transfers",
      "Deep canyon descent flight",
      "Bubble-window view guarantee",
      "Pilot commentary"
    ],
    "excludedItems": [
      "Fuel surcharge ($33) and Aviation parks fee ($18)",
      "Souvenir digital footage"
    ],
    "restrictions": [
      "Max weight limit 120 kg per seat",
      "Passport or ID required for check-in"
    ],
    "photos": [
      "/images/activities/heli-gorge-flight.jpg",
      "/images/helicopter/gorge-flight.jpg",
      "/images/activities/heli-cockpit.jpg"
    ],
    "rating": 4.94,
    "reviewCount": 164,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-gorge-front-seat",
        "activityId": "act-heli-gorge-22min",
        "name": "Front Co-Pilot Seat",
        "description": "Direct co-pilot front window seat",
        "grossPriceUSD": 45,
        "nettPriceUSD": 30,
        "capacityLimit": 1,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-heli-25min",
    "slug": "zambezi-spectacular-25min-helicopter",
    "name": "Zambezi Spectacular — 25 Min Extended Aerial Safari Flight",
    "destination": "VICTORIA_FALLS",
    "category": "AIR",
    "shortDescription": "The ultimate Southern African aerial expedition: Victoria Falls, the deep gorges, and low-level game viewing over Zambezi National Park.",
    "fullDescription": "The comprehensive aerial tour of the region. After completing multiple scenic orbits over both Zimbabwean and Zambian sides of Victoria Falls, your helicopter sweeps downstream through the breathtaking Batoka Gorge before banking upstream over the untouched riverine islands and savannah of Zambezi National Park.\\n\\nFly low over channels where hippo pods bask, elephants cross sandbanks, and giraffe and buffalo herds graze along the floodplains.",
    "durationMinutes": 25,
    "durationLabel": "25 min",
    "grossPriceUSD": 328,
    "nettPriceUSD": 260,
    "parkFeeUSD": 51,
    "departureTimes": [
      "08:30",
      "10:30",
      "14:30",
      "15:45"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 2,
    "includedItems": [
      "Complimentary hotel pickup and return",
      "Comprehensive flight: Falls, Gorges & National Park",
      "Noise-cancelling headsets",
      "Champagne toast at helipad lounge"
    ],
    "excludedItems": [
      "Fuel surcharge ($33) and park levy ($18)"
    ],
    "restrictions": [
      "Max weight limit 120 kg per seat"
    ],
    "aircraftSpecs": {
      "model": "Airbus H120 / Bell 206L LongRanger",
      "capacity": "4 to 6 passengers",
      "features": [
        "Air-conditioned",
        "Panoramic bubble windows",
        "Two-way pilot intercom"
      ]
    },
    "photos": [
      "/images/activities/heli-zambezi-spectacular.jpg",
      "/images/helicopter/spectacular-aerial.jpg",
      "/images/helicopter/falls-rainbow.jpg"
    ],
    "rating": 4.98,
    "reviewCount": 312,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-spec-vip-seat",
        "activityId": "act-heli-25min",
        "name": "VIP Co-Pilot Front Seat Upgrade",
        "description": "Co-pilot seat with 180° uninterrupted view",
        "grossPriceUSD": 50,
        "nettPriceUSD": 35,
        "capacityLimit": 1,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-micro-15min",
    "slug": "livingstone-microlight-flight",
    "name": "Microlight Flight of Angels — 15 Min Open Cockpit (Livingstone)",
    "destination": "LIVINGSTONE",
    "category": "AIR",
    "shortDescription": "Feel the wind on your face in an open-cockpit ultralight aircraft soaring over Victoria Falls with wing-mounted high-res cameras.",
    "fullDescription": "An exhilarating and intimate flight over Victoria Falls. Departing from the Maramba Aerodrome in Livingstone, you will experience the true thrill of open-air microlight aviation. With nothing between you and the African sky, you will swoop low over the mist-shrouded gorge and the emerald waters of the Zambezi River. The pilot maneuvers the wing-mounted digital camera to capture stunning action shots of you high above the world’s largest curtain of falling water.",
    "durationMinutes": 15,
    "durationLabel": "15 min",
    "grossPriceUSD": 190,
    "nettPriceUSD": 150,
    "parkFeeUSD": 6,
    "departureTimes": [
      "07:00",
      "08:00",
      "09:00",
      "15:30",
      "16:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 8,
    "includedItems": [
      "Hotel transfers from Livingstone lodges",
      "Open-cockpit microlight flight with certified aviation pilot",
      "Pre-flight flight briefing"
    ],
    "excludedItems": [
      "Civil Aviation Authority Levy ($6)",
      "Wing-mounted digital photo/video memory card"
    ],
    "restrictions": [
      "Strict weight limit 100 kg (220 lbs)",
      "No hand-held cameras or phones allowed in cockpit for safety reasons"
    ],
    "photos": [
      "/images/activities/heli-flight-of-angels.jpg",
      "/images/helicopter/hero-angels.jpg"
    ],
    "rating": 4.95,
    "reviewCount": 189,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-micro-photos",
        "activityId": "act-micro-15min",
        "name": "Wing-Mounted HD Photo & Video Pack",
        "description": "High-res photos taken from the wing strut camera",
        "grossPriceUSD": 35,
        "nettPriceUSD": 20,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-micro-30min",
    "slug": "livingstone-microlight-flight-30min",
    "name": "Microlight Gorge & Safari Flight — 30 Min Extended (Livingstone)",
    "destination": "LIVINGSTONE",
    "category": "AIR",
    "shortDescription": "Extended open-cockpit microlight flight covering Victoria Falls, the Batoka Gorge, islands, and Mosi-oa-Tunya National Park.",
    "fullDescription": "The premier open-air flying adventure. In this extended 30-minute microlight flight, your pilot circles Victoria Falls before tracking down through the Batoka Gorge, banking over Kalai and Livingstone islands, and sweeping low across Mosi-oa-Tunya National Park to spot elephants, giraffes, zebras, and hippos from the air.",
    "durationMinutes": 30,
    "durationLabel": "30 min",
    "grossPriceUSD": 380,
    "nettPriceUSD": 305,
    "parkFeeUSD": 6,
    "departureTimes": [
      "07:00",
      "08:00",
      "15:30",
      "16:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 8,
    "includedItems": [
      "Livingstone hotel return transfers",
      "30-minute open-cockpit scenic flight",
      "Wildlife aerial spotting over national park"
    ],
    "excludedItems": [
      "Civil Aviation Authority Levy ($6)",
      "Wing camera photo/video bundle"
    ],
    "restrictions": [
      "Max weight limit 100 kg",
      "No loose items in cockpit"
    ],
    "photos": [
      "/images/activities/heli-gorge-flight.jpg",
      "/images/activities/heli-cockpit.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 96,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-raft-low-water",
    "slug": "batoka-gorge-white-water-rafting",
    "name": "Full Day White Water Rafting — Low Water (Rapids #1 to #19)",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "The undisputed premier Grade 5 white-water rafting trip on earth. Battle legendary rapids including \"The Overland Truck-Eater\" and \"Oblivion\".",
    "fullDescription": "Widely acknowledged as the greatest single-day whitewater rafting journey on the planet. During the low-water season (typically August to December), the Zambezi unleashes massive Grade 4 and 5 waves through the sheer black basalt walls of the Batoka Gorge. You will conquer legendary rapids including The Boiling Pot, Stairway to Heaven, The Gulliver's Travels, and the infamous Oblivion.\\n\\nLed by world-champion international river guides, this full-day expedition includes a scenic walk down the gorge at Rapid #1, world-class safety kayakers, a gourmet riverside lunch, and ice-cold beers at the gorge rim celebration.",
    "durationMinutes": 420,
    "durationLabel": "Full Day (7 hrs)",
    "grossPriceUSD": 173,
    "nettPriceUSD": 135,
    "parkFeeUSD": 12,
    "departureTimes": [
      "07:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "High",
    "minAge": 15,
    "includedItems": [
      "Complimentary hotel pickup and return",
      "Full safety gear: CE-approved buoyancy aid & helmet",
      "Riverside barbecue lunch & chilled refreshments",
      "Cold beers and ciders at top of the gorge"
    ],
    "excludedItems": [
      "National Park River Usage Fee ($12.00 USD)",
      "Professional river videographer & photographer pack"
    ],
    "restrictions": [
      "Good physical fitness required to hike into and out of the gorge (750 vertical feet)",
      "Not suitable for pregnant travelers or those with serious back/neck ailments"
    ],
    "photos": [
      "/images/activities/rafting-low-water.jpg",
      "/images/activities/rapid-action.jpg",
      "/images/activities/zambezi-rafting.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 512,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-raft-video",
        "activityId": "act-raft-low-water",
        "name": "GoPro Helmet & Kayak Photo/Video Pack",
        "description": "Full raw & edited video package captured by dedicated safety kayaker",
        "grossPriceUSD": 45,
        "nettPriceUSD": 25,
        "capacityLimit": null,
        "status": "ACTIVE"
      },
      {
        "id": "addon-raft-cablecar",
        "activityId": "act-raft-low-water",
        "name": "Gorge Lift / Cable Car Ticket",
        "description": "Skip the 750ft hike out of the gorge by riding the mechanical cable lift",
        "grossPriceUSD": 15,
        "nettPriceUSD": 10,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-raft-high-water",
    "slug": "batoka-gorge-high-water-rafting",
    "name": "High Water White Water Rafting — Rapids #11 to #23",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Giant roller-coaster waves during high water conditions. Surf colossal river hydraulics through the lower Batoka Gorge.",
    "fullDescription": "Operating when the river levels surge (typically January to March and June to July). With higher water volumes, the first 10 rapids are washed out with extreme boiling currents, so the expedition launches downstream at Rapid #11 (\"The Overland Truck-Eater\") running through to Rapid #23. Experience colossal, roller-coaster standing waves and massive wave trains in warm Zambezi water under pristine sunny skies.",
    "durationMinutes": 360,
    "durationLabel": "6 hrs",
    "grossPriceUSD": 161,
    "nettPriceUSD": 125,
    "parkFeeUSD": 12,
    "departureTimes": [
      "07:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 15,
    "includedItems": [
      "Hotel transfers",
      "Professional river guide and safety kayakers",
      "Life jackets & helmets",
      "Substantial buffet lunch and cold drinks"
    ],
    "excludedItems": [
      "National Park River fee ($12)"
    ],
    "restrictions": [
      "Must be able to swim and hike out of gorge",
      "Min age 15"
    ],
    "photos": [
      "/images/activities/rafting-high-water.jpg",
      "/images/activities/rapid-action.jpg"
    ],
    "rating": 4.91,
    "reviewCount": 142,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-raft-multi-day",
    "slug": "multi-day-zambezi-rafting-expedition",
    "name": "Multi-Day Zambezi River Rafting Expedition (2 Days / 1 Night)",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "The ultimate river wilderness safari. Raft the entire Batoka Gorge and camp on pristine white sand beaches under the stars.",
    "fullDescription": "Leave civilization completely behind for an epic two-day expedition down the mighty Zambezi. Run all 23 world-famous rapids on Day 1, then pull your raft onto a secluded white sand beach deep within the Batoka Gorge. As night falls, enjoy a campfire barbecue, ice-cold drinks, and sleep on cots under the southern hemisphere night sky. On Day 2, float through serene tranquil canyons where black eagles nest, tackle lower rapids, and exit downstream.",
    "durationMinutes": 1800,
    "durationLabel": "2 Days / 1 Night",
    "grossPriceUSD": 462,
    "nettPriceUSD": 370,
    "parkFeeUSD": 24,
    "departureTimes": [
      "07:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "High",
    "minAge": 16,
    "includedItems": [
      "All river equipment, dry bags & safety gear",
      "Expedition camping gear (tent, cot, sleeping bag)",
      "All meals freshly prepared by river chef",
      "Cold beer, wine, and soft drinks at camp"
    ],
    "excludedItems": [
      "Parks fees ($24)",
      "Personal tips"
    ],
    "restrictions": [
      "High fitness level required",
      "Passport required"
    ],
    "photos": [
      "/images/activities/rafting-multi-day.jpg",
      "/images/activities/rafting-low-water.jpg",
      "/images/activities/zambezi-rafting.jpg"
    ],
    "rating": 4.99,
    "reviewCount": 68,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-upper-canoe",
    "slug": "upper-zambezi-canoeing-safari",
    "name": "Upper Zambezi Guided Canoe Safari (Half Day / Full Day)",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Paddle Canadian-style two-person canoes through tranquil channels, islands, and gentle rapids upstream of the Falls.",
    "fullDescription": "Drift silently down the peaceful Upper Zambezi River flanked by Zambezi National Park on one bank and Mosi-oa-Tunya National Park on the other. Guided by experienced canoe river guides, you will paddle inflatable 2-person canoes through narrow channels, gliding past basking hippos, drinking elephants, water monitor lizards, and over 400 species of birdlife before arriving at a scenic island for refreshments.",
    "durationMinutes": 240,
    "durationLabel": "4 hrs",
    "grossPriceUSD": 170,
    "nettPriceUSD": 135,
    "parkFeeUSD": 18,
    "departureTimes": [
      "08:00",
      "13:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Return hotel transfers",
      "Two-person Canadian canoes and paddles",
      "Life vests and dry bags",
      "Riverside snacks and drinks"
    ],
    "excludedItems": [
      "National Parks fee ($18)"
    ],
    "restrictions": [
      "Basic swimming ability required",
      "Min age 12"
    ],
    "photos": [
      "/images/activities/zambezi-sunrise-cruise.jpg",
      "/images/activities/morning-birding-cruise.jpg"
    ],
    "rating": 4.88,
    "reviewCount": 84,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-bungee-solo",
    "slug": "victoria-falls-bridge-bungee-jump",
    "name": "Victoria Falls Bridge Bungee Jump — 111m Solo Jump",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "111 metres of pure freefall off the historic Victoria Falls Bridge. Consistently voted the world's most spectacular bungee jump.",
    "fullDescription": "Set against the breathtaking backdrop of Victoria Falls, with the thundering waters of the Zambezi rushing below, the Victoria Falls Bridge Bungee is an international bucket-list thrill. Step up to the bridge platform 111 meters above the river, hear the countdown \"5, 4, 3, 2, 1, BUNGEE!\" and plunge into four seconds of heart-stopping freefall.\\n\\nOperated with a flawless 30-year safety record and strict international standards.",
    "durationMinutes": 60,
    "durationLabel": "1 hr",
    "grossPriceUSD": 194,
    "nettPriceUSD": 155,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Bridge transport and border gate pass",
      "Comprehensive safety briefing and ankle/body harness fitting",
      "Certificate of achievement"
    ],
    "excludedItems": [
      "High-definition photo and video package"
    ],
    "restrictions": [
      "Min weight 40kg, max weight 120kg",
      "Passport required to access bridge border zone",
      "Not permitted for pregnant guests or cardiac conditions"
    ],
    "photos": [
      "/images/activities/bridge-bungee.jpg",
      "/images/activities/gorge-bungee-jump.jpg"
    ],
    "rating": 4.95,
    "reviewCount": 387,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-bungee-photos",
        "activityId": "act-bungee-solo",
        "name": "4K Multi-Angle Photo & Video USB",
        "description": "Professional multi-camera video capturing freefall from bridge and ankle",
        "grossPriceUSD": 35,
        "nettPriceUSD": 20,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-swing-solo",
    "slug": "victoria-falls-bridge-swing",
    "name": "Victoria Falls Bridge Swing — 70m Solo Pendulum Freefall",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Step into the abyss for an upright 70-metre freefall before sweeping into a giant 95-metre pendulum swing across the gorge.",
    "fullDescription": "Step off the edge of the Victoria Falls Bridge and enjoy a heart-stopping 70-meter vertical freefall before the heavy-duty swing ropes catch you into an enormous 95-meter pendulum arc sweeping over the Batoka Gorge. Enjoy breathtaking views of the river and gorge below as you swing back and forth.",
    "durationMinutes": 60,
    "durationLabel": "1 hr",
    "grossPriceUSD": 137,
    "nettPriceUSD": 108,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:00",
      "10:30",
      "12:00",
      "14:30",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Full body harness and safety equipment",
      "Bridge transfer and border clearance",
      "Swing certificate"
    ],
    "excludedItems": [
      "Action photography and video pack"
    ],
    "restrictions": [
      "Weight limit 40kg to 140kg",
      "Passport required for bridge access"
    ],
    "photos": [
      "/images/activities/bridge-swing.jpg",
      "/images/activities/bridge-swing-action.jpg"
    ],
    "rating": 4.94,
    "reviewCount": 224,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-swing-tandem",
    "slug": "victoria-falls-bridge-swing-tandem",
    "name": "Victoria Falls Bridge Swing — Tandem Leap for Two",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Share the adrenaline rush of a lifetime side-by-side with a partner, friend, or spouse leaping together into the Batoka Gorge.",
    "fullDescription": "Twice the courage, twice the thrill! The tandem bridge swing lets two people leap simultaneously from the Victoria Falls Bridge platform strapped securely together in full-body harnesses. Plunge 70 meters in tandem freefall before flying through the canyon together in a giant pendulum swing.",
    "durationMinutes": 60,
    "durationLabel": "1 hr",
    "grossPriceUSD": 201,
    "nettPriceUSD": 160,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:30",
      "11:00",
      "12:30",
      "15:00",
      "16:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Tandem harness setup and dual rigging",
      "Transfers and border bridge clearance",
      "Two certificates of achievement"
    ],
    "excludedItems": [
      "Souvenir digital photos and video"
    ],
    "restrictions": [
      "Combined weight between 80kg and 180kg",
      "Passports required"
    ],
    "photos": [
      "/images/activities/bridge-swing-tandem.jpg",
      "/images/activities/bridge-swing.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 118,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-slide-solo",
    "slug": "victoria-falls-bridge-slide",
    "name": "Victoria Falls Bridge Slide (Zipline) — 300m Solo Cross-Border Zip",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Glide 300 metres across the Batoka Gorge from Zambia to Zimbabwe on the only international cross-border zipline in the world.",
    "fullDescription": "Glide smoothly across the gorge on the only zipline in the world that crosses between two sovereign nations. Starting on the Zambian cliff edge, you glide 300 meters down a high-tensile steel cable at speeds up to 60 km/h, suspended 120 meters above the Zambezi River before gentle braking at the Zimbabwean bridge foot. Ideal for all ages from 6 years upward.",
    "durationMinutes": 45,
    "durationLabel": "45 min",
    "grossPriceUSD": 58,
    "nettPriceUSD": 45,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Harness & safety equipment",
      "Bridge transfer",
      "Zipline glide"
    ],
    "excludedItems": [
      "Digital photos"
    ],
    "restrictions": [
      "Weight limit 40kg to 140kg",
      "Passport required"
    ],
    "photos": [
      "/images/activities/bridge-slide.jpg",
      "/images/activities/bridge-slide-solo.jpg"
    ],
    "rating": 4.91,
    "reviewCount": 176,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-slide-tandem",
    "slug": "victoria-falls-bridge-slide-tandem",
    "name": "Victoria Falls Bridge Slide (Zipline) — Tandem Family Zipline",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Zipline across the international gorge together with a child or loved one. The ultimate gentle aerial thrill for families.",
    "fullDescription": "Ride the 300-meter international cross-border zipline side-by-side with your child, partner, or friend. Tandem riders are securely connected together by an instructor and glide smoothly 120 meters above the Zambezi River with panoramic views of the Victoria Falls spray plume.",
    "durationMinutes": 45,
    "durationLabel": "45 min",
    "grossPriceUSD": 82,
    "nettPriceUSD": 64,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:30",
      "10:30",
      "11:30",
      "14:30",
      "15:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Dual tandem rigging and harnesses",
      "Bridge transfers",
      "Assisted take-off and recovery"
    ],
    "excludedItems": [
      "Photo pack"
    ],
    "restrictions": [
      "Combined weight limit 180kg",
      "Passports required"
    ],
    "photos": [
      "/images/activities/bridge-slide-tandem.jpg",
      "/images/activities/bridge-slide.jpg"
    ],
    "rating": 4.93,
    "reviewCount": 89,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-flying-fox",
    "slug": "batoka-gorge-flying-fox",
    "name": "Batoka Gorge Flying Fox — Horizontal Cable Glide",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Fly face-down like Superman 120 metres above the canyon floor on a high-speed horizontal cable gliding across the Batoka Gorge.",
    "fullDescription": "Attached horizontally in a chest-and-waist body harness, you launch off the lip of the gorge and soar face-down into empty air. Suspended 120 meters above the churning river, you enjoy bird's-eye views directly into the volcanic abyss before being gently winched back to the platform.",
    "durationMinutes": 45,
    "durationLabel": "45 min",
    "grossPriceUSD": 69,
    "nettPriceUSD": 54,
    "parkFeeUSD": 6,
    "departureTimes": [
      "09:00",
      "11:00",
      "14:00",
      "15:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 8,
    "includedItems": [
      "Full safety briefing and flying harness",
      "Return hotel transfers",
      "Gorge lookout platform access"
    ],
    "excludedItems": [
      "Park fee ($6)"
    ],
    "restrictions": [
      "Weight limit 40kg to 130kg"
    ],
    "photos": [
      "/images/activities/bridge-slide-solo.jpg",
      "/images/activities/bridge-swing-action.jpg"
    ],
    "rating": 4.89,
    "reviewCount": 94,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-canopy-tour",
    "slug": "victoria-falls-canopy-tour",
    "name": "Batoka Gorge Canopy Tour — 9 Ziplines & Suspended Walkways",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "9 exhilarating ziplines and a suspended rope bridge crisscrossing the lush Batoka Gorge rainforest canopy with epic river views.",
    "fullDescription": "The Victoria Falls Canopy Tour offers a unique perspective on the Batoka Gorge riverine ecosystem. Consisting of 9 varied ziplines ranging from 40 to 85 meters, two suspended walkways, and scenic cliff platforms, you will glide through the hardwood forest canopy while spotting purple-crested turacos and peregrine falcons.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 81,
    "nettPriceUSD": 62,
    "parkFeeUSD": 6,
    "departureTimes": [
      "08:30",
      "10:30",
      "13:30",
      "15:15"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 6,
    "includedItems": [
      "All zipline equipment, helmets & gloves",
      "Two certified safety guides per group",
      "Hotel transfers and cold water"
    ],
    "excludedItems": [
      "Parks fee ($6)"
    ],
    "restrictions": [
      "Max weight 120kg",
      "Comfortable closed walking shoes required"
    ],
    "photos": [
      "/images/activities/bridge-slide.jpg",
      "/images/activities/bridge-tour-catwalk.jpg"
    ],
    "rating": 4.92,
    "reviewCount": 205,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-big-air",
    "slug": "the-big-air-experience",
    "name": "The Big Air Experience — Bungee + Swing + Slide Combo",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Shearwater's legendary triple thrill: tackle the 111m Bungee, 70m Bridge Swing, and 300m Bridge Slide in one unforgettable session.",
    "fullDescription": "The pinnacle of Victoria Falls adventure. Why choose just one when you can conquer all three iconic bridge adrenaline feats? The Big Air package bundles the 111-meter Victoria Falls Bungee Jump, the 70-meter Bridge Swing pendulum plunge, and the 300-meter international Bridge Slide. Save over $100 compared to booking individually and earn ultimate bragging rights.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 280,
    "nettPriceUSD": 220,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:00",
      "11:00",
      "14:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "High",
    "minAge": 14,
    "includedItems": [
      "All 3 activities: Bungee, Bridge Swing, Bridge Slide",
      "All safety rigging and instruction",
      "Return transfers and border gate clearance",
      "Master Certificate of Achievement"
    ],
    "excludedItems": [
      "Photos and video USB package"
    ],
    "restrictions": [
      "Weight limit 40kg to 120kg",
      "Passport required for border crossing"
    ],
    "photos": [
      "/images/activities/big-air-combo.jpg",
      "/images/activities/bridge-bungee.jpg",
      "/images/activities/bridge-swing-action.jpg"
    ],
    "rating": 4.99,
    "reviewCount": 412,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-bigair-video",
        "activityId": "act-big-air",
        "name": "Ultimate 3-in-1 Action Photo & Video Bundle",
        "description": "Complete 4K photo & video recordings from all 3 activities",
        "grossPriceUSD": 65,
        "nettPriceUSD": 35,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-gruesome-twosome",
    "slug": "the-gruesome-twosome",
    "name": "The Gruesome Twosome — Bungee Jump & Bridge Swing Combo",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Double the extreme drop: combine the 111m Bungee Jump and the 70m Pendulum Swing into one heart-stopping adventure.",
    "fullDescription": "For the dedicated adrenaline junkie who wants the maximum gravitational acceleration available on the Victoria Falls Bridge. Take on the head-first 111-meter Bungee Jump, and follow it immediately with the feet-first 70-meter Bridge Swing leap across the Batoka Gorge.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 245,
    "nettPriceUSD": 195,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:30",
      "11:30",
      "14:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Bungee Jump and Bridge Swing tickets",
      "All harnesses, equipment & briefings",
      "Hotel transfers and bridge access passes"
    ],
    "excludedItems": [
      "Digital footage pack"
    ],
    "restrictions": [
      "Weight 40kg to 120kg",
      "Passport required"
    ],
    "photos": [
      "/images/activities/gruesome-twosome.jpg",
      "/images/activities/bridge-bungee.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 184,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-jetboat",
    "slug": "adventure-jet-boat-batoka-gorge",
    "name": "Adventure Jet Boat — Batoka Gorge White Water Rapids",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "465-horsepower twin V8 jet boat rocketing up and down the boiling rapids at the base of Victoria Falls with 360-degree spins.",
    "fullDescription": "Experience the ultimate aquatic rush below Victoria Falls. Powered by twin 465-hp Hamilton jet units, this state-of-the-art aluminum adventure vessel navigates the ferocious Batoka Gorge rapids right at the base of the Falls. Scream with exhilaration as your master pilot executes high-speed fish-tails, cuts across boiling standing waves, and throws the boat into heart-pounding 360-degree spins.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 141,
    "nettPriceUSD": 110,
    "parkFeeUSD": 12,
    "departureTimes": [
      "08:30",
      "11:00",
      "14:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 10,
    "includedItems": [
      "Return transfers from town lodges",
      "Cable car or guided gorge transfer",
      "Full safety life vest and splash gear",
      "Post-jetboat cold drinks and snacks"
    ],
    "excludedItems": [
      "Parks fee ($12)"
    ],
    "restrictions": [
      "Min age 10 years",
      "Ponchos provided but expect to get wet!"
    ],
    "photos": [
      "/images/activities/adventure-jetboat.jpg",
      "/images/activities/jetboat-rapids.jpg",
      "/images/activities/jetboat-adventure-spin.jpg"
    ],
    "rating": 4.93,
    "reviewCount": 265,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-jetboat-hike",
    "slug": "adventure-jetboat-and-gorge-hike",
    "name": "Adventure Jet Boat & Batoka Gorge Hike Combo",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Combine the white-knuckle jetboat river thrills with an authentic scenic guided hike down into and out of the Batoka Gorge.",
    "fullDescription": "A complete canyon adventure. Hike down into the gorge on an authentic geological trail with an experienced naturalist guide, discovering native Baobabs and volcanic rock formations. At the riverbank, board the high-speed jetboat for adrenaline spins on the rapids, then hike back to the plateau for well-deserved refreshments.",
    "durationMinutes": 240,
    "durationLabel": "4 hrs",
    "grossPriceUSD": 185,
    "nettPriceUSD": 145,
    "parkFeeUSD": 12,
    "departureTimes": [
      "08:00",
      "13:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "High",
    "minAge": 12,
    "includedItems": [
      "Guided gorge hike with walking sticks",
      "Full jetboat rapid navigation experience",
      "Buffet snacks, cold beers and soft drinks"
    ],
    "excludedItems": [
      "Parks fee ($12)"
    ],
    "restrictions": [
      "Moderate-to-high fitness required for gorge hike"
    ],
    "photos": [
      "/images/activities/jetboat-gorge-hike.jpg",
      "/images/activities/adventure-jetboat.jpg"
    ],
    "rating": 4.95,
    "reviewCount": 78,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-cruise-riversong",
    "slug": "riversong-luxury-sunset-cruise",
    "name": "Riversong Luxury Sunset Cruise — Premium Upper Zambezi Catamaran",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "The finest river safari in Victoria Falls. 3-deck luxury catamaran, freshly prepared gourmet canapés, craft cocktails, and sunset hippos.",
    "fullDescription": "The undisputed gold standard of Zambezi river safaris. Operating aboard the custom-engineered Riversong triple-deck luxury catamaran, this cruise delivers five-star hospitality on the peaceful waters upstream of Victoria Falls. Drift past Siloka and Elephant islands where breeding herds of elephants come to bathe and drink at dusk.\\n\\nEnjoy an attentive culinary brigade serving freshly prepared gourmet finger foods, artisanal sliders, and imported premium wines, gins, and spirits while watching a fiery African sunset.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 98,
    "nettPriceUSD": 75,
    "parkFeeUSD": 12,
    "departureTimes": [
      "16:00 (Winter)",
      "16:30 (Summer)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Complimentary hotel return transfers",
      "Fully inclusive top-shelf premium bar (spirits, wine, beer, cocktails)",
      "Chef-prepared gourmet canapés",
      "Experienced river captain and wildlife guide commentary"
    ],
    "excludedItems": [
      "National Park River Usage Levy ($12.00 USD)"
    ],
    "restrictions": [
      "Smart casual attire recommended",
      "Children under 4 on request"
    ],
    "photos": [
      "/images/activities/riversong-sunset-cruise.jpg",
      "/images/activities/zambezi-luxury-deck.jpg",
      "/images/activities/riversong-dinner-cruise.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 384,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-cruise-champagne",
        "activityId": "act-cruise-riversong",
        "name": "Moët & Chandon French Champagne Upgrade",
        "description": "Chilled bottle of Moët & Chandon Brut Impérial served on the private captain’s deck",
        "grossPriceUSD": 95,
        "nettPriceUSD": 70,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-cruise-standard",
    "slug": "standard-zambezi-sunset-cruise",
    "name": "Classic Zambezi Sunset Cruise — Sundowner River Safari",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "The classic Victoria Falls sundowner boat cruise: complimentary open bar, traditional snacks, and magical sunset views.",
    "fullDescription": "Relax and unwind as the African sun dips beneath the horizon. Cruise the wide, tranquil waters of the Zambezi River above the Falls, watching for hippos popping their heads above water, Nile crocodiles sunning on sandbars, and African fish eagles crying from the treetops. An open bar serving local beers, wines, spirits, and soft drinks with a selection of tasty finger snacks is included.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 65,
    "nettPriceUSD": 48,
    "parkFeeUSD": 12,
    "departureTimes": [
      "16:00 (Winter)",
      "16:30 (Summer)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 2,
    "includedItems": [
      "Hotel transfers",
      "Unlimited complimentary bar (beer, wine, spirits, mixers)",
      "Traditional savory snack platters",
      "River wildlife spotting"
    ],
    "excludedItems": [
      "River usage park fee ($12)"
    ],
    "restrictions": [
      "All ages welcome"
    ],
    "photos": [
      "/images/activities/standard-sunset-cruise.jpg",
      "/images/activities/sunset-cruise-deck.jpg"
    ],
    "rating": 4.88,
    "reviewCount": 290,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-cruise-sunrise",
    "slug": "zambezi-sunrise-morning-cruise",
    "name": "Zambezi Sunrise & Early Morning Birding Cruise",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Peaceful dawn cruise through river channels with morning coffee, continental breakfast, vibrant birdlife, and morning wildlife.",
    "fullDescription": "Experience the magic of the Zambezi waking up. While most tourists are still asleep, depart early onto glassy, mist-shrouded waters. Sip steaming African coffee or tea accompanied by warm pastries, fruit, and breakfast treats while your naturalist guide points out rare bird species, otters, and early-morning wildlife along the riverbanks.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 75,
    "nettPriceUSD": 58,
    "parkFeeUSD": 12,
    "departureTimes": [
      "06:00 (Summer)",
      "06:30 (Winter)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Hotel pickup and drop-off",
      "Freshly brewed coffee, tea, juices",
      "Continental breakfast spread",
      "Professional birding guide with binoculars"
    ],
    "excludedItems": [
      "River park fee ($12)"
    ],
    "restrictions": [
      "Warm morning fleece recommended in winter"
    ],
    "photos": [
      "/images/activities/zambezi-sunrise-cruise.jpg",
      "/images/activities/morning-birding-cruise.jpg"
    ],
    "rating": 4.93,
    "reviewCount": 114,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-cruise-lunch",
    "slug": "zambezi-lunch-midday-cruise",
    "name": "Zambezi Midday River Safari & Lunch Cruise",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Relaxing afternoon river cruise with a freshly prepared 3-course buffet lunch while cruising past elephant herds and hippo pods.",
    "fullDescription": "Escape the midday heat and take to the gentle breezes of the Zambezi. Enjoy a scenic 2-hour river safari accompanied by a delectable 3-course buffet featuring grilled meats, fresh salads, local dishes, and chilled refreshments from the open bar.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 65,
    "nettPriceUSD": 50,
    "parkFeeUSD": 12,
    "departureTimes": [
      "12:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 2,
    "includedItems": [
      "Return hotel transfers",
      "3-course buffet lunch",
      "Complimentary beer, wine, and soft drinks"
    ],
    "excludedItems": [
      "River park levy ($12)"
    ],
    "restrictions": [
      "Vegetarian and dietary options available on notice"
    ],
    "photos": [
      "/images/activities/zambezi-luxury-deck.jpg",
      "/images/activities/riversong-sunset-cruise.jpg"
    ],
    "rating": 4.87,
    "reviewCount": 95,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-cruise-dinner",
    "slug": "zambezi-starlight-dinner-cruise",
    "name": "Zambezi Starlight Sunset & Dinner Cruise",
    "destination": "VICTORIA_FALLS",
    "category": "WATER",
    "shortDescription": "Sunset boat safari followed by a 4-course gourmet dinner moored under the Southern African night sky on the Zambezi.",
    "fullDescription": "The ultimate romantic evening on the Zambezi River. Your voyage begins during golden hour as the sun sets over the riverine islands. As twilight turns to star-studded night, the boat moors in a tranquil bay where candlelit tables are set for a four-course gourmet dinner prepared fresh onboard, paired with fine South African wines.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 110,
    "nettPriceUSD": 85,
    "parkFeeUSD": 12,
    "departureTimes": [
      "16:30 (Summer)",
      "16:00 (Winter)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Hotel transfers",
      "Sunset river cruise + moored 4-course dinner",
      "Full open bar with selected premium wines",
      "Ambient candlelit dinner setup"
    ],
    "excludedItems": [
      "River fee ($12)"
    ],
    "restrictions": [
      "Smart casual dress code"
    ],
    "photos": [
      "/images/activities/riversong-dinner-cruise.jpg",
      "/images/activities/riversong-sunset-cruise.jpg"
    ],
    "rating": 4.95,
    "reviewCount": 168,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-tour-falls-zim",
    "slug": "guided-tour-of-victoria-falls",
    "name": "Guided Tour of Victoria Falls — Zimbabwe Rainforest (16 Viewpoints)",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Comprehensive guided walk across all 16 viewpoints from Devil's Cataract to Danger Point. Discover the botany, geology, and history.",
    "fullDescription": "Take a guided walk through the world-famous Victoria Falls rainforest on the Zimbabwean side, which commands 75% of the total cataract face. Accompanied by a master local guide, you will walk along the cliff-edge paths visiting all 16 designated viewpoints, including the David Livingstone Statue, the thundering Devil's Cataract, the Main Falls, Horseshoe Falls, Rainbow Falls, and Danger Point.\\n\\nLearn about the local myths, indigenous botanical flora that thrive in the perpetual cloud of spray, and the dramatic geological rifting that carved the Batoka canyons.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 32,
    "nettPriceUSD": 24,
    "parkFeeUSD": 58,
    "departureTimes": [
      "08:00",
      "10:00",
      "14:00",
      "15:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 0,
    "includedItems": [
      "Return transfers from Victoria Falls hotels",
      "Licensed national parks professional heritage guide",
      "Rain ponchos during high water season",
      "Bottled mineral water"
    ],
    "excludedItems": [
      "Rainforest National Park Entry Fee ($58 International / $35 SADC)",
      "Personal gratuities"
    ],
    "restrictions": [
      "Paved trails, wheelchair accessible up to Viewpoint 10",
      "Non-slip footwear recommended"
    ],
    "photos": [
      "/images/activities/guided-tour-falls.jpg",
      "/images/activities/guided-tour-viewpoint.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 642,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-tour-parkfee",
        "activityId": "act-tour-falls-zim",
        "name": "Pre-Paid International Rainforest Entry Fee",
        "description": "Pre-pay statutory $58.00 USD Zimbabwe National Parks ticket",
        "grossPriceUSD": 58,
        "nettPriceUSD": 58,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-tour-falls-zam",
    "slug": "guided-tour-victoria-falls-zambia",
    "name": "Guided Tour of Victoria Falls — Zambia Side & Knife-Edge Bridge",
    "destination": "LIVINGSTONE",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Experience the dramatic Eastern Cataract, brave the thrilling Knife-Edge Bridge, and descend to the swirling Boiling Pot.",
    "fullDescription": "Explore the spectacular Zambian side of Victoria Falls within Mosi-oa-Tunya National Park. Walk across the thrilling suspended Knife-Edge Bridge, where a continuous curtain of spray drenches visitors in high water. View the dramatic Eastern Cataract and take the historic stone path down into the Boiling Pot, where the Zambezi river surges through the narrow neck of the Batoka Gorge.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 35,
    "nettPriceUSD": 26,
    "parkFeeUSD": 20,
    "departureTimes": [
      "08:30",
      "14:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 4,
    "includedItems": [
      "Livingstone hotel return transfers",
      "Professional Zambian heritage guide",
      "Rain ponchos"
    ],
    "excludedItems": [
      "Zambia National Park entry fee ($20)"
    ],
    "restrictions": [
      "Moderate walking on steps down to Boiling Pot"
    ],
    "photos": [
      "/images/activities/guided-tour-zambia.jpg",
      "/images/activities/guided-tour-viewpoint.jpg"
    ],
    "rating": 4.92,
    "reviewCount": 145,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-tour-lunar",
    "slug": "lunar-rainbow-tour",
    "name": "Lunar Rainbow Night Tour — Victoria Falls Under Full Moon",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Witness one of nature's rarest optical phenomena: lunar rainbows (moonbows) shimmering in the mist of Victoria Falls at night.",
    "fullDescription": "Operated exclusively during the 3 nights of each month surrounding the full moon when the Victoria Falls rainforest opens specially after dark. Guided by rangers equipped with red-filter torches, walk along the rainforest paths to witness ethereal white and pastel lunar rainbows arching across the abyss under the light of the full moon.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 32,
    "nettPriceUSD": 25,
    "parkFeeUSD": 116,
    "departureTimes": [
      "19:30",
      "20:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Return night transfers",
      "Guided nocturnal rainforest walk with headlamps",
      "Camera tripod assistance for long-exposure photography"
    ],
    "excludedItems": [
      "Special National Parks Lunar Night Fee ($116 International)"
    ],
    "restrictions": [
      "Only available on 3 nights of each calendar month during full moon"
    ],
    "photos": [
      "/images/activities/lunar-rainbow-tour.jpg",
      "/images/activities/guided-tour-falls.jpg"
    ],
    "rating": 4.98,
    "reviewCount": 92,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-tour-bridge",
    "slug": "historic-victoria-falls-bridge-tour",
    "name": "Historic Victoria Falls Bridge Theatrical Tour & Catwalk Exploration",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Walk the original 1905 construction catwalks suspended beneath the bridge with a theatrical guide in period Edwardian costume.",
    "fullDescription": "Journey back in time to 1905 when Cecil Rhodes dreamed of a railway from \"Cape to Cairo\". An actor in authentic Edwardian costume portrays chief engineer Georges Imbault, bringing the extraordinary engineering triumph to life. Fitted with harnesses, you will walk along the original catwalks directly under the steel arch 100 meters above the roaring Zambezi, feeling the thundering spray and watching bungee jumpers leap above your head.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 64,
    "nettPriceUSD": 48,
    "parkFeeUSD": 0,
    "departureTimes": [
      "10:00",
      "14:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 10,
    "includedItems": [
      "Return transfers from Victoria Falls or Livingstone",
      "Theatrical presentation and museum video",
      "Safety harness and guided catwalk beneath the bridge",
      "Refreshments at Bridge Café"
    ],
    "excludedItems": [
      "Passport visa fees (border clearance included gratis with Bridge Pass)"
    ],
    "restrictions": [
      "Passport required for bridge access",
      "Enclosed walking shoes mandatory"
    ],
    "photos": [
      "/images/activities/bridge-tour-catwalk.jpg",
      "/images/activities/bridge-tour-history.jpg"
    ],
    "rating": 4.92,
    "reviewCount": 198,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-tour-tram",
    "slug": "victoria-falls-historic-bamba-tram",
    "name": "Victoria Falls Historic Bamba Tram Bridge Run",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Vintage tram excursion through the Victoria Falls rainforest and onto the historic bridge with champagne and fresh pastries.",
    "fullDescription": "Step aboard the charming open-sided vintage Bamba Tram for a leisurely heritage ride through the coastal teak forests of Victoria Falls onto the iconic bridge. Sip champagne, fruit mimosas, and warm pastries as the tram comes to a stop midway across the gorge, offering unforgettable photo opportunities of the falls.",
    "durationMinutes": 105,
    "durationLabel": "1 hr 45 min",
    "grossPriceUSD": 75,
    "nettPriceUSD": 58,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:30",
      "16:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Historic tram ride",
      "Mimosas, champagne, and refreshments",
      "Bridge crossing pass"
    ],
    "excludedItems": [
      "Personal souvenirs"
    ],
    "restrictions": [
      "Passport required for bridge border zone"
    ],
    "photos": [
      "/images/activities/bamba-tram.jpg",
      "/images/activities/bridge-tour-history.jpg"
    ],
    "rating": 4.91,
    "reviewCount": 88,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-gamedrive-am",
    "slug": "zambezi-national-park-game-drive",
    "name": "Zambezi National Park Morning Game Drive (4x4 Open Safari)",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Sunrise open 4x4 safari along the Zambezi River tracking lions, leopards, elephants, buffalo, and rare sable antelope.",
    "fullDescription": "Traverse the wilderness of the Zambezi National Park just minutes from Victoria Falls. Departing at dawn in custom-outfitted open 4x4 safari vehicles, your professional safari guide navigates along the scenic river drives and Chamabondo vlei networks. Track big cats, herds of elephant, giraffe, kudu, and the park’s signature pride of sable antelope, concluding with bush coffee and freshly baked rusks on the riverbanks.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 79,
    "nettPriceUSD": 60,
    "parkFeeUSD": 18,
    "departureTimes": [
      "06:00 (Summer)",
      "06:30 (Winter)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Hotel return transfers",
      "Open 4x4 safari vehicle with window seat guarantee",
      "Professional guide and tracker",
      "Bush coffee, tea, and baked breakfast snacks"
    ],
    "excludedItems": [
      "National Park Conservation Fee ($18.00 USD)"
    ],
    "restrictions": [
      "Warm fleece/jacket recommended for morning departure"
    ],
    "photos": [
      "/images/activities/zambezi-game-drive.jpg",
      "/images/activities/game-drive-lions.jpg"
    ],
    "rating": 4.91,
    "reviewCount": 278,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-gamedrive-pm",
    "slug": "zambezi-national-park-afternoon-game-drive",
    "name": "Zambezi National Park Afternoon Safari & River Sundowner",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Afternoon 4x4 game drive tracking big game coming down to the river to drink, concluding with African sundowners.",
    "fullDescription": "Experience the peak game-viewing hours as the African heat wanes. Elephants, buffalo, and waterbuck make their way to the Zambezi River to quench their thirst. The drive concludes at a scenic overlook on the riverbanks for traditional sundowner drinks and gourmet snacks as the sun dips below the acacia canopy.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 79,
    "nettPriceUSD": 60,
    "parkFeeUSD": 18,
    "departureTimes": [
      "15:00 (Winter)",
      "15:30 (Summer)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Hotel transfers",
      "Open 4x4 game drive",
      "Sundowner beers, wines, and snacks on the Zambezi banks"
    ],
    "excludedItems": [
      "National Park fee ($18)"
    ],
    "restrictions": [
      "All ages from 4 years"
    ],
    "photos": [
      "/images/activities/game-drive-afternoon.jpg",
      "/images/activities/zambezi-game-drive.jpg"
    ],
    "rating": 4.89,
    "reviewCount": 154,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-night-dinner",
    "slug": "zambezi-national-park-night-game-drive-dinner",
    "name": "Night Game Drive with Bush Dinner — Nocturnal Predator Safari",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Spotlight safari tracking nocturnal predators (leopards, hyenas, genets) followed by a 3-course bush dinner under the stars.",
    "fullDescription": "When the sun sets, a completely different world awakens in the African bush. Armed with high-powered filtered spotlights, your professional guide tracks nocturnal species that are rarely seen by day—including leopards on the prowl, civets, genets, bushbabies, porcupines, and hunting hyenas. The safari concludes at a private wilderness clearing where a glowing campfire and a lavish 3-course bush barbecue await under the African stars.",
    "durationMinutes": 240,
    "durationLabel": "4 hrs",
    "grossPriceUSD": 272,
    "nettPriceUSD": 215,
    "parkFeeUSD": 8,
    "departureTimes": [
      "17:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Spotlight night safari in open 4x4",
      "3-course bush dinner cooked over open wood fires",
      "Complimentary wine, beer, and soft drinks at camp",
      "Return hotel transfers"
    ],
    "excludedItems": [
      "Conservation levy ($8)"
    ],
    "restrictions": [
      "Warm clothing recommended for open-air night drive"
    ],
    "photos": [
      "/images/activities/night-game-drive.jpg",
      "/images/activities/night-bush-dinner.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 112,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-walking",
    "slug": "zambezi-national-park-walking-safari",
    "name": "Zambezi National Park Guided Walking Safari on Foot",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Bush tracking big game on foot with an armed professional ranger. Learn animal tracks, medicinal flora, and survival lore.",
    "fullDescription": "Nothing compares to the sensory experience of walking through wild Africa on foot. Led by a fully licensed professional safari walking guide and accompanied by an armed National Parks ranger, you will follow animal tracks, decipher signs of the bush, study medicinal plants, and experience thrilling encounters with big game at eye level.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 112,
    "nettPriceUSD": 88,
    "parkFeeUSD": 18,
    "departureTimes": [
      "06:30",
      "14:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Hotel transfers",
      "Armed professional guide and tracker",
      "Bush snacks and mineral water"
    ],
    "excludedItems": [
      "Parks fee ($18)"
    ],
    "restrictions": [
      "Neutral outdoor clothing required (no bright colors or white)",
      "Min age 12"
    ],
    "photos": [
      "/images/activities/zambezi-walking-safari.jpg",
      "/images/activities/game-walk-trackers.jpg"
    ],
    "rating": 4.94,
    "reviewCount": 86,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-elephant-elecrew",
    "slug": "through-the-eyes-of-an-elephant",
    "name": "\"Through the Eyes of an Elephant\" Educational Conservation Encounter",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Conservation-focused, non-riding educational encounter and walk with rescued elephants in partnership with the EleCREW trust.",
    "fullDescription": "An educational and conservation-focused elephant encounter designed to deepen your understanding of Africa’s most intelligent giants. In partnership with EleCREW (a registered non-profit promoting human-elephant coexistence), guests learn how elephants see, hear, smell, feel, and think. Guided by expert handlers, you will walk alongside these majestic giants across level wilderness trails and learn about anti-poaching and habitat protection efforts.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 148,
    "nettPriceUSD": 115,
    "parkFeeUSD": 24,
    "departureTimes": [
      "08:00",
      "10:30",
      "14:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Guided educational conservation presentation",
      "20-minute elephant wilderness walk",
      "Morning or afternoon refreshments",
      "Return transfers from town lodges"
    ],
    "excludedItems": [
      "Conservation levy ($24) directly supporting EleCREW trust",
      "Souvenir photos"
    ],
    "restrictions": [
      "Non-riding ethical sanctuary",
      "Children under 10 view the walk from designated safari vehicle"
    ],
    "photos": [
      "/images/activities/through-the-eyes-elephant.jpg",
      "/images/activities/elephant-interaction.jpg",
      "/images/activities/elephant-safari.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 220,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-chobe-day",
    "slug": "chobe-national-park-day-trip-safari",
    "name": "Chobe National Park Full Day Safari — Botswana Border Excursion",
    "destination": "CHOBE",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Full-day safari to Botswana: 3-hour Chobe River boat safari, luxury lodge buffet lunch, and open 4x4 game drive.",
    "fullDescription": "Cross into Botswana for a world-renowned safari in Chobe National Park, home to the largest concentration of African elephants on earth (over 120,000 elephants). Your expedition includes a morning safari river cruise along the Chobe River where elephants swim across deep channels and hundreds of hippos congregate, followed by a luxury 5-star buffet lunch at a riverside lodge, and an afternoon 4x4 open safari drive into the park tracking lions, leopards, and sable.",
    "durationMinutes": 600,
    "durationLabel": "Full Day (10 hrs)",
    "grossPriceUSD": 249,
    "nettPriceUSD": 195,
    "parkFeeUSD": 0,
    "departureTimes": [
      "07:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "All international border transfers from Victoria Falls / Livingstone",
      "3-hour Chobe River safari boat cruise",
      "Full 5-star lodge buffet lunch and soft drinks",
      "3-hour afternoon open 4x4 game drive in Chobe National Park",
      "All Botswana National Park entry fees"
    ],
    "excludedItems": [
      "Botswana visa fees (most Western passports are visa-exempt)"
    ],
    "restrictions": [
      "Valid passport required for Botswana immigration"
    ],
    "photos": [
      "/images/activities/chobe-elephants-river.jpg",
      "/images/activities/chobe-game-drive.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 489,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-chobe-camp",
    "slug": "chobe-overnight-camping-safari",
    "name": "Chobe Overnight Wilderness Camping Safari (2 Days / 1 Night)",
    "destination": "CHOBE",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Complete Botswana wilderness immersion: river safari, 2 full game drives, campfire barbecue, and camping under canvas in Chobe NP.",
    "fullDescription": "Take your Botswana safari to the next level with an overnight camping expedition deep inside Chobe National Park. Experience an evening game drive after day visitors have departed, dinner cooked over open mopane wood coals, stories around the campfire, and the thrilling sounds of lions roaring and hyenas calling while tucked into comfortable canvas tents with cots and bedrolls.",
    "durationMinutes": 1800,
    "durationLabel": "2 Days / 1 Night",
    "grossPriceUSD": 381,
    "nettPriceUSD": 305,
    "parkFeeUSD": 30,
    "departureTimes": [
      "07:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 8,
    "includedItems": [
      "All transfers from Victoria Falls",
      "River safari boat cruise",
      "Multiple 4x4 game drives",
      "Comfortable tented camp accommodation with bedrolls",
      "All meals and wine/beer at camp"
    ],
    "excludedItems": [
      "National park fees ($30)"
    ],
    "restrictions": [
      "Passport required for Botswana entry"
    ],
    "photos": [
      "/images/activities/chobe-camping-safari.jpg",
      "/images/activities/chobe-elephants-river.jpg"
    ],
    "rating": 4.98,
    "reviewCount": 76,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-rhino",
    "slug": "white-rhino-walking-safari",
    "name": "White Rhino Tracking Walking Safari (Mosi-oa-Tunya / Livingstone)",
    "destination": "LIVINGSTONE",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Track endangered Southern White Rhinos on foot in Mosi-oa-Tunya National Park, guarded 24/7 by dedicated wildlife rangers.",
    "fullDescription": "An extraordinary opportunity to approach endangered white rhinos on foot. Guarded around the clock by armed Zambian wildlife police officers to protect them from poachers, these magnificent prehistoric creatures can be observed from close range under the direction of your guide and trackers.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 120,
    "nettPriceUSD": 95,
    "parkFeeUSD": 20,
    "departureTimes": [
      "07:00",
      "14:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Hotel transfers from Livingstone",
      "Experienced walking guide and armed rangers",
      "Bush refreshments"
    ],
    "excludedItems": [
      "Mosi-oa-Tunya Park entrance fee ($20)"
    ],
    "restrictions": [
      "Enclosed walking shoes and neutral clothing mandatory"
    ],
    "photos": [
      "/images/activities/game-walk-trackers.jpg",
      "/images/activities/zambezi-game-drive.jpg"
    ],
    "rating": 4.96,
    "reviewCount": 165,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-devils-am",
    "slug": "livingstone-island-devils-pool-morning-breezer",
    "name": "Livingstone Island & Devil's Pool — Morning Breezer",
    "destination": "LIVINGSTONE",
    "category": "ADRENALINE",
    "shortDescription": "Boat to Livingstone Island on the lip of Victoria Falls, swim in Devil's Pool right on the edge, and enjoy morning refreshments.",
    "fullDescription": "The world's most famous natural infinity pool. Departing by twin-engine boat from the Royal Livingstone Hotel, you will journey through the Zambezi rapids to Livingstone Island on the crest of Victoria Falls. Follow in the footsteps of David Livingstone before taking the plunge into Devil’s Pool—a naturally formed rock pool right on the precipice of the 100-meter drop. After your swim, savor freshly baked scones and morning coffee on the island.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 149,
    "nettPriceUSD": 120,
    "parkFeeUSD": 0,
    "departureTimes": [
      "07:30",
      "09:00"
    ],
    "pickupIncluded": false,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Boat transfer to Livingstone Island",
      "Guided swim in Devil's Pool with trained safety guides",
      "Morning scones, tea, coffee, and fruit on the island"
    ],
    "excludedItems": [
      "Hotel transfer to Royal Livingstone jetty (available as add-on)"
    ],
    "restrictions": [
      "Seasonal: operates during low/medium water (typically late August to January)",
      "Must be able to swim across short river channel"
    ],
    "photos": [
      "/images/activities/rapid-action.jpg",
      "/images/activities/guided-tour-viewpoint.jpg"
    ],
    "rating": 4.99,
    "reviewCount": 384,
    "status": "ACTIVE",
    "addOns": [
      {
        "id": "addon-devils-transfer",
        "activityId": "act-safari-devils-am",
        "name": "Return Road Transfer to Royal Livingstone",
        "description": "Transfers from Victoria Falls town or Livingstone hotels to the island boat launch",
        "grossPriceUSD": 25,
        "nettPriceUSD": 15,
        "capacityLimit": null,
        "status": "ACTIVE"
      }
    ]
  },
  {
    "id": "act-safari-devils-lunch",
    "slug": "livingstone-island-devils-pool",
    "name": "Livingstone Island & Devil's Pool — Midday Swim & 3-Course Lunch",
    "destination": "LIVINGSTONE",
    "category": "ADRENALINE",
    "shortDescription": "Midday swim on the edge of the abyss followed by a gourmet 3-course lunch prepared fresh on Livingstone Island.",
    "fullDescription": "Experience Devil’s Pool during prime daylight when rainbows arch through the rising mist. After an adrenaline-fueled swim on the edge of the abyss, sit down at linen-covered tables for a sumptuous 3-course lunch prepared fresh by island chefs, paired with chilled wine and beer.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 199,
    "nettPriceUSD": 155,
    "parkFeeUSD": 0,
    "departureTimes": [
      "12:30"
    ],
    "pickupIncluded": false,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Island boat crossing",
      "Guided Devil's Pool swim",
      "3-course lunch and wine/beer on Livingstone Island"
    ],
    "excludedItems": [
      "Road transfer to jetty"
    ],
    "restrictions": [
      "Seasonal operation (Aug to Jan)",
      "Good swimming capability required"
    ],
    "photos": [
      "/images/activities/rapid-action.jpg",
      "/images/activities/guided-tour-viewpoint.jpg"
    ],
    "rating": 4.98,
    "reviewCount": 290,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-devils-tea",
    "slug": "livingstone-island-devils-pool-high-tea",
    "name": "Livingstone Island & Devil's Pool — Afternoon High Tea",
    "destination": "LIVINGSTONE",
    "category": "ADRENALINE",
    "shortDescription": "Late afternoon Devil's Pool edge swim followed by traditional British high tea, cakes, and prosecco on the island.",
    "fullDescription": "The quintessential colonial adventure experience. Cruise to Livingstone Island in the gentle afternoon light, swim in Devil's Pool with panoramic views of the entire falls, and return to dry land on the island for elegant High Tea featuring gourmet finger sandwiches, artisanal pastries, cakes, and sparkling wine.",
    "durationMinutes": 120,
    "durationLabel": "2 hrs",
    "grossPriceUSD": 189,
    "nettPriceUSD": 148,
    "parkFeeUSD": 0,
    "departureTimes": [
      "15:30"
    ],
    "pickupIncluded": false,
    "fitnessLevel": "Moderate",
    "minAge": 12,
    "includedItems": [
      "Island boat transfer",
      "Guided swim in Devil's Pool",
      "Full High Tea spread with cakes, sandwiches & sparkling wine"
    ],
    "excludedItems": [
      "Road transfers"
    ],
    "restrictions": [
      "Seasonal operation (Aug to Jan)",
      "Min age 12"
    ],
    "photos": [
      "/images/activities/rapid-action.jpg",
      "/images/activities/guided-tour-viewpoint.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 210,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-safari-hwange",
    "slug": "hwange-national-park-full-day-safari",
    "name": "Hwange National Park Full Day Safari — Big Five Super-Prides",
    "destination": "VICTORIA_FALLS",
    "category": "SAFARI_WILDLIFE",
    "shortDescription": "Full-day safari to Zimbabwe's crown jewel national park: 40,000+ elephants, lion super-prides, and waterhole game viewing.",
    "fullDescription": "Hwange National Park is Zimbabwe’s largest and premier wildlife reserve, encompassing 14,650 square kilometers of Kalahari sands and teak forests. Known worldwide for its colossal elephant herds (exceeding 40,000 animals) and legendary lion prides, this full-day expedition includes transfers from Victoria Falls, a morning game drive visiting productive pumped waterholes, a delicious safari lunch, and an afternoon safari drive.",
    "durationMinutes": 720,
    "durationLabel": "Full Day (12 hrs)",
    "grossPriceUSD": 295,
    "nettPriceUSD": 235,
    "parkFeeUSD": 20,
    "departureTimes": [
      "06:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 6,
    "includedItems": [
      "Return transfers from Victoria Falls hotels to Hwange",
      "Full-day game drive in open 4x4 safari vehicles",
      "Safari lodge lunch with beverages",
      "Professional safari guide and tracker"
    ],
    "excludedItems": [
      "Hwange National Park Entrance Fee ($20.00 USD)"
    ],
    "restrictions": [
      "Full day tour; 2-hour transfer each way"
    ],
    "photos": [
      "/images/activities/game-drive-lions.jpg",
      "/images/activities/zambezi-game-drive.jpg"
    ],
    "rating": 4.94,
    "reviewCount": 178,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-boma",
    "slug": "the-boma-dinner-and-drum-show",
    "name": "The Boma — Dinner & Drum Show Cultural Feast",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Legendary African cultural feast: 4-course barbecue buffet, traditional Shangaan dancers, fortune teller, and interactive drumming.",
    "fullDescription": "Consistently rated the must-do evening experience in Victoria Falls. Dressed in traditional chitenge robes upon arrival, guests are welcomed with a hand-washing ceremony and a sip of local sorghum beer. Feast on an expansive four-course buffet featuring spit-roasted warthog, game stews, Zambezi bream, and the daring mopane worm challenge (with a signed certificate!).\\n\\nThe evening peaks with a spirited interactive drumming session where every guest is handed their own djembe drum.",
    "durationMinutes": 180,
    "durationLabel": "3 hrs",
    "grossPriceUSD": 71,
    "nettPriceUSD": 54,
    "parkFeeUSD": 0,
    "departureTimes": [
      "19:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 0,
    "includedItems": [
      "Return transfers from all Victoria Falls hotels & lodges",
      "Four-course African feast buffet",
      "Chitenge wrap dressing and face painting",
      "Djembe drum per person for interactive performance"
    ],
    "excludedItems": [
      "Beverages and bar purchases"
    ],
    "restrictions": [
      "Family friendly, suitable for all ages"
    ],
    "photos": [
      "/images/activities/traditional-village.jpg",
      "/images/activities/simunye-theatre-stage.jpg"
    ],
    "rating": 4.93,
    "reviewCount": 540,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-simunye",
    "slug": "simunye-spirit-of-africa",
    "name": "Simunye — Spirit of Africa Live Theatrical Musical Show",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Acclaimed evening Broadway-style theatrical show at Victoria Falls Theatre combining giant puppetry, dance, music, and acrobatics.",
    "fullDescription": "Simunye (\"We Are One\") is a dazzling world-class theatrical production staged at the custom-built Victoria Falls Theatre. Created in collaboration with internationally renowned directors, this magical show tells the story of a journey through the African wild using larger-than-life puppetry, breathtaking acrobatics, evocative original music, and mesmerizing visual effects. A captivating spectacle for audiences of all ages.",
    "durationMinutes": 90,
    "durationLabel": "1.5 hrs",
    "grossPriceUSD": 69,
    "nettPriceUSD": 52,
    "parkFeeUSD": 0,
    "departureTimes": [
      "18:00",
      "20:00"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Return hotel transfers",
      "Reserved tiered seating at Victoria Falls Theatre",
      "Full 75-minute live theatrical show"
    ],
    "excludedItems": [
      "Drinks and snacks at the theatre bar"
    ],
    "restrictions": [
      "No flash photography during performance"
    ],
    "photos": [
      "/images/activities/simunye-spirit-of-africa.jpg",
      "/images/activities/simunye-theatre-stage.jpg",
      "/images/activities/simunye-acrobatics.jpg"
    ],
    "rating": 4.97,
    "reviewCount": 320,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-dusty-road",
    "slug": "dusty-road-township-dining-experience",
    "name": "Dusty Road Township Cultural Dining Experience (Chinotimba)",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Traditional Zimbabwean township culinary experience cooked over open fires with local ingredients in Chinotimba township.",
    "fullDescription": "Located in the heart of Chinotimba, Victoria Falls’ oldest township, Dusty Road is a celebrated traditional restaurant created by renowned chef Sarah Lilford. Savor authentic Zimbabwean cuisine cooked over open fires and cast-iron pots—including sadza, wild spinach, groundnut stew, and roasted guinea fowl—surrounded by vibrant upcycled art and township hospitality.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 55,
    "nettPriceUSD": 42,
    "parkFeeUSD": 0,
    "departureTimes": [
      "12:30 (Lunch)",
      "18:30 (Dinner)"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 4,
    "includedItems": [
      "Return transfers from town",
      "Full multi-dish traditional tasting menu",
      "Introduction to township heritage and culinary history"
    ],
    "excludedItems": [
      "Craft beers and cocktails"
    ],
    "restrictions": [
      "Vegetarian and vegan options available"
    ],
    "photos": [
      "/images/activities/dusty-road-township.jpg",
      "/images/activities/traditional-village.jpg"
    ],
    "rating": 4.95,
    "reviewCount": 148,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-village-tour",
    "slug": "traditional-african-village-tour",
    "name": "Traditional Zimbabwean Rural Village Tour (Monde / Mukuni)",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Authentic cultural visit to a working rural African village. Meet the village headman, visit homesteads, and support the local school.",
    "fullDescription": "Experience everyday rural African life beyond the tourist bubble. Accompanied by a local guide born and raised in the community, you will visit Monde Village, a traditional rural settlement located 15km outside Victoria Falls town. Meet the village elders, learn about thatched mud-brick architecture, subsistence farming, traditional medicine, and visit the village primary school.",
    "durationMinutes": 150,
    "durationLabel": "2.5 hrs",
    "grossPriceUSD": 60,
    "nettPriceUSD": 45,
    "parkFeeUSD": 0,
    "departureTimes": [
      "09:00",
      "14:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Easy",
    "minAge": 0,
    "includedItems": [
      "Return transfers from Victoria Falls",
      "Guided village walk and meeting with community leaders",
      "Contribution to the village development trust fund"
    ],
    "excludedItems": [
      "Personal donations to school (stationery welcomed)"
    ],
    "restrictions": [
      "Modest attire covering shoulders and knees requested"
    ],
    "photos": [
      "/images/activities/traditional-village.jpg",
      "/images/activities/ndebele-village.jpg"
    ],
    "rating": 4.92,
    "reviewCount": 158,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-batoka-ndebele",
    "slug": "batoka-gorge-hike-and-ndebele-village-tour",
    "name": "Batoka Gorge Hike & Ndebele Cultural Village Encounter",
    "destination": "VICTORIA_FALLS",
    "category": "CULTURE_HERITAGE",
    "shortDescription": "Guided descent and climb through the Batoka Gorge combined with an authentic cultural immersion in a traditional Ndebele village.",
    "fullDescription": "A unique combination of hiking adventure and cultural discovery. Hike down into the dramatic Batoka Gorge alongside local naturalists, observing unique flora and river rapids. Afterward, visit an authentic Ndebele rural village on the canyon plateau to experience traditional music, beadwork crafts, and indigenous cooking.",
    "durationMinutes": 240,
    "durationLabel": "4 hrs",
    "grossPriceUSD": 75,
    "nettPriceUSD": 58,
    "parkFeeUSD": 12,
    "departureTimes": [
      "08:00",
      "13:30"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 10,
    "includedItems": [
      "Return transfers",
      "Guided gorge hike with equipment",
      "Ndebele cultural homestead visit",
      "Refreshments and mineral water"
    ],
    "excludedItems": [
      "Parks fee ($12)"
    ],
    "restrictions": [
      "Moderate fitness required for hiking"
    ],
    "photos": [
      "/images/activities/batoka-hike-ndebele.jpg",
      "/images/activities/ndebele-village.jpg"
    ],
    "rating": 4.93,
    "reviewCount": 92,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-combo-ticket-1",
    "slug": "shearwater-ticket-to-adventure-pass-1",
    "name": "Shearwater Ticket to Adventure — Sunset Cruise + 2 Activities",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "Shearwater's bestselling combo pass: includes a luxury Sunset Cruise PLUS your choice of any two flagship adventure activities.",
    "fullDescription": "The ultimate smart traveler's pass. Shearwater’s \"Ticket to Adventure 1\" guarantees significant savings (saving up to $80 per person) by bundling a relaxing Zambezi Sunset Cruise with any two major adventure experiences of your choice:\\n\\nChoose 2 from:\\n- 12-13 Min \"Flight of Angels\" Helicopter Scenic Flight\\n- Full Day Batoka Gorge White Water Rafting\\n- 111m Victoria Falls Bridge Bungee Jump\\n- 70m Bridge Swing or 300m Bridge Slide\\n- Adventure Jet Boat Batoka Gorge\\n- Guided Tour of Victoria Falls Rainforest\\n- Morning or Afternoon Zambezi Game Drive",
    "durationMinutes": 480,
    "durationLabel": "Flexible Multi-Day",
    "grossPriceUSD": 385,
    "nettPriceUSD": 300,
    "parkFeeUSD": 24,
    "departureTimes": [
      "Flexible — arranged with concierge upon arrival"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Zambezi Sunset Cruise with open bar and snacks",
      "Choice of 2 major adventure activities",
      "Complimentary hotel return transfers for all activities",
      "Priority concierge schedule coordination"
    ],
    "excludedItems": [
      "Statutory park/aviation fees for selected activities"
    ],
    "restrictions": [
      "Activities can be scheduled over 1 to 5 days during your stay"
    ],
    "photos": [
      "/images/activities/riversong-sunset-cruise.jpg",
      "/images/activities/heli-flight-of-angels.jpg",
      "/images/activities/rafting-low-water.jpg"
    ],
    "rating": 4.99,
    "reviewCount": 450,
    "status": "ACTIVE",
    "addOns": []
  },
  {
    "id": "act-combo-ticket-2",
    "slug": "shearwater-ticket-to-adventure-pass-2",
    "name": "Shearwater Ticket to Adventure — Sunset Cruise + 3 Activities",
    "destination": "VICTORIA_FALLS",
    "category": "ADRENALINE",
    "shortDescription": "The complete Victoria Falls adventure portfolio: Zambezi Sunset Cruise PLUS any three major adventure activities at huge savings.",
    "fullDescription": "The ultimate luxury bundle for the complete Victoria Falls itinerary. Includes the Zambezi Sunset Cruise plus any three major activities of your choice across air, water, bridge, and safari, saving over $120 compared to individual booking.",
    "durationMinutes": 720,
    "durationLabel": "Flexible Multi-Day",
    "grossPriceUSD": 495,
    "nettPriceUSD": 390,
    "parkFeeUSD": 36,
    "departureTimes": [
      "Flexible — arranged with concierge upon arrival"
    ],
    "pickupIncluded": true,
    "fitnessLevel": "Moderate",
    "minAge": 14,
    "includedItems": [
      "Sunset Cruise with open bar & canapés",
      "Choice of 3 major activities from full Shearwater catalog",
      "All hotel transfers",
      "Dedicated DMC coordinator service"
    ],
    "excludedItems": [
      "Park fees"
    ],
    "restrictions": [
      "Valid for up to 7 days from first activity"
    ],
    "photos": [
      "/images/activities/riversong-sunset-cruise.jpg",
      "/images/activities/big-air-combo.jpg",
      "/images/activities/heli-zambezi-spectacular.jpg"
    ],
    "rating": 4.99,
    "reviewCount": 318,
    "status": "ACTIVE",
    "addOns": []
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    "id": "partner-explorers-village",
    "name": "Shearwater Explorers Village",
    "destination": "VICTORIA_FALLS",
    "contactEmail": "reservations@explorersvillage.com",
    "contactPhone": "+263 13 44471",
    "commissionType": "PERCENTAGE",
    "commissionValue": 20,
    "contentRightsGranted": true,
    "status": "ACTIVE",
    "roomTypes": [
      {
        "id": "room-deluxe-chalet",
        "name": "Deluxe Air-Conditioned Chalet",
        "description": "Spacious private chalet featuring King or Twin beds, ensuite bathroom with walk-in rainfall shower, private veranda, air conditioning, and complimentary Wi-Fi.",
        "rateUSD": 165,
        "capacity": 2,
        "photo": "/images/lodges/deluxe-double-room.jpg"
      },
      {
        "id": "room-standard-lodge",
        "name": "Standard Safari Room",
        "description": "Comfortable ensuite safari-style room with ceiling fans, mosquito netting, veranda, and direct garden access to the swimming pools.",
        "rateUSD": 110,
        "capacity": 2,
        "photo": "/images/lodges/standard-double-room.jpg"
      },
      {
        "id": "room-camping",
        "name": "Equipped Safari Camping Dome",
        "description": "Budget-friendly adventure camping with twin beds, bedding supplied, shared modern ablution blocks, and access to all resort amenities.",
        "rateUSD": 35,
        "capacity": 2,
        "photo": "/images/lodges/safari-camp-dome.jpg"
      }
    ]
  },
  {
    "id": "partner-waterfront",
    "name": "The Victoria Falls Waterfront",
    "destination": "LIVINGSTONE",
    "contactEmail": "reservations@waterfront.co.zm",
    "contactPhone": "+260 213 320606",
    "commissionType": "PERCENTAGE",
    "commissionValue": 15,
    "contentRightsGranted": true,
    "status": "ACTIVE",
    "roomTypes": [
      {
        "id": "room-waterfront-exec",
        "name": "Executive Riverside Room",
        "description": "Spacious air-conditioned room right on the Zambezi River banks with private deck and sunset views.",
        "rateUSD": 180,
        "capacity": 2,
        "photo": "/images/destinations/livingstone-island.jpg"
      },
      {
        "id": "room-waterfront-chalet",
        "name": "Standard Garden Chalet",
        "description": "Ensuite thatched chalet surrounded by lush riverine gardens and indigenous trees.",
        "rateUSD": 120,
        "capacity": 2,
        "photo": "/images/destinations/livingstone-island.jpg"
      },
      {
        "id": "room-waterfront-tent",
        "name": "Adventure Safari Tent",
        "description": "Permanent walk-in safari tent with twin beds, fan, and electricity located close to the river bar.",
        "rateUSD": 45,
        "capacity": 2,
        "photo": "/images/lodges/safari-camp-dome.jpg"
      }
    ]
  },
  {
    "id": "partner-chobe-safari",
    "name": "Chobe Safari Lodge",
    "destination": "CHOBE",
    "contactEmail": "reservations@underonebotswanasky.com",
    "contactPhone": "+267 625 0336",
    "commissionType": "PERCENTAGE",
    "commissionValue": 18,
    "contentRightsGranted": true,
    "status": "ACTIVE",
    "roomTypes": [
      {
        "id": "room-chobe-river",
        "name": "Luxury River Room",
        "description": "Air-conditioned luxury room with private patio overlooking the Chobe River floodplains and Namibian Caprivi Strip.",
        "rateUSD": 290,
        "capacity": 2,
        "photo": "/images/activities/chobe-elephants-river.jpg"
      },
      {
        "id": "room-chobe-safari",
        "name": "Safari Room",
        "description": "Modern safari room with en-suite bath, satellite TV, and immediate proximity to the swimming pool.",
        "rateUSD": 240,
        "capacity": 2,
        "photo": "/images/activities/chobe-game-drive.jpg"
      },
      {
        "id": "room-chobe-chalet",
        "name": "Traditional Thatched Chalet",
        "description": "Classic round thatched rondavel set under acacia trees, offering an authentic safari feel.",
        "rateUSD": 160,
        "capacity": 2,
        "photo": "/images/activities/chobe-camping-safari.jpg"
      }
    ]
  }
];

export const INITIAL_MAPPED_PROPERTIES: MappedProperty[] = [
  {
    "id": "map-explorers-village",
    "name": "Shearwater Explorers Village",
    "address": "Lupinyu Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9288,
    "longitude": 25.8364,
    "isBookablePartner": true,
    "locationVerifiedByStaff": true,
    "partnerId": "partner-explorers-village",
    "startingPriceUSD": 110,
    "photo": "/images/lodges/deluxe-double-room.jpg",
    "rating": 4.8,
    "amenities": [
      "Swimming Pool",
      "Air Conditioning",
      "Curio Shop",
      "Restaurant & Bar",
      "Free Wi-Fi",
      "200m to Town Center"
    ]
  },
  {
    "id": "map-vic-falls-hotel",
    "name": "The Victoria Falls Hotel",
    "address": "1 Mallet Dr, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9282,
    "longitude": 25.8456,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 480,
    "photo": "/images/destinations/victoria-falls-panoramic.jpg",
    "rating": 4.9,
    "amenities": [
      "Historic Heritage (1904)",
      "Private Path to Falls",
      "Edwardian Luxury",
      "Stanley's Terrace Fine Dining",
      "Pool"
    ],
    "inquireOnlyNotice": "This premier heritage property is not directly bookable online. Inquire with our concierge to reserve preferred suites."
  },
  {
    "id": "map-ilala-lodge",
    "name": "Ilala Lodge Hotel",
    "address": "411 Livingstone Way, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9272,
    "longitude": 25.8406,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 340,
    "photo": "/images/destinations/victoria-falls-cataract.jpg",
    "rating": 4.8,
    "amenities": [
      "Closest Hotel to the Falls",
      "Award-Winning Cassia Restaurant",
      "Lush Gardens",
      "Wildlife on Lawns"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with our concierge to add Ilala Lodge to your private itinerary."
  },
  {
    "id": "map-victoria-safari-lodge",
    "name": "Victoria Falls Safari Lodge",
    "address": "Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.915,
    "longitude": 25.8115,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 390,
    "photo": "/images/activities/zambezi-game-drive.jpg",
    "rating": 4.8,
    "amenities": [
      "Waterhole-Facing Rooms",
      "Vulture Culture Experience",
      "Buffalo Bar",
      "MaKuwa-Kuwa Restaurant",
      "Shuttle Service"
    ],
    "inquireOnlyNotice": "Inquire with our concierge for preferred room allotments overlooking the active sunset waterhole."
  },
  {
    "id": "map-palm-river-hotel",
    "name": "Palm River Hotel",
    "address": "4 Kendall Close, Cresta Sprayview, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9125,
    "longitude": 25.8235,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 460,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.9,
    "amenities": [
      "5-Star Luxury Riverfront",
      "Zambezi River Views",
      "Outdoor Pool",
      "Complimentary River Cruises",
      "Fine Dining"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire to include Palm River Hotel in your luxury tailored itinerary."
  },
  {
    "id": "map-elephant-camp",
    "name": "The Elephant Camp",
    "address": "Victoria Falls National Park Gorge Edge, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.962,
    "longitude": 25.851,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 780,
    "photo": "/images/activities/elephant-interaction.jpg",
    "rating": 4.9,
    "amenities": [
      "Private Plunge Pools",
      "Gorge & Falls Spray Views",
      "All-Inclusive Luxury",
      "Elephant Interaction Access"
    ],
    "inquireOnlyNotice": "High-demand luxury wilderness camp. Direct concierge inquiry required for private suite availability."
  },
  {
    "id": "map-old-drift-lodge",
    "name": "Old Drift Lodge",
    "address": "Zambezi National Park Riverfront, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.898,
    "longitude": 25.775,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 650,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.9,
    "amenities": [
      "Inside Zambezi National Park",
      "Luxury Safari Tents",
      "Private Outdoor Slipper Baths",
      "River Safari Included"
    ],
    "inquireOnlyNotice": "Wilderness park concession property. Concierge booking recommended."
  },
  {
    "id": "map-vic-falls-river-lodge",
    "name": "Victoria Falls River Lodge",
    "address": "Zambezi National Park Island, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.885,
    "longitude": 25.742,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 820,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.9,
    "amenities": [
      "Island Treehouse Suites",
      "Private Plunge Pools",
      "Stargazing Beds",
      "Private Safari Vehicles & Boats"
    ],
    "inquireOnlyNotice": "Ultra-exclusive private island safari lodge. Inquire directly with concierge."
  },
  {
    "id": "map-stanley-livingstone",
    "name": "Stanley & Livingstone Boutique Hotel",
    "address": "Victoria Falls Private Game Reserve, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.985,
    "longitude": 25.815,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 540,
    "photo": "/images/activities/game-drive-lions.jpg",
    "rating": 4.8,
    "amenities": [
      "Private Big 5 Reserve",
      "Boutique Luxury Suites",
      "Gourmet Restaurant",
      "Helipad on Site"
    ],
    "inquireOnlyNotice": "Reference property on private wildlife concession. Inquire for bespoke packages."
  },
  {
    "id": "map-batonka-lodge",
    "name": "Batonka Guest Lodge",
    "address": "1 Batoka Ave, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.935,
    "longitude": 25.831,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 210,
    "photo": "/images/lodges/village-restaurant.jpg",
    "rating": 4.8,
    "amenities": [
      "Eco-Friendly Boutique",
      "Swimming Pool",
      "Manicured Gardens",
      "Quiet Residential Area",
      "Curated Art"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-bayete-lodge",
    "name": "Bayete Guest Lodge",
    "address": "566 Manyika Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.938,
    "longitude": 25.829,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 165,
    "photo": "/images/lodges/village-bar-lounge.jpg",
    "rating": 4.7,
    "amenities": [
      "Family-Run Atmosphere",
      "Teak Bar & Boma",
      "Pool Area",
      "Delicious Home Cooking"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-pioneers-lodge",
    "name": "Pioneers Lodge",
    "address": "Cnr Dale & Robert Koch, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.942,
    "longitude": 25.826,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 175,
    "photo": "/images/lodges/standard-double-room.jpg",
    "rating": 4.8,
    "amenities": [
      "Classic Settler Decor",
      "Solar-Powered",
      "Two Swimming Pools",
      "Coffee Bar & Spa",
      "Air-Conditioned"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-cresta-sprayview",
    "name": "Cresta Sprayview Hotel",
    "address": "Cnr Reynard & Livingstone Way, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9315,
    "longitude": 25.834,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 140,
    "photo": "/images/lodges/standard-room.jpg",
    "rating": 4.4,
    "amenities": [
      "Large Swimming Pool",
      "Al Fresco Restaurant",
      "Conference Facilities",
      "Close to Town"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-rainbow-hotel",
    "name": "Victoria Falls Rainbow Hotel",
    "address": "281 Parkway Dr, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.933,
    "longitude": 25.832,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 130,
    "photo": "/images/lodges/standard-room.jpg",
    "rating": 4.3,
    "amenities": [
      "Moorish Architecture",
      "Rooftop Panorama Bar",
      "Swim-Up Pool Bar",
      "Free Wi-Fi"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-shoestrings",
    "name": "Shoestrings Backpackers Lodge",
    "address": "12 West Dr, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.93,
    "longitude": 25.835,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 25,
    "photo": "/images/lodges/safari-camp-dome.jpg",
    "rating": 4.2,
    "amenities": [
      "Legendary Backpacker Bar",
      "Swimming Pool",
      "Hostel Dorms & Private Rooms",
      "Nightly Events & Pizza"
    ],
    "inquireOnlyNotice": "Budget backpacker reference listing. Contact concierge for group bookings."
  },
  {
    "id": "map-savanna68",
    "name": "Savanna68 Hotel",
    "address": "68 Spencer Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9325,
    "longitude": 25.8315,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 190,
    "photo": "/images/lodges/deluxe-double-room.jpg",
    "rating": 4.9,
    "amenities": [
      "Top Rated 9.3/10",
      "Outdoor Swimming Pool",
      "Tropical Garden",
      "Modern Air-Conditioned Rooms",
      "Airport Shuttle"
    ],
    "inquireOnlyNotice": "Highly rated boutique hotel on Booking.com. Inquire with concierge for available dates."
  },
  {
    "id": "map-courtney-lodge",
    "name": "The Courtney Lodge",
    "address": "35 Courtney Selous Cres, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9345,
    "longitude": 25.8285,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 185,
    "photo": "/images/lodges/village-restaurant.jpg",
    "rating": 4.8,
    "amenities": [
      "Quiet Residential Setting",
      "Outdoor Pool",
      "Lush Gardens",
      "Complimentary Breakfast",
      "Personalized Service"
    ],
    "inquireOnlyNotice": "Peaceful boutique retreat. Inquire with concierge to check availability."
  },
  {
    "id": "map-safari-club",
    "name": "Victoria Falls Safari Club",
    "address": "Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9145,
    "longitude": 25.811,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 580,
    "photo": "/images/activities/zambezi-game-drive.jpg",
    "rating": 4.9,
    "amenities": [
      "Private Butler Service",
      "Dedicated Club Lounge",
      "Infinity Lap Pool",
      "Complimentary Afternoon Tea & Cocktails",
      "Waterhole View"
    ],
    "inquireOnlyNotice": "Exclusive 5-star club wing. Concierge booking recommended."
  },
  {
    "id": "map-safari-suites",
    "name": "Victoria Falls Safari Suites",
    "address": "Stand 471 Squire Cummings Ave, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9155,
    "longitude": 25.812,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 650,
    "photo": "/images/activities/game-drive-lions.jpg",
    "rating": 4.8,
    "amenities": [
      "2 & 3 Bedroom Family Suites",
      "Spacious Lounges",
      "Private Patios",
      "Wildlife Viewing Deck"
    ],
    "inquireOnlyNotice": "Ideal for families and small groups. Inquire with concierge."
  },
  {
    "id": "map-lokuthula-lodges",
    "name": "Lokuthula Lodges",
    "address": "Squire Cummings Ave, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.916,
    "longitude": 25.813,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 195,
    "photo": "/images/lodges/village-restaurant.jpg",
    "rating": 4.7,
    "amenities": [
      "Self-Catering Thatched Lodges",
      "Teak Forest Setting",
      "Free-form Pool",
      "Boma Restaurant Access",
      "Family Friendly"
    ],
    "inquireOnlyNotice": "Rustic family-friendly chalets. Inquire with concierge."
  },
  {
    "id": "map-shongwe-lookout",
    "name": "Shongwe Lookout Guest Lodge",
    "address": "645 Reynard Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.937,
    "longitude": 25.827,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 220,
    "photo": "/images/lodges/chalet-entrance.jpg",
    "rating": 4.8,
    "amenities": [
      "2-Story Viewing Tower",
      "Views of Falls Spray Plume",
      "Craft Cocktail Bar",
      "Infinity Pool",
      "Artisanal Dining"
    ],
    "inquireOnlyNotice": "Unique architectural lookout lodge. Inquire with concierge."
  },
  {
    "id": "map-528-vicfalls",
    "name": "528 Victoria Falls Guest House",
    "address": "528 Reynard Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.936,
    "longitude": 25.828,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 180,
    "photo": "/images/lodges/deluxe-bathroom.jpg",
    "rating": 4.8,
    "amenities": [
      "Boutique Design",
      "Rooftop Sunset Bar",
      "Personalized Hospitality",
      "Pool in Garden"
    ],
    "inquireOnlyNotice": "Intimate boutique lodge. Inquire with concierge."
  },
  {
    "id": "map-n1-hotel",
    "name": "N1 Hotel Victoria Falls",
    "address": "266 Adam Stander Dr, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9295,
    "longitude": 25.8375,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 85,
    "photo": "/images/lodges/standard-room.jpg",
    "rating": 4.2,
    "amenities": [
      "Central Town Location",
      "Modern Air-Conditioned Rooms",
      "Outdoor Pool",
      "Convenience Store on Site"
    ],
    "inquireOnlyNotice": "Budget town center hotel. Inquire with concierge."
  },
  {
    "id": "map-waterfront",
    "name": "The Victoria Falls Waterfront",
    "address": "Sichango Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.9015,
    "longitude": 25.848,
    "isBookablePartner": true,
    "locationVerifiedByStaff": true,
    "partnerId": "partner-waterfront",
    "startingPriceUSD": 120,
    "photo": "/images/destinations/livingstone-island.jpg",
    "rating": 4.6,
    "amenities": [
      "Zambezi Riverfront Deck",
      "Two Swimming Pools",
      "Sunset Deck Restaurant & Bar",
      "Activity Booking Center"
    ]
  },
  {
    "id": "map-royal-livingstone",
    "name": "The Royal Livingstone by Anantara",
    "address": "Mosi-oa-Tunya National Park, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.915,
    "longitude": 25.858,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 620,
    "photo": "/images/destinations/livingstone-island.jpg",
    "rating": 4.9,
    "amenities": [
      "5-Star Luxury Resort",
      "Free Unlimited Access to Falls (Zambia)",
      "Zebras & Giraffes on Grounds",
      "Sundowner Deck on Zambezi"
    ],
    "inquireOnlyNotice": "Premier luxury Zambian resort. Inquire with concierge for preferred riverfront suites."
  },
  {
    "id": "map-radisson-blu-livingstone",
    "name": "Radisson Blu Mosi-oa-Tunya Livingstone Resort",
    "address": "Mosi-oa-Tunya Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.899,
    "longitude": 25.851,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 380,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.9,
    "amenities": [
      "New 5-Star River Resort",
      "Riverfront Infinity Pool",
      "Full Spa & Fitness Center",
      "Zambezi Sunset Cruises",
      "Fine Dining"
    ],
    "inquireOnlyNotice": "Brand-new 5-star luxury resort on Booking.com. Inquire with concierge."
  },
  {
    "id": "map-avani-vic-falls",
    "name": "Avani Victoria Falls Resort",
    "address": "Mosi-oa-Tunya National Park, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.918,
    "longitude": 25.856,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 280,
    "photo": "/images/destinations/livingstone-island.jpg",
    "rating": 4.6,
    "amenities": [
      "Free Unlimited Access to the Falls",
      "Vibrant African Architecture",
      "Massive Central Pool",
      "Family Friendly"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-david-livingstone",
    "name": "The David Livingstone Safari Lodge & Spa",
    "address": "Riverside Dr, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.882,
    "longitude": 25.823,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 310,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.7,
    "amenities": [
      "Private River Facing Balconies",
      "The Lady Livingstone River Boat",
      "Galtent Spa",
      "Zambezi Sunset Views"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-tongabezi",
    "name": "Tongabezi Lodge",
    "address": "Upper Zambezi Riverbank, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.81,
    "longitude": 25.72,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 850,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.9,
    "amenities": [
      "Ultra-Luxury Open-Fronted Houses",
      "Private Valet Service",
      "Floating Sampan Dining",
      "Included Safari Excursions"
    ],
    "inquireOnlyNotice": "World-renowned romantic retreat. Concierge inquiry required."
  },
  {
    "id": "map-waterberry-lodge",
    "name": "Waterberry Zambezi Lodge",
    "address": "Sunway Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.83,
    "longitude": 25.75,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 420,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.8,
    "amenities": [
      "Secluded Riverbank Location",
      "Floating Pontoon Deck",
      "Island Picnics",
      "Birding Specialization"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-jollyboys",
    "name": "Jollyboys Backpackers & Camp",
    "address": "Kajokoto Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.848,
    "longitude": 25.856,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 20,
    "photo": "/images/lodges/safari-camp-dome.jpg",
    "rating": 4.4,
    "amenities": [
      "Zambia's Premier Backpacker Lodge",
      "Swimming Pool",
      "Travel Desk",
      "Free Daily Falls Shuttle"
    ],
    "inquireOnlyNotice": "Budget accommodation reference. Inquire for private rooms."
  },
  {
    "id": "map-river-club",
    "name": "The River Club",
    "address": "Farm 293a, Zambezi Riverfront, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.825,
    "longitude": 25.735,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 690,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.9,
    "amenities": [
      "Edwardian Manor Architecture",
      "Spectacular River Vistas",
      "Infinity Pool",
      "Tennis Court & Snooker Room"
    ],
    "inquireOnlyNotice": "Exclusive luxury Edwardian river retreat. Inquire with concierge."
  },
  {
    "id": "map-sussi-chuma",
    "name": "Sanctuary Sussi & Chuma Lodge",
    "address": "Mosi-oa-Tunya National Park, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.892,
    "longitude": 25.834,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 780,
    "photo": "/images/activities/game-drive-lions.jpg",
    "rating": 4.9,
    "amenities": [
      "Luxury Elevated Treehouses",
      "Inside National Park",
      "Private Plunge Pools",
      "Game Drives & Walking Safaris"
    ],
    "inquireOnlyNotice": "Ultra-luxury treehouse safari lodge. Inquire with concierge."
  },
  {
    "id": "map-chrismar-livingstone",
    "name": "Chrismar Hotel Livingstone",
    "address": "Maramba Riverfront, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.889,
    "longitude": 25.842,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 150,
    "photo": "/images/lodges/village-restaurant.jpg",
    "rating": 4.5,
    "amenities": [
      "Pool with Waterfall Feature",
      "Brasserie Restaurant",
      "Surrounded by Nature Reserve",
      "Air-Conditioned"
    ],
    "inquireOnlyNotice": "Tranquil riverfront hotel. Inquire with concierge."
  },
  {
    "id": "map-maramba-lodge",
    "name": "Maramba River Lodge",
    "address": "Plot 481, Mosi-oa-Tunya Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.891,
    "longitude": 25.845,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 115,
    "photo": "/images/lodges/chalet-entrance.jpg",
    "rating": 4.6,
    "amenities": [
      "Frequent Elephant Visits",
      "Maramba River Overlook",
      "Thatched Chalets & Safari Tents",
      "Rock Pool"
    ],
    "inquireOnlyNotice": "Beloved riverside wildlife lodge. Inquire with concierge."
  },
  {
    "id": "map-sindabezi-island",
    "name": "Sindabezi Island Camp",
    "address": "Sindabezi Island, Zambezi River, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.805,
    "longitude": 25.715,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 740,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.9,
    "amenities": [
      "Private Bush Camp on Island",
      "Fodder-Free Eco Island",
      "Open-Sided Thatched Chalets",
      "Starlit Dinners"
    ],
    "inquireOnlyNotice": "Fodor's Top 10 Eco Lodges in the World. Inquire with concierge."
  },
  {
    "id": "map-vic-backpackers-zambia",
    "name": "Victoria Falls Backpackers Zambia",
    "address": "Plot 442, Zambezi Way, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.852,
    "longitude": 25.859,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 22,
    "photo": "/images/lodges/safari-camp-dome.jpg",
    "rating": 4.3,
    "amenities": [
      "Outdoor Pool",
      "Climbing Wall",
      "Lush Tropical Garden",
      "Communal Kitchen & Bar"
    ],
    "inquireOnlyNotice": "Backpacker hostel listing. Inquire with concierge."
  },
  {
    "id": "map-chanters-lodge",
    "name": "Chanters Lodge Livingstone",
    "address": "Lukulu Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.846,
    "longitude": 25.854,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 85,
    "photo": "/images/lodges/standard-room.jpg",
    "rating": 4.4,
    "amenities": [
      "Historic Town Lodge",
      "Famous English Breakfast",
      "Pool & Gardens",
      "Family Rooms"
    ],
    "inquireOnlyNotice": "Historic town guesthouse. Inquire with concierge."
  },
  {
    "id": "map-chobe-safari",
    "name": "Chobe Safari Lodge",
    "address": "President Ave, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.805,
    "longitude": 25.148,
    "isBookablePartner": true,
    "locationVerifiedByStaff": true,
    "partnerId": "partner-chobe-safari",
    "startingPriceUSD": 240,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.7,
    "amenities": [
      "Direct Chobe Riverfront",
      "Bordering Chobe National Park",
      "Safari Boat Fleet",
      "Pool with River View",
      "Squash Court"
    ]
  },
  {
    "id": "map-chobe-game-lodge",
    "name": "Chobe Game Lodge",
    "address": "Inside Chobe National Park, Botswana",
    "destination": "CHOBE",
    "latitude": -17.82,
    "longitude": 25.075,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 890,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.9,
    "amenities": [
      "Only Permanent Lodge Inside Chobe NP",
      "All-Female Guiding Team (Chobe Angels)",
      "Electric Safari Boats & 4x4s",
      "Boardwalk"
    ],
    "inquireOnlyNotice": "Iconic luxury lodge inside the National Park. Concierge direct inquiry required."
  },
  {
    "id": "map-elephant-valley",
    "name": "Elephant Valley Lodge",
    "address": "Kasane Forest Reserve, Chobe, Botswana",
    "destination": "CHOBE",
    "latitude": -17.85,
    "longitude": 25.21,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 410,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.7,
    "amenities": [
      "Active Waterhole on Site",
      "Luxury Safari Tents",
      "Open Vehicle Game Drives",
      "Chobe River Boat Cruises"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-muchenje-lodge",
    "name": "Muchenje Safari Lodge",
    "address": "Western Chobe National Park, Botswana",
    "destination": "CHOBE",
    "latitude": -17.925,
    "longitude": 24.81,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 520,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.8,
    "amenities": [
      "Panoramic Escarpment Views",
      "Private Western Chobe Access",
      "Night Drives in Forest Reserve",
      "Walking Safaris"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-ngoma-lodge",
    "name": "Ngoma Safari Lodge",
    "address": "Chobe Forest Reserve, Botswana",
    "destination": "CHOBE",
    "latitude": -17.915,
    "longitude": 24.78,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 720,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.9,
    "amenities": [
      "Chobe River Floodplain Vistas",
      "Private Plunge Pools",
      "Game Drives & River Safaris",
      "Luxury Suites"
    ],
    "inquireOnlyNotice": "Luxury boutique safari lodge. Concierge inquiry required."
  },
  {
    "id": "map-camp-kuzuma",
    "name": "Camp Kuzuma",
    "address": "Kazuma Forest Reserve, Chobe, Botswana",
    "destination": "CHOBE",
    "latitude": -18.25,
    "longitude": 25.55,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 450,
    "photo": "/images/activities/chobe-camping-safari.jpg",
    "rating": 4.8,
    "amenities": [
      "Busy Elephant Waterhole",
      "Eco-Luxury Safari Tents",
      "Spa & Wellness Tent",
      "Night Game Drives"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-bakwena-lodge",
    "name": "Bakwena Lodge",
    "address": "Kazungula, Chobe Riverbank, Botswana",
    "destination": "CHOBE",
    "latitude": -17.795,
    "longitude": 25.24,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 380,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.8,
    "amenities": [
      "Eco-Conscious River Lodge",
      "Natural Filtered Swimming Pool",
      "River & Tree Chalets",
      "Gourmet Local Dining"
    ],
    "inquireOnlyNotice": "Reference listing only. Inquire with concierge."
  },
  {
    "id": "map-zambezi-queen",
    "name": "Zambezi Queen Luxury River Safari",
    "address": "Chobe River / Sedudu Island Channel, Botswana",
    "destination": "CHOBE",
    "latitude": -17.81,
    "longitude": 25.135,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 1050,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.9,
    "amenities": [
      "Floating 5-Star Boutique Hotel",
      "Air-Conditioned Balcony Suites",
      "Plunge Pool on Top Deck",
      "Tender Boat Wildlife Safaris"
    ],
    "inquireOnlyNotice": "Premier luxury houseboat experience on the Chobe River. Inquire for 2, 3, or 4-night sailings."
  },
  {
    "id": "map-chobe-river-cottages",
    "name": "Chobe River Cottages",
    "address": "Plot 860, President Ave, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.808,
    "longitude": 25.152,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 140,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.9,
    "amenities": [
      "Top Rated 9.0/10 on Booking.com",
      "Self-Catering Luxury Cottages",
      "Riverfront Verandas",
      "Swimming Pool",
      "Safari Desk"
    ],
    "inquireOnlyNotice": "Top-rated Kasane cottages on Booking.com. Inquire with concierge."
  },
  {
    "id": "map-river-view-lodge",
    "name": "River View Lodge",
    "address": "Plot 1146, Kazungula, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.798,
    "longitude": 25.235,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 195,
    "photo": "/images/activities/riversong-sunset-cruise.jpg",
    "rating": 4.8,
    "amenities": [
      "Chobe Riverfront Location",
      "Manicured Tropical Lawns",
      "Swimming Pool",
      "Private Verandas",
      "Bar & Restaurant"
    ],
    "inquireOnlyNotice": "Charming riverside boutique lodge. Inquire with concierge."
  },
  {
    "id": "map-travelodge-kasane",
    "name": "Travelodge Kasane",
    "address": "Plot 2383, Along A33 Highway, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.818,
    "longitude": 25.16,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 110,
    "photo": "/images/lodges/standard-double-room.jpg",
    "rating": 4.6,
    "amenities": [
      "Rated 8.7/10 on Booking.com",
      "Outdoor Swimming Pool",
      "Modern Air-Conditioned Rooms",
      "Restaurant & Conference Facilities"
    ],
    "inquireOnlyNotice": "Modern 3-star Kasane hotel. Inquire with concierge."
  },
  {
    "id": "map-chobe-water-villas",
    "name": "Chobe Water Villas",
    "address": "Kasika Conservancy, Chobe Riverfront, Botswana/Namibia",
    "destination": "CHOBE",
    "latitude": -17.785,
    "longitude": 25.175,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 890,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.9,
    "amenities": [
      "Exceptional 9.4/10 Rating",
      "Stilted Water Villas Over Chobe River",
      "Floor-to-Ceiling Glass Fronts",
      "All-Inclusive Luxury Safari"
    ],
    "inquireOnlyNotice": "Spectacular luxury water villas. Concierge direct inquiry required."
  },
  {
    "id": "map-tlou-safari-lodge",
    "name": "Tlou Safari Lodge",
    "address": "Plot 931, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.812,
    "longitude": 25.155,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 130,
    "photo": "/images/lodges/chalet-entrance.jpg",
    "rating": 4.6,
    "amenities": [
      "Thatched Safari Chalets",
      "Swimming Pool",
      "Bar & Braai Facilities",
      "Air-Conditioned Rooms"
    ],
    "inquireOnlyNotice": "Comfortable safari lodge. Inquire with concierge."
  },
  {
    "id": "map-sanctuary-chobe-chilwero",
    "name": "Sanctuary Chobe Chilwero",
    "address": "Kasane Hill, Chobe, Botswana",
    "destination": "CHOBE",
    "latitude": -17.822,
    "longitude": 25.142,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 980,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.9,
    "amenities": [
      "Hilltop Panoramic Views of Chobe Floodplain",
      "Full Safari Spa with Treetop Treatment Rooms",
      "Split-Level Swimming Pool",
      "Gourmet Dining"
    ],
    "inquireOnlyNotice": "Ultra-exclusive Sanctuary retreat. Inquire with concierge."
  },
  {
    "id": "map-kubu-lodge",
    "name": "Kubu Lodge",
    "address": "Plot 1150, Kazungula Riverfront, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.792,
    "longitude": 25.245,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 320,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.8,
    "amenities": [
      "Historic Classic Thatched Lodge",
      "Giant Ebony & Wild Fig Trees",
      "Riverfront Pool",
      "Nature Trail & Private Jetty"
    ],
    "inquireOnlyNotice": "Historic tranquil river lodge. Inquire with concierge."
  },
  {
    "id": "map-chobe-bush-lodge",
    "name": "Chobe Bush Lodge",
    "address": "President Ave, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.807,
    "longitude": 25.146,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 220,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.7,
    "amenities": [
      "Contemporary Bush Architecture",
      "Pool & Lounge Deck",
      "Adjacent to Chobe NP Entry Gate",
      "River & Game Safari Access"
    ],
    "inquireOnlyNotice": "Popular modern companion lodge in Kasane. Inquire with concierge."
  },
  {
    "id": "map-elephant-hills",
    "name": "Elephant Hills Resort & Conference Centre",
    "address": "Stand 700 Parkway Dr, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9215,
    "longitude": 25.8125,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 220,
    "photo": "/images/activities/elephant-interaction.jpg",
    "rating": 4.5,
    "amenities": [
      "18-Hole Championship Golf Course",
      "Panoramic Zambezi River Views",
      "4 Swimming Pools",
      "On-Site Curio & Craft Market",
      "Conference Facilities"
    ],
    "inquireOnlyNotice": "Iconic resort with Zimbabwe's premier golf course. Inquire with concierge."
  },
  {
    "id": "map-mbano-manor",
    "name": "Mbano Manor Hotel",
    "address": "16 Courtney Selous Crescent, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9342,
    "longitude": 25.829,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 380,
    "photo": "/images/lodges/deluxe-double-room.jpg",
    "rating": 4.9,
    "amenities": [
      "5-Star Boutique Luxury",
      "Vintage Art Deco Interiors",
      "Infinity Pool & Sun Deck",
      "Fine Dining à la Carte",
      "Spa & Wellness Centre"
    ],
    "inquireOnlyNotice": "Opulent boutique manor. Inquire with concierge for exclusive suite availability."
  },
  {
    "id": "map-insika-lodge",
    "name": "Insika Lodge",
    "address": "20 Manyika Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9395,
    "longitude": 25.8255,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 195,
    "photo": "/images/lodges/deluxe-bathroom.jpg",
    "rating": 4.8,
    "amenities": [
      "Fitness Room & Sauna",
      "Outdoor Swimming Pool",
      "Manicured Gardens",
      "Complimentary Breakfast",
      "Modern Air-Conditioned Rooms"
    ],
    "inquireOnlyNotice": "Popular mid-range boutique lodge. Inquire with concierge."
  },
  {
    "id": "map-kabakwe-lodge",
    "name": "Kabakwe Guest Lodge",
    "address": "12 Manyika Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9405,
    "longitude": 25.8245,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 145,
    "photo": "/images/lodges/standard-double-room.jpg",
    "rating": 4.7,
    "amenities": [
      "Exceptional Cleanliness",
      "Beautiful Garden Surroundings",
      "Peaceful Atmosphere",
      "Outdoor Pool",
      "Personalized Hospitality"
    ],
    "inquireOnlyNotice": "Tranquil garden retreat. Inquire with concierge."
  },
  {
    "id": "map-bhejane-lodge",
    "name": "Bhejane Lodge",
    "address": "580 Reynard Rd, Victoria Falls, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.9365,
    "longitude": 25.8275,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 120,
    "photo": "/images/lodges/standard-room.jpg",
    "rating": 4.5,
    "amenities": [
      "Budget-Friendly 3-Star",
      "Swimming Pool",
      "Traditional Thatched Boma",
      "Close to Activity Centres",
      "Family Rooms Available"
    ],
    "inquireOnlyNotice": "Value-for-money lodge. Inquire with concierge."
  },
  {
    "id": "map-anantara-stanley",
    "name": "Anantara Stanley & Livingstone Boutique Hotel",
    "address": "Victoria Falls Private Game Reserve, Zimbabwe",
    "destination": "VICTORIA_FALLS",
    "latitude": -17.987,
    "longitude": 25.817,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 550,
    "photo": "/images/activities/game-drive-lions.jpg",
    "rating": 4.9,
    "amenities": [
      "5-Star Anantara Luxury Brand",
      "Private Big 5 Game Reserve",
      "Spa by Anantara",
      "Fine Dining & Wine Cellar",
      "Victoria Falls Shuttle Service"
    ],
    "inquireOnlyNotice": "World-class 5-star Anantara resort on private game reserve. Inquire with concierge."
  },
  {
    "id": "map-protea-livingstone",
    "name": "Protea Hotel by Marriott Livingstone",
    "address": "Mosi-oa-Tunya Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.856,
    "longitude": 25.857,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 175,
    "photo": "/images/lodges/village-restaurant.jpg",
    "rating": 4.6,
    "amenities": [
      "Marriott Brand Quality",
      "Central Livingstone Location",
      "Outdoor Pool & Terrace",
      "Fitness Centre",
      "Business & Leisure Lounge"
    ],
    "inquireOnlyNotice": "Reliable international brand hotel in Livingstone town centre. Inquire with concierge."
  },
  {
    "id": "map-fawlty-towers",
    "name": "Fawlty Towers Livingstone",
    "address": "216 Mosi-oa-Tunya Rd, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.853,
    "longitude": 25.858,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 35,
    "photo": "/images/lodges/safari-camp-dome.jpg",
    "rating": 4.5,
    "amenities": [
      "Legendary Backpacker Hub",
      "Swimming Pool",
      "On-Site Travel Desk",
      "Dorms & Private Rooms",
      "Central Town Location"
    ],
    "inquireOnlyNotice": "Popular Livingstone backpackers. Inquire for group bookings."
  },
  {
    "id": "map-toka-leya-camp",
    "name": "Toka Leya Camp (Wilderness Safaris)",
    "address": "Mosi-oa-Tunya National Park, Livingstone, Zambia",
    "destination": "LIVINGSTONE",
    "latitude": -17.896,
    "longitude": 25.83,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 720,
    "photo": "/images/activities/zambezi-luxury-deck.jpg",
    "rating": 4.9,
    "amenities": [
      "Ultra-Luxury Safari Tents",
      "Inside Mosi-oa-Tunya National Park",
      "Private Plunge Pools",
      "Game Drives & River Cruises Included",
      "Rhino Walking Safaris"
    ],
    "inquireOnlyNotice": "Premier Wilderness Safaris camp. Inquire with concierge for exclusive bookings."
  },
  {
    "id": "map-jackalberry-chobe",
    "name": "Jackalberry Chobe",
    "address": "Sedudu Gate Rd, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.815,
    "longitude": 25.142,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 165,
    "photo": "/images/activities/chobe-game-drive.jpg",
    "rating": 4.7,
    "amenities": [
      "Adjacent to Sedudu Gate (Chobe NP)",
      "Outdoor Pool",
      "Air-Conditioned Rooms",
      "On-Site Safari Bookings",
      "Modern Restaurant & Bar"
    ],
    "inquireOnlyNotice": "Convenient gateway hotel to Chobe National Park. Inquire with concierge."
  },
  {
    "id": "map-nxabii-cottages",
    "name": "Nxabii Cottages",
    "address": "Plot 872, President Ave, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.809,
    "longitude": 25.149,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 125,
    "photo": "/images/lodges/chalet-entrance.jpg",
    "rating": 4.8,
    "amenities": [
      "Highly Rated Hospitality",
      "Self-Catering Cottages",
      "Swimming Pool",
      "Peaceful Garden Setting",
      "Safari Desk"
    ],
    "inquireOnlyNotice": "Top-rated Kasane cottage accommodation. Inquire with concierge."
  },
  {
    "id": "map-cresta-mowana",
    "name": "Cresta Mowana Safari Resort & Spa",
    "address": "Plot 3082, President Ave, Kasane, Botswana",
    "destination": "CHOBE",
    "latitude": -17.803,
    "longitude": 25.145,
    "isBookablePartner": false,
    "locationVerifiedByStaff": true,
    "startingPriceUSD": 280,
    "photo": "/images/activities/chobe-elephants-river.jpg",
    "rating": 4.6,
    "amenities": [
      "Iconic 800-Year-Old Baobab Tree",
      "Chobe Riverfront Location",
      "Full Spa & Wellness Centre",
      "2 Swimming Pools",
      "Safari Boat & Game Drive Fleet"
    ],
    "inquireOnlyNotice": "Landmark Kasane resort centred around an ancient baobab. Inquire with concierge."
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
