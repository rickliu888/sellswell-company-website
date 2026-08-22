import Link from "next/link";

export default function SiteFooter({lang="zh"}:{lang?:"zh"|"en"}){
  return <footer>
    <Link className="site-footer-logo" href="/" aria-label="返回首页"><img src="/assets/brand/logo-white.png" width="490" height="134" loading="lazy" decoding="async" alt="SellsWell"/></Link>
    <p>{lang==="zh"?"链接全球，让好产品被世界看见。":"Connecting quality products with the world."}</p>
    <div className="footer-contact"><span>{lang==="zh"?"商务合作":"BUSINESS"} <a href="mailto:rick@sellswell.cn">rick@sellswell.cn</a></span><span>{lang==="zh"?"加入我们":"CAREERS"} <a href="mailto:jennyyao@sellswell.cn">jennyyao@sellswell.cn</a></span></div>
    <div className="addresses"><span>福州｜福建省福州市闽侯县高新区创新园13栋歌航电子大厦301室</span><span>广州｜广东省广州市天河区白沙水路91号创兴港1栋305室</span></div>
    <div className="copyright">© 2026 福州事为电子商务有限公司 <span>www.sellswell.cn</span></div>
  </footer>
}
