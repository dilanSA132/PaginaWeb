/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['upload.wikimedia.org', 'postimg.cc'],  // Agrega 'postimg.cc' a los dominios permitidos
  },
};

export default nextConfig;
