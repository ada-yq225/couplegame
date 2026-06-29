/* 蜜语 · Roguelike 学期攻略 */

const GAL_RUN_WEEKS = 12;
const GAL_RUN_ENERGY = 3;

const GAL_ROGUE_EVENTS = [
  {
    id: "rain",
    name: "暴雨困教室",
    icon: "🌧️",
    text: "暴雨突至，最后一班车停了。{char}湿衫贴体：「……今晚走不了。」",
    aff: 12,
    lust: 15,
    strip: true,
  },
  {
    id: "festival",
    name: "文化祭后台",
    icon: "🎭",
    text: "文化祭后台只剩你们，{char}戏服还没换：「帮忙拉链……手别乱摸——乱摸也行。」",
    aff: 10,
    lust: 20,
    outfitUnlock: "bunny_suit",
  },
  {
    id: "exam",
    name: "考前夜",
    icon: "📝",
    text: "考前夜图书馆通宵，{char}趴桌上睡熟，裙摆滑上去……",
    aff: 8,
    lust: 10,
  },
  {
    id: "drunk",
    name: "联谊喝多",
    icon: "🍺",
    text: "{char}喝多了拽你进楼梯间：「我清醒……就是想亲你。」",
    aff: 14,
    lust: 18,
    strip: true,
  },
  {
    id: "peeping",
    name: "温泉旅行",
    icon: "♨️",
    text: "社团温泉，雾气里{char}以为无人，解开浴巾——和你对视。",
    aff: 15,
    lust: 25,
    outfitUnlock: "towel_wrap",
  },
  {
    id: "blackout",
    name: "全校停电",
    icon: "🔦",
    text: "停电，电梯困住。黑暗里{char}贴上来：「怕就抱紧……」",
    aff: 11,
    lust: 16,
  },
  {
    id: "confession",
    name: "樱花树下告白",
    icon: "🌸",
    text: "樱花雨里{char}先开口：「我喜欢你——后面的，你也懂吧？」",
    aff: 20,
    lust: 5,
  },
  {
    id: "jealous",
    name: "吃醋事件",
    icon: "💢",
    text: "有人和{char}搭讪，{char}拽你进储物间：「证明我是你的。」",
    aff: 5,
    lust: 22,
    strip: true,
  },
  {
    id: "sick",
    name: "病中照顾",
    icon: "🤒",
    text: "{char}发烧躺在校医院，领口敞开：「……别走。」",
    aff: 13,
    lust: 8,
  },
  {
    id: "model",
    name: "人体素描课",
    icon: "🖌️",
    text: "画室缺模特，{char}看你：「只给你看……脱。」",
    aff: 16,
    lust: 20,
    outfitUnlock: "paint_stained",
  },
  {
    id: "night_run",
    name: "深夜操场",
    icon: "🏃",
    text: "深夜操场跑步，{char}汗衫湿透：「一起冲圈……然后冲我。」",
    aff: 9,
    lust: 17,
  },
  {
    id: "gift",
    name: "情趣礼物",
    icon: "🎁",
    text: "快递拆开是蕾丝内衣，{char}脸红：「你买的？……现在穿给你看。」",
    aff: 12,
    lust: 24,
    outfitUnlock: "lingerie_black",
  },
];

function getGalRun() {
  ensureGalProfile();
  if (!profile.galgame._run) {
    profile.galgame._run = null;
  }
  return profile.galgame._run;
}

function saveGalRun() {
  saveProfile();
}

function startNewGalRun(heroineId) {
  const heroine = getHeroine(heroineId);
  if (!heroine) return;

  const meta = getGalCampusMeta();
  meta.activeHeroine = heroineId;
  meta.activeRoute = heroine.routeId;
  galRuntime.heroineId = heroineId;
  galRuntime.routeId = heroine.routeId;

  profile.galgame._run = {
    heroineId,
    routeId: heroine.routeId,
    week: 1,
    energy: GAL_RUN_ENERGY,
    lust: 0,
    eventsSeen: [],
    totalRuns: (meta.totalRuns || 0) + 1,
    runSexCount: 0,
    runStripCount: 0,
    wardrobe: { baseOutfit: heroine.defaultOutfit, strippedLayers: [], sexOutfitId: heroine.defaultOutfit },
  };

  initRunWardrobe(heroine);
  saveGal();

  const save = getGalSave(heroine.routeId);
  if (save.affection === 0) {
    showToast?.(`新学期开始 · 攻略 ${heroine.name}`, 3000);
  }
}

function consumeRunEnergy(cost = 1) {
  const run = getGalRun();
  if (!run) return false;
  if (run.energy < cost) {
    showToast?.("本周体力用完了，结束本周 →");
    return false;
  }
  run.energy -= cost;
  saveGalRun();
  updateRunHud();
  if (run.energy <= 0) endGalWeek();
  return true;
}

function addRunLust(delta) {
  const run = getGalRun();
  if (!run) return;
  run.lust = Math.min(100, (run.lust || 0) + delta);
  saveGalRun();
  updateRunHud();
}

