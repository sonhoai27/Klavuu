import * as React from 'react';
import AdminSideLeftMenu from './SideLeftMenu';

interface IAdminLayoutProps {
  children: any
}

const AdminLayout = (props: IAdminLayoutProps) => {
  return (
    <div className="col-12">
      <div className="row">
        <AdminSideLeftMenu/>
        <div className="col-10" style={{ marginTop: 75 }}>
          <div className="row">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
