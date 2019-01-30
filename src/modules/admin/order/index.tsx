import * as React from 'react';
const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { connect } from 'react-redux';
import { actionGetOrders, actionUpdateOrder } from '@app/stores/cart/CartActions';
import { Link } from 'react-router-dom';
import { actionShowHideLoading, actionShowHideAlert } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./styles/Order.scss')

interface IOrderProps {
  actionGetOrders: Function;
  ordersState: any;
  actionUpdateOrder: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  match?: any;
}

interface IOrderStates {
  currenRowState: string;
}

class Order extends React.Component<IOrderProps, IOrderStates> {
  constructor(props) {
    super(props)
    this.state = {
      currenRowState: '',
    }
  }

  onChooseOrder = (id) => {
    this.setState({
      currenRowState: id,
    })
  }

  onUpdateOrderNote = (orderId) => {
    this.props.actionShowHideLoading(true)
    const tempDom: any = document.getElementById(orderId)
    this.props.actionUpdateOrder({
      // @ts-ignore
      order_staff_note: tempDom.value,
    }, orderId)
    .then(() => {
      this.setState({
        currenRowState: '',
      }, () => {
        this.props.actionGetOrders('')
        this.props.actionShowHideLoading(false)
        this.props.actionShowHideAlert({
          status: true,
          type: 'success',
          title: 'Thêm/sửa ghi chú thành công!',
        })
        setTimeout(() => {
          this.props.actionShowHideAlert({
            status: false,
          })
        }, 1500)
      })
    })
    .catch(() => {
      this.props.actionShowHideLoading(false)
      this.props.actionShowHideAlert({
        status: true,
        type: 'danger',
        title: 'Lỗi thêm/sửa ghi chú!',
      })
      setTimeout(() => {
        this.props.actionShowHideAlert({
          status: false,
        })
      }, 1500)
    })
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  renderListOrders = () => (
    this.props.ordersState
    && this.props.ordersState.items
    && this.props.ordersState.items.length > 0
    && this.props.ordersState.items.map((element) => {
      return (
        <tr key={uuidv4()}>
          <td>
            <Link to={`/xxx/app/order/${element.order_id}`}>{element.order_id}</Link>
          </td>
          <td>{element.order_client_name}</td>
          <td>{element.order_sumary_price}</td>
          <td>
            {
              this.state.currenRowState !== element.order_id
              && (
                <div>{element.order_staff_note}</div>
              )
            }
            <div className={S['order__edit-note']}>
              {
                this.state.currenRowState === element.order_id
                ? (
                  <>
                    <textarea
                      id={element.order_id}
                      defaultValue={
                        element.order_staff_note
                        ? element.order_staff_note
                        : ''
                      }/>
                    <span
                      onClick={() => this.onUpdateOrderNote(element.order_id)}
                      className={S['save']}>Lưu</span>
                    <span
                      onClick={() => this.onChooseOrder('')}
                      className={S['edit']}>Hủy</span>
                  </>
                )
                : (
                  <span
                    onClick={() => this.onChooseOrder(element.order_id)}
                    className={S['edit']}>Sửa</span>
                )
              }
            </div>
          </td>
        </tr>
      )
    })
  )

  isMeta = () => {
    if (this.props.ordersState
      && this.props.ordersState.meta) {
      return this.props.ordersState.meta
    }

    return {
      total: 0,
      page_size: 0,
    }
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
                title: 'Quản lý đơn hàng',
                href: '/xxx/app/orders',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <div className={`col-12 ${S['order']}`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }} scope="col">#ID</th>
                    <th style={{ width: '30%' }} scope="col">Khách hàng</th>
                    <th style={{ width: '20%' }} scope="col">Tổng giá trị</th>
                    <th style={{ width: '30%' }} scope="col">Ghi chú</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.renderListOrders()}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()['page_size'])}
              pageNeighbours={2}
              onPageChanged={(e) => {
                this.props.actionGetOrders(`?page=${e.currentPage}`)
                window.scrollTo(0, 0)
                window.history.pushState('', '', `${this.props.match.url}?page=${e.currentPage}`);
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
  ordersState: storeState.cartReducer.ordersState,
})

const mapDispatchToProps = {
  actionGetOrders,
  actionUpdateOrder,
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
