/* 蜜语 · 场景故事库（可选场景 · 循序渐进） */

const SCENE_CATEGORY_LABELS = {
  public: "🏢 公共场所",
  vehicle: "🚗 交通工具",
  indoor: "🏠 室内私密",
  outdoor: "🌿 户外自然",
};

const SCENE_CATALOG = {
  rain_reunion: {
    id: "rain_reunion",
    name: "雨夜重逢",
    icon: "🌧",
    tagline: "门外雨声，门内体温",
    category: "indoor",
    desc: "一方刚回家，衣裳微湿。从门廊拥抱到浴室共浴，最后在床上把思念做成肉体。",
    color: "#6a9ec7",
    stages: [
      {
        name: "门廊",
        intensity: "warm",
        intro: "钥匙刚插进锁孔，门就开了。{other}站在玄关，发梢还滴着水。",
        rounds: [
          { kind: "roleplay", text: "【门廊】{self}把{other}抵在门上，什么也不说，先吻住。雨声盖过喘息，外套湿贴着皮肤，也要摸清楚对方是不是真实回来了。" },
          { kind: "whisper", text: "贴着{other}耳朵：「想了我多久？」等{other}用身体回答——手探进你衣摆。" },
          { kind: "dare", text: "三十秒内解开{other}湿透的上衣，每解开一颗扣子在露出的皮肤上亲一下，不许隔衣敷衍。" },
          { kind: "confess", text: "告诉{other}：出差这几天，你最想念的是{other}身上哪一处触感。" },
        ],
      },
      {
        name: "浴室",
        intensity: "warm",
        intro: "浴室雾气升起。谁先进去的并不重要，重要的是谁帮谁洗。",
        rounds: [
          { kind: "roleplay", text: "【浴室】帮{other}冲掉雨水，手掌从肩滑到腰。热水冲过指尖时故意在{other}胸前多停几秒，看{other}仰头闭眼。" },
          { kind: "dare", text: "用沐浴露在{other}小腹画圈，圈越来越小，最后停在腿根。问{other}：「还要再洗干净一点吗？」" },
          { kind: "whisper", text: "在蒸汽里低声描述：等下出了浴室，你第一件事想对{other}做什么。" },
          { kind: "roleplay", text: "【共浴】面对面坐着，腿交缠，只用手探索对方——不许进入，先把{other}弄软/弄硬。" },
          { kind: "confess", text: "承认一个你在浴室里对{other}动过心的瞬间（具体部位+动作）。" },
        ],
      },
      {
        name: "卧室",
        intensity: "hot",
        intro: "浴巾落地。床单还是凉的，但两个人贴上去就烫了。",
        rounds: [
          { kind: "roleplay", text: "【卧室】把{other}推倒在床，从脚踝吻到大腿内侧，越吻越慢。在{other}最湿/硬的地方隔着空气呵气，看{other}弓腰。" },
          { kind: "dare", text: "口舌侍奉{other}两分钟，节奏由{other}按你的头控制。时间到抬头对视，不许擦嘴。" },
          { kind: "whisper", text: "边舔边告诉{other}：{other}的味道让你多想要，细节说到{other}脸红。" },
          { kind: "dare", text: "让{other}趴着，你从后颈一路吻到尾椎，手指只在腿间外面打圈，直到{other}求你进去或换你躺好。" },
        ],
      },
      {
        name: "缠绵",
        intensity: "deep",
        intro: "雨还在下。屋里只剩两种声音。",
        rounds: [
          { kind: "roleplay", text: "【缠绵】缓慢进入{other}，进去后停五秒，额头贴着额头说：「终于到家了。」再动。" },
          { kind: "whisper", text: "顶到最深时，只说三个字，要露骨也要真——{other}重复一遍才准换节奏。" },
          { kind: "dare", text: "换三个体位，每个至少一分钟。第三个必须让两人同时抖。" },
          { kind: "confess", text: "高潮后相拥，各说一句：下次分开前，你想怎么「预支」今晚。" },
        ],
      },
    ],
  },

  hotel_night: {
    id: "hotel_night",
    name: "酒店一夜",
    icon: "🏨",
    tagline: "陌生城市，熟悉身体",
    category: "indoor",
    desc: "旅行中的高级客房。落地窗、迷你吧、浴袍——从调酒到床幔，一夜不许浪费。",
    color: "#c9a86c",
    stages: [
      {
        name: "入住",
        intensity: "warm",
        intro: "房卡嘀一声。门关上，城市灯火在窗外，屋里只有你们。",
        rounds: [
          { kind: "roleplay", text: "【入住】{self}是领班，{other}是贵宾。鞠躬欢迎，然后「违规」把手放在贵宾腰上：「本店今晚只服务您。」" },
          { kind: "dare", text: "用迷你吧的酒喂{other}一口，酒渍沾唇就舔掉。再吻深一次。" },
          { kind: "whisper", text: "站在落地窗前从背后抱住{other}，描述窗外是城市，窗内你想怎么弄{other}。" },
          { kind: "confess", text: "说一个你在公共场合其实想过{other}的时刻（餐厅/电梯/展厅均可）。" },
        ],
      },
      {
        name: "浴袍",
        intensity: "hot",
        intro: "浴袍带子一拉就开。地毯软，膝盖也不疼。",
        rounds: [
          { kind: "roleplay", text: "【浴袍】{other}只穿酒店浴袍。{self}跪下来解带子，嘴唇碰一下露出的皮肤就算「查房通过」。" },
          { kind: "dare", text: "把{other}按在梳妆台镜前，从背后伸手进去摸，让{other}看镜子里自己的表情。" },
          { kind: "whisper", text: "告诉{other}：镜子里{other}什么样子最让你想欺负。" },
          { kind: "dare", text: "浴袍垫在地板上，{other}躺着，你口舌伺候到{other}抓你头发。" },
        ],
      },
      {
        name: "床幔",
        intensity: "hot",
        intro: "大灯关了。床头灯把皮肤照成蜜色。",
        rounds: [
          { kind: "roleplay", text: "【床幔】轮流给{other}戴/摘眼罩。被蒙住的人只能凭触觉猜对方在亲哪里，猜错亲一下惩罚。" },
          { kind: "dare", text: "手指进入{other}同时咬{other}耳垂，问「要更深还是更快」，照做一分钟。" },
          { kind: "whisper", text: "边动边在{other}耳边报时：「这一夜还剩很多小时，你打算怎么用完？」" },
          { kind: "roleplay", text: "【客房服务】敲三下门假装送餐，开门后直接把{other}推回床上——餐点改为你。" },
        ],
      },
      {
        name: "天亮前",
        intensity: "deep",
        intro: "窗外天色将亮未亮。这一夜要有个狠的收尾。",
        rounds: [
          { kind: "dare", text: "面对面坐在床上腿缠腰，互相进入或紧贴磨蹭，看着对方眼睛不许躲，维持到两人喘粗气。" },
          { kind: "roleplay", text: "【天亮前】后入{other}，一只手搂腰，一只手绕到前面揉最敏感处，每顶一下问一句「还要不要」。" },
          { kind: "confess", text: "说出你最想和{other}在哪家酒店再来一次，以及想怎么做。" },
          { kind: "dare", text: "做到两人一起高潮，然后不抽出/分开，相拥看窗外天光变白。" },
        ],
      },
    ],
  },

  office_late: {
    id: "office_late",
    name: "办公室加班",
    icon: "💼",
    tagline: "加班是借口，欲望是真相",
    category: "indoor",
    desc: "深夜空荡的办公区。百叶窗、会议桌、老板椅——权力与制服的游戏。",
    color: "#4a5568",
    stages: [
      {
        name: "加班",
        intensity: "warm",
        intro: "整层楼只剩你们。显示器蓝光映着脸。",
        rounds: [
          { kind: "roleplay", text: "【加班】{self}是上司，{other}是下属。文件放一边：「今晚考核只有一项——让我满意。」先吻在办公桌角。" },
          { kind: "dare", text: "让{other}坐老板椅，你跪在两腿间隔裤亲吻腿根，抬头看{other}装镇定的脸。" },
          { kind: "whisper", text: "在{other}耳边说：明天开会时，你会想起现在{other}是什么表情。" },
          { kind: "confess", text: "坦白你有没有幻想过在办公室和{other}来一发——细节一句即可。" },
        ],
      },
      {
        name: "会议室",
        intensity: "hot",
        intro: "玻璃墙外是夜景。里面长桌够宽。",
        rounds: [
          { kind: "roleplay", text: "【会议室】把{other}按在长桌上，从领口吻到腰带。皮带扣咔哒一声，像宣布散会。" },
          { kind: "dare", text: "桌下口交或桌下手指伺候{other}，若有人「假装」路过，不许停。" },
          { kind: "whisper", text: "描述{other}压在会议桌上时，裙子/裤子凌乱的样子让你多硬/多湿。" },
          { kind: "dare", text: "互换角色：{other}命令你脱一件，你执行，然后反攻把{other}也脱到同等程度。" },
        ],
      },
      {
        name: "百叶窗",
        intensity: "hot",
        intro: "百叶窗缝隙漏进路灯。一半明一半暗。",
        rounds: [
          { kind: "roleplay", text: "【百叶窗】{other}面对窗户手撑玻璃，你从后贴上去隔衣磨蹭，嘴唇贴{other}后颈。" },
          { kind: "dare", text: "手指从后探入{other}裤腰，在里面弄湿/弄硬，不许进入，弄三分钟。" },
          { kind: "whisper", text: "告诉{other}：若现在楼下有人抬头，看见影子在动，你会更兴奋还是更收敛？" },
          { kind: "roleplay", text: "【加班奖励】表现好—— orally 奖励{other}；表现更好——允许{other}把你按在桌上。" },
        ],
      },
      {
        name: "打卡下班",
        intensity: "deep",
        intro: "真正的下班铃是你们自己的喘息。",
        rounds: [
          { kind: "dare", text: "在办公椅上骑乘{other}或让{other}骑你，椅子吱呀响也没关系，控制节奏两分钟。" },
          { kind: "roleplay", text: "【打卡】进入{other}时说一句「下班」；每顶一下说一个今天感谢{other}的理由。" },
          { kind: "confess", text: "说出你想在工作日午休时和{other}偷偷做的一件小事。" },
          { kind: "dare", text: "深顶到两人边缘，停下，十指相扣倒数三二一同时放。" },
        ],
      },
    ],
  },

  beach_trip: {
    id: "beach_trip",
    name: "海边假期",
    icon: "🏖",
    tagline: "防晒油、比基尼、晚潮",
    category: "outdoor",
    desc: "私人沙滩与民宿露台。阳光把皮肤晒热，夜里海风把欲望吹旺。",
    color: "#e8b86d",
    stages: [
      {
        name: "涂防晒",
        intensity: "warm",
        intro: "防晒油在掌心搓热。背部是第一块画布。",
        rounds: [
          { kind: "roleplay", text: "【涂防晒】{other}趴着，你从肩涂到腰，拇指故意在腰窝多按几下。问「里面也要涂吗」。" },
          { kind: "dare", text: "换{other}帮你涂，涂到腿根时腿张开一点，不许害羞。" },
          { kind: "whisper", text: "说{other}穿泳装/短裤时，你第一眼落在哪、第二眼落在哪。" },
          { kind: "confess", text: "承认你在海边看过{other}的身体，当时脑子里在想什么。" },
        ],
      },
      {
        name: "浪花",
        intensity: "warm",
        intro: "傍晚海水还暖。没人处牵着手往深处走。",
        rounds: [
          { kind: "roleplay", text: "【浪花】在水里拥抱，浪一打就贴更紧。手伸进泳裤/比基尼边缘，只摸不深入。" },
          { kind: "dare", text: "回民宿淋浴前，在室外冲掉沙子，当着{other}脱泳装，互相看一眼再进浴室。" },
          { kind: "whisper", text: "淋浴水声中告诉{other}：等下床上你要先亲哪里。" },
          { kind: "roleplay", text: "【民宿】浴巾只围腰，从冰箱拿出冰饮贴{other}胸口，低头舔水珠。" },
        ],
      },
      {
        name: "露台",
        intensity: "hot",
        intro: "露台藤椅。远处海漆黑，头顶星星很亮。",
        rounds: [
          { kind: "roleplay", text: "【露台】{other}坐藤椅，你跪在两腿间口交或手指伺候，海风吹乱头发。" },
          { kind: "dare", text: "让{other}扶栏杆翘臀，你从后舔或摸，不许进屋，坚持两分钟。" },
          { kind: "whisper", text: "描述海风、盐味和{other}体味的混合让你多上头。" },
          { kind: "dare", text: "互相弄到快高潮，回屋才准继续——进屋前的十步不许停手。" },
        ],
      },
      {
        name: "潮夜",
        intensity: "deep",
        intro: "潮汐声透过窗。这一夜要做得比浪更凶。",
        rounds: [
          { kind: "roleplay", text: "【潮夜】侧躺面朝大海方向，从后进入{other}，每顶一下跟着浪的节奏。" },
          { kind: "dare", text: "骑乘{other}到腿软，换{other}骑你到喘，再换回你控制直到一起高潮。" },
          { kind: "confess", text: "说出你想和{other}在哪个海边城市再来一次假期，以及想怎么「野」。" },
          { kind: "whisper", text: "高潮后贴着{other}说：回去以后，怎么把假期延续到工作日。" },
        ],
      },
    ],
  },

  gym_private: {
    id: "gym_private",
    name: "私教课时",
    icon: "🏋",
    tagline: "拉伸、汗水、更衣室",
    category: "indoor",
    desc: "闭馆后的健身房只剩你们。器械、瑜伽垫、淋浴间——用身体完成最后一组。",
    color: "#7dffb2",
    stages: [
      {
        name: "热身",
        intensity: "warm",
        intro: "场馆灯灭了一半。瑜伽垫铺开。",
        rounds: [
          { kind: "roleplay", text: "【私教】{self}是教练，{other}是学员。帮{other}拉伸腿，手压膝盖时身体贴上去：「呼吸——别停。」" },
          { kind: "dare", text: "平板支撑姿势，你从下方舔或吻{other}露出的皮肤，看{other}能坚持几秒。" },
          { kind: "whisper", text: "说{other}运动时哪块肌肉线条最让你想咬一口。" },
          { kind: "confess", text: "坦白你有没有在{other}健身时偷看、偷想。" },
        ],
      },
      {
        name: "力量",
        intensity: "hot",
        intro: "器械区金属冰凉，皮肤却是烫的。",
        rounds: [
          { kind: "roleplay", text: "【辅助】{other}卧推，你站在头侧——每次推起就俯身亲一下。重量不重要，眼神重要。" },
          { kind: "dare", text: "让{other}坐腿举器械，你跪在中间口舌服务，汗水滴在你背上也要继续。" },
          { kind: "whisper", text: "边摸边描述{other}肌肉绷紧时，你想怎么弄软{other}。" },
          { kind: "dare", text: "瑜伽垫上人形一字，{other}趴着，你从后亲吻臀缝上方到腰窝。" },
        ],
      },
      {
        name: "淋浴",
        intensity: "hot",
        intro: "淋浴间水声很大。镜子全是雾。",
        rounds: [
          { kind: "roleplay", text: "【淋浴】互相打皂，手掌滑过臀、腿根。转身时把{other}按在瓷砖上吻，热水冲着后背。" },
          { kind: "dare", text: "跪地口交，水打在你头顶，{other}扶墙，不许关水。" },
          { kind: "whisper", text: "在哗哗水声里喊一句最骚的——{other}必须复述才准碰你。" },
          { kind: "roleplay", text: "【更衣室】只围一条毛巾出来，在长凳上让{other}坐你腿间磨蹭到毛巾湿透。" },
        ],
      },
      {
        name: "收操",
        intensity: "deep",
        intro: "最后一组：心肺与欲望一起拉满。",
        rounds: [
          { kind: "dare", text: "瑜伽垫上后入{other}，每顶一下报一个数字，数到二十不许停。" },
          { kind: "roleplay", text: "【收操】面对面抱姿进入，像做完最后一组深蹲后没力气了——靠在一起仍要动腰。" },
          { kind: "confess", text: "说出你想和{other}在哪项「运动」上比拼耐力（正经或不正经均可）。" },
          { kind: "dare", text: "抱到淋浴间门口或垫子上做到高潮，然后真的冲凉收工。" },
        ],
      },
    ],
  },

  photo_studio: {
    id: "photo_studio",
    name: "摄影棚",
    icon: "📷",
    tagline: "镜头之内，欲望之外",
    category: "indoor",
    desc: "私房拍摄。灯架、背景布、单反——快门每响一次，衣服就少一件。",
    color: "#b8a0e8",
    stages: [
      {
        name: "试镜",
        intensity: "warm",
        intro: "灯打在脸上。镜头比人更诚实。",
        rounds: [
          { kind: "roleplay", text: "【试镜】{self}是摄影师，{other}是模特。指挥：「头偏一点——唇张开——对，就这样。」拍完一张就亲一下当稿费。" },
          { kind: "dare", text: "摆三个性感姿势，每个姿势保持十秒，{self}从任意角度亲一处。" },
          { kind: "whisper", text: "告诉{other}：镜头里{other}哪个角度最让你想立刻停拍上床。" },
          { kind: "confess", text: "承认你有没有偷偷存过{other}好看的照片，用来想过。" },
        ],
      },
      {
        name: "私房",
        intensity: "hot",
        intro: "背景布换成床。灯光调暗。",
        rounds: [
          { kind: "roleplay", text: "【私房】只拍锁骨到小腹。手入镜帮{other}脱衣，快门声掩盖喘息。" },
          { kind: "dare", text: "让{other}戴你的眼镜/项链拍一张，拍完你戴着它伺候{other}。" },
          { kind: "whisper", text: "描述若这些照片只有你能看，你最想拍{other}哪一个瞬间。" },
          { kind: "dare", text: "用镜头（或手机）对着{other}腿间拍一张不存盘——拍完立刻用嘴确认刚才画面。" },
        ],
      },
      {
        name: "导演",
        intensity: "hot",
        intro: "相机放下。导演上场。",
        rounds: [
          { kind: "roleplay", text: "【导演】命令{other}：「演一个想要但忍着的人。」你负责打破戏。" },
          { kind: "dare", text: "口述分镜：第一镜亲，第二镜摸，第三镜口——照你的剧本执行三分钟。" },
          { kind: "whisper", text: "边弄边说：「Cut——不行，这条要重拍，直到{other}真出声。」" },
          { kind: "roleplay", text: "【花絮】假装花絮镜头，两人全裸相拥聊天，聊着聊着必须亲下去。" },
        ],
      },
      {
        name: "封底",
        intensity: "deep",
        intro: "最后一页留给最狠的。",
        rounds: [
          { kind: "dare", text: "镜前做：{other}扶着镜子看自己被进入/被伺候的表情，不许闭眼。" },
          { kind: "roleplay", text: "【封底】缓慢进入，像慢门摄影——一动一停，停时吻{other}。" },
          { kind: "confess", text: "说出你想和{other}拍的最私密一张「只存在于记忆里」的画面。" },
          { kind: "dare", text: "高潮后拍一张两人交缠的剪影（可不存），然后继续第二轮。" },
        ],
      },
    ],
  },

  bar_encounter: {
    id: "bar_encounter",
    name: "酒吧邂逅",
    icon: "🍸",
    tagline: "假装初见，其实渴望已久",
    category: "public",
    desc: "吧台、舞池、出租车后座——像第一次那样调情，像第一百次那样熟练。",
    color: "#d4567a",
    stages: [
      {
        name: "吧台",
        intensity: "warm",
        intro: "你们分坐吧台两端。游戏规则：假装不认识。",
        rounds: [
          { kind: "roleplay", text: "【吧台】{self}走过去搭讪：「一个人？」十句以内要把{other}说笑或说红脸，否则罚酒一口再亲。" },
          { kind: "dare", text: "交杯酒后交换一个秘密——秘密越色，下一句台词越大胆。" },
          { kind: "whisper", text: "在嘈杂里贴耳说：若现在是真酒吧，你会带{other}去哪家酒店。" },
          { kind: "confess", text: "说出你第一次想「带{other}回家」是在什么场合。" },
        ],
      },
      {
        name: "舞池",
        intensity: "warm",
        intro: "音乐很重。说话靠身体。",
        rounds: [
          { kind: "roleplay", text: "【舞池】贴身慢摇，手在{other}后腰或臀上，每首歌换一只手的「权限」。" },
          { kind: "dare", text: "在「舞池」（客厅即可）磨蹭到{other}明显硬/湿，不许脱衣，只许隔衣。" },
          { kind: "whisper", text: "边蹭边说：回家路上你打算对{other}做什么，列三步。" },
          { kind: "roleplay", text: "【离场】牵手出门，楼道里就忍不住把{other}按在墙上吻，像等不及出租车。" },
        ],
      },
      {
        name: "回家路",
        intensity: "hot",
        intro: "电梯数字跳动。镜子里的你们很不老实。",
        rounds: [
          { kind: "roleplay", text: "【电梯】模拟电梯监控，动作不许太大但手可以伸进{other}衣服里。" },
          { kind: "dare", text: "进门后七步之内必须有人被抵在门上脱一件，谁慢谁脱。" },
          { kind: "whisper", text: "描述{other}刚才在电梯里憋着的表情，让你多想欺负。" },
          { kind: "dare", text: "沙发上当「出租车后座」，{other}跨坐你腿上磨蹭到忍不住。" },
        ],
      },
      {
        name: "通宵",
        intensity: "deep",
        intro: "酒醒了一半，欲望全醒。",
        rounds: [
          { kind: "roleplay", text: "【通宵】像刚认识一样问「你叫什么名字」——每顶一下回答一个字母，拼完再加速。" },
          { kind: "dare", text: "轮流主动三分钟：第一轮口，第二轮手指，第三轮进入——不许混。" },
          { kind: "confess", text: "说出你还想和{other}在哪类场所「假装陌生人」再来一次。" },
          { kind: "dare", text: "做到两人筋疲力尽，像宿醉一样抱在一起睡或继续——你选。" },
        ],
      },
    ],
  },

  fireplace_winter: {
    id: "fireplace_winter",
    name: "冬夜壁炉",
    icon: "🔥",
    tagline: "外面下雪，里面出汗",
    category: "indoor",
    desc: "毯子、火光、热可可——从指尖回暖到全身燃烧。",
    color: "#e87d4a",
    stages: [
      {
        name: "取暖",
        intensity: "warm",
        intro: "窗外雪。毯子下两双脚缠在一起。",
        rounds: [
          { kind: "roleplay", text: "【取暖】把手伸进{other}毛衣下摆暖手，暖着暖着就不出来了。嘴唇碰{other}冰凉的鼻尖。" },
          { kind: "dare", text: "喂{other}热可可/热水，若洒了在洒处舔掉，再深吻。" },
          { kind: "whisper", text: "说冬天{other}身体哪一处最暖、你最想捂热。" },
          { kind: "confess", text: "承认一个你想和{other}窝在毯子里一整天的色色念头。" },
        ],
      },
      {
        name: "火光",
        intensity: "warm",
        intro: "火光跳在皮肤上。毛衣脱了，还嫌多。",
        rounds: [
          { kind: "roleplay", text: "【火光】只穿内衣/内裤面对壁炉，轮流被看——被看的人转圈，看的人说一句最想摸哪里。" },
          { kind: "dare", text: "毯子下互相隔衣抚摸五分钟，不许进入，只许弄湿/弄硬。" },
          { kind: "whisper", text: "火光里描述{other}皮肤的颜色变化，从脸到腿根。" },
          { kind: "roleplay", text: "【壁炉前】{other}躺毯子，你枕在{other}腿间，仰头看{other}被火照亮的脸。" },
        ],
      },
      {
        name: "融化",
        intensity: "hot",
        intro: "外面越冷，里面越要烫。",
        rounds: [
          { kind: "dare", text: "口舌伺候{other}，壁炉噼啪声当节拍，快时舔快，慢时只呵气。" },
          { kind: "roleplay", text: "【融化】手指进入{other}，每抽送一次往壁炉添一根柴（或假装添）——添满五根换节奏。" },
          { kind: "whisper", text: "告诉{other}：{other}湿/硬的时候，你多想立刻弄进去。" },
          { kind: "dare", text: "抱到地毯上，后入或侧入，毯子裹一半，皮肤露一半。" },
        ],
      },
      {
        name: "春宵",
        intensity: "deep",
        intro: "雪还在下。屋里已经像夏天。",
        rounds: [
          { kind: "roleplay", text: "【春宵】面对面坐在毯子上进入，裹着毯子像帐篷，里面只有喘息。" },
          { kind: "dare", text: "做到高潮时故意出声大一点，然后笑着说：反正外面听不见。" },
          { kind: "confess", text: "说出下一个想和{other}一起窝着的「冬日仪式」。" },
          { kind: "whisper", text: "余韵里规划：天亮后第一轮是咖啡还是继续弄。" },
        ],
      },
    ],
  },

  role_swap: {
    id: "role_swap",
    name: "角色互换夜",
    icon: "🔄",
    tagline: "今晚主动权换边",
    category: "indoor",
    desc: "平时谁主导，今晚就换谁来命令。四幕剧：试探、接管、臣服、双赢。",
    color: "#9e3058",
    stages: [
      {
        name: "试探",
        intensity: "warm",
        intro: "硬币掷出正面——今晚规则改了。",
        rounds: [
          { kind: "roleplay", text: "【试探】平时较被动的那位今晚先开口：「脱。」只一个字，看对方愣几秒。" },
          { kind: "dare", text: "被动方今晚不许动，主动方可以用嘴探索全身，限时三分钟。" },
          { kind: "whisper", text: "被命令的一方耳语：你其实一直想被{other}这样对待。" },
          { kind: "confess", text: "各说一句：平时你最想抢主动权却没开口的瞬间。" },
        ],
      },
      {
        name: "接管",
        intensity: "hot",
        intro: "命令链建立。迟延要罚。",
        rounds: [
          { kind: "roleplay", text: "【接管】新主导者坐「王座」（椅子/床头），{other}跪候。下三道命令，一道比一道露骨。" },
          { kind: "dare", text: "被罚方：口述三个服从动作并执行，主导者点头才准停。" },
          { kind: "whisper", text: "主导者贴耳：做错就重来，做对就奖励——奖励内容现在说。" },
          { kind: "dare", text: "交换口令：一方说「请」，另一方才准碰。" },
        ],
      },
      {
        name: "臣服",
        intensity: "hot",
        intro: "权力游戏玩到深处，会换来更诚实的身体。",
        rounds: [
          { kind: "roleplay", text: "【臣服】原主导者今晚被绑手（领带/袜）——{other}伺候到求饶。" },
          { kind: "dare", text: "被绑者只能动腰，主动者骑乘控制，维持两分钟。" },
          { kind: "whisper", text: "被绑者说出一个安全词以外的「求饶词」，听到才准放缓。" },
          { kind: "confess", text: "说出你臣服时最爽的一点：被命令、被看着、还是被弄哭。" },
        ],
      },
      {
        name: "双赢",
        intensity: "deep",
        intro: "换边结束。两人都是赢家。",
        rounds: [
          { kind: "roleplay", text: "【双赢】同时解开束缚，拥抱：「今晚平手。」然后用最默契的体位做到一起高潮。" },
          { kind: "dare", text: "轮流各主动一分钟，第四分钟起不许停，直到两人都满意。" },
          { kind: "confess", text: "约定下次多久再换边一次，以及想试的新规则。" },
          { kind: "whisper", text: "高潮后说：换边玩让你更爱{other}哪一面。" },
        ],
      },
    ],
  },

  anniversary_replay: {
    id: "anniversary_replay",
    name: "纪念日重演",
    icon: "💍",
    tagline: "旧日重温，今夜加码",
    category: "indoor",
    desc: "从第一次约会到第一次亲热，一幕幕重演——每一幕都比当年更色。",
    color: "#ffd700",
    stages: [
      {
        name: "初见",
        intensity: "warm",
        intro: "假装第一次约会。地点你们定。",
        rounds: [
          { kind: "roleplay", text: "【初见】重演第一次见面的开场白，说完必须亲一下——像当年不敢，今天敢。" },
          { kind: "confess", text: "说出当年第一次见面，你其实最先注意到{other}哪一点。" },
          { kind: "dare", text: "重演第一次牵手：十指相扣，然后手探进外套里。" },
          { kind: "whisper", text: "耳语：若当年你就这么大胆，那晚可能会发生什么。" },
        ],
      },
      {
        name: "初吻",
        intensity: "warm",
        intro: "那一吻若重来，要更深。",
        rounds: [
          { kind: "roleplay", text: "【初吻】重演初吻地点与姿势，但吻法用现在的技术——慢、深、手不老实。" },
          { kind: "dare", text: "吻到{other}腿软，像当年你其实想但没敢。" },
          { kind: "confess", text: "坦白初吻后那晚，你有没有一个人想过{other}。" },
          { kind: "whisper", text: "描述你现在吻{other}和当年吻{other}，技术差在哪、欲望差在哪。" },
        ],
      },
      {
        name: "第一次",
        intensity: "hot",
        intro: "第一次亲热若重来——你会更温柔还是更狠？",
        rounds: [
          { kind: "roleplay", text: "【第一次】重演第一次脱{other}衣服的场景，每一步都比当年慢、比当年色。" },
          { kind: "dare", text: "做一件当年想做却害羞没做的事，向{other}请示后执行。" },
          { kind: "confess", text: "说出第一次亲热时，你最紧张又最兴奋的一刻。" },
          { kind: "whisper", text: "告诉{other}：若现在才是「第一次」，你会怎么开始。" },
        ],
      },
      {
        name: "如今",
        intensity: "deep",
        intro: "几年后的你们，值得一个更狠的收尾。",
        rounds: [
          { kind: "roleplay", text: "【如今】用今天最熟练的方式进入{other}，低声说：「若为纪念日，这算第几年版本？」" },
          { kind: "dare", text: "三个体位各两分钟——代表过去、现在、你想要的未来。" },
          { kind: "confess", text: "说出下一个纪念日，你想带{other}去哪、怎么庆祝（必须色一点）。" },
          { kind: "dare", text: "做到两人一起高潮，然后像第一次那样相拥——但不说话，只呼吸。" },
        ],
      },
    ],
  },
};

