const fs = require('fs');
const path = require('path');

const publicImages = new Set(fs.readdirSync('public/images'));
console.log('Total files in public/images:', publicImages.size);

const results = [];

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(tsx?|jsx?|json|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /['"`]([^'"`]*\.(png|jpg|jpeg|webp|svg|gif)[^'"`]*)['"`]/gi;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const val = m[1];
        if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) continue;
        results.push({ file: fullPath, val });
      }
    }
  }
}

scanDir('src');
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf8');
  const regex = /['"`]([^'"`]*\.(png|jpg|jpeg|webp|svg|gif)[^'"`]*)['"`]/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const val = m[1];
    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) continue;
    results.push({ file: 'index.html', val });
  }
}

console.log('All image references found:', results.length);

const grouped = {};
for (const r of results) {
  if (!grouped[r.file]) grouped[r.file] = [];
  grouped[r.file].push(r.val);
}

for (const [file, items] of Object.entries(grouped)) {
  console.log(`\n--- ${file} (${items.length}) ---`);
  const uniqueItems = [...new Set(items)];
  for (const it of uniqueItems) {
    const filename = path.basename(it);
    const inPublic = publicImages.has(filename);
    const inRoot = fs.existsSync(path.join('public', it.replace(/^\//, '')));
    let status = 'OK';
    if (!it.startsWith('/images/') && !inRoot) {
      status = 'NEEDS FIX -> /images/' + filename;
    } else if (it.startsWith('/images/') && !inPublic) {
      status = 'MISSING IN public/images/';
    }
    console.log(`  ${it}  [${status}]`);
  }
}
