import * as React from 'react';
import { connect } from 'react-redux';
import { actionLogin, actionShowHideAlert } from '@app/stores/init';

const S = require('./styles/login.scss')

interface IAdminLoginProps {
  actionLogin: Function;
  actionShowHideAlert: Function;
  LoginCheckState: any;
}

interface IAdminLoginStates {
  user: {
    user_email: string;
    user_password: string;
  }
}

class AdminLogin extends React.Component<IAdminLoginProps, IAdminLoginStates> {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        user_email: '',
        user_password: '',
      },
    }
  }

  onChange = (e) => {
    const { value, name } = e.target

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    })
  }

  onLogin = () => {
    if (this.state.user.user_email !== '' && this.state.user.user_password !== '') {
      this.props.actionLogin(this.state.user)
      .then((result) => {
        this.props.actionShowHideAlert({
          type: 'success',
          title: 'Đăng nhập thành công!',
          status: true,
        })
        localStorage.setItem('token', result.value.data.token)
        setTimeout(() => {
          this.props.actionShowHideAlert({
            status: false,
          })
          window.location.href = '/xxx/app'
        }, 1500)
      })
      .catch(() => {
        this.props.actionShowHideAlert({
          type: 'warning',
          title: 'Có lỗi vui lòng xem lại!',
          status: true,
        })
        setTimeout(() => {
          this.props.actionShowHideAlert({
            status: false,
          })
        }, 1500)
      })
    }
  }

  render() {
    return (
      <div className={S['ad-login']}>
        <div className={S['login-container']}>
            <h1 className={S['dialog-heading']}>ZONE 22</h1>
            <h2 className={S['dialog-subheading']}>Đăng nhập vào quản trị</h2>
            <div className={S['form']}>
              <div className={S['ad-form-group']}>
                <input
                  onChange={this.onChange}
                  className={S['form-control']}
                  name="user_email"
                  placeholder="Email đăng nhập"
                  type="text"
                  autoComplete={'off'} />
              </div>
              <div className={S['ad-form-group']}>
                <input
                  onChange={this.onChange}
                  className={S['form-control']}
                  name="user_password"
                  placeholder="Mật khẩu"
                  type="password"
                  autoComplete={'off'} />
              </div>
              <button
                onClick={this.onLogin}
                className={S['btn-login']} type="submit">Đăng nhập</button>
            </div>
            <a href="">Bạn quên mật khẩu? Vui lòng liên hệ nhà cung cấp dịch vụ.</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  LoginCheckState: storeState.initReducer.LoginCheckState,
})

const mapDispatchToProps = {
  actionLogin,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
