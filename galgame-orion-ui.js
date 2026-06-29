/* 蜜语 · Orion UI — 提示条 / 进度 / 状态解读 */

const ORION_STAT_META = {
  energy: { icon: "⚡", label: "体力", tip: "每天行动会消耗。≤3 时慎选耗体选项；周末考核前留足。", warnLow: 3, warnHigh: null },
  stress: { icon: "🔥", label: "欲压", tip: "过高会强制结束学期。≥10 时优先谈心/睡饱/喘息周。", warnLow: null, warnHigh: 10 },
  study: { icon: "📚", label: "学业", tip: "周末考核检定用。≤3 时选自习或补课。", warnLow: 3, warnHigh: null },
  charm: { icon: "✨", label: "魅力", tip: "撩骚、野战、攻略检定加成。约会和礼物也能抬。", warnLow: null, warnHigh: null },
  trust: { icon: "🤝", label: "信任", tip: "表白与多线结局关键。谈心、坦白局、帮忙办事可提升。", warnLow: null, warnHigh: null },
  money: { icon: "💰", label: "金钱", tip: "情趣店购物、温泉/钟点房地点。礼物路线可多攒钱。", warnLow: 2, warnHigh: null },
  spark: { icon: "💗", label: "性奋", tip: "≥1 才能开 H/推剧情。约会、撩骚、边缘亲密可快速堆。", warnLow: null, warnHigh: null },
};

const ORION_MODE_HINTS = {
  preference: "先选性癖罗盘：决定哪位女主事件权重更高，可之后在「换策略」里改路线。",
  route: "路线计划影响收益：单线加深、多线要坦白、夜游野战性奋多但欲压涨。",
  event: "遇人时优先「攻略手册」看可用手段；地点对了可「就地发挥」。",
  strategy: "灰色卡片=今日已用或未解锁。成功会播长文并推进关系阶段。",
  map: "带女主标签的地点邂逅率更高；共 30 处，主动出门比干等随机强。",
  shop: "看背包里有没有对方喜欢的礼物；送对可一次涨 3～4 好感。",
  exam: "稳扎稳打稳过；裸考赌魅力+学业；通宵爆肝欲压会飙升。",
  reward: "周奖励别总选钱——性奋和信任在后期更稀缺。",
  adult: "五阶段 H：靠近→脱衣→前戏→插入→选收尾。画廊可重看。",
  playmenu: "42+ 玩法按好感/亲密/道具解锁；先做边缘亲密再开正式 H。",
  play: "玩法完成可加亲密；随时可转入分阶段正式做爱。",
  gallery: "已解锁场景可重看；带正文标记的沉浸感更完整。",
};

const ORION_CATEGORY_META = {
  strategy: { label: "攻略", icon: "📖" },
  adult: { label: "H", icon: "🔞" },
  social: { label: "社交", icon: "💋" },
  map: { label: "地图", icon: "📍" },
  story: { label: "剧情", icon: "📖" },
  neutral: { label: "通用", icon: "↩" },
  default: { label: "行动", icon: "▸" },
};

const ORION_INFERRED_HINTS = {
  strategy: "专属攻略手段，每日限用 1 次",
  adult: "分阶段沉浸，消耗性奋与体力",
  social: "好感/魅力向，安全推进关系",
  map: "出门蹲点，提高邂逅率",
  story: "消耗性奋，推进十二幕主线",
  neutral: "跳过当前，进入下一天或返回",
  default: "点击执行此行动",
};

