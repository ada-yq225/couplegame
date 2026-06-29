/* 蜜语 · Orion 攻略系统 — 专属手段 / 关系阶段 / 攻略手册 */

const ORION_RELATION_STAGES = [
  { id: "stranger", min: 0, label: "陌生", hint: "她还没把你当回事", color: "#6b7280" },
  { id: "notice", min: 2, label: "留意", hint: "她开始记住你的名字", color: "#8b9dc3" },
  { id: "warm", min: 4, label: "暧昧", hint: "眼神和指尖都在试探", color: "#e8a0bf" },
  { id: "ignite", min: 6, label: "点燃", hint: "再近一点就会湿", color: "#ff6b9d" },
  { id: "flesh", min: 8, label: "肉体", hint: "身体已经认主", color: "#ff2d6a" },
  { id: "addict", min: 11, label: "沉迷", hint: "离不开你的温度", color: "#c41e5a" },
];

const ORION_UNIVERSAL_STRATEGIES = [
  { id: "stakeout", icon: "🕯️", name: "蹲点守候", hint: "耗体力换偶遇 · 魅力检定", minAff: 1, energy: 2 },
  { id: "love_letter", icon: "💌", name: "情书/消息", hint: "文字撩骚 · 信任加成", minAff: 2, energy: 1 },
  { id: "errand", icon: "🤝", name: "帮忙办事", hint: "跑腿换好感 · 学业检定", minAff: 1, energy: 2 },
  { id: "ambush", icon: "✨", name: "制造偶遇", hint: "刻意路线 · 魅力检定", minAff: 2, energy: 1 },
  { id: "edge", icon: "🔥", name: "边缘亲密", hint: "只摸不插 · 性奋暴涨", minAff: 3, energy: 1 },
  { id: "confess", icon: "💗", name: "表白检定", hint: "好感≥6 · 信任检定", minAff: 6, energy: 2 },
];

const ORION_CHARACTER_STRATEGIES = {
  lintang: [
    { id: "study_together", icon: "📚", name: "学术共谋", hint: "图书馆同桌 · 学业+魅力", minAff: 0, studyCheck: 5 },
    { id: "rain_wait", icon: "🌧️", name: "雨天慢热", hint: "雨夜守候 · 慢热加成", minAff: 2, weather: "雨夜" },
    { id: "legal_letter", icon: "⚖️", name: "法条情书", hint: "用刑法条文写骚话", minAff: 3 },
    { id: "library_corner", icon: "📖", name: "书架死角", hint: "闭馆前试探 · 偷情权重", minAff: 4 },
  ],
  sutang: [
    { id: "sweet_offering", icon: "🧋", name: "甜食进贡", hint: "奶茶/甜品 · 撒娇加成", minAff: 0 },
    { id: "clingy_voice", icon: "🎀", name: "撒娇语音", hint: "发语音哄她 · 魅力检定", minAff: 2 },
    { id: "dance_private", icon: "💃", name: "私教八拍", hint: "舞蹈房单独加练", minAff: 3 },
    { id: "cos_preview", icon: "🐰", name: "试装预览", hint: "兔耳/网袜只给你看", minAff: 5 },
  ],
  shenman: [
    { id: "tribute", icon: "🍷", name: "御姐进贡", hint: "红酒/礼物表忠心", minAff: 1 },
    { id: "overtime_help", icon: "📋", name: "加班帮忙", hint: "改卷打杂 · 信任+", minAff: 2 },
    { id: "bar_stakeout", icon: "🎤", name: "酒吧蹲点", hint: "演出后后台 · 深夜", minAff: 3, weather: "深夜" },
    { id: "kneel_game", icon: "⛓️", name: "称呼游戏", hint: "叫对才给碰 · 支配", minAff: 5 },
  ],
  guye: [
    { id: "sport_challenge", icon: "🏃", name: "运动挑战", hint: "体能对决 · 魅力检定", minAff: 0 },
    { id: "run_pace", icon: "👟", name: "陪跑配速", hint: "操场第七圈等她", minAff: 2 },
    { id: "massage_ice", icon: "🧊", name: "冰敷按摩", hint: "大腿内侧 · 直球", minAff: 3 },
    { id: "locker_bet", icon: "🔒", name: "更衣室赌约", hint: "三分钟赌约 · 野性", minAff: 5 },
  ],
  baiyue: [
    { id: "studio_exclusive", icon: "🎨", name: "画室独占", hint: "只做她的模特", minAff: 1 },
    { id: "possessive_note", icon: "🩸", name: "占有宣言", hint: "短信要痕迹照", minAff: 3 },
    { id: "edge_sketch", icon: "✏️", name: "边缘素描", hint: "画到湿 · 不插入", minAff: 4 },
    { id: "ribbon_bind", icon: "🎀", name: "丝带缚腕", hint: "红丝带只准看她", minAff: 5 },
  ],
};

