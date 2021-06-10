<!--
  小游戏主场景
-->
<template>
  <div class="smallGame" :class="{ en: locale === 'en' }" :style="{ height: pageHeight }">
    <div class="top">
      <div class="headBox">
        <img class="headImg" :src="headImg" alt="" />
      </div>
      <span class="userName">ID:{{ infoData.nickname }}</span>
      <div class="beansBox">
        <span class="beansIcon"></span>
        <span class="balance">{{ infoData.balance }}</span>
        <span class="beansBtn" @click="onOpenDialog"></span>
        <div class="refreshBox" @click="onRefresh">
          <span class="refreshBtnIcon"></span>
          <!-- <span class="refreshBtnTxt">{{ btnTxts.refreshBtn }}</span> -->
        </div>
      </div>
    </div>
    <div class="center">
      <div class="centerWrap">
        <div class="leftBox" @click="onOpenDialog">
          <span class="adverImg"></span>
        </div>
        <div class="rightBox">
          <ul class="listWrap">
            <li class="item" v-for="(item, index) in gameList" :key="index">
              <div class="imgBox" @click="onJumpPage(item)">
                <span class="img" :class="'img_' + index"></span>
                <span class="unopenImg" v-if="!item.prodLinkUrl"></span>
              </div>
            </li>
          </ul>

          <!-- <span class="backBtn" @click="onCloseWebview" v-if="isShowBtn"></span> -->
        </div>
      </div>
    </div>

    <exchangeDialog :formData="dialogData" :visible.sync="isShow" @success="handleExchangeSuccess" />

    <rank
      :list="rankInfoData.list"
      :isMoreLoading.sync="rankInfoData.isLoading"
      :isMoreError.sync="rankInfoData.isError"
      :total="rankInfoData.total"
      @loading="handleRankLoading"
      v-if="isRank"
    />
  </div>
</template>

