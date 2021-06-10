/*
 * @Author: wangshengxian
 * @Date: 2021-01-18 10:49:59
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-18 11:38:29
 * @Desc: 接口 -- api
 */
import request from '@/utils/request'
import Qs from 'qs'

/**
 * 获取国家号码前缀列表
 */
export function getPhonePrefixList() {
  return request({
    url: '/common/countryPrefix',
    method: 'get',
    data: {}
  })
}

/**
 * 发送短信验证码
 */
export function sendIdentifyCode(data) {
  return request({
    url: '/common/sendMsg' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}

/**
 * 手机号注册
 */
export function registerAccount(data) {
  return request({
    url: '/auth/invite' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}
