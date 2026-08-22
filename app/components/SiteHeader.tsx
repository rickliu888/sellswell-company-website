"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";

const nav = [
  ["/", "首页"],
  ["/business", "业务布局"],
  ["/ai", "AI系统赋能"],
  ["/partners", "供应链合作"],
  ["/about", "关于事为"],
  ["/careers", "加入我们"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const stored = localStorage.getItem("sellswell-language");
    if (stored === "zh" || stored === "en") setLang(stored);
    else if (!navigator.language.toLowerCase().startsWith("zh")) setLang("en");
  }, []);

  useEffect(() => {
    const update = () => {
      const active = navRef.current?.querySelector<HTMLElement>("a.active");
      if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth, ready: true });
    };
    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    return () => { window.removeEventListener("resize", update); observer.disconnect(); };
  }, [pathname]);

  const toggleLanguage = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    localStorage.setItem("sellswell-language", next);
    window.dispatchEvent(new CustomEvent("sellswell-language-change", { detail: next }));
  };

  const style = {
    "--indicator-left": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
  } as CSSProperties;

  return <header className="nav-shell">
    <Link className="brand" href="/" prefetch aria-label="返回事为电商首页"><img src="/assets/brand/logo-white.png" width="490" height="134" fetchPriority="high" decoding="async" alt="事为电商 SellsWell E-commerce" /></Link>
    <nav ref={navRef} className={menuOpen ? "mobile-open" : ""} aria-label="主导航">
      {nav.map(([href, label]) => <Link className={pathname === href ? "active" : ""} href={href} prefetch={false} key={href} onMouseEnter={() => router.prefetch(href)} onFocus={() => router.prefetch(href)} onClick={() => setMenuOpen(false)}>{label}</Link>)}
      <i className={`nav-indicator${indicator.ready ? " ready" : ""}`} style={style} aria-hidden="true" />
    </nav>
    <button className="language" type="button" onClick={toggleLanguage}>{lang === "zh" ? "中 / EN" : "EN / 中"}</button>
    <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航"><i/><i/></button>
  </header>;
}
