/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["192.168.179.154"], 
      },
      // output: 'export',
}

module.exports = nextConfig
