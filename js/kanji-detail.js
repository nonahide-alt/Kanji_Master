// =============================================================
// 漢字マスター - 漢字詳細画面
// =============================================================

const KanjiDetail = {
  currentChar: null,

  render(char) {
    this.currentChar = char;
    const kanji = getKanjiByChar(char);
    if (!kanji) return;

    const statusReading = Storage.getKanjiStatus(char, 'reading');
    const statusWriting = Storage.getKanjiStatus(char, 'writing');
    const container = document.getElementById('detail-content');

    const onyomi = kanji.readings.filter(r => r.type === 'onyomi');
    const kunyomi = kanji.readings.filter(r => r.type === 'kunyomi');

    // 読みのステータスで星を表示（例文の数だけ表示する）
    const isReadReview = statusReading.color === 'red';
    let readingStarsHtml = '';
    for (let i = 0; i < statusReading.totalStars; i++) {
        const filled = i < statusReading.filledStars;
        const redClass = isReadReview ? ' star-red' : '';
        readingStarsHtml += `<span class="${filled ? 'star-filled' + redClass : 'star-empty'}">${filled ? '\u2605' : '\u2606'}</span>`;
    }
    if (statusReading.totalStars === 0) {
        readingStarsHtml = `<span style="font-size: 0.7rem; padding: 1px 5px; border-radius: 4px; background: rgba(120,120,120,0.2); color: var(--text-secondary); border: 1px solid rgba(120,120,120,0.3);">対象外</span>`;
    }

    // 書きのステータスで星を表示
    const isWriteReview = statusWriting.color === 'red';
    let writingStarsHtml = '';
    for (let i = 0; i < statusWriting.totalStars; i++) {
        const filled = i < statusWriting.filledStars;
        const redClass = isWriteReview ? ' star-red' : '';
        writingStarsHtml += `<span class="${filled ? 'star-filled' + redClass : 'star-empty'}">${filled ? '\u2605' : '\u2606'}</span>`;
    }
    if (statusWriting.totalStars === 0) {
        writingStarsHtml = `<span style="font-size: 0.7rem; padding: 1px 5px; border-radius: 4px; background: rgba(120,120,120,0.2); color: var(--text-secondary); border: 1px solid rgba(120,120,120,0.3);">対象外</span>`;
    }

    const onyomiHtml = onyomi.length > 0
      ? onyomi.map(r => {
          const starInfo = statusReading.stars.find(s => s.reading === r.reading);
          const filled = starInfo ? starInfo.filled : false;
          const outOfScope = starInfo ? starInfo.out_of_scope : false;
          const starMark = outOfScope
            ? `<span style="font-size: 0.7rem; padding: 1px 5px; border-radius: 4px; background: rgba(120,120,120,0.2); color: var(--text-secondary); border: 1px solid rgba(120,120,120,0.3);">対象外</span>`
            : `${filled ? '\u2605' : '\u2606'}`;
          return `<span class="reading-tag">
            <span class="reading-type">音読み ${starMark}</span>
            ${r.reading}
          </span>`;
        }).join('')
      : '<span class="reading-tag" style="opacity:0.5;">なし</span>';

    const kunyomiHtml = kunyomi.length > 0
      ? kunyomi.map(r => {
          const starInfo = statusReading.stars.find(s => s.reading === r.reading);
          const filled = starInfo ? starInfo.filled : false;
          const outOfScope = starInfo ? starInfo.out_of_scope : false;
          const starMark = outOfScope
            ? `<span style="font-size: 0.7rem; padding: 1px 5px; border-radius: 4px; background: rgba(120,120,120,0.2); color: var(--text-secondary); border: 1px solid rgba(120,120,120,0.3);">対象外</span>`
            : `${filled ? '\u2605' : '\u2606'}`;
          return `<span class="reading-tag">
            <span class="reading-type">訓読み ${starMark}</span>
            ${r.reading}
          </span>`;
        }).join('')
      : '<span class="reading-tag" style="opacity:0.5;">なし</span>';

    const examplesHtml = kanji.examples.map(e =>
      `<span class="example-tag">${e}</span>`
    ).join('');

     const sentencesHtml = kanji.exampleSentences && kanji.exampleSentences.length > 0
      ? kanji.exampleSentences.map(sen => {
          const isReadMastered = statusReading.stars.find(s => s.reading === sen.targetReading)?.filled || false;
          const isWriteMastered = statusWriting.stars.find(s => s.reading === sen.targetReading)?.filled || false;
          
          const rRedClass = isReadReview ? ' star-red' : '';
          const wRedClass = isWriteReview ? ' star-red' : '';
          const rIcon = isReadMastered ? `<span class="star-filled${rRedClass}">★</span>` : '<span class="star-empty">☆</span>';
          const wIcon = isWriteMastered ? `<span class="star-filled${wRedClass}">★</span>` : '<span class="star-empty">☆</span>';
          
          // 連続正解カウント表示（弱点の読みのみ）
          const rStreakInfo = statusReading.reviewStreaks[sen.targetReading];
          let rStreakHtml = '';
          if (rStreakInfo && rStreakInfo.hasError && rStreakInfo.streak < statusReading.masteryStreak) {
            rStreakHtml = `<span style="font-size:0.65rem;padding:1px 5px;border-radius:4px;background:rgba(255,107,107,0.15);color:var(--status-red);margin-left:4px;">正解 ${rStreakInfo.streak}/${statusReading.masteryStreak}回</span>`;
          } else if (rStreakInfo && rStreakInfo.hasError && rStreakInfo.streak >= statusReading.masteryStreak) {
            rStreakHtml = `<span style="font-size:0.65rem;padding:1px 5px;border-radius:4px;background:rgba(77,219,122,0.15);color:var(--status-green);margin-left:4px;">復習マスター!</span>`;
          }

          const wStreakInfo = statusWriting.reviewStreaks[sen.targetReading];
          let wStreakHtml = '';
          if (wStreakInfo && wStreakInfo.hasError && wStreakInfo.streak < statusWriting.masteryStreak) {
            wStreakHtml = `<span style="font-size:0.65rem;padding:1px 5px;border-radius:4px;background:rgba(255,107,107,0.15);color:var(--status-red);margin-left:4px;">正解 ${wStreakInfo.streak}/${statusWriting.masteryStreak}回</span>`;
          } else if (wStreakInfo && wStreakInfo.hasError && wStreakInfo.streak >= statusWriting.masteryStreak) {
            wStreakHtml = `<span style="font-size:0.65rem;padding:1px 5px;border-radius:4px;background:rgba(77,219,122,0.15);color:var(--status-green);margin-left:4px;">復習マスター!</span>`;
          }

          const rText = sen.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$1</strong></u>');
          const wText = sen.text.replace(/\[([^/]+)\/([^\]]+)\]/g, '<u><strong>$2</strong></u>');

          return `
            <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 12px; margin-bottom: 12px;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">
                <span style="font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; background: rgba(124, 108, 240, 0.2); color: #9d8ff8; border: 1px solid rgba(124, 108, 240, 0.3); margin-right: 8px; flex-shrink: 0; margin-top: 2px;">📖 読み</span>
                <span style="margin-right: 12px; font-size: 1.1rem; flex-shrink: 0;">${rIcon}</span>
                <span style="font-size: 1.05rem; line-height: 1.4; flex: 1;">${rText}</span>
                ${rStreakHtml}
              </div>
              <div style="display: flex; align-items: flex-start;">
                <span style="font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; background: rgba(77, 219, 122, 0.2); color: #4ddb7a; border: 1px solid rgba(77, 219, 122, 0.3); margin-right: 8px; flex-shrink: 0; margin-top: 2px;">✏️ 書き</span>
                <span style="margin-right: 12px; font-size: 1.1rem; flex-shrink: 0;">${wIcon}</span>
                <span style="font-size: 1.05rem; line-height: 1.4; flex: 1;">${wText}</span>
                ${wStreakHtml}
              </div>
            </div>
          `;
        }).join('')
      : '<p class="detail-text" style="opacity:0.5;">データなし</p>';

    const radicalsHtml = kanji.radicals && kanji.radicals.length > 0
      ? kanji.radicals.map(r => `<span class="radical-tag">${r}</span>`).join('')
      : '<span class="detail-text">データなし</span>';

    const hex = char.charCodeAt(0).toString(16).padStart(5, '0');
    const svgUrl = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;

    // 弱点時の「3回連続正解でマスター」説明
    let reviewHintHtml = '';
    if (isReadReview || isWriteReview) {
      reviewHintHtml = `<div style="text-align:center;margin-top:8px;font-size:0.75rem;color:var(--text-secondary);background:rgba(255,107,107,0.08);padding:6px 12px;border-radius:8px;border:1px solid rgba(255,107,107,0.15);">💡 弱点の読みは、連続3回正解するとマスターに昇格します</div>`;
    }

    container.innerHTML = `
      <div class="detail-card">
        <div class="detail-kanji-display">
          <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 16px;">
            <div class="detail-kanji-char" style="margin: 0;">${char}</div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
              <div style="font-size: 0.75rem; color: var(--text-secondary); letter-spacing: 0.05em;">書き順</div>
              <div style="background: #f0f0f4; border-radius: 12px; padding: 8px; width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 16px rgba(0,0,0,0.3);">
                <img src="${svgUrl}" alt="${char}の書き順" style="width: 100%; height: 100%; object-fit: contain;">
              </div>
            </div>
          </div>
          <div class="detail-stars-rows">
            <div class="detail-stars-row">
              <span class="detail-stars-label">📖 読み</span>
              <div class="detail-stars-display">${readingStarsHtml}</div>
            </div>
            <div class="detail-stars-row">
              <span class="detail-stars-label">✏️ 書き</span>
              <div class="detail-stars-display">${writingStarsHtml}</div>
            </div>
          </div>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:12px;flex-wrap:wrap;">
            <span class="detail-status-badge badge-${statusReading.color}">📖 読み：${statusReading.label}</span>
            <span class="detail-status-badge badge-${statusWriting.color}">✏️ 書き：${statusWriting.label}</span>
          </div>
          ${reviewHintHtml}
        </div>


        <div class="detail-section">
          <div class="detail-section-title">音読み</div>
          <div class="detail-readings">${onyomiHtml}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">訓読み</div>
          <div class="detail-readings">${kunyomiHtml}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">使用例</div>
          <div class="detail-examples">${examplesHtml}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">問題文と星の状況</div>
          <div class="detail-sentences">${sentencesHtml}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">部首</div>
          <div class="detail-radicals">${radicalsHtml}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">成り立ち</div>
          <p class="detail-text">${kanji.etymology}</p>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">覚えるためのヒント</div>
          <p class="detail-text">${kanji.hint}</p>
        </div>

        <div class="detail-actions">
          <button class="btn btn-danger" style="margin-bottom:8px;" onclick="KanjiDetail.clearHistoryByMode('reading')">
            🗑️ 読みの履歴をクリア
          </button>
          <button class="btn btn-danger" onclick="KanjiDetail.clearHistoryByMode('writing')">
            🗑️ 書きの履歴をクリア
          </button>
        </div>
      </div>
    `;
  },

  clearHistory() {
    if (!this.currentChar) return;
    this.showConfirm(
      '履歴クリア',
      `「${this.currentChar}」の学習履歴をすべて削除しますか？`,
      () => {
        Storage.clearKanjiHistory(this.currentChar);
        this.render(this.currentChar);
      }
    );
  },

  clearHistoryByMode(mode) {
    if (!this.currentChar) return;
    const modeLabel = mode === 'reading' ? '読み' : '書き';
    this.showConfirm(
      `${modeLabel}の履歴クリア`,
      `「${this.currentChar}」の「${modeLabel}」の学習履歴を削除しますか？`,
      () => {
        Storage.clearKanjiHistoryByMode(this.currentChar, mode);
        this.render(this.currentChar);
      }
    );
  },

  showConfirm(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <div class="confirm-title">${title}</div>
        <div class="confirm-message">${message}</div>
        <div class="confirm-buttons">
          <button class="btn btn-secondary" id="confirm-cancel">キャンセル</button>
          <button class="btn btn-danger" id="confirm-ok">削除する</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#confirm-cancel').onclick = () => overlay.remove();
    overlay.querySelector('#confirm-ok').onclick = () => {
      overlay.remove();
      onConfirm();
    };
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }
};
