/* 蜜语 · Orion 特殊色情玩法 */

const ORION_PLAY_DEFS = {
  phone_sex: {
    id: "phone_sex", name: "电话淫语", icon: "📱",
    hint: "听她在耳边喘 · 魅力检定",
    req: (p, r) => r.affection >= 4,
    energy: -1, spark: 2, aff: 2, intimacy: 0, stress: -1,
  },
  remote_egg: {
    id: "remote_egg", name: "遥控跳蛋", icon: "💗",
    hint: "兜里按遥控器 · 她忍哼",
    req: (p, r) => r.affection >= 3 && orionHasItem("粉色跳蛋"),
    item: "粉色跳蛋", energy: -2, spark: 3, aff: 2, intimacy: 1, stress: 1,
  },
  grind: {
    id: "grind", name: "素股磨蹭", icon: "🫦",
    hint: "只磨不進 · 吊到求",
    req: (p, r) => r.affection >= 4 && orionState.spark >= 1,
    energy: -2, spark: 1, aff: 2, intimacy: 1, stress: 0,
  },
  oral_only: {
    id: "oral_only", name: "口交专场", icon: "👅",
    hint: "含到射 · 不进穴",
    req: (p, r) => r.affection >= 4 && r.intimacy >= 1,
    energy: -2, spark: -1, aff: 2, intimacy: 1, stress: -2,
  },
  exhibition: {
    id: "exhibition", name: "露出险境", icon: "👀",
    hint: "险些被发现 · 偷情+",
    req: (p, r) => r.affection >= 5 && (orionState.routePlan === "night" || orionState.routePlan === "poly" || orionState.preference === "danger"),
    energy: -2, spark: 2, aff: 3, intimacy: 1, stress: 2,
  },
  dirty_talk: {
    id: "dirty_talk", name: "淫语挑战", icon: "🗣️",
    hint: "说骚话让她湿",
    req: (p, r) => r.affection >= 3,
    energy: -1, spark: 2, aff: 1, intimacy: 0, stress: 0,
  },
  bondage: {
    id: "bondage", name: "束缚调教", icon: "⛓️",
    hint: "缚腕项圈 · 任你摆",
    req: (p, r) => r.affection >= 5 && r.intimacy >= 1 && orionHasBondageItem(),
    energy: -3, spark: 2, aff: 2, intimacy: 2, stress: -1,
  },
  oil_massage: {
    id: "oil_massage", name: "精油按摩", icon: "🫧",
    hint: "滑进腿间",
    req: (p, r) => r.affection >= 4 && orionHasItem("按摩油"),
    item: "按摩油", energy: -2, spark: 2, aff: 3, intimacy: 1, stress: -2,
  },
  lewd_photo: {
    id: "lewd_photo", name: "淫照拍摄", icon: "📸",
    hint: "拍湿了的她",
    req: (p, r) => r.affection >= 5 && orionHasItem("拍立得"),
    energy: -2, spark: 1, aff: 2, intimacy: 1, stress: 1,
  },
  foot_job: {
    id: "foot_job", name: "足交丝袜", icon: "🦶",
    hint: "丝袜夹射",
    req: (p, r) => r.affection >= 4 && (["lintang", "shenman"].includes(p.id) || orionHasItem("丝袜")),
    energy: -2, spark: 1, aff: 2, intimacy: 1, stress: -1,
  },
  tit_job: {
    id: "tit_job", name: "乳交夹击", icon: "🍈",
    hint: "乳沟夹到射",
    req: (p, r) => r.affection >= 4,
    energy: -2, spark: 1, aff: 2, intimacy: 1, stress: -1,
  },
  facesit: {
    id: "facesit", name: "坐脸服侍", icon: "😈",
    hint: "她骑你脸",
    req: (p, r) => r.affection >= 6 && r.intimacy >= 2,
    energy: -2, spark: 2, aff: 2, intimacy: 2, stress: -2,
  },
  edging: {
    id: "edging", name: "寸止地狱", icon: "⏸️",
    hint: "三次边缘才给射",
    req: (p, r) => r.affection >= 6 && r.intimacy >= 2,
    energy: -3, spark: -2, aff: 3, intimacy: 2, stress: 1,
  },
  morning_fuck: {
    id: "morning_fuck", name: "晨炮夜袭", icon: "🌅",
    hint: "趁睡摸硬直接进",
    req: (p, r) => r.affection >= 7 && r.intimacy >= 2 && orionState.streakPerson === p.id && orionState.streak >= 3,
    energy: -3, spark: 2, aff: 3, intimacy: 2, stress: -2,
  },
  poly_jealous: {
    id: "poly_jealous", name: "修罗场", icon: "💢",
    hint: "多人嫉妒更湿",
    req: (p, r) => orionState.routePlan === "poly" && orionCountHighAff(5) >= 2 && r.affection >= 5,
    energy: -2, spark: 3, aff: 2, intimacy: 1, stress: 2,
  },
  quickie: {
    id: "quickie", name: "三分钟快炮", icon: "⚡",
    hint: "不脱光 · 站着射",
    req: (p, r) => r.affection >= 5 && orionState.spark >= 2,
    energy: -2, spark: -2, aff: 1, intimacy: 1, stress: 1,
  },
};

