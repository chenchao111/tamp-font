import $ from 'jquery';
import request from '@/http/request';
import { date } from '@/utils';
// const sso = 'https://sso.jrj.com.cn'
import { prefix } from '@/common/constants';

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
  pageSize = 5,
  page = 1,
} = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getFundOnShelfByPage/${userId}/${pageSize}/${page}`,
    method: 'get',
  });
};