const ORION_GUIDE_SECTIONS = [
  { title: "每日节奏", lines: ["每天选一项行动 → 自动进入下一天。", "第 7 天周末考核；第 12/18 周有喘息日可选恢复。", "攻略手段每人每日限用 1 次，次日刷新。"] },
  { title: "关系四阶段", lines: ["陌生→留意→暧昧→点燃→肉体→沉迷（侧栏彩色显示）。", "好感≥5 + 性奋≥1 可开 H；≥6 可表白检定。", "十二幕剧情均匀摊在 24 周，别堆到期末。"] },
  { title: "H 五阶段", lines: ["靠近：选贴近方式，决定开场氛围。", "脱衣：换装或剥光，影响后续描写。", "前戏：手指/口舌/体位，堆亲密与性奋。", "插入：选节奏，推向高潮。", "收尾：内射/外射/余韵，影响亲密与好感。"] },
  { title: "完美结局条件", lines: ["最高好感女主：好感≥10、全 15 H、十二幕剧情通关。", "多线结局：坦白局 + 信任，避免修罗场崩盘。", "体力/学业归零会坏结局，注意欲压≤13。"] },
  { title: "高效攻略", lines: ["地图蹲点 > 盲等随机；就地发挥堆性奋。", "送对礼物、边缘亲密、专属攻略比纯约会快。", "连点同一女主有 streak 加成。"] },
  { title: "数值速查", lines: ["体力≤3 慎耗体；欲压≥10 谈心降压。", "学业≤3 周末易挂；金钱≤2 少去收费点。", "性奋=0 时 H 与剧情按钮不会出现。"] },
];

function orionChoiceCategory(label) {
  const s = String(label);
  if (/攻略|手册|蹲点|情书|表白|就地/.test(s)) return "strategy";
  if (/🔞|H|做爱|开房|特殊玩法|边缘|野战|内射|射她|抽插|进入她|剥光/.test(s)) return "adult";
  if (/地图|情趣|商店|购物|便利店/.test(s)) return "map";
  if (/约会|撩|谈心|送/.test(s)) return "social";
  if (/推进剧情/.test(s)) return "story";
  if (/跳过|返回|继续|重试|停下|离开|重看/.test(s)) return "neutral";
  return "default";
}

function orionInferChoiceHint(label, category) {
  const s = String(label);
  if (/睡饱|睡整天/.test(s)) return "恢复体力，降低欲压";
  if (/春梦|约会日/.test(s)) return "性奋向奖励，下周更好开 H";
  if (/坦白局/.test(s)) return "多线必备，信任 +3 防修罗场";
  if (/自习|补课/.test(s)) return "学业向，考核前优先";
  if (/零花钱|购物/.test(s)) return "金钱向，买礼物或去收费地点";
  if (/校园地图/.test(s)) return `${typeof orionLocations !== "undefined" ? orionLocations.length : 30} 处可蹲点`;
  if (/情趣/.test(s)) return "买她喜欢的礼物，送对暴涨好感";
  if (/换策略/.test(s)) return "改路线计划或性癖权重";
  return ORION_INFERRED_HINTS[category] || ORION_INFERRED_HINTS.default;
}

function orionEnhanceChoices(choices) {
  return choices.map((c) => {
    const cat = orionChoiceCategory(c.label);
    const hint = c.hint || orionInferChoiceHint(c.label, cat);
    return { ...c, hint, _cat: cat };
  });
}

function orionGetLeadRelation() {
  if (!orionState?.relationships) return null;
  const ranked = orionPeople()
    .map((p) => ({ p, ...orionState.relationships[p.id] }))
    .sort((a, b) => b.affection + b.intimacy * 2 + b.scenes.length - (a.affection + a.intimacy * 2 + a.scenes.length));
  return ranked[0] || null;
}

