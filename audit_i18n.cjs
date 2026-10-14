const fs = require('fs');
const path = require('path');

function walk(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) res = res.concat(walk(full));
    else if (file.endsWith('.tsx')) res.push(full);
  });
  return res;
}

const files = walk('src');
const viRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;

let pagesWithRealIssues = [];

files.forEach(f => {
  if (f.includes('i18n')) return;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let issues = [];
  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    if (viRegex.test(trimmed)) {
      const isViField = /^\s*(vi|labelVi|titleVi|descVi|subtitleVi|stepVi|sublabelVi|detailVi|badgeVi|contentVi)\s*:\s*["`'\[]/.test(l);
      const isTernary = (l.includes('language ===') || l.includes('language !==') || l.includes('isEnglish')) && l.includes(':');
      const isTernaryBranch = trimmed.startsWith(':') || trimmed.startsWith('?') || trimmed.endsWith(':') || trimmed.endsWith('?');
      if (!isViField && !isTernary && !isTernaryBranch) {
        issues.push({ line: idx + 1, text: trimmed });
      }
    }
  });
  if (issues.length > 0) {
    pagesWithRealIssues.push({ file: f, count: issues.length, samples: issues.slice(0, 3) });
  }
});

pagesWithRealIssues.sort((a,b) => b.count - a.count);
console.log(JSON.stringify(pagesWithRealIssues, null, 2));
