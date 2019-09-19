/**
 * polyfill文件主要作用是用来填平浏览器的差异性，不同浏览器存在的差异性抹平
 * core-js 是babel-polyfill 的底层依赖，通过各种奇技淫巧，用 ES3 实现了大部分的 ES2017 原生标准库，同时还要严格遵循规范。
 * regenerator-runtime/runtime：es6转es5
 * babel-polyfill是一股脑把全部都给你添加到js文件中，而现在的transform-runtime将会判断你哪些需要加载的，有选择性的进行加载，并且后者也不会污染全局变量。
 * url-polyfill：处理url相关内容
 */
import 'core-js';
import 'regenerator-runtime/runtime';

// Include this seperatly since it's not included in core-js
// ref: https://github.com/zloirock/core-js/issues/117
import '../../../node_modules/umi-build-dev/node_modules/url-polyfill/url-polyfill.js';
