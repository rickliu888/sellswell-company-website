"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids vinext's broken RSC prefetch. */

import SiteFrame, { PageHero } from "./components/SiteFrame";
import useLanguage from "./components/useLanguage";

export default function NotFound() {
  const en = useLanguage() === "en";

  return (
    <SiteFrame active="not-found">
      <PageHero
        eyebrow="404 · PAGE NOT FOUND"
        title={en ? "This page could not be found" : "没有找到这个页面"}
        description={en ? "The address may have changed or the page may no longer exist." : "页面地址可能已变更，或相关内容已被移除。"}
      />
      <section className="inner-section legal-copy">
        <h2>{en ? "Where would you like to go?" : "你可以从这里继续"}</h2>
        <p>{en ? "Return to the homepage or explore SellsWell's global business." : "返回官网首页，或继续了解事为的全球业务。"}</p>
        <div className="hero-actions">
          <a className="button primary" href="/">{en ? "Return home" : "返回首页"}<span>↗</span></a>
          <a className="button secondary" href="/business">{en ? "Explore our business" : "了解业务布局"}</a>
        </div>
      </section>
    </SiteFrame>
  );
}
