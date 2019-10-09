export default [
  {
    path: '/',
    component: '../layouts/BasicLayout.js',
    routes: [
      {
        path: '/interact',
        exact: true,
        title: '互动',
        animate: 'home',
        component: './interact/index.js',
      },
      {
        path: '/detail',
        exact: true,
        title: '详情',
        animate: 'detail',
        component: './detail/index.js',
      },
      {
        path: '/home',
        title: '财富V店',
        exact: true,
        animate: 'home',
        component: './home/index.js',
        skeleton: 'home',
      },
      {
        path: '/',
        exact: true,
        component: './index.js',
        skeleton: 'home',
      },
      {
        path: '/login',
        exact: true,
        title: '登录',
        animate: 'login',
        component: './login/index.js',
      },
      {
        path: '/my',
        exact: true,
        title: '我的',
        animate: 'home',
        component: './my/index.js',
        skeleton: 'my',
      },
      {
        path: '/funds/list',
        exact: true,
        title: '基金列表',
        animate: 'funds-list',
        component: './funds/list/index.js',
        skeleton: 'funds',
      },
      {
        path: '/stocks/list',
        exact: true,
        title: '股票列表',
        animate: 'stocks-list',
        component: './stocks/list/index.js',
        skeleton: 'stocks',
      },
      {
        path: '/insures/list',
        exact: true,
        title: '保险列表',
        animate: 'insures-list',
        component: './insures/list/index.js',
        skeleton: 'insures',
      },
      {
        path: '/news/detail',
        exact: true,
        title: '资讯详情',
        animate: 'news-detail',
        component: './news/detail/index.js',
        skeleton: 'home',
      },
      // {
      //   component: () =>
      //     React.createElement(
      //       require('/Users/chenchao/Documents/umi/umi-antd-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
      //         .default,
      //       { pagesPath: 'src/pages', hasRoutesInConfig: false },
      //     ),
      // },
    ],
  },
  // {
  //   component: () =>
  //     React.createElement(
  //       require('/Users/chenchao/Documents/umi/umi-antd-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
  //         .default,
  //       { pagesPath: 'src/pages', hasRoutesInConfig: false },
  //     ),
  // },
];
