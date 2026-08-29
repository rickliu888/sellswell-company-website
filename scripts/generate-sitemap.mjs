import { promises as fs } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const appRoot = join(projectRoot, "app");
const output = join(projectRoot, "public", "sitemap.xml");
const siteUrl = "https://www.sellswell.cn";
const lastmod = process.env.SITEMAP_LASTMOD || new Date().toISOString().slice(0, 10);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return files.flat();
}

const routes = (await walk(appRoot))
  .filter((file) => file.endsWith("/page.tsx"))
  .map((file) => {
    const directory = relative(appRoot, dirname(file));
    return directory ? `/${directory}` : "/";
  })
  .filter((route) => !route.includes("[") && !route.startsWith("/api/"))
  .sort((a, b) => a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b));

function settings(route) {
  if (route === "/") return { changefreq: "weekly", priority: "1.0" };
  if (route === "/privacy" || route === "/terms") return { changefreq: "yearly", priority: "0.3" };
  if (route.startsWith("/insights/")) return { changefreq: "monthly", priority: "0.7" };
  return { changefreq: "monthly", priority: "0.8" };
}

const body = routes.map((route) => {
  const { changefreq, priority } = settings(route);
  const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}).join("\n");

await fs.writeFile(output, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`Generated sitemap with ${routes.length} canonical routes (${lastmod}).`);
