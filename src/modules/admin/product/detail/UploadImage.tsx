import * as React from 'react';
const uuidv4 = require('uuid/v4');

import Icon from '@app/modules/client/shared/layout/Icon';
import { CDN } from '@app/shared/const';

const GlobalStyles = require('@app/shared/styles/Box.scss');

interface IUploadPhotoProps {
  onChange: (event: any) => void;
  onDelete: (id: string) => void;
  images: any;
}

interface IUploadPhotoStates {
  images: any;
}

class UploadPhoto extends React.Component<IUploadPhotoProps, IUploadPhotoStates> {
  constructor(props) {
    super(props)
    this.state = {
      images: {},
    }
  }

  renderImages = () => (
    this.props.images
    && this.props.images.length > 0
    && this.props.images.map((element) => {
      return (
        <li key={uuidv4()}>
          <img
          src={`${CDN}${element.img_src}`}
          className="img-fluid"/>
          <div>
            <span
              onClick={() => this.props.onDelete(element.img_src)}
            ><Icon name="trash"/></span>
          </div>
        </li>
      )
    })
  )

  render() {
    return (
      <div className={GlobalStyles['form-item']}>
        <div className={GlobalStyles['image-picker']}>
          <input type="file" onChange={(e) => {
            const file = e.target.files[0]
            this.props.onChange(file)
          }}/>
          <Icon name="picture" />
          <p>Kéo hoặc nhấn vào để tài hình</p>
        </div>
        <ul className={GlobalStyles['image-picker__items']}>
          {this.renderImages()}
        </ul>
      </div>
    )
  }
}

export default UploadPhoto
