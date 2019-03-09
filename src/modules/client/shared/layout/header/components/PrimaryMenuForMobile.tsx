import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const uuidv4 = require('uuid/v4');

import Icon from '../../Icon';
import { actionShowShoppingCart } from '@app/stores/init';
import { CDN } from '@app/shared/const';
import { Link } from 'react-router-dom';

const S = require('../styles/PrimaryMenuForMobile.scss')

interface IPrimaryMenuForMobileProps {
  actionShowShoppingCart: Function;
  cartState: any;
  menus: any;
  settings: any;
  brands: any;
  t?: any;
}

interface IPrimaryMenuForMobileStates {
  choose: boolean;
}

class PrimaryMenuForMobile extends React.Component<
  IPrimaryMenuForMobileProps,
  IPrimaryMenuForMobileStates> {
  private menuRef;
  constructor(props) {
    super(props)
    this.state = {
      choose: false,
    }
  }

  componentWillMount() {
    window.addEventListener(
      'mousedown',
      this.onClickHideMenu,
      false,
    );
  }
  componentWillUnMount() {
    window.addEventListener(
      'mousedown',
      this.onClickHideMenu,
      false,
    );
  }

  onClickHideMenu = (e) => {
    try {
      if (!this.menuRef.contains(e.target)) {
        this.setState({
          choose: false,
        });
        document.body.style.overflowY = 'auto'
        return;
      }
    } catch (e) { }
  }

  onCloseMenu = () => this.setState({
    choose: !this.state.choose,
  },
    () => document.body.style.overflowY = this.state.choose ? 'hidden' : 'auto')

  renderItemMenu = ({ kv, menu, type }) => (
    menu
    && menu.length > 0
    && menu.map(element => (
      <li key={uuidv4()} className={S['menu-item__item']}>
        <Link
          onClick={this.onCloseMenu}
          to={`/page/products/${type}/${element[kv.alias]}`}>
          {element[kv.name]}
        </Link>
        {
          element.child
          && (
            <ul className={S['menu-item__child']}>
              {this.renderItemMenu({
                kv,
                type,
                menu: element.child,
              })}
            </ul>
          )
        }
      </li>
    ))
  )

  onKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      window.location.href = `/page/search/${e.target.value}`
    }
  }

  render() {
    const { t } = this.props

    return (
      <>
        <div className={S['mobile-primary-menu']}>
          <Icon
            onClick={this.onCloseMenu}
            name="menu" className={S['mobile-primary-menu__toggle-btn']} />
          <input
            onKeyUp={this.onKeyUp}
            type="text"
            placeholder={t('MENU_WHAT_ARE_YOU_LOOKING_FOR')} />
          <div className={S['mobile-primary-menu__cart']}>
            <Icon
              onClick={() => {
                this.props.actionShowShoppingCart(true)
              }}
              name="cart" className={S['icon']} />
            <span
              onClick={() => {
                this.props.actionShowShoppingCart(true)
              }}
              className={S['items']}>
              {this.props.cartState.length}
            </span>
          </div>
        </div>
        <div
          className={
            `${S['mobile-primary-menu__sideleft-menu']} ${S[this.state.choose ? 'on' : 'off']}`
          }>
          <div
            ref={node => this.menuRef = node}
            className={S['mobile-primary-menu__sideleft-menu__content']}>
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
                <img
                  onClick={() => {
                    localStorage.setItem('i18nextLng', 'vi')
                    window.location.reload()
                  }}
                  src="./images/icons/vn.svg" className="img-fluid" />
                <img
                  onClick={() => {
                    localStorage.setItem('i18nextLng', 'en')
                    window.location.reload()
                  }}
                  src="./images/icons/um.svg" className="img-fluid" />
              </div>
            </div>
            <div className={S['mobile-primary-menu__sideleft-menu__item']}>
              <p className={S['title']}>{t('MENU_SHOP_BY')}</p>
              <ul>
                <li className={S['menu-item']}>
                  <Link
                    onClick={this.onCloseMenu}
                    to="/page/blogs">
                    {t('BLOGS')}
                  </Link>
                </li>
                <li className={S['menu-item']}>
                  <Link
                    onClick={this.onCloseMenu}
                    to="/page/faqs">
                    {t('MENU_FAQS')}
                  </Link>
                </li>
                <li className={S['menu-item']}>
                  <Link
                    onClick={this.onCloseMenu}
                    to="/page/products/all">
                    {t('MENU_SHOP_BY')}
                  </Link>
                  <ul>
                    {this.renderItemMenu({
                      kv: {
                        name: 'tag_name',
                        alias: 'tag_alias',
                      },
                      menu: this.props.menus,
                      type: 't',
                    })}
                  </ul>
                </li>
                <li className={S['menu-item']}>
                  <Link
                    onClick={this.onCloseMenu}
                    to="/page/products/all">
                    {t('MENU_BRANDS')}
                  </Link>
                  <ul>
                    {this.renderItemMenu({
                      kv: {
                        name: 'brand_name',
                        alias: 'brand_alias',
                      },
                      menu: this.props.brands,
                      type: 'b',
                    })}
                  </ul>
                </li>
                <li className={S['menu-item']}>
                  <Link
                    onClick={this.onCloseMenu}
                    to="/page/about-us">
                    {t('MENU_ABOUT_US')}
                  </Link>
                </li>
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

const PrimaryMenuForMobileT = withNamespaces()(PrimaryMenuForMobile)

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenuForMobileT)
