/* 蜜语 · 性幻想扩展 — 更多玩法 + 全文色情加强（18+ 自愿成年人） */

Object.assign(ORION_PLAY_DEFS, {
  breeding: {
    id: "breeding", name: "中出繁育", icon: "🤰",
    hint: "射满不许流 · 灌到小腹微隆",
    req: (p, r) => r.affection >= 6 && r.intimacy >= 2,
    energy: -3, spark: -2, aff: 3, intimacy: 2, stress: 0,
  },
  spanking: {
    id: "spanking", name: "打臀调教", icon: "👋",
    hint: "臀肉拍红再顶",
    req: (p, r) => r.affection >= 5 && r.intimacy >= 1,
    energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 1,
  },
  pet_play: {
    id: "pet_play", name: "宠物调教", icon: "🐾",
    hint: "项圈爬行服侍",
    req: (p, r) => r.affection >= 5 && orionHasBondageItem(),
    energy: -3, spark: 2, aff: 2, intimacy: 2, stress: -1,
  },
  free_use: {
    id: "free_use", name: "随意使用", icon: "🔓",
    hint: "她说停才停",
    req: (p, r) => r.affection >= 7 && r.intimacy >= 3 && orionState.trust >= 5,
    energy: -4, spark: 3, aff: 3, intimacy: 2, stress: 2,
  },
  maid_service: {
    id: "maid_service", name: "女仆服侍", icon: "🎀",
    hint: "围裙下真空",
    req: (p, r) => r.affection >= 5,
    energy: -2, spark: 2, aff: 2, intimacy: 1, stress: -1,
  },
  drunk_night: {
    id: "drunk_night", name: "微醺夜", icon: "🍷",
    hint: "酒劲上头更淫",
    req: (p, r) => r.affection >= 5 && (orionState.weather === "雨夜" || ["shenman", "sutang"].includes(p.id)),
    energy: -2, spark: 3, aff: 2, intimacy: 1, stress: 1,
  },
  watch_her: {
    id: "watch_her", name: "看她自慰", icon: "👁️",
    hint: "你只看不动",
    req: (p, r) => r.affection >= 4 && orionState.spark >= 1,
    energy: -1, spark: 2, aff: 2, intimacy: 1, stress: -1,
  },
  cum_walk: {
    id: "cum_walk", name: "精液行走", icon: "💧",
    hint: "灌满不许擦回去",
    req: (p, r) => r.affection >= 6 && r.intimacy >= 2,
    energy: -2, spark: 1, aff: 2, intimacy: 2, stress: 2,
  },
  nipple_play: {
    id: "nipple_play", name: "乳夹折磨", icon: "📎",
    hint: "夹上再操更敏感",
    req: (p, r) => r.affection >= 5 && orionHasItem("乳夹"),
    item: "乳夹", energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
  },
  anal_plug: {
    id: "anal_plug", name: "后穴塞满", icon: "🔌",
    hint: "前后同时满",
    req: (p, r) => r.affection >= 6 && orionHasItem("肛门塞"),
    item: "肛门塞", energy: -3, spark: 2, aff: 2, intimacy: 2, stress: 1,
  },
  praise_humiliate: {
    id: "praise_humiliate", name: "羞辱夸奖", icon: "🎭",
    hint: "骂她骚再夸她紧",
    req: (p, r) => r.affection >= 5 && r.intimacy >= 1,
    energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
  },
  teacher_punish: {
    id: "teacher_punish", name: "师生惩罚", icon: "📏",
    hint: "犯错就罚操",
    req: (p, r) => r.affection >= 5 && ["lintang", "shenman"].includes(p.id),
    energy: -3, spark: 2, aff: 3, intimacy: 1, stress: 1,
  },
  mindbreak_rp: {
    id: "mindbreak_rp", name: "操到失神", icon: "💫",
    hint: "角色扮演崩坏",
    req: (p, r) => r.affection >= 7 && r.intimacy >= 3,
    energy: -4, spark: -3, aff: 3, intimacy: 2, stress: 2,
  },
  glory_rp: {
    id: "glory_rp", name: "隔板幻想", icon: "🕳️",
    hint: "看不见脸只感受",
    req: (p, r) => r.affection >= 6 && r.intimacy >= 2,
    energy: -2, spark: 2, aff: 2, intimacy: 2, stress: 1,
  },
  wet_clothes: {
    id: "wet_clothes", name: "湿衣透肉", icon: "💦",
    hint: "淋湿再剥",
    req: (p, r) => r.affection >= 4 && (orionState.weather === "雨夜" || orionState.weather === "闷热"),
    energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
  },
  choke_light: {
    id: "choke_light", name: "轻掐窒息", icon: "🫁",
    hint: "她说停就停",
    req: (p, r) => r.affection >= 7 && r.intimacy >= 3 && orionState.trust >= 4,
    energy: -3, spark: 2, aff: 2, intimacy: 2, stress: 2,
  },
  double_fill: {
    id: "double_fill", name: "前后填满", icon: "⚡",
    hint: "穴塞棒同时顶",
    req: (p, r) => r.affection >= 7 && orionHasItem("肛门塞") && orionHasItem("粉色跳蛋"),
    energy: -4, spark: -2, aff: 3, intimacy: 3, stress: 2,
  },
  public_dare: {
    id: "public_dare", name: "公开挑战", icon: "😈",
    hint: "人多的地方忍高潮",
    req: (p, r) => r.affection >= 6 && orionState.charm >= 5,
    energy: -2, spark: 3, aff: 2, intimacy: 1, stress: 3,
  },
});

