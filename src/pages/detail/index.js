import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { SearchBar, Modal, Menu, Toast } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';

class ClassPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <div className="search_cart">我是一个详情页面</div>;
  }
}

export default ClassPage;
