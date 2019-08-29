import * as React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import Loadable from 'react-loadable';

const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionGetBrands, actionDeleteBrand } from '@app/stores/brand/BrandActions';
import { actionShowHidePopup, actionShowHideAlert } from '@app/stores/init';
import Icon from '@app/modules/client/shared/layout/Icon';

const GlobalStyles = require('@app/shared/styles/Box.scss');

const AdminAddBrand = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_add_brand" */ './addOrUpdate'),
  loading: () => '',
});

interface IAdminBrandProps {
  actionGetBrands: Function;
  actionDeleteBrand: Function;
  actionShowHidePopup: Function;
  actionShowHideAlert: Function;
  brandsState: any;
}

interface IAdminBrandStates {
  isShowHideAddBrand: boolean;
  currentBrand: {
    brand_id?: string;
    brand_alias?: string;
    brand_name?: string;
    brand_created_date?: string;
  };
  isAddOrUpdateBrand: boolean;
}

class AdminBrand extends React.Component<IAdminBrandProps, IAdminBrandStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowHideAddBrand: false,
      currentBrand: {
        brand_alias: '',
        brand_created_date: '',
        brand_id: '',
        brand_name: '',
      },
      isAddOrUpdateBrand: false,
    }
  }

  componentDidMount() {
    this.props.actionGetBrands()
  }

  onCloseAddBrand = () => {
    this.setState({
      isShowHideAddBrand: !this.state.isShowHideAddBrand,
      currentBrand: {},
      isAddOrUpdateBrand: false,
    })
  }

  onDelete = (id) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.props.actionDeleteBrand(id)
          .then(() => {
            this.props.actionGetBrands()
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
              title: 'Lỗi, hãng này đã có sản phẩm sử dụng!',
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
      message: 'If you click OK, This brand will be delete.',
      icon: <Icon name="smile"/>,
    })
  }

  renderBrands = () => (
    this.props.brandsState.data
    && this.props.brandsState.data.length > 0
    && this.props.brandsState.data.map(element => (
      <tr key={uuidv4()}>
        <td>
          <span onClick={() => {
            this.setState({
              currentBrand: element,
              isAddOrUpdateBrand: true,
              isShowHideAddBrand: true,
            })
          }}>{element.brand_name}</span>
        </td>
        <td>{element.brand_alias}</td>
        <td>
          <Icon onClick={() => this.onDelete(element.brand_id)} name="trash"/>
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
                title: 'Quản lý hãng',
                href: '/brands',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.onCloseAddBrand}>
              Thêm mới
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
                  <th scope="col">Alias</th>
                  <th>Hành động</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.renderBrands()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AdminAddBrand
          brand={this.state.currentBrand}
          onCloseAddBrand={this.onCloseAddBrand}
          isShowAddBrand={this.state.isShowHideAddBrand}
          isAddOrUpdate={this.state.isAddOrUpdateBrand}
        />
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  brandsState: storeState.brandReducer.brandsState,
})

const mapDispatchToProps = {
  actionGetBrands,
  actionDeleteBrand,
  actionShowHidePopup,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBrand)
