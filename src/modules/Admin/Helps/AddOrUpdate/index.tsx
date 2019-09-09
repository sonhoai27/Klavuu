import * as React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';

import { actionShowHideAlert } from '@app/Stores/init';
import Modal from '../../Shared/layout/Modal';
import Alias from '@app/Shared/Utils/Alias';
import Axios from 'axios';
import { API } from '@app/Shared/Const';
import { configForProductIntro } from '@app/Shared/CKEditorConfig';

CKEditor.editorUrl = 'https://cdn.ckeditor.com/4.10.1/full/ckeditor.js';

const S = require('../styles/add.scss');

interface IAdminHelpAddProps {
  actionShowHideAlert?: Function;
  help?: any;
  isShowAddHelp: boolean;
  onCloseAddHelp?: () => void;
  isAddOrUpdate?: boolean;
  actionGetHelps?: Function;
}

interface IAdminHelpAddStates {
  help: any;
}

class AdminHelpAdd extends React.Component<IAdminHelpAddProps, IAdminHelpAddStates> {
  constructor(props) {
    super(props)
    this.state = {
      help: {
        helps_id: '',
        helps_alias: '',
        helps_name: '',
        helps_content: '',
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.help !== prevProps.help && this.props.help.helps_name !== '') {
      this.setState({
        help: this.props.help,
      })
    }
  }

  onChange = (e) => {
    const { value } = e.target

    this.setState({
      help: {
        ...this.state.help,
        helps_name: value,
        helps_alias: Alias(value),
      },
    })
  }

  onSave = () => {
    Axios.post(`${API}helps`, {
      helps_alias: Alias(this.state.help.helps_name),
      helps_name: this.state.help.helps_name,
      helps_content: this.state.help.helps_content,
    })
    .then(() => {
      this.onShowAlert({
        type: 'success',
        title: `Thêm mới thành công ${this.state.help.helps_name}`,
      })
      this.props.onCloseAddHelp()
    })
    .catch(() => {
      this.onShowAlert({
        type: 'danger',
        title: `Thêm thất bại ${this.state.help.helps_name}`,
      })
    })
  }

  onCheckHelp = (): boolean => {
    const { help } = this.state
    if (
      help.helps_alias !== ''
      && help.helps_name !== ''
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
        help: {
          helps_alias: '',
          helps_content: '',
          helps_id: '',
          helps_name: '',
        },
      }, () => {
        this.props.actionGetHelps()
      })
    }, 1500)
  }

  onUpdate = () => {
    if (this.onCheckHelp()) {
      Axios.put(`${API}helps/${this.state.help.helps_id}`, {
        helps_alias: Alias(this.state.help.helps_name),
        helps_name: this.state.help.helps_name,
        helps_content: this.state.help.helps_content,
      })
      .then(() => {
        this.onShowAlert({
          type: 'success',
          title: `Cập nhật thành công ${this.state.help.helps_name}`,
        })
        this.props.onCloseAddHelp()
      })
      .catch(() => {
        this.onShowAlert({
          type: 'danger',
          title: `Cập nhật thất bại ${this.state.help.helps_name}`,
        })
      })
    } else {
      this.onShowAlert({
        type: 'warning',
        title: 'Lỗi vui lòng điền đủ thông tin!',
      })
    }
  }

  onChangeCKEditor = (e, name) => {
    this.setState({
      help: {
        ...this.state.help,
        [name]: e.editor.getData(),
      },
    })
  }

  render() {
    return (
      <Modal style={{ maxWidth: '50%' }} isShow={this.props.isShowAddHelp}>
        <Modal.Header
          title={!this.props.isAddOrUpdate ? 'Thêm hãng trợ giúp' : 'Cập nhật trợ giúp'}
          onClose={() => {
            this.setState({
              help: {
                helps_alias: '',
                helps_content: '',
                helps_id: '',
                helps_name: '',
              },
            }, () => {
              this.props.onCloseAddHelp()
            })
          }} />
          <Modal.Body>
            <div className="mg-t-16">
              <div className={S['form-item']}>
                <p>Tên</p>
                <input
                  defaultValue={this.state.help.helps_name}
                  onChange={this.onChange} type="text" name="helps_name"/>
              </div>
              <div className={S['form-item']}>
                <p>Nội dung</p>
                <CKEditor
                  config={{
                    ...configForProductIntro,
                  }}
                  onChange={e => this.onChangeCKEditor(e, 'helps_content')}
                  data={this.state.help.helps_content}/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={S['btn-action']}>
              <span onClick={() => {
                this.setState({
                  help: {
                    helps_alias: '',
                    helps_crontent: '',
                    helps_id: '',
                    helps_name: '',
                  },
                }, () => {
                  this.props.onCloseAddHelp()
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
  actionShowHideAlert,
}

export default connect(null, mapDispatchToProps)(AdminHelpAdd)
