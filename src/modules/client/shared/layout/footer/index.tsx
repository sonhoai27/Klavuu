import * as React from 'react';
import BackToTop from './BackToTop';
import Socials from './components/Socials';
import FooterLinks from './components/FooterLinks';

const S = require('./Footer.scss')

const socials = [
  {
    title: 'Facebook',
    icon: 'facebook.svg',
    href: 'https://fb.com',
  },
  {
    title: 'Twitter',
    icon: 'twitter.svg',
    href: 'https://fb.com',
  },
  {
    title: 'Youtube',
    icon: 'youtube.svg',
    href: 'https://fb.com',
  },
  {
    title: 'Instagram',
    icon: 'instagram.svg',
    href: 'https://fb.com',
  },
]

const Footer = () => (
  <div className={`${S['footer']} container`}>
    <BackToTop className={S['back-to-top']} title="BACK TO TOP"/>
    <div className="col-12">
      <Socials items={socials}/>
    </div>
    <FooterLinks/>
  </div>
)

export default Footer
