export interface PatternImage { src: string; caption: string }
export interface Pattern {
  id: number
  name: string
  category: '几何纹' | '植物纹' | '动物纹'
  era: string
  culturalOrigin: string
  imageSource: string
  authorizationStatus: string
  description: string
  culturalMeaning: string
  ipNotice: string
  keywords: string[]
  images: PatternImage[]
}

// 根据《文博技术与产品创新》所附中国传统纹样信息统计表整理。
// 授权状态为资料原文记载，使用前仍须核对具体图片页面及其适用授权。
export const patterns: Pattern[] = [
  {
    id: 1,
    name: "云雷纹",
    category: "几何纹",
    era: "商代（约前1600—前1046）",
    culturalOrigin: "中原地区，青铜器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域（商代文物）",
    description: "资料收录的几何纹类别纹样，资料所列年代为商代（约前1600—前1046）。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "云雷", "商代（约前1600—前1046）"],
    images: [
      { src: "/patterns/01_01.png", caption: "云雷纹镜" },
      { src: "/patterns/01_02.png", caption: "云雷纹鼎" },
      { src: "/patterns/01_03.png", caption: "细节图" },
    ]
  },
  {
    id: 2,
    name: "回纹",
    category: "几何纹",
    era: "商周",
    culturalOrigin: "中原地区，青铜器/陶器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为商周。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "回", "商周"],
    images: [
      { src: "/patterns/02_01.png", caption: "雍正款豆绿釉刻回纹碗" },
      { src: "/patterns/02_02.png", caption: "细节图" },
    ]
  },
  {
    id: 3,
    name: "方胜纹",
    category: "几何纹",
    era: "汉代",
    culturalOrigin: "中原地区，织锦",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为汉代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "方胜", "汉代"],
    images: [
      { src: "/patterns/03_01.png", caption: "红色缎平金绣方胜纹腰圆荷包" },
      { src: "/patterns/03_02.png", caption: "细节图" },
    ]
  },
  {
    id: 4,
    name: "万字纹（卍）",
    category: "几何纹",
    era: "唐代",
    culturalOrigin: "佛教艺术，敦煌壁画",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域（唐代壁画）",
    description: "资料收录的几何纹类别纹样，资料所列年代为唐代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "万字（卍）", "唐代"],
    images: [
      { src: "/patterns/04_01.png", caption: "黄色地喜相逢朵花万字纹锦画袱拆片" },
      { src: "/patterns/04_02.png", caption: "细节图" },
    ]
  },
  {
    id: 5,
    name: "龟背纹",
    category: "几何纹",
    era: "宋代",
    culturalOrigin: "中原地区，瓷器/织锦",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为宋代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "龟背", "宋代"],
    images: [
      { src: "/patterns/05_01.png", caption: "彩色龟背纹玛什鲁布" },
    ]
  },
  {
    id: 6,
    name: "锁子纹",
    category: "几何纹",
    era: "唐代",
    culturalOrigin: "中原地区，铠甲/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为唐代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "锁子", "唐代"],
    images: [
      { src: "/patterns/06_01.png", caption: "蓝色地团夔龙朵花锁子纹锦" },
    ]
  },
  {
    id: 7,
    name: "连环纹",
    category: "几何纹",
    era: "汉代",
    culturalOrigin: "中原地区，铜镜",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为汉代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "连环", "汉代"],
    images: [
      { src: "/patterns/07_01.png", caption: "象牙雕连环纹扳指" },
      { src: "/patterns/07_02.png", caption: "细节图" },
    ]
  },
  {
    id: 8,
    name: "天华锦纹",
    category: "几何纹",
    era: "明清",
    culturalOrigin: "江南地区，织锦",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的几何纹类别纹样，资料所列年代为明清。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["几何纹", "天华锦", "明清"],
    images: [
      { src: "/patterns/08_01.png", caption: "石青色龟背天华锦纹织金缎" },
    ]
  },
  {
    id: 9,
    name: "缠枝莲纹",
    category: "植物纹",
    era: "唐代",
    culturalOrigin: "佛教艺术，石窟/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为唐代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "缠枝莲", "唐代"],
    images: [
      { src: "/patterns/09_01.png", caption: "永乐款青花缠枝莲纹压手杯" },
    ]
  },
  {
    id: 10,
    name: "宝相花纹",
    category: "植物纹",
    era: "唐代（盛唐）",
    culturalOrigin: "中原与西域文化融合，敦煌壁画",
    imageSource: "数字敦煌",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为唐代（盛唐）。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "宝相花", "唐代（盛唐）"],
    images: [
      { src: "/patterns/10_01.png", caption: "成化款青花宝相花纹杯" },
      { src: "/patterns/10_02.png", caption: "细节图" },
    ]
  },
  {
    id: 11,
    name: "忍冬纹",
    category: "植物纹",
    era: "魏晋南北朝",
    culturalOrigin: "西域传入，石窟/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为魏晋南北朝。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "忍冬", "魏晋南北朝"],
    images: [
      { src: "/patterns/11_01.png", caption: "忍冬纹砖" },
      { src: "/patterns/11_02.png", caption: "细节图" },
    ]
  },
  {
    id: 12,
    name: "牡丹纹",
    category: "植物纹",
    era: "宋代",
    culturalOrigin: "中原地区，瓷器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为宋代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "牡丹", "宋代"],
    images: [
      { src: "/patterns/12_01.png", caption: "资料未标注图名（图片1）" },
      { src: "/patterns/12_02.png", caption: "资料未标注图名（图片2）" },
    ]
  },
  {
    id: 13,
    name: "莲花纹",
    category: "植物纹",
    era: "南北朝",
    culturalOrigin: "佛教艺术，石窟/器物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为南北朝。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "莲花", "南北朝"],
    images: [
      { src: "/patterns/13_01.png", caption: "成化款青花折枝莲纹碗" },
      { src: "/patterns/13_02.png", caption: "细节图" },
    ]
  },
  {
    id: 14,
    name: "菊花纹",
    category: "植物纹",
    era: "宋代",
    culturalOrigin: "中原地区，瓷器/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为宋代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "菊花", "宋代"],
    images: [
      { src: "/patterns/14_01.png", caption: "雍正款斗彩团菊纹盖罐" },
      { src: "/patterns/14_02.png", caption: "细节图" },
    ]
  },
  {
    id: 15,
    name: "石榴纹",
    category: "植物纹",
    era: "唐代",
    culturalOrigin: "西域传入，织物/器物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为唐代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "石榴", "唐代"],
    images: [
      { src: "/patterns/15_01.png", caption: "品月色缎地梅桃竹石榴纹绦" },
    ]
  },
  {
    id: 16,
    name: "葡萄纹",
    category: "植物纹",
    era: "唐代",
    culturalOrigin: "西域传入，织物/铜镜",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为唐代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "葡萄", "唐代"],
    images: [
      { src: "/patterns/16_01.png", caption: "斗彩松鼠葡萄纹大碗" },
      { src: "/patterns/16_02.png", caption: "细节图" },
    ]
  },
  {
    id: 17,
    name: "折枝花纹",
    category: "植物纹",
    era: "宋代",
    culturalOrigin: "中原地区，瓷器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的植物纹类别纹样，资料所列年代为宋代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["植物纹", "折枝花", "宋代"],
    images: [
      { src: "/patterns/17_01.png", caption: "斗彩折枝花卉纹酒杯" },
      { src: "/patterns/17_02.png", caption: "细节图" },
    ]
  },
  {
    id: 18,
    name: "龙纹（应龙）",
    category: "动物纹",
    era: "汉代",
    culturalOrigin: "中原地区，画像石/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的动物纹类别纹样，资料所列年代为汉代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["动物纹", "龙（应龙）", "汉代"],
    images: [
      { src: "/patterns/18_01.png", caption: "石青色彩云金龙纹妆花缎女夹褂" },
      { src: "/patterns/18_02.png", caption: "细节图" },
    ]
  },
  {
    id: 19,
    name: "凤纹",
    category: "动物纹",
    era: "商代",
    culturalOrigin: "中原地区，青铜器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的动物纹类别纹样，资料所列年代为商代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["动物纹", "凤", "商代"],
    images: [
      { src: "/patterns/19_01.png", caption: "雪青色缎绣百鸟朝凤纹紧身料" },
    ]
  },
  {
    id: 20,
    name: "麒麟纹",
    category: "动物纹",
    era: "明代",
    culturalOrigin: "中原地区，官服/瓷器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的动物纹类别纹样，资料所列年代为明代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["动物纹", "麒麟", "明代"],
    images: [
      { src: "/patterns/20_01.png", caption: "麒麟纹牌饰" },
    ]
  },
  {
    id: 21,
    name: "蝙蝠纹",
    category: "动物纹",
    era: "清代",
    culturalOrigin: "中原地区，瓷器/织物",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的动物纹类别纹样，资料所列年代为清代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["动物纹", "蝙蝠", "清代"],
    images: [
      { src: "/patterns/21_01.png", caption: "珊瑚釉粉彩蝙蝠纹盘" },
      { src: "/patterns/21_02.png", caption: "细节图" },
    ]
  },
  {
    id: 22,
    name: "鱼藻纹",
    category: "动物纹",
    era: "元代",
    culturalOrigin: "景德镇瓷器",
    imageSource: "故宫博物院数字文物库",
    authorizationStatus: "公有领域",
    description: "资料收录的动物纹类别纹样，资料所列年代为元代。",
    culturalMeaning: "原始资料未提供独立的文化寓意说明；此处不作推断。",
    ipNotice: "纹样本身的年代不等于具体馆藏图片的授权结论。请核对原始图片页面、开放许可条件及使用范围。",
    keywords: ["动物纹", "鱼藻", "元代"],
    images: [
      { src: "/patterns/22_01.png", caption: "嘉靖款五彩鱼藻纹盖罐" },
      { src: "/patterns/22_02.png", caption: "细节图" },
    ]
  },
]
