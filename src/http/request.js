import axios from 'axios';
import { status } from '@/common/constants';
import { Toast } from 'antd-mobile';

// 成功状态码
const successCode = {
  0: '成功',
  4018: '合并账户',
  true: '直播室请求成功',
};
// 失败状态码
const errorCode = {};
const selectKey = (obj, keys, _default = undefined) => {
  let key = keys.find(key => Reflect.has(obj, key));
  key === undefined && (key = _default);
  return key;
};
const checkSuccessOrFailed = res => {
  // 查找状态code
  const code = selectKey(res, ['code', 'retCode', 'resultCode', 'success', 'ret']);
  if (!code) {
    // 没有code默认成功
    return {
      flag: status.SUCCESS,
      data: res,
    };
  } else {
    // 有code，判断code是成功还是失败
    if (successCode[res[code]]) {
      // 成功
      return {
        flag: status.SUCCESS,
        data: Reflect.has(res, 'data') ? res.data : res,
      };
    } else {
      // 失败
      // 获取后端返回的失败信息描述
      const errMsg = selectKey(res, ['msg', 'resultMsg', 'message']);
      console.log('errMsg: ', errMsg);
      return {
        flag: status.FAILED,
        data: res[errMsg] || '获取后端数据失败',
      };
    }
  }
};
const requestInfo = response => {
  const res = response.data;
  return checkSuccessOrFailed(res);
};

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true, // 请求带cookie
  // 默认等待请求头格式
  headers: {
    // 设置请求头格式
    'Content-Type': 'application/json;charset=UTF-8',
  },
  responseType: 'json',
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 对拦截的config进行配置
    return config;
  },
  error => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  // http请求成功
  async response => {
    return new Promise((resolve, reject) => {
      const { flag, data } = requestInfo(response);
      if (flag === status.SUCCESS) {
        return resolve(data);
      } else {
        console.log('失败');
        Toast.fail(data, 2);
        return reject(data);
      }
    });
  },
  // http请求失败：状态码不在200~300之间
  error => {
    console.log('请求状态码失败');
    return Promise.reject(error);
  }
);

// axios本版本不支持jsonp 自己拓展一个
service.jsonp = url => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = result => {
      resolve(result);
    };
    var JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};

export default service;
