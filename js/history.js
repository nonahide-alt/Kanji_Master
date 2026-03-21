// =============================================================
// 漢字マスター - 履歴・グラフ画面
// =============================================================

const History = {
  chart: null,
  currentTab: 'chart',
  errorModeFilter: 'reading', // 間違い一覧のモードフィルタ
  scheduleModeFilter: 'reading', // 復習スケジュールのモードフィルタ

  render() {
    const container = document.getElementById('history-content');

    container.innerHTML = `
      <div class="history-container">
        <h2 class="section-title">📊 学習履歴</h2>

        <div class="history-tabs">
          <button class="history-tab ${this.currentTab === 'chart' ? 'active' : ''}"
            onclick="History.switchTab('chart')">学習量</button>
          <button class="history-tab ${this.currentTab === 'errors' ? 'active' : ''}"
            onclick="History.switchTab('errors')">間違い一覧</button>
          <button class="history-tab ${this.currentTab === 'schedule' ? 'active' : ''}"
            onclick="History.switchTab('schedule')">復習スケジュール</button>
        </div>

        <div id="history-tab-content"></div>
      </div>
    `;

    this.renderTabContent();
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
    const tabs = document.querySelectorAll('.history-tab');
    if (tab === 'chart') tabs[0].classList.add('active');
    else if (tab === 'errors') tabs[1].classList.add('active');
    else tabs[2].classList.add('active');
    this.renderTabContent();
  },

  renderTabContent() {
    const container = document.getElementById('history-tab-content');
    if (this.currentTab === 'chart') {
      this.renderChart(container);
    } else if (this.currentTab === 'errors') {
      this.renderErrors(container);
    } else {
      this.renderSchedule(container);
    }
  },

  // ==================== 学習量グラフ ====================
  renderChart(container) {
    const dailyStats = Storage.getDailyStats();
    const dates = Object.keys(dailyStats).sort();

    if (dates.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📈</div>
          <div class="empty-state-text">まだ学習データがありません。<br>テストを受けてみましょう！</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="history-chart-container">
        <div class="history-chart-title">日別学習量</div>
        <canvas id="daily-chart" class="history-chart-canvas"></canvas>
      </div>
    `;

    const last14Days = [];
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      last14Days.push(dateStr);
    }

    const labels = last14Days.map(d => {
      const parts = d.split('-');
      return `${parseInt(parts[1])}/${parseInt(parts[2])}`;
    });

    const correctData = last14Days.map(d => dailyStats[d] ? dailyStats[d].correct : 0);
    const incorrectData = last14Days.map(d => dailyStats[d] ? dailyStats[d].incorrect : 0);

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const canvas = document.getElementById('daily-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '正解',
            data: correctData,
            backgroundColor: 'rgba(77, 219, 122, 0.6)',
            borderColor: 'rgba(77, 219, 122, 1)',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: '不正解',
            data: incorrectData,
            backgroundColor: 'rgba(255, 107, 107, 0.6)',
            borderColor: 'rgba(255, 107, 107, 1)',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#9898b0',
              font: { family: "'Noto Sans JP', sans-serif" }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: '#9898b0' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              color: '#9898b0',
              stepSize: 1
            },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  },

  // ==================== 間違い一覧（モード別） ====================
  renderErrors(container) {
    const modeFilter = this.errorModeFilter;

    // モード切替タブ
    const modeTabsHtml = `
      <div style="display:flex;gap:8px;justify-content:center;margin:16px 0;">
        <button class="btn ${modeFilter === 'reading' ? 'btn-primary' : 'btn-secondary'}" style="padding:6px 20px;" onclick="History.setErrorMode('reading')">
          📖 読み
        </button>
        <button class="btn ${modeFilter === 'writing' ? 'btn-primary' : 'btn-secondary'}" style="padding:6px 20px;" onclick="History.setErrorMode('writing')">
          ✏️ 書き
        </button>
      </div>
    `;

    const errors = Storage.getErrorsByMode(modeFilter);

    if (errors.length === 0) {
      container.innerHTML = modeTabsHtml + `
        <div class="empty-state">
          <div class="empty-state-icon">✨</div>
          <div class="empty-state-text">${modeFilter === 'reading' ? '読み' : '書き'}の間違いはありません。<br>素晴らしい！</div>
        </div>
      `;
      return;
    }

    // 漢字ごとにグループ化して、間違った日付の一覧を見せる
    const grouped = {};
    errors.forEach(err => {
      if (!grouped[err.char]) {
        grouped[err.char] = {
          char: err.char,
          grade: err.grade,
          dates: [],
          details: []
        };
      }
      grouped[err.char].dates.push(err.date);
      grouped[err.char].details.push(err);
    });

    const groupedHtml = Object.values(grouped).map(g => {
      // 日付を重複排除して時系列順に
      const uniqueDates = [...new Set(g.dates)].sort();
      const datesHtml = uniqueDates.map(d =>
        `<span style="background:rgba(255,107,107,0.15);color:#ff6b6b;padding:2px 8px;border-radius:4px;font-size:0.8rem;white-space:nowrap;">${d}</span>`
      ).join(' ');

      const detailLines = g.details.slice(0, 3).map(err => {
        const typeLabel = err.readingType === 'onyomi' ? '音' : '訓';
        if (modeFilter === 'reading') {
          return `<div style="font-size:0.82rem;color:#9898b0;">${typeLabel}読み「${err.correctAnswer}」→ 回答「${err.userAnswer}」(${err.date})</div>`;
        } else {
          return `<div style="font-size:0.82rem;color:#9898b0;">「${err.targetReading}」→ 回答「${err.userAnswer}」(${err.date})</div>`;
        }
      }).join('');

      const moreCount = g.details.length > 3 ? `<div style="font-size:0.8rem;color:#666;">他 ${g.details.length - 3} 件</div>` : '';

      return `
        <div class="error-item" style="flex-direction:column;align-items:stretch;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
            <span class="error-item-char">${g.char}</span>
            <div style="flex:1;">
              <div style="font-size:0.85rem;color:var(--text-secondary);">${g.grade}年生</div>
              ${detailLines}
              ${moreCount}
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
            ${datesHtml}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = modeTabsHtml + `<div class="error-list">${groupedHtml}</div>`;
  },

  setErrorMode(mode) {
    this.errorModeFilter = mode;
    this.renderTabContent();
  },

  // ==================== 復習スケジュール ====================
  renderSchedule(container) {
    const modeFilter = this.scheduleModeFilter;

    const modeTabsHtml = `
      <div style="display:flex;gap:8px;justify-content:center;margin:16px 0;">
        <button class="btn ${modeFilter === 'reading' ? 'btn-primary' : 'btn-secondary'}" style="padding:6px 20px;" onclick="History.setScheduleMode('reading')">
          📖 読み
        </button>
        <button class="btn ${modeFilter === 'writing' ? 'btn-primary' : 'btn-secondary'}" style="padding:6px 20px;" onclick="History.setScheduleMode('writing')">
          ✏️ 書き
        </button>
      </div>
    `;

    const schedules = Storage.getReviewSchedule(modeFilter);

    if (schedules.length === 0) {
      container.innerHTML = modeTabsHtml + `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div class="empty-state-text">${modeFilter === 'reading' ? '読み' : '書き'}の復習対象はありません。<br>間違いゼロ！素晴らしい！</div>
        </div>
      `;
      return;
    }

    // 復習が必要な漢字の数
    const overdueCount = schedules.filter(s => s.reviews.some(r => r.status === 'overdue')).length;
    const summaryHtml = overdueCount > 0
      ? `<div style="text-align:center;padding:12px;background:rgba(255,107,107,0.1);border-radius:12px;margin-bottom:16px;color:#ff6b6b;font-weight:500;">
           🔥 復習が必要な漢字が ${overdueCount} 字あります！
         </div>`
      : '';

    const statusIcon = (status) => {
      switch (status) {
        case 'passed': return '✅';
        case 'failed': return '❌';
        case 'overdue': return '🔴';
        case 'upcoming': return '⏳';
        default: return '⬜';
      }
    };
    const statusLabel = (status) => {
      switch (status) {
        case 'passed': return '合格';
        case 'failed': return '不合格';
        case 'overdue': return '要復習';
        case 'upcoming': return '予定';
        default: return '─';
      }
    };

    const scheduleHtml = schedules.map(s => {
      const reviewCells = s.reviews.map(r => {
        const icon = statusIcon(r.status);
        const label = statusLabel(r.status);
        const bgColor = r.status === 'overdue' ? 'rgba(255,107,107,0.15)' :
                        r.status === 'passed' ? 'rgba(77,219,122,0.15)' :
                        r.status === 'failed' ? 'rgba(255,107,107,0.1)' :
                        'rgba(255,255,255,0.05)';
        return `
          <div style="text-align:center;padding:8px 4px;background:${bgColor};border-radius:8px;flex:1;min-width:80px;">
            <div style="font-size:0.75rem;color:#9898b0;margin-bottom:4px;">${r.label}</div>
            <div style="font-size:1.2rem;">${icon}</div>
            <div style="font-size:0.7rem;color:#9898b0;margin-top:2px;">${r.dueDate.slice(5)}</div>
            <div style="font-size:0.7rem;color:${r.status === 'overdue' ? '#ff6b6b' : '#9898b0'};">${label}</div>
          </div>
        `;
      }).join('');

      return `
        <div style="background:var(--card-bg);border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid var(--border-color);">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <span style="font-size:2rem;font-weight:bold;">${s.char}</span>
            <div>
              <div style="font-size:0.85rem;color:var(--text-secondary);">${s.grade}年生</div>
              <div style="font-size:0.75rem;color:#9898b0;">初回間違い: ${s.firstErrorDate}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${reviewCells}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = modeTabsHtml + summaryHtml + scheduleHtml;
  },

  setScheduleMode(mode) {
    this.scheduleModeFilter = mode;
    this.renderTabContent();
  }
};
