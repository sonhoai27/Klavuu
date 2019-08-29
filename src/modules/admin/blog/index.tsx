import * as React from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionGetBlogs, actionDeleteBlog } from '@app/stores/blog/BlogActions';
import BlogModel from '@app/shared/models/Blog';
import Icon from '@app/modules/client/shared/layout/Icon';
import { actionShowHidePopup, actionShowHideAlert } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';
import { ADMIN_URL } from '@app/shared/const';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IAdminBlogProps {
  actionGetBlogs: Function;
  blogsState: any;
  actionShowHidePopup: Function;
  actionDeleteBlog: Function;
  actionShowHideAlert: Function;
  match?: any;
}

class AdminBlog extends React.Component<IAdminBlogProps> {
  constructor(props) {
    super(props)
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  isMeta = () => {
    if (this.props.blogsState
      && this.props.blogsState.meta) {
      return this.props.blogsState.meta
    }

    return {
      total: 0,
      page_size: 0,
    }
  }

  renderListBlogs = () => (
    this.props.blogsState
    && this.props.blogsState.items
    && this.props.blogsState.items.length > 0
    && this.props.blogsState.items.map((element: BlogModel) => (
      <tr key={element.blogs_id}>
        <td>
          <a href={`${ADMIN_URL}blog/${element.blogs_alias}`}>{element.blogs_title}</a>
        </td>
        <td>
          <Icon name="trash" onClick={() => this.onDelete(element.blogs_id)}/>
        </td>
      </tr>
    ))
  )

  onDelete = (id) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.props.actionDeleteBlog(id)
          .then(() => {
            this.props.actionDeleteBlog()
            .then(() => {
              this.props.actionShowHideAlert({
                type: 'success',
                title: 'Xóa thành công bài viết!',
                status: true,
              })
              this.props.actionGetBlogs()
              setTimeout(() => {
                this.props.actionShowHideAlert({
                  status: false,
                })
              }, 1500)
            })
          })
          .catch(() => {
            this.props.actionShowHideAlert({
              type: 'warning',
              title: 'Lỗi!',
              status: true,
            })
            setTimeout(() => {
              this.props.actionShowHideAlert({
                status: false,
              })
            }, 1500)
          })
        },
      },
      neBtn: {
        title: 'Cancel',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
        },
      },
      title: 'Warning',
      message: 'Nếu chọn OK, bài viết sẽ xóa mãi mãi.',
      icon: <Icon name="smile"/>,
    })
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
                href: '/',
                active: false,
              },
              {
                title: 'Blogs',
                href: '/blogs',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span>
              <a href={`${ADMIN_URL}blogs/add`}>Thêm mới</a>
            </span>
          </div>
        </AdminHeader>
        <div className="w-full">
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
            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()['page_size'])}
              pageNeighbours={2}
              onPageChanged={(e) => {
                this.props.actionGetBlogs(`?page=${e.currentPage}`)
                window.scrollTo(0, 0)
                window.history.pushState('', '', `/backend${this.props.match.url}?page=${e.currentPage}`);
              }}
              totalRecords={Number(this.isMeta()['total'])}
            />
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
  actionShowHidePopup,
  actionDeleteBlog,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBlog)
