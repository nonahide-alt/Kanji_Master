const fs = require('fs');
let b = fs.readFileSync('js/data-grade2.js', 'utf8');
const appendGrade2 = `,
  "曜": {
    on: ["ヨウ"], kun: [], radical: "日",
    etymology: "日と翟（羽を高く上げて舞う）で、太陽が輝くこと。七曜（日・月・火・水・木・金・土）に使われる。",
    hint: "日にヨヨ、その下に隹（ふるとり）を書く。",
    examples: [{ reading: "ヨウ", text: "日曜日（にちようび）" }, { reading: "ヨウ", text: "今日は何曜日（なんようび）ですか" }]
  },
  "汽": {
    on: ["キ"], kun: [], radical: "氵",
    etymology: "水（さんずい）と气（水蒸気）で、お湯がわいて出る水蒸気。",
    hint: "さんずいに气（きがまえ）を書く。",
    examples: [{ reading: "キ", text: "汽車（きしゃ）に乗る" }, { reading: "キ", text: "汽笛（きてき）が鳴る" }]
  }
};
`;
b = b.replace(/}\s*};\s*$/, '}' + appendGrade2);
fs.writeFileSync('js/data-grade2.js', b);

let c = fs.readFileSync('js/data-grade4.js', 'utf8');
// Grade 4: Replace existing "賞" with full data. Find `"賞": { ... },`
c = c.replace(/"賞":\s*\{\s*on:\s*\["ショウ"\],\s*kun:\s*\[\],\s*radical:\s*"貝",\s*etymology:[^]+?hint:[^]+?\},/g, `"賞": {
    on: ["ショウ"], kun: [], radical: "貝",
    etymology: "尚（高い）と貝（お金・宝）で、手柄に与えられる「ごほうび」。",
    hint: "尚の下に貝を書く。",
    examples: [{ reading: "ショウ", text: "賞状（しょうじょう）をもらう" }]
  },`);

const appendGrade4 = `,
  "径": {
    on: ["ケイ"], kun: ["みち"], radical: "彳",
    etymology: "ぎょうにんべんと巠（たて糸）で、まっすぐな細い「みち」や、さしわたし（直径）。",
    hint: "ぎょうにんべんにスとエのように書く。",
    examples: [{ reading: "ケイ", text: "円の直径（ちょっけい）" }]
  }
};
`;
c = c.replace(/}\s*};\s*$/, '}' + appendGrade4);
fs.writeFileSync('js/data-grade4.js', c);
console.log("Done");
