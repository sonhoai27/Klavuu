import * as React from 'react';

const Styles = require('./styles/PrimaryHeader.scss')
import SubMenu from './components/SubMenu';
import { Link } from 'react-router-dom';

const PrimaryHeader = ({ menus }) => (
  <div className={`${Styles['primary-header']} col-12`}>
    <div className="container">
      <div className={`${Styles['row']} row`}>
        <div className={Styles['primary-header__logo']}>
          <Link to={'/'}>
            <img
              src="http://en.klavuu.com/img/logo/logo.png"
              className={`${Styles['logo']} img-fluid`} />
          </Link>
        </div>
        <ul>
          <li>
            <a href="#">Shop By</a>
            <SubMenu items={menus} className={Styles['primary-menu__submenu']} />
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
