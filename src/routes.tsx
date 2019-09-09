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
  {
    name: 'products',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Product'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/products',
    id: 'products',
    exact: true,
    private: true,
  },
  {
    name: 'product add',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Product/Add'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/product/add',
    id: 'product-add',
    exact: true,
    private: true,
  },
  {
    name: 'product detail',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Product/Detail'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/product/:alias',
    id: 'product-detail',
    exact: true,
    private: true,
  },
  {
    name: 'banners',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Banner'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/banners',
    id: 'banners',
    exact: true,
    private: true,
  },
  {
    name: 'brand',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Brand'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/brands',
    id: 'brands',
    exact: true,
    private: true,
  },
  {
    name: 'tags',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Tags'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/tags',
    id: 'tags',
    exact: true,
    private: true,
  },
  {
    name: 'contact',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Contact'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/contact',
    id: 'contact',
    exact: true,
    private: true,
  },
  {
    name: 'comments',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Comment'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/comments',
    id: 'comments',
    exact: true,
    private: true,
  },
  {
    name: 'settings',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Settings'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/settings',
    id: 'settings',
    exact: true,
    private: true,
  },
  {
    name: 'language',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Language'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/language',
    id: 'language',
    exact: true,
    private: true,
  },
  {
    name: 'orders',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Order'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/orders',
    id: 'orders',
    exact: true,
    private: true,
  },
  {
    name: 'orders detail',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Order/OrderDetail'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/order/:id',
    id: 'order-detail',
    exact: true,
    private: true,
  },
  {
    name: 'helps',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Helps'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/helps',
    id: 'helps',
    exact: true,
    private: true,
  },
  {
    name: 'blogs',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Blog'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/blogs',
    id: 'blogs',
    exact: true,
    private: true,
  },
  {
    name: 'blogs',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Blog/AddOrUpdate'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/blogs/add',
    id: 'blogs-add',
    exact: true,
    private: true,
  },
  {
    name: 'blog detail',
    component: React.lazy(() => {
      return Promise.all([
        import('@app/modules/Admin/Blog/AddOrUpdate'),
        new Promise(resolve => setTimeout(resolve, 300)),
      ])
      .then(([moduleExports]) => moduleExports);
    }),
    path: '/blog/:alias',
    id: 'blogs-detail',
    exact: true,
    private: true,
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
