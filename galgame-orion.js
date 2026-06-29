/* 蜜语 · Orion 式校园 Roguelike 引擎 */

let orionState = null;
const orionPeople = () => orionGetPeople();
const orionSceneContent = () => window.ORION_GAL_SCENE_CONTENT ?? {};

const orionEls = {};

function orionInitEls() {
  const ids = [
    "orion-week", "orion-day", "orion-weather", "orion-energy", "orion-stress",
    "orion-study", "orion-charm", "orion-trust", "orion-money", "orion-spark",
    "orion-relationships", "orion-inventory", "orion-traits", "orion-gallery",
    "orion-location", "orion-scene-title", "orion-scene-text", "orion-choices", "orion-log",
  ];
  ids.forEach((id) => { orionEls[id.replace(/-/g, "_")] = document.querySelector(`#${id}`); });
  orionEls.orion_week = $("#orion-week");
  orionEls.orion_day = $("#orion-day");
  orionEls.orion_weather = $("#orion-weather");
  orionEls.orion_energy = $("#orion-energy");
  orionEls.orion_stress = $("#orion-stress");
  orionEls.orion_study = $("#orion-study");
  orionEls.orion_charm = $("#orion-charm");
  orionEls.orion_trust = $("#orion-trust");
  orionEls.orion_money = $("#orion-money");
  orionEls.orion_spark = $("#orion-spark");
  orionEls.orion_relationships = $("#orion-relationships");
  orionEls.orion_inventory = $("#orion-inventory");
  orionEls.orion_traits = $("#orion-traits");
  orionEls.orion_gallery = $("#orion-gallery");
  orionEls.orion_location = $("#orion-location");
  orionEls.orion_scene_title = $("#orion-scene-title");
  orionEls.orion_scene_text = $("#orion-scene-text");
  orionEls.orion_choices = $("#orion-choices");
  orionEls.orion_log = $("#orion-log");
}

function orionClamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function orionD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function orionPickMany(list, count) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}

function orionRollWeather() {
  return orionPickMany(["晴", "雨夜", "闷热", "大风", "考试周", "社团日"], 1)[0];
}

function orionHasTrait(apply) {
  return orionState.traits.some((t) => t.apply === apply);
}

function orionPreferenceMatches(personId) {
  const p = orionPreferenceProfiles.find((x) => x.id === orionState.preference);
  return Boolean(p?.matches.includes(personId));
}

function orionSaveRun() {
  ensureGalProfile();
  profile.galgame.orionState = JSON.parse(JSON.stringify(orionState));
  saveProfile();
}

function orionLoadRun() {
  ensureGalProfile();
  if (profile.galgame.orionState && !profile.galgame.orionState.ended) {
    orionState = profile.galgame.orionState;
    if (!orionState.strategyUsedToday) orionState.strategyUsedToday = {};
    if (!orionState.breatherSeen) orionState.breatherSeen = {};
    return true;
  }
  return false;
}

function orionStartRun() {
  const player = state.nameB || "你";
  orionState = {
    week: 1,
    day: 1,
    energy: 8,
    stress: 2,
    study: 5,
    charm: 3,
    trust: 1,
    money: 6,
    spark: 0,
    preference: null,
    routePlan: null,
    streakPerson: null,
    streak: 0,
    calmUsed: false,
    weather: orionRollWeather(),
    sceneMode: "preference",
    playerName: player,
    traits: orionPickMany(orionTraitsPool, 3),
    inventory: orionPickMany(orionShopItems, 2).map((i) => i.name),
    relationships: Object.fromEntries(
      orionPeople().map((p) => [p.id, { affection: 0, intimacy: 0, scenes: [], dates: 0, story: 0, clear: false, kinks: [] }])
    ),
    current: {
      location: "性癖罗盘",
      title: "这轮你想怎么被操/怎么操人？",
      text: `选择${player}本轮偏好的张力。纯爱羁绊、慢热淫荡、偷情刺激、肉体直球或多线肉欲——会影响好感、剧情风格与 H 描写。`,
    },
    ended: false,
    sexOutfit: {},
    strategyUsedToday: {},
  };
  orionSaveRun();
  orionRender(`青藤大学的夜，从你选择「想怎么被操、怎么操人」开始。二十四周、四幕剧情、五个女人与专属攻略——慢慢来，让每一次呼吸都听得见。`);
}

function orionEnterGame() {
  state.playStyle = "galgame";
  orionInitEls();
  if (orionLoadRun()) {
    showScreen("galOrion");
    orionRender("读取进度成功。");
    return;
  }
  orionStartRun();
  showScreen("galOrion");
}

function orionDrawRandomEvent(logText = "") {
  if (orionCheckEnding()) return;
  if (orionState.day === 7) {
    if (typeof ORION_BREATHER_WEEKS !== "undefined" && ORION_BREATHER_WEEKS.includes(orionState.week)) {
      if (!orionState.breatherSeen) orionState.breatherSeen = {};
      if (!orionState.breatherSeen[orionState.week]) {
        orionState.breatherSeen[orionState.week] = true;
        orionOpenBreatherWeek(logText);
        return;
      }
    }
    orionOpenExam(logText);
    return;
  }
  const milestone = orionSemesterMilestones?.[orionState.week];
  if (orionState.day === 1 && milestone && !orionState.milestonesSeen?.[orionState.week]) {
    if (!orionState.milestonesSeen) orionState.milestonesSeen = {};
    orionState.milestonesSeen[orionState.week] = true;
    orionState.sceneMode = "event";
    orionState.beatIndex = 0;
    orionState.current = {
      type: "campus",
      person: null,
      location: "学期里程碑",
      title: milestone.title,
      text: milestone.text,
      tags: [],
    };
    orionRender(logText || milestone.text);
    return;
  }
  if (orionState.day === 1 && Math.random() < 0.38) {
    orionOpenDayHook(1, logText);
    return;
  }
  if (orionState.day === 2 && Math.random() < 0.42) {
    orionOpenDayHook(2, logText);
    return;
  }
  if (orionState.day === 3 && Math.random() < 0.4) {
    orionOpenDayHook(3, logText);
    return;
  }
  if (orionState.day === 4 && Math.random() < 0.55) {
    orionOpenMidWeekEvent(logText);
    return;
  }
  if (orionState.day === 5 && Math.random() < 0.48) {
    orionOpenDayHook(5, logText);
    return;
  }
  if (orionState.day === 6 && Math.random() < 0.45) {
    orionOpenDayHook(6, logText);
    return;
  }
  orionState.sceneMode = "event";
  orionState.beatIndex = 0;
  const weighted = orionEvents.flatMap((ev) => {
    if (!ev.person) return [ev];
    const rel = orionState.relationships[ev.person];
    let w = 1 + (rel.affection >= 4 ? 2 : 0) + (rel.intimacy >= 1 ? 1 : 0);
    if (orionHasTrait("rumor") && rel.affection >= 3) w += 1;
    if (orionState.weather === "雨夜" && ev.tags?.includes("雨夜")) w += 2;
    return Array.from({ length: w }, () => ev);
  });
  orionState.current = weighted[Math.floor(Math.random() * weighted.length)];
  orionRender(logText);
}