function getSceneList() {
  return Object.values(SCENE_CATALOG);
}

function getScene(id) {
  return SCENE_CATALOG[id] || null;
}

function buildStoryRounds(sceneId) {
  const scene = getScene(sceneId);
  if (!scene) return { scene: null, stages: [] };
  const stages = scene.stages.map((st, idx) => ({
    stageIndex: idx,
    stageName: st.name,
    intensity: st.intensity,
    intro: st.intro,
    rounds: st.rounds.map((r, ri) => ({
      mode: "scenario",
      tag: `${st.name} ·${ri + 1}`,
      brief: st.intro,
      scenarioKind: r.kind,
      text: r.text,
      sceneId,
      stageIndex: idx,
    })),
  }));
  return { scene, stages };
}

function getSceneStageCount(sceneId) {
  return getScene(sceneId)?.stages?.length || 0;
}

(function expandScenarioLibrary() {
  const MORE = {
    warm: {
      roleplay: [
        "【邻居借醋】敲门借东西，门一开就把{other}拉进来吻——借口晚点再想。",
        "【试衣间】帮{other}拉拉链，手故意在腰上多停几秒，镜子里对视。",
        "【雨披下】共撑一件外套，在楼下拐角停住，雨声里手伸进对方衣摆。",
        "【清晨赖床】闹钟响了三次，决定用亲吻代替起床，赖到不得不起。",
      ],
      dare: [
        "只用嘴唇让{other}扣子解开一颗，解开一颗亲一处。",
        "互相在对方后腰写一个字，舔掉再写下一个。",
        "闭眼喂{other}三颗草莓/巧克力，舔到指尖。",
      ],
      whisper: [
        "用气音念：「你闻起来像我想整晚占有的人。」",
        "说{other}今天穿的哪件衣物最让你想脱掉。",
      ],
    },
    hot: {
      roleplay: [
        "【午夜短信】{self}假装只发文字调情，手却在{other}腿间不老实。",
        "【直播假装】开着静音「直播」，其实只给{other}看，评论由{other}口述。",
        "【惩罚跪垫】做错一件小事（洒了水）——跪垫子上用嘴道歉。",
        "【浴室镜雾】用手指在雾镜上写「想要」，然后转身把{other}按在瓷砖上。",
        "【外卖员】门铃响，扮演外卖员：「您的『深夜加餐』到了。」",
      ],
      dare: [
        "边口交边抬头维持对视十秒，谁先躲眼神谁下一轮被动。",
        "让{other}手背后，你用舌头从喉结/锁骨舔到肚脐。",
        "互相摸到都湿/硬，但不许进入，维持两分钟。",
      ],
      whisper: [
        "描述你现在多想把{other}弄哭（温柔那种）。",
        "说一个你想对{other}用的小命令词，并立刻执行一次。",
      ],
    },
    deep: {
      roleplay: [
        "【午夜劫后】扮演刚逃过一场「追捕」，肾上腺素还在，用身体庆祝活着。",
        "【王座与台阶】{other}坐高处，{self}跪低处仰头伺候，再换高度差进入。",
        "【雨后天台】假装在无人的天台，风很大，从背后抱住顶风做。",
        "【最后一班地铁】车厢空无一人（客厅摆椅子），到站前必须弄完一次。",
      ],
      dare: [
        "保持一个体位两分钟，中途换位不许抽出。",
        "后入时手绕到前面同步揉，直到{other}求你再深。",
        "骑乘时自己停在最深处三秒，再动——重复五次。",
      ],
      confess: [
        "高潮后说：下次想在哪、用什么姿势再来一遍。",
        "说出{other}身体哪一处你一碰就想立刻进入。",
      ],
    },
  };
  if (typeof SCENARIO_PACKS === "undefined") return;
  for (const [intensity, kinds] of Object.entries(MORE)) {
    for (const [kind, lines] of Object.entries(kinds)) {
      if (SCENARIO_PACKS[intensity]?.[kind]) SCENARIO_PACKS[intensity][kind].push(...lines);
    }
  }
})();