const fs = require('fs');

// 必要なデータをモックとして読み込むための簡易設定
const scriptCode = `
  ${fs.readFileSync('js/raw-data.js', 'utf8')}
  ${fs.readFileSync('js/data-grade1.js', 'utf8')}
  ${fs.readFileSync('js/data-grade2.js', 'utf8')}
  ${fs.readFileSync('js/data-grade3.js', 'utf8')}
  ${fs.readFileSync('js/data-grade4.js', 'utf8')}
  ${fs.readFileSync('js/data-grade5.js', 'utf8')}
  ${fs.readFileSync('js/data-grade6.js', 'utf8')}

  // js/data.js 内の generateKanjiData 関数のみを抽出するか、全体の処理をエミュレートする
  // 今回は独自のカタカナひらがな変換等を定義して検証する
  function katakanaToHiragana(str) {
    return str.replace(/[\\u30A1-\\u30F6]/g, function(match) {
      return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
  }

  let KANJI_DATA = [];

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
        const gradeInfo = manualData;
        const readings = [];
        
        if (gradeInfo.on) gradeInfo.on.forEach(on => readings.push({ type: "onyomi", reading: on }));
        if (gradeInfo.kun) gradeInfo.kun.forEach(kun => readings.push({ type: "kunyomi", reading: kun }));
        
        let exampleSentences = [];
        if (gradeInfo.examples) {
          gradeInfo.examples.forEach(ex => {
            const isOnyomi = gradeInfo.on && gradeInfo.on.includes(ex.reading);
            const type = isOnyomi ? 'onyomi' : 'kunyomi';
            const cleanText = ex.text.replace(/（[^）]+）/g, '');
            const formattedText = cleanText.replace(char, \`[\${char}/\${ex.reading}]\`);
            exampleSentences.push({
              readingType: type,
              targetReading: ex.reading,
              text: formattedText
            });
          });
        }
        
        generated.push({ char, grade, readings, exampleSentences });
      } else {
        const readings = [];
        const exampleSentences = [];
        
        const readSet = new Set();

        if (Array.isArray(info.readings_on)) {
          info.readings_on.forEach(on => {
            const onClean = on.replace(/[^ァ-ン]/g, '');
            const onHiragana = katakanaToHiragana(onClean);
            if (onClean && !readSet.has(onHiragana)) {
              readSet.add(onHiragana);
              readings.push({ type: "onyomi", reading: onClean });
              exampleSentences.push({ targetReading: onClean });
            }
          });
        }

        if (Array.isArray(info.readings_kun)) {
          info.readings_kun.forEach(kun => {
            const kunClean = kun.replace(/[^ぁ-ん]/g, '');
            if (kunClean && !readSet.has(kunClean)) {
              readSet.add(kunClean);
              readings.push({ type: "kunyomi", reading: kunClean });
              exampleSentences.push({ targetReading: kunClean });
            }
          });
        }

        generated.push({ char, grade, readings, exampleSentences });
      }
    }
  }

  const results = {
    noReadings: [],
    noExamples: [],
    noBoth: []
  };

  generated.forEach(k => {
    const hasReadings = k.readings && k.readings.length > 0;
    const hasExamples = k.exampleSentences && k.exampleSentences.length > 0;

    if (!hasReadings && !hasExamples) {
      results.noBoth.push(\`[\${k.grade}年] \${k.char}\`);
    } else if (!hasReadings) {
      results.noReadings.push(\`[\${k.grade}年] \${k.char}\`);
    } else if (!hasExamples) {
      results.noExamples.push(\`[\${k.grade}年] \${k.char}\`);
    }
  });

  console.log("=== 読みデータ(on/kun)がない漢字 ===");
  console.log(results.noReadings.length > 0 ? results.noReadings.join(", ") : "なし");
  console.log("\\n=== 例文データ(examples)がない漢字 ===");
  console.log(results.noExamples.length > 0 ? results.noExamples.join(", ") : "なし");
  console.log("\\n=== 読みも例文も両方ない漢字 ===");
  console.log(results.noBoth.length > 0 ? results.noBoth.join(", ") : "なし");
`;

fs.writeFileSync('temp_check.js', scriptCode);
