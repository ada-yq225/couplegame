/* 蜜语 · 情侣德州扑克 — 真实无限注 + 重色欲玩法（18+ 自愿 · 脱衣弱化） */

const POKER_RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const POKER_SUITS = ["♠", "♥", "♦", "♣"];
const POKER_SUIT_CLASS = ["spade", "heart", "diamond", "club"];
const POKER_HAND_NAMES = [
  "高牌", "一对", "两对", "三条", "顺子", "同花", "葫芦", "四条", "同花顺", "皇家同花顺",
];

const POKER_HEAT = {
  soft: {
    label: "调情局",
    hint: "亲昵前戏 · 轻色令",
    startChips: 600,
    sb: 5,
    bb: 10,
    riseEvery: 8,
  },
  hot: {
    label: "情欲局",
    hint: "色池 · 街注 · 推荐",
    startChips: 500,
    sb: 10,
    bb: 20,
    riseEvery: 6,
  },
  deep: {
    label: "痴迷局",
    hint: "重口色令 · 高潮任务 · 肉体全下",
    startChips: 400,
    sb: 15,
    bb: 30,
    riseEvery: 4,
  },
};

/** 色令库：按类型，脱衣极少，以肉体互动为主 */
const POKER_SEX = {
  kiss: [
    "深吻 45 秒，舌头交缠，手可以抓臀/腰，不许停换气超过 3 秒。",
    "赢家咬输家下唇再含住，亲到输家腿软哼出声。",
    "从耳垂舔到锁骨再到胸口上方，来回两遍，输家不许躲。",
    "输家闭眼，赢家只准用嘴唇碰脸和脖子 1 分钟，最后才准亲嘴。",
    "边接吻边把输家按在椅背/墙上，腿挤进对方两腿之间磨。",
  ],
  touch: [
    "赢家手伸进输家衣服，直接揉胸/胸肌到乳尖硬，至少 1 分钟。",
    "隔着裤子/裙子整只手包住输家腿间，按揉到明显湿/硬，描述给对方听。",
    "从背后环抱，一手揉胸一手伸进裤腰摸到底，边摸边在耳边说骚话。",
    "输家张开腿坐着，赢家手指隔内裤画圈，专门磨最敏感那点 90 秒。",
    "互相把手伸进对方内裤同时摸 1 分钟，谁先出声谁下把多付一枚色池。",
    "赢家用大腿夹住输家一只手，让对方自己摸自己，自己摸满 40 秒。",
  ],
  oral: [
    "输家跪着，隔着布料用嘴含/舔赢家最硬最湿处 90 秒，抬头看眼睛。",
    "赢家把输家按在椅上，低头用嘴隔布料吸敏感点，吸到输家抓头发。",
    "输家口交/舔到赢家说「停」，停之前不许用手推，深一点。",
    "赢家躺下，输家跨脸上方（可隔内裤）磨 30 秒，再换成嘴侍奉。",
    "只许用舌头，不许用手，把对方弄到明显发抖再停。",
    "边口边发出声音，输家每 10 秒必须抬眼看赢家一次。",
  ],
  finger: [
    "两指进入（双方自愿），慢抠找点 90 秒，弯指，听水声。",
    "手指进去后不许抽出来，只在里面转和抠，直到输家求「动一动」。",
    "赢家一只手指抽插，拇指揉外核/前端，双线夹击 2 分钟。",
    "边缘：抠到快高潮就停，停 8 秒，重复 3 次，第 4 次才准去。",
    "输家自己把手指伸进去给赢家看，抽插 20 下，再说「想要你的」。",
    "从后进入手指，另一手捂嘴，弄到输家哼进掌心。",
  ],
  grind: [
    "输家坐赢家腿上，对准硬/湿处隔布磨 40 下，数出声。",
    "后入姿势摆好，只许隔着衣服顶，顶满 30 下，不许解开。",
    "正面抱起一条腿，站立位隔布摩擦 1 分钟，直到双方都喘。",
    "输家趴桌沿，赢家握腰慢顶磨，每下都要顶实，数 25。",
    "骑乘姿势，输家自己摇，赢家掐腰不让快，磨到输家求加速。",
  ],
  talk: [
    "输家对着赢家耳朵说 5 句脏话，每句说完被亲/摸一下敏感处。",
    "描述你最想被怎么操/怎么操对方，说满 1 分钟，不许笑场。",
    "接下来 2 手牌，输家只准叫赢家「主人/姐姐/老公」等（自选），说错当场被手指惩罚 20 秒。",
    "输家边被摸边回答：最敏感的点、最想内射还是脸上、今晚还想做几次。",
    "赢家口述正在做什么（很黄），输家必须重复最后一句并说「请继续」。",
  ],
  climax: [
    "本色令必须做到输家高潮/射一次（手或口），中途不许求饶停止（安全词除外）。",
    "赢家决定射在哪里（体内/小腹/胸口/嘴里——协商同意的部位），执行一次。",
    "双人一起弄到同时边缘，倒数 3 秒一起放开到高潮。",
    "高潮后 30 秒不许分开，保持插入/含着/抱紧，感受余韵。",
    "潮吹/喷射挑战：专攻那一点 3 分钟，做不到加罚口 1 分钟。",
  ],
  insert: [
    "龟头/玩具只进头部，浅浅抽 15 下，不许整根——吊着输家。",
    "整根进入后静止 20 秒，只准吻和揉，然后猛抽 20 下。",
    "赢家选体位做 3 分钟：正常位 / 后入 / 侧入 / 骑乘，中途可换一次。",
    "九浅一深数出声，数乱了从头，数满 3 轮。",
    "内射协议：若双方同意，本手结束射在里面并夹紧 1 分钟；不同意则改为射小腹抹开。",
    "站立抱操或抬腿，顶到输家站不稳才许放下。",
  ],
  table: [
    "下一整手牌期间，输家的一只手必须一直放在赢家腿间，边打边摸。",
    "下一手翻牌前，先互相亲到湿/硬，再发牌。",
    "本手若你再加注，加注同时要用空闲手揉对方 5 秒。",
    "看公共牌时输家必须坐在赢家怀里，背贴胸。",
    "弃牌的人要立刻被赢家手指惩罚 30 秒，再继续下一手。",
  ],
  // 极少脱衣，作为点缀
  light_strip: [
    "只解开最上/最外一件的扣子或拉链，露出锁骨或腰线，保持到本局结束。",
    "把上衣撩到胸下，打接下来 2 手，不许拉下来。",
  ],
};

const POKER_MISSIONS = [
  { id: "pair", text: "本手摊牌至少「一对」", check: (h) => h.cat >= 1, bonus: 40 },
  { id: "twopair", text: "本手摊牌至少「两对」", check: (h) => h.cat >= 2, bonus: 60 },
  { id: "showdown", text: "打到摊牌（不要弃牌）", check: (_, ctx) => ctx.reason === "showdown", bonus: 30 },
  { id: "allin", text: "本手有人全下", check: (_, ctx) => ctx.hadAllIn, bonus: 50 },
  { id: "bigpot", text: "底池超过 4 个大盲", check: (_, ctx) => ctx.potPeak >= ctx.bb * 4, bonus: 35 },
  { id: "raise2", text: "本手加注至少 2 次", check: (_, ctx) => ctx.raises >= 2, bonus: 35 },
  { id: "flop_bet", text: "翻牌圈有人下注", check: (_, ctx) => ctx.streetBets.flop, bonus: 25 },
  { id: "bluff", text: "用高牌或一对赢下摊牌", check: (h, ctx) => ctx.reason === "showdown" && h && h.cat <= 1, bonus: 55 },
];

