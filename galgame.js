/* 蜜语 · 色情 Galgame — 校园攻略 · 地点做爱 · 姿势选项 */

const GAL_MAX_AFFECTION = 100;

const GAL_INTRO_LINES = [
  "樱花道人来人往，{char}却只看向你。",
  "这不是普通校园恋爱——{char}眼神里全是「想要」。",
  "{char}贴近你耳边：「心动之后……哪里都可以做。」",
];

const GAL_CHAR_REACT = {
  warm: [
    "{char}耳根红了，却没躲开你的手。",
    "{char}咬唇看你，眼神又羞又馋。",
    "{char}小声哼了一下，手指攥紧你的衣角。",
    "{char}呼吸乱了，低声说：「你……继续。」",
  ],
  hot: [
    "{char}直接抓住你的手腕往下按，湿意隔着布料都烫手。",
    "{char}喘着骂你混蛋，腰却迎得更狠。",
    "{char}把脸埋进你颈窝，闷哼声全喷在你皮肤上。",
    "{char}眼睛湿了，哑着嗓子求你：「别停……」",
  ],
  deep: [
    "{char}整个人挂在你身上，腿软得站不住，只许你扶着。",
    "{char}夹紧你，里面又热又湿，像要把你吞进去。",
    "{char}哭着咬你肩膀，高潮时闷哼进肉里。",
    "{char}哑着嗓子说：「进来……我受不了了。」",
  ],
};

const GAL_PLAYER_LINES = {
  warm: [
    "你凑近{char}，鼻尖蹭过颈侧，慢慢亲下去。",
    "你握住{char}的手，按在自己胸口，让{char}感受心跳。",
    "你从背后抱住{char}，手掌滑进衣摆，摸到一片滚烫。",
    "你盯着{char}的眼睛，一字一句说：「我想要你。」",
  ],
  hot: [
    "你直接把{char}按在墙上，舌头顶进嘴里搅。",
    "你跪下来，隔着内裤亲吻{char}腿间，舔到{char}腿抖。",
    "你两根手指插进去，弯起来抠那一点，弄到{char}腰弓起来。",
    "你含住{char}最敏感的地方，吸到{char}抓你头发往下按。",
  ],
  deep: [
    "你顶进去，慢慢到底，停三秒再动，每下都顶实。",
    "你从后进入{char}，一手搂腰一手揉前面，顶到床吱呀响。",
    "你让{char}骑上来，掐着腰控节奏，磨到{char}求你快点。",
    "你加速冲刺，顶到最深，弄到{char}整个人抖着高潮。",
  ],
};

const GAL_CHOICE_HINTS = {
  bold: ["直接亲下去", "手伸进衣服里", "把人按墙上", "说最骚的那句", "脱掉一件", "命令不许动"],
  tease: ["故意吊胃口", "只摸不深入", "耳边说脏话", "慢慢脱衣", "眼神勾引", "隔裤磨蹭"],
  shy: ["故作矜持", "假装没听懂", "轻轻推开", "低头不说话", "脸红转过头"],
};

const galRuntime = {
  routeId: null,
  heroineId: null,
  beats: [],
  beatIndex: 0,
  hSceneIndex: null,
  pendingUnlock: null,
  campusLocId: null,
  sexMode: false,
  sexPosition: null,
  sexRound: 0,
  sexPleasure: 0,
  sexMaxRounds: 5,
  postHeroineIntro: false,
  rogueEvent: null,
  sexOutfitConfirmed: false,
};

const GAL_PERSONA_LABELS = {
  cool: "清冷", sweet: "甜软", mature: "御姐", sporty: "辣妹", yandere: "病娇",
};
const GAL_BODY_LABELS = {
  slim: "纤细", petite_curvy: "娇小丰满", tall_curvy: "高挑丰腴", athletic: "健美", pale_slim: "苍白骨感",
};

function galIntensity(aff) {
  if (aff < 25) return "warm";
  if (aff < 60) return "hot";
  return "deep";
}

function ensureGalProfile() {
  if (!profile.galgame) profile.galgame = {};
}

function getGalRoute(id) {
  const story = getErotica(id);
  if (!story) return null;
  const sections = story.sections?.length || 5;
  const step = Math.floor(GAL_MAX_AFFECTION / sections);
  const thresholds = Array.from({ length: sections }, (_, i) => Math.min(GAL_MAX_AFFECTION, (i + 1) * step - 1));
  if (thresholds.length) thresholds[thresholds.length - 1] = GAL_MAX_AFFECTION;
  const heroine = GAL_HEROINE_LIST.map((hid) => getHeroine(hid)).find((h) => h?.routeId === id);
  const campus = heroine ? { role: heroine.role, tag: heroine.tagline, icon: heroine.icon } : null;
  return {
    id: story.id,
    name: story.name,
    icon: heroine?.icon || story.icon,
    tagline: heroine?.tagline || story.tagline,
    color: heroine?.color || story.color || "#d4567a",
    category: story.category || "indoor",
    sections,
    thresholds,
    story,
    campus,
    heroine,
  };
}

function getGalRoutes() {
  return GAL_HEROINE_LIST.map((hid) => {
    const h = getHeroine(hid);
    const r = getGalRoute(h.routeId);
    return r ? { ...r, heroine: h, campus: { role: h.role, tag: h.tagline, icon: h.icon } } : null;
  }).filter(Boolean);
}

