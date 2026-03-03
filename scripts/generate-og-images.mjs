import sharp from "sharp"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = join(__dirname, "..", "public")

// OG image sizes per platform
const SIZES = [
  { name: "og-image",         width: 1200, height: 630,  label: "Facebook / LinkedIn / Default" },
  { name: "og-image-twitter",  width: 1200, height: 675,  label: "Twitter / X" },
  { name: "og-image-square",   width: 1200, height: 1200, label: "WhatsApp / Square" },
]

const BG_COLOR = "#0a0f14"
const ACCENT = "#3b82f6"
const ACCENT2 = "#8b5cf6"

function buildSvg(width, height) {
  const cx = width / 2
  const titleY = height * 0.42
  const subtitleY = titleY + 52
  const taglineY = subtitleY + 40
  const isSquare = width === height

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_COLOR}"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${ACCENT}"/>
      <stop offset="100%" stop-color="${ACCENT2}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="75%" cy="25%" r="40%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="25%" cy="75%" r="35%">
      <stop offset="0%" stop-color="${ACCENT2}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${ACCENT2}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow1)"/>
  <rect width="${width}" height="${height}" fill="url(#glow2)"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Decorative corner accents -->
  <rect x="${width - 120}" y="0" width="120" height="4" fill="url(#accent)" opacity="0.6"/>
  <rect x="0" y="${height - 4}" width="120" height="4" fill="url(#accent)" opacity="0.6"/>

  <!-- Name -->
  <text x="${cx}" y="${titleY}" text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="${isSquare ? 64 : 56}" font-weight="700" fill="white" letter-spacing="-1">
    João Graça
  </text>

  <!-- Role -->
  <text x="${cx}" y="${subtitleY}" text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="${isSquare ? 26 : 22}" font-weight="500" fill="url(#accent)">
    Full-Stack Developer &amp; Designer
  </text>

  <!-- Tagline -->
  <text x="${cx}" y="${taglineY}" text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="${isSquare ? 18 : 16}" font-weight="400" fill="#94a3b8">
    Building products from wireframe to deployment
  </text>

  <!-- URL -->
  <text x="${cx}" y="${height - 32}" text-anchor="middle"
        font-family="'Courier New', monospace"
        font-size="14" font-weight="600" fill="#64748b" letter-spacing="2">
    joaograca.work
  </text>

  <!-- Divider line -->
  <rect x="${cx - 40}" y="${taglineY + 20}" width="80" height="2" rx="1" fill="url(#accent)" opacity="0.4"/>
</svg>`
}

async function main() {
  console.log("Generating OG images...")

  for (const size of SIZES) {
    const svg = buildSvg(size.width, size.height)
    const outputPath = join(OUTPUT_DIR, `${size.name}.png`)

    await sharp(Buffer.from(svg))
      .png({ quality: 90 })
      .toFile(outputPath)

    console.log(`  ${size.label}: ${size.name}.png (${size.width}x${size.height})`)
  }

  console.log("Done!")
}

main().catch(console.error)
