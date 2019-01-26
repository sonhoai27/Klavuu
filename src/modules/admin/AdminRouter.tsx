import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

const AdminHome = React.lazy(() => import(
  /*webpackChunkName: "admin_home" */ '@app/modules/admin/home'));

const AdminProducts = React.lazy(() => import(
  /*webpackChunkName: "admin_home" */ '@app/modules/admin/product'));

const AdminProductsAdd = React.lazy(() => import(
    /*webpackChunkName: "admin_product_add" */ '@app/modules/admin/product/add'));

const AdminProductsDetail = React.lazy(() => import(
  /*webpackChunkName: "admin_product_detail" */ '@app/modules/admin/product/detail'));

const AdminRouter = (props) => {

  return (
    <React.Suspense fallback={''}>
      <Switch>
        <Route exact path={`${props.match.url}`} component={AdminHome}/>
        <Route path={`${props.match.url}/products`} component={AdminProducts}/>
        <Route path={`${props.match.url}/product/add`} component={AdminProductsAdd}/>
        <Route path={`${props.match.url}/product/:alias`} component={AdminProductsDetail}/>
      </Switch>
    </React.Suspense>
  )
}

export default AdminRouter
