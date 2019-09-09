import * as React from 'react';

const styles = require('./Styles/Header.scss')

interface IAdminHeaderProps {
  children: any;
}

const AdminHeader = (props: IAdminHeaderProps) => (
  <div className={styles['am-header']}>
    {props.children}
  </div>
)

export default AdminHeader
