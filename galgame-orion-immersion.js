/* 蜜语 · Orion 沉浸感引擎 — 感官 / 分阶段 H / 格式化叙事 */

const ORION_H_PHASES = [
  { id: "approach", label: "靠近她", hint: "听她呼吸变乱", icon: "👣" },
  { id: "undress", label: "剥开衣服", hint: "布料与皮肤", icon: "👗" },
  { id: "foreplay", label: "前戏挑逗", hint: "湿意先泛滥", icon: "👅" },
  { id: "union", label: "插入抽插", hint: "穴肉裹上来", icon: "🔥" },
  { id: "climax", label: "高潮余韵", hint: "射满或抱紧", icon: "💦" },
];

const ORION_SENSE_BY_WEATHER = {
  雨夜: ["雨点砸窗，把喘息藏进白噪音里", "潮湿空气贴着皮肤，衣料吸了水更透", "走廊远去的脚步声，像催你们再快一点"],
  深夜: ["走廊灯一盏盏灭，只剩彼此体温", "远处保安手电偶尔扫过，心跳跟着顿一拍", "宿舍楼零星亮着的窗，像未说出口的欲"],
  黄昏: ["晚霞把侧脸镀成蜜色，适合先亲再脱", "风钻衣领，乳尖不争气地硬起来", "影子被拉得很长，像拖延告别"],
  闷热: ["闷热让汗味更明显，皮肤滑腻难分开", "衬衫贴在背上，脱下来时带一声轻响", "空气稠得像要凝固在腿间"],
  大风: ["风掀裙摆，手要不要按住——还是故意不按住", "天台的风灌进领口，下面却烫得反常", "铁丝网哐哐响，像替你们打拍子"],
  考试周: ["自习室灯亮到深夜，帘子后也许不只读书", "人人谈分数，你只想听她的哼声", "考卷和避孕套都在包里——都很认真"],
  社团日: ["社团喧闹在门外，门内安静得只剩湿声", "传单上的笑容，和夜里求欢时不一样", "更衣室门一关，世界只剩肉体"],
  晴: ["阳光太亮，反而更想躲进阴影里做", "蝉鸣盖不住水声，如果做得够狠", "晴空下偷情，罪恶感让下面更湿"],
};

const ORION_PLACE_SENSE = {
  图书馆: "旧书纸霉味混着她身上淡淡的皂香，书架投下窄窄的阴影。",
  空教室: "粉笔灰味还悬在空气里，课桌木头被体温焐热。",
  宿舍: "窄床吱呀，隔壁墙薄得像能听见自己的心跳。",
  教研室: "百叶窗缝漏进路灯，文件纸边刮过裸背凉一下。",
  酒吧: "低音炮震胸腔，香水混着汗和酒精，醉意从唇传到腿间。",
  画室: "松节油与颜料甜腥，画布上的轮廓不如眼前真人烫。",
  体育馆: "橡胶地板味、汗味、消毒水——运动员的情欲带着热度。",
  泳池: "氯水味混着湿发，瓷砖凉、体内烫，对比让人发抖。",
  天台: "风大得站不稳，退无可退时只能贴紧。",
  电影院: "银幕光一闪一闪打在她侧脸，后排黑暗纵容放肆。",
  H场景: "房间门咔哒一落，外面校园还在，里面只剩肉体相撞。",
};

const ORION_APPROACH_FLAVOR = {
  lintang: {
    near: "你走近，她不退，反而下巴微抬——像在等判决，又像在邀罪。",
    kiss: "你吻上去，她僵一秒，然后咬你下唇作为回击，舌尖却软得不像话。",
    back: "从后环住她细腰，她脊背贴你胸口，小声：「……别让别人看见。」",
  },
  sutang: {
    near: "她主动蹭进怀里，软肉贴着，奶香淡淡：「嘿嘿……抓到你了。」",
    kiss: "你亲她，她 squeal 一声，然后搂脖子加深，舌头甜得像奶茶。",
    back: "从后抱她，她屁股往后顶你胯：「……感觉到你了哦。」",
  },
  shenman: {
    near: "她抬下巴让你靠近，香水味先侵略鼻腔：「小朋友，急什么。」",
    kiss: "红酒味吻压下来，她控节奏，舔到你硬了才放开。",
    back: "你从后贴上去，她后脑靠你肩：「……手别闲着。」",
  },
  guye: {
    near: "她挑眉看你裤裆：「硬了？训练完就发情？」腿却靠过来。",
    kiss: "她咬你唇像对抗，舌却缠上来，汗味混着情欲。",
    back: "从后抱她，腹肌贴她背，她哼一声：「……继续，别装正经。」",
  },
  baiyue: {
    near: "她捧你脸，笑甜得发寒：「只准看我。只准想我。」",
    kiss: "吻像吞人，她咬出血味也要更深：「……我的味道。」",
    back: "从后抱她，她覆你手背往自己胸下按：「……画这里。」",
  },
};

