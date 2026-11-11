import { NextResponse, type NextRequest } from "next/server";
import { PERSONALITY_SLUGS } from "@/content";

const KNOWN_SLUGS = new Set(PERSONALITY_SLUGS);

/**
 * Gera uma Content-Security-Policy com nonce por requisição.
 * O Next.js aplica automaticamente o nonce aos próprios scripts quando ele
 * está presente no cabeçalho da requisição.
 */
export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV !== "production";

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // Framer Motion aplica estilos inline (atributo style); scripts continuam restritos.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws:" : ""}`,
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);

  // Rotas de conversa só existem para personalidades cadastradas: 404 real (não "soft 404").
  const match = /^\/conversar\/([^/]+)\/?$/.exec(request.nextUrl.pathname);
  const unknownSlug = match ? !KNOWN_SLUGS.has(match[1]!) : false;
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = unknownSlug
    ? NextResponse.rewrite(new URL("/pagina-nao-encontrada", request.url), { status: 404, request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)",
      missing: [{ type: "header", key: "next-router-prefetch" }],
    },
  ],
};
