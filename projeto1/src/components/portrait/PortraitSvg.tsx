"use client";

import { useId } from "react";
import type { PortraitArt } from "@/content/types";

/**
 * Retrato ilustrado ORIGINAL em estilo de silhueta com luz de recorte (museu).
 * Não é fotografia nem pretende reproduzir fielmente o rosto da personalidade:
 * apenas elementos documentados de penteado, vestimenta e acessórios.
 */

const HEAD = "M200 138 C 236 138, 258 166, 258 206 C 258 248, 236 282, 200 282 C 164 282, 142 248, 142 206 C 142 166, 164 138, 200 138 Z";
const EARS = "M142 200 C 132 198, 130 222, 143 228 Z M258 200 C 268 198, 270 222, 257 228 Z";
const NECK = "M176 262 L176 338 L224 338 L224 262 Z";

const TORSO: Record<PortraitArt["attire"], string> = {
  suit: "M30 500 C 40 405, 105 352, 172 332 L 228 332 C 295 352, 360 405, 370 500 Z",
  "high-collar": "M30 500 C 40 405, 105 352, 170 330 L 230 330 C 295 352, 360 405, 370 500 Z",
  dress: "M50 500 C 58 410, 115 356, 176 334 L 224 334 C 285 356, 342 410, 350 500 Z",
  "coat-cravat": "M28 500 C 38 402, 104 350, 170 330 L 230 330 C 296 350, 362 402, 372 500 Z",
  himation: "M34 500 C 44 410, 100 356, 168 334 L 232 334 C 300 356, 356 410, 366 500 Z",
  military: "M24 500 C 32 400, 96 350, 168 330 L 232 330 C 304 350, 368 400, 376 500 Z",
  jacket: "M34 500 C 44 404, 106 354, 172 334 L 228 334 C 294 354, 356 404, 366 500 Z",
  robe: "M30 500 C 40 408, 102 354, 170 334 L 230 334 C 298 354, 360 408, 370 500 Z",
  toga: "M34 500 C 44 410, 100 356, 168 334 L 232 334 C 300 356, 356 410, 366 500 Z",
  imperial: "M26 500 C 36 402, 100 350, 170 330 L 230 330 C 300 350, 364 402, 374 500 Z",
};

const HAIR: Record<PortraitArt["hair"], string | null> = {
  wild:
    "M136 222 C 112 206, 112 176, 128 160 C 120 136, 146 112, 170 116 C 182 96, 222 94, 236 112 C 262 106, 288 128, 280 156 C 298 174, 294 210, 266 224 C 268 196, 258 174, 238 166 C 218 158, 182 158, 162 168 C 144 178, 136 198, 136 222 Z",
  receding:
    "M144 212 C 140 180, 150 158, 170 150 C 160 166, 158 186, 160 204 Z M256 212 C 260 180, 250 158, 230 150 C 240 166, 242 186, 240 204 Z M176 146 C 190 136, 212 136, 226 146 C 214 142, 188 142, 176 146 Z",
  short:
    "M142 206 C 136 158, 164 128, 200 128 C 238 128, 266 158, 258 206 C 254 182, 244 164, 226 158 C 206 152, 190 152, 172 158 C 156 166, 146 182, 142 206 Z",
  bun:
    "M142 210 C 136 160, 166 130, 200 130 C 236 130, 264 160, 258 210 C 252 176, 236 158, 200 156 C 166 158, 148 176, 142 210 Z M172 120 C 172 96, 228 96, 228 120 C 228 140, 172 140, 172 120 Z",
  wig:
    "M140 206 C 134 156, 164 126, 200 126 C 236 126, 266 156, 260 206 C 252 180, 236 162, 200 160 C 164 162, 148 180, 140 206 Z M122 222 C 122 200, 152 200, 152 222 C 152 244, 122 244, 122 222 Z M248 222 C 248 200, 278 200, 278 222 C 278 244, 248 244, 248 222 Z M124 252 C 124 232, 152 232, 152 252 C 152 272, 124 272, 124 252 Z M248 252 C 248 232, 276 232, 276 252 C 276 272, 248 272, 248 252 Z",
  long:
    "M138 230 C 128 170, 158 124, 200 124 C 244 124, 274 170, 262 230 C 270 270, 276 310, 268 344 L 246 340 C 252 300, 250 250, 244 214 C 240 184, 226 166, 200 164 C 174 166, 160 184, 156 214 C 150 250, 148 300, 154 340 L 132 344 C 124 310, 130 270, 138 230 Z",
  "bald-sides":
    "M141 222 C 138 196, 144 180, 154 172 C 150 190, 152 210, 158 226 Z M259 222 C 262 196, 256 180, 246 172 C 250 190, 248 210, 242 226 Z",
  "curly-short":
    "M140 210 C 128 196, 134 172, 146 166 C 140 148, 158 132, 172 136 C 178 120, 200 116, 212 126 C 226 116, 250 126, 250 142 C 266 146, 272 170, 262 182 C 272 196, 266 214, 258 214 C 254 186, 236 166, 200 164 C 166 166, 146 186, 140 210 Z",
  "curly-long":
    "M134 236 C 120 206, 128 166, 150 148 C 162 132, 186 126, 200 126 C 220 126, 242 132, 254 148 C 276 168, 282 206, 266 236 C 280 262, 276 300, 262 330 C 252 310, 256 280, 250 258 C 254 230, 246 196, 230 180 C 214 170, 186 170, 170 180 C 154 196, 146 230, 150 258 C 144 280, 148 310, 138 330 C 124 300, 120 262, 134 236 Z",
  fringe:
    "M142 206 C 136 158, 164 128, 200 128 C 238 128, 266 158, 258 206 C 256 186, 250 172, 240 166 L 234 178 L 226 166 L 218 180 L 210 166 L 202 180 L 194 166 L 186 180 L 178 166 L 170 178 L 162 166 C 152 174, 146 188, 142 206 Z",
  pompadour:
    "M142 206 C 136 168, 150 140, 170 130 C 160 112, 190 92, 222 100 C 254 104, 270 128, 262 150 C 268 168, 264 190, 258 206 C 254 182, 242 168, 226 162 C 206 156, 186 158, 170 164 C 154 172, 146 186, 142 206 Z",
  turban: null,
  balding:
    "M142 220 C 138 194, 144 174, 156 166 C 150 186, 150 206, 156 226 Z M258 220 C 262 194, 256 174, 244 166 C 250 186, 250 206, 244 226 Z",
  slick:
    "M142 200 C 138 160, 162 132, 200 132 C 238 132, 262 160, 258 200 C 252 176, 236 160, 210 156 C 186 154, 160 164, 142 200 Z",
};

