import * as React from 'react';

import Icon from '@app/modules/client/shared/layout/Icon';
import { Link } from 'react-router-dom';

const styles = require('./styles/AdminSideLeftMenu.scss')

class AdminSideLeftMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles['am-side-left-menu']}>
        <div className={styles['user']}>
          <span>Son Hoai</span>
          <Icon title="Đăng xuất" name="exit"/>
        </div>
        <div className={styles['am-side-left-menu__item']}>
          <ul>
            <li>
              <Link to="/xxx/app/products">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/xxx/app/categories">Danh mục</Link>
            </li>
            <li>
              <Link to="/xxx/app/brands">Hãng</Link>
            </li>
            <li>
              <Link to="/xxx/app/tags">Tag</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AdminSideLeftMenu
