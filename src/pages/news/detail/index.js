import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import classNames from 'classnames';

import styles from './index.less';

@connect(({ news }) => ({ ...news }))
class MyIndex extends PureComponent {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const {
      history: {
        location: {
          query: { infourl },
        },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'news/init',
      payload: {
        infourl,
      },
    });
  }

  render() {
    const { title, context, makedate, paperMediaSource } = this.props.details;
    return (
      <div className={classNames('news-detail-pages')}>
        <div className={classNames('title')}>{title}</div>
        <div className={classNames('time')}>
          {makedate} {paperMediaSource}
        </div>
        <div className={classNames('content')} dangerouslySetInnerHTML={{ __html: context }}></div>
      </div>
    );
  }
}
export default MyIndex;
