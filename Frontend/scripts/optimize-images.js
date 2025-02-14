import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../src/assets');
const outputDir = join(__dirname, '../src/assets/optimized');

// Delete existing optimized directory if it exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true });
}

// Create fresh output directory
fs.mkdirSync(outputDir, { recursive: true });

const optimizeImages = async () => {
  const processDirectory = async (dir) => {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const inputPath = join(dir, item.name);
      // Skip if the path contains 'optimized'
      if (inputPath.includes('optimized')) continue;
      
      const relativePath = inputPath.replace(inputDir, '');
      const outputPath = join(outputDir, relativePath);
      
      if (item.isDirectory()) {
        fs.mkdirSync(outputPath, { recursive: true });
        await processDirectory(inputPath);
      } else if (item.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        try {
          const outputDir = dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          await sharp(inputPath)
            .resize(1200, 800, { 
              fit: 'inside',
              withoutEnlargement: true 
            })
            .jpeg({ 
              quality: 80,
              progressive: true 
            })
            .toFile(outputPath);
          
          console.log(`✓ Optimized: ${relativePath}`);
        } catch (error) {
          console.error(`✗ Error optimizing ${relativePath}:`, error.message);
        }
      }
    }
  };

  try {
    await processDirectory(inputDir);
    console.log('\nImage optimization complete! ✨');
  } catch (error) {
    console.error('Failed to optimize images:', error);
  }
};

optimizeImages();