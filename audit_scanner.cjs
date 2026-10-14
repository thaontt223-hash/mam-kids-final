const fs = require('fs');
const path = require('path');

// Regex to identify Vietnamese diacritics
const VI_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;

// Known brand names to ignore or allow
const BRAND_TERMS = ['Mầm Kids', 'Mầm Xanh', 'Mầm Again', 'Mầm Yêu Thương', 'Điểm Mầm', 'Mầm Nhỏ', 'Cây Đại Thụ'];

function scanDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        scanDir(fullPath, results);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      if (!entry.name.includes('test') && !entry.name.includes('.d.ts')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allFiles = scanDir(path.resolve('./src'));

console.log(`Found ${allFiles.length} files to scan.`);

const issues = [];

allFiles.forEach(file => {
  // skip mock data or translations file if it's strictly a dictionary
  if (file.includes('LanguageContext.tsx') || file.includes('/data/')) {
    return;
  }
  
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check if line has Vietnamese characters
    if (VI_CHAR_REGEX.test(line)) {
      // Check if line has language ternary or t(...) or is inside a comment
      const trimmed = line.trim();
      if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
        return;
      }
      
      // If line contains language === 'en' or language === 'vi' or t(
      const hasLangCheck = line.includes("language === 'en'") || 
                           line.includes("language !== 'en'") || 
                           line.includes("language === 'vi'") || 
                           line.includes("lang === 'en'") ||
                           line.includes("isEn") ||
                           line.includes("t(");
      
      // If it doesn't have lang check, let's see if it's purely brand terms
      let cleaned = line;
      BRAND_TERMS.forEach(b => {
        cleaned = cleaned.split(b).join('');
      });
      
      if (VI_CHAR_REGEX.test(cleaned)) {
        if (!hasLangCheck) {
          issues.push({
            file: path.relative('./', file),
            line: index + 1,
            text: trimmed.slice(0, 120)
          });
        }
      }
    }
  });
});

console.log(`Total potential untranslated lines: ${issues.length}`);
const grouped = {};
issues.forEach(i => {
  grouped[i.file] = (grouped[i.file] || 0) + 1;
});
console.log('Summary by file:');
console.log(JSON.stringify(grouped, null, 2));

fs.writeFileSync('./audit_results.json', JSON.stringify(issues, null, 2));
