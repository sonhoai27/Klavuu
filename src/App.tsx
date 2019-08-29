
const localStyles = require('./App.css');

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { setLocalStyles } from '@app/stores/init';
import Loading from '@app/shared/Loading';
import Alert from '@app/shared/alert/Alert';
import Popup from '@app/shared/popup';
import GlobalLoading from './shared/global-loading';
import AdminLayout from './modules/admin/shared/layout';

const AdminHome = React.lazy(() => import('@app/modules/admin/home'))

const AdminProducts = React.lazy(() => import('@app/modules/admin/product'));

const AdminProductsAdd = React.lazy(() => import('@app/modules/admin/product/add'));

const AdminProductsDetail = React.lazy(() => import('@app/modules/admin/product/detail'))

const AdminOrder = React.lazy(() => import('@app/modules/admin/order'));

const AdminOrderDetail = React.lazy(() => import('@app/modules/admin/order/OrderDetail'));

const AdminBanner = React.lazy(() => import('@app/modules/admin/banner'));

const AdminBrand = React.lazy(() => import('@app/modules/admin/brand'));

const AdminTags = React.lazy(() => import('@app/modules/admin/tags'));

const AdminComments = React.lazy(() => import('@app/modules/admin/comment'));

const AdminSettings = React.lazy(() => import('@app/modules/admin/settings'));

const AdminLanguage = React.lazy(() => import('@app/modules/admin/language'));

const AdminHelps = React.lazy(() => import('@app/modules/admin/helps'));

const AdminBlogs = React.lazy(() => import('@app/modules/admin/blog'));

const AdminBlogsAddOrUpdate = React.lazy(() => import('@app/modules/admin/blog/AddOrUpdate'));

const AdminContact = React.lazy(() => import('@app/modules/admin/contact'));

interface IClientProps {
  match?: any;
  isLoading: boolean;
  showOrHideAlertState: any;
  isShowHidePopupState: any;
  setLocalStyles: Function;
}

class App extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.setLocalStyles(localStyles)
  }

  render() {
    return (
     
        <>
           <React.Suspense fallback={<GlobalLoading />}>
            <BrowserRouter basename="/backend">
              <AdminLayout>
              <Switch>
              <Route exact path="/" component={AdminHome} />
              <Route exact path="/products" component={AdminProducts} />
              <Route exact path="/product/add" component={AdminProductsAdd} />
              <Route exact path="/product/:alias" component={AdminProductsDetail} />
              <Route exact path="/banners" component={AdminBanner} />
              <Route exact path="/brands" component={AdminBrand} />
              <Route exact path="/tags" component={AdminTags} />
              <Route exact path="/contact" component={AdminContact} />
              <Route exact path="/comments" component={AdminComments} />
              <Route exact path="/settings" component={AdminSettings} />
              <Route exact path="/language" component={AdminLanguage} />
              <Route exact path="/orders" component={AdminOrder} />
              <Route exact path="/order/:id" component={AdminOrderDetail} />
              <Route exact path="/helps" component={AdminHelps} />
              <Route exact path="/blogs" component={AdminBlogs} />
              <Route exact path="/blogs/add" component={AdminBlogsAddOrUpdate} />
              <Route exact path="/blog/:alias" component={AdminBlogsAddOrUpdate} />
            </Switch>
              </AdminLayout>
            </BrowserRouter>
           </React.Suspense>
          
          {
            this.props.isLoading && <Loading />
          }

          {
            this.props.showOrHideAlertState.status && (
              // tslint:disable-next-line:max-line-length
              <Alert title={this.props.showOrHideAlertState.title} type={this.props.showOrHideAlertState.type} />
            )
          }
          {
            this.props.isShowHidePopupState.status && (
              <Popup
                onClose={this.props.isShowHidePopupState.onClose}
                poBtn={{
                  title: (
                    this.props.isShowHidePopupState.poBtn
                    && this.props.isShowHidePopupState.poBtn.title
                  ),
                  func: (
                    this.props.isShowHidePopupState.poBtn
                    && this.props.isShowHidePopupState.poBtn.func
                  ),
                }}
                neBtn={{
                  title: (
                    this.props.isShowHidePopupState.neBtn
                    && this.props.isShowHidePopupState.neBtn.title
                  ),
                  func: (
                    this.props.isShowHidePopupState.neBtn
                    && this.props.isShowHidePopupState.neBtn.func
                  ),
                }}
                title={this.props.isShowHidePopupState.title}
                message={this.props.isShowHidePopupState.message}
                icon={this.props.isShowHidePopupState.icon}
              />
            )
          }
        </>
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
  isLoading: storeState.initReducer.isLoading,
  showOrHideAlertState: storeState.initReducer.showOrHideAlertState,
  isShowHidePopupState: storeState.initReducer.isShowHidePopupState,
})

const mapDispatchToProps = {
  setLocalStyles,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
