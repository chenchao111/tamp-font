// 第三方
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import router from 'umi/router';
import { InputItem, Modal } from 'antd-mobile';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// 自己
import { str as Str } from '@/utils';
import { message } from '@/common/js';
import { MyModals } from '@/components';
import './index.less';
import Init from '@/global/init';
import { login as LoginApi } from '@/services';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

@connect(({ login }) => ({
  ...login,
}))
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // input改变事件
  handleInputChange = (key, val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/handleInputChange',
      payload: {
        [key]: val,
      },
    });
  };
  // 图片验证码
  handleImgCodeUrl = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/imgCodeUrlChange',
      payload: {
        imgCodeUrl: `//sso.jrj.com.cn/service/create?_=${Math.random()}}`,
      },
    });
  };
  // 获取手机验证码按钮被点击
  handleMobileCodeClick = () => {
    let { imgCodeCss, timeId, mobile, imgCode, mobileCode, dispatch } = this.props;
    mobile = Str.trimStr(mobile);
    // 手机号校验
    if (!Str.mobileCheck(mobile)) {
      dispatch({
        type: 'login/mobileCheck',
        payload: {
          isError: true,
          errorInfo: '请输入正确的手机号',
        },
      });
      return;
    }
    // 图形验证码校验
    if (!imgCode || imgCode.length !== 4) return;
    // 倒计时进行时校验
    if (imgCodeCss) return; // 正在倒计时不能点击
    dispatch({
      type: 'login/handleQueryCode',
      payload: {
        mobile,
        imgCode,
      },
    });
    clearInterval(timeId); // 清除定时器
    let num = 5;
    dispatch({
      type: 'login/countDown',
      payload: {
        imgCodeCss: true,
        imgCodeInfo: `${num}s`,
      },
    });
    timeId = setInterval(() => {
      dispatch({
        type: 'login/countDown',
        payload: {
          imgCodeCss: true,
          imgCodeInfo: `${--num}s`,
        },
      });
      if (num <= 0) {
        dispatch({
          type: 'login/countDown',
          payload: {
            imgCodeCss: false,
            imgCodeInfo: '重发验证码',
          },
        });
        clearInterval(timeId);
        return;
      }
    }, 1000);
  };
  // 登录按钮被点击
  handleLoginClick = async () => {
    try {
      let {
        history: { location },
        mobile,
        imgCode,
        mobileCode,
        dispatch,
      } = this.props;
      mobile = Str.trimStr(mobile);
      if (!Str.mobileCheck(mobile)) {
        this.setState({
          isError: true,
          errorInfo: '请输入正确的手机号',
        });
        return;
      }
      // 图形验证码校验
      if (!imgCode || imgCode.length !== 4) return;
      // 手机验证码校验
      if (!mobileCode || mobileCode.length !== 4) return;
      const { tgId, checkLogin, updateVisitTgInfo } = new Init();
      const loginInfo = await LoginApi.loginPlatform({ mobile, verifyCode: mobileCode });
      if (parseInt(loginInfo.resultCode) === 0) {
        // 手机号和微信绑定成功
        const { isLogin, userid } = await checkLogin(); // 种cookie
        if (isLogin) {
          // 登录成功 更新userid
          dispatch({
            type: 'global/setUserId',
            payload: {
              userid,
            },
          });
        }
        const isUpdate = await updateVisitTgInfo(tgId()); // 更新访问记录
        const { backUrl } = location.query;
        router.replace(backUrl);
      } else if (parseInt(loginInfo.resultCode) == 4018) {
        // 需要合并账户
        this.handleIsModal(true, res.passportId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // 合并账号
  mergeMobile = async () => {
    try {
      const {
        history: { location },
        dispatch,
        passportId,
      } = this.props;
      const { tgId, checkLogin, updateVisitTgInfo } = new Init();
      const merge = await mergeWechatAndPhone({
        passportId,
      });
      const { isLogin, userid } = await checkLogin(); // 种cookie
      if (isLogin) {
        // 登录成功 更新userid
        dispatch({
          type: 'global/setUserId',
          payload: {
            userid,
          },
        });
      }
      const isUpdate = await updateVisitTgInfo(tgId()); // 更新访问记录
      const { backUrl } = location.query;
      router.replace(backUrl);
    } catch (error) {
      console.error(error);
    }
  };
  // 关闭或显示协议内容
  handleMask = isAgreement => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/mask',
      payload: {
        isAgreement,
      },
    });
  };
  // 关闭/显示 合并账户弹窗
  handleIsModal = (isModal, passportId) => {
    const { dispatch } = this.props;
    if (isModal) {
      dispatch({
        type: 'login/modal',
        payload: {
          isModal,
          passportId,
        },
      });
    } else {
      dispatch({
        type: 'login/modal',
        payload: {
          isModal,
        },
      });
    }
  };
  render() {
    const {
      imgCodeCss,
      imgCodeInfo,
      isError,
      errorInfo,
      mobile,
      imgCode,
      mobileCode,
      imgCodeUrl,
      isAgreement,
      isModal,
    } = this.props;
    const Logo = () => (
      <div className={classNames('top-logo')}>
        <img className={classNames('logo-img')} src={require('../../assets/logo.png')} alt="" />
      </div>
    );
    const LoginBtn = () => (
      <div className={classNames('login-btn')} onClick={this.handleLoginClick}>
        确定
      </div>
    );
    const Agreement = () => (
      <div
        onClick={() => {
          this.handleMask(true);
        }}
        className={classNames('agreement-info')}
      >
        点击确定，即表示阅读并同意
        <span className={classNames('agreement')}>《用户服务协议》</span>
      </div>
    );
    const MobileInput = () => (
      <InputItem
        value={mobile}
        type="phone"
        clear
        placeholder="请输入手机号"
        className={classNames('input-item', 'my-hairline--bottom')}
        onChange={val => this.handleInputChange('mobile', val)}
      >
        <div className={classNames('input-icon', 'mobile')} />
      </InputItem>
    );
    const ImgCodeInput = () => (
      <InputItem
        value={imgCode}
        clear
        maxLength="4"
        placeholder="请输入图形验证码"
        className={classNames('input-item', 'my-hairline--bottom')}
        onChange={val => this.handleInputChange('imgCode', val)}
      >
        <div className={classNames('input-icon', 'img-code')} />
        <img
          onClick={this.handleImgCodeUrl}
          className={classNames('img-code-change')}
          src={imgCodeUrl}
          alt=""
        />
      </InputItem>
    );
    const MobileCodeInput = () => (
      <InputItem
        value={mobileCode}
        type="number"
        clear
        maxLength="4"
        placeholder="请输入手机验证码"
        className={classNames('input-item', 'my-hairline--bottom')}
        onChange={val => this.handleInputChange('mobileCode', val)}
      >
        <div className={classNames('input-icon', 'mobile-code')} />
        <div
          onClick={this.handleMobileCodeClick}
          className={classNames(['code-btn', imgCodeCss ? 'code-ing' : 'code-get'])}
        >
          {imgCodeInfo}
        </div>
      </InputItem>
    );
    const ErrorDesc = () => <p className={classNames('mobile-desc')}>{isError && errorInfo}</p>;
    const AgreementContent = () => (
      <Fragment>
        <CSSTransition in={isAgreement} timeout={100} classNames="fade" unmountOnExit>
          <div
            key={'mask'}
            className={classNames('mask')}
            onClick={() => {
              this.handleMask(false);
            }}
          ></div>
        </CSSTransition>
        <CSSTransition in={isAgreement} timeout={100} classNames="slide" unmountOnExit>
          <div key={'content'} className={classNames('content')}>
            <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
          </div>
        </CSSTransition>
      </Fragment>
    );
    const MyModal = () => (
      <MyModals
        visible={isModal}
        handleVisible={this.handleIsModal}
        title="您的手机号已被注册，是否<br/>要将当前微信绑定到此手机账户"
        desc="注：仅合并自选股，其他记录不合并"
        affirm={{
          text: '确认合并',
          callback: this.mergeMobile,
        }}
        cancel={{
          text: '更换绑定手机号',
        }}
      />
    );
    return (
      <div className={classNames('login-pages')}>
        {Logo()}
        <div className={classNames('login-info')}>
          {MobileInput()}
          {ImgCodeInput()}
          {MobileCodeInput()}
          {ErrorDesc()}
        </div>
        {LoginBtn()}
        {Agreement()}
        {AgreementContent()}
        {MyModal()}
      </div>
    );
  }
}

export default Login;
