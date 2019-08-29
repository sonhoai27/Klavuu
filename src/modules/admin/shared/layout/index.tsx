import * as React from 'react';

interface IAdminLayoutProps {
  children: any
}

const AdminLayout = (props: IAdminLayoutProps) => {
  return (
    <div className="col-12">
     <div className="row">
      {props.children}
     </div>
    </div>
  )
}

export default AdminLayout
