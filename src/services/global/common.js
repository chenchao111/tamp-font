import request from '@/http/request';
import { prefix } from '@/common/constants';

// 获取投顾老师渠道号
// c.jrj.com.cn/wealth/room/getUserChannelCode/{id}
export function queryTgChannelCode({ tgid = '' } = {}) {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/room/getUserChannelCode/${tgid}`,
    method: 'get',
  });
}
// 查询工作室信息
// c.jrj.com.cn/wealth/room/queryRoomInfo/{id}
export function queryTgRoomInfo({ tgid = '' } = {}) {
  return request({
    url: `${prefix.C_JRJ_URL}/wealth/room/queryRoomInfo/${tgid}`,
    method: 'get',
  });
}
