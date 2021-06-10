/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-26 17:34:26
 * @Desc:
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './lang/zhCn'
import en from './lang/en'
import Cookies from 'js-cookie'
// import { Locale } from 'vant'
// import enUS from 'vant/lib/locale/lang/en-US'
// import zhCN from 'vant/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

const messages = {
  en: Object.assign(en),
  zh: Object.assign(zh)
}
// console.log('-locale-', Cookies.get('locale'))
const i18n = new VueI18n({
  locale: Cookies.get('locale') || 'zh',
  messages
})

// export function Locals(a) {
//   console.log(a)
//   if (a == 'en') {
//     Locale.use('en', enUS)
//   } else if (a == 'zh') {
//     Locale.use(a, zhCN)
//   }
// }
export default i18n
