import * as React from 'react';
import { Link } from 'react-router-dom';
import { CDN } from '@app/shared/const';

const S = require('./FoorLinks.scss')

interface IFooterLinksProps {
  settings: any;
  t?: any;
}

const FooterLinks = (props: IFooterLinksProps) => (
  <div className={`col-12 ${S['footer']}`} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="row">
        <div className="col-sm-4">
          <div className={S['footer__icon-website']}>
          {
            props.settings.WEBSITE_ICON
            ? <img
                width="80px"
                src={`${CDN}icons/${props.settings.WEBSITE_ICON}`}
                className="img-fluid"/>
            : 'ZONE 22'
          }
          </div>
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
            <span>{props.t('HOME_FOOTER_ABOUT_US')}</span>
            <ul>
              <li>
                <Link to="">{props.t('HOME_FOOTER_SHIPPING')}</Link>
              </li>
              <li>
                <Link to="">{props.t('HOME_FOOTER_RETURNS')}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-4">
          <div className={S['footer__hot-link']}>
            <span>{props.t('HOME_FOOTER_HELP_AND_FAQ')}</span>
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
