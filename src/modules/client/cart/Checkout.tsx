import * as React from 'react';
import Icon from '../shared/layout/Icon';
import { actionAddToCart, actionAddOrder } from '@app/stores/cart/CartActions';
import { connect } from 'react-redux';
import { CDN } from '@app/shared/const';
import {
  actionGetProvince,
  actionGetDistrict,
  actionGetWard,
} from '@app/stores/product/ProductActions';
import Moment from '@app/shared/utils/Moment';
import { actionShowHidePopup } from '@app/stores/init';
import { withRouter } from 'react-router';

const uuidv4 = require('uuid/v4');

const S = require('./styles/Checkout.scss')

interface ICheckoutProps {
  cartState: any[];
  actionAddToCart: Function;
  actionGetProvince: Function;
  actionGetDistrict: (provinceId: string) => any;
  actionGetWard: (districtId: string) => any;
  provinceState: any[];
  districtState: any[];
  wardState: any[];
  actionAddOrder: Function;
  actionShowHidePopup: Function;
  history?: any;
}

interface ICheckoutStates {
  province: string;
  ward: string;
  district: string;
  order: {
    contact: any,
    address: any[],
    street: string;
  }
}
class Checkout extends React.Component<ICheckoutProps, ICheckoutStates> {
  constructor(props) {
    super(props)
    this.state = {
      province: '',
      ward: '',
      district: '',
      order: {
        contact: {},
        address: [],
        street: '',
      },
    }
  }

  componentDidMount() {
    this.props.actionGetProvince()
    this.setState({
      order: {
        ...this.state.order,
        contact: {
          ...this.state.order.contact,
          order_id: uuidv4(),
          order_created_date: Moment(),
        },
      },
    })
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
    if (this.props.cartState.length > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.props.cartState.length; i++) {
        price = price + this.onMakePrice(
          this.props.cartState[i].product_price,
          this.props.cartState[i].product_discount,
          this.props.cartState[i].qty,
        )
      }

      return Number(price)
    }

