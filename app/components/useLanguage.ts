"use client";

import { useEffect, useState } from "react";

export type Language = "zh" | "en";

export default function useLanguage() {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    queueMicrotask(() => {
      if (stored === "zh" || stored === "en") setLang(stored);
      else if (!navigator.language.toLowerCase().startsWith("zh")) setLang("en");
    });
    const update = (event: Event) => setLang((event as CustomEvent<Language>).detail);
    window.addEventListener("sellswell-language-change", update);
    return () => window.removeEventListener("sellswell-language-change", update);
  }, []);

  return lang;
}
