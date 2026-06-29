const state = {
  nameA: "", nameB: "", playStyle: "campaign", intensity: "hot", mode: "cards",
  chapterIndex: 0, roundInChapter: 0, isBossRound: false, chapterSkips: 0,
  lustA: 0, lustB: 0, currentPlayer: 0, deck: [], currentCard: null, flipped: false,
  completed: 0, skipped: 0, round: 0, heat: 0, streak: 0, scoreA: 0, scoreB: 0, totalStars: 0,
  forceIntensity: null, mustComplete: false, timerId: null, timerLeft: 0,
  wheelSpinning: false, choicePicked: null,
  pkRound: 0, pkMaxRounds: PK_CONFIG.rounds, challengeId: null, challengeRound: 0, challengeMax: 0,
  dailyMod: null, activeEvent: null, scoreMult: 1, lustMult: 1, noSkip: false,
  forceMode: null, pendingPkJudge: false, eventsTriggered: 0, usedShield: false,
  recentCardTexts: [], recentScenarioTexts: [],
  sceneId: null, selectedSceneId: null, storyStages: [], storyData: null,
  stageIndex: 0, stageRoundIndex: 0,
  eroticaId: null, eroticaData: null, eroticaSectionIndex: 0, eroticaPlayVariant: 0, midnightRush: false,
};

const SAVE_KEY = "miyu-run-v2";
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const screens = {
  welcome: $("#screen-welcome"), hub: $("#screen-hub"), sync: $("#screen-sync"),
  challengePick: $("#screen-challenge-pick"), scenePick: $("#screen-scene-pick"),
  eroticaPick: $("#screen-erotica-pick"), eroticaRead: $("#screen-erotica-read"),
  galOrion: $("#screen-gal-orion"),
  galCampus: $("#screen-gal-campus"),
  galPick: $("#screen-gal-pick"), galPlay: $("#screen-gal-play"),
  freePick: $("#screen-free-pick"),
  chapter: $("#screen-chapter"), game: $("#screen-game"), chapterClear: $("#screen-chapter-clear"),
  end: $("#screen-end"), achievements: $("#screen-achievements"), editor: $("#screen-editor"),
};
const panels = { cards: $("#panel-cards"), dice: $("#panel-dice"), wheel: $("#panel-wheel"), mystery: $("#panel-mystery") };

function showScreen(n, silent) {
  Object.values(screens).forEach((s) => s?.classList.remove("active"));
  screens[n]?.classList.add("active");
  document.body.classList.toggle("in-game", n === "game");
  if (!silent && RoomSync.isHost()) broadcastSync();
}

function showPanel(m) { Object.values(panels).forEach((p) => p?.classList.remove("active")); panels[m]?.classList.add("active"); }
function shuffle(a) { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

function getDiff() { return DIFFICULTIES[profile.difficulty] || DIFFICULTIES.normal; }
function isCampaign() { return state.playStyle === "campaign"; }
function isPk() { return state.playStyle === "pk"; }
function isDaily() { return state.playStyle === "daily"; }
function isChallenge() { return state.playStyle === "challenge"; }
function isCustom() { return state.playStyle === "custom"; }
function isFree() { return state.playStyle === "free"; }
function isStory() { return state.playStyle === "story"; }
function isErotica() { return state.playStyle === "erotica"; }
function isStructured() { return isCampaign() || isPk() || isDaily() || isChallenge() || isStory() || isErotica(); }

function getCurrentStoryStage() {
  return state.storyStages?.[state.stageIndex];
}

function isSecretUnlocked() {
  return profile.level >= SECRET_CHAPTER_UNLOCK.minLevel &&
    (profile.campaignClearsForSecret || 0) >= SECRET_CHAPTER_UNLOCK.needClear;
}

function getMaxChapterIndex() {
  return isSecretUnlocked() ? CAMPAIGN.chapters.length - 1 : CAMPAIGN.chapters.length - 2;
}

function getChapter() { return CAMPAIGN.chapters[state.chapterIndex]; }

function getChapterBoss() {
  const ch = getChapter();
  if (ch.bosses?.length) return pick(ch.bosses);
  return ch.boss;
}

function getActiveScreen() {
  return Object.entries(screens).find(([, el]) => el?.classList.contains("active"))?.[0] || "hub";
}

function buildSyncPayload() {
  return {
    screen: getActiveScreen(),
    playStyle: state.playStyle, mode: state.mode, intensity: getIntensity(),
    chapterIndex: state.chapterIndex, roundInChapter: state.roundInChapter, isBossRound: state.isBossRound,
    scoreA: state.scoreA, scoreB: state.scoreB, lustA: state.lustA, lustB: state.lustB,
    heat: state.heat, streak: state.streak, currentPlayer: state.currentPlayer, flipped: state.flipped,
    cardLabel: $("#card-label")?.textContent || "",
    cardText: $("#card-text")?.textContent || "",
    cardFor: $("#card-for")?.textContent || "",
    diceResult: $("#dice-result")?.textContent || "",
    wheelResult: $("#wheel-result")?.textContent || "",
    mysteryResult: $("#mystery-result")?.textContent || "",
    panel: state.mode, timerLeft: state.timerLeft,
    playerName: $("#current-player")?.textContent || "",
    turnLabel: $(".turn-label")?.textContent || "",
    counter: $("#card-counter")?.textContent || "",
    doneDisabled: $("#btn-done")?.disabled,
    skipDisabled: $("#btn-skip")?.disabled,
    pkJudgeShow: $("#pk-judge")?.classList.contains("show"),
    eventBanner: $("#event-banner")?.classList.contains("hidden") ? "" : ($("#event-banner")?.textContent || ""),
    wheelDeg: $("#wheel-disk")?.dataset.deg || "0",
    mysteryPicked: state.mysteryPicked,
    mysteryTexts: state.mysteryOptions?.map((o) => interpolate(o.text)) || [],
    chapterIcon: $("#chapter-icon")?.textContent || "",
    chapterTitle: $("#chapter-title")?.textContent || "",
    chapterDesc: $("#chapter-desc")?.textContent || "",
    chapterRounds: $("#chapter-rounds")?.textContent || "",
    chapterIntensity: $("#chapter-intensity")?.textContent || "",
    clearStars: $("#clear-stars")?.textContent || "",
    clearTitle: $("#clear-title")?.textContent || "",
    clearStats: $("#clear-stats")?.textContent || "",
    clearMsg: $("#clear-msg")?.textContent || "",
    nextChapterLabel: $("#btn-next-chapter")?.textContent || "",
    endEmoji: $("#end-emoji")?.textContent || "",
    endTitle: $("#end-title")?.textContent || "",
    endRank: $("#end-rank")?.textContent || "",
    endStats: $("#end-stats")?.textContent || "",
    endMessage: $("#end-message")?.textContent || "",
    endXp: $("#end-xp")?.textContent || "",
  };
}

function applySyncState(p) {
  RoomSync._applying = true;
  state.playStyle = p.playStyle; state.mode = p.mode;
  state.chapterIndex = p.chapterIndex; state.roundInChapter = p.roundInChapter;
  state.isBossRound = p.isBossRound; state.scoreA = p.scoreA; state.scoreB = p.scoreB;
  state.lustA = p.lustA; state.lustB = p.lustB; state.heat = p.heat; state.streak = p.streak;
  state.currentPlayer = p.currentPlayer; state.flipped = p.flipped;
  state.mysteryPicked = p.mysteryPicked ?? state.mysteryPicked;
  if (p.screen && screens[p.screen]) showScreen(p.screen, true);
  if (p.chapterTitle) {
    $("#chapter-icon").textContent = p.chapterIcon || "";
    $("#chapter-title").textContent = p.chapterTitle;
    $("#chapter-desc").textContent = p.chapterDesc || "";
    $("#chapter-rounds").textContent = p.chapterRounds || "";
    $("#chapter-intensity").textContent = p.chapterIntensity || "";
  }
  if (p.screen === "chapterClear") {
    $("#clear-stars").textContent = p.clearStars || "";
    $("#clear-title").textContent = p.clearTitle || "";
    $("#clear-stats").textContent = p.clearStats || "";
    $("#clear-msg").textContent = p.clearMsg || "";
    if (p.nextChapterLabel) $("#btn-next-chapter").textContent = p.nextChapterLabel;
  }
  if (p.screen === "end") {
    $("#end-emoji").textContent = p.endEmoji || "";
    $("#end-title").textContent = p.endTitle || "";
    $("#end-rank").textContent = p.endRank || "";
    $("#end-stats").textContent = p.endStats || "";
    $("#end-message").textContent = p.endMessage || "";
    $("#end-xp").textContent = p.endXp || "";
  }
  showPanel(p.panel || "cards");
  $("#current-player").textContent = p.playerName || "";
  $(".turn-label").textContent = p.turnLabel || "";
  $("#card-counter").textContent = p.counter || "";
  $("#card-label").textContent = p.cardLabel || "";
  $("#card-text").textContent = p.cardText || "";
  $("#card-for").textContent = p.cardFor || "";
  $("#dice-result").textContent = p.diceResult || "";
  $("#wheel-result").textContent = p.wheelResult || "";
  $("#mystery-result").textContent = p.mysteryResult || "";
  $("#card").classList.toggle("flipped", !!p.flipped);
  $("#btn-done").disabled = !!p.doneDisabled;
  $("#btn-skip").disabled = !!p.skipDisabled;
  if (p.wheelDeg && $("#wheel-disk")) {
    $("#wheel-disk").style.transform = `rotate(${p.wheelDeg}deg)`;
    $("#wheel-disk").dataset.deg = p.wheelDeg;
  }
  if (p.mysteryTexts?.length) {
    $$(".mystery-card").forEach((el, i) => {
      el.classList.toggle("revealed", !!p.mysteryTexts[i]);
      el.classList.toggle("picked", p.mysteryPicked === i);
      el.querySelector(".mystery-front").textContent = p.mysteryTexts[i] || "";
    });
  }
  if (p.eventBanner) {
    $("#event-banner").textContent = p.eventBanner;
    $("#event-banner").classList.remove("hidden");
  } else {
    $("#event-banner").classList.add("hidden");
  }
  $("#pk-judge").classList.toggle("show", !!p.pkJudgeShow);
  if (p.timerLeft > 0) startTimer(p.timerLeft, true);
  else if (!p.timerLeft) stopTimer();
  updateHUD();
  RoomSync._applying = false;
}

function broadcastSync() {
  RoomSync.broadcast();
}
function getIntensity() {
  if (state.dailyMod?.intensity) return state.dailyMod.intensity;
  if (isCampaign()) return getChapter().intensity;
  return state.forceIntensity || state.intensity;
}

function getPlayerName(i) { return i === 0 ? state.nameA : state.nameB; }

function interpolate(text) {
  const self = getPlayerName(state.currentPlayer), other = getPlayerName(1 - state.currentPlayer);
  return text.replace(/\{self\}/g, self).replace(/\{other\}/g, other)
    .replace(/\{A\}/g, state.nameA).replace(/\{B\}/g, state.nameB).replace(/\{time\}/g, state.timerLeft || 60);
}

function vibrate(p) { if (navigator.vibrate) navigator.vibrate(p); }

function showToast(msg, ms = 2800) {
  const el = $("#toast"); el.textContent = msg; el.classList.add("show");
  clearTimeout(showToast._t); showToast._t = setTimeout(() => el.classList.remove("show"), ms);
}

function renderHubProfile() {
  $("#hub-level").textContent = profile.level;
  const need = xpForLevel(profile.level + 1);
  const pct = Math.min(100, (profile.xp / need) * 100);
  $("#hub-xp-fill").style.width = `${pct}%`;
  $("#hub-xp-text").textContent = `${profile.xp} / ${need} XP`;
  $("#btn-hub-diff").textContent = getDiff().label;
}

function getSecretUnlockHint() {
  if (isSecretUnlocked()) return "✨ 隐藏章「神话之夜」已解锁，通关第九章后可进入";
  const needLv = SECRET_CHAPTER_UNLOCK.minLevel;
  const needClear = SECRET_CHAPTER_UNLOCK.needClear;
  const clears = profile.campaignClearsForSecret || 0;
  const parts = [];
  if (profile.level < needLv) parts.push(`升至 Lv.${needLv}（当前 Lv.${profile.level}）`);
  if (clears < needClear) parts.push(`通关闯关 ${needClear} 次（当前 ${clears}/${needClear}）`);
  return `🔒 隐藏章解锁条件：${parts.join("，且 ")}`;
}

function renderHub() {
  $("#hub-names").textContent = `${state.nameA} ♥ ${state.nameB}`;
  renderHubProfile();
  const daily = getDailyChallenge();
  $("#daily-hint").textContent = daily.done ? "今日已完成 ✓" : daily.mod.name;
  $("#btn-continue").classList.toggle("hidden", !hasSave());
  $("#toggle-voice").checked = profile.voiceEnabled !== false;
  $("#toggle-custom").checked = profile.useCustomCards;
  const secretOk = isSecretUnlocked();
  $("#campaign-hint").textContent = secretOk ? "9章+隐藏章 · 多结局" : "9章闯关 · 多结局";
  $("#secret-unlock-hint").textContent = getSecretUnlockHint();
  $("#secret-unlock-hint").classList.toggle("unlocked", secretOk);
}

function renderAchievements() {
  $("#ach-count").textContent = `${profile.achievements.length}/${ACHIEVEMENTS.length}`;
  $("#ach-list").innerHTML = ACHIEVEMENTS.map((a) => {
    const ok = profile.achievements.includes(a.id);
    return `<div class="ach-item ${ok ? "unlocked" : ""}"><span class="ach-icon">${a.icon}</span><div><strong>${a.name}</strong><small>${a.desc} · +${a.xp}XP</small></div>${ok ? "✓" : ""}</div>`;
  }).join("");
}

function renderEditor() {
  $("#editor-mix").checked = profile.useCustomCards;
  $("#editor-list").innerHTML = customCards.length ? customCards.map((c) =>
    `<div class="editor-item"><span class="badge">${INTENSITY_LABELS[c.intensity]} ${CARD_TYPES[c.type].label}</span><p>${c.text}</p><button data-del="${c.id}" class="btn-del">删</button></div>`
  ).join("") : '<p class="empty-hint">还没有自定义卡牌</p>';
  $$(".btn-del").forEach((b) => b.addEventListener("click", () => { deleteCustomCard(b.dataset.del); renderEditor(); }));
}

function renderItems() {
  const bar = $("#items-bar");
  if (!profile.inventory.length) { bar.innerHTML = ""; return; }
  bar.innerHTML = profile.inventory.map((inv, i) => {
    const item = ITEMS.find((x) => x.id === inv.id);
    return item ? `<button class="item-btn" data-idx="${i}" title="${item.desc}">${item.icon}</button>` : "";
  }).join("");
  $$(".item-btn").forEach((b) => b.addEventListener("click", () => activateItem(Number(b.dataset.idx))));
}

function saveGame() {
  if (!isCampaign()) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    nameA: state.nameA, nameB: state.nameB, chapterIndex: state.chapterIndex,
    roundInChapter: state.roundInChapter, isBossRound: state.isBossRound, chapterSkips: state.chapterSkips,
    lustA: state.lustA, lustB: state.lustB, scoreA: state.scoreA, scoreB: state.scoreB, totalStars: state.totalStars,
    currentPlayer: state.currentPlayer, completed: state.completed, skipped: state.skipped, streak: state.streak, heat: state.heat,
  }));
}

