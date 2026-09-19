import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const sourceDir = path.join(baseDir, 'Shearwater Agents Info Pack');
const publicImagesDir = path.join(baseDir, 'public', 'images');

const dirsToCreate = [
  path.join(publicImagesDir, 'helicopter'),
  path.join(publicImagesDir, 'explorers-village'),
  path.join(publicImagesDir, 'activities'),
  path.join(publicImagesDir, 'destinations'),
];

dirsToCreate.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function safeCopy(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${path.basename(dest)}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}

// 1. Helicopter photos
const heliSrc = path.join(sourceDir, 'Helicopter');
safeCopy(path.join(heliSrc, 'Heli -1.jpg'), path.join(publicImagesDir, 'helicopter', 'hero-angels.jpg'));
safeCopy(path.join(heliSrc, 'Heli -2.jpg'), path.join(publicImagesDir, 'helicopter', 'gorge-flight.jpg'));
safeCopy(path.join(heliSrc, 'Heli-5.jpg'), path.join(publicImagesDir, 'helicopter', 'cockpit-view.jpg'));
safeCopy(path.join(heliSrc, 'Heli-6.jpg'), path.join(publicImagesDir, 'helicopter', 'falls-rainbow.jpg'));
safeCopy(path.join(heliSrc, 'Heli-7.jpg'), path.join(publicImagesDir, 'helicopter', 'spectacular-aerial.jpg'));
safeCopy(path.join(heliSrc, 'ZHC -1.jpg'), path.join(publicImagesDir, 'helicopter', 'helipad-takeoff.jpg'));
safeCopy(path.join(heliSrc, 'ZHC -3.jpg'), path.join(publicImagesDir, 'helicopter', 'fleet-lineup.jpg'));

// 2. Explorers Village photos
const evSrc = path.join(sourceDir, 'Explorers Village');
const delSrc = path.join(evSrc, 'Deluxe rooms', 'Double room');
safeCopy(path.join(delSrc, 'del dbl room .jpg'), path.join(publicImagesDir, 'explorers-village', 'deluxe-room.jpg'));
safeCopy(path.join(delSrc, 'chalet entrance.jpg'), path.join(publicImagesDir, 'explorers-village', 'deluxe-chalet-exterior.jpg'));
safeCopy(path.join(delSrc, 'del dble bathroom 2.jpg'), path.join(publicImagesDir, 'explorers-village', 'deluxe-bathroom.jpg'));

// Check Aerial / Public Areas / Standard
const aerialFiles = fs.existsSync(path.join(evSrc, 'Aerial')) ? fs.readdirSync(path.join(evSrc, 'Aerial')) : [];
if (aerialFiles.length > 0) {
  safeCopy(path.join(evSrc, 'Aerial', aerialFiles[0]), path.join(publicImagesDir, 'explorers-village', 'village-grounds.jpg'));
}
const pubFiles = fs.existsSync(path.join(evSrc, 'Public Areas')) ? fs.readdirSync(path.join(evSrc, 'Public Areas')) : [];
if (pubFiles.length > 0) {
  safeCopy(path.join(evSrc, 'Public Areas', pubFiles[0]), path.join(publicImagesDir, 'explorers-village', 'swimming-pool.jpg'));
}
const campFiles = fs.existsSync(path.join(evSrc, 'Camping')) ? fs.readdirSync(path.join(evSrc, 'Camping')) : [];
if (campFiles.length > 0) {
  safeCopy(path.join(evSrc, 'Camping', campFiles[0]), path.join(publicImagesDir, 'explorers-village', 'camping-grounds.jpg'));
}

// 3. Other Activities
const raftingSrc = path.join(sourceDir, 'Rafting');
safeCopy(path.join(raftingSrc, 'Rafting-1.jpg'), path.join(publicImagesDir, 'activities', 'zambezi-rafting.jpg'));
safeCopy(path.join(raftingSrc, 'Rafting-3.jpg'), path.join(publicImagesDir, 'activities', 'rapid-action.jpg'));

const bungeeSrc = path.join(sourceDir, 'Bungee Jumping');
safeCopy(path.join(bungeeSrc, 'Bungee-1.jpg'), path.join(publicImagesDir, 'activities', 'bridge-bungee.jpg'));
safeCopy(path.join(bungeeSrc, 'Bungee-12.jpg'), path.join(publicImagesDir, 'activities', 'gorge-bungee-jump.jpg'));

const slideSrc = path.join(sourceDir, 'Bridge Slide');
const slideFiles = fs.existsSync(slideSrc) ? fs.readdirSync(slideSrc) : [];
if (slideFiles.length > 0) {
  safeCopy(path.join(slideSrc, slideFiles[0]), path.join(publicImagesDir, 'activities', 'bridge-slide.jpg'));
}

const cruiseSrc = path.join(sourceDir, 'Riversong Cruise');
safeCopy(path.join(cruiseSrc, 'Riversong-1.jpg'), path.join(publicImagesDir, 'activities', 'riversong-sunset-cruise.jpg'));
safeCopy(path.join(cruiseSrc, 'Riversong-3.jpg'), path.join(publicImagesDir, 'activities', 'zambezi-luxury-deck.jpg'));

const chobeSrc = path.join(sourceDir, 'Chobe Day Trip');
safeCopy(path.join(chobeSrc, 'Chobe -1.jpg'), path.join(publicImagesDir, 'activities', 'chobe-elephants-river.jpg'));
safeCopy(path.join(chobeSrc, 'Chobe -4.jpg'), path.join(publicImagesDir, 'activities', 'chobe-game-drive.jpg'));

const fallsSrc = path.join(sourceDir, 'Falls Pics');
safeCopy(path.join(fallsSrc, 'Falls 1.jpg'), path.join(publicImagesDir, 'destinations', 'victoria-falls-panoramic.jpg'));
safeCopy(path.join(fallsSrc, 'Falls 2.jpg'), path.join(publicImagesDir, 'destinations', 'victoria-falls-cataract.jpg'));
safeCopy(path.join(fallsSrc, 'Falls 3.jpg'), path.join(publicImagesDir, 'destinations', 'livingstone-devilspool.jpg'));
safeCopy(path.join(chobeSrc, 'Chobe -5.jpg'), path.join(publicImagesDir, 'destinations', 'chobe-river-safari.jpg'));

console.log('Asset setup completed!');