<script>
import exchangeDialog from '@/views/smallGame/components/exchangeDialog'
import rank from '@/views/smallGame/components/rank'
import headOtherImg from '@/assets/images/smallGame/headOther.png'
import headBoyImg from '@/assets/images/smallGame/headBoy.png'
import headGirlImg from '@/assets/images/smallGame/headGirl.png'
import tools from '@/utils/tools'
import platform from '@/utils/platform'
import { mapState } from 'vuex'
import { getUserInfo, getAuthCode, getRankingList } from '@/api/smallGame'
export default {
  name: '',
  data() {
    return {
      pageHeight: '375px',
      dialogData: {},
      isShow: false,
      infoData: { sex: 0 },
      currLinkUrl: '',
      gameList: [
        {
          testLinkUrl: '',
          prodLinkUrl: ''
        },
        {
          testLinkUrl: '',
          prodLinkUrl: ''
        },
        {
          testLinkUrl: '',
          prodLinkUrl: ''
        },
        {
          testLinkUrl: '',
          prodLinkUrl: ''
        }
      ],
      // gameList: [
      //   {
      //     testLinkUrl: 'http://18.166.222.59:7701/baccarat_h5/login_all.aspx',
      //     prodLinkUrl: 'http://game.farmfarm.org/baccarat_h5/login_all.aspx'
      //   },
      //   {
      //     testLinkUrl: 'http://18.166.222.59:7701/Sport/Login_ALL.aspx',
      //     prodLinkUrl: 'http://game.farmfarm.org/Sport/Login_ALL.aspx'
      //   },
      //   {
      //     testLinkUrl: 'http://18.166.222.59:7701/PinShiH5/Login_All.aspx',
      //     prodLinkUrl: 'http://game.farmfarm.org/PinShiH5/Login_All.aspx'
      //   },
      //   {
      //     testLinkUrl: 'http://18.166.222.59:7701/hzw/Login_ALL.aspx',
      //     prodLinkUrl: 'http://game.farmfarm.org/hzw/Login_ALL.aspx'
      //   }
      // ],
      rankInfoData: {
        isLoading: false,
        isError: false,
        pageNum: 1,
        pageSize: 10,
        list: [],
        totalList: [],
        total: 0
      }
    }
  },
  computed: {
    ...mapState('user', ['locale']),
    isShowBtn() {
      return platform.isIos
    },
    isEnvProd() {
      return process.env.VUE_APP_SERVER_ENV === 'prod'
    },
    i18nData() {
      return this.$t('SmallGame')
    },
    headImg() {
      return this.setHeadImg(this.infoData.sex)
    },
    btnTxts() {
      return this.i18nData.btnTxt
    },
    toastTxts() {
      return this.i18nData.toast
    },
    refreshBtnThrottle() {
      return tools.throttle(this.getRefresh, 3000)
    },
    isRank() {
      return this.rankInfoData.list.length > 0
    }
  },
  components: { exchangeDialog, rank },
  created() {
    this.getData()
    this.getRankList()
  },
  mounted() {
    // console.log('-locale-', this.locale)
    this.$i18n.locale = this.locale
    this.$Local(this.locale) // vant设置国际化
    // console.log('-height-', window.innerHeight)
    this.pageHeight = window.innerHeight + 'px'
  },
  methods: {
    // onCloseWebview() {
    //   console.log('关闭webview')
    //   window.location.href = 'goefarm://type=ios'
    // },
    // 设置用户头像 type == 0未知 1男 2女
    setHeadImg(type) {
      let imgUrl = ''
      switch (type) {
        case 0:
          imgUrl = headOtherImg
          break
        case 1:
          imgUrl = headBoyImg
          break
        case 2:
          imgUrl = headGirlImg
          break
        default:
          break
      }
      return imgUrl
    },
    handleExchangeSuccess(data) {
      this.infoData.balance = data
    },
    handleRankLoading() {
      this.getMoreRankList()
    },
    onOpenDialog() {
      this.isShow = true
      const { balance, rate } = this.infoData
      this.dialogData = { rate, balance }
    },
    onRefresh() {
      this.refreshBtnThrottle()
    },
    // 刷新
    getRefresh() {
      this.getData(true)
    },
    onJumpPage(item) {
      console.log('-item-', item)
      let linkUrl = this.isEnvProd ? item.prodLinkUrl : item.testLinkUrl
      if (!linkUrl) return
      console.log('-link-url-', linkUrl)
      this.currLinkUrl = linkUrl
      this.getAuth()
    },

    getAuth() {
      const { appid } = this.$route.query
      if (!appid) {
        this.$toast('appid缺失')
        return
      }
      const params = { appid }
      // console.log('-params-', params)
      getAuthCode(params)
        .then(res => {
          const code = res.data
          window.location.href = `${this.currLinkUrl}?code=${code}`
        })
        .catch(err => {
          let msg = this.i18nData.code[err.code]
          msg && this.$toast(msg)
        })
    },

    getData(isRefresh = false) {
      getUserInfo()
        .then(res => {
          // console.log('-res-', res)
          this.infoData = res.data
          isRefresh && this.$toast(this.toastTxts.refreshMsg)
        })
        .catch(err => {
          console.log(err, err.code)
          let msg = this.i18nData.code[err.code]
          // console.log('-msg-', msg)
          msg && this.$toast(msg)
        })
    },
    getRankList() {
      getRankingList().then(res => {
        // const list = this.setRankList()
        const list = res.data
        if (!list || list.length === 0) return
        // console.log('-list-', list)
        let totalList = list
        tools.sortFunc(totalList, 'asc', true, 'rank')
        totalList = totalList.map((val, index) => {
          val.rank = index + 1
          return val
        })
        // console.log('-total-list-', totalList)
        this.rankInfoData.totalList = totalList
        this.rankInfoData.total = totalList.length
        this.rankInfoData.list = totalList.slice(0, this.rankInfoData.pageSize)
      })
    },
    // 排行榜分页 - 加载更多
    getMoreRankList() {
      const { pageNum, pageSize } = this.rankInfoData
      this.rankInfoData.isLoading = true
      setTimeout(() => {
        this.rankInfoData.isLoading = false
        console.log(pageNum * pageSize, pageSize)
        let list = this.rankInfoData.totalList.slice(pageNum * pageSize, (pageNum + 1) * pageSize)
        this.rankInfoData.list = [...this.rankInfoData.list, ...list]
        this.rankInfoData.pageNum++
        // console.log('-curr-list-', this.rankInfoData.list)
      }, 500)
    },
    // 本地测试数据
    setRankList() {
      let data = {
        avatar: 'http://testapi.whkuaiyu.com/admin/img/17.png',
        createTime: '2021-03-09 02:27:00',
        dataStatus: true,
        id: 11,
        modifyTime: '2021-03-09 02:27:00',
        name: '第一名的大哥啊',
        operatorId: 1,
        rank: 1
      }
      let result = []
      for (let i = 0; i < 17; i++) {
        let mid = { ...data }
        let rank = Math.floor(Math.random() * 100)
        // console.log('-rank-', rank)
        mid.rank = rank
        mid.name = `${mid.name}--${mid.rank}`
        result.push(mid)
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/smallGame/';

.smallGame {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background: url('@{imgUrl}mainBg.png') no-repeat center / cover;

  .top {
    display: flex;
    align-items: center;
    background: url('@{imgUrl}topBg.png') no-repeat center / cover;
    color: #fff;
    padding: 3px 0 3px 6px;
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    // padding: 20px 0 10px 26px;
  }

  &.en {
    .leftBox {
      .adverImg {
        background: url('@{imgUrl}en/advertImg.png') no-repeat center / cover;
      }
    }

    .listWrap {
      .item {
        .img_0 {
          background: url('@{imgUrl}en/icon-game1.png') no-repeat center / cover;
        }

        .img_3 {
          background: url('@{imgUrl}en/icon-game2.png') no-repeat center / cover;
        }

        .img_2 {
          background: url('@{imgUrl}en/icon-game3.png') no-repeat center / cover;
        }

        .img_1 {
          background: url('@{imgUrl}en/icon-game4.png') no-repeat center / cover;
        }

        .unopenImg {
          background: url('@{imgUrl}en/icon-weikaifang.png') no-repeat center / cover;
        }
      }
    }
  }
}

.top {
  .headBox {
    overflow: hidden;
    width: 30px;
    height: 30px;
    background: url('@{imgUrl}icon-top-head.png') no-repeat center / cover;
    border-radius: 6px;

    .headImg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .userName {
    display: flex;
    align-items: center;
    height: 20px;
    background: url('@{imgUrl}inputBg.png') no-repeat center / cover;
    color: #fff;
    font-size: 12px;
    border-radius: 6px;
    padding: 0 6px;
    margin: 0 50px 0 10px;
  }

  .beansBox {
    position: relative;
    display: flex;
    align-items: center;
    background: url('@{imgUrl}inputBg.png') no-repeat center / cover;

    .beansIcon {
      position: absolute;
      left: -16px;
      width: 22px;
      height: 23px;
      background: url('@{imgUrl}icon-beans.png') no-repeat center / cover;
    }

    .balance {
      display: flex;
      align-items: center;
      height: 15px;
      color: #fff;
      font-size: 12px;
      padding: 0 16px 0 12px;
    }

    .beansBtn {
      width: 15px;
      height: 15px;
      background: url('@{imgUrl}icon-add-btn.png') no-repeat center / cover;
    }

    .refreshBox {
      position: absolute;
      top: -4px;
      right: -40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      font-size: 18px;
      line-height: 22px;

      .refreshBtnIcon {
        width: 22px;
        height: 25px;
        background: url('@{imgUrl}refreshBtn.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}

.centerWrap {
  display: flex;
  justify-content: center;
  width: 100%;
  // padding-left: 30px;

  .leftBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 172px;
    height: 294px;
    background: url('@{imgUrl}advertBg.png') no-repeat center / cover;

    .adverImg {
      width: 165px;
      height: 281px;
      background: url('@{imgUrl}zh/advertImg.png') no-repeat center / cover;
    }
  }
  .rightBox {
    position: relative;
    display: flex;
    align-items: center;

    .btnBox {
      display: flex;
      justify-content: center;
      // width: 140px;
      padding: 10px;
      .rightBtn {
        width: 25px;
        height: 40px;
        background: url('@{imgUrl}icon-right-arrow.png') no-repeat center / cover;
      }
    }

    .backBtn {
      position: absolute;
      top: -40px;
      right: -10px;
      width: 40px;
      height: 40px;
      background: url('@{imgUrl}backBtn.png') no-repeat center;
      background-size: 100% 100%;
      color: #fff;
      font-size: 18px;
    }
  }
}

.listWrap {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: 364px;
  height: 100%;
  padding: 0 40px;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    .imgBox {
      position: relative;
      width: 167px;
      height: 139px;

      .img {
        position: absolute;
      }
      .img_0 {
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 149px;
        background: url('@{imgUrl}zh/icon-game1.png') no-repeat center / cover;
      }

      .img_3 {
        bottom: 0;
        left: -2px;
        right: 0;
        width: 173px;
        height: 100%;
        background: url('@{imgUrl}zh/icon-game2.png') no-repeat center / cover;
      }

      .img_2 {
        bottom: 0;
        right: -2px;
        width: 175px;
        height: 155px;
        background: url('@{imgUrl}zh/icon-game3.png') no-repeat center / cover;
      }

      .img_1 {
        bottom: 0;
        right: -4px;
        width: 209px;
        height: 156px;
        background: url('@{imgUrl}zh/icon-game4.png') no-repeat center / cover;
      }

      .unopenImg {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 150px;
        height: 64px;
        background: url('@{imgUrl}zh/icon-weikaifang.png') no-repeat center / cover;
      }
    }
  }
}
</style>
