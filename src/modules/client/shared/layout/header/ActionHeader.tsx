import * as React from 'react'
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

const Styles = require('./styles/ActionHeader.scss')
import Icon from '../Icon';
import { actionShowShoppingCart } from '@app/stores/init';
import SearchBar from './components/Search';

interface IActionHeaderProps {
  actionShowShoppingCart: Function;
  cartState: any[];
  t?: any;
}

const ActionHeader = (props: IActionHeaderProps) => {
  const [isShowHideSearchBar, onShowHideSearchBar] = React.useState(false)
  const { t } = props

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      window.location.href = `/page/search/${e.target.value}`
    }
  }

  return (
    <div className={`${Styles['action-header']} col-12 `}>
      <div className="container">
        <ul>
          <li>
            {t('MENU_LANGUAGE')}
          <Icon
            name="chevron-down"
            className={Styles['lang-icon']} />
            <ul>
              <li onClick={() => {
                localStorage.setItem('i18nextLng', 'vi')
                window.location.reload()
              }}>VN</li>
              <li onClick={() => {
                localStorage.setItem('i18nextLng', 'en')
                window.location.reload()
              }}>US</li>
            </ul>
          </li>
          <li>
            <Icon
              style={{ border: '1px solid transparent' }}
              onClick={() => onShowHideSearchBar(!isShowHideSearchBar)}
              name="magnifier"
              className={Styles['icon']}/>
              { isShowHideSearchBar && <SearchBar onKeyUp={onKeyUp}/> }
          </li>
          <li className={Styles['relative']}>
            <Icon
              onClick={() => {
                props.actionShowShoppingCart(true)
              }}
              name="cart" className={Styles['icon']}/>
            <span
              onClick={() => {
                props.actionShowShoppingCart(true)
              }}
              className={Styles['items']}>
              {props.cartState.length}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = storeState => ({
  cartState: storeState.cartReducer.cartState,
})

const mapDispatchToProps = {
  actionShowShoppingCart,
}

const ActionHeaderConnect =  withNamespaces()(ActionHeader)

export default connect(mapStateToProps, mapDispatchToProps)(ActionHeaderConnect)
