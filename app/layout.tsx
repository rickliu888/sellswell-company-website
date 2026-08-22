import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { pageMetadata, siteUrl } from "./seo";

export const metadata: Metadata = {
  ...pageMetadata("/", "事为电商 SellsWell | 让世界重新认识中国品质", "事为电商连接中国优质供应链与全球市场，专注海外实战运营、AI系统提效、供应链协同与本地化履约。"),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/assets/brand/favicon-mark-v2.png", type: "image/png", sizes: "764x764" }],
    shortcut: "/assets/brand/favicon-mark-v2.png",
    apple: "/assets/brand/favicon-mark-v2.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader/>{children}</body></html>;
}
