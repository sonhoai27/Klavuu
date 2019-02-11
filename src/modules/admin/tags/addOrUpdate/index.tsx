import * as React from 'react';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

import { actionShowHideAlert } from '@app/stores/init';
import Modal from '../../shared/layout/Modal';
import Moment from '@app/shared/utils/Moment';
import Alias from '@app/shared/utils/Alias';
import { actionUpdateTag, actionGetTags, actionAddTag } from '@app/stores/tag/TagActions';

const S = require('../styles/add.scss');

interface IAdminTagAddProps {
  actionUpdateTag: Function;
  actionShowHideAlert: Function;
  tag?: any;
  isShowAddTag: boolean;
  onCloseAddTag?: () => void;
  isAddOrUpdate?: boolean;
  actionGetTags: () => void;
  actionAddTag: Function;
  tagsState: any;
}

interface IAdminTagAddStates {
  tag: {
    tag_id?: string;
    tag_alias?: string;
    tag_name?: string;
    tag_created_date?: string;
    tag_path?: string;
    tag_parent?: number;
  }
}

class AdminTagAdd extends React.Component<IAdminTagAddProps, IAdminTagAddStates> {
  constructor(props) {
    super(props)
    this.state = {
      tag: {
        tag_id: '',
        tag_created_date: '',
        tag_alias: '',
        tag_name: '',
        tag_path: '',
        tag_parent: 0,
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tag !== prevProps.tag && this.props.tag.tag_name !== '') {
      this.setState({
        tag: this.props.tag,
      })
    }
    console.log(this.state)
  }

  onChange = (e) => {
    const { value } = e.target

    this.setState({
      tag: {
        ...this.state.tag,
        tag_name: value,
        tag_alias: Alias(value),
      },
    })
  }

  onSave = () => {
    if (this.onCheckTag()) {
      this.props.actionAddTag({
        tag_name: this.state.tag.tag_name,
        tag_alias: this.state.tag.tag_alias,
        tag_parent: this.state.tag.tag_parent,
        tag_created_date: Moment(),
        tag_path:
        `${this.state.tag.tag_path ? this.state.tag.tag_path : ''}/${this.state.tag.tag_alias}`,
      })
      .then(() => {
        this.onShowAlert({
          type: 'success',
          title: `Thêm mới thành công ${this.state.tag.tag_name}`,
        })
        this.props.onCloseAddTag()
      })
      .catch(() => {
        this.onShowAlert({
          type: 'danger',
          title: `Thêm thất bại ${this.state.tag.tag_name}`,
        })
      })
    } else {
      this.onShowAlert({
        type: 'warning',
        title: 'Lỗi vui lòng điền đủ thông tin!',
      })
    }
  }

  onCheckTag = (): boolean => {
    const { tag } = this.state

    if (
      tag.tag_alias !== ''
      && tag.tag_name !== ''
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
      if (type === 'success') {
        this.setState({
          tag: {
            tag_alias: '',
            tag_created_date: '',
            tag_id: '',
            tag_name: '',
            tag_path: '',
            tag_parent: 0,
          },
        }, () => {
          this.props.actionGetTags()
        })
      }
    }, 1500)
  }

  onUpdate = () => {
    if (this.onCheckTag()) {
      this.props.actionUpdateTag(
        {
          tag_name: this.state.tag.tag_name,
          tag_alias: this.state.tag.tag_alias,
        },
        this.state.tag.tag_id,
      )
      .then(() => {
        this.onShowAlert({
          type: 'success',
          title: `Cập nhật thành công ${this.state.tag.tag_name}`,
        })
        this.props.onCloseAddTag()
      })
      .catch(() => {
        this.onShowAlert({
          type: 'danger',
          title: `Cập nhật thất bại ${this.state.tag.tag_name}`,
        })
      })
    } else {
      this.onShowAlert({
        type: 'warning',
        title: 'Lỗi vui lòng điền đủ thông tin!',
      })
    }
  }

  onChangeSelect = (e) => {
    const { value, selectedIndex, options } = e.target
    this.setState({
      tag: {
        ...this.state.tag,
        tag_path: options[selectedIndex].dataset.path,
        tag_parent: value,
      },
    })
  }

  renderListTags = () => (
    this.props.tagsState.data
    && this.props.tagsState.data.length > 0
    && this.props.tagsState.data.map(element => (
      <option
        data-path={element.tag_path}
        key={uuidv4()}
        value={element.tag_id}>
        {element.tag_name}
      </option>
    ))
  )

  render() {
    return (
      <Modal style={{ maxWidth: '25%' }} isShow={this.props.isShowAddTag}>
        <Modal.Header
          title={!this.props.isAddOrUpdate ? 'Thêm tag mới' : 'Cập nhật tag'}
          onClose={() => {
            this.setState({
              tag: {
                tag_alias: '',
                tag_created_date: '',
                tag_id: '',
                tag_name: '',
                tag_path: '',
                tag_parent: 0,
              },
            }, () => {
              this.props.onCloseAddTag()
            })
          }} />
          <Modal.Body>
            <div className="mg-t-16">
              <div className={S['form-item']}>
                <p>Tên hãng</p>
                <input
                  defaultValue={this.state.tag.tag_name}
                  onChange={this.onChange} type="text" name="tag_name"/>
              </div>
              <div className={S['form-item']}>
                <p>Chọn danh mục cha</p>
                <select
                  value={this.state.tag.tag_parent}
                  onChange={this.onChangeSelect} name="tag_path">
                  <option value="">Mặc định</option>
                  {this.renderListTags()}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={S['btn-action']}>
              <span onClick={() => {
                this.setState({
                  tag: {
                    tag_alias: '',
                    tag_created_date: '',
                    tag_id: '',
                    tag_name: '',
                    tag_path: '',
                    tag_parent: 0,
                  },
                }, () => {
                  this.props.onCloseAddTag()
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

const mapStateToProps = storeState => ({
  tagsState: storeState.tagReducer.tagsState,
})

const mapDispatchToProps = {
  actionUpdateTag,
  actionShowHideAlert,
  actionGetTags,
  actionAddTag,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTagAdd)
