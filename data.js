const CARD_TYPES = {
  serve: { label: "服侍 TA", hint: "主动取悦", color: "#e8a0b8" },
  receive: { label: "享受 TA", hint: "躺好接受", color: "#c9a86c" },
  sync: { label: "一起", hint: "同步缠绵", color: "#d4567a" },
};

const INTENSITY_LABELS = {
  warm: "🫦 前戏",
  hot: "🔥 火热",
  deep: "💦 深入",
};

const INTENSITY_ORDER = ["warm", "hot", "deep"];

const GAME_MODES = {
  cards: { label: "卡牌", icon: "🃏", desc: "翻牌挑战，含限时/二选一等惊喜" },
  dice: { label: "骰子", icon: "🎲", desc: "掷部位+动作，每次组合都不同" },
  wheel: { label: "轮盘", icon: "🎡", desc: "转轮决定谁主动、做什么" },
  mystery: { label: "盲选", icon: "🎭", desc: "三张暗牌选一张，选错也要做" },
  scenario: { label: "情境", icon: "🎬", desc: "角色扮演、挑战、悄悄话、告白" },
};

const WHEEL_SEGMENTS = [
  { type: "serve", label: "服侍", weight: 3 },
  { type: "receive", label: "享受", weight: 3 },
  { type: "sync", label: "一起", weight: 2 },
  { type: "dice", label: "掷骰", weight: 2 },
  { type: "timer", label: "限时60秒", weight: 2 },
  { type: "strip", label: "脱一件", weight: 1 },
  { type: "bonus", label: "情欲加码", weight: 1 },
];

const BODY_PARTS = {
  warm: ["嘴唇", "耳垂", "脖颈", "锁骨", "胸口", "腰侧", "大腿内侧", "后腰"],
  hot: ["乳头", "小腹", "腿根", "阴蒂/龟头", "会阴", "臀缝", "后颈", "内侧手腕"],
  deep: ["最深处", "G点/前列腺", "阴蒂/根部", "乳头", "颈侧动脉", "腰窝", "大腿根", "结合处"],
};

const DICE_ACTIONS = {
  warm: ["亲吻", "轻咬", "舔舐", "呵气", "指尖打圈", "掌心按压", "嘴唇磨蹭", "慢慢脱衣"],
  hot: ["吸吮", "深吻", "舌头打转", "手指进入", "口舌侍奉", "揉捏", "前后磨蹭", "边做边描述"],
  deep: ["缓慢进入", "深顶", "骑乘律动", "后入", "侧入研磨", "口舌轮替", "同步高潮", "控制节奏不放"],
};

const SPECIAL_CARDS = {
  timer: {
    label: "⚡ 限时",
    items: {
      warm: [
        "在{time}秒内，用嘴唇走遍{other}上半身，不许重复同一块皮肤。",
        "{time}秒内脱掉{other}一件衣服，每脱一件亲一下。",
        "计时开始：{time}秒内让{other}出声，用什么方式你决定。",
      ],
      hot: [
        "{time}秒内用嘴让{other}明显颤抖，做不到就换{other}来惩罚你。",
        "倒计时{time}秒：口舌侍奉{other}，时间到立刻停，看{other}舒不舒服。",
        "{time}秒内手指和嘴交替刺激{other}，节奏自己掌控。",
      ],
      deep: [
        "{time}秒内进入{other}并维持律动，不许停，看{other}能忍到什么程度。",
        "骑乘{time}秒，自己控制深浅，时间到才能停。",
        "{time}秒冲刺挑战：深顶{other}，每一下都顶实。",
      ],
    },
  },
  choice: {
    label: "🔀 二选一",
    items: {
      warm: [
        { a: "从背后抱住{other}，手伸进衣服里摸五分钟", b: "面对面坐着，互相脱对方上衣" },
        { a: "亲吻{other}全身，从脚到脖子", b: "让{other}躺好，你只用嘴唇探索腿间（隔着布）" },
        { a: "跨坐在{other}腿上磨蹭", b: "让{other}跨坐在你腿上，你来摸" },
      ],
      hot: [
        { a: "用嘴侍奉{other}直到{other}求停", b: "让{other}用嘴侍奉你直到你求停" },
        { a: "手指进入{other}同时亲吻", b: "让{other}手指进入你同时亲吻" },
        { a: "你躺着，{other}用嘴从锁骨一路伺候到腿间", b: "让{other}躺好，你从大腿内侧舔到最敏感处" },
      ],
      deep: [
        { a: "后入{other}，手绕到前面揉", b: "让{other}后入你，你引导角度" },
        { a: "你骑乘控制节奏", b: "让{other}骑乘控制节奏" },
        { a: "面对面坐着进入，同步动腰", b: "侧躺相拥进入，慢慢研磨" },
      ],
    },
  },
  strip: {
    label: "👗 脱一件",
    serve: "服侍不够卖力——{self}脱一件，然后重新服侍{other}一分钟。",
    receive: "享受时害羞了？{self}脱一件，躺好让{other}继续。",
    sync: "两人对视，谁先移开视线谁脱一件，然后继续刚才的事。",
  },
  wild: {
    label: "💥 情欲加码",
    text: "下一张牌强度自动升一级，而且必须完成，不许跳过。",
  },
};

