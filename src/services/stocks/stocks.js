import $ from 'jquery';
import request from '@/http/request';
import { date } from '@/utils';
// const sso = 'https://sso.jrj.com.cn'
import { prefix } from '@/common/constants';

// 获取已上架股票列表---不支持分页
export const queryStocks = ({ tgid } = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getStockOnShelf/${tgid}`,
    method: 'get',
  });
};
