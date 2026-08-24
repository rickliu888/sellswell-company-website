import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/fuzhou-8000-miles-company", title = "福州八千里路电子商务有限公司业务介绍", description = "了解福州八千里路电子商务有限公司（福州八千里路、八千里路电商）的供应链合作定位及其与事为的关系。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description)]}/>{children}</>}