    return Number(price)
  }

  renderProductCatelog = () => (
    this.props.cartState.length > 0
    && this.props.cartState.map(element => (
      <li key={uuidv4()}>
          <div>
            <img
              src={`${CDN}${element.product_image}`}
              alt=""
              className="img-fluid" />
              <span>{element.qty}</span>
          </div>
          <div>
              <span>
                {element.product_name} ({element.product_discount}% OFF)
              </span>
              <span>
                {this.onFormatNumber(element.product_price)}đ
              </span>
          </div>
          <div>
            {this.onFormatNumber(
              this.onMakePrice(
                element.product_price,
                element.product_discount,
                element.qty,
              ),
            )}đ
          </div>
      </li>
    ))
  )

  renderProvinces = () => (
    this.props.provinceState
    && this.props.provinceState.length > 0
    && this.props.provinceState.map((element) => {
      return (
        <option
          key={uuidv4()}
          value={`${element.name}|${element.provinceid}`}
        >
          {element.name}
        </option>
      )
    })
  )

  renderDistricts = () => (
    this.props.districtState
    && this.props.districtState.length > 0
    && this.props.districtState.map((element) => {
      return (
        <option
          key={uuidv4()}
          value={`${element.name}|${element.districtid}`}
        >
          {element.name}
        </option>
      )
    })
  )

  renderWards = () => (
    this.props.wardState
    && this.props.wardState.length > 0
    && this.props.wardState.map((element) => {
      return (
        <option
          key={uuidv4()}
          value={element.name}
        >
          {element.name}
        </option>
      )
    })
  )

  onGetDistricts = (e) => {
    const { value } = e.target

    this.setState({
      province: value,
      order: {
        ...this.state.order,
        address: [...[], (value.split('|'))[0]],
        street: '',
      },
    }, () => {
      const id = (value.split('|'))[1]
      this.props.actionGetDistrict(id);
    })
  }

  onGetWards = (e) => {
    const { value } = e.target

    this.setState({
      district: value,
      order: {
        ...this.state.order,
        address: [...this.state.order.address, (value.split('|'))[0]],
      },
    }, () => {
      const id = (value.split('|'))[1]
      this.props.actionGetWard(id);
    })
  }

  onGetValueOfWard = (e) => {
    const { value } = e.target
    this.setState({
      order: {
        ...this.state.order,
        address: [...this.state.order.address, value],
      },
      ward: value,
    })
  }

  onChangeToGetUserInfomation = (e) => {
    this.setState({
      order: {
        ...this.state.order,
        contact: {
          ...this.state.order.contact,
          [e.target.name]: e.target.value,
        },
      },
    })
  }

  onGetAddress = () => {
    const temp = this.state.order.address.reverse()

    return `${this.state.order.street}, ${temp.join(', ')}`
  }

  onGetStreet = (e) => {
    this.setState({
      order: {
        ...this.state.order,
        street: e.target.value,
      },
    })
  }

  onMakeOrderDetail = () => {
    let orderDetail = []

    if (this.props.cartState && this.props.cartState.length > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < this.props.cartState.length; i++) {
        orderDetail = [...orderDetail, {
          order_id: this.state.order.contact.order_id,
          od_product_id: this.props.cartState[i].product_id,
          od_product_qty: this.props.cartState[i].qty,
          od_product_price: this.props.cartState[i].product_price,
          od_product_discount: this.props.cartState[i].product_discount,
        }]
      }
    }

    return orderDetail
  }

  onCompleteOrder = () => {
    this.props.actionAddOrder({
      order: {
        ...this.state.order.contact,
        order_address: this.onGetAddress(),
        order_sumary_price: this.onMakeSumaryPrice(),
      },
      detail: this.onMakeOrderDetail(),
    })
    .then(() => {
      this.props.actionShowHidePopup({
        status: true,
        onClose: () => this.props.actionShowHidePopup({ status: false }),
        poBtn: {
          title: 'Continue shopping',
          func: () => {
            this.props.actionShowHidePopup({ status: false }),
            localStorage.setItem('cart', JSON.stringify([]))
            this.props.history.push('/page/products/all')
          },
        },
        title: 'Order successful',
        message: 'Thank you for your order!',
        icon: <Icon name="smile"/>,
      })
    })
    .catch(() => {
      this.props.actionShowHidePopup({
        status: true,
        onClose: () => this.props.actionShowHidePopup({ status: false }),
        poBtn: {
          title: 'EXIT',
          func: () => this.props.actionShowHidePopup({ status: false }),
        },
        title: 'ERROR',
        message: 'Complete ordered field!',
        icon: <Icon name="sad"/>,
      })
    })
  }

  render() {
    return (
      <div className={`${S['checkout']} col-12`}>
        <div className="container">
          <div className="row">
            <div className={`col-sm-6 ${S['left']}`}>
              <div className={S['item']}>
                <label>Contact information</label>
                <input
                  onChange={this.onChangeToGetUserInfomation}
                  name="order_client_name"
                  type="text" placeholder="Full name"/>
                <input
                  onChange={this.onChangeToGetUserInfomation}
                  name="order_client_email"
                  type="text" placeholder="Email"/>
                <input
                  onChange={this.onChangeToGetUserInfomation}
                  name="order_client_phone"
                  type="text" placeholder="Phone"/>
              </div>
              <div className={S['item']}>
                <label>Shipping address</label>

                <div className={S['select']}>
                  <span>Province</span>
                  <Icon name="chevron-down" className={S['icon']}/>
                  <select
                    value={this.state.province}
                    onChange={this.onGetDistricts}>
                    <option>Choose</option>
                    {this.renderProvinces()}
                  </select>
                </div>

                <div className={S['select']}>
                  <span>District</span>
                  <Icon name="chevron-down" className={S['icon']}/>
                  <select
                    value={this.state.district}
                    onChange={this.onGetWards}>
                    <option>Choose</option>
                    {this.renderDistricts()}
                  </select>
                </div>

                <div className={S['select']}>
                  <span>Ward</span>
                  <Icon name="chevron-down" className={S['icon']}/>
                  <select
                    value={this.state.ward}
                    onChange={this.onGetValueOfWard}
                  >
                    <option>Choose</option>
                    {this.renderWards()}
                  </select>
                </div>

                <input
                  onChange={this.onGetStreet}
                  value={this.state.order.street}
                  type="text" placeholder="Street"/>
              </div>
            </div>
            <div className="col-sm-6">
              <ul className={S['product-catalog']}>
                {this.renderProductCatelog()}
              </ul>
              <div className={S['total']}>
                  <div className={S['note']}>
                    <textarea
                      onChange={this.onChangeToGetUserInfomation}
                      name="order_client_note"
                      rows={3} placeholder="Note"/>
                  </div>
                  <div>
                    <span>Total</span>
                    <span>{this.onFormatNumber(this.onMakeSumaryPrice())}đ</span>
                  </div>
                  <div onClick={this.onCompleteOrder}>Complete order</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  cartState: storeState.cartReducer.cartState,
  provinceState: storeState.productReducer.provinceState,
  wardState: storeState.productReducer.wardState,
  districtState: storeState.productReducer.districtState,
})

const mapDispatchToProps = {
  actionAddToCart,
  actionGetProvince,
  actionGetDistrict,
  actionGetWard,
  actionAddOrder,
  actionShowHidePopup,
}

// @ts-ignore
const tempCheckout = connect(mapStateToProps, mapDispatchToProps)(Checkout)
// @ts-ignore
export default withRouter(tempCheckout as any)
