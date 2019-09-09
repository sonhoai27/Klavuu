import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckLogin from './CheckLogin';

export interface IPrivateRouteProps {
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  path: any;
  exact: boolean;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('zone-uuid')) {
          return <Redirect to="/login" />;
        }

        return (
          <CheckLogin>
            <Component {...props} />
          </CheckLogin>
        );
      }}
    />
  );
};

export default PrivateRoute;
