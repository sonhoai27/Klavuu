import * as React from 'react';

const S = require('./LazyLoading.scss')

const ProductLeftInfoLoading = () => (
  <div className={S['info-lazy-loading']}>
    <div className={S['block']}/>
    <div className={S['block_2']} style={{ marginTop: 8 }}/>
    <div className={S['content_1']} style={{ marginTop: 32 }}/>
    <div className={S['line_1']}/>
    <div className={S['line_1-2']}/>
  </div>
)

export default ProductLeftInfoLoading
