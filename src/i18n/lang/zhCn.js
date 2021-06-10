/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 10:15:54
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-29 13:05:13
 * @Desc: 国际化 - 中文
 */
const SmallGame = {
  dialog: {
    text1: '余额',
    text2: '当前比例',
    input: [
      { txt1: '输入兑换', txt2: '数量' },
      { txt1: '兑出', txt2: '数量' }
    ],
    btn: {
      confirmTxt: '确定'
    }
  },
  btnTxt: {
    refreshBtn: '刷新'
  },
  toast: {
    refreshMsg: '刷新成功',
    successMsg: '兑换成功',
    validateMsg: '请输入兑换数量',
    confirmMsg: '确认兑换?'
  },
  code: {
    401: '认证失败',
    600002: '余额不足'
  }
}

const Register = {
  roegion: '国家', //服 务
  phoneNumber: '手机号',
  code: '验证码',
  pass: '密码', //密码
  sendCode: '发送验证码',
  warningWord1: '手机号不能为空！',
  warningWord2: '请选择国家号码！',
  warningWord3: '手机验证码不能为空！',
  warningWord4: '手机验证码错误！',
  warningWord5: '密码不能玩为空！',
  warningWord6: '密码为6-18个字母或数字！',
  warningWord7: '该手机号已注册！',
  warningWord8: '验证码不正确！',
  warningWord9: '注册成功！',
  warningWord10: '未获取到邀请码,请重新扫码！',
  warningWord11: '点击上方···使用浏览器访问'
}

export default {
  SmallGame,
  Register
}
