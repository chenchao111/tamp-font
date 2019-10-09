import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import router from 'umi/router';

import { Button } from 'antd-mobile';
import Init from '@/global/init';
import { Title, Card, Insure, Fund } from '@/components';
import './index.less';
import { Filter, Directive } from '@/common/js';
const filter = new Filter();
const directive = new Directive();

@connect(({ home, loading: { models } }) => ({ ...home, models }))
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {
      dispatch,
      models: { home },
    } = this.props;
    home === undefined &&
      dispatch({
        type: 'home/init',
      });
  }
  handleBuy = async () => {
    const { beforeBuyCheck, login } = new Init();
    const {
      history: { location },
    } = this.props;
    const isBuy = await beforeBuyCheck();
    if (isBuy) {
      // 可以购买
      console.log('isBuy: ', isBuy);
    } else {
      // 不能购买跳转登录
      login(location);
    }
  };
  render() {
    const {
      tgInfo,
      verifyType,
      rooms,
      sign,
      menus,
      models,
      zhibos,
      news,
      zndps,
      tips,
      lxzts,
      funds,
      stocks,
      insures,
    } = this.props;
    // 头部 投顾老师介绍
    const HeaderDesc = () => {
      const { userName, headImage, company, intro } = tgInfo;
      // 标签列表
      const Lables = (
        <ul className={classNames('label-list', 'flex-p', 'mt-30')}>
          {verifyType.map(
            ({ name }, index) =>
              index < 2 && (
                <li key={name} className={classNames('tg-label')}>
                  {name}
                </li>
              )
          )}
        </ul>
      );
      return (
        <Fragment>
          <div className={classNames('tg-name-label', 'flex-p')}>
            <div className={classNames('tg-header')}>
              <img src={headImage} alt="" />
            </div>
            <div className={classNames('tg-title')}>
              <div className={classNames('top-title')}>
                <span className={classNames('tg-name')}>{userName}</span>
                <span className={classNames('tg-company', 'ml-20')}>{company}</span>
              </div>
              {Lables}
            </div>
            <div className={classNames('sign')}>
              <div className={classNames('sign-btn')}>签到</div>
              <p className={classNames('sign-num')}>今日222人</p>
            </div>
          </div>
          <div className={classNames('tg-desc-info', 'two-line')}>{intro}</div>
        </Fragment>
      );
    };
    // 直播
    const ZB = () => {
      const { lastContents: msgs, roomName, online, uvNum } = zhibos;
      const Msgs = (
        <ul className={classNames('zb-list-info')}>
          {msgs.map(
            ({ content, time }, index) =>
              index < 2 && (
                <li className={classNames('flex-p', 'one-line')} key={time}>
                  <span className={classNames('time')}>{filter.formatDate(time, 'hh:mm')}</span>
                  <span dangerouslySetInnerHTML={{ __html: content }}></span>
                </li>
              )
          )}
        </ul>
      );
      return (
        <Fragment>
          <div className={classNames('zb-list')}>
            <p className={classNames('zb-title')}>{roomName}</p>
            {Msgs}
          </div>
          <div className={classNames('zb-btn', 'flex-p')}>
            <span className={classNames('tl')}>{uvNum}人气</span>
            <span className={classNames('line')}>|</span>
            <span className={classNames('tr')}>{online ? '直播中' : '暂停'}</span>
            <span className={classNames('arrow')}></span>
          </div>
        </Fragment>
      );
    };
    // 菜单
    const Menu = () => {
      const Menus = (
        <ul className={classNames('flex-p', 'menus-list-item')}>
          {menus.map(
            ({ showName, src }, index) =>
              index < 4 && (
                <li key={showName} className={classNames('menu-item', 'tc')}>
                  <img src={src} alt="" />
                  <p className={classNames('mt-20')}>{showName}</p>
                </li>
              )
          )}
          {menus.length > 4 &&
            menus.map(
              ({ showName, src }, index) =>
                index > 3 && (
                  <li key={showName} className={classNames('menu-item', 'tc')}>
                    <img src={src} alt="" />
                    <p className={classNames('mt-20')}>{showName}</p>
                  </li>
                )
            )}
        </ul>
      );
      return (
        <Fragment>
          <div className={classNames('menus-list')}>{Menus}</div>
        </Fragment>
      );
    };
    // 今日必读
    const JRBD = () => {
      const News = (
        <ul className={classNames('jrbd-list')}>
          {news.map(({ type, title, infourl }, index) => {
            return (
              <li
                onClick={() =>
                  router.push({
                    pathname: '/news/detail',
                    query: { infourl: encodeURIComponent(infourl) },
                  })
                }
                key={title}
                className={classNames('jrbd-list-item', 'two-line', index % 2 ? 'likong' : 'lihao')}
              >
                {`${`${type} : ${title}`.slice(0, 22)}...`}
              </li>
            );
          })}
        </ul>
      );
      return (
        <Fragment>
          <p className={classNames('jrbd-title')}>今日必读</p>
          {News}
        </Fragment>
      );
    };
    // 智能盯盘
    const ZNDP = () => (
      <Fragment>
        <Title title="智能盯盘" more="自选股" />
        <ul className={classNames('zndp-list')}>
          <li className={classNames('flex-p', 'zndp-item', 'my-hairline--bottom')}>
            <div>
              <p>云南锗业</p>
              <p className={classNames('zndp-time')}>11-20 09:37:19</p>
            </div>
            <p>28.71</p>
            <p>+2.67%</p>
            <p>急速拉升</p>
          </li>
          <li className={classNames('flex-p', 'zndp-item', 'my-hairline--bottom')}>
            <div>
              <p>云南锗业</p>
              <p className={classNames('zndp-time')}>11-20 09:37:19</p>
            </div>
            <p>28.71</p>
            <p>+2.67%</p>
            <p>急速拉升</p>
          </li>
        </ul>
      </Fragment>
    );
    // 投资内参
    const TZNC = () => {
      const Tips = (
        <ul className={classNames('tznc-list')}>
          {tips.map(({ img, title, strBegintime, strEndtime, statusStr, price, isBuy }, index) => (
            <li key={title} className={classNames('tznc-item', 'flex-p', 'my-hairline--bottom')}>
              <div className={classNames('tznc-img-div')}>
                <img src={img} alt="" />
                <div className={classNames('update')}>{statusStr}</div>
              </div>
              <div className={classNames('ml-20')}>
                <p className={classNames('tznc-title')}>{title}</p>
                <p className={classNames('tznc-time')}>
                  {strBegintime}至{strEndtime}
                </p>
                <p className={classNames('tznc-price')}>
                  <span className={classNames('money')}>{price}</span>
                  <span>元</span>
                </p>
              </div>
              <div className={classNames('tznc-btn')}>{isBuy ? '查看' : '订阅'}</div>
            </li>
          ))}
        </ul>
      );
      return (
        <Fragment>
          <Title title="投资内参" more="更多" />
          {Tips}
        </Fragment>
      );
    };
    // 精选基金
    const JXJJ = () => {
      const Lxzts = lxzts.map(({ imgUrl, buymin }) => (
        <Card key={imgUrl} url={imgUrl} money={buymin} isBuy={false} />
      ));
      const Funds = (
        <ul className={classNames('jxjj-list-normal')}>
          {funds.map((fund, index) => index < 3 && <Fund key={fund.fundname} {...fund} />)}
        </ul>
      );
      return (
        <Fragment>
          <Title
            handleMoreAction={() => router.push({ pathname: '/funds/list' })}
            title="精选基金"
            more="更多"
          />
          {Lxzts}
          {Funds}
        </Fragment>
      );
    };
    //股票产品
    const GPCP = () => {
      const Stocks = stocks.map(
        ({ imgUrl, minPrice }, index) =>
          index < 3 && <Card key={imgUrl} url={imgUrl} money={minPrice} isBuy={true} />
      );
      return (
        <Fragment>
          <Title
            title="股票产品"
            more="更多"
            handleMoreAction={() => router.push({ pathname: '/stocks/list' })}
          />
          {Stocks}
        </Fragment>
      );
    };
    // 保险产品
    const BXCP = () => {
      const Insurances = insures.map(
        (insure, index) => index < 3 && <Insure key={insure.prodName} {...insure} />
      );
      return (
        <Fragment>
          <Title
            title="保险产品"
            more="更多"
            handleMoreAction={() => router.push({ pathname: '/insures/list' })}
          />
          {Insurances}
        </Fragment>
      );
    };
    // 投资策略
    const TZCL = () => (
      <Fragment>
        <Title title="投资策略" more="更多" />
        <Card url={'../../assets/home/lihao.png'} money={320} isBuy={true} />
        <Card url={'../../assets/home/lihao.png'} money={320} isBuy={true} />
      </Fragment>
    );
    return (
      <div className={classNames('home-pages')}>
        <div className={classNames('header-info')}>
          <div className={classNames('tg-desc')}>{HeaderDesc()}</div>
          <div className={classNames('zb-desc')}>{ZB()}</div>
        </div>
        <div className={classNames('mune-info')}>{Menu()}</div>
        <div className={classNames('all-produce-info')}>
          <div className={classNames('jrbd-info')}>{JRBD()}</div>
          <div className={classNames('zndp-info')}>{ZNDP()}</div>
          <div className={classNames('tznc-info')}>{TZNC()}</div>
          <div className={classNames('jxjj-info')}>{JXJJ()}</div>
          <div className={classNames('gpcp-info')}>{GPCP()}</div>
          <div className={classNames('bxcp-info')}>{BXCP()}</div>
          <div className={classNames('tzcl-info')}>{TZCL()}</div>
          <div className={classNames('wdcp-info')}></div>
        </div>
        <div className={classNames('website-info')}>
          <p className={classNames('company')}>金融界提供技术支持</p>
          <p className={classNames('site')}>JRJ.com.cn</p>
        </div>
      </div>
    );
  }
}

export default Home;
