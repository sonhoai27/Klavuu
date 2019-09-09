import * as React from 'react';
import { connect } from 'react-redux';
import Icon from '@app/Shared/Icon';

const S = require('../Styles/Photo.scss')

interface IAdminPhotoProps {
  onClose: Function;
  ckeditor: any;
}
interface IAdminPhotoStates {
}

class AdminPhoto extends React.Component<IAdminPhotoProps, IAdminPhotoStates> {
  constructor(props) {
    super(props)
  }

  insertImage = (img) => {
    if (this.props.ckeditor.type === 'insert_image') {
      this.props.ckeditor.editor.insertHtml(`<img src="${img}" class="img-fluid"/>`);
      this.props.onClose()
    } else {
      const image: any = document.getElementById(this.props.ckeditor.editor)
      image.src = img
      this.props.onClose()
    }
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
              <img src="http://22.zonesgroup.vn/api/uploads/d960915ef4775729800000.png" alt=""/>
              <div>
                <span
                  // tslint:disable-next-line:max-line-length
                  onClick={() => this.insertImage('http://22.zonesgroup.vn/api/uploads/d960915ef4775729800000.png')}>
                  Chèn
                </span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="http://22.zonesgroup.vn/api/uploads/3a3ebfb48f775211400000.jpg" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="http://22.zonesgroup.vn/api/uploads/90ebff026e775211400000.jpg" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="hhttp://22.zonesgroup.vn/api/uploads/704cebf565775686600000.jpg" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="http://22.zonesgroup.vn/api/uploads/01fbce4ae2775211400000.jpg" alt=""/>
              <div>
                <span>Chèn</span>
                <span>Xóa</span>
              </div>
            </li>
            <li>
              <img src="http://22.zonesgroup.vn/api/uploads/3dec98ff72775686600000.jpg"/>
              <div>
                <span
                  onClick={() => {
                    // tslint:disable-next-line:max-line-length
                    this.insertImage('http://22.zonesgroup.vn/api/uploads/3dec98ff72775686600000.jpg')
                  }}>
                  Chèn
                </span>
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
