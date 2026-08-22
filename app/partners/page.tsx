import SiteFrame, { PageHero } from "../components/SiteFrame";
import SymbolIcon from "../components/SymbolIcon";

export default function Partners() { return <SiteFrame active="partners">
  <PageHero eyebrow="SUPPLY CHAIN PARTNERSHIP" title={<>你专注做好产品，<br/>我们共同打开全球市场</>} description="面向国内优质工厂、海外本地工厂与品牌方，提供从市场判断到运营增长、从本地履约到长期品牌建设的合作能力。"/>
  <section className="inner-section"><div className="section-kicker">01 / WHO WE WORK WITH</div><h2>三类合作伙伴</h2><div className="three-grid"><article><b>中国优质工厂</b><p>工厂负责稳定供货与备货，事为负责海外市场运营与销售增长。</p><SymbolIcon name="factory"/></article><article><b>海外本地工厂</b><p>本地工厂提供产品与一件代发，事为承担电商运营，按约定周期结算。</p><SymbolIcon name="overseas"/></article><article><b>出海品牌方</b><p>结合星聚内容系统与本地化团队，提供海外品牌内容营销与增长支持。</p><SymbolIcon name="brand"/></article></div></section>
  <section className="inner-section dark-panel"><div><div className="section-kicker light">PROVEN CASE / THAILAND</div><h2>从汽配工厂，到泰国本土知名品牌</h2><p>通过本地化内容、平台精细运营与品牌联合增长，合作次年销售额、毛利均实现翻倍。</p></div><div className="case-numbers"><strong>2<sup>×</sup><small>销售额与毛利</small></strong><strong>4<small>/ 5</small><em>TikTok垂类TOP 5品牌店</em></strong></div></section>
  <section className="inner-section soft"><div className="section-kicker">02 / FOCUS CATEGORIES</div><h2>重点类目，也欢迎更多优质供应链</h2><div className="category-row"><span>汽摩配</span><span>家清用品</span><span>家居生活用品</span><span>文胸</span><span>其他优质供应链 +</span></div><div className="contact-band"><div><b>准备把好产品卖向全球？</b><p>欢迎与我们交流产品、产能与目标市场。</p></div><a href="mailto:rick@sellswell.cn?subject=供应链合作咨询">发起合作咨询 ↗</a></div></section>
</SiteFrame>; }