function getGalSave(routeId) {
  ensureGalProfile();
  if (!profile.galgame[routeId]) {
    profile.galgame[routeId] = {
      affection: 0, unlocked: [], dates: 0, ending: false,
      conquered: false, sexCount: 0, locDates: {},
    };
  }
  return profile.galgame[routeId];
}

function saveGal() {
  saveProfile();
}

function getGalAffection(routeId) {
  return getGalSave(routeId).affection;
}

function addGalAffection(routeId, delta) {
  const save = getGalSave(routeId);
  const before = save.affection;
  save.affection = Math.max(0, Math.min(GAL_MAX_AFFECTION, save.affection + delta));
  const route = getGalRoute(routeId);
  if (route) {
    route.thresholds.forEach((th, idx) => {
      if (before < th && save.affection >= th && !save.unlocked.includes(idx)) {
        save.unlocked.push(idx);
        galRuntime.pendingUnlock = idx;
      }
    });
  }
  markGalConquered(routeId);
  saveGal();
  return save.affection;
}

function galFill(text, charName) {
  if (!text) return "";
  const player = state.nameB || "你";
  const char = charName || getGalCharName();
  return text
    .replace(/\{char\}/g, char)
    .replace(/\{self\}/g, player)
    .replace(/\{other\}/g, char)
    .replace(/\{A\}/g, state.nameA || "")
    .replace(/\{B\}/g, state.nameB || "");
}

function galPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function galShuffle(arr) {
  const x = [...arr];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

function galCardLine(intensity, type) {
  const pool = CARDS[intensity]?.[type] || CARDS.hot.serve;
  return galFill(galPick(pool), state.nameA);
}

function buildGalChoices(intensity) {
  const types = ["serve", "receive", "sync"];
  const hints = galShuffle([...GAL_CHOICE_HINTS.bold, ...GAL_CHOICE_HINTS.tease, ...GAL_CHOICE_HINTS.shy]);
  const choices = [];
  for (let i = 0; i < 3; i++) {
    const type = types[i % types.length];
    const cardText = galCardLine(intensity, type);
    const isShy = i === 2;
    choices.push({
      text: isShy ? galPick(GAL_CHOICE_HINTS.shy) + "……" : (hints[i] || cardText.slice(0, 20)),
      full: cardText,
      aff: isShy ? (Math.random() < 0.4 ? -3 : 4) : (8 + Math.floor(Math.random() * 10)),
      bold: !isShy && i === 0,
    });
  }
  return choices;
}

function buildGalDateBeats(routeId) {
  const locId = galRuntime.campusLocId || "gate";
  return buildCampusDateBeats(routeId, locId);
}

/* ── 入口：校园开场 ── */

function enterGalgame() {
  orionEnterGame();
}

function startCampusPrologue() {
  galRuntime.beats = buildCampusPrologueBeats();
  galRuntime.beatIndex = 0;
  galRuntime.routeId = null;

  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-toolbar").classList.add("hidden");
  $("#gal-hscene-panel").classList.add("hidden");
  $("#gal-stage").classList.add("gal-stage-campus");

  const char = state.nameA;
  $("#gal-char-title").textContent = getGalUniName();
  $("#gal-char-tag").textContent = `新生季 · 攻略 ${char}`;
  $("#gal-portrait-icon").textContent = "🌸";
  $("#gal-heart-fill").style.width = "0%";
  $("#gal-affection-num").textContent = "♥ 0";
  $("#gal-scene-count").textContent = "校园地图";
  $("#gal-next-hint").textContent = "读完开场进入校园";

  renderGalBeat();
  showScreen("galPlay");
}

function finishCampusPrologue() {
  getGalCampusMeta().campusIntroDone = true;
  saveGal();
  renderGalPickList();
  showScreen("galPick");
  showToast("选择一位女主 · 12周 Roguelike 学期攻略", 3200);
}

function startHeroineRoute(heroineId) {
  const heroine = getHeroine(heroineId);
  if (!heroine) return;
  startNewGalRun(heroineId);
  galRuntime.postHeroineIntro = true;
  galRuntime.beats = buildHeroinePrologue(heroine);
  galRuntime.beatIndex = 0;

  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-toolbar").classList.add("hidden");
  $("#gal-hscene-panel").classList.add("hidden");
  $("#gal-stage").classList.remove("gal-stage-campus");

  document.documentElement.style.setProperty("--gal-accent", heroine.color);
  $("#gal-portrait-icon").textContent = heroine.icon;
  $("#gal-char-title").textContent = heroine.name;
  $("#gal-char-tag").textContent = `${GAL_PERSONA_LABELS[heroine.personality]} · ${GAL_BODY_LABELS[heroine.bodyType]}`;
  updateGalHud();
  renderGalBeat();
  showScreen("galPlay");
}

/* ── 选人 / 校园地图 ── */

function renderGalPickList() {
  const meta = getGalCampusMeta();
  const list = getGalRoutes();
  $("#gal-pick-sub").textContent = `${getGalUniName()} · 五位性格身材各异 · 12周Roguelike · 脱衣换装 · 姿势做爱`;
  $("#gal-list").innerHTML = list.length ? list.map((r) => {
    const h = r.heroine;
    const save = getGalSave(r.id);
    const aff = save.affection;
    const conquered = isGalConquered(r.id);
    const status = conquered
      ? '<span class="gal-cleared">已攻略 · 全地图+换装</span>'
      : (aff >= GAL_CONQUER_AFF - 10 ? '<span class="gal-cleared">即将攻略</span>' : "");
    return `<button class="scene-card gal-route-card gal-heroine-card" data-heroine="${h.id}" style="--scene-accent:${r.color}">
      <span class="scene-icon">${h.icon}</span>
      <div class="scene-body">
        <strong>${h.name} · ${h.role}</strong>
        <em>${h.tagline}</em>
        <p class="gal-heroine-desc">${h.desc}</p>
        <span class="gal-heroine-body">${GAL_PERSONA_LABELS[h.personality]} / ${GAL_BODY_LABELS[h.bodyType]} · ${h.bust}</span>
        <div class="gal-mini-bar"><div class="gal-mini-fill" style="width:${aff}%"></div></div>
        <span class="scene-meta">♥ ${aff} · 学期${save.dates}约 · 做爱${save.sexCount} · 碎片${meta.shards || 0}</span>
        ${status}
      </div>
    </button>`;
  }).join("") : '<p class="scene-empty">暂无女主。</p>';

  $$(".gal-heroine-card").forEach((b) => {
    b.addEventListener("click", () => startHeroineRoute(b.dataset.heroine));
  });
}

function renderGalCampusMap() {
  const routeId = getGalActiveRouteId();
  if (!routeId) { renderGalPickList(); showScreen("galPick"); return; }

  const route = getGalRoute(routeId);
  const heroine = getActiveHeroine();
  const save = getGalSave(routeId);
  const char = getGalCharName();
  const conquered = isGalConquered(routeId);
  const locs = getAllGalLocations(routeId);
  const outfit = getOutfitDef(getActiveSexOutfitId());

  document.documentElement.style.setProperty("--gal-accent", route.color);
  $("#gal-campus-title").textContent = getGalUniName();
  $("#gal-campus-sub").textContent = conquered
    ? `${char} 已攻略 · 任意地点做爱 · 先选穿着再选姿势`
    : `攻略 ${char} ♥${save.affection}/${GAL_CONQUER_AFF} · 每周${GAL_RUN_ENERGY}体力 · 随机事件`;

  $("#gal-campus-char").innerHTML = `
    <span class="gal-campus-char-icon">${heroine?.icon || route.icon}</span>
    <div>
      <strong>${char} · ${heroine?.role || route.name}</strong>
      <div class="gal-mini-bar"><div class="gal-mini-fill" style="width:${save.affection}%"></div></div>
      <em>♥ ${save.affection} · ${outfit.icon} ${outfit.name} · 做爱 ${save.sexCount} · H ${save.unlocked.length}/${route.sections}</em>
    </div>
  `;
  updateRunHud();

  $("#gal-campus-map").innerHTML = locs.map((loc) => {
    const isOff = !!loc.eroticaId;
    const canSex = conquered || (save.affection >= loc.needAff && !loc.needConquer);
    const tag = canSex ? '<span class="gal-loc-tag sex">可做爱</span>' : '<span class="gal-loc-tag date">可约会</span>';
    return `<button class="gal-loc-card" data-loc="${loc.id}" data-off="${isOff ? "1" : "0"}">
      <span class="gal-loc-icon">${loc.icon}</span>
      <strong>${loc.name}</strong>
      <small>${loc.desc}</small>
      ${tag}
    </button>`;
  }).join("");

  $$(".gal-loc-card").forEach((btn) => {
    btn.addEventListener("click", () => onCampusLocClick(btn.dataset.loc, btn.dataset.off === "1"));
  });
}

function onCampusLocClick(locId, isOffCampus) {
  const routeId = getGalActiveRouteId();
  const save = getGalSave(routeId);
  const conquered = isGalConquered(routeId);

  galRuntime.campusLocId = locId;

  if (isOffCampus) {
    const off = GAL_OFFCAMPUS_LOCATIONS.find((l) => l.id === locId);
    if (off?.eroticaId) {
      startGalSex(locId, true);
    }
    return;
  }

  const loc = GAL_CAMPUS_LOCATIONS.find((l) => l.id === locId);
  if (!loc) return;

  if (save.affection < loc.needAff && !conquered) {
    showToast(`好感需 ${loc.needAff}，当前 ${save.affection}`);
    return;
  }

  if (conquered) {
    showCampusLocMenu(loc);
  } else {
    startCampusDate(locId);
  }
}

function showCampusLocMenu(loc) {
  const char = state.nameA;
  $("#gal-campus-modal").classList.remove("hidden");
  $("#gal-campus-modal-title").textContent = loc.name;
  $("#gal-campus-modal-body").innerHTML = `
    <p>${getGalLocAmbient(loc.id, char)}</p>
    <div class="gal-modal-btns">
      <button class="btn-primary" id="gal-modal-sex">🔞 在这里做爱（选姿势）</button>
      <button class="btn-secondary" id="gal-modal-date">💋 约会撩${char}</button>
      <button class="btn-ghost" id="gal-modal-cancel">返回地图</button>
    </div>
  `;
  $("#gal-modal-sex")?.addEventListener("click", () => {
    $("#gal-campus-modal").classList.add("hidden");
    startGalSex(loc.id, false);
  });
  $("#gal-modal-date")?.addEventListener("click", () => {
    $("#gal-campus-modal").classList.add("hidden");
    startCampusDate(loc.id);
  });
  $("#gal-modal-cancel")?.addEventListener("click", () => {
    $("#gal-campus-modal").classList.add("hidden");
  });
}

function startCampusDate(locId) {
  if (!consumeRunEnergy(1)) return;
  galRuntime.campusLocId = locId;
  galRuntime.beats = buildCampusDateBeats(getGalActiveRouteId(), locId);
  galRuntime.beatIndex = 0;

  $("#gal-stage").classList.remove("gal-stage-campus");
  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-toolbar").classList.remove("hidden");
  $("#gal-hscene-panel").classList.add("hidden");

  const loc = GAL_CAMPUS_LOCATIONS.find((l) => l.id === locId);
  const route = getGalRoute(getGalActiveRouteId());
  $("#gal-portrait-icon").textContent = loc?.icon || "🌸";
  updateGalHud();
  renderGalBeat();
  showScreen("galPlay");
}

/* ── 对话节拍 ── */

function updateGalHud() {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  const route = getGalRoute(routeId);
  if (!route) return;
  const save = getGalSave(route.id);
  const char = state.nameA;

  document.documentElement.style.setProperty("--gal-accent", route.color);
  $("#gal-portrait-icon").textContent = route.campus?.icon || route.icon;
  $("#gal-char-title").textContent = `${char} · ${route.campus?.role || route.name}`;
  $("#gal-char-tag").textContent = route.campus?.tag || route.tagline;
  $("#gal-heart-fill").style.width = `${save.affection}%`;
  $("#gal-affection-num").textContent = `♥ ${save.affection}`;
  $("#gal-scene-count").textContent = isGalConquered(routeId)
    ? `做爱 ${save.sexCount} 次`
    : `H ${save.unlocked.length}/${route.sections}`;

  const nextTh = isGalConquered(routeId)
    ? "已攻略 · 全地图可做爱"
    : (route.thresholds.find((th) => save.affection < th) != null
      ? `再 ${route.thresholds.find((th) => save.affection < th) - save.affection} 好感攻略成功`
      : "即将完全攻略");

  $("#gal-next-hint").textContent = nextTh;

  const hBtn = $("#btn-gal-hscene");
  if (hBtn) hBtn.classList.toggle("hidden", save.unlocked.length === 0);
}

function renderGalBeat() {
  const beat = galRuntime.beats[galRuntime.beatIndex];
  if (!beat) {
    if (galRuntime.postHeroineIntro) {
      galRuntime.postHeroineIntro = false;
      renderGalCampusMap();
      showScreen("galCampus");
      showToast(`学期开始 · 攻略 ${getGalCharName()}`, 2800);
      return;
    }
    if (!getGalCampusMeta().campusIntroDone && !galRuntime.routeId) {
      finishCampusPrologue();
      return;
    }
    finishGalDate();
    return;
  }

  const char = getGalCharName();
  $("#gal-speaker").textContent = beat.speaker === "旁白" ? "——" : beat.speaker.replace("{char}", char);
  $("#gal-text").textContent = galFill(beat.text, char);
  if (beat.hint) $("#gal-text").textContent += `\n\n（${beat.hint}）`;

  const choicesEl = $("#gal-choices");
  if (beat.choices?.length) {
    choicesEl.innerHTML = beat.choices.map((c, i) =>
      `<button class="gal-choice${c.bold ? " gal-choice-bold" : ""}" data-i="${i}">
        <span>${c.text}</span>
        <em>${c.aff > 0 ? "+" + c.aff + " ♥" : c.aff + " ♥"}</em>
      </button>`
    ).join("");
    choicesEl.classList.remove("hidden");
    $$(".gal-choice").forEach((btn) => {
      btn.addEventListener("click", () => onGalChoice(+btn.dataset.i));
    });
  } else {
    choicesEl.innerHTML = `<button class="gal-choice gal-choice-continue" id="gal-continue">继续 ▶</button>`;
    choicesEl.classList.remove("hidden");
    $("#gal-continue")?.addEventListener("click", advanceGalBeat);
  }

  updateGalHud();
}

function advanceGalBeat() {
  galRuntime.beatIndex++;
  renderGalBeat();
}

function onGalChoice(idx) {
  const beat = galRuntime.beats[galRuntime.beatIndex];
  const choice = beat?.choices?.[idx];
  if (!choice) return;

  if (choice.action === "sex") {
    if (choice.lust) addRunLust(choice.lust);
    startGalSex(galRuntime.campusLocId || "gate", false);
    return;
  }
  if (choice.action === "date") {
    galRuntime.beats = [];
    galRuntime.beatIndex = 0;
    startCampusDate(galRuntime.campusLocId || "gate");
    return;
  }
  if (choice.action === "outfit") {
    if (choice.outfitUnlock) unlockOutfit(choice.outfitUnlock);
    showWardrobeScreen();
    return;
  }
  if (choice.action === "strip") {
    const heroine = getActiveHeroine();
    const result = stripNextLayer(heroine);
    if (result) {
      addGalAffection(heroine.routeId, result.aff);
      const run = getGalRun();
      if (run) { run.runStripCount++; saveGalRun(); }
      const react = document.createElement("p");
      react.className = "gal-action-flash";
      react.textContent = result.narrative + (result.char ? "\n" + result.char : "");
      $("#gal-text").appendChild(react);
      showToast(`脱掉${result.layer.label} · 好感+${result.aff}`, 2000);
      setTimeout(() => { galRuntime.beatIndex++; renderGalBeat(); }, 1100);
    }
    return;
  }

  const routeId = galRuntime.routeId || getGalActiveRouteId();
  addGalAffection(routeId, choice.aff);
  showToast(choice.aff > 0 ? `好感 +${choice.aff}` : `好感 ${choice.aff}`, 1600);

  if (galRuntime.pendingUnlock != null) {
    const route = getGalRoute(routeId);
    const sec = route.story.sections[galRuntime.pendingUnlock];
    showToast(`🔞 H剧情解锁：${sec?.title || "新场景"}`, 3500);
    galRuntime.pendingUnlock = null;
  }

  const react = document.createElement("p");
  react.className = "gal-action-flash";
  react.textContent = choice.full;
  $("#gal-text").appendChild(react);

  setTimeout(() => {
    galRuntime.beatIndex++;
    renderGalBeat();
  }, 900);
}

function finishGalDate() {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  const save = getGalSave(routeId);
  save.dates++;
  const locId = galRuntime.campusLocId || "gate";
  save.locDates[locId] = (save.locDates[locId] || 0) + 1;

  if (save.unlocked.length >= (getGalRoute(routeId)?.sections || 5)) {
    save.ending = true;
  }
  markGalConquered(routeId);
  saveGal();
  addXP(60);
  profile.gamesPlayed++;
  saveProfile();

  galRuntime.beats = [];
  galRuntime.beatIndex = 0;
  $("#gal-choices").classList.add("hidden");
  $("#gal-speaker").textContent = state.nameA;

  const conquered = isGalConquered(routeId);
  $("#gal-text").textContent = conquered
    ? `约会结束。${state.nameA}眼神湿透，「哪里都可以……选个地方做爱。」`
    : `约会结束。${state.nameA}靠着你喘，好感 ${save.affection}，继续约会或回校园地图。`;

  updateGalHud();
  showToast("约会完成 +60 XP", 2500);

  $("#gal-choices").innerHTML = conquered
    ? `<button class="gal-choice gal-choice-bold" id="gal-to-sex">🔞 就地做爱</button>
       <button class="gal-choice" id="gal-to-map">🗺️ 回校园地图</button>
       <button class="gal-choice" id="gal-more-date">💋 再约会一轮</button>`
    : `<button class="gal-choice gal-choice-bold" id="gal-to-map">🗺️ 回校园地图</button>
       <button class="gal-choice" id="gal-more-date">💋 继续约会</button>
       <button class="gal-choice" id="gal-open-h">🔞 H剧情</button>`;

  $("#gal-choices").classList.remove("hidden");
  $("#gal-to-map")?.addEventListener("click", () => { renderGalCampusMap(); showScreen("galCampus"); });
  $("#gal-more-date")?.addEventListener("click", () => startCampusDate(locId));
  $("#gal-to-sex")?.addEventListener("click", () => startGalSex(locId, false));
  $("#gal-open-h")?.addEventListener("click", () => openGalHSceneList());
}

function startGalRoute(routeId) {
  setGalActiveRoute(routeId);
  renderGalCampusMap();
  showScreen("galCampus");
}

/* ── H 剧情（黄文段落）── */

function openGalHSceneList() {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  const route = getGalRoute(routeId);
  const save = getGalSave(route.id);
  if (!save.unlocked.length) {
    showToast("好感不够，先约会攒 ♥");
    return;
  }

  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-choices").innerHTML = save.unlocked.map((idx) => {
    const sec = route.story.sections[idx];
    return `<button class="gal-choice gal-choice-bold" data-sec="${idx}">
      <span>🔞 ${sec?.title || "场景 " + (idx + 1)}</span>
      <em>剧情</em>
    </button>`;
  }).join("") + `<button class="gal-choice" id="gal-h-back">返回</button>`;

  $("#gal-choices").classList.remove("hidden");
  $$(".gal-choice[data-sec]").forEach((btn) => {
    btn.addEventListener("click", () => enterGalHScene(+btn.dataset.sec));
  });
  $("#gal-h-back")?.addEventListener("click", () => {
    renderGalCampusMap();
    showScreen("galCampus");
  });
}

