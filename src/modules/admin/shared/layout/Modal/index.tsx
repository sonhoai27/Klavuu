import * as React from 'react';

import Icon from '@app/modules/client/shared/layout/Icon';

const S = require('./Modal.scss')

interface IModalProps {
  children: any;
  isShow: boolean;
}

interface IHeaderProps {
  title: string;
  onClose: Function;
}

const Header = (props: IHeaderProps) => (
  <div className={S['am-modal__header']}>
    <span>{props.title}</span>
    <Icon
      onClick={props.onClose}
      name="cross"/>
  </div>
)

const Body = props => (
  <div className={S['am-modal__body']}>
    {props.children}
  </div>
)

const Footer = props => (
  <div className={S['am-modal__body']}>
    {props.children}
  </div>
)

class Modal extends React.Component<IModalProps> {
  static Header = Header
  static Body = Body
  static Footer = Footer

  renderChildren = () => (
    React.Children.map(this.props.children, child => React.cloneElement(child))
  )

  render() {
    return this.props.isShow
      && (
        <div className={S['am-modal']}>
          <div className={S['am-modal__content']}>
            {this.renderChildren()}
          </div>
        </div>
      )
  }
}

export default Modal
