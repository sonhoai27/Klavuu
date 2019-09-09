import * as React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Modal from '../Shared/Layout/Modal';
import Calendar from '@app/Shared/Calendar';
import Axios from 'axios';
import { API } from '@app/Shared/Const';
import FormatNumber from '@app/Shared/Utils/FormatNumber';

const S = require('@app/modules/Admin/Order/Styles/Export.scss')

interface IOrderExportProps {
  isShowing: boolean;
  onClose: Function;
}

interface IOrderExportStates {
  chooseDate: string;
  orders: any;
  isClickingFilter: boolean;
}

class OrderExport extends React.Component<IOrderExportProps, IOrderExportStates> {
  constructor(props) {
    super(props)

    this.state = {
      chooseDate: '',
      orders: [],
      isClickingFilter: false,
    }
  }

  getOrders = () => {
    if (this.state.chooseDate !== '') {
      Axios.get(`${API}orders?date=${this.state.chooseDate}`)
      .then((result) => {
        this.setState({ orders: result.data.items, isClickingFilter: true }, () => {
          console.log(this.state)
        })
      })
    }
  }

  renderListOrders = () => (
    this.state.orders.map((element, index) => {
      return (
        <tr key={index} style={{ fontSize: 13 }}>
          <td>
            {`#${element.order_id}`}
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
          <td>{element.order_client_note}</td>
          <td>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: 'none', borderTop: 'none', width: 200 }}>Tên</th>
                  <th style={{ borderBottom: 'none', borderTop: 'none' }}>SL</th>
                  <th style={{ borderBottom: 'none', borderTop: 'none' }}>Giá</th>
                  <th style={{ borderBottom: 'none', borderTop: 'none' }}>OFF</th>
                </tr>
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
        <td style={{ borderTop: 'none', padding: 6 }}>
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

  render() {
    return (
      <div className={S['order-export']}>
        <Modal
          style={{ maxWidth: '99%', marginTop: '2%' }}
          isShow={this.props.isShowing}>
          <Modal.Header
            onClose={this.props.onClose}
            title="Xuất file"/>
          <Modal.Body>
            <div className={S['order-export__tool']}>
              <Calendar
                onChange={(date) => {
                  this.setState({
                    chooseDate: date,
                  })
                }}
              />
              <span onClick={() => this.getOrders() }>Lọc</span>
            </div>
            <div className={S['order-export__main']}>
              <div className="table-responsive">
                <table className="table" id="table-to-xls">
                  <thead>
                    <tr style={{ fontSize: 12 }}>
                      <th>#</th>
                      <th style={{ width: '200px' }}>Khách hàng</th>
                      <th>Tổng giá trị</th>
                      <th>Ngày mua</th>
                      <th>Mã g.thiệu</th>
                      <th>Ghi chú</th>
                      <th>Sản phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderListOrders()}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={S['order-export__btn-action']}>
              <span onClick={() => this.props.onClose()}>Hủy</span>
              {
                this.state.isClickingFilter
                && (
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className={S['download-table-xls-button']}
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export" />
                )
              }
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default OrderExport
