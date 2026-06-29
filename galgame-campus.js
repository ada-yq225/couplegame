/* 蜜语 · 校园 Galgame 内容库 — 地点 / 姿势 / 沉浸式色情文案 */

const GAL_CONQUER_AFF = 55;

const GAL_CAMPUS_PROLOGUE = [
  {
    speaker: "旁白",
    text: "九月，{uni}。梧桐叶还没黄透，空气里全是新生荷尔蒙的味道。你拖着行李箱进校门，阳光从樱花枝缝里漏下来，落在台阶上像碎金。",
  },
  {
    speaker: "旁白",
    text: "迎新横幅在风里晃，学长学姐喊着口号，你却在人群里第一眼就看见{char}——{char}正靠在报到处遮阳棚边弄头发，校服衬衫最上一颗扣子没扣，锁骨若隐若现。",
  },
  {
    speaker: "{char}",
    text: "「你也是这届的？」{char}抬眼看你，目光在你身上停了两秒，嘴角翘了一下，「我叫{char}，以后……可能会经常见到。」",
  },
  {
    speaker: "旁白",
    text: "那一刻你就知道，这四年不会无聊。课程、社团、考试都还是那些事，但{char}的出现，把整座校园变成了可以攻略的色情地图——教室、图书馆、宿舍、天台……每一处都可能变成你们做爱的现场。",
  },
  {
    speaker: "{char}",
    text: "「别光盯着看。」{char}凑近半步，声音压低，「想追我的话，得先让我心动……心动之后，你想在哪里要我都行。」",
  },
];

const GAL_CAMPUS_CHARS = [
  { routeId: "classroom", role: "邻座学霸", spot: "classroom", tag: "补课补到腿软", icon: "📚" },
  { routeId: "library", role: "图书馆常客", spot: "library", tag: "书架后别出声", icon: "📖" },
  { routeId: "locker_room", role: "泳队搭档", spot: "gym", tag: "淋浴间水声很大", icon: "🏊" },
  { routeId: "restroom", role: "学生会主席", spot: "office", tag: "会议结束别走", icon: "🏢" },
  { routeId: "rain_reunion", role: "青梅竹马", spot: "dorm", tag: "雨夜敲窗", icon: "🌧️" },
  { routeId: "rooftop", role: "摄影社模特", spot: "rooftop", tag: "天台风很大", icon: "🌆" },
  { routeId: "cinema", role: "周末约会对象", spot: "gate", tag: "黑暗里手不老实", icon: "🎬" },
  { routeId: "hot_spring", role: "社团旅行", spot: "forest", tag: "温泉雾气遮不住", icon: "♨️" },
];

const GAL_CAMPUS_LOCATIONS = [
  { id: "gate", name: "校门樱花道", icon: "🌸", category: "campus_outdoor", needAff: 0, needConquer: false, desc: "初见与告白。人流熙攘，牵手就要脸红。" },
  { id: "classroom", name: "空教室", icon: "🏫", category: "campus_indoor", needAff: 15, needConquer: false, desc: "放学后桌椅还留着体温，黑板粉笔灰味混着汗。" },
  { id: "library", name: "图书馆三楼", icon: "📖", category: "campus_indoor", needAff: 20, needConquer: false, desc: "书架投下长影，脚步声一近就停。" },
  { id: "dorm", name: "宿舍楼下", icon: "🛏️", category: "campus_indoor", needAff: 25, needConquer: false, desc: "宿管阿姨会查寝，楼梯间灯忽明忽暗。" },
  { id: "gym", name: "体育馆更衣室", icon: "🏋️", category: "campus_indoor", needAff: 35, needConquer: false, desc: "淋浴水声、橡胶地垫味、门缝下那双鞋。" },
  { id: "rooftop", name: "教学楼天台", icon: "🌇", category: "campus_outdoor", needAff: 40, needConquer: false, desc: "风把裙子掀起来，远处是整座城。" },
  { id: "office", name: "学生会办公室", icon: "💼", category: "campus_indoor", needAff: 45, needConquer: false, desc: "会议桌还留着文件，锁门声咔哒一响。" },
  { id: "lab", name: "深夜实验室", icon: "🔬", category: "campus_indoor", needAff: 50, needConquer: true, desc: "仪器嗡鸣，实验台冰，皮肤烫。" },
  { id: "bus", name: "校车后排", icon: "🚌", category: "campus_vehicle", needAff: 0, needConquer: true, desc: "颠簸、窗帘、最后一排无人看。" },
  { id: "forest", name: "后山树林", icon: "🌲", category: "campus_outdoor", needAff: 0, needConquer: true, desc: "落叶湿软，远处操场还有欢呼。" },
];