function enterGalHScene(sectionIndex) {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  const route = getGalRoute(routeId);
  const save = getGalSave(routeId);
  if (!save.unlocked.includes(sectionIndex)) {
    showToast("该场景尚未解锁");
    return;
  }

  galRuntime.hSceneIndex = sectionIndex;
  galRuntime.sexMode = false;
  const sec = route.story.sections[sectionIndex];
  const char = state.nameA;
  const player = state.nameB;

  $("#gal-dialogue-box").classList.add("hidden");
  $("#gal-toolbar").classList.add("hidden");
  $("#gal-hscene-panel").classList.remove("hidden");
  $("#gal-sex-positions").classList.add("hidden");
  $("#gal-sex-pace").classList.add("hidden");
  $("#gal-h-classic").classList.remove("hidden");

  $("#gal-h-title").textContent = `${char} · ${sec.title}`;
  $("#gal-h-stage").textContent = getEroticaStageLabel?.(sectionIndex, route.sections) || "正酣";

  const narrative = typeof formatEroticaNarrative === "function"
    ? formatEroticaNarrative(fillEroticaText(sec.narrative, player, char, state.nameA, state.nameB))
    : `<p>${galFill(sec.narrative, char)}</p>`;
  $("#gal-h-body").innerHTML = narrative;

  refreshGalHAction();
  showScreen("galPlay");
}

