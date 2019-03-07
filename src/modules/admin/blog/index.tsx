import * as React from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { Link } from 'react-router-dom';
import { actionGetBlogs } from '@app/stores/blog/BlogActions';
import BlogModel from '@app/shared/models/Blog';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IAdminBlogProps {
  actionGetBlogs: Function;
  blogsState: any;
}

class AdminBlog extends React.Component<IAdminBlogProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionGetBlogs()
  }

  renderListBlogs = () => (
    this.props.blogsState
    && this.props.blogsState.length > 0
    && this.props.blogsState.map((element: BlogModel) => (
      <tr key={element.blogs_id}>
        <td>
          <a href={`/xxx/app/blog/${element.blogs_alias}`}>{element.blogs_title}</a>
        </td>
        <td/>
      </tr>
    ))
  )

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
        <div className="col-12">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Tên</th>
                    <th>Hành động</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.renderListBlogs()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  blogsState: storeState.blogReducer.blogsState,
})

const mapDispatchToProps = {
  actionGetBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlog)
