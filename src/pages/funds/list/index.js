import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';
import { ListView, Icon } from 'antd-mobile';

import styles from './index.less';
import { Card, Fund } from '@/components';

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const NUM_ROWS = 5;

function genData(pIndex = 0, funds = []) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = pIndex * NUM_ROWS + i;
    funds[ii] && (dataBlob[`${ii}`] = funds[ii]);
  }
  return dataBlob;
}

@connect(({ funds, loading: { models } }) => ({ ...funds, models }))
class FundsList extends PureComponent {
  constructor(props) {
    super();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      height: '',
      isLoading: true,
      page: 1,
    };
  }
  componentDidMount() {
    const {
      dispatch,
      models: { funds },
    } = this.props;
    const { page } = this.state;
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({ isLoading: true }, () => {
      dispatch({
        type: 'funds/initFundsList',
        payload: {
          page,
        },
        callback: () => {
          const { lxzts, funds } = this.props;
          this.rData = genData(page - 1, funds);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            height: hei,
            isLoading: false,
            page: page + 1,
          });
        },
      });
    });
  }
  onEndReached = ev => {
    const { isLoading } = this.state;
    const { hasMore } = this.props;
    if (isLoading || !hasMore) {
      return;
    }
    const { dispatch } = this.props;
    const { page } = this.state;
    this.setState({ isLoading: true }, () => {
      dispatch({
        type: 'funds/fundsPaging',
        payload: {
          page,
        },
        callback: () => {
          const { funds } = this.props;
          this.rData = { ...this.rData, ...genData(page - 1, funds) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            page: page + 1,
          });
        },
      });
    });
  };

  render() {
    const { lxzts, funds, hasMore } = this.props;
    const { isLoading } = this.state;
    const Lxzts = lxzts.map(({ imgUrl, buymin }) => (
      <Card key={imgUrl} url={imgUrl} money={buymin} isBuy={false} />
    ));
    const Cell = (rowData, sectionID, rowID) => {
      return <Fund key={rowID} {...rowData} />;
    };
    const List = (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderRow={Cell}
        pageSize={10}
        scrollRenderAheadDistance={100}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={5}
        renderFooter={() => (
          <div style={{ textAlign: 'center', color: '#AAAAAA', fontSize: '26px' }}>
            {isLoading ? (
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ marginRight: '15px' }} type="loading" size="xs" />
                财富V店提示您：数据加载中, 请稍后...
              </p>
            ) : hasMore ? (
              '财富V店提示您：加载完成'
            ) : (
              '财富V店提示您：暂无更多数据'
            )}
          </div>
        )}
        useBodyScroll
      />
    );
    return (
      <div className={classNames('funds-list-pages')}>
        {Lxzts}
        {List}
      </div>
    );
  }
}
export default FundsList;
