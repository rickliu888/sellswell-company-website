const siteId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID?.trim();

export default function BaiduAnalytics() {
  if (!siteId || !/^[a-f0-9]{32}$/i.test(siteId)) return null;
  return <script async src={`https://hm.baidu.com/hm.js?${siteId}`} data-provider="baidu-analytics" />;
}
