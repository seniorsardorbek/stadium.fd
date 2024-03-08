/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["bd.minimatch.uz"], 
      },
      output: "standalone",
}

module.exports = nextConfig
