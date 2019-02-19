import * as React from 'react';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

import AdminHeader from '../../shared/layout/Header';
import Breadcrumb from '../../shared/layout/Breadcrumb';
import { actionGetAccounts } from '@app/stores/account/AccountActions';
import { actionShowHidePopup, actionShowHideLoading, actionShowHideAlert } from '@app/stores/init';
import Icon from '@app/modules/client/shared/layout/Icon';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IAdminRoles {
  accountsState: any;
  actionGetAccounts: Function;
  actionShowHidePopup: Function;
  actionShowHideLoading: Function;
  actionShowHideAlert: Function;
}

class AdminRoles extends React.Component<IAdminRoles> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actionGetAccounts()
  }

  renderListAccount = () => (
    this.props.accountsState
    && this.props.accountsState.users
    && this.props.accountsState.users.length > 0
    && this.props.accountsState.users.map(element => (
      <tr key={uuidv4()}>
        <td>{element.user_name}</td>
        <td>{element.user_email}</td>
        <td>
          <Icon
            name="trash"/>
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
                href: '/xxx/app',
                active: false,
              },
              {
                title: 'Quản lý tài khoản',
                href: '/xxx/app/accounts',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span>
              Thêm mới tài khoản
            </span>
          </div>
        </AdminHeader>

        <div className="col-12">
          <div className={GlobalStyles['wrap-content']}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">Tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Hành động</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                  {this.renderListAccount()}
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
  accountsState: storeState.accountReducer.accountsState,
})

const mapDispatchToProps = {
  actionGetAccounts,
  actionShowHidePopup,
  actionShowHideLoading,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoles)
