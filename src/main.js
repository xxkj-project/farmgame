import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/components/loading'
import '@/assets/css/vantOverWhite.less'

// normalize
import 'normalize.css/normalize.css'
// 全局样式
import i18n from '@/i18n/i18n'
// 路由守卫
import '@/utils/routerGuards.js'
// vconsole调试工具
import '@/utils/vconsole.js'
// rem适配
import '@/utils/flexible.js'
// vant按需引入
import '@/utils/importVant.js'

// vant组件设置国际化
import { Locals } from '@/i18n/vantLocal.js'

Vue.prototype.$Local = Locals
Vue.use(Loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
