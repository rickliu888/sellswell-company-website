"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";

const nav = [
  ["/", "首页", "Home"],
  ["/business", "业务布局", "Global Business"],
  ["/ai", "AI系统赋能", "AI Enablement"],
  ["/partners", "供应链合作", "Partnerships"],
  ["/about", "关于事为", "About"],
  ["/careers", "加入我们", "Careers"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    queueMicrotask(() => {
      const initial = stored === "zh" || stored === "en" ? stored : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
      setLang(initial);
      document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";
    });
  }, []);

  useEffect(() => {
    queueMicrotask(() => setNavigating(false));
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
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || connection?.effectiveType === "2g") return;
    const warmRoutes = () => nav.forEach(([href]) => href !== pathname && router.prefetch(href));
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(warmRoutes, { timeout: 2200 })
      : window.setTimeout(warmRoutes, 1200);
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [pathname, router]);

  const toggleLanguage = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    localStorage.setItem("sellswell-language", next);
    window.dispatchEvent(new CustomEvent("sellswell-language-change", { detail: next }));
  };

  const style = {
    "--indicator-left": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
  } as CSSProperties;

  return <header className={`nav-shell${navigating ? " is-navigating" : ""}`}>
    <Link className="brand" href="/" prefetch aria-label={lang === "zh" ? "返回事为电商首页" : "Return to SellsWell home"}><img src="/assets/brand/logo-white.png" width="2235" height="764" fetchPriority="high" decoding="async" alt="事为电商 SellsWell E-commerce" /></Link>
    <nav ref={navRef} className={menuOpen ? "mobile-open" : ""} aria-label={lang === "zh" ? "主导航" : "Main navigation"}>
      {nav.map(([href, zh, en]) => <Link className={pathname === href ? "active" : ""} href={href} prefetch={false} key={href} onMouseEnter={() => router.prefetch(href)} onPointerDown={() => router.prefetch(href)} onFocus={() => router.prefetch(href)} onClick={() => { setMenuOpen(false); if (pathname !== href) setNavigating(true); }}>{lang === "zh" ? zh : en}</Link>)}
      <i className={`nav-indicator${indicator.ready ? " ready" : ""}`} style={style} aria-hidden="true" />
    </nav>
    <button className="language" type="button" onClick={toggleLanguage}>{lang === "zh" ? "中 / EN" : "EN / 中"}</button>
    <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={lang === "zh" ? "打开导航" : "Open navigation"}><i/><i/></button>
  </header>;
}