function refreshGalHAction() {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  const route = getGalRoute(routeId);
  const idx = galRuntime.hSceneIndex ?? 0;
  const intensity = typeof getEroticaIntensityForSection === "function"
    ? getEroticaIntensityForSection(idx, route.sections)
    : galIntensity(getGalAffection(route.id));
  const player = state.nameB;
  const char = state.nameA;
  const ultra = getGalAffection(route.id) >= 70 || profile.difficulty === "wild";

  const line = typeof drawFantasyCard === "function"
    ? drawFantasyCard(intensity, player, char, state.nameA, state.nameB, { ultra })
    : galCardLine(intensity, "serve");

  $("#gal-h-action").textContent = line;
  $("#gal-h-action-label").textContent = ultra ? "🔥 极限色牌 · 照做" : `🃏 ${INTENSITY_LABELS[intensity] || "火热"} · 照做`;
}

/* ── 交互式做爱：姿势 + 节奏选项 ── */

function startGalSex(locId, isOffCampus) {
  const routeId = getGalActiveRouteId();
  if (!isGalConquered(routeId)) {
    const loc = GAL_CAMPUS_LOCATIONS.find((l) => l.id === locId);
    if (loc && getGalAffection(routeId) < loc.needAff) {
      showToast("好感不够，继续约会");
      return;
    }
  }
  if (!consumeRunEnergy(1)) return;

  galRuntime.sexMode = true;
  galRuntime.campusLocId = locId;
  galRuntime.sexPosition = null;
  galRuntime.sexRound = 0;
  galRuntime.sexPleasure = 0;
  galRuntime.hSceneIndex = null;
  galRuntime.sexOutfitConfirmed = false;

  showGalSexWardrobePhase(isOffCampus);
}

