// 1. 创建hashHistory
// create history
const history = require('history/createHashHistory').default({ basename: '/' });
window.g_history = history;
export default history;

// 创建browserHistory
// create history
const history = require('umi/lib/createHistory').default({
  basename: window.routerBase,
});
window.g_history = history;
export default history;

