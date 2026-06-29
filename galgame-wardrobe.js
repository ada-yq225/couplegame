/* 蜜语 · 换装 / 脱衣系统 */

const GAL_OUTFIT_DEFS = {
  school_uniform: {
    id: "school_uniform",
    name: "校服",
    icon: "👔",
    layers: [
      { id: "coat", label: "西装外套", stripNarr: "你剥下{char}外套，肩线滑落，衬衫被汗浸得半透明，乳形轮廓和两点凸起一清二楚。", stripAfter: "只剩衬衫裹身，布料贴着皮肤，每喘一口气胸线就跟着起伏。", aff: 4 },
      { id: "shirt", label: "衬衫", stripNarr: "纽扣一颗颗崩开，{char}胸口剧烈起伏，胸罩勒痕和深沟暴露，乳肉从扣眼间挤出来。", stripAfter: "衬衫挂肘弯敞开，{bodyReveal}，内衣边勒进软肉，乳沟湿亮。", aff: 6 },
      { id: "skirt", label: "百褶裙", stripNarr: "拉链一扯到底，裙子堆在脚踝，{char}只剩内衣站在你面前，大腿根白得晃眼，内裤裆部已洇出深色水痕。", stripAfter: "百褶裙缠在脚腕，腿间只剩一条内裤，布料勒进缝，湿得能拧出水。", aff: 8 },
      { id: "bra", label: "胸罩", stripNarr: "搭扣弹开的瞬间乳肉弹出来，{bodyReveal}，乳尖硬挺挺立着，{char}想挡又放下，任你看个够。", stripAfter: "胸罩落地，两团软肉完全裸露，乳尖粉嫩充血，随喘息轻颤。", aff: 10 },
      { id: "panties", label: "内裤", stripNarr: "最后一条内裤褪到膝弯，{char}腿间水光泛滥，阴唇轮廓透过湿布清晰可见，一股甜腥热气扑到你脸上。", stripAfter: "全裸了。小腹平坦起伏，腿根内侧滑腻，穴口一张一合流着淫水。", aff: 12 },
    ],
    sexModifier: "校服皱巴巴挂在肘间，领带缠腕，布料蹭着乳尖和腿根，每顶一下都带摩擦火辣。",
  },
  office_lady: {
    id: "office_lady",
    name: "OL套装",
    icon: "💼",
    layers: [
      { id: "blazer", label: "西装", stripNarr: "西装落地，香水味混着体香更浓，丝质衬衫包着沉甸甸曲线，乳沟深陷，扣子在崩。", stripAfter: "衬衫下丰乳轮廓惊人，腰肢一握就满，臀线绷在窄裙里。", aff: 5 },
      { id: "shirt", label: "丝质衬衫", stripNarr: "丝衫滑下肩，乳沟深陷，扣子弹飞一颗，乳肉从领口溢出来，乳尖形状透过薄丝一清二楚。", stripAfter: "衬衫敞开挂在臂弯，黑蕾丝内衣托着巨乳，乳沟能埋手指。", aff: 7 },
      { id: "skirt", label: "包臀裙", stripNarr: "窄裙卷到腰，丝袜勒痕陷进臀肉，两瓣臀弹出，内裤细带勒进臀缝，湿痕明显。", stripAfter: "裙堆腰间，丝袜包腿，臀肉裸着颤，内裤细得遮不住什么。", aff: 9 },
      { id: "stockings", label: "丝袜", stripNarr: "丝袜撕破褪下，腿肉颤着暴露，脚趾蜷起，大腿内侧嫩肉泛着水光。", stripAfter: "腿线全裸，丝袜破在膝，勒痕像纹身，腿根内侧湿亮。", aff: 8 },
      { id: "lingerie", label: "内衣", stripNarr: "黑色蕾丝落地，成熟肉体毫无遮掩，E罩杯乳肉沉甸甸晃，小腹平坦，腿间黑森林修剪整齐，穴口湿得反光。", stripAfter: "一丝不挂的御姐肉体，乳浪、腰窝、臀缝、湿穴，全任你享用。", aff: 11 },
    ],
    sexModifier: "高跟鞋还穿着，丝袜破在膝，职场套装皱成一团——禁忌感拉满，每撞一下乳浪甩你一脸。",
  },
  gym_clothes: {
    id: "gym_clothes",
    name: "运动服",
    icon: "🏃",
    layers: [
      { id: "jacket", label: "运动外套", stripNarr: "外套甩地上，汗味扑面，背心湿透贴身，乳头形状和乳晕颜色透得一清二楚。", stripAfter: "汗衫贴皮，乳尖硬挺顶起布料，腹肌马甲线随喘起伏。", aff: 4 },
      { id: "top", label: "运动背心", stripNarr: "背心从头顶扯下，运动内衣勒出深沟，汗珠顺乳沟滑进肚脐，皮肤晒得小麦色发亮。", stripAfter: "运动内衣勒乳，乳肉从边缘挤出，汗湿皮肤滑腻滚烫。", aff: 6 },
      { id: "shorts", label: "短裤", stripNarr: "短裤连内裤一起扯下，腿根晒痕性感，肌肉绷紧，腿间水光顺着大腿内侧淌下来。", stripAfter: "下身全裸，紧实大腿根嫩肉泛红，穴口湿亮张合。", aff: 9 },
      { id: "bra", label: "运动内衣", stripNarr: "运动内衣弹开，乳形挺拔弹出来，汗滴滑过腹肌，乳尖硬邦邦挺立。", stripAfter: "全裸运动员肉体，腹肌、马甲线、紧实臀肉，汗味混着情欲。", aff: 8 },
    ],
    sexModifier: "汗湿布料黏皮肤，每顶一下摩擦火辣，汗珠甩你胸口，又咸又烫又色。",
  },
  art_smock: {
    id: "art_smock",
    name: "画室罩衫",
    icon: "🎨",
    layers: [
      { id: "smock", label: "颜料罩衫", stripNarr: "罩衫沾满颜料褪下，底下竟什么都没穿，苍白肉体像瓷，乳尖樱粉，腿根已有指印。", stripAfter: "裸体模特站在画布前，颜料沾锁骨和腰窝，穴口湿得滴落。", aff: 7 },
      { id: "ribbon", label: "颈带", stripNarr: "颈带解开，锁骨延伸进胸沟，A罩杯乳形精致，皮肤白得看见青色血管。", stripAfter: "颈带落地，锁骨、胸骨、腰窝全暴露，苍白肌肤一碰就红。", aff: 5 },
      { id: "panties", label: "内裤", stripNarr: "薄内裤扯下，腿根颜料指印混着淫水，阴唇粉嫩微张，一股病态甜腥。", stripAfter: "全裸如瓷，骨感腰窝深陷，腿根内侧容易留红印，穴口一张一合。", aff: 10 },
    ],
    sexModifier: "颜料蹭在乳尖腿根小腹，顶弄时白浊混颜料抹你腹肌，像活体画布。",
  },
  open_shirt: { id: "open_shirt", name: "敞怀衬衫", icon: "👔", layers: [], partial: true, sexModifier: "衬衫只扣一颗，走动乳尖蹭布，乳沟深陷，裙下真空，一抬腿就走光。" },
  sweater_only: { id: "sweater_only", name: "下身真空毛衣", icon: "🧶", layers: [], partial: true, sexModifier: "宽大毛衣下真空，一抬手奶子晃出来，腿间湿痕顺大腿淌，毛衣下摆沾水。" },
  lingerie_white: { id: "lingerie_white", name: "纯白蕾丝", icon: "🤍", layers: [], partial: true, sexModifier: "白蕾丝透肉，湿了贴皮，乳尖和穴形轮廓一清二楚，像礼物等你拆。" },
  lingerie_pink: { id: "lingerie_pink", name: "粉色情趣", icon: "💗", layers: [], partial: true, sexModifier: "粉色绑带内衣一扯就散，软肉从绑带间挤出，裆部湿得透明。" },
  lingerie_black: { id: "lingerie_black", name: "黑色蕾丝", icon: "🖤", layers: [], partial: true, sexModifier: "黑蕾丝托胸束腰，乳沟深不见底，吊带袜扣着你心跳，裆部镂空。" },
  lingerie_red: { id: "lingerie_red", name: "血红内衣", icon: "🩸", layers: [], partial: true, sexModifier: "红蕾丝像血又像火，裹苍白皮，乳尖透出来，腿间红布早已湿透。" },
  pencil_skirt: { id: "pencil_skirt", name: "窄裙+丝袜", icon: "👠", layers: [], partial: true, sexModifier: "裙掀到腰，丝袜没脱勒进臀缝，内裤扯到一边，穴口湿亮等你进。" },
  stockings_only: { id: "stockings_only", name: "吊带袜", icon: "🦵", layers: [], partial: true, sexModifier: "只剩吊带袜高跟，腿线杀死人，上身全裸乳浪晃，腿间水光泛滥。" },
  sports_bra_only: { id: "sports_bra_only", name: "运动内衣", icon: "🎽", layers: [], partial: true, sexModifier: "运动内衣勒乳，下面全裸，汗味混淫水，穴口张合流着。" },
  towel_wrap: { id: "towel_wrap", name: "浴巾", icon: "🛁", layers: [], partial: true, sexModifier: "浴巾一裹就掉，浴后水汽未干，乳尖硬挺，腿根滑腻，一碰就软。" },
  bunny_suit: { id: "bunny_suit", name: "兔女郎", icon: "🐰", layers: [], partial: true, sexModifier: "网袜兔耳，胸挤得满满，尾巴塞子塞着后穴，随顶弄晃，前面湿得一塌糊涂。" },
  paint_stained: { id: "paint_stained", name: "人体彩绘", icon: "🖌️", layers: [], partial: true, sexModifier: "彩绘遮三点，顶弄时颜料抹你腹肌，乳尖从彩绘下硬起来，穴口湿得淌。" },
  ribbon_bound: { id: "ribbon_bound", name: "丝带束缚", icon: "🎀", layers: [], partial: true, sexModifier: "丝带缚胸缚腕，越挣扎乳肉越勒出形状，腿间丝带一扯就断。" },
  naked: { id: "naked", name: "全裸", icon: "🔞", layers: [], partial: true, sexModifier: "一丝不挂，皮肤直接相贴，乳尖硬挺蹭你胸，腿间湿滑，穴肉裹上来没有阻隔。" },
};

