import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
// @ts-ignore
import Loadable from 'react-loadable';

import { setLocalStyles, actionCheckLogin } from '@app/stores/init';
import PrivateRouter from '@app/configs/PrivateRoute';
import Loading from '@app/shared/Loading';
import Alert from '@app/shared/alert/Alert';

const AdminPage = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_page" */ '@app/modules/admin/AdminRouter'),
  loading: () => '',
});

const AdminLogin =  Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_login" */ '@app/modules/admin/auth/Login'),
  loading: () => '',
});

const Popup =  Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_popup" */ '@app/shared/popup'),
  loading: () => '',
});

interface IClientProps {
  match?: any;
  isLoading: boolean;
  showOrHideAlertState: any;
  isShowHidePopupState: any;
  LoginCheckState: any;
  actionCheckLogin: Function;
}

interface IClientStates {
  login: any;
}

class Admin extends React.Component<IClientProps, IClientStates> {
  constructor(props) {
    super(props)

    this.state = {
      login: {},
    }
  }

  componentDidMount() {
    this.props.actionCheckLogin()
    .then((result) => {
      const { data } = result.value
      this.setState({
        login: data,
      })
    })
  }

  render() {
    const { match } = this.props;

    return (
      <>
        <Switch>
          <Route path={`${match.url}/login`} component={AdminLogin}/>
          {
            this.state.login.status
            && (
                <PrivateRouter
                  apiLogin={this.state.login}
                  path={`${match.url}/app`}
                  component={AdminPage}
                />
            )
          }
          {
            this.state.login.status
            && this.state.login.status === 202
            && <Redirect from={`${match.url}`} to={`${match.url}/app`} />
          }
        </Switch>
        {
          this.props.isLoading && <Loading/>
        }

        {
          this.props.showOrHideAlertState.status && (
            // tslint:disable-next-line:max-line-length
            <Alert title={this.props.showOrHideAlertState.title} type={this.props.showOrHideAlertState.type}/>
          )
        }
        {
          this.props.isShowHidePopupState.status && (
            <Popup
              onClose={this.props.isShowHidePopupState.onClose}
              poBtn={{
                title: (
                  this.props.isShowHidePopupState.poBtn
                  && this.props.isShowHidePopupState.poBtn.title
                ),
                func: (
                  this.props.isShowHidePopupState.poBtn
                  && this.props.isShowHidePopupState.poBtn.func
                ),
              }}
              neBtn={{
                title: (
                  this.props.isShowHidePopupState.neBtn
                  && this.props.isShowHidePopupState.neBtn.title
                ),
                func: (
                  this.props.isShowHidePopupState.neBtn
                  && this.props.isShowHidePopupState.neBtn.func
                ),
              }}
              title={this.props.isShowHidePopupState.title}
              message={this.props.isShowHidePopupState.message}
              icon={this.props.isShowHidePopupState.icon}
            />
          )
        }

      </>
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
  isLoading: storeState.initReducer.isLoading,
  showOrHideAlertState: storeState.initReducer.showOrHideAlertState,
  isShowHidePopupState: storeState.initReducer.isShowHidePopupState,
})

const mapDispatchToProps = {
  setLocalStyles,
  actionCheckLogin,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
