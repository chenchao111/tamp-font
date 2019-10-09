import $ from 'jquery';
import request from '@/http/request';
import { date } from '@/utils';
// const sso = 'https://sso.jrj.com.cn'
import { prefix } from '@/common/constants';

const d = date.formatDate(new Date(), 'yyyy-MM-dd');
const dN = date.formatDate(new Date(), 'yyyyMMddHHmmss');

// 查询投顾老师和工作室相关信息
// c.jrj.com.cn/wealth/marketing/getUserInfoForReport?userId={id}
export const queryTgInfo = ({ userId = null } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/marketing/getUserInfoForReport`,
    method: 'get',
    params: { userId },
  });
};
// 查询签到
// http://i.jrj.com.cn/jifen/cfvd/index?biz=2&shopOwnerId=141120010079383950
export const querySignInfo = ({
  biz = 2, // 默认 1、全局 2:财富V店
  shopOwnerId = null,
} = {}) => {
  return $.ajax({
    url: `${prefix.I_JRJ_URL}/jifen/cfvd/index`,
    type: 'get',
    dataType: 'json',
    data: { biz, shopOwnerId },
  });
};
// 签到
// i.jrj.com.cn/jifen/cfvd/sign?biz={biz}&taskId={taskId}&timeStamp={timeStamp}&sign={sign}&shopOwnerId={shopOwnerId}
export const signIn = ({
  biz = '2',
  taskId = '100001',
  timeStamp = dN,
  sign = 'test',
  shopOwnerId = '',
} = {}) => {
  return $.ajax({
    url: `${prefix.I_JRJ_URL}/jifen/cfvd/sign`,
    type: 'get',
    dataType: 'json',
    data: { biz, taskId, timeStamp, sign, shopOwnerId },
  });
};

// 获取工作室产品模块排序和展示情况
// https://c.jrj.com.cn/wealth/setting/getRoomSetting
export const queryRoomProductList = ({ tgid = null } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/setting/getRoomSetting`,
    method: 'get',
    params: { tgid },
  });
};

// 获取所有已经上架的股票
// https://c.jrj.com.cn/wealth/library/getStockOnShelf/{id}'
export const queryStocks = ({ tgid = null } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getStockOnShelf/${tgid}`,
    method: 'get',
  });
};

// 获取所有内参
// https://sslapi.jrj.com.cn/itougu/mapi/wireless/tips/tgmy/{tgId}?passportId={passportId}&ps=3&tid={lastId}&type=2
// http://c.jrj.com.cn/wireless/tips/tgmy/141120010079383950?passportId=141120010079383950&ps=1&tid=29
export const queryTips = ({
  userid = null,
  tgid = null,
  passportId = null,
  ps = 3,
  tid = 0,
  type = 2,
} = {}) => {
  // return request.jsonp(`${jrj}/wireless/tips/tgmy/${_default.tgid}?ps=1&tid=10&type=2`)
  return request({
    url: `${prefix.S_JRJ_URL}/itougu/mapi/wireless/tips/tgmy/${tgid}`,
    method: 'get',
    withCredentials: false,
    headers: {
      passportId: userid,
    },
    params: {
      ps,
      tid,
      type,
    },
  });
};

// 今日必读
// http://stock.jrj.com.cn/share/news/app/yzs/ycdj.js
export const queryTodayNews = options => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${prefix.STOCK_JRJ_URL}/share/news/app/yzs/ycdj.js?v=${Date.now()}`,
      type: 'get',
      dataType: 'json',
      success: data => resolve(data),
      error: error => reject(error),
    });
  });
};

// 获取已上架基金---灵犀智投
export const queryFundSpecial = ({ userId = null } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getOwnFundOnShelf/${userId}`,
    method: 'get',
  });
};
// 获取已上架基金列表---分页
export const queryFunds = ({
  userId = '', // 投顾id
  pageSize = 10,
  page = 1,
} = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getFundOnShelfByPage/${userId}/${pageSize}/${page}`,
    method: 'get',
  });
};

// 获取已上架保险列表
export const queryInsures = ({
  userId = '', // 投顾id
  showFee = 1,
  page = 1,
  pageSize = 5,
} = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getInsuranceOnShelfByPage`,
    method: 'get',
    params: { userId, showFee, page, pageSize },
  });
};

// 智能盯盘
// sslapi.jrj.com.cn/zxhq/sapi/semaphore/optional_intelligence
// https://t.jrj.com.cn/zxhq/sapi/semaphore/optional_intelligence?date=2019-05-22
export const queryZndps = ({ userid = null, date = d } = {}) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${prefix.T_JRJ_URL}/zxhq/sapi/semaphore/optional_intelligence`,
      type: 'get',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('passportid', userid);
      },
      data: {
        date,
      },
      success: data => resolve(data),
      error: error => reject(error),
    });
  });
};

// 获取直播室信息
// http://c.jrj.com.cn/xlive/getRoomIndex.jspa?adviserId=181030010002225102
export const queryZhibos = ({ adviserId = '' } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/xlive/getRoomIndex.jspa`,
    method: 'get',
    params: { adviserId },
  });
};

// 查询游客上次访问的tgid
// http://c.jrj.com.cn/wealth/marketing/getVisitAddress/{userId}

// 记录游客访问的tgid
// http://c.jrj.com.cn/wealth/marketing/recordVisitAddress
export const pushVisitAddress = ({ userId = '', roomAddress = '' } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/marketing/recordVisitAddress`,
    method: 'post',
    params: { userId, roomAddress },
  });
};
