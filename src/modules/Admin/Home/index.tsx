import * as React from 'react';

import AdminHeader from '../Shared/layout/Header';
import Axios from 'axios';
import { API } from '@app/Shared/Const';
import { Link } from 'react-router-dom';
import FormatNumber from '@app/Shared/Utils/FormatNumber';

const GlobalStyles = require('@app/Shared/Styles/Box.scss');

interface IAdminHomeState {
  reports: any;
}

class AdminHome extends React.Component<{}, IAdminHomeState> {
  constructor(props) {
    super(props)

    this.state = {
      reports: {
        orders: [],
        comments: [],
      },
    }
  }

  componentDidMount() {
    Axios.get(`${API}reports`)
      .then((result) => {
        this.setState({ reports: result.data })
      })
  }

  render() {
    return (
      <>
        <AdminHeader>
          <span>Home</span>
        </AdminHeader>
        <div className="w-full">
          <div className={GlobalStyles['wrap-content']}>
            <div className="row">
              <div className="col-sm-6">
                <h5 style={{ marginBottom: 32 }}>Đặt hàng hôm nay</h5>
                {
                  this.state.reports.orders.map(element => (
                    <div key={element.order_id} style={{ marginBottom: 8 }}>
                      <span>
                        <Link to={`/backend/order/${element.order_id}`}>
                          {element.order_client_name}
                        </Link>
                      </span>
                      <span style={{ marginLeft: 8 }}>
                        {FormatNumber(element.order_sumary_price)}đ
                      </span>
                    </div>
                  ))
                }
              </div>
              <div className="col-sm-6">
                <h5 style={{ marginBottom: 32 }}>Bình luận hôm nay</h5>
                {
                  this.state.reports.comments.map(element => (
                    <div key={element.cmt_id} style={{ marginBottom: 8 }}>
                      <span>
                        <Link to={`/page/product/${element.product_alias}`}>
                          <span>{element.cmt_user_name}</span>
                          <span> - {element.cmt_content}</span>
                        </Link>
                      </span>
                      <span style={{ marginLeft: 8 }}>
                        {element.product_name}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AdminHome
