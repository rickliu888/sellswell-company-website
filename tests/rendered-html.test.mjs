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
  assert.match(html, /<title>事为电商 SellsWell \| 让世界重新认识中国品质<\/title>/);
  assert.match(html, /让世界重新认识/);
  assert.match(html, /type="image\/avif"/);
  assert.match(html, /type="image\/webp"/);
  assert.match(html, /loading="lazy"/);
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
  assert.match(header, /\["\/", "首页", "Home"\]/);
  assert.match(loading, /route-loading/);
  assert.match(image, /image\/avif/);
  assert.match(image, /imageRef\.current\?\.complete/);
  assert.match(image, /fetchPriority=\{priority \? "high" : "low"\}/);
  assert.match(video, /preload="none"/);
  assert.match(worker, /stale-while-revalidate=86400/);
  assert.match(cache, /max-age=31536000, immutable/);
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