const CAMPAIGN = {
  chapters: [
    {
      id: 1,
      title: "第一夜 · 暧昧",
      desc: "从亲吻到脱衣，慢慢升温",
      intensity: "warm",
      icon: "🌙",
      rounds: [
        { mode: "cards", tag: "开局抽牌" },
        { mode: "dice", tag: "随机挑逗" },
        { mode: "mystery", tag: "命运盲选" },
        { mode: "wheel", tag: "欲望轮盘" },
      ],
      boss: {
        title: "🌙 章节 Boss",
        text: "两人只用嘴唇和手指，互相弄到对方出声求饶，不许进入，持续五分钟。",
      },
    },
    {
      id: 2,
      title: "第二夜 · 灼烧",
      desc: "口舌与手指，互相取悦",
      intensity: "hot",
      icon: "🔥",
      rounds: [
        { mode: "wheel", tag: "轮盘开局" },
        { mode: "cards", tag: "火辣指令" },
        { mode: "dice", tag: "敏感骰子" },
        { mode: "mystery", tag: "危险盲选" },
      ],
      bosses: [
        { title: "🔥 章节 Boss", text: "轮流用嘴服侍对方三分钟，先受不了的人要接受任何惩罚指令。" },
        { title: "🔥 章节 Boss", text: "头脚相反侧卧，互相口舌到手酸，再换正常姿势再来一轮。" },
        { title: "🔥 章节 Boss", text: "一人躺好，另一人从头到腿用嘴探索，再交换，不许跳过腿间。" },
      ],
      boss: {
        title: "🔥 章节 Boss",
        text: "轮流用嘴服侍对方三分钟，先受不了的人要接受任何惩罚指令。",
      },
    },
    {
      id: 3,
      title: "第三夜 · 缠绵",
      desc: "进入、体位、一起高潮",
      intensity: "deep",
      icon: "💦",
      rounds: [
        { mode: "mystery", tag: "终极盲选" },
        { mode: "cards", tag: "深入指令" },
        { mode: "dice", tag: "体位骰子" },
        { mode: "wheel", tag: "欲望轮盘" },
        { mode: "cards", tag: "深入指令 II" },
      ],
      boss: {
        title: "💦 章节 Boss",
        text: "用你们此刻最爽的体位，一直做到两人一起高潮，做完相拥不许立刻分开。",
      },
    },
    {
      id: 4,
      title: "第四夜 · 失控",
      desc: "节奏加快，忍耐极限",
      intensity: "hot",
      icon: "⚡",
      rounds: [
        { mode: "wheel", tag: "失控轮盘" },
        { mode: "dice", tag: "敏感骰子" },
        { mode: "cards", tag: "狂热指令" },
        { mode: "mystery", tag: "危险盲选" },
        { mode: "dice", tag: "再掷一次" },
      ],
      boss: {
        title: "⚡ 章节 Boss",
        text: "互相弄到濒临高潮，同时停下，深呼吸，倒数三二一后再同时继续，重复三次。",
      },
    },
    {
      id: 5,
      title: "第五夜 · 羁绊",
      desc: "同步、默契、双人缠绵",
      intensity: "hot",
      icon: "🔗",
      rounds: [
        { mode: "mystery", tag: "羁绊盲选" },
        { mode: "wheel", tag: "同步轮盘" },
        { mode: "cards", tag: "双人指令" },
        { mode: "mystery", tag: "默契考验" },
        { mode: "wheel", tag: "命运之轮" },
      ],
      boss: {
        title: "🔗 章节 Boss",
        text: "面对面坐着，腿缠在一起互相进入或紧贴磨蹭，额头贴着额头，同步呼吸到两人一起颤抖。",
      },
    },
    {
      id: 6,
      title: "第六夜 · 永恒",
      desc: "终极挑战，一夜尽头",
      intensity: "deep",
      icon: "👑",
      rounds: [
        { mode: "cards", tag: "终极 prelude" },
        { mode: "dice", tag: "体位骰局" },
        { mode: "mystery", tag: "最终盲选" },
        { mode: "wheel", tag: "命运终转" },
        { mode: "cards", tag: "最后一牌" },
      ],
      boss: {
        title: "👑 章节 Boss",
        text: "尝试三个体位各两分钟，选最爽的那个做到两人一起高潮，结束后相拥说一个从未说过的渴望。",
      },
    },
    {
      id: 7,
      title: "第七夜 · 解放",
      desc: "卸下所有顾虑，彻底放开",
      intensity: "deep",
      icon: "🦋",
      rounds: [
        { mode: "mystery", tag: "解放盲选" },
        { mode: "cards", tag: "放纵指令" },
        { mode: "dice", tag: "狂野骰子" },
        { mode: "wheel", tag: "欲望之轮" },
        { mode: "cards", tag: "深入II" },
        { mode: "dice", tag: "再掷" },
      ],
      boss: {
        title: "🦋 章节 Boss",
        text: "全裸相对，轮流说出三个从未说出口的性偏好，每说完一个就按偏好行动一分钟。",
      },
    },
    {
      id: 8,
      title: "第八夜 · 狂宴",
      desc: "不停切换，感官过载",
      intensity: "deep",
      icon: "🍷",
      rounds: [
        { mode: "wheel", tag: "狂宴开场" },
        { mode: "mystery", tag: "盛宴盲选" },
        { mode: "cards", tag: "狂宴指令" },
        { mode: "dice", tag: "过载骰子" },
        { mode: "wheel", tag: "再转一次" },
        { mode: "mystery", tag: "终局盲选" },
      ],
      boss: {
        title: "🍷 章节 Boss",
        text: "连续切换三个体位，每个一分钟不许停，第四个体位做到两人同时高潮。",
      },
    },
    {
      id: 9,
      title: "第九夜 · 无尽",
      desc: "最后一夜，用尽全部力气去爱",
      intensity: "deep",
      icon: "♾️",
      rounds: [
        { mode: "cards", tag: "无尽 prelude" },
        { mode: "dice", tag: "体位轮回" },
        { mode: "mystery", tag: "命运终选" },
        { mode: "wheel", tag: "最后一转" },
        { mode: "cards", tag: "深入终章" },
        { mode: "dice", tag: "终极骰子" },
      ],
      boss: {
        title: "♾️ 第九章 Boss",
        text: "做你们这辈子最想和对方做的一件事，不限形式，做到两人都筋疲力尽再相拥入睡。",
      },
    },
    {
      id: 10,
      title: "隐秘之夜 · 神话",
      desc: "仅资深玩家可进入的隐藏章节",
      intensity: "deep",
      icon: "✨",
      secret: true,
      rounds: [
        { mode: "mystery", tag: "神话盲选" },
        { mode: "wheel", tag: "神谕之轮" },
        { mode: "cards", tag: "神话指令" },
        { mode: "dice", tag: "神骰" },
        { mode: "cards", tag: "终极渴望" },
      ],
      boss: {
        title: "✨ 神话 Boss",
        text: "重现你们第一次亲密的记忆，然后用比现在更色、更成熟的方式完整再做一遍。",
      },
    },
  ],
};

