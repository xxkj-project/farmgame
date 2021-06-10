<!-- 
  下载指南 
-->
<template>
  <div class="guide">
    <div class="main">
      <div class="content">
        <div class="imgBox" v-for="(item, index) in oneBgUrlArr" :key="index">
          <img class="itemImg" :src="item" alt="" />
        </div>
        <div class="firstBtnBox btnBox">
          <img :src="firstBtnImgUrl" alt="" @click="onAppStore" />
        </div>
        <div class="imgBox">
          <img class="itemImg" src="@/assets/images/downloadGuide/btnBottomComBg.jpg" alt="" />
        </div>
        <div class="imgBox">
          <img class="itemImg" :src="twoBgUrl" alt="" />
        </div>
        <div class="twoBtnBox btnBox">
          <img :src="secondBtnImgUrl" alt="" @click="onStartTest" />
        </div>
        <div class="imgBox">
          <img class="itemImg" src="@/assets/images/downloadGuide/btnBottomComBg.jpg" alt="" />
        </div>
        <div class="imgBox">
          <img class="itemImg" :src="threeBgUrl" alt="" />
        </div>
        <div class="imgBox">
          <img class="itemImg" src="@/assets/images/downloadGuide/bottomComBg.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      language: state => state.user.locale
    }),
    oneBgUrlArr() {
      // console.log(this.language)
      let imgs = [
        require(`@/assets/images/downloadGuide/bg1_${this.language}.jpg`),
        require(`@/assets/images/downloadGuide/bg2_${this.language}.jpg`)
      ]
      return imgs
    },
    twoBgUrl() {
      let imgs = require(`@/assets/images/downloadGuide/bg3_${this.language}.jpg`)
      return imgs
    },
    threeBgUrl() {
      let imgs = require(`@/assets/images/downloadGuide/bg4_${this.language}.jpg`)
      return imgs
    },
    firstBtnImgUrl() {
      let imgs = require(`@/assets/images/downloadGuide/oneBtn_${this.language}.png`)
      return imgs
    },
    secondBtnImgUrl() {
      let imgs = require(`@/assets/images/downloadGuide/twoBtn_${this.language}.png`)
      return imgs
    }
  },
  mounted() {},
  methods: {
    onAppStore() {
      window.location.href = 'https://apps.apple.com/cn/app/testflight/id899247664'
    },
    onStartTest() {
      window.location.href = 'https://testflight.apple.com/join/xMJfSRvM'
    }
  }
}
</script>
<style lang="less" scoped>
@imgUrl: '~@/assets/images/downloadGuide/';
.guide {
  .content {
    .imgBox {
      display: flex;
      flex-direction: column;
      .itemImg {
        width: 100%;
        outline-width: 0px;
        vertical-align: top;
      }
    }
    .btnBox {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 32px;
      background: url('@{imgUrl}btnComBg.png') no-repeat center / cover;
      img {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
