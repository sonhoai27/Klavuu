import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Shared/Loading';
import PrivateRoute from './Shared/PrivateRoute';

const routes = [
  {
    name: 'Home',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Home'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/',
    id: 'home',
    exact: true,
    private: true,
  },
  {
    name: 'Login',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Auth/Login'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/login',
    id: 'login',
    private: false,
  },
];

const makeRoute = () =>
  <React.Suspense fallback={<Loading/>}>
    <Switch>
    {
      routes.map(route => (
        !route.private
        ? <Route
          exact={route.exact || false}
          path={route.path} key={route.id}
          component={route.component} />
        : <PrivateRoute
            exact={route.exact || false}
            path={route.path} key={route.id} component={route.component}/>
      ))
    }
    </Switch>
  </React.Suspense>;

export { makeRoute as MakeRoute };
