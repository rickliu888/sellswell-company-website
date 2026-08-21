import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "事为电商 | 让世界重新认识中国品质",
  description: "事为电商连接中国优质供应链与全球市场，专注海外实战运营、AI系统提效、供应链协同与本地化履约。",
  icons: { icon: "/assets/brand/mark-color.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader/>{children}</body></html>;
}
