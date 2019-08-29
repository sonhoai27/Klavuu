import { Redirect, Route } from 'react-router-dom'
import * as React from 'react'

import AdminLayout from '@app/modules/admin/shared/layout'

export interface IPrivateRouteProps {
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
  apiLogin: any;
  path: any;
}
export const PrivateRouter = ({
  component: Component,
  apiLogin: Login,
  ...rest
}: IPrivateRouteProps) => {

  return (
    <Route {...rest} render={(props) => {
      return (Login.status === 202
        ? <AdminLayout><Component {...props} /></AdminLayout>
        : <Redirect to={'/login'} />)
    }} />
  )
};
export default PrivateRouter
