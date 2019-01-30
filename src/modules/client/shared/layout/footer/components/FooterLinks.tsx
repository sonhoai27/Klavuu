import * as React from 'react';
import { Link } from 'react-router-dom';

const S = require('./FoorLinks.scss')

const FooterLinks = () => (
  <div className={`col-12 ${S['footer']}`}>
      <div className="row">
        <div className="col-sm-4">
          <div className={S['footer__icon-website']}>22 ZONE</div>
            <div className={S['footer__hot-link']}>
              <ul>
                <li>
                  11 Nguyễn Đình chiểu
                </li>
                <li>
                  sonhoai272@gmail.com
                </li>
                <li>09890223232</li>
              </ul>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={S['footer__hot-link']}>
            <span>ABOUT GLOW RECIPE</span>
            <ul>
              <li>
                <Link to="">Shipping</Link>
              </li>
              <li>
                <Link to="">Returns</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={S['footer__hot-link']}>
            <span>HELPS & FAQS</span>
            <ul>
              <li>
                <Link to="">About us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
)

export default FooterLinks
