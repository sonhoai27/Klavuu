import * as React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { actionShowHidePopup, actionShowHideAlert } from '@app/Stores/init';
import { API } from '@app/Shared/Const';
import Icon from '@app/Shared/Icon';
import AdminHeader from '../Shared/layout/Header';
import Breadcrumb from '../Shared/layout/Breadcrumb';
import AdminHelpAdd from './AddOrUpdate'

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IAdminHelpsProps {
  actionShowHidePopup: Function;
  actionShowHideAlert: Function;
}

interface IAdminHelpsStates {
  helpsState: any,
  currentHelp: any;
  isShowHideAddHelp: boolean;
  isAddOrUpdateHelp: boolean;
}

class AdminHelps extends React.Component<IAdminHelpsProps, IAdminHelpsStates> {
  constructor(props) {
    super(props)
    this.state = {
      helpsState: [],
      currentHelp: {},
      isShowHideAddHelp: false,
      isAddOrUpdateHelp: false,
    }
  }

  componentDidMount() {
    this.onGetHelps()
  }

  onGetHelps = () => {
    Axios.get(`${API}helps`)
      .then((result) => {
        this.setState({
          helpsState: result.data,
        })
      })
      .catch(err => console.log(err))
  }

  renderListHelps = () => (
    this.state.helpsState
    && this.state.helpsState.length > 0
    && this.state.helpsState.map(element => (
      <tr key={Math.random()}>
        <td>
          <Icon
            onClick={() => {
              this.setState({
                currentHelp: element,
                isAddOrUpdateHelp: true,
                isShowHideAddHelp: true,
              })
            }}
            name="pencil" />
        </td>
        <td>{element.helps_name}</td>
        <td>
          <Icon onClick={() => this.onDelete(element.helps_id)} name="trash" />
        </td>
      </tr>
    ))
  )

  onDeleteHelp = id => Axios.delete(`${API}helps/${id}`)

  onDelete = (id) => {
    this.props.actionShowHidePopup({
      status: true,
      onClose: () => this.props.actionShowHidePopup({ status: false }),
      poBtn: {
        title: 'OK',
        func: () => {
          this.props.actionShowHidePopup({ status: false })
          this.onDeleteHelp(id)
            .then(() => {
              this.onGetHelps()
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
            .catch(() => {
              this.props.actionShowHideAlert({
                type: 'warning',
                title: 'Lỗi khi xóa!',
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
      message: 'If you click OK, This help will be delete.',
      icon: <Icon name="smile" />,
    })
  }

  onCloseAddHelp = () => {
    this.setState({
      isShowHideAddHelp: !this.state.isShowHideAddHelp,
      currentHelp: {},
      isAddOrUpdateHelp: false,
    })
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
                title: 'Quản lý trợ giúp',
                href: '/helps',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.onCloseAddHelp}>
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
                    <th scope="col">Sửa</th>
                    <th scope="col">Tên</th>
                    <th>Hành động</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.renderListHelps()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AdminHelpAdd
          help={this.state.currentHelp}
          onCloseAddHelp={this.onCloseAddHelp}
          isShowAddHelp={this.state.isShowHideAddHelp}
          isAddOrUpdate={this.state.isAddOrUpdateHelp}
          actionGetHelps={this.onGetHelps}
        />
      </>
    )
  }
}

const mapDispatchToProps = {
  actionShowHidePopup,
  actionShowHideAlert,
}

export default connect(null, mapDispatchToProps)(AdminHelps)