const DIFFICULTIES = {
  gentle: { label: "温柔", lustMult: 0.8, scoreMult: 0.9, skipAllowed: true, eventRate: 0.08 },
  normal: { label: "标准", lustMult: 1, scoreMult: 1, skipAllowed: true, eventRate: 0.14 },
  wild: { label: "狂野", lustMult: 1.3, scoreMult: 1.2, skipAllowed: false, eventRate: 0.2 },
};

const ITEMS = [
  { id: "double_lust", icon: "💗", name: "情欲加倍", desc: "本回合情欲值翻倍" },
  { id: "peek", icon: "👁", name: "预知", desc: "提前看下一张指令" },
  { id: "force_serve", icon: "👑", name: "强制服侍", desc: "对方必须服侍你本回合" },
  { id: "shield", icon: "🛡", name: "跳过护盾", desc: "跳过不扣分不中断连击" },
  { id: "reroll", icon: "🔄", name: "重抽", desc: "重新抽本关指令" },
  { id: "heat_burst", icon: "🌋", name: "热度爆发", desc: "热度直接 +40" },
  { id: "steal", icon: "🗡", name: "偷分", desc: "PK模式从对方偷 20 分" },
  { id: "timer_plus", icon: "⏱", name: "时间延长", desc: "限时时长 +30 秒" },
];

