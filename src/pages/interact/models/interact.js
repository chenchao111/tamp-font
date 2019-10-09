import router from 'umi/router';
import request from '@/http/request';

import Init from '@/global/init';
export default {
  namespace: 'interact',
  state: {},
  effects: {
    *init({ payload, callback }, { call, put }) {
      try {
      } catch (error) {
        consle.error(error);
      }
    },
  },
  reducers: {
    initState(state, { payload }) {},
  },
};