const GAL_OFFCAMPUS_LOCATIONS = [
  { id: "hotel_night", name: "校外酒店", icon: "🏨", eroticaId: "hotel_night", needEnding: true, category: "off_campus", desc: "房门一关就是你们的世界。" },
  { id: "car_parked", name: "停车场车内", icon: "🚗", eroticaId: "car_parked", needEnding: true, category: "off_campus", desc: "车窗起雾，座椅皮烫。" },
  { id: "bar_encounter", name: "酒吧厕所", icon: "🍸", eroticaId: "bar_encounter", needEnding: true, category: "off_campus", desc: "低音炮震胸，隔间门薄。" },
  { id: "fitting_room", name: "商场试衣间", icon: "👗", eroticaId: "fitting_room", needEnding: true, category: "off_campus", desc: "镜子三面，导购在门外。" },
  { id: "elevator", name: "电梯里", icon: "🛗", eroticaId: "elevator", needEnding: true, category: "off_campus", desc: "楼层数字跳，摄像头在头顶。" },
  { id: "ktv", name: "KTV包厢", icon: "🎤", eroticaId: "ktv", needEnding: true, category: "off_campus", desc: "麦克风还开着，沙发皮黏。" },
  { id: "kitchen", name: "合租厨房", icon: "🍳", eroticaId: "kitchen", needEnding: true, category: "off_campus", desc: "灶台余温，围裙下什么都没穿。" },
  { id: "pool_night", name: "深夜泳池", icon: "🏊", eroticaId: "pool_night", needEnding: true, category: "off_campus", desc: "氯水味，水底灯绿幽幽。" },
];

const GAL_LOC_AMBIENT = {
  gate: "樱花瓣落在{char}肩头，路人擦肩而过，你们指尖相碰像偷来的电。",
  classroom: "夕阳把课桌染成橘色，窗外篮球场还在响，门却锁了。",
  library: "老旧空调嗡嗡，书架深处纸页味混着{char}身上沐浴露香。",
  dorm: "宿管在一楼看电视，楼梯转角监控闪着红点。",
  gym: "淋浴间水汽弥漫，瓷砖滑，挂钩上还有别人忘拿的泳帽。",
  rooftop: "铁丝网外是整座城，风把{char}头发吹乱，裙子贴腿。",
  office: "投影仪还亮着最后一页 PPT，百叶窗缝漏进路灯。",
  lab: "示波器绿光映在{char}脸上，实验台金属边冰凉。",
  bus: "校车碾过减速带一颠，后排窗帘拉了一半。",
  forest: "树皮粗糙，落叶里藏着虫鸣，远处操场哨声隐约。",
  hotel_night: "床品雪白，空调低鸣，门外走廊地毯吸掉脚步声。",
  car_parked: "地下停车场空荡，荧光灯嗡鸣，座椅皮革凉。",
  bar_encounter: "低音震得胸腔麻，厕所镜前口红印还没补。",
  fitting_room: "帘子只拉一半，导购高跟鞋在门外停过。",
  elevator: "数字从 12 跳到 13，轿厢晃一下又稳了。",
  ktv: "点歌屏还亮着，沙发酒渍，麦克风垂在一边。",
  kitchen: "灶台还热，围裙带子松了，冰箱压缩机刚停。",
  pool_night: "水波拍岸，夜灯把水面照成碎银，保安手电远扫。",
};

