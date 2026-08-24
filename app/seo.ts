import type { Metadata } from "next";

export const siteUrl = "https://www.sellswell.cn";

export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "事为电商 SellsWell",
      alternateName: ["福州事为", "事为电商", "事为", "SellsWell"],
      inLanguage: "zh-CN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "福州事为电子商务有限公司",
      alternateName: ["福州事为", "事为电商", "事为", "SellsWell"],
      url: siteUrl,
      logo: `${siteUrl}/assets/brand/logo-color.png`,
      email: "business@sellswell.cn",
      description: "事为官网及自营跨境电商主体，与福州八千里路电子商务有限公司、广州八千里路信息科技有限公司为关联公司并由同一团队协同运营。",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CN",
        addressRegion: "福建省",
        addressLocality: "福州市",
        streetAddress: "闽侯县高新区创新园13栋歌航电子大厦301室",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#fuzhou-8000-miles`,
      name: "福州八千里路电子商务有限公司",
      alternateName: ["福州八千里路", "八千里路电商", "八千里路"],
      description: "事为的关联公司，由同一团队协同运营，负责国内与海外供应链合作。",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#guangzhou-8000-miles`,
      name: "广州八千里路信息科技有限公司",
      alternateName: ["广州八千里路", "八千里路", "8000 Miles"],
      description: "事为的关联公司，由同一团队协同运营，聚焦欧美电商运营、AI应用、内容增长及海外市场业务。",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CN",
        addressRegion: "广东省",
        addressLocality: "广州市",
        streetAddress: "天河区白沙水路91号创兴港1栋305室",
      },
    },
  ],
};

export function breadcrumbData(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: siteUrl },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

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
      images: [{ url: `${siteUrl}/assets/brand/sellswell-social-cover-v2.jpg`, width: 1200, height: 630, alt: "事为电商 SellsWell 品牌标志" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/assets/brand/sellswell-social-cover-v2.jpg`],
    },
  };
}
