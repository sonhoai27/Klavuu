import * as React from 'react';
import { connect } from 'react-redux';

import AdminPhoto from './Photo'
import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';

class AdminBlog extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <AdminHeader>
          <Breadcrumb
            className="am-orders"
            items={[
              {
                title: 'Trang chủ',
                href: '/xxx/app',
                active: false,
              },
              {
                title: 'Blogs',
                href: '/xxx/app/blogs',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <AdminPhoto/>
      </>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlog)