function orionBuildProgressChips() {
  if (!orionState?.relationships) return "";
  const lead = orionGetLeadRelation();
  if (!lead) return "";
  const totalH = orionAdultScenes[lead.p.id].length;
  const totalStory = orionStorylines[lead.p.id].length;
  const hPct = Math.round((lead.scenes.length / totalH) * 100);
  const storyPct = Math.round((lead.story / totalStory) * 100);
  const weekPct = Math.round((orionState.week / ORION_WEEKS) * 100);
  const arc = typeof orionGetSemesterArc === "function" ? orionGetSemesterArc(orionState.week) : null;
  const stressChip = orionState.stress >= 10
    ? `<span class="orion-chip chip-alert" title="欲压过高">⚠ 欲压 ${orionState.stress}</span>`
    : "";
  const streakChip = orionState.streak >= 2 && orionState.streakPerson
    ? `<span class="orion-chip" title="连续攻略同一女主有加成">🔥 连击×${orionState.streak}</span>`
    : "";
  return `<div class="orion-progress-chips">
    ${arc ? `<span class="orion-chip chip-arc" title="${arc.hint}">${arc.label}</span>` : ""}
    <span class="orion-chip" title="学期进度">📅 ${orionState.week}/${ORION_WEEKS}周 ${weekPct}%</span>
    <span class="orion-chip chip-lead" title="当前领先：${lead.p.name}">👑 ${lead.p.name} ♥${lead.affection}</span>
    <span class="orion-chip" title="H解锁进度">🔞 H ${lead.scenes.length}/${totalH} ${hPct}%</span>
    <span class="orion-chip" title="剧情进度">📖 故事 ${lead.story}/${totalStory} ${storyPct}%</span>
    ${streakChip}${stressChip}
  </div>`;
}

function orionBuildStatAlerts() {
  const alerts = [];
  if (orionState.energy <= 3) alerts.push({ warn: true, text: "体力偏低，优先睡饱或喘息周" });
  if (orionState.stress >= 10) alerts.push({ warn: true, text: "欲压危险，谈心/坦白局降压" });
  if (orionState.study <= 3) alerts.push({ warn: true, text: "学业告急，周末考核易翻车" });
  if (orionState.spark === 0) alerts.push({ warn: true, text: "性奋为 0，暂不可开 H/剧情" });
  if (orionState.money <= 2) alerts.push({ warn: true, text: "零花钱不足，少去收费地点" });
  if (orionState.stress >= 13) alerts.push({ warn: true, text: "欲压临界！再涨就学期结束" });
  return alerts;
}

function orionBuildMapHint() {
  if (typeof orionLocations === "undefined") return null;
  const lead = orionGetLeadRelation();
  const heroineId = lead?.p?.id;
  const tagged = heroineId
    ? orionLocations.filter((l) => l.tags?.includes(heroineId)).slice(0, 4)
    : [];
  if (tagged.length) {
    return `推荐蹲点（${lead.p.name}）：${tagged.map((l) => l.name).join("、")}`;
  }
  return "各地点有学业/性奋/欲压加成，优先去侧栏标有她标签的地点。";
}

function orionBuildShopHint(event) {
  if (!event?.person) return "背包礼物送对人可一次 +3～4 好感。";
  const person = orionPeople().find((p) => p.id === event.person);
  if (!person) return null;
  const likes = person.likes.filter((n) => orionState.inventory.includes(n));
  if (likes.length) return `${person.name} 喜欢：${likes.join("、")}（已在背包，回去可送）`;
  const shopLikes = person.likes.filter((n) => orionShopItems.some((i) => i.name === n));
  if (shopLikes.length) return `可买给 ${person.name}：${shopLikes.slice(0, 3).join("、")}`;
  return null;
}

