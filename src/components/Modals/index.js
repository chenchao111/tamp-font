import React from 'react';
import classNames from 'classnames';
import './index.less';

const MyModal = props => {
  const {
    visible = false,
    handleVisible,
    title = '',
    desc = '',
    affirm: { text: mergeText = '确认', callback: mergeCallback },
    cancel: { text: cancelText = '取消', callback: cancelCallback },
  } = props;
  return (
    <div
      className={classNames(['mask-bg', visible ? 'show' : 'close'])}
      onClick={() => handleVisible(false)}
    >
      <div
        className={classNames('mask-info')}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <p
          className={classNames('mask-info-title')}
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <p className={classNames('mask-info-desc')} dangerouslySetInnerHTML={{ __html: desc }}></p>
        <div className={classNames('mask-info-merge')} onClick={mergeCallback}>
          {mergeText}
        </div>
        <div className={classNames('mask-info-change')}>{cancelText}</div>
      </div>
    </div>
  );
};
export default MyModal;
