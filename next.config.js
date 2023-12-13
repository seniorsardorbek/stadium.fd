/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["94.228.112.211"], 
      },
      // output: 'export',
}

module.exports = nextConfig
