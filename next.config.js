/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{ hostname: 'lh3.googleusercontent.com' }, { hostname: 'res.cloudinary.com' }],
  },
  headers:
    process.env.NODE_ENV === 'development'
      ? () => [
          {
            source: '/_next/static/css/_app-client_src_app_globals_css.css',
            headers: [{ key: 'Vary', value: '*' }],
          },
        ]
      : undefined,
};

module.exports = nextConfig;