function loadGame() {
  try {
    const d = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!d) return false;
    Object.assign(state, d); state.playStyle = "campaign"; state.deck = [];
    return true;
  } catch { return false; }
}

function hasSave() { return !!localStorage.getItem(SAVE_KEY); }
function clearSave() { localStorage.removeItem(SAVE_KEY); }

function updateCampaignHUD() {
  const hud = $("#campaign-hud");
  const show = isCampaign() || isPk() || isDaily() || isChallenge() || isStory();
  hud.classList.toggle("hidden", !show);
  if (!show) return;
  $("#lust-name-a").textContent = state.nameA;
  $("#lust-name-b").textContent = state.nameB;
  $("#lust-a").style.width = `${state.lustA}%`;
  $("#lust-b").style.width = `${state.lustB}%`;
}

function updateHUD() {
  $("#intensity-badge").textContent = INTENSITY_LABELS[getIntensity()];
  if (isCampaign()) {
    const ch = getChapter(), tag = state.isBossRound ? "Boss" : getCampaignRound()?.tag || "";
    $("#mode-badge").textContent = `${ch.icon} ${tag}`;
    const total = ch.rounds.length;
    $("#card-counter").textContent = `第${state.chapterIndex + 1}章 · ${state.isBossRound ? "Boss" : `${state.roundInChapter + 1}/${total}`}`;
    $("#btn-settings").style.visibility = "hidden";
  } else if (isPk()) {
    $("#mode-badge").textContent = `⚔️ PK ${state.pkRound + 1}/${state.pkMaxRounds}`;
    $("#card-counter").textContent = `目标 ${PK_CONFIG.winScore} 分`;
    $("#btn-settings").style.visibility = "hidden";
  } else if (isDaily()) {
    $("#mode-badge").textContent = `📅 ${state.dailyMod?.name || "每日"}`;
    $("#card-counter").textContent = `第 ${state.round + 1}/${state.challengeMax}`;
    $("#btn-settings").style.visibility = "hidden";
  } else if (isChallenge()) {
    const p = CHALLENGE_PRESETS[state.challengeId];
    const r = state.challengeRounds?.[state.challengeRound];
    $("#mode-badge").textContent = `${p?.icon || "🎯"} ${r?.tag || p?.label || "挑战"}`;
    $("#card-counter").textContent = `${p?.label || "挑战"} · ${state.challengeRound + 1}/${state.challengeMax}`;
    $("#btn-settings").style.visibility = "hidden";
  } else if (isStory()) {
    const scene = state.storyData;
    const st = getCurrentStoryStage();
    const r = getCampaignRound();
    $("#mode-badge").textContent = `${scene?.icon || "📖"} ${r?.tag || st?.stageName || "剧情"}`;
    $("#card-counter").textContent = `${scene?.name || "场景"} · 第${state.stageIndex + 1}幕 ${state.stageRoundIndex + 1}/${st?.rounds?.length || "?"}`;
    $("#btn-settings").style.visibility = "hidden";
  } else {
    $("#mode-badge").textContent = `${GAME_MODES[state.mode].icon} ${GAME_MODES[state.mode].label}`;
    $("#card-counter").textContent = isCustom() ? `自定义 · 第${state.round}张` : `第${state.round}张 · 剩${state.deck.length}`;
    $("#btn-settings").style.visibility = "visible";
  }
  $("#heat-fill").style.width = `${state.heat}%`;
  $("#heat-label").textContent = state.heat >= 100 ? "情欲满溢" : `热度 ${state.heat}%`;
  $("#score-a").textContent = state.scoreA;
  $("#score-b").textContent = state.scoreB;
  $("#streak-badge").textContent = state.streak >= 2 ? `连击×${state.streak}` : "";
  $("#streak-badge").style.display = state.streak >= 2 ? "inline" : "none";
  updateCampaignHUD();
  renderItems();
}

function addLust(player, amount) {
  const m = amount * state.lustMult * getDiff().lustMult;
  if (player === 0) state.lustA = Math.min(100, state.lustA + m);
  else state.lustB = Math.min(100, state.lustB + m);
  updateCampaignHUD();
  if (state.lustA >= 100 && state.lustB >= 100) unlockAchievement("lust100");
}

function addHeat(n) { state.heat = Math.min(100, state.heat + n); updateHUD(); if (state.heat >= 100) showToast(`情欲满溢 · ${interpolate(pick(BONUS_CARDS))}`, 5000), state.heat = 0; }
function addScore(p, pts) {
  const v = Math.round(pts * state.scoreMult * getDiff().scoreMult);
  if (p === 0) state.scoreA += v; else state.scoreB += v;
  updateHUD();
}

