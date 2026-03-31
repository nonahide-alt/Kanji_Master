// =============================================================
// 漢字マスター - 書きテスト
// =============================================================

const TestWriting = {
  questions: [],
  currentIndex: 0,
  answers: [],
  currentGrade: null,
  answered: false,
  isAnswerShown: false,

  start(grade) {
    this.currentGrade = grade;
    this.currentIndex = 0;
    this.answers = [];
    this.answered = false;
    this.isAnswerShown = false;
    this.questions = this.generateQuestions(grade);
    this.renderQuestion();
  },

  startRetry(failedQuestions, grade) {
    this.currentGrade = grade;
    this.currentIndex = 0;
    this.answers = [];
    this.answered = false;
    this.isAnswerShown = false;
    this.questions = this.shuffle([...failedQuestions]).map(q => {
      const k = getKanjiByChar(q.char);
      let text = `[${q.char}/${q.targetReading}]`;
      if (k && k.exampleSentences) {
        const sentenceObj = k.exampleSentences.find(s => s.readingType === q.readingType && s.targetReading === q.targetReading);
        if (sentenceObj) text = sentenceObj.text;
      }
      return {
        char: q.char,
        readingType: q.readingType,
        targetReading: q.targetReading, // 書き問題のtargetReadingは表示される読み
        text: text,
        allReadings: k ? k.readings.map(r => `${r.type === 'onyomi' ? '音' : '訓'}：${r.reading}`).join('　') : ''
      };
    });
    this.renderQuestion();
  },

  generateQuestions(grade, count = 5) {
    const kanjiList = getKanjiByGrade(grade);
    
    // マスターしていない漢字（優先）とマスター済みの漢字に分ける
    const unmastered = [];
    const mastered = [];
    kanjiList.forEach(k => {
      if (Storage.getKanjiStatus(k.char, 'writing').color === 'blue') {
        mastered.push(k);
      } else {
        unmastered.push(k);
      }
    });

    this.shuffle(unmastered);
    this.shuffle(mastered);

    let selected = [];
    if (unmastered.length >= count) {
      selected = unmastered.slice(0, count);
    } else {
      selected = [...unmastered, ...mastered.slice(0, count - unmastered.length)];
    }
    
    // 抽出された問題をさらにシャッフルして出題順をランダムにする
    this.shuffle(selected);

    return selected.map(k => {
      let sentenceObj = null;
      if (k.exampleSentences && k.exampleSentences.length > 0) {
        // まだマスターしていない（filled: false）の例文を抽出
        const status = Storage.getKanjiStatus(k.char, 'writing');
        const unmasteredSentences = k.exampleSentences.filter(ex => {
          const sStar = status.sentenceStars.find(s => s.targetReading === ex.targetReading);
          return sStar && !sStar.filled;
        });

        if (unmasteredSentences.length > 0) {
          sentenceObj = unmasteredSentences[Math.floor(Math.random() * unmasteredSentences.length)];
        } else {
          sentenceObj = k.exampleSentences[Math.floor(Math.random() * k.exampleSentences.length)];
        }
      } else {
        const fallbackReading = k.readings[Math.floor(Math.random() * k.readings.length)];
        sentenceObj = {
          readingType: fallbackReading.type,
          targetReading: fallbackReading.reading,
          text: `[${k.char}/${fallbackReading.reading}]`
        };
      }

      return {
        char: k.char,
        readingType: sentenceObj.readingType,
        targetReading: sentenceObj.targetReading,
        text: sentenceObj.text,
        allReadings: k.readings.map(r => `${r.type === 'onyomi' ? '音' : '訓'}：${r.reading}`).join('　')
      };
    });
  },

  renderQuestion() {
    const container = document.getElementById('test-content');
    const q = this.questions[this.currentIndex];
    const progress = ((this.currentIndex) / this.questions.length * 100);

    // 現在の書きレベル
    const kanjiList = getKanjiByGrade(this.currentGrade);
    let writeMastered = 0;
    kanjiList.forEach(k => {
      if (Storage.getKanjiStatus(k.char, 'writing').color === 'blue') writeMastered++;
    });
    const totalKanji = kanjiList.length;
    const writePercent = totalKanji > 0 ? Math.floor((writeMastered / totalKanji) * 100) : 0;
    const nextLevelProgress = (writePercent % 10) * 10;

    let currentWriteLevel = Math.floor(writePercent / 10);
    if (currentWriteLevel > 10) currentWriteLevel = 10;
    const stageInfo = App.stages[currentWriteLevel] || App.stages[0];
    
    // 次のレベルまでのゲージHTML
    const gaugeHtml = currentWriteLevel < 10 ? `
      <div style="width: 40px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; margin-left: 4px; position: relative;">
        <div style="width: ${nextLevelProgress}%; height: 100%; background: var(--status-green); position: absolute; top:0; left:0; border-radius: 3px;"></div>
      </div>
    ` : `
      <div style="margin-left: 4px; font-size: 0.7rem; color: var(--status-green); font-weight: bold;">MAX</div>
    `;

    const levelHtml = `
      <div class="test-progress-level" style="margin-left: 16px; font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; display: flex; align-items: center; gap: 2px; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-size: 1.1rem;">${stageInfo.icon}</span>
        <span>✏️ Lv.${currentWriteLevel}</span>
        ${gaugeHtml}
      </div>
    `;

    // 例文中の読み部分を下線太字で表示する（書きテスト）
    const maskedSentence = q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$2</strong></u>');

    let actionAreaHtml = '';

    if (!this.isAnswerShown && !this.answered) {
      actionAreaHtml = `
        <button class="btn btn-primary test-submit-btn" style="padding: 15px 40px; font-size: 1.2rem;" onclick="TestWriting.showAnswer()">
          📖 正解を表示
        </button>
      `;
    } else if (this.isAnswerShown && !this.answered) {
      const hex = q.char.charCodeAt(0).toString(16).padStart(5, '0');
      const svgUrl = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;

      // 全文ひらがなの検索
      const plainText = q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1');
      const fullHiragana = (typeof HIRAGANA_DATA !== 'undefined' && HIRAGANA_DATA[plainText]) ? HIRAGANA_DATA[plainText] : '';
      const hiraganaSection = fullHiragana ? `<div style="margin-bottom: 20px; font-size: 0.95rem; background: var(--bg-card); border: 1px solid var(--border-glass); padding: 10px; border-radius: 6px; display: inline-block; color: var(--text-primary);">💡 全文ひらがな: <span style="font-weight: bold; color: var(--accent-cyan);">${fullHiragana}</span></div>` : '';

      actionAreaHtml = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 40px; margin: 20px 0; flex-wrap: wrap;">
          <div style="text-align: center;">
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 5px;">正解の漢字</div>
            <div class="test-correct-answer-display" style="font-size: 90px; font-weight: bold; color: #ff6b6b; font-family: 'Klee One', serif; line-height: 1;">
              ${q.char}
            </div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 5px;">書き順（画数・方向）</div>
            <div style="background: #e8e8f0; border-radius: 8px; padding: 5px; width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); margin: 0 auto;">
              <img src="${svgUrl}" alt="${q.char}の書き順" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0px 0px 1px rgba(0,0,0,0.5));">
            </div>
          </div>
        </div>
        ${hiraganaSection}
        <div style="font-size: 18px; margin-bottom: 20px; color: var(--text-primary); margin-top: 15px;">
          書き順などの手順も含めて、正しく書けましたか？
        </div>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-danger" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestWriting.submitSelfReport(false)">
            ❌ わからなかった
          </button>
          <button class="btn btn-success" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestWriting.submitSelfReport(true)">
            ⭕ あっていた！
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="test-container">
        <div class="test-progress">
          <span class="test-progress-text">問題 ${this.currentIndex + 1} / ${this.questions.length}</span>
          <div class="test-progress-bar">
            <div class="test-progress-fill" style="width: ${progress}%"></div>
          </div>
          ${levelHtml}
        </div>

        <div class="test-question-card">
          <span class="test-mode-label">${App.isRetentionTest ? '🧠 記憶定着：' : (App.isReviewTest ? '🔥 弱点克服：' : '')}書きテスト（自己申告）</span>
          <div class="test-sentence-display" style="font-size: 28px; line-height: 1.6; margin: 30px 0;">${maskedSentence}</div>
          
          <div class="test-action-area" id="test-action-area" style="min-height: 150px; display: flex; flex-direction: column; justify-content: center;">
            ${actionAreaHtml}
          </div>
          
          <div id="test-feedback"></div>
        </div>
      </div>
    `;
  },

  showAnswer() {
    this.isAnswerShown = true;
    this.renderQuestion();
  },

  submitSelfReport(isCorrect) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];

    // 履歴や結果表示のためのデータ記録
    this.answers.push({
      char: q.char,
      readingType: q.readingType,
      targetReading: q.targetReading,
      matchedReading: isCorrect ? q.targetReading : null,
      userAnswer: isCorrect ? q.char : "（書けなかった）",
      correctAnswer: q.char,
      correct: isCorrect
    });

    const isLast = this.currentIndex >= this.questions.length - 1;
    if (isLast) {
      this.finishTest();
    } else {
      this.nextQuestion();
    }
  },

  renderFeedback(isCorrect) {
    const feedbackDiv = document.getElementById('test-feedback');
    const actionArea = document.getElementById('test-action-area');
    if(actionArea) actionArea.style.display = 'none';

    if (isCorrect) {
      feedbackDiv.innerHTML = `
        <div class="test-feedback correct">
          <span class="test-feedback-icon">⭕</span>
          「あっていた」として記録しました。素晴らしい！
        </div>
      `;
    } else {
      feedbackDiv.innerHTML = `
        <div class="test-feedback incorrect">
          <span class="test-feedback-icon">❌</span>
          「わからなかった」として記録しました。何度も書いて覚えましょう！
        </div>
      `;
    }

    const isLast = this.currentIndex >= this.questions.length - 1;
    feedbackDiv.innerHTML += `
      <div style="margin-top: 20px;">
        <button class="btn btn-primary test-next-btn" style="padding: 15px 40px; font-size: 1.2rem;" onclick="TestWriting.${isLast ? 'finishTest' : 'nextQuestion'}()">
          ${isLast ? '結果を見る' : '次の問題へ →'}
        </button>
      </div>
    `;
  },

  nextQuestion() {
    this.currentIndex++;
    this.answered = false;
    this.isAnswerShown = false;
    this.renderQuestion();
  },

  finishTest() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const result = {
      date: dateStr,
      grade: this.currentGrade,
      mode: 'writing',
      questions: this.answers
    };

    Storage.saveTestResult(result);
    App.showResult(result);
  },

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};
