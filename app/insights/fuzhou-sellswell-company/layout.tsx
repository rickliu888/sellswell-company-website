import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/fuzhou-sellswell-company", title = "福州事为电子商务有限公司介绍", description = "了解福州事为电子商务有限公司（事为电商、福州事为）的公司定位、全球电商业务、团队理念及关联公司分工。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description)]}/>{children}</>}
