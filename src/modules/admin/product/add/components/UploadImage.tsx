import * as React from 'react';
const uuidv4 = require('uuid/v4');

import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./UploadImage.scss');

interface IUploadPhotoProps {
  onChange: (event: any) => void;
}

interface IUploadPhotoStates {
  images: {
    images: any[],
    temp: {
      img_id: string;
      img_temp_src: string;
    }[],
  };
}

class UploadPhoto extends React.Component<IUploadPhotoProps, IUploadPhotoStates> {
  constructor(props) {
    super(props)
    this.state = {
      images: {
        temp: [],
        images: [],
      },
    }
  }

  renderImages = () => (
    this.state.images.temp.length > 0
    && this.state.images.temp.map((element) => {
      return (
        <li key={uuidv4()}>
          <img
          src={element.img_temp_src}
          className="img-fluid"/>
          <div>
            <span><Icon name="trash"/></span>
          </div>
        </li>
      )
    })
  )

  render() {
    return (
      <div className={S['form-item']}>
        <div className={S['image-picker']}>
          <input type="file" onChange={(e) => {
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.onload = (event: any) => {
              const base64: any = event.target;
              this.setState({
                images: {
                  temp: [...this.state.images.temp, {
                    img_temp_src: base64.result,
                    img_id: uuidv4(),
                  }],
                  images: [...this.state.images.images, file],
                },
              }, () => {
                this.props.onChange(this.state.images)
              })
            };
            reader.readAsDataURL(e.target.files[0]);
          }}/>
          <Icon name="picture" />
          <p>Kéo hoặc nhấn vào để tài hình</p>
        </div>
        <ul className={S['image-picker__items']}>
          {this.renderImages()}
        </ul>
      </div>
    )
  }
}

export default UploadPhoto
