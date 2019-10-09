/**
 * 约定式路由
 */
import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout.js'),
          LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout.js').default,
    routes: [
      {
        path: '/class',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__class__index" */ '../class/index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../class/index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        path: '/detail',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__detail__index" */ '../detail/index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../detail/index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        path: '/home',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(
                  /* webpackChunkName: 'p__home__models__home.js' */ '/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/pages/home/models/home.js'
                ).then(m => {
                  return { namespace: 'home', ...m.default };
                }),
              ],
              component: () => import(/* webpackChunkName: "p__home__index" */ '../home/index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../home/index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        path: '/',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import(/* webpackChunkName: "p__index" */ '../index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        path: '/login',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__login__index" */ '../login/index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../login/index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        path: '/my',
        exact: true,
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(
                  /* webpackChunkName: 'p__my__models__my.js' */ '/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/pages/my/models/my.js'
                ).then(m => {
                  return { namespace: 'my', ...m.default };
                }),
              ],
              component: () => import(/* webpackChunkName: "p__my__index" */ '../my/index.js'),
              LoadingComponent: require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/src/components/PageLoading/index')
                .default,
            })
          : require('../my/index.js').default,
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true }
          ),
        _title: 'umi-dva-antd-mobile',
        _title_default: 'umi-dva-antd-mobile',
      },
    ],
    _title: 'umi-dva-antd-mobile',
    _title_default: 'umi-dva-antd-mobile',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/chenchao/Documents/umi/umi-dva-antd-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true }
      ),
    _title: 'umi-dva-antd-mobile',
    _title_default: 'umi-dva-antd-mobile',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.PureComponent {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
