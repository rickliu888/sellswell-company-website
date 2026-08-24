import { breadcrumbData, pageMetadata } from "../seo";
import StructuredData from "../components/StructuredData";
export const metadata = pageMetadata("/insights", "事为资讯 | 福州事为与八千里路电商", "事为资讯提供福州事为、事为电商、福州八千里路、八千里路电商的公司介绍、关联关系、全球业务与供应链合作信息。");
export default function Layout({ children }: { children: React.ReactNode }) { return <><StructuredData data={breadcrumbData("/insights", "事为资讯")}/>{children}</>; }
