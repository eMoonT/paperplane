import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'r2-pan.xingmel.top',
      'pub-f74fab82be6745f2973c207d5cc433f2.r2.dev',
    ]
  }
};

export default nextConfig;
