import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/sellswell-global-ecommerce", title = "事为电商的跨境电商与供应链业务", description = "了解事为电商及八千里路团队如何通过全球平台运营、内容增长、AI系统、供应链与本地化履约推动业务增长。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description)]}/>{children}</>}
