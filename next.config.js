/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["localhost"], 
      },
      // output: 'export',
}

module.exports = nextConfig
