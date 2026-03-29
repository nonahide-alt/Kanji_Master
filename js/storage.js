// =============================================================
// 漢字マスター - localStorage操作ユーティリティ
// =============================================================

const Storage = {
  HISTORY_KEY: "kanjiMaster_testHistory",

  // テスト履歴を全件取得
  getHistory() {
    const data = localStorage.getItem(this.HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  // テスト結果を保存
  saveTestResult(result) {
    const history = this.getHistory();
    result.id = this._generateId();
    result.timestamp = Date.now();
    history.push(result);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    return result;
  },

  // 特定の漢字の履歴をクリア
  clearKanjiHistory(kanjiChar) {
    const history = this.getHistory();
    const filtered = history.map(session => {
      return {
        ...session,
        questions: session.questions.filter(q => q.char !== kanjiChar)
      };
    }).filter(session => session.questions.length > 0);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filtered));
  },

  // 特定の漢字の履歴をモード別にクリア
  clearKanjiHistoryByMode(kanjiChar, mode) {
    const history = this.getHistory();
    const filtered = history.map(session => {
      if (session.mode !== mode) return session;
      return {
        ...session,
        questions: session.questions.filter(q => q.char !== kanjiChar)
      };
    }).filter(session => session.questions.length > 0);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filtered));
  },

  // 全履歴をクリア
  clearAllHistory() {
    localStorage.removeItem(this.HISTORY_KEY);
  },

  // 全履歴をモード別にクリア
  clearAllHistoryByMode(mode) {
    const history = this.getHistory();
    const filtered = history.filter(session => session.mode !== mode);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filtered));
  },

  // 漢字ごとのステータスを計算（mode: 'reading' | 'writing' | null で絞り込み）
  getKanjiStatus(kanjiChar, mode) {
    const kanji = getKanjiByChar(kanjiChar);
    if (!kanji) return { color: "gray", stars: [], totalStars: 0, filledStars: 0 };

    const allReadings = kanji.readings.map(r => r.reading);
    const testableSentences = (kanji.exampleSentences || []);
    
    // 星の総数は例文（問題）の数とする（ユーザー指定の「案2」）
    const totalStars = testableSentences.length;

    const history = this.getHistory();
    const kanjiQuestions = [];
    history.forEach(session => {
      if (mode && session.mode !== mode) return;
      session.questions.forEach(q => {
        if (q.char === kanjiChar) {
          kanjiQuestions.push(q);
        }
      });
    });

    // 読みのバリエーションを考慮した一致判定ヘルパー
    const isEquivalent = (base, variation) => {
      if (compareReadings(base, variation)) return true;
      const hBase = katakanaToHiragana(base);
      const hVar = katakanaToHiragana(variation);
      if (hBase.replace(/[くきつち]$/, 'っ') === hVar) return true;
      const rendakuMap = {
        'か':'が','き':'ぎ','く':'ぐ','け':'げ','こ':'ご',
        'さ':'ざ','し':'じ','す':'ず','せ':'ぜ','そ':'ぞ',
        'た':'だ','ち':'ぢ','つ':'づ','て':'で','と':'ど',
        'は':'ば','ひ':'び','ふ':'ぶ','へ':'べ','ほ':'ぼ',
        'は':'ぱ','ひ':'ぴ','ふ':'ぷ','へ':'ぺ','ほ':'ぽ'
      };
      for (const [before, after] of Object.entries(rendakuMap)) {
        if (hBase.startsWith(before) && hVar.startsWith(after) && hBase.slice(1) === hVar.slice(1)) return true;
      }
      return false;
    };

    // マスター済みの読みを特定
    const masteredReadings = new Set();
    kanjiQuestions.forEach(q => {
      if (q.matchedReading && q.correct) {
        masteredReadings.add(q.matchedReading);
      }
    });

    // 例文ベースでの星の状態を作成
    const sentenceStars = testableSentences.map(ex => {
      // その例文のターゲット読みがマスターされているかチェック
      const isFilled = Array.from(masteredReadings).some(mr => isEquivalent(ex.targetReading, mr));
      return {
        targetReading: ex.targetReading,
        filled: isFilled,
        out_of_scope: false
      };
    });

    // filledStarsの集計
    const filledStars = sentenceStars.filter(s => s.filled).length;

    // UI表示用に「基本の読み」ごとのステータスを構築
    // 基本の読み(allReadings)のうち、いずれかの例文に対応しているものは対象内とする
    const stars = allReadings.map(r => {
      const matchSentence = sentenceStars.find(s => isEquivalent(r, s.targetReading));
      return {
        reading: r,
        filled: matchSentence ? matchSentence.filled : false,
        out_of_scope: !matchSentence
      };
    });

    if (kanjiQuestions.length === 0) {
      return { color: "gray", stars, totalStars, filledStars: 0, label: "未学習", sentenceStars, reviewStreaks: {} };
    }

    // === 各読みごとの「間違い後の連続正解回数」を追跡 ===
    const MASTERY_STREAK = 3; // マスター昇格に必要な連続正解数
    // 読みごとの最後のエラーの有無と、エラー後の連続正解数を計算
    const readingStreaks = {}; // key: targetReading => { hasError, streak }
    const readingHasError = {}; // 読みごとに間違い履歴があるか

    kanjiQuestions.forEach(q => {
      const reading = q.matchedReading || q.targetReading || q.correctAnswer;
      if (!reading) return;
      if (!readingStreaks[reading]) {
        readingStreaks[reading] = { hasError: false, streak: 0 };
      }
      if (!q.correct) {
        readingStreaks[reading].hasError = true;
        readingStreaks[reading].streak = 0; // リセット
      } else {
        readingStreaks[reading].streak++;
      }
    });

    // 弱点の判定: 間違いがあり、まだ3回連続正解していない読みがあれば弱点
    let hasUnresolvedError = false;
    Object.values(readingStreaks).forEach(info => {
      if (info.hasError && info.streak < MASTERY_STREAK) {
        hasUnresolvedError = true;
      }
    });

    let color, label;
    if (hasUnresolvedError) {
      color = "red";
      label = "弱点";
    } else if (filledStars === totalStars) {
      color = "blue";
      label = "マスター";
    } else if (filledStars > 0) {
      color = "green";
      label = "学習中";
    } else {
      color = "gray";
      label = "未学習";
    }

    return { color, stars, totalStars, filledStars, label, sentenceStars, reviewStreaks: readingStreaks, masteryStreak: MASTERY_STREAK };
  },

  // 日別の学習量を集計
  getDailyStats() {
    const history = this.getHistory();
    const dailyMap = {};
    history.forEach(session => {
      const date = session.date;
      if (!dailyMap[date]) {
        dailyMap[date] = { total: 0, correct: 0, incorrect: 0 };
      }
      session.questions.forEach(q => {
        dailyMap[date].total++;
        if (q.correct) dailyMap[date].correct++;
        else dailyMap[date].incorrect++;
      });
    });
    return dailyMap;
  },

  // 間違い一覧を取得
  getErrors() {
    const history = this.getHistory();
    const errors = [];
    history.forEach(session => {
      session.questions.forEach(q => {
        if (!q.correct) {
          errors.push({
            date: session.date,
            grade: session.grade,
            mode: session.mode,
            char: q.char,
            targetReading: q.targetReading,
            readingType: q.readingType,
            userAnswer: q.userAnswer,
            correctAnswer: q.correctAnswer || q.targetReading
          });
        }
      });
    });
    return errors.reverse(); // 新しい順
  },

  // モード別にフィルタした間違い一覧
  getErrorsByMode(mode) {
    return this.getErrors().filter(e => e.mode === mode);
  },

  // モード別に間違えた回数が多い漢字TOP50を取得
  getErrorRankingByMode(mode, limit = 50) {
    const errors = this.getErrorsByMode(mode);
    const countMap = {};

    errors.forEach(err => {
      if (!countMap[err.char]) {
        countMap[err.char] = {
          char: err.char,
          grade: err.grade,
          count: 0,
          lastErrorDate: err.date
        };
      }
      countMap[err.char].count++;
      // getErrorsは新しい順(reverseされている)なので最初の出現が最新
    });

    // 回数が多い順にソート、同数の場合は最新エラー日が新しい順
    const ranking = Object.values(countMap).sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return b.lastErrorDate.localeCompare(a.lastErrorDate);
    });

    return ranking.slice(0, limit);
  },

  // 漢字ごとの間違い日と復習スケジュールを取得
  // 返すデータ: { char, mode, grade, firstErrorDate, reviews: [{interval, dueDate, status}] }
  getReviewSchedule(mode) {
    const history = this.getHistory();
    // 問題ごと（漢字+モード+読み種別+対象読み）の最初の間違い日を特定
    const errorMap = {}; // key: `${char}_${mode}_${readingType}_${targetReading}`

    history.forEach(session => {
      if (mode && session.mode !== mode) return;
      session.questions.forEach(q => {
        if (!q.correct) {
          const targetReading = q.targetReading || q.correctAnswer || '';
          const readingType = q.readingType || '';
          const key = `${q.char}_${session.mode}_${readingType}_${targetReading}`;
          if (!errorMap[key]) {
            errorMap[key] = {
              char: q.char,
              mode: session.mode,
              grade: session.grade,
              readingType: readingType,
              targetReading: targetReading,
              firstErrorDate: session.date,
              allResults: []
            };
          }
          // 最も古い間違い日を記録
          if (session.date < errorMap[key].firstErrorDate) {
            errorMap[key].firstErrorDate = session.date;
          }
        }
      });
    });

    // 各問題の全結果を時系列で収集
    history.forEach(session => {
      if (mode && session.mode !== mode) return;
      session.questions.forEach(q => {
        const targetReading = q.targetReading || q.correctAnswer || '';
        const readingType = q.readingType || '';
        const key = `${q.char}_${session.mode}_${readingType}_${targetReading}`;
        if (errorMap[key]) {
          errorMap[key].allResults.push({
            date: session.date,
            correct: q.correct
          });
        }
      });
    });

    // 復習スケジュールを生成
    const today = this._todayStr();
    const schedules = [];

    Object.values(errorMap).forEach(entry => {
      const intervals = [
        { label: '1日後', days: 1 },
        { label: '1週間後', days: 7 },
        { label: '1か月後', days: 30 }
      ];

      const reviews = intervals.map(interval => {
        const dueDate = this._addDays(entry.firstErrorDate, interval.days);
        // dueDate以降の結果があるかチェック
        const reviewResults = entry.allResults.filter(r => r.date >= dueDate);
        let status = 'pending'; // まだ復習期限が来ていない or 未実施
        if (today >= dueDate) {
          if (reviewResults.length === 0) {
            status = 'overdue'; // 期限過ぎたが未復習
          } else {
            const lastResult = reviewResults[reviewResults.length - 1];
            status = lastResult.correct ? 'passed' : 'failed';
          }
        } else {
          status = 'upcoming'; // まだ期限前
        }
        return {
          label: interval.label,
          days: interval.days,
          dueDate: dueDate,
          status: status
        };
      });

      schedules.push({
        char: entry.char,
        mode: entry.mode,
        grade: entry.grade,
        readingType: entry.readingType,
        targetReading: entry.targetReading,
        firstErrorDate: entry.firstErrorDate,
        reviews: reviews
      });
    });

    // 復習が必要なもの（overdue）を優先してソート
    schedules.sort((a, b) => {
      const aOverdue = a.reviews.some(r => r.status === 'overdue') ? 0 : 1;
      const bOverdue = b.reviews.some(r => r.status === 'overdue') ? 0 : 1;
      if (aOverdue !== bOverdue) return aOverdue - bOverdue;
      return a.firstErrorDate.localeCompare(b.firstErrorDate);
    });

    return schedules;
  },

  _todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  _addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // ======================== アプリ設定 ========================

  SETTINGS_KEY: 'kanjiMaster_settings',

  getSetting(key) {
    const defaults = {
      'readingSelfReport': true,
      'tabletMode': false
    };
    const data = localStorage.getItem(this.SETTINGS_KEY);
    if (!data) return defaults[key] !== undefined ? defaults[key] : null;
    try {
      const settings = JSON.parse(data);
      if (settings[key] !== undefined) return settings[key];
      return defaults[key] !== undefined ? defaults[key] : null;
    } catch {
      return defaults[key] !== undefined ? defaults[key] : null;
    }
  },

  setSetting(key, value) {
    const data = localStorage.getItem(this.SETTINGS_KEY);
    let settings = {};
    if (data) {
      try { settings = JSON.parse(data); } catch {}
    }
    settings[key] = value;
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }
};