function getOutfitDef(id) {
  return GAL_OUTFIT_DEFS[id] || GAL_OUTFIT_DEFS.school_uniform;
}

function getRunWardrobe() {
  const run = getGalRun();
  if (!run.wardrobe) {
    run.wardrobe = { baseOutfit: null, strippedLayers: [], sexOutfitId: null };
  }
  return run.wardrobe;
}

function initRunWardrobe(heroine) {
  const w = getRunWardrobe();
  w.baseOutfit = heroine.defaultOutfit;
  w.strippedLayers = [];
  w.sexOutfitId = heroine.defaultOutfit;
  saveGalRun();
}

function getUnlockedOutfits(heroine) {
  const meta = getGalCampusMeta();
  const base = heroine?.sexOutfits || ["school_uniform", "naked"];
  const extra = meta.unlockedOutfits || [];
  return [...new Set([...base, ...extra])];
}

function getCurrentStripLevel() {
  return getRunWardrobe().strippedLayers.length;
}

function getRemainingLayers() {
  const w = getRunWardrobe();
  const def = getOutfitDef(w.baseOutfit);
  return (def.layers || []).filter((l) => !w.strippedLayers.includes(l.id));
}

function getOrionUndressPreamble(heroine, outfitId) {
  if (!heroine) return "";
  const def = getOutfitDef(outfitId);
  const persona = getPersonaOutfitDesc(heroine, outfitId);
  const body = getBodyFlavor(heroine.bodyType, "reveal");
  const stripLine = getPersonaLine(heroine.personality, "strip");
  const mod = def.sexModifier || "";
  if (outfitId === "naked" || isFullyNakedForOutfit(outfitId)) {
    const touch = getBodyFlavor(heroine.bodyType, "sex");
    return [
      `灯光打在${heroine.name}赤裸的肉体上。${body}，${touch}。腿间水光泛滥，穴口一张一合，淫水顺大腿内侧淌下来，甜腥热气扑脸。`,
      stripLine,
      mod,
    ].filter(Boolean).join("\n\n");
  }
  return [
    persona,
    `你扯开${def.name}，${body}。布料摩擦乳尖，她喘出声，腿根已经湿了一片。`,
    stripLine,
    mod,
  ].filter(Boolean).join("\n\n");
}

