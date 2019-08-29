import * as React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import Loadable from 'react-loadable';

const uuidv4 = require('uuid/v4');

import AdminHeader from '../shared/layout/Header';
import Breadcrumb from '../shared/layout/Breadcrumb';
import { actionShowHidePopup, actionShowHideAlert } from '@app/stores/init';
import Icon from '@app/modules/client/shared/layout/Icon';
import { actionGetTags, actionDeleteTag } from '@app/stores/tag/TagActions';

const GlobalStyles = require('@app/shared/styles/Box.scss');

const AdminAddTag = Loadable({
  loader: () => import(
    /*webpackChunkName: "admin_add_tag" */ './addOrUpdate'),
  loading: () => '',
});

interface IAdminTagsProps {
  actionGetTags: Function;
  actionDeleteTag: Function;
  actionShowHidePopup: Function;
  actionShowHideAlert: Function;
  tagsState: any;
}

interface IAdminTagsStates {
  isShowHideAddTag: boolean;
  currentTag: {
    tag_id?: string;
    tag_alias?: string;
    tag_name?: string;
    tag_created_date?: string;
    tag_parent?: number;
    tag_path?: string;
  };
  isAddOrUpdateTag: boolean;
}

class AdminTags extends React.Component<IAdminTagsProps, IAdminTagsStates> {
  constructor(props) {
    super(props)
    this.state = {
      isShowHideAddTag: false,
      currentTag: {
        tag_alias: '',
        tag_created_date: '',
        tag_id: '',
        tag_name: '',
        tag_parent: 0,
        tag_path: '',
      },
      isAddOrUpdateTag: false,
    }
  }

  componentDidMount() {
    this.props.actionGetTags()
  }

  onCloseAddTag = () => {
    this.setState({
      isShowHideAddTag: !this.state.isShowHideAddTag,
      currentTag: {},
      isAddOrUpdateTag: false,
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
          this.props.actionDeleteTag(id)
          .then(() => {
            this.props.actionGetTags()
            .then(() => {
              this.props.actionShowHideAlert({
                type: 'success',
                title: 'Xóa thành công tag!',
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
              title: 'Lỗi, tag này đã có sản phẩm sử dụng!',
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
    this.props.tagsState.data
    && this.props.tagsState.data.length > 0
    && this.props.tagsState.data.map(element => (
      <tr key={uuidv4()}>
        <td>
          <span onClick={() => {
            this.setState({
              currentTag: element,
              isAddOrUpdateTag: true,
              isShowHideAddTag: true,
            })
          }}>{element.tag_name}</span>
        </td>
        <td>{element.tag_path}</td>
        <td>
          <Icon onClick={() => this.onDelete(element.tag_id)} name="trash"/>
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
                title: 'Quản lý tag',
                href: '/tags',
                active: true,
              },
            ]}
          />
          <div className={GlobalStyles['wrap_action']}>
            <span onClick={this.onCloseAddTag}>
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
                  <th scope="col">Tên</th>
                  <th scope="col">Path</th>
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
        <AdminAddTag
          tag={this.state.currentTag}
          onCloseAddTag={this.onCloseAddTag}
          isShowAddTag={this.state.isShowHideAddTag}
          isAddOrUpdate={this.state.isAddOrUpdateTag}
        />
      </>
    )
  }
}

const mapStateToProps = storeState => ({
  tagsState: storeState.tagReducer.tagsState,
})

const mapDispatchToProps = {
  actionGetTags,
  actionDeleteTag,
  actionShowHidePopup,
  actionShowHideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTags)
