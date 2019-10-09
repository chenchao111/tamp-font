import React, { PureComponent, Fragment } from 'react';
import NProgress from 'nprogress';
import { connect } from 'dva';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import '@/layouts/nprogress.less';
import styles from './index.less';
import BaseLayout from './baseLayout';
import {
  HomeSkeleton,
  MySkeleton,
  StocksSkeleton,
  FundsSkeleton,
  InsuresSkeleton,
} from '@/components';

NProgress.configure({ showSpinner: false });

const ULR_NO_LAYOUT = ['/', '/home', '/interact', '/my'];

// 骨架屏选择
const selectSkeleton = skeleton => {
  let skeletonComponent = '';
  switch (skeleton) {
    case 'home':
      skeletonComponent = (
        <div className={classNames('home-skeleton')}>
          <HomeSkeleton />
        </div>
      );
      break;
    case 'my':
      skeletonComponent = (
        <div className={classNames('my-skeleton')}>
          <MySkeleton />
        </div>
      );
      break;
    case 'stocks':
      skeletonComponent = (
        <div className={classNames('stocks-skeleton')}>
          <StocksSkeleton />
        </div>
      );
      break;
    case 'funds':
      skeletonComponent = (
        <div className={classNames('funds-skeleton')}>
          <FundsSkeleton />
        </div>
      );
      break;
    case 'insures':
      skeletonComponent = (
        <div className={classNames('insures-skeleton')}>
          <InsuresSkeleton />
        </div>
      );
      break;
    default:
      break;
  }
  return skeletonComponent;
};

let currHref = '';
@connect(({ app, loading }) => ({ app, loading }))
class Index extends PureComponent {
  // 进入条
  progressBar = loading => {
    const { href } = window.location;
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }
  };
  // 渲染内容(两种：带底部tab栏和不带tab栏)
  renderBody = () => {
    const {
      location: { pathname },
      children,
    } = this.props;
    if (ULR_NO_LAYOUT.includes(pathname)) {
      return <BaseLayout {...this.props} />;
    }
    return <Fragment>{children}</Fragment>;
  };

  render() {
    const {
      children,
      location: { pathname },
      app,
      loading,
      route: { path, routes },
    } = this.props;
    console.log('loading.global: ', loading.global);
    // 1、约定一：每个页面初始化的时候回调用init开头的effect方法获取数据，init开头的方法会进行骨架屏渲染
    // 2、约定二：根据路由的配置选择不同的骨架屏类型渲染，当然也可以对指定路由不进行骨架屏渲染
    /**
     * 对effect中init方法进行遍历，找到需要骨架屏渲染的方法(true)
     */
    const effects = loading.effects;
    const init = Object.keys(loading.effects).find(key => key.includes('init') && effects[key]);
    console.log('init: ', init);
    /**
     * 对路由进行遍历，查看当前页面是否需要进行骨架屏渲染，以及选择哪个骨架屏样式
     */
    const skeleton = routes.find(item => item.path === pathname).skeleton;
    console.log('skeleton: ', skeleton);
    /**
     * animate转场动画，通过路由的animate控制key是否相同来控制切换的时候是否需要转场动画
     */
    const animate = routes.find(item => item.path === pathname).animate;
    console.log('animate: ', animate);
    this.progressBar(loading);
    return (
      <ReactCSSTransitionGroup
        transitionName="transitionWrapper"
        component="div"
        className={styles.transitionWrapper}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div key={animate} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {init && selectSkeleton(skeleton)}
          {this.renderBody()}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Index;
