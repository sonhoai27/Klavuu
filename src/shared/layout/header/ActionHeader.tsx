import * as React from 'react'

import './styles/ActionHeader.scss'
import Icon from '../Icon';

const ActionHeader = () => (
  <div className="col-12 action-header">
    <div className="container">
      <ul>
        <li>
          Language
        <Icon name="chevron-down" className="lang-icon" />
          <ul>
            <li>VN</li>
            <li>US</li>
          </ul>
        </li>
        <li>
          <Icon name="magnifier" />
        </li>
        <li className="relative">
          <Icon name="cart" />
          <span className="items">0</span>
        </li>
      </ul>
    </div>
  </div>
)

export default ActionHeader
