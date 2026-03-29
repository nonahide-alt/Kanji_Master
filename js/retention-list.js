// =============================================================
// 漢字マスター - 記憶定着テスト開始画面
// =============================================================

const RetentionList = {
  currentGrade: null,

  render(grade) {
    this.currentGrade = grade;
    const container = document.getElementById('retention-list-content');
    
    // 現在の学年で「overdue」ステータスがある問題を抽出
    const schedulesReading = Storage.getReviewSchedule('reading');
    const schedulesWriting = Storage.getReviewSchedule('writing');

    // 引数の学年(grade)に絞り込み、overdueのものだけ集める
    let overdueReading = [];
    schedulesReading.filter(s => s.grade === this.currentGrade).forEach(s => {
      if (s.reviews.some(r => r.status === 'overdue')) {
        overdueReading.push(s);
      }
    });

    let overdueWriting = [];
    schedulesWriting.filter(s => s.grade === this.currentGrade).forEach(s => {
      if (s.reviews.some(r => r.status === 'overdue')) {
        overdueWriting.push(s);
      }
    });

    if (overdueReading.length === 0 && overdueWriting.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
          <h3 style="margin-bottom: 12px; color: var(--text-primary);">復習が必要な漢字はありません！</h3>
          <p style="color: var(--text-secondary); margin-bottom: 30px;">${this.currentGrade}年生の記憶はしっかり定着しています！</p>
          <button class="btn btn-secondary" onclick="App.goBack()">戻る</button>
        </div>
      `;
      return;
    }

    const startBtn = (mode, count) => {
      if (count === 0) return '';
      const testCount = Math.min(5, count);
      const icon = mode === 'reading' ? '📖' : '✏️';
      const title = mode === 'reading' ? '読みテスト' : '書きテスト';
      const colorClass = mode === 'reading' ? 'btn-primary' : 'btn-primary';
      const accent = mode === 'reading' ? 'var(--accent-cyan)' : 'var(--accent-green)';
      
      return `
        <div style="background: var(--card-bg); border: 1px solid var(--border-glass); border-left: 4px solid ${accent}; border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div>
            <h3 style="margin-bottom: 8px;font-size: 1.1rem; color: var(--text-primary);">
              ${icon} ${title}
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              本日の復習対象: <span style="font-size: 1rem; font-weight: bold; color: var(--status-red);">${count}</span>問
              <br><span style="font-size: 0.75rem; color: #9898b0;">（1回のテストで最大5問出題されます）</span>
            </p>
          </div>
          <button class="btn ${colorClass}" style="padding: 12px 24px; box-shadow: 0 4px 15px rgba(255,140,0,0.3);" onclick="App.startRetentionTest('${mode}')">
            ▶ スタート (${testCount}問)
          </button>
        </div>
      `;
    };

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin-bottom: 8px;">🧠 記憶定着テスト（${this.currentGrade}年生）</h2>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
          忘却曲線に合わせて最適なタイミングで復習しましょう。<br>記憶にしっかり定着させることができます。
        </p>
      </div>

      <div style="max-width: 500px; margin: 0 auto;">
        ${startBtn('reading', overdueReading.length)}
        ${startBtn('writing', overdueWriting.length)}
      </div>

      <div style="text-align: center; margin-top: 32px;">
         <button class="btn btn-secondary" onclick="App.goBack()">戻る</button>
      </div>
    `;
  }
};
