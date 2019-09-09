import * as React from 'react';
import Icon from '@app/Shared/Icon';
import { CDN } from '@app/Shared/Const';

const S = require('./SingleUploadImage.scss')

interface ISingleUploadImageProps {
  onUpdate?: Function;
  onDelete?: Function;
  src?: string;
}

class SingleUploadImage extends React.Component<ISingleUploadImageProps> {
  render() {
    return (
      <div className={S['single-upload-image']}>
        {
          this.props.src !== ''
          ? (
            <div className={S['single-upload-image__image']}>
              <img
              width="100%"
              src={`${CDN}icons/${this.props.src}`}
              className="img-fluid"/>
              <div>
                <Icon onClick={this.props.onDelete} name="trash"/>
              </div>
            </div>
          )
          : (
            <div className={S['single-upload-image__image-picker']}>
              <input
                onChange={(e: any) => {
                  const file = e.target.files[0]
                  this.props.onUpdate && this.props.onUpdate(file)
                }}
                type="file"/>
              <Icon name="picture" />
              <p>Chọn hình ảnh</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default SingleUploadImage
