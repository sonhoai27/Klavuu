import * as React from 'react';
import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./Popup.scss')

interface IPopupProps {
  icon: any;
  title: string;
  message: string;
  poBtn?: {
    title: string;
    func: any;
  };
  neBtn?: {
    title: string;
    func: any;
  };
  onClose: any;
}

class Popup extends React.Component<IPopupProps> {
  constructor(props) {
    super(props)
  }

  renderPoBtn = () => (
    this.props.poBtn
    && this.props.poBtn.title
    && (
      <span className={S['po-btn']} onClick={this.props.poBtn.func}>
        {this.props.poBtn.title}
      </span>
    )
  )

  renderNeBtn = () => (
    this.props.neBtn
    && this.props.neBtn.title
    && (
      <span className={S['ne-btn']} onClick={this.props.neBtn.func}>
        {this.props.neBtn.title}
      </span>
    )
  )

  render() {
    return (
      <div className={S['popup']}>
        <div className={S['popup__content']}>
          <div className={S['popup__header']}>
            <Icon
              name="cross"
            />
          </div>
          <div className={S['popup__main']}>
            <div className={S['popup__main__icon']}>
              {this.props.icon}
            </div>
            <div className={S['popup__main__title']}>
              {this.props.title}
            </div>
            <div className={S['popup__main__message']}>
              {this.props.message}
            </div>
          </div>
          <div className={S['popup__footer']}>
            {this.renderNeBtn()}
            {this.renderPoBtn()}
          </div>
        </div>
      </div>
    )
  }
}

export default Popup