Object.assign(ORION_PLAY_BODY, {
  breeding: {
    default: "你把她按床上腿环腰，一顶到底后开始深顶，每下都撞子宫口。\n\n「……射外面就分手。」她咬你肩，穴肉却绞得更紧。你低吼着顶死，一股股精液灌进最深处，量大得她小腹微隆，白浊从穴口溢出来淌满臀缝。\n\n她摸小腹喘着：「……灌满了……不许流……夹一晚上。」手指堵穴口，眼神餍足又疯。",
  },
  spanking: {
    default: "你让她趴好翘臀，巴掌落下臀肉颤，红印浮现。她哼出声却腰往下塌，穴口湿得反光。\n\n「……再……」你边打边揉，淫水甩到你手腕。十下后她哭着求：「……操我……臀好烫……里面好空……」\n\n你从后一顶到底，每撞一下臀浪和红印一起晃，她高潮时臀肉痉挛，你射满她穴，白浊顺着红肿臀缝淌。",
  },
  pet_play: {
    default: "项圈扣颈，她四肢着地爬到你脚边，舔你指节：「……主人。」\n\n你拽链让她跪含，深喉到泪湿，再摆成后入。链环随顶弄响，她哼声乖：「……汪……不对……主人……射给宠物……」\n\n射满后她蹭你腿，嘴角亮晶晶：「……还要摸摸头。」",
  },
  free_use: {
    default: "她说：「今晚……随便用。只有安全词算停。」\n\n你把她摆成各种姿势——桌上、墙边、跪地——想什么时候进就进，穴口常年湿着。她失神时咬唇回神：「……还可以……继续……」\n\n最后内射三次，她瘫着腿合不拢，精液混淫水淌一地：「……坏掉了……但好满足……」",
  },
  maid_service: {
    default: "围裙下真空，她端茶跪下：「主人，请用。」\n\n你从后掀裙顶进去，茶杯晃洒。她忍哼继续服侍，每顶一下托盘颤。射在里面她舔净溅出的液：「……打扫完毕。还要…… dessert 吗？」",
  },
  drunk_night: {
    default: "她酒劲上头，脸颊绯红，主动坐你胯磨：「……今晚……我是你的。」\n\n酒味混吻，她比平日大胆，自己扶着你坐到底，骑到失神。醉话混呻吟：「……好深……还要……」\n\n射满后她挂你颈，迷糊呢喃：「……明天……记得……」",
  },
  watch_her: {
    default: "你命令：「自己摸。我看着。」她羞得夹腿，慢慢把手伸进裙底。\n\n手指抠弄穴口，淫水声清晰。你不动，她越来越急，腰扭得淫荡：「……求你……进来……」\n\n你等她高潮边缘才顶进去，她尖叫着夹紧，一分钟内被操到二次高潮。",
  },
  cum_walk: {
    default: "你先射满她，命令：「夹紧。走回宿舍。」\n\n她腿合不拢，白浊顺大腿淌，每走一步穴肉一缩。走廊遇人她僵住，里面却绞得更兴奋。回房后她瘫门边：「……全漏了……腿都是你的味道……」",
  },
  nipple_play: {
    default: "乳夹扣上乳尖，她弓背哼出声，敏感度翻倍。你轻轻一拉链子，她腿软。\n\n边操边扯夹，她哭叫高潮迭起，奶子晃得夹子叮当。射在她胸上，她自己抹开：「……疼……但好爽……」",
  },
  anal_plug: {
    default: "润滑凝胶抹后穴，塞子缓缓顶入，她咬唇颤抖。前面穴口一张一合流着水。\n\n你进前面猛顶，塞子随节奏晃，她崩溃：「……前后都满了……要坏了……」\n\n高潮时前后同时绞，你射满前面，她抽泣着摸小腹和后穴：「……全是你的……」",
  },
  praise_humiliate: {
    default: "你捏她下巴：「骚货，湿成这样。」她眼眶红却腿开更大。又低声夸：「……但夹得真紧，操死你值得。」\n\n她高潮时又骂又求：「……我是骚货……只给你操……」内射后瘫软任你摆布。",
  },
  teacher_punish: {
    default: "「作业不合格。」她推眼镜，你把她按讲台。「惩罚是……操到认错。」\n\n罚站变趴桌后入，粉笔灰沾臀。她念错题混呻吟，每顶一下记错一笔。射满后她哑声：「……及格了……还要补习吗？」",
  },
  mindbreak_rp: {
    default: "一开始她还嘴硬，十分钟后只会重复你的名字。眼神失焦，口水淌嘴角，穴肉机械绞紧。\n\n你猛顶到底，她尖叫变呜咽，高潮连续三次后抽搐。射满时她傻笑：「……{self}……{self}……还要……」\n\n事后她回神埋你胸：「……刚才……别录下来……骗你的，录了。」",
  },
  glory_rp: {
    default: "木板隔洞，她跪另一侧只露下半身。穴口湿亮，你从后顶，她不知你是谁似的哼。\n\n「……深……」板那头闷哼。揭开板是她脸红到爆：「……明知是我……还玩……」\n\n真身后入更狠，射满她咬板缘。",
  },
  wet_clothes: {
    default: "暴雨淋透，衬衫贴乳，内裤透明。你把她按墙，冷水混热水从领口淌。\n\n湿布摩擦乳尖，她哼出声。扯开湿透内衣一顶到底，水声混咕叽，墙砖凉她体内烫。\n\n射里面后湿衣再穿回去，她说：「……就这样……走回去……」",
  },
  choke_light: {
    default: "轻掐颈侧，她眼 wet 缺氧快感。你说停她点头，你松手她大口喘，下面绞更紧。\n\n边掐边顶，她高潮时眼前发白，穴肉痉挛喷热液。射满后摸颈上指印：「……你的……」",
  },
  double_fill: {
    default: "跳蛋塞前面开到最大，肛门塞填满后穴。她跪不住，你扶腰从侧顶——前面棒震，后面塞胀，她崩溃尖叫。\n\n拔塞再肉棒捅后穴润滑后，她疯：「……不行……那里也……」前后轮流灌满，她瘫成水滩。",
  },
  public_dare: {
    default: "食堂角落，你手指在桌下抠她，她强装吃饭。忍到边缘你停，她掐你大腿。\n\n去厕所隔间三分钟快炮，射满不许擦，她夹腿走回座位，脸红到爆。",
  },
});

