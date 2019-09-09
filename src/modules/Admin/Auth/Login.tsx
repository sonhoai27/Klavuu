import * as React from 'react';
import { validateEmail } from '@app/configs';
import { connect } from 'react-redux';
import '@app/modules/Admin/Auth/Styles/Login.none.scss';
import { login, loadUser } from '@app/Stores/init';

interface ILoginProps {
  login: any;
  history: any;
  isAuthenticated: any;
  loadUser: Function;
}
interface ILoginStates {
  loginForm: {
    email: string,
    password: string,
  };
  error: any;
  isLoading: boolean;
}

class Login extends React.PureComponent<ILoginProps, ILoginStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loginForm: {
        email: '',
        password: '',
      },
      error: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    const {
      isAuthenticated,
    } = this.props;

    if (isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange = (e: any) => {
    const {
      value,
      name,
    } = e.target;
    const {
      loginForm,
    } = this.state;

    this.setState({
      loginForm: {
        ...loginForm,
        [name]: value,
      },
      error: {
        email: '',
        password: '',
      },
    });
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const {
      loginForm,
      error,
    } = this.state;
    const {
      login,
    } = this.props;
    this.setState({
      isLoading: true,
    });

    if (!loginForm.email || !validateEmail(loginForm.email)) {
      this.setState({
        error: {
          ...error,
          email: 'error',
        },
      });
    }
    if (!loginForm.password) {
      this.setState({
        error: {
          ...error,
          password: 'error',
        },
      });
    }

    if (loginForm.password && loginForm.email && validateEmail(loginForm.email)) {
      login(loginForm.email, loginForm.password)
      .then((res: any) => {
        console.log(res)
        if (res.payload && res.payload.token) {
          this.setState({
            isLoading: false,
          },            () => {
            this.props.loadUser();
            this.props.history.push('/');
          });
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      error,
    } = this.state;

    return (
      <div className="block w-full my-20">
        <div className="container mx-auto">
          <div className="px-2">
            <div className="flex flex-wrap -mx-2">
              <div className="sm:w-1/4 px-2"></div>
              <div className="sm:w-2/4 w-full px-2">
                <div className="text-2xl capitalize text-center text-gray-700">
                  Đăng nhập
                </div>
                <div className="py-4 px-4">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group w-full">
                      <label htmlFor="email">
                        <span className="text-sm">Địa chỉ email</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        className={`form-control ${error.email ? 'is-invalid' : ''}`}
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        id="email"/>
                        {
                          error.email
                          && (
                            <div className="w-full text-xs invalid-feedback">
                              Địa chỉ email không đúng
                            </div>
                          )
                        }
                    </div>
                    <div className="form-group w-full">
                      <label htmlFor="password">
                        <span className="text-sm">Mật khẩu</span>
                      </label>
                      <input
                        onChange={this.onChange}
                        className={`form-control ${error.password ? 'is-invalid' : ''}`}
                        name="password"
                        type="password"
                        id="password"/>
                      {
                        error.password
                        && (
                          <div className="w-full text-xs invalid-feedback">
                            Vui lòng nhập password.
                          </div>
                        )
                      }
                    </div>
                    <button
                      className="w-full bg-yellow-400 py-3 rounded-sm text-sm"
                      type="submit">
                        Đăng nhập
                      </button>
                  </form>
                </div>
              </div>
              <div className="sm:w-1/4 px-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.initReducer.isAuthenticated,
});

const mapDispatchToProps = {
  login,
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
