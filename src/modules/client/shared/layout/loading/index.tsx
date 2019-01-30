import * as React from 'react';

const S = require('./LazyLoading.scss')

const LazyLoading = () => (
  <div className={S['lazy-loading']}>
    <div className={S['content']}/>
    <div className={S['line_1']}/>
    <div className={S['line_2']}/>
  </div>
)

export default LazyLoading
