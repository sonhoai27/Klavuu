import * as React from 'react';

const Styles = require('./styles/PrimaryHeader.scss')
import SubMenu from './components/SubMenu';
import { CDN } from '@app/shared/const';
import { Link } from 'react-router-dom';

const PrimaryHeader = ({ menus, settings, brands }) => (
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
            <SubMenu
              type="t"
              kv={{
                alias: 'tag_alias',
                name: 'tag_name',
              }}
              items={menus}
              className={Styles['primary-menu__submenu']} />
          </li>
          <li>
            <a href="#">Brands</a>
            <SubMenu
              type="b"
              kv={{
                alias: 'brand_alias',
                name: 'brand_name',
              }}
              items={brands}
              className={Styles['primary-menu__submenu']} />
          </li>
          <li>
            <Link to="/page/about-us">About us</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default PrimaryHeader
