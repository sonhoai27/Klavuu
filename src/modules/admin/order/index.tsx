import * as React from 'react';
const uuidv4 = require('uuid/v4');
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionGetOrders } from '@app/stores/cart/CartActions';
import { actionShowHideLoading, actionShowHideAlert } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';
import FormatNumber from '@app/shared/utils/FormatNumber';
import Calendar from '@app/shared/calendar';

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
            <Link to={`/xxx/app/order/${element.order_id}`}>{`#${element.order_id}`}</Link>
          </td>
          <td>
            - {element.order_client_name}<br/>
            - {element.order_address}<br/>
            - {element.order_client_email}<br/>
            - {element.order_client_phone}<br/>
          </td>
          <td>{FormatNumber(element.order_sumary_price)}đ</td>
          <td>{element.order_created_date}</td>
          <td>{element.order_intro_code}</td>
          <td>
            <table style={{ width: '100%' }}>
              <thead>
                <th style={{ borderBottom: 'none', borderTop: 'none' }}>Tên</th>
                <th style={{ borderBottom: 'none', borderTop: 'none' }}>SL</th>
                <th style={{ borderBottom: 'none', borderTop: 'none' }}>Giá</th>
                <th style={{ borderBottom: 'none', borderTop: 'none' }}>OFF</th>
              </thead>
              <tbody>{this.renderProducts(element.products)}</tbody>
            </table>
          </td>
        </tr>
      )
    })
  )

  renderProducts = (products: any[]) => (
    products.length > 0
    && products.map(element => (
      <tr key={element.product_name} className={S['order__products']}>
        <td style={{ borderTop: 'none' }}>
          {element.product_name}
        </td>
        <td style={{ borderTop: 'none' }}>
          {element.product_qty}
        </td>
        <td style={{ borderTop: 'none' }}>
          {FormatNumber(element.product_price)}đ
        </td>
        <td style={{ borderTop: 'none' }}>
          {element.product_discount}
        </td>
      </tr>
    ))
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
          <div style={{ display: 'flex' }}>
            <Calendar
                default="2019/05/01"
                onChange={(date) => {
                  console.log(date)
                }}
              />
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className={`download-table-xls-button ${GlobalStyles['wrap-_action--btn']}`}
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export" />
          </div>
        </AdminHeader>
        <div className={`col-12 ${S['order']}`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table" id="table-to-xls">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Khách hàng</th>
                    <th>Tổng giá trị</th>
                    <th>Ngày mua</th>
                    <th>Mã g.thiệu</th>
                    <th>Sản phẩm</th>
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
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
