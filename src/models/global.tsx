// @ts-ignore
import Init from '@/global/init';
import Cookies from 'js-cookie';
import { url as Url } from '@/utils';
import { login as Login } from '@/services';
import Init from '@/global/init';
const init = new Init();
const { tgId, userId } = init;

export default {
  namespace: 'global',
  state: {
    appId: 'wxb1cf0414fa10d42b',
    init,
    tgid: tgId(),
    userid: userId(),
  },
  effects: {
    *fetch({ payload }, { call, put }) {},
  },
  reducers: {
    setTgId(state, { payload }) {
      const urlTgid = Url.queryUrl().tgid;
      const cookirTgid = Cookies.get('tgid');
      if (urlTgid && urlTgid !== cookirTgid) {
        Cookies.set('tgid', urlTgid);
        Object.assign(state, { urlTgid });
      }
    },
    setUserId(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(async ({ pathname }) => {
        console.log('history: ', history);
        try {
          if (pathname === '/home') {
            // 当访问的是首页的时候需要进行授权判断处理
            // const { tgId, appid, authorization, checkIsAuthorization, checkLogin, updateVisitTgInfo } = new Init()
            // 设置tgid
            dispatch({
              type: 'setTgId',
            });
            // const {isLogin, userid} = await checkLogin()
            // console.log('isLogin: ', isLogin)
            // const isAuth = checkIsAuthorization()
            // const code = Url.queryUrl().code
            // if (!isLogin) { // 未登录
            //   if (!isAuth) { // 未授权
            //     authorization()
            //   } else { // 已经授权
            //     const bindInfo = await Login.queryIsBindPassportid({ // 种部分cookie
            //       code, appid
            //     })
            //     console.log('bindInfo: ', bindInfo)
            //     // 保存openId
            //     Cookies.remove('openId')
            //     Cookies.set('openId', bindInfo.openId)
            //     const {isLogin, userid} = await checkLogin() // 拿上面的cookie种itougu, cookie
            //     if (isLogin) { // 已经登录
            //       // 设置tgid
            //       dispatch({
            //         type: 'setUserId',
            //         payload: {
            //           userid
            //         }
            //       })
            //     }
            //     // 已经绑定
            //     if (parseInt(bindInfo.resultCode) === 0) { // 已经绑定
            //       await updateVisitTgInfo(tgId()) // 更新访问的tgid
            //     }
            //   }
            // } else { // 已经登录
            //   // 设置tgid
            //   dispatch({
            //     type: 'setUserId',
            //     payload: {
            //       userid
            //     }
            //   })
            //   await updateVisitTgInfo(tgId()) // 更新访问的tgid
            // }
          }
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
};
