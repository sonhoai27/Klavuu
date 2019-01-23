import * as React from 'react';

import BrandStory from './brand-story';
import { connect } from 'react-redux';

const NewProducts = React.lazy(() => import(
  /*webpackChunkName: "client_home_new_prd" */ './new-products'));

const Banner = React.lazy(() => import(
  /*webpackChunkName: "client_home_banner" */ './banner'));

const ShoppingCart = React.lazy(() => import(
  /*webpackChunkName: "home_shopping_cart" */ '../cart/ShoppingCart'));

interface IHomeProps {
  match?: any;
  isShowShoppingCartState?: Function;
}

class Home extends React.Component<IHomeProps> {
  constructor (props) {
    super(props)
    console.log(this.props.match)
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

export default connect(mapStateToProps, null)(Home);
