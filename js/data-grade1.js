const KANJI_GRADE1_DATA = {
  "一": {
    on: ["イチ", "イツ"], kun: ["ひと"], radical: "一",
    etymology: "一本の横線で、ひとつの数を表した指事文字。",
    hint: "よこにまっすぐ線をひいて覚えよう。",
    examples: [{ reading: "イチ", text: "一がつのカレンダー" }, { reading: "ひと", text: "りんごを一つたべる" }]
  },
  "右": {
    on: ["ウ", "ユウ"], kun: ["みぎ"], radical: "口",
    etymology: "右手と、いのるための器（口）の形から「みぎ」を表す。",
    hint: "右手で口にごはんをはこぶ様子をイメージしよう。",
    examples: [{ reading: "ウ", text: "右折（うせつ）する" }, { reading: "ユウ", text: "左右（さゆう）をかくにんする" }, { reading: "みぎ", text: "右をむく" }]
  },
  "雨": {
    on: ["ウ"], kun: ["あめ", "あま"], radical: "雨",
    etymology: "空からしずくが落ちてくる様子を表した象形文字。",
    hint: "窓から雨のしずくが落ちているところを書こう。",
    examples: [{ reading: "ウ", text: "雨天（うてん）なので中止だ" }, { reading: "あめ", text: "今日は雨がふる" }]
  },
  "円": {
    on: ["エン"], kun: ["まる"], radical: "冂",
    etymology: "まるい形を表した象形文字が変化したもの。",
    hint: "まるいお金をイメージして書こう。",
    examples: [{ reading: "エン", text: "百円玉をもつ" }, { reading: "まる", text: "円いお月さま" }]
  },
  "王": {
    on: ["オウ"], kun: [], radical: "玉",
    etymology: "大きなまさかり（斧）の形から、力を持つ「王様」を表す。",
    hint: "一番上と下、そして真ん中に線を引いて横棒を結ぼう。",
    examples: [{ reading: "オウ", text: "王様（おうさま）の命令" }]
  },
  "音": {
    on: ["オン", "イン"], kun: ["おと", "ね"], radical: "音",
    etymology: "口の中に言葉が含まれている様子から、「おと」を表す。",
    hint: "立つ（立）と、太陽（日）ではなく口から音が出る様子と覚えよう。",
    examples: [{ reading: "オン", text: "音楽（おんがく）をきく" }, { reading: "おと", text: "大きな音がなる" }]
  },
  "下": {
    on: ["カ", "ゲ"], kun: ["した", "しも", "もと", "さ", "くだ", "お"], radical: "一",
    etymology: "基準の線の下側に点を打って「した」を表した指事文字。",
    hint: "横線の下に、縦と点の棒を書こう。",
    examples: [{ reading: "カ", text: "地下（ちか）を見る" }, { reading: "した", text: "つくえの下に入る" }, { reading: "さ", text: "頭を下げる" }]
  },
  "火": {
    on: ["カ"], kun: ["ひ", "ほ"], radical: "火",
    etymology: "炎が燃え上がる形を表した象形文字。",
    hint: "人がバンザイしているみたいだけど、「点・はらい」で燃える火を書こう。",
    examples: [{ reading: "カ", text: "火曜日（かようび）の予定" }, { reading: "ひ", text: "火がもえる" }]
  },
  "花": {
    on: ["カ"], kun: ["はな"], radical: "艸",
    etymology: "植物（草かんむり）と「変化する（化）」の意味をあわせて「はな」。",
    hint: "草かんむりの下に、「化」を書こう。",
    examples: [{ reading: "カ", text: "花瓶（かびん）に水を入れる" }, { reading: "はな", text: "きれいな花がさく" }]
  },
  "貝": {
    on: ["バイ"], kun: ["かい"], radical: "貝",
    etymology: "二枚貝の形を表した象形文字。昔はお金として使われた。",
    hint: "目という字の下に、足（八）を二本つけよう。",
    examples: [{ reading: "かい", text: "海で貝をひろう" }]
  },
  "学": {
    on: ["ガク", "ガッ"], kun: ["まな"], radical: "子",
    etymology: "両手で建物の屋根を交差させて作る様子と「子」で、子どもが学ぶ場所を表す。",
    hint: "ツの下に子（こども）が学んでいる様子を覚えよう。",
    examples: [{ reading: "ガッ", text: "学校（がっこう）へ行く" }, { reading: "まな", text: "漢字を学ぶ" }]
  },
  "気": {
    on: ["キ", "ケ"], kun: [], radical: "气",
    etymology: "もやもやと立ち上る雲や蒸気の形から、「いき」や「気体」を表す。",
    hint: "気という字の中に「メ」を書いて覚えよう。",
    examples: [{ reading: "キ", text: "元気に走る" }, { reading: "ケ", text: "寒気（さむけ）がする" }]
  },
  "九": {
    on: ["キュウ", "ク"], kun: ["ここの"], radical: "乙",
    etymology: "折れ曲がった腕の形から数を表す文字。",
    hint: "ノの字から、ぐいっと右に曲がって少しはねるよ。",
    examples: [{ reading: "キュウ", text: "野球（やきゅう）の九回" }, { reading: "ク", text: "九月（くがつ）" }, { reading: "ここの", text: "九日（ここのか）が誕生日だ" }]
  },
  "休": {
    on: ["キュウ"], kun: ["やす"], radical: "人",
    etymology: "人（にんべん）が木によりかかって休む様子を表す。",
    hint: "「人」が「木」のそばで「休む」と覚えよう。",
    examples: [{ reading: "キュウ", text: "休日（きゅうじつ）に出かける" }, { reading: "やす", text: "すこし休む" }]
  },
  "玉": {
    on: ["ギョク"], kun: ["たま"], radical: "玉",
    etymology: "丸い宝石をひもでつないだ形を表す。",
    hint: "王さまの「王」に、「しるし（点）」をひとつ付けよう。",
    examples: [{ reading: "ギョク", text: "宝玉（ほうぎょく）" }, { reading: "たま", text: "玉をなげる" }]
  },
  "金": {
    on: ["キン", "コン"], kun: ["かね", "かな"], radical: "金",
    etymology: "土の中に光る鉱物（金属）がある形を表す。",
    hint: "傘の下に王様がいて、点々が付いているよ。",
    examples: [{ reading: "キン", text: "金曜日（きんようび）だ" }, { reading: "かね", text: "お金をつかう" }]
  },
  "空": {
    on: ["クウ"], kun: ["そら", "あ", "から", "す"], radical: "穴",
    etymology: "穴（あなかんむり）を作り、その下の空間から「空（そら）」を表す。",
    hint: "穴かんむりの下に、「工（こう）」を書こう。",
    examples: [{ reading: "クウ", text: "空気（くうき）をいれる" }, { reading: "そら", text: "青い空を見る" }, { reading: "あ", text: "空き箱（ばこ）" }, { reading: "から", text: "空手（からて）の練習" }]
  },
  "月": {
    on: ["ゲツ", "ガツ"], kun: ["つき"], radical: "月",
    etymology: "三日月の形を表した象形文字。",
    hint: "はしごみたいだけど、下が開いているよ。",
    examples: [{ reading: "ゲツ", text: "月曜日（げつようび）" }, { reading: "つき", text: "きれいな月" }]
  },
  "犬": {
    on: ["ケン"], kun: ["いぬ"], radical: "犬",
    etymology: "いぬの横向きの形を表した象形文字。",
    hint: "大きい（大）の右上に「点」をつけるよ。",
    examples: [{ reading: "ケン", text: "番犬（ばんけん）にちゅうい" }, { reading: "いぬ", text: "こ犬と遊ぶ" }]
  },
  "見": {
    on: ["ケン"], kun: ["み"], radical: "見",
    etymology: "目を大きく開いて強調し、その下の人を表し「みる」こと。",
    hint: "目という字に、足がはえているよ。",
    examples: [{ reading: "ケン", text: "見学（けんがく）に行く" }, { reading: "み", text: "テレビを見る" }]
  },
  "五": {
    on: ["ゴ"], kun: ["いつ"], radical: "二",
    etymology: "糸巻きの形から「５」という数を表す。",
    hint: "上から下へジグザグに書いて横線を入れよう。",
    examples: [{ reading: "ゴ", text: "五十円（ごじゅうえん）" }, { reading: "いつ", text: "五つのりんご" }]
  },
  "口": {
    on: ["コウ", "ク"], kun: ["くち"], radical: "口",
    etymology: "人間の大きくあけた口の形を表した象形文字。",
    hint: "四角い箱を書くように覚えよう。",
    examples: [{ reading: "コウ", text: "人口（じんこう）がふえる" }, { reading: "くち", text: "口をあける" }]
  },
  "校": {
    on: ["コウ"], kun: [], radical: "木",
    etymology: "木材を交差させて組んだたてもの（交）の意味から、「学校」や建物を表す。",
    hint: "木へんに、交差する「交」を書くよ。",
    examples: [{ reading: "コウ", text: "学校（がっこう）の先生" }]
  },
  "左": {
    on: ["サ"], kun: ["ひだり"], radical: "工",
    etymology: "左手でもの（工）を持つ形から「ひだり」を表す。",
    hint: "ナの字の下に「工」という字を書くよ。",
    examples: [{ reading: "サ", text: "左右（さゆう）を見る" }, { reading: "ひだり", text: "左をむく" }]
  },
  "三": {
    on: ["サン"], kun: ["み"], radical: "一",
    etymology: "三本の横線で、３つの数を表す指事文字。",
    hint: "一を３つ書くけれど、まん中が一番みじかいよ。",
    examples: [{ reading: "サン", text: "三角（さんかく）の形" }, { reading: "み", text: "三つのケーキ" }]
  },
  "山": {
    on: ["サン", "セン"], kun: ["やま"], radical: "山",
    etymology: "連なる山の形を表した象形文字。",
    hint: "真ん中のたて棒が一番高いよ。",
    examples: [{ reading: "サン", text: "富士山（ふじさん）" }, { reading: "やま", text: "山にのぼる" }]
  },
  "子": {
    on: ["シ", "ス"], kun: ["こ"], radical: "子",
    etymology: "両手を広げた赤ちゃんの形を表す象形文字。",
    hint: "一番上は丸めず、カクカクッと書いて横線を引こう。",
    examples: [{ reading: "シ", text: "帽子（ぼうし）をかぶる" }, { reading: "ス", text: "様子（ようす）を見る" }, { reading: "こ", text: "子どもとあそぶ" }]
  },
  "四": {
    on: ["シ"], kun: ["よ", "よん"], radical: "囗",
    etymology: "よっつに分かれる様子から、「４」を表す。",
    hint: "口の中に「ル」みたいな八を書こう。",
    examples: [{ reading: "シ", text: "四角（しかく）い箱" }, { reading: "よっ", text: "四つのパン" }]
  },
  "糸": {
    on: ["シ"], kun: ["いと"], radical: "糸",
    etymology: "絹糸がたばねられている形を表す。",
    hint: "「く・ム・小」を組み合わせて書こう。",
    examples: [{ reading: "いと", text: "毛糸（けいと）のぼうし" }, { reading: "いと", text: "赤い糸をむすぶ" }]
  },
  "字": {
    on: ["ジ"], kun: ["あざ"], radical: "子",
    etymology: "家（うかんむり）と子で、文字が子どものように増えていくことを表す。",
    hint: "うかんむりの下に「子」を書こう。",
    examples: [{ reading: "ジ", text: "漢字を勉強する" }]
  },
  "耳": {
    on: ["ジ"], kun: ["みみ"], radical: "耳",
    etymology: "人間の耳の形を表した象形文字。",
    hint: "目という字に似ているけど、縦の棒が下に出るよ。",
    examples: [{ reading: "ジ", text: "耳鼻科（じびか）に行く" }, { reading: "みみ", text: "耳をすます" }]
  },
  "七": {
    on: ["シチ"], kun: ["なな"], radical: "一",
    etymology: "横線と縦線を交差させ、「切る」意味から数字の「７」を表す。",
    hint: "十みたいだけど、しっぽが曲がっているよ。",
    examples: [{ reading: "シチ", text: "七月（しちがつ）" }, { reading: "なな", text: "七つのほし" }]
  },
  "車": {
    on: ["シャ"], kun: ["くるま"], radical: "車",
    etymology: "車輪が二つある車の形を表した象形文字。",
    hint: "日という字の上下に横線があり、串刺しになっているよ。",
    examples: [{ reading: "シャ", text: "自動車（じどうしゃ）にのる" }, { reading: "くるま", text: "車がとおる" }]
  },
  "手": {
    on: ["シュ"], kun: ["て", "た"], radical: "手",
    etymology: "指を広げた手の形を表した象形文字。",
    hint: "横ぼう３本に長い縦ぼうを組み合わせて、最後にはねるよ。",
    examples: [{ reading: "シュ", text: "歌手（かしゅ）のうた" }, { reading: "て", text: "手をあらう" }]
  },
  "十": {
    on: ["ジュウ", "ジッ", "ジュッ"], kun: ["とお", "と"], radical: "十",
    etymology: "すべての数がそろうことを一本の縦線と横線の交差で表した。",
    hint: "たてとよこのまっすぐな棒のクロスだね。",
    examples: [{ reading: "ジュウ", text: "十円（じゅうえん）をもらう" }, { reading: "とお", text: "十こかう" }]
  },
  "出": {
    on: ["シュツ", "シュッ"], kun: ["で", "だ"], radical: "凵",
    etymology: "足あとの形から、「そとへ出る」ことを表す。",
    hint: "山が二つ重なっているみたいだけど、下から上へ出るイメージだよ。",
    examples: [{ reading: "シュッ", text: "出発（しゅっぱつ）の合図" }, { reading: "で", text: "外に出る" }, { reading: "だ", text: "宿題を出す" }]
  },
  "女": {
    on: ["ジョ", "ニョ"], kun: ["おんな", "め"], radical: "女",
    etymology: "両手を交差して座り込んでいる女性の形を表した象形文字。",
    hint: "くの字を書いてから、ノを書いて最後に横線だよ。",
    examples: [{ reading: "ジョ", text: "女子（じょし）の生徒" }, { reading: "おんな", text: "女の子があそぶ" }]
  },
  "小": {
    on: ["ショウ"], kun: ["ちい", "こ", "お"], radical: "小",
    etymology: "点が３つ集まって、ちいさいものを表す。",
    hint: "真ん中に縦線のはねを書いて、左右に点を打つよ。",
    examples: [{ reading: "ショウ", text: "小学校（しょうがっこう）" }, { reading: "ちい", text: "小さい石" }, { reading: "こ", text: "小鳥（ことり）がなく" }]
  },
  "上": {
    on: ["ジョウ"], kun: ["うえ", "うわ", "かみ", "あ", "のぼ"], radical: "一",
    etymology: "基準の線の上側に点を打って「うえ」を表した。",
    hint: "縦の棒を書いてから右に短く出し、一番下に長い横線をひくよ。",
    examples: [{ reading: "ジョウ", text: "屋上（おくじょう）にのぼる" }, { reading: "うえ", text: "つくえの上を見る" }, { reading: "あ", text: "手を上げる" }]
  },
  "森": {
    on: ["シン"], kun: ["もり"], radical: "木",
    etymology: "たくさんの木が生い茂る様子から「もり」を表す。",
    hint: "木を３つ並べて書くよ。上が１つ、下が２つだね。",
    examples: [{ reading: "シン", text: "森林（しんりん）の中" }, { reading: "もり", text: "森のどうぶつ達" }]
  },
  "人": {
    on: ["ジン", "ニン"], kun: ["ひと"], radical: "人",
    etymology: "横から見た人の形を表した象形文字。",
    hint: "左から右へ支え合うように立っている姿を書こう。",
    examples: [{ reading: "ジン", text: "人口（じんこう）がへる" }, { reading: "ニン", text: "五人（ごにん）のともだち" }, { reading: "ひと", text: "立派な人になる" }]
  },
  "水": {
    on: ["スイ"], kun: ["みず"], radical: "水",
    etymology: "川をはげしく流れる水の様子を表す。",
    hint: "真ん中の縦からはねて、左右から流れる水を書くよ。",
    examples: [{ reading: "スイ", text: "水曜日（すいようび）" }, { reading: "みず", text: "水をのむ" }]
  },
  "正": {
    on: ["セイ", "ショウ"], kun: ["ただ", "まさ"], radical: "止",
    etymology: "まっすぐ進んで止まり、正しい道を守る意味合いを持つ。",
    hint: "一を書いて、その下に「止まる」を書こう。",
    examples: [{ reading: "セイ", text: "不正（ふせい）をなおす" }, { reading: "ショウ", text: "お正月（しょうがつ）" }, { reading: "ただ", text: "正しいこたえ" }]
  },
  "生": {
    on: ["セイ", "ショウ"], kun: ["い", "う", "お", "は", "き", "なま"], radical: "生",
    etymology: "地面から草木が生えてくる様子を表す。",
    hint: "ノの字から横・縦と書いて、下のほうに二本横線を引くよ。",
    examples: [{ reading: "セイ", text: "先生（せんせい）の話" }, { reading: "い", text: "生きる力がわく" }, { reading: "う", text: "赤ちゃんが生まれる" }, { reading: "なま", text: "生たまごをたべる" }]
  },
  "青": {
    on: ["セイ", "ショウ"], kun: ["あお"], radical: "青",
    etymology: "井戸からくみ上げた澄んだ水（月は円の古い形）のような色を表す。",
    hint: "上の部分は三本線で縦の棒。下は「月」だよ。",
    examples: [{ reading: "セイ", text: "青年（せいねん）のころ" }, { reading: "あお", text: "青い空" }]
  },
  "夕": {
    on: ["セキ"], kun: ["ゆう"], radical: "夕",
    etymology: "半月が出始めた、夕方の様子を表す象形文字。",
    hint: "カタカナの「タ」と同じように書くよ。",
    examples: [{ reading: "セキ", text: "朝夕（ちょうせき）のあいさつ" }, { reading: "ゆう", text: "夕日（ゆうひ）がしずむ" }]
  },
  "石": {
    on: ["セキ", "シャク", "コク"], kun: ["いし"], radical: "石",
    etymology: "がけ（厂）と、そこにある四角い石（口）を表す。",
    hint: "横線とノの下に、四角い「口」を書くよ。",
    examples: [{ reading: "セキ", text: "宝石（ほうせき）がひかる" }, { reading: "いし", text: "石をなげる" }]
  },
  "赤": {
    on: ["セキ", "シャク"], kun: ["あか"], radical: "赤",
    etymology: "火と人を組み合わせ、火で照らすようなあか色を表す。",
    hint: "土かんむりの下に、ハと二本線、そして両側に点を打つよ。",
    examples: [{ reading: "セキ", text: "赤道（せきどう）を通る" }, { reading: "あか", text: "赤い車" }]
  },
  "千": {
    on: ["セン"], kun: ["ち"], radical: "十",
    etymology: "人が歩く姿に横線を足して千という数を表す。",
    hint: "ノを書いて、下に「十」を書くよ。",
    examples: [{ reading: "セン", text: "千円（せんえん）さつ" }, { reading: "ち", text: "千代紙（ちよがみ）をおる" }]
  },
  "川": {
    on: ["セン"], kun: ["かわ"], radical: "川",
    etymology: "２つの岸にはさまれて水が流れる様子を表す。",
    hint: "たてに３本の線。左は短く、まん中も短く、右は長く。",
    examples: [{ reading: "セン", text: "河川（かせん）のながれ" }, { reading: "かわ", text: "川でおよぐ" }]
  },
  "先": {
    on: ["セン"], kun: ["さき"], radical: "儿",
    etymology: "足の形と人の形から、前へ進んでいく「さき」を表す。",
    hint: "ノの横に横線を２本書き、下は「ル」のように足を書くよ。",
    examples: [{ reading: "セン", text: "先生（せんせい）の話" }, { reading: "さき", text: "先に行く" }]
  },
  "早": {
    on: ["ソウ", "サッ"], kun: ["はや"], radical: "日",
    etymology: "太陽（日）が昇る時間、つまり「あさ」や「はやい」を表す。",
    hint: "お日さまの「日」の下に、「十」を書こう。",
    examples: [{ reading: "ソウ", text: "早朝（そうちょう）におきる" }, { reading: "はや", text: "早くはしる" }]
  },
  "草": {
    on: ["ソウ"], kun: ["くさ"], radical: "艸",
    etymology: "草かんむりと、「早く」の意味をあわせて植物の「くさ」を表す。",
    hint: "草かんむりの下に、「早」を書くよ。",
    examples: [{ reading: "ソウ", text: "雑草（ざっそう）をぬく" }, { reading: "くさ", text: "草がはえる" }]
  },
  "足": {
    on: ["ソク"], kun: ["あし", "た"], radical: "足",
    etymology: "人間のあしの形。すねから下を表した象形文字。",
    hint: "口の下に「止」と似た形を書くよ。",
    examples: [{ reading: "ソク", text: "一足（いっそく）のくつ" }, { reading: "あし", text: "足がはやい" }, { reading: "た", text: "数が足りる" }]
  },
  "村": {
    on: ["ソン"], kun: ["むら"], radical: "木",
    etymology: "木と基準（寸）からなり、人々が集まる「むら」を表す。",
    hint: "木へんの横に、「寸」を書くよ。",
    examples: [{ reading: "ソン", text: "村長（そんちょう）のはなし" }, { reading: "むら", text: "村のまつり" }]
  },
  "大": {
    on: ["ダイ", "タイ"], kun: ["おお"], radical: "大",
    etymology: "人が両手両足を広げた様子から、「おおきい」を表す。",
    hint: "横線を長ーく引いてから、人間（人）を書くようにね。",
    examples: [{ reading: "ダイ", text: "大学（だいがく）に行く" }, { reading: "タイ", text: "大切なこと" }, { reading: "おお", text: "大きな犬" }]
  },
  "男": {
    on: ["ダン", "ナン"], kun: ["おとこ"], radical: "田",
    etymology: "田んぼと力強い腕の絵から、畑仕事をする「おとこ」を表す。",
    hint: "上の「田」と下の「力」のバランスを考えて書こう。",
    examples: [{ reading: "ダン", text: "男子（だんし）のトイレ" }, { reading: "おとこ", text: "男のかの人" }]
  },
  "竹": {
    on: ["チク"], kun: ["たけ"], radical: "竹",
    etymology: "竹の葉と茎がならんで生えている様子から。",
    hint: "左と右、同じような形を二つ並べて書くよ。",
    examples: [{ reading: "チク", text: "竹林（ちくりん）を歩く" }, { reading: "たけ", text: "竹のぼうを拾う" }]
  },
  "中": {
    on: ["チュウ"], kun: ["なか"], radical: "丨",
    etymology: "枠の真ん中に棒を立てた様子から、「なか」を表す。",
    hint: "「口」を書いて、真ん中を縦ぼうでつらぬこう。",
    examples: [{ reading: "チュウ", text: "中学校（ちゅうがっこう）" }, { reading: "なか", text: "箱の中を見る" }]
  },
  "虫": {
    on: ["チュウ"], kun: ["むし"], radical: "虫",
    etymology: "ヘビや虫の形を表した文字。",
    hint: "中に「口」を書いて、縦ぼうを突き抜け、「ム」のように下を描くよ。",
    examples: [{ reading: "チュウ", text: "昆虫（こんちゅう）のずかん" }, { reading: "むし", text: "虫をつかまえる" }]
  },
  "町": {
    on: ["チョウ"], kun: ["まち"], radical: "田",
    etymology: "田んぼと整備された道（丁）から、人が住む「まち」を表す。",
    hint: "田の横に「丁」という字を書くよ。",
    examples: [{ reading: "チョウ", text: "町長（ちょうちょう）さん" }, { reading: "まち", text: "新しい町に行く" }]
  },
  "天": {
    on: ["テン"], kun: ["あまつ", "あめ", "あま"], radical: "大",
    etymology: "大の字になった人の上に線をひいて、はるか上の空「てん」を表す。",
    hint: "横線を二本かいて、下から「人」のようにはらうよ。",
    examples: [{ reading: "テン", text: "天井（てんじょう）を見る" }, { reading: "あま", text: "天の川（あまのがわ）" }]
  },
  "田": {
    on: ["デン"], kun: ["た"], radical: "田",
    etymology: "四角く区切られた農地の形を表す。",
    hint: "口を書いてから、中に十を書こう。",
    examples: [{ reading: "デン", text: "水田（すいでん）に水を入れる" }, { reading: "た", text: "田んぼのカエル" }]
  },
  "土": {
    on: ["ド", "ト"], kun: ["つち"], radical: "土",
    etymology: "地面から土のもりあがっている様子を表す。",
    hint: "十と似ているけど、一番下に横線を足すよ。",
    examples: [{ reading: "ド", text: "土曜日（どようび）" }, { reading: "つち", text: "土をほる" }]
  },
  "二": {
    on: ["ニ"], kun: ["ふた"], radical: "二",
    etymology: "二本の横線で２つの数を表す。",
    hint: "上を短く、下を長く二本線を書こう。",
    examples: [{ reading: "ニ", text: "二月（にがつ）のカレンダー" }, { reading: "ふた", text: "二つのりんご" }]
  },
  "日": {
    on: ["ニチ", "ジツ"], kun: ["ひ", "か"], radical: "日",
    etymology: "太陽の丸い形の真ん中に黒点がある様子を表した象形文字。",
    hint: "四角い箱の中に、一本横線を引こう。",
    examples: [{ reading: "ニチ", text: "日曜日（にちようび）" }, { reading: "ひ", text: "日がしずむ" }, { reading: "か", text: "十日（とおか）から始まる" }]
  },
  "入": {
    on: ["ニュウ"], kun: ["い", "はい"], radical: "入",
    etymology: "テントやまくの入り口を開けた形。",
    hint: "人と似ているけど、右のはらいの方が上から始まるよ。",
    examples: [{ reading: "ニュウ", text: "入学（にゅうがく）する" }, { reading: "い", text: "箱に入れる" }, { reading: "はい", text: "家に入る" }]
  },
  "年": {
    on: ["ネン"], kun: ["とし"], radical: "干",
    etymology: "たわけに実った稲を背負う人の様子から「実り」の周期である年を表す。",
    hint: "ノの字から横、短い縦、横の三本線に一番下が少し長い横線だよ。",
    examples: [{ reading: "ネン", text: "一年生（いちねんせい）に" }, { reading: "とし", text: "新らしい年をむかえる" }]
  },
  "白": {
    on: ["ハク", "ビャク"], kun: ["しろ", "しら"], radical: "白",
    etymology: "どんぐりのような木の実の白い中身を表したという説がある。",
    hint: "日の字のいちばん上に、「ノ」をちょこんと付けよう。",
    examples: [{ reading: "ハク", text: "白鳥（はくちょう）がとぶ" }, { reading: "しろ", text: "白いかみ" }]
  },
  "八": {
    on: ["ハチ"], kun: ["や", "やっ", "よう"], radical: "八",
    etymology: "物が左右に分かれる様子から、「８」を表す。",
    hint: "カタカナの「ハ」と同じように、左と右にはらって書こう。",
    examples: [{ reading: "ハチ", text: "八月（はちがつ）うまれ" }, { reading: "やっ", text: "八つのリンゴ" }, { reading: "よう", text: "八日（ようか）に会う" }]
  },
  "百": {
    on: ["ヒャク"], kun: [], radical: "白",
    etymology: "どんぐりなどの実（白）と「一」をあわせ、数が多い「ひゃく」を表す。",
    hint: "一番上に一をかいて、その下に「白」を書くよ。",
    examples: [{ reading: "ヒャク", text: "百円（ひゃくえん）コイン" }]
  },
  "文": {
    on: ["ブン", "モン"], kun: ["ふみ"], radical: "文",
    etymology: "人があやとりをしているような、もようの形から「もじ」や「ふみ」を表す。",
    hint: "少し帽子をかぶったような「大」に似ているね、でも一番上は点だよ。",
    examples: [{ reading: "ブン", text: "作文（さくぶん）を書く" }, { reading: "モン", text: "文句（もんく）を言う" }, { reading: "ふみ", text: "恋文（こいぶみ）" }]
  },
  "木": {
    on: ["ボク", "モク"], kun: ["き", "こ"], radical: "木",
    etymology: "根をはった木の形を表した象形文字。",
    hint: "十をかいてから、左と右にはらうよ。",
    examples: [{ reading: "モク", text: "木曜日（もくようび）" }, { reading: "き", text: "大きな木" }]
  },
  "本": {
    on: ["ホン"], kun: ["もと"], radical: "木",
    etymology: "木の根もとの部分にしるしをつけ、「ねもと」や「書物」を表す。",
    hint: "「木」を書いてから、下の方に短い横線を一本引こう。",
    examples: [{ reading: "ホン", text: "本だなに本をしまう" }, { reading: "もと", text: "山本（やまもと）さん" }]
  },
  "名": {
    on: ["メイ", "ミョウ"], kun: ["な"], radical: "口",
    etymology: "夕方暗くなって、口で自分の名前を名乗る様子を表す。",
    hint: "夕方の「夕」の下に、「口」を書こう。",
    examples: [{ reading: "メイ", text: "有名（ゆうめい）なひと" }, { reading: "ミョウ", text: "名字（みょうじ）をよぶ" }, { reading: "な", text: "名前（なまえ）をかく" }]
  },
  "目": {
    on: ["モク"], kun: ["め", "ま"], radical: "目",
    etymology: "人間の目の形をたてにした象形文字。",
    hint: "四角い箱の中に、横線が二本入っているよ。",
    examples: [{ reading: "モク", text: "目的（もくてき）をもつ" }, { reading: "め", text: "目をあける" }]
  },
  "立": {
    on: ["リツ", "リュウ"], kun: ["た", "だ"], radical: "立",
    etymology: "地面（一）の上に人が立っている様子を表す。",
    hint: "短い縦線と横線を書いてから、下に長い横線だよ。",
    examples: [{ reading: "リツ", text: "国立（こくりつ）の公園" }, { reading: "た", text: "席を立つ" }]
  },
  "力": {
    on: ["リョク", "リキ"], kun: ["ちから"], radical: "力",
    etymology: "筋肉がもりあがった腕の形から「ちから」を表す。",
    hint: "カタカナの「カ」と同じ形だよ。ぐっと曲げてはらおう。",
    examples: [{ reading: "リョク", text: "強力（きょうりょく）なパワー" }, { reading: "リキ", text: "力士（りきし）" }, { reading: "ちから", text: "力いっぱい走る" }]
  },
  "林": {
    on: ["リン"], kun: ["はやし"], radical: "木",
    etymology: "木がたくさん並んで生えている様子から。",
    hint: "木へんに、もう一つ「木」を書くよ。",
    examples: [{ reading: "リン", text: "森林（しんりん）の中" }, { reading: "はやし", text: "林の中をとおる" }]
  },
  "六": {
    on: ["ロク"], kun: ["む", "むい"], radical: "八",
    etymology: "家屋の形から派生して「６」の数を表す。",
    hint: "なべぶた（一番上）の下にハを書こう。",
    examples: [{ reading: "ロク", text: "六月（ろくがつ）の雨" }, { reading: "む", text: "六つのコップ" }, { reading: "むい", text: "六日（むいか）に出発だ" }]
  }
};
