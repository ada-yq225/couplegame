/* 蜜语 · 各档位扩充 + 纯爱线（纯爱中带轻色情） */

function orionIsPureLoveRoute() {
  return orionState?.routePlan === "purelove" || orionState?.preference === "purelove";
}

(function orionTiersPureLovePack() {
  orionPreferenceProfiles.push({
    id: "purelove",
    name: "纯爱羁绊",
    desc: "牵手、拥抱、晚安吻与心动告白。肉体在爱里变软，色情在信任里发烫。",
    matches: ["lintang", "sutang", "shenman", "guye", "baiyue"],
    bonus: "信任成长更快，谈心收益翻倍；H 更偏温柔缠绵。",
  });

  orionRoutePlans.push({
    id: "purelove",
    name: "纯爱慢热",
    desc: "不抢跑，不硬上。把每一档关系都走扎实，再让欲望自然溢出。",
    style: "牵手、拥抱、轻吻、缠绵",
  });

  const stageExpand = [
    { hint: "她还没把你当回事，但目光会在你经过时多停半秒", date: "礼貌问候，保持距离，可制造偶遇刷印象" },
    { hint: "她开始记住你的名字，消息从「嗯」变成「在吗」", date: "单独自习、递笔记、雨天共伞——暧昧前奏" },
    { hint: "眼神和指尖都在试探，牵手会脸红，吻会发抖", date: "牵手散步、额头相抵、晚安吻；边缘亲密慎用" },
    { hint: "告白后心口发烫，拥抱会软，吻会湿", date: "正式约会、谈心、轻吻颈侧；可推纯爱剧情" },
    { hint: "身体认主前心先认主，缠绵比猛顶更让她颤", date: "温柔 H、拥抱入睡；欲压涨得慢" },
    { hint: "离不开你的温度，分离半天就像失恋", date: "同居感约会、清晨吻醒；完美结局冲刺" },
  ];
  ORION_RELATION_STAGES.forEach((s, i) => {
    if (stageExpand[i]) {
      s.hint = stageExpand[i].hint;
      s.tip = stageExpand[i].date;
    }
  });

  const prefExpand = {
    slowburn: "慢热淫荡：撩到腿软才给干。每升一档关系多一段前戏描写。",
    care: "被操服感：粗暴后必安抚。H 后信任与好感额外 +1。",
    danger: "偷情刺激：教室/办公室权重高。野战检定 +1。",
    heat: "肉体直球：运动汗味路线。独处与 H 收益 +1。",
    poly: "多线肉欲：坦白局与信任更重要，避免修罗场。",
    purelove: "纯爱羁绊：剧情走 ORION_PURE_STORYLINES，H 走温柔正文。",
  };
  orionPreferenceProfiles.forEach((p) => {
    if (prefExpand[p.id]) p.desc = prefExpand[p.id];
  });

  const routeExpand = {
    deep: "单线加深：最高好感角色约会/H/剧情 +1。专注一人走完全档位。",
    poly: "后宫多线：坦白局周奖励必拿，信任≥5 稳后宫结局。",
    night: "夜游野战：性奋 +1/日概率，欲压也 +1。刺激与风险并存。",
    gift: "情趣礼物：商店折扣，送对礼物好感 +1 额外。",
    balance: "学业夹缝：考核压力小，欲压涨得慢，稳健推进各档。",
    purelove: "纯爱慢热：信任加成，谈心双倍；剧情与 H 偏缠绵。",
  };
  orionRoutePlans.forEach((p) => {
    if (routeExpand[p.id]) {
      p.desc = routeExpand[p.id];
      if (p.id === "purelove") p.style = "牵手、拥抱、轻吻、缠绵";
    }
  });

  window.ORION_PURE_STORYLINES = {
    lintang: [
      ["冰山裂缝", "图书馆灯光昏黄，林晚棠第一次主动碰你手背，指尖冰凉却抖。\n\n「……借你笔记。」她别开脸，「不是约会。只是……你坐得太近，我心跳乱。」你反手扣她指节，她僵一瞬没躲，耳根红透。\n\n五分钟变成五十分钟。她靠你肩小声：「……只许牵手。不许笑。」走出图书馆时她仍没松手，夜风里十指紧扣，像偷偷签订的温柔契约。"],
      ["法条之外", "空教室只剩你们。林晚棠锁门，不是为色情，是为坦白：「我习惯用条文保护自己……对你，条文不够用。」\n\n你吻她额头，她颤着回吻嘴角，轻得像羽毛。衬衫下心跳狂乱，她低声：「……到这里为止。再下去……我会怕。」你抱紧她，她埋你胸：「怕喜欢得太明显。」"],
      ["湿衬衫", "暴雨淋透衬衫，她冷得发抖。你把外套裹她，她抬眼：「……别看我。」却主动钻进你怀里。\n\n储物间避雨，你们额头相抵，呼吸交缠。她唇瓣轻触你下颌：「……第一次想被人暖。」没有更进一步，只有拥抱到雨停，和她湿透后仍不肯松的手。"],
      ["臣服签字", "她在情书背面签你名字，笔尖抖。不是肉欲契约，是心动收据：「……收好。丢了就……再也别想牵我。」\n\n樱花道夜，她踮脚吻你，第一次不捂嘴，舌尖软得发抖。分开时她眼 wet：「利息是拥抱。本金……每晚晚安吻。」"],
      ["图书馆越界", "闭馆前她拽你进书架死角，不是为了做，是为了说：「我怕习惯你的温度。」\n\n你环腰，她脊背贴你胸，小声：「……再抱五分钟。」五分钟里她腿软，内裤湿了一片，却坚持只拥抱：「……留到……真正该给你的时候。」"],
      ["雨夜借宿", "雨太大借宿单人床，背对背装睡。半夜她翻身贴你，声音碎：「……冷。」\n\n你从后环她，唇贴她后颈，她哼一声没推开。清晨她耳尖红：「……只睡觉。骗你的。」其实整夜没睡，只记得你心跳。"],
      ["樱花告白", "樱花树下她主动牵你：「……我先说喜欢。你不许得意。」吻落下，温柔缠绵，她眼泪掉下来：「……等了太久。」花瓣粘她发，你拂掉，她第一次没躲。"],
      ["学期契约", "她递来「交往试用协议」，条款正经得可爱：每日晚安吻、每周牵手散步、吵架先拥抱再说话。\n\n签字后她吻你嘴角：「……违约罚……一整晚抱着睡。」没有更过分的，只有合同纸旁她攥紧你袖口的指节。"],
      ["同居试睡", "公寓第一夜，法袍当被子。她背对你，忽然伸手找你的手：「……牵着睡。」\n\n半夜她翻身面对你，额头相抵，小声：「……想要早安吻。醒来就要。」清晨你吻她，她闭眼笑，像赢了全世界。"],
      ["法庭角色扮演", "模拟法庭后她穿法袍拉你储物间，不是角色扮演性爱，是撒娇：「判你……终身牵我。」\n\n吻从唇到颈，她抖着抱紧：「……这里不行。回公寓……可以继续亲。」"],
      ["雨夜检书", "暴雨困图书馆，扶梯子时她手抖。你扶腰，她转身埋你胸：「……怕雷。也怕……太喜欢你。」\n\n雨声里长吻，她软在你怀里，裙底湿了却坚持只吻：「……回家再继续。我会开门。」"],
      ["期末宣誓", "考前夜她拽你空教室，不是罚操，是求陪伴：「考不好……也要你在。」\n\n拥抱到晨，她哑声：「……谢谢。有你在，我不怕。」牵手走出教室，像向全世界宣告：她是你的。"],
    ],
    sutang: [
      ["奶茶约定", "苏糖把奶茶推给你：「间接接吻～」脸红到脖子，却眼睛亮晶晶。\n\n桌下她脚尖碰你鞋面，小声：「……心跳好快。都怪你。」牵手离开时她晃你胳膊：「明天还要～」"],
      ["自习桌下", "图书馆自习，她假装看书，桌下小指勾你小指。\n\n「复习呀～」她泪眼撒娇，「……可脑子里全是你。」笔尖划歪，她凑耳小声：「考砸了你要负责……负责哄我。」"],
      ["社团更衣室", "兔耳只给你看，不是为了色情，是为了信任：「……只准你看。看了就要夸我可爱。」\n\n你吻她额头，她 squeal 埋你胸：「……还要亲这里。」指唇，羞得闭眼。"],
      ["电影院后排", "黑暗里她握你手贴她胸口：「电影好无聊……想听你心跳。」\n\n散场她靠你肩：「……下次还坐最后一排。不看电影，看你。」"],
      ["宿舍上铺", "室友不在，她溜你床边小声：「……讲睡前故事。」\n\n故事讲到一半她困得眯眼，却攥你衣角：「别走……天亮再走。」"],
      ["泳池湿身", "泳衣湿身，她扑你怀里：「冷～」乳尖蹭你胸，她立刻害羞：「……故意的。想要抱。」\n\n上岸牵手走，她小声：「……手好暖。想一直牵着。」"],
      ["奶油告白", "奶油沾她嘴角，你舔掉，她愣住然后哭唧唧笑：「……犯规！」\n\n吻落下，甜腻温柔，她抽泣：「说喜欢……现在说……」"],
      ["甜软誓言", "她哭着问你会不会嫌她黏，你吻她到安静。\n\n「……淫也只对你。骗你的，是喜欢得受不了。」拥抱到腿软，没有更进一步，只有心跳。"],
      ["糖果戒指", "糖果套你手指：「求婚……骗你的。」她认真看你：「……但想要真的。 someday。」\n\n吻手背的仪式感，她脸红：「……接受了。不许反悔。」"],
      ["直播惊魂", "关播后她扑你：「弹幕说脸好红……都是你。」\n\n要你把评论念给她听，她埋胸小声：「……只准你害我脸红。」"],
      ["泳队庆功", "酒醉挂你颈：「……想要抱抱。不是那个……就是抱。」\n\n酒店浴室外她靠你，轻吻你喉结：「……明天清醒了……还要亲。」"],
      ["毕业旅行", "海边夜穿你衬衫，浪声里牵手。\n\n「旅行结束……还想牵。」她踮脚吻你，「……回去就同居。骗你的……现在就要名分。」"],
    ],
    shenman: [
      ["助教加班", "沈曼关百叶窗，解开一颗扣不是为了挑逗，是疲惫：「……陪姐姐坐会儿。」\n\n你递咖啡，她靠你肩，罕见柔软：「小朋友……别走。」指尖勾你小指，像退回少女。"],
      ["丝袜撕裂", "不是撕裂丝袜，是撕裂骄傲。她坦白怕老：「姐姐也会怕……你嫌我烦。」\n\n你吻她额头，她颤着回吻：「……叫名字。别叫姐姐。」"],
      ["会议桌下", "视频会议后她拉帘子，不是桌下口交，是额头相抵：「……累了。抱我。」\n\n成熟女人示弱一刻，比任何色情都烫。"],
      ["叫主人", "不是项圈，是称呼：「……想听你说喜欢。大声点。」\n\n吻漫长，她软下去：「……确认了。你可以碰我。」"],
      ["酒吧后台", "演出后她靠你：「三分钟……只要拥抱。」\n\n香水混汗，她闭眼花落：「……返场取消。跟你回家。」"],
      ["车震后座", "停车场她握你手：「车窗会起雾……因为我们在接吻。」\n\n没有更进一步，只有吻到缺氧，她摸你脸：「……留着这口气。回家继续。」"],
      ["酒店支配", "房卡给你，进门却先抱：「……今晚不学支配。学依赖。」\n\n她枕你胸，小声：「……别走。天亮也不许。」"],
      ["御姐沦陷", "学期末她软声：「姐姐也会怕孤单。」\n\n吻很久，叫名字不叫主人，事后抱紧：「……确认了。你是谁的？」"],
      ["家访越界", "车停地库，她靠窗：「……不是家访。是想你。」\n\n轻吻侧脸，她闭眼：「……上楼坐坐。只聊天……骗你的，想亲。」"],
      ["红酒浴缸", "浴缸共泡，水雾朦胧。她枕你肩：「……服侍？不用。陪着就好。」\n\n指尖交缠，吻从温柔到湿，她哑声：「……可以……再近一点。」"],
      ["年会后台", "礼服开衩，后台只剩拥抱：「……三分钟充电。」\n\n补妆前吻你，眼里湿：「……带着你的温度上台。」"],
      ["学期移交", "教研室钥匙给你：「以后……加班有人等。」\n\n桌下十指相扣，她笑：「……新任助教。义务包括每晚晚安吻。」"],
    ],
    guye: [
      ["拉伸越界", "压腿时她脸红：「……别乱摸。」却抓住你手按心口：「这里跳太快。都怪你。」\n\n拥抱平复呼吸，她哼：「……拉伸费……一个吻。」"],
      ["淋浴三分钟", "淋浴间不是三分钟快炮，是她递毛巾：「……背我搓。下面……不许。」\n\n热水里额头相抵，吻意外落下，她咬唇：「……算你赢。」"],
      ["操场看台", "夜跑后靠你肩，汗味混夜风。\n\n「……追上了就……牵手。」她主动扣你十指，看台风大，她贴更紧。"],
      ["奖牌奖励", "夺冠夜吻你额头：「奖励是……今晚你陪我。」\n\n器材室只有拥抱和吻，她喘：「……比比赛还……心跳快。」"],
      ["更衣室突袭", "更衣柜窄，她抵门板不是后入，是撒娇：「……三分钟……只要抱。」\n\n哨声前结束，她腿软：「……下训……继续骗你的。」"],
      ["泳池救生", "湿身坐池沿，她环颈：「冷……暖我。」\n\n吻从唇到颈，她笑：「……溺水这样救。记住了。」"],
      ["晨跑树林", "雾中并肩跑，她递水：「间接接吻。」\n\n看台后牵手，她哼：「……追上了……就天天等。」"],
      ["汗味誓言", "赛季末抱紧：「……别让我等。」\n\n正面拥抱吻，没有猛烈抽插，只有誓言：「确认了。下学期还来。」"],
      ["理疗室越界", "理疗床她趴好，你握手：「……验心跳。」\n\n敲门时她捂你嘴，是怕人听见心跳，不是怕人听见呻吟。"],
      ["接力庆功", "挂颈亲：「奖励……只给你。」\n\n垫子上有吻有抱，她腿软：「……比金牌……更想要你。」"],
      ["晨训惩罚", "迟到背她跑圈，树林她跳下来牵手：「……追到了。不罚了。」\n\n吻意外深，她别脸：「……意外。明天继续。」"],
      ["职业合同", "运动合同写你名字：「经纪人……是你。」\n\n签字后吻你：「……违约罚……一整夜牵手。」"],
    ],
    baiyue: [
      ["私人模特", "她脱衣不是为了色情，是为了信任：「……只画你。只让你看。」\n\n吻落在她肩，她颤：「……模特费……一个拥抱。」"],
      ["颜料小腹", "让你画她腰线，不是射小腹：「……这是艺术。也是……心动。」\n\n吻从腰到唇，她痴笑：「……比颜料烫。」"],
      ["镜前束缚", "红丝带缚腕，镜前不是后入，是告白：「看……我是谁的了。」\n\n吻镜中你，也吻真实的你：「……我的了。」"],
      ["雨夜占有", "暴雨敲门：「只有你能进……进来抱我。」\n\n湿身拥抱到干，她哭：「……怕失去你。」没有立刻做，只有整夜相拥。"],
      ["天台边缘", "天台风大，她退无可退却牵你：「……怕掉……更怕你不牵。」\n\n吻在风中，她夹紧你手臂：「……下去前……先说喜欢。」"],
      ["咬痕标记", "不是咬痕，是手链：「……戴着。让所有人知道你有主。」\n\n吻颈温柔，她颤：「……闻得到吗。我的心。」"],
      ["画室囚禁", "锁门：「今晚只画心跳。」\n\n吻漫长，她笑又疯：「……囚徒……也是我。」"],
      ["永久画布", "画布上画牵手轮廓：「真人比画好看。」\n\n跨坐膝上不是坐到底，是拥抱：「……毕业也不许跑。」"],
      ["双人画展", "画展只邀你，最后一幅是牵手速写。\n\n当众吻你，夜里画室补色，吻比颜料烫。"],
      ["宿舍查岗", "混进被窝闻你：「有没有别人味道。」\n\n舔颈是撒娇不是消毒：「……现在干净了。抱紧。」"],
      ["雨中婚礼", "暴雨白裙淋透：「婚礼……骗你的。」\n\n按墙吻，哭笑：「……戒指用绳。绑你不许跑。」"],
      ["终章占有", "毕业展前锁画室：「最后一夜……只做我的模特。」\n\n吻与抱轮番，占有宣告：「……永远。听见了吗。」"],
    ],
  };

  window.ORION_PURE_DIALOGUE = {
    lintang: {
      date: [
        "林晚棠递来保温杯：「姜茶。别问为什么。」你们并肩走樱花道，她走外侧，手指碰你手背一秒又收回，像犯罪证据。\n\n风落花瓣在她肩头，你拂掉，她停步低声：「……手可以牵。只今天。明天我会装没发生。」",
        "深夜自习她拉帘子，低声：「复习……或者复习怎么让我心跳乱。」没有更过分的，只有指尖在桌下相勾，和她假装看书时红透的耳根。",
      ],
      flirt_ok: ["她别开脸，耳根红：「……放肆。」却把小指勾进你掌心，「……继续。我不躲。」"],
      deep: ["「我怕习惯你的温度。」她声音很轻，「习惯了就离不开……你负责。」她把额头抵你肩，裙底湿了一片，却只要拥抱。"],
    },
    sutang: {
      date: ["苏糖蹦过来挽你胳膊：「今天也要牵手嘛～」软肉贴着，她小声哼，「……心跳好快。都怪你。」"],
      flirt_ok: ["她脸红埋你胸：「……湿了。都怪你……只要抱抱好不好……」"],
      deep: ["「做爱之后我会哭。」她认真看你，「不是后悔……是太幸福。抱紧我好不好。」"],
    },
    shenman: {
      date: ["沈曼递红酒杯沿吻痕：「尝尝姐姐的赏。」她靠你肩，「礼数够了……该你牵我了。」"],
      flirt_ok: ["她捏你下巴吻下来，控节奏却眼 wet：「……小朋友。姐姐也会心动。」"],
      deep: ["「姐姐也会怕老。」她罕见柔软，「多抱几次……让我记得被爱着。」"],
    },
    guye: {
      date: ["顾野递同一瓶水：「间接接吻。」看台后她靠你肩，「……追上了就牵手。快点。」"],
      flirt_ok: ["她抓你手按心口：「……这里跳太快。你赔。」吻落下，汗味混温柔。"],
      deep: ["「别让我等。」她抱紧，「确认了……下学期还来。敢不来试试。」"],
    },
    baiyue: {
      date: ["白玥捧你脸：「只准看我。」吻轻得像落笔，「……模特费。一个拥抱。」"],
      flirt_ok: ["她覆你手往心口：「……画这里。跳得厉害。」笑甜得瘆，眼却湿。"],
      deep: ["「毕业也不许跑。」她吻绳结似的吻你唇，「……永远。听见了吗。」"],
    },
  };

  const pureSceneSample = {
    LINTANG_1: `空教室门落锁，林晚棠没有立刻褪衣，而是把额头抵你肩，呼吸乱成一团。\n\n「……慢一点。」她声音哑，「我想记得第一次是怎么开始。」你吻她唇，她颤着回应，舌尖软得不像话。衬衫解开两颗，你掌心贴她腰，她吸气，乳尖隔着布料硬了。\n\n你褪她内裤时她捂眼，穴口却湿得诚实。龟头抵住磨湿，再缓缓顶入，她哭腔哼进你颈窝：「……好满……轻点……」慢顶每下都深，她腿缠你腰，穴肉温柔绞紧。\n\n高潮时她咬你肩不喊大声，热液濡湿结合处。你射在里面，她抱紧不放，哑声：「……成绩不许掉。人……也不许丢。」`,
    SUTANG_1: `苏糖被按墙上，先吻再进。她泪眼撒娇：「学长/学姐……温柔一点……」你吻她到软，手指探入她已湿透的穴，她哼成小猫。\n\n顶入时她抱紧你颈，小穴又紧又热：「……撑……好胀……」慢磨变深顶，她哭唧唧却不推开。高潮时她抽泣着吻你，热液喷你指根。\n\n射在里面她摸小腹傻笑：「……好暖……抱我……」`,
    SHENMAN_1: `沈曼跨坐，不是控节奏折磨，而是枕你胸：「……今晚姐姐想被抱着做。」对坐到底她仰头颤，E罩杯贴你心口。\n\n慢摇变深顶，她命令变软成呢喃：「……再深……抱紧……」射里面她吻你喉结：「……不错。下次……还要温柔。」`,
    GUYE_1: `更衣柜窄，顾野先吻再进。她喘：「……三分钟……温柔点。」从后缓缓顶入，她抓门板指节白，却小声：「……再抱我一点……」\n\n射里面她腿软靠你：「……还行。明天……还来。」`,
    BAIYUE_1: `画室裸体，白玥先吻再量尺寸。含住你是温柔侍奉，眼 wet 笑。\n\n对画布边进入，她哼你名字，每下都深却缠绵。射里面她摸小腹：「……画下来了。在心里。」`,
  };
  const pureMood = ["温柔", "缠绵", "心跳", "相拥", "轻喘", "慢磨", "信任", "告白", "月色", "晨曦", "雨后", "樱花", "初雪", "夏至", "深秋"];
  for (let i = 2; i <= 15; i++) {
    for (const prefix of ["LINTANG", "SUTANG", "SHENMAN", "GUYE", "BAIYUE"]) {
      const id = `${prefix}_${i}`;
      const base = pureSceneSample[`${prefix}_1`];
      if (base) {
        const mood = pureMood[(i - 1) % pureMood.length];
        pureSceneSample[id] = `${base}\n\n【${mood}】这一夜没有粗暴，只有更熟悉的身体与更默契的呼吸。她抱紧你，在高潮后轻声说「……还要这样……很多次。」`;
      }
    }
  }
  window.ORION_PURE_SCENE_CONTENT = Object.fromEntries(
    Object.entries(pureSceneSample).map(([k, body]) => [k, { body }])
  );

  Object.assign(ORION_APPROACH_FLAVOR, {
    lintang: { near: "你走近，她下巴微抬，目光软下去：「……慢一点。」", kiss: "吻温柔绵长，她哼进你唇：「……这样……我可以……」", back: "从后环腰，她脊背贴你：「……抱紧。今晚……只想被抱着。」" },
    sutang: { near: "她蹭进怀，软声：「抓到你了……今天可以牵手吗？」", kiss: "吻甜软，她 squeal 后加深，「……还要……」", back: "从后抱，她往后贴：「……好暖……想要一直这样……」" },
    shenman: { near: "她拉你手贴她心口：「……跳得厉害。你负责。」", kiss: "吻绵长，她软声：「……今晚……不想支配。想被抱。」", back: "从后环腰，她后脑靠你肩：「……就这样……别走。」" },
    guye: { near: "她递水碰你唇：「……间接接吻。」耳根红。", kiss: "对抗式吻却温柔收尾，她哼：「……再亲一下。」", back: "从后抱，她贴你背：「……暖。想要……一直牵着。」" },
    baiyue: { near: "她捧你脸：「只准想我。」吻轻落额头。", kiss: "吻像落笔，她颤：「……我的。」", back: "从后抱，她覆你手在心口：「……画这里。」" },
  });

  if (typeof orionEndings !== "undefined") {
    orionEndings.purelove = "二十四周过去，你与 {name} 从牵手到拥抱，从晚安吻到凌晨相依。六档关系一路走扎实，肉体在爱里变软，色情在信任里发烫——你们不是炮友，是恋人。门后仍会缠绵，门外十指紧扣。";
  }

  if (typeof ORION_WEEKLY_EXTRA_REWARDS !== "undefined" && !ORION_WEEKLY_EXTRA_REWARDS.some((r) => r.label === "纯爱周末")) {
    ORION_WEEKLY_EXTRA_REWARDS.push(
      { label: "纯爱周末", hint: "信任 +3 欲压 -3", run: () => orionReward({ trust: 3, stress: -3 }, "周末只有牵手和拥抱，心却更烫了。") },
      { label: "晚安吻", hint: "好感随机+2 性奋 +1", run: () => orionWeeklyPureKiss() },
    );
  }

  function orionWeeklyPureKiss() {
    const pick = orionPeople()[Math.floor(Math.random() * orionPeople().length)];
    orionState.relationships[pick.id].affection = orionClamp(orionState.relationships[pick.id].affection + 2, 0, 14);
    orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
    orionReward({ trust: 1 }, `${pick.name} 的晚安吻落在唇角，很轻，却很烫。`);
  }

  if (typeof ORION_MODE_HINTS !== "undefined") {
    ORION_MODE_HINTS.purelove = "纯爱线：优先牵手、谈心、推纯爱剧情；信任够高时 H 也更温柔。";
    ORION_MODE_HINTS.preference = "性癖罗盘含「纯爱羁绊」——心动先于肉欲，六档关系走扎实。";
    ORION_MODE_HINTS.route = "路线含「纯爱慢热」：信任加成，H 正文切换为缠绵版。";
  }

  if (typeof orionGetBreatherChoices === "function") {
    const origBreather = orionGetBreatherChoices;
    orionGetBreatherChoices = function () {
      if (!orionIsPureLoveRoute()) return origBreather();
      const endBreather = (msg) => {
        orionState.breatherMode = false;
        orionOpenExam(msg);
      };
      return [
        { label: "💤 睡整天", hint: "体力 +6 欲压 -4", run: () => { orionState.energy = orionClamp(orionState.energy + 6, 0, 14); orionState.stress = orionClamp(orionState.stress - 4, 0, 14); orionSaveRun(); endBreather("睡饱了，心里也静了。"); } },
        { label: "📖 补课", hint: "学业 +3 体力 -2", run: () => { orionState.study = orionClamp(orionState.study + 3, 0, 14); orionState.energy = orionClamp(orionState.energy - 2, 0, 14); orionSaveRun(); endBreather("恶补一轮，成绩稳了。"); } },
        { label: "💕 约会日", hint: "信任 +3 魅力 +1", run: () => { orionState.trust = orionClamp(orionState.trust + 3, 0, 14); orionState.charm = orionClamp(orionState.charm + 1, 0, 14); orionSaveRun(); endBreather("一整天只有牵手和拥抱，却比平时更烫。"); } },
        { label: "跳过", hint: "直接周末考核", run: () => endBreather("没休息，硬撑到周末。") },
      ];
    };
  }

  if (typeof ORION_SEMESTER_ARCS !== "undefined") {
    Object.assign(ORION_SEMESTER_ARCS[0], { hint: "播种：留意→暧昧，蹲点与牵手散步" });
    Object.assign(ORION_SEMESTER_ARCS[1], { hint: "点燃：告白与温柔 H，推纯爱/肉欲剧情" });
    Object.assign(ORION_SEMESTER_ARCS[2], { hint: "沉迷：肉体→沉迷，信任与谈心" });
    Object.assign(ORION_SEMESTER_ARCS[3], { hint: "占有：完美/纯爱结局冲刺" });
  }

  if (typeof ORION_GUIDE_SECTIONS !== "undefined") {
    ORION_GUIDE_SECTIONS.push({
      title: "纯爱线指南",
      lines: [
        "开局选「纯爱羁绊」+「纯爱慢热」，或中途换策略切纯爱。",
        "六档关系：陌生→留意→暧昧→点燃→肉体→沉迷，每档多谈心少硬撩。",
        "剧情走纯爱十二幕（推进剧情时自动切换）；H 为温柔缠绵正文。",
        "完美纯爱结局：最高好感≥10、信任≥8、十二幕通关、关系「沉迷」。",
      ],
    });
  }
})();