function getCampaignRound() {
  if (isFree() || isCustom()) return null;
  if (state.isBossRound) return { mode: "boss" };
  if (isDaily()) return state.dailyRounds[state.roundInChapter];
  if (isChallenge()) {
    return state.challengeRounds?.[state.challengeRound] || { mode: "cards", tag: "挑战", brief: "完成本关。" };
  }
  if (isStory()) {
    const st = getCurrentStoryStage();
    return st?.rounds?.[state.stageRoundIndex] || { mode: "scenario", tag: "剧情", brief: "跟随故事。" };
  }
  if (isPk()) return { mode: pick(["cards", "dice", "mystery", "wheel"]), tag: "PK" };
  return getChapter().rounds[state.roundInChapter];
}

function drawScenarioCard(forcedKind) {
  const round = getCampaignRound();
  const kinds = ["roleplay", "dare", "whisper", "confess"];
  const weights = state.dailyMod?.scenarioBias ? [3, 3, 2, 1] : [2, 2, 2, 1];
  const pool = [];
  kinds.forEach((k, i) => { for (let j = 0; j < weights[i]; j++) pool.push(k); });
  const kind = forcedKind || round?.scenarioKind || state.dailyMod?.scenarioKind
    || (state.activeEvent?.id === "roleplay_burst" ? "roleplay" : pick(pool));
  let text = round?.text;
  if (!text && kind === "dare" && (isChallenge() || isDaily()) && CHALLENGE_DARES?.length) {
    text = pick(CHALLENGE_DARES);
  }
  if (!text) text = pickScenario(kind);
  return { kind, type: "sync", text };
}

function drawCampaignCard() {
  if (state.isBossRound) {
    const boss = getChapterBoss();
    return { kind: "boss", type: "sync", text: boss.text, title: boss.title };
  }
  if (isChallenge() || isDaily() || isStory()) {
    const round = getCampaignRound();
    if (round?.text && round.mode !== "scenario") {
      return { kind: round.kind || "normal", type: round.type || "sync", text: round.text };
    }
    if (round?.mode === "scenario" || round?.scenarioKind) return drawScenarioCard(round.scenarioKind);
  }
  if (state.mode === "scenario" || state.activeEvent?.id === "roleplay_burst") return drawScenarioCard();
  const intensity = getIntensity();
  if (isCustom()) {
    const all = customCards.filter((c) => c.intensity === intensity);
    if (!all.length) return { kind: "normal", type: "sync", text: "先添加自定义卡牌" };
    const c = pick(all);
    return { kind: "normal", type: c.type, text: c.text };
  }
  if (state.activeEvent?.id === "type_lock") {
    const type = pick(["serve", "receive"]);
    return { kind: "normal", type, text: pickCardText(intensity, type) };
  }
  const round = getCampaignRound();
  const syncHeavy = state.activeEvent?.id === "sync_only"
    || (isDaily() && (state.dailyMod?.syncBias || round?.syncBias))
    || (isCampaign() && round?.mode === "cards" && getChapter().id === 5);
  const type = syncHeavy ? (Math.random() < 0.75 ? "sync" : pick(["serve", "receive", "sync"])) : pick(["serve", "receive", "sync"]);
  return { kind: "normal", type, text: pickCardText(intensity, type) };
}

function buildScenarioDeck() {
  const intensity = getIntensity();
  const entries = [];
  const sceneId = state.selectedSceneId;
  if (sceneId && SCENE_CATALOG?.[sceneId]) {
    SCENE_CATALOG[sceneId].stages.forEach((st) => {
      st.rounds.forEach((r) => entries.push({ kind: r.kind, type: "sync", text: r.text }));
    });
    return shuffle(entries);
  }
  const pack = SCENARIO_PACKS?.[intensity] || SCENARIO_PACKS.hot;
  Object.entries(pack).forEach(([kind, lines]) => {
    lines.forEach((text) => entries.push({ kind, type: "sync", text }));
  });
  return shuffle(entries);
}

function buildDeck() {
  const intensity = getIntensity() || "hot";
  const pool = CARDS[intensity] || CARDS.hot;
  if (!pool) return [];
  const entries = [];
  for (const [type, items] of Object.entries(pool)) items.forEach((text) => entries.push({ kind: "normal", type, text }));
  const spec = SPECIAL_CARDS;
  spec.timer.items[intensity].forEach((text) => entries.push({ kind: "timer", type: "serve", text, seconds: pick([45, 60, 90, 120]) }));
  spec.choice.items[intensity].forEach((c) => entries.push({ kind: "choice", type: "sync", choice: c }));
  ["roleplay", "dare", "whisper"].forEach((kind) => {
    (SCENARIO_PACKS?.[intensity]?.[kind] || []).slice(0, 4).forEach((text) => entries.push({ kind, type: "sync", text }));
  });
  const st = pick(["serve", "receive", "sync"]);
  entries.push({ kind: "strip", type: st, text: spec.strip[st] });
  entries.push({ kind: "wild", type: "sync", text: spec.wild.text });
  customCards.filter((c) => c.intensity === intensity).forEach((c) => entries.push({ kind: "normal", type: c.type, text: c.text }));
  return shuffle(entries);
}

function drawCard() {
  if (!state.deck.length) return null;
  let idx = state.deck.findIndex((c) => c.type === pick(["serve", "receive", "sync"]));
  if (idx === -1) idx = 0;
  return state.deck.splice(idx, 1)[0];
}

const SCENARIO_LABELS = { roleplay: "🎬 情境", dare: "🎯 挑战", whisper: "👂 悄悄话", confess: "💬 告白" };

function setPlayerHeader(card) {
  const t = $(".turn-label");
  const scenarioKind = ["roleplay", "dare", "whisper", "confess"].includes(card?.kind);
  if (!card || card.kind === "choice" || card.kind === "boss" || card.type === "sync" || scenarioKind) {
    $("#current-player").textContent = card?.kind === "boss" ? "Boss" : card?.kind === "choice" ? "选一张" : scenarioKind ? "情境" : "你们";
    t.textContent = card?.kind === "boss" ? " 战" : scenarioKind ? " 演绎" : "";
  } else if (card.type === "serve") { $("#current-player").textContent = getPlayerName(state.currentPlayer); t.textContent = " 服侍"; }
  else { $("#current-player").textContent = getPlayerName(state.currentPlayer); t.textContent = " 享受"; }
}

function resetCardUI() {
  $("#card").classList.remove("flipped", "special-timer", "special-choice", "special-wild", "special-strip", "special-boss", "special-roleplay", "special-dare", "special-whisper", "special-confess");
  state.flipped = false; state.choicePicked = null;
  $("#btn-done").disabled = true; $("#btn-next").disabled = true;
  $("#btn-skip").disabled = state.mustComplete || state.isBossRound || state.noSkip || !getDiff().skipAllowed;
  $("#card-text").textContent = ""; $("#card-label").textContent = ""; $("#card-for").textContent = "";
  $("#choice-options").innerHTML = ""; $("#choice-options").classList.remove("show");
  $("#peek-preview").classList.add("hidden");
  stopTimer(); $("#timer-overlay").classList.remove("show");
}

function renderCardFace(card) {
  const label = $("#card-label"), text = $("#card-text"), forEl = $("#card-for");
  if (card.kind === "boss") { $("#card").classList.add("special-boss"); label.textContent = card.title; text.textContent = interpolate(card.text); forEl.textContent = "必须完成"; return; }
  if (card.kind === "timer") { $("#card").classList.add("special-timer"); label.textContent = SPECIAL_CARDS.timer.label; state.timerLeft = card.seconds; text.textContent = interpolate(card.text); return; }
  if (card.kind === "choice") {
    $("#card").classList.add("special-choice"); label.textContent = SPECIAL_CARDS.choice.label; text.textContent = "选一项";
    const box = $("#choice-options"); box.innerHTML = "";
    ["a", "b"].forEach((k) => { const btn = document.createElement("button"); btn.className = "choice-btn"; btn.textContent = interpolate(card.choice[k]); btn.onclick = (e) => { e.stopPropagation(); pickChoice(btn.textContent); }; box.appendChild(btn); });
    box.classList.add("show"); return;
  }
  if (card.kind === "wild") { $("#card").classList.add("special-wild"); label.textContent = SPECIAL_CARDS.wild.label; text.textContent = card.text; state.mustComplete = true; $("#btn-skip").disabled = true; return; }
  if (card.kind === "strip") { $("#card").classList.add("special-strip"); label.textContent = SPECIAL_CARDS.strip.label; text.textContent = interpolate(card.text); return; }
  if (SCENARIO_LABELS[card.kind]) {
    $("#card").classList.add(`special-${card.kind}`);
    label.textContent = SCENARIO_LABELS[card.kind];
    text.textContent = interpolate(card.text);
    return;
  }
  label.textContent = CARD_TYPES[card.type].label; text.textContent = interpolate(card.text);
}

function pickChoice(txt) { $("#card-text").textContent = txt; $("#choice-options").classList.remove("show"); state.flipped = true; enableActions(); vibrate(14); }

function flipCard() {
  if (state.flipped || !state.currentCard) return;
  renderCardFace(state.currentCard);
  $("#card").classList.add("flipped"); state.flipped = true;
  $("#btn-done").disabled = state.currentCard.kind === "choice";
  if (state.currentCard.kind === "timer") startTimer(state.currentCard.seconds);
  else if (state.activeEvent?.id === "timer_challenge") startTimer(60);
  else {
    const round = (isChallenge() || isDaily() || isStory()) ? getCampaignRound() : null;
    const roundTimer = round?.timer;
    const modTimer = state.dailyMod?.timer;
    const presetTimer = isChallenge() && CHALLENGE_PRESETS[state.challengeId]?.timer;
    const t = roundTimer || modTimer || presetTimer || state.timerBonus;
    if (t) startTimer(t + (state.timerBonus || 0));
  }
  vibrate(18);
  broadcastSync();
}

