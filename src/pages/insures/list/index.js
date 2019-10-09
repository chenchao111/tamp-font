import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';
import { Tabs, WingBlank, WhiteSpace, ListView, Icon } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';

import styles from './index.less';
import { Cell, Card, Fund } from '@/components';
import InsuresList from './list';

@connect(({ insures }) => ({ ...insures }))
class Insures extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      acitiveIndex: 0,
    };
  }
  handleTasChange = (tab, index) => {
    const { dispatch } = this.props;
    this.setState({
      acitiveIndex: index,
    });
    dispatch({
      type: 'insures/tabChange',
      payload: {
        page: 1,
        insures: [],
        hasMore: true,
      },
    });
  };
  render() {
    const tabs = [
      { title: '全部', firstCategory: '', secondCategory: '' },
      { title: '重疾', firstCategory: '', secondCategory: '2027' },
      { title: '医疗', firstCategory: '', secondCategory: '2028' },
      { title: '意外', firstCategory: '2000', secondCategory: '' },
      { title: '寿险', firstCategory: '2006', secondCategory: '' },
      { title: '旅游', firstCategory: '2001', secondCategory: '' },
      { title: '家财', firstCategory: '2008', secondCategory: '' },
    ];
    return (
      <div className={classNames('insures-list-pages')}>
        <StickyContainer>
          <Tabs
            className={classNames('my-tabs')}
            tabs={tabs}
            initialPage={0}
            tabBarUnderlineStyle={{ width: '30px', marginLeft: 'calc(10% - 15px)' }}
            renderTab={tab => <span>{tab.title}</span>}
            tabBarInactiveTextColor="#333"
            onChange={(tab, index) => {
              this.handleTasChange(tab, index);
            }}
            renderTabBar={props => (
              <Sticky>
                {({ style }) => (
                  <div style={{ ...style, zIndex: 1 }}>
                    <Tabs.DefaultTabBar {...props} />
                  </div>
                )}
              </Sticky>
            )}
          >
            {tabs.map(
              (tab, index) =>
                index === this.state.acitiveIndex && <InsuresList key={tab.title} {...tab} />
            )}
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}
export default Insures;
