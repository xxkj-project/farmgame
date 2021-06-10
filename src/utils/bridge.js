import tools from '@/utils/tools'
/**
 * js和原生交互基础方法
 * */

function setWebViewJsBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

// 注册js方法给ios原生调用
function registerAndroidBridge(fnName, callback) {
  setWebViewJsBridge(bridge => {
    bridge.registerHandler(fnName, (data, responseCallback) => {
      callback(data, responseCallback)
    })
  })
}

// 调用ios客户端原生的方法
function callNativeBridge(fnName, params, callback) {
  setWebViewJsBridge(bridge => {
    console.log('-native-fnName-', fnName, '-params-', params)
    bridge.callHandler(fnName, params, callback)
  })
}

// 跳转原生页面并作节流处理
const toNativePage = tools.throttle(toNativeFn, 1000)
function toNativeFn(fnName, params, callback) {
  callNativeBridge(fnName, params, callback)
}

export default {
  // 设置webview桥接
  setWebViewJsBridge,
  // 调用ios客户端原生的方法
  callNativeBridge,
  // 跳转ios原生页面并作节流处理
  toNativePage,
  // 注册js方法给ios原生
  registerAndroidBridge
}