const ACHIEVEMENTS = [
  { id: "first_done", icon: "🌱", name: "初尝禁果", desc: "完成第一个任务", xp: 30 },
  { id: "streak5", icon: "🔥", name: "连击五", desc: "达成 5 连击", xp: 50 },
  { id: "streak10", icon: "💥", name: "连击十", desc: "达成 10 连击", xp: 100 },
  { id: "boss_kill", icon: "👹", name: "Boss 猎手", desc: "击败一个 Boss", xp: 80 },
  { id: "stars9", icon: "⭐", name: "星光闪闪", desc: "累计 9 星", xp: 60 },
  { id: "stars15", icon: "🌟", name: "星光璀璨", desc: "累计 15 星", xp: 120 },
  { id: "campaign_clear", icon: "🏆", name: "通关蜜语", desc: "完成全部章节", xp: 300 },
  { id: "campaign_x3", icon: "👑", name: "蜜语大师", desc: "通关 3 次", xp: 500 },
  { id: "no_skip_run", icon: "💎", name: "完美之夜", desc: "一次通关零跳过", xp: 200 },
  { id: "pk_win", icon: "⚔️", name: "PK 胜者", desc: "赢得一场 PK", xp: 70 },
  { id: "daily_clear", icon: "📅", name: "每日情人", desc: "完成每日挑战", xp: 90 },
  { id: "challenge_clear", icon: "🎯", name: "挑战者", desc: "完成挑战模式", xp: 100 },
  { id: "editor1", icon: "✏️", name: "创作者", desc: "添加第一张自定义卡", xp: 40 },
  { id: "editor5", icon: "📚", name: "卡牌大师", desc: "自定义卡达 5 张", xp: 80 },
  { id: "score200", icon: "💯", name: "百分猛将", desc: "单人得分破 200", xp: 60 },
  { id: "item_master", icon: "🎒", name: "道具控", desc: "累计使用 10 个道具", xp: 50 },
  { id: "lust100", icon: "💦", name: "情欲满溢", desc: "双方情欲同时满", xp: 70 },
  { id: "event10", icon: "🎲", name: "命运之子", desc: "触发 10 次随机事件", xp: 55 },
  { id: "sync_room", icon: "📡", name: "异地同房", desc: "成功建立双人联机", xp: 65 },
  { id: "stars24", icon: "🌠", name: "银河之夜", desc: "累计 24 星", xp: 150 },
  { id: "stars27", icon: "💫", name: "传奇情侣", desc: "累计 27 星满分", xp: 250 },
  { id: "chapter9", icon: "♾️", name: "无尽之夜", desc: "通关第九章", xp: 180 },
  { id: "secret_ch", icon: "✨", name: "神话见证", desc: "进入隐藏章节", xp: 220 },
  { id: "myth_clear", icon: "🌌", name: "神话通关", desc: "完成隐藏章节", xp: 280 },
  { id: "voice_on", icon: "🔊", name: "语音伴侣", desc: "开启语音倒计时", xp: 25 },
];

