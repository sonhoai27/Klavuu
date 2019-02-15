import * as React from 'react'
import Carousel from 'nuka-carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '../../shared/layout/Icon';
import { actionGetNewProducts } from '@app/stores/product/ProductActions';
import { CDN } from '@app/shared/const';
import FormatNumber from '@app/shared/utils/FormatNumber';
const S = require('./NewProducts.scss')

const uuidv4 = require('uuid/v4');

interface INewProductsProps {
  actionGetNewProducts: Function;
  newProductsState: any;
}

class NewProducts extends React.Component<INewProductsProps> {
  private carousel;
  componentDidMount() {
    this.props.actionGetNewProducts()
  }

  handleLoadImage = () => {
    this.carousel.setDimensions()
  }

  renderProducts = () => (
    this.props.newProductsState
    && this.props.newProductsState.length > 0
    && this.props.newProductsState.map(element => (
      <div className={S['new-products__item']} key={uuidv4()}>
        <Link to={`/page/product/${element.product_alias}`}>
          <img src={`${CDN}${element.img_src}`} />
          <p>{element.product_name}</p>
          <div>
            <span>
              {
                Number(element.product_discount) !== 0
                && FormatNumber(element.product_price)
              }
            </span>
            <span>
            {
              FormatNumber(
                this.onMakePrice(
                  element.product_price,
                  element.product_discount,
                ),
              )
            }đ
            </span>
          </div>
        </Link>
      </div>
    ))
  )

  onMakePrice = (price, discount) => {
    return Number(price - ((price * discount) / 100))
  }

  render() {

    return (
      <div className={`${S['new-products']} container`}>
        <div className="row">
          <div className="col-12">
            {
              this.props.newProductsState
              && this.props.newProductsState.length > 0
              && (
                <Carousel
                  ref={c => this.carousel = c}
                  renderBottomCenterControls={() => {
                    return []
                  }}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <Icon className={S['new-products__action']}
                      name="chevron-left" onClick={previousSlide}/>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <Icon className={S['new-products__action']}
                      name="chevron-right" onClick={nextSlide}/>
                  )}
                  slidesToShow={3}>
                  {this.renderProducts()}
                </Carousel>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  newProductsState: storeState.productReducer.newProductsState,
})

const mapDispatchToProps = {
  actionGetNewProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProducts)
