"use client";
import SiteFrame,{PageHero} from "../components/SiteFrame";
import SymbolIcon from "../components/SymbolIcon";
import useLanguage from "../components/useLanguage";
const steps=[
  ["01","市场与选品","Market & Product Selection","基于真实销售数据与本地需求判断机会。","Identify opportunities through real sales data and local demand.","research"],
  ["02","平台与内容","Platforms & Content","覆盖店铺、短视频、直播及广告精细化运营。","Operate stores, short video, livestreaming and advertising with precision.","content"],
  ["03","供应与备货","Supply & Inventory","协同国内制造与海外本地工厂组织供给。","Coordinate Chinese manufacturing and local overseas factories.","supply"],
  ["04","仓储与合规","Warehousing & Compliance","通过海外仓、本地履约和合规能力保障交付。","Safeguard delivery through overseas warehousing, local fulfillment and compliance.","warehouse"],
] as const;
export default function Business(){const en=useLanguage()==="en";return <SiteFrame active="business">
  <PageHero eyebrow="GLOBAL BUSINESS" title={en?"Built in Southeast Asia. Growing worldwide.":"立足东南亚，持续走向全球"} description={en?"Built on real overseas operations, we develop platform, content, local fulfillment and compliance capabilities in priority markets.":"以真实海外经营为基础，在重点市场持续建立平台运营、内容增长、本地履约与合规能力。"}/>
  <section className="inner-section"><div className="section-kicker">01 / KEY REGIONS</div><h2>{en?"Three priority regions, one clear global roadmap":"三大重点区域，清晰推进全球布局"}</h2><div className="region-cards"><article className="featured"><b>CORE MARKET</b><h3>{en?"Southeast Asia":"东南亚"}</h3><p>{en?"Philippines, Thailand, Malaysia, Indonesia and Singapore":"菲律宾、泰国、马来西亚、印度尼西亚、新加坡"}</p><span>Shopee · TikTok · Lazada</span></article><article><b>GROWING</b><h3>{en?"United States":"美国"}</h3><p>{en?"Deepening localized operations and brand growth capabilities":"持续深化本地化运营与品牌增长能力"}</p><span>Amazon · TikTok</span></article><article><b>LAUNCHING</b><h3>{en?"Brazil":"巴西"}</h3><p>{en?"Building market, channel and local fulfillment capabilities":"正在推进市场、渠道与本地履约布局"}</p><span>NEXT GROWTH MARKET</span></article></div></section>
  <section className="inner-section soft"><div className="split-title"><div><div className="section-kicker">02 / FOOTPRINT</div><h2>{en?"Markets where we operate":"已开展业务的全球市场"}</h2></div><p>{en?"Our European operations cover Germany, the United Kingdom, France, Italy, Russia, Spain, the Netherlands and Switzerland. We also operate in the United States and Mexico, with plans to expand into Australia and additional South American markets.":"欧洲覆盖德国、英国、法国、意大利、俄罗斯、西班牙、荷兰与瑞士；同时已开展美国、墨西哥业务，并计划拓展澳大利亚及南美其他国家。"}</p></div><div className="market-list"><span>{en?"5 Southeast Asian markets":"东南亚 5 国"}</span><span>{en?"8 European markets":"欧洲 8 国"}</span><span>{en?"United States":"美国"}</span><span>{en?"Mexico":"墨西哥"}</span><span className="next">{en?"Brazil · Launching":"巴西 · 正在布局"}</span></div></section>
  <section className="inner-section"><div className="section-kicker">03 / OPERATING MODEL</div><h2>{en?"A complete operating loop, from selection to fulfillment":"从选品到履约，构建完整经营闭环"}</h2><div className="step-grid">{steps.map(x=><article key={x[0]}><b>{x[0]}</b><h3>{en?x[2]:x[1]}</h3><p>{en?x[4]:x[3]}</p><SymbolIcon name={x[5]}/></article>)}</div></section>
</SiteFrame>}
