import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';

import styles from './index.less';
import { Filter } from '@/common/js';

const filter = new Filter();

@connect(({ my, loading: { models } }) => ({ ...my, models }))
class MyIndex extends PureComponent {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const {
      dispatch,
      models: { my },
    } = this.props;
    my === undefined &&
      dispatch({
        type: 'my/init',
        payload: {},
      });
  }

  render() {
    const { income, channelCode } = this.props;
    // 我的信息
    const MyInfo = () => {
      return (
        <Fragment>
          <div className={classNames('my-header-img')}>
            <img src={require('../../assets/home/header.png')} alt="" />
          </div>
          <div className={classNames('my-user-name', 'ml-20')}>涨停王者</div>
          <div className={classNames('my-beans', 'ml-auto')}>我的金豆 20</div>
        </Fragment>
      );
    };
    // 我的资产
    const MyProperty = () => {
      const {
        total,
        total_lastincome,
        fund_total,
        fund_lastincome,
        fintech_total,
        fintech_lastincome,
      } = income;
      return (
        <Fragment>
          <div className={classNames('my-property-info')}>
            <div className={classNames('top-property', 'flex-p')}>
              <p className={classNames('total-property')}>
                总资产(元)
                <img src={require('../../assets/my/eye.png')} alt="" />
              </p>
              <p className={classNames('ml-auto')}>
                资产体检{' '}
                <img
                  className={classNames('right-arrow')}
                  src={require('../../assets/my/right-arrow.png')}
                  alt=""
                />
              </p>
            </div>
            <div className={classNames('middle-money', 'flex-p')}>
              <p className={classNames('money')}>{filter.earnings(total)}</p>
              <p className={classNames('ml-auto', 'change-property')}>
                昨日变动 {filter.earnings(total_lastincome)}
              </p>
            </div>
            <div className={classNames('bottom-earnings', 'flex-p')}>
              <div className={classNames('left-funds', 'w50')}>
                <p className={classNames('find-name')}>
                  基金
                  <img
                    className={classNames('right-arrow', 'ml-10')}
                    src={require('../../assets/my/right-arrow.png')}
                    alt=""
                  />
                </p>
                <p className={classNames('money')}>{filter.earnings(fund_total)}</p>
                <p className={classNames('earnings')}>昨日 {filter.earnings(fund_lastincome)}</p>
              </div>
              <div className={classNames('right-funds', 'w50')}>
                <p className={classNames('find-name')}>
                  灵犀智投
                  <img
                    className={classNames('right-arrow', 'ml-10')}
                    src={require('../../assets/my/right-arrow.png')}
                    alt=""
                  />
                </p>
                <p className={classNames('money')}>{filter.earnings(fintech_total)}</p>
                <p className={classNames('earnings')}>昨日 {filter.earnings(fintech_lastincome)}</p>
              </div>
            </div>
          </div>
        </Fragment>
      );
    };
    const MyService = () => {
      const services = [
        { title: '投资内参', type: 15 },
        { title: '股票产品', type: 17 },
        { title: '保险产品', type: 20 },
        { title: '投资策略', type: 16 },
        { title: '理财产品', type: 21 },
        { title: '海外资产', type: 22 },
        { title: '精选课程', type: 18 },
        { title: '网贷产品', type: 25 },
      ];
      return (
        <Fragment>
          <p className={classNames('title')}>我的服务</p>
          <div className={classNames('my-service-list-area')}>
            <ul className={classNames('my-service-list', 'flex-p')}>
              {services.map(
                ({ title, type }, index) =>
                  index < 4 && (
                    <li key={title} className={classNames('my-service-item')}>
                      <img
                        src={`https://i0.jrjimg.cn/itougu-msite/images/tg-icon${type}.png`}
                        alt=""
                      />
                      <p>{title}</p>
                    </li>
                  )
              )}
            </ul>
            <ul className={classNames('my-service-list', 'flex-p', 'mt-30')}>
              {services.map(
                ({ title, type }, index) =>
                  index >= 4 && (
                    <li key={title} className={classNames('my-service-item')}>
                      <img
                        src={`https://i0.jrjimg.cn/itougu-msite/images/tg-icon${type}.png`}
                        alt=""
                      />
                      <p>{title}</p>
                    </li>
                  )
              )}
            </ul>
          </div>
        </Fragment>
      );
    };
    // 列表
    const Tabs = ({ name, desc = '' }) => (
      <div className={classNames('tabs-line', 'flex-p', 'my-hairline--top')}>
        <p>{name}</p>
        <p className={classNames('ml-auto', 'right-desc', 'flex-p')}>
          <a className={classNames('mr-20')} href={`tel: ${desc}`}>
            {desc}
          </a>
          <img
            className={classNames('right-arrow-tab-img')}
            src={require('../../assets/my/right-arrow-tab.png')}
            alt=""
          />
        </p>
      </div>
    );
    return (
      <div className={classNames('my-pages')}>
        <div className={classNames('my-info', 'flex-p')}>{MyInfo()}</div>
        <div className={classNames('my-property')}>{MyProperty()}</div>
        <div className={classNames('my-service')}>{MyService()}</div>
        <div className={classNames('my-msg')}>
          <Tabs name="我的消息" />
        </div>
        <div className={classNames('my-expense')}>
          <Tabs name="消费记录" />
        </div>
        <div className={classNames('my-wechat')}>
          <Tabs name="微信通知提醒" />
        </div>
        <div className={classNames('service-tel')}>
          <Tabs name="客服电话" desc="400-166-1188" />
        </div>
        <div className={classNames('complaints-tel')}>
          <Tabs name="投诉电话" desc="010-83363000" />
        </div>
      </div>
    );
  }
}
export default MyIndex;