function orionOpenDayHook(dayNum, logText) {
  const hook = orionDayHooks?.[dayNum];
  if (!hook) { orionDrawRandomEvent(logText); return; }
  orionState.sceneMode = "event";
  orionState.beatIndex = 0;
  const ranked = orionPeople()
    .map((p) => ({ p, aff: orionState.relationships[p.id].affection }))
    .sort((a, b) => b.aff - a.aff);
  const top = ranked[0];
  if (top.aff >= 1 && Math.random() < 0.72) {
    const person = top.p;
    const rel = orionState.relationships[person.id];
    orionState.current = {
      type: "person",
      person: person.id,
      location: hook.title,
      title: `${person.name} · ${hook.title}`,
      text: `${hook.person(person.name)}\n\n${orionBuildDateText(person, rel)}`,
      tags: ["深夜"],
      beats: [
        { speaker: person.name, text: galFill(orionPickDialogue(person.id, "flirt_ok", rel.dates)) },
        { speaker: "旁白", text: "她看你的眼神，和白天不一样——像已经算好你会选哪一招。" },
      ],
    };
  } else {
    orionState.current = {
      type: "campus",
      person: null,
      location: hook.title,
      title: hook.title,
      text: hook.campus,
      tags: ["深夜"],
    };
  }
  orionRender(logText || hook.title);
}

function orionOpenMidWeekEvent(logText) {
  orionState.sceneMode = "event";
  orionState.beatIndex = 0;
  const top = orionPeople()
    .map((p) => ({ p, aff: orionState.relationships[p.id].affection }))
    .sort((a, b) => b.aff - a.aff)[0];
  if (top.aff >= 2 && Math.random() < 0.7) {
    const person = top.p;
    const rel = orionState.relationships[person.id];
    orionState.current = {
      type: "person",
      person: person.id,
      location: "周三夜约",
      title: `${person.name}的邀约`,
      text: `周三夜里校园异常安静。${person.name}发来消息：「老地方。别迟到。」\n\n${orionBuildDateText(person, rel)}`,
      tags: ["深夜"],
      beats: [
        { speaker: person.name, text: galFill(orionPickDialogue(person.id, "flirt_ok", rel.dates)) },
        { speaker: "旁白", text: "空气又热又稠。你知道今晚很难只是聊天。" },
      ],
    };
  } else {
    const line = galPick(ORION_CAMPUS_DIALOGUE.midweek);
    orionState.current = {
      type: "campus",
      person: null,
      location: "周三夜",
      title: "期中前的松动",
      text: line,
      tags: ["深夜"],
    };
  }
  orionRender(logText || "周三夜——约会日。");
}

function orionAdvanceEventBeat() {
  const ev = orionState.current;
  if (!ev?.beats?.length) return;
  orionState.beatIndex = Math.min((orionState.beatIndex || 0) + 1, ev.beats.length);
  orionSaveRun();
  orionRender();
}

function orionEventBeatsRemaining() {
  const ev = orionState.current;
  if (!ev?.beats?.length) return 0;
  const idx = orionState.beatIndex || 0;
  return Math.max(0, ev.beats.length - idx);
}

function orionOpenExam(logText) {
  orionState.sceneMode = "exam";
  orionState.current = {
    location: "周末考核",
    title: `第 ${orionState.week} 周周末`,
    text: "考试周到了。学业决定能否平稳收尾；性奋和体力也会影响你有多余力气去开房做爱。",
  };
  orionRender(logText);
}

function orionOpenMap() {
  orionState.sceneMode = "map";
  orionState.current = {
    location: "校园地图",
    title: "今晚去哪猎艳",
    text: `主动选地点（共 ${orionLocations.length} 处）更容易邂逅对应女主，高好感地点可「就地发挥」加成。`,
  };
  orionRender("你打开地图，规划今晚的淫行路线。");
}

function orionOpenShop() {
  orionState.sceneMode = "shop";
  orionState.current = {
    location: "情趣便利店",
    title: "深夜采购",
    text: "买对礼物能大幅开腿。润滑、蕾丝、跳蛋——钱花对地方就是春药。",
    offers: orionPickMany(orionShopItems, 4),
  };
  orionRender("自动门响，货架灯光白得色情。");
}

function orionOpenAdultScene(personId) {
  const scenes = orionAdultScenes[personId];
  const rel = orionState.relationships[personId];
  const unseen = scenes.filter((s) => !rel.scenes.includes(s.id));
  const list = unseen.length ? unseen : scenes;
  const scene = list[Math.floor(Math.random() * list.length)];
  orionState.sceneMode = "adult";
  orionState.current = { ...scene, person: personId, location: scene.place || "H 场景" };
  const heroine = getHeroine(personId);
  if (heroine && !orionState.sexOutfit[personId]) {
    orionState.sexOutfit[personId] = heroine.defaultOutfit;
  }
  orionInitHScene(scene);
  orionRender("");
}

function orionOpenGalleryScene(personId, sceneId) {
  const scene = orionAdultScenes[personId].find((s) => s.id === sceneId);
  if (!scene) return;
  orionState.galleryReturnMode = orionState.sceneMode;
  orionState.sceneMode = "gallery";
  orionState.current = { ...scene, person: personId, location: scene.place || "场景回看" };
  orionInitHScene(scene);
  orionState.hPhase = 4;
  orionState.hFinish = "creampie";
  orionState.hPace = "hard";
  orionRender("");
}

function orionOpenRouteMenu() {
  orionState.sceneMode = "route";
  orionState.current = {
    location: "策略调整",
    title: "换打法",
    text: "纯爱慢热、单线加深、后宫、夜游野战、礼物攻势或学业夹缝——随时可改。",
  };
  orionRender("你重新规划接下来的淫行策略。");
}

