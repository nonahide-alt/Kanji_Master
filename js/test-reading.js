// =============================================================
// 漢字マスター - 読みテスト
// =============================================================

const TestReading = {
  questions: [],
  currentIndex: 0,
  answers: [],
  currentGrade: null,
  answered: false,
  isAnswerShown: false,
  selfReportMode: false,

  start(grade) {
    this.currentGrade = grade;
    this.currentIndex = 0;
    this.answers = [];
    this.answered = false;
    this.isAnswerShown = false;
    this.selfReportMode = Storage.getSetting('readingSelfReport') === true;
    this.questions = this.generateQuestions(grade);
    this.renderQuestion();
  },

  startRetry(failedQuestions, grade) {
    this.currentGrade = grade;
    this.currentIndex = 0;
    this.answers = [];
    this.answered = false;
    this.isAnswerShown = false;
    this.selfReportMode = Storage.getSetting('readingSelfReport') === true;
    // 前回間違えた問題をそのまま問題として設定
    this.questions = this.shuffle([...failedQuestions]).map(q => {
      // failedQuestionsは回答データなので再構成する
      const k = getKanjiByChar(q.char);
      let allValid = [];
      if (k) {
        allValid = k.readings.filter(r => r.type === q.readingType).map(r => r.reading);
      } else {
        allValid = [q.correctAnswer];
      }
      
      let text = `[${q.char}/${q.correctAnswer}]`;
      if (k && k.exampleSentences) {
        const sentenceObj = k.exampleSentences.find(s => s.readingType === q.readingType && s.targetReading === q.correctAnswer);
        if (sentenceObj) text = sentenceObj.text;
      }
      
      return {
        char: q.char,
        readingType: q.readingType,
        targetReading: q.correctAnswer,
        text: text,
        allValidReadings: allValid
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
      if (Storage.getKanjiStatus(k.char, 'reading').color === 'blue') {
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
      // 例文が自動生成されている場合はそれを使う。ない場合はフォールバック
      let sentenceObj = null;
      if (k.exampleSentences && k.exampleSentences.length > 0) {
        sentenceObj = k.exampleSentences[Math.floor(Math.random() * k.exampleSentences.length)];
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
        allValidReadings: k.readings.filter(r => r.type === sentenceObj.readingType).map(r => r.reading)
      };
    });
  },

  renderQuestion() {
    const container = document.getElementById('test-content');
    const q = this.questions[this.currentIndex];
    const progress = ((this.currentIndex) / this.questions.length * 100);
    const typeLabel = q.readingType === 'onyomi' ? '音読み' : '訓読み';

    // 現在の読みレベル
    const kanjiList = getKanjiByGrade(this.currentGrade);
    let readMastered = 0;
    kanjiList.forEach(k => {
      if (Storage.getKanjiStatus(k.char, 'reading').color === 'blue') readMastered++;
    });
    const totalKanji = kanjiList.length;
    const readPercent = totalKanji > 0 ? Math.floor((readMastered / totalKanji) * 100) : 0;
    const nextLevelProgress = (readPercent % 10) * 10; // 0 to 90

    let currentReadLevel = Math.floor(readPercent / 10);
    if (currentReadLevel > 10) currentReadLevel = 10;
    const stageInfo = App.stages[currentReadLevel] || App.stages[0];
    
    // 次のレベルまでのゲージHTML
    const gaugeHtml = currentReadLevel < 10 ? `
      <div style="width: 40px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden; margin-left: 4px; position: relative;">
        <div style="width: ${nextLevelProgress}%; height: 100%; background: var(--status-green); position: absolute; top:0; left:0; border-radius: 3px;"></div>
      </div>
    ` : `
      <div style="margin-left: 4px; font-size: 0.7rem; color: var(--status-green); font-weight: bold;">MAX</div>
    `;

    const levelHtml = `
      <div class="test-progress-level" style="margin-left: 16px; font-size: 0.85rem; color: var(--text-secondary); white-space: nowrap; display: flex; align-items: center; gap: 2px; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-size: 1.1rem;">${stageInfo.icon}</span>
        <span>📖 Lv.${currentReadLevel}</span>
        ${gaugeHtml}
      </div>
    `;

    // 復習進捗バッジ（弱点の読みの場合のみ表示）
    let reviewStreakHtml = '';
    const status = Storage.getKanjiStatus(q.char, 'reading');
    const showReviewBadge = App.isReviewTest || (status.color === 'red' && status.reviewStreaks);
    if (showReviewBadge && status.reviewStreaks) {
      const streakInfo = status.reviewStreaks[q.targetReading];
      if (streakInfo && streakInfo.hasError && streakInfo.streak >= status.masteryStreak) {
        reviewStreakHtml = `<div style="text-align:center;margin-top:10px;"><span style="font-size:0.8rem;padding:4px 12px;border-radius:8px;background:rgba(77,219,122,0.12);color:var(--status-green);border:1px solid rgba(77,219,122,0.25);">✅ 復習マスター達成!</span></div>`;
      } else if (streakInfo && streakInfo.hasError) {
        const streak = streakInfo.streak;
        reviewStreakHtml = `<div style="text-align:center;margin-top:10px;"><span style="font-size:0.8rem;padding:4px 12px;border-radius:8px;background:rgba(255,107,107,0.12);color:var(--status-red);border:1px solid rgba(255,107,107,0.25);">🔄 復習進捗: 連続正解 ${streak}/${status.masteryStreak}回</span></div>`;
      }
    }

    // --- 自己申告モードの問題表示 ---
    if (this.selfReportMode) {
      let actionHtml = '';
      if (!this.isAnswerShown && !this.answered) {
        actionHtml = `
          <div class="test-hint">下線部の${typeLabel}を考えてください</div>
          <div class="test-input-area">
            <button class="btn btn-primary test-submit-btn" style="padding: 15px 40px; font-size: 1.1rem;" onclick="TestReading.showAnswer()">
              📖 正解を表示
            </button>
          </div>`;
      } else if (this.isAnswerShown && !this.answered) {
        const answerDisplay = q.targetReading;
        const plainText = q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1');
        const fullHiragana = (typeof HIRAGANA_DATA !== 'undefined' && HIRAGANA_DATA[plainText]) ? HIRAGANA_DATA[plainText] : '';
        const hiraganaSection = fullHiragana ? `<div style="margin-bottom: 20px; font-size: 0.95rem; background: var(--bg-card); border: 1px solid var(--border-glass); padding: 10px; border-radius: 6px; display: inline-block; color: var(--text-primary);">💡 全文ひらがな: <span style="font-weight: bold; color: var(--accent-cyan);">${fullHiragana}</span></div>` : '';

        actionHtml = `
          <div style="margin: 20px 0; font-size: 1rem; color: var(--text-secondary);">正解の${typeLabel}は</div>
          <div style="font-size: 2.2rem; font-weight: bold; color: var(--accent-cyan); margin-bottom: 10px;">${answerDisplay}</div>
          ${hiraganaSection}
          <div style="font-size: 1rem; margin-bottom: 16px; color: var(--text-primary);">正しく答えられましたか？</div>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-danger" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestReading.submitSelfReport(false)">
              ❌ わからなかった
            </button>
            <button class="btn btn-success" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestReading.submitSelfReport(true)">
              ⭕ あっていた！
            </button>
          </div>`;
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
            <span class="test-mode-label">${App.isRetentionTest ? '🧠 記憶定着：' : (App.isReviewTest ? '🔥 弱点克服：' : '')}読みテスト (自己申告) ― ${typeLabel}</span>
            <div class="test-sentence-display">${q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$1</strong></u>')}</div>
            ${reviewStreakHtml}
            <div class="test-action-area" id="test-action-area" style="min-height: 150px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              ${actionHtml}
            </div>
            <div id="test-feedback"></div>
          </div>
        </div>`;
      return;
    }

    // --- 通常モード（入力式） ---
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
          <span class="test-mode-label">${App.isRetentionTest ? '🧠 記憶定着：' : (App.isReviewTest ? '🔥 弱点克服：' : '')}読みテスト ― ${typeLabel}</span>
          <div class="test-sentence-display">${q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$1</strong></u>')}</div>
          ${reviewStreakHtml}
          <div class="test-hint">下線部の${typeLabel}をひらがな/カタカナで答えてください</div>
          <div class="test-input-area">
            <input type="text" class="test-input" id="test-answer-input"
              placeholder="ひらがな/カタカナで入力"
              autocomplete="off"
              ${this.answered ? 'disabled' : ''}>
            <br>
            ${!this.answered
              ? `<button class="btn btn-primary test-submit-btn" onclick="TestReading.submitAnswer()">回答する</button>`
              : ''
            }
          </div>
          <div id="test-feedback"></div>
        </div>
      </div>
    `;

    if (!this.answered) {
      const input = document.getElementById('test-answer-input');
      input.focus();
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') TestReading.submitAnswer();
      });
    }
  },

  showAnswer() {
    this.isAnswerShown = true;
    this.renderQuestion();
  },

  submitSelfReport(isCorrect) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    this.answers.push({
      char: q.char,
      readingType: q.readingType,
      targetReading: q.targetReading,
      matchedReading: isCorrect ? q.targetReading : null,
      userAnswer: isCorrect ? q.targetReading : '（わからなかった）',
      correctAnswer: q.targetReading,
      correct: isCorrect
    });

    const isLast = this.currentIndex >= this.questions.length - 1;
    if (isLast) {
      this.finishTest();
    } else {
      this.nextQuestion();
    }
  },

  submitAnswer() {
    if (this.answered) return;
    const input = document.getElementById('test-answer-input');
    const userAnswer = input.value.trim();
    if (!userAnswer) return;

    this.answered = true;
    input.disabled = true;

    const q = this.questions[this.currentIndex];
    let correct = false;
    let matchedReading = null;

    for (const validReading of q.allValidReadings) {
      if (compareReadings(userAnswer, validReading)) {
        correct = true;
        matchedReading = validReading;
        break;
      }
    }

    this.answers.push({
      char: q.char,
      readingType: q.readingType,
      targetReading: q.targetReading,
      matchedReading: matchedReading,
      userAnswer: userAnswer,
      correctAnswer: q.targetReading,
      correct: correct
    });

    const feedbackDiv = document.getElementById('test-feedback');
    const typeLabel = q.readingType === 'onyomi' ? '音読み' : '訓読み';

    const plainText = q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1');
    const fullHiragana = (typeof HIRAGANA_DATA !== 'undefined' && HIRAGANA_DATA[plainText]) ? HIRAGANA_DATA[plainText] : '';
    const hiraganaHtml = fullHiragana ? `<div style="margin-top: 10px; font-size: 0.95rem; background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px; border-radius: 6px; color: var(--text-primary);">💡 全文ひらがな: <strong style="color: var(--text-primary);">${fullHiragana}</strong></div>` : '';

    if (correct) {
      feedbackDiv.innerHTML = `
        <div class="test-feedback correct">
          <span class="test-feedback-icon">⭕</span>
          正解！ 「${q.char}」の${typeLabel}は「${matchedReading}」です。
          ${hiraganaHtml}
        </div>
      `;
    } else {
      feedbackDiv.innerHTML = `
        <div class="test-feedback incorrect">
          <span class="test-feedback-icon">❌</span>
          不正解。正しい答えは「${q.targetReading}」です。
          <br>あなたの回答：「${userAnswer}」
          ${hiraganaHtml}
        </div>
      `;
    }

    const isLast = this.currentIndex >= this.questions.length - 1;
    feedbackDiv.innerHTML += `
      <button class="btn btn-primary test-next-btn" onclick="TestReading.${isLast ? 'finishTest' : 'nextQuestion'}()">
        ${isLast ? '結果を見る' : '次の問題 →'}
      </button>
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
      mode: 'reading',
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