function orionGetRelationStage(rel) {
  const aff = rel?.affection ?? 0;
  let stage = ORION_RELATION_STAGES[0];
  for (const s of ORION_RELATION_STAGES) {
    if (aff >= s.min) stage = s;
  }
  return stage;
}

function orionGetStrategyDefs(person) {
  const char = ORION_CHARACTER_STRATEGIES[person.id] || [];
  return [...char, ...ORION_UNIVERSAL_STRATEGIES];
}

function orionStrategyAvailable(def, person, rel) {
  if (rel.affection < (def.minAff ?? 0)) return false;
  if (def.weather && orionState.weather !== def.weather) return false;
  if (def.id === "sweet_offering") {
    const hasSweet = orionState.inventory.some((n) => ["奶茶券", "暖宝宝"].includes(n));
    if (!hasSweet && orionState.money < 2) return false;
  }
  if (def.id === "tribute" && orionState.money < 3 && !orionState.inventory.length) return false;
  if (orionState.energy < (def.energy ?? 1)) return false;
  const used = orionState.strategyUsedToday?.[person.id] || [];
  if (used.includes(def.id)) return false;
  return true;
}

function orionMarkStrategyUsed(personId, strategyId) {
  if (!orionState.strategyUsedToday) orionState.strategyUsedToday = {};
  if (!orionState.strategyUsedToday[personId]) orionState.strategyUsedToday[personId] = [];
  orionState.strategyUsedToday[personId].push(strategyId);
}

function orionRollStrategyCheck(target, bonus = 0) {
  return orionD6() + bonus >= target;
}

function orionStrategyBonus(person) {
  let b = 0;
  if (orionPreferenceMatches(person.id)) b += 1;
  if (orionHasTrait("flirt")) b += 1;
  if (orionState.routePlan === "deep" && orionIsTopAffection(person.id)) b += 1;
  if (orionState.streakPerson === person.id) b += Math.min(orionState.streak, 1);
  return b;
}

function orionBuildStrategyProse(person, strategyId, ok) {
  const pool = ORION_STRATEGY_EROTICA?.[person.id]?.[strategyId];
  if (pool?.length) {
    const idx = (orionState.relationships[person.id].dates + orionD6()) % pool.length;
    return pool[idx];
  }
  const key = ok ? "strategy_ok" : "strategy_fail";
  return galFill(orionPickDialogue(person.id, key, orionD6()) || orionPickDialogue(person.id, ok ? "flirt_ok" : "flirt_fail", orionD6()));
}

function orionWrapStrategyImmersive(person, rel, strategyDef, coreText, meta) {
  const stage = orionGetRelationStage(rel);
  const sense = orionFormatSense(orionPickSense(orionState.weather, orionState.current?.location || "校园"));
  const header = orionFormatStage(
    `攻略 · ${strategyDef.icon} ${strategyDef.name}`,
    `<p class="orion-strategy-stage" style="--stage-color:${stage.color}">关系：<strong>${stage.label}</strong> — ${orionEscapeHtml(stage.hint)}</p>`
  );
  const body = orionFormatParagraphs(coreText);
  const erotica = ok => {
    const extra = orionGetStrategyEroticaBonus(person.id, strategyDef.id, ok);
    return extra ? orionFormatStage("余温", orionFormatParagraphs(extra)) : "";
  };
  return sense + header + body + erotica(meta?.ok) + `<p class="orion-log-meta">${meta?.line || ""}</p>`;
}

