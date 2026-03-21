// =============================================================
// 漢字マスター - 漢字データ生成スクリプト（全小学漢字1026字版）
// =============================================================

// raw-data.js から読み込んだ RAW_KANJI_DATA を元に、KANJI_DATA 配列を構築する
let KANJI_DATA = [];

function generateKanjiData() {
  if (typeof RAW_KANJI_DATA === 'undefined') {
    console.error("RAW_KANJI_DATA is not defined. Make sure raw-data.js is loaded first.");
    return;
  }

  const hasGrade1Data = typeof KANJI_GRADE1_DATA !== 'undefined';
  const hasGrade2Data = typeof KANJI_GRADE2_DATA !== 'undefined';
  const hasGrade3Data = typeof KANJI_GRADE3_DATA !== 'undefined';
  const hasGrade4Data = typeof KANJI_GRADE4_DATA !== 'undefined';
  const hasGrade5Data = typeof KANJI_GRADE5_DATA !== 'undefined';
  const hasGrade6Data = typeof KANJI_GRADE6_DATA !== 'undefined';
  const generated = [];

  for (const [char, info] of Object.entries(RAW_KANJI_DATA)) {
    const grade = info.grade;
    if (grade && grade >= 1 && grade <= 6) {
      // 手動データがあるかチェック
      const gradeDataMap = {
        1: hasGrade1Data ? KANJI_GRADE1_DATA : null,
        2: hasGrade2Data ? KANJI_GRADE2_DATA : null,
        3: hasGrade3Data ? KANJI_GRADE3_DATA : null,
        4: hasGrade4Data ? KANJI_GRADE4_DATA : null,
        5: hasGrade5Data ? KANJI_GRADE5_DATA : null,
        6: hasGrade6Data ? KANJI_GRADE6_DATA : null
      };
      const manualData = gradeDataMap[grade] && gradeDataMap[grade][char];

      if (manualData) {
        // ------ 手動データからの構築（1年生〜3年生共通） ------
        const gradeInfo = manualData;
        const readings = [];
        
        gradeInfo.on.forEach(on => readings.push({ type: "onyomi", reading: on }));
        gradeInfo.kun.forEach(kun => readings.push({ type: "kunyomi", reading: kun }));
        
        let exampleSentences = [];
        if (gradeInfo.examples) {
          gradeInfo.examples.forEach(ex => {
            const isOnyomi = gradeInfo.on.includes(ex.reading);
            const type = isOnyomi ? 'onyomi' : 'kunyomi';
            const cleanText = ex.text.replace(/（[^）]+）/g, '');
            const formattedText = cleanText.replace(char, `[${char}/${ex.reading}]`);
            exampleSentences.push({
              readingType: type,
              targetReading: ex.reading,
              text: formattedText
            });
          });
        }
        
        let exampleTexts = exampleSentences.slice(0, 3).map(e => e.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1（$2）'));

        generated.push({
          char: char,
          grade: grade,
          readings: readings,
          examples: exampleTexts,
          etymology: gradeInfo.etymology || "データなし",
          hint: gradeInfo.hint || "データなし",
          radicals: gradeInfo.radical ? [gradeInfo.radical] : [],
          exampleSentences: exampleSentences
        });
        
      } else {

        // ------ 2年生以降 (既存ロジック + 重複排除) ------
        const readings = [];
        const exampleSentences = [];
        
        let onTemplates = [
            "黒板の「[CHAR/READING]」という字を読む。",
            "ノートに「[CHAR/READING]」と大きく書く。",
            "テストで「[CHAR/READING]」の問題が出た。",
            "先生が「[CHAR/READING]」について説明する。"
        ];
        let kunTemplates = [
            "毎日「[CHAR/READING]」の練習をする。",
            "辞書で「[CHAR/READING]」の意味を調べる。",
            "この文章には「[CHAR/READING]」が使われている。",
            "みんなで「[CHAR/READING]」という言葉を覚える。"
        ];

        // 重複排除用Set（ひらがな化して比較）
        const readSet = new Set();

        if (Array.isArray(info.readings_on)) {
          info.readings_on.forEach(on => {
            const onClean = on.replace(/[^ァ-ン]/g, '');
            const onHiragana = katakanaToHiragana(onClean);
            if (onClean && !readSet.has(onHiragana)) {
              readSet.add(onHiragana);
              readings.push({ type: "onyomi", reading: onClean });
              const tmpl = onTemplates[Math.floor(Math.random() * onTemplates.length)];
              exampleSentences.push({
                readingType: "onyomi",
                targetReading: onClean,
                text: tmpl.replace('[CHAR/READING]', `[${char}/${onClean}]`)
              });
            }
          });
        }

        if (Array.isArray(info.readings_kun)) {
          info.readings_kun.forEach(kun => {
            const kunClean = kun.replace(/[^ぁ-ん]/g, '');
            if (kunClean && !readSet.has(kunClean)) {
              readSet.add(kunClean);
              readings.push({ type: "kunyomi", reading: kunClean });
              const tmpl = kunTemplates[Math.floor(Math.random() * kunTemplates.length)];
              exampleSentences.push({
                readingType: "kunyomi",
                targetReading: kunClean,
                text: tmpl.replace('[CHAR/READING]', `[${char}/${kunClean}]`)
              });
            }
          });
        }

        let exampleTexts = exampleSentences.slice(0, 3).map(e => e.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1（$2）'));
        let etymology = "データなし";

        generated.push({
          char: char,
          grade: grade,
          readings: readings,
          examples: exampleTexts,
          etymology: etymology,
          hint: "（自動生成データのためヒントなし）",
          radicals: [],
          exampleSentences: exampleSentences
        });
      }
    }
  }
  KANJI_DATA = generated;
  console.log(`Generated KANJI_DATA with ${KANJI_DATA.length} elementary kanjis.`);
}

// 初期化実行
generateKanjiData();


// =============================================================
// ヘルパー関数
// =============================================================

function getKanjiByGrade(grade) {
  return KANJI_DATA.filter(k => k.grade === grade);
}

function getKanjiByChar(char) {
  return KANJI_DATA.find(k => k.char === char);
}

function getGradeInfo() {
  const info = [];
  for (let g = 1; g <= 6; g++) {
    const list = getKanjiByGrade(g);
    info.push({ grade: g, count: list.length, label: `${g}年生` });
  }
  return info;
}

function katakanaToHiragana(str) {
  return str.replace(/[\u30A1-\u30F6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

function hiraganaToKatakana(str) {
  return str.replace(/[\u3041-\u3096]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

function compareReadings(a, b) {
  if (!a || !b) return false;
  const cleanA = katakanaToHiragana(a.trim()).replace(/[^ぁ-ん]/g, '');
  const cleanB = katakanaToHiragana(b.trim()).replace(/[^ぁ-ん]/g, '');
  return cleanA === cleanB;
}
