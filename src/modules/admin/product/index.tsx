import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '@app/modules/admin/shared/layout/Breadcrumb';
import { actionGetProducts, actionDeleteProduct } from '@app/stores/product/ProductActions';
import Icon from '@app/modules/client/shared/layout/Icon';
import FormatNumber from '@app/shared/utils/FormatNumber';
import { ADMIN_URL } from '@app/shared/const';
import { actionShowHidePopup, actionShowHideAlert } from '@app/stores/init';
import Pagination from '@app/shared/Pagination';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IProductsProps {
  actionGetProducts: Function;
  productsState: any;
  actionShowHidePopup: Function;
  actionDeleteProduct: Function;
  actionShowHideAlert: Function;
  match?: any;
}

class Products extends React.Component<IProductsProps> {
  constructor(props) {
    super(props)
  }

  isProduct = () => {
    if (this.props.productsState
      && this.props.productsState.items) {
      return this.props.productsState.items
    }
    return []
  }

  onMakeCurrentPage = () => {
    const page = (window.location.href).split('page=')[1]
    if (page !== undefined || page != null) {
      return page
    }

    return 1
  }

  renderProducts = () => (
    this.isProduct().map((element) => {
      return (
        <tr key={uuidv4()}>
          <th scope="row">1</th>
          <td>
            <a href={`${ADMIN_URL}product/${element.product_alias}`}>{element.product_name}</a>
          </td>
          <td>{FormatNumber(element.product_price)}đ</td>
          <td>{element.product_discount}</td>
          <td>
            <Link to={`/page/product/${element.product_alias}`}><Icon name="store"/></Link>
          </td>
          <td>
            <Icon onClick={() => this.onDelete(element.product_id)} name="trash"/>
          </td>
        </tr>
      )
    })
  )

  onDelete = (id) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.props.actionDeleteProduct(id)
          .then(() => {
            this.props.actionGetProducts()
            .then(() => {
              this.props.actionShowHideAlert({
                type: 'success',
                title: 'Xóa thành công hãng!',
                status: true,
              })
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
              title: 'Có lỗi khi xóa!',
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
      message: 'If you click OK, This product will be delete.',
      icon: <Icon name="smile"/>,
    })
  }

  isMeta = () => {
    if (this.props.productsState
      && this.props.productsState.meta) {
      return this.props.productsState.meta
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
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.renderProducts()}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()['page_size'])}
              pageNeighbours={2}
              onPageChanged={(e) => {
                this.props.actionGetProducts(`?page=${e.currentPage}`)
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
  productsState: storeState.productReducer.productsState,
})

const mapDispatchToProps = {
  actionGetProducts,
  actionShowHidePopup,
  actionDeleteProduct,
  actionShowHideAlert,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