const FACIAL: Record<NonNullable<PortraitArt["facialHair"]>, string> = {
  mustache: "M176 246 C 186 238, 196 240, 200 244 C 204 240, 214 238, 224 246 C 214 252, 204 250, 200 248 C 196 250, 186 252, 176 246 Z",
  "thick-mustache": "M170 246 C 182 234, 196 238, 200 242 C 204 238, 218 234, 230 246 C 224 258, 210 256, 200 250 C 190 256, 176 258, 170 246 Z",
  beard: "M146 232 C 150 268, 168 300, 200 304 C 232 300, 250 268, 254 232 C 248 254, 232 266, 200 268 C 168 266, 152 254, 146 232 Z",
  "long-beard": "M146 232 C 148 290, 170 352, 200 366 C 230 352, 252 290, 254 232 C 248 256, 232 270, 200 272 C 168 270, 152 256, 146 232 Z",
  "white-beard": "M146 230 C 146 296, 168 360, 200 372 C 232 360, 254 296, 254 230 C 248 256, 232 270, 200 272 C 168 270, 152 256, 146 230 Z",
};

function Headwear({ kind }: { kind: NonNullable<PortraitArt["headwear"]> }) {
  switch (kind) {
    case "fedora":
      return (
        <>
          <path d="M102 172 C 130 160, 270 160, 298 172 C 284 182, 116 182, 102 172 Z" />
          <path d="M146 168 C 146 128, 160 104, 200 102 C 240 104, 254 128, 254 168 Z" />
        </>
      );
    case "bicorne":
      return <path d="M96 168 C 120 118, 170 96, 200 108 C 230 96, 280 118, 304 168 C 268 152, 236 150, 200 152 C 164 150, 132 152, 96 168 Z" />;
    case "turban":
      return <path d="M136 186 C 128 140, 160 108, 200 106 C 240 108, 272 140, 264 186 C 248 172, 226 166, 200 166 C 174 166, 152 172, 136 186 Z" />;
  }
}

