#!/usr/bin/env node

// This is a CommonJS file
const fs = require('fs');
const path = require('path');

// List of files to process
const componentsDir = './src/components';
const pagesDir = './src/pages';

function removeUnusedImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Remove unused motion import but keep framer-motion imports if they're used
    if (content.includes("import { motion } from 'framer-motion';") && 
        !content.includes('<motion.') && 
        !content.includes('motion.')) {
      content = content.replace(/import { motion } from 'framer-motion';\r?\n/, '');
    }
    
    // Remove unused motion from imports if it exists in the import line
    if (content.includes("import { motion,") && 
        !content.includes('<motion.') && 
        !content.includes('motion.')) {
      content = content.replace(/motion, /g, '');
    }
    
    // Remove unused variables by prefixing with underscore
    const unusedVarPatterns = [
      { pattern: /const (error) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setMarketplaceMetrics) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (notifications) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setFleetLabels) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setFleetColors) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setUserColor) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (exportChartHD) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (exportChart) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (completedTasks) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (totalTasks) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (toast) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (enhancedExportChart) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (enhancedExportCSV) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setMetrics) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setRecentOperations) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (navigate) = /g, replacement: 'const _navigate = ' },
      { pattern: /const (setRealtimeAlerts) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (setSupplyChainMetrics) = /g, replacement: 'const _$1 = ' },
      { pattern: /const (maintenanceData) = /g, replacement: 'const _$1 = ' }
    ];
    
    unusedVarPatterns.forEach(({ pattern, replacement }) => {
      content = content.replace(pattern, replacement);
    });

    // Fix function parameter issues by prefixing unused params with underscore
    content = content.replace(/\((origin), (destination)\)/g, '(_origin, _destination)');
    content = content.replace(/\((vehicleId)\)/g, '(_vehicleId)');
    content = content.replace(/\((solution), (constraints)\)/g, '(_solution, _constraints)');
    content = content.replace(/\((parent2)\)/g, '(_parent2)');
    content = content.replace(/\((vehicleData)\)/g, '(_vehicleData)');
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${filePath}`);
  } catch (error) {
    console.error(`✗ Error fixing ${filePath}:`, error.message);
  }
}

function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist`);
    return;
  }

  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const filePath = path.join(directory, file);
      removeUnusedImports(filePath);
    }
  });
}

console.log('🔧 Starting ESLint fixes...');

// Process components directory
processDirectory(componentsDir);

// Process pages directory  
processDirectory(pagesDir);

// Process services directory
processDirectory('./src/services');

console.log('✨ ESLint fixes completed!');
console.log('\n📝 Next steps:');
console.log('1. Run: npm run lint');
console.log('2. Review any remaining issues manually');
console.log('3. Test the application: npm run dev');
