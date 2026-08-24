import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/sellswell-and-8000-miles", title = "事为与八千里路是什么关系？", description = "说明事为、事为八千里路、福州八千里路及广州八千里路的关联关系、公司主体与业务分工。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description)]}/>{children}</>}
