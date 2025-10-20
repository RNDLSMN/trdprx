const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const nextTranslate = require("next-translate");

module.exports = nextTranslate(
  withImages(
    withCSS({
      reactStrictMode: true,
      eslint: {
        ignoreDuringBuilds: true,
      },
      cssLoaderOptions: {
        url: false,
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve = config.resolve || {};
          config.resolve.fallback = config.resolve.fallback || {};
          config.resolve.fallback.net = false;
          config.resolve.fallback.tls = false;
          config.resolve.fallback.dns = false;
        }
        return config;
      },
    })
  )
);
