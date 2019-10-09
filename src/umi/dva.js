/**
 * dva.js：加载整个相关的redux数据，app.model加载整个项目的state，全局的和pages下的，渲染和加载到项目中
 * State：一个对象，保存整个应用状态
 * View：React 组件构成的视图层
 * Action：一个对象，描述事件
 * connect 方法：一个函数，绑定 State 到 View
 * dispatch 方法：一个函数，发送 Action 到 State
 */
import dva from 'dva';
import { PureComponent } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

// 创建dva应用app
export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  // 创建dva对象，初始化相关数据g_initialData
  app = dva({
    history, // 指定给路由用的 history，默认是 hashHistory，可以改成browserHistory
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}), // initialState：指定初始数据，优先级高于 model 中的 state，默认是 {}
  });

  // 配置 hooks 或者注册插件。（插件最终返回的是 hooks ）
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  // 注册model
  app.model({
    namespace: 'global',
    ...require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/models/global.tsx').default,
  });
  app.model({
    namespace: 'h5',
    ...require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/models/h5.tsx').default,
  });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends PureComponent {
  render() {
    const app = getApp();
    // 注册路由表
    app.router(() => this.props.children);
    // 启动应用
    return app.start()();
  }
}
