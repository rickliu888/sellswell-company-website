import SiteFrame from "../components/SiteFrame";
import ProgressiveImage from "../components/ProgressiveImage";
import type { Article } from "./articles";

export default function ArticlePage({ article }: { article: Article }) {
  return <SiteFrame active="insights">
    <article className="insight-article">
      <header className="insight-hero">
        <p>{article.eyebrow} · 事为资讯</p>
        <h1>{article.title}</h1>
        <div><time dateTime="2026-08-24">2026.08.24</time><span>福州事为电子商务有限公司</span></div>
      </header>
      <div className="article-layout">
        <aside aria-label="文章目录"><b>本文内容</b>{article.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2,"0")} · {section.heading}</a>)}</aside>
        <div className="article-body">
          <p className="article-lead">{article.lead}</p>
          {article.gallery && <div className="article-gallery" aria-label="福州事为与八千里路办公环境">{article.gallery.map((image) => <figure key={image.src}><ProgressiveImage src={image.src} optimizedBase={image.optimizedBase} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 900px) 100vw, 760px"/><figcaption>{image.caption}</figcaption></figure>)}</div>}
          {article.mapLinks && <nav className="article-map-links" aria-label="百度地图企业位置"><b>百度地图已收录</b>{article.mapLinks.map((item) => <a href={item.href} target="_blank" rel="noopener noreferrer" key={item.href}>{item.label} ↗</a>)}</nav>}
          {article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><span>{String(index + 1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <div className="article-related"><b>继续了解事为与八千里路</b>{article.related.map((item) => <a href={item.href} key={item.href}>{item.label} ↗</a>)}</div>
          <a className="back-to-insights" href="/insights">← 返回事为资讯</a>
        </div>
      </div>
    </article>
  </SiteFrame>;
}
