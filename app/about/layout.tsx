import { breadcrumbData, pageMetadata } from "../seo";
import StructuredData from "../components/StructuredData";
export const metadata = pageMetadata("/about", "关于事为与八千里路 | 福州事为电子商务有限公司", "了解福州事为电子商务有限公司与福州八千里路、广州八千里路两家关联公司的业务分工、发展历程与团队。");
export default function Layout({ children }: { children: React.ReactNode }) { return <><StructuredData data={breadcrumbData("/about", "关于事为与八千里路")}/>{children}</>; }
