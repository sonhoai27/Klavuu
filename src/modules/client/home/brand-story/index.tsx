import * as React from 'react';
import { withNamespaces } from 'react-i18next';

const S = require('./BrandStory.scss')

interface IBrandStoryProps {
  t?: any;
}

const BrandStory = (props: IBrandStoryProps) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <div className={S['brand-story']}>
          <h3>{props.t('HOME_INTRO_TITLE')}</h3>
          <p>{props.t('HOME_INTRO_DESC')}</p>
          <h5>{props.t('HOME_NEW_PRODUCTS')}</h5>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  </div>
)

export default withNamespaces()(BrandStory)
