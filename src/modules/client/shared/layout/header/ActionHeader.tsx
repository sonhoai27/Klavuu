import * as React from 'react'

const Styles = require('./styles/ActionHeader.scss')
import Icon from '../Icon';

const ActionHeader = () => (
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
          <Icon name="cart" className={Styles['icon']}/>
          <span className={Styles['items']}>0</span>
        </li>
      </ul>
    </div>
  </div>
)

export default ActionHeader
