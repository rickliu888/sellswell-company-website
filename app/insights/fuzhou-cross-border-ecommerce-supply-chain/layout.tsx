import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/fuzhou-cross-border-ecommerce-supply-chain", title = "福州跨境电商供应链合作：事为与八千里路如何协同", description = "了解福州事为电商与福州八千里路如何连接产品供应、海外平台运营、内容增长及本地化履约。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description,"2026-08-29")]}/>{children}</>}