function orionNextDay() {
  if (orionHasTrait("routine")) orionState.energy = orionClamp(orionState.energy + 1, 0, 14);
  if (orionHasTrait("night") && ["雨夜", "大风"].includes(orionState.weather)) {
    orionState.stress = orionClamp(orionState.stress - 1, 0, 14);
    orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
  }
  orionState.energy = orionClamp(orionState.energy + 1, 0, 14);
  orionState.stress = orionClamp(orionState.stress + 1 + (orionState.routePlan === "night" ? 1 : 0), 0, 14);
  orionState.study = orionClamp(orionState.study - (Math.random() < 0.22 ? 1 : 0), 0, 14);
  if (orionState.routePlan === "night" && Math.random() < 0.35) {
    orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
  }
  orionState.day += 1;
  orionState.strategyUsedToday = {};
  if (orionState.day !== 7) orionState.weather = orionRollWeather();
}

function orionNextWeek() {
  orionState.day = 1;
  orionState.week += 1;
  orionState.energy = orionClamp(orionState.energy + 5, 0, 14);
  orionState.stress = orionClamp(orionState.stress - 2, 0, 14);
  orionState.weather = orionRollWeather();
  if (orionState.week <= ORION_WEEKS) orionChooseWeeklyReward();
}

function orionChooseWeeklyReward() {
  orionState.sceneMode = "reward";
  orionState.current = {
    location: "周奖励",
    title: "撑过一周",
    text: "选奖励：钱、体力、性奋或信任。下周继续操翻校园。",
  };
}

function orionApplyChoice(delta, logText, personId = null) {
  for (const [key, val] of Object.entries(delta)) {
    orionState[key] = orionClamp((orionState[key] ?? 0) + val, 0, 14);
  }
  if (personId) {
    if (orionState.streakPerson === personId) orionState.streak += 1;
    else { orionState.streakPerson = personId; orionState.streak = 1; }
  } else {
    orionState.streak = 0;
    orionState.streakPerson = null;
  }
  orionNextDay();
  orionSaveRun();
  orionDrawRandomEvent(logText);
}

function orionGetChoices(event) {
  const mode = orionState.sceneMode;
  if (mode === "preference") return orionPreferenceProfiles.map((p) => ({
    label: p.name, hint: p.desc,
    run: () => { orionState.preference = p.id; orionState.sceneMode = "route"; orionState.current = { location: "攻略策略", title: p.id === "purelove" ? "怎么爱这学期" : "怎么操这学期", text: p.id === "purelove" ? "选纯爱慢热，或其他路线计划。六档关系走扎实，心动先于肉欲。" : "选单线、多线、夜游、礼物、学业夹缝或纯爱慢热。" }; orionRender(`已选性癖：${p.name}`); },
  }));
  if (mode === "route") return orionRoutePlans.map((p) => ({
    label: p.name, hint: p.style,
    run: () => { orionState.routePlan = p.id; orionState.sceneMode = "event"; orionRender(`策略：${p.name}。校园生活开始。`); orionDrawRandomEvent(); },
  }));
  if (mode === "reward") {
    const base = [
      { label: "零花钱", hint: "金钱 +5", run: () => orionReward({ money: 5 }, "零花钱到账，可以买套了。") },
      { label: "睡饱", hint: "体力 +5 欲压 -3", run: () => orionReward({ energy: 5, stress: -3 }, "睡饱又能硬了。") },
      { label: "春梦", hint: "性奋 +3 魅力 +1", run: () => orionReward({ spark: 3, charm: 1 }, "梦里操过了，醒来更饿。") },
      { label: "坦白局", hint: "信任 +3", run: () => orionReward({ trust: 3 }, "把炮友关系说清楚，反而更色。") },
    ];
    if (orionState.breatherMode) return typeof orionGetBreatherChoices === "function" ? orionGetBreatherChoices() : base;
    if (orionState.week >= 8 && typeof ORION_WEEKLY_EXTRA_REWARDS !== "undefined") {
      return base.concat(ORION_WEEKLY_EXTRA_REWARDS);
    }
    return base;
  }
  if (mode === "gallery") return [{ label: "返回", hint: "回校园", run: () => { orionState.sceneMode = orionState.galleryReturnMode || "event"; orionRender(); } }];
  if (mode === "strategy") return orionGetStrategyChoices(event);
  if (mode === "playmenu") return orionGetPlayMenuChoices(event);
  if (mode === "play") return orionGetPlaySceneChoices(event);
  if (mode === "adult") return orionGetAdultChoices(event);
  if (mode === "event" && orionEventBeatsRemaining() > 0) {
    const next = orionState.current.beats[orionState.beatIndex || 0];
    return [{
      label: "继续听她说",
      hint: next?.speaker ? `${next.speaker}的声音贴近耳边` : "空气越来越烫",
      run: () => orionAdvanceEventBeat(),
    }];
  }
  if (mode === "shop") return orionGetShopChoices(event);
  if (mode === "map") return orionLocations.map((loc) => ({
    label: loc.name, hint: orionSummarizeLoc(loc),
    run: () => orionVisitLocation(loc),
  })).concat([{ label: "返回", hint: "取消", run: () => orionDrawRandomEvent("取消出门。") }]);
  if (mode === "exam") return orionGetExamChoices();
  if (!event.person) return orionGetCampusChoices(event);
  return orionGetPersonChoices(event);
}

