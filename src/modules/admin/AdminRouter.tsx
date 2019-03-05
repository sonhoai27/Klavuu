import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// @ts-ignore
import Loadable from 'react-loadable';
import GlobalLoading from '@app/shared/global-loading';

const AdminHome = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_home" */ '@app/modules/admin/home'),
  loading: () => <GlobalLoading/>,
});

const AdminProducts = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_home" */ '@app/modules/admin/product'),
  loading: () => <GlobalLoading/>,
});

const AdminProductsAdd = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_product_add" */ '@app/modules/admin/product/add'),
  loading: () => <GlobalLoading/>,
});

const AdminProductsDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_product_detail" */ '@app/modules/admin/product/detail'),
  loading: () => <GlobalLoading/>,
});

const AdminOrder = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_order" */ '@app/modules/admin/order'),
  loading: () => <GlobalLoading/>,
});

const AdminOrderDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_order_detail" */ '@app/modules/admin/order/OrderDetail'),
  loading: () => <GlobalLoading/>,
});

const AdminBanner = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_banner" */ '@app/modules/admin/banner'),
  loading: () => <GlobalLoading/>,
});

const AdminBrand = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_banner" */ '@app/modules/admin/brand'),
  loading: () => <GlobalLoading/>,
});

const AdminTags = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_tag" */ '@app/modules/admin/tags'),
  loading: () => <GlobalLoading/>,
});

const AdminComments = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_comments" */ '@app/modules/admin/comment'),
  loading: () => <GlobalLoading/>,
});

const AdminSettings = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_settings" */ '@app/modules/admin/settings'),
  loading: () => <GlobalLoading/>,
});

const AdminLanguage = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_language" */ '@app/modules/admin/language'),
  loading: () => <GlobalLoading/>,
});

const AdminHelps = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_helps" */ '@app/modules/admin/helps'),
  loading: () => <GlobalLoading/>,
});

const AdminBlogs = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_blogs" */ '@app/modules/admin/blog'),
  loading: () => <GlobalLoading/>,
});

const AdminRouter = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}`} component={AdminHome}/>
      <Route path={`${props.match.url}/products`} component={AdminProducts}/>
      <Route path={`${props.match.url}/product/add`} component={AdminProductsAdd}/>
      <Route path={`${props.match.url}/product/:alias`} component={AdminProductsDetail}/>
      <Route path={`${props.match.url}/banners`} component={AdminBanner}/>
      <Route path={`${props.match.url}/brands`} component={AdminBrand}/>
      <Route path={`${props.match.url}/tags`} component={AdminTags}/>
      <Route path={`${props.match.url}/comments`} component={AdminComments}/>
      <Route path={`${props.match.url}/settings`} component={AdminSettings}/>
      <Route path={`${props.match.url}/language`} component={AdminLanguage}/>
      <Route path={`${props.match.url}/orders`} component={AdminOrder}/>
      <Route path={`${props.match.url}/order/:id`} component={AdminOrderDetail}/>
      <Route path={`${props.match.url}/helps`} component={AdminHelps}/>
      <Route path={`${props.match.url}/blogs`} component={AdminBlogs}/>
    </Switch>
  )
}

export default AdminRouter
