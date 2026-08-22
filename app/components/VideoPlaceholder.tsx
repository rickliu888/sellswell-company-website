/* eslint-disable jsx-a11y/media-has-caption -- The supplied film contains background music only and no speech. */
export default function VideoPlaceholder() {
  return <div className="about-video">
    <video controls preload="none" poster="/assets/optimized/team/team-coast-960.webp?v=20260822-2" playsInline aria-label="事为团队建设活动视频">
      <source src="/assets/video/shiwei-team-building.mp4?v=20260822-2" type="video/mp4"/>
      您的浏览器暂不支持视频播放。
    </video>
  </div>;
}
