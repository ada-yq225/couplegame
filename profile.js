const PROFILE_KEY = "miyu-profile-v1";
const CUSTOM_KEY = "miyu-custom-v1";

const defaultProfile = () => ({
  xp: 0,
  level: 1,
  gamesPlayed: 0,
  campaignClears: 0,
  pkWinsA: 0,
  pkWinsB: 0,
  maxStreak: 0,
  achievements: [],
  inventory: [],
  difficulty: "normal",
  useCustomCards: true,
  voiceEnabled: true,
  campaignClearsForSecret: 0,
  lastSceneId: "",
  lastEroticaId: "",
  dailyLast: "",
  dailyDone: false,
  stats: { completed: 0, skipped: 0, bosses: 0, itemsUsed: 0 },
});

let profile = defaultProfile();
let customCards = [];

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) profile = { ...defaultProfile(), ...JSON.parse(raw) };
  } catch {
    profile = defaultProfile();
  }
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (raw) customCards = JSON.parse(raw);
  } catch {
    customCards = [];
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(customCards));
}

function xpForLevel(lv) {
  return lv * 120 + (lv - 1) * 80;
}

function addXP(amount) {
  profile.xp += amount;
  while (profile.xp >= xpForLevel(profile.level + 1) && profile.level < 50) {
    profile.xp -= xpForLevel(profile.level + 1);
    profile.level++;
    showToast?.(`升级！Lv.${profile.level}`, 3000);
    grantLevelReward(profile.level);
  }
  saveProfile();
  renderHubProfile?.();
}

function grantLevelReward(lv) {
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  if (item && profile.inventory.length < 8) {
    profile.inventory.push({ id: item.id, earnedAt: Date.now() });
    if (typeof showToast === "function") showToast(`获得道具：${item.icon} ${item.name}`, 3500);
  }
}

function unlockAchievement(id) {
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach || profile.achievements.includes(id)) return false;
  profile.achievements.push(id);
  addXP(ach.xp);
  showToast?.(`成就解锁：${ach.icon} ${ach.name}`, 4000);
  saveProfile();
  renderAchievements?.();
  return true;
}

function checkAchievements(ctx) {
  const { streak, totalStars, playStyle, scoreA, scoreB, skipped, chapterIndex, isBoss } = ctx;
  if (ctx.completed >= 1) unlockAchievement("first_done");
  if (streak >= 5) unlockAchievement("streak5");
  if (streak >= 10) unlockAchievement("streak10");
  if (streak > profile.maxStreak) {
    profile.maxStreak = streak;
    saveProfile();
  }
  if (totalStars >= 9) unlockAchievement("stars9");
  if (totalStars >= 15) unlockAchievement("stars15");
  if (playStyle === "campaign" && ctx.campaignClear) {
    profile.campaignClears++;
    profile.campaignClearsForSecret = (profile.campaignClearsForSecret || 0) + 1;
    unlockAchievement("campaign_clear");
    if (ctx.chapterIndex >= 8) unlockAchievement("chapter9");
    if (profile.campaignClears >= 3) unlockAchievement("campaign_x3");
    if (skipped === 0) unlockAchievement("no_skip_run");
  }
  if (totalStars >= 24) unlockAchievement("stars24");
  if (totalStars >= 27) unlockAchievement("stars27");
  if (ctx.secretClear) unlockAchievement("myth_clear");
  if (playStyle === "pk" && ctx.pkWinner === 0) {
    profile.pkWinsA++;
    unlockAchievement("pk_win");
  }
  if (playStyle === "pk" && ctx.pkWinner === 1) {
    profile.pkWinsB++;
    unlockAchievement("pk_win");
  }
  if (playStyle === "daily" && ctx.dailyClear) unlockAchievement("daily_clear");
  if (playStyle === "challenge" && ctx.challengeClear) unlockAchievement("challenge_clear");
  if (customCards.length >= 5) unlockAchievement("editor5");
  if (isBoss) unlockAchievement("boss_kill");
  if (scoreA > 200 || scoreB > 200) unlockAchievement("score200");
  saveProfile();
}

function addCustomCard(card) {
  customCards.push({
    id: Date.now().toString(36),
    text: card.text.trim(),
    type: card.type,
    intensity: card.intensity,
  });
  saveProfile();
  if (customCards.length >= 1) unlockAchievement("editor1");
}

function deleteCustomCard(id) {
  customCards = customCards.filter((c) => c.id !== id);
  saveProfile();
}

function exportCustomCards() {
  return JSON.stringify(customCards, null, 2);
}

