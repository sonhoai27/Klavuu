import * as React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

import { actionGetProduct } from '@app/stores/product/ProductActions';

interface IProductDetailProps {
  actionGetProduct: Function;
  productState: any;
  match: any;
}

interface IProductDetailStates {
}

class ProductDetail extends React.Component<IProductDetailProps, IProductDetailStates> {
  constructor(props) {
    super(props)
  }

  componentDidMount(): void {
    const { alias } = this.props.match.params
    this.props.actionGetProduct(alias)
  }

  renderMainImage = () => {
    return this.props.productState.images ? this.props.productState.images[0].img_src : ''
  }

  render() {
    console.log()
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <LazyLoad height={'100%'} once={true}>
              <img
                className="img-fluid img-loading"
                src={`http://localhost:80/api/uploads/${this.renderMainImage()}`}
                />
            </LazyLoad>
          </div>
          <div className="col-sm-6">ABBB</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  productState: storeState.productReducer.productState,
})

const mapDispatchToProps = {
  actionGetProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
