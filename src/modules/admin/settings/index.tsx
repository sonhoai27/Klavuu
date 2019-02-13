import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionShowHideAlert, actionGetSettings } from '@app/stores/init';
import SingleUploadImage from './SingleUploadImage';
import { API } from '@app/shared/const';

const GlobalStyles = require('@app/shared/styles/Box.scss');
const S = require('./Settings.scss');

interface IAdminSettingsProps {
  settingsState: any;
  actionGetSettings: Function;
  actionShowHideAlert: Function;
}

interface IAdminSettingsStates {
  info: any;
  address: any;
  socials: any;
}

class AdminSettings extends React.Component<IAdminSettingsProps, IAdminSettingsStates> {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        WEBSITE_TITLE: '',
        WEBSITE_DESC: '',
      },
      address: {
        WEBSITE_EMAIL: '',
        WEBSITE_PHONE: '',
        WEBSITE_ADDRESS: '',
        WEBSITE_GPKD: '',
      },
      socials: {
        WEBSITE_FB: '',
        WEBSITE_YOUTUBE: '',
        WEBSITE_TWITTER: '',
        WEBSITE_INSTAGRAM: '',
      },
    }
  }

  componentDidMount() {
    this.props.actionGetSettings()
  }

  componentDidUpdate(prevProps) {
    if (this.props.settingsState !== prevProps.settingsState) {
      this.setState({
        info: {
          WEBSITE_TITLE: this.props.settingsState.WEBSITE_TITLE,
          WEBSITE_DESC: this.props.settingsState.WEBSITE_DESC,
        },
        address: {
          WEBSITE_EMAIL: this.props.settingsState.WEBSITE_EMAIL,
          WEBSITE_PHONE: this.props.settingsState.WEBSITE_PHONE,
          WEBSITE_ADDRESS: this.props.settingsState.WEBSITE_ADDRESS,
          WEBSITE_GPKD: this.props.settingsState.WEBSITE_GPKD,
        },
        socials: {
          WEBSITE_FB: this.props.settingsState.WEBSITE_FB,
          WEBSITE_YOUTUBE: this.props.settingsState.WEBSITE_YOUTUBE,
          WEBSITE_TWITTER: this.props.settingsState.WEBSITE_TWITTER,
          WEBSITE_INSTAGRAM: this.props.settingsState.WEBSITE_INSTAGRAM,
        },
      })
    }
  }

  onChange = (e, type) => {
    const { name, value } = e.target

    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [name]: value,
      },
    })
  }

  onSave = (type) => {
    let temp = []
    for (const key in this.state[type]) {
      temp = [...temp, { [key]: this.state[type][key] }]
    }

    axios.put(`${API}configs`, temp)
      .then(() => this.onShowAlert('success', 'Cập nhật thành công!'))
      .catch(() => this.onShowAlert('danger', 'Có lỗi vui lòng xem lại!'))
  }

  onShowAlert = (type, title) => {
    this.props.actionShowHideAlert({
      type,
      title,
      status: true,
    })

    setTimeout(() => {
      this.props.actionShowHideAlert({
        status: false,
      })
      this.props.actionGetSettings()
    }, 1500)
  }

  render() {
    const { WEBSITE_LOGO, WEBSITE_ICON } = this.props.settingsState

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
                title: 'Thông tin chung',
                href: '/xxx/app/settings',
                active: true,
              },
            ]}
          />
        </AdminHeader>
        <div className="col-12" style={{ padding: 64 }}>

          <div className="row" style={{ paddingBottom: 32 }}>
            <div className="col-sm-4">
              <p><b>Ảnh trang web</b></p>
              <p>
                Logo hiển thị ở menu trang web.
                Favicon sẽ hiển thị trên thanh tiêu đề trình duyệt.
            </p>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-7">
              <div className={GlobalStyles['wrap-content']}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Logo</label>
                      <SingleUploadImage
                        onDelete={() => {
                          axios.delete(`${API}configs/images/WEBSITE_LOGO/${WEBSITE_LOGO}`)
                          .then(() => this.onShowAlert('success', 'Xóa thành công logo!'))
                          .catch(() => this.onShowAlert('danger', 'Lỗi xóa logo!'))
                        }}
                        onUpdate={(e) => {
                          const formData = new FormData()
                          formData.append('upload-image', e)
                          axios.post(`${API}configs/images/WEBSITE_LOGO`, formData)
                          .then(() => this.onShowAlert('success', 'Cập nhật thành công logo!'))
                          .catch(() => this.onShowAlert('danger', 'Lỗi cập nhật logo!'))
                        }}
                        src={
                          this.props.settingsState.WEBSITE_LOGO
                          ? this.props.settingsState.WEBSITE_LOGO
                          : ''
                        } />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Favicon</label>
                      <SingleUploadImage
                        src={
                          this.props.settingsState.WEBSITE_ICON
                          ? this.props.settingsState.WEBSITE_ICON
                          : ''
                        }
                        onDelete={() => {
                          axios.delete(`${API}configs/images/WEBSITE_ICON/${WEBSITE_ICON}`)
                          .then(() => this.onShowAlert('success', 'Xóa thành công logo!'))
                          .catch(() => this.onShowAlert('danger', 'Lỗi xóa logo!'))
                        }}
                        onUpdate={(e) => {
                          const formData = new FormData()
                          formData.append('upload-image', e)
                          axios.post(`${API}configs/images/WEBSITE_ICON`, formData)
                          .then(() => this.onShowAlert('success', 'Cập nhật thành công icon!'))
                          .catch(() => this.onShowAlert('danger', 'Lỗi cập nhật icon!'))
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ paddingBottom: 32 }}>
            <div className="col-sm-4">
              <p><b>Thông tin cửa hàng</b></p>
              <p>
                Tên cửa hàng xuất hiện trên tiêu đề trình duyệt.
                Thẻ mô tả giúp mô tả trang web của bạn.
            </p>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-7">
              <div className={GlobalStyles['wrap-content']}>
                <div className={GlobalStyles['form-item']}>
                  <label>Tên cửa hàng</label>
                  <input
                    onChange={e => this.onChange(e, 'info')}
                    defaultValue={this.props.settingsState.WEBSITE_TITLE}
                    type="text"
                    name="WEBSITE_TITLE" />
                </div>
                <div className={GlobalStyles['form-item']}>
                  <label>Mô tả cửa hàng</label>
                  <input
                    onChange={e => this.onChange(e, 'info')}
                    defaultValue={this.props.settingsState.WEBSITE_DESC}
                    type="text"
                    name="WEBSITE_DESC" />
                </div>
                <div>
                  <span
                    onClick={() => this.onSave('info')}
                    className={S['settings__btn']}>Lưu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ paddingBottom: 32 }}>
            <div className="col-sm-4">
              <p><b>Địa chỉ</b></p>
              <p>
                Địa chỉ này sẽ xuất hiện ở mục liên hệ, footer của trang web
              và để khách hàng liên lạc.<br />
              </p>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-7">
              <div className={GlobalStyles['wrap-content']}>
                <div className={GlobalStyles['form-item']}>
                  <label>Giấy phép kinh doanh</label>
                  <input
                    onChange={e => this.onChange(e, 'address')}
                    type="text"
                    defaultValue={this.props.settingsState.WEBSITE_GPKD}
                    name="WEBSITE_GPKD" />
                </div>
                <div className={GlobalStyles['form-item']}>
                  <label>Thư điện tử</label>
                  <input
                    onChange={e => this.onChange(e, 'address')}
                    type="text"
                    defaultValue={this.props.settingsState.WEBSITE_EMAIL}
                    name="WEBSITE_EMAIL" />
                </div>
                <div className={GlobalStyles['form-item']}>
                  <label>Số điện thoại</label>
                  <input
                    onChange={e => this.onChange(e, 'address')}
                    type="text"
                    defaultValue={this.props.settingsState.WEBSITE_PHONE}
                    name="WEBSITE_PHONE" />
                </div>
                <div className={GlobalStyles['form-item']}>
                  <label>Địa chỉ cửa hàng</label>
                  <input
                    onChange={e => this.onChange(e, 'address')}
                    type="text"
                    defaultValue={this.props.settingsState.WEBSITE_ADDRESS}
                    name="WEBSITE_ADDRESS" />
                </div>
                <div>
                  <span
                    onClick={() => this.onSave('address')}
                    className={S['settings__btn']}>Lưu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{ paddingBottom: 32 }}>
            <div className="col-sm-4">
              <p><b>Mạng xã hội</b></p>
              <p>
                Mạng xã hội để khách có thể liên hệ.
            </p>
            </div>
            <div className="col-sm-1" />
            <div className="col-sm-7">
              <div className={GlobalStyles['wrap-content']}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Facebook</label>
                      <input
                        onChange={e => this.onChange(e, 'socials')}
                        type="text"
                        defaultValue={this.props.settingsState.WEBSITE_FB}
                        name="WEBSITE_FB" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Instagram</label>
                      <input
                        onChange={e => this.onChange(e, 'socials')}
                        type="text"
                        defaultValue={this.props.settingsState.WEBSITE_INSTAGRAM}
                        name="WEBSITE_INSTAGRAM" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Twitter</label>
                      <input
                        onChange={e => this.onChange(e, 'socials')}
                        type="text"
                        defaultValue={this.props.settingsState.WEBSITE_TWITTER}
                        name="WEBSITE_TWITTER" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className={GlobalStyles['form-item']}>
                      <label>Youtube</label>
                      <input
                        onChange={e => this.onChange(e, 'socials')}
                        type="text"
                        defaultValue={this.props.settingsState.WEBSITE_YOUTUBE}
                        name="WEBSITE_YOUTUBE" />
                    </div>
                  </div>
                  <div style={{ marginLeft: 15, marginRight: 15 }}>
                    <span
                      onClick={() => this.onSave('socials')}
                      className={S['settings__btn']}>Lưu</span>
                  </div>
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
  settingsState: storeState.initReducer.settingsState,
})

const mapDispatchToProps = {
  actionShowHideAlert,
  actionGetSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings)
