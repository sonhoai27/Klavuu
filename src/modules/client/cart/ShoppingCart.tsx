import * as React from 'react';
import Icon from '../shared/layout/Icon';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slide from 'react-reveal/Slide';

import {
  actionShowShoppingCart,
  actionShowHideAlert,
  actionShowHidePopup,
} from '@app/stores/init';
import { CDN } from '@app/shared/const';
import { actionAddToCart } from '@app/stores/cart/CartActions';

const uuidv4 = require('uuid/v4');

const S = require('./styles/ShoppingCart.scss')

interface IShoppingCartProps {
  actionShowShoppingCart?: Function;
  cartState: any[];
  actionAddToCart: Function;
  actionShowHideAlert: Function;
  history?: any;
  actionShowHidePopup: Function;
  actionShowHideLoading: Function;
}

class ShoppingCart extends React.Component<IShoppingCartProps> {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartState !== this.props.cartState) {
      this.props.actionShowHideAlert({
        status: false,
      })
    }
  }
  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true;
    }

    return false;
  }

  onFormatNumber = (price: number) => {
    return (
      price
      && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    )
  }

  onMakePrice = (price, discount, qty) => {
    return Number((price - ((price * discount) / 100)) * qty)
  }

  onMakeSumaryPrice = () => {
    let price = 0;
    if (this.props.cartState.length > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.props.cartState.length; i++) {
        price = price + this.onMakePrice(
          this.props.cartState[i].product_price,
          this.props.cartState[i].product_discount,
          this.props.cartState[i].qty,
        )
      }

      return Number(price)
    }

    return Number(price)
  }

  renderNullCart = () => (
    this.props.cartState.length === 0
    && (
      <div className={S['shopping-cart__content__null']}>
        <img src="./images/shopping-bag.svg" className="img-fluid" />
        <div>
          <span>Giỏ hàng của bạn còn trống</span>
          <span>
            <a href="/page/products/all">Tiếp tục mua sắm</a>
          </span>
        </div>
      </div>
    )
  )

  onHandleAddToCart = (element, type, cartState) => {
    if (type === 0) {
      this.props.actionAddToCart(element, type, cartState)
    } else if (type === 1) {
      if (element.qty === 1) {
        this.props.actionShowHidePopup({
          status: true,
          onClose: () => this.props.actionShowHidePopup({ status: false }),
          poBtn: {
            title: 'OK',
            func: () => {
              this.props.actionShowHidePopup({ status: false })
              this.props.actionAddToCart(element, type, cartState)
            },
          },
          neBtn: {
            title: 'Cancel',
            func: () => {
              this.props.actionShowHidePopup({ status: false })
            },
          },
          title: 'Warning',
          message: 'If you click OK, This product will be delete from cart.',
          icon: <Icon name="smile"/>,
        })
      } else {
        this.props.actionAddToCart(element, type, cartState)
      }
    }
  }

  renderProductCatalog = () => (
    this.props.cartState.length > 0
    && this.props.cartState.map((element) => {
      return (
        <li key={uuidv4()}>
          <img
            src={`${CDN}${element.product_image}`}
            alt=""
            className="img-fluid" />
          <div>
            <div className={S['cart__item']}>
              <span>
                <Link to={`/page/product/${element.product_alias}`}>
                  {element.product_name}
                </Link>
              </span>
              <span>
                {this.onFormatNumber(element.product_price)}đ
              </span>
            </div>
            <div className={S['cart__qty']}>
              <div className="cart_qty--left">
                <span onClick={() => {
                  this.onHandleAddToCart(element, 1, this.props.cartState)
                }}>-</span>
                <span>{element.qty}</span>
                <span onClick={() => {
                  this.onHandleAddToCart(element, 0, this.props.cartState)
                }}>+</span>
              </div>
              <div className={S['cart__qty--right']}>
                {this.onFormatNumber(
                  this.onMakePrice(
                    element.product_price,
                    element.product_discount,
                    element.qty,
                  ),
                )}đ
              </div>
            </div>
          </div>
        </li>
      )
    })
  )

  render() {
    return (
      <div className={S['shopping-cart']}>
        <Slide right duration={500}>
          <div className={S['shopping-cart__content']}>
            <div className={S['shopping-cart__content__header']}>
              <p>Giỏ hàng</p>
              <p>({this.props.cartState.length} Sản Phẩm)</p>
              <Icon
                onClick={() => {
                  document.body.style.overflow = 'auto'
                  this.props.actionShowShoppingCart(false)
                }}
                name="cross"
                className={S['close-btn']} />
            </div>
            <div className={S['shopping-cart__content__items']}>
              {this.renderNullCart()}
              <ul className={S['shopping-cart__items']}>
                {this.renderProductCatalog()}
              </ul>
            </div>
            {
              this.props.cartState.length > 0
                && (
                  <div className={S['shopping-cart__footer']}>
                    <div>
                      <span>Thành tiền</span>
                      <span>{this.onFormatNumber(this.onMakeSumaryPrice())}đ</span>
                    </div>
                    <div onClick={() => {
                      document.body.style.overflow = 'auto'
                      this.props.actionShowShoppingCart(false)
                      this.props.history.push('/page/checkout')
                    }}>
                      Tiến hành đặt hàng
                    </div>
                  </div>
                )
            }
          </div>
        </Slide>
      </div>
    )
  }
}
const mapStateToProps = storeState => ({
  cartState: storeState.cartReducer.cartState,
})

const mapDispatchToProps = {
  actionShowShoppingCart,
  actionAddToCart,
  actionShowHideAlert,
  actionShowHidePopup,
}

// @ts-ignore
const tempCom = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
// @ts-ignore
export default withRouter(tempCom as any)
