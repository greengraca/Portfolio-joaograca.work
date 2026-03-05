import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

// Navbar logo: 36px with rounded-[10px] = 27.78% ratio
const RADIUS_RATIO = 10 / 36;

const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

async function generateFavicons() {
  const source = path.join(publicDir, 'favicon-512x512.png');
  const img = sharp(source);
  const meta = await img.metadata();

  console.log(`Source: ${meta.width}x${meta.height}`);

  // Load source into buffer first so we can overwrite the 512px file too
  const sourceBuffer = await sharp(source).toBuffer();

  for (const size of sizes) {
    const radius = Math.round(size * RADIUS_RATIO);
    const roundedMask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
      </svg>`
    );

    const output = path.join(publicDir, `favicon-${size}x${size}.png`);
    await sharp(sourceBuffer)
      .resize(size, size, { fit: 'cover' })
      .composite([{
        input: roundedMask,
        blend: 'dest-in'
      }])
      .png()
      .toFile(output);

    console.log(`Generated favicon-${size}x${size}.png (radius: ${radius}px)`);
  }

  console.log('\nDone! Remember to regenerate favicon.ico from the 16/32/48px PNGs if needed.');
}

generateFavicons().catch(console.error);
