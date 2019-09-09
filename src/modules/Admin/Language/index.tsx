import * as React from 'react';
import { connect } from 'react-redux';

import AdminHeader from '../Shared/Layout/Header';
import Breadcrumb from '../Shared/Layout/Breadcrumb';
import { actionGetLanguage, actionUpdateLanguage } from '@app/Stores/Language/LanguageActions';
import { actionShowHideLoading, actionShowHideAlert } from '@app/Stores/init';

const GlobalStyles = require('@app/Shared/Styles/Box.scss');

interface IAdminLanguageProps {
  actionGetLanguage: Function;
  languageState: any;
  actionShowHideLoading: Function;
  actionUpdateLanguage: Function;
  actionShowHideAlert: Function;
}

interface IAdminLanguageStates {
  lng: any;
  type: string;
}

class AdminLanguage extends React.PureComponent<IAdminLanguageProps, IAdminLanguageStates> {
  constructor(props) {
    super(props)
    this.state = {
      lng: {},
      type: '',
    }
  }

  componentDidUpdate() {
    console.log(this.props.languageState)
  }

  onGetLanguage(type) {
    this.props.actionShowHideLoading(true)
    this.setState({
      type,
    }, () => {
      this.props.actionGetLanguage(type)
      .then((result) => {
        this.props.actionShowHideLoading(false)
        const { data } = result.value
        this.setState({
          lng: data,
        })
      })
      .catch(() => this.props.actionShowHideLoading(false))
    })
  }

  renderInput = name => React.createElement(
    'div',
    {
      key: `${name}-A`,
      className: GlobalStyles['form-item'],
    },
    [
      React.createElement(
        'label',
        {
          key: `${name}-B`,
        },
        name,
      ),
      React.createElement(
        'input',
        {
          name,
          type: 'text',
          key: `${name}-C`,
          defaultValue: this.state.lng[name],
          onChange: this.onChange,
        },
      ),
    ],
  )

  renderListInput = () => (
    this.props.languageState
    && Object.keys(this.props.languageState).length > 0
    && Object.keys(this.props.languageState).map(element => (
      this.renderInput(element)
    ))
  )

  onChange = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const { name, value } = e.target
    this.setState({
      lng: {
        ...this.state.lng,
        [name]: value,
      },
    })
  }

  onShowAlert = (title, type) => {
    this.props.actionShowHideAlert({
      title,
      type,
      status: true,
    })
    setTimeout(() => {
      this.props.actionShowHideAlert({ status: false })
    }, 1000)
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
                title: 'Ngôn ngữ',
                href: '/language',
                active: true,
              },
            ]}
          />
        <div className={GlobalStyles['wrap_action']}>
          <span
            onClick={() => {
              this.props.actionShowHideLoading(true)
              this.props.actionUpdateLanguage(
                this.state.lng,
                this.state.type,
              )
              .then(() => {
                this.setState({
                  lng: {},
                  type: '',
                }, () => {
                  this.props.actionShowHideLoading(false)
                  this.onShowAlert('Cập nhật thành công!', 'success')
                  this.props.actionGetLanguage()
                })
              })
              .catch(() => {
                this.props.actionShowHideLoading(false)
                this.onShowAlert('Cập nhật thất bại!', 'danger')
              })
            }}
            className={GlobalStyles['wrap_action__btn']}>
            Lưu
          </span>
        </div>
        </AdminHeader>
        <div className="col-sm-8">
          <div className={GlobalStyles['wrap-content']}>
            {this.renderListInput()}
          </div>
        </div>
        <div className="col-sm-4">
          <div className={GlobalStyles['wrap-content']}>
            <div className={GlobalStyles['wrap_action']}>
              <span
                onClick={() => this.onGetLanguage('en')}
                className={GlobalStyles['wrap_action__btn']}>
                Tiếng anh
              </span>
              <span
                onClick={() => this.onGetLanguage('vi')}
                className={GlobalStyles['wrap_action__btn']}>
                Tiếng việt
              </span>
            </div>
            <div style={{ marginBottom: 32, marginTop: 32 }}>
              <img width="120px" src="/images/icons/select.png" className="img-fluid"/>
            </div>
            <p>Vui lòng chọn tiếng Anh hoặc Việt để chỉnh sửa nội dung!</p>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  languageState: state.languageReducer.languageState,
})

const mapDispatchToProps = {
  actionGetLanguage,
  actionShowHideLoading,
  actionUpdateLanguage,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLanguage)
