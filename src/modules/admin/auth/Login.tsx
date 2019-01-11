import * as React from 'react';
import { connect } from 'react-redux';

import './styles/login.scss'

class AdminLogin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ad-login">
        <div className="login-container">
            <h1 className="dialog-heading">SHD</h1>
            <h2 className="dialog-subheading">Đăng nhập vào quản trị</h2>
            <div className="form">
              <div className="ad-form-group">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email đăng nhập"
                  type="text"
                  autoComplete={'off'} />
              </div>
              <div className="ad-form-group">
                <input
                  className="form-control"
                  name="password"
                  placeholder="Mật khẩu"
                  type="text"
                  autoComplete={'off'} />
              </div>
              <button className="btn-login" type="submit">Đăng nhập</button>
            </div>
            <a href="">Bạn quên mật khẩu?</a>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
}

export default connect(null, mapDispatchToProps)(AdminLogin);
