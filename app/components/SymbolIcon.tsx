type SymbolName = "global" | "ai" | "chain" | "local" | "research" | "content" | "supply" | "warehouse" | "factory" | "overseas" | "brand";

export default function SymbolIcon({ name }: { name: SymbolName }) {
  const paths: Record<SymbolName, React.ReactNode> = {
    global: <><circle cx="32" cy="32" r="23"/><path d="M9 32h46M32 9c8 7 12 15 12 23S40 48 32 55M32 9c-8 7-12 15-12 23s4 16 12 23M32 9v46"/></>,
    ai: <><rect x="15" y="15" width="34" height="34" rx="7"/><path d="M25 27h14v10H25zM23 8v7m9-7v7m9-7v7M23 49v7m9-7v7m9-7v7M8 23h7m-7 9h7m-7 9h7m34-18h7m-7 9h7m-7 9h7"/></>,
    chain: <><path d="M26 40l-5 5a10 10 0 01-14-14l9-9a10 10 0 0114 0M38 24l5-5a10 10 0 0114 14l-9 9a10 10 0 01-14 0M23 41l18-18"/></>,
    local: <><path d="M10 29L32 11l22 18M15 27v27h34V27M24 54V38h16v16M20 32h4m16 0h4"/></>,
    research: <><circle cx="27" cy="27" r="16"/><path d="M39 39l15 15M21 27h12m-6-6v12"/></>,
    content: <><rect x="8" y="12" width="48" height="34" rx="4"/><path d="M27 22l12 7-12 7zM23 54h18M32 46v8"/></>,
    supply: <><path d="M11 22l21-11 21 11-21 11zM11 22v22l21 10 21-10V22M32 33v21"/></>,
    warehouse: <><path d="M7 27L32 11l25 16v27H7zM16 54V32h32v22M16 40h32M25 32v22m14-22v22"/></>,
    factory: <><path d="M8 54V27l15 8V24l15 9V18h12v36zM14 45h5m7 0h5m7 0h5"/></>,
    overseas: <><circle cx="29" cy="32" r="21"/><path d="M8 32h42M29 11c7 7 10 14 10 21s-3 14-10 21M29 11c-7 7-10 14-10 21s3 14 10 21M44 16l11-6-4 12"/></>,
    brand: <><path d="M9 29h12l23-12v30L21 35H9zM21 35l4 14h-9l-4-14M50 24l6-4m-6 20l6 4"/></>,
  };
  return <svg className="card-symbol" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
