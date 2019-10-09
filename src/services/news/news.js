import $ from 'jquery';
import request from '@/http/request';
import { prefix } from '@/common/constants';

// 查看资讯详情
// sslapi.jrj.com.cn/itougu/mapi/wireless/information/queryNewsDetail?infourl=${infourl}
export const queryNewsDetail = ({ infourl = '' } = {}) => {
  return request({
    url: `${prefix.SSL_JRJ_URL}/itougu/mapi/wireless/information/queryNewsDetail`,
    method: 'get',
    params: { infourl },
  });
};
