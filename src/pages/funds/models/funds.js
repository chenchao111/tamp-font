import router from 'umi/router';
import request from '@/http/request';

import { funds as Funds } from '@/services';

export default {
  namespace: 'funds',
  state: {
    lxzts: [],
    funds: [],
    hasMore: true,
  },
  effects: {
    *initFundsList({ payload, callback }, { call, put, select }) {
      try {
        const { page } = payload;
        const { tgid, userid } = yield select(state => state.global);
        // 灵犀智投
        const lxzts = yield call(Funds.queryFundSpecial, { userId: tgid });
        console.log('灵犀智投 lxzts: ', lxzts);
        // 基金列表
        const { data: funds, total } = yield call(Funds.queryFunds, { userId: tgid, page });
        console.log('基金列表 funds: ', funds);

        yield put({
          type: 'initFundsListState',
          payload: {
            lxzts,
            funds,
            hasMore: funds.length >= total ? false : true,
          },
        });
        callback();
      } catch (error) {
        console.error('初始化列表失败：', error);
      }
    },
    *fundsPaging({ payload, callback }, { call, put, select }) {
      try {
        const { page } = payload;
        console.log('page: ', page);
        const {
          global: { tgid, userid },
          funds: { funds },
        } = yield select(state => state);
        // 基金列表
        const { data: fundsAdd, total } = yield call(Funds.queryFunds, { userId: tgid, page });
        console.log('基金列表 funds: ', fundsAdd);

        const fundsNew = [...funds, ...fundsAdd];
        yield put({
          type: 'fundsPagingState',
          payload: {
            funds: fundsNew,
            hasMore: fundsNew.length >= total ? false : true,
          },
        });
        callback();
      } catch (error) {
        console.error('基金分页失败', error);
      }
    },
  },
  reducers: {
    initFundsListState(state, { payload }) {
      Object.assign(state, payload);
    },
    fundsPagingState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
};
