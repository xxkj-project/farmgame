/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-29 13:27:23
 * @Desc: 国际化 - 英语
 */
const SmallGame = {
  dialog: {
    text1: 'balance', // 余额
    text2: 'current ratio', // 当前比例
    input: [
      {
        txt1: 'enter redemption', // 输入兑换
        txt2: 'quantity' // 数量
      },
      {
        txt1: 'cash out', // 兑出
        txt2: 'quantity' // 数量
      }
    ],
    btn: {
      confirmTxt: 'confirm' // 确定
    }
  },
  btnTxt: {
    refreshBtn: 'Refresh' // 刷新
  },
  toast: {
    refreshMsg: 'Refresh successfully',
    successMsg: 'Successful redemption',
    validateMsg: 'Please enter the exchange amount',
    confirmMsg: 'Confirm redemption?'
  },
  code: {
    401: 'Authentication failed', // 认证失败
    600002: 'Insufficient balance' // 余额不足
  }
}

const Register = {
  roegion: 'Country', // Service
  phoneNumber: 'Mobile number',
  code: 'Verification code',
  pass: 'password', // password
  sendCode: 'Send code',
  warningWord1: 'Mobile number cannot be empty! ',
  warningWord2: 'Please select a country code! ',
  warningWord3: 'Phone verification code cannot be empty! ',
  warningWord4: 'Mobile phone verification code is wrong! ',
  warningWord5: 'Password cannot be blank! ',
  warningWord6: 'Password is 6-18 letters or numbers! ',
  warningWord7: 'the mobile number has been registered!',
  warningWord8: 'the verification code is incorrect!',
  warningWord9: 'Registration succeeded!',
  warningWord10: 'Invitation code not obtained, please scan again！',
  warningWord11: 'Click ••• Use Browser to access'
}

export default {
  SmallGame,
  Register
}
