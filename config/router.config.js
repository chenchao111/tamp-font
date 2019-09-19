export default [
  {
    path: '/',
    component: '../layouts/BasicLayout.js',
    routes: [
      {
        path: '/class',
        exact: true,
        title: '分类页',
        animate: 'home',
        component: './class/index.js',
      },
      {
        path: '/detail',
        exact: true,
        title: '详情页',
        animate: 'detail',
        component: './detail/index.js',
      },
      {
        path: '/home',
        title: '首页',
        exact: true,
        animate: 'home',
        component: './home/index.js',
      },
      {
        path: '/',
        exact: true,
        component: './index.js',
      },
      {
        path: '/login',
        exact: true,
        title: '登录页',
        animate: 'login',
        component: './login/index.js',
      },
      {
        path: '/my',
        exact: true,
        title: '我的',
        animate: 'home',
        component: './my/index.js',
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
]
