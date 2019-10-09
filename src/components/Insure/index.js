import React from 'react';
import classNames from 'classnames';
import './index.less';

const Cell = props => {
  const { image, prodName, remark, price, companyName } = props;
  return (
    <div className={classNames('bx-item', 'flex-p')}>
      <div className={classNames('bx-img')}>
        <img src={image} alt="" />
      </div>
      <div className={classNames('bx-info', 'ml-20')}>
        <p className={classNames('bx-name')}>{prodName}</p>
        <p className={classNames('bx-desc', 'two-line')}>{remark}</p>
        <div className={classNames('bx-price', 'flex-p')}>
          <p>
            <span className={classNames('money')}>{price}</span>
            <span>元起</span>
          </p>
          <span className={classNames('company', 'ml-auto')}>{companyName}</span>
        </div>
      </div>
    </div>
  );
};
export default Cell;
