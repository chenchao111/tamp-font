import router from 'umi/router';
import request from '@/http/request';

import { login } from '@/services';
import Init from '@/global/init';
export default {
  namespace: 'login',
  state: {
    // 图形状态码，用来控制获取状态码按钮样式
    imgCodeCss: false,
    // 图形状态码，用来控制获取状态码按钮内容
    imgCodeInfo: '获取验证码',
    // 倒计时
    timeId: 0,
    isError: false, // 是否有错误信息
    errorInfo: '', // 错误信息内容
    mobile: '', // 手机号
    imgCode: '', // 图形验证码
    mobileCode: '', // 手机验证码
    imgCodeUrl: '//sso.jrj.com.cn/service/create',
    isAgreement: false, // 是否展示协议内容区域
    location: {},
    isModal: false, // 是否显示合并账户弹窗
    passportId: '', // 合并账户操作需要的passportid
  },
  effects: {
    *handleQueryCode({ payload, callback }, { call, put }) {
      try {
        const res = yield call(login.queryMessageCode, payload);
        console.log('res: ', res);
        yield put({
          type: 'imgCode',
          payload: {
            isError: false,
            errorInfo: '',
          },
        });
      } catch (error) {
        yield put({
          type: 'imgCode',
          payload: {
            isError: true,
            errorInfo: error,
          },
        });
        consle.error(error);
      }
    },
  },
  reducers: {
    handleInputChange(state, { payload }) {
      Object.assign(state, payload);
    },
    countDown(state, { payload }) {
      Object.assign(state, payload);
    },
    mobileCheck(state, { payload }) {
      Object.assign(state, payload);
    },
    imgCodeUrlChange(state, { payload }) {
      Object.assign(state, payload);
    },
    imgCode(state, { payload }) {
      Object.assign(state, payload);
    },
    mask(state, { payload }) {
      Object.assign(state, payload);
    },
    modal(state, { payload }) {
      Object.assign(state, payload);
    },
    backUrl(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == '/home' || pathname == '/') {
        }
      });
    },
  },
};