function startTimer(sec, silent) {
  stopTimer(); state.timerLeft = sec;
  $("#timer-overlay").classList.add("show"); $("#timer-display").textContent = sec;
  if (!silent) Voice.timerStart(sec);
  state.timerId = setInterval(() => {
    state.timerLeft--; $("#timer-display").textContent = state.timerLeft;
    Voice.timerTick(state.timerLeft);
    if (state.timerLeft <= 10) $("#timer-display").classList.add("urgent");
    if (state.timerLeft <= 0) {
      stopTimer(); vibrate([30, 60, 30]); $("#timer-display").textContent = "到";
      broadcastSync();
    }
  }, 1000);
  broadcastSync();
}

function stopTimer() { if (state.timerId) clearInterval(state.timerId); state.timerId = null; $("#timer-display")?.classList.remove("urgent"); }

function presentCard() {
  resetCardUI();
  if (state.mode === "scenario" && !isStructured()) {
    if (!state.deck.length) state.deck = buildScenarioDeck();
    state.currentCard = state.deck.length ? state.deck.splice(0, 1)[0] : drawScenarioCard();
  } else if (isStructured() || isCustom()) {
    state.currentCard = drawCampaignCard();
  } else if (state.mode === "cards") {
    if (!state.deck.length) state.deck = buildDeck();
    if (!state.deck.length) {
      showToast("牌库加载失败，请刷新页面重试");
      return;
    }
    state.currentCard = drawCard();
    if (!state.currentCard) { endGame(); return; }
  } else {
    return;
  }
  if (!isStructured()) state.round++;
  setPlayerHeader(state.currentCard); updateHUD();
}

function rollDice() {
  const intensity = getIntensity(), part = pick(BODY_PARTS[intensity]), action = pick(DICE_ACTIONS[intensity]);
  const actor = getPlayerName(state.currentPlayer), target = getPlayerName(1 - state.currentPlayer);
  [$("#dice-part"), $("#dice-action")].forEach((el) => el.classList.add("rolling"));
  vibrate([10, 30, 10]);
  setTimeout(() => {
    $("#dice-part").textContent = part; $("#dice-action").textContent = action;
    [$("#dice-part"), $("#dice-action")].forEach((el) => el.classList.remove("rolling"));
    $("#dice-result").textContent = `${actor} 用「${action}」对待 ${target} 的「${part}」`;
    $("#dice-for").textContent = `${actor} → ${target}`;
    enableActions(); setPlayerHeader({ type: "serve" }); updateHUD(); broadcastSync();
  }, 600);
}

function enableActions() { $("#btn-done").disabled = false; $("#btn-next").disabled = false; }

function resetDice() { $("#dice-part").textContent = "?"; $("#dice-action").textContent = "?"; $("#dice-result").textContent = "点按钮掷骰"; $("#btn-done").disabled = true; }

const wheelPool = (() => { const s = []; WHEEL_SEGMENTS.forEach((w) => { for (let i = 0; i < w.weight; i++) s.push(w); }); return s; })();

function spinWheel() {
  if (state.wheelSpinning) return;
  state.wheelSpinning = true; $("#btn-spin").disabled = true; $("#wheel-result").textContent = "转动中…";
  const result = pick(wheelPool), extra = Math.floor(Math.random() * 360) + 1440;
  const wheel = $("#wheel-disk"), cur = parseFloat(wheel.dataset.deg || 0), next = cur + extra;
  wheel.style.transform = `rotate(${next}deg)`; wheel.dataset.deg = next;
  setTimeout(() => { state.wheelSpinning = false; $("#btn-spin").disabled = false; resolveWheel(result); }, 3200);
}

function resolveWheel(seg) {
  if (seg.type === "timer") { const c = pick(SPECIAL_CARDS.timer.items[getIntensity()]); $("#wheel-result").textContent = interpolate(c); startTimer(60); }
  else if (seg.type === "strip") { const t = pick(["serve", "receive"]); $("#wheel-result").textContent = interpolate(SPECIAL_CARDS.strip[t]); }
  else if (seg.type === "bonus") { addHeat(30); $("#wheel-result").textContent = interpolate(pick(BONUS_CARDS)); }
  else if (seg.type === "roleplay") { $("#wheel-result").textContent = interpolate(pickScenario("roleplay")); }
  else if (seg.type === "dare") { $("#wheel-result").textContent = interpolate(pickScenario("dare")); }
  else if (seg.type === "whisper") { $("#wheel-result").textContent = interpolate(pickScenario("whisper")); }
  else if (seg.type === "swap") { state.currentPlayer = 1 - state.currentPlayer; $("#wheel-result").textContent = `换位！本轮由 ${getPlayerName(state.currentPlayer)} 主动`; }
  else if (seg.type === "confess") { $("#wheel-result").textContent = interpolate(pickScenario("confess")); }
  else if (seg.type === "fantasy") {
    const self = getPlayerName(state.currentPlayer);
    const other = getPlayerName(1 - state.currentPlayer);
    const ultra = profile.difficulty === "wild" || getIntensity() === "deep";
    const line = typeof drawFantasyCard === "function"
      ? drawFantasyCard(getIntensity(), self, other, state.nameA, state.nameB, { ultra })
      : interpolate(pick(BONUS_CARDS));
    $("#wheel-result").textContent = line;
  }
  else if (seg.type === "dom") {
    const lv = getIntensity();
    $("#wheel-result").textContent = interpolate(FANTASY_DOM_LINES?.[lv] || FANTASY_DOM_LINES?.hot || pick(BONUS_CARDS));
  }
  else if (seg.type === "edge") {
    const lv = getIntensity();
    $("#wheel-result").textContent = interpolate(FANTASY_EDGE_LINES?.[lv] || FANTASY_EDGE_LINES?.hot || pick(BONUS_CARDS));
  }
  else if (CARDS[getIntensity()]?.[seg.type]) { $("#wheel-result").textContent = interpolate(pickCardText(getIntensity(), seg.type)); }
  else { $("#wheel-result").textContent = interpolate(pick(CARDS[getIntensity()].serve)); }
  enableActions(); updateHUD(); broadcastSync();
}

function resetWheel() { $("#wheel-result").textContent = "转轮决定命运"; $("#btn-done").disabled = true; stopTimer(); }

function setupMystery() {
  const intensity = getIntensity(), options = [];
  for (let i = 0; i < 3; i++) { const type = pick(["serve", "receive", "sync"]); options.push({ type, text: pickCardText(intensity, type) }); }
  state.mysteryOptions = options; state.mysteryPicked = null;
  $$(".mystery-card").forEach((el, i) => { el.classList.remove("picked", "revealed"); el.querySelector(".mystery-front").textContent = ""; });
  $("#mystery-result").textContent = "选一张，选中就必须做"; $("#btn-done").disabled = true;
}

function pickMystery(idx) {
  if (state.mysteryPicked !== null) return;
  if (RoomSync.isGuest()) { RoomSync.sendAction("mystery", idx); return; }
  state.mysteryPicked = idx;
  const chosen = state.mysteryOptions[idx];
  $$(".mystery-card").forEach((el, i) => { el.querySelector(".mystery-front").textContent = interpolate(state.mysteryOptions[i].text); el.classList.add("revealed"); if (i === idx) el.classList.add("picked"); });
  $("#mystery-result").textContent = interpolate(chosen.text);
  enableActions(); updateHUD(); vibrate(20); broadcastSync();
}

function maybeTriggerEvent() {
  const rate = getDiff().eventRate;
  if (Math.random() > rate || isCustom() || isChallenge() || isStory()) return false;
  const ev = pick(RANDOM_EVENTS);
  state.activeEvent = ev; state.eventsTriggered++;
  profile.stats.events = (profile.stats.events || 0) + 1;
  if (profile.stats.events >= 10) unlockAchievement("event10");
  $("#event-banner").textContent = `${ev.icon} 随机事件：${ev.name} — ${ev.text}`;
  $("#event-banner").classList.remove("hidden");
  Voice.event(ev.name);
  if (ev.id === "lust_burst") { addLust(0, 20); addLust(1, 20); }
  if (ev.id === "swap") state.currentPlayer = 1 - state.currentPlayer;
  if (ev.id === "bonus_xp") state.scoreMult = 2;
  if (ev.id === "heat_wave") addHeat(25);
  if (ev.id === "mystery_force") state.forceMode = "mystery";
  if (ev.id === "double_or_nothing") state.mustComplete = false;
  if (ev.id === "roleplay_burst") state.forceMode = "cards";
  if (ev.id === "double_timer") state.timerBonus = 60;
  if (ev.id === "type_lock") state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  if (ev.id === "strip_roulette") showToast("随机事件：各脱一件");
  if (ev.id === "slow_motion") state.lustMult = 0.7;
  saveProfile();
  return true;
}

function clearEvent() {
  state.activeEvent = null; state.scoreMult = 1; state.forceMode = null;
  state.timerBonus = 0; state.lustMult = state.dailyMod?.lustMult || 1;
  $("#event-banner").classList.add("hidden");
}

function activateItem(idx) {
  const inv = profile.inventory[idx];
  if (!inv) return;
  const item = useItem(inv.id);
  if (!item) return;
  showToast(`使用 ${item.icon} ${item.name}`);
  if (item.id === "double_lust") state.lustMult = 2;
  if (item.id === "heat_burst") addHeat(40);
  if (item.id === "shield") state.usedShield = true;
  if (item.id === "peek") {
    const preview = interpolate(pickCardText(getIntensity(), pick(["serve", "receive", "sync"])));
    $("#peek-preview").textContent = `预知：${preview}`; $("#peek-preview").classList.remove("hidden");
  }
  if (item.id === "force_serve") { state.currentPlayer = 1 - state.currentPlayer; showToast(`${getPlayerName(state.currentPlayer)} 必须服侍`); }
  if (item.id === "reroll") { clearEvent(); startRound(); return; }
  if (item.id === "steal" && isPk()) { const from = state.scoreA > state.scoreB ? 0 : 1; if (from === 0) { state.scoreA = Math.max(0, state.scoreA - PK_CONFIG.stealAmount); state.scoreB += PK_CONFIG.stealAmount; } else { state.scoreB = Math.max(0, state.scoreB - PK_CONFIG.stealAmount); state.scoreA += PK_CONFIG.stealAmount; } updateHUD(); }
  if (item.id === "timer_plus") state.timerLeft += 30;
  renderItems(); updateHUD();
}

