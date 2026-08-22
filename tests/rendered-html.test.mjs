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
  assert.match(html, /<title>事为电商 \| 让世界重新认识中国品质<\/title>/);
  assert.match(html, /让世界重新认识/);
  assert.match(html, /type="image\/avif"/);
  assert.match(html, /type="image\/webp"/);
  assert.match(html, /loading="lazy"/);
});

test("keeps navigation, loading feedback, and cache policy configured", async () => {
  const [header, loading, image, video, worker, cache] = await Promise.all([
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/loading.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ProgressiveImage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/VideoPlaceholder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
  ]);
  assert.match(header, /router\.prefetch\(href\)/);
  assert.match(header, /requestIdleCallback/);
  assert.match(header, /onPointerDown/);
  assert.match(header, /\["\/", "首页", "Home"\]/);
  assert.match(loading, /route-loading/);
  assert.match(image, /image\/avif/);
  assert.match(image, /imageRef\.current\?\.complete/);
  assert.match(image, /fetchPriority=\{priority \? "high" : "low"\}/);
  assert.match(video, /preload="none"/);
  assert.match(worker, /stale-while-revalidate=86400/);
  assert.match(cache, /max-age=31536000, immutable/);
});
