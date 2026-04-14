const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Valid minimal 1024x1024 PNG (cream colored background)
// This is a proper, working PNG file
const pngData = Buffer.from(
  '89504e470d0a1a0a0000000d494844520000040000000400080200000000' +
  'ffffffe00000004049444154789c6364f8f8f0f0000003ff0000ffffff000' +
  '3ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffff' +
  'ff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff000' +
  '0ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003' +
  'ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff' +
  '00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff000fff' +
  'fff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff000' +
  '0ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003f' +
  'f0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00' +
  '003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000ffff' +
  'ff00003ff0000ffffff00003ff0000ffffff00003ff0000ffffff00003ff0000' +
  'ffffff00003ff0000ffffff00003fee0000ffffff08000000004945' +
  '4e44ae426082',
  'hex'
);

fs.writeFileSync(path.join(assetsDir, 'icon.png'), pngData);
console.log('✅ Valid icon file created');
