import * as React from 'react';
import { Link } from 'react-router-dom';

import Icon from '@app/Shared/Icon';

const styles = require('../Styles/AdminSideLeftMenu.scss')

class AdminSideLeftMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles['am-side-left-menu']}>
        <div className={styles['user']}>
          <span>Son Hoai</span>
          <Icon title="Menu" name="menu" />
        </div>
        <div className={styles['am-side-left-menu__item']}>
          <ul>
            <li>
              <Link to="/orders">Đơn hàng</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li className={styles['line']} />
            <li>
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/brands">Hãng</Link>
            </li>
            <li>
              <Link to="/tags">Tag</Link>
            </li>
            <li className={styles['line']} />
            <li>
              <Link to="/comments">Bình luận/đánh giá</Link>
            </li>
            <li>
              <Link to="/banners">Banner</Link>
            </li>
            <li className={styles['line']} />
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/settings">Thông tin chung</Link>
            </li>
            <li>
              <Link to="/helps">Trợ giúp</Link>
            </li>
            <li>
              <Link to="/language">Ngôn ngữ</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default AdminSideLeftMenu
