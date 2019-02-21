import * as React from 'react';

const Styles = require('./styles/index.scss')

const Alert = ({ settings }) => (
  <div
    className={`${Styles['section-notification-bar']} col-12`}>
    {settings.WEBSITE_ADS}
  </div>
)

export default Alert
