import router from 'umi/router';
import { my } from '@/services';
import Init from '@/global/init';
const init = new Init();

export default {
  namespace: 'my',
  state: {
    channelCode: null, // 渠道code
    income: {}, // 收入
  },
  effects: {
    *init({ payload, callback }, { call, put, select }) {
      try {
        const { channelCode } = init;
        const { tgid, userid } = yield select(state => state.global);
        let income = yield call(my.queryMyIncome, { userid });
        console.log('收入income:', income);
        if (parseInt(income.errcode) === 40006) {
          income = {};
        }
        const cCode = yield call(channelCode, { tgid });
        yield put({
          type: 'initState',
          payload: {
            channelCode: cCode,
            income,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  reducers: {
    initState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
};
