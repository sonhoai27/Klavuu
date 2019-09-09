import * as React from 'react'
import ValidateObject from '@app/Shared/Utils/ValidateObject';

interface IAlertProps {
  type: string;
  title: string;
  icon?: any;
}

class Alert extends React.Component<IAlertProps>{
  render() {
    return (
      <div className="notify">
        <div className={`notification ${ValidateObject({
          name: 'type',
          object: this.props,
        })}`}>
          <h4 className="notification-title">
            {this.props.icon !== undefined ? this.props.icon : ''}
            {ValidateObject({
              name: 'title',
              object: this.props,
            })}
          </h4>
        </div>
      </div>
    )
  }
}
export default Alert