function orionBuildPureDateText(person, rel) {
  const pool = ORION_PURE_DIALOGUE[person.id]?.date;
  const line = pool?.length ? pool[rel.dates % pool.length] : orionBuildDateText(person, rel);
  const stage = orionGetRelationStage(rel);
  const stageLine = stage.tip ? `【${stage.label}】${stage.tip}` : "";
  return [line, stageLine].filter(Boolean).join("\n\n");
}

function orionPureLovePersonChoices(person, rel, choices) {
  if (!orionIsPureLoveRoute()) return choices;
  const pure = [
    { label: "🤝 牵手散步", hint: "好感+2 信任+1 欲压-1", run: () => orionPureStroll(person, rel) },
    { label: "💤 晚安吻", hint: "信任+1 性奋+1 温柔", run: () => orionPureGoodnightKiss(person, rel) },
  ];
  const idx = choices.findIndex((c) => c.label.includes("深夜谈心"));
  if (idx >= 0) choices.splice(idx + 1, 0, ...pure);
  else choices.splice(3, 0, ...pure);
  if (rel.affection >= 5 && orionState.trust >= 6 && orionState.spark < 1) {
    const hasH = choices.some((c) => c.label.includes("带她去做"));
    if (!hasH) {
      const ins = choices.findIndex((c) => c.label.includes("推进剧情"));
      const hChoice = { label: "💕 温柔缠绵", hint: "信任够高 · 纯爱 H 正文", run: () => orionOpenAdultScene(person.id) };
      if (ins >= 0) choices.splice(ins, 0, hChoice);
      else choices.splice(4, 0, hChoice);
    }
  }
  choices.forEach((c) => {
    if (c.label.includes("带她去做")) {
      c.label = "💕 温柔缠绵";
      c.hint = "纯爱 H · 慢磨深顶 · 拥抱收尾";
    }
    if (c.label.includes("推进剧情")) c.hint = "纯爱十二幕 · 不耗性奋 · 信任+1";
  });
  return choices;
}