function isFullyNakedForOutfit(outfitId) {
  return outfitId === "naked";
}

function stripNextLayer(heroine) {
  const layers = getRemainingLayers();
  if (!layers.length) return null;
  const layer = layers[0];
  const w = getRunWardrobe();
  w.strippedLayers.push(layer.id);
  saveGalRun();

  const bodyReveal = getBodyFlavor(heroine.bodyType, "reveal");
  const stripReact = getPersonaLine(heroine.personality, "strip");
  const after = layer.stripAfter ? galFill(layer.stripAfter.replace("{bodyReveal}", bodyReveal), heroine.name) : "";
  const main = galFill(layer.stripNarr.replace("{bodyReveal}", bodyReveal), heroine.name);
  const narrative = after ? `${main}\n\n${after}` : main;
  const remaining = getRemainingLayers();
  const finale = !remaining.length
    ? `\n\n${galFill(getBodyFlavor(heroine.bodyType, "reveal"), heroine.name)}。${heroine.name}全裸站在你面前，乳尖硬挺，腿间水光泛滥，穴口湿亮张合，任你为所欲为。`
    : "";
  return {
    layer,
    narrative: narrative + finale,
    char: stripReact,
    aff: layer.aff || 6,
  };
}

function getActiveSexOutfitId() {
  return getRunWardrobe().sexOutfitId || getActiveHeroine()?.defaultOutfit || "school_uniform";
}

