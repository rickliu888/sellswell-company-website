"use client";

import { useEffect, useState } from "react";

export type Language = "zh" | "en";

const englishMetadata: Record<string, { title: string; description: string }> = {
  "/": { title: "SellsWell E-commerce | Redefining Quality from China", description: "SellsWell connects quality Chinese supply chains with global markets through localized operations, AI-powered efficiency and reliable fulfillment." },
  "/business": { title: "Global Business | SellsWell E-commerce", description: "Explore SellsWell's platform operations, content growth, local fulfillment and compliance capabilities across Southeast Asia, the US, Europe and Latin America." },
  "/ai": { title: "AI Enablement | SellsWell E-commerce", description: "Discover how Xingju and SellsWell SOP improve content, advertising, analytics and collaboration for global e-commerce." },
  "/partners": { title: "Partnerships | SellsWell E-commerce", description: "Partner with SellsWell to bring quality products and brands to global markets through localized operations, content growth and fulfillment." },
  "/about": { title: "About SellsWell | Global E-commerce Team", description: "Learn about SellsWell's journey, long-term values, leadership team and global vision." },
  "/careers": { title: "Careers | Join SellsWell", description: "Explore career opportunities, team culture, professional growth and benefits at SellsWell in Fuzhou and Guangzhou." },
  "/privacy": { title: "Privacy Policy | SellsWell E-commerce", description: "Learn how the SellsWell corporate website processes website access, contact and recruitment information." },
  "/terms": { title: "Terms of Use | SellsWell E-commerce", description: "Read the terms governing access to and use of the SellsWell corporate website." },
};

export function applyLanguageMetadata(lang: Language) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  if (lang !== "en") {
    window.location.reload();
    return;
  }
  const metadata = englishMetadata[window.location.pathname] ?? englishMetadata["/"];
  document.title = metadata.title;
  const update = (selector: string, value: string) => document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
  update('meta[name="description"]', metadata.description);
  update('meta[property="og:title"]', metadata.title);
  update('meta[property="og:description"]', metadata.description);
  update('meta[property="og:locale"]', "en_US");
  update('meta[name="twitter:title"]', metadata.title);
  update('meta[name="twitter:description"]', metadata.description);
}

export default function useLanguage() {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    queueMicrotask(() => {
      const initial = stored === "zh" || stored === "en" ? stored : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
      setLang(initial);
      if (initial === "en") applyLanguageMetadata(initial);
    });
    const update = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      setLang(next);
      applyLanguageMetadata(next);
    };
    window.addEventListener("sellswell-language-change", update);
    return () => window.removeEventListener("sellswell-language-change", update);
  }, []);

  return lang;
}
