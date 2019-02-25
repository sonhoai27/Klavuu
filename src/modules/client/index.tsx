import * as React from 'react';
import { setLocalStyles } from '@app/stores/init';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'
// @ts-ignore
import Loadable from 'react-loadable';

import Layout from './shared/layout';
import { actionLoadCart } from '@app/stores/cart/CartActions';
import { actionGetTagsForMenu } from '@app/stores/tag/TagActions';
import Alert from '@app/shared/alert/Alert';
import Loading from '@app/shared/Loading';
import Popup from '@app/shared/popup';
import ShoppingCart from './cart/ShoppingCart';
import { actionGetBrands } from '@app/stores/brand/BrandActions';
import GlobalLoading from '@app/shared/global-loading';

const ProductDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "home_detail" */ '@app/modules/client/products/ProductDetail'),
  loading: () => <GlobalLoading/>,
});

const ProductList = Loadable({
  loader: () => import(
    /*webpackChunkName: "home_list_product" */ '@app/modules/client/products/ProductLists'),
  loading: () => <GlobalLoading/>,
});

const Checkout = Loadable({
  loader: () => import(
    /*webpackChunkName: "home_checkout" */ './cart/Checkout'),
  loading: () => <GlobalLoading/>,
});

const AboutUs = Loadable({
  loader: () => import(
    /*webpackChunkName: "home_aboutus" */ './about/AboutUs'),
  loading: () => <GlobalLoading/>,
});

const Search = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_search" */ './search'),
  loading: () => <GlobalLoading/>,
});

const Faqs = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_faqs" */ './faq'),
  loading: () => <GlobalLoading/>,
});

const FaqsDetail = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_faqs_detail" */ './faq/FaqDetail'),
  loading: () => <GlobalLoading/>,
});

interface IClientProps {
  match?: any;
  isShowShoppingCartState: boolean;
  actionLoadCart: Function;
  showOrHideAlertState: any;
  actionGetTagsForMenu: Function;
  isShowHidePopupState: any;
  isLoading: boolean;
  actionGetBrands: Function;
}

class Client extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionLoadCart()
    this.props.actionGetTagsForMenu()
    this.props.actionGetBrands()
  }

  render() {
    const { match } = this.props;

    return (
      <>
        <Router>
          <Layout>
            <Route exact path={`${match.url}/product/:alias`} component={ProductDetail} />
            <Route exact path={`${match.url}/products/all`} component={ProductList} />
            <Route exact path={`${match.url}/products/:type/:alias`} component={ProductList} />
            <Route exact path={`${match.url}/checkout`} component={Checkout} />
            <Route exact path={`${match.url}/about-us`} component={AboutUs} />
            <Route exact path={`${match.url}/search/:query`} component={Search} />
            <Route exact path={`${match.url}/faqs`} component={Faqs} />
            <Route exact path={`${match.url}/faqs/:alias`} component={FaqsDetail} />
            {
              this.props.isShowShoppingCartState && <ShoppingCart />
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
            {
              this.props.showOrHideAlertState.status && (
                <Alert
                  icon={this.props.showOrHideAlertState.icon}
                  title={this.props.showOrHideAlertState.title}
                  type={this.props.showOrHideAlertState.type} />
              )
            }
            {
              this.props.isLoading && <Loading/>
            }
          </Layout>
        </Router>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  localStyles: storeState.initReducer.localStyles,
  isShowHidePopupState: storeState.initReducer.isShowHidePopupState,
  isShowShoppingCartState: storeState.initReducer.isShowShoppingCartState,
  showOrHideAlertState: storeState.initReducer.showOrHideAlertState,
  isLoading: storeState.initReducer.isLoading,
})

const mapDispatchToProps = {
  setLocalStyles,
  actionLoadCart,
  actionGetTagsForMenu,
  actionGetBrands,
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
