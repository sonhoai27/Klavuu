import * as React from 'react';
import { Link } from 'react-router-dom';

const S = require('./InfoSection.scss')

const InfoSection = props =>  (
  <div className={S['info-section']}>
    <div className="container">
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-4">
              <div className={S['item']}>
                <Link to="/page/blogs">
                  <img
                    // tslint:disable-next-line:max-line-length
                    src="https://cdn.shopify.com/s/files/1/0543/8301/t/73/assets/tutorialsdesktop-1-3-19.jpg"
                    className="img-fluid"/>
                    <p>{props.t('BLOGS')}</p>
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={S['item']}>
                <Link to="/page/blogs">
                  <img
                    // tslint:disable-next-line:max-line-length
                    src="https://cdn.shopify.com/s/files/1/0543/8301/t/73/assets/about-us.jpg"
                    className="img-fluid"/>
                    <p>{props.t('MENU_ABOUT_US')}</p>
                </Link>
              </div>
            </div>
            <div className="col-sm-4">
              <div className={S['item']}>
                <Link to="/page/blogs">
                  <img
                    // tslint:disable-next-line:max-line-length
                    src="https://cdn.shopify.com/s/files/1/0543/8301/t/73/assets/GLOW_RECIPE_GLOW_EDITORIAL_DESKTOP.jpg"
                    className="img-fluid"/>
                    <p>{props.t('BEST_SELLER')}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-1"></div>
      </div>
    </div>
  </div>
)

export default InfoSection