const ORION_PLAY_BODY = {
  phone_sex: {
    lintang: "电话接通，她声音压得很低：「……宿舍有人。你说……我听着。」\n\n你描述想怎么剥她衬衫、怎么顶进去，她呼吸越来越乱，话筒里传来布料摩擦：「……嗯……别说了……」\n\n「继续说。」你命令。她腿间湿透，忍到挂断前小声：「……今晚……留门。」",
    sutang: "视频电话，她窝在被窝只露眼睛：「学长/学姐……想看吗？」\n\n镜头往下，睡衣敞开，乳尖硬挺。你指挥她摸哪里，她哼成小猫：「嗯啊……好羞……但好湿……」\n\n挂断后消息炸过来：「……忍不到明天了啦！」",
    shenman: "她打来语音，背景是酒吧嘈杂：「小朋友……寂寞了？」\n\n你对着电话说怎么跪、怎么含，她笑声发哑：「……姐姐在后台。手已经伸进裙里了。」\n\n三分钟她喘着求：「……别停。继续说。」",
    guye: "她边跑边接电话，喘粗：「……跑完步……下面还湿着昨天的。」\n\n你描述更衣室怎么按她，她骂混蛋却放慢脚步：「操……硬了……十分钟到。」",
    baiyue: "凌晨她打来，声音甜得瘆：「……睡不着。想听你怎么弄我。」\n\n你一字一句描述占有，她那边水声明显：「……只准想我。只准射给我听。」",
  },
  remote_egg: {
    default: "跳蛋塞进她内裤深处，遥控器在你口袋。她脸色如常，腿却夹紧——你按下一档，她浑身一颤，咬住吸管/笔帽。\n\n二档，她眼角泛红，桌下抓住你手腕求饶。三档，她高潮时整个人抖着趴桌，淫水浸透内裤淌到大腿。\n\n你扶她起来，她咬耳：「……回去操回来。加倍。」",
  },
  grind: {
    default: "她跨坐你腿上，内裤扯到一边却不让你进——湿穴贴着柱身上下磨，龟头蹭阴蒂，咕叽水声。\n\n「……不准进。」她自己先破功，腰扭得更凶。你掐臀控节奏，她哭着求：「……进来啊……混蛋……」\n\n最后一下她坐实，穴肉吞到底——素股结束于失控的一坐到底。",
  },
  oral_only: {
    default: "她跪下来拉下你裤链，舌头舔过龟头打圈，深喉时眼 wet 抬头看你。\n\n你按头控节奏，她喉肉绞紧，口水淌满柱身。要射时她含紧不放，咽下去喉结滚动，嘴角亮晶晶：「……全部吃了。满意吗？」",
  },
  exhibition: {
    default: "走廊脚步声近，你把她按在拐角，裙掀腰，从后顶进去。她捂嘴，穴肉绞得你头皮发麻。\n\n脚步停在三米外——聊天声。你们同时僵住，肉棒还埋在里面。人走远后她回头，眼 wet 发狠：「……继续。射里面。」\n\n险些发现的刺激让她高潮得比平常快一倍。",
  },
  dirty_talk: {
    default: "你贴耳描述今晚要怎么操她——每个字都脏。她腿软靠墙，内裤湿透：「……再说……」\n\n魅力检定成功时她主动拉你手伸进裙底；失败时她红脸推开却留门缝：「……回去发消息。我也许开门。」",
  },
  bondage: {
    default: "红丝带缚腕，项圈扣颈。她跪坐床沿，任你摆姿势：「……停就停。」\n\n你拽链子控角度后入，每顶一下链环轻响。她哼声乖得不像本人，高潮时拽链求深：「……主人……射进来……」",
  },
  oil_massage: {
    default: "精油从颈抹到腿根，手掌滑过乳尖她腰弓。你说翻过来，她听话，油亮臀肉在你掌下颤。\n\n手指滑进湿缝，油混淫水更滑。她喘着腿开更大：「……那里……继续……」\n\n按摩结束于三根手指高潮，她抽泣着拉你手腕往穴口按。",
  },
  lewd_photo: {
    default: "拍立得咔嚓——她掀裙露湿内裤，再一张扯开露穴。她羞得捂脸，指缝大开：「……删掉要亲一小时。」\n\n最后一张拍你射在她小腹上的瞬间，她舔手指看照片：「……锁抽屉。只准你看。」",
  },
  foot_job: {
    default: "丝袜裹脚夹住柱身上下撸，足弓弧度完美，裂帛处嫩肉若隐若现。她脚趾蹭龟头，你掐她踝控节奏。\n\n「……脏死了……」她骂却夹更紧。射在丝袜上她褪下来扔你脸上：「……洗干净还我。骗你的，不用洗。」",
  },
  tit_job: {
    default: "她跪坐夹紧乳沟，你柱身陷进软肉来回抽插，乳尖蹭龟头。她低头舔露出的顶端，口水混乳沟更滑。\n\n「……射这里……」她抬眼。精液溅胸沟和小腹，她用手指抹开涂匀：「……香。」",
  },
  facesit: {
    default: "她跨坐你脸，湿穴压下来，淫水糊满你口鼻。舌头探进穴里搅，她抓床头控节奏，臀肉碾你脸。\n\n「……舔深点……」她腰扭得厉害，高潮时喷你一脸热液，瘫下来腿软：「……别擦。留着。」",
  },
  edging: {
    default: "第一次快到——你掐根停。她哭：「……混蛋！」\n\n第二次深顶到子宫口——又停。她掐你背出血：「……求你了……」\n\n第三次她求饶声碎，你猛撞十几下，她痉挛高潮喷出，你射满她穴肉绞到抽搐：「……终于……坏了……」",
  },
  morning_fuck: {
    default: "清晨她还在睡，被子下身体温热。你从后贴上去，内裤扯开，龟头抵住湿穴——她半梦半醒腰往后迎。\n\n「……嗯……谁……」认出你后不但没推，腿张更开。侧入慢顶变猛撞，她闷哼进枕头。\n\n射里面后她翻身搂你：「……闹钟没响……再来一次。」",
  },
  poly_jealous: {
    default: "她看见你手机里另一条暧昧消息，眼神暗下去：「……还有谁？」\n\n你吻她堵住话，她咬你唇：「操到我忘了她的名字。」猛顶时她念你全名像宣誓，高潮后喘着：「……说只操我。今晚。」",
  },
  quickie: {
    default: "厕所/楼梯间，裙掀腰，内裤扯一边，站着一顶到底。三分钟倒计时，她捂嘴忍叫，穴肉绞紧你。\n\n哨声/脚步前射里面，她腿软靠你：「……裤子整理好。装作没事。」",
  },
};