function orionGetPersonChoices(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  if (!person) return orionGetCampusChoices(event);
  const rel = orionState.relationships[person.id];
  if (!rel) return orionGetCampusChoices(event);
  const stage = typeof orionGetRelationStage === "function" ? orionGetRelationStage(rel) : { label: "陌生" };
  const availStrats = typeof orionGetStrategyDefs === "function"
    ? orionGetStrategyDefs(person).filter((d) => typeof orionStrategyAvailable === "function" && orionStrategyAvailable(d, person, rel))
    : [];
  const choices = [
    { label: "🌙 单独约会", hint: "长对话 · 好感与性奋上升", run: () => orionDatePerson(person, rel) },
    { label: "💋 撩她", hint: "目光与指尖 · 魅力检定", run: () => orionFlirt(person, rel) },
    { label: "🫂 深夜谈心", hint: "欲望与底线说开", run: () => orionDeepTalk(person, rel) },
    ...(typeof orionOpenStrategyManual === "function" ? [{
      label: `📖 攻略手册（${stage.label}）`, hint: `${availStrats.length} 招可用 · 专属手段`, run: () => orionOpenStrategyManual(person.id),
    }] : []),
  ];
  if (availStrats.length) {
    const top = availStrats[0];
    choices.splice(3, 0, {
      label: `${top.icon} ${top.name}`,
      hint: top.hint,
      run: () => { if (typeof orionExecuteStrategy === "function") orionExecuteStrategy(person, top.id); },
    });
  }
  if (rel.affection >= 3) {
    const topId = availStrats[0]?.id;
    const edge = availStrats.find((d) => d.id === "edge" && d.id !== topId)
      || availStrats.find((d) => ["edge_sketch", "library_corner", "massage_ice"].includes(d.id) && d.id !== topId);
    if (edge) {
      choices.push({ label: `🔥 ${edge.name}`, hint: edge.hint, run: () => { if (typeof orionExecuteStrategy === "function") orionExecuteStrategy(person, edge.id); } });
    }
  }
  if (rel.affection >= 6 && !rel.clear) {
    choices.push({ label: "💗 表白检定", hint: "信任+魅力 · 确认关系", run: () => { if (typeof orionExecuteStrategy === "function") orionExecuteStrategy(person, "confess"); } });
  }
  if (rel.affection >= 3) {
    choices.push({ label: "野战邀约", hint: "检定魅力，成功大幅好感", run: () => orionIntenseApproach(person, rel) });
  }
  if (orionCanAdvanceStory(person.id, rel)) {
    const ch = orionStorylines[person.id][rel.story];
    choices.push({ label: `推进剧情：${ch[0]}`, hint: "耗性奋，好感暴涨", run: () => orionAdvanceStory(person, rel) });
  }
  if (rel.affection >= 5 && orionState.spark >= 1) {
    choices.push({ label: "🔞 带她去做", hint: "分阶段沉浸 H：靠近→脱衣→前戏→插入→高潮", run: () => orionOpenAdultScene(person.id) });
  }
  const plays = orionGetAvailablePlays(person);
  if (plays.length) {
    choices.push({
      label: `🎲 特殊玩法（${plays.length}）`,
      hint: "42+幻想：脱衣扑克/共浴/镜前/课上遥控…",
      run: () => orionOpenPlayMenu(person.id),
    });
  }
  const giftIdx = orionState.inventory.findIndex((n) => person.likes.includes(n));
  if (giftIdx >= 0) {
    const item = orionShopItems.find((i) => i.name === orionState.inventory[giftIdx]);
    choices.push({ label: `送${orionState.inventory[giftIdx]}`, hint: "好感爆发", run: () => orionGiveGift(person, rel, item, giftIdx) });
  }
  const locName = orionState.current?.location;
  const locMatch = locName && orionLocations.find((l) => l.name === locName);
  if (locMatch) {
    choices.push({
      label: `📍 就地发挥（${locName}）`,
      hint: "地点加成 · 性奋+1",
      run: () => orionLocationDeepPlay(person, rel, locMatch),
    });
  }
  choices.push(
    { label: "校园地图", hint: `${orionLocations.length}处可猎艳`, run: () => orionOpenMap() },
    { label: "情趣店", hint: "买礼物", run: () => orionOpenShop() },
    { label: "换策略", hint: "调整路线", run: () => orionOpenRouteMenu() },
    { label: "跳过", hint: "省体力", run: () => orionApplyChoice({ energy: -1 }, `没理${person.name}，但省了点力气。`) }
  );
  return choices;
}

function orionGetCampusChoices() {
  return [
    { label: "校园地图", hint: `${orionLocations.length}处可猎艳`, run: () => orionOpenMap() },
    { label: "情趣便利店", hint: "购物", run: () => orionOpenShop() },
    { label: "自习", hint: "学业 +2 体力 -1", run: () => orionApplyChoice({ study: 2, energy: -1 }, "假装学习，其实在想昨晚。") },
    { label: "换策略", hint: "调整", run: () => orionOpenRouteMenu() },
    { label: "继续", hint: "下一天", run: () => orionApplyChoice({ energy: -1 }, "消磨一夜。") },
  ];
}

function orionGetAdultChoices(scene) {
  const person = orionPeople().find((p) => p.id === scene.person);
  const rel = orionState.relationships[person.id];
  const heroine = getHeroine(person.id);
  const phase = orionGetHPhase();
  const isGallery = orionState.sceneMode === "gallery";

  if (isGallery) {
    return [
      { label: "🔁 重看这一幕", hint: "从头沉浸", run: () => { orionInitHScene(scene); orionRender(); } },
      { label: "返回", hint: "回校园", run: () => { orionState.sceneMode = orionState.galleryReturnMode || "event"; orionRender(); } },
    ];
  }

  const outfits = heroine ? getUnlockedOutfits(heroine) : ["naked"];
  const outfitChoices = outfits.slice(0, 5).map((oid) => {
    const o = getOutfitDef(oid);
    return {
      label: `${o.icon} ${o.name}`,
      hint: (getPersonaOutfitDesc(heroine, oid) || o.sexModifier || "").slice(0, 36),
      run: () => { orionState.sexOutfit[person.id] = oid; orionRender(); },
    };
  });
  const posChoices = Object.entries(GAL_SEX_POSITIONS).map(([id, pos]) => ({
    label: `${pos.icon} ${pos.label}`,
    hint: "体位决定抽插描写",
    run: () => { orionState.adultPosition = id; orionRender(); },
  }));

  if (phase.id === "approach") {
    return [
      { label: "👣 靠近她", hint: "听她呼吸变乱", run: () => { orionState.hApproach = "near"; orionAdvanceHPhase(); } },
      { label: "💋 先吻她", hint: "唇瓣颤着回应", run: () => { orionState.hApproach = "kiss"; orionAdvanceHPhase(); } },
      { label: "🫂 从背后抱她", hint: "脊背贴胸口", run: () => { orionState.hApproach = "back"; orionAdvanceHPhase(); } },
      { label: "忍住离开", hint: "欲压更高", run: () => orionDrawRandomEvent("") },
    ];
  }
  if (phase.id === "undress") {
    return [
      ...outfitChoices,
      { label: "👗 剥光她", hint: "进入前戏", run: () => orionAdvanceHPhase() },
      { label: "停在这里", hint: "离开", run: () => orionDrawRandomEvent("") },
    ];
  }
  if (phase.id === "foreplay") {
    const extras = orionGetForeplayExtras().map((x) => ({
      label: x.label,
      hint: x.hint,
      run: () => { orionState.hForeplay = x.key; orionState.hForeplayExtra = orionApplyForeplayExtra(x.key); orionRender(); },
    }));
    return [
      ...posChoices,
      { label: "🫦 手指探进去", hint: "先湿后硬", run: () => { orionState.hForeplay = "finger"; orionState.hForeplayExtra = ""; orionRender(); } },
      { label: "👅 让她含住", hint: "口舌侍奉", run: () => { orionState.hForeplay = "oral"; orionState.hForeplayExtra = ""; orionRender(); } },
      { label: "😈 只磨不進", hint: "吊到她求", run: () => { orionState.hForeplay = "tease"; orionState.hForeplayExtra = ""; orionRender(); } },
      ...extras,
      { label: "🔥 进入她", hint: "龟头抵住穴口", run: () => orionAdvanceHPhase() },
    ];
  }
  if (phase.id === "union") {
    return [
      { label: "⚡ 猛烈抽插", hint: "啪啪肉响", run: () => { orionState.hPace = "hard"; orionRender(); } },
      { label: "🌙 慢磨深顶", hint: "每下都深", run: () => { orionState.hPace = "slow"; orionRender(); } },
      { label: "😏 吊着她", hint: "只给一点", run: () => { orionState.hPace = "tease"; orionRender(); } },
      { label: "💦 推向高潮", hint: "她快哭了", run: () => orionAdvanceHPhase() },
    ];
  }
  const finishExtras = orionGetFinishExtras(person.id).map((x) => ({
    label: x.label,
    hint: x.hint,
    run: () => {
      orionState.hFinish = x.key;
      const extra = orionApplyFinishExtra(x.key);
      const stats = x.key === "round2"
        ? { energy: -4, stress: 0, affection: 3, intimacy: 2, spark: -1 }
        : x.key === "squirt"
          ? { energy: -3, stress: -1, affection: 3, intimacy: 2, spark: -2 }
          : { energy: -3, stress: -1, affection: 2, intimacy: 2, spark: -1 };
      orionCompleteAdultScene(scene, rel, stats, `${scene.after}\n\n${extra}`, person.id);
    },
  }));
  return [
    {
      label: "🩸 内射灌满",
      hint: "亲密+2 · 射到溢出来",
      run: () => {
        orionState.hFinish = "creampie";
        orionCompleteAdultScene(scene, rel, { energy: -3, stress: -1, affection: 2, intimacy: 2, spark: -orionState.spark }, `${scene.after}\n\n${ORION_FINISH_FLAVOR.creampie}`, person.id);
      },
    },
    {
      label: "✨ 射她身上",
      hint: "亲密+1 · 白浊溅开",
      run: () => {
        orionState.hFinish = "pullout";
        orionCompleteAdultScene(scene, rel, { energy: -3, stress: -2, affection: 2, intimacy: 1 }, `${scene.after}\n\n${ORION_FINISH_FLAVOR.pullout}`, person.id);
      },
    },
    {
      label: "🫂 抱着不拔",
      hint: "亲密+1 好感+3 · 余韵",
      run: () => {
        orionState.hFinish = "afterglow";
        const stress = orionHasTrait("aftercare") ? -3 : -2;
        orionCompleteAdultScene(scene, rel, { energy: -2, stress, affection: 3, intimacy: 1 }, `${scene.after}\n\n${ORION_FINISH_FLAVOR.afterglow}`, person.id);
      },
    },
    ...finishExtras,
    { label: "离开", hint: "暂不结束", run: () => orionDrawRandomEvent("") },
  ];
}