const POKER_STREET_TEASE = {
  preflop: [
    "底牌到手：先互相摸一下对方腿根，再看牌。",
    "前注：小盲亲大盲脖子一下才许行动。",
  ],
  flop: [
    "翻牌：看完三张，赢家候选（后行动者）可以揉对方 10 秒。",
    "三张公共牌——欲望也翻开。空闲的那只手不许闲着。",
  ],
  turn: [
    "转牌：加注者有权指定被摸的部位 15 秒。",
    "第四张牌落下，池子和下面一起涨。",
  ],
  river: [
    "河牌：摊牌前可以深吻 10 秒壮胆。",
    "最后一张——诚实或全下肉体。",
  ],
  showdown: [
    "摊牌。身体比牌更诚实。",
    "亮牌的人，腿可以张开给赢家看反应。",
  ],
};

const POKER_STREET_FLAVOR = {
  preflop: ["底牌入手，心跳比筹码响。", "诈唬从眼神和下身开始。", "还没翻牌，已经可以湿。"],
  flop: ["三张牌摊开，欲望摊开。", "翻牌圈，加注就能换触摸权。", "看牌，也看对方有没有夹腿。"],
  turn: ["转牌——再装镇定就要漏。", "池子深了，色池也深了。", "第四张，呼吸乱了。"],
  river: ["河牌。谎言或诚实。", "最后一张像最后一层理智。", "河牌后只剩摊牌和服侍。"],
  showdown: ["摊牌。收池，也收人。", "牌力分胜负，身体算利息。"],
};

const POKER_POSITIONS = [
  { id: "missionary", label: "正常位", act: "输家躺好张开腿，赢家进入或用手指/口侍奉 2 分钟。" },
  { id: "doggy", label: "后入", act: "输家趴桌/床翘臀，赢家从后用进入或手 2 分钟，可抓腰。" },
  { id: "cowgirl", label: "骑乘", act: "输家坐上自己摇 2 分钟，赢家可以掐腰加速。" },
  { id: "side", label: "侧入", act: "侧躺抱紧，慢顶或手指同步 2 分钟。" },
  { id: "standing", label: "站立", act: "靠墙抬腿，摩擦或进入 90 秒。" },
  { id: "edge_oral", label: "坐脸/口", act: "一方用嘴服侍到边缘两次，第三次才准去。" },
];

function pokerPick(a) {
  return a[Math.floor(Math.random() * a.length)];
}

const poker = {
  phase: "setup",
  heat: "hot",
  names: ["", ""],
  dealer: 0,
  street: "preflop",
  deck: [],
  board: [],
  pot: 0,
  sexPot: 0,
  currentBet: 0,
  minRaise: 0,
  toAct: 0,
  lastAggressor: null,
  acted: [false, false],
  handNo: 0,
  log: [],
  heatMeter: 0,
  pendingResolve: null,
  sexStreak: [0, 0],
  winStreak: [0, 0],
  stats: { hands: 0, dares: 0, allins: 0, orgasms: 0, missions: 0, sexPotWon: 0 },
  players: null,
  mission: null,
  handCtx: null,
  bbLevel: 0,
  tableTeaseUsed: false,
};

function pokerCardId(c) {
  return `${POKER_RANKS[c.r]}${POKER_SUITS[c.s]}`;
}

function pokerMakeDeck() {
  const d = [];
  for (let s = 0; s < 4; s++) for (let r = 0; r < 13; r++) d.push({ r, s });
  return d;
}

function pokerShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pokerComb5(cards) {
  const out = [];
  const n = cards.length;
  for (let a = 0; a < n - 4; a++)
    for (let b = a + 1; b < n - 3; b++)
      for (let c = b + 1; c < n - 2; c++)
        for (let d = c + 1; d < n - 1; d++)
          for (let e = d + 1; e < n; e++) out.push([cards[a], cards[b], cards[c], cards[d], cards[e]]);
  return out;
}

function pokerEval5(cards) {
  const rs = cards.map((c) => c.r).sort((a, b) => b - a);
  const ss = cards.map((c) => c.s);
  const flush = ss.every((s) => s === ss[0]);
  const uniq = [...new Set(rs)];
  let straightHigh = -1;
  if (uniq.length === 5) {
    if (uniq[0] - uniq[4] === 4) straightHigh = uniq[0];
    if (uniq[0] === 12 && uniq[1] === 3 && uniq[2] === 2 && uniq[3] === 1 && uniq[4] === 0) straightHigh = 3;
  }
  const counts = {};
  rs.forEach((r) => { counts[r] = (counts[r] || 0) + 1; });
  const byCount = Object.entries(counts)
    .map(([r, n]) => ({ r: +r, n }))
    .sort((a, b) => b.n - a.n || b.r - a.r);

  let cat = 0;
  let tie = rs;
  if (straightHigh >= 0 && flush) {
    cat = straightHigh === 12 && uniq.includes(11) ? 9 : 8;
    tie = [straightHigh];
  } else if (byCount[0].n === 4) {
    cat = 7;
    tie = [byCount[0].r, byCount[1].r];
  } else if (byCount[0].n === 3 && byCount[1]?.n === 2) {
    cat = 6;
    tie = [byCount[0].r, byCount[1].r];
  } else if (flush) {
    cat = 5;
    tie = rs;
  } else if (straightHigh >= 0) {
    cat = 4;
    tie = [straightHigh];
  } else if (byCount[0].n === 3) {
    cat = 3;
    tie = [byCount[0].r, ...byCount.slice(1).map((x) => x.r)];
  } else if (byCount[0].n === 2 && byCount[1]?.n === 2) {
    cat = 2;
    const pairs = [byCount[0].r, byCount[1].r].sort((a, b) => b - a);
    tie = [...pairs, byCount[2].r];
  } else if (byCount[0].n === 2) {
    cat = 1;
    tie = [byCount[0].r, ...byCount.slice(1).map((x) => x.r)];
  } else {
    cat = 0;
    tie = rs;
  }
  return { cat, tie, name: POKER_HAND_NAMES[cat] };
}

function pokerBetter(a, b) {
  if (a.cat !== b.cat) return a.cat - b.cat;
  for (let i = 0; i < Math.max(a.tie.length, b.tie.length); i++) {
    const d = (a.tie[i] || 0) - (b.tie[i] || 0);
    if (d) return d;
  }
  return 0;
}

function pokerBestHand(hole, board) {
  const all = [...hole, ...board];
  if (all.length < 5) return { cat: -1, tie: [], name: "—", cards: all };
  let best = null;
  for (const five of pokerComb5(all)) {
    const e = pokerEval5(five);
    if (!best || pokerBetter(e, best) > 0) best = { ...e, cards: five };
  }
  return best;
}

function pokerLog(msg) {
  poker.log.unshift(msg);
  if (poker.log.length > 50) poker.log.pop();
}

function pokerOpp(i) {
  return 1 - i;
}

function pokerCfg() {
  return POKER_HEAT[poker.heat] || POKER_HEAT.hot;
}

function pokerBb() {
  const cfg = pokerCfg();
  return cfg.bb + poker.bbLevel * Math.max(5, Math.floor(cfg.bb / 2));
}

function pokerSb() {
  return Math.max(1, Math.floor(pokerBb() / 2));
}

function pokerCreatePlayers(chips) {
  return [0, 1].map((i) => ({
    name: poker.names[i],
    chips,
    bet: 0,
    hole: [],
    folded: false,
    allIn: false,
    lust: 0,
    sexDebt: 0,
    orgasms: 0,
  }));
}

function pokerLustLabel(p) {
  const lv = p.lust || 0;
  if (lv >= 9) return "🔴 欲火焚身";
  if (lv >= 7) return "🧡 湿透/硬涨";
  if (lv >= 5) return "💛 情欲高涨";
  if (lv >= 3) return "💚 开始发热";
  if (lv >= 1) return "💙 微微动心";
  return "🤍 还算冷静";
}

function pokerAddLust(i, n, why) {
  const p = poker.players[i];
  p.lust = Math.min(10, (p.lust || 0) + n);
  poker.heatMeter = Math.min(100, poker.heatMeter + n * 4);
  if (why) pokerLog(`${p.name} 情欲 +${n}（${why}）→ ${pokerLustLabel(p)}`);
}

