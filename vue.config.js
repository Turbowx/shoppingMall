const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        // target: "http://39.98.123.211",
        target: 'http://gmall-h5-api.atguigu.cn'
      },
    },
  },
})

// 权限管理: http://39.98.123.211:8170/swagger-ui.html
// 商品管理：http://39.98.123.211:8216/swagger-ui.html