function orionExecuteStrategy(person, strategyId) {
  const defs = orionGetStrategyDefs(person);
  const def = defs.find((d) => d.id === strategyId);
  if (!def || !orionStrategyAvailable(def, person, orionState.relationships[person.id])) {
    orionRender("现在用不了这招。");
    return;
  }
  const rel = orionState.relationships[person.id];
  const bonus = orionStrategyBonus(person);
  let ok = true;
  let affGain = 1;
  let sparkGain = 0;
  let stressDelta = 0;
  let trustGain = 0;
  let energyCost = def.energy ?? 1;
  let logLine = "";

  switch (strategyId) {
    case "study_together": {
      ok = orionRollStrategyCheck(def.studyCheck || 5, orionState.study + bonus);
      affGain = ok ? 3 : 1;
      sparkGain = ok ? 1 : 0;
      if (ok) orionState.study = orionClamp(orionState.study + 1, 0, 14);
      logLine = ok ? "学术共谋成功 · 她允许你坐得更近" : "聊题聊偏了 · 但她记住了你";
      break;
    }
    case "rain_wait": {
      ok = orionRollStrategyCheck(5, orionState.charm + bonus + (orionHasTrait("listen") ? 1 : 0));
      affGain = ok ? 3 : 2;
      sparkGain = ok ? 2 : 1;
      stressDelta = ok ? -1 : 0;
      logLine = ok ? "雨夜慢热 · 伞沿下呼吸乱了" : "她嘴硬要走 · 脚步却慢了";
      break;
    }
    case "legal_letter":
    case "love_letter":
    case "possessive_note":
    case "clingy_voice": {
      ok = orionRollStrategyCheck(5, orionState.charm + bonus);
      affGain = ok ? 2 : 1;
      sparkGain = ok ? 2 : 1;
      trustGain = ok ? 1 : 0;
      logLine = ok ? "文字撩到她腿软" : "她已读不回 · 但反复点开";
      break;
    }
    case "sweet_offering": {
      const idx = orionState.inventory.findIndex((n) => n === "奶茶券");
      if (idx >= 0) orionState.inventory.splice(idx, 1);
      else orionState.money = orionClamp(orionState.money - 2, 0, 14);
      affGain = 3;
      sparkGain = 1;
      stressDelta = -1;
      logLine = "甜食进贡 · 她蹭着你撒娇";
      break;
    }
    case "tribute": {
      if (orionState.inventory.length) {
        const gi = orionState.inventory.findIndex((n) => person.likes.includes(n));
        if (gi >= 0) orionState.inventory.splice(gi, 1);
        else orionState.inventory.pop();
      } else {
        orionState.money = orionClamp(orionState.money - 3, 0, 14);
      }
      ok = orionRollStrategyCheck(5, orionState.charm + bonus);
      affGain = ok ? 4 : 2;
      sparkGain = ok ? 2 : 1;
      logLine = ok ? "进贡合格 · 御姐赏了碰的机会" : "礼数到了 · 称呼还得练";
      break;
    }
    case "sport_challenge":
    case "run_pace":
    case "ambush":
    case "stakeout":
    case "bar_stakeout": {
      energyCost = Math.max(energyCost, 2);
      ok = orionRollStrategyCheck(6, orionState.charm + bonus + (orionHasTrait("bold") ? 1 : 0));
      affGain = ok ? 3 : 1;
      sparkGain = ok ? 2 : 0;
      logLine = ok ? "蹲点/偶遇成功 · 她主动靠过来" : "白等一夜 · 欲火更旺";
      break;
    }
    case "overtime_help":
    case "errand": {
      ok = orionRollStrategyCheck(5, orionState.study + orionState.trust + bonus);
      affGain = ok ? 2 : 1;
      trustGain = ok ? 2 : 1;
      sparkGain = ok ? 1 : 0;
      logLine = ok ? "帮忙换信任 · 她欠你一次" : "搞砸了 · 但她看见你的诚意";
      break;
    }
    case "edge":
    case "edge_sketch":
    case "library_corner":
    case "dance_private":
    case "massage_ice":
    case "cos_preview":
    case "kneel_game":
    case "locker_bet":
    case "ribbon_bind":
    case "studio_exclusive": {
      ok = orionRollStrategyCheck(5, orionState.charm + bonus);
      affGain = ok ? 2 : 1;
      sparkGain = ok ? 3 : 2;
      stressDelta = ok ? 1 : 2;
      logLine = ok ? "边缘玩到湿透 · 没给插但更饿" : "差一点就失控 · 她让你明天继续";
      break;
    }
    case "confess": {
      ok = orionRollStrategyCheck(8, orionState.trust + orionState.charm + bonus);
      affGain = ok ? 4 : 1;
      sparkGain = ok ? 2 : 0;
      trustGain = ok ? 2 : 1;
      if (ok) rel.clear = true;
      logLine = ok ? "表白成功 · 关系确认" : "时机不对 · 但心跳被她听见了";
      break;
    }
    default: {
      ok = orionRollStrategyCheck(5, orionState.charm + bonus);
      affGain = ok ? 2 : 1;
      sparkGain = ok ? 1 : 0;
      logLine = ok ? "攻略奏效" : "还差一口气";
    }
  }

  const prose = orionBuildStrategyProse(person, strategyId, ok);
  const confessExtra = strategyId === "confess"
    ? (ok ? galFill(orionPickDialogue(person.id, "confess_ok", rel.dates)) : galFill(orionPickDialogue(person.id, "confess_fail", rel.dates)))
    : "";
  const core = [prose, confessExtra].filter(Boolean).join("\n\n");

  rel.affection = orionClamp(rel.affection + affGain, 0, 14);
  orionState.spark = orionClamp(orionState.spark + sparkGain, 0, 14);
  orionState.trust = orionClamp(orionState.trust + trustGain, 0, 14);
  orionMarkStrategyUsed(person.id, strategyId);
  orionState.pendingLogHtml = orionWrapStrategyImmersive(person, rel, def, core, { ok, line: logLine });
  orionApplyChoice({ energy: -energyCost, stress: stressDelta }, "", person.id);
}