function setSexOutfit(outfitId) {
  getRunWardrobe().sexOutfitId = outfitId;
  saveGalRun();
}

function getSexOutfitModifier(heroine) {
  const oid = getActiveSexOutfitId();
  const def = getOutfitDef(oid);
  const persona = getPersonaOutfitDesc(heroine, oid);
  const mod = def.sexModifier || "";
  const body = getBodyFlavor(heroine?.bodyType || "slim", "sex");
  const extra = persona ? `${persona}\n\n${mod}` : mod;
  return extra ? `${extra}\n\n${body}` : body;
}

function isFullyNaked() {
  const oid = getActiveSexOutfitId();
  if (oid === "naked") return true;
  const w = getRunWardrobe();
  const def = getOutfitDef(w.baseOutfit);
  return w.strippedLayers.length >= (def.layers?.length || 0);
}

function renderWardrobePicker(containerId, onPick) {
  const heroine = getActiveHeroine();
  if (!heroine) return;
  const outfits = getUnlockedOutfits(heroine);
  const el = $(containerId);
  if (!el) return;

  el.innerHTML = `<p class="gal-wardrobe-hint">选择${heroine.name}做爱时穿着（影响描写）</p>` +
    outfits.map((oid) => {
      const o = getOutfitDef(oid);
      const active = getActiveSexOutfitId() === oid ? " gal-outfit-active" : "";
      return `<button class="gal-outfit-btn${active}" data-outfit="${oid}">
        <span>${o.icon}</span><em>${o.name}</em>
      </button>`;
    }).join("");

  $$(".gal-outfit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setSexOutfit(btn.dataset.outfit);
      $$(".gal-outfit-btn").forEach((b) => b.classList.remove("gal-outfit-active"));
      btn.classList.add("gal-outfit-active");
      onPick?.(btn.dataset.outfit);
    });
  });
}

function addStripChoiceToBeats(beats, heroine) {
  const remaining = getRemainingLayers();
  if (!remaining.length) return beats;
  const layer = remaining[0];
  beats.push({
    speaker: "你",
    text: `还能再脱一件——${layer.label}。`,
    choices: [
      {
        text: `脱掉${layer.label}`,
        full: `解开${layer.label}`,
        aff: layer.aff || 6,
        bold: true,
        action: "strip",
      },
      {
        text: "忍住不脱",
        full: "留到做爱再脱",
        aff: 3,
      },
      {
        text: "直接摸进去",
        full: galCardLine(galIntensity(getGalAffection(heroine.routeId)), "serve"),
        aff: 9,
        bold: false,
      },
    ],
  });
  return beats;
}