const DAILY_MODIFIERS = [
  { id: "dice_only", name: "骰子之日", desc: "今天只能掷骰子", modeLock: "dice" },
  { id: "no_skip", name: "不许退缩", desc: "今日禁止跳过", noSkip: true },
  { id: "double_lust", name: "情欲双倍", desc: "情欲值获取 ×2", lustMult: 2 },
  { id: "speed", name: "极速之夜", desc: "每关限时 45 秒", timer: 45 },
  { id: "sync_heavy", name: "缠绵之日", desc: "更多双人同步关", syncBias: true },
  { id: "wild_cards", name: "狂野卡牌", desc: "强度固定火热", intensity: "hot" },
];

const CHALLENGE_PRESETS = {
  speed: { label: "极速", icon: "⏱", rounds: 12, timer: 45, noSkip: false, desc: "每关 45 秒限时" },
  hardcore: { label: "硬核", icon: "💀", rounds: 15, timer: 0, noSkip: true, desc: "禁止跳过，15 关" },
  marathon: { label: "马拉松", icon: "🏃", rounds: 25, timer: 0, noSkip: false, desc: "25 关耐力挑战" },
};

const PK_CONFIG = { rounds: 15, winScore: 300, roundWin: 35, roundLose: 8, stealAmount: 20 };

const RANDOM_EVENTS = [
  { id: "lust_burst", icon: "💗", name: "情欲爆发", text: "双方情欲值 +20" },
  { id: "swap", icon: "🔀", name: "强制换位", text: "主动方立刻交换" },
  { id: "bonus_xp", icon: "✨", name: "幸运", text: "本关得分 ×2" },
  { id: "heat_wave", icon: "🌋", name: "热浪", text: "热度 +25" },
  { id: "mystery_force", icon: "🎭", name: "命运介入", text: "本关变为盲选" },
  { id: "timer_challenge", icon: "⏱", name: "限时突袭", text: "本关限时 60 秒" },
  { id: "sync_only", icon: "🔗", name: "同步之夜", text: "本关必须一起完成" },
  { id: "double_or_nothing", icon: "🎰", name: "双倍赌局", text: "完成×2分，跳过扣 15 分" },
];

const ENDINGS = [
  { minStars: 25, title: "SS · 神话恋人", msg: "九夜通关近乎完美，你们是传说级别的伴侣。" },
  { minStars: 20, title: "S · 完美恋人", msg: "零瑕疵的默契，彼此是最完美的情人。" },
  { minStars: 15, title: "A · 炽热情侣", msg: "激情与温柔并存，每一夜都值得回味。" },
  { minStars: 10, title: "B · 暧昧搭档", msg: "还在探索彼此，但已经越来越合拍。" },
  { minStars: 0, title: "C · 初探蜜语", msg: "刚刚开始，下次会更疯狂。" },
];

const SECRET_CHAPTER_UNLOCK = { minLevel: 12, needClear: 1 };

const PK_PENALTIES = [
  "输的人用嘴服侍赢的人两分钟。",
  "输的人脱一件，让赢的人摸一分钟。",
  "输的人下一轮只能被动享受。",
  "输的人说出三个最羞耻的幻想。",
];

