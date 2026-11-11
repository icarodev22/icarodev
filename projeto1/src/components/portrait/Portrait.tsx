"use client";

import type { PortraitArt } from "@/content/types";
import { photoSrcSet, type PortraitPhoto } from "@/content/portraits";
import { PortraitSvg } from "./PortraitSvg";

export interface PortraitData {
  art: PortraitArt;
  alt: string;
  photo?: PortraitPhoto;
}

/**
 * Retrato da personalidade: usa a fotografia/obra fornecida (AVIF/WebP
 * responsivos, sem filtros) quando existir; caso contrário, a ilustração original.
 */
export function Portrait({
  data,
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  decorative = false,
}: {
  data: PortraitData;
  className?: string;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const alt = decorative ? "" : data.alt;
  if (!data.photo) {
    return <PortraitSvg art={data.art} title={alt} className={className} />;
  }
  const p = data.photo;
  const largest = p.widths[p.widths.length - 1]!;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={photoSrcSet(p, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={photoSrcSet(p, "webp")} sizes={sizes} />
      <img
        src={`${p.base}-${largest}.webp`}
        alt={alt}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        className={`object-cover ${className ?? ""}`}
        style={{ objectPosition: p.focus ?? "50% 30%" }}
      />
    </picture>
  );
}
