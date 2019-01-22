import * as React from 'react';

const S = require('./styles/ShoppingCart.scss')

class ShoppingCart extends React.Component {
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
          </div>
          <div className={S['shopping-cart__content__items']}>
            <div className={S['shopping-cart__content__null']}>
              <img src="./images/shopping-bag.svg" className="img-fluid"/>
              <div>
                <span>Giỏ hàng của bạn còn trống</span>
                <span>Tiếp tục mua sắm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart
