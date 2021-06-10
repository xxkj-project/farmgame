/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-18 13:43:16
 * @Desc:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Register',
    component: () => import('@/views/index'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('@/views/download'),
    meta: {
      title: '下载'
    }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/views/guide'),
    meta: {
      title: '下载指南'
    }
  },
  {
    path: '/smallGame',
    name: 'SmallGame',
    component: () => import(/* webpackChunkName: 'smallGame' */ '@/views/smallGame'),
    meta: {
      title: '小游戏'
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
