/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

// next.config.js
module.exports = {
	images: {
    	domains: ['https://www.superful.xyz/_next/image?url=https%3A%2F%2Fsuperful-assets-prod.s3.amazonaws.com']
    }
}

