import * as React from 'react';

const Styles = require('./styles/PrimaryHeader.scss')
import SubMenu from './components/SubMenu';
import { CDN } from '@app/shared/const';

const PrimaryHeader = ({ menus, settings }) => (
  <div className={`${Styles['primary-header']} col-12`}>
    <div className="container">
      <div className={`${Styles['row']} row`}>
        <div className={Styles['primary-header__logo']}>
          <a href="/">
            {
              settings.WEBSITE_LOGO
              ? <img
              src={`${CDN}icons/${settings.WEBSITE_LOGO}`}
              className={`${Styles['logo']} img-fluid`} />
              : 'ZONE 22'
            }
          </a>
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
