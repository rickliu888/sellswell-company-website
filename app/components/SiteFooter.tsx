/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native navigation avoids vinext's broken RSC prefetch; the 39 KB logo is already optimized. */
export default function SiteFooter({lang="zh"}:{lang?:"zh"|"en"}){
  return <footer>
    <div className="footer-primary">
      <a className="site-footer-logo" href="/" aria-label={lang==="zh"?"返回首页":"Return home"}><img src="/assets/brand/logo-white.png?v=20260822-2" width="2235" height="764" loading="lazy" decoding="async" alt="SellsWell"/></a>
      <p>{lang==="zh"?"链接全球，让好产品被世界看见。":"Connecting quality products with the world."}</p>
      <div className="footer-contact"><span>{lang==="zh"?"商务合作":"BUSINESS"} <a href="mailto:rick@sellswell.cn">rick@sellswell.cn</a></span><span>{lang==="zh"?"加入我们":"CAREERS"} <a href="mailto:jennyyao@sellswell.cn">jennyyao@sellswell.cn</a></span></div>
    </div>
    <div className="footer-secondary">
      <div className="addresses"><span>{lang==="zh"?"福州｜福建省福州市闽侯县高新区创新园13栋歌航电子大厦301室":"Fuzhou | Room 301, Gehang Electronics Building, Innovation Park, Minhou County, Fuzhou, Fujian"}</span><span>{lang==="zh"?"广州｜广东省广州市天河区白沙水路91号创兴港1栋305室":"Guangzhou | Room 305, Building 1, Chuangxing Port, 91 Baishashui Road, Tianhe District, Guangzhou"}</span></div>
      <div className="footer-legal"><a href="/privacy">{lang==="zh"?"隐私政策":"Privacy Policy"}</a><a href="/terms">{lang==="zh"?"使用条款":"Terms of Use"}</a></div>
    </div>
    <div className="copyright">© 2026 {lang==="zh"?"福州事为电子商务有限公司":"Fuzhou SellsWell E-commerce Co., Ltd."} <span>www.sellswell.cn</span></div>
  </footer>
}
