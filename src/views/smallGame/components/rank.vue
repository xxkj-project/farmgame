<!-- 
   排行榜
-->
<template>
  <div class="dialog" :style="{ width: dialogStyle.width, height: dialogStyle.height }">
    <div class="rankWrap">
      <div class="rankContent">
        <div class="listWrap">
          <div class="listContent">
            <van-list
              class="listBox"
              v-model="isLoading"
              :finished="isFinished"
              finished-test="没有更多了"
              :error.sync="isError"
              error-text="请求失败，请重新加载"
              :immediate-check="false"
              @load="handleLoading"
            >
              <div class="item" v-for="(item, index) in list" :key="index">
                <div class="leftBox">
                  <span class="rankIcon" :class="'icon_' + item.rank" v-if="item.rank < 4"></span>
                  <span class="rankNumber" v-else>{{ item.rank }}</span>
                </div>
                <img class="headIcon" :src="item.avatar" alt="" />
                <p class="userName">{{ item.name }}</p>
              </div>
            </van-list>
          </div>
          <div class="arrowWrap">
            <span class="icon"></span>
          </div>
        </div>
        <span class="rankBtn" @click="onRank"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dialogStyle: {
        width: 0,
        height: 0
      },
      isOpen: false,
      isFinished: false
    }
  },
  props: {
    isMoreLoading: {
      type: Boolean,
      default: false
    },
    isMoreError: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.isMoreLoading
      },
      set(val) {
        this.$emit('update:isMoreLoading', val)
      }
    },
    isError: {
      get() {
        return this.isMoreError
      },
      set(val) {
        this.$emit('update:isMoreError', val)
      }
    }
  },
  components: {},
  watch: {
    list: {
      handler(val) {
        // console.log('-total-', this.total)
        // console.log('-watch-list-', val)
        if (val.length === this.total) {
          this.isFinished = true
          // this.$toast('数据全部加载完成')
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.dialogStyle.height = window.innerHeight + 'px'
  },
  methods: {
    onRank() {
      let classNames = this.isOpen ? ['inAni', 'outAni'] : ['outAni', 'inAni']
      this.setClassName(...classNames)
      this.isOpen = !this.isOpen
      this.dialogStyle.width = this.isOpen ? '100%' : '0'
    },
    setClassName(addClassName, removeClassName) {
      const rankEl = document.querySelector('.rankWrap')
      rankEl.classList.add(addClassName)
      setTimeout(() => {
        rankEl.classList.remove(removeClassName)
      }, 0)
    },
    handleLoading() {
      this.$emit('loading')
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/smallGame/rank/';

@mainColor: #9b824c;
@rankWidth: 230px;
@rankAniWidth: -230px;

// 动画速度属性 linear(匀速) ease ease-in ease-out ease-in-out

.outAni {
  animation: outStatusAni 0.4s ease-out forwards;
}

@keyframes outStatusAni {
  form {
    left: @rankAniWidth;
  }
  to {
    left: 0;
  }
}

.inAni {
  animation: inStatusAni 0.4s ease-out forwards;
}

@keyframes inStatusAni {
  0% {
    left: 0;
  }
  100% {
    left: @rankAniWidth;
  }
}

.dialog {
  position: fixed;
  // width: 100%;
}

.rankWrap {
  position: fixed;
  top: 0;
  left: @rankAniWidth;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 36px 0 10px 0;
  box-sizing: border-box;

  .rankContent {
    flex: 1;
    display: flex;
    align-items: center;
  }
}

.rankContent {
  .listWrap {
    overflow: hidden;
    position: relative;
    width: @rankWidth;
    background: #fffaef;
    padding: 4px 4px;
    border-radius: 0 8px 8px 0;
    box-sizing: border-box;
  }
  .rankBtn {
    width: 25px;
    height: 90px;
    background: url('@{imgUrl}rankBtnBg.png') no-repeat center;
    background-size: 100% 100%;
  }
}

.listWrap {
  .listContent {
    overflow: auto;
    height: 300px;
  }

  .arrowWrap {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    background: #fffaef;
    padding: 4px 0;

    .icon {
      width: 14px;
      height: 6px;
      background: url('@{imgUrl}icon-bottom-arrow.png') no-repeat center;
      background-size: 100% 100%;
    }
  }
}

.listBox {
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    background: #f9f0dd;
    color: @mainColor;
    border-radius: 8px;
    padding: 6px 0;
    margin-bottom: 4px;

    .leftBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      margin: 0 2px;

      .rankIcon {
        width: 35px;
        height: 28px;

        &.icon_1 {
          background: url('@{imgUrl}icon-rank-1.png') no-repeat center;
          background-size: 100% 100%;
        }
        &.icon_2 {
          background: url('@{imgUrl}icon-rank-2.png') no-repeat center;
          background-size: 100% 100%;
        }
        &.icon_3 {
          background: url('@{imgUrl}icon-rank-3.png') no-repeat center;
          background-size: 100% 100%;
        }
      }

      .rankNumber {
        font-size: 18px;
      }
    }

    .headIcon {
      display: block;
      width: 38px;
      height: 38px;
    }

    .userName {
      font-size: 13px;
      text-align: left;
      margin-block-start: 0; // p标签会根据字体大小会自动设置margin值
      margin-block-end: 0;
      padding-left: 12px;
    }
  }
}
</style>
