const { defineConfig } = require('@vue/cli-service')

const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "cesium": path.resolve(__dirname, "public/Cesium/Cesium.js")//lmw add 3 告诉vite未编译时如何引入cesium
      },
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http") ,
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/") ,
        "stream": require.resolve("stream-browserify") ,
      },
    },
  },
})
