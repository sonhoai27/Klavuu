import * as React from 'react'
import ValidateObject from '@app/shared/utils/ValidateObject';

interface IAlertProps {
  type: string;
  title: string;
}

class Alert extends React.Component<IAlertProps>{
  render() {
    return (
      <div className={`notification ${ValidateObject({
        name: 'type',
        object: this.props,
      })}`}>
        <h4 className="notification-title">
          {ValidateObject({
            name: 'title',
            object: this.props,
          })}
        </h4>
      </div>
    )
  }
}
export default Alert
