import * as React from "react";
import AdminHeader from "../Shared/layout/Header";
import Breadcrumb from "../Shared/layout/Breadcrumb";
import { connect } from "react-redux";
import { actionGetContacts } from "@app/Stores/Contact/ContactActions";
import Pagination from "@app/Shared/Pagination";
import Icon from "@app/Shared/Icon";
import { API } from '@app/Shared/Const';
const GlobalStyles = require("@app/shared/styles/Box.scss");

interface IAdminContactProps {
  actionGetContacts: any;
  contactsState: any;
  match?: any;
}

class AdminContact extends React.Component<IAdminContactProps, {}> {
  constructor(props) {
    super(props);
  }

  onMakeCurrentPage = () => {
    const page = window.location.href.split("page=")[1];
    if (page !== undefined || page != null) {
      return page;
    }

    return 1;
  };

  isMeta = () => {
    if (this.props.contactsState && this.props.contactsState.meta) {
      return this.props.contactsState.meta;
    }

    return {
      total: 0,
      page_size: 0
    };
  };

  renderListContact = () =>
    this.props.contactsState &&
    this.props.contactsState.items &&
    this.props.contactsState.items.length > 0 &&
    this.props.contactsState.items.map((element: any) => (
      <tr key={element.contact_id}>
        <td>{element.contact_id}</td>
        <td>{element.email}</td>
        <td>{element.created_at}</td>
      </tr>
    ));

  export = () => {
    window.location.href = API+'contacts/export'
  };

  render() {
    return (
      <>
        <AdminHeader>
          <Breadcrumb
            className="am-orders"
            items={[
              {
                title: "Trang chủ",
                href: "",
                active: false
              },
              {
                title: "Quản lý đơn hàng",
                href: "/orders",
                active: true
              }
            ]}
          />
          <div className={GlobalStyles["wrap_action"]}>
            <span onClick={this.export}>Xuất</span>
          </div>
        </AdminHeader>
        <div className="w-full order">
          <div className={GlobalStyles["wrap-content"]}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ fontSize: 12 }}>
                    <th>#</th>
                    <th>Email</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>{this.renderListContact()}</tbody>
              </table>
            </div>
            <Pagination
              currentPage={Number(this.onMakeCurrentPage())}
              pageLimit={Number(this.isMeta()["page_size"])}
              pageNeighbours={2}
              onPageChanged={e => {
                this.props.actionGetContacts(`?page=${e.currentPage}`);
                window.scrollTo(0, 0);
                window.history.pushState(
                  "",
                  "",
                  `/backend${this.props.match.url}?page=${e.currentPage}`
                );
              }}
              totalRecords={Number(this.isMeta()["total"])}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contactsState: state.contactReducer.contactsState
});

const mapDispatchToProps = {
  actionGetContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContact);
