/*
 * @Author: wangshengxian
 * @Date: 2021-01-18 10:36:23
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-20 13:47:06
 * @Desc: axios请求拦截
 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const service = axios.create()

// request interceptor
service.interceptors.request.use(
  config => {
    config.baseURL = process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_SERVER_URL}/farm` : '/farm'
    config.timeout = config.timeout || 50000
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // Do something before request is sent
    if (store.state.user.accessToken) {
      // config.headers['token'] = store.state.user.accessToken
      config.headers['key'] = store.state.user.accessToken // 让每个请求携带token-- ['Admin-Token']为自定义key 请根据实际情况自行修改
    }
    // 参数
    if (config.method === 'get' || config.method === 'delete') {
      config.params = config.data || config.params
    } else {
      config.data = config.data || {}
    }
    // if (config.method === 'get') {
    //   if (!config.params && config.data) {
    //     config.params = config.data
    //     config.data = undefined
    //   }
    // }
    // console.log('-config-', config)
    return config
  },
  error => {
    console.log('__REQ_ERROR__', error)
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log('-service-res-', res)
    if (+res.code == 200) {
      return res
    }
    Toast({
      message: 'error：' + res.msg,
      duration: '2000'
    })
    return Promise.reject(res)
  },
  error => {
    console.log('__RES_ERROR__', error)
    Toast({
      message: 'error：' + error.message,
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
