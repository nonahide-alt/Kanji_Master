// =============================================================
// 漢字マスター - 怪獣討伐テスト（グローバル復習）
// =============================================================

const TestMonster = {
  queue: [],
  answers: [],
  currentMonster: null,
  totalHP: 7,
  currentHP: 7,
  isAnswerShown: false,
  answered: false,
  currentQuestion: null,

  start(questions) {
    this.totalHP = questions.length;
    this.currentHP = questions.length;
    this.answers = [];
    this.isAnswerShown = false;
    this.answered = false;
    
    // ランダムな怪獣を選出
    const monsters = Storage.MONSTER_DATA;
    this.currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
    
    // 問題を準備
    this.queue = this.shuffle([...questions]).map(q => {
      const k = getKanjiByChar(q.char);
      let text = `[${q.char}/${q.targetReading}]`;
      if (k && k.exampleSentences) {
        const sentenceObj = k.exampleSentences.find(s => s.readingType === q.readingType && s.targetReading === q.targetReading);
        if (sentenceObj) text = sentenceObj.text;
      }
      
      let allReadings = [];
      if (k) {
        allReadings = k.readings.filter(r => r.type === q.readingType).map(r => r.reading);
      } else {
        allReadings = [q.targetReading];
      }

      return {
        ...q,
        text: text,
        allValidReadings: allReadings
      };
    });

    this.nextQuestionState();
  },

  nextQuestionState() {
    if (this.currentHP <= 0 || this.queue.length === 0) {
      this.finishTest();
      return;
    }
    this.currentQuestion = this.queue.shift();
    this.isAnswerShown = false;
    this.answered = false;
    this.renderQuestion();
  },

  renderQuestion() {
    const container = document.getElementById('test-content');
    const q = this.currentQuestion;
    const isReading = q.mode === 'reading';
    const readingSelfReportMode = Storage.getSetting('readingSelfReport') === true;

    // 怪獣UI
    const monsterUiHtml = `
      <div class="monster-test-ui">
        <div class="monster-icon-large" id="monster-icon">${this.currentMonster.icon}</div>
        <div class="monster-hp-container">
          <div class="monster-hp-label">
            <span>${this.currentMonster.name}</span>
            <span id="monster-hp-text">HP: ${this.currentHP} / ${this.totalHP}</span>
          </div>
          <div class="monster-hp-bar">
            <div class="monster-hp-fill" id="monster-hp-fill" style="width: ${(this.currentHP / this.totalHP) * 100}%"></div>
          </div>
        </div>
      </div>
    `;

    const typeLabel = q.readingType === 'onyomi' ? '音' : '訓';
    const maskedSentenceForDisplay = isReading 
      ? q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$1</strong></u>') 
      : q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$2</strong></u>');

    let actionAreaHtml = '';

    // --- 読み・書き共通の「正解表示エリア」の構築 --- //
    if (!this.isAnswerShown && !this.answered) {
      if (!isReading || readingSelfReportMode) {
        // 自己申告モード（読み・書き）の「正解を表示」ボタン
        actionAreaHtml = `
          <button class="btn btn-primary test-submit-btn" style="padding: 15px 40px; font-size: 1.2rem;" onclick="TestMonster.showAnswer()">
            📖 正解を表示
          </button>
        `;
      } else {
        // 読み（入力式）
        actionAreaHtml = `
          <div class="test-hint">下線部の${typeLabel}読みをひらがな/カタカナで答えてください</div>
          <div class="test-input-area">
            <input type="text" class="test-input" id="test-answer-input" placeholder="ひらがな/カタカナで入力" autocomplete="off">
            <br>
            <button class="btn btn-primary test-submit-btn" onclick="TestMonster.submitInputAnswer()">攻撃する！</button>
          </div>
        `;
      }
    } else if (this.isAnswerShown && !this.answered) {
      // 正解が表示された状態（自己申告用）
      const plainText = q.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '$1');
      const fullHiragana = (typeof HIRAGANA_DATA !== 'undefined' && HIRAGANA_DATA[plainText]) ? HIRAGANA_DATA[plainText] : '';
      const hiraganaSection = fullHiragana ? `<div style="margin-bottom: 20px; font-size: 0.95rem; background: var(--bg-card); border: 1px solid var(--border-glass); padding: 10px; border-radius: 6px; display: inline-block; color: var(--text-primary);">💡 全文ひらがな: <span style="font-weight: bold; color: var(--accent-cyan);">${fullHiragana}</span></div>` : '';

      if (isReading) {
        actionAreaHtml = `
          <div style="margin: 20px 0; font-size: 1rem; color: var(--text-secondary);">正解の${typeLabel}読みは</div>
          <div style="font-size: 2.2rem; font-weight: bold; color: var(--accent-cyan); margin-bottom: 10px;">${q.targetReading}</div>
          ${hiraganaSection}
          <div style="font-size: 1rem; margin-bottom: 16px; color: var(--text-primary);">正しく答えられましたか？</div>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-danger" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestMonster.submitSelfReport(false)">
              ❌ わからなかった
            </button>
            <button class="btn btn-success" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestMonster.submitSelfReport(true)">
              ⭕ あっていた！
            </button>
          </div>
        `;
      } else {
        const hex = q.char.charCodeAt(0).toString(16).padStart(5, '0');
        const svgUrl = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;
        
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
            <button class="btn btn-danger" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestMonster.submitSelfReport(false)">
              ❌ わからなかった
            </button>
            <button class="btn btn-success" style="padding: 15px 30px; font-size: 1.1rem; flex: 1; max-width: 200px;" onclick="TestMonster.submitSelfReport(true)">
              ⭕ あっていた！
            </button>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="test-container">
        ${monsterUiHtml}
        <div class="test-question-card">
          <span class="test-mode-label" style="background: rgba(255,107,107,0.2); color: var(--status-red); border: 1px solid rgba(255,107,107,0.4);">
            ⚔️ 怪獣討伐：${isReading ? '読み' : '書き'}問題（${q.grade}年生）
          </span>
          <div class="test-sentence-display" style="font-size: 28px; line-height: 1.6; margin: 30px 0;">
            ${maskedSentenceForDisplay}
          </div>
          <div class="test-action-area" id="test-action-area" style="min-height: 150px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            ${actionAreaHtml}
          </div>
          <div id="test-feedback"></div>
        </div>
      </div>
    `;

    if (!this.isAnswerShown && !this.answered && isReading && !readingSelfReportMode) {
      const input = document.getElementById('test-answer-input');
      if (input) {
        input.focus();
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') TestMonster.submitInputAnswer();
        });
      }
    }
  },

  showAnswer() {
    this.isAnswerShown = true;
    this.renderQuestion();
  },

  submitSelfReport(isCorrect) {
    if (this.answered) return;
    this.answered = true;
    this.handleResult(isCorrect);
  },

  submitInputAnswer() {
    if (this.answered) return;
    const input = document.getElementById('test-answer-input');
    const userAnswer = input.value.trim();
    if (!userAnswer) return;

    this.answered = true;
    input.disabled = true;

    let correct = false;
    for (const validReading of this.currentQuestion.allValidReadings) {
      if (compareReadings(userAnswer, validReading)) {
        correct = true;
        break;
      }
    }

    this.currentQuestion.userAnswer = userAnswer;
    this.handleResult(correct);
  },

  handleResult(isCorrect) {
    const q = this.currentQuestion;

    // 履歴に記録
    this.answers.push({
      char: q.char,
      mode: q.mode,
      grade: q.grade,
      readingType: q.readingType,
      targetReading: q.targetReading,
      correctAnswer: q.mode === 'reading' ? q.targetReading : q.char,
      userAnswer: q.userAnswer || (isCorrect ? (q.mode === 'reading' ? q.targetReading : q.char) : '（わからなかった）'),
      matchedReading: isCorrect ? q.targetReading : null,
      correct: isCorrect
    });

    if (isCorrect) {
      this.currentHP--;
    } else {
      // 不正解: キューの後ろに戻す
      this.queue.push(q);
    }

    this.nextQuestionState();
  },

  finishTest() {
    // 討伐完了！
    Storage.saveMonsterDefeat(this.currentMonster.id);

    // テスト履歴も保存 (全モードをmixしているので、modeは'monster'として保存)
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 全試行を保存する（不正解も含む）。
    // 怪獣は全問正解しないと倒せないため、最終的に各問題の正解が必ず記録される。
    Storage.saveTestResult({
      date: dateStr,
      grade: 'ALL',
      mode: 'monster',
      questions: this.answers
    });

    // 討伐成功の特別リザルト画面
    App.history.push({ screen: App.currentScreen, grade: App.currentGrade });
    App.currentScreen = 'result';
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('result-screen').classList.add('active');

    const container = document.getElementById('result-content');
    
    // 紙吹雪と怪獣撃破演出
    App.createConfetti();

    container.innerHTML = `
      <div class="result-container" style="text-align: center;">
        <div class="result-score-card" style="background: linear-gradient(135deg, rgba(255,107,107,0.2), rgba(124,108,240,0.2)); border: 1px solid var(--status-red);">
          <div style="font-size: 1.2rem; color: var(--status-red); font-weight: bold; margin-bottom: 8px;">討伐成功！</div>
          <div style="font-size: 5rem; margin: 16px 0; display: inline-block;">${this.currentMonster.icon}</div>
          <div class="result-message" style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 8px;">
            「${this.currentMonster.name}」を倒した！
          </div>
          <div style="font-size: 0.95rem; color: var(--text-secondary);">
            ${this.currentMonster.desc}
          </div>
        </div>

        <div style="margin: 24px 0; color: var(--status-green); font-weight: bold; font-size: 1.1rem;">
          🎉 全学年の復習が ${this.totalHP}問 完了しました！
        </div>

        <div class="result-actions" style="margin-top: 32px;">
          <button class="btn btn-primary" onclick="App.showMonsterHistory()" style="font-size: 1.1rem; padding: 12px 32px; background: rgba(255,107,107,0.2); border: 1px solid var(--status-red); color: var(--text-primary);">
            👾 討伐図鑑を見る
          </button>
          <button class="btn btn-secondary" onclick="App.showHome()">
            🏠 ホームに戻る
          </button>
        </div>
      </div>
    `;

    App.updateBackButton();
    window.scrollTo(0, 0);
  },

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};