const GAL_SEX_POSITIONS = {
  missionary: {
    label: "正常位",
    icon: "🛏️",
    intro: [
      "你把{char}压倒在{locSurface}，扯开内裤，膝盖顶开腿，龟头抵在湿滑的穴口磨了两下，淫水沾满柱身，{char}仰头喘着看你。",
      "{char}躺好主动张开腿，穴口湿亮张合，你俯身亲嘴，一手扶着自己慢慢顶进去，穴肉又热又紧层层裹上来。",
    ],
    slow: [
      { narrative: "你一下一下慢慢顶，肉棒在湿穴里缓慢抽插，每进到底都停三秒，感受{char}穴肉绞着你吸吮。", char: "「嗯……太深了……别那么快……里面……好满……」{char}手指抠进你后背，淫水咕叽作响。" },
      { narrative: "你俯身亲{char}锁骨，腰维持缓慢律动，龟头顶到子宫口磨着，每一下都深。", char: "「操……你这样……我会叫出来的……」{char}咬你肩膀忍哼，腿根淌水。" },
    ],
    hard: [
      { narrative: "你掐着{char}腰猛顶，啪啪肉响混着水声，床板/桌面吱呀响，每下都顶实，臀肉跟着颤，淫水溅你腿根。", char: "「啊……轻、不……别停……操……要坏了……」{char}嗓子哑了，腿缠紧你腰，穴肉绞得你发麻。" },
      { narrative: "你加快节奏深顶，龟头顶着最里那一点猛撞，{char}脚趾蜷起来，热液喷你手上。", char: "「要坏了……{self}……再深一点……射进来……」{char}眼泪憋在眼眶，穴口溢着白沫。" },
    ],
    tease: [
      { narrative: "你只顶个头就退出来，龟头在穴口蹭来蹭去，反复吊胃口，{char}湿得一塌糊涂却吃不到深的。", char: "「你混蛋……别折磨我……进来啊……里面好空……」{char}腰往上迎，被你按住，淫水滴到{locSurface}上。" },
      { narrative: "你慢慢磨入口不肯进，拇指揉阴蒂，{char}抖着求，穴口一张一合流着水。", char: "「求你了……{self}……我什么都听你的……插进来……」" },
    ],
    climax: [
      "你最后冲刺顶到最深，{char}整个人弓起来夹紧你，穴肉一阵一阵痉挛，热液喷出来，你低吼着射在里面，精液灌满她从穴口溢出来。",
      "你咬着{char}耳垂加速，{char}指甲陷进你胳膊，高潮时闷哼进你颈窝，腿绞得你一起射，白浊混淫水滴落。",
    ],
  },
  doggy: {
    label: "后入",
    icon: "🍑",
    intro: [
      "你让{char}趴好翘臀，扯开内裤，扶着自己从后顶进去，龟头挤开湿穴一寸寸没入，一手搂腰一手绕前揉乳，{char}脸埋进枕头/臂弯。",
      "{char}手撑{locSurface}，你从后贴上去，硬邦邦沿臀缝和湿穴口磨两下，淫水淌下来，再一顶到底。",
    ],
    slow: [
      { narrative: "你托着{char}腰缓慢抽插，肉棒在紧穴里进出，每一下都顶到最深，掌心抚过脊背，淫水顺着大腿淌。", char: "「嗯……从后面……好深……穴肉……吸着我……」{char}声音闷在枕头里。" },
      { narrative: "你俯身咬{char}后颈，下身维持慢节奏，龟头顶着深处磨，磨得{char}腰一抽一抽。", char: "「别咬……我受不了……再快点……要去了……」" },
    ],
    hard: [
      { narrative: "你拽着{char}腰狠顶，啪啪肉响混着咕叽水声，每下臀肉都颤，淫水甩到你小腹。", char: "「操……{self}……要顶穿了……射进来……」{char}抓床单指节发白。" },
      { narrative: "你一手拽头发控角度，一手拍臀留下红印，龟头顶到子宫口猛撞不停。", char: "「啊……混蛋……再……再用力……坏了也没关系……」{char}嗓子都哑了。" },
    ],
    tease: [
      { narrative: "你只在外面蹭，龟头在穴口磨来磨去，偶尔顶一下又抽走，{char}臀往后追。", char: "「别……别停在外面……进来……里面好痒……」{char}回头瞪你，眼眶红了，淫水滴落。" },
      { narrative: "你手指插着湿穴抠弄，后面却空着吊着，{char}塌腰求，穴肉绞着你的手。", char: "「{self}我求你了……后面也要……用你的……插进来……」" },
    ],
    climax: [
      "你从后加速冲刺，{char}趴不住塌下去，高潮时穴肉痉挛喷出热液，夹得你指节发麻，你低吼着顶到最深射在里面，精液灌满她从穴口溢出来。",
      "你掐腰猛顶十几下，{char}整个人抖着高潮，哼声碎成一片，你跟着射满她，白浊混淫水滴到{locSurface}上。",
    ],
  },
  cowgirl: {
    label: "骑乘",
    icon: "💃",
    intro: [
      "你仰躺，{char}跨上来扯开内裤，扶着你对准湿穴慢慢坐下去，龟头一寸寸被吞没，一口吞到底，仰头喘了一声。",
      "{char}骑在你腰上自己磨，湿穴贴着柱身蹭，淫水淌到你腹肌，对准位置慢慢坐下，眼神湿湿地看着你。",
    ],
    slow: [
      { narrative: "{char}自己控节奏慢慢摇腰，肉棒在湿穴里深浅起伏，奶子随律动轻颤，乳尖硬挺。", char: "「这样……舒服吗……里面……好满……」{char}俯身亲你，腰却没停，淫水咕叽作响。" },
      { narrative: "你掐着{char}胯引导慢磨，每一下都坐到最深再抬起，龟头顶着子宫口磨。", char: "「嗯……顶到了……那里……要去了……」{char}手指抠你胸口。" },
    ],
    hard: [
      { narrative: "{char}疯狂上下套弄，湿穴啪啪套着你的肉棒，水声又快又响，头发甩得到处都是，淫水溅你小腹。", char: "「操……好爽……别拦我……射进来……」{char}眼睛红了。" },
      { narrative: "你掐腰往上顶配合{char}的节奏，两人撞得床/沙发响，每下都顶实。", char: "「啊……{self}……一起……灌满我……」{char}指甲划你腹肌。" },
    ],
    tease: [
      { narrative: "{char}坐到一半就停，只让龟头卡在穴口磨，看你难受地仰头，淫水滴你身上。", char: "「想要？」{char}坏笑，「说啊，说你求我插进来。」" },
      { narrative: "你想起身{char}把你按回去，只动腰不让你深顶，穴肉却绞着龟头不放。", char: "「今晚我说了算。」{char}俯身咬你耳垂，下面湿得一塌糊涂。" },
    ],
    climax: [
      "{char}加速骑乘，最后整个人抖着趴你胸口高潮，穴肉痉挛喷出热液，绞紧你，你忍不住顶着腰射在里面，精液灌满她从穴口溢出来。",
      "你掐{char}腰猛顶几下，{char}仰头尖叫又赶紧捂嘴，夹着你抽搐着一起去，白浊混淫水滴落。",
    ],
  },
  standing: {
    label: "站立",
    icon: "🧍",
    intro: [
      "你把{char}顶在墙上/门板上，扯开内裤抬一条腿架腰，龟头抵住湿穴磨两下，站着一顶到底，空间窄得只能贴紧。",
      "{char}环你脖子，你托着臀抬起来，硬邦邦抵着湿滑的穴口蹭，淫水淌到你手上，再一顶进去。",
    ],
    slow: [
      { narrative: "你维持站立缓慢顶弄，肉棒在紧穴里抽插，{char}背靠墙只能承受，每一下都深，淫水顺着腿淌。", char: "「嗯……腿软了……抱紧我……插太深了……」" },
      { narrative: "你亲{char}颈侧，下身慢磨，龟头顶着深处碾，墙灰/门板震出轻响。", char: "「外面有人……小声点……」{char}自己捂嘴，穴肉却绞紧你。" },
    ],
    hard: [
      { narrative: "你托着臀狠顶，啪啪肉响，{char}后背撞墙闷响，腿缠紧你，淫水溅你裤腿。", char: "「操……太深了……{self}……射进来……」{char}喘不上气。" },
      { narrative: "你抱着{char}上下颠，肉棒随重力一顶到底，每下都撞实子宫口。", char: "「啊……要掉了……别停……灌满我……」" },
    ],
    tease: [
      { narrative: "你只顶几下就停，龟头卡在穴口，让{char}腿抖着挂在你身上求。", char: "「你故意的……放我下来……不，别放……插进来啊……」" },
      { narrative: "你抵着湿穴口不进，{char}自己往下坐被你托住，淫水滴你手腕。", char: "「{self}……我里面好空……好痒……」{char}眼眶湿了。" },
    ],
    climax: [
      "你最后抱着{char}猛顶，{char}咬你肩膀高潮，穴肉痉挛喷热液，腿绞紧你腰，你闷哼着顶到最深射在里面，精液灌满她。",
      "站立冲刺十几下，{char}整个人挂你身上抖着高潮，你抵墙深顶射满她，白浊从穴口溢出来滴落。",
    ],
  },
  desk: {
    label: "桌上/课桌",
    icon: "🪑",
    intro: [
      "你把{char}推坐/按在{locSurface}，扫开课本/文件，扯开内裤分开腿，龟头抵住湿穴一顶进去，桌沿硌着{char}臀。",
      "{char}坐桌沿腿环你腰，内裤扯到一边，你站着顶，肉棒整根没入，桌面吱呀，粉笔灰/纸页飞一点，淫水滴到地上。",
    ],
    slow: [
      { narrative: "课桌/办公桌随节奏轻晃，你慢顶，肉棒在湿穴里抽插，每一下都顶实，{char}抓桌沿，水声咕叽。", char: "「嗯……桌子……在响……会被听见……」{char}小声哼，腿根淌水。" },
      { narrative: "你俯身亲{char}，下身慢磨，龟头顶着深处碾，文件哗啦啦掉地上也不管。", char: "「别管那些……继续……插进来……」" },
    ],
    hard: [
      { narrative: "你猛顶得桌子移位，啪啪肉响，{char}后仰手撑桌，奶子随撞击晃，淫水溅桌腿。", char: "「操……轻点……不，再重点……射进来……」" },
      { narrative: "你掐腿根深顶，龟头顶子宫口猛撞，桌腿刮地面刺耳一声。", char: "「会被听见……啊……管不了了……要去了……」" },
    ],
    tease: [
      { narrative: "你让{char}坐桌上自己动，你手插兜只看，她湿穴一张一合流着水，{char}羞愤又馋。", char: "「你……过来啊……插进来……」{char}腰扭着追。" },
      { narrative: "你只用手指抠弄湿穴，{char}躺桌上湿透了却不给进，淫水在桌面汇成一小滩。", char: "「{self}……桌上有我水印了……你负责……用这里……」" },
    ],
    climax: [
      "最后猛顶把桌震得哐一声，{char}高潮时抓紧桌沿指节白，穴肉痉挛喷热液，你深顶射在里面，精液灌满她从桌沿溢下来，纸页飞一地。",
      "你加速顶到{char}整个人滑下桌面，你捞住腰顶到最深射满她，两人喘着瘫在桌边，腿间白浊混淫水滴落。",
    ],
  },
  oral_give: {
    label: "口交服侍",
    icon: "👅",
    intro: [
      "你跪下来拉下{char}裤腰/裙链，舌头舔过湿缝/硬起来的那根，{char}扶墙腿软。",
      "{char}坐{locSurface}分开腿，你埋头口舌侍奉，吸到{char}抓你头发。",
    ],
    slow: [
      { narrative: "你舌头慢慢打圈，偶尔深喉/探入，节奏温柔却不停。", char: "「嗯……{self}……舌头好热……」" },
      { narrative: "你含住最敏感那点轻吸，手指配合慢弄，{char}腰扭着迎。", char: "「别停……就那里……」" },
    ],
    hard: [
      { narrative: "你吸得又狠又深，{char}腿抖着夹你头，水声明显。", char: "「操……要到了……别停……」{char}按着你往下。" },
      { narrative: "你深喉/快速舔弄，{char}仰头发颤，哼声收不住。", char: "「啊……{self}……我会叫出来的……」" },
    ],
    tease: [
      { narrative: "你舔到边缘就停，{char}腰往上追你却退开。", char: "「你混蛋……故意的……」{char}眼睛红了。" },
      { narrative: "你只用舌尖轻点，不进去，{char}求了又求。", char: "「求你了……让我去……」" },
    ],
    climax: [
      "你加速口舌，{char}高潮时夹紧你头/射在你嘴里，你咽下去抬头看{char}失神的表情。",
      "{char}抖着高潮，手指陷进你头皮，你含着不放直到{char}腿软推你。",
    ],
  },
  spoon: {
    label: "侧入",
    icon: "🥄",
    intro: [
      "你们侧躺，你从后贴上去，扯开内裤，龟头抵住湿穴一顶进去，一手绕前揉乳尖，另一手揉阴蒂，下巴搁{char}肩窝。",
      "{char}蜷缩着，你从后缓慢进入，肉棒一寸寸被紧穴吞没，空间窄更觉深，呼吸喷在{char}耳后，淫水沾湿床单。",
    ],
    slow: [
      { narrative: "侧入慢磨，每一下都深而稳，{char}后背贴你胸口。", char: "「嗯……好满……别动太快……」" },
      { narrative: "你亲{char}耳后，下身维持温柔节奏，手指在前面打圈。", char: "「{self}……里面好热……」" },
    ],
    hard: [
      { narrative: "你从后猛顶，{char}整个人往前滑，你捞腰拉回来继续深顶。", char: "「啊……太深……侧着也……」" },
      { narrative: "你加快侧入节奏，床/垫单皱成一团。", char: "「操……要坏了……」{char}抓枕头。" },
    ],
    tease: [
      { narrative: "你只进一半磨，{char}往后顶想吞更深被你控住。", char: "「别……吊我……」" },
      { narrative: "你停着不动只揉前面，{char}自己往后磨。", char: "「{self}……动一下……」" },
    ],
    climax: [
      "侧入加速，{char}夹紧你高潮，你贴着后背深顶一起放，两人喘成一团。",
      "你从后最后冲刺，{char}手指抠紧你手背，高潮时闷哼进枕头。",
    ],
  },
  wall: {
    label: "靠墙",
    icon: "🧱",
    intro: [
      "你把{char}按墙上，扯开内裤，从正面龟头抵住湿穴一顶进去，{char}腿环你腰，后背蹭墙灰/瓷砖，淫水淌到你手腕。",
      "墙冰凉，{char}滚烫，你托臀抬起来顶着墙深进，肉棒整根没入，门板/墙都在震，水声咕叽。",
    ],
    slow: [
      { narrative: "靠墙慢顶，每一下都磨深处，{char}额头抵你肩窝。", char: "「嗯……墙好凉……你好烫……」" },
      { narrative: "你亲{char}嘴唇，下身温柔律动，外面脚步声近了就停。", char: "「有人……别动……」然后又小声：「走了……继续……」" },
    ],
    hard: [
      { narrative: "你按着{char}狠顶，墙咚一声，{char}哼声碎掉。", char: "「操……{self}……再深……」" },
      { narrative: "托臀猛顶，{char}后脑磕墙，你伸手垫着也不停。", char: "「啊……要疯了……」" },
    ],
    tease: [
      { narrative: "你抵着不进，{char}自己往下坐，你坏笑着扶住不让。", char: "「求我。」你只说了两个字。" },
      { narrative: "你隔裤磨到湿透了才掏出来顶，{char}急得咬你肩膀。", char: "「早就这样了……混蛋……」" },
    ],
    climax: [
      "靠墙冲刺，{char}腿绞紧你高潮，你抵着墙深顶释放，两人滑坐下去又抱紧。",
      "最后十几下又深又狠，{char}捂嘴高潮，你闷哼着顶到最深。",
    ],
  },
  sixtynine: {
    label: "69互舔",
    icon: "♋",
    intro: [
      "你们头脚颠倒躺下，你舔湿穴她含柱身，淫水糊你脸，她喉肉绞紧你。",
      "{char}跨坐你脸又俯身含你，上下同时动，哼声闷成一片。",
    ],
    slow: [
      { narrative: "舌头慢慢探入穴里打圈，她含到根部停三秒，节奏同步。", char: "「嗯……一起……别停……」{char}腰压你脸，下面淌得更凶。" },
      { narrative: "你吮阴蒂她深喉，互相吊着节奏，谁先受不了谁先抖。", char: "「要……要去了……{self}……」" },
    ],
    hard: [
      { narrative: "互相加速，脸埋腿间猛舔，她吸得脸颊凹陷，水声混喉音。", char: "「操……太深了……喉……」{char}高潮喷你一脸。" },
      { narrative: "你掐她臀控角度，舌头顶穴心，她深喉到鼻息都断。", char: "「啊……同时……一起……」" },
    ],
    tease: [
      { narrative: "你舔到边缘就停，她含一下也退，互相折磨。", char: "「混蛋……一起进去啊……」" },
      { narrative: "只舔阴蒂不探穴，她含龟头不吞根，吊到双方眼眶红。", char: "「求我……说你求我……」" },
    ],
    climax: [
      "同时高潮，她喷你一脸热液，你射她嘴里，她咽下去喉结滚动。",
      "她先抖着高潮，你跟着射进喉底，她咳一声全咽了，嘴角亮晶晶。",
    ],
  },
  titjob: {
    label: "乳交",
    icon: "🍈",
    intro: [
      "{char}跪坐夹紧乳沟，你柱身陷进软肉，乳尖蹭龟头，她低头舔露出的顶端。",
      "油或唾液抹乳沟，她托胸夹紧，你抽插乳肉啪啪轻响。",
    ],
    slow: [
      { narrative: "慢速在乳沟抽插，龟头每次蹭到下巴她就舔一下。", char: "「嗯……射……射这里……」" },
      { narrative: "她控节奏夹紧又松开，乳浪晃，眼神湿。", char: "「舒服吗……{self}……」" },
    ],
    hard: [
      { narrative: "她猛夹乳沟上下套，你掐肩顶她下巴，龟头撞喉口。", char: "「啊……呛……再……」" },
      { narrative: "乳交加速，她伸舌接每一下顶端，口水拉丝。", char: "「射……射满奶子……」" },
    ],
    tease: [
      { narrative: "夹一下又松开，不让你射，她坏笑看你难受。", char: "「求我……说求我射上来……」" },
      { narrative: "只蹭乳尖不夹沟，你硬得发疼她亲一下继续吊。", char: "「急什么……乳交要慢……」" },
    ],
    climax: [
      "精液溅满乳沟和下巴，她抹开涂匀，舔手指看你。",
      "射她一脸和胸，白浊挂睫毛，她张嘴接最后一滴。",
    ],
  },
  facesit: {
    label: "坐脸",
    icon: "😈",
    intro: [
      "{char}跨坐你脸，湿穴压下来，淫水糊满口鼻，你舌头探进穴里搅。",
      "她抓床头控节奏，臀肉碾你脸，腿间甜腥扑面。",
    ],
    slow: [
      { narrative: "她慢慢磨你唇和舌，穴口一张一合流淫水。", char: "「舔深……嗯……那里……」" },
      { narrative: "你吮阴蒂她腰抖，手揪床单。", char: "「别停……{self}……要去了……」" },
    ],
    hard: [
      { narrative: "她猛坐下来磨，几乎让你窒息，你掐臀托住她。", char: "「操……舔……再深……」" },
      { narrative: "臀肉拍打你脸，水声咕叽，她高潮喷你一脸。", char: "「啊……喷了……别擦……」" },
    ],
    tease: [
      { narrative: "她抬起来只让舌尖碰一下又坐下，吊死你。", char: "「求我……说想吃……」" },
      { narrative: "磨阴蒂不给你整穴，你舌伸长她故意躲。", char: "「……再乖一点……」" },
    ],
    climax: [
      "她痉挛高潮喷热液，瘫倒滑你胸口，腿还在抖。",
      "高潮后还不起来，穴口贴你唇余韵一缩一缩。",
    ],
  },
  footjob: {
    label: "足交",
    icon: "🦶",
    intro: [
      "{char}丝袜裹脚夹住柱身上下撸，足弓弧度磨龟头，裂帛处嫩肉若隐若现。",
      "脚趾蹭马眼，她挑眉看你：「……脏死了还硬成这样。」",
    ],
    slow: [
      { narrative: "脚掌慢磨柱身，丝袜摩擦又滑又紧。", char: "「嗯……舒服？」{char}脚趾夹根部。" },
      { narrative: "双足夹紧慢撸，她伸脚蹭你囊。", char: "「射……射袜子上……」" },
    ],
    hard: [
      { narrative: "双脚快速夹射，丝袜湿了一片，她脚心感受脉搏。", char: "「快……给我……」" },
      { narrative: "足交加速，她踩你小腹控距，龟头紫红。", char: "「啊……要射了……」" },
    ],
    tease: [
      { narrative: "夹一下又松开，足尖点龟头不撸。", char: "「求我……用脚求我……」" },
      { narrative: "只蹭不夹，她看脚背淌前液笑。", char: "「……好色。」" },
    ],
    climax: [
      "射在丝袜上白浊淌满脚背，她褪袜扔你胸口。",
      "精液溅脚和小腿，她脚趾蹭匀看你。",
    ],
  },
};

