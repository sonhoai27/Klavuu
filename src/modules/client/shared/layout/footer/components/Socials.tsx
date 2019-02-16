import * as React from 'react';

const uuidv4 = require('uuid/v4');

const S = require('./Socials.scss')

interface ISocialProps {
  items: {
    title: string;
    icon: string;
    href: string;
  }[],
  settings: any;
  t?: any;
}

const Socials = (props: ISocialProps) => (
  <div className={S['social']}>
    {
      props.items
      && props.items.length > 0
      && props.items.map(element => (
        <span className={S['social__item']} key={uuidv4()}>
          <a target="_blank" href={props.settings[`WEBSITE_${element.href}`]} title={element.title}>
            <img src={`/images/icons/${element.icon}`} className="img-fluid"/>
          </a>
        </span>
      ))
    }
  </div>
)

export {
  ISocialProps,
}

export default Socials
