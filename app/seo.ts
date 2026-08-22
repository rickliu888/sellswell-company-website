import type { Metadata } from "next";

export const siteUrl = "https://www.sellswell.cn";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "事为电商 SellsWell",
      title,
      description,
      url,
      images: [{ url: `${siteUrl}/assets/brand/sellswell-social-cover.png`, width: 1200, height: 630, alt: "事为电商｜让世界重新认识中国品质" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/assets/brand/sellswell-social-cover.png`],
    },
  };
}
