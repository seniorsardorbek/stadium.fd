/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin : 'anonymous' ,
    images: {
        unoptimized: true ,
        domains: ["minimatch.onrender.com"], 
      },
      // output: 'export',
}

module.exports = nextConfig
