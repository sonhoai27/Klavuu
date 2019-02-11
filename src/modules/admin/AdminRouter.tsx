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

const AdminOrder = React.lazy(() => import(
  /*webpackChunkName: "admin_order" */ '@app/modules/admin/order'));

const AdminOrderDetail = React.lazy(() => import(
  /*webpackChunkName: "admin_order_detail" */ '@app/modules/admin/order/OrderDetail'));

const AdminBanner = React.lazy(() => import(
  /*webpackChunkName: "admin_banner" */ '@app/modules/admin/banner'));

const AdminBrand = React.lazy(() => import(
  /*webpackChunkName: "admin_banner" */ '@app/modules/admin/brand'));

const AdminTags = React.lazy(() => import(
  /*webpackChunkName: "admin_tag" */ '@app/modules/admin/tags'));

const AdminComments = React.lazy(() => import(
  /*webpackChunkName: "admin_comments" */ '@app/modules/admin/comment'));

const AdminRouter = (props) => {

  return (
    <React.Suspense fallback={''}>
      <Switch>
        <Route exact path={`${props.match.url}`} component={AdminHome}/>
        <Route path={`${props.match.url}/products`} component={AdminProducts}/>
        <Route path={`${props.match.url}/product/add`} component={AdminProductsAdd}/>
        <Route path={`${props.match.url}/product/:alias`} component={AdminProductsDetail}/>
        <Route path={`${props.match.url}/orders`} component={AdminOrder}/>
        <Route path={`${props.match.url}/order/:id`} component={AdminOrderDetail}/>
        <Route path={`${props.match.url}/banners`} component={AdminBanner}/>
        <Route path={`${props.match.url}/brands`} component={AdminBrand}/>
        <Route path={`${props.match.url}/tags`} component={AdminTags}/>
        <Route path={`${props.match.url}/comments`} component={AdminComments}/>
      </Switch>
    </React.Suspense>
  )
}

export default AdminRouter
