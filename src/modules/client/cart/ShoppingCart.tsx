import * as React from 'react';
import Icon from '../shared/layout/Icon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionShowShoppingCart } from '@app/stores/init';

const S = require('./styles/ShoppingCart.scss')

interface IShoppingCartProps {
  productsInCartState?: any[];
  actionUpdateCart?: Function;
  actionShowShoppingCart?: Function;
}

class ShoppingCart extends React.Component<IShoppingCartProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={S['shopping-cart']}>
        <div className={S['shopping-cart__content']}>
          <div className={S['shopping-cart__content__header']}>
            <p>Giỏ hàng</p>
            <p>(0 Sản Phẩm)</p>
            <Icon
              onClick={() => this.props.actionShowShoppingCart(false)}
              name="cross"
              className={S['close-btn']}/>
          </div>
          <div className={S['shopping-cart__content__items']}>
            <div className={S['shopping-cart__content__null']}>
              <img src="./images/shopping-bag.svg" className="img-fluid"/>
              <div>
                <span>Giỏ hàng của bạn còn trống</span>
                <span>Tiếp tục mua sắm</span>
              </div>
            </div>
            <ul className={S['shopping-cart__items']}>
              <li>
                <img
                  src="http://22.zonesgroup.vn/api/uploads/bf9785b2e9774045000000.png"
                  alt=""
                  className="img-fluid"/>
                <div>
                  <div className={S['cart__item']}>
                    <span>
                      <Link to="/">Nokia x6</Link>
                    </span>
                    <span>2.342.000đ</span>
                  </div>
                  <div className={S['cart__qty']}>
                    <div className="cart_qty--left">
                      <span>-</span>
                      <span>1223</span>
                      <span>+</span>
                    </div>
                    <div className={S['cart__qty--right']}>
                      12.2232.332đ
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <img
                  src="https://leflair-assets.storage.googleapis.com/5bc9698f1c54f600014278d9.jpg"
                  alt=""
                  className="img-fluid"/>
                <div>
                  <div className={S['cart__item']}>
                    <span>
                      <Link to="/">Nokia x7</Link>
                    </span>
                    <span>2.342.000đ</span>
                  </div>
                  <div className={S['cart__qty']}>
                    <div className="cart_qty--left">
                      <span>-</span>
                      <span>1223</span>
                      <span>+</span>
                    </div>
                    <div className={S['cart__qty--right']}>
                      12.2232.332đ
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={S['shopping-cart__footer']}>
            <div>
              <span>Thành tiền</span>
              <span>4586788đ</span>
            </div>
            <div>Tiến hành đặt hàng</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  actionShowShoppingCart,
}

export default connect(null, mapDispatchToProps)(ShoppingCart)
