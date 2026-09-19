import fs from 'fs';
import path from 'path';

const packDir = 'c:/Users/victo/Downloads/Vic Falls/Shearwater Agents Info Pack';
const lodgesDir = 'c:/Users/victo/Downloads/Vic Falls/public/images/lodges';

const copies = [
  ['Explorers Village/Deluxe rooms/Double room/del dbl room .jpg', 'deluxe-double-room.jpg'],
  ['Explorers Village/Deluxe rooms/Double room/chalet entrance.jpg', 'chalet-entrance.jpg'],
  ['Explorers Village/Deluxe rooms/Double room/del dble bathroom 2.jpg', 'deluxe-bathroom.jpg'],
  ['Explorers Village/Standard Rooms/Double Room/Std Double Room.jpg', 'standard-double-room.jpg'],
  ['Explorers Village/Standard Rooms/Double Room/Std room.jpg', 'standard-room.jpg'],
  ['Explorers Village/Public Areas/bar.jpg', 'village-bar-lounge.jpg'],
  ['Explorers Village/Public Areas/dining area.jpg', 'village-restaurant.jpg'],
  ['Explorers Village/Aerial/aerial.jpg', 'explorers-village-aerial.jpg'],
  ['Explorers Village/Camping/camp 2.jpg', 'safari-camp-dome.jpg']
];

for (const [relSrc, destName] of copies) {
  const src = path.join(packDir, relSrc);
  const dest = path.join(lodgesDir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${relSrc} -> ${destName}`);
  }
}