const ORION_FOREPLAY_FLAVOR = {
  finger: "手指探进湿缝，穴肉立刻绞上来，淫水淌满指根，咕叽声在安静里放肆。",
  oral: "她跪下来含住你，舌头卷根部，口水顺着柱身亮晶晶，喉肉一缩一缩。",
  tease: "你只磨穴口不肯进，她腰往上迎，眼泪憋出来：「……混蛋……进来啊……」",
  breast: "你含住乳尖吮吸，她手指插你发间，胸口起伏，下面淌得更凶。",
};

const ORION_FINISH_FLAVOR = {
  creampie: "你低吼着顶到最深，一股股射在里面，穴肉痉挛着吸紧，白浊灌满并从结合处溢出来。",
  pullout: "最后关头抽出来，精液溅她小腹和胸，她摸上去抹开，喘着看你。",
  afterglow: "你没拔出来，抱紧她直到双方喘匀，体内还一缩一缩含着你不放。",
};

function orionEscapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function orionPickSense(weather, place) {
  const pool = ORION_SENSE_BY_WEATHER[weather] || ORION_SENSE_BY_WEATHER.晴;
  const w = galPick(pool);
  const locExtra = window.ORION_LOCATION_FLAVOR?.[place];
  const p = locExtra || ORION_PLACE_SENSE[place] || ORION_PLACE_SENSE.H场景;
  return `${p}\n${w}`;
}

