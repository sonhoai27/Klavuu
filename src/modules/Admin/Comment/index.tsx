import * as React from 'react';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

import { actionGetCMTS, actionUpdateCMT } from '@app/Stores/Comment/CommentActions';
import AdminHeader from '../Shared/Layout/Header';
import Breadcrumb from '../Shared/Layout/Breadcrumb';
import Pagination from '@app/Shared/Pagination';
import Rater from '@app/Shared/Rating';

const GlobalStyles = require('@app/Shared/Styles/Box.scss');
const S = require('./Comments.scss');

interface IAdminCommentsProps {
  actionGetCMTS: Function;
  cmtsState: any;
  match?: any;
  actionUpdateCMT: Function;
}

class AdminComments extends React.Component<IAdminCommentsProps> {
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
    if (this.props.cmtsState
      && this.props.cmtsState.meta) {
      return this.props.cmtsState.meta
    }

    return {
      total: 0,
      page_size: 0,
    }
  }

  renderComments = () => (
    this.props.cmtsState.items
    && this.props.cmtsState.items.length > 0
    && this.props.cmtsState.items.map(element => (
      <tr key={uuidv4()} style={{ background: Number(element.cmt_show) === 1 ? '#eee' : '#fff' }}>
        <td style={{ fontSize: 15 }}>
          <div>{element.cmt_user_name}</div>
          <div>
            {
              Number(element.cmt_verify) === 1
              ? <span style={{ color: 'green' }}>Mua hàng</span>
              : 'Chưa mua hàng'
            }
          </div>
        </td>
        <td style={{ fontSize: 15 }}>
          <div>{element.cmt_content}</div>
          <Rater disabled rating={element.cmt_stars}/>
        </td>
        <td>
          <div style={{ fontSize: 15 }}>{element.product_name}</div>
        </td>
        <td>
          <div style={{ fontSize: 15 }}>{element.cmt_created_date}</div>
        </td>
        <td>
          <span onClick={() => {
            this.props.actionUpdateCMT(
              element.cmt_id,
              {
                cmt_show: Number(element.cmt_show) === 1 ? 0 : 1,
              },
            )
            .then(() => this.props.actionGetCMTS(`?page=${this.onMakeCurrentPage()}`))
          }} className={S['comment-btn']}>
            {Number(element.cmt_show) === 1 ? 'Hiện lại' : 'Ẩn đi'}
          </span>
        </td>
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
                href: '/',
                active: false,
              },
              {
                title: 'Quản lý bình luận',
                href: '/comments',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <div className="w-full">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th style={{ width: '20%' }} scope="col">Khác hàng</th>
                  <th style={{ width: '25%' }} scope="col">Bình luận</th>
                  <th style={{ width: '25%' }} scope="col">Sản phẩm</th>
                  <th style={{ width: '15%' }}>Ngày</th>
                  <th style={{ width: '15%' }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {this.renderComments()}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()['page_size'])}
              pageNeighbours={2}
              onPageChanged={(e) => {
                this.props.actionGetCMTS(`?page=${e.currentPage}`)
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
  cmtsState: storeState.cmtReducer.cmtsState,
})

const mapDispatchToProps = {
  actionGetCMTS,
  actionUpdateCMT,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComments)
