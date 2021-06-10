/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-26 17:33:59
 * @Desc:用户相关 - store
 */
import Cookies from 'js-cookie'
import storage from '@/utils/storage'

const state = {
  appid: '', // 需要原生客户端以参数的形式传递
  accessToken: '',
  locale: Cookies.get('locale') || 'zh' //国际化
}

const getters = {
  accessToken(state) {
    return state.accessToken
  }
}

const mutations = {
  setAccessToken(state, accessToken) {
    // console.log('-key-', accessToken)
    state.accessToken = accessToken
    // 设置accessToken过期时间为 1 天
    storage.setItem('access_token', accessToken, 24)
  },

  //切换语言
  setLanguage(state, language) {
    // console.log('-language-', language)
    state.locale = language
    Cookies.set('locale', language)
  }
}

const actions = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