const GAL_LOC_SURFACE = {
  gate: "长椅",
  classroom: "课桌",
  library: "阅览桌",
  dorm: "楼梯转角",
  gym: "长凳",
  rooftop: "水泥台",
  office: "会议桌",
  lab: "实验台",
  bus: "最后一排座椅",
  forest: "铺满落叶的地面",
  hotel_night: "大床",
  car_parked: "后座",
  bar_encounter: "洗手台",
  fitting_room: "试衣凳",
  elevator: "轿厢壁",
  ktv: "沙发",
  kitchen: "料理台",
  pool_night: "池边",
};

const GAL_DATE_CAMPUS = {
  gate: [
    "{char}塞给你一片樱花瓣：「夹书里，想我就看。」指尖划过你掌心，痒。",
    "你们并肩走过迎新拱门，{char}小声说：「以后每天走这条路好不好？」",
  ],
  classroom: [
    "补课结束只剩你们，{char}趴在桌上：「这题不会……你过来教，近一点。」",
    "{char}把校服外套搭你椅背：「占个座，下次一起占。」",
  ],
  library: [
    "{char}在书架后递纸条：「三楼最里面，十分钟，别让人看见。」",
    "借书卡碰到你手指，{char}没缩：「……下次还一起自习。」",
  ],
  dorm: [
    "宿舍楼下路灯黄，{char}说宿管睡了才敢下来：「就待五分钟……不够。」",
    "{char}把暖手宝塞进你口袋：「手别凉，凉了怎么抱我。」",
  ],
  gym: [
    "训练结束淋浴间水汽弥漫，{char}隔着雾看你：「帮我拿浴巾……近一点。」",
    "{char}穿泳装擦头发，水珠滑过锁骨，「只给你看，别拍。」",
  ],
  rooftop: [
    "风大，{char}头发糊你脸上，笑着说：「抱紧，不然吹跑了。」",
    "夕阳把{char}侧脸镀金，{char}轻声：「在这里接吻，算不算浪费风景？」",
  ],
  office: [
    "会议结束{char}锁门：「文件明天再说，现在……就我们俩。」",
    "{char}坐桌沿晃腿：「主席位子空着，你坐过来，近到能听见我喘。」",
  ],
  lab: [
    "示波器绿光里{char}凑近：「实验做完了，做点别的数据……」",
    "{char}递护目镜给你戴，手指蹭过你脸：「化学品别碰，碰我就行。」",
  ],
  bus: [
    "校车颠簸，{char}靠你肩：「最后一排，窗帘拉上……假装睡。」",
    "{char}膝盖蹭你腿：「到学校还有二十分钟，够做坏事。」",
  ],
  forest: [
    "后山少人，{char}拉你进树林：「社团烧烤在那边，这边没人。」",
    "落叶湿软，{char}背靠树干看你：「野战……敢吗？」",
  ],
};

