"use client";
import SiteFrame,{PageHero} from "../components/SiteFrame";
import useLanguage from "../components/useLanguage";
export default function Privacy(){const en=useLanguage()==="en";return <SiteFrame active="privacy"><PageHero eyebrow="PRIVACY POLICY" title={en?"Privacy Policy":"隐私政策"} description={en?"How SellsWell handles information associated with this corporate website.":"了解事为电商官网如何处理与保护相关信息。"}/><article className="inner-section legal-copy"><p className="legal-updated">{en?"Effective date: August 22, 2026":"生效日期：2026年8月22日"}</p>{(en?[
  ["1. Scope","This policy applies to the official SellsWell corporate website at www.sellswell.cn. It does not apply to third-party websites or systems linked from this website, which are governed by their own policies."],
  ["2. Information we process","The current website does not require account registration and does not directly collect payment information. When you contact us by email or WeChat, or submit a resume through your email client, we process the information you voluntarily provide, such as your name, contact details, company, inquiry and resume. Hosting and security providers may also process basic technical logs such as IP address, browser type, access time and requested page for security and reliable operation."],
  ["3. How we use information","We use information to respond to business inquiries, evaluate employment applications, maintain website security, troubleshoot issues and comply with applicable legal obligations. We do not sell personal information."],
  ["4. Sharing and service providers","We may share necessary information with affiliated entities involved in the relevant business or recruitment process and with hosting, email, security and technical service providers acting under appropriate obligations. We may also disclose information where required by law or competent authorities."],
  ["5. Retention and security","We retain information only for as long as reasonably necessary for the relevant inquiry, recruitment process, legal obligation or security purpose. We use reasonable administrative and technical safeguards, but no internet transmission or storage method is completely secure."],
  ["6. Your choices and rights","Subject to applicable law, you may request access, correction or deletion of personal information you provided, or withdraw consent where processing relies on consent. Contact us using the details below. Certain information may need to be retained where required by law."],
  ["7. Minors","This corporate website is not directed to children. If you believe a minor has provided personal information without appropriate guardian authorization, please contact us."],
  ["8. Updates","We may update this policy to reflect changes to the website, our practices or legal requirements. The latest version and effective date will be published on this page."],
  ["9. Contact","Fuzhou SellsWell E-commerce Co., Ltd. · Business: rick@sellswell.cn · Recruitment: jennyyao@sellswell.cn"]
]:[
  ["一、适用范围","本政策适用于事为电商官方网站 www.sellswell.cn。网站所链接的第三方网站或系统适用其各自的隐私规则，本政策不适用于该等第三方服务。"],
  ["二、我们处理的信息","当前官网无需注册账号，也不会直接收集支付信息。当您通过电子邮件或微信联系我们，或通过自己的邮件客户端投递简历时，我们会处理您主动提供的信息，例如姓名、联系方式、公司名称、咨询内容及简历信息。为保障网站安全和稳定运行，托管及安全服务商也可能处理IP地址、浏览器类型、访问时间、请求页面等基础技术日志。"],
  ["三、信息使用目的","我们仅将相关信息用于回复商务咨询、处理招聘申请、保障网站安全、排查技术问题以及履行适用的法律义务。我们不会出售个人信息。"],
  ["四、共享与服务商","在必要范围内，我们可能与参与相关业务或招聘流程的关联主体，以及提供托管、邮件、安全和技术支持的服务商共享信息；相关接收方应承担相应的信息保护义务。法律法规或有权机关要求时，我们也可能依法提供信息。"],
  ["五、保存与安全","我们仅在完成相关咨询、招聘流程、法律义务或安全目的所合理必要的期限内保存信息，并采取合理的管理和技术措施保护信息。但任何互联网传输或存储方式都无法保证绝对安全。"],
  ["六、您的权利","在适用法律规定的范围内，您可以请求查阅、更正或删除您提供的个人信息，或者在处理基于同意时撤回同意。您可以通过下方联系方式提出请求；法律要求保留的信息可能无法立即删除。"],
  ["七、未成年人","本网站是企业官方网站，不以未成年人为主要服务对象。如您认为未成年人未经适当监护人授权向我们提供了个人信息，请联系我们。"],
  ["八、政策更新","我们可能根据网站功能、业务实践或法律要求的变化更新本政策，并在本页面公布最新版本与生效日期。"],
  ["九、联系我们","福州事为电子商务有限公司 · 商务邮箱：rick@sellswell.cn · 招聘邮箱：jennyyao@sellswell.cn"]
]).map(x=><section key={x[0]}><h2>{x[0]}</h2><p>{x[1]}</p></section>)}</article></SiteFrame>}