function endGalWeek() {
  const run = getGalRun();
  if (!run) return;

  const heroine = getHeroine(run.heroineId);
  const event = pickRandomRoguelikeEvent(run, heroine);

  run.week++;
  run.energy = GAL_RUN_ENERGY;
  getRunWardrobe().strippedLayers = [];
  saveGalRun();

  if (run.week > GAL_RUN_WEEKS) {
    finishGalSemester();
    return;
  }

  if (event) {
    showRoguelikeEvent(event, heroine);
  } else {
    showToast?.(`第 ${run.week} 周开始 · 体力恢复`, 2800);
    renderGalCampusMap();
    showScreen("galCampus");
  }
  updateRunHud();
}

function pickRandomRoguelikeEvent(run, heroine) {
  const pool = GAL_ROGUE_EVENTS.filter((e) => !run.eventsSeen.includes(e.id));
  if (!pool.length) return null;
  const ev = galPick(pool);
  run.eventsSeen.push(ev.id);
  saveGalRun();
  return ev;
}

function showRoguelikeEvent(event, heroine) {
  galRuntime.beats = [
    { speaker: "旁白", text: `【第${getGalRun().week - 1}周末 · ${event.name}】`, choices: null },
    { speaker: heroine.name, text: galFill(event.text, heroine.name), choices: null },
    {
      speaker: "你",
      text: "怎么做？",
      choices: [
        { text: "🔥 顺势做爱", full: "就地做爱", aff: Math.floor(event.aff * 0.6), bold: true, action: "sex", lust: event.lust },
        { text: "💋 趁机亲热", full: "亲热", aff: event.aff, bold: true, action: "date" },
        { text: "👗 帮她换装", full: "换装", aff: 5, action: "outfit", outfitUnlock: event.outfitUnlock },
        { text: "🫣 克制跳过", full: "跳过", aff: 2 },
      ],
    },
  ];
  galRuntime.beatIndex = 0;
  galRuntime.rogueEvent = event;

  if (event.strip) {
    const w = getRunWardrobe();
    const def = getOutfitDef(w.baseOutfit);
    if (def.layers?.length) w.strippedLayers = def.layers.slice(0, 2).map((l) => l.id);
    saveGalRun();
  }

  if (event.outfitUnlock) unlockOutfit(event.outfitUnlock);

  $("#gal-dialogue-box").classList.remove("hidden");
  $("#gal-toolbar").classList.add("hidden");
  updateGalHud();
  renderGalBeat();
  showScreen("galPlay");
}

function unlockOutfit(outfitId) {
  if (!outfitId) return;
  const meta = getGalCampusMeta();
  if (!meta.unlockedOutfits) meta.unlockedOutfits = [];
  if (!meta.unlockedOutfits.includes(outfitId)) {
    meta.unlockedOutfits.push(outfitId);
    const o = getOutfitDef(outfitId);
    showToast?.(`解锁换装：${o.name}`, 3500);
    saveGal();
  }
}

function finishGalSemester() {
  const run = getGalRun();
  const heroine = getHeroine(run?.heroineId);
  const routeId = run?.routeId;
  const save = routeId ? getGalSave(routeId) : null;
  const meta = getGalCampusMeta();

  const aff = save?.affection || 0;
  const conquered = aff >= GAL_CONQUER_AFF;
  const shards = Math.floor(aff / 10) + (run?.runSexCount || 0) * 2;
  meta.shards = (meta.shards || 0) + shards;
  meta.totalRuns = meta.totalRuns || 0;

  let endingTitle = "学期结束";
  let endingMsg = `${heroine?.name || ""} 好感 ${aff}，做爱 ${run?.runSexCount || 0} 次。`;
  if (conquered && save?.ending) {
    endingTitle = `${heroine.name} · 完美攻略`;
    endingMsg = "整学期欲望与羁绊拉满，校外地图全开，换装全解锁在路上。";
  } else if (conquered) {
    endingTitle = `${heroine.name} · 攻略成功`;
    endingMsg = "她已经属于你，下一学期可继续 Roguelike 或换女主。";
  } else {
    endingMsg += " 好感不足，下学期再来。";
  }

  profile.galgame._run = null;
  saveGal();

  addXP(150 + shards * 5);

  $("#end-emoji").textContent = heroine?.icon || "💋";
  $("#end-title").textContent = endingTitle;
  $("#end-rank").textContent = `羁绊碎片 +${shards}（累计 ${meta.shards}）`;
  $("#end-stats").textContent = `第 ${meta.totalRuns} 学期 · lust 峰值 ${run?.lust || 0}`;
  $("#end-message").textContent = endingMsg;
  $("#end-xp").textContent = `+${150 + shards * 5} XP`;
  showScreen("end");
}

function updateRunHud() {
  const run = getGalRun();
  const el = $("#gal-run-hud");
  if (!el) return;
  if (!run) {
    el.classList.add("hidden");
    return;
  }
  el.classList.remove("hidden");
  $("#gal-run-week").textContent = `第 ${run.week}/${GAL_RUN_WEEKS} 周`;
  $("#gal-run-energy").textContent = "⚡".repeat(run.energy) + "○".repeat(Math.max(0, GAL_RUN_ENERGY - run.energy));
  $("#gal-run-lust").textContent = `欲 ${run.lust || 0}`;
  const strip = getRemainingLayers().length;
  $("#gal-run-strip").textContent = strip ? `还可脱 ${strip} 件` : "已脱光";
}