function orionBuildContextHint(event) {
  const mode = orionState.sceneMode;
  const lines = [];
  const modeTip = ORION_MODE_HINTS[mode];
  if (modeTip) lines.push({ warn: false, text: modeTip });

  const arc = typeof orionGetSemesterArc === "function" ? orionGetSemesterArc(orionState.week) : null;
  if (arc && mode === "event") lines.push({ warn: false, text: `【${arc.label}】${arc.hint}` });

  if (orionState.breatherMode) {
    lines.push({ warn: false, text: "喘息日：恢复后再进周末考核，不额外扣天数。" });
  }

  if (orionState.routePlan && typeof orionRoutePlans !== "undefined") {
    const plan = orionRoutePlans.find((p) => p.id === orionState.routePlan);
    if (plan && ["event", "map", "reward"].includes(mode)) {
      lines.push({ warn: false, text: `当前策略「${plan.name}」：${plan.style}` });
    }
  }
  if (typeof orionIsPureLoveRoute === "function" && orionIsPureLoveRoute() && mode === "event") {
    lines.push({ warn: false, text: "纯爱线：牵手散步 / 晚安吻 / 谈心推剧情；信任≥6 可开温柔 H" });
  }
  const stage = event?.person && orionState.relationships?.[event.person]
    ? (typeof orionGetRelationStage === "function" ? orionGetRelationStage(orionState.relationships[event.person]) : null)
    : null;
  if (stage?.tip && mode === "event" && event?.person) {
    lines.push({ warn: false, text: `【${stage.label}档】${stage.tip}` });
  }

  if (mode === "map") {
    const mh = orionBuildMapHint();
    if (mh) lines.push({ warn: false, text: mh });
  }

  if (mode === "shop") {
    const sh = orionBuildShopHint(event);
    if (sh) lines.push({ warn: false, text: sh });
  }

  if (mode === "exam") {
    lines.push({ warn: false, text: `学业 ${orionState.study}/14 · 魅力 ${orionState.charm}/14 — 选与你数值匹配的考核方式。` });
  }

  if (mode === "event" && orionEventBeatsRemaining?.() > 0) {
    const left = orionEventBeatsRemaining();
    lines.push({ warn: false, text: `多段对话进行中，还剩 ${left} 段 — 点「继续听她说」推进。` });
  }

  if (event?.person && mode === "event") {
    const rel = orionState.relationships[event.person];
    const person = orionPeople().find((p) => p.id === event.person);
    const stage = typeof orionGetRelationStage === "function" ? orionGetRelationStage(rel) : null;
    if (stage) lines.push({ warn: false, text: `${person?.name}：${stage.label}（${stage.hint}）` });
    const pure = typeof orionIsPureLoveRoute === "function" && orionIsPureLoveRoute();
    const canH = rel.affection >= 5 && (orionState.spark >= 1 || (pure && orionState.trust >= 6));
    if (canH) lines.push({ warn: false, text: pure ? "✓ 可点「温柔缠绵」— 纯爱 H 正文" : "✓ 已满足开 H 条件，可点「带她去做」" });
    else if (rel.affection < 5) lines.push({ warn: false, text: `开 H 还需好感 ${5 - rel.affection}（当前 ${rel.affection}/14）` });
    else if (pure) lines.push({ warn: false, text: "纯爱开 H 还需信任≥6 或性奋≥1" });
    else lines.push({ warn: false, text: "性奋不足：约会/撩骚/边缘亲密/就地发挥可快速提升" });
    if (typeof orionCanAdvanceStory === "function" && orionCanAdvanceStory(event.person, rel)) {
      const ch = (pure && ORION_PURE_STORYLINES?.[event.person]?.[rel.story]) || orionStorylines[event.person][rel.story];
      lines.push({ warn: false, text: pure ? `可推纯爱剧情：${ch?.[0] || "下一幕"}（不耗性奋）` : `可推剧情：${ch?.[0] || "下一幕"}（耗 1 性奋）` });
    }
    const gift = orionState.inventory.find((n) => person?.likes?.includes(n));
    if (gift) lines.push({ warn: false, text: `背包有她喜欢的「${gift}」，送礼物选项会出现` });
    if (orionState.streakPerson === event.person && orionState.streak >= 2) {
      lines.push({ warn: false, text: `连击加成中（×${orionState.streak}），继续攻略她收益更高` });
    }
  }

  if (mode === "adult" && typeof orionGetHPhase === "function") {
    const ph = orionGetHPhase();
    lines.push({ warn: false, text: `当前阶段：${ph.label} — ${ph.hint}` });
  }

  if (mode === "strategy" && event?.person) {
    const used = orionState.strategyUsedToday?.[event.person];
    if (used) lines.push({ warn: true, text: "今日攻略手段已用过，明日刷新" });
  }

  const milestone = orionSemesterMilestones?.[orionState.week];
  if (orionState.day === 1 && milestone) {
    lines.push({ warn: false, text: `本周里程碑：${milestone.title}` });
  }

  orionBuildStatAlerts().forEach((a) => lines.push(a));

  if (orionState.day === 7 && !orionState.breatherMode) {
    lines.push({ warn: false, text: "今日周末：先处理考核/喘息，再进入新周。" });
  }

  return lines.filter(Boolean).slice(0, 6);
}

