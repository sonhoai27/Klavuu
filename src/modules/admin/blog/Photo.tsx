import * as React from 'react';
import { connect } from 'react-redux';
import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./styles/Photo.scss')

interface IAdminPhotoProps {
  onClose: () => {};
}
interface IAdminPhotoStates {
}

class AdminPhoto extends React.Component<IAdminPhotoProps, IAdminPhotoStates> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={S['ui-photo']}>
        <div className={S['ui-photo__header']}>
          <span>Photo app</span>
          <Icon name="cross" onClick={this.props.onClose}/>
        </div>
        <div className={S['ui-photo__action']}>
          <span>
            Tải ảnh mới
            <input type="file"/>
          </span>
        </div>
        <div className={S['ui-photo__photos']}>
          <ul>
            <li>
              <img src="https://files.design/photo/7804/600x1299.png" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="https://files.design/photo/7820/600x1299.png" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="https://files.design/photo/7820/600x1299.png" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="https://files.design/photo/7822/600x1299.png" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="https://files.design/photo/7827/600x1299.png" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="http://22.zonesgroup.vn/api/uploads/3dec98ff72775686600000.jpg"/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// tslint:disable-next-line:no-unused
const mapStateToProps = storeState => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPhoto)
