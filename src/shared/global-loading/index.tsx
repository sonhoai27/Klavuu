import * as React from 'react';

const S = require('./GlobalLoading.scss')

const GlobalLoading = () => (
  <div className={S['global-loading']}>
    <div className={S['google-loader']}>
      <span/>
      <span/>
      <span/>
      <span/>
    </div>
  </div>
)

export default GlobalLoading
