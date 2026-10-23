// Generates the responsive WebP copies the site actually serves, next to each
// original. Run after adding or replacing a photo:  node scripts/optimise-images.mjs
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PRODUCTS = 'public/images/products'
const WIDTHS = [480, 960]

for (const file of await readdir(PRODUCTS)) {
  if (!file.endsWith('.jpg')) continue
  const src = path.join(PRODUCTS, file)
  const base = src.replace(/\.jpg$/, '')
  for (const w of WIDTHS) {
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(`${base}-${w}.webp`)
  }
}

// Nav logo shows at 36px tall; 2x for high-density screens.
await sharp('public/brand/wordmark.png')
  .resize({ height: 72 })
  .webp({ quality: 85 })
  .toFile('public/brand/wordmark.webp')
