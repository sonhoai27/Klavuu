import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

const AdminHome = React.lazy(() => import(
  /*webpackChunkName: "admin_home" */ '@app/modules/admin/home'));

const AdminProducts = React.lazy(() => import(
  /*webpackChunkName: "admin_home" */ '@app/modules/admin/product'));

const AdminProductsAdd = React.lazy(() => import(
    /*webpackChunkName: "admin_product_add" */ '@app/modules/admin/product/add'));

const AdminRouter = (props) => {
  console.log(props)

  return (
    <React.Suspense fallback={''}>
      <Switch>
        <Route exact path={`${props.match.url}`} component={AdminHome}/>
        <Route exact path={`${props.match.url}/products`} component={AdminProducts}/>
        <Route exact path={`${props.match.url}/products/add`} component={AdminProductsAdd}/>
      </Switch>
    </React.Suspense>
  )
}

export default AdminRouter
