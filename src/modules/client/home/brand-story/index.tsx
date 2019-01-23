import * as React from 'react';

const S = require('./BrandStory.scss')

const BrandStory = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <div className={S['brand-story']}>
          <h3>NATURAL KOREAN BEAUTY, HAND-PICKED WITH LOVE</h3>
          <p>Glow Recipe is a K-Beauty site helmed by beauty industry
            experts Sarah Lee & Christine Chang.
            We are committed to curating only the best in natural,
    gentle and truly effective Korean Beauty.</p>
          <h5>NEW PRODUCTS</h5>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  </div>
)

export default BrandStory