function pokerIntensityTier() {
  const m = poker.heatMeter;
  const base = poker.heat;
  if (base === "deep" || m >= 75) return "deep";
  if (base === "hot" || m >= 40) return "hot";
  return "soft";
}

function pokerPickSexAct(preferredCats, handCat) {
  const tier = pokerIntensityTier();
  let cats = preferredCats || ["kiss", "touch", "oral", "finger", "grind", "talk", "table"];
  if (tier === "hot") cats = cats.concat(["oral", "finger", "grind", "climax"]);
  if (tier === "deep") cats = cats.concat(["climax", "insert", "finger", "oral"]);
  if (handCat >= 5) cats = cats.concat(["climax", "insert"]);
  if (handCat >= 3) cats = cats.concat(["finger", "oral"]);
  // 极少掺脱衣
  if (Math.random() < 0.08) cats = cats.concat(["light_strip"]);

  const cat = pokerPick(cats);
  const pool = POKER_SEX[cat] || POKER_SEX.touch;
  const text = pokerPick(pool);
  return { cat, text, label: pokerCatLabel(cat) };
}

function pokerCatLabel(cat) {
  return {
    kiss: "接吻",
    touch: "爱抚",
    oral: "口舌",
    finger: "手指",
    grind: "磨蹭",
    talk: "骚话",
    climax: "高潮",
    insert: "插入",
    table: "牌桌边",
    light_strip: "轻微露出",
  }[cat] || "色令";
}

function pokerNewMission() {
  poker.mission = pokerPick(POKER_MISSIONS);
}

function pokerPostBlind(i, amt) {
  const p = poker.players[i];
  const pay = Math.min(p.chips, amt);
  p.chips -= pay;
  p.bet += pay;
  poker.pot += pay;
  if (p.chips === 0) p.allIn = true;
  return pay;
}

function pokerMaybeRiseBlinds() {
  const every = pokerCfg().riseEvery || 6;
  if (poker.handNo > 0 && poker.handNo % every === 0) {
    poker.bbLevel++;
    pokerLog(`⚠ 盲注升级！小盲 ${pokerSb()} / 大盲 ${pokerBb()} —— 牌桌更硬，色令更狠。`);
    poker.heatMeter = Math.min(100, poker.heatMeter + 8);
  }
}

/** 该玩家本街是否还能行动 */
function pokerCanAct(i) {
  const p = poker.players[i];
  if (!p || p.folded || p.allIn || p.chips <= 0) return false;
  // 注未齐 → 必须跟/弃/加
  if (p.bet < poker.currentBet) return true;
  // 注已齐但本轮尚未行动（如前位过牌后，后位也要过或下注）
  if (!poker.acted[i]) return true;
  return false;
}

/** 本街下注是否已结束（二人桌） */
function pokerRoundClosed() {
  const [a, b] = poker.players;
  if (a.folded || b.folded) return true;
  return !pokerCanAct(0) && !pokerCanAct(1);
}

/** 还需要行动的玩家；-1 表示本街结束 */
function pokerFindNextToAct(from) {
  if (pokerRoundClosed()) return -1;
  for (let step = 1; step <= 2; step++) {
    const i = (from + step) % 2;
    if (pokerCanAct(i)) return i;
  }
  return -1;
}

/** 全下后退还未被跟注的多余筹码（二人桌有效） */
function pokerReturnUncalled() {
  const [a, b] = poker.players;
  if (a.folded || b.folded) return;
  if (a.bet === b.bet) return;
  const hi = a.bet > b.bet ? 0 : 1;
  const lo = 1 - hi;
  const excess = poker.players[hi].bet - poker.players[lo].bet;
  if (excess <= 0) return;
  // 只有当低注方已全下/无筹时，才退还未跟住的部分
  if (!(poker.players[lo].allIn || poker.players[lo].chips === 0 || poker.players[lo].folded)) return;
  poker.players[hi].bet -= excess;
  poker.players[hi].chips += excess;
  poker.pot -= excess;
  poker.currentBet = poker.players[lo].bet;
  pokerLog(`退还 ${poker.players[hi].name} 未叫注 ${excess}。`);
}

function pokerCollectBetsToPot() {
  // 注已在下注时进入 pot；这里只清零本街 bet 标记
  poker.players.forEach((p) => {
    p.bet = 0;
  });
  poker.currentBet = 0;
  poker.minRaise = pokerBb();
  poker.acted = [false, false];
  poker.lastAggressor = null;
}

function pokerStartHand() {
  poker.handNo++;
  poker.stats.hands++;
  pokerMaybeRiseBlinds();
  poker.street = "preflop";
  poker.deck = pokerShuffle(pokerMakeDeck());
  poker.board = [];
  poker.pot = 0;
  poker.pendingResolve = null;
  poker.tableTeaseUsed = false;
  poker.actionLog = [];
  poker.handCtx = {
    raises: 0,
    potPeak: 0,
    hadAllIn: false,
    streetBets: { preflop: true, flop: false, turn: false, river: false },
    bb: pokerBb(),
    reason: "",
  };
  poker.players.forEach((p) => {
    p.hole = [];
    p.bet = 0;
    p.folded = false;
    p.allIn = false;
  });

  // 破产：情欲债换筹
  poker.players.forEach((p, i) => {
    if (p.chips <= 0) {
      const bodyVal = pokerBb() * 5;
      p.chips = bodyVal;
      p.sexDebt = (p.sexDebt || 0) + 1;
      pokerAddLust(i, 2, "肉体抵押入局");
      pokerLog(`${p.name} 没筹码，借 ${bodyVal} 入局，欠 1 笔情欲债。`);
      poker.stats.allins++;
    }
  });

  if (poker.players[0].sexDebt >= 5 && poker.players[1].sexDebt >= 5) {
    pokerEndGame("情欲债叠太高——终局互偿。");
    return;
  }

  // 若一方筹过少不够大盲，仍可打（全下盲注）
  pokerNewMission();
  const sexAnte = pokerSb();
  poker.sexPot = 0;
  [0, 1].forEach((i) => {
    const p = poker.players[i];
    const pay = Math.min(p.chips, sexAnte);
    if (pay > 0) {
      p.chips -= pay;
      poker.sexPot += pay;
    }
  });
  if (poker.sexPot > 0) pokerLog(`色池 ${poker.sexPot}（与主池分开，赢家收）`);

  const sb = poker.dealer;
  const bb = pokerOpp(sb);
  const sbAmt = pokerPostBlind(sb, pokerSb());
  const bbAmt = pokerPostBlind(bb, pokerBb());
  poker.currentBet = Math.max(poker.players[0].bet, poker.players[1].bet);
  // 最小加注额 = 大盲（或已出现的加注额）
  poker.minRaise = pokerBb();
  poker.handCtx.potPeak = poker.pot;
  if (poker.players[sb].allIn || poker.players[bb].allIn) poker.handCtx.hadAllIn = true;

  poker.players[0].hole = [poker.deck.pop(), poker.deck.pop()];
  poker.players[1].hole = [poker.deck.pop(), poker.deck.pop()];

  // HU 前注：庄家=SB 先行动；若 SB 已全下则 BB 行动
  poker.acted = [false, false];
  // 盲注本身不算“本街行动完毕”
  poker.lastAggressor = bbAmt > sbAmt ? bb : null;
  poker.toAct = poker.players[sb].allIn ? bb : sb;
  if (poker.players[poker.toAct].allIn) {
    // 双方盲注后都动不了
    pokerLog(`盲注 SB${sbAmt} / BB${bbAmt} · 有人盲注全下，直接发牌。`);
    poker.phase = "playing";
    pokerRunoutAndShowdown();
    return;
  }

  pokerLog(
    `—— 第 ${poker.handNo} 手 · ${poker.players[sb].name} 小盲${sbAmt} / ${poker.players[bb].name} 大盲${bbAmt}（级别 ${pokerSb()}/${pokerBb()}）——`
  );
  pokerLog(`🎯 任务：${poker.mission.text}（+${poker.mission.bonus}）`);
  pokerLog(`轮到 ${poker.players[poker.toAct].name} 行动（前注）`);
  pokerLog(pokerPick(POKER_STREET_FLAVOR.preflop));
  poker.phase = "playing";
  pokerRender();
}