Object.assign(ORION_FOREPLAY_EXTRA_TEXT, {
  spank: "巴掌拍臀留下红印，她哼着腰塌，穴口淌水，越打越湿，求你从后顶进来。",
  plug: "肛门塞缓缓旋入，她夹紧颤抖，前面穴肉空虚张合，你一顶前面她尖叫前后都满。",
  clamp: "乳夹扣上，轻轻一拉她腿软，敏感度爆表，操一下哼一声，奶子晃夹子叮当。",
  ice: "冰粒滑过乳尖和阴蒂，她弓身抖，冷热交替让你进入时穴肉绞到发疯。",
  watch: "她跪在你面前自己抠弄，淫水滴地板，你只看不动，她哭着求你用真的。",
});

Object.assign(ORION_EXTRA_FOREPLAY, {
  spank: { label: "👋 打臀发红", hint: "越打越湿", key: "spank" },
  plug: { label: "🔌 后穴塞入", hint: "前后夹击", key: "plug", need: () => orionHasItem("肛门塞") },
  clamp: { label: "📎 乳夹拉扯", hint: "疼爽", key: "clamp", need: () => orionHasItem("乳夹") },
  ice: { label: "🧊 冰火刺激", hint: "冷热交替", key: "ice" },
  watch: { label: "👁️ 看她自摸", hint: "吊到求", key: "watch" },
});

