/* 蜜语 · Orion 长流程 — 24周四幕 / 日事件 / 学期喘息 */

const ORION_SEMESTER_ARCS = [
  { id: "seed", weeks: [1, 6], label: "第一幕·播种", hint: "试探、蹲点、攻略手册起手" },
  { id: "ignite", weeks: [7, 12], label: "第二幕·点燃", hint: "边缘亲密、表白、H场景铺开" },
  { id: "addict", weeks: [13, 18], label: "第三幕·沉迷", hint: "十二幕剧情后半、特殊玩法全开" },
  { id: "own", weeks: [19, 24], label: "第四幕·占有", hint: "完美结局冲刺、关系确认与收割" },
];

function orionGetSemesterArc(week) {
  return ORION_SEMESTER_ARCS.find((a) => week >= a.weeks[0] && week <= a.weeks[1]) || ORION_SEMESTER_ARCS[0];
}

Object.assign(orionSemesterMilestones, {
  3: { title: "第三周·习惯彼此", text: "第三周，你开始记得谁在哪天更容易脸红。攻略手段每日限一次——规划比蛮干更重要。" },
  7: { title: "第七周·第二幕开幕", text: "学期进入第二幕。表白检定与 H 场景应已启动；还没点燃的人，趁地图事件加快速度。" },
  9: { title: "第九周·关系分流", text: "有人已确认关系，有人还在边缘磨蹭。多线党该用「坦白局」周奖励消嫉妒。" },
  11: { title: "第十一周·考前躁动", text: "期末气息渐浓，欲望反而更旺。考试周天气权重上升——图书馆与自习室事件变多。" },
  13: { title: "第十三周·第三幕", text: "第三幕「沉迷」开幕。剧情应推至中段；全 H 未过半的，优先地点邂逅与就地发挥。" },
  15: { title: "第十五周·肉体认主", text: "关系阶段「肉体」以上的人开始主动索求。体力管理决定能否一周多次 H。" },
  17: { title: "第十七周·嫉妒与占有", text: "修罗场、占有短信、病娇查岗——多线后果显现。单线党可收割完美结局条件。" },
  19: { title: "第十九周·第四幕", text: "最后六周。全十二幕剧情、十五 H、关系「沉迷」——完美结局三线并进。" },
  21: { title: "第二十一周·毕业气息", text: "毕业展、赛季收官、同居契约——终章剧情权重提高。没推完的抓紧。" },
  22: { title: "第二十二周·倒数两周", text: "倒数两周。每周里程碑后检查：故事、H、好感、信任是否达标。" },
  24: { title: "最后一周", text: "最后一周。该做的做，该说的说，该射的射。二十四周的肉欲学期，今夜结算。" },
});

Object.assign(orionDayHooks, {
  1: {
    title: "新周开幕",
    campus: "新一周第一天，校园像翻到新章节——天气、事件、她的消息都会变。",
    person: (name) => `${name}发来本周第一条消息：「这周……别把我排太后面。」`,
  },
});

const ORION_BREATHER_WEEKS = [12, 18];

const ORION_WEEKLY_EXTRA_REWARDS = [
  { label: "情欲周末", hint: "性奋 +4 欲压 -2", run: () => orionReward({ spark: 4, stress: -2 }, "周末情欲涌上来，下周更想开房。") },
  { label: "社交充电", hint: "魅力 +2 信任 +2", run: () => orionReward({ charm: 2, trust: 2 }, "社交状态回暖，撩人更顺。") },
  { label: "剧情回忆", hint: "随机女主好感 +2", run: () => orionWeeklyStoryRecall() },
];

function orionWeeklyStoryRecall() {
  const pick = orionPeople()[Math.floor(Math.random() * orionPeople().length)];
  orionState.relationships[pick.id].affection = orionClamp(orionState.relationships[pick.id].affection + 2, 0, 14);
  orionReward({}, `${pick.name} 突然想起你本周做过的事，好感又涨了一截。`);
}

function orionOpenBreatherWeek(logText) {
  orionState.sceneMode = "reward";
  orionState.breatherMode = true;
  orionState.current = {
    location: "学期喘息",
    title: `第 ${orionState.week} 周 · 喘息日`,
    text: "学期中段允许喘一口气。选恢复项，再进入周末考核。不额外扣天数。",
  };
  orionRender(logText || "学期喘息——慢下来，才能操更久。");
}

function orionGetBreatherChoices() {
  const endBreather = (msg) => {
    orionState.breatherMode = false;
    orionOpenExam(msg);
  };
  return [
    { label: "💤 睡整天", hint: "体力 +6 欲压 -4", run: () => { orionState.energy = orionClamp(orionState.energy + 6, 0, 14); orionState.stress = orionClamp(orionState.stress - 4, 0, 14); orionSaveRun(); endBreather("睡饱了，精神焕发。"); } },
    { label: "📖 补课", hint: "学业 +3 体力 -2", run: () => { orionState.study = orionClamp(orionState.study + 3, 0, 14); orionState.energy = orionClamp(orionState.energy - 2, 0, 14); orionSaveRun(); endBreather("恶补一轮，成绩稳了。"); } },
    { label: "💋 约会日", hint: "性奋 +3 魅力 +1", run: () => { orionState.spark = orionClamp(orionState.spark + 3, 0, 14); orionState.charm = orionClamp(orionState.charm + 1, 0, 14); orionSaveRun(); endBreather("约会日让下周的欲望更旺。"); } },
    { label: "跳过", hint: "直接周末考核", run: () => endBreather("没休息，硬撑到周末。") },
  ];
}