const ORION_EXTRA_FOREPLAY = {
  breast: { label: "🍈 揉乳吮吸", hint: "乳尖硬了", key: "breast" },
  toy: { label: "💗 跳蛋塞入", hint: "塞进去再操", key: "toy", need: () => orionHasItem("粉色跳蛋") },
  bondage_h: { label: "⛓️ 缚住她", hint: "丝带/项圈", key: "bondage", need: () => orionHasBondageItem() },
  sixtynine: { label: "♋ 69互舔", hint: "上下同时", key: "sixtynine" },
  titjob_h: { label: "🍈 乳交预热", hint: "先夹再进", key: "titjob" },
  grind_h: { label: "🫦 素股磨蹭", hint: "磨到求进", key: "grind" },
};

const ORION_EXTRA_FINISH = {
  facial: { label: "💦 颜射", hint: "射脸和胸", key: "facial" },
  swallow: { label: "👅 口内射精", hint: "咽下去", key: "swallow" },
  squirt: { label: "🌊 潮吹榨干", hint: "指交+深顶", key: "squirt" },
  round2: { label: "🔁 二番战", hint: "不拔再来", key: "round2" },
  anal_tease: { label: "🍑 后穴挑逗", hint: "塞子/指尖", key: "anal", need: (p) => ["sutang", "shenman", "baiyue"].includes(p) },
};

