/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-19 17:53:10
 * @Desc: 全局守卫
 */
import store from '@/store'

// 存储登录状态
function setLoginStatus(to, from) {
  console.log('--', to, from)
  let accessToken = ''
  if (to.query && to.query.token !== 'undefined') {
    accessToken = to.query.token
  }
  store.commit('user/setAccessToken', accessToken)
}

// 获取国际化语言类型
function setLanguage(to, from) {
  // console.log(to, from)
  // console.log('-language-', to.query)
  let language = 'zh'
  if (to.query && to.query.language !== 'undefined' && to.query.language == 'false') {
    language = 'en'
  }
  store.commit('user/setLanguage', language)
}

// 修改页面title
function setDocumentTitle(to, from) {
  document.title = '测试标题' // TODO 根据具体的项目自行更改
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
}

// 跳转登录页
function jumpNeedLogin(to, from) {
  if (to.query && to.query.need_login) {
    if (store.getters && !store.getters['/user/accessToken']) {
      this.$toast({
        message: '去登录页',
        duration: '3000'
      })
    }
  }
}

export default {
  /**
   * 设置登录状态
   */
  setLoginStatus,
  /**
   * 获取国际化语言
   */
  setLanguage,
  /**
   * 设置标题
   */
  setDocumentTitle,
  /**
   * 跳转登录页
   */
  jumpNeedLogin
}