function pokerDealBoard(n) {
  if (poker.deck.length) poker.deck.pop(); // burn
  for (let i = 0; i < n; i++) {
    if (poker.deck.length) poker.board.push(poker.deck.pop());
  }
}

/** 全下后一次发完剩余公共牌再摊牌 */
function pokerRunoutAndShowdown() {
  pokerReturnUncalled();
  while (poker.board.length < 5) {
    if (poker.board.length === 0) {
      poker.street = "flop";
      pokerDealBoard(3);
      pokerLog(`翻牌：${poker.board.map(pokerCardId).join(" ")}`);
    } else if (poker.board.length === 3) {
      poker.street = "turn";
      pokerDealBoard(1);
      pokerLog(`转牌：${pokerCardId(poker.board[3])}`);
    } else if (poker.board.length === 4) {
      poker.street = "river";
      pokerDealBoard(1);
      pokerLog(`河牌：${pokerCardId(poker.board[4])}`);
    } else break;
  }
  poker.street = "showdown";
  pokerShowdown();
}

function pokerAdvanceStreet() {
  pokerReturnUncalled();
  pokerCollectBetsToPot();
  poker.tableTeaseUsed = false;

  if (poker.street === "preflop") {
    poker.street = "flop";
    pokerDealBoard(3);
    pokerLog(`翻牌：${poker.board.map(pokerCardId).join(" ")}`);
    pokerLog(pokerPick(POKER_STREET_FLAVOR.flop));
  } else if (poker.street === "flop") {
    poker.street = "turn";
    pokerDealBoard(1);
    pokerLog(`转牌：${pokerCardId(poker.board[3])}`);
    pokerLog(pokerPick(POKER_STREET_FLAVOR.turn));
  } else if (poker.street === "turn") {
    poker.street = "river";
    pokerDealBoard(1);
    pokerLog(`河牌：${pokerCardId(poker.board[4])}`);
    pokerLog(pokerPick(POKER_STREET_FLAVOR.river));
  } else if (poker.street === "river") {
    pokerShowdown();
    return;
  }

  // 若有人已全下且对方无法再加注（已对齐），直接发完
  const [a, b] = poker.players;
  if ((a.allIn || b.allIn) && !a.folded && !b.folded) {
    pokerLog("有人全下，剩余公共牌一次发完。");
    poker.handCtx.hadAllIn = true;
    pokerRunoutAndShowdown();
    return;
  }

  // HU 翻后：大盲（非庄）先行动
  const first = pokerOpp(poker.dealer);
  poker.toAct = first;
  if (poker.players[first].allIn || poker.players[first].chips === 0) {
    poker.toAct = poker.dealer;
  }
  pokerLog(`轮到 ${poker.players[poker.toAct].name}（${{ flop: "翻牌", turn: "转牌", river: "河牌" }[poker.street]}圈）`);
  pokerRender();
}

function pokerAfterAction(actorIndex) {
  poker.handCtx.potPeak = Math.max(poker.handCtx.potPeak || 0, poker.pot);

  if (poker.players[0].folded || poker.players[1].folded) {
    pokerWinFold(poker.players[0].folded ? 1 : 0);
    return;
  }

  if (!pokerRoundClosed()) {
    const n = pokerFindNextToAct(actorIndex);
    if (n >= 0) {
      poker.toAct = n;
      pokerLog(`→ ${poker.players[n].name} 行动`);
      pokerRender();
      return;
    }
  }

  // 本街结束
  const someoneAllIn = poker.players.some((p) => p.allIn || (p.chips === 0 && !p.folded));
  if (someoneAllIn) {
    poker.handCtx.hadAllIn = true;
    if (poker.street === "river") {
      pokerReturnUncalled();
      pokerShowdown();
    } else {
      pokerRunoutAndShowdown();
    }
    return;
  }

  if (poker.street === "river") {
    pokerReturnUncalled();
    pokerShowdown();
  } else {
    pokerAdvanceStreet();
  }
}

function pokerNeedToCall(i) {
  return Math.max(0, poker.currentBet - poker.players[i].bet);
}

function pokerMinRaiseTo(i) {
  // 加注后的总注额下限：当前注 + minRaise；不能超过自己的有效全下
  const p = poker.players[i];
  const stackTo = p.bet + p.chips;
  if (poker.currentBet === 0) {
    return Math.min(stackTo, pokerBb());
  }
  const minTo = poker.currentBet + poker.minRaise;
  return Math.min(stackTo, minTo);
}

function pokerDoFold(i) {
  if (poker.phase !== "playing" || poker.toAct !== i) return;
  const p = poker.players[i];
  if (p.folded || p.allIn) return;
  p.folded = true;
  pokerLog(`${p.name} 弃牌。`);
  poker.actionLog.push(`${p.name} 弃牌`);
  pokerAddLust(i, 1, "弃牌");
  pokerWinFold(pokerOpp(i));
}

function pokerWinFold(w) {
  pokerReturnUncalled();
  const winner = poker.players[w];
  const won = poker.pot;
  winner.chips += won;
  pokerLog(`${winner.name} 不战而胜，收池 ${won}。`);
  poker.pot = 0;
  poker.handCtx.reason = "fold";
  pokerOpenResolve(w, null, "fold");
}

function pokerDoCheckCall(i) {
  if (poker.phase !== "playing" || poker.toAct !== i) return;
  const p = poker.players[i];
  if (p.folded || p.allIn) return;
  const need = pokerNeedToCall(i);
  if (need === 0) {
    pokerLog(`${p.name} 过牌。`);
    poker.actionLog.push(`${p.name} 过牌`);
    poker.acted[i] = true;
    pokerAfterAction(i);
    return;
  }
  const pay = Math.min(p.chips, need);
  p.chips -= pay;
  p.bet += pay;
  poker.pot += pay;
  if (p.chips === 0) {
    p.allIn = true;
    poker.handCtx.hadAllIn = true;
  }
  const tag = p.allIn ? "跟注全下" : "跟注";
  pokerLog(`${p.name} ${tag} ${pay}（本街注 ${p.bet}）。`);
  poker.actionLog.push(`${p.name} ${tag}${pay}`);
  poker.acted[i] = true;
  pokerAfterAction(i);
}

/**
 * 下注/加注到 totalBet（本街累计注额）
 * 若 totalBet <= currentBet 则视为跟注
 */