function showGalSexWardrobePhase(isOffCampus) {
  const locId = galRuntime.campusLocId;
  const loc = isOffCampus
    ? GAL_OFFCAMPUS_LOCATIONS.find((l) => l.id === locId)
    : GAL_CAMPUS_LOCATIONS.find((l) => l.id === locId);
  const heroine = getActiveHeroine();
  const char = getGalCharName();

  $("#gal-dialogue-box").classList.add("hidden");
  $("#gal-toolbar").classList.add("hidden");
  $("#gal-hscene-panel").classList.remove("hidden");
  $("#gal-h-classic").classList.add("hidden");
  $("#gal-sex-positions").classList.add("hidden");
  $("#gal-sex-pace").classList.add("hidden");
  $("#gal-wardrobe-panel").classList.remove("hidden");

  $("#gal-h-title").textContent = `${char} · ${loc?.name || "做爱"}`;
  $("#gal-h-stage").textContent = "选择穿着";
  $("#gal-pleasure-fill").style.width = "0%";

  const stripHint = isFullyNaked() ? "已全裸" : `还可脱 ${getRemainingLayers().length} 件`;
  $("#gal-h-body").innerHTML = `<p class="gal-sex-intro">${getGalLocAmbient(locId, char)}</p>
    <p>${getPersonaLine(heroine.personality, "date_hot") || `${char}眼神湿透，等你选她穿什么再做。`}</p>
    <p class="gal-wardrobe-status">${stripHint} · ${getSexOutfitModifier(heroine)}</p>`;

  renderWardrobePicker("#gal-wardrobe-grid", (oid) => {
    $("#gal-h-body .gal-wardrobe-status").textContent = `${stripHint} · ${getSexOutfitModifier(heroine)}`;
  });
  showScreen("galPlay");
}

function confirmSexOutfitAndStart() {
  galRuntime.sexOutfitConfirmed = true;
  const heroine = getActiveHeroine();
  const char = getGalCharName();
  const locId = galRuntime.campusLocId;

  $("#gal-wardrobe-panel").classList.add("hidden");
  $("#gal-sex-positions").classList.remove("hidden");

  $("#gal-h-stage").textContent = `穿着：${getOutfitDef(getActiveSexOutfitId()).name}`;
  const mod = getSexOutfitModifier(heroine);
  $("#gal-h-body").innerHTML = `<p class="gal-sex-intro">${mod}</p>
    <p>${char}摆好姿势：「选个体位……按你喜欢的来。」</p>`;

  renderSexPositionPicker();
  addRunLust(10);
}

function showWardrobeScreen() {
  galRuntime.sexMode = false;
  $("#gal-dialogue-box").classList.add("hidden");
  $("#gal-hscene-panel").classList.remove("hidden");
  $("#gal-wardrobe-panel").classList.remove("hidden");
  $("#gal-sex-positions").classList.add("hidden");
  $("#gal-sex-pace").classList.add("hidden");
  $("#gal-h-classic").classList.add("hidden");
  const heroine = getActiveHeroine();
  $("#gal-h-title").textContent = `${heroine.name} · 换装`;
  $("#gal-h-body").innerHTML = `<p>选择做爱或约会时的穿着，性格不同台词也不同。</p>`;
  renderWardrobePicker("#gal-wardrobe-grid");
  showScreen("galPlay");
}

