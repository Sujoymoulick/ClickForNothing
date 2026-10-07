import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import en from './locales/en.mjs';
import hi from './locales/hi.mjs';
import bn from './locales/bn.mjs';
import es from './locales/es.mjs';
import fr from './locales/fr.mjs';
import de from './locales/de.mjs';
import pt from './locales/pt.mjs';
import it from './locales/it.mjs';
import ja from './locales/ja.mjs';
import ko from './locales/ko.mjs';
import zh from './locales/zh.mjs';
import ar from './locales/ar.mjs';
import ru from './locales/ru.mjs';
import tr from './locales/tr.mjs';
import id from './locales/id.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const i18nDir = path.resolve(__dirname, '../src/i18n');

const locales = {
  en,
  hi,
  bn,
  es,
  fr,
  de,
  pt,
  it,
  ja,
  ko,
  zh,
  ar,
  ru,
  tr,
  id
};

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getAllKeys(en).sort();
console.log(`Reference locale (en) has ${enKeys.length} keys across all namespaces.`);

let hasErrors = false;

for (const [code, dict] of Object.entries(locales)) {
  const currentKeys = getAllKeys(dict).sort();
  const missingKeys = enKeys.filter(k => !currentKeys.includes(k));
  const extraKeys = currentKeys.filter(k => !enKeys.includes(k));

  if (missingKeys.length > 0) {
    console.error(`❌ Locale [${code}] is missing ${missingKeys.length} keys:`);
    missingKeys.forEach(k => console.error(`   - ${k}`));
    hasErrors = true;
  }

  if (extraKeys.length > 0) {
    console.warn(`⚠️ Locale [${code}] has ${extraKeys.length} extra keys:`);
    extraKeys.forEach(k => console.warn(`   + ${k}`));
  }

  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(`✅ Locale [${code}] matches 'en' schema perfectly (${currentKeys.length} keys).`);
  }
}

if (hasErrors) {
  console.error('\nErrors found in translations! Aborting write.');
  process.exit(1);
}

// Write out all JSON files
for (const [code, dict] of Object.entries(locales)) {
  const targetPath = path.join(i18nDir, `${code}.json`);
  fs.writeFileSync(targetPath, JSON.stringify(dict, null, 2) + '\n', 'utf-8');
  console.log(`💾 Saved ${targetPath}`);
}

console.log('\n✨ All 15 locale JSON files generated and validated successfully!');
