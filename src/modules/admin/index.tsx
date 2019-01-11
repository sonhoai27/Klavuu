import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import { setLocalStyles } from '@app/stores/init';
import PrivateRouter from '@app/configs/PrivateRoute';

const AdminPage = React.lazy(() => import(
  /*webpackChunkName: "admin_page" */ '@app/modules/admin/AdminRouter'));

const AdminLogin =  React.lazy(() => import(
  /*webpackChunkName: "admin_login" */ '@app/modules/admin/auth/Login'));

interface IClientProps {
  match?: any;
}

class Admin extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { match } = this.props;

    return (
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
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
})

const mapDispatchToProps = {
  setLocalStyles,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
