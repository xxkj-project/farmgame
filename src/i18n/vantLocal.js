/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-26 17:34:57
 * @Desc: vant组件国际化
 */
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
export function Locals(a) {
  // console.log(a)
  if (a == 'en') {
    Locale.use(a, enUS)
  } else if (a == 'zh') {
    Locale.use(a, zhCN)
  }
}
