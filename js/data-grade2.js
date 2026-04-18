const KANJI_GRADE2_DATA = {
  "刀": {
    on: ["トウ"], kun: ["かたな"], radical: "刀",
    etymology: "刃のついた武器の形を表した象形文字。",
    hint: "日本刀（にほんとう）をイメージして書こう。",
    examples: [{ reading: "トウ", text: "日本刀をかざる" }, { reading: "かたな", text: "刀のさやをぬく" }]
  },
  "工": {
    on: ["コウ"], kun: [], radical: "工",
    etymology: "大工が使うさしがねの形を表した象形文字。",
    hint: "じょうぎのような形。上下の横線をたて線がつなぐ。",
    examples: [{ reading: "コウ", text: "工場でものをつくる" }]
  },
  "丸": {
    on: ["ガン"], kun: ["まる"], radical: "丶",
    etymology: "人がからだを丸くかがめた形から。",
    hint: "九の字に点をつけて丸い形をイメージしよう。",
    examples: [{ reading: "ガン", text: "丸薬をのむ" }, { reading: "まる", text: "丸い月がうかぶ" }]
  },
  "才": {
    on: ["サイ"], kun: [], radical: "扌",
    etymology: "もともと「ざえ」「才能」の意味を持つ指事文字。",
    hint: "十の字がすこしねじれた形。年れいを数えるときにも使う。",
    examples: [{ reading: "サイ", text: "天才の少年" }]
  },
  "万": {
    on: ["マン", "バン"], kun: [], radical: "一",
    etymology: "サソリの形を表した象形文字が、数を表すようになった。",
    hint: "「一」「ノ」「フ」を組み合わせて書こう。",
    examples: [{ reading: "マン", text: "一万円さつ" }, { reading: "バン", text: "万が一にそなえる" }]
  },
  "今": {
    on: ["コン", "キン"], kun: ["いま"], radical: "人",
    etymology: "ふたをしめた瞬間を表し、「いま」という意味になった。",
    hint: "ひとやねの下に、カタカナの「ラ」をかく形。",
    examples: [{ reading: "コン", text: "今回（こんかい）だけゆるす" }, { reading: "いま", text: "今すぐ出かける" }]
  },
  "元": {
    on: ["ゲン", "ガン"], kun: ["もと"], radical: "儿",
    etymology: "人の頭の部分を強調して、「はじまり」を表す。",
    hint: "二本のあしの上に横線をのせた形。",
    examples: [{ reading: "ゲン", text: "元気にあいさつする" }, { reading: "ガン", text: "元日にはつもうでに行く" }, { reading: "もと", text: "元の場所にもどす" }]
  },
  "公": {
    on: ["コウ"], kun: ["おおやけ"], radical: "八",
    etymology: "私（し）に対する「おおやけ」の意味。ムとハを組み合わせた会意文字。",
    hint: "ハの上にカタカナのムを書く形。",
    examples: [{ reading: "コウ", text: "公園であそぶ" }]
  },
  "内": {
    on: ["ナイ"], kun: ["うち"], radical: "冂",
    etymology: "門の中に入る形から「うち」を表す会意文字。",
    hint: "外（そと）の反対。門の中に人が入っている形。",
    examples: [{ reading: "ナイ", text: "室内であそぶ" }, { reading: "うち", text: "家の内がわ" }]
  },
  "分": {
    on: ["ブン", "フン", "ブ"], kun: ["わ"], radical: "刀",
    etymology: "刀でものを二つにわける形から。",
    hint: "八の下に刀を書いて、ものを分ける様子。",
    examples: [{ reading: "ブン", text: "半分にわける" }, { reading: "フン", text: "十分まつ" }, { reading: "わ", text: "ケーキを分ける" }]
  },
  "切": {
    on: ["セツ"], kun: ["き"], radical: "刀",
    etymology: "七と刀の組み合わせで、刀で切るという意味。",
    hint: "七の右に刀（りっとう）を書く。",
    examples: [{ reading: "セツ", text: "大切なものを守る" }, { reading: "き", text: "紙を切る" }]
  },
  "午": {
    on: ["ゴ"], kun: [], radical: "十",
    etymology: "杵（きね）の形を表した象形文字。昔の時刻「うま」の刻。",
    hint: "牛（うし）に似ているが、はらいが右に出る。",
    examples: [{ reading: "ゴ", text: "午前中にべんきょうする" }]
  },
  "友": {
    on: ["ユウ"], kun: ["とも"], radical: "又",
    etymology: "二つの手を重ねて、助け合う仲間を表す会意文字。",
    hint: "手と手をかさねて友だちをあらわす。",
    examples: [{ reading: "ユウ", text: "友人と話す" }, { reading: "とも", text: "友だちとあそぶ" }]
  },
  "太": {
    on: ["タイ", "タ"], kun: ["ふと"], radical: "大",
    etymology: "大に点をつけて、より大きい・太いを表す。",
    hint: "大きいの字に点をちょんと打つ。",
    examples: [{ reading: "タイ", text: "太陽がのぼる" }, { reading: "ふと", text: "太いえんぴつ" }]
  },
  "少": {
    on: ["ショウ"], kun: ["すく", "すこ"], radical: "小",
    etymology: "小さいものをさらに削って少なくする形。",
    hint: "小さいの点の位置がかわった形。",
    examples: [{ reading: "ショウ", text: "少年がはしる" }, { reading: "すこ", text: "少しやすむ" }]
  },
  "引": {
    on: ["イン"], kun: ["ひ"], radical: "弓",
    etymology: "弓の弦を引く形から「ひく」を表す。",
    hint: "弓へんに、まっすぐな線を引く。",
    examples: [{ reading: "イン", text: "引力をならう" }, { reading: "ひ", text: "つなを引く" }]
  },
  "心": {
    on: ["シン"], kun: ["こころ"], radical: "心",
    etymology: "心臓の形を表した象形文字。",
    hint: "ハートの形をくずした字。まん中の点が大切。",
    examples: [{ reading: "シン", text: "安心する" }, { reading: "こころ", text: "心をこめておくる" }]
  },
  "戸": {
    on: ["コ"], kun: ["と"], radical: "戸",
    etymology: "片開きのとびらの形を表した象形文字。",
    hint: "ドアが一枚ひらいている形をイメージしよう。",
    examples: [{ reading: "コ", text: "戸外であそぶ" }, { reading: "と", text: "戸をあける" }]
  },
  "方": {
    on: ["ホウ"], kun: ["かた"], radical: "方",
    etymology: "左右にひらいている形から、「方向」を表す。",
    hint: "なべぶたの下に、「万」ににた形を書く。",
    examples: [{ reading: "ホウ", text: "方角をしらべる" }, { reading: "かた", text: "書き方をならう" }]
  },
  "牛": {
    on: ["ギュウ"], kun: ["うし"], radical: "牛",
    etymology: "牛の頭を正面から見た形を表した象形文字。",
    hint: "午（ご）に似ているが、二画目が上に出る。",
    examples: [{ reading: "ギュウ", text: "牛肉をたべる" }, { reading: "うし", text: "牧場で牛を見る" }]
  },
  "父": {
    on: ["フ"], kun: ["ちち"], radical: "父",
    etymology: "石おのを持つ手の形から、「ちち」を表す。",
    hint: "ハの下にメのような形を書く。",
    examples: [{ reading: "フ", text: "父母に手紙を書く" }, { reading: "ちち", text: "父はしごとに出かけた" }]
  },
  "毛": {
    on: ["モウ"], kun: ["け"], radical: "毛",
    etymology: "人や動物の毛が生えている形を表した象形文字。",
    hint: "手にひらひらした毛がついた形。",
    examples: [{ reading: "モウ", text: "毛布にくるまる" }, { reading: "け", text: "ねこの毛がやわらかい" }]
  },
  "止": {
    on: ["シ"], kun: ["と", "や"], radical: "止",
    etymology: "足あとの形を表し、足をとめる意味になった。",
    hint: "足あとのような形。上へ「ト」下へ「ヒ」を書く。",
    examples: [{ reading: "シ", text: "中止になった" }, { reading: "と", text: "車が止まる" }]
  },
  "兄": {
    on: ["ケイ", "キョウ"], kun: ["あに"], radical: "儿",
    etymology: "口と人を組み合わせて、年上の兄弟を表す。",
    hint: "口の下に人のあしを書く形。",
    examples: [{ reading: "キョウ", text: "兄弟でなかよくする" }, { reading: "あに", text: "兄がかえってきた" }]
  },
  "冬": {
    on: ["トウ"], kun: ["ふゆ"], radical: "冫",
    etymology: "食べ物をしまい終える季節を表す。",
    hint: "寒い季節。下の点々が氷をあらわす。",
    examples: [{ reading: "トウ", text: "冬季オリンピック" }, { reading: "ふゆ", text: "冬は雪がふる" }]
  },
  "北": {
    on: ["ホク"], kun: ["きた"], radical: "匕",
    etymology: "二人の人が背中合わせになり、日が当たらない「北」を表す。",
    hint: "二人がせなかあわせになった形。",
    examples: [{ reading: "ホク", text: "北海道にいく" }, { reading: "きた", text: "北の空にほしが見える" }]
  },
  "半": {
    on: ["ハン"], kun: ["なか"], radical: "十",
    etymology: "牛を二つに分けた形から「なかば」を表す。",
    hint: "ソの下に横線と十を書く。",
    examples: [{ reading: "ハン", text: "半分たべる" }, { reading: "なか", text: "月の半（なか）ばになる" }]
  },
  "古": {
    on: ["コ"], kun: ["ふる"], radical: "口",
    etymology: "十と口を合わせて、十代も前から口伝えされる「ふるい」もの。",
    hint: "十の下に口を書く。",
    examples: [{ reading: "コ", text: "古代のれきし" }, { reading: "ふる", text: "古い本をよむ" }]
  },
  "台": {
    on: ["ダイ", "タイ"], kun: [], radical: "口",
    etymology: "ムと口を合わせた形。高い所にある台座を表す。",
    hint: "カタカナのムの下に口を書く。",
    examples: [{ reading: "ダイ", text: "台所でりょうりする" }, { reading: "タイ", text: "台風がちかづく" }]
  },
  "外": {
    on: ["ガイ", "ゲ"], kun: ["そと", "ほか", "はず"], radical: "夕",
    etymology: "夕方にうらないの骨にひびが入り、予想が外れた形から。",
    hint: "夕の右に卜（ぼくのぼう）を書く。",
    examples: [{ reading: "ガイ", text: "外国からの手紙" }, { reading: "そと", text: "外であそぶ" }]
  },
  "市": {
    on: ["シ"], kun: ["いち"], radical: "巾",
    etymology: "なべぶたの下に巾（ぬの）を書き、ものを売る場所を表す。",
    hint: "なべぶたの下にタオルの形。",
    examples: [{ reading: "シ", text: "市役所にいく" }, { reading: "いち", text: "朝市で買い物する" }]
  },
  "広": {
    on: ["コウ"], kun: ["ひろ"], radical: "广",
    etymology: "広い建物のひさしの中にムの空間がある形。",
    hint: "まだれの中にカタカナのム。",
    examples: [{ reading: "コウ", text: "広告をみる" }, { reading: "ひろ", text: "広いこうえん" }]
  },
  "母": {
    on: ["ボ"], kun: ["はは"], radical: "母",
    etymology: "乳房のある女性の形を表した象形文字。",
    hint: "女の中に点々がついた形。おかあさんの字。",
    examples: [{ reading: "ボ", text: "母国語をはなす" }, { reading: "はは", text: "母がごはんをつくる" }]
  },
  "用": {
    on: ["ヨウ"], kun: ["もち"], radical: "用",
    etymology: "柵（さく）の形から、つかうための道具を表す。",
    hint: "月に似ているが、まん中に線がもう一本ある。",
    examples: [{ reading: "ヨウ", text: "用事がある" }, { reading: "もち", text: "はさみを用いる" }]
  },
  "矢": {
    on: ["シ"], kun: ["や"], radical: "矢",
    etymology: "弓につがえて飛ばす矢の形を表した象形文字。",
    hint: "大の上にノをのせ、下をしめた形。",
    examples: [{ reading: "シ", text: "一矢をむくいる" }, { reading: "や", text: "矢をはなつ" }]
  },
  "交": {
    on: ["コウ"], kun: ["まじ", "ま", "か"], radical: "亠",
    etymology: "足を組んだ人の形から「まじわる」を表す。",
    hint: "なべぶたの下に足をくんだ父のような形。",
    examples: [{ reading: "コウ", text: "交番にとどける" }, { reading: "まじ", text: "友だちと交わる" }]
  },
  "会": {
    on: ["カイ", "エ"], kun: ["あ"], radical: "人",
    etymology: "人が集まって話し合う形を表す会意文字。",
    hint: "ひとやねの下にみんなが集まる。",
    examples: [{ reading: "カイ", text: "会議にでる" }, { reading: "あ", text: "友だちに会う" }]
  },
  "光": {
    on: ["コウ"], kun: ["ひかり", "ひか"], radical: "儿",
    etymology: "人の頭の上に火がともっている形から「ひかり」。",
    hint: "上に火がひかり、下に人のあし。",
    examples: [{ reading: "コウ", text: "日光をあびる" }, { reading: "ひかり", text: "光がさしこむ" }]
  },
  "同": {
    on: ["ドウ"], kun: ["おな"], radical: "口",
    etymology: "おなじ穴の中にものを集めた形から。",
    hint: "けいがまえの中に口が一つ。",
    examples: [{ reading: "ドウ", text: "同時にスタートする" }, { reading: "おな", text: "同じクラスの友だち" }]
  },
  "回": {
    on: ["カイ"], kun: ["まわ"], radical: "口",
    etymology: "水が丸く渦を巻いている形から「まわる」を表す。",
    hint: "大きな口の中にもう一つ口。回転するイメージ。",
    examples: [{ reading: "カイ", text: "三回くりかえす" }, { reading: "まわ", text: "こまが回る" }]
  },
  "多": {
    on: ["タ"], kun: ["おお"], radical: "夕",
    etymology: "夕（肉）を二つ重ねて「たくさん」を表す。",
    hint: "夕を二つたてに重ねた形。",
    examples: [{ reading: "タ", text: "多数の人があつまる" }, { reading: "おお", text: "本が多い" }]
  },
  "当": {
    on: ["トウ"], kun: ["あ"], radical: "田",
    etymology: "田の土地をあてがう形から「あたる」を表す。",
    hint: "ヨの下に一本のはらいを書く。",
    examples: [{ reading: "トウ", text: "当番をきめる" }, { reading: "あ", text: "くじに当たる" }]
  },
  "毎": {
    on: ["マイ"], kun: ["ごと"], radical: "母",
    etymology: "母に草の芽を加えて、次々に生まれる「いつも」を表す。",
    hint: "ノの下に母のような形。",
    examples: [{ reading: "マイ", text: "毎日れんしゅうする" }]
  },
  "池": {
    on: ["チ"], kun: ["いけ"], radical: "氵",
    etymology: "さんずいに也（へびの形）で、水がたまる場所を表す。",
    hint: "水のへんに「也」を書く。",
    examples: [{ reading: "チ", text: "電池をかえる" }, { reading: "いけ", text: "池にこいがいる" }]
  },
  "米": {
    on: ["ベイ", "マイ"], kun: ["こめ"], radical: "米",
    etymology: "稲の穂から米粒がついている形を表した象形文字。",
    hint: "木に点を二つ加えた形。十字にはらいと点。",
    examples: [{ reading: "ベイ", text: "米国からの手紙" }, { reading: "こめ", text: "米をあらう" }]
  },
  "羽": {
    on: ["ウ"], kun: ["はね", "は"], radical: "羽",
    etymology: "鳥のつばさを二つ並べた形を表した象形文字。",
    hint: "にくづきが二つならんだ形。",
    examples: [{ reading: "ウ", text: "羽毛ぶとんであたたまる" }, { reading: "はね", text: "鳥の羽がおちる" }]
  },
  "考": {
    on: ["コウ"], kun: ["かんが"], radical: "耂",
    etymology: "老人が杖をついて考えている形から。",
    hint: "おいがしらの下にカタカナの「ア」のような形。",
    examples: [{ reading: "コウ", text: "考古学をまなぶ" }, { reading: "かんが", text: "よく考える" }]
  },
  "肉": {
    on: ["ニク"], kun: [], radical: "肉",
    etymology: "肉のかたまりの形を表した象形文字。",
    hint: "門のような形の中に人が二つ。",
    examples: [{ reading: "ニク", text: "肉をやく" }]
  },
  "自": {
    on: ["ジ", "シ"], kun: ["みずか"], radical: "自",
    etymology: "鼻の形を表した象形文字。自分を指すとき鼻を差す習慣から。",
    hint: "目に横線を一本たした形。",
    examples: [{ reading: "ジ", text: "自分でやる" }, { reading: "みずか", text: "自ら手をあげる" }]
  },
  "色": {
    on: ["ショク", "シキ"], kun: ["いろ"], radical: "色",
    etymology: "人がひざまずいた形から、顔色・色を表す。",
    hint: "クの下に巴のような形。",
    examples: [{ reading: "シキ", text: "景色がきれい" }, { reading: "いろ", text: "赤い色のはな" }]
  },
  "行": {
    on: ["コウ", "ギョウ"], kun: ["い", "おこな", "ゆ"], radical: "行",
    etymology: "十字路の形を表した象形文字。みちを行くことから。",
    hint: "ぎょうにんべんとつくりで、道を行く形。",
    examples: [{ reading: "コウ", text: "旅行にいく" }, { reading: "い", text: "学校に行く" }, { reading: "おこな", text: "そうじを行う" }]
  },
  "西": {
    on: ["セイ", "サイ"], kun: ["にし"], radical: "西",
    etymology: "鳥が巣に帰る夕方の方角を表す象形文字。",
    hint: "一の下に鳥の巣のような形。",
    examples: [{ reading: "セイ", text: "西洋の文化" }, { reading: "にし", text: "西のそらがあかい" }]
  },
  "何": {
    on: ["カ"], kun: ["なに", "なん"], radical: "人",
    etymology: "人が荷物を肩にかついでいる形から。",
    hint: "にんべんに「可」を書く。",
    examples: [{ reading: "カ", text: "幾何（きか）をまなぶ" }, { reading: "なに", text: "何をしていますか" }]
  },
  "体": {
    on: ["タイ", "テイ"], kun: ["からだ"], radical: "人",
    etymology: "人と本を合わせ、からだの根本（もと）を表す。",
    hint: "にんべんに本を書く。",
    examples: [{ reading: "タイ", text: "体力をつける" }, { reading: "からだ", text: "体をうごかす" }]
  },
  "作": {
    on: ["サク", "サ"], kun: ["つく"], radical: "人",
    etymology: "人がのこぎりで物をつくる形から。",
    hint: "にんべんに「乍」を書く。",
    examples: [{ reading: "サク", text: "作文を書く" }, { reading: "つく", text: "りょうりを作る" }]
  },
  "図": {
    on: ["ズ", "ト"], kun: ["はか"], radical: "囗",
    etymology: "四角い紙に絵を描いた形から。",
    hint: "くにがまえの中にツと一を書く。",
    examples: [{ reading: "ズ", text: "地図で場所をさがす" }, { reading: "ト", text: "図書館で本をかりる" }]
  },
  "声": {
    on: ["セイ", "ショウ"], kun: ["こえ"], radical: "士",
    etymology: "楽器を打って出す音から「こえ」を表す。",
    hint: "士の下に大きな横線。",
    examples: [{ reading: "セイ", text: "声援をおくる" }, { reading: "こえ", text: "大きな声で読む" }]
  },
  "売": {
    on: ["バイ"], kun: ["う"], radical: "士",
    etymology: "もともと「読」に近い字で、声を出して売る形から。",
    hint: "士の下に「儿」。買うの反対が売る。",
    examples: [{ reading: "バイ", text: "売店でかう" }, { reading: "う", text: "お花を売る" }]
  },
  "弟": {
    on: ["テイ", "ダイ", "デ"], kun: ["おとうと"], radical: "弓",
    etymology: "順序よく糸を巻いていく形から、順番の低い兄弟を表す。",
    hint: "ツの下に弓、右にはらいを書く。",
    examples: [{ reading: "テイ", text: "師弟（してい）のきずな" }, { reading: "おとうと", text: "弟といっしょにあそぶ" }]
  },
  "形": {
    on: ["ケイ", "ギョウ"], kun: ["かた", "かたち"], radical: "彡",
    etymology: "型を作る道具と模様（彡）を合わせた形から。",
    hint: "左にかた右にさんづくり（三本の線）。",
    examples: [{ reading: "ケイ", text: "三角形をかく" }, { reading: "かたち", text: "きれいな形" }]
  },
  "来": {
    on: ["ライ"], kun: ["く", "きた"], radical: "木",
    etymology: "麦の穂が実った形から、よいものが「くる」を表す。",
    hint: "木に横線二本を加えた形。",
    examples: [{ reading: "ライ", text: "来年がたのしみだ" }, { reading: "く", text: "友だちが来る" }]
  },
  "社": {
    on: ["シャ"], kun: ["やしろ"], radical: "示",
    etymology: "示（しめすへん）と土を合わせ、神をまつる場所を表す。",
    hint: "しめすへんに土を書く。",
    examples: [{ reading: "シャ", text: "会社ではたらく" }, { reading: "やしろ", text: "神社にお参りする" }]
  },
  "角": {
    on: ["カク"], kun: ["かど", "つの"], radical: "角",
    etymology: "動物のつのの形を表した象形文字。",
    hint: "クの下に用を書くような形。",
    examples: [{ reading: "カク", text: "三角形をかく" }, { reading: "かど", text: "角をまがる" }]
  },
  "言": {
    on: ["ゲン", "ゴン"], kun: ["い", "こと"], radical: "言",
    etymology: "口の上に音を表す横線を加え、言葉を表す。",
    hint: "上に点と横線、下に口を書く。",
    examples: [{ reading: "ゲン", text: "言語をまなぶ" }, { reading: "い", text: "「ありがとう」と言う" }]
  },
  "谷": {
    on: ["コク"], kun: ["たに"], radical: "谷",
    etymology: "山の間の水が流れるところを表した会意文字。",
    hint: "ハの下にへこんだ口を書く。",
    examples: [{ reading: "コク", text: "渓谷をあるく" }, { reading: "たに", text: "谷の川で遊ぶ" }]
  },
  "走": {
    on: ["ソウ"], kun: ["はし"], radical: "走",
    etymology: "人が手を振って走る形を表した会意文字。",
    hint: "土の上にひとが足をあげて走る形。",
    examples: [{ reading: "ソウ", text: "走者がバトンをわたす" }, { reading: "はし", text: "校庭を走る" }]
  },
  "近": {
    on: ["キン"], kun: ["ちか"], radical: "辶",
    etymology: "しんにょうに斤（おの）を合わせて、近くを表す。",
    hint: "斤にしんにょうをつける。",
    examples: [{ reading: "キン", text: "近所にすむ" }, { reading: "ちか", text: "学校が近い" }]
  },
  "里": {
    on: ["リ"], kun: ["さと"], radical: "里",
    etymology: "田と土を合わせて、人が住む村を表す。",
    hint: "田の下に土を書く。",
    examples: [{ reading: "リ", text: "千里のみちをゆく" }, { reading: "さと", text: "ふるさとの里に帰る" }]
  },
  "麦": {
    on: ["バク"], kun: ["むぎ"], radical: "麦",
    etymology: "穂がたれた麦の形を表した象形文字。",
    hint: "生の字の下に夊を書く。",
    examples: [{ reading: "バク", text: "麦茶をのむ" }, { reading: "むぎ", text: "麦わらぼうしをかぶる" }]
  },
  "京": {
    on: ["キョウ", "ケイ"], kun: ["みやこ"], radical: "亠",
    etymology: "高い丘の上の建物の形から、みやこを表す。",
    hint: "なべぶたの下に口、小を書く。",
    examples: [{ reading: "キョウ", text: "東京タワーを見る" }]
  },
  "国": {
    on: ["コク"], kun: ["くに"], radical: "囗",
    etymology: "くにがまえ（国境）の中に玉（宝）がある形。",
    hint: "四角い枠の中に玉を入れる。",
    examples: [{ reading: "コク", text: "外国にいく" }, { reading: "くに", text: "雪の国へいく" }]
  },
  "夜": {
    on: ["ヤ"], kun: ["よ", "よる"], radical: "夕",
    etymology: "人のわきの下に月が見える形から、夜を表す。",
    hint: "なべぶたとにんべん、夕を組み合わせた形。",
    examples: [{ reading: "ヤ", text: "夜行バスにのる" }, { reading: "よる", text: "夜になると星が見える" }]
  },
  "妹": {
    on: ["マイ"], kun: ["いもうと"], radical: "女",
    etymology: "女と未（まだ成長していない）を合わせた形。",
    hint: "おんなへんに未（み）を書く。",
    examples: [{ reading: "マイ", text: "姉妹でおでかけする" }, { reading: "いもうと", text: "妹がわらった" }]
  },
  "姉": {
    on: ["シ"], kun: ["あね"], radical: "女",
    etymology: "女と市（年長の意味）を合わせた形。",
    hint: "おんなへんに市を書く。",
    examples: [{ reading: "シ", text: "姉妹でなかよくする" }, { reading: "あね", text: "姉にてがみを書く" }]
  },
  "店": {
    on: ["テン"], kun: ["みせ"], radical: "广",
    etymology: "まだれの中に占（うらない）で場所を定めた形から。",
    hint: "まだれに占を書く。",
    examples: [{ reading: "テン", text: "売店でジュースを買う" }, { reading: "みせ", text: "お店に入る" }]
  },
  "明": {
    on: ["メイ", "ミョウ"], kun: ["あか", "あ"], radical: "日",
    etymology: "日（太陽）と月を合わせて「あかるい」を表す。",
    hint: "日と月をならべた形。太陽と月であかるい。",
    examples: [{ reading: "メイ", text: "発明したものをみせる" }, { reading: "あか", text: "部屋が明るい" }]
  },
  "東": {
    on: ["トウ"], kun: ["ひがし"], radical: "木",
    etymology: "木の間から太陽がのぼる東の方角を表す。",
    hint: "木の中に日が入っている形。",
    examples: [{ reading: "トウ", text: "関東地方の天気" }, { reading: "ひがし", text: "東の空があかるい" }]
  },
  "歩": {
    on: ["ホ", "ブ"], kun: ["ある", "あゆ"], radical: "止",
    etymology: "左右の足あとを合わせて「あるく」を表す会意文字。",
    hint: "止の下に少を書いて、一歩ずつあるく形。",
    examples: [{ reading: "ホ", text: "散歩にでかける" }, { reading: "ある", text: "公園を歩く" }]
  },
  "画": {
    on: ["ガ", "カク"], kun: [], radical: "田",
    etymology: "筆で区切りの線を引く形から。",
    hint: "一の下に田と凵を組み合わせた形。",
    examples: [{ reading: "ガ", text: "映画をみる" }, { reading: "カク", text: "計画をたてる" }]
  },
  "直": {
    on: ["チョク", "ジキ"], kun: ["ただ", "なお", "す"], radical: "目",
    etymology: "目の上にまっすぐな線を引いた形から。",
    hint: "十と目とLを組み合わせて「まっすぐ」。",
    examples: [{ reading: "チョク", text: "直線をひく" }, { reading: "なお", text: "まちがいを直す" }]
  },
  "知": {
    on: ["チ"], kun: ["し"], radical: "矢",
    etymology: "矢のように速く口で答える形から「しる」を表す。",
    hint: "矢と口を合わせた形。",
    examples: [{ reading: "チ", text: "知識をふやす" }, { reading: "し", text: "答えを知る" }]
  },
  "長": {
    on: ["チョウ"], kun: ["なが"], radical: "長",
    etymology: "髪の長い老人の形を表した象形文字。",
    hint: "上から下へながく書く字。",
    examples: [{ reading: "チョウ", text: "校長先生のお話" }, { reading: "なが", text: "長いかみのけ" }]
  },
  "前": {
    on: ["ゼン"], kun: ["まえ"], radical: "刀",
    etymology: "足を前に出してすすむ形と刀を合わせた字。",
    hint: "ソと月の上に、りっとうを書く。",
    examples: [{ reading: "ゼン", text: "前進する" }, { reading: "まえ", text: "駅の前であう" }]
  },
  "南": {
    on: ["ナン", "ナ"], kun: ["みなみ"], radical: "十",
    etymology: "草の生い茂る暖かい方角を表す象形文字。",
    hint: "十の下にかこまれた幸のような形。",
    examples: [{ reading: "ナン", text: "南北をくらべる" }, { reading: "みなみ", text: "南の島にいく" }]
  },
  "室": {
    on: ["シツ"], kun: ["むろ"], radical: "宀",
    etymology: "うかんむりの下に至（いたる）で、到着した部屋を表す。",
    hint: "うかんむりの下に至を書く。",
    examples: [{ reading: "シツ", text: "教室でべんきょうする" }]
  },
  "後": {
    on: ["ゴ", "コウ"], kun: ["のち", "うし", "あと", "おく"], radical: "彳",
    etymology: "糸と足を合わせて、遅れて歩く形から「うしろ」を表す。",
    hint: "ぎょうにんべんに幺と夊を書く。",
    examples: [{ reading: "ゴ", text: "午後からあめがふる" }, { reading: "うし", text: "後ろをむく" }, { reading: "あと", text: "後かたづけをする" }]
  },
  "思": {
    on: ["シ"], kun: ["おも"], radical: "心",
    etymology: "田（頭脳）と心を合わせて「おもう」を表す。",
    hint: "田の下に心を書く。頭と心で考える。",
    examples: [{ reading: "シ", text: "思考（しこう）をめぐらす" }, { reading: "おも", text: "なつかしいと思う" }]
  },
  "星": {
    on: ["セイ", "ショウ"], kun: ["ほし"], radical: "日",
    etymology: "日（光るもの）と生（生まれる）を合わせた字。",
    hint: "日の上に生を書く。夜空にうまれる光。",
    examples: [{ reading: "セイ", text: "火星をかんさつする" }, { reading: "ほし", text: "星がきれいだ" }]
  },
  "活": {
    on: ["カツ"], kun: ["い"], radical: "氵",
    etymology: "さんずいに舌で、舌が動く（生きている）形から。",
    hint: "さんずいに舌を書く。",
    examples: [{ reading: "カツ", text: "生活をたのしむ" }]
  },
  "海": {
    on: ["カイ"], kun: ["うみ"], radical: "氵",
    etymology: "さんずいに毎で、水がどこまでもひろがる形。",
    hint: "さんずいに毎を書く。",
    examples: [{ reading: "カイ", text: "海外りょこうにいく" }, { reading: "うみ", text: "海であそぶ" }]
  },
  "点": {
    on: ["テン"], kun: ["つ"], radical: "灬",
    etymology: "占（うらない）の下に火（れっか）を置いた形。",
    hint: "占の下に点々を書く。",
    examples: [{ reading: "テン", text: "百点をとった" }]
  },
  "科": {
    on: ["カ"], kun: [], radical: "禾",
    etymology: "禾（いね）と斗（ます）で、穀物をはかる形から。",
    hint: "のぎへんに斗を書く。",
    examples: [{ reading: "カ", text: "理科のじっけん" }]
  },
  "茶": {
    on: ["チャ", "サ"], kun: [], radical: "艹",
    etymology: "草かんむりの下に人と木で、お茶の木を表す。",
    hint: "くさかんむりの下にへんな余を書く。",
    examples: [{ reading: "チャ", text: "お茶をいれる" }]
  },
  "食": {
    on: ["ショク", "ジキ"], kun: ["た", "く"], radical: "食",
    etymology: "皿の上に盛られたごはんにふたをした形。",
    hint: "ひとやねの下に良のような形。",
    examples: [{ reading: "ショク", text: "食事のじかん" }, { reading: "た", text: "ごはんを食べる" }]
  },
  "首": {
    on: ["シュ"], kun: ["くび"], radical: "首",
    etymology: "頭の上の髪の毛と顔を表した象形文字。",
    hint: "ソの下に自を書いて、首の形。",
    examples: [{ reading: "シュ", text: "首都にすむ" }, { reading: "くび", text: "首をかたむける" }]
  },
  "馬": {
    on: ["バ"], kun: ["うま"], radical: "馬",
    etymology: "馬のたてがみと足を表した象形文字。",
    hint: "馬のたてがみ・からだ・足の形。点々が四本の足。",
    examples: [{ reading: "バ", text: "乗馬をたのしむ" }, { reading: "うま", text: "馬ににんじんをあげる" }]
  },
  "場": {
    on: ["ジョウ"], kun: ["ば"], radical: "土",
    etymology: "土へんに昜（太陽が昇る）で、開けた場所を表す。",
    hint: "つちへんに日とワと勿を書く。",
    examples: [{ reading: "ジョウ", text: "運動場であそぶ" }, { reading: "ば", text: "広場をはしる" }]
  },
  "朝": {
    on: ["チョウ"], kun: ["あさ"], radical: "月",
    etymology: "草の間から太陽がのぼる朝の形を表す。",
    hint: "十と日と十と月を並べた形。",
    examples: [{ reading: "チョウ", text: "朝食をたべる" }, { reading: "あさ", text: "朝はやくおきる" }]
  },
  "番": {
    on: ["バン"], kun: [], radical: "田",
    etymology: "獣の足跡を田で数える形から順番を表す。",
    hint: "のの下に田を書く。",
    examples: [{ reading: "バン", text: "一番になる" }]
  },
  "答": {
    on: ["トウ"], kun: ["こた"], radical: "竹",
    etymology: "竹（たけかんむり）と合を合わせて、問いに合う返事を表す。",
    hint: "たけかんむりに合を書く。",
    examples: [{ reading: "トウ", text: "答案ようしを出す" }, { reading: "こた", text: "しつもんに答える" }]
  },
  "絵": {
    on: ["カイ", "エ"], kun: [], radical: "糸",
    etymology: "糸へんに会で、色糸を合わせて描く形から。",
    hint: "いとへんに会を書く。",
    examples: [{ reading: "エ", text: "絵をかく" }]
  },
  "買": {
    on: ["バイ"], kun: ["か"], radical: "貝",
    etymology: "網と貝（お金）を合わせて、ものを手に入れる形。",
    hint: "目のような網の下に貝を書く。",
    examples: [{ reading: "バイ", text: "売買のやくそく" }, { reading: "か", text: "本を買う" }]
  },
  "道": {
    on: ["ドウ", "トウ"], kun: ["みち"], radical: "辶",
    etymology: "首（リーダー）がしんにょう（道）を行く形。",
    hint: "首にしんにょうをつける。",
    examples: [{ reading: "ドウ", text: "道路をわたる" }, { reading: "みち", text: "学校への道" }]
  },
  "間": {
    on: ["カン", "ケン"], kun: ["あいだ", "ま"], radical: "門",
    etymology: "門の間から月（日）が見える形。",
    hint: "もんがまえの中に日を入れる。",
    examples: [{ reading: "カン", text: "時間をまもる" }, { reading: "あいだ", text: "二人の間にすわる" }]
  },
  "雲": {
    on: ["ウン"], kun: ["くも"], radical: "雨",
    etymology: "雨かんむりに云（立ちのぼる気）で、雲を表す。",
    hint: "あめかんむりに云を書く。",
    examples: [{ reading: "ウン", text: "雲海をみる" }, { reading: "くも", text: "空に雲がうかぶ" }]
  },
  "数": {
    on: ["スウ"], kun: ["かず", "かぞ"], radical: "攵",
    etymology: "こまかく数える形を表す会意文字。",
    hint: "米と女の右にのぶんを書く。",
    examples: [{ reading: "スウ", text: "数字をよむ" }, { reading: "かず", text: "花の数をかぞえる" }]
  },
  "楽": {
    on: ["ガク", "ラク"], kun: ["たの"], radical: "木",
    etymology: "木に糸をはった楽器の形から、音楽・楽しいを表す。",
    hint: "白と木を合わせた形。",
    examples: [{ reading: "ガク", text: "音楽をきく" }, { reading: "たの", text: "えんそくが楽しい" }]
  },
  "話": {
    on: ["ワ"], kun: ["はな", "はなし"], radical: "言",
    etymology: "ごんべんに舌で、舌で話すことを表す。",
    hint: "ごんべんに舌を書く。",
    examples: [{ reading: "ワ", text: "電話をかける" }, { reading: "はな", text: "友だちと話す" }]
  },
  "電": {
    on: ["デン"], kun: [], radical: "雨",
    etymology: "雨かんむりに申（いなずま）で、稲光を表す。",
    hint: "あめかんむりの下に田と乚を書く。",
    examples: [{ reading: "デン", text: "電車にのる" }]
  },
  "夏": {
    on: ["カ", "ゲ"], kun: ["なつ"], radical: "夊",
    etymology: "大きな仮面をつけた人が踊る夏祭りの形。",
    hint: "一と自の下に夊を書く。",
    examples: [{ reading: "カ", text: "初夏（しょか）をむかえる" }, { reading: "なつ", text: "夏はあつい" }]
  },
  "家": {
    on: ["カ", "ケ"], kun: ["いえ", "や", "うち"], radical: "宀",
    etymology: "うかんむり（家）の下に豕（ぶた＝家畜）で、家庭を表す。",
    hint: "うかんむりの下にぶたの形。",
    examples: [{ reading: "カ", text: "家族であそぶ" }, { reading: "いえ", text: "家にかえる" }]
  },
  "弱": {
    on: ["ジャク"], kun: ["よわ"], radical: "弓",
    etymology: "飾りのついた弓二つで、弓が弱い形を表す。",
    hint: "弓と小さい点が左右に並ぶ形。",
    examples: [{ reading: "ジャク", text: "弱点をなおす" }, { reading: "よわ", text: "風が弱い" }]
  },
  "時": {
    on: ["ジ"], kun: ["とき"], radical: "日",
    etymology: "日（太陽）と寺（時間を告げる場所）で、時間を表す。",
    hint: "日へんに寺を書く。",
    examples: [{ reading: "ジ", text: "三時のおやつ" }, { reading: "とき", text: "そのときが来た" }]
  },
  "紙": {
    on: ["シ"], kun: ["かみ"], radical: "糸",
    etymology: "糸へんに氏で、繊維から作る紙を表す。",
    hint: "いとへんに氏を書く。",
    examples: [{ reading: "シ", text: "用紙（ようし）をくばる" }, { reading: "かみ", text: "白い紙をきる" }]
  },
  "記": {
    on: ["キ"], kun: ["しる"], radical: "言",
    etymology: "ごんべんに己で、自分の言葉を書きしるす形。",
    hint: "ごんべんに己を書く。",
    examples: [{ reading: "キ", text: "日記をかく" }, { reading: "しる", text: "ノートに記す" }]
  },
  "通": {
    on: ["ツウ"], kun: ["とお", "かよ"], radical: "辶",
    etymology: "甬（つつ）にしんにょうで、筒のように通りぬける形。",
    hint: "マの下に用、しんにょうをつける。",
    examples: [{ reading: "ツウ", text: "交通ルールをまもる" }, { reading: "とお", text: "車が通る" }]
  },
  "高": {
    on: ["コウ"], kun: ["たか"], radical: "高",
    etymology: "高い建物の形を表した象形文字。",
    hint: "なべぶたの下に口、はしごのような形。",
    examples: [{ reading: "コウ", text: "高校にいく" }, { reading: "たか", text: "山が高い" }]
  },
  "強": {
    on: ["キョウ", "ゴウ"], kun: ["つよ"], radical: "弓",
    etymology: "弓に大きな虫をつけて、力強さを表す。",
    hint: "弓へんにムと虫を書く。",
    examples: [{ reading: "キョウ", text: "強力なちからもち" }, { reading: "つよ", text: "風が強い" }]
  },
  "教": {
    on: ["キョウ"], kun: ["おし", "おそ"], radical: "攵",
    etymology: "子どもに文字を教える大人の形から。",
    hint: "孝のような形の右にのぶんを書く。",
    examples: [{ reading: "キョウ", text: "教科書をひらく" }, { reading: "おし", text: "ダンスを教える" }]
  },
  "理": {
    on: ["リ"], kun: [], radical: "玉",
    etymology: "玉（たまへん）と里で、玉の筋目を整える形。",
    hint: "たまへんに里を書く。",
    examples: [{ reading: "リ", text: "理科のじっけんをする" }]
  },
  "組": {
    on: ["ソ"], kun: ["くみ", "く"], radical: "糸",
    etymology: "糸へんに且で、糸を組み合わせる形。",
    hint: "いとへんに且を書く。",
    examples: [{ reading: "ソ", text: "組織をつくる" }, { reading: "くみ", text: "一組のなかま" }]
  },
  "船": {
    on: ["セン"], kun: ["ふね"], radical: "舟",
    etymology: "舟と八と口で、船の形を表す。",
    hint: "ふねへんにハと口を書く。",
    examples: [{ reading: "セン", text: "船長がかじをとる" }, { reading: "ふね", text: "船にのって旅をする" }]
  },
  "週": {
    on: ["シュウ"], kun: [], radical: "辶",
    etymology: "周（まわり）にしんにょうで、一めぐりする期間を表す。",
    hint: "周にしんにょうをつける。",
    examples: [{ reading: "シュウ", text: "一週間がはやい" }]
  },
  "雪": {
    on: ["セツ"], kun: ["ゆき"], radical: "雨",
    etymology: "雨かんむりにヨで、空から降る白いものを表す。",
    hint: "あめかんむりの下にヨを書く。",
    examples: [{ reading: "セツ", text: "降雪（こうせつ）が予想される" }, { reading: "ゆき", text: "雪がふっている" }]
  },
  "魚": {
    on: ["ギョ"], kun: ["うお", "さかな"], radical: "魚",
    etymology: "魚の頭・胴体・しっぽの形を表した象形文字。",
    hint: "ク、田、一、下の点々で魚の形。",
    examples: [{ reading: "ギョ", text: "金魚をかう" }, { reading: "さかな", text: "魚をつる" }]
  },
  "鳥": {
    on: ["チョウ"], kun: ["とり"], radical: "鳥",
    etymology: "鳥の全身の形を表した象形文字。",
    hint: "鳥のくちばし・からだ・羽・足の形。",
    examples: [{ reading: "チョウ", text: "野鳥をかんさつする" }, { reading: "とり", text: "鳥がとんでいる" }]
  },
  "黄": {
    on: ["コウ", "オウ"], kun: ["き"], radical: "黄",
    etymology: "たいまつの火の色から、黄色を表す。",
    hint: "きいろの字。草かんむりに由と八を書く。",
    examples: [{ reading: "オウ", text: "黄金のかがやき" }, { reading: "き", text: "黄色いはな" }]
  },
  "黒": {
    on: ["コク"], kun: ["くろ"], radical: "黒",
    etymology: "煙突から出る黒い煤（すす）の形から。",
    hint: "里の下に点々を書く。",
    examples: [{ reading: "コク", text: "黒板にかく" }, { reading: "くろ", text: "黒いねこ" }]
  },
  "野": {
    on: ["ヤ"], kun: ["の"], radical: "里",
    etymology: "里と予で、村はずれの広い土地を表す。",
    hint: "里に予を組み合わせた形。",
    examples: [{ reading: "ヤ", text: "野球をする" }, { reading: "の", text: "野はらをかける" }]
  },
  "鳴": {
    on: ["メイ"], kun: ["な"], radical: "鳥",
    etymology: "口と鳥で、鳥が鳴く形を表す。",
    hint: "口の右に鳥を書く。",
    examples: [{ reading: "メイ", text: "共鳴する" }, { reading: "な", text: "鳥が鳴く" }]
  },
  "線": {
    on: ["セン"], kun: [], radical: "糸",
    etymology: "糸へんに泉で、細くつながる糸の線を表す。",
    hint: "いとへんに白と水を書く。",
    examples: [{ reading: "セン", text: "直線をひく" }]
  },
  "親": {
    on: ["シン"], kun: ["おや", "した"], radical: "見",
    etymology: "立と木（高い木）と見で、木の上から見守る親を表す。",
    hint: "立と木の右に見を書く。",
    examples: [{ reading: "シン", text: "親切にする" }, { reading: "おや", text: "親にかんしゃする" }]
  },
  "頭": {
    on: ["トウ", "ズ"], kun: ["あたま", "かしら"], radical: "頁",
    etymology: "豆（頭の丸い形）と頁（大きな頭）を合わせた形。",
    hint: "豆の右におおがいを書く。",
    examples: [{ reading: "トウ", text: "先頭にたつ" }, { reading: "あたま", text: "頭がよい" }]
  },
  "顔": {
    on: ["ガン"], kun: ["かお"], radical: "頁",
    etymology: "彦（がけの上に立つ男）と頁（頭）で、顔を表す。",
    hint: "立と厂と彡の右におおがいを書く。",
    examples: [{ reading: "ガン", text: "洗顔する" }, { reading: "かお", text: "笑顔がすてき" }]
  },
  "歌": {
    on: ["カ"], kun: ["うた"], radical: "欠",
    etymology: "可と可に欠（口を開ける）で、声を出して歌う形。",
    hint: "可を二つ並べて右に欠を書く。",
    examples: [{ reading: "カ", text: "歌手のコンサート" }, { reading: "うた", text: "歌をうたう" }]
  },
  "算": {
    on: ["サン"], kun: [], radical: "竹",
    etymology: "たけかんむりに目と廾で、竹のそろばんで計算する形。",
    hint: "たけかんむりの下に目と廾を書く。",
    examples: [{ reading: "サン", text: "算数のもんだい" }]
  },
  "聞": {
    on: ["ブン", "モン"], kun: ["き"], radical: "耳",
    etymology: "門の中に耳で、門のすきまから耳をすます形。",
    hint: "もんがまえの中に耳を入れる。",
    examples: [{ reading: "ブン", text: "新聞をよむ" }, { reading: "き", text: "音が聞こえる" }]
  },
  "語": {
    on: ["ゴ"], kun: ["かた"], radical: "言",
    etymology: "ごんべんに吾（われ）で、自分の言葉を表す。",
    hint: "ごんべんに五と口を書く。",
    examples: [{ reading: "ゴ", text: "日本語をまなぶ" }, { reading: "かた", text: "ゆめを語る" }]
  },
  "読": {
    on: ["ドク", "トク"], kun: ["よ"], radical: "言",
    etymology: "ごんべんに売で、声を出して読む形。",
    hint: "ごんべんに売を書く。",
    examples: [{ reading: "ドク", text: "読書がすき" }, { reading: "よ", text: "本を読む" }]
  },
  "新": {
    on: ["シン"], kun: ["あたら"], radical: "斤",
    etymology: "立と木が新しい芽を出し、斤（おの）で切り開く形。",
    hint: "立と木の右に斤を書く。",
    examples: [
        { reading: "シン", text: "新年がはじまる" },
        { reading: "あたら", text: "新しいくつをはく" }
      ]
  },
  "合": {
    on: ["ゴウ", "ガッ", "カッ"], kun: ["あ"], radical: "口",
    etymology: "ふたと器が合わさる形から。",
    hint: "ひとやねの下に一と口を書く。",
    examples: [{ reading: "ゴウ", text: "合計をだす" }, { reading: "あ", text: "答えが合う" }]
  },
  "風": {
    on: ["フウ", "フ"], kun: ["かぜ", "かざ"], radical: "風",
    etymology: "大きな鳳凰（ほうおう）が風をおこす形から。",
    hint: "几の中に虫のような形を書く。",
    examples: [{ reading: "フウ", text: "台風がちかづく" }, { reading: "かぜ", text: "風がふく" }]
  },
  "地": {
    on: ["チ", "ジ"], kun: [], radical: "土",
    etymology: "土へんに也で、大地の広がりを表す。",
    hint: "つちへんに也を書く。",
    examples: [{ reading: "チ", text: "地図をみる" }, { reading: "ジ", text: "地面にすわる" }]
  },
  "秋": {
    on: ["シュウ"], kun: ["あき"], radical: "禾",
    etymology: "禾（のぎ・穀物）と火を合わせて、収穫の時期である「あき」を表す。",
    hint: "のぎへんに火を書く。",
    examples: [{ reading: "シュウ", text: "秋分（しゅうぶん）の日" }, { reading: "あき", text: "秋がくる" }]
  },
  "寺": {
    on: [],
    kun: ["てら"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "てら", text: "寺に泊まる" }
      ]
  },
  "岩": {
    on: [],
    kun: ["いわ"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "いわ", text: "岩は固い" }
      ]
  },
  "帰": {
    on: [],
    kun: ["かえる", "かえす"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "かえる", text: "家に帰る" },
        { reading: "かえす", text: "自宅に帰す" }
      ]
  },
  "春": {
    on: [],
    kun: ["はる"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "はる", text: "春の日はあたたかい" }
      ]
  },
  "昼": {
    on: [],
    kun: ["ひる"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "ひる", text: "昼飯を食べる" }
      ]
  },
  "晴": {
    on: [],
    kun: ["ばれ"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "ばれ", text: "今日は晴れた" }
      ]
  },
  "計": {
    on: [],
    kun: ["はかる"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "はかる", text: "水量を計る" }
      ]
  },
  "園": {
    on: [],
    kun: ["ぞの"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "ぞの", text: "秘密の花園" }
      ]
  },
  "書": {
    on: [],
    kun: ["かく", "がき"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "かく", text: "漢字を書く" },
        { reading: "がき", text: "落書き禁止" }
      ]
  },
  "遠": {
    on: [],
    kun: ["とおい"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "とおい", text: "遠い未来" }
      ]
  },
  "門": {
    on: ["もん"],
    kun: ["かど", "と"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "かど", text: "門出を祝う" },
        { reading: "と", text: "鳴門海峡" },
        { reading: "もん", text: "正門から入場する" }
      ]
  },
  "原": {
    on: [],
    kun: ["はら"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "はら", text: "野原で遊ぶ" }
      ]
  },
  "細": {
    on: [],
    kun: ["ほそ", "こまか"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "ほそ", text: "細い道" },
        { reading: "こまか", text: "細かい作業" }
      ]
  },
  "弓": {
    on: [],
    kun: ["ゆみ"],
    etymology: "データなし",
    hint: "（自動生成データのためヒントなし）",
    radicals: [],
    examples: [
        { reading: "ゆみ", text: "弓矢を引く" }
      ]
  },
  "曜": {
    on: ["ヨウ"], kun: [], radical: "日",
    etymology: "日と翟（羽を高く上げて舞う）で、太陽が輝くこと。七曜（日・月・火・水・木・金・土）に使われる。",
    hint: "日にヨヨ、その下に隹（ふるとり）を書く。",
    examples: [{ reading: "ヨウ", text: "今日は何曜日（なんようび）ですか" }]
  },
  "汽": {
    on: ["キ"], kun: [], radical: "氵",
    etymology: "水（さんずい）と气（水蒸気）で、お湯がわいて出る水蒸気。",
    hint: "さんずいに气（きがまえ）を書く。",
    examples: [{ reading: "キ", text: "汽車（きしゃ）に乗る" }, { reading: "キ", text: "汽笛（きてき）が鳴る" }]
  }
};
