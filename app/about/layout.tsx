import { breadcrumbData, faqData, pageMetadata } from "../seo";
import StructuredData from "../components/StructuredData";
export const metadata = pageMetadata("/about", "关于事为与八千里路 | 福州事为电子商务有限公司", "了解福州事为电子商务有限公司与福州八千里路、广州八千里路两家关联公司的业务分工、发展历程与团队。");
const faqs = [
  { question: "事为电商是谁？", answer: "事为电商是福州事为电子商务有限公司使用的品牌简称。福州事为是官网及自营跨境电商主体。" },
  { question: "事为和八千里路是什么关系？", answer: "福州事为电子商务有限公司、福州八千里路电子商务有限公司和广州八千里路信息科技有限公司是关联公司，由同一团队协同运营。" },
  { question: "福州八千里路主要做什么？", answer: "福州八千里路电子商务有限公司主要负责国内与海外供应链合作，并与事为电商的海外市场运营能力协同推进项目。" },
  { question: "福州事为与福州八千里路在哪里办公？", answer: "两家公司共同在福建省福州市闽侯县高新区创新园13栋歌航电子大厦301室办公。" },
];
export default function Layout({ children }: { children: React.ReactNode }) { return <><StructuredData data={[breadcrumbData("/about", "关于事为与八千里路"),faqData(faqs)]}/>{children}</>; }
