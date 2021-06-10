<!--  -->
<template>
  <div class="register">
    <img v-if="this.$i18n.locale == 'en'" class="logo" src="@/assets/imgs/logoEn.png" alt="" />
    <img v-if="this.$i18n.locale == 'zh'" class="logo" src="@/assets/imgs/logoZh.png" alt="" />
    <span class="changeLang" @click="changeLanguage">{{ language }}</span>
    <div class="registerFrom">
      <img v-if="this.$i18n.locale == 'en'" src="@/assets/imgs/creatAccount.png" alt="" />
      <img v-if="this.$i18n.locale == 'zh'" src="@/assets/imgs/creatAccountZh.png" alt="" />
      <div class="register_wrap">
        <p class="title">{{ $t('Register.roegion') }}</p>
        <van-field v-model="country" @click="showPicker = true" readonly="" placeholder="">
          <template #button>
            <img class="btnImg" src="@/assets/imgs/bottom.png" alt="" />
          </template>
        </van-field>
        <p class="title">{{ $t('Register.phoneNumber') }}</p>
        <van-field v-model="mobile" type="digit" placeholder="" />
        <p class="title">{{ $t('Register.code') }}</p>
        <van-field v-model="verificationCode" maxlength="6" type="digit" placeholder="">
          <template #button>
            <span v-show="btnCode == 0" class="sendCode" @click="sendCode">{{ $t('Register.sendCode') }}</span>
            <span v-show="btnCode == 1" class="sendCode">{{ num }}S</span>
          </template>
        </van-field>
        <p class="title">{{ $t('Register.pass') }}</p>
        <van-field v-model="password" type="password" placeholder="" />
      </div>
      <img
        v-if="this.$i18n.locale == 'en'"
        class="submit"
        @click="submitHandle"
        src="@/assets/imgs/btn_register.png"
        alt=""
      />
      <img
        v-if="this.$i18n.locale == 'zh'"
        class="submit"
        @click="submitHandle"
        src="@/assets/imgs/register.png"
        alt=""
      />
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="countryData" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { getPhonePrefixList, sendIdentifyCode, registerAccount } from '@/api'
export default {
  name: 'Register',
  data() {
    return {
      country: '',
      verificationCode: '',
      mobile: '',
      password: '',
      mobilePrefix: '',
      showPicker: false,
      countryData: [],
      countryList: [],
      language: '中 文',
      num: 60, // 倒计时
      btnCode: 0, // 判断是否倒计时
      timer: null, // 60s倒计时
      isCode: true
    }
  },
  mounted() {
    this.getData()
    // 默认英文 this.$Local是设置vant里默认英文
    this.$Local('en')
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
    // 获取国家号码前缀列表
    getData() {
      getPhonePrefixList()
        .then(res => {
          console.log('-res-', res)
          const { countryList } = res.data
          this.countryList = countryList
          this.countryData = []
          this.countryList.map(item => {
            this.countryData.push(item.name)
          })
          // console.log(this.countryList, this.countryData)
        })
        .catch(err => {
          this.$toast(err.msg)
        })
    },
    // 选择国家号码
    onConfirm(value) {
      this.countryList.map(item => {
        if (item.name == value) {
          this.mobilePrefix = item.code
          this.country = item.name + '+' + this.mobilePrefix
        }
      })
      this.showPicker = false
    },
    // 发送验证码
    sendCode() {
      if (!this.mobilePrefix) {
        this.$toast(this.$i18n.t('Register.warningWord2'))
        return
      }
      // var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!this.mobile) {
        this.$toast(this.$i18n.t('Register.warningWord1'))
        return
      }
      const params = {
        mobile: this.mobile,
        mobilePrefix: this.mobilePrefix,
        type: 1
      }
      if (this.isCode) {
        this.isCode = false
        sendIdentifyCode(params)
          .then(res => {
            console.log('-res-', res)
            if (res.code == 200) {
              this.btnCode = 1
              // this.xhrCode = res.data.data.code
              this.timer = setInterval(() => {
                if (this.num > 0) {
                  this.num--
                } else {
                  this.btnCode = 0
                  this.num = 60
                  clearInterval(this.timer)
                }
              }, 1000)
            } else if (res.code == '500000') {
              this.$toast(this.$i18n.t('Register.warningWord7'))
            } else if (res.code == '500004') {
              this.$toast(this.$i18n.t('Register.warningWord8'))
            } else {
              this.$toast(res.data.msg)
            }
            this.isCode = true
          })
          .catch(err => {
            this.$toast(err.msg)
          })
      }
    },
    // 注册(需要邀请码才能注册成功)
    submitHandle() {
      console.log(this.$route.query.inviteCode)
      if (!this.mobilePrefix) {
        this.$toast(this.$i18n.t('Register.warningWord2'))
        return
      }
      // var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!this.mobile) {
        this.$toast(this.$i18n.t('Register.warningWord1'))
        return
      }
      if (!this.verificationCode) {
        this.$toast(this.$i18n.t('Register.warningWord3'))
        return
      }
      if (!this.password) {
        this.$toast(this.$i18n.t('Register.warningWord5'))
        return
      } else {
        let regPass = /^[a-zA-Z\d]{6,18}$/
        if (!regPass.test(this.password)) {
          this.$toast(this.$i18n.t('Register.warningWord6'))
          return
        }
      }
      const params = {
        code: this.verificationCode,
        mobile: this.mobile,
        mobilePrefix: this.mobilePrefix,
        pass: this.password,
        userName: this.mobile,
        inviteCode: this.$route.query.inviteCode || '',
        otherInfo: navigator.userAgent
      }
      registerAccount(params)
        .then(res => {
          console.log('-res-', res)
          if (res.code == 200) {
            this.$toast(this.$i18n.t('Register.warningWord9'))
            window.location.href = 'http://goetechnology.com/?lang=zh-cn'
          } else if (res.code == '500000') {
            this.$toast(this.$i18n.t('Register.warningWord7'))
          } else if (res.code == '500004') {
            this.$toast(this.$i18n.t('Register.warningWord8'))
          } else if (res.code == '500006') {
            this.$toast(this.$i18n.t('Register.warningWord10'))
          } else {
            this.$toast(res.data.msg)
          }
        })
        .catch(err => {
          this.$toast(err.msg)
        })
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
  .logo {
    width: 151px;
    margin: 10px 112px 4px;
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
  .registerFrom {
    position: absolute;
    bottom: 60px;
    width: 260px;
    left: 57.5px;
    img {
      width: 100%;
    }
    .register_wrap {
      width: 216px;
      height: 250px;
      margin: -36px 22px 0px;
      background: #c8e4b4;
      padding: 25px 16px 0px;
      box-sizing: border-box;
      text-align: center;
      .title {
        line-height: 28px;
        margin: 0px;
        text-align: left;
      }
      .btnImg {
        width: 13px;
        height: 14px;
      }
      .sendCode {
        color: #ccad71;
        text-decoration: underline;
      }
    }
    .submit {
      width: 131px;
      margin: 15px 65px;
    }
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
      }
    }
  }
}

@media only screen and (width: 375px) and (height: 690px) {
  .register {
    .registerFrom {
      position: absolute;
      bottom: 120px;
      width: 260px;
      left: 55.5px;
    }
    .download {
      bottom: 150px;
    }
  }
}
</style>
