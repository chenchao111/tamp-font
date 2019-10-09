import router from 'umi/router';
import request from '@/http/request';

import { insures as Insures } from '@/services';

export default {
  namespace: 'insures',
  state: {
    page: 1,
    tab: {},
    insures: [],
    hasMore: true,
  },
  effects: {
    *initInsuresList({ payload, callback }, { call, put, select }) {
      try {
        const { page, firstCategory, secondCategory } = payload;
        const {
          global: { tgid, userid },
          insures: { insures },
        } = yield select(state => state);
        // 保险列表
        const res = yield call(Insures.queryInsures, {
          userId: tgid,
          page,
          firstCategory,
          secondCategory,
        });
        if (!res) {
          // 没有数据
          yield put({
            type: 'initInsuresListState',
            payload: {
              insures: [],
              hasMore: false,
            },
          });
        } else {
          const { items: insuresAdd = [], count: total = 0 } = res;

          const insuresNew = [...insures, ...insuresAdd];
          yield put({
            type: 'initInsuresListState',
            payload: {
              insures: insuresNew,
              hasMore: insuresNew.length >= total ? false : true,
            },
          });
        }
        callback();
      } catch (error) {
        console.error('初始化列表失败：', error);
      }
    },
    *addInsuresList({ payload, callback }, { call, put, select }) {
      try {
        const { page, firstCategory, secondCategory } = payload;
        const {
          global: { tgid, userid },
          insures: { insures },
        } = yield select(state => state);
        // 保险列表
        const res = yield call(Insures.queryInsures, {
          userId: tgid,
          page,
          firstCategory,
          secondCategory,
        });
        if (!res) {
          // 没有数据
          yield put({
            type: 'initInsuresListState',
            payload: {
              insures: [],
              hasMore: false,
            },
          });
        } else {
          const { items: insuresAdd = [], count: total = 0 } = res;

          const insuresNew = [...insures, ...insuresAdd];
          yield put({
            type: 'initInsuresListState',
            payload: {
              insures: insuresNew,
              hasMore: insuresNew.length >= total ? false : true,
            },
          });
        }
        callback();
      } catch (error) {
        console.error('初始化列表失败：', error);
      }
    },
  },
  reducers: {
    initInsuresListState(state, { payload }) {
      Object.assign(state, payload);
    },
    tabChange(state, { payload }) {
      Object.assign(state, payload);
    },
    page(state, { payload }) {
      Object.assign(state, payload);
    },
  },
};
