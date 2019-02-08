import * as React from 'react';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

import { actionUpdateBrand, actionGetBrands, actionAddBrand } from '@app/stores/brand/BrandActions';
import { actionShowHideAlert } from '@app/stores/init';
import Modal from '../../shared/layout/Modal';
import Moment from '@app/shared/utils/Moment';
import Alias from '@app/shared/utils/Alias';

const S = require('../styles/add.scss');

interface IAdminBrandAddProps {
  actionUpdateBrand: Function;
  actionShowHideAlert: Function;
  brand?: any;
  isShowAddBrand: boolean;
  onCloseAddBrand?: () => void;
  isAddOrUpdate?: boolean;
  actionGetBrands: () => void;
  actionAddBrand: Function;
}

interface IAdminBrandAddStates {
  brand: {
    brand_id?: string;
    brand_alias?: string;
    brand_name?: string;
    brand_created_date?: string;
  }
}

class AdminBrandAdd extends React.Component<IAdminBrandAddProps, IAdminBrandAddStates> {
  constructor(props) {
    super(props)
    this.state = {
      brand: {
        brand_id: uuidv4(Date.now()),
        brand_alias: '',
        brand_name: '',
        brand_created_date: Moment(),
      },
    }
  }

  onChange = (e) => {
    const { value } = e.target

    this.setState({
      brand: {
        ...this.state.brand,
        brand_name: value,
        brand_alias: Alias(value),
      },
    })
  }

  onSave = () => {
    if (this.onCheckBrand()) {
      this.props.actionAddBrand(this.state.brand)
      .then(() => {
        this.onShowAlert({
          type: 'success',
          title: `Thêm mới thành công ${this.state.brand.brand_name}`,
        })
      })
      .catch(() => {
        this.onShowAlert({
          type: 'danger',
          title: `Thêm thất bại ${this.state.brand.brand_name}`,
        })
      })
    } else {
      this.onShowAlert({
        type: 'warning',
        title: 'Lỗi vui lòng điền đủ thông tin!',
      })
    }
  }

  onCheckBrand = (): boolean => {
    const { brand } = this.state
    if (
      brand.brand_alias !== ''
      && brand.brand_name !== ''
    ) {
      return true
    }
    return false
  }

  onShowAlert = ({ type, title }) => {
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
        brand: {},
      }, () => {
        this.props.actionGetBrands()
      })
    }, 1500)
  }

  onUpdate = () => {}

  render() {
    return (
      <Modal style={{ maxWidth: '25%' }} isShow={this.props.isShowAddBrand}>
        <Modal.Header
          title={!this.props.isAddOrUpdate ? 'Thêm hãng mới' : 'Cập nhật hãng'}
          onClose={() => {
            this.setState({
              brand: {},
            }, () => {
              this.props.onCloseAddBrand()
            })
          }} />
          <Modal.Body>
            <div className="mg-t-16">
              <div className={S['form-item']}>
                <p>Tên hãng</p>
                <input onChange={this.onChange} type="text" name="brand_name"/>
              </div>
              <div className={S['form-item']}>
                <p>Alias</p>
                <input disabled type="text" value={this.state.brand.brand_alias}/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={S['btn-action']}>
              <span onClick={() => {
                this.setState({
                  brand: {},
                }, () => {
                  this.props.onCloseAddBrand()
                })
              }}>Cancel</span>
              <span
                onClick={!this.props.isAddOrUpdate ? this.onSave : this.onUpdate}
              >Save</span>
            </div>
          </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  actionUpdateBrand,
  actionShowHideAlert,
  actionGetBrands,
  actionAddBrand,
}

export default connect(null, mapDispatchToProps)(AdminBrandAdd)
