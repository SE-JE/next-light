const withPlugins = require("next-compose-plugins");
const withImages = require("next/image");

const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  reactStrictMode: true,
};

module.exports = withPlugins([[withImages]], nextConfig);