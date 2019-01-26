import * as React from 'react';
import { setLocalStyles } from '@app/stores/init';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Layout from './shared/layout';
import { actionLoadCart } from '@app/stores/cart/CartActions';
import { actionGetTagsForMenu } from '@app/stores/tag/TagActions';
import Alert from '@app/shared/alert/Alert';

const ProductDetail = React.lazy(() => import(
  /*webpackChunkName: "home_detail" */ '@app/modules/client/products/ProductDetail'));

const ProductList = React.lazy(() => import(
  /*webpackChunkName: "home_list_product" */ '@app/modules/client/products/ProductLists'));

const ShoppingCart = React.lazy(() => import(
  /*webpackChunkName: "home_shopping_cart" */ './cart/ShoppingCart'));

const Checkout = React.lazy(() => import(
    /*webpackChunkName: "home_checkout" */ './cart/Checkout'));

const Popup = React.lazy(() => import(
  /*webpackChunkName: "home_Popup" */ '@app/shared/popup'));

const Loading = React.lazy(() => import(
  /*webpackChunkName: "home_loading" */ '@app/shared/Loading'));

interface IClientProps {
  match?: any;
  isShowShoppingCartState: boolean;
  actionLoadCart: Function;
  showOrHideAlertState: any;
  actionGetTagsForMenu: Function;
  isShowHidePopupState: any;
  isLoading: boolean;
}

class Client extends React.Component<IClientProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionLoadCart()
    this.props.actionGetTagsForMenu()
  }

  render() {
    const { match } = this.props;

    return (
      <>
        <Router>
          <Layout>
            <React.Suspense fallback={<div className="loading">loading...</div>}>
              <Route exact path={`${match.url}/product/:alias`} component={ProductDetail} />
              <Route path={`${match.url}/products/all`} component={ProductList} />
              <Route path={`${match.url}/products/:type/:alias`} component={ProductList} />
              <Route path={`${match.url}/checkout`} component={Checkout} />
            </React.Suspense>
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
}

export {
  IClientProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