function orionBuildPersonNextHint(rel, personId) {
  if (typeof orionIsPureLoveRoute === "function" && orionIsPureLoveRoute()) {
    if (rel.affection < 2) return "纯爱：牵手散步 / 约会攒好感";
    if (rel.affection < 5) return "纯爱：晚安吻 + 谈心堆信任";
    if (orionState.trust < 5) return "纯爱：谈心推剧情，信任≥5 更顺";
    if (rel.story < orionStorylines[personId].length) return "纯爱：推纯爱剧情（不耗性奋）";
    if (!rel.clear) return "纯爱：表白确认关系";
    if (rel.scenes.length < orionAdultScenes[personId].length) return "纯爱：温柔 H，缠绵正文";
    return "纯爱：完美结局冲刺（信任≥8）";
  }
  if (rel.affection < 2) return "建议：攻略手册 → 学术/甜食/运动等专属手段";
  if (rel.affection < 5) return "建议：约会+边缘亲密，好感 5 开 H";
  if (orionState.spark < 1) return "建议：撩骚或就地发挥，堆性奋";
  if (rel.story < orionStorylines[personId].length) return "建议：推剧情或特殊玩法";
  if (rel.scenes.length < orionAdultScenes[personId].length) return "建议：开 H 扫剩余场景";
  return "建议：表白/完美结局冲刺";
}

function orionBuildInventoryHtml() {
  if (!orionState.inventory.length) {
    return `<span class="orion-tag muted">空</span><p class="orion-inventory-tip">去情趣店买礼物，送对她喜欢的东西暴涨好感</p>`;
  }
  const tags = orionState.inventory.map((n) => {
    const favFor = orionPeople().filter((p) => p.likes.includes(n)).map((p) => p.name);
    const title = favFor.length ? `${n} — ${favFor.join("、")} 喜欢` : `${n} — 通用礼物`;
    return `<span class="orion-tag" title="${orionEscapeHtml(title)}">${n}${favFor.length ? " ♥" : ""}</span>`;
  }).join("");
  return tags;
}

function orionRenderHintBar(event) {
  const bar = document.getElementById("orion-hint-bar");
  if (!bar) return;
  const hints = orionBuildContextHint(event);
  if (!hints.length) { bar.innerHTML = ""; bar.classList.add("hidden"); return; }
  bar.classList.remove("hidden");
  const hasWarn = hints.some((h) => h.warn);
  bar.classList.toggle("has-warn", hasWarn);
  bar.innerHTML = `<div class="orion-hint-inner">
    <span class="orion-hint-icon" aria-hidden="true">${hasWarn ? "⚠️" : "💡"}</span>
    <div class="orion-hint-lines">${hints.map((h) =>
      `<p class="${h.warn ? "orion-hint-warn" : ""}">${orionEscapeHtml(h.text)}</p>`
    ).join("")}</div>
  </div>`;
}

function orionRenderProgressStrip() {
  const el = document.getElementById("orion-progress-strip");
  if (!el || !orionState) return;
  el.innerHTML = orionBuildProgressChips();
}

