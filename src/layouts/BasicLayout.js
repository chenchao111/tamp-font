import React, { PureComponent } from 'react'
import NProgress from 'nprogress'
import BaseLayout from './baseLayout';
import { connect } from 'dva'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '@/layouts/nprogress.less';
import styles from './index.less';

NProgress.configure({ showSpinner: false })

const ULR_NO_LAYOUT = ['/', '/home', '/class', '/my'];

let currHref = '';
@connect(({ app, loading }) => ({ app, loading }))
class Index extends PureComponent {
  // 进入条
  progressBar = (loading) => {
    const { href } = window.location
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }
  }
  // 渲染内容(两种：带底部tab栏和不带tab栏)
  renderBody = () => {
    const {location: {pathname}, children } = this.props;
    if (ULR_NO_LAYOUT.includes(pathname)) {
      return (<BaseLayout {...this.props} />);
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  render() {
    const {
      children,
      location: {pathname},
      app,
      loading,
      route: { routes }
    } = this.props
    this.progressBar(loading)
    return (
      <ReactCSSTransitionGroup
        transitionName="transitionWrapper"
        component="div"
        className={styles.transitionWrapper}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div key={routes.find(item => item.path === pathname).animate} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {this.renderBody()}
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}

export default Index;
