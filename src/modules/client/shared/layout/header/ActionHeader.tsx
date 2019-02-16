import * as React from 'react'
import { connect } from 'react-redux';

const Styles = require('./styles/ActionHeader.scss')
import Icon from '../Icon';
import { actionShowShoppingCart } from '@app/stores/init';
import SearchBar from './components/Search';

interface IActionHeaderProps {
  actionShowShoppingCart: Function;
  cartState: any[];
}

const ActionHeader = (props: IActionHeaderProps) => {
  const [isShowHideSearchBar, onShowHideSearchBar] = React.useState(false)

  return (
    <div className={`${Styles['action-header']} col-12 `}>
      <div className="container">
        <ul>
          <li>
            Language
          <Icon
            name="chevron-down"
            className={Styles['lang-icon']} />
            <ul>
              <li>VN</li>
              <li>US</li>
            </ul>
          </li>
          <li>
            <Icon
              style={{ border: '1px solid transparent' }}
              onClick={() => onShowHideSearchBar(!isShowHideSearchBar)}
              name="magnifier"
              className={Styles['icon']}/>
              { isShowHideSearchBar && <SearchBar/> }
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionHeader)
