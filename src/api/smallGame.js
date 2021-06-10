/*
 * @Author: wangshengxian
 * @Date: 2021-01-20 11:31:51
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-23 17:53:14
 * @Desc: 小游戏 - api
 */
import request from '@/utils/request'
import Qs from 'qs'
/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/api/game/hall/user-info',
    method: 'get',
    data: {}
  })
}

/**
 * GOE兑换游戏币
 */
export function exchangeGameCoin(data) {
  return request({
    url: '/api/game/hall/coin/exchange' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}

/**
 * 获取授权code
 */
export function getAuthCode(data) {
  return request({
    url: '/api/game/hall/oauth/code',
    method: 'get',
    data
  })
}

/**
 * 获取排行榜列表
 */
export function getRankingList() {
  return request({
    url: '/api/game/hall/rank/list',
    method: 'get',
    data: {}
  })
}