function orionPureStroll(person, rel) {
  rel.affection = orionClamp(rel.affection + 2, 0, 14);
  orionState.trust = orionClamp(orionState.trust + 1, 0, 14);
  const stage = orionGetRelationStage(rel);
  const text = `【牵手散步 · ${stage.label}】\n樱花道晚风里，${person.name}十指扣进你掌心，指尖微凉却不愿松开。\n\n「……走慢一点。」她小声，「这样……可以多牵一会儿。」路灯把影子叠在一起，她偶尔蹭你肩，裙底那一点湿热是心动，不是预谋。`;
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, text) + `<p class="orion-log-meta">好感 +2 · 信任 +1 · 欲压舒缓</p>`;
  orionApplyChoice({ energy: -1, stress: -1 }, "", person.id);
}

function orionPureGoodnightKiss(person, rel) {
  rel.affection = orionClamp(rel.affection + 1, 0, 14);
  orionState.trust = orionClamp(orionState.trust + 1, 0, 14);
  orionState.spark = orionClamp(orionState.spark + 1, 0, 14);
  const text = `【晚安吻】\n${person.name}在宿舍楼下停步，踮脚吻你唇角，轻得像羽毛，却烫得心跳失序。\n\n「……到了跟我说一声。」她耳尖红，「不是查岗……是……想听你声音。」`;
  orionState.pendingLogHtml = orionWrapDateImmersive(person, rel, text) + `<p class="orion-log-meta">信任 +1 · 性奋微涌 · 纯爱升温</p>`;
  orionApplyChoice({ energy: -1, stress: -1 }, "", person.id);
}

