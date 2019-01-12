import * as React from 'react';

import AdminHeader from '../shared/layout/Header';

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <AdminHeader>
            <span>Product</span>
        </AdminHeader>
      </>
    )
  }
}

export default Products