const ORION_FOREPLAY_EXTRA_TEXT = {
  breast: "你含住乳尖吮吸，她手指插进你发间，胸口起伏，下面淌得更凶，乳尖硬邦邦顶你舌。",
  toy: "跳蛋塞进她穴口，遥控器一开她浑身抖，穴肉绞着蛋往外推又吸回去，你趁她失神一顶到底。",
  bondage: "丝带缚腕吊起，项圈扣颈，她任你摆成任何角度，每顶一下链环轻响，哼声乖得反常。",
  sixtynine: "你们头脚颠倒，你舔湿穴她含柱身，同时高潮时她喉肉绞紧你差点秒射。",
  titjob: "乳沟夹紧柱身抽插十几下，龟头蹭乳尖，她低头舔，再扶着自己一顶进穴。",
  grind: "湿穴贴着柱身磨，只给龟头不入，她哭着腰迎，最后失控坐下去吞到根。",
};

const ORION_FINISH_EXTRA_TEXT = {
  facial: "抽出来射在她脸上和胸，白浊挂睫毛和唇，她舔嘴角看你，眼神馋。",
  swallow: "她跪含到射，喉结滚动咽干净，张嘴给你看：「……一滴都没漏。」",
  squirt: "手指抠G点猛顶，她弓身喷出热液溅你小腹，再内射灌满，腿抖停不下来。",
  round2: "第一次射满没拔，休息三十秒她里面又绞，你硬着再来第二轮，她哭：「……会坏的……」",
  anal: "指尖蘸淫水探后穴，她夹紧哼出声，塞子进去再前面顶，前后夹击高潮崩溃。",
};

function orionHasItem(name) {
  return orionState?.inventory?.includes(name);
}

function orionHasBondageItem() {
  return ["红丝带", "项圈", "情趣手铐"].some(orionHasItem);
}

function orionCountHighAff(min) {
  return orionPeople().filter((p) => orionState.relationships[p.id].affection >= min).length;
}

function orionEnsureRelKinks(rel) {
  if (!rel.kinks) rel.kinks = [];
  return rel.kinks;
}

function orionGetAvailablePlays(person) {
  const rel = orionState.relationships[person.id];
  return Object.values(ORION_PLAY_DEFS).filter((play) => play.req(person, rel));
}

function orionGetPlayBody(playId, personId) {
  const pool = ORION_PLAY_BODY[playId];
  if (!pool) return "空气发烫。她看着你，等你先动手。";
  return pool[personId] || pool.default || Object.values(pool)[0];
}

function orionOpenPlayMenu(personId) {
  const person = orionPeople().find((p) => p.id === personId);
  const plays = orionGetAvailablePlays(person);
  orionState.sceneMode = "playmenu";
  orionState.playPerson = personId;
  orionState.current = {
    person: personId,
    location: "特殊玩法",
    title: `怎么玩${person.name}`,
    text: `今晚不限于正常做爱。选一种玩法——电话、跳蛋、素股、口交、露出、束缚、足交、乳交、寸止、晨炮……她身体能承受的，你都可以试。`,
    plays,
  };
  orionRender("");
}

