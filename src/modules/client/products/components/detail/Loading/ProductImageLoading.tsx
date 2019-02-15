import * as React from 'react';

const S = require('./LazyLoading.scss')

const ProductImageLoading = () => (
  <div className={S['info-lazy-loading']}>
    <div className={S['content']} style={{ marginLeft: 32 }}/>
  </div>
)

const ProductSmallImageLoading = () => (
  <div className={S['info-lazy-loading']} style={{ width: 'auto' }}>
    <div className={S['block_3']} style={{ marginBottom: 8 }}/>
    <div className={S['block_3']} style={{ marginBottom: 8 }}/>
    <div className={S['block_3']}/>
  </div>
)

export {
  ProductSmallImageLoading,
}

export default ProductImageLoading
