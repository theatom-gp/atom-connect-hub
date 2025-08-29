#!/usr/bin/env node

/**
 * Build script for managing images and assets
 * This script helps ensure proper image handling during build and deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🖼️  Starting image build process...');

// Configuration
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DIST_ASSETS_DIR = path.join(__dirname, '../dist/assets');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.avif'];

// Ensure dist/assets directory exists
if (!fs.existsSync(DIST_ASSETS_DIR)) {
  fs.mkdirSync(DIST_ASSETS_DIR, { recursive: true });
  console.log('✅ Created dist/assets directory');
}

// Copy assets to dist directory
function copyAssets() {
  console.log('📁 Copying assets to dist directory...');
  
  try {
    // Copy all assets recursively
    copyDirectory(ASSETS_DIR, DIST_ASSETS_DIR);
    console.log('✅ Assets copied successfully');
  } catch (error) {
    console.error('❌ Error copying assets:', error);
    process.exit(1);
  }
}

// Recursively copy directory
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Validate image files
function validateImages() {
  console.log('🔍 Validating image files...');
  
  try {
    const imageFiles = findImageFiles(ASSETS_DIR);
    console.log(`📊 Found ${imageFiles.length} image files`);
    
    // Check for common issues
    for (const imageFile of imageFiles) {
      const filePath = path.join(ASSETS_DIR, imageFile);
      const stats = fs.statSync(filePath);
      
      // Check file size (warn if too large)
      const sizeInMB = stats.size / (1024 * 1024);
      if (sizeInMB > 5) {
        console.warn(`⚠️  Large image file: ${imageFile} (${sizeInMB.toFixed(2)}MB)`);
      }
      
      // Check file extension
      const ext = path.extname(imageFile).toLowerCase();
      if (!IMAGE_EXTENSIONS.includes(ext)) {
        console.warn(`⚠️  Unusual image extension: ${imageFile}`);
      }
    }
    
    console.log('✅ Image validation completed');
  } catch (error) {
    console.error('❌ Error validating images:', error);
  }
}

// Find all image files recursively
function findImageFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...findImageFiles(fullPath, relativePath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        files.push(relativePath);
      }
    }
  }
  
  return files;
}

// Generate image manifest
function generateManifest() {
  console.log('📝 Generating image manifest...');
  
  try {
    const imageFiles = findImageFiles(ASSETS_DIR);
    const manifest = {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      totalImages: imageFiles.length,
      images: imageFiles.map(file => ({
        path: file,
        size: fs.statSync(path.join(ASSETS_DIR, file)).size,
        lastModified: fs.statSync(path.join(ASSETS_DIR, file)).mtime.toISOString()
      }))
    };
    
    const manifestPath = path.join(__dirname, '../dist/image-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log('✅ Image manifest generated');
    console.log(`📊 Total images: ${manifest.totalImages}`);
  } catch (error) {
    console.error('❌ Error generating manifest:', error);
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting image build process...\n');
    
    // Validate images
    validateImages();
    console.log('');
    
    // Copy assets
    copyAssets();
    console.log('');
    
    // Generate manifest
    generateManifest();
    console.log('');
    
    console.log('🎉 Image build process completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run build');
    console.log('2. Deploy to Firebase: firebase deploy');
    console.log('3. Clear browser cache if images still show old versions');
    
  } catch (error) {
    console.error('❌ Build process failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  copyAssets,
  validateImages,
  generateManifest,
  findImageFiles
};
