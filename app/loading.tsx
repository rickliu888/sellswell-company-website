export default function Loading() {
  return <main className="route-loading" aria-label="页面正在加载" aria-live="polite">
    <div className="route-loading-head"><span/><span/><span/><span/></div>
    <div className="route-loading-body">
      <span className="route-loading-kicker"/>
      <span className="route-loading-title"/>
      <span className="route-loading-title short"/>
      <span className="route-loading-copy"/>
      <span className="route-loading-copy short"/>
    </div>
  </main>;
}
