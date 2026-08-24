"use client";
import SiteFrame,{PageHero} from "../components/SiteFrame";
import useLanguage from "../components/useLanguage";
export default function Terms(){const en=useLanguage()==="en";return <SiteFrame active="terms"><PageHero eyebrow="TERMS OF USE" title={en?"Terms of Use":"网站使用条款"} description={en?"Terms governing access to and use of the SellsWell corporate website.":"访问和使用事为电商官方网站前，请阅读以下条款。"}/><article className="inner-section legal-copy"><p className="legal-updated">{en?"Effective date: August 22, 2026":"生效日期：2026年8月22日"}</p>{(en?[
 ["1. Acceptance","By accessing this website, you agree to use it lawfully and in accordance with these terms. If you do not agree, please discontinue use."],
 ["2. Website information","This website provides corporate, business, partnership and recruitment information for general reference. Forward-looking statements, estimates, market plans and historical performance do not guarantee future results. Specific cooperation, employment or service arrangements are governed by separately executed agreements."],
 ["3. Intellectual property","Unless otherwise stated, website text, visual design, logos, graphics, video and other materials are owned by or licensed to SellsWell and its affiliated entities. You may view and share links for legitimate non-commercial purposes, but may not reproduce, modify, publish or commercially use website materials without prior authorization."],
 ["4. Acceptable use","You may not interfere with website security or availability, attempt unauthorized access, introduce malicious code, scrape at a harmful scale, impersonate another person or use website content unlawfully or misleadingly."],
 ["5. Third-party links","Links to Xingju, SellsWell SOP, email clients and other third-party services are provided for convenience. We do not control and are not responsible for their availability, security, content or privacy practices."],
 ["6. Disclaimer and liability","We make reasonable efforts to keep information accurate and the website available, but do not guarantee uninterrupted or error-free operation. To the extent permitted by law, we are not liable for indirect loss arising solely from reliance on general website information or third-party services."],
 ["7. Changes","We may update website content and these terms. Continued use after an update constitutes acceptance of the revised terms."],
 ["8. Governing law and contact","These terms are governed by the laws of the People's Republic of China. Questions may be sent to business@sellswell.cn."]
]:[
 ["一、条款接受","访问本网站即表示您同意以合法方式并按照本条款使用网站。如您不同意，请停止使用。"],
 ["二、网站信息","本网站展示的公司、业务、合作与招聘信息仅供一般了解。前瞻性表述、预估数据、市场计划和历史业绩不构成对未来结果的保证。具体合作、劳动或服务关系以双方另行签署的协议为准。"],
 ["三、知识产权","除另有说明外，网站文字、视觉设计、商标标识、图片、视频及其他材料由事为电商及其关联主体拥有或经合法授权使用。您可以出于合法的非商业目的浏览和分享网页链接，但未经授权不得复制、修改、发布或商业使用网站材料。"],
 ["四、合理使用","您不得干扰网站安全或可用性、尝试未经授权的访问、植入恶意代码、进行影响网站运行的大规模抓取、冒充他人，或以违法、误导性方式使用网站内容。"],
 ["五、第三方链接","网站提供星聚、SellsWell SOP、邮件客户端及其他第三方服务链接，仅为方便访问。我们无法控制并不对第三方服务的可用性、安全性、内容或隐私实践承担责任。"],
 ["六、免责声明与责任限制","我们会合理努力保证信息准确和网站正常运行，但不保证网站始终不中断或完全无错误。在法律允许的范围内，我们不对仅因依赖网站一般信息或使用第三方服务所产生的间接损失承担责任。"],
 ["七、条款变更","我们可能更新网站内容和本条款。更新后继续使用网站，即视为接受修订后的条款。"],
 ["八、适用法律与联系","本条款适用中华人民共和国法律。如有疑问，请联系 business@sellswell.cn。"]
]).map(x=><section key={x[0]}><h2>{x[0]}</h2><p>{x[1]}</p></section>)}</article></SiteFrame>}
