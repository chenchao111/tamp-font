import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import 'antd-mobile/dist/antd-mobile.less';

import styles from './styles.less';

const TabBarData = [
  {
    id: 'interact',
    name: '互动',
    icon: require('../../assets/unhome.png'),
    selectedicon: require('../../assets/home.png'),
    url: '/interact',
  },
  {
    id: 'home',
    name: 'V店',
    icon: require('../../assets/unproduct.png'),
    selectedicon: require('../../assets/product.png'),
    url: '/home',
  },
  {
    id: 'my',
    name: '我的',
    icon: require('../../assets/unincome.png'),
    selectedicon: require('../../assets/income.png'),
    url: '/my',
  },
];
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {
  isTabBarSelect = url => {
    const {
      location: { pathname },
    } = this.props;
    if (pathname === '/' && url === '/home') {
      return true;
    } else {
      return pathname === url;
    }
  };
  render() {
    const { loading } = this.props;
    return (
      <div className={styles.baseLayout}>
        <TabBar
          unselectedTintColor="#333"
          tintColor="#E3A952"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {TabBarData.map(t => {
            const isSelect = this.isTabBarSelect(t.url);
            return (
              <TabBar.Item
                title={t.name}
                key={t.id}
                icon={
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      background: `url(${t.icon}) center center / 42px 42px no-repeat`,
                    }}
                  />
                }
                selectedIcon={
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      background: `url(${t.selectedicon}) center center / 42px 42px no-repeat`,
                    }}
                  />
                }
                // badge={1}
                onPress={() => {
                  router.push(t.url);
                }}
                selected={isSelect}
                data-seed="logId"
              >
                {isSelect && this.props.children}
              </TabBar.Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}

export default BaseLayout;
