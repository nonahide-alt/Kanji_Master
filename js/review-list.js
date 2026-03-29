// =============================================================
// 漢字マスター - 弱点一覧画面
// =============================================================

const ReviewList = {
  currentGrade: null,

  render(grade) {
    this.currentGrade = grade;
    const container = document.getElementById('review-list-content');
    
    // 現在の学年で「弱点」ステータスの漢字を取得
    const kanjiList = getKanjiByGrade(this.currentGrade);
    let reviewKanjiReading = [];
    let reviewKanjiWriting = [];
    
    kanjiList.forEach(k => {
      const rs = Storage.getKanjiStatus(k.char, 'reading');
      const ws = Storage.getKanjiStatus(k.char, 'writing');
      
      if (rs.color === 'red' && rs.reviewStreaks) {
        let maxStreak = 0;
        let unresolvedCount = 0;
        Object.entries(rs.reviewStreaks).forEach(([reading, info]) => {
          if (info.hasError && info.streak < rs.masteryStreak) {
            unresolvedCount++;
            maxStreak = Math.max(maxStreak, info.streak);
          }
        });
        if (unresolvedCount > 0) {
          reviewKanjiReading.push({ char: k.char, maxStreak, masteryStreak: rs.masteryStreak });
        }
      }
      
      if (ws.color === 'red' && ws.reviewStreaks) {
        let maxStreak = 0;
        let unresolvedCount = 0;
        Object.entries(ws.reviewStreaks).forEach(([reading, info]) => {
          if (info.hasError && info.streak < ws.masteryStreak) {
            unresolvedCount++;
            maxStreak = Math.max(maxStreak, info.streak);
          }
        });
        if (unresolvedCount > 0) {
          reviewKanjiWriting.push({ char: k.char, maxStreak, masteryStreak: ws.masteryStreak });
        }
      }
    });

    if (reviewKanjiReading.length === 0 && reviewKanjiWriting.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
          <h3 style="margin-bottom: 12px; color: var(--text-primary);">弱点の漢字はありません！</h3>
          <p style="color: var(--text-secondary); margin-bottom: 30px;">${this.currentGrade}年生の漢字、よくできています！</p>
          <button class="btn btn-secondary" onclick="App.goBack()">戻る</button>
        </div>
      `;
      return;
    }

    const renderKanjiGrid = (list, modeIcon) => {
      if (list.length === 0) return '<div style="color: var(--text-secondary); margin-bottom: 20px;">このモードの弱点漢字はありません。</div>';
      
      return `
        <div class="kanji-grid" style="margin-bottom: 24px;">
          ${list.map(item => `
            <button class="kanji-btn status-red" onclick="App.showDetail('${item.char}')" style="position: relative;">
              <span class="kanji-char">${item.char}</span>
              <div style="position: absolute; bottom: 4px; left: 0; right: 0; font-size: 0.65rem; color: var(--status-red); text-align: center;">
                ${modeIcon} ${item.maxStreak}/${item.masteryStreak}
              </div>
            </button>
          `).join('')}
        </div>
      `;
    };

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin-bottom: 8px;">弱点リスト（${this.currentGrade}年生）</h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
          連続${reviewKanjiReading[0]?.masteryStreak || 3}回正解でマスターに昇格します！
        </p>
        <div style="display: flex; justify-content: center; gap: 16px;">
          <button class="btn btn-primary" style="padding: 12px 30px;" onclick="App.startReviewTest()">
            🔥 復習テストを開始
          </button>
        </div>
      </div>
      
      ${reviewKanjiReading.length > 0 ? `
        <h3 style="margin-bottom: 12px; border-left: 4px solid var(--accent-cyan); padding-left: 8px;">📖 読み（${reviewKanjiReading.length}字）</h3>
        ${renderKanjiGrid(reviewKanjiReading, '📖')}
      ` : ''}

      ${reviewKanjiWriting.length > 0 ? `
        <h3 style="margin-bottom: 12px; border-left: 4px solid var(--accent-green); padding-left: 8px;">✏️ 書き（${reviewKanjiWriting.length}字）</h3>
        ${renderKanjiGrid(reviewKanjiWriting, '✏️')}
      ` : ''}
    `;
  }
};