function pokerDoBetRaise(i, totalBet) {
  if (poker.phase !== "playing" || poker.toAct !== i) return;
  const p = poker.players[i];
  if (p.folded || p.allIn) return;

  totalBet = Math.floor(Number(totalBet) || 0);
  const maxTo = p.bet + p.chips;
  totalBet = Math.max(p.bet, Math.min(totalBet, maxTo));

  const need = totalBet - p.bet;
  if (need <= 0) {
    pokerDoCheckCall(i);
    return;
  }

  // 未达到当前注：按跟注处理
  if (totalBet < poker.currentBet) {
    pokerDoCheckCall(i);
    return;
  }

  // 等于当前注：跟注
  if (totalBet === poker.currentBet) {
    pokerDoCheckCall(i);
    return;
  }

  // 加注：必须 >= minRaise，除非全下不够（短码全下加注合法）
  const raiseBy = totalBet - poker.currentBet;
  const isAllIn = totalBet === maxTo;
  if (raiseBy < poker.minRaise && !isAllIn) {
    // 自动抬到合法最小加注
    totalBet = Math.min(maxTo, poker.currentBet + poker.minRaise);
  }

  const pay = totalBet - p.bet;
  p.chips -= pay;
  p.bet += pay;
  poker.pot += pay;
  if (p.chips === 0) {
    p.allIn = true;
    poker.handCtx.hadAllIn = true;
  }

  const prev = poker.currentBet;
  const realRaise = p.bet - prev;
  if (p.bet > poker.currentBet) {
    // 合法加注才刷新 minRaise（短码全下小于 minRaise 时不刷新，按规则）
    if (realRaise >= poker.minRaise) {
      poker.minRaise = realRaise;
    }
    poker.currentBet = p.bet;
    poker.lastAggressor = i;
    poker.acted = [false, false];
    poker.acted[i] = true;
    poker.handCtx.raises++;
    if (poker.street !== "preflop") poker.handCtx.streetBets[poker.street] = true;
    const verb = p.allIn ? "全下至" : prev === 0 ? "下注" : "加注至";
    pokerLog(`${p.name} ${verb} ${p.bet}${p.allIn ? "（全下）" : ""}。`);
    poker.actionLog.push(`${p.name} ${verb}${p.bet}`);
    pokerAddLust(pokerOpp(i), 1, "被加注");
  } else {
    poker.acted[i] = true;
    pokerLog(`${p.name} 跟注 ${pay}。`);
  }
  pokerAfterAction(i);
}

function pokerDoAllIn(i) {
  const p = poker.players[i];
  pokerDoBetRaise(i, p.bet + p.chips);
}

/** 快捷：最小加注 / 半池 / 满池 */
function pokerPresetRaiseTo(i, kind) {
  const p = poker.players[i];
  const maxTo = p.bet + p.chips;
  let to;
  if (kind === "min") {
    to = poker.currentBet === 0 ? pokerBb() : poker.currentBet + poker.minRaise;
  } else if (kind === "half") {
    to = Math.max(pokerMinRaiseTo(i), p.bet + Math.ceil(poker.pot / 2));
  } else if (kind === "pot") {
    // 约等于 pot-sized bet：跟注额 + 底池 + 跟注
    const call = pokerNeedToCall(i);
    to = p.bet + call + (poker.pot + call);
  } else {
    to = maxTo;
  }
  pokerDoBetRaise(i, Math.min(maxTo, to));
}

/** 牌局中的即时色操作 */
function pokerDoStreetTease(i) {
  if (poker.tableTeaseUsed || poker.phase !== "playing") return;
  poker.tableTeaseUsed = true;
  const act = pokerPickSexAct(["kiss", "touch", "talk", "table", "grind"], 0);
  pokerAddLust(i, 1, "街间爱抚");
  pokerAddLust(pokerOpp(i), 1, "街间爱抚");
  poker.stats.dares++;
  pokerShowDareModal(
    `街间色戏 · ${act.label}`,
    `${poker.players[i].name} 发起：\n\n${act.text}\n\n做完继续行动（本街仅一次）。`,
    "做完点继续，回到下注"
  );
  poker._resumeAfterTease = true;
  pokerRender();
}

function pokerDoAddSexPot(i) {
  const p = poker.players[i];
  const amt = pokerBb();
  if (p.chips < amt) {
    pokerLog("筹码不够加色池。");
    return;
  }
  p.chips -= amt;
  poker.sexPot += amt;
  pokerAddLust(i, 1, "主动加色池");
  pokerLog(`${p.name} 向色池再扔 ${amt} —— 想玩得更脏。`);
  pokerRender();
}

function pokerShowdown() {
  poker.street = "showdown";
  pokerReturnUncalled();
  pokerLog(pokerPick(POKER_STREET_FLAVOR.showdown));

  // 弃牌方不比牌
  if (poker.players[0].folded || poker.players[1].folded) {
    pokerWinFold(poker.players[0].folded ? 1 : 0);
    return;
  }

  const h0 = pokerBestHand(poker.players[0].hole, poker.board);
  const h1 = pokerBestHand(poker.players[1].hole, poker.board);
  pokerLog(
    `${poker.players[0].name}：${h0.name}｜底牌 ${poker.players[0].hole.map(pokerCardId).join(" ")}`
  );
  pokerLog(
    `${poker.players[1].name}：${h1.name}｜底牌 ${poker.players[1].hole.map(pokerCardId).join(" ")}`
  );
  poker.handCtx.reason = "showdown";
  const cmp = pokerBetter(h0, h1);
  if (cmp === 0) {
    const half = Math.floor(poker.pot / 2);
    const rest = poker.pot - half;
    poker.players[0].chips += half;
    poker.players[1].chips += rest;
    pokerLog(`牌力相同，平分底池 ${poker.pot}（${half}/${rest}）。`);
    poker.pot = 0;
    pokerOpenResolve(-1, { h0, h1 }, "tie");
  } else {
    const w = cmp > 0 ? 0 : 1;
    const won = poker.pot;
    poker.players[w].chips += won;
    pokerLog(`${poker.players[w].name} 以「${(cmp > 0 ? h0 : h1).name}」赢下 ${won}！`);
    poker.pot = 0;
    pokerOpenResolve(w, { h0, h1 }, "showdown");
  }
}

/** 简易牌力提示（仅当前行动者，帮助真实决策） */
function pokerHandHint(i) {
  const p = poker.players[i];
  if (!p?.hole?.length) return "";
  if (poker.board.length < 3) {
    const [c1, c2] = p.hole;
    const suited = c1.s === c2.s;
    const hi = Math.max(c1.r, c2.r);
    const lo = Math.min(c1.r, c2.r);
    const pair = c1.r === c2.r;
    if (pair) return `口袋对 ${POKER_RANKS[hi]}`;
    const gap = hi - lo;
    let s = `${POKER_RANKS[hi]}${POKER_RANKS[lo]}${suited ? "s" : "o"}`;
    if (hi >= 10 && lo >= 8) s += " · 高牌强";
    else if (suited && gap <= 2) s += " · 同花连张";
    else if (gap === 0) s += "";
    return s;
  }
  const best = pokerBestHand(p.hole, poker.board);
  return `当前最好：${best.name}`;
}

function pokerEvalMission(winner, hands) {
  if (!poker.mission || winner < 0) return null;
  const h = hands ? (winner === 0 ? hands.h0 : hands.h1) : null;
  const ctx = { ...poker.handCtx, potPeak: poker.handCtx.potPeak };
  try {
    if (poker.mission.check(h, ctx)) {
      poker.players[winner].chips += poker.mission.bonus;
      poker.stats.missions++;
      pokerLog(`🎯 任务完成！${poker.players[winner].name} +${poker.mission.bonus} 筹`);
      return poker.mission;
    }
  } catch (_) { /* ignore */ }
  return null;
}

function pokerOpenResolve(winner, hands, reason) {
  poker.phase = "resolve";
  poker.handCtx.reason = reason;
  const winHand = hands && winner >= 0 ? (winner === 0 ? hands.h0 : hands.h1) : null;
  const handCat = winHand?.cat ?? 0;

  if (winner >= 0) {
    poker.winStreak[winner]++;
    poker.winStreak[pokerOpp(winner)] = 0;
    poker.sexStreak[winner]++;
    pokerEvalMission(winner, hands);
    // 色池归赢家（可兑色）
    if (poker.sexPot > 0) {
      poker.players[winner].chips += poker.sexPot;
      poker.stats.sexPotWon += poker.sexPot;
      pokerLog(`${poker.players[winner].name} 收走色池 ${poker.sexPot}`);
      poker.sexPot = 0;
    }
    pokerAddLust(pokerOpp(winner), 1 + Math.min(3, Math.floor(handCat / 2)), "输掉摊牌");
  }

  const acts = {
    soft: pokerPickSexAct(["kiss", "touch", "talk", "grind", "table"], handCat),
    hot: pokerPickSexAct(["touch", "oral", "finger", "grind", "talk"], handCat),
    deep: pokerPickSexAct(["oral", "finger", "climax", "insert", "grind"], handCat),
    position: pokerPick(POKER_POSITIONS),
    table: pokerPickSexAct(["table", "talk", "touch"], handCat),
  };

  // 连胜加码
  let streakNote = "";
  if (winner >= 0 && poker.winStreak[winner] >= 3) {
    streakNote = `连胜 ${poker.winStreak[winner]}！色令自动升档。`;
    acts.deep = pokerPickSexAct(["climax", "insert", "oral", "finger"], Math.max(handCat, 4));
  }

  // 情欲债强制
  let debtNote = "";
  if (winner >= 0 && poker.players[pokerOpp(winner)].sexDebt > 0) {
    debtNote = `输家有 ${poker.players[pokerOpp(winner)].sexDebt} 笔情欲债，建议选「高潮任务」或「插入」。`;
  }

  poker.pendingResolve = {
    winner,
    loser: winner < 0 ? -1 : pokerOpp(winner),
    hands,
    reason,
    handCat,
    acts,
    streakNote,
    debtNote,
    winHandName: winHand?.name || (reason === "fold" ? "弃牌胜" : "—"),
  };
  pokerRender();
}