function AttireDetails({ attire }: { attire: PortraitArt["attire"] }) {
  const s = { fill: "none", stroke: "rgba(166,138,104,0.45)", strokeWidth: 2, strokeLinecap: "round" as const };
  switch (attire) {
    case "suit":
      return (
        <g {...s}>
          <path d="M176 336 L 200 410 L 224 336" />
          <path d="M200 350 L 192 372 L 200 420 L 208 372 Z" />
          <path d="M150 350 L 186 430 M250 350 L 214 430" opacity={0.6} />
        </g>
      );
    case "high-collar":
      return (
        <g {...s}>
          <path d="M172 330 L 178 360 L 200 350 L 222 360 L 228 330" />
          <path d="M184 366 C 192 372, 208 372, 216 366" />
          <path d="M150 352 L 190 440 M250 352 L 210 440" opacity={0.5} />
        </g>
      );
    case "dress":
      return (
        <g {...s}>
          <path d="M178 330 C 184 346, 216 346, 222 330" />
          <circle cx="200" cy="360" r="6" />
          <path d="M140 380 C 170 400, 230 400, 260 380" opacity={0.4} />
        </g>
      );
    case "coat-cravat":
      return (
        <g {...s}>
          <path d="M182 334 C 186 352, 214 352, 218 334" />
          <path d="M190 350 C 182 370, 196 384, 200 392 C 204 384, 218 370, 210 350" />
          <path d="M160 344 L 186 440 M240 344 L 214 440" opacity={0.6} />
        </g>
      );
    case "himation":
    case "toga":
      return (
        <g {...s}>
          <path d="M120 380 C 170 350, 230 420, 300 360" />
          <path d="M110 420 C 170 384, 240 450, 320 392" opacity={0.7} />
          <path d="M104 462 C 170 424, 250 488, 334 430" opacity={0.5} />
        </g>
      );
    case "military":
      return (
        <g {...s}>
          <path d="M170 332 L 176 352 L 224 352 L 230 332" />
          <path d="M96 382 C 112 364, 140 360, 150 368 M304 382 C 288 364, 260 360, 250 368" strokeWidth={3} />
          {[380, 404, 428, 452].map((y) => (
            <circle key={y} cx="200" cy={y} r="3" />
          ))}
        </g>
      );
    case "jacket":
      return (
        <g {...s}>
          <path d="M178 334 L 196 380 M222 334 L 204 380" />
          <path d="M150 350 L 182 450 M250 350 L 218 450" opacity={0.6} />
        </g>
      );
    case "robe":
      return (
        <g {...s}>
          <path d="M174 334 L 200 400 L 226 334" />
          <path d="M158 344 L 196 440 M242 344 L 204 440" opacity={0.6} />
        </g>
      );
    case "imperial":
      return (
        <g {...s}>
          <path d="M176 334 L 200 392 L 224 334" />
          <path d="M120 372 L 280 470" strokeWidth={6} opacity={0.5} />
          <circle cx="160" cy="400" r="7" />
        </g>
      );
  }
}

export function PortraitSvg({ art, title, className }: { art: PortraitArt; title: string; className?: string }) {
  const hair = HAIR[art.hair];
  const tilt = art.tilt ?? 0;
  const lightHair = art.hair === "wig";
  // ID único por instância: o mesmo retrato aparece várias vezes na página e
  // gradientes definidos dentro de um elemento oculto (display:none) não renderizam.
  const id = `p${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const figure = (fill: string, beardFill?: string) => (
    <g fill={fill}>
      <path d={TORSO[art.attire]} />
      <path d={NECK} />
      <path d={EARS} />
      <path d={HEAD} />
      {hair && <path d={hair} fill={lightHair ? undefined : fill} />}
      {art.facialHair && <path d={FACIAL[art.facialHair]} fill={beardFill ?? fill} />}
      {art.headwear && <Headwear kind={art.headwear} />}
    </g>
  );

  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={title} className={className} preserveAspectRatio="xMidYMid slice">
      <title>{title}</title>
      <defs>
        <radialGradient id={`${id}-bg`} cx="58%" cy="36%" r="75%">
          <stop offset="0%" stopColor="#2b2824" />
          <stop offset="55%" stopColor="#1a1a19" />
          <stop offset="100%" stopColor="#0e0f10" />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#3a3029" />
          <stop offset="45%" stopColor="#1b1918" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.08" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-bg)`} />
      <circle cx="232" cy="190" r="150" fill="#a68a68" opacity="0.07" />
      <g transform={`rotate(${tilt} 200 300)`}>
        {/* Luz de recorte em bronze */}
        <g transform="translate(-5 -3)" filter={`url(#${id}-blur)`} opacity="0.85">
          {figure("#a68a68")}
        </g>
        {figure(`url(#${id}-body)`, art.facialHair === "white-beard" ? "#5a554d" : undefined)}
        {lightHair && hair && <path d={hair} fill="#6d675f" opacity="0.9" />}
        {art.glasses && (
          <g fill="none" stroke="#a68a68" strokeWidth="2.5" opacity="0.9">
            <rect x="166" y="198" width="28" height="20" rx="6" />
            <rect x="206" y="198" width="28" height="20" rx="6" />
            <path d="M194 206 L 206 206" />
          </g>
        )}
        <AttireDetails attire={art.attire} />
      </g>
      <rect width="400" height="500" filter={`url(#${id}-grain)`} opacity="0.6" />
    </svg>
  );
}
