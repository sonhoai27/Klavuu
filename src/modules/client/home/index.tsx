import * as React from 'react';

import BrandStory from './brand-story';
import { connect } from 'react-redux';
import { actionLoadCart } from '@app/stores/cart/CartActions';

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
}

class Home extends React.Component<IHomeProps> {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionLoadCart()
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
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  isShowShoppingCartState: storeState.initReducer.isShowShoppingCartState,
})

const mapDispatchToProps = {
  actionLoadCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
