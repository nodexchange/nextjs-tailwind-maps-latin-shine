#!/usr/bin/env node

/**
 * Script to find remaining layout patterns that need refactoring
 * Run with: node scripts/find-layout-patterns.js
 */

const fs = require('fs');
const path = require('path');

// Patterns to search for
const patterns = [
  /bg-almostBlack text-white py-10 md:py-10 lg:py-30/g,
  /px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40/g,
  /className="[^"]*bg-almostBlack[^"]*"/g,
  /className="[^"]*bg-courseImage[^"]*"/g,
];

// Directories to search
const searchDirs = ['pages', 'components'];

function searchFile(filePath, content) {
  const results = [];
  
  patterns.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        results.push({
          file: filePath,
          pattern: index,
          match: match.substring(0, 100) + (match.length > 100 ? '...' : '')
        });
      });
    }
  });
  
  return results;
}

function searchDirectory(dir) {
  const results = [];
  
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const fileResults = searchFile(fullPath, content);
          results.push(...fileResults);
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error.message);
        }
      }
    });
  }
  
  traverse(dir);
  return results;
}

function main() {
  console.log('🔍 Searching for layout patterns that need refactoring...\n');
  
  let allResults = [];
  
  searchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const results = searchDirectory(dir);
      allResults.push(...results);
    }
  });
  
  if (allResults.length === 0) {
    console.log('✅ No layout patterns found! All files have been refactored.');
    return;
  }
  
  // Group by file
  const byFile = {};
  allResults.forEach(result => {
    if (!byFile[result.file]) {
      byFile[result.file] = [];
    }
    byFile[result.file].push(result);
  });
  
  console.log(`📋 Found ${allResults.length} instances in ${Object.keys(byFile).length} files:\n`);
  
  Object.keys(byFile).forEach(file => {
    console.log(`📄 ${file}:`);
    byFile[file].forEach(result => {
      console.log(`   - ${result.match}`);
    });
    console.log('');
  });
  
  console.log('\n💡 Refactoring suggestions:');
  console.log('   - Replace main elements with <ContentMain>');
  console.log('   - Replace section elements with <ContentSection>');
  console.log('   - Import from: import { ContentMain, ContentSection } from "../components/layout"');
}

if (require.main === module) {
  main();
} 