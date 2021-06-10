/*
 * @Author: wangshengxian
 * @Date: 2021-01-18 14:38:56
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-18 14:55:41
 * @Desc: 横屏设置
 */
export default {
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    // 横屏设置
    handleResize() {
      let width = window.innerWidth
      let height = window.innerHeight
      let wrapEl = document.getElementById('app')
      let style = ''
      console.log('-width-', width, '-height-', height)

      if (width >= height) {
        // 横屏
        style += 'width:' + height + 'px'
        style += 'height:' + width + 'px'
        style += '-webkit-transform: rotate(0); transform: rotate(0);'
        style += '-webkit-transform-origin: ' + width / 2 + 'px ' + height / 2 + 'px;'
        style += 'transform-origin: ' + width / 2 + 'px ' + height / 2 + 'px;'
      } else {
        style += 'width:' + width + 'px;'
        style += 'height:' + height + 'px;'
        style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
        // 注意旋转中点的处理
        style += '-webkit-transform-origin: ' + width / 2 + 'px ' + height / 2 + 'px;'
        style += 'transform-origin: ' + width / 2 + 'px ' + height / 2 + 'px;'
      }
      console.log('-style-', style)
      wrapEl.style.cssText = style
    }
  }
}
