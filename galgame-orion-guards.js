/* 蜜语 · Orion 运行时补丁 — 纯爱引擎挂钩 / 点击防护 / 空值守卫 */

function orionOnChoiceClick(ev) {
  const btn = ev.target.closest(".orion-choice");
  if (!btn || !orionState?._choices) return;
  if (orionState._orionBusy) return;
  const idx = Number(btn.dataset.i);
  if (!Number.isFinite(idx)) return;
  const choice = orionState._choices[idx];
  if (!choice?.run) {
    showToast?.("选项失效，请点重试刷新", 2500);
    console.warn("orion: missing run", idx, choice?.label);
    return;
  }
  orionState._orionBusy = true;
  btn.classList.add("orion-choice-busy");
  try {
    choice.run();
  } catch (err) {
    console.error("orion choice", err);
    showToast?.(`行动出错：${err.message || "未知错误"}`, 3500);
    orionRender();
  } finally {
    window.setTimeout(() => {
      if (orionState) orionState._orionBusy = false;
      btn.classList.remove("orion-choice-busy");
    }, 150);
  }
}

function orionEnsureEls() {
  if (!orionEls.orion_choices || !orionEls.orion_scene_text) orionInitEls();
}

(function orionGuardsPack() {
  if (typeof orionAdvanceStory !== "function") {
    console.error("[蜜语] Orion 引擎未加载，跳过 guards");
    return;
  }

  const origAdvance = orionAdvanceStory;
  orionAdvanceStory = function (person, rel) {
    const pure = orionIsPureLoveRoute() && ORION_PURE_STORYLINES?.[person.id]?.[rel.story];
    const ch = pure || orionStorylines[person.id]?.[rel.story];
    if (!ch || !Array.isArray(ch) || ch.length < 2) {
      showToast?.("剧情章节缺失，请重试", 2500);
      return;
    }
    orionState.spark = orionClamp(orionState.spark - (orionIsPureLoveRoute() ? 0 : 1), 0, 14);
    rel.story += 1;
    const affGain = (orionPreferenceMatches(person.id) ? 2 : 1) + (orionState.routePlan === "deep" ? 1 : 0) + (orionIsPureLoveRoute() ? 1 : 0);
    rel.affection = orionClamp(rel.affection + affGain, 0, 14);
    if (orionIsPureLoveRoute()) orionState.trust = orionClamp(orionState.trust + 1, 0, 14);
    const label = pure ? `纯爱剧情 · ${ch[0]}` : `剧情 · ${ch[0]}`;
    const storyHtml = orionFormatSense(orionPickSense(orionState.weather, orionState.current?.location || "校园"))
      + orionFormatStage(label, orionFormatParagraphs(ch[1]));
    const storyTotal = pure
      ? (ORION_PURE_STORYLINES?.[person.id]?.length || orionStorylines[person.id].length)
      : orionStorylines[person.id].length;
    orionState.pendingLogHtml = `${storyHtml}<p class="orion-log-meta">故事 ${rel.story}/${storyTotal}${orionIsPureLoveRoute() ? " · 纯爱线" : ""}</p>`;
    orionApplyChoice({ energy: -1, stress: orionIsPureLoveRoute() ? -2 : -1 }, "", person.id);
  };

  const origDate = orionDatePerson;
  orionDatePerson = function (person, rel) {
    if (!orionIsPureLoveRoute()) return origDate(person, rel);
    let gain = 2 + (orionHasTrait("listen") ? 1 : 0) + (orionHasTrait("talk") ? 1 : 0) + 1;
    if (orionPreferenceMatches(person.id)) gain += 1;
    rel.affection = orionClamp(rel.affection + gain, 0, 14);
    rel.dates += 1;
    orionState.trust = orionClamp(orionState.trust + 1, 0, 14);
    orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
    const text = orionBuildPureDateText(person, rel);
    const wrapped = orionWrapDateImmersive(person, rel, `${text}\n\n夜色温柔。她看你的眼神，像把整颗心递过来。`);
    orionState.pendingLogHtml = `${wrapped}<p class="orion-log-meta">好感 +${gain} · 信任 +1 · 纯爱约会</p>`;
    orionApplyChoice({ energy: -2, stress: -2 }, "", person.id);
  };

  const origDeep = orionDeepTalk;
  orionDeepTalk = function (person, rel) {
    if (!orionIsPureLoveRoute()) return origDeep(person, rel);
    rel.affection += 2 + Math.min(rel.story, 3);
    orionState.trust = orionClamp(orionState.trust + 2, 0, 14);
    const pool = ORION_PURE_DIALOGUE[person.id]?.deep;
    const core = pool?.length ? pool[(rel.story + rel.dates) % pool.length] : orionBuildDeepText(person, rel);
    orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, `【谈心 · 纯爱】\n${core}`) + `<p class="orion-log-meta">信任 +2 · 心靠得更近</p>`;
    orionApplyChoice({ energy: -1, stress: -2 }, "", person.id);
  };

  const origCanStory = orionCanAdvanceStory;
  orionCanAdvanceStory = function (personId, rel) {
    const need = Math.max(2, Math.min(13, 2 + rel.story - (orionHasTrait("story") ? 1 : 0)));
    const sparkNeed = rel.story >= 8 ? 2 : 1;
    const hasChapter = orionIsPureLoveRoute()
      ? Boolean(ORION_PURE_STORYLINES?.[personId]?.[rel.story] || orionStorylines[personId]?.[rel.story])
      : Boolean(orionStorylines[personId]?.[rel.story]);
    if (!hasChapter || rel.affection < need) return false;
    if (orionIsPureLoveRoute()) {
      if (rel.story >= 4 && orionState.trust < 3) return false;
      return orionState.trust >= 2 || orionState.spark >= sparkNeed;
    }
    return origCanStory(personId, rel);
  };

  const origGetPerson = orionGetPersonChoices;
  orionGetPersonChoices = function (event) {
    const choices = origGetPerson(event);
    if (!event?.person || !orionIsPureLoveRoute()) return choices;
    const person = orionPeople().find((p) => p.id === event.person);
    const rel = orionState.relationships[event.person];
    return person && rel ? orionPureLovePersonChoices(person, rel, choices) : choices;
  };

  const origSceneBody = orionGetSceneBody;
  orionGetSceneBody = function (sceneId) {
    if (orionIsPureLoveRoute() && ORION_PURE_SCENE_CONTENT?.[sceneId]?.body) {
      return ORION_PURE_SCENE_CONTENT[sceneId].body.trim();
    }
    return origSceneBody(sceneId);
  };

  const origCheck = orionCheckEnding;
  orionCheckEnding = function () {
    if (orionState.week > ORION_WEEKS && orionIsPureLoveRoute()) {
      const ranked = orionPeople()
        .map((p) => ({ ...p, ...orionState.relationships[p.id] }))
        .sort((a, b) => b.affection + (orionState.trust || 0) * 2 + b.story - (a.affection + (orionState.trust || 0) * 2 + a.story))[0];
      const storyDone = ranked.story >= orionStorylines[ranked.id].length;
      if (ranked.affection >= 10 && orionState.trust >= 8 && storyDone && ranked.clear) {
        orionState.ended = true;
        orionRenderEnding(orionEndings.purelove.replace("{name}", ranked.name));
        return true;
      }
    }
    return origCheck();
  };

  if (typeof ORION_FOREPLAY_FLAVOR !== "undefined" && typeof orionBuildHPhaseHtml === "function") {
    const softFp = {
      finger: "手指缓缓探入，她抖着抱紧你，穴肉温柔绞住，淫水濡湿却不粗暴，像把心也交出来。",
      oral: "她含住你，眼神向上，温柔侍奉，每一下都像在说我爱你。",
      tease: "你只磨不入，她眼泪掉下来却笑：「……混蛋……但……想要你……轻一点进来……」",
      breast: "你吻乳尖，她抱你头，胸口起伏，下面湿了，轻声：「……可以……慢一点……」",
    };
    const origBuildH = orionBuildHPhaseHtml;
    orionBuildHPhaseHtml = function (event) {
      if (orionIsPureLoveRoute()) {
        const saved = { ...ORION_FOREPLAY_FLAVOR };
        Object.assign(ORION_FOREPLAY_FLAVOR, softFp);
        const html = origBuildH(event);
        Object.assign(ORION_FOREPLAY_FLAVOR, saved);
        return html;
      }
      return origBuildH(event);
    };
  }

  const origRender = orionRenderInner;
  orionRenderInner = function (logText) {
    orionEnsureEls();
    return origRender(logText);
  };

  const origInit = initOrionGame;
  initOrionGame = function () {
    origInit();
  };

  const origEnter = orionEnterGame;
  orionEnterGame = function () {
    orionEnsureEls();
    return origEnter();
  };
})();