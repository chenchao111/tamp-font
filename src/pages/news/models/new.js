import router from 'umi/router';
import request from '@/http/request';

import Init from '@/global/init';
import { news } from '@/services';
export default {
  namespace: 'news',
  state: {
    details: {},
  },
  effects: {
    *init({ payload, callback }, { call, put }) {
      try {
        const { infourl } = payload;
        const details = yield call(news.queryNewsDetail, { infourl: decodeURIComponent(infourl) });

        if (
          details.context.indexOf('<P><STRONG>一、【要闻速递】</STRONG></P>') >= 0 ||
          details.context.indexOf('<P><STRONG>一、【要闻速递】 </STRONG></P>') >= 0
        ) {
          details.context = details.context.substring(
            details.context.indexOf('<P><STRONG>一、【要闻速递】</STRONG></P>')
          );
          details.context = details.context.substring(
            details.context.indexOf('<P><STRONG>一、【要闻速递】 </STRONG></P>')
          );
        }
        console.log(details.context.indexOf('<P><STRONG>一、【要闻速递】</STRONG></P>'));
        if (
          details.context.indexOf(
            '<P><STRONG><FONT color=#ff0000>金融界网站投资工具箱：</FONT></STRONG></P>'
          ) > 0
        ) {
          details.context = details.context.substring(
            0,
            details.context.indexOf(
              '<P><STRONG><FONT color=#ff0000>金融界网站投资工具箱：</FONT></STRONG></P>'
            )
          );
        }
        details.context = details.context.replace(/http/g, 'https');
        // details.context = details.context.replace( /<p[^>]+name[=\'\"guanggao]+([^\'\"]*)\/p>/ig,'')
        details.context = details.context.replace(
          /<p[^>]+name[=\'\"guanggao]+([^\'\"]*)(.*)<\/p>/gim,
          ''
        );
        details.context = details.context.replace(/(<\/?a.*?>)/g, '');

        yield put({
          type: 'initState',
          payload: {
            details,
          },
        });
      } catch (error) {
        consle.error(error);
      }
    },
  },
  reducers: {
    initState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
};
