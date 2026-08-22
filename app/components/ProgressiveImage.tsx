"use client";

import { CSSProperties, useState } from "react";

type ProgressiveImageProps = {
  src: string;
  optimizedBase: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const widths = [480, 960, 1440, 1920];

export default function ProgressiveImage({
  src,
  optimizedBase,
  alt,
  width,
  height,
  className = "",
  sizes = "100vw",
  priority = false,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const available = widths.filter((candidate) => candidate <= width);
  const srcSet = available.map((candidate) => `${optimizedBase}-${candidate}.webp ${candidate}w`).join(", ");
  const style = {
    "--image-ratio": `${width} / ${height}`,
    "--image-placeholder": `url(${optimizedBase}-placeholder.webp)`,
  } as CSSProperties;

  return <span className={`progressive-image ${className}${loaded ? " is-loaded" : ""}`} style={style}>
    <picture>
      {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </picture>
  </span>;
}
