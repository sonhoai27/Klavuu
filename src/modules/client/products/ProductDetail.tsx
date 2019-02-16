import * as React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import Loadable from 'react-loadable';
import { withNamespaces } from 'react-i18next';

const uuidv4 = require('uuid/v4');

import { actionGetProduct } from '@app/stores/product/ProductActions';
import Breadcrumb from '@app/shared/Breadcrumb';
import Icon from '../shared/layout/Icon';
import { CDN } from '@app/shared/const';
import { actionAddToCart } from '@app/stores/cart/CartActions';
import { actionShowHideAlert } from '@app/stores/init';
import InfoLoading from './components/detail/Loading/InfoLoading';
import BreadcrumbLoading from './components/detail/Loading/BreadcrumbLoading';
import ProductInfo from './components/detail/ProductInfo';
import ProductLeftInfoLoading from './components/detail/Loading/ProductLeftInfoLoading';
import
  ProductImageLoading,
  { ProductSmallImageLoading } from './components/detail/Loading/ProductImageLoading';

const Styles = require('./styles/ProductDetail.scss')

const ProductComment = Loadable({
  loader: () => import(
    /*webpackChunkName: "home_prd_cmt" */ './components/detail/Comment'),
  loading: () => '',
});

interface IProductDetailProps {
  actionGetProduct: Function;
  productState: any;
  match: any;
  actionAddToCart: Function;
  cartState: any[];
  actionShowHideAlert: Function;
  t?: any;
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
          <img
            className="img-fluid"
            src={`${CDN}${image.img_src}`}
          />
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

  isReviews = () => {
    if (this.props.productState
      && this.props.productState.reviews) {
      return this.props.productState.reviews;
    }

    return {
      num_rows: 0,
      avg: 0,
    }
  }

  onAddToCart = (e) => {
    this.props.actionAddToCart(e, 0, this.props.cartState)
    .then(() => {
      this.props.actionShowHideAlert({
        status: true,
        title: this.props.t('CART_ADD_TO_CART_SUCESS'),
        icon: <Icon name="thumbs-up"/>,
        type: 'success',
      })
      setTimeout(() => {
        this.props.actionShowHideAlert({
          status: false,
          title: '',
          icon: undefined,
          type: '',
        })
      }, 1000)
    })
    .catch(() => {
      this.props.actionShowHideAlert({
        status: true,
        title: this.props.t('CART_ADD_TO_CART_FAILURE'),
        icon: <Icon name="thumbs-up"/>,
        type: 'warning',
      })
      setTimeout(() => {
        this.props.actionShowHideAlert({
          status: false,
          title: '',
          icon: undefined,
          type: '',
        })
      }, 1000)
    })
  }

  onDetectedWithSize = () => window.screen.width

  onShowImage = () => {
    if (this.onDetectedWithSize() <= 768) {
      return (
        <>
          <div className={Styles['zoom-in-container']} style={{ overflow: 'hidden' }}>
            <div className="content">
            {
              (this.state.currentProductImage && this.state.currentProductImage.img_src)
              ? <img
                  className={`
                    ${Styles['zoom-in-container__image-preview']} img-fluid`}
                  // tslint:disable-next-line:max-line-length
                  src={
                    (this.state.currentProductImage && this.state.currentProductImage.img_src)
                    ? `${CDN}${this.state.currentProductImage.img_src}`
                    : './images/no_image.jpg'
                  }
                  />
              : <ProductImageLoading/>
            }
            </div>
          </div>
          <div className={Styles['product_detail__images-list-main']}>
            {
              (this.props.productState && this.props.productState.images)
              ? <ul className={Styles['product_detail__images-list']}>
                  {this.renderListImages()}
                </ul>
              : <ProductSmallImageLoading/>
            }
          </div>
        </>
      )
    }

    return (
      <>
        <div className={Styles['product_detail__images-list-main']}>
          {
            (this.props.productState && this.props.productState.images)
            ? <ul className={Styles['product_detail__images-list']}>
                {this.renderListImages()}
              </ul>
            : <ProductSmallImageLoading/>
          }
        </div>
        <div className={Styles['zoom-in-container']} style={{ overflow: 'hidden' }}>
          <div className="content">
          {
            (this.state.currentProductImage && this.state.currentProductImage.img_src)
            ? <img
                className={`
                  ${Styles['zoom-in-container__image-preview']} img-fluid`}
                // tslint:disable-next-line:max-line-length
                src={
                  (this.state.currentProductImage && this.state.currentProductImage.img_src)
                  ? `${CDN}${this.state.currentProductImage.img_src}`
                  : './images/no_image.jpg'
                }
                />
            : <ProductImageLoading/>
          }
          </div>
        </div>
      </>
    )
  }

  render() {
    return (
     <>
       <div className={`${Styles['product_detail']} container`}>
        {
          (this.props.productState && this.props.productState.product)
          ? <Breadcrumb
              items={[
                {
                  title: this.props.t('HOME_PAGE'),
                  href: '/',
                  active: false,
                },
                {
                  title: this.isProduct()['product_name'],
                  href: '/',
                  active: true,
                },
              ]}
            />
          :  <BreadcrumbLoading/>
        }
        <div className="row">
          <div className="col-sm-7">
            <div className={Styles['product_detail__images']}>
              {this.onShowImage()}
            </div>
            <div className={Styles['product-intro']}>
              {
                (this.props.productState && this.props.productState.product)
                ? <div dangerouslySetInnerHTML={{ __html: this.isProduct()['product_intro'] }}/>
                :  <InfoLoading/>
              }
            </div>
          </div>
          <div className={`${Styles['product-info']} col-sm-5`}>
            {
              (this.props.productState && this.props.productState.product)
              ? <ProductInfo
                  t={this.props.t}
                  Styles={Styles}
                  isProduct={this.isProduct}
                  isReviews={this.isReviews}
                  onFormatNumber={this.onFormatNumber}
                  onMakePrice={this.onMakePrice}
                  onAddToCart={this.onAddToCart}
                  currentProductImage={this.state.currentProductImage}
                  onCollapse={this.onCollapse}
                  renderTags={this.renderTags}
                />
              : <ProductLeftInfoLoading/>
            }
          </div>
          <div className={Styles['product-intro--bottom']}>
              {
                (this.props.productState && this.props.productState.product)
                ? <div dangerouslySetInnerHTML={{ __html: this.isProduct()['product_intro'] }}/>
                :  <InfoLoading/>
              }
          </div>
        </div>
        <div className="row">
          {
            this.isProduct()['product_id']
            && <ProductComment t={this.props.t} prdId={this.isProduct()['product_id']}/>
          }
        </div>
      </div>
     </>
    )
  }
}

const mapStateToProps = storeState => ({
  productState: storeState.productReducer.productState,
  cartState: storeState.cartReducer.cartState,
})

const mapDispatchToProps = {
  actionGetProduct,
  actionAddToCart,
  actionShowHideAlert,
}

const TwithNamespaces = withNamespaces()(ProductDetail)

export default connect(mapStateToProps, mapDispatchToProps)(TwithNamespaces)
