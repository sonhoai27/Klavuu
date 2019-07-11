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
              <li>
                <Link to="">Blogs</Link>
              </li>
              <li>
                <Link to="">Brands</Link>
              </li>
              <li>
                <Link to="">Tags</Link>
              </li>
            </ul>
          </div>
        </div>
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
              <div className={S['video-container']}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8640182957912!2d106.67952854396371!3d10.776338943599383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe66ae9d883%3A0xd9032d12e680ff4a!2sZone+22!5e0!3m2!1sen!2s!4v1559326765649!5m2!1sen!2s"
                  width="400"
                  style={{ border: 'none' }}
                  height="250">
                  </iframe>
              </div>
          </div>
        </div>
      </div>
    </div>
)

export default FooterLinks
