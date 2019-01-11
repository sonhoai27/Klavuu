import * as React from 'react';

import Icon from '@app/modules/client/shared/layout/Icon';

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
      </div>
    )
  }
}

export default AdminSideLeftMenu
