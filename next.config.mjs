/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora erros de ESLint durante o deploy na Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
