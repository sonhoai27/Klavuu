import * as React from 'react';
import { Link } from 'react-router-dom';

const S = require('./FoorLinks.scss')

interface IFooterLinksProps {
  settings: any;
}

const FooterLinks = (props: IFooterLinksProps) => (
  <div className={`col-12 ${S['footer']}`}>
      <div className="row">
        <div className="col-sm-4">
          <div className={S['footer__icon-website']}>22 ZONE</div>
            <div className={S['footer__hot-link']}>
              <ul>
                <li>
                  {props.settings.WEBSITE_ADDRESS}
                </li>
                <li>
                {props.settings.WEBSITE_EMAIL}
                </li>
                <li>{props.settings.WEBSITE_PHONE}</li>
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
