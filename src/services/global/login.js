import request from '@/http/request';
import { prefix } from '@/common/constants';

export function getBasicUserInfo2(options) {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/query/afp-info`,
    method: 'get',
  });
}
// 查询当前微信是否绑定passportid
export function queryIsBindPassportid({ code = '', appid = '' } = {}) {
  return request({
    url: `${prefix.SSO_JRJ_URL}/sso/weixin/mpwxCodeLogin`,
    method: 'get',
    params: { code, appid },
  });
}

// 查询当前账户绑定情况
// http://sso.jrjc.local/sso/passport/userInfoState
export function queryUserBindInfo({ passportId = '' } = {}) {
  return request({
    url: `${prefix.SSO_JRJ_URL}/sso/passport/userInfoState`,
    method: 'get',
    params: { passportId },
  });
}
// 获取短信验证码
// https://sso.jrj.com.cn/sso/ajaxRequireCode
export function queryMessageCode({ mobile = '', imgCode = '', bizSource = 'GZS' } = {}) {
  return request({
    url: `${prefix.SSO_JRJ_URL}/sso/ajaxRequireCode`,
    method: 'post',
    params: { mobile, imgCode, bizSource },
  });
}

// 微信 APP 内使用公众号授权 code 登录后，绑定通行证账号
// https://sso.jrj.com.cn/sso/weixin/weChatBindPassport
export function loginPlatform({
  mobile = '',
  verifyCode = '',
  bizSource = 'GZS',
  appParam = 'GZS',
  newLogic = 1,
} = {}) {
  return request({
    url: `${prefix.SSO_JRJ_URL}/sso/weixin/weChatBindPassport`,
    method: 'get',
    params: {
      mobile,
      verifyCode,
      bizSource,
      appParam,
      newLogic,
    },
  });
}

// 微信账户与手机账户强制绑定
// https://sso.jrj.com.cn/sso/weixin/wxMobilePassportMerge
export function mergeWechatAndPhone({ passportId = '', source = 1 } = {}) {
  return request({
    url: `${prefix.SSO_JRJ_URL}/sso/weixin/wxMobilePassportMerge`,
    headers: {
      passportId: passportId,
    },
    method: 'get',
    params: {
      source,
    },
  });
}
