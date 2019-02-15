import * as React from 'react';

const S = require('./LazyLoading.scss')

const BreadcrumbLoading = () => (
  <div className={S['info-lazy-loading']} style={{ marginTop: 16 }}>
    <div className={S['line_1-2']}/>
    <div className={S['line_2-3']}/>
  </div>
)

export default BreadcrumbLoading
