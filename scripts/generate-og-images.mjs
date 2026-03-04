import sharp from "sharp"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, "..", "public")

async function main() {
  console.log("Generating OG images from existing sources...")

  // og-image.png (1200x630) ← from og-1200x630.jpg
  await sharp(join(PUBLIC, "og-1200x630.jpg"))
    .resize(1200, 630, { fit: "cover" })
    .png({ quality: 90 })
    .toFile(join(PUBLIC, "og-image.png"))
  console.log("  og-image.png (1200x630) — Facebook / LinkedIn")

  // og-image-twitter.png (1200x675) ← from og-1200x630.jpg, slight height crop
  await sharp(join(PUBLIC, "og-1200x630.jpg"))
    .resize(1200, 675, { fit: "cover" })
    .png({ quality: 90 })
    .toFile(join(PUBLIC, "og-image-twitter.png"))
  console.log("  og-image-twitter.png (1200x675) — Twitter / X")

  // og-image-square.png (1200x1200) ← from og-1080x1080.jpg, scale up
  await sharp(join(PUBLIC, "og-1080x1080.jpg"))
    .resize(1200, 1200, { fit: "cover" })
    .png({ quality: 90 })
    .toFile(join(PUBLIC, "og-image-square.png"))
  console.log("  og-image-square.png (1200x1200) — WhatsApp / Square")

  console.log("Done!")
}

main().catch(console.error)
