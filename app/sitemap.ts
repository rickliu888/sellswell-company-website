import type { MetadataRoute } from "next";

const siteUrl = "https://sellswell-company.jannica-8000.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/ai", "/business", "/careers", "/partners"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
