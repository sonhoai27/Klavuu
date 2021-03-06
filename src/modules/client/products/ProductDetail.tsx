import * as React from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
const uuidv4 = require('uuid/v4');

import { actionGetProduct } from '@app/stores/product/ProductActions';
import Breadcrumb from '@app/shared/Breadcrumb';
import Icon from '../shared/layout/Icon';
import { CDN } from '@app/shared/const';
import Rater from '../shared/layout/rating';

const Styles = require('./styles/ProductDetail.scss')

interface IProductDetailProps {
  actionGetProduct: Function;
  productState: any;
  match: any;
}

interface IProductDetailStates {
  currentProductImage: any;
}

class ProductDetail extends React.Component<IProductDetailProps, IProductDetailStates> {
  constructor(props) {
    super(props)
    this.state = {
      currentProductImage: {},
    }
  }

  componentDidMount(): void {
    const { alias } = this.props.match.params
    this.props.actionGetProduct(alias)
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps): void {
    if (prevProps.productState !== this.props.productState) {
      this.setState({
        currentProductImage: this.props.productState.images[0],
      })
    }
  }

  renderListImages = () => (
    this.props.productState
    && this.props.productState.images
    && this.props.productState.images.length > 0
    && this.props.productState.images.map((image, index) => {
      return (
        <li
          onClick={() => this.onSelectedProductImage(image)}
          key={uuidv4()}
          className={index === 0 ? Styles['picked'] : ''}>
          <LazyLoad height={'100%'} once={true}>
          <img
            className="img-fluid"
            src={`${CDN}${image.img_src}`}
            />
          </LazyLoad>
        </li>
      )
    })
  )

  isProduct = () => {
    if (this.props.productState
      && this.props.productState.product) {
      return this.props.productState.product
    }
    return []
  }

  onCollapse = (e) => {
    const nextElement = e.target.nextElementSibling
    if (nextElement.style.maxHeight) {
      nextElement.style.maxHeight = null;
    } else {
      // tslint:disable-next-line:prefer-template
      nextElement.style.maxHeight = nextElement.scrollHeight + 'px';
    }
  }

  onSelectedProductImage = (e) => {
    this.setState({
      currentProductImage: e,
    })
  }

  onFormatNumber = (price: number) => {
    return (
      price
      && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    )
  }

  onMakePrice = (price, discount) => {
    return Number(price - ((price * discount) / 100))
  }

  renderTags = () => (
    this.props.productState
    && this.props.productState.tag
    && this.props.productState.tag.length > 0
    && this.props.productState.tag.map((tag) => {
      return (
        <span
          key={uuidv4()}>
          {tag.tag_name}
        </span>
      )
    })
  )

  render() {
    return (
     <>
       <div className={`${Styles['product_detail']} container`}>
        <Breadcrumb
          items={[
            {
              title: 'Trang chủ',
              href: '/',
              active: false,
            },
            {
              title: this.isProduct()['cat_name'],
              href: `/${this.isProduct()['cat_alias']}`,
              active: false,
            },
            {
              title: this.isProduct()['product_name'],
              href: '/',
              active: true,
            },
          ]}
        />
        <div className="row">
          <div className="col-sm-7">
            <div className={Styles['product_detail__images']}>
              <ul className={Styles['product_detail__images-list']}>
                {this.renderListImages()}
              </ul>
              <div className={Styles['zoom-in-container']} style={{ overflow: 'hidden' }}>
                <div className="content">
                  <LazyLoad height={'100%'}>
                    <img
                      className={`
                        ${Styles['zoom-in-container__image-preview']} img-fluid img-loading`}
                      // tslint:disable-next-line:max-line-length
                      src={`${CDN}${this.state.currentProductImage.img_src}`}
                      />
                  </LazyLoad>
                </div>
              </div>
            </div>
            <div className={Styles['product-intro']}>
              <div dangerouslySetInnerHTML={{ __html: this.isProduct()['product_intro'] }}/>
            </div>
          </div>
          <div className={`${Styles['product-info']} col-sm-5`}>
            <h4 className="brand">
              {this.isProduct()['brand_name']}
            </h4>
            <h4 className={Styles['title']}>
              {this.isProduct()['product_name']}
            </h4>
            <div className={Styles['product-rating']}>
              <Rater disabled={true} rating={1}/>
              (23 reviews)
            </div>
            <div className={Styles['price']}>
              <span>{this.onFormatNumber(this.isProduct()['product_price'])}đ</span>
              <span>
                {
                  this.onFormatNumber(
                    this.onMakePrice(
                    this.isProduct()['product_price'],
                    this.isProduct()['product_discount'],
                    ),
                  )
                }đ
              </span>
            </div>
            <div className={Styles['product_volume_weight']}>
              <h4>{this.isProduct()['product_volume_weight']}</h4>
            </div>
            <div className={Styles['add-to-cart']}>
              <div className={`${Styles['add-to-cart__btn']} btn`}>
                Thêm vào giỏ hàng
              </div>
            </div>
            <ul className={Styles['additional-info']}>
              <li><Icon name="thumbs-up"/> Cam kết 100% chính hãng</li>
              <li><Icon name="train"/> Giao hàng dự kiến: Thứ 5 17/1 - Thứ 3 22/1</li>
              <li><Icon name="sync"/> Đổi trả trong 7 ngày</li>
            </ul>
            <div className={Styles['product-tags']}>
                {this.renderTags()}
            </div>
            <div className={Styles['product-description']}>
              <div className={Styles['product-description__session']}>
                <div
                  onClick={this.onCollapse}
                  className={Styles['product-description__title']}>
                  Thông tin sản phẩm <Icon name="chevron-down"/>
                </div>
                <div className={Styles['product-description__content']}>
                  <div dangerouslySetInnerHTML={{ __html: this.isProduct()['product_info'] }}/>
                </div>
              </div>
              <div
                onClick={this.onCollapse}
                className={Styles['product-description__session']}>
                <div className={Styles['product-description__title']}>
                  Cách sử dụng <Icon name="chevron-down"/>
                </div>
                <div className={Styles['product-description__content']}>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.isProduct()['product_how_to_use'] }}/>
                </div>
              </div>
              <div
                onClick={this.onCollapse}
                className={Styles['product-description__session']}>
                <div className={Styles['product-description__title']}>
                  Thông tin khác <Icon name="chevron-down"/>
                </div>
                <div className={Styles['product-description__content']}>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.isProduct()['product_more_info'] }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </>
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
