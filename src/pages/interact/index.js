import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';

import styles from './index.less';

@connect(({ my }) => ({ my }))
class MyIndex extends PureComponent {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return (
      <div className={classNames('interact-pages')}>
        {/* <p className={classNames('box')}>互动页面</p> */}
        {/* <p className={classNames('box2')}>互动页面</p> */}
        <div className={classNames('sanjiao')}></div>
      </div>
    );
  }
}
export default MyIndex;
