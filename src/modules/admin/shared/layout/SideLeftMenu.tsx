import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '@app/modules/client/shared/layout/Icon';
import Rule from '../../auth/Rule';

const styles = require('./styles/AdminSideLeftMenu.scss')

interface IAdminSideLeftMenuProps {
  LoginCheckState: any;
}

class AdminSideLeftMenu extends React.Component<IAdminSideLeftMenuProps> {
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
            <Rule
              permision={['ADMIN', 'SALESMAN']}
              r={this.props.LoginCheckState.user.userRule}
            >
              <li>
                <Link to="/xxx/app/orders">Đơn hàng</Link>
              </li>
            </Rule>
            <Rule
              permision={['ADMIN']}
              r={this.props.LoginCheckState.user.userRule}
            >
              <li className={styles['line']} />
              <li>
                <Link to="/xxx/app/products">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/xxx/app/brands">Hãng</Link>
              </li>
              <li>
                <Link to="/xxx/app/tags">Tag</Link>
              </li>
              <li className={styles['line']} />
              <li>
                <Link to="/xxx/app/comments">Bình luận/đánh giá</Link>
              </li>
              <li>
                <Link to="/xxx/app/banners">Banner</Link>
              </li>
              <li className={styles['line']} />
              <li>
                <Link to="/xxx/app/settings">Thông tin chung</Link>
              </li>
              <li>
                <Link to="/xxx/app/helps">Trợ giúp</Link>
              </li>
              <li>
                <Link to="/xxx/app/language">Ngôn ngữ</Link>
              </li>
            </Rule>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  LoginCheckState: storeState.initReducer.LoginCheckState,
})

export default connect(mapStateToProps, null)(AdminSideLeftMenu)
