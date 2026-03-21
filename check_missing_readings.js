const fs = require('fs');
const path = require('path');

const grades = [1, 2, 3, 4, 5, 6];
const baseDir = 'c:/works/Antigravity/Kanji_Master/js';

function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

function compareReadings(a, b) {
  if (!a || !b) return false;
  const cleanA = katakanaToHiragana(a.trim()).replace(/[^ぁ-ん]/g, '');
  const cleanB = katakanaToHiragana(b.trim()).replace(/[^ぁ-ん]/g, '');
  return cleanA === cleanB;
}

grades.forEach(grade => {
  const fileName = `data-grade${grade}.js`;
  const filePath = path.join(baseDir, fileName);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract kanji blocks
  // Note: This regex is a bit loose but should work for the current format
  const kanjiRegex = /"([^"]+)"\s*:\s*\{([\s\S]*?)\n\s*\},/g;
  let match;
  
  console.log(`--- Grade ${grade} ---`);
  
  while ((match = kanjiRegex.exec(content)) !== null) {
    const char = match[1];
    const block = match[2];
    
    // Extract on, kun, and examples using simple regex
    const onMatch = block.match(/on\s*:\s*\[([^\]]*)\]/);
    const kunMatch = block.match(/kun\s*:\s*\[([^\]]*)\]/);
    const examplesMatch = block.match(/examples\s*:\s*\[([\s\S]*?)\]/);
    
    if (!onMatch || !examplesMatch) continue;
    
    const onReadings = onMatch[1].split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
    const kunReadings = kunMatch ? kunMatch[1].split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s) : [];
    const allReadings = [...onReadings, ...kunReadings];
    
    // Extract readings from examples
    const exampleReadings = [];
    const exampleRegex = /reading\s*:\s*"([^"]+)"/g;
    let exMatch;
    while ((exMatch = exampleRegex.exec(examplesMatch[1])) !== null) {
      exampleReadings.push(exMatch[1]);
    }
    
    // Check if any example reading is missing from allReadings
    const missing = exampleReadings.filter(er => !allReadings.some(ar => ar === er));
    
    if (missing.length > 0) {
      console.log(`Kanji: ${char} | Base Readings: [${allReadings.join(', ')}] | Missing in Base: [${missing.join(', ')}]`);
    }
  }
});
