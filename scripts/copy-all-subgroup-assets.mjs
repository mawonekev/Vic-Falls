import fs from 'fs';
import path from 'path';

const packDir = 'c:/Users/victo/Downloads/Vic Falls/Shearwater Agents Info Pack';
const targetDir = 'c:/Users/victo/Downloads/Vic Falls/public/images/activities';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const copyMap = [
  // Helicopter
  ['Helicopter/Heli -16.jpg', 'heli-flight-of-angels.jpg'],
  ['Helicopter/4 B. heli 30.jpg', 'heli-gorge-flight.jpg'],
  ['Helicopter/Heli -21.jpg', 'heli-zambezi-spectacular.jpg'],
  ['Helicopter/Heli -2.jpg', 'heli-cockpit.jpg'],
  
  // Rafting
  ['Rafting/Rafting-1.jpg', 'rafting-low-water.jpg'],
  ['Rafting/Rafting-2.jpg', 'rafting-high-water.jpg'],
  ['Rafting/Rafting-3.jpg', 'rapid-action.jpg'],
  ['Rafting/Rafting-4.jpg', 'rafting-multi-day.jpg'],
  ['Rafting/Rafting-5.jpg', 'zambezi-rafting.jpg'],
  
  // Bridge Adrenaline
  ['Bungee Jumping/Bungee-1.jpg', 'bridge-bungee.jpg'],
  ['Bungee Jumping/Bungee-2.jpg', 'gorge-bungee-jump.jpg'],
  ['Bungee Jumping/Bungee-3.jpg', 'big-air-combo.jpg'],
  ['Bungee Jumping/Bungee-4.jpg', 'gruesome-twosome.jpg'],
  ['Bridge Swing/Bridge Swing-1.jpg', 'bridge-swing.jpg'],
  ['Bridge Swing/Bridge Swing-2.jpg', 'bridge-swing-action.jpg'],
  ['Bridge Swing/Bridge Swing-3.jpg', 'bridge-swing-tandem.jpg'],
  ['Bridge Slide/Bridge Slide -1.jpg', 'bridge-slide.jpg'],
  ['Bridge Slide/Bridge Slide -2.jpg', 'bridge-slide-solo.jpg'],
  ['Bridge Slide/Bridge Slide -3.jpg', 'bridge-slide-tandem.jpg'],
  
  // Jetboat
  ['Adventure Jetboat/Adventure jetboat-13.jpg', 'adventure-jetboat.jpg'],
  ['Adventure Jetboat/Adventure jetboat-14.jpg', 'jetboat-rapids.jpg'],
  ['Adventure Jetboat/Adventure jetboat-15.jpg', 'jetboat-adventure-spin.jpg'],
  ['Adventure Jetboat/Adventure jetboat-16.jpg', 'jetboat-gorge-hike.jpg'],
  
  // River Cruises
  ['Riversong Cruise/Riversong-1.jpg', 'riversong-sunset-cruise.jpg'],
  ['Riversong Cruise/Lady Marilese-2.jpg', 'zambezi-luxury-deck.jpg'],
  ['Riversong Cruise/Riversong-10.jpg', 'riversong-dinner-cruise.jpg'],
  ['Standard Sunset Cruise/Standard -1.jpg', 'standard-sunset-cruise.jpg'],
  ['Standard Sunset Cruise/Standard -2.jpg', 'sunset-cruise-deck.jpg'],
  ['Morning Cruise/Morning Cruise-1.jpg', 'zambezi-sunrise-cruise.jpg'],
  ['Morning Cruise/Morning Cruise-2.jpg', 'morning-birding-cruise.jpg'],
  
  // Guided Rainforest & Bridge
  ['Guided Tour of the Falls/Tour of the Falls-1.jpg', 'guided-tour-falls.jpg'],
  ['Guided Tour of the Falls/GUIDED TOUR-1.jpg', 'guided-tour-viewpoint.jpg'],
  ['Guided Tour of the Falls/Tour of the falls-10.jpg', 'guided-tour-zambia.jpg'],
  ['Guided Tour of the Falls/Tour of the falls-11.jpg', 'lunar-rainbow-tour.jpg'],
  ['Historical Bridge Tour/Bridge Tour-1.jpg', 'bridge-tour-catwalk.jpg'],
  ['Historical Bridge Tour/BRIDGE TOUR -16.jpg', 'bridge-tour-history.jpg'],
  ['Historical Bridge Tour/Bridge Tour-08.jpg', 'bamba-tram.jpg'],
  
  // Wildlife & Safaris
  ['Elephant Safari/Elecrew-01.jpg', 'elephant-interaction.jpg'],
  ['Elephant Safari/Elecrew-02.jpg', 'through-the-eyes-elephant.jpg'],
  ['Elephant Safari/Elecrew-03.jpg', 'elephant-safari.jpg'],
  ['Game Drive/Game Drive-1.jpg', 'zambezi-game-drive.jpg'],
  ['Game Drive/Game Drive-2.jpg', 'game-drive-lions.jpg'],
  ['Game Drive/Game Drive-3.jpg', 'game-drive-afternoon.jpg'],
  ['Night Game Drive/Night Game Drive-1.jpg', 'night-game-drive.jpg'],
  ['Night Game Drive/Night Game Drive Dinner-07.jpg', 'night-bush-dinner.jpg'],
  ['Game Walk/Game Walk-1.jpg', 'zambezi-walking-safari.jpg'],
  ['Game Walk/Game Walk-2.jpg', 'game-walk-trackers.jpg'],
  ['Chobe Day Trip/Chobe -1.jpg', 'chobe-elephants-river.jpg'],
  ['Chobe Day Trip/Chobe -2.jpg', 'chobe-game-drive.jpg'],
  ['Chobe Day Trip/Chobe -3.jpg', 'chobe-camping-safari.jpg'],
  
  // Culture & Entertainment
  ['Simunye - Spirit of Africa/Simunye -01.jpg', 'simunye-spirit-of-africa.jpg'],
  ['Simunye - Spirit of Africa/Simunye -04.jpg', 'simunye-theatre-stage.jpg'],
  ['Simunye - Spirit of Africa/Simunye -05.jpg', 'simunye-acrobatics.jpg'],
  ['Traditional Village Tour/Traditional Village tour-1.jpg', 'traditional-village.jpg'],
  ['Traditional Village Tour/Traditional Village tour-2.jpg', 'dusty-road-township.jpg'],
  ['Batoka Hike & Ndebele Village Tour/Batoka Hike & Ndebele Village Tour-01.jpg', 'batoka-hike-ndebele.jpg'],
  ['Batoka Hike & Ndebele Village Tour/Batoka Hike & Ndebele Village Tour-02.jpg', 'ndebele-village.jpg']
];

console.log(`Copying ${copyMap.length} activity images...`);
let copied = 0;
let errors = 0;

for (const [srcRel, destName] of copyMap) {
  const src = path.join(packDir, srcRel);
  const dest = path.join(targetDir, destName);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      copied++;
    } else {
      console.warn(`Source not found: ${src}`);
      errors++;
    }
  } catch (err) {
    console.error(`Error copying ${src} -> ${dest}:`, err.message);
    errors++;
  }
}

console.log(`Done! Copied: ${copied}, Errors: ${errors}`);
