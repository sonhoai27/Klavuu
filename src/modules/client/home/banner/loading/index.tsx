import * as React from 'react';

const S = require('./LazyLoading.scss')

const BannerLazyLoading = () => (
  <div className={S['lazy-loading']}>
    <div className={S['content']}/>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div className={S['line_1']}/>
      <div className={S['line_1']}/>
      <div className={S['line_1']}/>
      <div className={S['line_1']}/>
    </div>
  </div>
)

export default BannerLazyLoading
