import * as React from 'react';
import { Link } from 'react-router-dom';
import { CDN } from '@app/shared/const';

const S = require('./InfoSection.scss')

const InfoSection = props => (
  <div className={S['info-section']}>
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className={S['item']}>
            <Link to="/page/blogs">
              <img
                // tslint:disable-next-line:max-line-length
                src={`${CDN}icons/${props.settings.WEBSITE_IMAGE_BLOG}`}
                className="img-fluid" />
              <p>{props.t('BLOGS')}</p>
            </Link>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={S['item']}>
            <Link to="/page/about-us">
              <img
                // tslint:disable-next-line:max-line-length
                src={`${CDN}icons/${props.settings.WEBSITE_IMAGE_ABOUT_US}`}
                className="img-fluid" />
              <p>{props.t('MENU_ABOUT_US')}</p>
            </Link>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={S['item']}>
            <Link to="/page/blogs">
              <img
                // tslint:disable-next-line:max-line-length
                src={`${CDN}icons/${props.settings.WEBSITE_IMAGE_HOT_PRODUCTS}`}
                className="img-fluid" />
              <p>{props.t('BEST_SELLER')}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default InfoSection
