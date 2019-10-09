import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';
import { ListView, Icon } from 'antd-mobile';

import './index.less';
import { Card } from '@/components';

@connect(({ stocks }) => ({ ...stocks }))
class StocksList extends PureComponent {
  constructor(props) {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stocks/initsSocksList',
    });
  }

  render() {
    const { stocks } = this.props;
    const List = stocks.map(({ imgUrl, minPrice }) => (
      <Card key={imgUrl} url={imgUrl} money={minPrice} />
    ));
    return <div className={classNames('stocks-list-pages')}>{List}</div>;
  }
}
export default StocksList;
