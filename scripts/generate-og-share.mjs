/**
 * Rasterize `public/assets/og-inpafrica.svg` → `public/assets/og-share.jpg` (1200×630).
 * WhatsApp / Facebook require raster og:image; SVG is ignored.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public/assets/og-inpafrica.svg");
const outPath = path.join(root, "public/assets/og-share.jpg");

await sharp(fs.readFileSync(svgPath), { density: 300 })
  .resize(1200, 630)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath);

console.log("Wrote", outPath);
