import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import { actionGetProducts } from '@app/stores/product/ProductActions';
import Icon from '@app/modules/client/shared/layout/Icon';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { ADMIN_URL } from '@app/shared/const';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IProductsProps {
  actionGetProducts: Function;
  productsState: any;
}

class Products extends React.Component<IProductsProps> {
  constructor(props) {
    super(props)
  }

  componentDidMount(): void {
    this.props.actionGetProducts()
  }

  isProduct = () => {
    if (this.props.productsState
      && this.props.productsState.items) {
      return this.props.productsState.items
    }
    return []
  }

  renderProducts = () => (
    this.isProduct().map((element) => {
      return (
        <tr key={uuidv4()}>
          <th scope="row">1</th>
          <td>
            <Link to={`${ADMIN_URL}product/${element.product_alias}`}>{element.product_name}</Link>
          </td>
          <td>{FormatNumber(element.product_price)}đ</td>
          <td>{element.product_discount}</td>
          <td>
            <Link to={`/page/product/${element.product_alias}`}><Icon name="store"/></Link>
          </td>
        </tr>
      )
    })
  )

  render() {
    return (
      <>
        <AdminHeader>
          <Breadcrumb
            className="am-bc-product-add"
            items={[
              {
                title: 'Trang chủ',
                href: '/xxx/app',
                active: false,
              },
              {
                title: 'Quản lý sản phẩm',
                href: '/xxx/app/products',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span>
              <Link to="/xxx/app/product/add">Thêm mới</Link>
            </span>
          </div>
        </AdminHeader>
        <div className="col-12">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Khuyến mãi</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.renderProducts()}
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
  productsState: storeState.productReducer.productsState,
})

const mapDispatchToProps = {
  actionGetProducts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
