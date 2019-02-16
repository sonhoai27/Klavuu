import * as React from 'react';
import { connect } from 'react-redux';
import Icon from '../../Icon';
import { actionShowShoppingCart } from '@app/stores/init';
import { CDN } from '@app/shared/const';

const S = require('../styles/PrimaryMenuForMobile.scss')

interface IPrimaryMenuForMobileProps {
  actionShowShoppingCart: Function;
  cartState: any;
  menus: any;
  settings: any;
  brands: any;
}

class PrimaryMenuForMobile extends React.Component<IPrimaryMenuForMobileProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className={S['mobile-primary-menu']}>
          <Icon name="menu" className={S['mobile-primary-menu__toggle-btn']}/>
          <input type="text" placeholder="Bạn muốn tìm gì?"/>
          <div className={S['mobile-primary-menu__cart']}>
            <Icon
              onClick={() => {
                this.props.actionShowShoppingCart(true)
              }}
              name="cart" className={S['icon']}/>
            <span
              onClick={() => {
                this.props.actionShowShoppingCart(true)
              }}
              className={S['items']}>
              {this.props.cartState.length}
            </span>
          </div>
        </div>
        <div className={S['mobile-primary-menu__sideleft-menu']}>
            <div className={S['mobile-primary-menu__sideleft-menu__content']}>
              <div className={S['mobile-primary-menu__sideleft-menu__item--head']}>
                <a href="/">
                  {
                    this.props.settings.WEBSITE_LOGO
                    ? <img
                    src={`${CDN}icons/${this.props.settings.WEBSITE_LOGO}`}
                    className="img-fluid" />
                    : 'ZONE 22'
                  }
                </a>
                <div className={S['flags']}>
                  <img src="./images/icons/vn.svg" className="img-fluid"/>
                  <img src="./images/icons/um.svg" className="img-fluid"/>
                </div>
              </div>
              <div className={S['mobile-primary-menu__sideleft-menu__item']}>
                <p>Danh mục</p>
                <ul>
                  <li>Shop All</li>
                  <li>Brand</li>
                  <li>About us</li>
                </ul>
              </div>
            </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  cartState: storeState.cartReducer.cartState,
})

const mapDispatchToProps = {
  actionShowShoppingCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenuForMobile)