function orionGetPlayMenuChoices(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const plays = event.plays || orionGetAvailablePlays(person);
  return plays.map((play) => ({
    label: `${play.icon} ${play.name}`,
    hint: play.hint,
    run: () => orionStartPlay(person.id, play.id),
  })).concat([
    { label: "返回", hint: "普通选项", run: () => { orionState.sceneMode = "event"; orionRender(); } },
  ]);
}

function orionGetPlaySceneChoices(event) {
  const person = orionPeople().find((p) => p.id === event.person);
  const rel = orionState.relationships[person.id];
  const playId = orionState.playId;
  if (playId === "dirty_talk") {
    return [
      { label: "🗣️ 说最骚的话", hint: "魅力检定", run: () => orionRunDirtyTalkCheck(person, rel) },
      { label: "🔞 直接开操", hint: "转入正式 H", run: () => orionOpenAdultScene(person.id) },
      { label: "停下", hint: "离开", run: () => { orionState.sceneMode = "event"; orionDrawRandomEvent(""); } },
    ];
  }
  return [
    { label: "💦 做到射/高潮", hint: "完成本玩法", run: () => orionCompletePlay(person.id, playId) },
    { label: "🔞 转入正式做爱", hint: "分阶段 H", run: () => orionOpenAdultScene(person.id) },
    { label: "停下", hint: "忍住了", run: () => { orionState.sceneMode = "event"; orionDrawRandomEvent(""); } },
  ];
}

function orionCompleteAdultScene(scene, rel, values, logText, personId) {
  rel.intimacy += values.intimacy || 1;
  rel.affection += (values.affection || 1) + (orionPreferenceMatches(personId) ? 1 : 0);
  if (!rel.scenes.includes(scene.id)) rel.scenes.push(scene.id);
  const energyCost = (values.energy || 0) - (orionHasTrait("stamina") ? 1 : 0);
  const delta = { energy: energyCost, stress: values.stress };
  if (values.spark != null) delta.spark = values.spark;
  orionApplyChoice(delta, logText, personId);
  addXP(80);
  showToast?.("H 完成 +80 XP", 2500);
}

function orionDatePerson(person, rel) {
  let gain = 2 + (orionHasTrait("listen") ? 1 : 0) + (orionHasTrait("talk") ? 1 : 0);
  if (orionPreferenceMatches(person.id)) gain += 1;
  if (orionState.routePlan === "deep" && orionIsTopAffection(person.id)) gain += 1;
  if (orionState.streakPerson === person.id) gain += Math.min(orionState.streak, 2);
  rel.affection = orionClamp(rel.affection + gain, 0, 14);
  rel.dates += 1;
  orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
  const text = orionBuildDateText(person, rel);
  const wrapped = orionWrapDateImmersive(person, rel, `${text}\n\n夜色变深。她看你的眼神，和白天不一样。`);
  orionState.pendingLogHtml = `${wrapped}<p class="orion-log-meta">好感 +${gain} · 性奋涌动</p>`;
  orionApplyChoice({ energy: -2, stress: -1 }, "", person.id);
}

function orionFlirt(person, rel) {
  const target = orionHasTrait("flirt") ? 4 : 5;
  const ok = orionD6() + orionState.charm >= target;
  const core = orionBuildFlirtText(person, ok);
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, core) + `<p class="orion-log-meta">${ok ? "空气升温 · 腿间可能也湿了" : "欲火更旺 · 她让你慢一点"}</p>`;
  if (ok) {
    rel.affection += 2;
    orionApplyChoice({ energy: -1, spark: 1 }, "", person.id);
  } else {
    orionApplyChoice({ energy: -1, stress: 2, trust: 1 }, "", person.id);
  }
}

