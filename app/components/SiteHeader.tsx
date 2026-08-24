"use client";
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Native navigation avoids vinext's broken RSC prefetch; the 39 KB logo is already optimized. */

import { usePathname } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { applyLanguageMetadata } from "./useLanguage";

const nav = [
  ["/", "首页", "Home"],
  ["/business", "业务布局", "Global Business"],
  ["/ai", "AI系统赋能", "AI Enablement"],
  ["/partners", "供应链合作", "Partnerships"],
  ["/about", "关于事为", "About"],
  ["/insights", "事为资讯", "Insights"],
  ["/careers", "加入我们", "Careers"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    queueMicrotask(() => {
      const initial = stored === "zh" || stored === "en" ? stored : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
      setLang(initial);
      if (initial === "en") applyLanguageMetadata(initial);
    });
  }, []);

  useEffect(() => {
    const update = () => {
      const active = navRef.current?.querySelector<HTMLElement>("a.active");
      if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth, ready: true });
    };
    queueMicrotask(update);
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    return () => { window.removeEventListener("resize", update); observer.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    const prefetchLinks = nav.filter(([href]) => href !== pathname).map(([href]) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      link.as = "document";
      document.head.appendChild(link);
      return link;
    });
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/assets/site-sw.js", { scope: "/" }).catch(() => undefined);
    return () => prefetchLinks.forEach((link) => link.remove());
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const toggleLanguage = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    localStorage.setItem("sellswell-language", next);
    applyLanguageMetadata(next);
    window.dispatchEvent(new CustomEvent("sellswell-language-change", { detail: next }));
  };

  const style = {
    "--indicator-left": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
  } as CSSProperties;

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return <><header className="nav-shell">
    <a className="brand" href="/" aria-label={lang === "zh" ? "返回事为电商首页" : "Return to SellsWell home"}><img src="/assets/brand/logo-white.png?v=20260822-2" width="2235" height="764" fetchPriority="high" decoding="async" alt="事为电商 SellsWell E-commerce" /></a>
    <nav id="site-navigation" ref={navRef} className={menuOpen ? "mobile-open" : ""} aria-label={lang === "zh" ? "主导航" : "Main navigation"}>
      {nav.map(([href, zh, en]) => <a className={pathname === href || (href === "/insights" && pathname.startsWith("/insights/")) ? "active" : ""} href={href} key={href} onClick={() => closeMenu()}>{lang === "zh" ? zh : en}</a>)}
      <i className={`nav-indicator${indicator.ready ? " ready" : ""}`} style={style} aria-hidden="true" />
    </nav>
    <button className="language" type="button" onClick={toggleLanguage}>{lang === "zh" ? "中 / EN" : "EN / 中"}</button>
    <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={lang === "zh" ? (menuOpen ? "关闭导航" : "打开导航") : (menuOpen ? "Close navigation" : "Open navigation")}><i/><i/></button>
  </header>{menuOpen && <button className="menu-backdrop" type="button" tabIndex={-1} onClick={() => closeMenu(true)} aria-label={lang === "zh" ? "关闭导航遮罩" : "Close navigation overlay"} />}</>;
}
