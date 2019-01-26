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
          <Icon title="Menu" name="menu"/>
        </div>
        <div className={styles['am-side-left-menu__item']}>
          <ul>
            <li>
              <Link to="/xxx/app/orders">Đơn hàng</Link>
            </li>
            <li className={styles['line']}/>
            <li>
              <Link to="/xxx/app/products">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/xxx/app/brands">Hãng</Link>
            </li>
            <li>
              <Link to="/xxx/app/tags">Tag</Link>
            </li>
            <li className={styles['line']}/>
            <li>
              <Link to="/xxx/app/orders">Bình luận/đánh giá</Link>
            </li>
            <li>
              <Link to="/xxx/app/orders">Banner</Link>
            </li>
            <li className={styles['line']}/>
            <li>
              <Link to="/xxx/app/orders">Tài khoản</Link>
            </li>
            <li>
              <Link to="/xxx/app/orders">Địa chỉ</Link>
            </li>
            <li>
              <Link to="/xxx/app/orders">Ngôn ngữ</Link>
            </li>
            <li>
              <Link to="/xxx/app/orders">Chính sách bán hàng</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AdminSideLeftMenu