function orionDeepTalk(person, rel) {
  rel.affection += 1 + Math.min(rel.story, 3);
  orionState.trust = orionClamp(orionState.trust + 1, 0, 14);
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, `【谈心】\n${orionBuildDeepText(person, rel)}`) + `<p class="orion-log-meta">信任加深 · 更想占有她</p>`;
  orionApplyChoice({ energy: -1, stress: -1 }, "", person.id);
}

function orionIntenseApproach(person, rel) {
  const target = orionState.routePlan === "night" ? 5 : 6;
  const bonus = (orionPreferenceMatches(person.id) ? 1 : 0) + (orionHasTrait("bold") ? 1 : 0);
  const ok = orionD6() + orionState.charm + bonus >= target;
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, orionBuildApproachText(person, ok))
    + `<p class="orion-log-meta">${ok ? "她看懂了你裤裆里的邀请" : "欲火更旺 · 她让你慢一点"}</p>`;
  if (ok) {
    rel.affection += 3;
    orionState.spark = orionClamp(orionState.spark + 2, 0, 14);
    orionApplyChoice({ energy: -2, stress: 1 }, "", person.id);
  } else {
    orionApplyChoice({ energy: -2, stress: 2 }, "", person.id);
  }
}

function orionCanAdvanceStory(personId, rel) {
  const need = Math.max(2, Math.min(13, 2 + rel.story - (orionHasTrait("story") ? 1 : 0)));
  const sparkNeed = rel.story >= 8 ? 2 : 1;
  return Boolean(orionStorylines[personId]?.[rel.story]) && rel.affection >= need && orionState.spark >= sparkNeed;
}

function orionAdvanceStory(person, rel) {
  const ch = orionStorylines[person.id][rel.story];
  orionState.spark = orionClamp(orionState.spark - 1, 0, 14);
  rel.story += 1;
  rel.affection += (orionPreferenceMatches(person.id) ? 2 : 1) + (orionState.routePlan === "deep" ? 1 : 0);
  const storyHtml = orionFormatSense(orionPickSense(orionState.weather, orionState.current?.location || "校园"))
    + orionFormatStage(`剧情 · ${ch[0]}`, orionFormatParagraphs(ch[1]));
  orionState.pendingLogHtml = `${storyHtml}<p class="orion-log-meta">故事 ${rel.story}/${orionStorylines[person.id].length}</p>`;
  orionApplyChoice({ energy: -1, stress: -1 }, "", person.id);
}

function orionGiveGift(person, rel, item, index) {
  orionState.inventory.splice(index, 1);
  const gain = (orionHasTrait("gift") ? 4 : 3) + (orionPreferenceMatches(person.id) ? 1 : 0);
  rel.affection += gain;
  orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
  orionApplyChoice({ stress: -1 }, `${person.name} 接过${item.name}，眼神立刻不一样了。`, person.id);
}

function orionLocationDeepPlay(person, rel, loc) {
  const bonus = (loc.spark ? 2 : 1) + (orionPreferenceMatches(person.id) ? 1 : 0);
  rel.affection = orionClamp(rel.affection + 1, 0, 14);
  orionState.spark = orionClamp(orionState.spark + bonus, 0, 14);
  const flavor = window.ORION_LOCATION_FLAVOR?.[loc.name] || `${loc.name}的空气又热又稠。`;
  const extra = galFill(orionPickDialogue(person.id, rel.affection >= 5 ? "approach_ok" : "flirt_ok", rel.dates + orionD6()));
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, `${flavor}\n\n【就地发挥】\n${extra}`) + `<p class="orion-log-meta">地点加成 · 性奋+${bonus}</p>`;
  orionApplyChoice({ energy: -1, stress: loc.stress > 0 ? 1 : 0 }, "", person.id);
}

function orionVisitLocation(loc) {
  for (const k of ["energy", "stress", "study", "charm", "trust", "money", "spark"]) {
    if (loc[k]) orionState[k] = orionClamp(orionState[k] + loc[k], 0, 14);
  }
  const candidates = orionPeople().filter((p) => loc.tags.some((t) => p.id === t || p.name === t || p.role.includes(t)));
  const meetChance = 0.55 + (orionHasTrait("rumor") ? 0.1 : 0) + (candidates.length ? 0.15 : 0);
  if (candidates.length && Math.random() < meetChance) {
    const person = candidates[Math.floor(Math.random() * candidates.length)];
    const rel = orionState.relationships[person.id];
    const affGain = 1 + (orionPreferenceMatches(person.id) ? 1 : 0);
    rel.affection = orionClamp(rel.affection + affGain, 0, 14);
    orionState.spark = orionClamp(orionState.spark + (loc.spark ? 1 : 0), 0, 14);
    orionState.sceneMode = "event";
    orionState.beatIndex = 0;
    const flavor = window.ORION_LOCATION_FLAVOR?.[loc.name] || `在${loc.name}，空气里都是暧昧。`;
    orionState.current = {
      type: "person",
      person: person.id,
      location: loc.name,
      title: `${person.name} · ${loc.name}`,
      text: `${flavor}\n\n${orionBuildDateText(person, rel)}`,
      tags: loc.tags || [],
      beats: rel.affection >= 3 ? [
        { speaker: person.name, text: galFill(orionPickDialogue(person.id, "flirt_ok", rel.dates)) },
        { speaker: "旁白", text: "她看你的眼神，像已经选好下一步要做什么。" },
      ] : null,
    };
    if (orionState.streakPerson === person.id) orionState.streak += 1;
    else { orionState.streakPerson = person.id; orionState.streak = 1; }
    orionState.energy = orionClamp(orionState.energy - 1, 0, 14);
    orionNextDay();
    orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, `在${loc.name}遇见${person.name}，好感+${affGain}`) + `<p class="orion-log-meta">地点邂逅 · 可就地发挥/约会/攻略</p>`;
    orionSaveRun();
    orionRender("");
    return;
  }
  orionApplyChoice({ energy: -1 }, `在${loc.name}晃了一夜。${window.ORION_LOCATION_FLAVOR?.[loc.name] || ""}`, null);
}

function orionGetShopChoices(event) {
  return event.offers.map((item) => ({
    label: `买 ${item.name}（${item.cost}金）`,
    hint: item.text,
    run: () => {
      if (orionState.money < item.cost) { orionRender("钱不够。"); return; }
      const discount = (orionHasTrait("budget") ? 1 : 0) + (orionState.routePlan === "gift" ? 1 : 0);
      orionState.money = orionClamp(orionState.money - item.cost + discount, 0, 14);
      orionState.inventory.push(item.name);
      orionSaveRun();
      orionRender(`买下${item.name}。`);
    },
  })).concat([{ label: "离开", hint: "返回", run: () => orionDrawRandomEvent("空手出店。") }]);
}

