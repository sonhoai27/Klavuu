import * as React from 'react';

const S = require('./LazyLoading.scss')

const InfoLoading = () => (
  <div className={S['info-lazy-loading']}>
    <div className={S['content_1']}/>
    <div className={S['line_1']}/>
    <div className={S['line_2']}/>
  </div>
)

export default InfoLoading
