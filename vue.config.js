const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://47.113.198.194:8080/flight', //请求的根路径
        changeOrigin: true, // 允许跨域
        pathRewrite: { //重写路径
          '^/api': ''
        }
      }
    }
  }
})
