const fs = require('fs');
const path = require('path');

const VI_CHAR_REGEX = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;

const PRIORITY_FILES = [
  'src/pages/LoginPage.tsx',
  'src/pages/RegisterPage.tsx',
  'src/pages/AccountPage.tsx',
  'src/pages/CheckoutPage.tsx',
  'src/pages/CustomerPoliciesPage.tsx',
  'src/pages/OrdersHistoryPage.tsx',
  'src/pages/MamPointsPage.tsx',
  'src/pages/BabyInfoPage.tsx',
  'src/pages/VouchersPage.tsx',
  'src/pages/OrderConfirmationPage.tsx',
  'src/pages/OrderTrackingPage.tsx',
  'src/pages/CartPage.tsx',
  'src/pages/ProductsPage.tsx',
  'src/pages/ProductDetailPage.tsx',
  'src/components/common/Header.tsx',
  'src/components/common/Footer.tsx',
  'src/components/common/Breadcrumbs.tsx',
  'src/components/common/SizeAdvisorModal.tsx',
  'src/components/common/PersonalizationStudio.tsx',
  'src/context/CartContext.tsx',
  'src/context/AuthContext.tsx'
];

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    // Skip comments or purely import lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    // Check if line has Vietnamese characters
    if (VI_CHAR_REGEX.test(line)) {
      // Check if it's already guarded by language condition
      // Common guards: language === 'en' ? '...' : '...', isEn ?, trans., t(
      // But brand names "Mầm Kids", "Mầm Xanh", "Mầm Again" are allowed!
      let cleaned = line
        .replace(/Mầm Kids/g, '')
        .replace(/Mầm Xanh/g, '')
        .replace(/Mầm Again/g, '')
        .replace(/MẦM KIDS/g, '')
        .replace(/MẦM XANH/g, '')
        .replace(/MẦM AGAIN/g, '');

      if (!VI_CHAR_REGEX.test(cleaned)) {
        return; // Only brand names
      }

      // If line contains language === 'en' or isEn or ternary, it might be the VI branch of a bilingual check
      const isGuardedTernary = (line.includes("language === 'en'") || line.includes("language === \"en\"") || line.includes("isEn") || line.includes("lang === 'en'")) && (line.includes("?") && line.includes(":"));
      const isInsideTernaryBranch = line.includes(":") && (lines[index-1] && (lines[index-1].includes("language === 'en'") || lines[index-1].includes("isEn")));
      
      findings.push({
        lineNum: index + 1,
        text: trimmed,
        guarded: isGuardedTernary || isInsideTernaryBranch
      });
    }
  });

  return findings;
}

console.log('=== AUDIT PRIORITY FILES ===');
for (const file of PRIORITY_FILES) {
  const f = checkFile(file);
  if (f && f.length > 0) {
    const unguarded = f.filter(item => !item.guarded);
    console.log(`\nFile: ${file} (Total VI lines: ${f.length}, Unguarded: ${unguarded.length})`);
    unguarded.slice(0, 15).forEach(item => {
      console.log(`  Line ${item.lineNum}: ${item.text}`);
    });
  } else {
    console.log(`\nFile: ${file} (Clean or not found)`);
  }
}
