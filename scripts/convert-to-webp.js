import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, "../public");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        await convertImage(fullPath);
      }
    }
  }
}

async function convertImage(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);
  const newFilePath = path.join(dir, `${name}.webp`);

  try {
    const originalStats = fs.statSync(filePath);
    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

    console.log(
      `${colors.blue}Processing: ${path.relative(
        IMAGES_DIR,
        filePath
      )} (${originalSize} MB)${colors.reset}`
    );

    let pipeline = sharp(filePath);

    // Get metadata to check dimensions
    const metadata = await pipeline.metadata();

    if (metadata.width > 1200) {
      console.log(
        `${colors.yellow}  -> Resizing from ${metadata.width}px to 1200px${colors.reset}`
      );
      pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
    }

    // Convert to webp
    await pipeline.webp({ quality: 80 }).toFile(newFilePath);

    const newStats = fs.statSync(newFilePath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - newStats.size / originalStats.size) * 100).toFixed(
      1
    );

    console.log(
      `${colors.green}  -> Converted: ${newSize} MB (-${reduction}%)${colors.reset}`
    );

    // Optional: Delete original
    // fs.unlinkSync(filePath);
    // console.log(`${colors.red}  -> Deleted original${colors.reset}`);
  } catch (error) {
    console.error(
      `${colors.red}Error converting ${filePath}:${colors.reset}`,
      error
    );
  }
}

console.log(`${colors.blue}Starting image conversion...${colors.reset}`);
await processDirectory(IMAGES_DIR);
console.log(`${colors.green}Conversion complete!${colors.reset}`);