const BONUS_CARDS = [
  "热度拉满——两人全裸相拥三十秒，然后做你们此刻最想做的事，不限形式。",
  "奖励回合：{other}完全服从{self}接下来的任何要求，持续三分钟。",
  "自由发挥：用你们认为最色的一种方式让对方高潮，怎么做都行。",
  "叠加快感：一边进入一边接吻，维持到两人同时颤抖。",
];

const CARDS = {
  warm: {
    serve: [
      "解开{other}的衣扣，一颗一颗慢慢来，每解开一颗就亲一下露出的皮肤。",
      "从{other}的耳垂含住轻咬，舌尖滑到颈侧，留下湿热的痕迹。",
      "手掌伸进{other}衣服里，贴着小腹慢慢往上摸，感受{other}的呼吸变重。",
      "跪坐在{other}腿间，仰头看着{other}的眼睛，隔着布料用嘴唇蹭{other}腿根。",
      "把{other}推倒在床上，从脚踝开始亲吻往上，在大腿内侧多停留一会儿。",
      "从背后抱住{other}，手伸进裤腰里揉捏臀肉，嘴唇贴着{other}后颈低声说想要。",
      "脱掉{other}的袜子，握住脚踝亲吻脚背，然后沿小腿一路吻上来。",
      "手指钻进{other}的内裤边缘，只摸不深入，在外面打圈，看{other}忍得住吗。",
    ],
    receive: [
      "躺好，让{other}随便亲你身上任何地方，你只要闭眼感受，不许催促。",
      "把{other}的手放在你最敏感的地方，告诉{other}用多大力气、什么节奏。",
      "跨坐在{other}大腿上，贴着{other}蹭，感受{other}硬起来的过程。",
      "脱掉上衣，拉着{other}的手放在你胸口，让{other}揉到你出声为止。",
      "仰面躺着，张开腿，让{other}隔着内裤用嘴唇蹭你，你不许动。",
      "从背后贴着{other}，握住{other}的手引导去你裤子里，让{other}感受你有多湿/硬。",
      "趴在枕头上，把腰翘起来，等{other}来决定从哪开始亲你。",
      "看着{other}的眼睛，自己慢慢脱掉一件衣物，每脱一件就亲{other}一下。",
    ],
    sync: [
      "面对面站着，互相脱对方的衣服，谁先进攻谁先输。",
      "躺在床上相拥，下身紧贴磨蹭，只蹭不进入，磨到两人都喘。",
      "轮流亲吻对方全身，一人亲三十秒就换，不许跳过敏感地带。",
      "关灯，在黑暗里只用嘴唇和手指探索对方身体，找到三个最软的地方。",
      "互相把手伸进对方内裤里，同时抚摸，节奏保持一致。",
      "你亲{other}的脖子，{other}同时摸你的腰，维持一分钟不许停。",
      "赤裸上身相拥，感受彼此体温，慢慢摇腰蹭对方。",
      "嘴对嘴深吻，舌头交缠，手同时探进对方裤腰。",
    ],
  },
  hot: {
    serve: [
      "拉下{other}的内裤，用嘴唇从大腿根内侧一路吻到最湿/硬的地方，先不急着进攻。",
      "含住{other}的乳头，舌头绕着打转，另一只手揉捏另一侧，直到{other}出声。",
      "跪在{other}两腿间，用舌头从下到上缓慢舔一遍，重点照顾最敏感的那一点。",
      "把{other}的手指含进嘴里吮吸，眼神一直看着{other}，然后拉着手去摸你自己。",
      "用嘴唇包裹{other}的性器/阴蒂，轻轻吸吮，节奏由慢到快，听{other}的喘息调整。",
      "手指先探入{other}体内润滑，确认湿了之后换成舌头，交替进行。",
      "让{other}躺着，你趴在两腿间口交，不许手偷懒，另一只手揉捏{other}的臀或胸。",
      "从背后抱住{other}，手伸到前面揉{other}最敏感处，嘴唇贴着{other}耳朵描述你正在做什么。",
    ],
    receive: [
      "仰躺张开腿，拉着{other}的头按向你的两腿间，告诉{other}你想要什么节奏。",
      "骑在{other}脸上，自己控制力度和位置，舒服了就压低一点。",
      "趴着翘臀，让{other}用舌头从后面舔你，你不许害羞，只管享受。",
      "握住{other}的手放在你胸口或阴蒂/阴茎上，教{other}怎么弄你才最爽。",
      "坐在{other}腿上，自己蹭{other}的硬/湿，蹭到受不了再停。",
      "让{other}用两根手指进入你，同时拇指揉阴蒂/根部，你只管躺着叫出来。",
      "脱掉全部衣物躺下，命令{other}用嘴从你脖子一路舔到腿间。",
      "背对{other}坐下，把{other}的性器/手指引导进自己体内，自己摇腰。",
    ],
    sync: [
      "头脚相反侧卧，互相口舌服侍，比比谁先让对方腿软。",
      "互相手淫，看着对方的表情，同步加快或放慢节奏。",
      "你含住{other}的同时，{other}的手指进入你体内，保持这个姿势两分钟。",
      "面对面坐着，腿缠在一起，性器相贴磨蹭，磨到两人都湿透。",
      "轮流口交，一人服侍三十秒就换，不许停，直到两人都受不了。",
      "互相抚摸到濒临高潮，然后同时停手，重复三次，第四次一起放。",
      "一人躺着，另一人骑在脸上口交，同时被手指进入，双重刺激。",
      "全裸相拥，下身紧贴前后磨蹭，感受彼此硬度/湿度，不许进入。",
    ],
  },
  deep: {
    serve: [
      "把{other}推倒在床上，缓慢进入，进去后停三秒，让{other}适应，再开始动。",
      "让{other}趴着，从后面进入，一只手搂腰，另一只手绕到前面揉最敏感处。",
      "骑在{other}身上，自己控制深浅和节奏，只许动腰，找到让{other}最失控的角度。",
      "把{other}的腿架在肩上，深顶每一下都顶到最深处，看{other}的表情。",
      "侧躺从背后进入{other}，手伸到前面同步刺激，保持同频直到{other}高潮。",
      "让{other}坐在床沿，你跪在中间，口交的同时手指进入，双重进攻。",
      "站立抱起{other}一条腿，面对面进入，每一下都顶实了，不许敷衍。",
      "进入{other}之后放慢到几乎不动，只用研磨的方式蹭敏感点，磨到{other}求你再快。",
    ],
    receive: [
      "趴好翘臀，等{other}从后面进入，进去后你主动往后顶，配合节奏。",
      "骑在{other}身上自己动，找到最爽的角度，动到腿软再换人。",
      "躺着把腿缠住{other}的腰，拉着{other}深顶，告诉{other}再深一点还是再快一点。",
      "侧躺让{other}从背后进入，你把手伸到后面引导{other}的角度。",
      "坐在{other}腿上面对面进入，搂着脖子自己摇，摇到两人都喘不上气。",
      "让{other}把你按在床上，你想怎么被进入就怎么告诉{other}，不许含蓄。",
      "跪着趴低，等{other}进入，进去后收紧身体，感受{other}在你里面的每一下。",
      "躺平张开腿，看着{other}进入你的过程，不许闭眼，全程对视。",
    ],
    sync: [
      "面对面坐着互相进入，额头贴着额头，同步呼吸，一起动腰。",
      "一人躺着，另一人骑乘进入，骑乘者动三十秒换躺着的人顶腰，轮流来。",
      "侧躺相拥，从背后进入的同时互相抚摸，维持到两人一起高潮。",
      "站立面对面，一条腿抬起缠住对方腰，边吻边顶，不许停。",
      "后入时{other}的手伸到前面摸你，你的手伸到后面扶住{other}的胯，配合冲刺。",
      "尝试三个体位，每个体位至少两分钟，最后选最爽的那个做到高潮。",
      "互相顶到濒临高潮时同时停下，深呼吸，然后倒数三二一一起冲刺。",
      "做完不急着分开，保持结合状态相拥，感受彼此还在微微跳动。",
    ],
  },
};