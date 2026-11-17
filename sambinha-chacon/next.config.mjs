/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportação estática: o site funciona em qualquer hospedagem (Vercel, Netlify, GitHub Pages, cPanel...)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};
export default nextConfig;
