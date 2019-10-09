import Cookies from 'js-cookie';
import { login, visit, common } from '@/services';
import { url as Url } from '@/utils';
import { status } from '@/common/constants';
import router from 'umi/router';

export default class Init {
  constructor({ appid = 'wxb1cf0414fa10d42b' } = {}) {
    this.appid = appid;
  }
  // 获取当前用户访问的tgId
  tgId = () => {
    const tgid = Url.queryUrl().tgid || Cookies.get('tgid');
    return tgid;
  };
  // 获取当前登录用户的passportid
  userId = () => {
    return Cookies.get('itg_passport_userid');
  };
  // 获取登录用户的openId
  openId = () => {
    return Cookies.get('openId');
  };
  // 渠道code
  channelCode = async () => {
    try {
      const cCode = await common.queryTgChannelCode({ tgid: this.tgId() });
      return Promise.resolve(cCode);
    } catch (error) {
      console.error(error);
    }
  };
  // 授权
  authorization = (url = `${window.location.href}`) => {
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(`${url}`) + '&' + 'response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    window.location.replace(
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.appid
      }&redirect_uri=${encodeURIComponent(
        url
      )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    );
  };
  // 检查是否登录
  checkLogin = async () => {
    try {
      const user = await login.getBasicUserInfo2();
      return Promise.resolve(
        !user || !user.userId
          ? { isLogin: false }
          : Object.assign(user, { isLogin: true, userid: user.userId })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // 检查是否已经授权
  checkIsAuthorization = (url = `${window.location.href}`) => {
    return Url.queryUrl(url).code ? true : false;
  };
  // 检查是否开通直播
  checkIsZhibo = async () => {
    try {
      const { showType } = await common.queryTgRoomInfo({ tgid: this.tgId() });
      showType = JSON.parse(showType);
      return Promise.resolve(showType.includes('1'));
    } catch (error) {
      console.error(error);
    }
  };
  // 更新访问的tgid
  updateVisitTgInfo = async tgid => {
    try {
      // 获取当前用户信息
      const { userId } = await login.getBasicUserInfo2();
      console.log('user.userId: ', userId);
      const visitAddress = await visit.pushVisitAddress({
        userId,
        roomAddress: tgid,
      });
      console.log('visitAddress: ', visitAddress);
      return Promise.resolve(visitAddress);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // 跳转登录
  login = backUrl => {
    console.log(backUrl);
    router.push({
      pathname: '/login',
      query: {
        backUrl,
      },
    });
  };
  // 购买前的相关校验(购前页==>订单确认页)
  /**
   * 1. 查看是否登录(已经登录跳2、未登录跳3)
   * 2、已经登录的用户通过passportId检查当前账户是否绑定手机号(已经绑定跳4， 未绑定跳5)
   * 3、未登录的用户直接跳转登录页面（跳6）
   * 4、已经绑定的用户，直接执行下一步跳转订单确认页
   * 5、未绑定跳转登录页面（跳6）
   * 6、登录页面，点击登录按钮进行手机号和微信信息绑定（绑定成功跳7，返回4018跳8）
   * 7、返回购前页/直接进入订单确认页
   * 8、是否进行账户合并(合并进入9，不合并返回6)
   * 9、合并账户，合并成功返回购前页
   */
  beforeBuyCheck = async () => {
    try {
      const { isLogin } = await this.checkLogin();
      if (isLogin) {
        const { mobile } = await login.queryUserBindInfo({
          passportId: this.userid(),
        });
        if (mobile) {
          return Promise.resolve(true);
        } else {
          // 跳转登录
          return Promise.resolve(false);
        }
      } else {
        // 跳转登录
        return Promise.resolve(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
