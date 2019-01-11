import * as React from 'react';
import AdminHeader from '../shared/layout/Header';

class AdminHome extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <>
        <AdminHeader>
          <span>Home</span>
        </AdminHeader>
        <div>Admin Home</div>
      </>
    )
  }
}

export default AdminHome