function orionStartPlay(personId, playId) {
  const play = ORION_PLAY_DEFS[playId];
  const person = orionPeople().find((p) => p.id === personId);
  if (!play || !person) return;
  orionState.sceneMode = "play";
  orionState.playPerson = personId;
  orionState.playId = playId;
  orionState.playStep = 0;
  orionState.current = {
    person: personId,
    location: orionState.current?.location || "私密角落",
    title: `${play.icon} ${play.name}`,
    text: orionGetPlayBody(playId, personId),
    play,
  };
  orionRender("");
}

function orionCompletePlay(personId, playId, bonusText = "") {
  const play = ORION_PLAY_DEFS[playId];
  const rel = orionState.relationships[personId];
  if (!play || !rel) return;
  if (play.item && orionHasItem(play.item)) {
    const idx = orionState.inventory.indexOf(play.item);
    if (idx >= 0 && Math.random() < 0.35) orionState.inventory.splice(idx, 1);
  }
  rel.affection = orionClamp(rel.affection + (play.aff || 0), 0, 14);
  rel.intimacy = orionClamp(rel.intimacy + (play.intimacy || 0), 0, 14);
  const kinks = orionEnsureRelKinks(rel);
  if (!kinks.includes(playId)) kinks.push(playId);
  const body = orionGetPlayBody(playId, personId);
  const person = orionPeople().find((p) => p.id === personId);
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, body + (bonusText ? `\n\n${bonusText}` : ""))
    + `<p class="orion-log-meta">玩法解锁：${play.name} · 好感+${play.aff || 0}</p>`;
  orionState.sceneMode = "event";
  orionApplyChoice({
    energy: play.energy || -2,
    spark: play.spark || 0,
    stress: play.stress || 0,
  }, "", personId);
  addXP(45);
  showToast?.(`玩法完成 +45 XP`, 2000);
}

function orionBuildPlayHtml(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const play = ORION_PLAY_DEFS[orionState.playId];
  const sense = orionPickSense(orionState.weather, event.location || "H场景");
  let html = orionFormatSense(sense);
  html += orionFormatStage(play?.name || "特殊玩法", orionFormatParagraphs(event.text || orionGetPlayBody(orionState.playId, event.person)));
  const heroine = getHeroine(event.person);
  if (heroine) {
    const line = getPersonaLine(heroine.personality, "date_hot");
    if (line) html += orionFormatSpeaker(heroine.name, line);
  }
  html += `<p class="orion-hint">玩法进行中——选择怎么结束这一局。</p>`;
  return html;
}

function orionBuildPlayMenuHtml(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const plays = event.plays || orionGetAvailablePlays(person);
  let html = orionFormatParagraphs(event.text);
  html += `<ul class="orion-play-list">`;
  plays.forEach((p) => {
    html += `<li><strong>${p.icon} ${orionEscapeHtml(p.name)}</strong> — ${orionEscapeHtml(p.hint)}</li>`;
  });
  html += `</ul><p class="orion-hint">已解锁 ${plays.length} 种玩法。点击下方选择。</p>`;
  return html;
}

function orionRunDirtyTalkCheck(person, rel) {
  const target = orionHasTrait("flirt") ? 5 : 6;
  const ok = orionD6() + orionState.charm >= target;
  const extra = ok
    ? "她腿软拉你进阴影，内裤湿透：「……都说出来。一句都不许省。」"
    : "她红脸推开你一寸：「……太色了。」却凑耳小声：「回宿舍……再说一遍。」";
  orionCompletePlay(person.id, "dirty_talk", extra);
}

function orionGetForeplayExtras() {
  return Object.values(ORION_EXTRA_FOREPLAY).filter((x) => !x.need || x.need());
}

function orionGetFinishExtras(personId) {
  return Object.values(ORION_EXTRA_FINISH).filter((x) => !x.need || x.need(personId));
}

function orionApplyForeplayExtra(key) {
  return ORION_FOREPLAY_EXTRA_TEXT[key] || "";
}

function orionApplyFinishExtra(key) {
  return ORION_FINISH_EXTRA_TEXT[key] || "";
}