function orionRenderStatMeters() {
  const wrap = document.getElementById("orion-stats");
  if (!wrap || !orionState) return;
  wrap.querySelectorAll(".orion-meter").forEach((meter) => {
    const key = meter.dataset.stat;
    const meta = ORION_STAT_META[key];
    if (!meta) return;
    const val = orionState[key] ?? 0;
    const strong = meter.querySelector("strong");
    if (strong) strong.textContent = val;
    const pct = Math.round((val / 14) * 100);
    let fill = meter.querySelector(".orion-meter-fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.className = "orion-meter-fill";
      meter.appendChild(fill);
    }
    fill.style.width = `${pct}%`;
    meter.title = `${meta.label} ${val}/14 — ${meta.tip}`;
    const low = meta.warnLow != null && val <= meta.warnLow;
    const high = meta.warnHigh != null && val >= meta.warnHigh;
    meter.classList.toggle("warn-low", low);
    meter.classList.toggle("warn-high", high);
    meter.classList.toggle("stat-good", key === "spark" && val >= 3);
    meter.classList.toggle("pulse-warn", low || high);
  });
}

function orionRenderInventoryPanel() {
  const el = orionEls?.orion_inventory || document.getElementById("orion-inventory");
  if (!el || !orionState) return;
  el.innerHTML = orionBuildInventoryHtml();
}

function orionRenderGuidePanel(show) {
  const panel = document.getElementById("orion-guide-panel");
  if (!panel) return;
  if (show === false) { panel.classList.add("hidden"); return; }
  if (!panel.dataset.built) {
    panel.innerHTML = `<div class="orion-guide-head">
      <strong>📖 攻略指南</strong>
      <button type="button" id="btn-orion-guide-close" class="btn-ghost-sm">收起</button>
    </div>
    ${ORION_GUIDE_SECTIONS.map((s) => `
      <section class="orion-guide-section">
        <h4>${orionEscapeHtml(s.title)}</h4>
        <ul>${s.lines.map((l) => `<li>${orionEscapeHtml(l)}</li>`).join("")}</ul>
      </section>`).join("")}`;
    panel.dataset.built = "1";
    panel.querySelector("#btn-orion-guide-close")?.addEventListener("click", () => orionRenderGuidePanel(false));
  }
  panel.classList.toggle("hidden", show === false);
  if (show !== false) panel.classList.remove("hidden");
}

function orionMaybeShowFirstGuide() {
  if (!orionState || orionState.uiGuideSeen) return;
  orionState.uiGuideSeen = true;
  orionSaveRun();
  orionRenderGuidePanel(true);
  showToast?.("首次游玩：顶部黄条是情境提示，点「指南」可看完整攻略", 4500);
}

function orionBindChoiceButtonsRich(choices) {
  const enhanced = orionEnhanceChoices(choices);
  orionState._choices = enhanced;
  if (!orionEls.orion_choices) return;
  orionEls.orion_choices.innerHTML = enhanced.map((c, i) => {
    const cat = c._cat || orionChoiceCategory(c.label);
    const meta = ORION_CATEGORY_META[cat] || ORION_CATEGORY_META.default;
    const tip = c.hint ? orionEscapeHtml(c.hint) : "";
    const label = orionEscapeHtml(c.label);
    return `<button type="button" class="orion-choice orion-choice-${cat}" data-i="${i}" title="${tip}">
      <span class="orion-choice-cat">${meta.icon} ${meta.label}</span>
      <span class="orion-choice-main"><strong>${label}</strong>${tip ? `<small>${tip}</small>` : ""}</span>
      <span class="orion-choice-arrow" aria-hidden="true">›</span>
    </button>`;
  }).join("");
}

function orionInitOrionUI() {
  const guideBtn = document.getElementById("btn-orion-guide");
  if (guideBtn && !guideBtn.dataset.orionGuideBound) {
    guideBtn.dataset.orionGuideBound = "1";
    guideBtn.addEventListener("click", () => {
      const panel = document.getElementById("orion-guide-panel");
      const open = panel?.classList.contains("hidden");
      orionRenderGuidePanel(open);
    });
  }
}