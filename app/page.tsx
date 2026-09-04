"use client";

import { useEffect, useRef, useState } from "react";
import SiteFooter from "./components/SiteFooter";
import SymbolIcon from "./components/SymbolIcon";
import ProgressiveImage from "./components/ProgressiveImage";

const pillars = [
  ["01", "海外实战运营", "Global Operations", "深耕东南亚，持续布局美国、欧洲与拉美市场。", "Proven operations across Southeast Asia, the US, Europe and Latin America.", "global"],
  ["02", "AI 系统提效", "AI-powered Efficiency", "将一线运营经验沉淀为内容与经营增长系统。", "Turning frontline expertise into intelligent content and operations systems.", "ai"],
  ["03", "供应链优势", "Supply Chain", "链接国内优质制造与海外本地工厂。", "Connecting quality Chinese manufacturing with local factories overseas.", "chain"],
  ["04", "本地化能力", "Localization", "覆盖海外仓储、履约、合规与市场洞察。", "Warehousing, fulfillment, compliance and insight for local markets.", "local"],
];

const copy = {
  zh: {
    nav: ["首页", "业务布局", "AI系统赋能", "供应链合作", "关于事为", "加入我们"],
    hero: <>让世界重新认识<br /><em>中国品质</em></>,
    intro: "事为电商连接中国优质供应链与全球市场，以本地化运营和高效履约，让兼具品质与价值的产品赢得全球消费者的长期信赖。",
    business: "了解业务布局", partner: "探索供应链合作",
  },
  en: {
    nav: ["Home", "Global Business", "AI Enablement", "Partnerships", "About", "Careers"],
    hero: <>Redefining the World&apos;s View of<br /><em>Quality from China</em></>,
    intro: "SellsWell connects quality Chinese supply chains with global markets through localized operations and efficient fulfillment, building lasting trust with consumers worldwide.",
    business: "Explore our business", partner: "Partner with us",
  }
};

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const contactTriggerRef = useRef<HTMLElement | null>(null);
  const t = copy[lang];

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    queueMicrotask(() => {
      if (stored === "zh" || stored === "en") setLang(stored);
      else if (!navigator.language.toLowerCase().startsWith("zh")) setLang("en");
    });
    const onLanguageChange = (event: Event) => setLang((event as CustomEvent<"zh" | "en">).detail);
    window.addEventListener("sellswell-language-change", onLanguageChange);
    return () => window.removeEventListener("sellswell-language-change", onLanguageChange);
  }, []);
  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactTriggerRef.current = document.activeElement as HTMLElement;
    document.querySelector<HTMLButtonElement>(".contact-modal .modal-close")?.focus();
    const close = () => { setContactOpen(false); requestAnimationFrame(() => contactTriggerRef.current?.focus()); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [contactOpen]);
  const copyValue = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value); setCopied(label); setTimeout(() => setCopied(""), 1800);
  };

  return <main>
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" /><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
      <div className="hero-copy"><p className="eyebrow"><span/> LINKING QUALITY TO THE WORLD</p><h1>{t.hero}</h1><p className="hero-description">{t.intro}</p>
        <div className="hero-actions"><a className="button primary" href="/business">{t.business}<span>↗</span></a><a className="button secondary" href="/partners">{t.partner}</a></div>
      </div>
      <div className="world-stage" aria-label="Global business network"><div className="globe"><div className="longitude l1"/><div className="longitude l2"/><div className="latitude a1"/><div className="latitude a2"/><span className="market-point asia"><i/>{lang==="zh"?"东南亚":"Southeast Asia"}<small>{lang==="zh"?"核心市场":"Core market"}</small></span><span className="market-point usa"><i/>{lang==="zh"?"美国":"USA"}<small>{lang==="zh"?"持续深耕":"Growing"}</small></span><span className="market-point brazil"><i/>{lang==="zh"?"巴西":"Brazil"}<small>{lang==="zh"?"正在布局":"Launching"}</small></span></div><p className="stage-caption">GLOBAL BUSINESS NETWORK <b>10+</b></p></div>
      <div className="hero-foot"><span>{lang==="zh"?"君行千里，万事可为":"Go far. Make great things possible."}</span><span className="scroll-hint">SCROLL <i/></span></div>
    </section>

    <section className="metrics"><article><strong>2022</strong><span>{lang==="zh"?"跨境项目启动":"Project launched"}</span></article><article><strong>5<sup>×</sup></strong><span>{lang==="zh"?"2025 GMV 同比增长":"2025 GMV growth"}</span></article><article><strong>1–2<small>亿</small></strong><span>{lang==="zh"?"2026 全球预估 GMV":"2026 estimated GMV (RMB)"}</span></article><article><strong>10<sup>+</sup></strong><span>{lang==="zh"?"已开展业务的国家":"Active markets"}</span></article></section>

    <section className="pillar-section" id="business"><div className="section-heading"><p className="eyebrow dark"><span/> OUR ENGINE</p><h2>{lang==="zh"?"四驾马车，驱动全球增长":"Four engines for global growth"}</h2><p>{lang==="zh"?"海外实战决定方向，AI系统提升效率，供应链提供好产品，本地化能力完成市场落地。":"Experience sets direction. AI drives efficiency. Supply chains deliver quality. Localization makes it work."}</p></div>
      <div className="pillar-grid">{pillars.map(p=><article className="pillar-card" key={p[0]}><span>{p[0]}</span><h3>{lang==="zh"?p[1]:p[2]}</h3><p>{lang==="zh"?p[3]:p[4]}</p><i>↗</i><SymbolIcon name={p[5] as "global" | "ai" | "chain" | "local"}/></article>)}</div>
    </section>

    <section className="ai-section" id="ai"><div className="ai-copy"><p className="eyebrow"><span/> AI ENABLEMENT</p><h2>{lang==="zh"?"让实战经验，沉淀为智能增长能力":"Turning experience into intelligent growth"}</h2><p>{lang==="zh"?"我们将海外运营经验与AI技术深度结合，持续提高内容生产、经营决策和规模化运营效率。":"We combine global operating experience with AI to improve content production, decision-making and scaled execution."}</p></div>
      <div className="systems">
        <article><div className="system-no">SYSTEM / 01</div><h3>星聚 <small>XINGJU</small></h3><p>{lang==="zh"?"全球社交媒体运营平台，覆盖矩阵账号、AI内容生成、智能发布与数据增长。":"A global social media operations platform for account matrices, AI content, publishing and analytics."}</p><a href="https://www.8000gp.com/" target="_blank" rel="noreferrer">{lang==="zh"?"访问星聚官网":"Visit Xingju"} ↗</a></article>
        <article><div className="system-no">SYSTEM / 02</div><h3>SOP <small>SELLSWELL</small></h3><p>{lang==="zh"?"源于一线业务的跨境电商精细化运营系统，覆盖商品、广告、数据预警与运营协同。":"A frontline operations system for product optimization, ads, analytics, alerts and team collaboration."}</p><a href="https://sop.sellswell.cn/" target="_blank" rel="noreferrer">{lang==="zh"?"进入运营系统":"Open SOP"} ↗</a></article>
      </div>
    </section>

    <section className="market-section"><div className="market-map"><span className="region r-sea">东南亚<b>CORE</b></span><span className="region r-usa">美国<b>GROWING</b></span><span className="region r-brasil">巴西<b>NEXT</b></span></div><div className="market-copy"><p className="eyebrow dark"><span/> GLOBAL FOOTPRINT</p><h2>{lang==="zh"?"立足东南亚，持续走向全球":"Built in Southeast Asia. Growing worldwide."}</h2><p>{lang==="zh"?"已开展菲律宾、泰国、马来西亚、印度尼西亚、新加坡、欧洲8国、美国与墨西哥市场，巴西布局正在推进。":"Active across Southeast Asia, eight European markets, the US and Mexico, with Brazil now launching."}</p><div className="market-tags"><span>SHOPEE</span><span>TIKTOK</span><span>LAZADA</span><span>AMAZON</span></div></div></section>

    <section className="partner-section" id="partners"><div className="partner-heading"><p className="eyebrow dark"><span/> GROW TOGETHER</p><h2>{lang==="zh"?"你专注做好产品，我们共同打开全球市场":"You make great products. Together, we open global markets."}</h2></div><div className="case-card"><div className="case-label">THAILAND / AUTOMOTIVE</div><div className="case-result"><strong>2<sup>×</sup></strong><span>{lang==="zh"?"合作次年销售额、毛利均翻倍":"Sales and profit in year two"}</span></div><div className="case-result"><strong>4<small>/5</small></strong><span>{lang==="zh"?"TikTok汽配垂类TOP 5中的合作品牌店":"Partner-operated stores in TikTok category Top 5"}</span></div><p>{lang==="zh"?"通过本地化内容、平台运营与品牌联合增长，帮助泰国本地汽配工厂成长为深受车主信赖的本土品牌。":"Localized content, platform operations and joint brand building helped a Thai factory become a trusted local automotive brand."}</p><button onClick={()=>setContactOpen(true)}>{lang==="zh"?"洽谈供应链合作":"Discuss a partnership"} ↗</button></div></section>

    <section className="team-section" id="about"><div className="team-images"><ProgressiveImage className="team-main" src="/assets/team/team-cliff-hd-16x9-v2.jpg" optimizedBase="/assets/optimized/team/team-cliff-hd-16x9-v2" width={2560} height={1440} sizes="(max-width: 1050px) 100vw, 55vw" alt="事为与八千里路团队海边山崖团建"/><ProgressiveImage className="team-small" src="/assets/team/team-coast.jpg" optimizedBase="/assets/optimized/team/team-coast" width={1600} height={900} sizes="(max-width: 1050px) 58vw, 25vw" alt="事为与八千里路团队团建"/></div><div className="team-copy"><p className="eyebrow dark"><span/> PEOPLE & CULTURE</p><h2 className={lang==="zh"?"team-title-zh":undefined}>{lang==="zh"?<>年轻、专业，<br/>一起把事情做成</>:"Young, professional and built to deliver"}</h2><p>{lang==="zh"?"我们来自互联网与跨境一线，相信长期主义，也愿意让优秀伙伴共享公司的长期成长。":"We come from frontline internet and global commerce teams, believe in long-term value, and share growth with exceptional people."}</p><a href="/about">{lang==="zh"?"走进事为团队":"Meet our team"} ↗</a></div></section>

    <section className="closing" id="careers"><div><span>FOR PARTNERS</span><h2>{lang==="zh"?"寻找全球增长机会？":"Ready for global growth?"}</h2><button onClick={()=>setContactOpen(true)}>{lang==="zh"?"洽谈商务合作":"Talk to us"} ↗</button></div><div><span>FOR TALENT</span><h2>{lang==="zh"?"寻找值得投入的事业？":"Build something that matters."}</h2><a href="/careers">{lang==="zh"?"加入事为":"Join SellsWell"} ↗</a></div></section>

    <SiteFooter lang={lang}/>

    <button className="floating-contact" onClick={()=>setContactOpen(true)} aria-label={lang==="zh"?"咨询合作":"Partner with SellsWell"}><span aria-hidden="true">🤝</span>{lang==="zh"?"咨询合作":"PARTNER WITH US"}</button>
    {contactOpen && <div className="modal-backdrop"><div className="contact-modal" role="dialog" aria-modal="true" aria-label="联系我们"><button className="modal-close" onClick={()=>setContactOpen(false)} aria-label="关闭">×</button><p className="eyebrow dark"><span/> BUSINESS CONTACT</p><h2>{lang==="zh"?"微信咨询":"WeChat consultation"}</h2><ProgressiveImage src="/assets/contact/wechat-business.png" optimizedBase="/assets/optimized/contact/wechat-business" width={760} height={760} sizes="230px" alt="商务合作微信二维码"/><strong>{lang==="zh"?"请注明公司名称以及来意，谢谢":"Please include your company name and purpose."}</strong><div className="copy-row"><code>RickLiu1992</code><button onClick={()=>copyValue("RickLiu1992","微信号")}>{copied?`${copied}已复制`:lang==="zh"?"复制微信号":"Copy ID"}</button></div><a className="modal-email" href="mailto:business@sellswell.cn">business@sellswell.cn ↗</a></div></div>}
  </main>;
}