function orionGetExamChoices() {
  return [
    { label: "稳扎稳打", hint: "学业 +1", run: () => orionResolveExam(7, 1, "复习有效。") },
    { label: "裸考赌运气", hint: "检定", run: () => orionResolveExam(8, 2, "赌一把。") },
    { label: "通宵爆肝", hint: "体力 -3 学业 +3 欲压 +2", run: () => {
      orionState.energy = orionClamp(orionState.energy - 3, 0, 14);
      orionState.study = orionClamp(orionState.study + 3, 0, 14);
      orionState.stress = orionClamp(orionState.stress + 2, 0, 14);
      orionResolveExam(9, 1, "通宵发白。");
    }},
  ];
}

function orionResolveExam(target, reward, intro) {
  const roll = orionD6() + orionState.study + Math.floor(orionState.energy / 4) - Math.floor(orionState.stress / 5) + (orionHasTrait("improv") ? 1 : 0);
  const passMsg = `${intro}\n考试过了。学业+，零花钱+。`;
  const failMsg = `${intro}\n考砸了。欲压+，学业-。`;
  if (roll >= target) {
    orionState.study = orionClamp(orionState.study + 1 + reward, 0, 14);
    orionState.money = orionClamp(orionState.money + 1, 0, 14);
    orionNextWeek();
    if (orionState.sceneMode === "reward") { orionRender(passMsg); return; }
    orionDrawRandomEvent(passMsg);
  } else {
    orionState.stress = orionClamp(orionState.stress + 2, 0, 14);
    orionState.study = orionClamp(orionState.study - 1, 0, 14);
    orionNextWeek();
    if (orionState.sceneMode === "reward") { orionRender(failMsg); return; }
    orionDrawRandomEvent(failMsg);
  }
}

function orionReward(delta, text) {
  for (const [k, v] of Object.entries(delta)) orionState[k] = orionClamp(orionState[k] + v, 0, 14);
  orionSaveRun();
  orionDrawRandomEvent(text);
}

function orionIsTopAffection(personId) {
  const top = Math.max(...orionPeople().map((p) => orionState.relationships[p.id].affection));
  return orionState.relationships[personId].affection >= top;
}

function orionSummarizeLoc(loc) {
  const parts = [];
  if (loc.study) parts.push(`学业${loc.study > 0 ? "+" : ""}${loc.study}`);
  if (loc.spark) parts.push(`性奋+${loc.spark}`);
  if (loc.stress) parts.push(`欲压${loc.stress > 0 ? "+" : ""}${loc.stress}`);
  return parts.join(" ") || "逛";
}

function orionCheckEnding() {
  let ending = null;
  if (orionState.stress >= 14 && orionHasTrait("calm") && !orionState.calmUsed) {
    orionState.calmUsed = true;
    orionState.stress = 9;
    orionState.energy = orionClamp(orionState.energy + 2, 0, 14);
    return false;
  }
  if (orionState.stress >= 14 || orionState.energy <= 0) ending = orionEndings.burnout;
  if (orionState.study <= 0) ending = orionEndings.finals;
  if (orionState.week > ORION_WEEKS) {
    const ranked = orionPeople()
      .map((p) => ({ ...p, ...orionState.relationships[p.id] }))
      .sort((a, b) => b.affection + b.intimacy * 3 + b.scenes.length - (a.affection + a.intimacy * 3 + a.scenes.length))[0];
    const allScenes = orionAdultScenes[ranked.id].length;
    const storyDone = ranked.story >= orionStorylines[ranked.id].length;
    if (ranked.scenes.length >= allScenes && ranked.affection >= 10 && storyDone) {
      ending = orionEndings.perfect.replace("{name}", ranked.name);
    } else if (ranked.intimacy >= 2 && ranked.affection >= 8) {
      ending = orionEndings.intimate.replace("{name}", ranked.name);
    } else if (ranked.affection >= 8) {
      ending = orionEndings.romance.replace("{name}", ranked.name);
    } else ending = orionEndings.alone;
  }
  if (!ending) return false;
  orionState.ended = true;
  orionRenderEnding(ending);
  return true;
}

function orionRenderEnding(text) {
  orionSaveRun();
  addXP(200);
  $("#end-emoji").textContent = "🔞";
  $("#end-title").textContent = "学期结算";
  $("#end-rank").textContent = getGalUniName();
  $("#end-stats").textContent = `第 ${orionState.week - 1} 周结束`;
  $("#end-message").textContent = text;
  $("#end-xp").textContent = "+200 XP";
  showScreen("end");
}

function orionBuildSceneContent(event) {
  if (["preference", "route", "shop", "map", "exam", "reward"].includes(orionState.sceneMode)) {
    return { html: false, text: event.text };
  }
  if (orionState.sceneMode === "playmenu") {
    return { html: true, text: orionBuildPlayMenuHtml(event) };
  }
  if (orionState.sceneMode === "play") {
    return { html: true, text: orionBuildPlayHtml(event) };
  }
  if (orionState.sceneMode === "adult" || orionState.sceneMode === "gallery") {
    return { html: true, text: orionBuildHPhaseHtml(event) };
  }
  if (orionState.sceneMode === "strategy") {
    return { html: true, text: event.text };
  }
  return { html: true, text: orionBuildImmersiveEventHtml(event) };
}

function orionSetSceneContent(payload) {
  const el = orionEls.orion_scene_text;
  if (!el) return;
  if (payload.html) {
    el.innerHTML = payload.text;
    el.classList.add("orion-immersive");
  } else {
    el.textContent = payload.text;
    el.classList.remove("orion-immersive");
  }
  el.scrollTop = 0;
}

function orionSyncWeekDisplay() {
  const weekKicker = document.querySelector(".orion-topbar .orion-kicker");
  const arc = typeof orionGetSemesterArc === "function" ? orionGetSemesterArc(orionState.week) : null;
  const arcLabel = arc ? ` · ${arc.label}` : "";
  if (weekKicker) {
    weekKicker.innerHTML = `第 <span id="orion-week">${orionState.week}</span> 周 / ${ORION_WEEKS}${arcLabel} · 第 <span id="orion-day">${orionState.day}</span> 天 · <span id="orion-weather">${orionState.weather}</span>`;
    orionEls.orion_week = $("#orion-week");
    orionEls.orion_day = $("#orion-day");
    orionEls.orion_weather = $("#orion-weather");
  }
}