function showPkJudge() {
  state.pendingPkJudge = true;
  $("#pk-pick-a").textContent = state.nameA + " 更猛";
  $("#pk-pick-b").textContent = state.nameB + " 更猛";
  $("#pk-judge").classList.add("show");
  Voice.pkJudge();
  broadcastSync();
}

function resolvePk(winner) {
  $("#pk-judge").classList.remove("show");
  state.pendingPkJudge = false;
  if (winner === null) { addScore(0, 15); addScore(1, 15); }
  else if (winner === 0) { addScore(0, PK_CONFIG.roundWin); addScore(1, PK_CONFIG.roundLose); showToast(pick(PK_PENALTIES).replace(/\{other\}/g, state.nameB).replace(/\{self\}/g, state.nameA)); }
  else { addScore(1, PK_CONFIG.roundWin); addScore(0, PK_CONFIG.roundLose); showToast(pick(PK_PENALTIES).replace(/\{other\}/g, state.nameA).replace(/\{self\}/g, state.nameB)); }
  state.pkRound++;
  if (state.scoreA >= PK_CONFIG.winScore || state.scoreB >= PK_CONFIG.winScore || state.pkRound >= state.pkMaxRounds) endPk();
  else setTimeout(startRound, 400);
}

function endPk() {
  const w = state.scoreA > state.scoreB ? 0 : state.scoreB > state.scoreA ? 1 : -1;
  profile.gamesPlayed++; addXP(80);
  checkAchievements({ playStyle: "pk", pkWinner: w >= 0 ? w : null, scoreA: state.scoreA, scoreB: state.scoreB, streak: state.streak });
  $("#end-emoji").textContent = "⚔️";
  $("#end-title").textContent = w < 0 ? "PK 平局" : `${getPlayerName(w)} PK 胜利！`;
  $("#end-rank").textContent = "";
  $("#end-stats").textContent = `${state.nameA} ${state.scoreA} : ${state.scoreB} ${state.scoreB}`;
  $("#end-message").textContent = w >= 0 ? "输的人记得兑现惩罚。" : "势均力敌。";
  $("#end-xp").textContent = "+80 XP";
  showScreen("end");
}

function completeRound() {
  state.completed++; state.streak++;
  profile.stats.completed++;
  const diff = getDiff();
  addHeat(10 + state.streak * 2);
  addScore(state.currentPlayer, 10 + state.streak * 5);
  addLust(state.currentPlayer, 15 + state.streak * 2);
  addLust(1 - state.currentPlayer, 8);
  state.lustMult = 1; state.usedShield = false;
  if (state.streak >= 5) unlockAchievement("streak5");
  if (state.streak >= 10) unlockAchievement("streak10");
  state.forceIntensity = null; state.mustComplete = false;
  clearEvent();

  if (isPk()) { showPkJudge(); return; }
  if (isCampaign()) { if (state.isBossRound) unlockAchievement("boss_kill"); advanceCampaign(true); return; }
  if (isDaily()) { advanceDaily(true); return; }
  if (isChallenge()) { advanceChallenge(true); return; }
  if (isStory()) { advanceStoryRound(true); return; }
  state.currentPlayer = 1 - state.currentPlayer;
}

function skipRound() {
  if (state.usedShield) { state.usedShield = false; showToast("跳过护盾生效"); setTimeout(startRound, 200); return; }
  state.skipped++; state.chapterSkips++; state.streak = 0;
  profile.stats.skipped++;
  if (state.activeEvent?.id === "double_or_nothing") { addScore(state.currentPlayer, -15); }
  addHeat(3); addLust(1 - state.currentPlayer, 6);
  clearEvent();
  if (isCampaign()) { advanceCampaign(false); return; }
  if (isDaily()) { advanceDaily(false); return; }
  if (isChallenge()) { advanceChallenge(false); return; }
  if (isStory()) { advanceStoryRound(false); return; }
  state.currentPlayer = 1 - state.currentPlayer; updateHUD();
}

function advanceCampaign(completed) {
  saveGame();
  if (state.isBossRound) { finishChapter(); return; }
  state.roundInChapter++;
  const ch = getChapter();
  if (state.roundInChapter >= ch.rounds.length) {
    state.isBossRound = true;
    showToast("Boss 来袭！", 2500);
    Voice.bossAlert();
    setTimeout(startRound, 700);
    return;
  }
  state.currentPlayer = 1 - state.currentPlayer;
  setTimeout(startRound, completed ? 350 : 200);
}

function advanceDaily(completed) {
  state.roundInChapter++;
  if (state.roundInChapter >= state.challengeMax) {
    markDailyDone(); profile.gamesPlayed++; addXP(150);
    checkAchievements({ playStyle: "daily", dailyClear: true, streak: state.streak });
    $("#end-emoji").textContent = "📅"; $("#end-title").textContent = "每日挑战完成！";
    $("#end-rank").textContent = state.dailyMod?.name || "每日挑战";
    $("#end-stats").textContent = `完成 ${state.completed} 关 · 跳过 ${state.skipped} 关`;
    $("#end-message").textContent = state.dailyMod?.desc ? `今日主题：${state.dailyMod.desc}` : "明天会换新任务。";
    $("#end-xp").textContent = "+150 XP"; showScreen("end"); return;
  }
  state.currentPlayer = 1 - state.currentPlayer;
  setTimeout(startRound, 300);
}

function advanceChallenge(completed) {
  state.challengeRound++;
  if (state.challengeRound >= state.challengeMax) {
    profile.gamesPlayed++; addXP(120);
    unlockAchievement("challenge_clear");
    checkAchievements({ playStyle: "challenge", challengeClear: true, streak: state.streak });
    const cp = CHALLENGE_PRESETS[state.challengeId];
    $("#end-emoji").textContent = cp?.icon || "🎯";
    $("#end-title").textContent = `${cp?.label || "挑战"} 完成！`;
    $("#end-rank").textContent = cp?.desc || "";
    $("#end-stats").textContent = `完成 ${state.completed} 关 · 跳过 ${state.skipped} 关`;
    $("#end-message").textContent = cp?.outro || "这一关关都是信任与默契。";
    $("#end-xp").textContent = "+120 XP"; showScreen("end"); return;
  }
  state.currentPlayer = 1 - state.currentPlayer;
  setTimeout(startRound, 300);
}