function pokerApplyResolve(choice) {
  const r = poker.pendingResolve;
  if (!r) return;
  let waitModal = false;
  let body = "";
  let title = "色令";

  if (r.winner < 0) {
    if (choice === "skip") {
      pokerLog("平局跳过色令。");
    } else {
      const act = r.acts.hot;
      poker.stats.dares++;
      pokerAddLust(0, 2, "平局双修");
      pokerAddLust(1, 2, "平局双修");
      title = `平局 · ${act.label}`;
      body = `两人一起：\n\n${act.text}`;
      waitModal = true;
      pokerShowDareModal(title, body, "一起做完再继续");
    }
    pokerScheduleNextHand(waitModal);
    return;
  }

  const w = r.winner;
  const l = r.loser;
  const wn = poker.players[w].name;
  const ln = poker.players[l].name;

  if (choice === "chips") {
    pokerLog(`${wn} 只要筹码，今晚暂且嘴下留情。`);
    poker.winStreak[w] = Math.max(0, poker.winStreak[w] - 1);
  } else if (choice === "soft") {
    const act = r.acts.soft;
    poker.stats.dares++;
    pokerAddLust(l, 2, act.label);
    title = `${wn} 的温柔色令 · ${act.label}`;
    body = `${ln} 执行：\n\n${act.text}`;
    waitModal = true;
    pokerShowDareModal(title, body, "做完继续");
  } else if (choice === "hot") {
    const act = r.acts.hot;
    poker.stats.dares++;
    pokerAddLust(l, 3, act.label);
    title = `${wn} 的情欲色令 · ${act.label}`;
    body = `${ln} 执行：\n\n${act.text}${r.streakNote ? `\n\n🔥 ${r.streakNote}` : ""}`;
    waitModal = true;
    pokerShowDareModal(title, body, "做完继续——要认真做");
  } else if (choice === "deep") {
    const act = r.acts.deep;
    poker.stats.dares++;
    poker.stats.orgasms++;
    poker.players[l].orgasms = (poker.players[l].orgasms || 0) + (act.cat === "climax" ? 1 : 0);
    pokerAddLust(l, 4, act.label);
    if (poker.players[l].sexDebt > 0) poker.players[l].sexDebt--;
    title = `${wn} 的痴迷色令 · ${act.label}`;
    body = `${ln} 执行：\n\n${act.text}\n\n牌力参考：${r.winHandName}${r.debtNote ? `\n\n${r.debtNote}` : ""}`;
    waitModal = true;
    pokerShowDareModal(title, body, "做到位再点继续");
  } else if (choice === "position") {
    const pos = r.acts.position;
    poker.stats.dares++;
    pokerAddLust(l, 3, pos.label);
    title = `指定体位 · ${pos.label}`;
    body = `${wn} 指定 ${ln}：\n\n${pos.act}`;
    waitModal = true;
    pokerShowDareModal(title, body, "做满时间");
  } else if (choice === "climax") {
    const act = pokerPickSexAct(["climax", "oral", "finger", "insert"], Math.max(r.handCat, 3));
    poker.stats.dares++;
    poker.stats.orgasms++;
    poker.players[l].orgasms = (poker.players[l].orgasms || 0) + 1;
    pokerAddLust(l, 5, "高潮任务");
    if (poker.players[l].sexDebt > 0) poker.players[l].sexDebt = Math.max(0, poker.players[l].sexDebt - 1);
    title = "高潮任务 💦";
    body = `${ln} 必须到达一次高潮/射精：\n\n${act.text}\n\n安全词随时可用，除此之外做到为止。`;
    waitModal = true;
    pokerShowDareModal(title, body, "去了再点继续");
  } else if (choice === "debt") {
    poker.players[l].sexDebt = (poker.players[l].sexDebt || 0) + 1;
    poker.players[w].chips += pokerBb() * 2;
    pokerAddLust(l, 2, "欠下情欲债");
    pokerLog(`${ln} 选择欠债：情欲债 +1，${wn} 立刻 +${pokerBb() * 2} 筹。`);
    title = "情欲欠条";
    body = `${ln} 本手不立刻做，但欠下 1 笔情欲债。\n之后任意高潮/痴迷色令可优先清算。\n\n推荐下一手输了选「高潮任务」。`;
    waitModal = true;
    pokerShowDareModal(title, body, "知道了");
  }

  pokerLog(`色令选择：${choice}（${wn} → ${ln}）`);
  pokerScheduleNextHand(waitModal);
}

function pokerScheduleNextHand(waitModal) {
  poker.pendingResolve = null;
  poker._waitNext = !!waitModal;
  if (!waitModal) pokerContinueAfterResolve();
  else pokerRender();
}

function pokerContinueAfterResolve() {
  poker._waitNext = false;
  poker.dealer = pokerOpp(poker.dealer);

  // 终局：一方筹码耗尽且情欲债很高，或手数上限
  const p0 = poker.players[0];
  const p1 = poker.players[1];
  if (poker.handNo >= 40) {
    pokerEndGame(`打满 ${poker.handNo} 手。按情欲与筹码结算今晚归属。`);
    return;
  }
  if (p0.lust >= 10 && p1.lust >= 10 && poker.handNo >= 10) {
    pokerEndGame("双方欲火都满了——牌桌关灯，上床算总账。");
    return;
  }
  // 一方彻底破产且债≥3
  if ((p0.chips <= 0 && p0.sexDebt >= 3) || (p1.chips <= 0 && p1.sexDebt >= 3)) {
    const loser = p0.sexDebt >= 3 && p0.chips <= 0 ? 0 : 1;
    pokerEndGame(
      `${poker.players[loser].name} 债台高筑又没筹。\n${poker.players[pokerOpp(loser)].name} 赢下今晚，任意收债三轮。`
    );
    return;
  }

  poker.phase = "playing";
  pokerStartHand();
}

function pokerEndGame(msg) {
  poker.phase = "over";
  pokerLog(msg);
  const a = poker.players[0];
  const b = poker.players[1];
  const denser = a.lust >= b.lust ? a : b;
  const finalDare =
    poker.heat === "deep"
      ? `终局：${denser.name} 指定体位完整做一轮，至少一方高潮；另一人用嘴清理。`
      : poker.heat === "hot"
        ? `终局：${denser.name} 被口/手做到射或潮，或协商插入做到一方高潮。`
        : `终局：全裸热吻爱抚 5 分钟，互相用手做到满足。`;

  const summary = [
    msg,
    "",
    `手数 ${poker.stats.hands} · 色令 ${poker.stats.dares} · 高潮任务 ${poker.stats.orgasms}`,
    `${a.name} 情欲 ${a.lust}/10 · 债 ${a.sexDebt} · 筹 ${a.chips}`,
    `${b.name} 情欲 ${b.lust}/10 · 债 ${b.sexDebt} · 筹 ${b.chips}`,
    "",
    finalDare,
  ].join("\n");

  pokerShowDareModal("本局终了", summary, "返回大厅或再来一局");
  if (typeof addXP === "function") {
    addXP(100 + poker.stats.hands * 4 + poker.stats.dares * 10 + poker.stats.orgasms * 15);
  }
  pokerRender();
}