const GAL_SEX_PACE = {
  slow: { label: "温柔慢磨", icon: "🫦", pleasure: 12 },
  hard: { label: "猛烈深顶", icon: "💥", pleasure: 18 },
  tease: { label: "挑逗吊胃口", icon: "😈", pleasure: 10 },
  switch: { label: "换姿势", icon: "🔄", pleasure: 5 },
};

function getGalCampusMeta() {
  ensureGalProfile();
  if (!profile.galgame._meta) {
    profile.galgame._meta = {
      campusIntroDone: false,
      activeRoute: null,
      activeHeroine: null,
      shards: 0,
      totalRuns: 0,
      unlockedOutfits: ["naked", "lingerie_white", "lingerie_pink", "lingerie_black"],
    };
  }
  return profile.galgame._meta;
}

function getGalUniName() {
  return "青藤大学";
}

function isGalConquered(routeId) {
  const save = getGalSave(routeId);
  return save.conquered || save.affection >= GAL_CONQUER_AFF || save.ending;
}

function markGalConquered(routeId) {
  const save = getGalSave(routeId);
  if (!save.conquered && save.affection >= GAL_CONQUER_AFF) {
    save.conquered = true;
    saveGal();
    showToast?.(`🎉 攻略成功！${getGalCharName()} 任你摆布，全校地图可做爱`, 4000);
  }
}

