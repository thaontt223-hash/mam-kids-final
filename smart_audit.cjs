const fs = require('fs');
const path = require('path');

const VI_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;
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

const files = scanDir(path.resolve('./src')).filter(f => !f.includes('translations.ts') && !f.includes('/data/'));

const unlocalized = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Check if line has Vietnamese chars
    let checkText = line;
    BRAND_TERMS.forEach(b => {
      checkText = checkText.split(b).join('');
    });
    if (!VI_CHAR_REGEX.test(checkText)) return;

    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Check surrounding 5 lines before and after for `language === 'en'` or `t(` or `lang === 'en'`
    const startIdx = Math.max(0, idx - 4);
    const endIdx = Math.min(lines.length - 1, idx + 4);
    const context = lines.slice(startIdx, endIdx + 1).join('\n');

    const hasLangGuard = context.includes("language === 'en'") || 
                          context.includes("language !== 'en'") || 
                          context.includes("language === 'vi'") || 
                          context.includes("lang === 'en'") || 
                          context.includes("t(") ||
                          context.includes("isEn");

    if (!hasLangGuard) {
      unlocalized.push({
        file: path.relative('./', file),
        line: idx + 1,
        text: trimmed
      });
    }
  });
});

console.log(`FOUND ${unlocalized.length} REAL UNLOCALIZED LINES`);
const grouped = {};
unlocalized.forEach(u => {
  grouped[u.file] = (grouped[u.file] || 0) + 1;
});
console.log(JSON.stringify(grouped, null, 2));

fs.writeFileSync('./real_unlocalized.json', JSON.stringify(unlocalized, null, 2));