function pokerShowDareModal(title, body, hint) {
  const modal = document.getElementById("poker-dare-modal");
  if (!modal) {
    alert(`${title}\n\n${body}`);
    return;
  }
  modal.querySelector(".poker-dare-title").textContent = title;
  modal.querySelector(".poker-dare-body").textContent = body;
  modal.querySelector(".poker-dare-hint").textContent = hint || "";
  modal.classList.add("show");
}

function pokerHideDareModal() {
  document.getElementById("poker-dare-modal")?.classList.remove("show");
}

function pokerEl(id) {
  return document.getElementById(id);
}

function pokerRenderCard(c) {
  if (!c) return `<div class="pk-card pk-card-slot"></div>`;
  const red = c.s === 1 || c.s === 2;
  return `<div class="pk-card ${POKER_SUIT_CLASS[c.s]} ${red ? "red" : "black"}">
    <span class="pk-r">${POKER_RANKS[c.r]}</span>
    <span class="pk-s">${POKER_SUITS[c.s]}</span>
  </div>`;
}

function escapePokerHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function pokerRender() {
  const setup = pokerEl("poker-setup");
  const table = pokerEl("poker-table-wrap");
  if (poker.phase === "setup") {
    setup?.classList.remove("hidden");
    table?.classList.add("hidden");
    return;
  }
  setup?.classList.add("hidden");
  table?.classList.remove("hidden");

  const streetLabel = {
    preflop: "前注",
    flop: "翻牌",
    turn: "转牌",
    river: "河牌",
    showdown: "摊牌",
  }[poker.street] || poker.street;

  const meta = pokerEl("poker-hand-meta");
  if (meta) {
    meta.textContent = `第 ${poker.handNo} 手 · ${streetLabel} · 盲${pokerSb()}/${pokerBb()} · 热度${poker.heatMeter}% · ${pokerCfg().label}`;
  }
  const potEl = pokerEl("poker-pot");
  if (potEl) potEl.innerHTML = `${poker.pot}<small class="pk-sexpot"> 色${poker.sexPot || 0}</small>`;

  const missionEl = pokerEl("poker-mission");
  if (missionEl) {
    missionEl.textContent = poker.mission
      ? `🎯 ${poker.mission.text}（+${poker.mission.bonus}）`
      : "";
  }

  pokerEl("poker-board").innerHTML = [0, 1, 2, 3, 4]
    .map((i) => (poker.board[i] ? pokerRenderCard(poker.board[i]) : pokerRenderCard(null)))
    .join("");

  [0, 1].forEach((i) => {
    const p = poker.players[i];
    const seat = pokerEl(`poker-seat-${i}`);
    if (!seat) return;
    const isTurn = poker.phase === "playing" && poker.toAct === i && !p.folded && !p.allIn;
    seat.classList.toggle("pk-turn", isTurn);
    seat.classList.toggle("pk-folded", p.folded);
    seat.querySelector(".pk-name").textContent =
      p.name + (i === poker.dealer ? " · 庄" : "") + (poker.winStreak[i] >= 2 ? ` 🔥${poker.winStreak[i]}` : "");
    seat.querySelector(".pk-chips").textContent = `${p.chips} 筹`;
    seat.querySelector(".pk-bet").textContent = p.bet ? `注 ${p.bet}` : "";
    const clothes = seat.querySelector(".pk-clothes");
    if (clothes) {
      clothes.innerHTML = `${pokerLustLabel(p)}${p.sexDebt ? ` · 债${p.sexDebt}` : ""}`;
      clothes.title = "情欲值（非脱衣层数）";
    }
    seat.querySelector(".pk-hole").innerHTML = p.hole.map((c) => pokerRenderCard(c)).join("");
    seat.querySelector(".pk-status").textContent = p.folded
      ? "弃牌"
      : p.allIn
        ? "全下"
        : isTurn
          ? "行动中"
          : "";
  });

  const log = pokerEl("poker-log");
  if (log) log.innerHTML = poker.log.slice(0, 10).map((l) => `<p>${escapePokerHtml(l)}</p>`).join("");

  const actions = pokerEl("poker-actions");
  const resolve = pokerEl("poker-resolve");
  if (poker.phase === "resolve" && poker.pendingResolve) {
    actions?.classList.add("hidden");
    resolve?.classList.remove("hidden");
    pokerRenderResolve();
  } else if (poker.phase === "resolve" && poker._waitNext) {
    actions?.classList.add("hidden");
    resolve?.classList.remove("hidden");
    if (resolve) {
      resolve.innerHTML = `<p class="pk-resolve-title">执行色令中…</p>
        <p class="pk-resolve-sub">做完后点弹窗「做完了 · 继续」发下一手。</p>`;
    }
  } else if (poker.phase === "playing") {
    resolve?.classList.add("hidden");
    actions?.classList.remove("hidden");
    pokerRenderActions();
  } else if (poker.phase === "over") {
    actions?.classList.add("hidden");
    resolve?.classList.remove("hidden");
    if (resolve) {
      resolve.innerHTML = `
        <p class="pk-resolve-title">本局结束</p>
        <div class="pk-resolve-btns">
          <button type="button" class="btn-primary" id="pk-again">再来一局</button>
          <button type="button" class="btn-ghost" id="pk-hub">回大厅</button>
        </div>`;
      pokerEl("pk-again")?.addEventListener("click", () => pokerBegin(poker.heat));
      pokerEl("pk-hub")?.addEventListener("click", () => {
        showScreen("hub");
        renderHub?.();
      });
    }
  } else {
    actions?.classList.add("hidden");
    resolve?.classList.add("hidden");
  }
}

