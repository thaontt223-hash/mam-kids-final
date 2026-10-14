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
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;
    
    if (VI_CHAR_REGEX.test(line)) {
      let cleaned = line
        .replace(/Mầm Kids/g, '')
        .replace(/Mầm Xanh/g, '')
        .replace(/Mầm Again/g, '')
        .replace(/MẦM KIDS/g, '')
        .replace(/MẦM XANH/g, '')
        .replace(/MẦM AGAIN/g, '');

      if (!VI_CHAR_REGEX.test(cleaned)) {
        return;
      }

      // Check if guarded in multi-line ternary
      let guarded = false;
      for (let offset = -3; offset <= 3; offset++) {
        const neighbor = lines[index + offset];
        if (neighbor && (neighbor.includes("language === 'en'") || neighbor.includes("language === \"en\"") || neighbor.includes("isEn") || neighbor.includes("lang === 'en'"))) {
          guarded = true;
          break;
        }
      }

      findings.push({
        lineNum: index + 1,
        text: trimmed,
        guarded
      });
    }
  });

  return findings;
}

console.log('=== AUDIT PRIORITY FILES ===');
for (const file of PRIORITY_FILES) {
  const f = checkFile(file);
  if (f) {
    const unguarded = f.filter(item => !item.guarded);
    console.log(`\nFile: ${file} (Total VI lines: ${f.length}, Unguarded: ${unguarded.length})`);
    unguarded.slice(0, 10).forEach(item => {
      console.log(`  Line ${item.lineNum}: ${item.text}`);
    });
  } else {
    console.log(`\nFile: ${file} (Not found)`);
  }
}