function finishChapter() {
  const stars = state.chapterSkips === 0 ? 3 : state.chapterSkips <= 1 ? 2 : 1;
  state.totalStars += stars; state.isBossRound = false; state.roundInChapter = 0; state.chapterSkips = 0;
  state.lustA = Math.max(0, state.lustA - 25); state.lustB = Math.max(0, state.lustB - 25);
  addXP(50 + stars * 20);
  checkAchievements({ totalStars: state.totalStars, streak: state.streak, isBoss: true });
  const ch = getChapter();
  $("#clear-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  $("#clear-title").textContent = `${ch.title} 通关`;
  $("#clear-stats").textContent = `+${50 + stars * 20} XP · 累计 ${state.totalStars} 星`;
  $("#clear-msg").textContent = stars === 3 ? "完美！" : "下一章更刺激";
  if (state.chapterIndex === 8 && isSecretUnlocked()) {
    $("#btn-next-chapter").textContent = "进入隐藏章 ✨";
  } else if (state.chapterIndex >= getMaxChapterIndex()) {
    $("#btn-next-chapter").textContent = "最终结算";
  } else {
    $("#btn-next-chapter").textContent = "下一章";
  }
  showScreen("chapterClear"); saveGame();
}

function showVictory() {
  clearSave();
  profile.gamesPlayed++;
  const secretClear = state.chapterIndex >= 9;
  const xp = secretClear ? 450 : 300;
  addXP(xp);
  const ending = ENDINGS.find((e) => state.totalStars >= e.minStars) || ENDINGS[ENDINGS.length - 1];
  checkAchievements({
    playStyle: "campaign", campaignClear: true, secretClear,
    chapterIndex: state.chapterIndex, totalStars: state.totalStars,
    skipped: state.skipped, streak: state.streak, scoreA: state.scoreA, scoreB: state.scoreB,
  });
  refillInventory();
  $("#end-emoji").textContent = secretClear ? "✨" : "👑";
  $("#end-title").textContent = secretClear ? "神话通关" : ending.title;
  $("#end-rank").textContent = `${state.totalStars} 星 · ${secretClear ? "含隐藏章" : "九章通关"}`;
  $("#end-stats").textContent = `完成 ${state.completed} · 跳过 ${state.skipped} · ${state.nameA} ${state.scoreA} : ${state.scoreB} ${state.scoreB}`;
  $("#end-message").textContent = secretClear ? "你们解锁并完成了隐藏章节，已是蜜语传说。" : ending.msg;
  $("#end-xp").textContent = `+${xp} XP`;
  showScreen("end");
}

function showChapterIntro() {
  const ch = getChapter();
  $("#chapter-label").textContent = "章节开始";
  $("#chapter-icon").textContent = ch.icon;
  $("#chapter-title").textContent = ch.title;
  $("#chapter-desc").textContent = ch.desc + (ch.secret ? "（隐藏章节）" : "");
  $("#chapter-rounds").textContent = `${ch.rounds.length} 关 + Boss`;
  $("#chapter-intensity").textContent = INTENSITY_LABELS[ch.intensity];
  if (ch.secret) unlockAchievement("secret_ch");
  showScreen("chapter");
}

function showSceneStageIntro() {
  const scene = state.storyData;
  const st = getCurrentStoryStage();
  if (!scene || !st) return;
  state.intensity = st.intensity;
  $("#chapter-label").textContent = `第 ${state.stageIndex + 1} 幕 / 共 ${state.storyStages.length} 幕`;
  $("#chapter-icon").textContent = scene.icon;
  $("#chapter-title").textContent = `${scene.name} · ${st.stageName}`;
  $("#chapter-desc").textContent = interpolate(st.intro);
  $("#chapter-rounds").textContent = `${st.rounds.length} 段剧情`;
  $("#chapter-intensity").textContent = INTENSITY_LABELS[st.intensity];
  showScreen("chapter");
  showToast(scene.tagline, 3500);
}

function advanceStoryRound(completed) {
  state.stageRoundIndex++;
  const st = getCurrentStoryStage();
  if (state.stageRoundIndex >= st.rounds.length) {
    finishStoryStage();
    return;
  }
  state.currentPlayer = 1 - state.currentPlayer;
  setTimeout(startRound, completed ? 400 : 250);
}

function finishStoryStage() {
  const st = getCurrentStoryStage();
  const stars = state.chapterSkips === 0 ? 3 : state.chapterSkips <= 1 ? 2 : 1;
  addXP(40 + stars * 15);
  $("#clear-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  $("#clear-title").textContent = `${st.stageName} 完成`;
  $("#clear-stats").textContent = `${state.storyData.name} · 第 ${state.stageIndex + 1} 幕`;
  $("#clear-msg").textContent = state.stageIndex >= state.storyStages.length - 1
    ? "故事即将落幕……" : `下一幕：${state.storyStages[state.stageIndex + 1]?.stageName || ""}`;
  $("#btn-next-chapter").textContent = state.stageIndex >= state.storyStages.length - 1 ? "故事结局" : "下一幕";
  state.chapterSkips = 0;
  showScreen("chapterClear");
}

function finishStory() {
  profile.gamesPlayed++;
  addXP(180);
  const scene = state.storyData;
  $("#end-emoji").textContent = scene?.icon || "📖";
  $("#end-title").textContent = `${scene?.name || "场景"} · 剧终`;
  $("#end-rank").textContent = scene?.tagline || "";
  $("#end-stats").textContent = `完成 ${state.completed} 段 · 跳过 ${state.skipped} 段`;
  $("#end-message").textContent = scene?.desc || "这一段故事，属于你们。";
  $("#end-xp").textContent = "+180 XP";
  profile.lastSceneId = state.sceneId;
  saveProfile();
  showScreen("end");
}

function startStory(sceneId) {
  const built = buildStoryRounds(sceneId);
  if (!built.scene) { showToast("场景不存在"); return; }
  state.playStyle = "story";
  state.sceneId = sceneId;
  state.storyData = built.scene;
  state.storyStages = built.stages;
  state.stageIndex = 0;
  state.stageRoundIndex = 0;
  state.chapterSkips = 0;
  state.completed = 0;
  state.skipped = 0;
  state.streak = 0;
  state.lustA = 0;
  state.lustB = 0;
  state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  state.noSkip = false;
  resetRun();
  profile.lastSceneId = sceneId;
  saveProfile();
  showSceneStageIntro();
}

function advanceStoryStage() {
  state.stageIndex++;
  state.stageRoundIndex = 0;
  if (state.stageIndex >= state.storyStages.length) {
    finishStory();
    return;
  }
  showSceneStageIntro();
}

function getScenePeakIntensity(scene) {
  const order = { warm: 0, hot: 1, deep: 2 };
  let peak = "warm";
  scene.stages?.forEach((st) => {
    if ((order[st.intensity] ?? 0) > (order[peak] ?? 0)) peak = st.intensity;
  });
  return peak;
}

function renderEroticaList() {
  const catFilter = document.querySelector('input[name="erotica-cat-filter"]:checked')?.value || "all";
  const list = getEroticaList().filter((s) => catFilter === "all" || (s.category || "indoor") === catFilter);
  const last = profile.lastEroticaId;
  $("#erotica-list").innerHTML = list.length ? list.map((s) => {
    const secs = s.sections?.length || 5;
    const cat = SCENE_CATEGORY_LABELS?.[s.category || "indoor"] || "";
    const lastTag = last === s.id ? '<span class="scene-last">上次读过</span>' : "";
    return `<button class="scene-card erotica-card" data-id="${s.id}" style="--scene-accent:${s.color || "#d4567a"}">
      <span class="scene-icon">${s.icon}</span>
      <div class="scene-body">
        <strong>${s.name}</strong>
        <em>${s.tagline}</em>
        <p>${s.desc || getScene?.(s.id)?.desc || "沉浸式情色叙事，边读边做。"}</p>
        <span class="scene-meta">${cat} · ${secs} 幕 · 边读边做</span>
        ${lastTag}
      </div>
    </button>`;
  }).join("") : '<p class="scene-empty">没有符合筛选的故事。</p>';
  $$(".erotica-card").forEach((b) => b.addEventListener("click", () => startErotica(b.dataset.id)));
}

function renderEroticaSection() {
  const story = state.eroticaData;
  const sec = story?.sections?.[state.eroticaSectionIndex];
  if (!story || !sec) return;

  const self = getPlayerName(state.currentPlayer);
  const other = getPlayerName(1 - state.currentPlayer);
  const total = story.sections.length;
  const idx = state.eroticaSectionIndex;
  const stageLabel = typeof getEroticaStageLabel === "function"
    ? getEroticaStageLabel(idx, total) : "";

  document.documentElement.style.setProperty("--scene-accent", story.color || "#d4567a");
  $("#erotica-read-icon").textContent = story.icon;
  $("#erotica-read-title").textContent = story.name;
  $("#erotica-read-section").textContent = stageLabel ? `${sec.title} · ${stageLabel}` : sec.title;
  $("#erotica-read-progress").textContent = `${idx + 1} / ${total}`;
  $("#erotica-progress-fill").style.width = `${((idx + 1) / total) * 100}%`;

  const narrative = formatEroticaNarrative(
    fillEroticaText(sec.narrative, self, other, state.nameA, state.nameB)
  );
  const playLine = typeof getEroticaPlayPrompt === "function"
    ? getEroticaPlayPrompt(story, idx, self, other, state.nameA, state.nameB, state.eroticaPlayVariant)
    : "";
  const playHtml = playLine
    ? `<div class="erotica-action" id="erotica-play-box">
        <span class="erotica-action-label">▶ 现在就干 · ${self} 主动</span>
        <p id="erotica-play-text">${playLine}</p>
      </div>`
    : "";

  $("#erotica-content").innerHTML = `<div class="erotica-narrative">${narrative}</div>${playHtml}`;
  $("#erotica-content").scrollTop = 0;

  $("#btn-erotica-done").textContent = idx >= total - 1 ? "做完了 · 故事结束" : "做完了 · 下一幕 →";
}

function refreshEroticaPlay() {
  state.eroticaPlayVariant = (state.eroticaPlayVariant || 0) + 1;
  renderEroticaSection();
  const box = $("#erotica-play-box");
  if (box) {
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    showToast("换了一句新的");
  }
}

function drawEroticaFantasyCard() {
  const story = state.eroticaData;
  if (!story) return;
  const self = getPlayerName(state.currentPlayer);
  const other = getPlayerName(1 - state.currentPlayer);
  const total = story.sections.length;
  const idx = state.eroticaSectionIndex;
  let intensity = typeof getEroticaIntensityForSection === "function"
    ? getEroticaIntensityForSection(idx, total) : "hot";
  if (state.midnightRush || profile.difficulty === "wild") intensity = "deep";
  const ultra = state.midnightRush || profile.difficulty === "wild" || Math.random() < 0.4;
  const line = typeof drawFantasyCard === "function"
    ? drawFantasyCard(intensity, self, other, state.nameA, state.nameB, { ultra })
    : interpolate(pick(CARDS[intensity]?.serve || CARDS.hot.serve));
  const box = $("#erotica-play-box");
  const textEl = $("#erotica-play-text");
  const label = box?.querySelector(".erotica-action-label");
  if (textEl) textEl.textContent = line;
  if (label) label.textContent = ultra ? `🔥 极限色牌 · ${self}` : `🃏 色牌加码 · ${INTENSITY_LABELS[intensity] || "火热"} · ${self}`;
  if (box) box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  addHeat(8);
  addLust(state.currentPlayer, 12);
  showToast("抽了一张色牌");
}

function startRandomErotica() {
  const list = getEroticaList();
  if (!list.length) { showToast("暂无故事"); return; }
  const story = pick(list);
  startErotica(story.id);
  showToast(`随机：${story.name}`, 2800);
}

function startMidnightRush() {
  const list = getEroticaList();
  if (!list.length) { showToast("暂无故事"); return; }
  const story = pick(list);
  state.intensity = "deep";
  startErotica(story.id, { midnight: true });
  showToast(`深夜快闪 · ${story.name} · 极限色牌已就绪`, 3200);
}

function startErotica(id, opts) {
  const story = getErotica(id);
  if (!story?.sections?.length) { showToast("故事不存在"); return; }
  state.midnightRush = !!opts?.midnight;
  state.playStyle = "erotica";
  state.eroticaId = id;
  state.eroticaData = story;
  state.eroticaSectionIndex = 0;
  state.eroticaPlayVariant = 0;
  state.currentPlayer = 0;
  state.completed = 0;
  state.skipped = 0;
  profile.lastEroticaId = id;
  saveProfile();
  renderEroticaSection();
  showScreen("eroticaRead");
  showToast(story.tagline, 3000);
}

function advanceEroticaSection() {
  state.completed++;
  addHeat(12);
  addLust(state.currentPlayer, 18);
  addLust(1 - state.currentPlayer, 10);
  state.eroticaSectionIndex++;
  state.eroticaPlayVariant = 0;
  if (state.eroticaSectionIndex >= state.eroticaData.sections.length) {
    finishErotica();
    return;
  }
  state.currentPlayer = 1 - state.currentPlayer;
  renderEroticaSection();
}

function finishErotica() {
  state.midnightRush = false;
  profile.gamesPlayed++;
  addXP(200);
  const story = state.eroticaData;
  $("#end-emoji").textContent = story?.icon || "🔞";
  $("#end-title").textContent = `${story?.name || "故事"} · 读毕`;
  $("#end-rank").textContent = story?.tagline || "";
  $("#end-stats").textContent = `完成 ${state.completed + 1} 段 · 全程沉浸`;
  $("#end-message").textContent = "文字结束了，身体可以没完。再抽一张色牌，或换一篇继续。";
  $("#end-xp").textContent = "+200 XP";
  profile.lastEroticaId = state.eroticaId;
  saveProfile();
  showScreen("end");
}

function renderSceneList() {
  const intensityFilter = document.querySelector('input[name="scene-filter"]:checked')?.value || "all";
  const catFilter = document.querySelector('input[name="scene-cat-filter"]:checked')?.value || "all";
  const list = getSceneList().filter((s) => {
    const intensityOk = intensityFilter === "all" || getScenePeakIntensity(s) === intensityFilter;
    const catOk = catFilter === "all" || (s.category || "indoor") === catFilter;
    return intensityOk && catOk;
  });
  $("#scene-list").innerHTML = list.length ? list.map((s) => {
    const acts = s.stages?.length || 4;
    const cat = SCENE_CATEGORY_LABELS?.[s.category || "indoor"] || "";
    const last = profile.lastSceneId === s.id ? '<span class="scene-last">上次玩过</span>' : "";
    return `<button class="scene-card" data-id="${s.id}" style="--scene-accent:${s.color || "#d4567a"}">
      <span class="scene-icon">${s.icon}</span>
      <div class="scene-body">
        <strong>${s.name}</strong>
        <em>${s.tagline}</em>
        <p>${s.desc}</p>
        <span class="scene-meta">${cat} · ${acts} 幕 · ${INTENSITY_LABELS[getScenePeakIntensity(s)]}</span>
        ${last}
      </div>
    </button>`;
  }).join("") : '<p class="scene-empty">没有符合筛选条件的场景，试试放宽筛选。</p>';
  $$(".scene-card").forEach((b) => b.addEventListener("click", () => startStory(b.dataset.id)));
}

function populateSceneSelect() {
  const sel = $("#free-scene-select");
  if (!sel) return;
  const cur = sel.value;
  const cats = ["public", "vehicle", "indoor", "outdoor"];
  let html = '<option value="">🎲 随机混合（全库情境）</option>';
  cats.forEach((cat) => {
    const items = getSceneList().filter((s) => (s.category || "indoor") === cat);
    if (!items.length) return;
    const label = SCENE_CATEGORY_LABELS?.[cat] || cat;
    html += `<optgroup label="${label}">`;
    html += items.map((s) => `<option value="${s.id}">${s.icon} ${s.name} — ${s.tagline}</option>`).join("");
    html += "</optgroup>";
  });
  sel.innerHTML = html;
  if (cur) sel.value = cur;
  else if (profile.lastSceneId) sel.value = profile.lastSceneId;
}

function updateFreeSceneField() {
  const isSc = document.querySelector('input[name="mode"]:checked')?.value === "scenario";
  $("#scene-pick-field")?.classList.toggle("hidden", !isSc);
  if (isSc) populateSceneSelect();
}

function getPlayMode() {
  if (isFree() || isCustom()) return state.mode;
  if (state.forceMode) return state.forceMode;
  if (state.dailyMod?.modeLock) return state.dailyMod.modeLock;
  const r = getCampaignRound();
  return r?.mode === "boss" ? "cards" : r?.mode || state.mode;
}

function startRound() {
  if (RoomSync.isGuest()) return;
  if (!maybeTriggerEvent() && (isChallenge() || isDaily() || isStory())) showChallengeBrief();
  const mode = getPlayMode();
  state.mode = mode;
  if (mode === "scenario") {
    state.mode = "scenario"; showPanel("cards"); updateHUD(); presentCard(); broadcastSync(); return;
  }
  if (mode === "boss" || (isCampaign() && state.isBossRound)) {
    state.mode = "cards"; showPanel("cards"); updateHUD(); presentCard();
    if (state.isBossRound) setTimeout(() => { flipCard(); broadcastSync(); }, 400);
    else broadcastSync();
    return;
  }
  showPanel(mode); updateHUD(); setPlayerHeader({ type: "serve" });
  if (mode === "cards") presentCard();
  else if (mode === "dice") resetDice();
  else if (mode === "wheel") resetWheel();
  else if (mode === "mystery") setupMystery();
  const tag = getCampaignRound()?.tag;
  if (tag) Voice.roundStart(tag);
  broadcastSync();
}

function resetRun() {
  state.deck = []; state.flipped = false; state.forceIntensity = null; state.mustComplete = false;
  state.bonusTriggered = false; state.activeEvent = null; state.scoreMult = 1; state.lustMult = 1;
  state.usedShield = false; state.pendingPkJudge = false; state.recentCardTexts = []; state.recentScenarioTexts = [];
  state.timerBonus = 0;
  $("#score-name-a").textContent = state.nameA;
  $("#score-name-b").textContent = state.nameB;
  refillInventory();
}

function startCampaign(fresh) {
  state.playStyle = "campaign";
  if (fresh) {
    state.chapterIndex = 0; state.roundInChapter = 0; state.isBossRound = false; state.chapterSkips = 0;
    state.lustA = 0; state.lustB = 0; state.totalStars = 0; state.completed = 0; state.skipped = 0;
    state.scoreA = 0; state.scoreB = 0; state.streak = 0; state.heat = 0; clearSave();
  }
  state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  state.noSkip = !getDiff().skipAllowed;
  resetRun(); profile.gamesPlayed++; saveProfile();
  showChapterIntro();
}

function startPk() {
  state.playStyle = "pk"; state.pkRound = 0; state.completed = 0; state.skipped = 0;
  state.scoreA = 0; state.scoreB = 0; state.streak = 0; state.heat = 0; state.lustA = 0; state.lustB = 0;
  state.intensity = "hot"; state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  state.noSkip = false; resetRun(); showScreen("game"); startRound();
}

function startDaily() {
  const d = getDailyChallenge();
  if (d.done) { showToast("今日已完成，明天再来"); return; }
  state.playStyle = "daily"; state.dailyMod = d.mod; state.dailyRounds = d.rounds;
  state.intensity = d.intensity; state.challengeMax = d.rounds.length; state.roundInChapter = 0;
  state.noSkip = !!d.mod.noSkip; state.lustMult = d.mod.lustMult || 1;
  state.completed = 0; state.skipped = 0; state.streak = 0; state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  resetRun(); showScreen("game"); showToast(`每日：${d.mod.name} — ${d.mod.desc}`, 4000); startRound();
}

function showChallengeBrief() {
  const r = getCampaignRound();
  if (!r?.brief) return;
  $("#event-banner").textContent = `📋 ${r.brief}`;
  $("#event-banner").classList.remove("hidden");
}

function startChallenge(id) {
  const p = CHALLENGE_PRESETS[id];
  state.playStyle = "challenge"; state.challengeId = id;
  state.challengeRounds = buildChallengeRounds(id);
  state.challengeMax = state.challengeRounds.length;
  state.challengeRound = 0; state.noSkip = p.noSkip; state.intensity = p.intensity || "hot";
  state.completed = 0; state.skipped = 0; state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  resetRun(); showScreen("game");
  showToast(p.intro || p.desc, 4500);
  startRound();
}

function startFreeGame() {
  state.playStyle = "free";
  state.sceneId = null;
  state.isBossRound = false;
  state.forceMode = null;
  state.chapterIndex = 0;
  state.roundInChapter = 0;
  state.dailyMod = null;
  state.intensity = document.querySelector('input[name="intensity"]:checked')?.value || "hot";
  state.mode = document.querySelector('input[name="mode"]:checked')?.value || "cards";
  state.selectedSceneId = state.mode === "scenario" ? ($("#free-scene-select")?.value || "") : "";
  if (state.selectedSceneId) profile.lastSceneId = state.selectedSceneId;
  state.currentPlayer = Math.random() < 0.5 ? 0 : 1;
  state.completed = 0; state.skipped = 0; state.round = 0; state.heat = 0; state.streak = 0;
  state.scoreA = 0; state.scoreB = 0; state.noSkip = !getDiff().skipAllowed;
  resetRun();
  if (state.mode === "cards") state.deck = buildDeck();
  else if (state.mode === "scenario") state.deck = buildScenarioDeck();
  else state.deck = [];
  showScreen("game"); startRound();
}

function startCustomGame() {
  if (!customCards.length) { showToast("请先在编辑器添加卡牌"); showScreen("editor"); renderEditor(); return; }
  state.playStyle = "custom"; state.mode = "cards"; state.intensity = "hot";
  state.currentPlayer = Math.random() < 0.5 ? 0 : 1; state.round = 0; state.completed = 0; state.skipped = 0;
  resetRun(); showScreen("game"); startRound();
}

function endGame() {
  profile.gamesPlayed++; addXP(40);
  const w = state.scoreA > state.scoreB ? state.nameA : state.scoreB > state.scoreA ? state.nameB : "平局";
  $("#end-emoji").textContent = "🌙"; $("#end-title").textContent = "今晚到此";
  $("#end-rank").textContent = "";
  $("#end-stats").textContent = `${w} · 完成${state.completed} · ${state.nameA} ${state.scoreA}:${state.scoreB} ${state.nameB}`;
  $("#end-xp").textContent = "+40 XP"; showScreen("end");
}

function onDone() {
  if (RoomSync.isGuest()) { RoomSync.sendAction("done"); return; }
  vibrate([8, 40, 8]); completeRound();
  if (!isStructured() && !isPk()) setTimeout(startRound, 300);
  else broadcastSync();
}
function onSkip() {
  if (RoomSync.isGuest()) { RoomSync.sendAction("skip"); return; }
  if (state.mustComplete || state.isBossRound || state.noSkip || !getDiff().skipAllowed) return;
  vibrate(8); skipRound();
  if (!isStructured()) setTimeout(startRound, 200);
  else broadcastSync();
}

function cycleDifficulty() {
  const keys = Object.keys(DIFFICULTIES);
  const i = keys.indexOf(profile.difficulty);
  profile.difficulty = keys[(i + 1) % keys.length];
  saveProfile(); renderHubProfile();
  showToast(`难度：${getDiff().label}`);
}

function renderChallengeList() {
  const order = ["speed", "blitz", "hardcore", "edge", "sensory", "sync", "confess", "dice", "roulette", "marathon"];
  const entries = order.filter((id) => CHALLENGE_PRESETS[id]).map((id) => [id, CHALLENGE_PRESETS[id]]);
  Object.entries(CHALLENGE_PRESETS).forEach(([id, p]) => {
    if (!order.includes(id)) entries.push([id, p]);
  });
  $("#challenge-list").innerHTML = entries.map(([id, p]) =>
    `<button class="pick-item" data-id="${id}"><em>${p.icon}</em><div><strong>${p.label}</strong><small>${p.desc}</small>${p.tip ? `<span class="pick-tip">${p.tip}</span>` : ""}</div></button>`
  ).join("");
  $$(".pick-item").forEach((b) => b.addEventListener("click", () => { startChallenge(b.dataset.id); }));
}

$("#setup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  state.nameA = $("#name-a").value.trim();
  state.nameB = $("#name-b").value.trim();
  if (!state.nameA || !state.nameB) return;
  saveProfile(); renderHub(); showScreen("hub");
});

$$(".hub-card").forEach((b) => b.addEventListener("click", () => {
  const m = b.dataset.mode;
  if (m === "campaign") startCampaign(true);
  else if (m === "sync") { $("#sync-err").textContent = ""; showScreen("sync"); }
  else if (m === "pk") startPk();
  else if (m === "daily") startDaily();
  else if (m === "challenge") { renderChallengeList(); showScreen("challengePick"); }
  else if (m === "story") { renderSceneList(); showScreen("scenePick"); }
  else if (m === "erotica") { renderEroticaList(); showScreen("eroticaPick"); }
  else if (m === "galgame") enterGalgame();
  else if (m === "midnight") startMidnightRush();
  else if (m === "free") { populateSceneSelect(); updateFreeSceneField(); showScreen("freePick"); }
  else if (m === "custom") startCustomGame();
}));

function onSyncPeerConnected() {
  $("#sync-wait-text")?.classList.add("hidden");
  $("#sync-start-box")?.classList.remove("hidden");
}

$("#btn-sync-host").addEventListener("click", async () => {
  $("#sync-err").textContent = "";
  $("#sync-start-box")?.classList.add("hidden");
  $("#sync-wait-text")?.classList.remove("hidden");
  try {
    const code = await RoomSync.createRoom();
    $("#sync-host-box").classList.remove("hidden");
    $("#sync-room-code").textContent = code;
  } catch {
    $("#sync-err").textContent = "创建失败，请检查网络或稍后重试";
  }
});

$("#btn-sync-join").addEventListener("click", async () => {
  const code = $("#sync-join-code").value.trim();
  if (code.length < 4) { $("#sync-err").textContent = "请输入房间码"; return; }
  $("#sync-err").textContent = "连接中…";
  try {
    await RoomSync.joinRoom(code);
    showToast("已连接，等待主机开始");
    showScreen("hub");
  } catch {
    $("#sync-err").textContent = "加入失败，确认房间码与网络";
  }
});

$$(".sync-mode-btn").forEach((b) => b.addEventListener("click", () => {
  if (!RoomSync.connected) { showToast("等待对方加入"); return; }
  const m = b.dataset.sync;
  if (m === "free") showScreen("freePick");
  else if (m === "campaign") startCampaign(true);
  else if (m === "pk") startPk();
  else if (m === "daily") startDaily();
  else if (m === "story") { renderSceneList(); showScreen("scenePick"); }
  else if (m === "erotica") { renderEroticaList(); showScreen("eroticaPick"); }
}));

$("#btn-sync-back").addEventListener("click", () => {
  RoomSync.destroy();
  $("#sync-start-box")?.classList.add("hidden");
  $("#sync-wait-text")?.classList.remove("hidden");
  showScreen("hub");
});

$("#toggle-voice").addEventListener("change", (e) => {
  profile.voiceEnabled = e.target.checked;
  saveProfile();
  if (profile.voiceEnabled) { unlockAchievement("voice_on"); Voice.speak("语音已开启"); }
});

$("#toggle-custom").addEventListener("change", (e) => {
  profile.useCustomCards = e.target.checked;
  saveProfile();
});

$("#btn-continue").addEventListener("click", () => {
  if (loadGame()) {
    if (state.isBossRound || state.roundInChapter > 0) { showScreen("game"); startRound(); }
    else showChapterIntro();
  }
});

$("#btn-chapter-start").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("chapter_start"); return; }
  showScreen("game"); startRound();
});
$("#btn-next-chapter").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("next_chapter"); return; }
  if (isStory()) { advanceStoryStage(); return; }
  if (state.chapterIndex >= getMaxChapterIndex()) showVictory();
  else { state.chapterIndex++; saveGame(); showChapterIntro(); }
});
$("#btn-clear-menu").addEventListener("click", () => { saveGame(); showScreen("hub"); renderHub(); });
$("#btn-challenge-back").addEventListener("click", () => showScreen("hub"));
$("#btn-scene-back").addEventListener("click", () => showScreen("hub"));
$("#btn-erotica-pick-back").addEventListener("click", () => showScreen("hub"));
$("#btn-erotica-read-back").addEventListener("click", () => {
  if (confirm("退出当前故事？进度不会保存。")) { showScreen("eroticaPick"); renderEroticaList(); }
});
$("#btn-erotica-quit").addEventListener("click", () => {
  if (confirm("退出当前故事？")) { showScreen("hub"); renderHub(); }
});
$("#btn-erotica-done").addEventListener("click", () => advanceEroticaSection());
$("#btn-erotica-refresh-play")?.addEventListener("click", () => refreshEroticaPlay());
$("#btn-erotica-fantasy-card")?.addEventListener("click", () => drawEroticaFantasyCard());
$("#btn-erotica-random")?.addEventListener("click", () => startRandomErotica());
$$('input[name="scene-filter"]').forEach((r) => r.addEventListener("change", renderSceneList));
$$('input[name="scene-cat-filter"]').forEach((r) => r.addEventListener("change", renderSceneList));
$$('input[name="erotica-cat-filter"]').forEach((r) => r.addEventListener("change", renderEroticaList));
$$('input[name="mode"]').forEach((r) => r.addEventListener("change", updateFreeSceneField));
$("#btn-free-start").addEventListener("click", () => startFreeGame());
$("#btn-free-back").addEventListener("click", () => showScreen("hub"));
$("#btn-hub-back").addEventListener("click", () => showScreen("welcome"));
$("#btn-hub-diff").addEventListener("click", cycleDifficulty);
$("#btn-achievements").addEventListener("click", () => { renderAchievements(); showScreen("achievements"); });
$("#btn-editor").addEventListener("click", () => { renderEditor(); showScreen("editor"); });
$$(".sub-back").forEach((b) => b.addEventListener("click", () => { showScreen(b.dataset.back); renderHub(); }));