function orionBuildStrategyManualHtml(person) {
  const rel = orionState.relationships[person.id];
  const stage = orionGetRelationStage(rel);
  const defs = orionGetStrategyDefs(person);
  const tips = ORION_STRATEGY_TIPS[person.id] || [];
  let html = `<div class="orion-strategy-manual">`;
  html += `<p class="orion-strategy-head"><strong>${person.icon} ${person.name}</strong> · ${stage.label}（${rel.affection}/14）</p>`;
  html += `<p class="orion-strategy-desc">${person.vibe}</p>`;
  html += orionFormatStage("攻略要诀", `<ul class="orion-strategy-tips">${tips.map((t) => `<li>${orionEscapeHtml(t)}</li>`).join("")}</ul>`);
  html += orionFormatStage("可用手段", `<div class="orion-strategy-grid">${
    defs.map((d) => {
      const on = orionStrategyAvailable(d, person, rel);
      return `<div class="orion-strategy-card${on ? "" : " locked"}"><span>${d.icon}</span><strong>${orionEscapeHtml(d.name)}</strong><small>${orionEscapeHtml(d.hint)}</small>${on ? "" : "<em>未解锁/今日已用</em>"}</div>`;
    }).join("")
  }</div>`);
  html += `<p class="orion-hint">点击下方手段直接发动；边缘亲密与表白会大幅改变性奋与关系阶段。</p>`;
  html += `</div>`;
  return html;
}

function orionOpenStrategyManual(personId) {
  const person = orionPeople().find((p) => p.id === personId);
  orionState.sceneMode = "strategy";
  orionState.current = {
    type: "person",
    person: personId,
    location: "攻略手册",
    title: `${person.name} · 专属攻略`,
    text: orionBuildStrategyManualHtml(person),
  };
  orionRender("你翻开写满手段与欲望的攻略笔记。");
}

function orionGetStrategyChoices(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const rel = orionState.relationships[person.id];
  const defs = orionGetStrategyDefs(person).filter((d) => orionStrategyAvailable(d, person, rel));
  const choices = defs.slice(0, 8).map((d) => ({
    label: `${d.icon} ${d.name}`,
    hint: d.hint,
    run: () => orionExecuteStrategy(person, d.id),
  }));
  choices.push({
    label: "返回",
    hint: "回遇人选项",
    run: () => {
      orionState.sceneMode = "event";
      orionRender();
    },
  });
  return choices;
}

const ORION_STRATEGY_TIPS = {
  lintang: [
    "慢热：雨天、图书馆、学术共谋最容易破防。",
    "好感低时别直球开房，先用法条情书和同桌学习攒信任。",
    "雨夜权重高——配合「雨天慢热」与书架死角。",
    "表白前至少推进 3 章剧情，她才会承认喜欢。",
  ],
  sutang: [
    "甜食、撒娇、兔耳试装是她的开关。",
    "舞蹈房与电影院后排事件权重高，优先制造偶遇。",
    "边缘亲密和撒娇语音能快速堆性奋。",
    "她怕嫌她淫——表白时务必说喜欢。",
  ],
  shenman: [
    "御姐吃进贡与称呼：叫对「姐姐」比送贵礼更管用。",
    "深夜酒吧蹲点、加班帮忙可跳过暧昧期。",
    "支配玩法需好感≥5，否则反被调戏。",
    "信任比魅力更重要，谈心后再表白。",
  ],
  guye: [
    "直球体育生：陪跑、挑战、按摩比情话好使。",
    "体育馆/泳池/看台标签地点优先蹲点。",
    "更衣室赌约成功可直接+性奋，为 H 铺路。",
    "她讨厌磨叽——边缘玩太久会挨踹但会更湿。",
  ],
  baiyue: [
    "病娇独占：画室、占有短信、丝带缚腕。",
    "边缘素描能暴涨性奋却不降她占有欲。",
    "别在她面前提别人；占有宣言要回带咬痕照。",
    "表白成功她会要求你只准做她的模特。",
  ],
};

function orionGetStrategyEroticaBonus(personId, strategyId, ok) {
  if (!ok) return "";
  const bonus = ORION_STRATEGY_EROTICA_BONUS?.[personId]?.[strategyId];
  if (!bonus) return "";
  return galFill(bonus[Math.floor(Math.random() * bonus.length)]);
}