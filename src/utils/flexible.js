/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-20 17:15:52
 * @Desc:
 */
/**
 * rem适配方案
 */
;(function(window, document) {
  var sizeUI = 750 // 定义设计图尺寸
  var remBase = 75 // 定义基准值
  // var sizeUI = 640 // 定义设计图尺寸
  // var remBase = 64.0 // 定义基准值
  var docEl = document.documentElement
  var bodyEl = document.querySelector('body')
  console.log('-width-', docEl.clientWidth, '-height-', docEl.clientHeight)

  setRemUnit()
  // window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) setRemUnit()
  })
  function setRemUnit() {
    let currSizeUI = ''
    if (docEl.clientWidth < docEl.clientHeight) {
      // 竖屏
      currSizeUI = docEl.clientWidth
    } else {
      currSizeUI = docEl.clientHeight
    }
    var docFontSize = (currSizeUI / sizeUI) * remBase
    docEl.style.fontSize = docFontSize + 'px'
    bodyEl.style.fontSize = 16 / docFontSize + 'rem'
  }
})(window, document)
