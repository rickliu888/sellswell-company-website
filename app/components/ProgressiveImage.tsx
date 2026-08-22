"use client";

import { CSSProperties, SyntheticEvent, useEffect, useRef, useState } from "react";

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
const assetVersion = "20260822-2";
const versioned = (url: string) => `${url}?v=${assetVersion}`;

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
  const imageRef = useRef<HTMLImageElement>(null);
  const available = widths.filter((candidate) => candidate <= width);
  const webpSrcSet = available.map((candidate) => `${versioned(`${optimizedBase}-${candidate}.webp`)} ${candidate}w`).join(", ");
  const avifSrcSet = available.map((candidate) => `${versioned(`${optimizedBase}-${candidate}.avif`)} ${candidate}w`).join(", ");
  const style = {
    "--image-ratio": `${width} / ${height}`,
    "--image-placeholder": `url(${versioned(`${optimizedBase}-placeholder.webp`)})`,
  } as CSSProperties;

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalWidth > 0) setLoaded(true);
  }, [src]);

  const reveal = (event: SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.naturalWidth > 0) setLoaded(true);
  };

  return <span className={`progressive-image ${className}${loaded ? " is-loaded" : ""}`} style={style}>
    <picture>
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        ref={imageRef}
        src={versioned(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        onLoad={reveal}
        onError={() => setLoaded(true)}
      />
    </picture>
  </span>;
}