Object.assign(ORION_FINISH_EXTRA_TEXT, {
  breeding: "你掐腰顶死子宫口，一股股射进去不许拔，她摸微隆小腹：「……灌满了……怀了也认。」",
  dump: "连射三次灌满，精液从穴口溢出来淌满腿，她腿合不拢，白浊还在往外涌。",
  leash: "项圈牵绳，射满后牵她跪行舔净你，像宠物一样蹭腿求摸头。",
  choke: "轻掐到高潮同时射满，她缺氧眼前发白，穴肉痉挛绞到抽搐。",
  mark: "射里面又涂胸腹，咬痕颈侧排满，她说：「……让所有人都闻得到你被操过。」",
});

Object.assign(ORION_EXTRA_FINISH, {
  breeding: { label: "🤰 灌满子宫", hint: "繁育幻想", key: "breeding" },
  dump: { label: "🌊 连射灌满", hint: "溢出来", key: "dump" },
  leash: { label: "🐾 牵绳舔净", hint: "宠物收尾", key: "leash", need: () => orionHasBondageItem() },
  choke: { label: "🫁 掐颈内射", hint: "信任高", key: "choke", need: (p) => orionState.trust >= 4 },
  mark: { label: "🩸 标记占有", hint: "咬+射", key: "mark" },
});

const ORION_EXPLICIT_SCENE_BOOST = {
  lintang: [
    "林晚棠平时清冷，床上却夹得你头皮发麻，穴肉一层层裹上来像要把精液榨干。她咬唇忍叫，眼泪憋出，腿却缠死你腰不许浅。",
    "射满时她穴口痉挛着吸紧，白浊溢出来她用手指堵回去，哑声：「……一滴都不许浪费。」",
    "事后她法条式口吻：「……下不为例。」腿间还淌着你的精液，骗不了人。",
  ],
  sutang: [
    "苏糖奶子晃得厉害，小穴又紧又热，每顶一下淫水溅你腿根，咕叽声又响又色。她哭唧唧却腰迎更狠：「……再深……要坏了……」",
    "高潮时她喷出一股热液，夹得你差点秒射，软成团挂你颈撒娇：「……还要……里面还要……」",
    "精液灌满从穴口溢，她摸给你看，脸红到脖子：「……都是学长/学姐的……好浓……」",
  ],
  shenman: [
    "沈曼控节奏又偶尔失控，E罩杯乳浪甩你脸，穴肉成熟又贪婪。她命令你射里面：「……姐姐准了。灌满。」",
    "后入臀浪惊人，啪啪混水声，她爆粗求狠：「……操穿……再深……」高潮塌腰抓床单。",
    "射后她舔你喉结，像奖赏：「……不错。下次不许戴套。」",
  ],
  guye: [
    "顾野汗味混情欲，肌肉绷紧又松，腿绞你像要断。她喊出声不怕人听：「……再快……操死我……」",
    "运动员腰力反弹，撞得你爽死，每顶都深，淫水甩到腹肌。高潮咬你肩留牙印。",
    "射里面她腿软滑地，喘粗笑：「……还行。明天操场边还要。」",
  ],
  baiyue: [
    "白玥苍白身子布满红痕，像活体画，每顶一下她哼你名字像诅咒。穴肉又紧又热，病态地绞紧不放。",
    "她求射小腹又求射里面：「……精液……血……都给我……」高潮咬你出血却笑。",
    "射满后她摸小腹存档，喃喃：「……我的了。永远。闻得到吗。」",
  ],
  default: [
    "她穴肉绞紧你每一寸，淫水淌满结合处，啪啪肉响混咕叽水声，空气里甜腥弥漫。",
    "高潮时她整个人弓起痉挛，热液喷出，你低吼顶死射满，白浊从穴口溢出来。",
  ],
};

const ORION_EXPLICIT_PLAY_BOOST = [
  "她腿间水光泛滥，穴口一张一合，每个细胞都在求你更狠一点。",
  "淫水顺着大腿内侧淌，布料湿透，她喘着夹紧你，像要把你榨干。",
  "射满后穴肉还在一缩一缩吸你，白浊溢出来，她摸给你看，眼神餍足。",
];

Object.assign(ORION_FOREPLAY_FLAVOR, {
  finger: "手指三根插进湿穴快速抠弄，G点被碾过她弓腰，淫水喷你手腕，咕叽声放肆，穴肉绞着指节求更狠。",
  oral: "她跪地含到根部深喉，泪湿眼角抬头看你，喉肉绞紧，口水淌满囊和柱身，鼻尖抵腹毛，乖得像专门为你训练的。",
  tease: "龟头只在穴口蹭阴蒂和缝，她腰狂扭追逐，眼泪鼻涕一起下：「……求你了……插进来……操死我……」",
  breast: "你含住乳尖咬轻拉，她抓你头发往下按，另一手自己揉另一颗，下面淌得地板湿滑，求你从后顶穿她。",
});