$("#editor-form").addEventListener("submit", (e) => {
  e.preventDefault();
  addCustomCard({ text: $("#editor-text").value, type: $("#editor-type").value, intensity: $("#editor-intensity").value });
  $("#editor-text").value = ""; renderEditor();
});
$("#editor-mix").addEventListener("change", (e) => { profile.useCustomCards = e.target.checked; saveProfile(); });
$("#btn-export").addEventListener("click", () => { navigator.clipboard?.writeText(exportCustomCards()); showToast("已复制 JSON 到剪贴板"); });
$("#btn-import").addEventListener("click", () => {
  const j = prompt("粘贴 JSON");
  if (j) try { importCustomCards(j); renderEditor(); showToast("导入成功"); } catch { showToast("格式错误"); }
});

$("#pk-pick-a").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("pk", 0); return; }
  resolvePk(0);
});
$("#pk-pick-b").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("pk", 1); return; }
  resolvePk(1);
});
$("#pk-draw").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("pk", null); return; }
  resolvePk(null);
});

$("#card").addEventListener("click", (e) => {
  if (e.target.closest(".choice-btn")) return;
  if (RoomSync.isGuest()) { RoomSync.sendAction("flip"); return; }
  flipCard();
});
let touchStartY = 0;
$("#card")?.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
$("#card")?.addEventListener("touchend", (e) => { if (touchStartY - e.changedTouches[0].clientY > 40 && !state.flipped) flipCard(); }, { passive: true });

