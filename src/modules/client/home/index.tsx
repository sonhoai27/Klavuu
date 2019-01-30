import * as React from 'react';

import BrandStory from './brand-story';
import { connect } from 'react-redux';
import { actionLoadCart } from '@app/stores/cart/CartActions';
import { actionGetTagsForMenu } from '@app/stores/tag/TagActions';
import Popup from '@app/shared/popup';

const NewProducts = React.lazy(() => import(
  /*webpackChunkName: "client_home_new_prd" */ './new-products'));

const Banner = React.lazy(() => import(
  /*webpackChunkName: "client_home_banner" */ './banner'));

const ShoppingCart = React.lazy(() => import(
  /*webpackChunkName: "home_shopping_cart" */ '../cart/ShoppingCart'));

interface IHomeProps {
  match?: any;
  isShowShoppingCartState?: Function;
  actionLoadCart: Function;
  actionGetTagsForMenu: Function;
  isShowHidePopupState: any;
}

class Home extends React.Component<IHomeProps> {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionLoadCart()
    this.props.actionGetTagsForMenu()
  }

  render () {
    return (
      <div className="col-12">
        <div className="row">
          <Banner/>
          <BrandStory/>
          <NewProducts/>
        </div>
        {
          this.props.isShowShoppingCartState && <ShoppingCart/>
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
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  isShowShoppingCartState: storeState.initReducer.isShowShoppingCartState,
  isShowHidePopupState: storeState.initReducer.isShowHidePopupState,
})

const mapDispatchToProps = {
  actionLoadCart,
  actionGetTagsForMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
