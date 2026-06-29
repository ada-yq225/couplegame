/* 蜜语 · Orion 角色扮演色情情节 */

(function orionRoleplayPack() {
  Object.assign(ORION_PLAY_DEFS, {
    rp_teacher_student: {
      id: "rp_teacher_student", name: "师生补课", icon: "📚",
      hint: "空教室角色扮演 · 违纪惩罚",
      req: (p, r) => r.affection >= 4 && ["lintang", "shenman"].includes(p.id),
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 1,
    },
    rp_judge_defendant: {
      id: "rp_judge_defendant", name: "法庭审判", icon: "⚖️",
      hint: "法袍不脱 · 当庭「执行」",
      req: (p, r) => r.affection >= 5 && p.id === "lintang",
      energy: -2, spark: 2, aff: 3, intimacy: 1, stress: 0,
    },
    rp_maid_service: {
      id: "rp_maid_service", name: "女仆服侍", icon: "🎀",
      hint: "围裙下面什么都没有",
      req: (p, r) => r.affection >= 4 && ["sutang", "baiyue"].includes(p.id),
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: -1,
    },
    rp_idol_private: {
      id: "rp_idol_private", name: "偶像私教", icon: "🎤",
      hint: "只准你一个人看彩排",
      req: (p, r) => r.affection >= 5 && p.id === "sutang",
      energy: -2, spark: 3, aff: 2, intimacy: 1, stress: 1,
    },
    rp_boss_secretary: {
      id: "rp_boss_secretary", name: "上司秘书", icon: "💼",
      hint: "加班考核只有一项",
      req: (p, r) => r.affection >= 4 && p.id === "shenman",
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 1,
    },
    rp_interrogation: {
      id: "rp_interrogation", name: "审讯室", icon: "🔦",
      hint: "招供用身体支付",
      req: (p, r) => r.affection >= 6 && r.intimacy >= 1 && p.id === "shenman",
      energy: -3, spark: 2, aff: 2, intimacy: 2, stress: 1,
    },
    rp_coach_special: {
      id: "rp_coach_special", name: "私教加练", icon: "🏋️",
      hint: "拉伸越过分越好",
      req: (p, r) => r.affection >= 4 && p.id === "guye",
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
    },
    rp_photographer: {
      id: "rp_photographer", name: "私房摄影", icon: "📷",
      hint: "拍到湿为止",
      req: (p, r) => r.affection >= 5 && p.id === "baiyue",
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 1,
    },
    rp_captor: {
      id: "rp_captor", name: "囚禁游戏", icon: "⛓️",
      hint: "安全词照旧 · 她说停就停",
      req: (p, r) => r.affection >= 6 && r.intimacy >= 2 && p.id === "baiyue" && orionHasBondageItem(),
      energy: -3, spark: 3, aff: 2, intimacy: 2, stress: 2,
    },
    rp_stranger_bar: {
      id: "rp_stranger_bar", name: "酒吧搭讪", icon: "🍸",
      hint: "假装初见 · 十句内带回房",
      req: (p, r) => r.affection >= 4 && orionState.charm >= 3,
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
    },
    rp_massage_special: {
      id: "rp_massage_special", name: "色情按摩", icon: "💆",
      hint: "精油推拿变指奸",
      req: (p, r) => r.affection >= 4 && orionHasItem("按摩油"),
      item: "按摩油", energy: -2, spark: 2, aff: 3, intimacy: 1, stress: -2,
    },
    rp_doctor_check: {
      id: "rp_doctor_check", name: "体检问诊", icon: "🩺",
      hint: "白大褂里真空检查",
      req: (p, r) => r.affection >= 5 && r.intimacy >= 1,
      energy: -2, spark: 2, aff: 2, intimacy: 1, stress: 0,
    },
  });

  Object.assign(ORION_PLAY_BODY, {
    rp_teacher_student: {
      lintang: "空教室门落锁。林晚棠推眼镜，语气冷：「补课。违纪三次，按校规处罚。」\n\n她坐讲台沿，裙掀一线：「第一条：跪好。第二条：用嘴证明悔过。第三条……」你抬头，她腿已开，内裤湿痕透布，「……插入是附加题。做错加罚一整夜。」\n\n她抓你头发控节奏，喉深时法条断成呻吟。后入趴讲台，粉笔灰沾膝，每顶一下她念：「……认罪……认罪……」射里面她擦眼镜：「……及格。明晚继续补习。」",
      shenman: "教研室只剩你们。沈曼关百叶窗，高跟鞋踩响：「沈同学，论文迟交。」\n\n她坐桌沿解一颗扣：「惩罚三选一：跪、舔、或脱光挨板。」你选第三，她笑：「有胆量。」\n\n板子是手掌，打臀十下她湿得顺腿流。她拽领带按桌后入：「……叫导师。叫错重来。」",
      default: "教室角色扮演开始，她命令你跪好，惩罚从口舌升级到插入，台词比动作更色。",
    },
    rp_judge_defendant: {
      lintang: "她穿法袍，里面只有蕾丝内衣。法槌敲桌：「被告，罪名——让法官湿了。」\n\n「不服？」她撩袍坐桌沿，腿开：「取证。」你跪舔，她抓假发控角度，哼声努力威严：「……沉默……视为……认罪……」\n\n后入她扶法槌，每顶一下宣判：「……有期徒刑……每晚执行……」内射她记录：「……刑期……无期。」",
    },
    rp_maid_service: {
      sutang: "苏糖穿围裙，里面真空，兔耳发箍歪着：「主人……要奶茶还是……我？」\n\n你坐沙发她跪喂，吸管共吮后往下跪，围裙系带一拉全露。含到深喉她泪眼：「……女仆守则……不许射外面……」\n\n骑乘围裙还挂在腰，奶子晃给你看：「……满意就……内射……算小费……」",
      baiyue: "白玥围裙下缚红丝带，跪门边：「……主人回来了。」\n\n端茶时故意洒你裤裆，跪舔「赔罪」。丝带缚腕，她任你摆：「……今晚……只准使唤我……」\n\n后入扯丝带，她吻地板：「……弄脏……我收拾……用嘴……」",
      default: "女仆角色扮演，跪伺升级到骑乘，台词乖得反常。",
    },
    rp_idol_private: {
      sutang: "舞蹈房灯暗，苏糖只穿练习服：「……私教课。只给你看。」\n\n八拍变脱衣，镜里臀线扭到你硬。她趴把杆翘臀：「……扣分……就罚你……顶进来……」\n\n后入撞把杆叮当，她对镜看自己被干：「……表情……管理……失败了啦……」射里面她比 V：「……专属粉丝……永不变质……」",
    },
    rp_boss_secretary: {
      shenman: "加班只剩你们。沈曼踩桌沿，丝袜勾你领带：「考核一项——让我满意。」\n\n你跪舔她命令大声，湿得顺腿她不打断：「……声音太小。不及格。」\n\n她坐桌沿你站入，每顶一下她念 KPI：「……绩效……A+……射里面……算年终奖……」",
    },
    rp_interrogation: {
      shenman: "地下室灯惨白，沈曼坐铁椅翘腿：「嫌疑人，坦白从宽。」\n\n你绑椅，她跨坐磨：「刑讯开始。」项圈扣颈，拽链控角度后入，每顶一下问：「……还有谁？」\n\n你胡诌她咬唇：「……谎话……惩罚加倍……」高潮她掐下巴：「……招了。全招了。射进来封口。」",
    },
    rp_coach_special: {
      guye: "体育馆闭馆，顾野穿运动内衣：「……加练。输的脱一件。」\n\n你输光她笑，把你按软垫：「……拉伸。腿张开。」手指探入她舔耳：「……筋很紧……我帮你松。」\n\n后入撞垫闷响，她喘比哨响：「……再……再深一点…………算……达标……」汗味混淫水，射里面她踹你：「……明天……还练……」",
    },
    rp_photographer: {
      baiyue: "画室布帘拉上，白玥举相机：「……模特。只穿衬衫。」\n\n每摆一姿解一颗扣，快门声混你粗喘。她命令：「……硬了……入镜……」\n\n按在背景布后入，她边拍边被顶到哭：「……这张……要洗最大张……」精液溅画布，她舔手指：「……颜料……不够了……」",
    },
    rp_captor: {
      baiyue: "公寓反锁，绳结系门把。白玥缚你腕：「……囚禁游戏。安全词照旧。」\n\n蒙眼喂水再舔，项圈牵到床边：「……今晚……你是我的……」\n\n缚姿轮番，后入拽链，她高潮咬绳：「……不放……永远不放……」射里面她吻项圈：「……盖章……」",
    },
    rp_stranger_bar: {
      lintang: "酒吧她坐吧台，你搭讪十句。她冷眼：「……陌生人。」第三杯后耳尖红，跟你出后门：「……钟点房。只今晚。不许问名字。」\n\n进门推墙吻，裙掀腰站立顶，她捂嘴忍叫：「……快点…………像……一夜情……」射里面她整理裙：「……陌生人……再见。」出门又发短信：「……骗你的。回来。」",
      sutang: "她装不认识，你请奶茶。她舔盖：「……谢谢陌生人～」手桌下蹭你腿。\n\n厕所隔间三分钟，她蹲含深喉，泪眼抬头：「……陌生人……好大方……」",
      shenman: "她踩高跟走来：「……一个人？」你说是。她灌你酒，耳语：「……姐姐也是。房卡……敢拿吗？」\n\n进门她骑乘控节奏，命令叫姐姐，射里面踩你胸：「……陌生人……合格。」",
      guye: "她装路人夜跑撞你，汗湿背心贴乳尖。你扶腰她贴近：「……谢了。前面……没灯。」\n\n树林边站立顶，她咬肩忍哼：「……陌生人……再猛一点……」",
      baiyue: "她坐角落画你，递纸条：「……像初恋。跟我走。」\n\n公寓门落锁她变脸缚腕：「……陌生人游戏……结束……你是我的了。」",
      default: "酒吧假装初见，十句内带回房，一夜情扮演到射里面。",
    },
    rp_massage_special: {
      default: "精油从颈到腿根，推拿变指奸。她趴垫翘臀：「……这里……也要松……」\n\n三根手指高潮后她翻身含你，再骑乘磨到射里面：「……疗程……加钟……」",
    },
    rp_doctor_check: {
      lintang: "白大褂真空，林晚棠戴听诊器：「……脱。检查。」\n\n冰器贴乳尖她哼出声，手套指探湿穴：「……炎症？……是发情。」\n\n「治疗。」她坐桌沿你进入，每顶一下写病历：「……处方……内射……一日三次……」",
      sutang: "苏糖护士装歪着：「……打针～会痛哦～」针是舌尖，「药」是你柱身。\n\n骑乘套弄，她哭唧唧：「……护士……也被感染了……好湿……」",
      shenman: "沈曼医生袍开衩到腰：「……全裸检查。别害羞。」\n\n指交后她命令趴床后入：「……病灶……深部……要顶到……」",
      guye: "运动康复师装，她按你大腿根：「……筋络……这里最紧。」\n\n互摸变后入，垫子上汗渍扩大：「……康复……要多次……」",
      baiyue: "画室里她穿白袍：「……心理问诊。把欲望画出来。」\n\n画笔滑到腿间，问诊变骑乘，精液溅在素描本：「……诊断……沉迷……」",
    },
  });

  const roleplayEvents = {
    lintang: [
      {
        title: "模拟法庭夜", loc: "空教室",
        text: "辩论社散场，林晚棠还穿法袍，讲台灯只亮一盏。",
        tags: ["深夜"],
        beats: [
          { speaker: "林晚棠", text: "「……今晚不辩论。」法槌敲桌，「模拟审判。你是被告。」" },
          { speaker: "林晚棠", text: "她坐桌沿撩袍，丝袜线若隐若现：「罪名——偷看法官内衣。刑罚……你选：跪或脱。」" },
          { speaker: "旁白", text: "储物间门落锁，角色扮演刚开场，她呼吸就乱了。" },
        ],
      },
      {
        title: "家教扮演", loc: "她公寓",
        text: "她发来：「家教课。七点到。带笔记。别多想。」",
        tags: ["深夜"],
        beats: [
          { speaker: "林晚棠", text: "开门只穿衬衫，下摆盖不住腿根：「……迟到扣十分。进门先叫老师。」" },
          { speaker: "林晚棠", text: "辅导十分钟她坐你腿间：「……这题不会？用身体教。」" },
        ],
      },
      {
        title: "警官临检", loc: "樱花道",
        text: "樱花道她忽然拦你，语气公事公办。",
        tags: ["黄昏"],
        beats: [
          { speaker: "林晚棠", text: "「……临检。身份证。」你递上，她瞥裤裆：「……违禁品。跟我走。」" },
          { speaker: "林晚棠", text: "树后她吻你：「……角色扮演。敢拒捕吗？」" },
        ],
      },
    ],
    sutang: [
      {
        title: "兔女郎试装", loc: "舞蹈房",
        text: "苏糖发消息：「来舞蹈房。只给你看新装。」",
        tags: ["社团日"],
        beats: [
          { speaker: "苏糖", text: "兔耳网袜，尾巴塞子晃：「……像不像店员？点单呀～」" },
          { speaker: "苏糖", text: "她跪递菜单，上面只写三项：亲、摸、做。「……VIP专享～」" },
        ],
      },
      {
        title: "主播线下答谢", loc: "宿舍区",
        text: "她关播后语音：「榜一……敢来线下吗？」",
        tags: ["深夜"],
        beats: [
          { speaker: "苏糖", text: "门开只围浴巾：「……感谢打赏～」手机还亮着直播界面，她关屏：「……现在只给你看。」" },
          { speaker: "苏糖", text: "「要喊姐姐……还是主人？」她把你推床，角色扮演才刚开始。" },
        ],
      },
      {
        title: "健身教练", loc: "体育馆",
        text: "她换上教练服，哨子咬唇间。",
        tags: [],
        beats: [
          { speaker: "苏糖", text: "「……深蹲。我帮你保。」手扶腰越来越低，「……姿势不对……要罚。」" },
          { speaker: "苏糖", text: "垫子上她骑坐：「……私人课……只教怎么动腰～」" },
        ],
      },
    ],
    shenman: [
      {
        title: "女总裁面试", loc: "教研室",
        text: "沈曼西装高跟，简历推你胸口。",
        tags: ["黄昏"],
        beats: [
          { speaker: "沈曼", text: "「……最后一项考核。」她踩桌沿，「说服我录用你。用嘴。」" },
          { speaker: "沈曼", text: "丝袜勾颈：「……录用。加班……现在开始。」" },
        ],
      },
      {
        title: "酒吧女王", loc: "酒吧",
        text: "舞台灯灭，她拉你后台帘。",
        tags: ["深夜"],
        beats: [
          { speaker: "沈曼", text: "「……粉丝？不像。」她坐化妆台，「跪。叫女王。」" },
          { speaker: "沈曼", text: "镜前她看自己被后入，命令大声：「……赏你……射里面。」" },
        ],
      },
      {
        title: "特工审讯", loc: "停车场",
        text: "车灯灭，她推你进后座。",
        tags: ["深夜"],
        beats: [
          { speaker: "沈曼", text: "「……间谍？招供。」手探裤裆，「……这里……硬了就是认罪。」" },
          { speaker: "沈曼", text: "跨坐磨：「……刑讯升级。敢哼大声。」" },
        ],
      },
    ],
    guye: [
      {
        title: "私教赌约", loc: "训练馆",
        text: "顾野拉你进私教室，门锁咔哒。",
        tags: [],
        beats: [
          { speaker: "顾野", text: "「……赌体能。输的脱。再输……随便你摆。」" },
          { speaker: "顾野", text: "她输光却笑，趴软垫翘臀：「……教练……轻点……骗你的。」" },
        ],
      },
      {
        title: "救援队扮演", loc: "田径跑道",
        text: "夜跑她假装扭伤，拽你进内圈。",
        tags: ["深夜"],
        beats: [
          { speaker: "顾野", text: "「……疼……背我。」到暗处她腿环腰：「……救援费……肉偿。」" },
        ],
      },
      {
        title: "对手更衣室", loc: "体育馆",
        text: "比赛输了她拽你更衣室，帘子拉上。",
        tags: ["社团日"],
        beats: [
          { speaker: "顾野", text: "「……输不起？那赌复仇。」她解肩带，「……赢了就操回来。」" },
          { speaker: "顾野", text: "站立顶进她咬肩：「……比分……平了……」" },
        ],
      },
    ],
    baiyue: [
      {
        title: "人体模特", loc: "画室",
        text: "白玥递围裙：「……今晚只画你。脱。」",
        tags: ["黄昏"],
        beats: [
          { speaker: "白玥", text: "画笔滑过柱身她舔笔尖：「……线条……硬了。换我当模特。」" },
          { speaker: "白玥", text: "丝带缚腕摆姿：「……画到……湿……为止。」" },
        ],
      },
      {
        title: "吸血鬼之夜", loc: "暗房",
        text: "暗房红灯，她咬颈轻笑。",
        tags: ["深夜"],
        beats: [
          { speaker: "白玥", text: "「……猎物。」齿印烙锁骨的，「……怕吗？怕就别硬。」" },
          { speaker: "白玥", text: "她骑坐吸吻到青紫：「……喂饱我……用精液。」" },
        ],
      },
      {
        title: "新娘练习", loc: "她公寓",
        text: "头纱歪着，她递戒指盒。",
        tags: ["深夜"],
        beats: [
          { speaker: "白玥", text: "「……婚礼彩排。新郎……练习入洞房。」婚纱下真空，「……只准看我。」" },
          { speaker: "白玥", text: "抱姿进入她哭笑：「……誓词……换一句……永远占有你。」" },
        ],
      },
    ],
  };

  const locFallback = {
    lintang: ["空教室", "图书馆", "她公寓", "樱花道", "实验楼"],
    sutang: ["舞蹈房", "宿舍区", "体育馆", "KTV包厢", "奶茶店"],
    shenman: ["教研室", "酒吧", "停车场", "钟点房", "KTV包厢"],
    guye: ["训练馆", "田径跑道", "体育馆", "游泳馆", "她公寓"],
    baiyue: ["画室", "暗房", "她公寓", "樱花道", "天台"],
  };

  for (const [pid, templates] of Object.entries(roleplayEvents)) {
    templates.forEach((t, i) => {
      orionEvents.push(orionPersonEvent(
        pid,
        t.loc || locFallback[pid][i % locFallback[pid].length],
        t.title,
        t.text,
        [...(t.tags || []), "角色扮演"],
        t.beats || null
      ));
    });
  }

  orionCampusEvents.push(
    orionCampusEvent("空教室", "粉笔角色扮演", "路过教室，听见压低嗓音：「……叫老师……」", ["深夜", "角色扮演"]),
    orionCampusEvent("舞蹈房", "私教彩排", "镜墙后影子叠在一起，像排练又像做爱。", ["社团日"]),
    orionCampusEvent("画室", "人体素描夜", "模特轮廓在灯下起伏，画笔声停了，喘息声没停。", ["深夜"]),
    orionCampusEvent("酒吧", "陌生人游戏", "吧台两人对视像初见，眼神却脏得不像陌生人。", ["深夜"])
  );

  const rpAdult = {
    lintang: [
      ["法官席下", "法袍掀腰，林晚棠扶槌后入：「……宣判……立即执行……」", "空教室", "法庭扮演、制服", "内射后她穿法袍：「……刑期……每晚。」"],
      ["家教惩罚", "衬衫下真空，她坐你腿间：「……题不会？用身体记。」", "她公寓", "师生扮演", "骑乘套到射里面，笔记上全是水痕。"],
    ],
    sutang: [
      ["兔女郎点单", "围裙系带一拉，苏糖跪含：「……主人……第三道菜……」", "舞蹈房", "女仆扮演", "口爆后骑乘，尾巴塞子晃到高潮。"],
      ["直播线下", "关播她变脸骑你：「……榜一……线下福利……」", "宿舍区", "偶像扮演", "对镜做，精液溅手机屏。"],
    ],
    shenman: [
      ["女王加冕", "高跟踩胸，沈曼命令跪舔：「……贡品……合格。」", "酒吧", "女王扮演、支配", "骑乘榨到求饶，内射算「封爵」。"],
      ["特工车震", "后座跨坐，她捂你嘴：「……任务中……不许叫……」", "停车场", "审讯扮演", "车震高潮，车窗全雾。"],
    ],
    guye: [
      ["私教罚站", "贴墙罚站变后入，顾野喘：「……姿态……不合格……重练……」", "训练馆", "教练扮演", "射里面她踹：「……明天……加组。」"],
      ["救援肉偿", "夜跑树后她腿环腰：「……救援队……收费……」", "田径跑道", "扮演、户外", "站立顶到腿软，汗混精液淌。"],
    ],
    baiyue: [
      ["新娘初夜", "头纱下缚腕，白玥抱姿：「……新郎……弄哭我……」", "她公寓", "婚礼扮演", "内射后她说：「……礼成……你是我的。」"],
      ["吸血鬼馈", "咬颈后骑坐吸吻，她命令射喉：「……喂饱……猎物……」", "暗房", "吸血鬼扮演", "咽下去她舔唇：「……还要……」"],
    ],
  };

  for (const [pid, tuples] of Object.entries(rpAdult)) {
    const person = orionGetPeople().find((p) => p.id === pid);
    const base = orionAdultScenes[pid].length;
    tuples.forEach((s, i) => {
      orionAdultScenes[pid].push(
        orionAdultSceneMeta(`${pid.toUpperCase()}_RP${i + 1}`, s[0], s[1], s[2], s[3], s[4], person.name)
      );
    });
  }

  if (typeof ORION_GUIDE_SECTIONS !== "undefined") {
    ORION_GUIDE_SECTIONS.push({
      title: "角色扮演玩法",
      lines: [
        "遇人 → 特殊玩法：师生、法庭、女仆、女王、私教、摄影、囚禁、酒吧搭讪等 12 种。",
        "随机事件带「角色扮演」标签，多段对话后可开 H 或转入玩法。",
        "部分扮演需道具：按摩油、丝带/项圈/手铐、猫耳等。",
        "经典模式（自由/场景）情境牌也新增了酒吧、网约、主仆等扮演脚本。",
      ],
    });
  }
})();