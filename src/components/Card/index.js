import React from 'react';
import classNames from 'classnames';
import './index.less';

const Card = props => {
  const { url, money, isBuy } = props;
  return (
    <div className={classNames('item-top')}>
      <img src={url} alt="" />
      <div className={classNames('flex-p', 'item-subscribe')}>
        <p className={classNames('item-price')}>
          <span className={classNames('money')}>{money}</span>
          <span>{typeof money === 'number' && '元/月'}</span>
        </p>
        {isBuy ? (
          <p className={classNames('ml-auto', 'item-btn')}>立即查看</p>
        ) : (
          <p className={classNames('ml-auto', 'item-btn')}>立即订阅</p>
        )}
      </div>
    </div>
  );
};

export default Card;
