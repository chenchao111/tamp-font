import $ from 'jquery';
import request from '@/http/request';
import { date } from '@/utils';
// const sso = 'https://sso.jrj.com.cn'
import { prefix } from '@/common/constants';

// 获取已上架保险列表---分页
// c.jrj.com.cn/wealth/library/getInsuranceOnShelfByPage?userId={userId}&page={page}&pageSize={pageSize}&firstCategory={firstCategory}&secondCategory={secondCategory}
export const queryInsures = ({
  userId = '', // 投顾id
  pageSize = 10,
  page = 1,
  firstCategory = '',
  secondCategory = '',
} = {}) => {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/library/getInsurancePoolByPage?userId=${userId}&page=${page}&pageSize=${pageSize}&firstCategory=${firstCategory}&secondCategory=${secondCategory}`,
    method: 'get',
  });
};
