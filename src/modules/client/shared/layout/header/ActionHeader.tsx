import * as React from 'react'

const Styles = require('./styles/ActionHeader.scss')
import Icon from '../Icon';
import { connect } from 'react-redux';
import { actionShowShoppingCart } from '@app/stores/init';

interface IActionHeaderProps {
  actionShowShoppingCart: Function;
  cartState: any[];
}

const ActionHeader = (props: IActionHeaderProps) => (
  <div className={`${Styles['action-header']} col-12 `}>
    <div className="container">
      <ul>
        <li>
          Language
        <Icon name="chevron-down" className={Styles['lang-icon']} />
          <ul>
            <li>VN</li>
            <li>US</li>
          </ul>
        </li>
        <li>
          <Icon name="magnifier" className={Styles['icon']}/>
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

const mapStateToProps = storeState => ({
  cartState: storeState.cartReducer.cartState,
})

const mapDispatchToProps = {
  actionShowShoppingCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionHeader)
