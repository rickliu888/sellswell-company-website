import StructuredData from "../../components/StructuredData";
import { articleData, breadcrumbData, pageMetadata } from "../../seo";
const path = "/insights/fuzhou-office-location", title = "福州事为与八千里路办公地址及办公环境", description = "查看福州事为电子商务有限公司与福州八千里路电子商务有限公司的共同办公地址、301门牌及真实办公环境。";
export const metadata = pageMetadata(path, `${title} | 事为资讯`, description);
export default function Layout({children}:{children:React.ReactNode}){return <><StructuredData data={[breadcrumbData(path,title),articleData(path,title,description)]}/>{children}</>}