function getGalActiveRouteId() {
  return getGalRun()?.routeId || getGalCampusMeta().activeRoute || galRuntime.routeId;
}

function setGalActiveRoute(routeId) {
  const meta = getGalCampusMeta();
  meta.activeRoute = routeId;
  const h = GAL_HEROINE_LIST.map((id) => getHeroine(id)).find((x) => x?.routeId === routeId);
  if (h) meta.activeHeroine = h.id;
  galRuntime.routeId = routeId;
  if (h) galRuntime.heroineId = h.id;
  saveGal();
}

function getAllGalLocations(routeId) {
  const save = getGalSave(routeId);
  const aff = save.affection;
  const conquered = isGalConquered(routeId);
  const ending = save.ending;

  const campus = GAL_CAMPUS_LOCATIONS.filter((loc) => {
    if (loc.needConquer && !conquered) return false;
    return aff >= loc.needAff;
  });

  const off = ending
    ? GAL_OFFCAMPUS_LOCATIONS
    : GAL_OFFCAMPUS_LOCATIONS.filter(() => false);

  return [...campus, ...off];
}

function getGalLocAmbient(locId, char) {
  const tpl = GAL_LOC_AMBIENT[locId] || "空气又热又稠，只剩彼此的喘。";
  return galFill(tpl, char);
}

