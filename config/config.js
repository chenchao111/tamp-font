// https://umijs.org/config/
import pageRoutes from './router.config';
import { theme } from './defaultSetting';
import webpackPlugin from './plugin.config';
import pxToViewPort from './pxtoviewport';
import { title } from './defaultSetting';
const path = require('path');

const plugins = [
  [
    'umi-plugin-react',
    {
      // 启用后自动配置 babel-plugin-import 实现 antd, antd-mobile 和 antd-pro 的按需编译，并且内置 antd, antd-mobile 依赖，无需手动在项目中安装。
      antd: true,
      dva: {
        // dva-immer：开启immutable不可变，对state操作不会改变原来的state
        immer: true,
        // dva-hmr: 热替换
        hmr: true,
      },
      dynamicImport: {
        // loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          importWorkboxFrom: 'local',
        },
      },
      title: {
        defaultTitle: title,
      },
      dll: true,
      hd: true,
      fastClick: true,
      // 对于使用自动构建路由的时候有效：用来批量修改路由的匹配，下面是忽略自动生成路由的相关的目录
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    },
  ],
];
export default {
  // add for transfer to umi
  base: 'cfvd/tamp-front',
  publicPath: '//i0.jrjimg.cn/zqt-red-1000/focus/tamp-front/',
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'browser', // 默认是 browser
  plugins,
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://mobile.ant.design/docs/react/customize-theme-cn
  theme: {
    hd: '2px',
    'brand-primary': theme.primaryColor,
    'brand-primary-tap': theme.brandPrimaryTap,
  },
  externals: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
  outputPath: './dist',
  hash: true,
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    utils: path.resolve(__dirname, '../src/utils'),
    services: path.resolve(__dirname, '../src/services'),
    models: path.resolve(__dirname, '../src/models'),
    images: path.resolve(__dirname, '../src/assets'),
    config: path.resolve(__dirname, '../config'),
    '@': path.resolve(__dirname, '../src'),
  },
  proxy: {
    '/api': {
      target: 'http://10.66.82.99:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
    '/server/api/': {
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
      target: 'https://preview.pro.ant.design/',
    },
    '/wx/api/': {
      changeOrigin: true,
      pathRewrite: { '^/wx/api': '' },
      target: 'https://games.parsec.com.cn/',
    },
  },
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  extraPostCSSPlugins: [pxToViewPort],
};