function renderSexPositionPicker() {
  const grid = $("#gal-sex-positions");
  if (!grid) return;
  grid.innerHTML = Object.entries(GAL_SEX_POSITIONS).map(([id, pos]) =>
    `<button class="gal-pos-btn" data-pos="${id}">
      <span>${pos.icon}</span>
      <em>${pos.label}</em>
    </button>`
  ).join("");

  $$(".gal-pos-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectSexPosition(btn.dataset.pos));
  });
}

function selectSexPosition(posId) {
  galRuntime.sexPosition = posId;
  galRuntime.sexRound = 0;
  $("#gal-wardrobe-panel")?.classList.add("hidden");
  const locId = galRuntime.campusLocId;
  const char = getGalCharName();
  const pos = GAL_SEX_POSITIONS[posId];

  const intro = getSexPositionText(posId, "intro", locId, char);
  $("#gal-h-body").innerHTML = intro.narrative.split(/\n\n+/).map((p) => `<p>${p}</p>`).join("");
  $("#gal-h-stage").textContent = `${pos.label} · 选节奏`;
  $("#gal-sex-positions").classList.add("hidden");
  $("#gal-sex-pace").classList.remove("hidden");

  renderSexPaceChoices();
}

function renderSexPaceChoices() {
  const el = $("#gal-sex-pace");
  if (!el) return;
  el.innerHTML = Object.entries(GAL_SEX_PACE).map(([id, p]) =>
    `<button class="gal-pace-btn" data-pace="${id}">
      <span>${p.icon} ${p.label}</span>
    </button>`
  ).join("");

  $$(".gal-pace-btn").forEach((btn) => {
    btn.addEventListener("click", () => onSexPaceChoice(btn.dataset.pace));
  });
}

function onSexPaceChoice(paceId) {
  if (paceId === "switch") {
    galRuntime.sexRound++;
    $("#gal-sex-pace").classList.add("hidden");
    $("#gal-sex-positions").classList.remove("hidden");
    $("#gal-h-body").innerHTML += `<p>${getGalCharName()}喘着翻个身：「换一个……还要。」</p>`;
    return;
  }

  const posId = galRuntime.sexPosition;
  const locId = galRuntime.campusLocId;
  const char = getGalCharName();
  const heroine = getActiveHeroine();
  const pace = GAL_SEX_PACE[paceId];

  const base = getSexPositionText(posId, paceId, locId, char);
  const persona = getPersonaSexLine(heroine, paceId);
  const bodyLine = getBodyFlavor(heroine.bodyType, "sex");
  const outfitMod = getOutfitDef(getActiveSexOutfitId()).sexModifier || "";

  const narrative = [base.narrative, galFill(bodyLine, char), outfitMod].filter(Boolean).join("\n");
  const charLine = persona.char || base.char;

  galRuntime.sexRound++;
  galRuntime.sexPleasure = Math.min(100, galRuntime.sexPleasure + pace.pleasure);
  addRunLust(Math.floor(pace.pleasure / 2));

  const body = $("#gal-h-body");
  const block = document.createElement("div");
  block.className = "gal-sex-beat";
  block.innerHTML = `
    <p class="gal-sex-narr">${narrative}</p>
    <p class="gal-sex-char">${charLine}</p>
    <span class="gal-sex-pace-tag">${pace.icon} ${pace.label} · ${getOutfitDef(getActiveSexOutfitId()).name}</span>
  `;
  body.appendChild(block);
  block.scrollIntoView({ behavior: "smooth", block: "end" });

  $("#gal-pleasure-fill").style.width = `${galRuntime.sexPleasure}%`;
  $("#gal-h-stage").textContent = `快感 ${galRuntime.sexPleasure}% · 第 ${galRuntime.sexRound} 轮`;

  if (galRuntime.sexPleasure >= 85 || galRuntime.sexRound >= galRuntime.sexMaxRounds) {
    playSexClimax();
    return;
  }

  renderSexPaceChoices();
}

function playSexClimax() {
  const posId = galRuntime.sexPosition;
  const locId = galRuntime.campusLocId;
  const char = getGalCharName();
  const heroine = getActiveHeroine();
  const climax = getSexPositionText(posId, "climax", locId, char);
  const persona = getPersonaSexLine(heroine, "climax");

  const body = $("#gal-h-body");
  const block = document.createElement("div");
  block.className = "gal-sex-beat gal-sex-climax";
  block.innerHTML = `
    <p class="gal-sex-narr">${climax.narrative}</p>
    <p class="gal-sex-char">${persona.char || climax.char}</p>
    <span class="gal-sex-pace-tag">💦 高潮 · ${getOutfitDef(getActiveSexOutfitId()).name}</span>
  `;
  body.appendChild(block);
  block.scrollIntoView({ behavior: "smooth" });

  $("#gal-sex-pace").innerHTML = `
    <button class="gal-pace-btn gal-pace-done" id="gal-sex-finish">💦 射完了 · 结束</button>
    <button class="gal-pace-btn" id="gal-sex-again">🔄 换姿势再来一轮</button>
  `;
  $("#gal-sex-finish")?.addEventListener("click", completeGalSex);
  $("#gal-sex-again")?.addEventListener("click", () => {
    galRuntime.sexPleasure = 30;
    galRuntime.sexRound = 0;
    $("#gal-pleasure-fill").style.width = "30%";
    $("#gal-sex-positions").classList.remove("hidden");
    $("#gal-sex-pace").classList.add("hidden");
    body.innerHTML += `<p class="gal-sex-intro">${char}手指勾你下巴：「还没够……再来。」</p>`;
  });

  galRuntime.sexPleasure = 100;
  $("#gal-pleasure-fill").style.width = "100%";
  $("#gal-h-stage").textContent = "高潮";
}

