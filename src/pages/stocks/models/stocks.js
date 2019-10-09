import router from 'umi/router';
import request from '@/http/request';

import { stocks as Stocks } from '@/services';

export default {
  namespace: 'stocks',
  state: {
    stocks: [],
  },
  effects: {
    *initsSocksList({ payload, callback }, { call, put, select }) {
      try {
        const { tgid, userid } = yield select(state => state.global);
        // 股票列表
        const stocks = yield call(Stocks.queryStocks, { tgid });
        console.log('股票列表 stocks: ', stocks);

        yield put({
          type: 'initStocksListState',
          payload: {
            stocks,
          },
        });
      } catch (error) {
        console.error('初始化列表失败：', error);
      }
    },
  },
  reducers: {
    initStocksListState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
};