function importCustomCards(json) {
  const arr = JSON.parse(json);
  if (!Array.isArray(arr)) throw new Error("invalid");
  customCards = arr.map((c) => ({
    id: c.id || Date.now().toString(36) + Math.random().toString(36).slice(2),
    text: c.text,
    type: c.type || "serve",
    intensity: c.intensity || "hot",
  }));
  saveProfile();
}

function getCustomPool(intensity, type) {
  if (!profile.useCustomCards) return [];
  return customCards.filter((c) => c.intensity === intensity && c.type === type);
}

function pickCardText(intensity, type) {
  const custom = getCustomPool(intensity, type);
  const base = CARDS[intensity]?.[type] || [];
  const pool = [...base, ...custom.map((c) => c.text)];
  const recent = state?.recentCardTexts || [];
  const fresh = pool.filter((t) => !recent.includes(t));
  const text = pick(fresh.length ? fresh : pool);
  if (state) state.recentCardTexts = [...recent, text].slice(-18);
  return text;
}

function getSceneScenarioPool(kind, sceneId) {
  if (!sceneId || typeof SCENE_CATALOG === "undefined") return [];
  const scene = SCENE_CATALOG[sceneId];
  if (!scene) return [];
  const pool = [];
  scene.stages.forEach((st) => st.rounds.forEach((r) => { if (r.kind === kind) pool.push(r.text); }));
  return pool;
}

function pickScenario(kind) {
  const sceneId = state?.sceneId || state?.selectedSceneId;
  const scenePool = getSceneScenarioPool(kind, sceneId);
  const base = SCENARIO_PACKS?.[state?.forceIntensity || state?.intensity || "hot"]?.[kind]
    || SCENARIO_PACKS?.hot?.[kind] || [];
  const pack = scenePool.length && sceneId ? scenePool : base;
  if (!pack.length) return "自由发挥，按你们的心情来。";
  const recent = state?.recentScenarioTexts || [];
  const fresh = pack.filter((t) => !recent.includes(t));
  const text = pick(fresh.length ? fresh : pack);
  if (state) state.recentScenarioTexts = [...recent, text].slice(-14);
  return text;
}

function getDailySeed() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getDailyChallenge() {
  const seed = getDailySeed();
  if (profile.dailyLast !== seed) {
    profile.dailyLast = seed;
    profile.dailyDone = false;
    saveProfile();
  }
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const r = (n) => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h % n;
  };
  const mod = DAILY_MODIFIERS[r(DAILY_MODIFIERS.length)];
  const intensity = mod.intensity || ["warm", "hot", "deep"][r(3)];
  const modes = ["cards", "dice", "wheel", "mystery"];
  const roundCount = mod.rounds || 12;
  const briefs = typeof DAILY_BRIEFS !== "undefined" ? DAILY_BRIEFS : [];
  const rounds = Array.from({ length: roundCount }, (_, i) => {
    const brief = briefs[i % briefs.length] || `今日第 ${i + 1} 关`;
    if (mod.modeLock) return { mode: mod.modeLock, tag: `每日 ${i + 1}`, brief };
    if (mod.edgeBias && r(10) < 6) {
      return {
        mode: "cards", tag: `边缘 ${i + 1}`, brief: "今日主题：边缘控制，快到顶时停下。",
        text: "把{other}弄到快高潮，停三十秒，再重复一次。", type: "serve", timer: mod.timer || 60,
      };
    }
    if (mod.scenarioBias && r(10) < 5) {
      return { mode: "scenario", tag: `情境 ${i + 1}`, brief, scenarioKind: mod.scenarioKind || pick(["roleplay", "dare", "confess"]) };
    }
    if (mod.syncBias && r(10) < 7) return { mode: "cards", tag: `缠绵 ${i + 1}`, brief, syncBias: true };
    if (r(10) < 3 && typeof CHALLENGE_DARES !== "undefined") {
      return { mode: "scenario", tag: `挑战 ${i + 1}`, brief, scenarioKind: "dare" };
    }
    return { mode: modes[r(modes.length)], tag: `每日 ${i + 1}`, brief };
  });
  return { seed, mod, intensity, rounds, done: profile.dailyDone };
}

function markDailyDone() {
  profile.dailyDone = true;
  addXP(150);
  unlockAchievement("daily_clear");
  saveProfile();
}

function useItem(itemId) {
  const idx = profile.inventory.findIndex((i) => i.id === itemId);
  if (idx === -1) return null;
  profile.inventory.splice(idx, 1);
  profile.stats.itemsUsed++;
  if (profile.stats.itemsUsed >= 10) unlockAchievement("item_master");
  saveProfile();
  return ITEMS.find((i) => i.id === itemId);
}

function refillInventory() {
  if (profile.inventory.length >= 3) return;
  const item = pick(ITEMS);
  profile.inventory.push({ id: item.id, earnedAt: Date.now() });
  saveProfile();
}

loadProfile();