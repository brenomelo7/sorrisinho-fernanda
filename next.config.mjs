/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for stable preview
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Images configuration
  images: {
    domains: ['images.unsplash.com', 'k6hrqrxuu8obbfwn.public.blob.vercel-storage.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Skip linting during builds to prevent issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable SWC minification
  swcMinify: true,
};

export default nextConfig;