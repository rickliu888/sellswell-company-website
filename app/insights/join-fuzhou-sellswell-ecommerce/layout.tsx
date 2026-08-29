import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/join-fuzhou-sellswell-ecommerce", title = "加入福州事为电商：团队文化、办公地点与招聘信息", description = "了解福州事为电商团队文化、福州办公地点、业务方向和当前招聘信息，认识事为与八千里路团队。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description,"2026-08-29")]}/>{children}</>}
