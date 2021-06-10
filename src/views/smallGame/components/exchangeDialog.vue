<!--
 * @Author: wangshengxian
 * @Date: 2021-01-18 17:57:03
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 15:34:41
 * @Desc: 兑换dialog
-->
<template>
  <div class="dialog" :class="{ en: locale === 'en' }">
    <van-dialog v-model="dialogVisible" :showConfirmButton="false" get-container="smallGame">
      <div class="dialogWrap">
        <div class="cancelBtn" @click="onCancel">
          <img src="@/assets/images/smallGame/icon-cancel-btn.png" alt="" />
        </div>

        <div class="titleWrap">
          <span class="titleBg"></span>
        </div>

        <div class="mainTop">
          <!-- <span class="goeIcon"></span> -->
          <span class="beansIcon"></span>
          <p class="balance">{{ dialogTxts.text1 }}：{{ formData.balance }}</p>
          <div class="other">
            <p>({{ dialogTxts.text2 }}1</p>
            <span class="beansIcon smallBeansIcon"></span>
            <p class="result">={{ formData.rate }}</p>
            <span class="goeIcon logIcon"></span>
            <p>)</p>
          </div>
        </div>
        <div class="mainBottom">
          <div class="inputBox">
            <p class="labelTxt">
              {{ inputTxts[0].txt1 }}<span class="beansIcon labelBeansIcon"></span>{{ inputTxts[0].txt2 }}:
            </p>
            <van-field
              class="inputTxt beansInput"
              type="digit"
              v-model="inputData.beansVal"
              clearable
              @blur="onBlur"
              @clear="onClear"
            ></van-field>
          </div>
          <div class="inputBox">
            <p class="labelTxt">
              {{ inputTxts[1].txt1 }}<span class="goeIcon labelGoeIcon"></span>{{ inputTxts[1].txt2 }}:
            </p>
            <van-field class="inputTxt goeInput" v-model="inputData.goeVal" disabled></van-field>
          </div>

          <div class="confirmBtn" @click="onConfirm">{{ btnTxts.confirmTxt }}</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import jsPrecision from '@/utils/jsPrecision'
import { mapState } from 'vuex'
import { exchangeGameCoin } from '@/api/smallGame'
export default {
  name: '',
  data() {
    return {
      inputData: {
        beansVal: '',
        goeVal: ''
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState('user', ['locale']),
    i18nData() {
      return this.$t('SmallGame')
    },
    dialogTxts() {
      return this.i18nData.dialog
    },
    inputTxts() {
      return this.dialogTxts.input
    },
    btnTxts() {
      return this.dialogTxts.btn
    },
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onCancel() {
      this.dialogVisible = false
    },
    onBlur() {
      // console.log('-失去焦点-', this.inputData, this.formData)
      const { beansVal } = this.inputData
      if (!beansVal) return
      const { rate } = this.formData
      this.inputData.goeVal = jsPrecision.mul(beansVal, rate)
    },
    onClear() {
      this.inputData.goeVal = ''
    },
    onConfirm() {
      this.valideFunc(params => {
        console.log('-params-', params)
        exchangeGameCoin(params)
          .then(res => {
            console.log('-res-', res)
            const data = res.data
            // const exchangeVal = params.amount
            this.$toast(this.i18nData.toast.successMsg)
            this.$emit('success', data)
            this.dialogVisible = false
          })
          .catch(err => {
            console.log(err, err.code)
            let msg = this.i18nData.code[err.code]
            // console.log('-msg-', msg)
            msg && this.$toast(msg)
          })
      })
    },
    valideFunc(callback) {
      const { beansVal } = this.inputData
      console.log('-兑入数量-', +beansVal)
      // const { balance } = this.formData
      // console.log('-兑入数量-', +beansVal, '-余额-', +balance)
      if (!beansVal) {
        this.$toast(this.i18nData.toast.validateMsg)
        return
      }
      this.$dialog
        .confirm({
          message: this.i18nData.toast.confirmMsg
        })
        .then(() => {
          const params = { amount: +beansVal }
          callback(params)
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/smallGame/';

// /deep/ .van-overlay {
//   width: 100vw;
// }

/deep/ .van-dialog {
  overflow: visible;
  top: 180px;
  width: 340px;
  background: rgba(0, 0, 0, 0);
}

.dialog {
  &.en {
    /deep/ .van-dialog {
      width: 380px;
    }

    .dialogWrap {
      .inputBox {
        .labelTxt {
          width: 170px;
        }
      }
    }

    .titleBg {
      width: 131px;
      height: 50px;
      background: url('@{imgUrl}en/dialogTitleBg.png') no-repeat center / cover;
    }
  }
}

.dialogWrap {
  position: relative;
  // height: 224px;
  height: 260px;
  background: url('@{imgUrl}dialogBg.png') no-repeat center;
  background-size: 100% 100%;
  padding: 0 10px;

  .beansIcon {
    width: 21px;
    height: 24px;
    background: url('@{imgUrl}icon-beans.png') no-repeat center / cover;
  }

  .goeIcon {
    width: 24px;
    height: 24px;
    background: url('@{imgUrl}icon-log.png') no-repeat center / cover;
  }
}

.cancelBtn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 888;
  width: 36px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: orange;

  img {
    width: 13px;
    height: 15px;
  }
}

.titleWrap {
  position: relative;
  width: 100%;
  height: 35px;
  // background: #fff;

  .titleBg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 50px;
    background: url('@{imgUrl}zh/dialogTitleBg.png') no-repeat center / cover;
  }
}

.mainTop {
  display: flex;
  align-items: center;
  height: 38px;
  // background: #fff;
  font-size: 12px;
  padding-left: 14px;

  .logIcon {
    margin: 0 4px 0 2px;
  }

  .balance {
    padding: 0 6px;
  }

  .other {
    display: flex;
    align-items: center;
    color: #666;

    .beansIcon {
      width: 14px;
      height: 16px;
      margin: 0 2px;
    }
  }
}

.mainBottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

  .inputBox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    .labelTxt {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 110px;
      font-size: 12px;
      margin-right: 20px;

      .labelBeansIcon {
        margin: 0 4px 0 2px;
      }

      .labelGoeIcon {
        margin: 0 4px 0 2px;
      }
    }

    /deep/ .van-cell {
      width: 160px;
      padding: 0;
      line-height: 24px;
      border: 1px solid #ccc;
    }

    .inputTxt {
      height: 24px;
      padding-left: 4px;
      color: #000;

      &.goeInput {
        background: rgba(105, 105, 105, 0.6);
      }
    }
  }

  .confirmBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    height: 40px;
    // width: 77px;
    // height: 35px;
    background: url('@{imgUrl}icon-confirm-btn.png') no-repeat center / cover;
    font-size: 18px;
    color: #fff;
  }
}

/deep/ .van-field__control:disabled {
  color: #000;
}
</style>