function orionBindChoiceButtons(choices) {
  if (typeof orionBindChoiceButtonsRich === "function") {
    orionBindChoiceButtonsRich(choices);
    return;
  }
  orionState._choices = choices;
  if (!orionEls.orion_choices) return;
  orionEls.orion_choices.innerHTML = choices.map((c, i) =>
    `<button type="button" class="orion-choice" data-i="${i}"><strong>${c.label}</strong><small>${c.hint || ""}</small></button>`
  ).join("");
}

function orionFinishRenderUI(event) {
  if (typeof orionRenderStatMeters === "function") orionRenderStatMeters();
  if (typeof orionRenderProgressStrip === "function") orionRenderProgressStrip();
  if (typeof orionRenderHintBar === "function") orionRenderHintBar(event);
  if (typeof orionRenderInventoryPanel === "function") orionRenderInventoryPanel();
  if (typeof orionMaybeShowFirstGuide === "function") orionMaybeShowFirstGuide();
  const screen = document.getElementById("screen-gal-orion");
  if (screen) screen.dataset.hasPerson = event?.person ? "1" : "0";
}

function orionRender(logText = "") {
  if (!orionState) return;
  try {
    orionRenderInner(logText);
  } catch (err) {
    console.error("orionRender", err);
    if (orionEls.orion_choices) {
      orionBindChoiceButtons([
        { label: "重试刷新", hint: "界面出错时点这里", run: () => orionRender(logText) },
        { label: "返回大厅", hint: "安全退出", run: () => showScreen("hub") },
      ]);
    }
    showToast?.("界面出错，请点重试或硬刷新", 3000);
  }
}

function orionRenderInner(logText = "") {
  orionSyncWeekDisplay();
  if (orionState.sceneMode === "reward") {
    const e = orionState.current;
    if (orionState.pendingLogHtml) {
      orionEls.orion_log.innerHTML = orionState.pendingLogHtml;
      orionState.pendingLogHtml = null;
    } else {
      orionEls.orion_log.textContent = logText;
    }
    orionEls.orion_location.textContent = e.location;
    orionEls.orion_scene_title.textContent = e.title;
    orionSetSceneContent({ html: false, text: e.text });
    orionBindChoiceButtons(orionGetChoices(e));
    orionFinishRenderUI(e);
    orionSaveRun();
    return;
  }
  const e = orionState.current;
  if (orionEls.orion_weather) orionEls.orion_weather.textContent = orionState.weather;
  if (orionState.pendingLogHtml) {
    orionEls.orion_log.innerHTML = orionState.pendingLogHtml;
    orionState.pendingLogHtml = null;
  } else {
    orionEls.orion_log.textContent = logText;
  }
  orionEls.orion_location.textContent = e.location || "校园";
  orionEls.orion_scene_title.textContent = e.title || "";
  const isAdult = orionState.sceneMode === "adult" || orionState.sceneMode === "gallery";
  orionSetSceneContent(orionBuildSceneContent(e));
  orionEls.orion_scene_text.classList.toggle("orion-adult-text", isAdult);
  orionApplyMoodToScreen(
    ["adult", "gallery", "play", "playmenu"].includes(orionState.sceneMode) ? "adult" : orionState.sceneMode,
    e.person
  );

  orionEls.orion_relationships.innerHTML = orionPeople().map((p) => {
    const rel = orionState.relationships[p.id];
    const stage = orionGetRelationStage(rel);
    const clearTag = rel.clear ? " · 已确认" : "";
    const nextHint = typeof orionBuildPersonNextHint === "function" ? orionBuildPersonNextHint(rel, p.id) : "";
    return `<article class="orion-person" style="--person-accent:${p.color}" title="${nextHint}">
      <div class="orion-person-head"><strong>${p.icon} ${p.name}</strong><span class="orion-stage-pill" style="--stage-color:${stage.color}">${stage.label}</span></div>
      <small>${p.role} · ♥${rel.affection}/14 · 亲密${rel.intimacy}${clearTag}</small>
      <small class="orion-person-stats">H ${rel.scenes.length}/${orionAdultScenes[p.id].length} · 故事 ${rel.story}/${orionStorylines[p.id].length}${(rel.kinks?.length) ? ` · 玩法${rel.kinks.length}` : ""}</small>
      ${nextHint ? `<p class="orion-person-tip">${nextHint}</p>` : ""}
      <div class="gal-mini-bar"><div class="gal-mini-fill" style="width:${rel.affection * 10}%"></div></div>
    </article>`;
  }).join("");

  if (typeof orionBuildInventoryHtml === "function") {
    orionEls.orion_inventory.innerHTML = orionBuildInventoryHtml();
  } else {
    orionEls.orion_inventory.innerHTML = orionState.inventory.length
      ? orionState.inventory.map((n) => `<span class="orion-tag">${n}</span>`).join("")
      : `<span class="orion-tag muted">空</span>`;
  }
  orionEls.orion_traits.innerHTML = orionState.traits.map((t) =>
    `<article class="orion-trait"><strong>${t.name}</strong><small>${t.desc}</small></article>`
  ).join("");

  const galleryItems = [];
  for (const p of orionPeople()) {
    for (const sid of orionState.relationships[p.id].scenes) {
      const sc = orionAdultScenes[p.id].find((s) => s.id === sid);
      if (sc) galleryItems.push({ p, sc, filled: orionHasSceneBody(sid) });
    }
  }
  orionEls.orion_gallery.innerHTML = galleryItems.length
    ? galleryItems.map(({ p, sc, filled }) =>
      `<button type="button" class="orion-gallery-btn ${filled ? "filled" : ""}" data-p="${p.id}" data-s="${sc.id}">${p.name}·${sc.title}</button>`
    ).join("")
    : `<small class="muted">尚无 H 可回看</small>`;

  orionBindChoiceButtons(orionGetChoices(e));
  orionFinishRenderUI(e);
  orionSaveRun();
}

function initOrionGame() {
  $("#btn-orion-back")?.addEventListener("click", () => showScreen("hub"));
  $("#btn-orion-new")?.addEventListener("click", () => {
    if (confirm("重开本轮？当前进度将覆盖。")) { orionStartRun(); showScreen("galOrion"); }
  });
  $("#btn-orion-save")?.addEventListener("click", () => { orionSaveRun(); showToast?.("已保存", 1500); });

  orionEls.orion_choices = $("#orion-choices");
  orionEls.orion_choices?.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".orion-choice");
    if (!btn || !orionState?._choices) return;
    const choice = orionState._choices[+btn.dataset.i];
    if (choice?.run) choice.run();
  });

  $("#orion-relationships")?.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".orion-gallery-btn");
    if (btn) orionOpenGalleryScene(btn.dataset.p, btn.dataset.s);
  });
  if (typeof orionInitOrionUI === "function") orionInitOrionUI();
}