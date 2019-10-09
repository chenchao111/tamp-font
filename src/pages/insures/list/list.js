import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';
import { Tabs, ListView, Icon } from 'antd-mobile';

import './index.less';
import { Insure } from '@/components';

let pageIndex = 0;
const NUM_ROWS = 10;

function genData(pIndex = 0, insures = []) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = pIndex * NUM_ROWS + i;
    insures[ii] && (dataBlob[`${ii}`] = insures[ii]);
  }
  return dataBlob;
}

@connect(({ insures }) => ({ ...insures }))
class InsuresList extends PureComponent {
  constructor(props) {
    super();
    console.log('props: ', props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      height: '',
      isLoading: true,
      // page: 1
    };
  }
  componentDidMount() {
    console.log('加载----------');
    const { dispatch, page, firstCategory, secondCategory } = this.props;
    // const { page } = this.state
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({ isLoading: true }, () => {
      dispatch({
        type: 'insures/initInsuresList',
        payload: {
          page,
          firstCategory,
          secondCategory,
        },
        callback: () => {
          const { insures } = this.props;
          this.rData = genData(page - 1, insures);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            height: hei,
            isLoading: false,
          });
          dispatch({
            type: 'insures/page',
            payload: { page: page + 1 },
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
    const { dispatch, page, firstCategory, secondCategory } = this.props;
    // const { page } = this.state
    this.setState({ isLoading: true }, () => {
      dispatch({
        type: 'insures/addInsuresList',
        payload: {
          page,
          firstCategory,
          secondCategory,
        },
        callback: () => {
          const { insures } = this.props;
          this.rData = { ...this.rData, ...genData(page - 1, insures) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            // page: page + 1
          });
          dispatch({
            type: 'insures/page',
            payload: { page: page + 1 },
          });
        },
      });
    });
  };

  render() {
    const { insures, hasMore, loading } = this.props;
    const { isLoading, dataSource, height } = this.state;
    const Cell = (rowData, sectionID, rowID) => <Insure key={rowID} {...rowData} />;
    const List = (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={dataSource}
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
    return <div className={classNames('insures-list-component')}>{List}</div>;
  }
}
export default InsuresList;
