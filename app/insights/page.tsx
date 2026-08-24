import SiteFrame from "../components/SiteFrame";
import { articles } from "./articles";

export default function Insights() {
  return <SiteFrame active="insights">
    <section className="insights-index-hero"><p>SELLSWELL INSIGHTS</p><h1>事为资讯</h1><span>了解福州事为、八千里路与我们的全球电商业务</span></section>
    <section className="insights-index"><div className="insights-heading"><div><span>COMPANY & BUSINESS</span><h2>认识事为与八千里路</h2></div><p>这里集中介绍公司主体、关联关系、业务分工和全球电商能力，帮助合作伙伴、求职者与搜索引擎准确理解事为团队。</p></div>
      <div className="insight-grid">{articles.map((article, index) => <article key={article.slug}><span>{String(index + 1).padStart(2,"0")} / {article.eyebrow}</span><h2><a href={`/insights/${article.slug}`}>{article.title}</a></h2><p>{article.description}</p><a href={`/insights/${article.slug}`}>阅读全文 ↗</a></article>)}</div>
    </section>
  </SiteFrame>;
}
