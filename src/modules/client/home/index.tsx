import * as React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import Loadable from 'react-loadable';

import BrandStory from './brand-story';
import { actionLoadCart } from '@app/stores/cart/CartActions';
import { actionGetTagsForMenu } from '@app/stores/tag/TagActions';
import Popup from '@app/shared/popup';
import { actionGetBrands } from '@app/stores/brand/BrandActions';
import ShoppingCart from '../cart/ShoppingCart';

const NewProducts = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_home_new_prd" */ './new-products'),
  loading: () => '',
});

const Banner = Loadable({
  loader: () => import(
    /*webpackChunkName: "client_home_banner" */ './banner'),
  loading: () => '',
});

interface IHomeProps {
  match?: any;
  isShowShoppingCartState?: Function;
  actionLoadCart: Function;
  actionGetTagsForMenu: Function;
  isShowHidePopupState: any;
  actionGetBrands: Function;
}

class Home extends React.Component<IHomeProps> {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionLoadCart()
    this.props.actionGetTagsForMenu()
    this.props.actionGetBrands()
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
  actionGetBrands,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
