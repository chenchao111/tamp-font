import React from 'react';
import classNames from 'classnames';
import './index.less';
import { Filter, Directive } from '@/common/js';
const filter = new Filter();
const directive = new Directive();

const Insure = props => {
  const { thisyearrate, fundname, remark } = props;
  return (
    <li className={classNames('jxjj-item')}>
      <div className={classNames('jxjj-item-top', 'flex-p')}>
        <div className={classNames('my-hairline--right', 'jxjj-left-increase')}>
          <p style={{ ...directive.color(thisyearrate) }} className={classNames('increase')}>
            {filter.chngPct(thisyearrate)}
          </p>
          <p className={classNames('mt-10')}>近1年涨跌幅</p>
        </div>
        <div className={classNames('jxjj-left-name')}>
          <p className={classNames('name', 'one-line')}>{fundname}</p>
          <p className={classNames('mt-15')}>160213（QDII）</p>
        </div>
      </div>
      <div className={classNames('jxjj-item-desc')}>推荐理由：{remark}</div>
    </li>
  );
};
export default Insure;
