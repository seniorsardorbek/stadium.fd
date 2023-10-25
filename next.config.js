/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["192.168.100.22"], 
      },
      // output: 'export',
}

module.exports = nextConfig
