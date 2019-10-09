import request from '@/http/request';
import { prefix } from '@/common/constants';

// 记录游客访问的tgid
// http://c.jrj.com.cn/wealth/marketing/recordVisitAddress
export function pushVisitAddress({ userId = '', roomAddress = '' } = {}) {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/marketing/recordVisitAddress`,
    method: 'post',
    params: {
      userId,
      roomAddress,
    },
  });
}