function pokerRenderActions() {
  const i = poker.toAct;
  const p = poker.players[i];
  const box = pokerEl("poker-actions");
  if (!box) return;
  if (!p || p.folded || p.allIn) {
    box.innerHTML = `<p class="pk-act-hint">等待发牌或对方行动…</p>`;
    return;
  }
  const need = pokerNeedToCall(i);
  const canCheck = need === 0;
  const stack = p.bet + p.chips;
  const minTo = poker.currentBet === 0
    ? Math.min(stack, pokerBb())
    : Math.min(stack, poker.currentBet + poker.minRaise);
  const raiseMax = stack;
  const canOpenRaise = raiseMax > poker.currentBet && p.chips > 0;
  // 能加注：要么够最小加注，要么可以短码全下超过当前注
  const canRaise = canOpenRaise && (stack > poker.currentBet);
  const raiseDefault = Math.min(raiseMax, Math.max(minTo, poker.currentBet + poker.minRaise));
  const callLabel = canCheck
    ? "过牌 ✓"
    : need >= p.chips
      ? `全下跟注 ${p.chips}`
      : `跟注 ${need}`;
  const potOdds = need > 0 ? Math.round((need / (poker.pot + need)) * 100) : 0;
  const effStack = Math.min(p.chips, poker.players[pokerOpp(i)].chips + poker.players[pokerOpp(i)].bet - p.bet);
  const hint = pokerHandHint(i);
  const streetName = { preflop: "前注", flop: "翻牌", turn: "转牌", river: "河牌" }[poker.street] || "";

  box.innerHTML = `
    <div class="pk-pass-banner">📱 把手机给 <strong>${escapePokerHtml(p.name)}</strong> · ${streetName}圈</div>
    <p class="pk-act-hint">
      底池 <strong>${poker.pot}</strong>
      · 本街已注 <strong>${p.bet}</strong>
      · ${canCheck ? "可过牌" : `跟注 <strong>${need}</strong>${potOdds ? `（约占 ${potOdds}%）` : ""}`}
      · 有效筹≈${Math.max(0, effStack)}
    </p>
    <p class="pk-hand-hint">${escapePokerHtml(hint)} · ${pokerLustLabel(p)}</p>
    <div class="pk-act-row">
      <button type="button" class="pk-btn pk-btn-fold" data-act="fold">弃牌</button>
      <button type="button" class="pk-btn pk-btn-call" data-act="call">${callLabel}</button>
      ${canRaise ? `<button type="button" class="pk-btn pk-btn-raise" data-act="raise-toggle">加注</button>` : ""}
      <button type="button" class="pk-btn pk-btn-allin" data-act="allin">全下 ${stack}</button>
    </div>
    <div class="pk-raise-row hidden" id="pk-raise-panel">
      <div class="pk-preset-row">
        <button type="button" class="pk-preset" data-act="preset-min">最小</button>
        <button type="button" class="pk-preset" data-act="preset-half">半池</button>
        <button type="button" class="pk-preset" data-act="preset-pot">满池</button>
      </div>
      <input type="range" id="pk-raise-range" min="${Math.min(minTo, raiseMax)}" max="${raiseMax}" value="${Math.min(raiseDefault, raiseMax)}" step="1" />
      <span id="pk-raise-val"></span>
      <button type="button" class="pk-btn pk-btn-call" data-act="raise-confirm">确认加注</button>
    </div>
    <div class="pk-act-row pk-act-sex">
      <button type="button" class="pk-btn pk-btn-tease" data-act="tease" ${poker.tableTeaseUsed ? "disabled" : ""}>街间色戏</button>
      <button type="button" class="pk-btn pk-btn-sexpot" data-act="sexpot">色池+${pokerBb()}</button>
    </div>
    <p class="pk-sexy-tip">规则：最小加注 ${poker.minRaise} · 短码全下可不足最小加注 · 未叫注将退还</p>
  `;

  const range = pokerEl("pk-raise-range");
  const val = pokerEl("pk-raise-val");
  const syncVal = () => {
    if (val && range) {
      const v = +range.value;
      const diff = v - poker.currentBet;
      val.textContent = v <= poker.currentBet ? `至 ${v}` : `加注至 ${v}（+${diff}）`;
    }
  };
  syncVal();
  range?.addEventListener("input", syncVal);

  box.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.act;
      if (act === "fold") pokerDoFold(i);
      else if (act === "call") pokerDoCheckCall(i);
      else if (act === "raise-toggle") pokerEl("pk-raise-panel")?.classList.toggle("hidden");
      else if (act === "raise-confirm") pokerDoBetRaise(i, +pokerEl("pk-raise-range").value);
      else if (act === "allin") pokerDoAllIn(i);
      else if (act === "preset-min") pokerPresetRaiseTo(i, "min");
      else if (act === "preset-half") pokerPresetRaiseTo(i, "half");
      else if (act === "preset-pot") pokerPresetRaiseTo(i, "pot");
      else if (act === "tease") pokerDoStreetTease(i);
      else if (act === "sexpot") pokerDoAddSexPot(i);
    });
  });
}

function pokerRenderResolve() {
  const r = poker.pendingResolve;
  const box = pokerEl("poker-resolve");
  if (!r || !box) return;

  if (r.winner < 0) {
    box.innerHTML = `
      <p class="pk-resolve-title">平局 · 底池平分</p>
      <p class="pk-resolve-sub">色池仍在 · 可以双人色令升温</p>
      <div class="pk-resolve-btns pk-resolve-grid">
        <button type="button" class="pk-btn" data-res="skip">下一手</button>
        <button type="button" class="pk-btn pk-btn-sex" data-res="hot">双人色令</button>
      </div>`;
  } else {
    const w = poker.players[r.winner].name;
    const l = poker.players[r.loser].name;
    box.innerHTML = `
      <p class="pk-resolve-title">${escapePokerHtml(w)} 赢了 · ${escapePokerHtml(r.winHandName)}</p>
      <p class="pk-resolve-sub">输家 ${escapePokerHtml(l)} · 选惩罚档位（脱衣很少，肉体很多）
        ${r.streakNote ? `<br>🔥 ${escapePokerHtml(r.streakNote)}` : ""}
        ${r.debtNote ? `<br> rec ${escapePokerHtml(r.debtNote)}` : ""}
      </p>
      <div class="pk-resolve-btns pk-resolve-grid">
        <button type="button" class="pk-btn" data-res="chips">只要筹码</button>
        <button type="button" class="pk-btn pk-btn-soft" data-res="soft">调情色令</button>
        <button type="button" class="pk-btn pk-btn-sex" data-res="hot">情欲色令</button>
        <button type="button" class="pk-btn pk-btn-deep" data-res="deep">痴迷色令</button>
        <button type="button" class="pk-btn pk-btn-pos" data-res="position">指定体位</button>
        <button type="button" class="pk-btn pk-btn-climax" data-res="climax">高潮任务</button>
        <button type="button" class="pk-btn pk-btn-debt" data-res="debt">欠债换筹</button>
      </div>`;
  }

  // fix accidental " rec " typo in template - I used rec by mistake
  box.innerHTML = box.innerHTML.replace(" rec ", " ");

  box.querySelectorAll("[data-res]").forEach((btn) => {
    btn.addEventListener("click", () => pokerApplyResolve(btn.dataset.res));
  });
}

function pokerBegin(heat) {
  poker.heat = heat || "hot";
  const cfg = pokerCfg();
  const a = (typeof state !== "undefined" && state.nameA) || "TA";
  const b = (typeof state !== "undefined" && state.nameB) || "你";
  poker.names = [a, b];
  poker.dealer = 0;
  poker.handNo = 0;
  poker.bbLevel = 0;
  poker.log = [];
  poker.heatMeter = heat === "deep" ? 30 : heat === "hot" ? 15 : 5;
  poker.sexStreak = [0, 0];
  poker.winStreak = [0, 0];
  poker.sexPot = 0;
  poker.stats = { hands: 0, dares: 0, allins: 0, orgasms: 0, missions: 0, sexPotWon: 0 };
  poker.players = pokerCreatePlayers(cfg.startChips);
  poker.phase = "playing";
  pokerHideDareModal();
  pokerLog(`情侣德州 · ${cfg.label} · 盲注 ${cfg.sb}/${cfg.bb} 起，每 ${cfg.riseEvery} 手升级`);
  pokerLog("机制：色池、街间色戏、本手任务、连胜升档、情欲值、高潮任务。脱衣极少。");
  pokerStartHand();
}

function pokerOpenSetup() {
  poker.phase = "setup";
  pokerRender();
  if (typeof showScreen === "function") showScreen("poker");
}

function pokerBindUI() {
  document.getElementById("btn-poker-start-soft")?.addEventListener("click", () => pokerBegin("soft"));
  document.getElementById("btn-poker-start-hot")?.addEventListener("click", () => pokerBegin("hot"));
  document.getElementById("btn-poker-start-deep")?.addEventListener("click", () => pokerBegin("deep"));
  document.getElementById("btn-poker-back")?.addEventListener("click", () => {
    if (poker.phase === "playing" || poker.phase === "resolve") {
      if (!confirm("退出当前牌局？")) return;
    }
    poker.phase = "setup";
    showScreen("hub");
    renderHub?.();
  });
  document.getElementById("btn-poker-table-exit")?.addEventListener("click", () => {
    if (!confirm("站起离开？")) return;
    poker.phase = "setup";
    showScreen("hub");
    renderHub?.();
  });
  document.getElementById("poker-dare-ok")?.addEventListener("click", () => {
    pokerHideDareModal();
    if (poker._resumeAfterTease) {
      poker._resumeAfterTease = false;
      pokerRender();
      return;
    }
    if (poker.phase === "over") {
      pokerRender();
      return;
    }
    if (poker._waitNext) pokerContinueAfterResolve();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pokerBindUI);
} else {
  pokerBindUI();
}
