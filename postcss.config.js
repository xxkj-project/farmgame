/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-20 17:17:02
 * @Desc:
 */
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      // rootValue: 36.0,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: false,
      selectorBlackList: ['noRem'],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    }
  }
}
