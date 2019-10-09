import router from 'umi/router';
import { home } from '@/services';

export default {
  namespace: 'home',
  state: {
    // 投顾信息
    tgInfo: {},
    // 投顾认证信息
    verifyType: [],
    // 工作室信息
    rooms: {},
    // 签到
    sign: {},
    // 菜单区域
    menus: [],
    // 显示产品模块
    models: [],
    // 直播室
    zhibos: { lastContents: [] },
    // 今日必读
    news: [],
    // 智能盯盘
    zndps: [],
    // 投资内参
    tips: [],
    // 灵犀智投
    lxzts: [],
    // 普通基金
    funds: [],
    // 股票产品
    stocks: [],
    // 保险产品
    insures: [],
  },
  effects: {
    *init({ payload, callback }, { call, put, select }) {
      try {
        console.log('init 执行');
        const { tgid, userid } = yield select(state => state.global);
        // 查询投顾和工作室信息
        const { user: tgInfo, verifyType } = yield call(home.queryTgInfo, { userId: tgid });
        console.log('tgInfo: ', tgInfo);
        console.log('verifyType: ', verifyType);
        // 查询签到信息
        // const sign = yield call(home.querySignInfo, {shopOwnerId: tgid})
        // console.log('sign: ', sign)
        // 获取该投顾老师模块展示顺序和每个模块展示条数
        const { roomName: rooms, roomShow } = yield call(home.queryRoomProductList, { tgid });
        console.log('roomShow: ', roomShow);
        console.log('rooms: ', rooms);
        // 需要显示的菜单栏区域(显示icon和title)
        const menus = roomShow
          .filter(
            item =>
              item.isShow &&
              (parseInt(item.showId) === 2 ||
                parseInt(item.showId) === 4 ||
                parseInt(item.showId) === 5 ||
                parseInt(item.showId) === 3 ||
                parseInt(item.showId) === 8 ||
                parseInt(item.showId) === 9 ||
                parseInt(item.showId) === 10 ||
                parseInt(item.showId) === 11)
          )
          .map(item => ({
            ...item,
            src: `//i0.jrjimg.cn/zqt-red-1000/focus/tamp-front/static/home/icons/${item.showId}.png`,
          }));
        console.log('展示的菜单栏: ', menus);
        // 需要产品模块区域
        const models = roomShow.filter(item => item.isShow);
        console.log('展示的产品模块：', models);

        // 直播室
        // const zhibos = yield call(home.queryZhibos, {adviserId: tgid})
        // console.log('直播室 zhibos: ', zhibos)
        // 今日必读
        const { newsinfo: news } = yield call(home.queryTodayNews);
        console.log('今日必读 news: ', news);
        // 智能盯盘
        // const zndps = yield call(home.queryZndps, userid)
        // console.log('智能盯盘: zndps: ', zndps)
        // 投资内参
        const { list: tips } = yield call(home.queryTips, {
          tgid,
          userid,
        });
        console.log('投资内参 tips: ', tips);
        // 灵犀智投
        const lxzts = yield call(home.queryFundSpecial, { userId: tgid });
        console.log('灵犀智投 lxzts: ', lxzts);
        // 基金列表
        const { data: funds } = yield call(home.queryFunds, { userId: tgid });
        console.log('基金列表 funds: ', funds);
        // 股票产品
        const stocks = yield call(home.queryStocks, { tgid });
        console.log('股票产品 stocks: ', stocks);
        // 保险产品
        const { items: insures } = yield call(home.queryInsures, { userId: tgid });
        console.log('保险产品 insures: ', insures);
        yield put({
          type: 'initState',
          payload: {
            tgInfo,
            verifyType,
            rooms,
            menus,
            models,
            news,
            tips,
            // zhibos,
            lxzts,
            funds,
            stocks,
            insures,
          },
        });
      } catch (error) {
        console.error('初始化失败: ', error);
      }
    },
  },
  reducers: {
    initState(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == '/home' || pathname == '/') {
        }
      });
    },
  },
};