$("#btn-done").addEventListener("click", onDone);
$("#btn-next").addEventListener("click", onSkip);
$("#btn-skip").addEventListener("click", () => {
  if (!state.flipped && state.mode === "cards") { flipCard(); setTimeout(onSkip, 280); } else onSkip();
});
$("#btn-back").addEventListener("click", () => {
  if (confirm("退出本局？") ) { stopTimer(); if (isCampaign()) saveGame(); showScreen("hub"); renderHub(); }
});
$("#btn-settings").addEventListener("click", () => {
  if (isStructured()) return;
  const modes = Object.keys(GAME_MODES);
  state.mode = modes[(modes.indexOf(state.mode) + 1) % modes.length];
  if (state.mode === "cards") state.deck = buildDeck();
  startRound();
});
$("#btn-roll").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("roll"); return; }
  rollDice();
});
$("#btn-spin").addEventListener("click", () => {
  if (RoomSync.isGuest()) { RoomSync.sendAction("spin"); return; }
  spinWheel();
});
$$(".mystery-card").forEach((el) => el.addEventListener("click", () => pickMystery(Number(el.dataset.idx))));

$("#btn-restart").addEventListener("click", () => showScreen("hub"));
$("#btn-new-setup").addEventListener("click", () => { showScreen("hub"); renderHub(); });
$("#btn-install-help").addEventListener("click", () => $("#install-modal").classList.add("show"));
$("#btn-close-modal").addEventListener("click", () => $("#install-modal").classList.remove("show"));

if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
initGalgame();
initOrionGame();