import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionGetBanners, actionDeleteBanner } from '@app/stores/banner/BannerActions';
import { CDN, API } from '@app/shared/const';
import Icon from '@app/modules/client/shared/layout/Icon';
import { actionShowHidePopup, actionShowHideAlert, actionShowHideLoading } from '@app/stores/init';

const S = require('./styles/AdminBanner.scss')
const GlobalStyles = require('@app/shared/styles/Box.scss');

const AdminAddBanner = React.lazy(() => import(
  /*webpackChunkName: "admin_add_banner" */ './add'));

interface IAdminBannerProps {
  actionGetBanners: Function;
  bannersState: any[];
  actionShowHidePopup: Function;
  actionDeleteBanner: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
}

interface IAdminBannerStates {
  isShowAddBanner: boolean;
  currentBanner: any;
  isAddOrUpdateBanner: boolean;
}

class AdminBanner extends React.Component<IAdminBannerProps, IAdminBannerStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowAddBanner: false,
      currentBanner: {},
      isAddOrUpdateBanner: false,
    }
  }

  componentDidMount() {
    this.props.actionGetBanners()
  }

  onCloseAddBanner = () => {
    this.setState({
      isShowAddBanner: !this.state.isShowAddBanner,
      currentBanner: {},
      isAddOrUpdateBanner: false,
    })
  }

  renderBanners = () => (
    this.props.bannersState
    && this.props.bannersState.length > 0
    && this.props.bannersState.map(element => (
      <tr key={uuidv4()}>
        <td>
          <img
            onClick={() => {
              this.setState({
                currentBanner: element,
                isAddOrUpdateBanner: true,
              }, () => {
                this.setState({
                  isShowAddBanner: !this.state.isShowAddBanner,
                })
              })
            }}
            width="120px"
            style={{ cursor: 'pointer' }}
            src={`${CDN}banners/${element.banner_image}`} className="img-fluid"/>
        </td>
        <td>{element.banner_title}</td>
        <td>
          <Icon
            onClick={() => this.onShowWarningDeleteBanner(element.banner_image, element.banner_id)}
            name="trash"/>
        </td>
      </tr>
    ))
  )

  onShowWarningDeleteBanner = (imageId: string, bannerId: string) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.props.actionShowHideLoading(true)
          this.onDeleteBanner(imageId, bannerId)
        },
      },
      neBtn: {
        title: 'Cancel',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
        },
      },
      title: 'Warning',
      message: 'If you click OK, This banner will be delete.',
      icon: <Icon name="smile"/>,
    })
  }

  onDeleteBanner = (imageId: string, bannerId: string) => {
    axios.delete(`${API}banner/image/${imageId}`)
    .then(() => {
      return this.props.actionDeleteBanner(bannerId)
    })
    .then(() => {
      this.props.actionShowHideLoading(false)
      this.onShowAlert('success', 'Xóa thành công!')
      this.props.actionGetBanners()
    })
    .catch(() => {
      this.props.actionShowHideLoading(false)
      this.onShowAlert('danger', 'Xóa thất bại!')
    })
  }

  onShowAlert  = (type, title) => {
    this.props.actionShowHideAlert({
      type,
      title,
      status: true,
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
      this.props.actionGetBanners()
    }, 1500)
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
                title: 'Quản lý banner',
                href: '/xxx/app/banners',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.onCloseAddBanner}>
              Thêm mới
            </span>
          </div>
        </AdminHeader>
        <div className="col-12">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">Hình</th>
                  <th scope="col">Tên</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {this.renderBanners()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`col-12 ${S['am-banner']}`}>
          <AdminAddBanner
            banner={this.state.currentBanner}
            isAddOrUpdate={this.state.isAddOrUpdateBanner}
            onCloseAddBanner={this.onCloseAddBanner}
            isShowAddBanner={this.state.isShowAddBanner}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  bannersState: storeState.bannerReducer.bannersState,
})

const mapDispatchToProps = {
  actionGetBanners,
  actionShowHidePopup,
  actionDeleteBanner,
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminBanner)
