import $ from 'jquery';
import request from '@/http/request';
import { prefix } from '@/common/constants';

// 查询我的收益
// c.jrj.com.cn/wealth/order/getYlbTotalAsset/{id}
export const queryMyIncome = ({ userid = '' } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/order/getYlbTotalAsset/${userid}`,
    method: 'get',
  });
};