Object.assign(ORION_FINISH_FLAVOR, {
  creampie: "你掐腰顶到子宫口，低吼着一股股射进去，量大得她小腹微隆，穴肉痉挛吸紧不让流，白浊还是从结合处溢满大腿。",
  pullout: "抽出来射在她脸胸和小腹，浓稠白浊挂睫毛、淌乳沟、糊穴口，她抹开涂匀舔手指，眼神馋到发红。",
  afterglow: "射满不拔，抱紧她到双方喘匀，肉棒还硬着埋在里面，她穴肉一缩一缩含着，像要榨出第二轮。",
});

Object.assign(ORION_APPROACH_FLAVOR, {
  lintang: {
    near: "你走近，她下巴微抬，衬衫下乳尖硬挺顶布，腿并着却缝隙湿痕蔓延。",
    kiss: "吻上去她咬你下唇回击，舌却软得投降，哼进嘴里：「……放肆……」",
    back: "从后环腰，她脊背贴你，臀往后顶你胯：「……硬了……只准想我。」",
  },
  sutang: {
    near: "她蹭进怀，软肉贴满，裙底真空，湿痕蹭你裤裆。",
    kiss: "亲她她 squeal，舌头甜软纠缠，手探你裤裆：「……好大……」",
    back: "从后抱，屁股磨你，小声：「……感觉到你了……想要……」",
  },
  shenman: {
    near: "香水味侵略，她拉你手按胸和腿间：「……都硬了。姐姐负责。」",
    kiss: "红酒味深吻，她吸你舌，手伸进裤腰握根。",
    back: "后贴，她引导你手揉胸捏乳尖：「……别客气。」",
  },
  guye: {
    near: "她抓你裤裆捏一把：「……发情了？训练完就硬。」",
    kiss: "对抗式吻，咬唇见血味，舌缠，汗味情欲。",
    back: "腹肌贴背，她哼：「……手伸进去。别装。」",
  },
  baiyue: {
    near: "捧脸：「只准硬给我。想别人就剪了你。」笑甜得瘆。",
    kiss: "吞人式吻，咬出血，腿间湿透蹭你。",
    back: "覆你手往胸下腿间按：「……画这里。湿这里。」",
  },
});

function orionSceneIdToPerson(sceneId) {
  const m = { LINTANG: "lintang", SUTANG: "sutang", SHENMAN: "shenman", GUYE: "guye", BAIYUE: "baiyue" };
  const k = String(sceneId || "").split("_")[0];
  return m[k] || "lintang";
}

function orionExplicitBoostScene(body, personId) {
  const pool = ORION_EXPLICIT_SCENE_BOOST[personId] || ORION_EXPLICIT_SCENE_BOOST.default;
  const extra = galPick(pool);
  const climax = galPick(pool);
  if (body.includes(extra.slice(0, 12))) return body;
  return `${body}\n\n${extra}\n\n${climax}`;
}

function orionExplicitBoostPlay(text, personId) {
  const line = galPick(ORION_EXPLICIT_PLAY_BOOST);
  const persona = getHeroine(personId);
  const sex = persona ? getPersonaSexLine(persona, "hard") : null;
  let out = text;
  if (!text.includes(line.slice(0, 8))) out += `\n\n${line}`;
  if (sex?.char && Math.random() < 0.7) out += `\n\n${galFill(sex.char)}`;
  return out;
}

(function orionWrapExplicitGetters() {
  const origScene = orionGetSceneBody;
  orionGetSceneBody = function (sceneId) {
    const body = origScene(sceneId);
    if (!body) return body;
    return orionExplicitBoostScene(body, orionSceneIdToPerson(sceneId));
  };
  const origPlay = orionGetPlayBody;
  orionGetPlayBody = function (playId, personId) {
    return orionExplicitBoostPlay(origPlay(playId, personId), personId);
  };
})();

function orionGetFantasyMenuBlurb() {
  return "电话、跳蛋、素股、口交、露出、束缚、足交、乳交、坐脸、寸止、晨炮、中出繁育、打臀、宠物、随意使用、女仆、微醺、自慰表演、精液行走、乳夹、后穴、羞辱夸奖、师生惩罚、操到失神、隔板、湿衣、轻掐、前后填满、公开挑战……";
}