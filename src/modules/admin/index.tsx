import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { setLocalStyles } from '@app/stores/init';
import PrivateRouter from '@app/configs/PrivateRoute';
import Loading from '@app/shared/Loading';
import Alert from '@app/shared/alert/Alert';

const AdminPage = React.lazy(() => import(
  /*webpackChunkName: "admin_page" */ '@app/modules/admin/AdminRouter'));

const AdminLogin =  React.lazy(() => import(
  /*webpackChunkName: "admin_login" */ '@app/modules/admin/auth/Login'));

interface IClientProps {
  match?: any;
  isLoading: boolean;
  showOrHideAlertState: any;
}

class Admin extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { match } = this.props;

    return (
      <>
        <React.Suspense fallback={''}>
          <Switch>
            <PrivateRouter
              apiLogin={{
                status: 200,
              }}
              path={`${match.url}/app`}
              component={AdminPage}
            />
            <Route path={`${match.url}/login`} component={AdminLogin}/>
            <Redirect from={`${match.url}`} to={`${match.url}/app`} />
          </Switch>
        </React.Suspense>
        {
          this.props.isLoading && <Loading/>
        }

        {
          this.props.showOrHideAlertState.status && (
            // tslint:disable-next-line:max-line-length
            <Alert title={this.props.showOrHideAlertState.title} type={this.props.showOrHideAlertState.type}/>
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
})

const mapDispatchToProps = {
  setLocalStyles,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
