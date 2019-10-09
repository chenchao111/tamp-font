import React from 'react';
import classNames from 'classnames';
import './index.less';

// 标题组件
const Title = props => {
  const { title, more, handleMoreAction } = props;
  return (
    <p className={classNames('product-title', 'flex-p')}>
      <span>{title}</span>
      <span className={classNames('ml-auto', 'more')} onClick={handleMoreAction}>
        {more}
      </span>
    </p>
  );
};

export default Title;
