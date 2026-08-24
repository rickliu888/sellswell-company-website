import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { pageMetadata, siteUrl } from "./seo";
import { organizationGraph } from "./seo";
import StructuredData from "./components/StructuredData";

export const metadata: Metadata = {
  ...pageMetadata("/", "福州事为电商官网 | 事为与八千里路", "福州事为电子商务有限公司官方网站。事为电商与福州八千里路、广州八千里路为关联公司、同一团队，协同开展跨境电商、供应链合作、AI内容增长及全球市场运营。"),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/assets/brand/favicon-mark-v2.png", type: "image/png", sizes: "764x764" }],
    shortcut: "/assets/brand/favicon-mark-v2.png",
    apple: "/assets/brand/favicon-mark-v2.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><StructuredData data={organizationGraph}/><SiteHeader/>{children}</body></html>;
}
