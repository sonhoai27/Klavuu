import * as React from 'react';
const uuidv4 = require('uuid/v4');
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionGetOrders } from '@app/stores/cart/CartActions';
import { actionShowHideLoading, actionShowHideAlert } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';
import FormatNumber from '@app/shared/utils/FormatNumber';
import OrderExport from './Export';
import { ADMIN_URL } from '@app/shared/const';

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./styles/Order.scss')

interface IOrderProps {
  actionGetOrders: Function;
  ordersState: any;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  match?: any;
}

interface IOrderStates {
  currenRowState: string;
  isShowingOrderExport: boolean;
}

class Order extends React.Component<IOrderProps, IOrderStates> {
  constructor(props) {
    super(props)
    this.state = {
      currenRowState: '',
      isShowingOrderExport: false,
    }
  }

  onChooseOrder = (id) => {
    this.setState({
      currenRowState: id,
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
        <tr key={uuidv4()} style={{ fontSize: 13 }}>
          <td>
            <Link to={`${ADMIN_URL}order/${element.order_id}`}>{`#${element.order_id}`}</Link>
          </td>
          <td>
            - <b>{element.order_client_name}</b><br/>
            - {element.order_address}<br/>
            - {element.order_client_email}<br/>
            - {element.order_client_phone}<br/>
          </td>
          <td>{FormatNumber(element.order_sumary_price)}đ</td>
          <td>{element.order_created_date}</td>
          <td>{element.order_intro_code}</td>
          <td>{element.order_client_note}</td>
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

  showHideOrderExport = () => this.setState({
    isShowingOrderExport: !this.state.isShowingOrderExport,
  })

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
                title: 'Quản lý đơn hàng',
                href: '/orders',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.showHideOrderExport}>
              Xuất
            </span>
          </div>
        </AdminHeader>
        <div className={`w-full ${S['order']}`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ fontSize: 12 }}>
                    <th>#</th>
                    <th>Khách hàng</th>
                    <th>Tổng giá trị</th>
                    <th>Ngày mua</th>
                    <th>Mã g.thiệu</th>
                    <th>Ghi chú</th>
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
                window.history.pushState('', '', `/backend${this.props.match.url}?page=${e.currentPage}`);
              }}
              totalRecords={Number(this.isMeta()['total'])}
            />
          </div>
        </div>
        <OrderExport
          isShowing={this.state.isShowingOrderExport}
          onClose={this.showHideOrderExport}/>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  ordersState: storeState.cartReducer.ordersState,
})

const mapDispatchToProps = {
  actionGetOrders,
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
