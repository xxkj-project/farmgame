/**
 * 根据相应的平台做处理
 * 针对客户端页面头部的处理
 * */

import platform from '@/utils/platform'
import iosBridge from '@/utils/bridge'

export default {
  mounted() {
    this.setMixinsJsBridge()
  },
  methods: {
    setMixinsJsBridge() {
      console.log('mixinsJsBridge')
      if (platform.isIos) {
        console.log('-ios-')
        // bridge.toNativePage('showNavigationBar', '0', null)
        // bridge.toNativePage('showBackButton', '0', null)
        iosBridge.setWebViewJsBridge(bridge => {
          bridge.callHandler('showNavigationBar', '0', null)
          bridge.callHandler('showBackButton', '0', null)
        })
      }
    }
  }
}
