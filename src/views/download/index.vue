<!--  -->
<template>
  <div class="register">
    <div class="info" v-if="isWechat">
      {{ $t('Register.warningWord11') }}
      <img src="@/assets/images/top.png" alt="" />
    </div>
    <img v-if="this.$i18n.locale == 'en'" class="logo" src="@/assets/imgs/logoEn.png" alt="" />
    <img v-if="this.$i18n.locale == 'zh'" class="logo" src="@/assets/imgs/logoZh.png" alt="" />
    <span class="changeLang" :class="{ changeLangActive: isWechat }" @click="changeLanguage">{{ language }}</span>
    <div class="download">
      <img v-if="this.$i18n.locale == 'en'" class="downloadPic" src="@/assets/imgs/download.png" alt="" />
      <img v-if="this.$i18n.locale == 'zh'" class="downloadPic" src="@/assets/imgs/downloadZh.png" alt="" />
      <div class="downloadType">
        <img v-if="this.$i18n.locale == 'en'" @click="insatallApp('ios')" src="@/assets/imgs/btn_1.png" alt="" />
        <img v-if="this.$i18n.locale == 'zh'" @click="insatallApp('ios')" src="@/assets/imgs/iosDownLoad.png" alt="" />
        <img v-if="this.$i18n.locale == 'en'" @click="insatallApp('android')" src="@/assets/imgs/BTM_2.png" alt="" />
        <img
          v-if="this.$i18n.locale == 'zh'"
          @click="insatallApp('android')"
          src="@/assets/imgs/downloadBtn.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { prodUrl, apkDownloadUrl } from '@/const/global'
export default {
  name: 'Download',
  data() {
    return {
      language: '中 文',
      isWechat: true
    }
  },
  mounted() {
    //检测是否是微信内置浏览器
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) != 'micromessenger') {
      this.isWechat = false
    } else {
      this.isWechat = true
    }
  },
  methods: {
    // 切换语言
    changeLanguage() {
      console.log('-language-', this.$i18n.locale)
      if (this.$i18n.locale == 'zh') {
        this.$i18n.locale = 'en'
        this.$Local('en')
        this.language = '中 文'
      } else {
        this.$i18n.locale = 'zh'
        this.$Local('zh')
        this.language = 'English'
      }
    },
    insatallApp(type) {
      console.log(type, this.$i18n.locale)
      let iosUrl = `${prodUrl}/farmgame/guide?language=${this.$i18n.locale}`
      // http://video.85tstss.com/farm/GOE%20Farm.apk
      window.location.href = type == 'ios' ? iosUrl : `${apkDownloadUrl}/farm/GOE%20Farm.apk`
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.register {
  height: 100vh;
  background: url('../../assets/imgs/bg.png') no-repeat;
  background-size: 100% 100%;
  .info {
    text-align: center;
    background: white;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    position: relative;
    img {
      position: absolute;
      right: 10px;
      height: 12px;
      top: 6px;
    }
  }
  .logo {
    width: 151px;
    margin: 4px 112px;
  }
  .changeLang {
    background-color: #366215;
    color: #fcca4d;
    padding: 4px 8px;
    border-radius: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .changeLangActive {
    top: 34px;
  }
  .download {
    position: absolute;
    bottom: 110px;
    width: 100%;
    .downloadPic {
      width: 260px;
      margin-left: 57.5px;
    }
    .downloadType {
      display: flex;
      justify-content: space-around;
      width: 100%;
      margin-top: 20px;
      img {
        width: 140px;
        height: 47px;
      }
    }
  }
}

@media only screen and (width: 375px) and (height: 690px) {
  .register {
    .download {
      bottom: 150px;
      .downloadType {
        img {
          height: 23px;
        }
      }
    }
  }
}
</style>
