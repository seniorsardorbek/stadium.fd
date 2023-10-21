/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["localhost"], 
      },
}

module.exports = nextConfig
