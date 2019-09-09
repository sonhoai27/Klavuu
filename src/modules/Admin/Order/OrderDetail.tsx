import * as React from 'react';
import { connect } from 'react-redux';
const uuidv4 = require('uuid/v4');

import AdminHeader from '../Shared/layout/Header';
import Breadcrumb from '../Shared/layout/Breadcrumb';
import { actionUpdateOrder, actionGetOrder } from '@app/Stores/Cart/CartActions';
import { actionShowHideLoading, actionShowHideAlert } from '@app/Stores/init';
import { CDN } from '@app/Shared/Const';

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./styles/OrderDetail.scss');

interface IOrderDetailProps {
  match?: any;
  actionGetOrder: Function;
  actionUpdateOrder: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  orderDetailState: any;
}

interface IOrderDetailStates {
}

class OrderDetail extends React.Component<IOrderDetailProps, IOrderDetailStates> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.actionGetOrder(id)
  }

  isOrder = () => {
    if (
      this.props.orderDetailState
      && this.props.orderDetailState.order
      && this.props.orderDetailState.detail
    ) {
      return this.props.orderDetailState
    }

    return {
      order: {},
      detail: [],
    }
  }

  onFormatNumber = (price: number) => {
    return (
      price
      && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    )
  }

  onMakePrice = (price, discount, qty) => {
    return Number((price - ((price * discount) / 100)) * qty)
  }

  onMakeSumaryPrice = () => {
    let price = 0;

    if (this.isOrder()['detail'].length > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.isOrder()['detail'].length; i++) {
        price = price + this.onMakePrice(
          this.isOrder()['detail'][i].od_product_price,
          this.isOrder()['detail'][i].od_product_discount,
          this.isOrder()['detail'][i].od_product_qty,
        )
      }

      return Number(price)
    }

    return Number(price)
  }

  renderListProduct = () => (
    this.isOrder()['detail'].map(element => (
      <li key={uuidv4()}>
        <div>
          <img src={`${CDN}${element.img_src}`} className="img-fluid"/>
          <span>{element.od_product_qty}</span>
        </div>
        <div>
          <span>{element.product_name}</span>
          <div>
            <span>{this.onFormatNumber(element.od_product_price)}đ</span>
            <span> ({element.od_product_discount}% OFF)</span>
          </div>
        </div>
        <div>
          {
            this.onFormatNumber(this.onMakePrice(
              element.od_product_price,
              element.od_product_discount,
              element.od_product_qty,
              ))
          }đ
        </div>
      </li>
    ))
  )

  onUpdateOrderNote = (orderId) => {
    this.props.actionShowHideLoading(true)
    const tempDom: any = document.getElementById(orderId)
    this.props.actionUpdateOrder({
      // @ts-ignore
      order_staff_note: tempDom.innerText,
    }, orderId)
    .then(() => {
      const { id } = this.props.match.params
      this.props.actionGetOrder(id)
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
                active: false,
              },
              {
                title: this.props.match.params.id,
                href: '/orders',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <div className={`${S['order-detail']} col-12`}>
          <div className={GlobalStyles['wrap-content']}>
            <div className="row">
              <div className="col-sm-6">
                <ul className={S['order-detail__left']}>
                  <li>ID: <span style={{ fontWeight: 600 }}>
                    {this.isOrder()['order'].order_id}</span>
                  </li>
                  <li>Tổng đơn hàng: <span>
                  {this.onFormatNumber(this.isOrder()['order'].order_sumary_price)}đ
                  </span></li>
                  <li>Tên: <span>{this.isOrder()['order'].order_client_name}</span></li>
                  <li>Email: <span>{this.isOrder()['order'].order_client_email}</span></li>
                  <li>Phone: <span>{this.isOrder()['order'].order_client_phone}</span></li>
                  <li>Địa chỉ: <span>{this.isOrder()['order'].order_address}</span></li>
                  <li>Ghi chú: <span>{this.isOrder()['order'].order_client_note}</span></li>
                </ul>
              </div>
              <div className="col-sm-6">
                <ul className={S['order-detail__right']}>
                  {this.renderListProduct()}
                </ul>
                <p className={S['line']}/>
                <div className={S['total_price']} style={{ marginBottom: 16 }}>
                  <span>Mã giới thiệu</span>
                  <span>{this.isOrder()['order'].order_intro_code}</span>
                </div>
                <p className={S['line']}/>
                <div className={S['total_price']}>
                  <span>Tổng đơn hàng</span>
                  <span>{this.onFormatNumber(this.onMakeSumaryPrice())}đ</span>
                </div>
                <div className={S['staff_note']}>
                  <div
                    className={S['textarea']}
                    contentEditable={true}
                    id={this.isOrder()['order'].order_id}
                    dangerouslySetInnerHTML={{ __html: this.isOrder()['order'].order_staff_note }}
                    />
                  <span
                    onClick={() => this.onUpdateOrderNote(this.isOrder()['order'].order_id)}
                    className={S['save']}>Lưu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  orderDetailState: storeState.cartReducer.orderDetailState,
})

const mapDispatchToProps = {
  actionGetOrder,
  actionUpdateOrder,
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
