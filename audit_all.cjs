const fs = require('fs');
const path = require('path');

const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;
const BRANDS = ['Mầm Kids', 'Mầm Xanh', 'Mầm Again', 'Mầm Yêu Thương', 'Điểm Mầm', 'Mầm Non', 'Mầm Nhỏ', 'Cây Đại Thụ'];

function scanDir(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', '.git', 'dist'].includes(e.name)) {
        list = list.concat(scanDir(full));
      }
    } else if (e.isFile() && (e.name.endsWith('.tsx') || e.name.endsWith('.ts'))) {
      if (!e.name.includes('test') && !e.name.includes('.d.ts') && !full.includes('/data/') && !full.includes('translations.ts')) {
        list.push(full);
      }
    }
  }
  return list;
}

const files = scanDir(path.resolve('./src'));

const issues = [];

files.forEach(filePath => {
  const relPath = path.relative('./', filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    let clean = line;
    BRANDS.forEach(b => { clean = clean.split(b).join(''); });
    if (!VI.test(clean)) return;

    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('{/*')) return;

    // Check if the current line or close context contains language ternary:
    // e.g. language === 'en' ? '...' : '...'
    // If it has language === 'en' on the line, it's bilingual
    if (line.includes("language === 'en'") || line.includes("lang === 'en'")) return;

    // If it is in a ternary else branch: e.g. : 'Tiếng Việt'
    // check lines above:
    let isTernaryBranch = false;
    for (let i = 1; i <= 15; i++) {
      if (idx - i < 0) break;
      const prevLine = lines[idx - i];
      if (prevLine.includes("language === 'en'") || prevLine.includes("lang === 'en'") || prevLine.includes("isEn") || prevLine.includes("t(")) {
        isTernaryBranch = true;
        break;
      }
      // If we see another statement boundary like semicolon or return or const, stop
      if (prevLine.includes('return ') || prevLine.includes('const ') || prevLine.includes('function ')) {
        break;
      }
    }

    if (!isTernaryBranch) {
      issues.push({
        file: relPath,
        line: idx + 1,
        text: trimmed
      });
    }
  });
});

console.log(`FOUND ${issues.length} POTENTIAL ISSUES`);
const grouped = {};
issues.forEach(i => {
  grouped[i.file] = (grouped[i.file] || 0) + 1;
});
console.log(JSON.stringify(grouped, null, 2));

fs.writeFileSync('detailed_audit.json', JSON.stringify(issues, null, 2));