function completeGalSex() {
  const routeId = getGalActiveRouteId();
  const save = getGalSave(routeId);
  const run = getGalRun();
  save.sexCount++;
  if (run) { run.runSexCount++; run.lust = Math.min(100, (run.lust || 0) + 15); saveGalRun(); }
  addGalAffection(routeId, 8);
  addXP(100);
  addHeat?.(20);
  saveGal();
  $("#gal-wardrobe-panel")?.classList.add("hidden");

  exitGalSex();
  showToast(`做爱完成 +100 XP · 好感 +8 · 累计 ${save.sexCount} 次`, 3000);

  if (save.ending && save.sexCount >= 5) {
    $("#end-emoji").textContent = getActiveHeroine()?.icon || "💋";
    $("#end-title").textContent = `${getGalCharName()} · 校园情人`;
    $("#end-rank").textContent = getGalUniName();
    $("#end-stats").textContent = `好感 ${save.affection} · 做爱 ${save.sexCount} 次 · 全地图征服`;
    $("#end-message").textContent = "从樱花道到校外酒店，你们把能做的姿势都做遍了。今晚继续？";
    $("#end-xp").textContent = "+100 XP";
    showScreen("end");
  }
}

function completeGalHScene() {
  const routeId = galRuntime.routeId || getGalActiveRouteId();
  addGalAffection(routeId, 5);
  addXP(80);
  addHeat?.(15);
  showToast("H 剧情完成 +80 XP · 好感 +5", 2800);
  exitGalHScene();
}

function exitGalSex() {
  galRuntime.sexMode = false;
  galRuntime.sexPosition = null;
  $("#gal-hscene-panel").classList.add("hidden");
  $("#gal-wardrobe-panel")?.classList.add("hidden");
  renderGalCampusMap();
  showScreen("galCampus");
}

function exitGalHScene() {
  $("#gal-hscene-panel").classList.add("hidden");
  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-toolbar").classList.remove("hidden");
  galRuntime.hSceneIndex = null;
  renderGalCampusMap();
  showScreen("galCampus");
}

function initGalgame() {
  $("#btn-gal-pick-back")?.addEventListener("click", () => showScreen("hub"));
  $("#btn-gal-campus-back")?.addEventListener("click", () => showScreen("hub"));
  $("#btn-gal-campus-chars")?.addEventListener("click", () => {
    renderGalPickList();
    showScreen("galPick");
  });
  $("#btn-gal-campus-story")?.addEventListener("click", () => {
    galRuntime.routeId = getGalActiveRouteId();
    openGalHSceneList();
    showScreen("galPlay");
    $("#gal-dialogue-box").classList.remove("hidden");
  });

  $("#btn-gal-play-back")?.addEventListener("click", () => {
    if (galRuntime.sexMode) {
      if (confirm("退出做爱场景？")) exitGalSex();
      return;
    }
    if (galRuntime.hSceneIndex != null) {
      if (confirm("退出 H 剧情？")) exitGalHScene();
      return;
    }
    if (!getGalCampusMeta().campusIntroDone) {
      showScreen("hub");
      return;
    }
    renderGalCampusMap();
    showScreen("galCampus");
  });

  $("#btn-gal-hscene")?.addEventListener("click", () => openGalHSceneList());
  $("#btn-gal-date")?.addEventListener("click", () => {
    startCampusDate(galRuntime.campusLocId || "gate");
  });
  $("#btn-gal-h-refresh")?.addEventListener("click", () => refreshGalHAction());
  $("#btn-gal-h-done")?.addEventListener("click", () => completeGalHScene());
  $("#btn-gal-h-exit")?.addEventListener("click", () => {
    if (galRuntime.sexMode) {
      if (confirm("退出做爱？进度已保存。")) exitGalSex();
    } else if (confirm("退出 H 场景？")) exitGalHScene();
  });
  $("#btn-gal-wardrobe-confirm")?.addEventListener("click", () => confirmSexOutfitAndStart());
  $("#btn-gal-wardrobe-strip")?.addEventListener("click", () => {
    const heroine = getActiveHeroine();
    const r = stripNextLayer(heroine);
    if (r) {
      addGalAffection(heroine.routeId, r.aff);
      $("#gal-h-body .gal-wardrobe-status").textContent = getSexOutfitModifier(heroine);
      showToast(r.narrative.slice(0, 40) + "…", 2500);
    } else showToast("已经脱光");
  });
  $("#btn-gal-end-week")?.addEventListener("click", () => {
    if (confirm("结束本周？将触发随机事件并进入下一周。")) endGalWeek();
  });
  $("#btn-gal-wardrobe-open")?.addEventListener("click", () => showWardrobeScreen());
}