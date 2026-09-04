import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the SellsWell homepage and progressive media", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>福州事为电商官网 \| 事为与八千里路<\/title>/);
  assert.match(html, /让世界重新认识/);
  assert.match(html, /福州事为电子商务有限公司/);
  assert.match(html, /福州八千里路电子商务有限公司/);
  assert.match(html, /广州八千里路信息科技有限公司/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/schema\.org/);
  assert.match(html, /type="image\/avif"/);
  assert.match(html, /type="image\/webp"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /sellswell-social-cover-v2\.jpg/);
});

test("publishes canonical brand pages and current sitemap metadata", async () => {
  const [aboutResponse, sitemap] = await Promise.all([
    render("/about"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);
  const about = await aboutResponse.text();
  assert.equal(aboutResponse.status, 200);
  assert.match(about, /<title>关于事为与八千里路 \| 福州事为电子商务有限公司<\/title>/);
  assert.match(about, /BreadcrumbList/);
  assert.match(about, /关联公司与业务分工/);
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  assert.match(sitemap, /\/insights\/fuzhou-cross-border-ecommerce-supply-chain/);
  assert.match(sitemap, /\/insights\/join-fuzhou-sellswell-ecommerce/);
});

test("keeps the Baidu site-verification file at the public root", async () => {
  const verification = await readFile(new URL("../public/baidu_verify_codeva-LxjcmsW6Ly.html", import.meta.url), "utf8");
  assert.equal(verification.trim(), "67b39cbe34da60c08a107d6dcd65369e");
});

test("keeps reliable navigation, accessible mobile controls, and cache policy configured", async () => {
  const [header, loading, image, video, worker, cache] = await Promise.all([
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/loading.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProgressiveImage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/VideoPlaceholder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(header, /next\/link|router\.prefetch/);
  assert.match(header, /<a className=\{pathname === href/);
  assert.match(header, /aria-expanded=\{menuOpen\}/);
  assert.match(header, /event\.key !== "Escape"/);
  assert.match(header, /document\.body\.style\.overflow = "hidden"/);
  assert.match(header, /className="menu-backdrop"/);
  assert.match(header, /onClick=\{\(\) => closeMenu\(true\)\}/);
  assert.doesNotMatch(header, /is-navigating|setNavigating/);
  assert.match(header, /link\.rel = "prefetch"/);
  assert.match(header, /serviceWorker\.register\("\/assets\/site-sw\.js"/);
  assert.match(header, /\["\/", "首页", "Home"\]/);
  assert.doesNotMatch(header, /\["\/insights", "事为资讯", "Insights"\]/);
  assert.match(loading, /route-loading/);
  assert.match(image, /image\/avif/);
  assert.match(image, /imageRef\.current\?\.complete/);
  assert.match(image, /fetchPriority=\{priority \? "high" : "low"\}/);
  assert.match(video, /preload="none"/);
  assert.match(worker, /stale-while-revalidate=86400/);
  assert.match(cache, /max-age=31536000, immutable/);
  assert.match(cache, /Service-Worker-Allowed: \//);
});

test("caches visited tab pages for instant repeat navigation", async () => {
  const sw = await readFile(new URL("../public/assets/site-sw.js", import.meta.url), "utf8");
  assert.match(sw, /const ROUTES = \["\/", "\/business", "\/ai"/);
  assert.match(sw, /event\.request\.mode !== "navigate"/);
  assert.match(sw, /caches\.match\(url\.pathname\)/);
  assert.match(sw, /response \|\| refresh/);
});

test("balances footer content on desktop and stacks it on mobile", async () => {
  const [footer, css] = await Promise.all([
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(footer, /className="footer-primary"/);
  assert.match(footer, /className="footer-secondary"/);
  assert.match(footer, /闽ICP备2026030882号-1/);
  assert.match(footer, /https:\/\/beian\.miit\.gov\.cn\//);
  assert.match(footer, /className="footer-insights" href="\/insights"/);
  assert.match(css, /\.footer-legal \.footer-insights/);
  assert.match(css, /footer\{display:grid;grid-template-columns:/);
  assert.match(css, /@media\(max-width:800px\)\{footer\{display:block\}/);
});

test("production container includes public static assets", async () => {
  const dockerfile = await readFile(new URL("../Dockerfile.ecs", import.meta.url), "utf8");
  assert.match(dockerfile, /COPY --from=build \/app\/public \.\/public/);
  assert.match(dockerfile, /static-server\.mjs/);
});

test("cache-busts production media after the static asset recovery", async () => {
  const [image, video, header] = await Promise.all([
    readFile(new URL("../app/components/ProgressiveImage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/VideoPlaceholder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(image, /assetVersion = "20260822-2"/);
  assert.match(video, /shiwei-team-building\.mp4\?v=20260822-2/);
  assert.match(header, /logo-white\.png\?v=20260822-2/);
});

test("language switch updates document and social metadata", async () => {
  const language = await readFile(new URL("../app/components/useLanguage.ts", import.meta.url), "utf8");
  assert.match(language, /document\.documentElement\.lang/);
  assert.match(language, /meta\[property="og:title"\]/);
  assert.match(language, /meta\[name="twitter:description"\]/);
  assert.match(language, /Global Business \| SellsWell E-commerce/);
});

test("provides a branded bilingual not-found page", async () => {
  const notFound = await readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8");
  assert.match(notFound, /404 · PAGE NOT FOUND/);
  assert.match(notFound, /没有找到这个页面/);
  assert.match(notFound, /This page could not be found/);
  assert.match(notFound, /href="\/"/);
});

test("uses the approved operations assistant job title", async () => {
  const careers = await readFile(new URL("../app/careers/page.tsx", import.meta.url), "utf8");
  assert.match(careers, /Shopee \/ TikTok 店铺运营助理/);
  assert.match(careers, /Shopee \/ TikTok Store Operations Assistant/);
  assert.doesNotMatch(careers, /店铺运营实习生|Store Operations Intern/);
});

test("publishes the brand insights hub and seven crawlable SEO articles", async () => {
  const routes = [
    ["/insights", /认识事为与八千里路/],
    ["/insights/fuzhou-sellswell-company", /福州事为电子商务有限公司介绍/],
    ["/insights/sellswell-and-8000-miles", /事为与八千里路是什么关系/],
    ["/insights/fuzhou-8000-miles-company", /福州八千里路电子商务有限公司业务介绍/],
    ["/insights/fuzhou-office-location", /福州事为与八千里路办公地址及办公环境/],
    ["/insights/sellswell-global-ecommerce", /事为电商的跨境电商与供应链业务/],
    ["/insights/fuzhou-cross-border-ecommerce-supply-chain", /福州跨境电商供应链合作/],
    ["/insights/join-fuzhou-sellswell-ecommerce", /加入福州事为电商/],
  ];
  for (const [route, pattern] of routes) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, pattern);
    assert.match(html, /canonical/);
  }
  const article = await (await render("/insights/sellswell-and-8000-miles")).text();
  assert.match(article, /Article/);
  assert.match(article, /BreadcrumbList/);
  const office = await (await render("/insights/fuzhou-office-location")).text();
  assert.match(office, /歌航电子大厦301室/);
  assert.match(office, /sellswell-8000-miles-office-301/);
  const about = await (await render("/about")).text();
  assert.match(about, /FAQPage/);
  assert.match(about, /事为电商是谁/);
});

test("connects company entities and topic pages with crawlable structured data and internal links", async () => {
  const home = await (await render("/")).text();
  assert.doesNotMatch(home, /事为与八千里路，同一团队协同全球业务/);
  assert.match(home, /href="\/about"/);
  assert.match(home, /href="\/insights"/);
  assert.match(home, /\+86-180-5019-2494/);
  assert.match(home, /https:\/\/www\.sellswell\.cn\/insights\/fuzhou-8000-miles-company/);
  assert.match(home, /hasMap/);
  assert.match(home, /map\.baidu\.com\/search\/福州事为电子商务有限公司/);
  assert.match(home, /map\.baidu\.com\/search\/福州八千里路电子商务有限公司/);

  const about = await (await render("/about")).text();
  assert.match(about, /福州事为电子商务有限公司/);
  assert.match(about, /福州八千里路电子商务有限公司/);
  assert.match(about, /广州八千里路信息科技有限公司/);

  const business = await (await render("/business")).text();
  assert.match(business, /href="\/insights\/sellswell-global-ecommerce"/);

  const partners = await (await render("/partners")).text();
  assert.match(partners, /href="\/insights\/fuzhou-8000-miles-company"/);
  assert.match(partners, /href="\/insights\/fuzhou-office-location"/);

  const office = await (await render("/insights/fuzhou-office-location")).text();
  assert.match(office, /百度地图已收录/);
  assert.match(office, /在百度地图查看福州事为电子商务有限公司/);
  assert.match(office, /在百度地图查看福州八千里路电子商务有限公司/);
});

test("generates sitemap before builds and keeps Baidu Analytics opt-in", async () => {
  const [packageJson, generator, analytics, staticServer] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/generate-sitemap.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BaiduAnalytics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../scripts/static-server.mjs", import.meta.url), "utf8"),
  ]);
  assert.match(packageJson, /"prebuild": "npm run sitemap"/);
  assert.match(generator, /page\.tsx/);
  assert.match(analytics, /NEXT_PUBLIC_BAIDU_ANALYTICS_ID/);
  assert.match(analytics, /\^\[a-f0-9\]\{32\}\$/i);
  assert.match(staticServer, /application\/xml/);
});
