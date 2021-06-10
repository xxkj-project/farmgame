/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 14:26:25
 * @Desc:
 */
const Path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

console.log('-----proxyCode:', process.env.VUE_APP_PROXY_CODE)

console.log('-----nodeEnv:', process.env.NODE_ENV)

console.log('-----serverENV:', process.env.VUE_APP_SERVER_ENV)

console.log('-----serverURL:', process.env.VUE_APP_SERVER_URL)

const projectName = 'farmgame'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${projectName}/` : '/',
  outputDir: projectName,
  assetsDir: 'static',
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // 开发环境服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8899,
    open: false, // 项目启动后自动打开浏览器
    https: false,
    progress: false,
    proxy: {
      '/farm': {
        target: process.env.VUE_APP_SERVER_URL,
        ws: true,
        changeOrigin: true,
        secure: false
        // pathRewrite: {
        //   "/farm": ''
        // }
      }
    }
  },
  // 添加webpack配置
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod') {
    //   // 返回一个将会被合并的对象
    //   return {
    //     optimization: {
    //       minimizer: [
    //         new TerserPlugin({
    //           sourceMap: false,
    //           terserOptions: {
    //             compress: {
    //               drop_console: true
    //             }
    //           }
    //         })
    //       ]
    //     }
    //   }
    // }
    // 定义快捷路径标识
    const myAlias = {
      '@': Path.resolve(__dirname, './src'),
      public: Path.resolve(__dirname, './public')
    }
    // 性能提示
    let myPerformance = {}
    if (process.env.NODE_ENV === 'production') {
      myPerformance = {
        hints: 'warning',
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
      }
    }
    // 更新config
    config.resolve.alias = { ...config.resolve.alias, ...myAlias }
    config.performance = { ...config.performance, ...myPerformance }
  },
  // 修改webpack配置
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