function getGalLocSurface(locId) {
  return GAL_LOC_SURFACE[locId] || "身下";
}

function buildCampusPrologueBeats() {
  const char = state.nameA;
  const uni = getGalUniName();
  return GAL_CAMPUS_PROLOGUE.map((b) => ({
    speaker: b.speaker.replace("{char}", char),
    text: galFill(b.text.replace(/\{uni\}/g, uni), char),
    choices: null,
  }));
}

function buildCampusDateBeats(routeId, locId) {
  const heroine = getActiveHeroine();
  const char = getGalCharName();
  const aff = getGalAffection(routeId);
  const intensity = galIntensity(aff);
  const loc = GAL_CAMPUS_LOCATIONS.find((l) => l.id === locId) || { name: "校园" };
  const dateLines = GAL_DATE_CAMPUS[locId] || GAL_DATE_CAMPUS.gate;

  const personaKey = intensity === "warm" ? "date_warm" : "date_hot";
  const personaLine = heroine ? getPersonaLine(heroine.personality, personaKey) : "";

  const beats = [
    { speaker: "旁白", text: `【${loc.name}】${getGalLocAmbient(locId, char)}`, choices: null },
    { speaker: char, text: galFill(galPick(dateLines), char), choices: null },
    { speaker: char, text: personaLine || galFill(galPick(GAL_CHAR_REACT[intensity]), char), choices: null },
  ];

  if (heroine) {
    beats.push({
      speaker: "旁白",
      text: galFill(getBodyFlavor(heroine.bodyType, "touch"), char),
      choices: null,
    });
  }

  for (let i = 0; i < 2; i++) {
    beats.push({
      speaker: "你",
      text: galFill(galPick(GAL_PLAYER_LINES[intensity]), char),
      choices: buildGalChoices(intensity),
    });
    beats.push({
      speaker: char,
      text: personaLine || galFill(galPick(GAL_CHAR_REACT[intensity]), char),
      choices: null,
    });
  }

  if (heroine) addStripChoiceToBeats(beats, heroine);

  if (isGalConquered(routeId)) {
    beats.push({
      speaker: char,
      text: galFill(`{char}已经是你的了。{char}拽你袖子：「去${loc.name}……现在就要。」`, char),
      choices: [
        { text: "🔞 在这里做爱", full: "就地做爱", aff: 3, bold: true, action: "sex" },
        { text: "再撩一会", full: galCardLine(intensity, "serve"), aff: 8, bold: false },
        { text: "忍住回地图", full: "改天再来", aff: 2, bold: false },
      ],
    });
  }

  return beats;
}

function getSexPositionText(posId, pace, locId, char) {
  const pos = GAL_SEX_POSITIONS[posId];
  if (!pos) return { narrative: "", char: "" };
  const surface = getGalLocSurface(locId);
  const ambient = getGalLocAmbient(locId, char);

  if (pace === "intro") {
    const intro = galFill(galPick(pos.intro), char).replace(/\{locSurface\}/g, surface);
    return { narrative: `${ambient}\n\n${intro}`, char: "" };
  }
  if (pace === "climax") {
    return {
      narrative: galFill(galPick(pos.climax), char),
      char: `「{char}……我不行了……」${char}哑着嗓子，整个人抖着高潮。`.replace("{char}", state.nameB || "你"),
    };
  }

  const pool = pos[pace] || pos.slow;
  const pick = galPick(pool);
  return {
    narrative: galFill(pick.narrative, char).replace(/\{locSurface\}/g, surface),
    char: galFill(pick.char, char),
  };
}