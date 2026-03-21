// =============================================================
// 漢字マスター - メインアプリケーション（ルーティング・統合）
// =============================================================

const App = {
  currentScreen: 'home',
  currentGrade: null,
  history: [], // 画面遷移履歴（戻るボタン用）

  init() {
    this.renderHome();
    this.updateBackButton();
  },

  // ======================== 画面遷移 ========================

  navigate(screen, params) {
    this.history.push({ screen: this.currentScreen, grade: this.currentGrade });
    this.showScreen(screen, params);
  },

  showScreen(screen, params) {
    // 全画面を非表示
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    this.currentScreen = screen;

    switch (screen) {
      case 'home':
        document.getElementById('home-screen').classList.add('active');
        this.renderHome();
        break;
      case 'grade-menu':
        document.getElementById('grade-menu-screen').classList.add('active');
        this.renderGradeMenu();
        break;
      case 'list':
        document.getElementById('list-screen').classList.add('active');
        KanjiList.render(this.currentGrade);
        break;
      case 'detail':
        document.getElementById('detail-screen').classList.add('active');
        KanjiDetail.render(params);
        break;
      case 'test-reading':
        document.getElementById('test-screen').classList.add('active');
        TestReading.start(this.currentGrade);
        break;
      case 'test-writing':
        document.getElementById('test-screen').classList.add('active');
        TestWriting.start(this.currentGrade);
        break;
      case 'result':
        document.getElementById('result-screen').classList.add('active');
        break;
      case 'history':
        document.getElementById('history-screen').classList.add('active');
        History.render();
        break;
      case 'review-list':
        document.getElementById('review-list-screen').classList.add('active');
        ReviewList.render(this.currentGrade);
        break;
    }

    this.updateBackButton();
    window.scrollTo(0, 0);
  },

  goBack() {
    if (this.history.length > 0) {
      const prev = this.history.pop();
      this.currentGrade = prev.grade;
      this.showScreen(prev.screen);
    } else {
      this.showScreen('home');
    }
  },

  showHome() {
    this.history = [];
    this.currentGrade = null;
    this.showScreen('home');
  },

  updateBackButton() {
    const backBtn = document.getElementById('back-btn');
    backBtn.style.visibility = this.currentScreen === 'home' ? 'hidden' : 'visible';
  },

  // ======================== ホーム画面 ========================

  renderHome() {
    const grid = document.getElementById('grade-grid');
    const gradeInfo = getGradeInfo();
    const gradeEmojis = ['🌸', '🌻', '🍀', '⭐', '🌊', '🔥'];

    grid.innerHTML = gradeInfo.map((info, i) => {
      const kanjiList = getKanjiByGrade(info.grade);
      let readMastered = 0;
      let readReview = 0;
      let writeMastered = 0;
      let writeReview = 0;

      kanjiList.forEach(k => {
        const rs = Storage.getKanjiStatus(k.char, 'reading');
        const ws = Storage.getKanjiStatus(k.char, 'writing');
        if (rs.color === 'blue') readMastered++;
        if (rs.color === 'red') readReview++;
        if (ws.color === 'blue') writeMastered++;
        if (ws.color === 'red') writeReview++;
      });

      const readPercent = kanjiList.length > 0
        ? Math.round((readMastered / kanjiList.length) * 100)
        : 0;
      const writePercent = kanjiList.length > 0
        ? Math.round((writeMastered / kanjiList.length) * 100)
        : 0;

      return `
        <div class="grade-card" data-grade="${info.grade}" onclick="App.selectGrade(${info.grade})">
          <div class="grade-card-header">
            <span class="grade-card-title">${gradeEmojis[i]} ${info.label}</span>
            <span class="grade-card-count">${info.count}字</span>
          </div>
          <div class="grade-card-stats" style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
              <span>📖 読み: ✅${readMastered}字</span>
              ${readReview > 0 ? `<span style="color:var(--status-red);">❗${readReview}字</span>` : ''}
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;">
              <span>✏️ 書き: ✅${writeMastered}字</span>
              ${writeReview > 0 ? `<span style="color:var(--status-red);">❗${writeReview}字</span>` : ''}
            </div>
          </div>
          <div style="display:flex;gap:4px;margin-top:4px;">
            <div class="grade-card-progress" style="flex:1;position:relative;">
              <div class="grade-card-progress-bar" style="width: ${readPercent}%"></div>
            </div>
            <div class="grade-card-progress" style="flex:1;position:relative;">
              <div class="grade-card-progress-bar" style="width: ${writePercent}%; background: var(--accent-green, #51cf66);"></div>
            </div>
          </div>
          <div style="display:flex;gap:4px;margin-top:2px;font-size:0.7rem;color:var(--text-secondary);">
            <span style="flex:1;text-align:center;">${readPercent === 100 ? '👑' : '📖'} ${readMastered}/${kanjiList.length} (${readPercent}%)</span>
            <span style="flex:1;text-align:center;">${writePercent === 100 ? '👑' : '✏️'} ${writeMastered}/${kanjiList.length} (${writePercent}%)</span>
          </div>
        </div>
      `;
    }).join('');
  },

  // ======================== 学年メニュー ========================

  selectGrade(grade) {
    this.currentGrade = grade;
    this.navigate('grade-menu');
  },

  renderGradeMenu() {
    const title = document.getElementById('grade-menu-title');
    const gradeEmojis = ['🌸', '🌻', '🍀', '⭐', '🌊', '🔥'];
    title.textContent = `${gradeEmojis[this.currentGrade - 1]} ${this.currentGrade}年生`;
  },

  // ======================== 漢字詳細 ========================

  showDetail(char) {
    const kanji = getKanjiByChar(char);
    if (kanji) {
      this.navigate('detail', char);
    }
  },

  // ======================== 要復習リスト ========================

  showReviewList() {
    this.navigate('review-list');
  },

  // ======================== テスト結果 ========================

  showResult(result) {
    this.history.push({ screen: this.currentScreen, grade: this.currentGrade });
    this.currentScreen = 'result';

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('result-screen').classList.add('active');

    const container = document.getElementById('result-content');
    const correctCount = result.questions.filter(q => q.correct).length;
    const totalCount = result.questions.length;
    const percentage = Math.round((correctCount / totalCount) * 100);
    const modeLabel = result.mode === 'reading' ? '読みテスト' : '書きテスト';

    let message = '';
    let messageColor = '';
    if (percentage === 100) {
      message = '🎉 パーフェクト！すごい！';
      messageColor = 'var(--status-green)';
    } else if (percentage >= 80) {
      message = '👏 よくできました！';
      messageColor = 'var(--status-blue)';
    } else if (percentage >= 60) {
      message = '📚 もう少しがんばろう！';
      messageColor = 'var(--status-yellow)';
    } else {
      message = '💪 復習して再チャレンジ！';
      messageColor = 'var(--status-red)';
    }

    const detailsHtml = result.questions.map(q => {
      const icon = q.correct ? '⭕' : '❌';
      const cssClass = q.correct ? 'result-correct' : 'result-incorrect';
      const typeLabel = q.readingType === 'onyomi' ? '音' : '訓';

      let info = '';
      if (result.mode === 'reading') {
        info = q.correct
          ? `${typeLabel}読み → ${q.userAnswer}`
          : `${typeLabel}読み → ${q.userAnswer}（正解：${q.correctAnswer}）`;
      } else {
        info = q.correct
          ? `「${q.targetReading}」→ ${q.char}`
          : `「${q.targetReading}」→ ${q.userAnswer}（正解：${q.char}）`;
      }

      return `
        <div class="result-item ${cssClass}">
          <span class="result-item-char">${q.char}</span>
          <div class="result-item-info">
            <div>${info}</div>
          </div>
          <span class="result-item-icon">${icon}</span>
        </div>
      `;
    }).join('');

    const failedQuestions = result.questions.filter(q => !q.correct);
    // ボタンのHTML（再テスト用データをJSONエンコードしてonclickに渡すのは辛いので、グローバルに一時保存するかここでアタッチするしかない。今回は一時変数をAppに持たせる）
    App.lastFailedQuestions = failedQuestions;
    
    let retryBtnHtml = '';
    if (failedQuestions.length > 0) {
      retryBtnHtml = `
        <button class="btn btn-secondary" style="background:var(--status-red); border-color:var(--status-red);" onclick="App.retryFailedTest('${result.mode}')">
          ❗ 間違えた問題のみ再テスト
        </button>
      `;
    }

    container.innerHTML = `
      <div class="result-container">
        <div class="result-score-card">
          <div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:8px;">
            ${result.grade}年生 ─ ${modeLabel}
          </div>
          <div class="result-score-number">${correctCount} / ${totalCount}</div>
          <div class="result-score-label">${percentage}% 正解</div>
          <div class="result-message" style="color:${messageColor}">${message}</div>
        </div>

        <div class="result-details">
          ${detailsHtml}
        </div>

        <div class="result-actions">
          <button class="btn btn-primary" onclick="App.retryTest('${result.mode}')">
            🔄 全問もう一度
          </button>
          ${retryBtnHtml}
          <button class="btn btn-secondary" onclick="App.showHome()">
            🏠 ホームに戻る
          </button>
        </div>
      </div>
    `;

    this.updateBackButton();
    window.scrollTo(0, 0);
  },

  retryTest(mode) {
    if (mode === 'reading') {
      this.showScreen('test-reading');
      TestReading.start(this.currentGrade);
    } else {
      this.showScreen('test-writing');
      TestWriting.start(this.currentGrade);
    }
  },

  retryFailedTest(mode) {
    if (!this.lastFailedQuestions || this.lastFailedQuestions.length === 0) return;
    if (mode === 'reading') {
      this.showScreen('test-reading');
      TestReading.startRetry(this.lastFailedQuestions, this.currentGrade);
    } else {
      this.showScreen('test-writing');
      TestWriting.startRetry(this.lastFailedQuestions, this.currentGrade);
    }
  },

  startReviewTest() {
    // 現在の学年で実際に「要復習」ステータスの漢字を取得
    const kanjiList = getKanjiByGrade(this.currentGrade);
    let reviewKanji = [];
    
    kanjiList.forEach(k => {
      const rs = Storage.getKanjiStatus(k.char, 'reading');
      if (rs.color === 'red' && rs.reviewStreaks) {
        // 要復習の読みごとに問題を作成
        Object.entries(rs.reviewStreaks).forEach(([reading, info]) => {
          if (info.hasError && info.streak < rs.masteryStreak) {
            // この読みに対応する例文を探す
            let sentenceObj = null;
            if (k.exampleSentences) {
              sentenceObj = k.exampleSentences.find(s => s.targetReading === reading);
            }
            // 読みのタイプを特定
            const readingObj = k.readings.find(r => r.reading === reading);
            const readingType = readingObj ? readingObj.type : (sentenceObj ? sentenceObj.readingType : 'onyomi');
            
            reviewKanji.push({
              char: k.char,
              reading: reading,
              readingType: readingType,
              streak: info.streak,
              sentenceObj: sentenceObj
            });
          }
        });
      }
    });

    if (reviewKanji.length === 0) {
      alert(`${this.currentGrade}年生で要復習の漢字はありません！\n素晴らしいです！`);
      return;
    }

    // ランダムに5個まで選ぶ
    const count = Math.min(5, reviewKanji.length);
    const shuffled = reviewKanji.sort(() => 0.5 - Math.random()).slice(0, count);

    this.showScreen('test-reading');
    
    // startRetry用のダミー回答オブジェクトを作成（実際のエラー読みを使用）
    const dummyFailed = shuffled.map(item => {
      return {
        char: item.char,
        readingType: item.readingType,
        correctAnswer: item.reading
      };
    });
    
    TestReading.startRetry(dummyFailed, this.currentGrade);
  },

  // ======================== 設定 ========================

  showSettings() {
    // 既存モーダルがあれば削除
    const old = document.getElementById('settings-modal');
    if (old) old.remove();

    const selfReport = Storage.getSetting('readingSelfReport') === true;

    const overlay = document.createElement('div');
    overlay.id = 'settings-modal';
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-dialog" style="max-width: 360px; width: 90%;">
        <div class="confirm-title" style="font-size: 1.1rem;">⚙️ 設定</div>
        <div style="margin: 20px 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border-glass);">
            <div>
              <div style="font-size: 0.95rem; font-weight: 500;">📖 読みテスト：自己申告モード</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;">ONにすると、入力の代わりに「あっていた/わからなかった」で答えます</div>
            </div>
            <label class="settings-toggle" style="flex-shrink: 0; margin-left: 16px;">
              <input type="checkbox" id="setting-self-report" ${selfReport ? 'checked' : ''} onchange="App.onSettingChange('readingSelfReport', this.checked)">
              <span class="settings-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="confirm-buttons">
          <button class="btn btn-primary" onclick="App.closeSettings()">閉じる</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) App.closeSettings();
    });
  },

  closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.remove();
  },

  onSettingChange(key, value) {
    Storage.setSetting(key, value);
  }
};

// アプリ初期化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
