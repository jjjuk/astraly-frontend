/** @type {import('next').NextConfig} */

// http://localhost:4004/api/graphql
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    //   NEXT_PUBLIC_API_URL: 'https://zkpad-api.herokuapp.com/api/graphql',
    NEXT_PUBLIC_REST_API_URL:
      'https://8ce1-146-255-233-146.eu.ngrok.io/api' /* 'https://zkpad-api.herokuapp.com/api' */,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
  webpack: function (config) {
    const fileLoader = {
      loader: 'file-loader',
      options: {
        outputPath: '../public/assets/',
        publicPath: '/assets/',
      },
    }

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /inline/,
          loader: '@svgr/webpack',
        },
        {
          ...fileLoader,
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
