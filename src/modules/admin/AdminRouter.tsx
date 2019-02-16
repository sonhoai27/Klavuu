import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// @ts-ignore
import Loadable from 'react-loadable';

const AdminHome = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_home" */ '@app/modules/admin/home'),
  loading: () => '',
});

const AdminProducts = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_home" */ '@app/modules/admin/product'),
  loading: () => '',
});

const AdminProductsAdd = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_product_add" */ '@app/modules/admin/product/add'),
  loading: () => '',
});

const AdminProductsDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_product_detail" */ '@app/modules/admin/product/detail'),
  loading: () => '',
});

const AdminOrder = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_order" */ '@app/modules/admin/order'),
  loading: () => '',
});

const AdminOrderDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_order_detail" */ '@app/modules/admin/order/OrderDetail'),
  loading: () => '',
});

const AdminBanner = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_banner" */ '@app/modules/admin/banner'),
  loading: () => '',
});

const AdminBrand = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_banner" */ '@app/modules/admin/brand'),
  loading: () => '',
});

const AdminTags = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_tag" */ '@app/modules/admin/tags'),
  loading: () => '',
});

const AdminComments = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_comments" */ '@app/modules/admin/comment'),
  loading: () => '',
});

const AdminSettings = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_settings" */ '@app/modules/admin/settings'),
  loading: () => '',
});

const AdminRouter = (props) => {
  return (
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
      <Route path={`${props.match.url}/settings`} component={AdminSettings}/>
    </Switch>
  )
}

export default AdminRouter
