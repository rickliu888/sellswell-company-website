import SiteFrame, { PageHero } from "../components/SiteFrame";
import ProgressiveImage from "../components/ProgressiveImage";

const journey = [
  ["2022", "跨境项目正式启动，海外团队同步开始筹建。团队从市场研究、平台运营与本地内容切入，为东南亚业务落地建立基础。"],
  ["2023", "福州事为电子商务有限公司正式运营，聚焦Shopee、TikTok等主流平台。首年即在服饰垂直类目实现市场占有率TOP3。"],
  ["2024", "推行多平台、多类目策略，设立亚马逊事业部并进入美国家居市场；汽摩配与文胸业务同步启动，形成更丰富的业务矩阵。"],
  ["2025", "与广州八千里路达成战略合作，进一步整合运营、技术和供应链能力。业务覆盖泰国、印尼、马来西亚等市场，事为电商GMV同比增长5倍。"],
  ["2026", "启动巴西市场与本地化仓储体系建设，持续链接国内及海外本地供应链。全球预估GMV为1–2亿元，迈入全球化布局新阶段。"],
];

const leaders = [
  ["RL", "Rick Liu", "创始人 / CEO", "拥有10年互联网产品研发经验与7年互联网出海经历。曾任阿里巴巴eWTP基金旗下出海企业高级产品经理，深度参与东南亚市场布局；也曾在腾讯投资的头部汽车媒体企业及格力科技部门主导电商平台设计。如今专注于用中国供应链能力服务全球消费者，坚持长期主义，把事情做到极致。"],
  ["JC", "Jeff Chen", "广州八千里路信息科技公司创始人", "中国传媒大学广告学硕士，拥有14年互联网行业经验与6年出海团队建设经验。曾管理上百人研发团队，担任出海互联网公司COO；2020年在东南亚组建超50人的本地化内容团队，打造TikTok亿级内容矩阵，并在7个月内通过SEO将电商网站提升至月活300万。现主攻AI应用、内容增长及海外市场业务。"],
  ["ZI", "Zico", "合伙人 / 高级运营经理", "大学期间开始钻研电商平台打法，从实习生用两年成长为高级运营经理，是公司从0到1的核心成员。他参与完成从首笔订单、爆款打造到单月GMV突破千万的全过程，精通平台策略、流量运营、用户增长与项目统筹。现已通过公司持股平台成为合伙人，与团队共享长期成长。"],
  ["IV", "Ivy", "运营经理", "2024年加入团队，在公司高速扩张中从实习生成长为运营经理。她熟悉电商全链路运营，覆盖日常运维、流量结构优化与业绩提升，能够独立完成项目从规划到执行的闭环管理。认真严谨、积极进取，是公司人才培养与内部晋升机制的真实缩影。"],
];

export default function About() { return <SiteFrame active="about">
  <PageHero eyebrow="ABOUT SELLSWELL" title={<>长期做正确的事，<br/>把事情做成</>} description="我们相信高性价比不等于低价。事为希望通过优质产品与专业经营，让世界重新认识中国品质。"/>

  <section className="inner-section intro-grid"><div><div className="section-kicker">WHO WE ARE</div><h2>关于事为</h2></div><div className="about-copy"><p>事为电商的跨境项目于2022年启动，2023年在福州正式注册运营。我们深耕东南亚，并持续布局欧洲、美国、墨西哥与巴西，以“中国供应链＋本地化运营”为核心，把真实的海外市场判断、平台经营、内容增长和本地履约连接成完整闭环。</p><p>公司长期运营Shopee、Lazada、TikTok、Amazon等主流平台，覆盖汽摩配、家清用品、家居生活用品、文胸等重点类目。一路走来，我们从自营电商的一线实战出发，逐步沉淀出精铺运营、爆款打造、品牌建设、海外仓储与本地合规等能力，并通过自研AI系统持续提升内容生产和精细化运营效率。</p><p>公司以福州事为电子商务有限公司为官网及自营电商主体；福州八千里路电子商务有限公司负责国内与海外供应链合作；广州八千里路信息科技有限公司聚焦欧美电商运营、AI应用、内容增长及海外市场业务。三个主体围绕同一业务愿景协同，让好产品、专业运营、智能技术与全球履约彼此支撑。</p><p>我们不以低价定义中国制造，也不追逐昙花一现的增长。事为希望用高性价比的优质商品和长期专业经营，让世界重新认识中国品质；同时与供应链伙伴、团队成员共同创造并分享可持续的价值。</p></div></section>

  <section className="inner-section values-section"><div className="section-kicker">WHAT WE BELIEVE</div><div className="split-title"><h2>长远 · 务实 · 精进 · 主动</h2><p>价值观不是写在墙上的口号，而是我们面对市场、伙伴和每一次任务时共同遵循的做事方式。</p></div><div className="value-grid"><article><span>01 / LONG-TERM</span><h3>长远</h3><p>不盲从，不追逐短期暴利；选择能够持续积累、产生长期复利的产品、能力与合作关系。</p></article><article><span>02 / PRAGMATIC</span><h3>务实</h3><p>不美化报表和问题。尊重事实，看见什么就说什么，有问题就直面并推动解决。</p></article><article><span>03 / PROGRESS</span><h3>精进</h3><p>永葆好奇心，不怕折腾；不断复盘、学习和优化，让今天比昨天进步一点。</p></article><article><span>04 / PROACTIVE</span><h3>主动</h3><p>不等待安排。主动发现问题、解决卡点，也把每一次任务都当作自己成长的机会。</p></article></div></section>

  <section className="inner-section soft"><div className="section-kicker">OUR JOURNEY</div><h2>发展历程</h2><div className="timeline">{journey.map(item=><article key={item[0]}><b>{item[0]}</b><p>{item[1]}</p></article>)}</div></section>

  <section className="inner-section"><div className="section-kicker">LEADERSHIP</div><h2>核心团队</h2><div className="people-grid">{leaders.map(person=><article key={person[1]}><i>{person[0]}</i><h3>{person[1]}</h3><b>{person[2]}</b><p>{person[3]}</p></article>)}</div></section>

  <section className="photo-story"><ProgressiveImage src="/assets/team/office.jpg" optimizedBase="/assets/optimized/team/office" width={1672} height={941} sizes="(max-width: 900px) 50vw, 50vw" alt="事为电商办公环境"/><ProgressiveImage src="/assets/team/reception.png" optimizedBase="/assets/optimized/team/reception" width={2848} height={1600} sizes="(max-width: 900px) 50vw, 25vw" alt="事为电商与八千里路公司门头"/><ProgressiveImage src="/assets/team/team-cliff.jpg" optimizedBase="/assets/optimized/team/team-cliff" width={1600} height={900} sizes="(max-width: 900px) 50vw, 25vw" alt="海边团队团建"/><ProgressiveImage src="/assets/team/recognition-speech.jpg" optimizedBase="/assets/optimized/team/recognition-speech" width={2816} height={1584} sizes="(max-width: 900px) 50vw, 50vw" alt="员工表彰与分享"/></section>
  <section className="inner-section office-row"><div><b>福州办公室</b><p>福建省福州市闽侯县高新区创新园13栋歌航电子大厦301室</p></div><div><b>广州办公室</b><p>广东省广州市天河区白沙水路91号创兴港1栋305室</p></div></section>
</SiteFrame>; }
