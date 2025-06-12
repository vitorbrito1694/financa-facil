/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), "@supabase/realtime-js"];
    return config;
  },
};

export default nextConfig;
