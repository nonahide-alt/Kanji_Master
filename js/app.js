// =============================================================
// 漢字マスター - メインアプリケーション（ルーティング・統合）
// =============================================================

const App = {
  currentScreen: 'home',
  currentGrade: null,
  history: [], // 画面遷移履歴（戻るボタン用）

  stages: [
    { level: 0, icon: '🥚', title: 'たまご', desc: 'まだ殻の中。漢字の世界っておいしいのかな？' },
    { level: 1, icon: '🐣', title: 'ひよこ', desc: 'ピヨピヨ！はじめての漢字に興味津々で目が離せない。' },
    { level: 2, icon: '🐥', title: 'わかどり', desc: '羽ばたく準備中。少しずつ漢字が読めるようになってきたぞ！' },
    { level: 3, icon: '🐔', title: 'にわとり', desc: 'コケコッコー！朝から晩まで漢字のことで頭がいっぱい（？）' },
    { level: 4, icon: '🥉', title: 'ブロンズ', desc: '硬い決意のブロンズ！漢字の基本の型はバッチリだ。' },
    { level: 5, icon: '🥈', title: 'シルバー', desc: 'いぶし銀の輝き。少し難しい漢字の読み書きもいける口。' },
    { level: 6, icon: '🥇', title: 'ゴールド', desc: 'ピカピカのゴールド！クラスでも一目置かれる漢字マスター候補。' },
    { level: 7, icon: '🏅', title: 'プラチナ', desc: '希少価値高め。プラチナ級の実力で、大人の書く字もスラスラ読める！' },
    { level: 8, icon: '💎', title: 'ダイヤ', desc: '誰にも砕けない最強の頭脳。もはや漢字辞典とはマブダチだ。' },
    { level: 9, icon: '🌟', title: 'マスター', desc: '漢字の真髄を極めし者。これ以上の壁はないと思いきや…？' },
    { level: 10, icon: '👑', title: '伝説の漢字王', desc: 'すべての漢字を支配する生きた伝説。国語辞典に君の名前が載る日も近い…！' }
  ],

  overallRanks: [
    { rank: 0, title: '見習い', icon: '🌱', color: '#a0aec0', desc: 'まずはここから。漢字の世界へようこそ！' },
    { rank: 1, title: '初級マスター', icon: '🥉', color: '#4da6ff', desc: '基礎は身についてきたぞ。この調子！' },
    { rank: 2, title: '中級マスター', icon: '🥈', color: '#4ddb7a', desc: '学年の半分を制覇！もう立派な漢字使い。' },
    { rank: 3, title: '上級マスター', icon: '🥇', color: '#fbbf24', desc: 'ほとんどの漢字を網羅。達人は目前！' },
    { rank: 4, title: '伝説の漢字王', icon: '👑', color: '#ff6b6b', desc: 'すべての漢字を完全制覇！君こそが真の漢字王だ！' }
  ],

  checkLevelUp(grade) {
    const kanjiList = getKanjiByGrade(grade);
    let readMastered = 0;
    let writeMastered = 0;

    kanjiList.forEach(k => {
      const rs = Storage.getKanjiStatus(k.char, 'reading');
      const ws = Storage.getKanjiStatus(k.char, 'writing');
      if (rs.color === 'blue') readMastered++;
      if (ws.color === 'blue') writeMastered++;
    });

    const totalKanji = kanjiList.length;
    const readPercent = totalKanji > 0 ? Math.floor((readMastered / totalKanji) * 100) : 0;
    const writePercent = totalKanji > 0 ? Math.floor((writeMastered / totalKanji) * 100) : 0;
    const combinedPercent = totalKanji > 0 ? Math.floor(((readMastered + writeMastered) / (totalKanji * 2)) * 100) : 0;

    let readLevel = Math.floor(readPercent / 10);
    if (readLevel > 10) readLevel = 10;
    let writeLevel = Math.floor(writePercent / 10);
    if (writeLevel > 10) writeLevel = 10;

    let currentRankIndex = 0;
    if (combinedPercent >= 100) currentRankIndex = 4;
    else if (combinedPercent >= 75) currentRankIndex = 3;
    else if (combinedPercent >= 50) currentRankIndex = 2;
    else if (combinedPercent >= 25) currentRankIndex = 1;

    const rKey = 'gradeStage_R_' + grade;
    const wKey = 'gradeStage_W_' + grade;
    const oKey = 'gradeStage_O_' + grade;
    
    const prevRead = Storage.getSetting(rKey) || 0;
    const prevWrite = Storage.getSetting(wKey) || 0;
    const prevOverall = Storage.getSetting(oKey) || 0;

    let alertData = null;
    const gradeInfo = getGradeInfo().find(g => g.grade === grade);
    const gradeName = gradeInfo ? gradeInfo.label : grade + '年';

    // 優先順位: 全体ランクUP > 読みレベルUP > 書きレベルUP
    if (currentRankIndex > prevOverall) {
      alertData = { gradeName: gradeName, type: 'overall', stageData: this.overallRanks[currentRankIndex], current: currentRankIndex };
    } else if (readLevel > prevRead) {
      alertData = { gradeName: gradeName, type: 'read', stageData: this.stages[readLevel], current: readLevel };
    } else if (writeLevel > prevWrite) {
      alertData = { gradeName: gradeName, type: 'write', stageData: this.stages[writeLevel], current: writeLevel };
    }

    if (currentRankIndex > prevOverall) Storage.setSetting(oKey, currentRankIndex);
    if (readLevel > prevRead) Storage.setSetting(rKey, readLevel);
    if (writeLevel > prevWrite) Storage.setSetting(wKey, writeLevel);

    return alertData;
  },

  init() {
    this.applyTabletMode();
    this.renderHome();
    this.updateBackButton();
  },

  applyTabletMode() {
    const tabletMode = Storage.getSetting('tabletMode') === true;
    if (tabletMode) {
      document.body.classList.add('tablet-mode');
    } else {
      document.body.classList.remove('tablet-mode');
    }
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
    const homeBtn = document.getElementById('home-btn');
    const isHome = this.currentScreen === 'home';
    backBtn.style.visibility = isHome ? 'hidden' : 'visible';
    homeBtn.style.visibility = isHome ? 'hidden' : 'visible';
  },


  renderHome() {
    const grid = document.getElementById('grade-grid');
    const gradeInfo = getGradeInfo();
    const gradeEmojis = ['🌸', '🌻', '🍀', '⭐', '🌊', '🔥'];

    grid.innerHTML = gradeInfo.map((info, i) => {
      const kanjiList = getKanjiByGrade(info.grade);
      let readMastered = 0;
      let writeMastered = 0;

      kanjiList.forEach(k => {
        const rs = Storage.getKanjiStatus(k.char, 'reading');
        const ws = Storage.getKanjiStatus(k.char, 'writing');
        if (rs.color === 'blue') readMastered++;
        if (ws.color === 'blue') writeMastered++;
      });

      const totalKanji = kanjiList.length;
      const readPercent = totalKanji > 0 ? Math.floor((readMastered / totalKanji) * 100) : 0;
      const writePercent = totalKanji > 0 ? Math.floor((writeMastered / totalKanji) * 100) : 0;
      const combinedPercent = totalKanji > 0 ? Math.floor(((readMastered + writeMastered) / (totalKanji * 2)) * 100) : 0;

      let readLevel = Math.floor(readPercent / 10);
      if (readLevel > 10) readLevel = 10;
      let writeLevel = Math.floor(writePercent / 10);
      if (writeLevel > 10) writeLevel = 10;

      let currentRankIndex = 0;
      if (combinedPercent >= 100) currentRankIndex = 4;
      else if (combinedPercent >= 75) currentRankIndex = 3;
      else if (combinedPercent >= 50) currentRankIndex = 2;
      else if (combinedPercent >= 25) currentRankIndex = 1;

      const currentRank = this.overallRanks[currentRankIndex];
      const rStage = this.stages[readLevel];
      const wStage = this.stages[writeLevel];

      let readBlocksHtml = '';
      let writeBlocksHtml = '';
      for (let j = 0; j < 10; j++) {
        readBlocksHtml += `<div class="stage-block ${j < readLevel ? 'filled' : ''}"></div>`;
        writeBlocksHtml += `<div class="stage-block ${j < writeLevel ? 'filled' : ''}"></div>`;
      }

      return `
        <div class="grade-card" data-grade="${info.grade}" onclick="App.selectGrade(${info.grade})">
          <div class="grade-card-header" style="margin-bottom: 8px;">
            <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap;">
               <span class="grade-card-title">${gradeEmojis[i]} ${info.label}</span>
               <span class="grade-card-rank" style="background: ${currentRank.color}20; color: ${currentRank.color}; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; border: 1px solid ${currentRank.color}40; font-weight: 700; white-space: nowrap;">
                 ${currentRank.icon} ${currentRank.title}
               </span>
            </div>
            <span class="grade-card-count" style="margin-top: 4px;">${totalKanji}字</span>
          </div>

          <div class="stage-container" style="padding: 10px; display:flex; flex-direction:column; gap:12px;">
            
            <div class="stage-row">
              <div class="stage-header" style="margin-bottom: 4px;">
                <div class="stage-title" style="font-size:0.85rem;">
                  <span class="stage-icon" style="font-size:1.1rem;">${rStage.icon}</span> 📖 読み Lv.${readLevel} ${rStage.title}
                </div>
                <div class="stage-percent" style="font-size:0.75rem;">${readMastered}/${totalKanji} (${readPercent}%)</div>
              </div>
              <div class="stage-blocks">
                ${readBlocksHtml}
              </div>
            </div>

            <div class="stage-row">
              <div class="stage-header" style="margin-bottom: 4px;">
                <div class="stage-title" style="font-size:0.85rem;">
                  <span class="stage-icon" style="font-size:1.1rem;">${wStage.icon}</span> ✏️ 書き Lv.${writeLevel} ${wStage.title}
                </div>
                <div class="stage-percent" style="font-size:0.75rem;">${writeMastered}/${totalKanji} (${writePercent}%)</div>
              </div>
              <div class="stage-blocks">
                ${writeBlocksHtml}
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');
  },

  showLevelUpModal(alertData) {
    let isMax = false;
    let title = '✨ レベルアップ！ ✨';
    let message = '';
    
    if (alertData.type === 'overall') {
       isMax = alertData.current === 4;
       title = isMax ? '🎉 完全制覇！ 🎉' : '🌟 ランクアップ！ 🌟';
       message = isMax
         ? `${alertData.gradeName}生の漢字をすべてマスターしました！<br>あなたは本物の伝説の漢字王です！`
         : `${alertData.gradeName}生の全体ランクが「${alertData.stageData.title}」に上がりました！<br>素晴らしい進歩です！`;
    } else if (alertData.type === 'read') {
       isMax = alertData.current === 10;
       message = isMax ? `${alertData.gradeName}生の「読み」をすべてマスターしました！` : `${alertData.gradeName}生の「読み」レベルが上がりました！`;
    } else if (alertData.type === 'write') {
       isMax = alertData.current === 10;
       message = isMax ? `${alertData.gradeName}生の「書き」をすべてマスターしました！` : `${alertData.gradeName}生の「書き」レベルが上がりました！`;
    }

    const stageTitleHtml = alertData.type === 'overall' 
       ? alertData.stageData.title 
       : `Lv.${alertData.current} ${alertData.stageData.title}`;

    const overlay = document.createElement('div');
    overlay.className = 'level-up-overlay';
    overlay.innerHTML = `
      <div class="level-up-modal">
        <div class="level-up-title">${title}</div>
        <div class="level-up-icon">${alertData.stageData.icon}</div>
        <div class="level-up-stage">${stageTitleHtml}</div>
        <div class="level-up-desc">${message}</div>
        <button class="btn btn-primary" style="font-size: 1.1rem; padding: 12px 32px; box-shadow: 0 4px 15px rgba(255,140,0,0.4);" onclick="this.closest('.level-up-overlay').remove()">
          次へ進む！
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // 紙吹雪エフェクト
    this.createConfetti();
  },

  createConfetti() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#00d4ff', '#4ddb7a'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 100, // 画面中央やや下から噴出
            r: Math.random() * 6 + 2,
            dx: Math.random() * 30 - 15,
            dy: Math.random() * -30 - 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngle: 0,
            tiltAngleIncre: (Math.random() * 0.07) + 0.05
        });
    }

    let frameId;
    const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            p.tiltAngle += p.tiltAngleIncre;
            p.y += (Math.cos(p.tiltAngle) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle) * 2 + p.dx * 0.5;
            p.dy += 0.5; // gravity
            p.y += p.dy * 0.3;

            if (p.x < canvas.width + 20 && p.x > -20 && p.y < canvas.height + 20) {
              active = true;
            }

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
            ctx.stroke();
        });

        if (active) {
          frameId = requestAnimationFrame(render);
        } else {
          canvas.remove();
        }
    };
    render();
  },

  showRankInfo() {
    const old = document.getElementById('rank-info-overlay');
    if (old) old.remove();

    const overallHtml = this.overallRanks.map(r => `
      <div class="rank-item" style="border-left: 4px solid ${r.color};">
        <div class="rank-item-icon">${r.icon}</div>
        <div class="rank-item-info">
          <div class="rank-item-title" style="color: ${r.color}">${r.title}</div>
          <div class="rank-item-desc">${r.desc}</div>
        </div>
      </div>
    `).join('');

    const stagesHtml = this.stages.map(s => `
      <div class="rank-item">
        <div class="rank-item-icon">${s.icon}</div>
        <div class="rank-item-info">
          <div class="rank-item-title">Lv.${s.level} ${s.title}</div>
          <div class="rank-item-desc">${s.desc}</div>
        </div>
      </div>
    `).join('');

    const overlay = document.createElement('div');
    overlay.id = 'rank-info-overlay';
    overlay.className = 'confirm-overlay';
    
    // confirm-dialogのスタイルを流用しつつmax-heightやoverflowを設定
    overlay.innerHTML = `
      <div class="confirm-dialog" style="max-width: 500px; width: 90%; max-height: 85vh; display: flex; flex-direction: column;">
        <div class="confirm-title" style="font-size: 1.2rem; flex-shrink: 0; padding-bottom: 12px; border-bottom: 1px solid var(--border-glass); margin-bottom: 16px;">
          🏆 称号一覧
        </div>
        <div class="rank-list-scroll" style="overflow-y: auto; flex-grow: 1; padding-right: 8px; margin-bottom: 20px;">
          <div style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: var(--accent-cyan);">✨ 全体称号（学年の総合評価）</div>
          ${overallHtml}
          <div style="font-size: 1.05rem; font-weight: 700; margin-top: 24px; margin-bottom: 12px; color: var(--accent-purple-light);">📖✏️ 読み・書きレベル（各10段階）</div>
          ${stagesHtml}
        </div>
        <div class="confirm-buttons" style="flex-shrink: 0;">
          <button class="btn btn-primary" onclick="document.getElementById('rank-info-overlay').remove()">閉じる</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
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
            ▶ 次の問題に進む
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

    const grade = this.currentGrade || result.grade || 1;
    const levelUpData = this.checkLevelUp(grade);
    if (levelUpData) {
      setTimeout(() => {
        this.showLevelUpModal(levelUpData);
      }, 500);
    }
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
    const tabletMode = Storage.getSetting('tabletMode') === true;

    const history = Storage.getHistory();
    const totalQuestions = history.reduce((sum, s) => sum + (s.questions ? s.questions.length : 0), 0);

    const overlay = document.createElement('div');
    overlay.id = 'settings-modal';
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-dialog" style="max-width: 440px; width: 90%;">
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
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border-glass);">
            <div>
              <div style="font-size: 0.95rem; font-weight: 500;">📱 タブレットモード</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;">iPad・iPhoneなどで文字やボタンを大きく表示します</div>
            </div>
            <label class="settings-toggle" style="flex-shrink: 0; margin-left: 16px;">
              <input type="checkbox" id="setting-tablet-mode" ${tabletMode ? 'checked' : ''} onchange="App.onSettingChange('tabletMode', this.checked)">
              <span class="settings-toggle-slider"></span>
            </label>
          </div>

          <div class="settings-data-section">
            <div style="font-size: 0.95rem; font-weight: 500; margin-bottom: 4px;">💾 学習データ管理</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">
              現在のデータ: ${history.length}セッション / ${totalQuestions}問
            </div>
            <div class="settings-data-buttons">
              <button class="btn settings-data-btn settings-export-btn" onclick="App.exportDataCSV()">
                📤 CSVエクスポート
              </button>
              <button class="btn settings-data-btn settings-import-btn" onclick="App.triggerImportCSV()">
                📥 CSVインポート
              </button>
            </div>
            <input type="file" id="csv-import-input" accept=".csv" style="display: none;" onchange="App.handleImportCSV(event)">
            <div id="import-export-status" class="settings-status"></div>
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
    if (key === 'tabletMode') {
      this.applyTabletMode();
    }
  },

  // ======================== CSVエクスポート ========================

  exportDataCSV() {
    const history = Storage.getHistory();
    if (history.length === 0) {
      this._showDataStatus('⚠️ エクスポートする学習データがありません', 'warn');
      return;
    }

    // CSVヘッダー
    const headers = ['session_id', 'date', 'grade', 'mode', 'timestamp', 'char', 'correct', 'userAnswer', 'correctAnswer', 'targetReading', 'readingType', 'matchedReading'];
    const rows = [headers.join(',')];

    history.forEach(session => {
      (session.questions || []).forEach(q => {
        const row = [
          this._csvEscape(session.id || ''),
          this._csvEscape(session.date || ''),
          this._csvEscape(String(session.grade || '')),
          this._csvEscape(session.mode || ''),
          this._csvEscape(String(session.timestamp || '')),
          this._csvEscape(q.char || ''),
          q.correct ? '1' : '0',
          this._csvEscape(q.userAnswer || ''),
          this._csvEscape(q.correctAnswer || ''),
          this._csvEscape(q.targetReading || ''),
          this._csvEscape(q.readingType || ''),
          this._csvEscape(q.matchedReading || '')
        ];
        rows.push(row.join(','));
      });
    });

    const csvContent = '\uFEFF' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `kanji_master_data_${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this._showDataStatus(`✅ ${history.length}セッションのデータをエクスポートしました`, 'success');
  },

  _csvEscape(value) {
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  },

  // ======================== CSVインポート ========================

  triggerImportCSV() {
    const input = document.getElementById('csv-import-input');
    if (input) {
      input.value = '';
      input.click();
    }
  },

  handleImportCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      this._showDataStatus('⚠️ CSVファイルを選択してください', 'warn');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const importedSessions = this._parseCSV(csvText);

        if (importedSessions.length === 0) {
          this._showDataStatus('⚠️ 有効なデータが見つかりませんでした', 'warn');
          return;
        }

        const totalQuestions = importedSessions.reduce((sum, s) => sum + s.questions.length, 0);

        // マージか上書きかの確認ダイアログ
        this._showImportConfirm(importedSessions, totalQuestions);
      } catch (err) {
        this._showDataStatus('❌ CSVの読み込みに失敗しました: ' + err.message, 'error');
      }
    };
    reader.readAsText(file, 'UTF-8');
  },

  _parseCSV(csvText) {
    // BOM除去
    const text = csvText.replace(/^\uFEFF/, '');
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return [];

    // ヘッダー解析
    const headers = this._parseCSVLine(lines[0]);
    const colIndex = {};
    headers.forEach((h, i) => colIndex[h.trim()] = i);

    // 必須カラムチェック
    const required = ['session_id', 'date', 'grade', 'mode', 'char', 'correct'];
    const missing = required.filter(r => colIndex[r] === undefined);
    if (missing.length > 0) {
      throw new Error('必須カラムがありません: ' + missing.join(', '));
    }

    // session_idごとにグループ化
    const sessionMap = {};
    for (let i = 1; i < lines.length; i++) {
      const values = this._parseCSVLine(lines[i]);
      if (values.length < headers.length) continue;

      const get = (key) => (colIndex[key] !== undefined ? values[colIndex[key]] || '' : '');

      const sessionId = get('session_id');
      if (!sessionMap[sessionId]) {
        sessionMap[sessionId] = {
          id: sessionId,
          date: get('date'),
          grade: parseInt(get('grade')) || 1,
          mode: get('mode'),
          timestamp: parseInt(get('timestamp')) || Date.now(),
          questions: []
        };
      }

      const question = {
        char: get('char'),
        correct: get('correct') === '1' || get('correct').toLowerCase() === 'true',
        userAnswer: get('userAnswer'),
        correctAnswer: get('correctAnswer'),
        targetReading: get('targetReading'),
        readingType: get('readingType'),
        matchedReading: get('matchedReading')
      };

      // 空文字のプロパティは削除しない（互換性のため保持）
      sessionMap[sessionId].questions.push(question);
    }

    return Object.values(sessionMap);
  },

  _parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          result.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
    }
    result.push(current);
    return result;
  },

  _showImportConfirm(importedSessions, totalQuestions) {
    const existingHistory = Storage.getHistory();
    const existingCount = existingHistory.length;

    // 既存モーダルの中にインラインで確認UIを表示
    const statusDiv = document.getElementById('import-export-status');
    if (!statusDiv) return;

    statusDiv.innerHTML = `
      <div class="settings-import-confirm">
        <div style="font-size: 0.9rem; font-weight: 500; margin-bottom: 8px;">📋 インポートデータの確認</div>
        <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
          ${importedSessions.length}セッション / ${totalQuestions}問のデータが見つかりました
          ${existingCount > 0 ? `<br>（既存: ${existingCount}セッション）` : ''}
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
          <button class="btn settings-data-btn" style="background: rgba(77, 219, 122, 0.15); border-color: var(--status-green); color: var(--status-green); font-size: 0.82rem;" onclick="App.doImport('merge')">
            🔀 既存データとマージ
          </button>
          <button class="btn settings-data-btn" style="background: rgba(255, 107, 107, 0.15); border-color: var(--status-red); color: var(--status-red); font-size: 0.82rem;" onclick="App.doImport('overwrite')">
            🔄 上書き（既存を削除）
          </button>
          <button class="btn settings-data-btn" style="font-size: 0.82rem;" onclick="App.cancelImport()">
            ✖ キャンセル
          </button>
        </div>
      </div>
    `;
    statusDiv.style.display = 'block';

    // データを一時保持
    this._pendingImport = importedSessions;
  },

  doImport(mode) {
    if (!this._pendingImport) return;

    if (mode === 'overwrite') {
      // 上書き
      localStorage.setItem(Storage.HISTORY_KEY, JSON.stringify(this._pendingImport));
    } else {
      // マージ: 既存データにsession_idで重複チェックしながら追加
      const existing = Storage.getHistory();
      const existingIds = new Set(existing.map(s => s.id));
      let addedCount = 0;

      this._pendingImport.forEach(session => {
        if (!existingIds.has(session.id)) {
          existing.push(session);
          addedCount++;
        }
      });

      localStorage.setItem(Storage.HISTORY_KEY, JSON.stringify(existing));
      this._showDataStatus(
        `✅ ${addedCount}セッションを追加しました（重複: ${this._pendingImport.length - addedCount}件スキップ）`,
        'success'
      );
      this._pendingImport = null;
      return;
    }

    this._showDataStatus(`✅ ${this._pendingImport.length}セッションのデータを取り込みました`, 'success');
    this._pendingImport = null;
  },

  cancelImport() {
    this._pendingImport = null;
    const statusDiv = document.getElementById('import-export-status');
    if (statusDiv) {
      statusDiv.innerHTML = '';
      statusDiv.style.display = 'none';
    }
  },

  _showDataStatus(message, type) {
    const statusDiv = document.getElementById('import-export-status');
    if (!statusDiv) return;

    const colorMap = {
      success: 'var(--status-green)',
      warn: 'var(--status-yellow, #fcc419)',
      error: 'var(--status-red)'
    };
    const bgMap = {
      success: 'rgba(77, 219, 122, 0.1)',
      warn: 'rgba(252, 196, 25, 0.1)',
      error: 'rgba(255, 107, 107, 0.1)'
    };

    statusDiv.style.display = 'block';
    statusDiv.innerHTML = `
      <div style="
        padding: 10px 14px;
        border-radius: 8px;
        font-size: 0.82rem;
        background: ${bgMap[type] || 'transparent'};
        color: ${colorMap[type] || 'var(--text-secondary)'};
        border: 1px solid ${colorMap[type] || 'var(--border-glass)'};
      ">${message}</div>
    `;

    if (type === 'success') {
      setTimeout(() => {
        if (statusDiv.style.display === 'block') {
          statusDiv.innerHTML = '';
          statusDiv.style.display = 'none';
        }
      }, 4000);
    }
  }
};

// アプリ初期化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
