import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Modal from '../../shared/layout/Modal';
import Icon from '@app/modules/client/shared/layout/Icon';
import {
  actionAddBanner,
  actionGetBanners,
  actionUpdateBanner,
} from '@app/stores/banner/BannerActions';
import { actionShowHideLoading, actionShowHideAlert } from '@app/stores/init';
import { API, CDN } from '@app/shared/const';

const S = require('./Add.scss')

interface IAdminAddBannerProps {
  isShowAddBanner: boolean;
  onCloseAddBanner: () => void;
  actionAddBanner: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
  actionGetBanners: Function;
  isAddOrUpdate?: boolean;
  banner?: any;
  actionUpdateBanner: Function;
}

interface IAdminAddBannerStates {
  tempImage: string;
  banner: any;
  image: any;
}

class AdminAddBanner extends React.PureComponent<IAdminAddBannerProps, IAdminAddBannerStates> {
  constructor(props) {
    super(props)
    this.state = {
      tempImage: '',
      image: '',
      banner: {},
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.banner !== prevProps.banner) {
      this.setState({
        banner: this.props.banner,
      })
    }
  }

  onChange = (e) => {
    const { value, name } = e.target

    this.setState({
      banner: {
        ...this.state.banner,
        [name]: value,
      },
    })
  }

  onUpdate = () => {
    this.props.actionShowHideLoading(true)
    if (this.state.image === '') {
      this.props.actionUpdateBanner(
        this.props.banner.banner_id,
        {
          banner_title: this.state.banner.banner_title,
          banner_desc: this.state.banner.banner_desc,
          banner_link: this.state.banner.banner_link,
        },
      )
      .then(() => {
        this.props.onCloseAddBanner()
        this.props.actionShowHideLoading(false)
        this.onShowAlert('success', 'Cập nhật thành công.')
      })
      .catch(() => this.props.actionShowHideLoading(false))
    } else {
      this.onUpdateIfAddNewImage(this.props.banner.banner_image)
    }
  }

  onUpdateIfAddNewImage = (id) => {
    axios.delete(`${API}banner/image/${id}`)
    .then(() => {
      const formData = new FormData()
      formData.append('upload-image', this.state.image)
      return axios.post(`${API}banner/image`, formData)
    })
    .then((result) => {
      this.props.actionShowHideLoading(false)
      const image = result.data.url
      return this.props.actionUpdateBanner(
        this.props.banner.banner_id,
        {
          banner_title: this.state.banner.banner_title,
          banner_desc: this.state.banner.banner_desc,
          banner_link: this.state.banner.banner_link,
          banner_image: image,
        },
      )
    })
    .then(() => {
      this.props.onCloseAddBanner()
      this.props.actionShowHideLoading(false)
      this.onShowAlert('success', 'Cập nhật thành công.')
    })
    .catch(() => {
      this.props.actionShowHideLoading(false)
    })
  }

  onSave = () => {
    this.props.actionShowHideLoading(true)
    const formData = new FormData()
    formData.append('upload-image', this.state.image)
    axios.post(`${API}banner/image`, formData)
    .then((result) => {
      this.props.actionShowHideLoading(false)
      const image = result.data.url
      return this.props.actionAddBanner({
        ...this.state.banner,
        banner_image: image,
      })
    })
    .then(() => {
      this.props.onCloseAddBanner()
      this.props.actionShowHideLoading(false)
      this.onShowAlert('success', 'Thêm mới thành công.')
    })
    .catch(() => {
      this.props.actionShowHideLoading(false)
      this.onShowAlert('danger', 'Có lỗi, vui lòng xem lại.')
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
      this.setState({
        tempImage: '',
        image: '',
        banner: {},
      }, () => {
        this.props.actionGetBanners()
      })
    }, 1500)
  }

  render() {
    return (
      <div className={S['am-add-banner']}>
        <Modal isShow={this.props.isShowAddBanner}>
          <Modal.Header
            title={!this.props.isAddOrUpdate ? 'Thêm banner' : 'Cập nhật banner'}
            onClose={() => {
              this.setState({
                tempImage: '',
                image: '',
                banner: {},
              }, () => {
                this.props.onCloseAddBanner()
              })
            }} />
          <Modal.Body>
            <div className="row">
              <div className="col-sm-6">
                <div className={S['am-add-banner__form-item']}>
                  <p>Chọn hình</p>
                  <div className={S['am-add-banner__img-upload']}>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        const reader = new FileReader();
                        reader.onload = (event: any) => {
                          const base64: any = event.target;
                          this.setState({
                            // @ts-ignore
                            tempImage: base64.result,
                            image: file,
                          })
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                    />
                    <Icon name="upload">
                      <p>Tải ảnh</p>
                    </Icon>
                    <img
                      src={
                        this.state.tempImage !== ''
                        ? this.state.tempImage
                        : `${CDN}banners/${this.props.banner.banner_image}`
                      }
                      className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className={S['am-add-banner__form-item']}>
                  <p>Tiêu đề</p>
                  <input
                    defaultValue={this.state.banner.banner_title}
                    name="banner_title"
                    onChange={this.onChange}
                    placeholder="Tiêu đề" />
                </div>
                <div className={S['am-add-banner__form-item']}>
                  <p>Mô tả</p>
                  <input
                    defaultValue={this.state.banner.banner_desc}
                    name="banner_desc"
                    onChange={this.onChange}
                    placeholder="Mô tả" />
                </div>
                <div className={S['am-add-banner__form-item']}>
                  <p>Đường dẫn</p>
                  <input
                    defaultValue={this.state.banner.banner_link}
                    name="banner_link"
                    onChange={this.onChange}
                    placeholder="Đường dẫn" />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={S['am-add-banner__btn-action']}>
              <span onClick={() => {
                this.setState({
                  tempImage: '',
                  image: '',
                  banner: {},
                }, () => {
                  this.props.onCloseAddBanner()
                })
              }}>Cancel</span>
              <span
                onClick={!this.props.isAddOrUpdate ? this.onSave : this.onUpdate}
              >Save</span>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = {
  actionAddBanner,
  actionShowHideLoading,
  actionShowHideAlert,
  actionGetBanners,
  actionUpdateBanner,
}

export default connect(null, mapDispatchToProps)(AdminAddBanner)