function orionFormatParagraphs(text) {
  return orionEscapeHtml(galFill(text))
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p) => `<p class="orion-para">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function orionFormatSpeaker(name, text) {
  return `<blockquote class="orion-speech"><cite>${orionEscapeHtml(name)}</cite>${orionFormatParagraphs(text)}</blockquote>`;
}

function orionFormatStage(label, bodyHtml) {
  return `<section class="orion-stage"><header class="orion-stage-label">${orionEscapeHtml(label)}</header>${bodyHtml}</section>`;
}

function orionFormatSense(text) {
  return `<p class="orion-sense">${orionEscapeHtml(galFill(text)).replace(/\n/g, "<br>")}</p>`;
}

function orionBuildImmersiveEventHtml(event) {
  const tag = event.tags?.find((t) => orionAtmosphere[t]) ?? (orionState.weather === "雨夜" ? "雨夜" : "default");
  const atmo = galPick(orionAtmosphere[tag] ?? orionAtmosphere.default);
  const place = event.location || "校园";
  const sense = orionPickSense(orionState.weather, place);
  let html = orionFormatSense(sense);
  html += orionFormatParagraphs(event.text);
  const beats = (event.beats || []).slice(0, orionState.beatIndex || 0);
  beats.forEach((b) => {
    html += orionFormatSpeaker(b.speaker, b.text);
  });
  html += orionFormatStage("空气", `<p class="orion-atmo">${orionEscapeHtml(atmo)}</p>`);
  if (orionEventBeatsRemaining() > 0) {
    html += `<p class="orion-hint">她的声音还在喉咙里——点击下方继续。</p>`;
  }
  return html;
}

function orionInitHScene(scene) {
  orionState.hPhase = 0;
  orionState.hApproach = "near";
  orionState.hForeplay = "finger";
  orionState.hForeplayExtra = "";
  orionState.hPace = "hard";
  orionState.hFinish = null;
  orionState.adultPosition = orionState.adultPosition || "missionary";
}

function orionGetHPhase() {
  return ORION_H_PHASES[orionState.hPhase ?? 0] || ORION_H_PHASES[0];
}

function orionAdvanceHPhase() {
  orionState.hPhase = Math.min((orionState.hPhase ?? 0) + 1, ORION_H_PHASES.length - 1);
  orionSaveRun();
  orionRender();
}

function orionSplitBodyParagraphs(body) {
  return String(body || "").split(/\n\n+/).filter((x) => x.trim());
}

function orionBuildHPhaseHtml(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const heroine = getHeroine(event.person);
  const phase = orionGetHPhase();
  const rel = orionState.relationships[event.person];
  const oid = orionState.sexOutfit?.[event.person] || heroine?.defaultOutfit;
  const place = event.place || event.location || "H场景";
  const sense = orionPickSense(orionState.weather, place);
  const moodTag = event.mood ? `<span class="orion-mood-tag">${orionEscapeHtml(event.mood)}</span>` : "";

  let body = orionGetSceneBody(event.id);
  if (!body) body = orionGenerateExplicitBody(person, event);
  body = galFill(body);
  const paras = orionSplitBodyParagraphs(body);
  const mid = Math.max(1, Math.floor(paras.length / 2));

  let html = `<div class="orion-h-phase" data-phase="${phase.id}">`;
  html += `<div class="orion-h-phase-bar">${ORION_H_PHASES.map((p, i) =>
    `<span class="orion-h-step${i <= (orionState.hPhase ?? 0) ? " on" : ""}${i === (orionState.hPhase ?? 0) ? " cur" : ""}">${p.icon}</span>`
  ).join("")}</div>`;
  html += `<p class="orion-h-phase-title">${phase.icon} ${orionEscapeHtml(phase.label)} ${moodTag}</p>`;
  html += orionFormatSense(sense);

  if (phase.id === "approach") {
    html += orionFormatStage("序幕", orionFormatParagraphs(galFill(event.setup)));
    const flavor = ORION_APPROACH_FLAVOR[event.person]?.[orionState.hApproach || "near"] || "";
    if (flavor) html += orionFormatParagraphs(flavor);
    const warm = heroine ? getPersonaLine(heroine.personality, rel.affection >= 5 ? "date_hot" : "date_warm") : "";
    if (warm) html += orionFormatSpeaker(heroine?.name || person.name, warm);
    html += `<p class="orion-hint">再近一点，就能听见她紊乱的呼吸。</p>`;
  }

  if (phase.id === "undress") {
    const undress = getOrionUndressPreamble(heroine, oid);
    html += orionFormatStage("脱衣", orionFormatParagraphs(undress));
    const strip = heroine ? getPersonaLine(heroine.personality, "strip") : "";
    if (strip) html += orionFormatSpeaker(heroine.name, strip);
    const outfit = getPersonaOutfitDesc(heroine, oid) || getOutfitDef(oid).sexModifier;
    if (outfit) html += orionFormatParagraphs(outfit);
    html += `<p class="orion-hint">衣料落地。她赤裸的程度，刚好够你硬到发疼。</p>`;
  }

  if (phase.id === "foreplay") {
    const fp = orionState.hForeplayExtra || ORION_FOREPLAY_FLAVOR[orionState.hForeplay || "finger"];
    html += orionFormatStage("前戏", orionFormatParagraphs(fp));
    const bodySex = heroine ? getBodyFlavor(heroine.bodyType, "sex") : "";
    if (bodySex) html += orionFormatParagraphs(bodySex);
    const pos = orionState.adultPosition || "missionary";
    const tease = getSexPositionText(pos, "tease", "classroom", person.name);
    html += orionFormatSpeaker(person.name, tease.char || "「……别吊了……」");
    html += orionFormatParagraphs(tease.narrative);
    html += `<p class="orion-hint">她湿透了。穴口一张一合，像在求你。</p>`;
  }

  if (phase.id === "union") {
    const pos = orionState.adultPosition || "missionary";
    const pace = orionState.hPace || "hard";
    const posDef = GAL_SEX_POSITIONS[pos];
    html += orionFormatStage("交合", `<p class="orion-pos-badge">${posDef?.icon || ""} ${orionEscapeHtml(posDef?.label || "体位")}</p>`);
    const intro = getSexPositionText(pos, "slow", "classroom", person.name);
    html += orionFormatParagraphs(intro.narrative);
    html += orionFormatSpeaker(person.name, intro.char || "「嗯……」");
    const main = paras.slice(0, mid).join("\n\n");
    html += orionFormatParagraphs(main);
    const hard = getSexPositionText(pos, pace, "classroom", person.name);
    html += orionFormatParagraphs(hard.narrative);
    html += orionFormatSpeaker(person.name, hard.char || "");
    html += `<p class="orion-hint">水声和肉体拍击声越来越响，她快忍不住了。</p>`;
  }

  if (phase.id === "climax") {
    const pos = orionState.adultPosition || "missionary";
    const climaxLine = galPick(GAL_SEX_POSITIONS[pos]?.climax || ["她夹紧你高潮，热液喷出。"]);
    const main = paras.slice(Math.floor(paras.length / 2)).join("\n\n");
    html += orionFormatStage("高潮", orionFormatParagraphs(main));
    html += orionFormatParagraphs(galFill(climaxLine));
    const persona = heroine ? getPersonaSexLine(heroine, "climax") : null;
    if (persona?.char) html += orionFormatSpeaker(heroine.name, persona.char);
    const fin = ORION_FINISH_FLAVOR[orionState.hFinish || "creampie"];
    if (orionState.hFinish) html += orionFormatParagraphs(fin);
    html += orionFormatStage("余韵", orionFormatParagraphs(galFill(event.after)));
    if (!orionState.hFinish) {
      html += `<p class="orion-hint">最后一推——你想怎么结束这一夜？</p>`;
    }
  }

  html += `</div>`;
  return html;
}

function orionWrapDateImmersive(person, rel, coreText) {
  const place = orionState.current?.location || "校园";
  const sense = orionPickSense(orionState.weather, place);
  return orionFormatSense(sense) + orionFormatParagraphs(coreText);
}

function orionApplyMoodToScreen(mode, personId) {
  const screen = $("#screen-gal-orion");
  if (!screen) return;
  screen.dataset.mood = mode === "adult" || mode === "gallery" ? "adult" : (mode === "event" && personId ? "tension" : "default");
  const heroine = personId ? getHeroine(personId) : null;
  screen.style.setProperty("--orion-accent", heroine?.color || "#ff4d7d");
}