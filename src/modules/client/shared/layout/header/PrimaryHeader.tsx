import * as React from 'react';

import './styles/PrimaryHeader.scss'
import SubMenu from './components/SubMenu';

const PrimaryHeader = () => (
  <div className="col-12 primary-header">
    <div className="container">
      <div className="row">
        <div className="primary-header__logo">
          <img
            src="http://en.klavuu.com/img/logo/logo.png"
            className="img-fluid logo" />
        </div>
        <ul>
          <li>
            <a href="#">Shop By</a>
            <SubMenu className="primary-menu__submenu" />
          </li>
          <li>
            <a href="#">New arrivals</a>
          </li>
          <li>
            <a href="#">Brands</a>
          </li>
          <li>
            <a href="#">Sales</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default PrimaryHeader
