import * as React from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { Link } from 'react-router-dom';

const GlobalStyles = require('@app/shared/styles/Box.scss');

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
          <div className={GlobalStyles['wrap_action']}>
            <span>
              <Link to="/xxx/app/blogs/add">Thêm mới</Link>
            </span>
          </div>
        </AdminHeader>
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
