// =============================================================
// 漢字マスター - 漢字一覧画面
// =============================================================

const KanjiList = {
  currentGrade: null,
  currentMode: 'reading', // 'reading' | 'writing'

  render(grade) {
    this.currentGrade = grade;
    this.renderWithMode(this.currentMode);
  },

  renderWithMode(mode) {
    this.currentMode = mode;
    const kanjiList = getKanjiByGrade(this.currentGrade);
    const container = document.getElementById('kanji-grid');
    const title = document.getElementById('list-title');
    title.textContent = `${this.currentGrade}年生の漢字（${kanjiList.length}字）`;

    // タブ切替UI
    const tabsHtml = `
      <div class="kanji-list-tabs" style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;">
        <button class="btn ${mode === 'reading' ? 'btn-primary' : 'btn-secondary'}" style="padding:8px 24px;" onclick="KanjiList.renderWithMode('reading')">
          📖 読み
        </button>
        <button class="btn ${mode === 'writing' ? 'btn-primary' : 'btn-secondary'}" style="padding:8px 24px;" onclick="KanjiList.renderWithMode('writing')">
          ✏️ 書き
        </button>
      </div>
    `;

    // 全クリアボタン
    const modeLabel = mode === 'reading' ? '読み' : '書き';
    const clearBtnHtml = `
      <div style="margin-top:16px;text-align:center;">
        <button class="btn btn-danger" style="padding:8px 20px;font-size:0.85rem;" onclick="KanjiList.clearAllModeHistory()">
          🗑️ ${modeLabel}の全履歴をクリア
        </button>
      </div>
    `;

    // 漢字グリッド
    const gridHtml = kanjiList.map(kanji => {
      const status = Storage.getKanjiStatus(kanji.char, mode);
      const starsHtml = status.stars.map(s =>
        `<span class="${s.filled ? 'star-filled' : 'star-empty'}">${s.filled ? '★' : '☆'}</span>`
      ).join('');

      return `
        <button class="kanji-btn status-${status.color}" onclick="App.showDetail('${kanji.char}')" title="${status.label}">
          <span class="kanji-char">${kanji.char}</span>
          <span class="kanji-stars">${starsHtml}</span>
        </button>
      `;
    }).join('');

    container.innerHTML = tabsHtml + gridHtml + clearBtnHtml;
  },

  clearAllModeHistory() {
    const modeLabel = this.currentMode === 'reading' ? '読み' : '書き';
    if (confirm(`${this.currentGrade}年生の「${modeLabel}」の全漢字の履歴を削除しますか？`)) {
      // 全学年ではなくこのモードのみクリア
      Storage.clearAllHistoryByMode(this.currentMode);
      this.renderWithMode(this.currentMode);
    }
  }
};
